import { Component } from '@angular/core';
import { CustomerServiceService } from '../../services/customer-service.service';
import { Customer } from '../../models/customer.model';
import { InvoiceItem } from '../../models/invoice-item.model';
import { NumberToWordsPipe } from '../../pipes/number-to-words.pipe';
import { IndianCurrencyPipe } from '../../pipes/indian-currency.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnvService } from '../../services/env.service';

@Component({
  selector: 'app-generate-bill',
  standalone: true,
  imports: [NumberToWordsPipe, IndianCurrencyPipe, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './generate-bill.component.html',
  styleUrl: './generate-bill.component.css'
})
export class GenerateBillComponent {

  companyName = this._env.companyName;
  companyAddress = this._env.companyAddress;
  companyGstin = this._env.companyGstin;
  
  // Invoice details
  invoiceNumber = 'INV-001';
  invoiceDate = new Date();
  
  // Customer details
  customers: Customer[] = [];
  selectedCustomerId: number | null = null;
  selectedCustomer: Customer | null = null;
  
  // Invoice items
  invoiceItems: InvoiceItem[] = [];
  nextSerialNo = 1;
  
  // Tax rates
  gstRates = [5, 12, 18, 28];
  
  constructor(private customerService: CustomerServiceService,
    public _env: EnvService,
  ) {}
  
  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
    this.addNewItem();
  }
  
  onCustomerChange(): void {
    if (this.selectedCustomerId) {
      this.selectedCustomer = this.customerService.getCustomerById(Number(this.selectedCustomerId)) || null;
    } else {
      this.selectedCustomer = null;
    }
  }
  
  addNewItem(): void {
    this.invoiceItems.push({
      id: Date.now(),
      serialNo: this.nextSerialNo++,
      description: '',
      hsnSac: '',
      gstRate: 18,
      quantity: 1,
      rate: 0,
      amount: 0
    });
    this.calculateTotals();
  }
  
  deleteItem(index: number): void {
    this.invoiceItems.splice(index, 1);
    this.updateSerialNumbers();
    this.calculateTotals();
  }
  
  updateSerialNumbers(): void {
    this.invoiceItems.forEach((item, index) => {
      item.serialNo = index + 1;
    });
    this.nextSerialNo = this.invoiceItems.length + 1;
  }
  
  calculateItemAmount(item: InvoiceItem): void {
    item.amount = item.quantity * item.rate;
    this.calculateTotals();
  }
  
  // Calculated totals
  subtotal = 0;
  totalCgst = 0;
  totalSgst = 0;
  totalIgst = 0;
  grandTotal = 0;
  
  // Tax summary
  taxSummary: { [key: number]: { taxableAmount: number, tax: number } } = {};
  
  calculateTotals(): void {
    this.subtotal = 0;
    this.totalCgst = 0;
    this.totalSgst = 0;
    this.totalIgst = 0;
    
    // Reset tax summary
    this.taxSummary = {};
    this.gstRates.forEach(rate => {
      this.taxSummary[rate] = { taxableAmount: 0, tax: 0 };
    });
    
    this.invoiceItems.forEach(item => {
      this.subtotal += item.amount;
      
      // Update tax summary
      if (!this.taxSummary[item.gstRate]) {
        this.taxSummary[item.gstRate] = { taxableAmount: 0, tax: 0 };
      }
      this.taxSummary[item.gstRate].taxableAmount += item.amount;
      
      // Calculate tax based on whether it's IGST or CGST+SGST
      if (this.isSameState()) {
        // Same state: CGST + SGST
        const cgst = item.amount * (item.gstRate / 200);
        const sgst = cgst;
        this.totalCgst += cgst;
        this.totalSgst += sgst;
        this.taxSummary[item.gstRate].tax += cgst + sgst;
      } else {
        // Different state: IGST
        const igst = item.amount * (item.gstRate / 100);
        this.totalIgst += igst;
        this.taxSummary[item.gstRate].tax += igst;
      }
    });
    
    this.grandTotal = this.subtotal + this.totalCgst + this.totalSgst + this.totalIgst;
  }
  
  isSameState(): boolean {
    if (!this.selectedCustomer) return true;
    const companyStateCode = this.companyGstin.substring(0, 2);
    return companyStateCode === this.selectedCustomer.stateCode;
  }
  
  printInvoice(): void {
    window.print();
  }

  // Helper method to safely access tax summary data with default values
  getTaxSummaryValue(rate: number, property: 'taxableAmount' | 'tax'): number {
    return this.taxSummary[rate]?.[property] || 0;
  }
}
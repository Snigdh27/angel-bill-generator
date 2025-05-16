import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private customers: Customer[] = [
    {
      id: 1,
      name: 'ABC Industries',
      address: '123 Main Street, Mumbai, Maharashtra',
      gstin: '27AABCU9603R1ZP',
      state: 'Maharashtra',
      stateCode: '27'
    },
    {
      id: 2,
      name: 'XYZ Corporation',
      address: '456 Park Avenue, Delhi',
      gstin: '07AAACX1234Z1ZL',
      state: 'Delhi',
      stateCode: '07'
    },
    {
      id: 3,
      name: 'PQR Enterprises',
      address: '789 Lake Road, Bangalore, Karnataka',
      gstin: '29AAACP5678Q1ZM',
      state: 'Karnataka',
      stateCode: '29'
    }
  ];

  constructor() { }

  getCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(id: number): Customer | undefined {
    return this.customers.find(customer => customer.id === id);
  }
}

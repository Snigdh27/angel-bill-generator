import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-view-all-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-customers.component.html',
  styleUrl: './view-all-customers.component.css'
})


export class ViewAllCustomersComponent {

  customers_list: any[] = [];
  selected_customer : any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.customers_list = JSON.parse(localStorage.getItem("customer_list_data") ?? "[]");
    }

    console.log(this.customers_list);
  }

  open_delete_customer_modal(customer: any){
    this.selected_customer = customer;
    console.log(customer);
    // delete_customer
    // debugger
    // $('#exampleModal').modal({ backdrop: 'static', keyboard: false });

  }

  delete_customer() {
    if (!this.selected_customer) return;
    this.customers_list = this.customers_list.filter(
      (cust: any) => cust.name !== this.selected_customer.name
    );
  
    localStorage.setItem("customer_list_data", JSON.stringify(this.customers_list));
    this.selected_customer = null;
    this.toastr.success("Customer Created Successfully");

    // $('#exampleModal').modal('hide');
  }

  edit_customer(customer : any){
    this.router.navigate(['/add-customer'], { state: { customerData: customer } });

  }
  
}

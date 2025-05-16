import { CommonModule,Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  customer_form!: FormGroup;
  states: any = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ]

  isEditMode = false;
  oldCustomerName = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private location: Location
  ){}

  ngOnInit() {
    this.initialise_payload();
    const state = this.location.getState() as { customerData?: any };

    if (state?.customerData) {
      this.isEditMode = true;
      this.oldCustomerName = state.customerData.name;
      this.customer_form.patchValue(state.customerData);
    }
  }

  initialise_payload(){
    this.customer_form = this.fb.group({
      customer_type: ['Individual', Validators.required],
      name: ['', Validators.required],
      mobile_number: ['', [Validators.required]],
      email_address: [''],
      billing_address: ['', Validators.required],
      gstin_no: [''],
      state: ['', Validators.required],
      state_code: ['']
    });
  }

  validate_customer(){
    return this.customer_form.valid;
  }

  create_customer() {
    if (this.validate_customer()) {
      const formValue = this.customer_form.value;
      const existingList = JSON.parse(localStorage.getItem("customer_list_data") || "[]");

      if (this.isEditMode) {
        const updatedList = existingList.map((cust: any) =>
          cust.name === this.oldCustomerName ? formValue : cust
        );
        localStorage.setItem("customer_list_data", JSON.stringify(updatedList));
        this.toastr.success("Customer Updated Successfully");
      } else {
        existingList.push(formValue);
        localStorage.setItem("customer_list_data", JSON.stringify(existingList));
        this.toastr.success("Customer Created Successfully");
      }

      this.router.navigate(['/view-all-customers']);
    } else {
      this.toastr.error("Please fill all the required fields");
    }
  }
  
  
  addToLocalStorageList(key: string, newEntry: any) {
    const stored = localStorage.getItem(key);
    const existingList = stored ? JSON.parse(stored) : [];
    existingList.push(newEntry);
    localStorage.setItem(key, JSON.stringify(existingList));
  }
  
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.initialise_payload();
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
    console.log(this.customer_form);
    if(this.validate_customer()){
      this.addToLocalStorageList("customer_list_data", this.customer_form.value);
      this.customer_form.disable();
      this.toastr.success("Customer Created Successfully");
    } else{
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

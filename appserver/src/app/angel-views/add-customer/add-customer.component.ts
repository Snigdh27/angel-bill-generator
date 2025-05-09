import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  customer_form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.initialise_payload();
  }

  initialise_payload(){
    this.customer_form = this.fb.group({
      customer_type: ['Individual', Validators.required],
      name: ['', Validators.required],
      mobile_number: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email_address: ['', [Validators.required, Validators.email]],
      billing_address: ['', Validators.required],
      gstin_no: [''],
      state: ['', Validators.required],
      state_code: ['', Validators.required]
    });
  }

  create_customer() {
    console.log(this.customer_form.value);
    this.addToLocalStorageList("customer_list_data", this.customer_form.value);
    this.customer_form.disable();
  }
  
  addToLocalStorageList(key: string, newEntry: any) {
    const stored = localStorage.getItem(key);
    const existingList = stored ? JSON.parse(stored) : [];
    existingList.push(newEntry);
    localStorage.setItem(key, JSON.stringify(existingList));
  }
  
}

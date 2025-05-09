import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-view-all-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-customers.component.html',
  styleUrl: './view-all-customers.component.css'
})
export class ViewAllCustomersComponent {

  customers_list: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.customers_list = JSON.parse(localStorage.getItem("customer_list_data") ?? "[]");
    }

    console.log(this.customers_list);
  }
}

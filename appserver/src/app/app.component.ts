import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './angel-shared/sidebar/sidebar/sidebar.component';
import { DashboardComponent } from './angel-views/dashboard/dashboard.component';
import { NavbarComponent } from './angel-views/navbar/navbar.component';
import { AddCustomerComponent } from './angel-views/add-customer/add-customer.component';
import { ViewAllCustomersComponent } from './angel-views/view-all-customers/view-all-customers.component';
import { GenerateBillComponent } from './angel-views/generate-bill/generate-bill.component';
import { ViewAllBillsComponent } from './angel-views/view-all-bills/view-all-bills.component';
import { SendMailComponent } from './angel-views/send-mail/send-mail.component';
import { SendWhatsappComponent } from './angel-views/send-whatsapp/send-whatsapp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,SidebarComponent,DashboardComponent,NavbarComponent,AddCustomerComponent, ViewAllCustomersComponent, GenerateBillComponent, ViewAllBillsComponent, SendMailComponent, SendWhatsappComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appserver';
}

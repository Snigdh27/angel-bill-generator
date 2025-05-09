import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    private router: Router,
  ){

  }

  handle_sidebar_events(event: any){
    switch (event){
      case 'dashboard':
        this.router.navigate(['dashboard']);
        break;
      case 'add_customer':
        this.router.navigate(['add-customer']);
        break;
      case 'view_all_customers':
        this.router.navigate(['view-all-customers']);
        break;
      case 'generate_new_bill':
        this.router.navigate(['generate-bill']);
        break;
      case 'view_all_bills':
        this.router.navigate(['view-all-bills']);
        break;
      case 'send_mail':
        this.router.navigate(['send-mail']);
        break;
      case 'send_whatsapp':
        this.router.navigate(['send-whatsapp']);
        break;
    }
  }

}

import { Routes } from '@angular/router';
import { DashboardComponent } from './angel-views/dashboard/dashboard.component';
import { AddCustomerComponent } from './angel-views/add-customer/add-customer.component';
import { ViewAllCustomersComponent } from './angel-views/view-all-customers/view-all-customers.component';
import { GenerateBillComponent } from './angel-views/generate-bill/generate-bill.component';
import { ViewAllBillsComponent } from './angel-views/view-all-bills/view-all-bills.component';
import { SendMailComponent } from './angel-views/send-mail/send-mail.component';
import { SendWhatsappComponent } from './angel-views/send-whatsapp/send-whatsapp.component';

export const routes: Routes = [
    {
        path:'sidebar',
        loadChildren: () =>
            import('./angel-shared/sidebar/sidebar.module').then(m => m.SidebarModule),
    },
    {
        path:'dashboard',
        component: DashboardComponent
    },
    {
        path:'add-customer',
        component: AddCustomerComponent
    },
    {
        path:'view-all-customers',
        component: ViewAllCustomersComponent
    },
    {
        path: 'generate-bill',
        component: GenerateBillComponent
    },
    {
        path: 'view-all-bills',
        component: ViewAllBillsComponent
    },
    {
        path: 'send-mail',
        component: SendMailComponent
    },
    {
        path: 'send-whatsapp',
        component : SendWhatsappComponent
    }
];

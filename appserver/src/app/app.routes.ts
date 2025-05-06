import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'sidebar',
        loadChildren: () =>
            import('./angel-shared/sidebar/sidebar.module').then(m => m.SidebarModule),
    }
];

import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {
    // default landing route
    path: '',
    redirectTo: '/it',
    pathMatch: 'full',
  },
  { path: 'it', component: MainPageComponent, data: { language: 'it' } },
  { path: 'en', component: MainPageComponent, data: { language: 'en' } },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

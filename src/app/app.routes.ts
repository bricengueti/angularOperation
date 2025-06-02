import { Routes } from '@angular/router';
import { BaseComponent } from './core/layout/base/base.component';
import { AuthComponent } from './core/layout/auth/auth.component';
import { PageNotFoundComponent } from './module/base/page-not-found/page-not-found.component';
import { ProductComponent } from './core/layout/product/product.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    // canActivate: [DefaultEntitiesGuard],
    loadChildren: () => import('./core/routes/base-routing'),
    title:'base',
    data: { module: 'base' }
  },
  {
    path: 'product',
    component: ProductComponent,
    loadChildren: () => import('./core/routes/product-routing'),
    title:'product',
    data: { module: 'product' }
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./core/routes/auth-routing'),
    title:'auth',
    data: { module: 'auth' }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];



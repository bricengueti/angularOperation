import { Routes } from '@angular/router';
import { BaseComponent } from './core/layout/base/base.component';
import { AuthComponent } from './core/layout/auth/auth.component';
import { PageNotFoundComponent } from './module/base/page-not-found/page-not-found.component';
import { ProductComponent } from './core/layout/product/product.component';
import { authGuard } from './core/guard/auth.guard';
import { noAuthGuard } from './core/guard/no-auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    // canActivate: [DefaultEntitiesGuard],
    loadChildren: () => import('./core/routes/base-routing'),
    title:'base',
     canActivate: [authGuard],
    data: { module: 'base' }
  },
  {
    path: 'product',
    component: ProductComponent,
    loadChildren: () => import('./core/routes/product-routing'),
    title:'product',
     canActivate: [authGuard],
    data: { module: 'product' }
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./core/routes/auth-routing'),
    title:'auth',
    canActivate: [noAuthGuard],
    data: { module: 'auth' }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];



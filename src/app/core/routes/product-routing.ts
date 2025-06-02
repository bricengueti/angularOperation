import { Routes } from "@angular/router";
import { ProductSmartComponent } from "../../module/product/product-smart/product-smart.component";

export default [
 {
    path:'list',
    component:ProductSmartComponent
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  }
] as Routes;

import { Routes } from "@angular/router";
import { HomeComponent } from "../../module/base/home/home.component";

export default [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
] as Routes;

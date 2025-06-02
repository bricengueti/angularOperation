import { Routes } from "@angular/router";
import { LoginComponent } from "../../module/auth/login/login.component";
import { RegisterComponent } from "../../module/auth/register/register.component";

export default [
   {
      path:'login',
      component:LoginComponent
    },
     {
      path:'register',
      component:RegisterComponent
    },
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    }

] as Routes;

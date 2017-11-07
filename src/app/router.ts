import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    { path: '', redirectTo:'/register', pathMatch:'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dash', component: DashboardComponent }
  ];

  export const MyRoutingModule = RouterModule.forRoot(routes);
  
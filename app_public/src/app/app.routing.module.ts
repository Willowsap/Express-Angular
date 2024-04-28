import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CatComponent } from "./cat/cat.component";
import { AddCatComponent } from "./add-cat/add-cat.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { authGuard } from "./auth/auth.guard";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "addCat", component: AddCatComponent, canActivate: [authGuard]},
    {path: "cat/:id", component : CatComponent, canActivate: [authGuard]},
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export default class AppRoutingModule {}
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './pages/product/product.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { RingsComponent } from './pages/rings/rings.component';
import { NecklacesComponent } from './pages/necklaces/necklaces.component';
import { EarringsComponent } from './pages/earrings/earrings.component';
import { LuxurySetsComponent } from './pages/luxury-sets/luxury-sets.component';
import { ProfileComponent } from './pages/layout/profile/profile.component';



export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'layout',component:LayoutComponent,canActivate:[authGuard],
        children:[
             {path:'home',component:DashboardComponent},
               {path:'product/:id',component:ProductComponent},
               { path: 'products', component:ProductListComponent},
                {path:'cart',component:CartComponent},
                 {   path:'wishlist',component:WishlistComponent },
                 {path:'rings',component:RingsComponent},
                 {path:'necklaces',component:NecklacesComponent},
                 {path:'earrings',component:EarringsComponent},
                 {path:'luxury-sets',component:LuxurySetsComponent},
                 { path: 'profile', component: ProfileComponent }

        ]
    },

];

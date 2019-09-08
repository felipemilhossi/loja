import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MasterComponent } from './pages/master/master.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { EditorProductComponent } from './pages/product/editor-product/editor-product.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { ManagerGuard } from './guards/manager.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: MasterComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'product/:par', component: EditorProductComponent, canActivate: [ManagerGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

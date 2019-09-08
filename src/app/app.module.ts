import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MasterComponent } from './pages/master/master.component';
import { EditorProductComponent } from './pages/product/editor-product/editor-product.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { ManagerGuard } from './guards/manager.guard';
import { MaskDirective } from './directives/mask.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MasterComponent,
    EditorProductComponent,
    ProductListComponent,
    LoadingComponent,
    MaskDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticatedGuard,
    ManagerGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

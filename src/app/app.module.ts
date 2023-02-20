import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialUIModule } from 'src/app/material/materialui.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';

import { CartService } from 'src/app/services/cart/cart.service';
import { StoreService } from 'src/app/services/store/store.service';
import { ServicesModule } from 'src/app/services/services.module';
@NgModule({
  declarations: [AppComponent, HomeComponent, CartComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialUIModule,
    ComponentsModule,
    ServicesModule,
  ],
  providers: [CartService, StoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}

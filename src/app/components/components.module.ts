import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialUIModule } from 'src/app/material/materialui.module';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { HeaderProductsComponent } from 'src/app/components/header-products/header-products.component';
import { FiltersComponent } from 'src/app/components/filters/filters.component';
import { BoxProductComponent } from 'src/app/components/box-product/box-product.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderProductsComponent,
    FiltersComponent,
    BoxProductComponent,
  ],
  imports: [CommonModule, MaterialUIModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    HeaderProductsComponent,
    FiltersComponent,
    BoxProductComponent,
  ],
})
export class ComponentsModule {}

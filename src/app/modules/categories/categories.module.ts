import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category/category.component';
import { StateTypeComponent } from './state-type/state-type.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { FormsModule } from '@angular/forms';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    CategoryComponent,
    StateTypeComponent,
    BusinessUnitComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    FuseAlertModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  // providers:[{provide:MAT_DATE_LOCALE,useValue:'es  '}],
})
export class CategoriesModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { CategoryComponent } from './category/category.component';
import { StateTypeComponent } from './state-type/state-type.component';

const routes: Routes =[
  {
    path:'category',
    component:CategoryComponent
  },
  {
    path:'business_unit',
    component:BusinessUnitComponent
  },
  {
    path:'state_type',
    component:StateTypeComponent    
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

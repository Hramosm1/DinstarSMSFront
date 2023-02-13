import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { ListSMSComponent } from './list-sms/list-sms.component';

const routes: Routes = [
  {
    path:'',
    component: PagesComponent
  },
  {
    path:'processList',
    component: ListSMSComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileUploadRoutingModule { }

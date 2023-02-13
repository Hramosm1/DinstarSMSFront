import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import { PagesComponent } from './pages/pages.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FuseAlertModule } from '@fuse/components/alert';
import { FormsModule } from '@angular/forms';
import { ListSMSComponent } from './list-sms/list-sms.component';
import { DetailsProcessComponent } from './details-process/details-process.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import ProgressBarModule from 'angular-progress-bar/src/progress-bar.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    PagesComponent,
    ListSMSComponent,
    DetailsProcessComponent
  ],
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    NgxFileDropModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AutocompleteLibModule,
    FuseAlertModule,
    FormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule
  ],
  entryComponents:[DetailsProcessComponent],
  providers:[{provide:MAT_DATE_LOCALE,useValue:'es  '}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FileUploadModule { }

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileUploadService } from 'app/mock-api/apps/backend/fileUpload/fileUploadService';

export interface PeriodicElement {
  Telefono: string;
  Texto: string;
  Tipo_Estado: string;
}

export interface DialogElement {
  IdProceso: number
  ,Porcentaje: number
  ,NombreArchivo: string
}

@Component({
  selector: 'app-details-process',
  templateUrl: './details-process.component.html',
  styleUrls: ['./details-process.component.scss']
})

export class DetailsProcessComponent implements OnInit {
  public Id_proceso;
  public status;
  public carga 

  displayedColumns: string[] = ['Telefono'
                              , 'Texto'
                              , 'Tipo_Estado'];

  dataSource = new MatTableDataSource<PeriodicElement>();
  constructor(
    public dialogRef:MatDialogRef<DetailsProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogElement,
    private _liveAnnouncer: LiveAnnouncer,
    private _fileUpload : FileUploadService) { 
      this.Id_proceso = data.IdProceso
    }
  
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit(){
    this.carga = true
    //this.get_process_list()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.get_process_list()
  }

  // ngDoCheck(){
  //   this.get_process_list()
  // }


  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
        this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  get_process_list(){
     this._fileUpload.get_message_sending_by_process(this.Id_proceso).subscribe(
        response =>{
          console.log(response.request );
          
          this.dataSource.data = response.request.map((e: any) => ({
            Telefono: e.Telefono,
            Texto: e.Texto,
            Tipo_Estado: e.Tipo_Estado,
          }));
        },error =>{
            var erroMessage = <any>error;
            console.log(erroMessage);
            if (erroMessage != null) {
            this.status = 'error';
            }
        },() =>{
          this.carga = false;
        }
    )
  }
  // onClickNO():void{
  //   this.dialogRef.close();
  // }

}

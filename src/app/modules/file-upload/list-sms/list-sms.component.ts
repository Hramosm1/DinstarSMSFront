import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileUploadService } from 'app/mock-api/apps/backend/fileUpload/fileUploadService';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DetailsProcessComponent } from '../details-process/details-process.component';

export interface PeriodicElement {
  Id_Proceso: number;
  Nombre_Archivo: string;
  Cantidad_Elementos: string;
  porcentaje: number;
  Unidad_Negocio: string;
  Categoria: string;
  Tipo_Estado: string;
  Id_Tipo_Estado: number;
  Fecha_Inicio: string;
  Fecha_Finalizacion: string;
}



@Component({
  selector: 'app-list-sms',
  templateUrl: './list-sms.component.html',
  styles: ['table {width: 100%;text-align: center}'],
})

export class ListSMSComponent implements AfterViewInit,OnInit {
  public editmode;
  public status;
  subscription : Subscription;
  formFieldHelpers: string[] = [''];
  displayedColumns: string[] = ['Nombre_Archivo'
                              , 'Cantidad_Elementos'
                              , 'Porcentaje'
                              , 'Unidad_Negocio'
                              , 'Categoria'
                              , 'Tipo_Estado'
                              , 'Fecha_Inicio'
                              , 'Fecha_Finalizacion'
                              , 'Ejecutar_Proceso'];
                                            
  dataSource = new MatTableDataSource<PeriodicElement>();
  constructor(
     private _liveAnnouncer: LiveAnnouncer  
    ,private _fileUpload : FileUploadService
    ,public dialog: MatDialog
    ,private changeDetectorRefs:ChangeDetectorRef) { }

    openDialog(Id_Proceso, Porcentaje, Nombre_Archivo):void {
      const dialogRef = this.dialog.open(DetailsProcessComponent,{
        
        width:'1000px',
        data:{IdProceso:Id_Proceso,Porcentaje:Porcentaje,NombreArchivo:Nombre_Archivo}
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res){
          console.log('Delete file');
          
        }
      }); 
    } 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.get_process_list()
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
        this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getFormFieldHelpersAsString(): string {
      return this.formFieldHelpers.join(' ');
  }

  async get_process_list(){
    await this._fileUpload.process_list().subscribe(
        response =>{
          this.dataSource.data = response.request.map((e: any) => ({
            Id_Proceso: e.Id_Proceso,
            Nombre_Archivo: e.Nombre_Archivo,
            Cantidad_Elementos: e.Cantidad_Elementos,
            porcentaje: e.Porcentaje,
            Unidad_Negocio: e.Unidad_Negocio,
            Categoria: e.Categoria,
            Tipo_Estado: e.Tipo_Estado,
            Id_Tipo_Estado : e.Id_Tipo_Estado,
            Fecha_Inicio: e.Fecha_Inicio,
            Fecha_Finalizacion: e.Fecha_Finalizacion
          }));      
        },error =>{
            var erroMessage = <any>error;
            console.log(erroMessage);
            if (erroMessage != null) {
            this.status = 'error';
            }
        }
    )
  }

  async updateProcessList(params,tipoEstado){
    if (tipoEstado == 'PENDIENTE DE ENVIO' || tipoEstado == 'ENVIO PROGRAMADO' || tipoEstado == 'LISTO PARA ENVIO') {
      this.changeProcessList(params,4,'Envio de mensajes de texto','¿Desea comenzar el proceso de envio de mensajes sms?')
    }else if (tipoEstado == 'EN PROCESO'){
      this.changeProcessList(params,6,'Cancelación del proceso','¿Desea cancelar el proceso de envio de mensajes sms?')
      // this.editmode = false
    }
  }

  async changeProcessList(params,opcion,titulo,text){
    await this._fileUpload.update_process_list(params,opcion).subscribe(
      response =>{

        Swal.fire({
          title: titulo,
          text: text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ejecutar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed == true) {
            Swal.fire(
              'Cambio de estado',
              response.request[0].Mensaje,
              'success'
            )

            this.get_process_list()
          }
        })

      },error =>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
          this.status = 'error';
          }
      }
  )
    
  }

}
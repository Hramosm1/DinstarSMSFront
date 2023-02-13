import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogsService } from 'app/mock-api/apps/backend/catalogs/service';
import { TipoEstadoModelo } from 'app/mock-api/apps/backend/models/TipoEstado.Model';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  Id_Tipo_Estado: number;
  Descripcion: string;
  Estado: string;
  Fecha_Registro:string,
  Fecha_Modificacion:string
}

@Component({
  selector: 'app-state-type',
  templateUrl: './state-type.component.html',
  styleUrls: ['./state-type.component.scss']
})
export class StateTypeComponent implements AfterViewInit,OnInit {
  public status;
  public saveStateType: TipoEstadoModelo
  public idBoton = 0
  public IdTipoEstadoUpdate = 0;
  displayedColumns: string[] = ['Id_Tipo_Estado'
                                , 'Descripcion'
                                , 'Estado'
                                , 'Fecha_Registro'
                                , 'Fecha_Modificacion'
                                , 'Actualizar'
                                , 'Eliminar'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _catalogsService : CatalogsService,
  ) { 
    this.saveStateType = new TipoEstadoModelo("")
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.get_combo_state_type()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  get_combo_state_type() {
    this._catalogsService.get_combo_state_type().subscribe(
      response => {
        this.dataSource.data = response.requests.map((e: any) => ({
          Id_Tipo_Estado: e.Id_Tipo_Estado,
          Descripcion: e.Descripcion,
          Estado: e.Estado,
          Fecha_Registro: e.Fecha_Registro,
          Fecha_Modificacion: e.Fecha_Modificacion
        }));

      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  save_combo_state_type() {
    if (this.saveStateType.Descripcion == "") {
      this.showMessage("info", "Nombre del tipo de estado", "Debe de ingresar el nombre del estado para guardar la información")
    }
    else {
      // this.saveCategory.Descripcion = this.descripcionCategoria;
      Swal.fire({
        title: 'Creación Tipo de Estado',
        text: "¿Desea crear el estado?",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed == true) {
          this._catalogsService.save_combo_state_type(this.saveStateType).subscribe({
            next: n => {
              this.showMessage("success", "Se creo exitosamene", n.message)
              this.saveStateType.Descripcion = ""
              this.get_combo_state_type()

            }, // completeHandler
            error: (error) => {
              var erroMessage = error;
              this.showMessage("error", "Error", error)
              console.log(error);
            }
          });

        } else {
          this.saveStateType.Descripcion = ""
          this.get_combo_state_type()
        }
      })


    }

  }

  showMessage(icono, titulo, texto) {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
    });
  }

  delete_combo_state_type(Id_Tipo_Estado){
    Swal.fire({
      title: 'Eliminar Estado',
      text: "¿Desea eliminar el estado seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed == true) {
        this._catalogsService.delete_combo_state_type(Id_Tipo_Estado).subscribe({
          next: n => {
            this.showMessage("success", "Eliminación del tipo de estado", n.message)
            this.get_combo_state_type()

          }, // completeHandler
          error: (error) => {
            var erroMessage = error;
            this.showMessage("error", "Error", error)
            console.log(error);
          }
        });

      } else {
        this.get_combo_state_type()
      }
    })
    
  }

  update_combo_state_type(Id_Tipo_Estado,DescripcionTipoEstado){
    this.idBoton = 1;
    this.saveStateType.Descripcion = DescripcionTipoEstado
    this.IdTipoEstadoUpdate = Id_Tipo_Estado;
  }

  update_state_type(){
    if (this.IdTipoEstadoUpdate == 0) {
      this.showMessage("info","Actualización de datos","Debe de seleccionar es estado que se va ha actualizar")
    }else{
      Swal.fire({
        title: 'Actualización de Estado',
        text: "¿Desea actualizar el estado seleccionado?",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed == true) {
          this._catalogsService.update_combo_state_type(this.IdTipoEstadoUpdate,this.saveStateType).subscribe({
            next: n => {
              this.showMessage("success", "Estado actualizado", n.message)
              this.get_combo_state_type()
              this.idBoton = 0;
              this.IdTipoEstadoUpdate = 0;
              this.saveStateType.Descripcion = "";
            }, // completeHandler
            error: (error) => {
              var erroMessage = error;
              this.showMessage("error", "Error", error)
              console.log(error);
            }
          });
  
        } else {
          this.get_combo_state_type()
        }
      })
    }
  }
}

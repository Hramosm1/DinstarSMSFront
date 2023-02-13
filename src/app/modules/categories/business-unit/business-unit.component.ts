import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogsService } from 'app/mock-api/apps/backend/catalogs/service';
import { UnidadNegocio } from 'app/mock-api/apps/backend/models/Unidad_Negocio.Model';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  Id_Unidad_Negocio: number;
  Nombre: string;
  NombreCorto: string;
  Estado: string;
  Fecha_Registro:string,
  Fecha_Modificacion:string
}

@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit.component.html',
  styleUrls: ['./business-unit.component.scss']
})
export class BusinessUnitComponent implements AfterViewInit,OnInit {
  public status;
  public saveStateUnit: UnidadNegocio
  public idBoton = 0
  public IdUnidadNegocioUpdate = 0;
  displayedColumns: string[] = ['Id_Unidad_Negocio'
                                , 'Nombre'
                                , 'NombreCorto'
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
    this.saveStateUnit = new UnidadNegocio("","")
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.get_combo_business_unit();
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

  get_combo_business_unit() {
    this._catalogsService.get_combo_business_unit().subscribe(
      response => {
        this.dataSource.data = response.requests.map((e: any) => ({
          Id_Unidad_Negocio: e.Id_Unidad_Negocio,
          Nombre: e.Nombre,
          NombreCorto: e.NombreCorto,
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

  save_combo_business_unit() {
    if (this.saveStateUnit.Nombre == "") {
      this.showMessage("info", "Nombre de la unidad de negocio", "Debe de ingresar el nombre de la unidad de negocio para guardar la información")
    }else if(this.saveStateUnit.NombreCorto == ""){
      this.showMessage("info", "Nombre Corto de la unidad de negocio", "Debe de ingresar el nombre corto de la unidad de negocio para guardar la información")
    }else {
      // this.saveCategory.Descripcion = this.descripcionCategoria;
      Swal.fire({
        title: 'Creación unidad de negocio',
        text: "¿Desea crear la unidad de negocio?",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed == true) {
          this._catalogsService.save_combo_business_unit(this.saveStateUnit).subscribe({
            next: n => {
              this.showMessage("success", "Se creo exitosamene", n.message)
              this.saveStateUnit.Nombre = ""
              this.saveStateUnit.NombreCorto = ""
              this.get_combo_business_unit()

            }, // completeHandler
            error: (error) => {
              var erroMessage = error;
              this.showMessage("error", "Error", error)
              console.log(error);
            }
          });

        } else {
          this.saveStateUnit.Nombre = ""
          this.saveStateUnit.NombreCorto = ""
          this.get_combo_business_unit()
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

  delete_combo_business_unit(Id_Unidad_Negocio){
    Swal.fire({
      title: 'Eliminar unidad de negocio',
      text: "¿Desea eliminar la unidad de negocio seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed == true) {
        this._catalogsService.delete_combo_business_unit(Id_Unidad_Negocio).subscribe({
          next: n => {
            this.showMessage("success", "Eliminación de unidad de negocio", n.message)
            this.get_combo_business_unit()

          }, // completeHandler
          error: (error) => {
            var erroMessage = error;
            this.showMessage("error", "Error", error)
            console.log(error);
          }
        });

      } else {
        this.get_combo_business_unit()
      }
    })
    
  }

  update_combo_category(Id_Unidad_Negocio,Nombre,NombreCorto){
    this.idBoton = 1;
    this.saveStateUnit.Nombre = Nombre;
    this.saveStateUnit.NombreCorto = NombreCorto;
    this.IdUnidadNegocioUpdate = Id_Unidad_Negocio;
  }

  update_Category(){
    if (this.IdUnidadNegocioUpdate == 0) {
      this.showMessage("info","Actualización de datos","Debe de seleccionar la unidad de negocio que se va ha actualizar")
    }else{
      Swal.fire({
        title: 'Actualizar unidad de negocio',
        text: "¿Desea actualizar la unidad de negocio seleccionada?",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed == true) {
          this._catalogsService.update_combo_business_unit(this.IdUnidadNegocioUpdate,this.saveStateUnit).subscribe({
            next: n => {
              this.showMessage("success", "Unidad de negocio actualizada", n.message)
              this.get_combo_business_unit()
              this.idBoton = 0;
              this.IdUnidadNegocioUpdate = 0;
              this.saveStateUnit.Nombre = "";
              this.saveStateUnit.NombreCorto = "";
            }, // completeHandler
            error: (error) => {
              var erroMessage = error;
              this.showMessage("error", "Error", error)
              console.log(error);
            }
          });
  
        } else {
          this.get_combo_business_unit()
        }
      })
    }
  }
}

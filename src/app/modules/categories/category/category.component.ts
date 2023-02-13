import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogsService } from 'app/mock-api/apps/backend/catalogs/service';
import { CategoriaModelo } from 'app/mock-api/apps/backend/models/Categoria.Model';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  Id_Categoria: number;
  Descripcion: string;
  Estado: string;
  Fecha_Registro:string,
  Fecha_Modificacion:string
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements AfterViewInit,OnInit {
  public status;
  public saveCategory: CategoriaModelo
  public idBoton = 0
  public IdCategoriaUpdate = 0;
  displayedColumns: string[] = ['Id_Categoria'
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
    this.saveCategory = new CategoriaModelo("")
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.get_combo_category()
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

  get_combo_category() {
    this._catalogsService.get_combo_category().subscribe(
      response => {
        this.dataSource.data = response.requests.map((e: any) => ({
          Id_Categoria: e.Id_Categoria,
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

  save_combo_category() {
    if (this.saveCategory.Descripcion == "") {
      this.showMessage("info", "Nombre de la categoria", "Debe de ingresar el nombre de la categoria para guardar la información")
    }
    else {
      // this.saveCategory.Descripcion = this.descripcionCategoria;
      Swal.fire({
        title: 'Creación de categoria',
        text: "¿Desea crear la categoria?",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed == true) {
          this._catalogsService.save_combo_category(this.saveCategory).subscribe({
            next: n => {
              this.showMessage("success", "Se creo exitosamene", n.message)
              this.saveCategory.Descripcion = ""
              this.get_combo_category()

            }, // completeHandler
            error: (error) => {
              var erroMessage = error;
              this.showMessage("error", "Error", error)
              console.log(error);
            }
          });

        } else {
          this.saveCategory.Descripcion = ""
          this.get_combo_category()
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

  delete_combo_category(Id_Categoria){
    Swal.fire({
      title: 'Eliminar Categoria',
      text: "¿Desea eliminar la categoria seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed == true) {
        this._catalogsService.delete_combo_category(Id_Categoria).subscribe({
          next: n => {
            this.showMessage("success", "Eliminación de categoria", n.message)
            this.get_combo_category()

          }, // completeHandler
          error: (error) => {
            var erroMessage = error;
            this.showMessage("error", "Error", error)
            console.log(error);
          }
        });

      } else {
        this.get_combo_category()
      }
    })
    
  }

  update_combo_category(Id_Categoria,DescripcionCategoria){
    this.idBoton = 1;
    this.saveCategory.Descripcion = DescripcionCategoria
    this.IdCategoriaUpdate = Id_Categoria;
  }

  update_Category(){
    if (this.IdCategoriaUpdate == 0) {
      this.showMessage("info","Actualización de datos","Debe de seleccionar la categoria que se va ha actualizar")
    }else{
      Swal.fire({
        title: 'Actualizar Categoria',
        text: "¿Desea actualizar la categoria seleccionada?",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed == true) {
          this._catalogsService.update_combo_category(this.IdCategoriaUpdate,this.saveCategory).subscribe({
            next: n => {
              this.showMessage("success", "Categoria actualizada", n.message)
              this.get_combo_category()
              this.idBoton = 0;
              this.IdCategoriaUpdate = 0;
              this.saveCategory.Descripcion = "";
            }, // completeHandler
            error: (error) => {
              var erroMessage = error;
              this.showMessage("error", "Error", error)
              console.log(error);
            }
          });
  
        } else {
          this.get_combo_category()
        }
      })
    }
  }

}

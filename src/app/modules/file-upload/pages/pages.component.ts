import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {NgxFileDropEntry,FileSystemFileEntry,FileSystemDirectoryEntry,} from 'ngx-file-drop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment'
import { CatalogsService } from 'app/mock-api/apps/backend/catalogs/service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
import { FileUploadService } from 'app/mock-api/apps/backend/fileUpload/fileUploadService';
import { DinstarSMS } from 'app/mock-api/apps/backend/models/DinstarSMS.model';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

export interface PeriodicElement {
  Telefono: string;
  Mensaje: string;
}

export interface SmsDinstarElement {
    Telefono: string;
    Texto: string;
    Id_Proceso_Datos: number
}

export interface FileInformationElement {
    nombre_archivo: string;
    path: string;
    cant: number;
    id_unidad_negocio: number;
    id_categoria: number;
    id_tipo_estado: number;
    fecha_inicio: string;
    fecha_finalizacion: string;
}


@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styles: ['table {width: 100%}'],
})
export class PagesComponent implements AfterViewInit,OnInit {
    public comboBusinessUnit;
    public idComboBusinessUnit = 0;
    public comboCategory;
    public idComboCategory = 0;
    public comboStateType;
    public idComboStateType = 0;
    public status;
    public nombre_archivo = null;
    public cantElements = 0;
    public fechaInicio = null;    
    public fechaFinal = null;
    public SmsDinstarElement: DinstarSMS
    private fileTmp:any;
    public showSpinner = false;
    public showForm = true;
    public loading = false;
    public cantData:number
    // nombreBroadcast = new FormControl('', [Validators.required, Validators.nombreBroadcast]);
    keyword = 'Descripcion';
    formFieldHelpers: string[] = [''];
    displayedColumns: string[] = ['Telefono', 'Mensaje'];
    dataSource = new MatTableDataSource<PeriodicElement>();
    supportForm :FormGroup;
    FileInformation: FileInformationElement[] = []

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private _catalogsService : CatalogsService,
        private _fileUpload : FileUploadService,
        private spinner: NgxSpinnerService,
        private _router: Router
    ) {
        this.SmsDinstarElement = new DinstarSMS('','',0)
    }
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    ngOnInit() {
        this.getComboBusinessUnit();
        this.getComboCategory();
        this.getComboStateType();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public files: NgxFileDropEntry[] = [];

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


    //#region Drag and drop file
    public dropped(files: NgxFileDropEntry[]) {
      
        this.files = files;
        for (const droppedFile of files) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    let tipoArchivo = file.name;
                    let formato = tipoArchivo.slice(-5);

                    //Validar que el formato sea .xlsx
                    if (formato == '.xlsx') {
                        const reader: FileReader = new FileReader();
                        reader.onload = (e: any) => {
                            const bstr: string = e.target.result;

                            //Lectura del archivo excel
                            
                            const wb: XLSX.WorkSheet = XLSX.read(bstr, {type: 'binary', });
                            let nombreHoja = wb.SheetNames; // regresa un array
                            let headerName;
                            let datos;

                            if (nombreHoja[0] == 'Hoja1') {
                                for (let i = 0; i < nombreHoja.length; i++) {

                                    datos = XLSX.utils.sheet_to_json(
                                        wb.Sheets[nombreHoja[i]],{ raw: true, defval: 'null' });
                                    headerName = Object.keys(datos[0])
                                }
 
                                if (headerName[0] == "TELEFONO" || headerName[1] == "MENSAJE") {
                                    
                                    this.dataSource.data = datos.map((e: any) => ({  
                                        Telefono: e.TELEFONO,
                                        Mensaje: e.MENSAJE,
                                    }));

                                    this.cantData = datos.length
                                            
                                    this.fileTmp = {
                                        fileRaw:file,
                                        fileName:file.name
                                    }
                                }else{
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Nombre de cabeceras',
                                        text: 'El encabezado del archivo excel, debe de contener el nombre de las columnas TELEFONO y MENSAJE todo en letras mayusculas',
                                    });
                                }
  
                            }else{
                                Swal.fire({
                                    icon: 'info',
                                    title: 'Nombre de hoja',
                                    text: 'El nombre de la hoja debe de ser Hoja1',
                                });
                            }  
                        };
                        reader.readAsBinaryString(file);
                    } else {
                        Swal.fire({
                            icon: 'info',
                            title: 'Formato del archivo',
                            text: 'El formato del archivo para realizar el proceso debe de ser .xlsx',
                        });
                    }
                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry =
                    droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }

    public fileOver(event) {
        console.log(event);
    }

    public fileLeave(event) {
        console.log(event);
    }
    //#endregion
    //#region combo autocomplete and dates
    async getComboBusinessUnit(){
        await this._catalogsService.comboUnidadNegocio().subscribe(
            response =>{
                this.comboBusinessUnit = response.requests;
            },error =>{
                var erroMessage = <any>error;
                console.log(erroMessage);
                if (erroMessage != null) {
                this.status = 'error';
                }
            }
        )
    }

    async selectBusinessUnit(params){
        this.idComboBusinessUnit = params.Id_Unidad_Negocio;    
    }

    getComboCategory(){
         this._catalogsService.comboCategoria().subscribe(
            response =>{
                this.comboCategory = response.requests;
            },error =>{
                var erroMessage = <any>error;
                console.log(erroMessage);
                if (erroMessage != null) {
                this.status = 'error';
                }
            }
        )
    }

    async selectCategory(params){
        this.idComboCategory = params.Id_Categoria   
    }

    async getComboStateType(){
        await this._catalogsService.comboTipoEstado().subscribe(
            response =>{
                this.comboStateType = response.requests;
            },error =>{
                var erroMessage = <any>error;
                console.log(erroMessage);
                if (erroMessage != null) {
                this.status = 'error';
                }
            }
        )
    }

    async selectStateType(params){
        this.idComboStateType = params.Id_Tipo_Estado
    }

    getEndDate(params){
        this.fechaFinal =  moment(params.target.value).format('DD/MM/YYYY')
    }

    getStartDate(params){
        this.fechaInicio =  moment(params.target.value).format('DD/MM/YYYY')
    }
    //#endregion

    async saveUploadFile(){
        if (this.idComboBusinessUnit == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Combo unidad de negocio',
                text: 'Debe de seleccionar la unidad de negocio',
            });
        } else if(this.idComboCategory == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Combo categoria',
                text: 'Debe de seleccionar la categoria',
            });
        } else if(this.idComboStateType == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Combo tipo de estado',
                text: 'Debe de seleccionar el tipo de estado',
            });
        } else if(this.nombre_archivo == null) {
            Swal.fire({
                icon: 'info',
                title: 'Nombre de broadcast',
                text: 'Debe de ingresar el nombre del broadcast',
            });
        
        }else{
            if (this.idComboStateType == 3) {
                if(this.fechaInicio == null) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Fecha de inicio del proceso',
                        text: 'Debe de seleccionar o ingresar la fecha de inicio del proceso',
                    });
                }else if(this.fechaFinal == null) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Fecha fin del proceso',
                        text: 'Debe de seleccionar o ingresar la fecha fin del proceso',
                    });
                }else{
                    this.methodSaveFila();
                }
            }else{
                this.methodSaveFila();
            }
           
        }
    }

    async methodSaveFila(){
        const a1: FileInformationElement = {
            nombre_archivo: this.nombre_archivo,
            path: 'prueba del path',
            cant:  this.cantElements,
            id_unidad_negocio: this.idComboBusinessUnit,
            id_categoria: this.idComboCategory,
            id_tipo_estado: this.idComboStateType,
            fecha_inicio: this.fechaInicio,
            fecha_finalizacion: this.fechaFinal,
        };

        let total:number
        total = this.cantData * 20
        const body = new FormData()

        if (this.fileTmp == undefined) {
            Swal.fire({
                icon: 'info',
                title: 'Selección de archivo',
                text: 'Debe seleccionar el archivo en formato .xlsx para procesar y obtener la información de mensajería',
            })
            
        }else{
            // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/uploadFile';

            //     // Navigate to the redirect url
            //     this._router.navigateByUrl(redirectURL);
                // this._router.navigate(['/uploadFile'])
            setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
                this._router.navigate(['/uploadFile/processList'])
                

              }, total);


            body.append('myFile',this.fileTmp.fileRaw)
            body.append('params_nombre_archivo',a1.nombre_archivo)
            body.append('params_id_unidad_negocio',a1.id_unidad_negocio.toString())
            body.append('params_id_categoria',a1.id_categoria.toString())
            body.append('params_id_tipo_estado',a1.id_tipo_estado.toString())
            body.append('params_fecha_inicio',a1.fecha_inicio)
            body.append('params_fecha_finalizacion',a1.fecha_finalizacion)
            this.spinner.show();
            this._fileUpload.uploadFile(body).subscribe(
                res => 
                console.log(res.message)
                 
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Creación de proceso exitoso',
                //     text: 'Se ha creado exitosamente el proceso de datos',
                // })
                
            )
            
        }
    }
}

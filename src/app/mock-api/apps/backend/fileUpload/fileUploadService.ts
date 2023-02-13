import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "../service/global";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable({
    providedIn: 'root'
})

export class FileUploadService {
    // private _refresh$ = new Subject<void>()
    public headers = new HttpHeaders().set('Content-Type', 'application/json');
    public url: String;

    constructor(public _http:HttpClient) { 
        this.url = GLOBAL.backendDesarrollo;
    }


    //UPLOAD FILE
    uploadFile(body:FormData):Observable<any>{
        return this._http.post(this.url + 'fileUpload/upload',body)
    }
    //LISTA DE PROCESOS
    process_list():Observable<any>{
        return this._http.get(this.url + 'fileUpload/process_list',{headers:this.headers});
    }
    //EJECUTAR EL PROCESO SELECCIONADO
    update_process_list(Id_Proceso_Datos,Opcion):Observable<any>{
        return this._http.get(this.url + 'fileUpload/update_process_list/'+Id_Proceso_Datos+'/'+Opcion,{headers:this.headers});
    }
    //OBTENER EL LISTADO DE MENSAJES ENVIADOS POR PROCESO
    get_message_sending_by_process(Id_Proceso_Datos):Observable<any>{
        return this._http.get(this.url + 'fileUpload/get_message_sending_by_process/'+Id_Proceso_Datos,{headers:this.headers});
    }
}
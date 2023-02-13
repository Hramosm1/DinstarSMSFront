import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "../service/global";
import { Observable } from "rxjs";
import { CategoriaModelo } from "../models/Categoria.Model";
import { TipoEstadoModelo } from "../models/TipoEstado.Model";
import { UnidadNegocio } from "../models/Unidad_Negocio.Model";

@Injectable({
    providedIn: 'root'
})

export class CatalogsService {
    public headers = new HttpHeaders().set('Content-Type', 'application/json');
    public url: String;

    constructor(public _http:HttpClient) { 
        this.url = GLOBAL.backendDesarrollo;
    }

    //Catalogos de servicio upload file
    comboCategoria():Observable<any>{
        return this._http.get(this.url + 'catalogs/get_file_category',{headers:this.headers});
    }

    comboTipoEstado():Observable<any>{
        return this._http.get(this.url + 'catalogs/get_file_TipoEstado',{headers:this.headers});
    }

    comboUnidadNegocio():Observable<any>{
        return this._http.get(this.url + 'catalogs/get_file_unidadNegocio',{headers:this.headers});
    }
    //API POST
    save_combo_category(categoria:CategoriaModelo):Observable<any>{
        let params = JSON.stringify(categoria);
        return this._http.post(this.url + 'catalogs/save_combo_category',params,{headers:this.headers});
    }
    save_combo_business_unit(unidadNegocio:UnidadNegocio):Observable<any>{
        let params = JSON.stringify(unidadNegocio);
        return this._http.post(this.url + 'catalogs/save_combo_business_unit',params,{headers:this.headers});
    }
    save_combo_state_type(tipoEstado:TipoEstadoModelo):Observable<any>{
        let params = JSON.stringify(tipoEstado);
        return this._http.post(this.url + 'catalogs/save_combo_state_type',params,{headers:this.headers});
    }
    //API GET 
    get_combo_category():Observable<any>{
        return this._http.get(this.url + 'catalogs/get_combo_category',{headers:this.headers});
    }
    get_combo_state_type():Observable<any>{
        return this._http.get(this.url + 'catalogs/get_combo_state_type',{headers:this.headers});
    }
    get_combo_business_unit():Observable<any>{
        return this._http.get(this.url + 'catalogs/get_combo_business_unit',{headers:this.headers});
    }
    //API DELETE
    delete_combo_category(id):Observable<any>{
        return this._http.get(this.url + 'catalogs/delete_combo_category/'+id,{headers:this.headers});
    }
    delete_combo_state_type(id):Observable<any>{
        return this._http.get(this.url + 'catalogs/delete_combo_state_type/'+id,{headers:this.headers});
    }
    delete_combo_business_unit(id):Observable<any>{
        return this._http.get(this.url + 'catalogs/delete_combo_business_unit/'+id,{headers:this.headers});
    }
    //API UPDATE
    update_combo_category(id,categoria:CategoriaModelo):Observable<any>{
        let params = JSON.stringify(categoria);
        return this._http.post(this.url + 'catalogs/update_combo_category/'+id,params,{headers:this.headers});
    }
    update_combo_state_type(id,tipoEstado:TipoEstadoModelo):Observable<any>{
        let params = JSON.stringify(tipoEstado);
        return this._http.post(this.url + 'catalogs/update_combo_state_type/'+id,params,{headers:this.headers});
    }
    update_combo_business_unit(id,unidadNegocio:UnidadNegocio):Observable<any>{
        let params = JSON.stringify(unidadNegocio);
        return this._http.post(this.url + 'catalogs/update_combo_business_unit/'+id,params,{headers:this.headers});
    }

}
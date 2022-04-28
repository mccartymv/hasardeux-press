import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { List } from './list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private localhost = 'http://127.0.0.1:7575/api';
  private saveProductUrl = this.localhost + '/saveProduct';
  private deleteProductUrl = this.localhost + '/deleteProduct';
  private bufferToStageUrl = this.localhost + '/bufferToStage';

  saveProduct(obj): Observable<object> {
    return this.http.post(this.saveProductUrl, obj, this.httpOptions);
  }

  deleteProduct(obj): Observable<object> {
    return this.http.post(this.deleteProductUrl, obj, this.httpOptions);
  }

  bufferToStage(obj): Observable<object> {
    return this.http.post(this.bufferToStageUrl, obj, this.httpOptions);
  }


  constructor(
    private http: HttpClient
  ) { }

}

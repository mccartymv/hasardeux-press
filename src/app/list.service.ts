import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { List } from './list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private localhost = 'http://127.0.0.1:7575/api';
  private listsApiUrl = this.localhost + '/get-lists';
  private scrapeApiUrl = this.localhost + '/scrape-list-items';
  private scrapeTemplateApiUrl = this.localhost + '/get-scrape-templates';
  private newListApiUrl = this.localhost + '/new-list';
  private updateListContentsUrl = this.localhost + '/update-list';

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listsApiUrl)
      .pipe(
        catchError(this.handleError<List[]>('getLists', []))
      );
  }


  scrapeInputUrl(obj): Observable<object> {
    return this.http.post(this.scrapeApiUrl, obj, this.httpOptions).pipe();
  }

  getScrapeTemplates(): Observable<any> {
    return this.http.get<any>(this.scrapeTemplateApiUrl).pipe();
  }

  createList(obj): Observable<object> {
    return this.http.post(this.newListApiUrl, obj, this.httpOptions);
  }

  updateListContents(obj): Observable<object> {
    return this.http.post(this.updateListContentsUrl, obj, this.httpOptions);

  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


constructor(
  private http: HttpClient
) { }

}

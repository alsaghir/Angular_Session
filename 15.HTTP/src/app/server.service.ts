import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Server } from './server.model';

@Injectable()
export class ServerService {

  observablesForUpdate: Observable<Server>[] = [];

  constructor(private httpClient: HttpClient) {}

  /** 6
   *
   * Update the existing servers or insert if not exist using PUT http method
   * Note that to use this method with angular-in-memory-web-api the data must be one row
   * or object at a time with id property by default
   *
   * With firebase, you might submit the full array and data will be replaced accordingly
   * Totally depending on server implementation and response
   *
   */
  storeServers(servers: Server[]) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    for (const server of servers) {
      this.observablesForUpdate.push(this.httpClient.put<Server>('api/data.json', server, httpOptions));
    }
    return this.observablesForUpdate;
  }

  // firebase
  storeServers1(servers: Server[]) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.put('https://ng-backend-f02a1.firebaseio.com/data.json', servers, httpOptions);
  }


  /** 3
   * Get data from the simulation server using defult uri pattern any/any will return collection
   * NOTE >> No type specified
   */

  getServers_noType() {
    return this.httpClient.get('api/data.json');
  }

  /** 4
   * FireBase > Same as 3 but from real backend and no type specified as well !!!
   * RENAME TO USE & DELETE import HttpClientInMemoryWebApiModule from app module
   */
  getServers1_noType() {
    return this.httpClient.get('https://ng-backend-f02a1.firebaseio.com/data.json');
  }

  /** 5
   * Strong typing using Server model
   * All HttpClient methods return an RxJS Observable of something. HTTP is a request/response protocol.
   * You make a request, it returns a single response. In general, an Observable can return multiple values over time.
   * An Observable from HttpClient always emits a single value and then completes, never to emit again.
   * This particular HttpClient.get call returns an Observable<Server[]>, literally "an observable of Server arrays".
   * In practice, it will only return a single hero array.
   *
   * All observables returned from HttpClient methods are cold by design.
   * Execution of the HTTP request is deferred, allowing you to extend the observable with additional operations such as tap and catchError
   * before anything actually happens.
   * Calling subscribe(...) triggers execution of the observable and causes HttpClient to compose and send the HTTP request to the server.
   * You can think of these observables as blueprints for actual HTTP requests.
   *
   * pipe(operations: ...*): Used to stitch together functional operators into a chain.
   *
   * map(project: function(value: T, index: number): R, thisArg: any): Applies a given project function to each
   * value emitted by the source Observable, and emits the resulting values as an Observable.
   *
   * tap(nextOrObserver: Observer | function, error: function, complete: function): Observable
   * Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.
   *
   * catchError(selector: function): Observable
   * Catches errors on the observable to be handled by returning a new observable or throwing an error.
   */
  getServers() {
    return this.httpClient.get<Server[]>('api/data.json')
    .pipe(
      map((response: Server[], index: number) => {
        console.log('Inside map of get request');
        console.log('Inside map of get request' + response);
        console.log('Inside map of get request');
        console.log('Inside map of get request' + index);
        for (const server of response) {
          server.name = 'FETCHED_' + server.name;
        }
        return response;
      }),
      tap(servers => {console.log('Inside tap of get request'); console.log(servers); }),
      // map(servers => servers.slice(0, 2)),
      retry(3),
      tap(servers => {console.log('Inside tap of get request'); console.log(servers); }),
      catchError( (error, servers) => { console.error('Inside catchError of get request'); console.error(error);  return servers })
    );
  }

  getServers2() {
    return this.httpClient.get<Server[]>('https://ng-backend-f02a1.firebaseio.com/data.json').pipe(
      tap(servers => {console.log(servers); }),
      // map(servers => servers.slice(0, 2)),
      retry(3),
      tap(servers => {console.log(servers); }),
      catchError( (error, servers) => { console.error(error); return servers })
    );
  }

  getAppName() {
    return this.httpClient.get('api/appName')
    .pipe(
      map(response => response)
    );
  }

  getAppName2() {
    return this.httpClient.get('https://udemy-ng-http.firebaseio.com/appName.json')
    .pipe(
      map(response => response)
    );
  }
}

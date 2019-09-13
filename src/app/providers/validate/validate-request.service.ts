import { Injectable, OnInit } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import { GenericUtil } from '../../util/GenericUtil';
import { Storage } from '@ionic/storage';
import { tap} from 'rxjs/operators';
import { from } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ValidateRequestService extends GenericUtil implements HttpInterceptor {
  
  public token:any;
  constructor(public router:Router, public db:Storage, private auth:AuthenticationService) {
    super();
   }


   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const token = localStorage.getItem('votabrasil:token');
    
      if (token) {
        request = request.clone({
          setHeaders: {
            'Authorization': token
          }
        });
      }
    
      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          }
        });
      }
    
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
    
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // console.log("Erro valiade",error);
            this.auth.logout();
            this.router.navigate(['/login'])
          }
          return throwError(error);
        }));
    }
}
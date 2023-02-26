import {HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'https://jku-vds-lab.at/pinocchio/assets/default.csv';

  constructor(private http: HttpClient) { }

  getPosts() {
    console.log("########")
    return this.http.get(this.url, { responseType: 'text' });
  }

}
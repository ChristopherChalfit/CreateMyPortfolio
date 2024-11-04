import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.linkServer;

  constructor(private http: HttpClient) { }

  getData(url:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${url}`);
  }

  postData(url:string, data:string): Observable<any>{
    return this.http.post(`${this.apiUrl}/${url}`,data);
  }
  getDataWithToken(url:string): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${url}`, { headers });
  }
  postDataWithToken(url:string, data: string): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${url}`,data, { headers });
  }
  
}

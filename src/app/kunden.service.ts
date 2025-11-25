import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KundenService {
  
  private apiUrl = 'http://localhost:8090/api/kunden';

  constructor(private http: HttpClient) {}

  getKunden(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

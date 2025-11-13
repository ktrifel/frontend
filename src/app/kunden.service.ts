import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kunde } from './kunde.model';

@Injectable({
  providedIn: 'root'
})
export class KundenService {

  private readonly baseUrl = 'http://localhost:8090/api/kunden';

  constructor(private readonly http: HttpClient) {}

  getKunden(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>(this.baseUrl);
  }

  getKunde(id: number): Observable<Kunde> {
    return this.http.get<Kunde>(`${this.baseUrl}/${id}`);
  }

  createKunde(kunde: Kunde): Observable<Kunde> {
    return this.http.post<Kunde>(this.baseUrl, kunde);
  }

  updateKunde(id: number, kunde: Kunde): Observable<Kunde> {
    return this.http.put<Kunde>(`${this.baseUrl}/${id}`, kunde);
  }

  deleteKunde(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

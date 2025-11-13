import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Adresse {
  adresseId?: number;
  strasse: string;
  hausnummer: string;
  plz: string;
  stadt: string;
  land: string;
}

export interface Kunde {
  kundenId?: number;
  vorname: string;
  nachname: string;
  firma?: string;
  geburtsdatum?: string;
  email?: string;
  telefonnummer?: string;
  adresse: Adresse;
}

@Injectable({ providedIn: 'root' })
export class KundenService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  list(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>(this.baseUrl);
  }

  get(id: number): Observable<Kunde> {
    return this.http.get<Kunde>(`${this.baseUrl}/${id}`);
  }

  create(kunde: Kunde): Observable<Kunde> {
    return this.http.post<Kunde>(this.baseUrl, kunde);
  }

  update(id: number, kunde: Kunde): Observable<Kunde> {
    return this.http.put<Kunde>(`${this.baseUrl}/${id}`, kunde);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  geburtsdatum?: string; // ISO-String
  email?: string;
  telefonnummer?: string;
  adresse?: Adresse;
}

@Injectable({
  providedIn: 'root'
})
export class KundenService {
  // ⚠️ Hier spricht das Frontend mit deinem Spring-Backend
  private readonly baseUrl = 'http://localhost:8090/api/kunden';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>(this.baseUrl);
  }
}

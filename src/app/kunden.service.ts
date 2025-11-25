import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kunde } from './kunde.model';

@Injectable({
  providedIn: 'root'
})
export class KundenService {
  // use relative path so the dev-server proxy (proxy.conf.json) can forward requests to backend
  readonly apiUrl = '/api/kunden';

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>(this.apiUrl);
  }

  create(kunde: Kunde): Observable<Kunde> {
    return this.http.post<Kunde>(this.apiUrl, kunde);
  }

  update(kundenId: number | undefined, kunde: Kunde): Observable<Kunde> {
    if (kundenId == null) throw new Error('kundenId is required for update');
    return this.http.put<Kunde>(`${this.apiUrl}/${kundenId}`, kunde);
  }

  delete(kundenId: number | undefined): Observable<void> {
    if (kundenId == null) throw new Error('kundenId is required for delete');
    return this.http.delete<void>(`${this.apiUrl}/${kundenId}`);
  }
}

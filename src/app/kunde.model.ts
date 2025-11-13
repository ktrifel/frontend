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
  geburtsdatum?: string; // ISO-String z.B. "1990-05-12"
  email?: string;
  telefonnummer?: string;
  adresse?: Adresse;
}

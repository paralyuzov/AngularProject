import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Releases } from './types/releases';
import { Artists } from './types/artists';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getReleases() {
    const {mainUrl} = environment;
    return this.http.get<Releases[]>(`${mainUrl}/data/releases`)
  }

  getArtist() {
    const {mainUrl} = environment;
    return this.http.get<Artists[]>(`${mainUrl}/data/artists`);

  }
}

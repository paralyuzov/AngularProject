import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Releases } from './types/releases';
import { Artists } from './types/artists';
import { Charts } from './types/charts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  mainUrl = environment.mainUrl

  constructor(private http:HttpClient) { }

  getReleases() {
    return this.http.get<Releases[]>(`${this.mainUrl}/data/releases`)
  }

  getArtist() {
    return this.http.get<Artists[]>(`${this.mainUrl}/data/artists`);

  }

  getCharts() {
    return this.http.get<Charts[]>(`${this.mainUrl}/data/charts`);
  }

  getChartId(id:string) {
    return this.http.get<Charts>(`${this.mainUrl}/data/charts/${id}`);
  }
}

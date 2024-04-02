import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentChartComponent } from './charts/current-chart/current-chart.component';
import { MainChartComponent } from './charts/main-chart/main-chart.component';
import { MainArtistsComponent } from './artists/main-artists/main-artists.component';
import { CurrentArtistComponent } from './artists/current-artist/current-artist.component';

const routes: Routes = [
  {
    path: 'charts',
    children: [
      { path: '', pathMatch: 'full', component: MainChartComponent },
      { path: ':chartsId', component: CurrentChartComponent },
    ],
  },
  {
    path: 'artists',
    children: [
      { path: '', pathMatch: 'full', component: MainArtistsComponent },
      { path: ':artistsId', component: CurrentArtistComponent },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}

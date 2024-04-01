import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentChartComponent } from './charts/current-chart/current-chart.component';
import { MainChartComponent } from './charts/main-chart/main-chart.component';

const routes: Routes = [
  {
    path: 'charts',
    children: [
      { path: '', pathMatch: 'full', component: MainChartComponent },
      { path: ':chartsId', component: CurrentChartComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}

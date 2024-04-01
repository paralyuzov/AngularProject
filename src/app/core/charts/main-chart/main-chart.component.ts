
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Charts } from 'src/app/types/charts';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.css']
})
export class MainChartComponent implements OnInit {
    chartList:Charts[] = [];
    constructor(private api:ApiService) {}

    ngOnInit(): void {
      this.api.getCharts().subscribe((x) => {
        this.chartList = x;
      })
    }
}

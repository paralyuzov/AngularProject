import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Charts } from 'src/app/types/charts';

@Component({
  selector: 'app-current-chart',
  templateUrl: './current-chart.component.html',
  styleUrls: ['./current-chart.component.css']
})
export class CurrentChartComponent implements OnInit {

  chart = {} as Charts; 
  constructor(private api:ApiService,private activeRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data["chartsId"];
      this.api.getChartId(id).subscribe((chart) => {
        this.chart = chart;
        console.log(chart)
      })
    })
  }
}

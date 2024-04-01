import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Charts } from 'src/app/types/charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  chartList: Charts[] = [];
  constructor(private api: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.api.getCharts().subscribe((x) => {
      this.chartList = x;
    });
  }

 
}

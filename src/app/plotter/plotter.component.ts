import {Component, ViewChild} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import {GlobalVars} from "../global-vars";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css']
})
export class PlotterComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public scatterChartLabels: string[] = [ 'A', 'B'];

  public scatterChartData: ChartData = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
        ],
        label: 'Datapoints',
        pointRadius: 4,
        backgroundColor: 'rgb(0,61,255)',
      },
      {
        type: 'line',
        label: 'Regression Line',
        data: [{x: 50, y:50}, {x: 60, y:60}, {x: 70, y:70}, {x: 80, y:80}, {x: 90, y:90}, {x: 100, y:100}],
        pointRadius: 5,
        backgroundColor: 'rgb(221,100,100)',
        borderColor: 'rgb(221,100,100)',
        pointBackgroundColor: 'rgb(221,0,255)',


      },

    ]
  };
  public scatterChartType: ChartType = 'scatter';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  constructor() {
    for(let i=0;i<GlobalVars.datahandler.table.length;i++){
      // @ts-ignore
      this.scatterChartData.datasets[0]["data"].push({x:GlobalVars.datahandler.table[i][GlobalVars.selected1], y: GlobalVars.datahandler.table[i][GlobalVars.selected2]})

    }
  }
  update(){
    this.scatterChartData.datasets[0]["data"] = []
    for(let i=0;i<GlobalVars.datahandler.table.length;i++){
      // @ts-ignore
      this.scatterChartData.datasets[0]["data"].push({x:GlobalVars.datahandler.table[i][GlobalVars.selected1], y: GlobalVars.datahandler.table[i][GlobalVars.selected2]})

    }

    this.chart?.update();
    this.scatterChartData.datasets[1]["data"] = GlobalVars.line
    this.chart?.update();


  }
}
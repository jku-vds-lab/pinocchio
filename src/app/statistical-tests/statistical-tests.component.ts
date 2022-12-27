import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from 'chart.js';
import {GlobalVars} from "../global-vars";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-statistical-tests',
  templateUrl: './statistical-tests.component.html',
  styleUrls: ['./statistical-tests.component.css']
})
export class StatisticalTestsComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true

  };
  public scatterChartLabels: string[] = [ 'A', 'B'];

  public scatterChartData: ChartData = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
        ],
        label: 'H_0',
        pointRadius: 4,
        backgroundColor: 'rgb(0,0,255)',
      },
      {
        label: 'H_1',
        data: [],
        pointRadius: 4,
        backgroundColor: 'rgb(100,200,255)',
      },
      {
        label: 'H_0 conf',
        data: [{x: 1.96, y: 0}, {x: 1.96, y: 0.1}, {x: 1.96, y: 0.2}, {x: 1.96, y: 0.3}, {x: 1.96, y: 0.4}, {x: 1.96, y: 0.5}],
        pointRadius: 4,
        backgroundColor: 'rgb(0,0,255, 0.5)',
      },


]
  };
  public scatterChartType: ChartType = 'scatter';
  scatterChartData2: ChartData = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
        ],
        label: 'H_0',
        pointRadius: 4,
        backgroundColor: 'rgb(0,0,255)',
      },
      {
        label: 'H_1',
        data: [],
        pointRadius: 4,
        backgroundColor: 'rgb(100,200,255)',
      },
      {
        label: 'H_0 - Border [0+1,96=1.96]',
        data: [{x: 1.96, y: 0}, {x: 1.96, y: 0.1}, {x: 1.96, y: 0.2}, {x: 1.96, y: 0.3}, {x: 1.96, y: 0.4}, {x: 1.96, y: 0.5}],
        pointRadius: 4,
        backgroundColor: 'rgba(0,51,255,0.5)',
      },
      {
        label: 'H_1 - Border [4-1,96=2.04]',
        data: [{x: 2.04, y: 0}, {x: 2.04, y: 0.1}, {x: 2.04, y: 0.2}, {x:2.04, y: 0.3}, {x: 2.04, y: 0.4}, {x: 2.04, y: 0.5}],
        pointRadius: 4,
        backgroundColor: 'rgba(100,221,255,0.5)',
      },

    ]
  };
  scatterChartOptions2: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true
  };
  scatterChartType2: ChartType = 'scatter';
  public v: number = 4;
  constructor() {
  }

  ngOnInit(): void {
    this.scatterChartData2.datasets[0].data = []

    this.scatterChartData.datasets[0].data = []

    for(let i=0; i<1000;i++){
      let someval = this.getNormallyDistributedRandomNumber(0, 1)
      this.scatterChartData2.datasets[0].data.push({x:someval, y:this.normal(someval, 0, 1)})
    }


    for(let i=0; i<1000;i++){
      let someval = this.getNormallyDistributedRandomNumber(4, 1)
      this.scatterChartData2.datasets[1].data.push({x:someval, y:this.normal(someval, 4, 1)})
    }

    for(let i=0; i<1000;i++){
      let someval = this.getNormallyDistributedRandomNumber(0, 1)
      this.scatterChartData.datasets[0].data.push({x:someval, y:this.normal(someval, 0, 1)})
    }


    for(let i=0; i<1000;i++){
      let someval = this.getNormallyDistributedRandomNumber(4, 1)
      this.scatterChartData.datasets[1].data.push({x:someval, y:this.normal(someval, 4, 1)})
    }

    for(let i=3;i<10;i++){
      let get_some_value_mean = this.getNormallyDistributedRandomNumber(4, 1)
      let get_some_value_std = this.getNormallyDistributedRandomNumber(1, 0.01)

      let color_c1  = this.getRandomInt(255)
      let color_c2  = this.getRandomInt(10)
      let color_c3  = 0

      let alpha = 0.5;
      let radius = 3;

      if(get_some_value_mean-1.96 > 1.96){
        alpha=1;
        radius=1.5;
        color_c2 = 255;
      }

      this.scatterChartData.datasets.push({
        label: 'dist - '+Math.round(get_some_value_mean)+' '+Math.round(get_some_value_std),
        data: [],
        pointRadius: radius,
        backgroundColor: 'rgb('+color_c1+','+color_c2+','+color_c3+','+alpha+')',
      })


      for(let j=0; j<1000;j++){
        let someval = this.getNormallyDistributedRandomNumber(get_some_value_mean, get_some_value_std)
        this.scatterChartData.datasets[i].data.push({x:someval, y:this.normal(someval, get_some_value_mean, get_some_value_std)})
      }
    }
  }

  normal(x:number, mu:number, std:number){
    return 1/(std*Math.sqrt(2*Math.PI)) * Math.exp(-1/2 * ((x-mu)/std)**2)
  }
  boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();

    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  }

  getNormallyDistributedRandomNumber(mean: number, stddev: number) {
    const z0 = this.boxMullerTransform();
    return z0 * stddev + mean;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  pushOne() {
    this.scatterChartData2.datasets.push({
      label: 'dist - '+Math.round(1)+' '+Math.round(1),
      data: [],
      pointRadius: 2,
      backgroundColor: 'rgb('+55+','+55+','+55+','+1+')',
    })
    this.chart?.update();

  }

  reset() {
    this.scatterChartData2.datasets=[];
    this.chart?.update();
  }
}

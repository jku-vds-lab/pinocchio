import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartEvent, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-some-chart',
  templateUrl: './some-chart.component.html',
  styleUrls: ['./some-chart.component.css']
})


export class SomeChartComponent implements OnInit {
  public lineChartData: ChartConfiguration['data'] = {
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
    ]};
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true
  };
  lineChartType: ChartType = 'scatter';
  i:number = 3;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  private h1mu: number = 5;
  constructor() { }

  public pushOne(): void {
    let get_some_value_mean = this.getNormallyDistributedRandomNumber(this.h1mu, 1)
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
    this.lineChartData.datasets.push({
      label: 'dist - '+Math.round(get_some_value_mean)+' '+Math.round(get_some_value_std),
      data: [],
      pointRadius: radius,
      backgroundColor: 'rgb('+color_c1+','+color_c2+','+color_c3+','+alpha+')',
    })


    for(let j=0; j<500;j++){
      let someval = this.getNormallyDistributedRandomNumber(get_some_value_mean, get_some_value_std)
      this.lineChartData.datasets[this.i].data.push({x:someval, y:this.normal(someval, get_some_value_mean, get_some_value_std)})
    }
    this.chart?.update();
    this.i++;
  }

  public hideOne(x:number): void {
    const isHidden = this.chart?.isDatasetHidden(x);
    this.chart?.hideDataset(x, !isHidden);
  }

  chartHovered($event: { event: ChartEvent; active: {}[] }) {
    
  }

  chartClicked($event: { event?: ChartEvent; active?: {}[] }) {
    
  }

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }
  ngOnInit(): void {
    this.init()
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

  reset() {
    this.lineChartData.datasets = [];
    this.chart?.update();
    this.i=3;
    this.init();
    this.chart?.update();
  }

  private init() {
    this.lineChartData.datasets[0].data = []

    this.lineChartData.datasets[0].data = []

    for(let i=0; i<1000;i++){
      let someval = this.getNormallyDistributedRandomNumber(0, 1)
      this.lineChartData.datasets[0].data.push({x:someval, y:this.normal(someval, 0, 1)})
    }


    for(let i=0; i<1000;i++){
      let someval = this.getNormallyDistributedRandomNumber(this.h1mu, 1)
      this.lineChartData.datasets[1].data.push({x:someval, y:this.normal(someval, this.h1mu, 1)})
    }

    for(let i=0; i<1000;i++){
      let someval = this.getNormallyDistributedRandomNumber(0, 1)
      this.lineChartData.datasets[0].data.push({x:someval, y:this.normal(someval, 0, 1)})
    }


    for(let i=0; i<1000;i++){
      let someval = this.getNormallyDistributedRandomNumber(this.h1mu, 1)
      this.lineChartData.datasets[1].data.push({x:someval, y:this.normal(someval, this.h1mu, 1)})
    }
  }
}

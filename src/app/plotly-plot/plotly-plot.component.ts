import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {GlobalVars} from "../global-vars";

@Component({
  selector: 'app-plotly-plot',
  styleUrls: ['./plotly-plot.component.css'],
  template: '<plotly-plot [data]="graph.data" [layout]="graph.layout"></plotly-plot>'
})
export class PlotlyPlotComponent implements OnChanges {

  constructor() {}

  ngOnInit(): void {

    for(let i=0;i<GlobalVars.datahandler.table.length;i++){
      // @ts-ignore
      this.graph.data[0].x.push(GlobalVars.datahandler.table[i][GlobalVars.selected1])

      // @ts-ignore
      this.graph.data[0].y.push(GlobalVars.datahandler.table[i][GlobalVars.selected2])

    }
  }

  @Input()
  public customTitle: string | undefined ="Graph";

  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
    console.log("update graph");
  }
  public title = "Graph"
  public graph= {
    data: [
      {
        x: [],
        y: [],
        mode: 'markers',
        type: 'scatter'
      },
      {
        x: [],
        y: [],
        mode: 'lines',
      }
    ],
    layout: {title: this.customTitle}
  };

}

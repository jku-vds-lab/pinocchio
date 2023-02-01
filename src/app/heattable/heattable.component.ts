import { Component, OnInit } from '@angular/core';
import {GlobalVars} from "../global-vars";
import {StatisticsCore} from "../statistics-core";
import {sign} from "chart.js/types/helpers";

@Component({
  selector: 'app-heattable',
  templateUrl: './heattable.component.html',
  styleUrls: ['./heattable.component.css']
})
export class HeattableComponent implements OnInit {

  table: any[][] = [[]];
  labels: any[]= [];
  sel_lables: any[] = [];

  constructor() {
    this.labels = GlobalVars.datahandler.numericColumns
    this.sel_lables = this.labels
  }

  ngOnInit(): void {
    //prepare table
    this.prepare()

  }
  getval(column_idx: number, row_idx: number){

    let checkForOne = function(arr: Iterable<unknown> | null | undefined){
      return (new Set(arr)).size === 1;
    }
    let sc = new StatisticsCore()
    sc.setCorrection("Bonfi", this.labels.length)

    let x :any[] = []
    let y :any[] = []

    for(let r =0; r<GlobalVars.datahandler.table.length;r++){
      x.push(GlobalVars.datahandler.table[r][column_idx])
      y.push(GlobalVars.datahandler.table[r][row_idx])
    }

    if(checkForOne(x)){
      return {t: 0, sigv:0, p: 0
      };
    }
    if(checkForOne(y)){
      return {t: 0, sigv:0, p: 0
      };
    }
    // @ts-ignore
    sc.inputData(x, y)
    sc.calculateRegression()
    return {t: sc.t, sigv: sc.compare, p: sc.p
    };
  }

  prepare(){
    for(let row=0;row<this.labels.length+1;row++){
      this.table.push([]);
      for(let col=0;col<this.labels.length+1;col++){
        if(row == 0 && col == 0){
          this.table[row].push("/")
        }
        else if(row ==0 && col != 0){
          this.table[row].push({outwrite:this.labels[col-1]["key"], sign: 'lab'})
        }
        else if(row != 0 && col == 0){
          this.table[row].push({outwrite:this.labels[row-1]["key"], sign: 'lab'})


        }
        else{



          let sig = this.getval(this.labels[row-1]["value"], this.labels[col-1]["value"]).sigv
          let t = this.getval(this.labels[row-1]["value"], this.labels[col-1]["value"]).t
          // @ts-ignore
          let p = this.getval(this.labels[row-1]["value"], this.labels[col-1]["value"]).p


          let txt = t.toFixed(2) + " > " + sig.toFixed(2)
          if (typeof p === "number") {
            this.table[row].push({
              outwrite: p.toFixed(2) + "<" + 0.05,
              sign: p < 0.05
            })
          }
        }


      }
    }
  }
}

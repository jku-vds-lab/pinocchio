import {Component, Input, OnInit} from '@angular/core';
import {GlobalVars} from "../global-vars";
import {StatisticsCore} from "../statistics-core";
import {sign} from "chart.js/types/helpers";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-heattable',
  templateUrl: './heattable.component.html',
  styleUrls: ['./heattable.component.css']
})
export class HeattableComponent implements OnInit {

  table: any[][] = [[]];
  labels: any[]= [];
  sel_lables: any[] = [];

  @Input()
  correction_stragegy: any;
    stati: any = true;
  signis: any = 0;
  signis_all: any = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    if(!GlobalVars.prev_data_loaded){
      this.router.navigateByUrl('/')
    }
    //prepare table
    this.labels = GlobalVars.datahandler.numericColumns
    this.sel_lables = this.labels
    this.prepare()
    this.stati = false;
  }
  update(){
    this.stati = true;
    console.log("loading")
    this.table=[];
    this.ngOnInit();
    this.stati = false;
  }
  getval(column_idx: number, row_idx: number){

    //console.log(GlobalVars.datahandler)
    let checkForOne = function(arr: Iterable<unknown> | null | undefined){
      return (new Set(arr)).size === 1;
    }
    let sc = new StatisticsCore()
    sc.setCorrection(this.correction_stragegy, this.labels.length)
    //console.log("nr of checks" + this.labels.length);

    let x :any[] = []
    let y :any[] = []

    for(let r =0; r<GlobalVars.datahandler.table.length;r++){
      x.push(GlobalVars.datahandler.table[r][column_idx])
      y.push(GlobalVars.datahandler.table[r][row_idx])
    }

    if(checkForOne(x)){
      return {t: 0, sigv:0, p: 100
      };
    }
    if(checkForOne(y)){
      return {t: 0, sigv:0, p: 100
      };
    }


    // @ts-ignore
    sc.inputData(x, y)
    sc.calculateRegression()
    return {t: sc.t, sigv: sc.compare, p: sc.p_val()
    };
  }

  prepare(){
    this.signis_all = 0;
    this.signis = 0;
    let mark_step_down = false;
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
          this.signis_all++;
          let sig = this.getval(this.labels[row-1]["value"], this.labels[col-1]["value"]).sigv
          let t = this.getval(this.labels[row-1]["value"], this.labels[col-1]["value"]).t
          // @ts-ignore
          let p = this.getval(this.labels[row-1]["value"], this.labels[col-1]["value"]).p

          if(this.correction_stragegy=="Bonferroni correction"){
            p = p*this.labels.length*this.labels.length;

          }
          else if(this.correction_stragegy=="Bonferroni Step-down correction"){
            mark_step_down = true
          }
          if (typeof p === "number") {
            if(p < 0.05){
              this.signis++;
            }
            this.table[row].push({
              outwrite: '☑️',// p.toFixed(2) + "<" + 0.05,
              sign: p < 0.05,
              p: p
            })
          }
        }
      }
    }

    let all;
    if (mark_step_down) {
      this.signis =0;
      all = []
      for (let row = 1; row < this.labels.length + 1; row++) {
        for (let col = 1; col < this.labels.length + 1; col++) {
          // @ts-ignore
          all.push({p: this.table[row][col].p, r: row, c: col})
        }
      }

      all.sort((a, b) => parseFloat(a.p) - parseFloat(b.p));

      let miter = 0;
      for(let max=all.length-1; max>0;max--){
        let p = all[max].p
        p = p*((this.labels.length*this.labels.length)-miter);
        //console.log("new and old p "+p+" - "+all[max].p)

        this.table[all[max].r][all[max].c].outwrite = '☑️'//p.toFixed(2) + "<" + 0.05
        this.table[all[max].r][all[max].c].sign = p < 0.05
        if(p < 0.05){
          this.signis++;
        }
        miter++;

      }
    }

  }
}

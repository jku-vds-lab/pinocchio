import { Component, OnInit } from '@angular/core';
import {GlobalVars} from "../global-vars";
import {StatisticsCore} from "../statistics-core";
import * as Console from "console";

@Component({
  selector: 'automatic',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit {

    table: any[][] = [[]];
    labels: any[]= [];
    sel_lables: any[] = [];

  constructor() {
      this.labels = GlobalVars.datahandler.numericColumns
      this.sel_lables = this.labels
      this.sel_lables.unshift({key: "Any", value: 999})

  }

  ngOnInit(): void {
      //prepare table
      this.prepare()

  }

  prepare(){
      for(let row=0;row<this.labels.length+1;row++){
          this.table.push([]);
          for(let col=0;col<this.labels.length+1;col++){
              if(row == 0 && col == 0){
                  this.table[row].push("/")
              }
              else if(row ==0 && col != 0){
                      this.table[row].push(this.labels[col-1]["key"])
              }
              else if(row != 0 && col == 0){
                      this.table[row].push(this.labels[row-1]["key"])


              }
              else{
                      this.table[row].push(this.getval(this.labels[row-1]["value"], this.labels[col-1]["value"]))
              }


          }
      }
  }

  getval(column_idx: number, row_idx: number){
      let checkForOne = function(arr: Iterable<unknown> | null | undefined){
          return (new Set(arr)).size === 1;
      }
      let sc = new StatisticsCore()

      let x :any[] = []
      let y :any[] = []

      for(let r =0; r<GlobalVars.datahandler.table.length;r++){
          x.push(GlobalVars.datahandler.table[r][column_idx])
          y.push(GlobalVars.datahandler.table[r][row_idx])
      }

      if(checkForOne(x)){
          return 0;
      }
      if(checkForOne(y)){
          return 0;
      }
      // @ts-ignore
      sc.inputData(x, y)
      sc.calculateRegression()
      return sc.t > sc.compare
  }

    onSelected(event: any) {
        this.table = [[]]
        this.prepare()

        if(event.target.value === "Any"){

        }
        else{
            //get index of the value which should not be deleted
            let to_keep_idx = 0
            for(let i=0; i<this.table[0].length;i++){
                if(this.table[0][i] == event.target.value){
                    to_keep_idx = i;
                }
            }

            let newtab = [[]]

            for(let i=0; i<this.table.length;i++){
                newtab.push([])
                for(let j=0; j<this.table[i].length;j++){
                    if(to_keep_idx == j || j == 0){
                        // @ts-ignore
                        newtab[i].push(this.table[i][j])
                    }

                }
            }
            console.log(newtab)
            console.log(this.table)
            this.table = newtab
        }
    }
}

/*

 for (let i = 0; i<this.labels.length;i++){
          this.table.push([])
          for(let j=0;j<this.labels.length;j++){
              let to_add:any = "";
              if(j==0 && i==0){
                  to_add = "-X-";
                  this.table[i].push(to_add)
              }
              else if(j==0){
                  to_add = this.labels[i]["key"]
                  this.table[i].push(to_add)
              }
              else if(i==0){
                  to_add = this.labels[j]["key"]
                  this.table[i].push(to_add)
              }
              else{
                  to_add = this.getval(this.labels[i]["value"], this.labels[j]["value"])
                  this.table[i].push(to_add)
              }

          }
      }
 */

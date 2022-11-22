import { Component, OnInit } from '@angular/core';
import {GlobalVars} from "../global-vars";

@Component({
  selector: 'automatic',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit {

    table: any[][] = [[]];

  constructor() { }

  ngOnInit(): void {
      //
      for (let i = 0; i<20;i++){
          this.table.push([])
          for(let j=0;j<20;j++){
              let to_add:any = "";
              if(j==0 && i==0){
                  to_add = "-X-";
              }
              else if(j==0.0){
                  to_add = "label"
              }
              else if(j!= 0 && i==0){
                  //add label at poisition j
                  to_add = "label"
              }
              else{
                  to_add = i+j
              }
              //check both numeric

              //check both categorical

              //check mixed, if so use other test or use regression with dummy variable
              this.table[i].push(to_add)
          }
      }
  }

}

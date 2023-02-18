import { Component, OnInit } from '@angular/core';
import {GlobalVars} from "../global-vars";

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {
    prev: any;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      setTimeout(() => {
        if(GlobalVars.prev_data_loaded){
          this.prev = [GlobalVars.datahandler.columnNames]
          this.prev = this.prev.concat(GlobalVars.datahandler.table)
        }
        else{
          this.ngOnInit();
        }

      });
    }, 100);
  }

}

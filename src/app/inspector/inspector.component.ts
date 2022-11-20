import { Component, OnInit } from '@angular/core';
import {GlobalVars} from "../global-vars";

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit {
    labels: any = GlobalVars.csvobj.column_names;
    data: any = GlobalVars.csvobj;
  constructor() { }

  ngOnInit(): void {
      //
      for (let i = 0; i<10;i++){

      }
  }

}

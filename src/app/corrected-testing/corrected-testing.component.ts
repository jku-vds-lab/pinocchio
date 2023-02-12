import {Component, OnInit, ViewChild} from '@angular/core';
import {PlotterComponent} from "../plotter/plotter.component";
import {HeattableComponent} from "../heattable/heattable.component";

@Component({
  selector: 'app-corrected-testing',
  templateUrl: './corrected-testing.component.html',
  styleUrls: ['./corrected-testing.component.css']
})
export class CorrectedTestingComponent implements OnInit {
    public selectedOption: string | undefined = "No correction";

  constructor() { }
  @ViewChild(HeattableComponent, { static: true }) childC: HeattableComponent | undefined;
    stati: any;

  ngOnInit(): void {

  }

  onChange(){
    // @ts-ignore
    this.childC?.update();
  }

}

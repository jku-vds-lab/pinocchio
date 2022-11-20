import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-some-plot',
  templateUrl: './some-plot.component.html',
  styleUrls: ['./some-plot.component.css']
})
export class SomePlotComponent implements OnInit, OnChanges {
  private ticks: number | undefined;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
        console.log("ss")
    }

  update(): void {
    this.ticks = Date.now().valueOf();
    console.log("update")


  }
  ngOnInit(): void {
  }

}

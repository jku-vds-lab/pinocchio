import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalVars} from "../global-vars";
import {PlotlyPlotComponent} from "../plotly-plot/plotly-plot.component";
import {SomePlotComponent} from "../some-plot/some-plot.component";
import {PlotterComponent} from "../plotter/plotter.component";
import {StatisticsCore} from "../statistics-core";
import {CatTestCore} from "../cat-test-core";



@Component({
  selector: 'app-manual-regression',
  templateUrl: './manual-regression.component.html',
  styleUrls: ['./manual-regression.component.css']
})
export class ManualRegressionComponent implements OnInit {
  public labels: [] | undefined;
  public label_cat: [] | undefined;
  public sel=[0, 0];
  public selg = "";
  public pval: any = 0;
  public r2: any = 0;
  public k: any = 0;
  public d: any = 0;
  inputValue: any = "f";
  @ViewChild(PlotterComponent, { static: false }) childC: PlotterComponent | undefined;
  r2o: number = 0;
   corr: number = 0;
   beta0: number = 0;
   beta1: number = 0;
   line: any[] = [{x: 50, y: 50}];
   s_err: number = 0.0;
   t: number = 0.0;
  p: number = 0.0;
    compare: number = 0.0;
  signiv: number = 95;
  chi_pearson_squared: number=0.0;
  chi_degree_freedom: number=0.0;
  chi_significant: number=0.0;
  
  cat_sel = [0, 1];
  open: any = true;



  constructor() {

  }
  onUpdateChild() {
    // @ts-ignore
    this.childC.update();
    console.log("update");

  }
  ngOnInit(): void {
    // @ts-ignore
    this.labels = GlobalVars.datahandler.numericColumns
    // @ts-ignore
    this.label_cat = GlobalVars.datahandler.categoricColumns


    // @ts-ignore
    this.sel[0] = this.labels[0].value
    // @ts-ignore
    this.sel[1] = this.labels[0].value

    this.waiter();
    // @ts-ignore

  }
  waiter(){
    setTimeout(() => {
      setTimeout(() => {
        this.regressor();
        this.open = false;
      });
    }, 500);
  }
  onSelected(event: any, number: number) {
    this.open = true;

    this.sel[number] = event.target.value;
    this.regressor();
    this.open = false;
  }

  regressor(){

    let sc = new StatisticsCore()

    this.signiv = sc.signv

    // @ts-ignore
    this.selg = "My Graph"
    GlobalVars.selected1 = this.sel[0]
    GlobalVars.selected2 = this.sel[1]
    this.inputValue = "kk"

    let x:any[] = []
    let y:any[] = []
    for(let i=0;i<GlobalVars.datahandler.table.length;i++){
      // @ts-ignore
      x.push(GlobalVars.datahandler.table[i][GlobalVars.selected1])
      y.push(GlobalVars.datahandler.table[i][GlobalVars.selected2])

    }


    let checkForOne = function(arr: Iterable<unknown> | null | undefined){
      return (new Set(arr)).size === 1;
    }

    if(checkForOne(x) || checkForOne(y)){
      this.r2 = 0
      this.r2o = 0
      this.beta0 = 0
      this.beta1 = 0
      this.corr = 0
      this.s_err = 0
      this.t = 0
      this.p = 0
      this.onUpdateChild();
      this.compare = 0
    }
    else {
      // @ts-ignore
      sc.inputData(x, y);
      sc.calculateRegression()
      GlobalVars.line = sc.getRegLine();
      this.r2 = sc.R2
      this.r2o = sc.R2_optimized
      this.beta0 = sc.beta0
      this.beta1 = sc.beta1
      this.corr = sc.correlation
      this.s_err = sc.s_error
      this.t = sc.t
      //this.p = sc.p
      this.onUpdateChild();
      this.compare = sc.compare
    }
  }


  onchi(event: any, number: number){
    this.cat_sel[number] =  event.target.value
    let ctc = new CatTestCore();
    let x:number[] = []
    let y:number[] = []
    for(let i=0;i<GlobalVars.datahandler.table.length;i++){
      // @ts-ignore
      x.push(GlobalVars.datahandler.table[i][this.cat_sel[0]])
      y.push(GlobalVars.datahandler.table[i][this.cat_sel[1]])

    }
    ctc.inputData(x, y);
    let chi_erg = ctc.chi_squared()
    this.chi_degree_freedom = chi_erg.degreesOfFreedom
    this.chi_pearson_squared = chi_erg.PearsonChiSquared
    this.chi_significant = chi_erg.significance
    this.onUpdateChild();

  }
}

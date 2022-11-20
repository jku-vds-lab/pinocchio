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
  }
  onSelected(event: any, number: number) {
    let sc = new StatisticsCore()

    this.sel[number] = event.target.value;


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
    this.p = sc.p
    this.onUpdateChild();
    this.compare = sc.compare

  }


  onchi(event: any, number: number){
    let ctc = new CatTestCore();

    let chi_erg = ctc.chisquared()
    alert(chi_erg.significance)
    this.chi_degree_freedom = chi_erg.degreesOfFreedom
    this.chi_pearson_squared = chi_erg.PearsonChiSquared
    this.chi_significant = chi_erg.significance

  }
}

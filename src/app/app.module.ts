import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// @ts-ignore
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponent } from './footer/footer.component';
import { IntroductionComponentComponent } from './introduction-component/introduction-component.component';
import { UploadComponentComponent } from './upload-component/upload-component.component';
import { ManualRegressionComponent } from './manual-regression/manual-regression.component';
import { PlotlyPlotComponent } from './plotly-plot/plotly-plot.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { StatisticalTestsComponent } from './statistical-tests/statistical-tests.component';
import { InspectorComponent } from './inspector/inspector.component';
import { SomePlotComponent } from './some-plot/some-plot.component';
import { NgChartsModule } from 'ng2-charts';
import { PlotterComponent } from './plotter/plotter.component';



PlotlyModule.plotlyjs = PlotlyJS;

const routes: Routes = [
  { path: '', component: IntroductionComponentComponent },
  { path: 'upload', component: UploadComponentComponent },
  { path: 'manual', component: ManualRegressionComponent },
    { path: 'tests', component: StatisticalTestsComponent },
    { path: 'inspect', component: InspectorComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponentComponent,
    FooterComponent,
    IntroductionComponentComponent,
    UploadComponentComponent,
    ManualRegressionComponent,
    PlotlyPlotComponent,
    PlotlyPlotComponent,
    StatisticalTestsComponent,
    InspectorComponent,
    SomePlotComponent,
    PlotterComponent
  ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        RouterModule.forRoot(routes, {enableTracing: true}),
        PlotlyModule,
        FormsModule,
        HttpClientModule,
        NgChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Component } from '@angular/core';
import {HttpService} from "./http-service/http-service.module";
import {CSV} from "./csv";
import {GlobalVars} from "./global-vars";
import {DATAHANDLER} from "./datahandler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']})
export class AppComponent {
  title:string = 'Pinocchio';
  private posts: any;
  constructor(private httpService: HttpService) { }
  ngOnInit() {
    GlobalVars.prev_data_loaded = false;
    this.httpService.getPosts().subscribe(
        (response: any) => {
          //console.log(response);
          this.posts = response;
          //let csvobj = new CSV(this.posts)
            //GlobalVars.csvobj = csvobj
            GlobalVars.datahandler = new DATAHANDLER()
            GlobalVars.datahandler.loadCSV(this.posts)
            GlobalVars.prev_data_loaded = true;


        },
        (error: any) => { console.log(error); });



  }

}

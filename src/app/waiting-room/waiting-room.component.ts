import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalVars} from "../global-vars";


@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("Waiting Room")

    this.start()

  }

  start(){
    setTimeout(() => {
      setTimeout(() => {
        if(GlobalVars.status){
          this.router.navigateByUrl("/upload")
          GlobalVars.status = false;
        }
        else{
          this.start()
        }
      });
    }, 1000);


  }
  navigate(){
    if(GlobalVars.status){
      this.router.navigateByUrl("/upload")
      GlobalVars.status = false;
    }
  }

}

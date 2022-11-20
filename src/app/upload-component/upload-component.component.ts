import { Component, OnInit } from '@angular/core';
import{ GlobalVars} from "../global-vars";


@Component({
  selector: 'app-upload-component',
  templateUrl: './upload-component.component.html',
  styleUrls: ['./upload-component.component.css']
})

export class UploadComponentComponent implements OnInit {
  file: any;
  str: string ="";
  arr: object | undefined;
  constructor() { }

  ngOnInit(): void {

  }

  fileChanged(e: Event) {
    // @ts-ignore
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      //console.log(fileReader.result);
      // @ts-ignore
      this.str = fileReader.result
      GlobalVars.datahandler.loadCSV(this.str)

    }
    fileReader.readAsText(this.file);
  }

}

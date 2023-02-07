import { Component, OnInit } from '@angular/core';
import{ GlobalVars} from "../global-vars";
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-upload-component',
  templateUrl: './upload-component.component.html',
  styleUrls: ['./upload-component.component.css']
})

export class UploadComponentComponent implements OnInit {
  file: any;
  str: string ="";
  arr: object | undefined;

  leng = 100;
  featu=10;
  table: any = [GlobalVars.datahandler.columnNames, GlobalVars.datahandler.dataType]

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.leng = GlobalVars.datahandler.table.length
    this.featu = GlobalVars.datahandler.table[0].length
    this.table = [GlobalVars.datahandler.columnNames, GlobalVars.datahandler.dataType]
  }

  fileChanged(e: Event) {
    this.leng = GlobalVars.datahandler.table.length
    this.featu = GlobalVars.datahandler.table[0].length


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

    this.ngOnInit();
    // @ts-ignore
    setTimeout(this.router.navigateByUrl('/waiting_room'), 1000)



  }


}

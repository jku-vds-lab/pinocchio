import { Component, OnInit } from '@angular/core';
import{ GlobalVars} from "../global-vars";
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
import * as Console from "console";



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
  prev: any = [[".", ".", "."], [".", ".", "."]];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(() => {
      setTimeout(() => {
        if(GlobalVars.prev_data_loaded){
          this.init()
        }
        else{
          this.ngOnInit();
        }

      });
    }, 500);
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
    setTimeout(this.router.navigateByUrl('/waiting_room'), 3000)



  }


  convert() {
    let nx = GlobalVars.datahandler.categoricColumns
    for(let i=0;i<nx.length;i++){
     console.log(nx[i].value)
      this.convert_and_extend(nx[i].value);
    }

  }

  private convert_and_extend(value:number) {


    //get num of individual values
    let myset: string[] = [];
    for(let j=0;j<GlobalVars.datahandler.table.length;j++){

      let tv = GlobalVars.datahandler.table[j][value]
      if(myset.indexOf(tv)<0){
        myset.push(tv)

      }


    }
    console.log("length of individual values check")
    console.log(myset)
    if(myset.length>=8 || myset.length<2){
      console.log("Reject")
      return 0;
    }
    else{
      myset = []
      let pusher=1;
      for(let j=0;j<GlobalVars.datahandler.table.length;j++){

        let tv = GlobalVars.datahandler.table[j][value]
        if(myset.indexOf(tv)<0){
          myset.push(tv)
          GlobalVars.datahandler.columnNames.push(GlobalVars.datahandler.columnNames[value]+"#"+tv)
          GlobalVars.datahandler.numericColumns.push({key: GlobalVars.datahandler.columnNames[value]+"#"+tv, value: GlobalVars.datahandler.columnNames.length-1})
          GlobalVars.datahandler.dataType.push("continuous")
          pusher++;
        }

      }


      /*console.log(GlobalVars.datahandler.table)
      console.log(GlobalVars.datahandler.numericColumns)
      console.log(GlobalVars.datahandler.columnNames)*/


      //generate for each a column.



      //iterate over rows
      //go to column value
      //copy
      //push one additional column with our value

      for(let i=0;i<GlobalVars.datahandler.table.length;i++){
        for(let j=0;j<myset.length;j++){
          if(myset[j] == GlobalVars.datahandler.table[i][value]){
            GlobalVars.datahandler.table[i].push(2)
          }
          else {
            GlobalVars.datahandler.table[i].push(1)

          }

        }
      }
    }

    console.log(GlobalVars.datahandler.table)



    return 1;

  }

  private init() {
    this.prev = [GlobalVars.datahandler.columnNames, GlobalVars.datahandler.dataType]
    console.log(this.prev);
    this.leng = GlobalVars.datahandler.table.length
    this.featu = GlobalVars.datahandler.table[0].length
    this.prev = [GlobalVars.datahandler.columnNames, GlobalVars.datahandler.dataType]
    return true;
  }
}

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


  convert() {
    let nx = GlobalVars.datahandler.categoricColumns
    for(let i=0;i<nx.length;i++){
     console.log(nx[i].value)
      this.convert_and_extend(nx[i].value);
    }

  }

  private convert_and_extend(value:number) {
    /*console.log(GlobalVars.datahandler.table)
    console.log(GlobalVars.datahandler.numericColumns)
    console.log(GlobalVars.datahandler.columnNames)*/

    //get num of individual values
    let myset: string[] = [];
    for(let j=0;j<GlobalVars.datahandler.table.length;j++){

      let tv = GlobalVars.datahandler.table[j][value]
      if(myset.indexOf(tv)<0){
        myset.push(tv)
        GlobalVars.datahandler.columnNames.push(GlobalVars.datahandler.columnNames[value]+"#"+tv)
        GlobalVars.datahandler.numericColumns.push({key: GlobalVars.datahandler.columnNames[value]+"#"+tv, value: j})
        GlobalVars.datahandler.dataType.push("continuous")
      }


    }

    console.log(myset)


    //generate for each a column.



    //iterate over rows
    //go to column value
    //copy
    //push one additional column with our value

    for(let i=0;i<GlobalVars.datahandler.table.length;i++){
      for(let j=0;j<myset.length;j++){
        if(myset[j] == GlobalVars.datahandler.table[i][value]){
          GlobalVars.datahandler.table[i].push(1)
        }
        else {
          GlobalVars.datahandler.table[i].push(0)

        }

      }
    }

    console.log(GlobalVars.datahandler.numericColumns)



  }
}

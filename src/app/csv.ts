export class CSV {
    private catindex: any[] =[];
    get column_names(): any[] {
        return this._column_names;
    }
    private num_arr: any[];
    private _column_names: any[];
    private cat_arr: any[];
    private numindex: any = [];

    constructor(str:string, delimiter:string = ",") {
        this.num_arr = []
        this._column_names = []
        this.cat_arr = []
        let all_rows = str.split("\n")
        this._column_names = all_rows[0].split(delimiter)
        let firstrow = all_rows[1].split(delimiter)
        //console.log(this.column_names)
        //first check numerical vs categorical
        for(let i=0; i<this._column_names.length; i++){
            if(!isNaN(Number(firstrow[i]))){
                this.numindex.push(i)
                //console.log(i + " num " + firstrow[i])

            }
            else{
                this.catindex.push(i)
                //console.log(i + "  cat " + firstrow[i])

            }
        }
        //console.log(catindex)
        //console.log(numindex)

        for(let r = 1; r<all_rows.length;r++){
            this.num_arr.push([])
            this.cat_arr.push([])
            for(let c = 0; c<this._column_names.length; c++){
                if(this.numindex.includes(c)){
                    this.num_arr[r-1].push(Number(all_rows[r].split(delimiter)[c]))
                }
                else{
                    this.cat_arr[r-1].push(all_rows[r].split(delimiter)[c])
                }
            }
        }
        console.log(this.num_arr)
    }

    public getColumnNames(){
        return this._column_names
    }
    public checkNumeric(index: Number){
        console.log("check - numeric")
        console.log(this.numindex)
        console.log(index)

        return this.numindex.includes(index);
    }
    public checkCategorical(index: Number){
        return this.catindex.includes(index);
    }
    public getX(index: Number){
        let toret = []
        let sortout = []
        if(this.checkNumeric(index)){
            sortout = this.num_arr;
        }
        else{
            sortout = this.cat_arr
        }

        for(let i=0;i<this.num_arr.length;i++){
            // @ts-ignore
            toret.push(sortout[i][index])
        }
        return toret;
    }



}

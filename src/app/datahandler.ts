

function isDate(value: any) {
    return (new Date(value).toString() !== 'Invalid Date');
}

export class DATAHANDLER {
    public columnNames: string[] = [];
    public table: any[][] = [];
    public dataType: string[] = [];
    public numericColumns:any[] = [];
    public categoricColumns:any[] = [];

    constructor() {
    }

    public loadCSV(data:string, delimiter:string=","){
        this.columnNames = []
        this.table = []
        this.dataType = []
        this.numericColumns = []
        //split data in rows
        let all_rows = data.split("\n")

        //first row are the labels or column names and remove first row
        this.columnNames = all_rows[0].split(delimiter);
        all_rows.shift()

        //now we want to check the datatypes, read the data and so on
        for(let j =0; j< all_rows[1].split(delimiter).length; j++){
            console.log("#",this.columnNames[j], all_rows[1][j], this.getType(all_rows[0][j]))
            console.log("#-",this.dataType.push(this.getType(all_rows[0].split(delimiter)[j])))
            this.dataType.push(this.getType(all_rows[0].split(delimiter)[j]));
        }


        for(let i = 0; i < all_rows.length;i++){
            let some_row = all_rows[i].split(delimiter)
            this.table.push([])
            for(let j=0; j<some_row.length; j++){

                if(this.getType(some_row[j]) != this.dataType[j]){
                    this.dataType[j] = 'categorical'
                }

                if(this.getType(some_row[j]) === "continuous"){
                    this.table[i].push(Number(some_row[j]));
                }
                else{
                    this.table[i].push(some_row[j])
                }
            }
        }


        for(let j=0; j<this.columnNames.length;j++){

            if(this.dataType[j] === "continuous"){
                this.numericColumns.push({"key": this.columnNames[j], "value": j})
            }
            if(this.dataType[j] === "categorical"){
                // @ts-ignore
                this.categoricColumns.push({"key": this.columnNames[j], "value": j})
            }
        }
        let nt = this.table
        //sample data
        if(this.table.length>5000){
            while(nt.length>5000){
                let idx =  Math.floor(Math.random() * nt.length )
                nt.splice(idx, 1)
            }
        }

        this.table = nt


    }

    private getType(value:string) {
        if (value == null) {
            return 'null';
        }
        if (typeof value == 'number' || isNumber(value)) {
            return 'continuous';
        }
        // @ts-ignore
        if (value instanceof Date) {
            return 'date';
        }
        if (isDate(value)) {
            return 'date';
        }
        return 'categorical';
    }

}
function isNumber(value: string | number): boolean
{
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}

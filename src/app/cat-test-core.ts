export class CatTestCore {
    private data: any [] = [];
    private testVars:any = {
        x: {
            scale: 'nominal',
            valueMap: []
        },
        y: {
            scale: 'nominal',
            valueMap: []
        }
    };

    inputData(x: number[], y: number[]){
        this.data = []

        for(let i=0; i<x.length;i++){
            this.data.push({x: x[i], y: y[i]})

            if(!this.testVars.x.valueMap.includes(x[i])){
                this.testVars.x.valueMap.push(x[i])
            }
            if(!this.testVars.y.valueMap.includes(y[i])){
                this.testVars.y.valueMap.push(y[i])
            }
        }


    }

    chi_squared(){
        var Statistics = require('../../node_modules/statistics.js/statistics');
        var stats = new Statistics(this.data, this.testVars);
        return stats.chiSquaredTest('x', 'y');

    }
}

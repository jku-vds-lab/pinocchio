import {min} from "rxjs";


export class StatisticsCore {
    private data: any[] = [];
    R2: number = 0;
    R2_optimized: number = 0.0;
    beta0: number = 0.0;
    beta1: number = 0.0;
    correlation: number = 0.0;
    x: [] = [];
    y: [] = [];
    s_e_beta = 0.0;
    s_error: number = 0.0;
    t: number = 0.0;
    p: number | { p: any; p_uncorrected: any } | boolean = 0.0;
    compare: number = 0;
    signv: number = 95;
    correction: string = "No correction";
    corrig: any;
    private nr: number = 0;

    inputData(x: [], y:[]){


        this.x = x
        this.y = y
        this.data = []

        for(let i=0; i<x.length;i++){
            this.data.push({x: x[i], y: y[i]})
        }
    }
    calculateRegression(){


        var Statistics = require('../../node_modules/statistics.js/statistics');
        let testVars = {
            x: 'metric',
            y: 'metric'
        };

        let stats = new Statistics(this.data, testVars);
        let regression = stats.linearRegression('x', 'y');

        this.R2 = regression.coefficientOfDetermination
        this.R2_optimized = regression.coefficientOfDeterminationCorrected
        this.beta0 = regression.regressionFirst.beta1
        this.beta1 = regression.regressionFirst.beta2
        this.correlation = regression.correlationCoefficient


        //to calculate t-test we have to perform a number of steps
        this.t = this.t_test()
        this.s_error = this.get_standard_error()
        this.compare = this.t_table(this.signv/100)
        this.p = this.p_val()

        //this.s_e_beta =  //https://stats.stackexchange.com/questions/85943/how-to-derive-the-standard-error-of-linear-regression-coefficient

    }
    p_val(){
        if(!isFinite(this.t)){
            return 0;
        }
        console.log(this.correction, this.corrig)
        var { jStat } = require('jstat')

        if(this.correction=="No correction"){
            return 0+jStat.ttest(this.t, this.x.length, 2);
            //return {p: jStat.ttest(this.t, this.x.length, 2), p_uncorr:jStat.ttest(this.t, this.x.length, 2)}
        }
        else if(this.correction=="Bonferroni correction"){
            return 0+jStat.ttest(this.t, this.x.length, 2) * this.corrig
            //return {p: jStat.ttest(this.t, this.x.length, 2)*this.corrig, p_uncorr:jStat.ttest(this.t, this.x.length, 2)}

        } else if(this.correction=="Bonferroni Step-down correction"){
            return 0+jStat.ttest(this.t, this.x.length, 2) * (this.corrig-this.nr)
            //return {p: jStat.ttest(this.t, this.x.length, 2)*this.corrig, p_uncorr:jStat.ttest(this.t, this.x.length, 2)}

        }
    }
    f(x:number){
        return this.beta0 + this.beta1*x
    }

    getRegLine(){
        let retu = []
        let minimum  = Math.min.apply(Math, this.x);
        let maximum  = Math.max.apply(Math, this.x);
        /*if((maximum-minimum)>50){
            p = 1-50/this.x.length
        }
        for (let i=minimum-1; i<=maximum;i++){
            if(Math.random()<p){
                retu.push({x: i, y:this.f(i)})
            }
        }
        return retu*/

        retu.push({x: minimum, y:this.f(minimum)})
        retu.push({x: maximum, y:this.f(maximum)})

        return retu
    }

    private t_test() {
        //see https://www.mathematik.uni-ulm.de/stochastik/lehre/ss03/wirtschaftsstatistik/skript9/node32.html
        let underterm = 0

        let n = this.data.length
        for(let i=0;i<n;i++){
            underterm = underterm + (this.data[i]['x']*this.data[i]['x'])
        }

        underterm = underterm - n*this.get_average()*this.get_average()
        underterm = Math.sqrt(underterm)
        //console.log("ttest");
        //console.log(underterm)
        return Math.abs(this.beta1)/(this.get_standard_error()/underterm)
    }

    private t_table(sig_niv:number){
        var { jStat } = require('jstat')

        //console.log("###################!!!")

        //this function works until 250
        let statics =jStat.studentt.inv((1 - (1 - sig_niv) / 2), this.data.length-2)



        //console.log(statics)
        return statics
    }

    private get_standard_error() {
        //console.log("=================")
        //console.log(this.data)
        var n=this.data.length
        var se = 0
        for(let i = 0; i<n;i++){
            let e = this.f(this.data[i]['x']) - this.data[i]['x']
            se = se + (e)*(e)
        }
        return Math.sqrt(1/(n-2)* se)
    }
    private get_average(val:string = 'x'){
        let avg = 0;
        for(let i=0; i<this.data.length;i++){
            avg = avg + this.data[i][val]
        }

        return avg/this.data.length
    }

    setCorrection(corr: string, labels: any, nr:number=0) {
        this.correction = corr
        this.corrig = labels
        this.nr = nr
    }
}

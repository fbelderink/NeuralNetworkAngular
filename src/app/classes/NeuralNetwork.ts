import { Numpy } from './Numpy';

export class NeuralNetwork{
    np = new Numpy();

    constructor(){

    }

    query(input_list : number[]){

    }

    train(){

    }

    //Working
    activation_function(arr : number[][]){
        const rows  = arr.length;
        const columns = arr[0].length;

        let result = this.np.zeros(rows,columns);

        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                result[i][j] = 1 / (1 + Math.pow(Math.E,-arr[i][j]));
            }
        }

        return result;
    }
}
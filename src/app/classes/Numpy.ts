export class Numpy {

    //Working
    dot(arr1: number[][], arr2: number[][]) {

        if (arr1[0].length != arr2.length) {
            return null;
        }

        let result = this.zeros(arr1.length, arr2[0].length);

        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2[0].length; j++) {
                for (let k = 0; k < arr1[0].length; k++) {
                    result[i][j] += arr1[i][k] * arr2[k][j];
                }
            }
        }

        return result;
    }

    //Working
    transposeMatrix(arr: number[][]) {
        let result = this.zeros(arr[0].length, arr.length);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                result[j][i] = arr[i][j];
            }
        }

        return result;
    }

    //Working
    transposeToVector(arr: number[]) {

        let result = this.zeros(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            result[i][0] = arr[i];
        }
        return result;
    }

    //Working
    zeros(rows: number, columns: number) {

        let arr: number[][] = [];

        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }

        return arr;
    }

    randomNumber(max: number, min: number, offset: number) {
        min += offset;
        max += offset;
        return Math.random() * (max - min) + min
    }

    randomnormal(center, scale, rows, columns) {
        let result = this.zeros(rows, columns);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                result[i][j] = this.randomNumber(-scale, scale, center);
            }
        }

        return result;
    }

    multiply(arr1: number[][], arr2: number[][]) {
        if (arr1.length == arr2.length && arr1[0].length == arr2[0].length) {
            let result = this.zeros(arr1.length, arr1[0].length);

            for (let i = 0; i < arr1.length; i++) {
                for (let j = 0; j < arr1[0].length; j++) {
                    result[i][j] = arr1[i][j] * arr2[i][j];
                }
            }
            return result;
        }

        return null;
    }

    multiplybyNumber(num: number, arr: number[][]) {
        let result = this.zeros(arr.length, arr[0].length);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                result[i][j] = num * arr[i][j];
            }
        }

        return result;
    }

    dividebyNumber(arr: number[], num: number) {
        let result: number[] = [];

        for (let i = 0; i < arr.length; i++) {
            result[i] = arr[i] / num;
        }
        return result;
    }

    subtractFromNumber(num: number, arr: number[][]) {
        let result = this.zeros(arr.length, arr[0].length);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                result[i][j] = num - arr[i][j];
            }
        }

        return result;
    }

    addNumber(arr1 : number[],num : number){
        let result : number[] = []
        for(let i = 0 ;i < arr1.length; i++){
            result[i] = arr1[i] + num;
        }
        return result;
    }

    add(arr1: number[][], arr2: number[][]) {
        if (arr1.length == arr2.length && arr1[0].length == arr2[0].length) {
            let result = this.zeros(arr1.length, arr1[0].length);
            for (let i = 0; i < arr1.length; i++) {
                for (let j = 0; j < arr1[0].length; j++) {
                    result[i][j] = arr1[i][j] + arr2[i][j];
                }
            }

            return result;
        }

        return null;
    }

    subtract(arr1: number[][], arr2: number[][]) {
        if (arr1.length == arr2.length && arr1[0].length == arr2[0].length) {
            let result = this.zeros(arr1.length, arr1[0].length);

            for (let i = 0; i < arr1.length; i++) {
                for (let j = 0; j < arr1[0].length; j++) {
                    result[i][j] = arr1[i][j] - arr2[i][j];
                }
            }

            return result;
        }

        return null;
    }
}
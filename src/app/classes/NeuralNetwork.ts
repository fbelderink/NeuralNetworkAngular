import { Numpy } from './Numpy';

export class NeuralNetwork {
    np = new Numpy();
    inodes: number;
    hiddenlayers: number[];
    onodes: number;
    wih: number[][];
    whh: number[][][] = [];
    who: number[][];
    lr: number;

    constructor(inodes: number, hiddenlayers: number[], onodes: number, learning_rate: number) {
        this.inodes = inodes;
        this.hiddenlayers = hiddenlayers;
        this.onodes = onodes;

        this.wih = this.np.randomnormal(0.0, Math.pow(hiddenlayers[0], -0.5), this.hiddenlayers[0], this.inodes);

        for (let i = 0; i < hiddenlayers.length - 1; i++) {
            this.whh[i] = this.np.randomnormal(0.0, Math.pow(hiddenlayers[i + 1], -0.5), hiddenlayers[i + 1], hiddenlayers[i]);
        }

        this.who = this.np.randomnormal(0.0, Math.pow(onodes, -0.5), onodes, hiddenlayers[hiddenlayers.length - 1]);

        this.lr = learning_rate;
    }

    query(input_list: number[]) {
        let inputs = this.np.transposeToVector(input_list);

        let hidden_inputs: number[][][] = [];
        let hidden_outputs: number[][][] = [];

        hidden_inputs[0] = this.np.dot(this.wih, inputs);
        hidden_outputs[0] = this.activation_function(hidden_inputs[0]);


        for (let i = 0; i < this.whh.length - 1; i++) {
            hidden_inputs[i] = this.np.dot(this.whh[i], hidden_outputs[i]);
            hidden_outputs[i] = this.activation_function(hidden_inputs[i + 1]);
        }

        let final_input = this.np.dot(this.who, hidden_outputs[hidden_outputs.length - 1]);
        let final_output = this.activation_function(final_input);

        return final_output;    
    }

    train(input_list: number[], targets_list: number[]) {
        let inputs = this.np.transposeToVector(input_list);
        let target = this.np.transposeToVector(targets_list);

        let hidden_inputs: number[][][] = [];
        let hidden_outputs: number[][][] = [];

        hidden_inputs[0] = this.np.dot(this.wih, inputs);
        hidden_outputs[0] = this.activation_function(hidden_inputs[0]);


        for (let i = 0; i < this.whh.length - 1; i++) {
            hidden_inputs[i] = this.np.dot(this.whh[i], hidden_outputs[i]);
            hidden_outputs[i] = this.activation_function(hidden_inputs[i + 1]);
        }

        let final_input = this.np.dot(this.who, hidden_outputs[hidden_outputs.length - 1]);
        let final_output = this.activation_function(final_input);

        let output_errors = this.np.subtract(target, final_output);

        let hidden_errors: number[][][] = [];

        hidden_errors[0] = this.np.dot(this.np.transposeMatrix(this.who), output_errors);

        for (let i = 0; i < this.hiddenlayers.length - 1; i++) {
            hidden_errors[i] = this.np.dot(this.np.transposeMatrix(this.whh[this.hiddenlayers.length - (2 + i)]), hidden_errors[i]);
        }

        this.who = this.np.add(this.who, this.np.multiplybyNumber(this.lr, this.np.dot(this.np.multiply(this.np.multiply(output_errors, final_output), this.np.subtractFromNumber(1, final_output)), this.np.transposeMatrix(hidden_outputs[hidden_outputs.length - 1]))));

        for (let i = 0; i < this.whh.length; i++) {

            this.whh[this.whh.length - (1 + i)] = this.np.add(this.whh[this.whh.length - (1 + i)], this.np.multiplybyNumber(this.lr, this.np.dot(this.np.multiply(this.np.multiply(hidden_errors[i], hidden_outputs[hidden_outputs.length - (1 + i)]), this.np.subtractFromNumber(1, hidden_outputs[hidden_outputs.length - (1 + i)])), this.np.transposeMatrix(hidden_outputs[hidden_outputs.length - (2 + i)]))));

        }

        this.wih = this.np.add(this.wih, this.np.multiplybyNumber(this.lr, this.np.dot(this.np.multiply(this.np.multiply(hidden_errors[hidden_errors.length - 1], hidden_outputs[0]), this.np.subtractFromNumber(1, hidden_outputs[0])), this.np.transposeMatrix(inputs))));
    }

    trainNet(data) {

        console.log("training...")

        const toArray = function (data) {
            return data.split("\n").slice(0, -1);
        }

        let epochs = 1;

        let training_data = toArray(data);

        for (let i = 0; i < epochs; i++) {
            console.log("epoch " + (i + 1) + "/" + epochs)
            for (let j = 0; j < training_data.length; j++) {

                let all_values = training_data[j].split(",").map(Number);

                let inputs = this.np.addNumber(this.np.dividebyNumber(all_values.slice(1), 255 * 0.99), 0.01)

                let targets: number[] = []

                for (let i = 0; i < this.onodes; i++) {
                    targets[i] = 0;
                }

                targets[all_values[0]] = 0.99;

                this.train(inputs, targets);
            }
        }

        console.log("finished!")
    }

    testNet(data) {
        const toArray = function (data) {
            return data.split("\n").slice(0, -1);
        }

        let test_data = toArray(data);

        let scorecard = [];
        let label;

        for (let i = 0; i < test_data.length; i++) {
            let all_values = test_data[i].split(",").map(Number)

            let correct_label = all_values[0];

            console.log("Correct label: " + correct_label)

            let inputs = this.np.addNumber(this.np.dividebyNumber(all_values.slice(1), 255 * 0.99), 0.01);

            let outputs = this.query(inputs);

            let temp = 0;
            for (let i = 0; i < outputs.length; i++) {
                if (outputs[i][0] > temp) {
                    temp = outputs[i][0];
                    label = i;
                }
            }

            console.log("The nets guess: " + label)

            if (label == correct_label) {
                scorecard.push(1);
            } else {
                scorecard.push(0);
            }
        }

        let percentage = 0;
        for (let i = 0; i < scorecard.length; i++) {
            percentage += scorecard[i];
        }
        percentage = percentage / scorecard.length * 100;

        console.log("The net got " + percentage + " % right!")
    }

    //Working
    activation_function(arr: number[][]) {
        const rows = arr.length;
        const columns = arr[0].length;

        let result = this.np.zeros(rows, columns);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                result[i][j] = 1 / (1 + Math.pow(Math.E, -arr[i][j]));
            }
        }

        return result;
    }
}
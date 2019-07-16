import { Component } from '@angular/core';
import { NeuralNetwork } from './classes/NeuralNetwork';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'DigitRecognition';
  url : string | ArrayBuffer = ''
  nn = new NeuralNetwork(784,[200],10,0.2);

  onTest (event){
    if(event.target.files && event.target.files[0]){
      var reader = new FileReader();

      reader.readAsText(event.target.files[0]);

      reader.onload = (reader =>{
         this.nn.testNet((<FileReader>reader.target).result)
      })
      }
  }

  onTrain(event){
    if(event.target.files && event.target.files[0]){
      var reader = new FileReader();

      reader.readAsText(event.target.files[0]);

      reader.onload = (reader =>{
        this.nn.trainNet((<FileReader>reader.target).result);
      })
    }
  }

  onSelectFile(event){
    const toArray = function (data) {
      return data.split("\n").slice(0, -1);
  }

    if(event.target.files && event.target.files[0]){
      var reader = new FileReader();

      reader.readAsText(event.target.files[0]);

      reader.onload = (event) =>{
      
        let arr = toArray((<FileReader>event.target).result);
        let input = arr[0].split(",").map(Number).slice(1);
        
        let output = this.nn.query(input);

        let label = 0;
        let temp = 0;

        for(let i = 0;i < output.length; i++){
          if(temp < output[i][0]){
            temp = output[i][0];
            label = i;
          }
        }

        console.log("Net thinks it's: " + label);
      }
    }
  }
}

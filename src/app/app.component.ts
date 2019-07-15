import { Component } from '@angular/core';
import { NeuralNetwork } from './classes/NeuralNetwork';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'DigitRecognition';
  url : string | ArrayBuffer = ''
  n = new NeuralNetwork();

  onSelectFile(event){
    console.log(this.n.np.transposeMatrix([[1,2], [3,4]]))
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) =>{
        this.url = (<FileReader>event.target).result;
      }
    }
  }
}

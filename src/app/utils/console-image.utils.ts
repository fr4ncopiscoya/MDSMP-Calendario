import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsoleImageUtils{
    consoleImage(url: string){
        const image = new Image();
        image.src = url;
        
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;            
            const context = canvas.getContext('2d');
            context?.drawImage(image, 0, 0);            
            const imageData = canvas.toDataURL('image/png');
            console.log('%c ', `padding: ${canvas.height}px; background: url(${imageData}); background-size: contain;`);
        };
    }
}
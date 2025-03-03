import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'logoByCategory',
  standalone: true
})
export class LogoByCategoryPipe implements PipeTransform {


  transform(category: string): string {
    switch (category.toUpperCase()) {
      case 'FOOD':
        return '../assets/images/Food-logo.png';
      case 'MEDECINE':
        return '../assets/images/Medecine-logo.png';
      case 'BOOKS':
        return '../assets/images/Books-logo.png';
      case 'ELECTRIC':
        return '../assets/images/Electric-logo.png';
      case 'PARFUM':
        return '../assets/images/Parfum-logo.png';
    }
    return "../assets/images/carte-logo.png";
  }
}

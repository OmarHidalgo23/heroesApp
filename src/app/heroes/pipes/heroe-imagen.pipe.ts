import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'heroeImagen',
  pure: false //para que se actualice al mínimo cambio
})
export class HeroeImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string | any {
    if (!heroe.id || heroe.id == undefined) {
      return `assets/no-image.png`;
    } else if (heroe.id && heroe.alt_img == undefined) {
      return `assets/heroes/${heroe.id}.jpg`;
    } else if (heroe.id && heroe.alt_img) {
      return heroe.alt_img;
    } else if (heroe.id == undefined && heroe.alt_img == '') {
      return `assets/no-image.png`;
    } else {
      return `assets/no-image.png`;
    }
  }
}


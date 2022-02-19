import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    if (this.termino.length == 0) {
      this.heroes = [];
      this.heroeSeleccionado = undefined;
    } else {
      this.heroeService.getHeroesSugerencia(this.termino.trim()).subscribe(heroes => {
        if (heroes.length > 0) {
          this.heroes = heroes
          this.heroeSeleccionado = undefined;
        } else {
          this.heroes = [];
          this.heroeSeleccionado = undefined;
        }
      })
    }

  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroes = [];
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroeService.getHeroesByID(heroe.id!).subscribe(heroe => {
      this.heroeSeleccionado = heroe;
      this.termino = heroe.superhero;
    })
  }

}

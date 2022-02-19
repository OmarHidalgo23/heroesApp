import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img {
      width : 50%;
      border-radius: 5px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;
  constructor(private activateRoute: ActivatedRoute, private heroeService: HeroesService, private router: Router) { }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(resp => {
      this.heroeService.getHeroesByID(resp.id).subscribe(h => {
        this.heroe = h;
      })
    })

  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}

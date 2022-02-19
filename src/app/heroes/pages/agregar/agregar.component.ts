import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
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
export class AgregarComponent implements OnInit {

  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC-COMICS'
    },
    {
      id: 'Marvel Comics',
      desc: 'MARVEL-COMICS'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.route.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params.subscribe(respuesta => {
      this.heroeService.getHeroesByID(respuesta.id).subscribe(heroe => {
        this.heroe = heroe;
      })
    })
  }

  guardar() {
    if (this.heroe.superhero.trim().length == 0) {
      this.mostrarMensaje("El nombre del héroe es obligatorio...", 'mat-warn');
      return;
    }
    if (this.heroe.alt_img?.trim().length == 0) {
      this.mostrarMensaje("La imagen es obligatoria (URL foto)...", 'mat-warn');
      return;
    }

    if (this.heroe.id) {
      this.heroeService.putEditarHeroe(this.heroe).subscribe(heroe => {
        // this.route.navigate(['/heroes/editar', heroe.id]);
        this.mostrarMensaje("Se actualizó correctamente...", 'mat-primary');
      });
    } else {
      //NO HAY NECESIDAD DE LEER LOS CAMPOS YA QUE SE SINCRONIZA SOLO A TRAVÉS DEL OBJETO
      this.heroeService.postAgregarHeroe(this.heroe).subscribe(heroe => {
        this.route.navigate(['/heroes/editar', heroe.id]);
        this.mostrarMensaje("Se agregó correctamente...", 'mat-accent');
      });
    }
  }

  borrar() {

    const dialog = this.dialog.open(ConfirmarComponent, { data: this.heroe });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.heroeService.deleteBorrarHeroe(this.heroe.id!).subscribe(resp => {
          this.mostrarMensaje("Se eliminó correctamente...", 'mat-warn');
          this.route.navigate(['/heroes/listado']);
        });
      }
    })
  }

  mostrarMensaje(mensaje: string, tipo: string) {
    this.snackBar.open(mensaje, "CERRAR", {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', tipo] //Using themes: Switch: 'mat-primary' to 'mat-accent' or 'mat-warn'
    });
  }
}

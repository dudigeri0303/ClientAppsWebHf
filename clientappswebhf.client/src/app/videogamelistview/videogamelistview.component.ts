import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videogamelistview',
  templateUrl: './videogamelistview.component.html',
  styleUrl: './videogamelistview.component.css'
})
export class VideogamelistviewComponent {
  @Input({ required: true })
  id: string;

  @Input({ required: true })
  name: string;

  constructor(private router: Router) { }

  //routingnál át kell passzolni a kattintott elem id-jét az url-ben,
  //Hogy routing után a videogame-componentben a fetcehlésnél be lehessen illesztenni a db id-t
  onClick(id: string): void {
    this.router.navigate(['/detailedview', id]);
  }
}

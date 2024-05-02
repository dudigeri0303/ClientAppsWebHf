import { Component , Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videogamecarview',
  templateUrl: './videogamecarview.component.html',
  styleUrl: './videogamecarview.component.css'
})
export class VideogamecarviewComponent {
  @Input({ required: true })
  id: string;

  @Input({ required: true })
  name: string;

  @Input({ required: true })
  rating: string;
  constructor(private router: Router) { }

  onClick(id: string): void {
    this.router.navigate(['/detailedview', id]);
  }
}

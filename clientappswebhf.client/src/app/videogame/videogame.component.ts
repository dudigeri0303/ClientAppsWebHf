import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videogame',
  templateUrl: './videogame.component.html',
  styleUrl: './videogame.component.css'
})
export class VideogameComponent {
  @Input({ required: true })
  id: string;

  @Input({ required: true })
  name: string;

  @Input({ required: true })
  date: string;

  @Input({ required: true })
  studioName: string;

  @Input({ required: true })
  rateing: string;

  @Input()
  image: Uint8Array;
  constructor(private sanitizer: DomSanitizer){ }

  createImageUrlFromByteArray(): SafeUrl {
    let objectURL = 'data:image/jpeg;base64,' + this.image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}

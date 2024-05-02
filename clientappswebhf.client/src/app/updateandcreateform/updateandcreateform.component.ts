import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Fetcher } from "../Models/Fetcher";
import { VideoGameData } from "../Models/VideoGameData";
import { DateModel } from "../Models/DateModel";
import { NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-updateandcreateform',
  templateUrl: './updateandcreateform.component.html',
  styleUrl: './updateandcreateform.component.css'
})
export class UpdateandcreateformComponent implements OnInit {
  @Input()
  componentId: string;
  @Input()
  videoGame: VideoGameData;
  @Input()
  dateModel: DateModel;

  imageFile: File | null = null;
  idForImageUpload: string = '';
  gameForm: FormGroup;
  ratingForUpdate: number;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder, private calendar: NgbCalendar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.componentId = params['id'];
    });
    if (this.componentId != "_") {
      this.getVideoGameDetails(this.componentId);
      this.createGameFormForUpdate();
    }
    else {
      this.createGameFormForCreate();
    }
  }

  //Bug 1 nem működik ha nem csak beírom pl hogy 5
  createGameFormForUpdate(): void {
    this.gameForm = this.fb.group({
      mainGroup: this.fb.group({
        title: [''],
        studioName: [''],
        rating: [this.ratingForUpdate],
        date: ['']
      }),
      imageGroup: this.fb.group({
        videoGameImage: new FormControl(null)
      }),
    });
  }

  createGameFormForCreate(): void {
    this.gameForm = this.fb.group({
      mainGroup: this.fb.group({
        title: ['', Validators.required],
        studioName: ['', Validators.required],
        rating: [5 , Validators.required],
        date: ['', Validators.required]
      }),
      imageGroup: this.fb.group({
        videoGameImage: new FormControl(null)
      }),
    });
  }

  async getVideoGameDetails(id: string): Promise<void> {
    try {
      const data = await Fetcher.getVideGameDetails(id, this.http);
      this.videoGame = data as VideoGameData;
      this.ratingForUpdate = this.videoGame.rating;
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  async createNewVideogame(): Promise<any> {
    if (this.gameForm.valid) {
      //Sima adatok létrehozása
      const mainGroupData = this.gameForm.get('mainGroup')?.value;
      const data = await Fetcher.createNewVideoGame(mainGroupData, this.http);
      console.log(data);
      this.idForImageUpload = data.id;
      //Kép feltöltése ha van kiválasztva
      if (this.imageFile != null) {
        const formData: FormData = new FormData();
        formData.append('imageFile', this.imageFile);
        const uploadResponse = await Fetcher.uploadImage(this.idForImageUpload, this.http, formData);
        console.log(uploadResponse);
      }
      this.router.navigate(['/listview']);
    }
  }

  async updateVideoGame(): Promise<any> {
    //Sima adatok frissítése
    if (this.gameForm.valid) {
      const mainGroupData = this.gameForm.get('mainGroup')?.value;
      const data = await Fetcher.updateVideoGame(mainGroupData, this.http, this.componentId);
      console.log(data);
      //Kép frissítése ha van kiválasztva
      if (this.imageFile != null) {
        const formData: FormData = new FormData();
        formData.append('imageFile', this.imageFile);
        const uploadResponse = await Fetcher.uploadImage(this.componentId, this.http, formData);
        console.log(uploadResponse);
      }
      this.router.navigate(['/listview']);
    }
  }

  onSelectFile(fileInput: any): void {
    this.imageFile = <File>fileInput.target.files[0];
  }

  onDateSelect(): void {
    let dateString = `${this.dateModel.day}-${this.dateModel.month}-${this.dateModel.year}`;
    this.gameForm.get(['mainGroup', 'date'])?.setValue(dateString);
  }
}

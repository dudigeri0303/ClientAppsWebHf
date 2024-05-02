import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fetcher } from "../Models/Fetcher";

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrl: './listview.component.css'
})
export class ListviewComponent implements OnInit {
  videoGamesListView: any[];
  videoGamesCardView: any[];

  @Input()
  viewType: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetVideoGamesListView();
    this.getVideoGamesCardView();
    this.viewType = false;
  }
  //Fetch the videogame datas from the database with list view
  async GetVideoGamesListView(): Promise<any> {
    const data = await Fetcher.getVideoGamesListView(this.http);
    this.videoGamesListView = data;
  }

  async getVideoGamesCardView(): Promise<any> {
    const data = await Fetcher.getVideoGamesCardView(this.http);
    this.videoGamesCardView = data;
  }
}

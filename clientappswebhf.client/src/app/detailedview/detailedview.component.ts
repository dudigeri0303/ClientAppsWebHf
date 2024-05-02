import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fetcher } from "../Models/Fetcher";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-detailedview',
  templateUrl: './detailedview.component.html',
  styleUrl: './detailedview.component.css'
})
export class DetailedviewComponent implements OnInit {
  videoGame: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    //A routeing-ból ki kell szedni az id-t, hogy át lehessen passzolni a fetch-nek
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getVideoGameDetails(id);
    });
  }
  //Fetch the videogame datas from the database
  async getVideoGameDetails(id: string): Promise<any> {
    try {
      const data = await Fetcher.getVideGameDetails(id, this.http);
      this.videoGame = data;
    }
    catch (error) {
      throw error;
    }
  }

  async deleteVideoGame(id: string): Promise<any> {
    const data = await Fetcher.deleteVideoGame(id, this.http);
    console.log('Video game deleted successfully');
    this.router.navigate(['/listview']);
  }

  async openDeleteModalWindow(): Promise<any> {
    let modal = this.modalService.open(DeleteModalComponent, { backdrop: 'static', centered: true });
    (modal.componentInstance as DeleteModalComponent).initParameters({
      onYes: async () => {
        modal.close();
        await this.deleteVideoGame(this.videoGame.id);
      },
      onNo: () => {
        modal.close();
      }
    });
  }

  goToEditForm(id: string) {
    this.router.navigate(['/updateandcreateview', id]);
  }
}

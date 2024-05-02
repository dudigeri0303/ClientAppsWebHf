import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
export class Fetcher {
  public static async getVideGameDetails(id: string, http: HttpClient): Promise<any> {
    try {
      return await http.get<any>('https://localhost:7267/api/VideoGame/GetVideoGameDetailedViewById?id=' + id).toPromise();
    }
    catch (error) {
      throw error;
    } 
  }

  public static async createNewVideoGame(formData: FormGroup, http: HttpClient): Promise<any> {
    try {
      return await http.post('https://localhost:7267/api/VideoGame/AddNewVideoGame', formData).toPromise();
    }
    catch (error) {
      throw error;
    }
  }

  public static async updateVideoGame(formData: FormGroup, http: HttpClient, componentId: string): Promise<any> {
    try {
      return await http.put('https://localhost:7267/api/VideoGame/UpdateVideoGame?id=' + componentId, formData).toPromise();
    }
    catch (error) {
      throw error;
    }
  }

  public static async getVideoGamesListView(http: HttpClient): Promise<any> {
    try {
      return await http.get<any[]>('https://localhost:7267/api/VideoGame/GetVideoGamesListView').toPromise(); 
    }
    catch (error) {
      throw error;
    }
  }

  public static async getVideoGamesCardView(http: HttpClient): Promise<any> {
    try {
      return await http.get<any[]>('https://localhost:7267/api/VideoGame/GetVideGamesCardView').toPromise();
    }
    catch (error) {
      throw error;
    }
  }

  public static async deleteVideoGame(id: string, http: HttpClient): Promise<any> {
    try {
      return await http.delete<any>('https://localhost:7267/api/VideoGame/DeleteVideoGameById?id=' + id).toPromise();
    }
    catch (error) {
      throw error;
    }
  }
  public static async uploadImage(id: string, http: HttpClient, formData: FormData): Promise<any> {
    try {
       return await http.post('https://localhost:7267/api/VideoGame/UploadImageForVideoGame?id=' + id, formData).toPromise();
    }
    catch (error) {
      throw error;
    }
  }
}

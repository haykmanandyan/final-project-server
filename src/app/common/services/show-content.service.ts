import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ShowContentService {

  public showContent = false;

  public switchMessage(): void {
    this.showContent = !this.showContent;
  }
}

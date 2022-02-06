import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public showLoader = false;

  constructor() {}

  public show(): void {
    setTimeout(()=> this.showLoader = true,0);
  }

  public hide(): void {
    setTimeout(()=> this.showLoader = false,0);
  }
}

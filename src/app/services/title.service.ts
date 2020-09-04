import { Injectable } from "@angular/core";
import { AppComponent } from '../app.component';

@Injectable({
    providedIn: 'root'
  })
  export class TitleService {
      public title: string;
      public appComponentRef: AppComponent;
  }
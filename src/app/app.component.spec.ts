/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {PostComponent} from "./components/post/post.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {AngularFireModule} from "angularfire2";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

// Must export the config
const firebaseConfig = {
  apiKey: "AIzaSyDRWInNTqMZMkbbFxeJfbjHN3dwSZLJbKI",
  authDomain: "yopyop-5e569.firebaseapp.com",
  databaseURL: "https://yopyop-5e569.firebaseio.com",
  storageBucket: "yopyop-5e569.appspot.com",
  messagingSenderId: "798678080282"
};

describe('App: YopAngular2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        PostComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Year Of Programming');
  }));
});

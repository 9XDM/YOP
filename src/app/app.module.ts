import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {PostComponent} from "./components/post/post.component";
import {AngularFireModule} from "angularfire2";

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDRWInNTqMZMkbbFxeJfbjHN3dwSZLJbKI",
  authDomain: "yopyop-5e569.firebaseapp.com",
  databaseURL: "https://yopyop-5e569.firebaseio.com",
  storageBucket: "yopyop-5e569.appspot.com",
  messagingSenderId: "798678080282"
};

@NgModule({
  // 어떤 컴포넌트를 사용할 것인지.
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PostComponent
  ],

  // 내가 외부 모듈을 불러올 때
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  // 서비스 injection
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

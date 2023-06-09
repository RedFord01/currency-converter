import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ConverterComponent } from './components/converter/converter.component';

@NgModule({
  declarations: [
	AppComponent,
	HeaderComponent,
  ConverterComponent
  ],
  imports: [
	BrowserModule,
  HttpClientModule,
	AppRoutingModule,
  FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

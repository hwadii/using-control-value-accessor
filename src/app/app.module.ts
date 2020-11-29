import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from './custom-control.component';
import { CustomSelectComponent } from './custom-select.component';

@NgModule({
  declarations: [AppComponent, CustomControlComponent, CustomSelectComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

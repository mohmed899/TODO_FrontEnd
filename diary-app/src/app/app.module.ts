import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DiaryEntryComponent } from './diary-entry/diary-entry.component';
import { DataService } from './Services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { DiaryFormComponent } from './diary-form/diary-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from './Services/toast.service';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DiaryEntryComponent,
    DiaryFormComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule,
    DynamicDialogModule,
    FileUploadModule,
    InputTextModule,
    ToastModule,
    ChipModule
   
  ],
  providers: [DataService ,ToastService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

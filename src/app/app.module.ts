import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroServiceService } from './hero-service.service';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from "ag-grid-angular/main";
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { BlockUIModule } from 'ng-block-ui';
import { VisitedCellComponent } from './visited-cell/visited-cell.component';
import { NameCellComponent } from './name-cell/name-cell.component';

import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessageComponent,
    DashboardComponent,
    VisitedCellComponent,
    NameCellComponent
  ],
  imports: [
    AgGridModule.withComponents([
      VisitedCellComponent,
      NameCellComponent
    ]),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    BlockUIModule,
    ModalModule.forRoot()
  ],
  providers: [HeroServiceService, MessageService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

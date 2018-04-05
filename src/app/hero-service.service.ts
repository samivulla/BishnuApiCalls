import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class HeroServiceService {

  private apiUrl: string = 'https://appqa.in01.dru.care:8047/opd/fetchPatientVisitDetails';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroServie: loading heroes...');
    return Observable
      .timer(2000)
      .do(() => { this.messageService.add('HeroService: fetched Heroes'); })
      .map(() => { return HEROES });
  }

  getHero(id): Observable<Hero> {
    this.messageService.add(`HeroService: get hero #${id}`);
    return this.getHeroes()
      .map((heroes: Hero[]) => {
        this.messageService.add(`HeroService: got hero #${id}`);
        return heroes.find((hero: Hero) => hero.id === id);
      });
  }

  getTableData(payload): Observable<any> {
    const params = new HttpParams()
      .set('timestamp', new Date().toJSON());
    const reqBody = {
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      orgId: 311,
      authenticatedUserId: 120171221000001
    };
    return this.http.post(this.apiUrl, reqBody, { params });
  }


}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroServiceService } from '../hero-service.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {

  constructor(private service: HeroServiceService) { }

  private heroes:Array<Hero>;
  private heroesSubscription: Subscription;

  @ViewChild('staticModal')
  private staticModal: ModalDirective;

  ngOnInit() {
    // this.getHeroes();
  }

  ngOnDestroy() {
    this.heroesSubscription.unsubscribe();
  }
  
  private getHeroes() {
    this.heroesSubscription = this.service
      .getHeroes()
      .subscribe({ next: this.onNext.bind(this) });
  }
  
  private onNext(heroes) {
    this.heroes = [...heroes];
  }

  openModal() {
    console.log(this.staticModal);
    this.staticModal.show();
  }

}

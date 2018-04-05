import { Component, ViewEncapsulation } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  selector: 'app-name-cell',
  templateUrl: './name-cell.component.html',
  styleUrls: ['./name-cell.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NameCellComponent implements AgRendererComponent {

  private imagePath: string;
  private name: string;

  constructor() { }

  agInit(param: any) {
    this.imagePath = param.data.imagePath || ((param.data.gender === 'male') ? '/assets/boy.svg' : '/assets/girl.svg');
    this.name = param.value;
  }

  refresh() {
    return true;
  }

}

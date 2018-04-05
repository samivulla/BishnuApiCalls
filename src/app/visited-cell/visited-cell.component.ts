import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  selector: 'app-visited-cell',
  templateUrl: './visited-cell.component.html',
  styleUrls: ['./visited-cell.component.css']
})
export class VisitedCellComponent implements AgRendererComponent {

  private value: string;

  agInit(params: any) {
    this.value = params.value;
  }

  refresh() {
    return true;
  }

}

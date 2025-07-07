import { Component, input, output } from '@angular/core';
import { Hero } from '../../../shared/models/hero.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  imports: [FontAwesomeModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  heroes = input.required<Hero[]>();
  edit = output<number>();
  delete = output<number>();
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
}

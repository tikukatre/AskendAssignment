import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FilterFormComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Filterapp-client';
}

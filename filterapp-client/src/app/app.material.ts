import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-material-component',
  templateUrl: './material.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  styleUrls: ['./material.component.css'],
})
export class MaterialComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}

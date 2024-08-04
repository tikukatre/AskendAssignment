import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterService } from '../filter.service';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { FilterConditions } from '../models/filter-conditions';
import { Filter } from '../models/filter';
import { MatButtonModule } from '@angular/material/button';
import { FilterFormModalComponent } from '../filter-form-modal/filter-form-modal.component';

@Component({
  selector: 'app-filter-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    MatButtonModule,
    FilterFormModalComponent,
    FilterFormComponent,
  ],
  templateUrl: './filter-dashboard.component.html',
  styleUrl: './filter-dashboard.component.css',
})
export class FilterDashboardComponent implements OnInit {
  filters: Filter[] = [];
  newFilterForm!: FormGroup;

  @ViewChild('newFilterPanel') newFilterPanel!: MatExpansionPanel;

  constructor(
    private filterService: FilterService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.initNewFilterForm();
  }

  ngOnInit() {
    this.loadFilters();
  }

  // Load filters from the server
  loadFilters(): void {
    this.filterService.getFilters().subscribe(
      (filters) => (this.filters = filters),
      (error) => console.error('Error loading filters:', error)
    );
  }

  deleteFilter(filterId: number) {
    this.filterService.deleteFilter(filterId).subscribe(
      () => this.loadFilters(),
      (error) => console.error('Error deleting filter:', error)
    );
  }

  // Open the filter form modal to create a new filter
  addNewFilter() {
    this.disableBodyScroll();
    const dialogRef = this.dialog.open(FilterFormModalComponent, {
      panelClass: 'resizable-mat-dialog-panel',
      data: { isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.enableBodyScroll();
      if (result) {
        this.loadFilters();
      }
    });
  }

  // Initializes the new filter form in the non-modal panel
  initNewFilterForm() {
    this.newFilterForm = this.fb.group({
      name: ['', Validators.required],
      criteriaList: this.fb.array([]),
    });
  }

  closeFilterCreation(): void {
    this.newFilterPanel.close();
    this.initNewFilterForm();
  }

  // Save the new filter to the server
  saveNewFilter(): void {
    if (this.newFilterForm.valid) {
      this.filterService
        .createFilter(this.newFilterForm.value)
        .subscribe(() => {
          this.loadFilters();
          this.newFilterPanel.close();
          this.initNewFilterForm();
        });
    } else {
      this.newFilterForm.markAllAsTouched();
    }
  }

  // Get the label for the filter condition from the FilterConditions class
  getConditionLabel(type: string, value: string): string {
    return FilterConditions.getConditionLabel(type, value);
  }

  private disableBodyScroll() {
    this.renderer.addClass(document.body, 'no-scroll');
  }

  private enableBodyScroll() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }
}

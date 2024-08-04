import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterService } from '../filter.service';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FilterFormComponent } from '../filter-form/filter-form.component';

@Component({
  selector: 'app-filter-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogContent,
    FilterFormComponent,
  ],
  templateUrl: './filter-form-modal.component.html',
  styleUrl: './filter-form-modal.component.css',
})
export class FilterFormModalComponent {
  filterForm!: FormGroup;
  // Access the child component FilterFormComponent
  @ViewChild(FilterFormComponent) filterFormComponent!: FilterFormComponent;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
    public dialogRef: MatDialogRef<FilterFormModalComponent>
  ) {
    this.initializeForm();
    this.dialogRef.updateSize('800px', '80vh');
  }

  // Save the filter to the server
  onSave(): void {
    if (this.filterFormComponent.isFormValid()) {
      this.filterService.createFilter(this.filterForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close(false);
  }

  // Initialize the filter form with default values
  private initializeForm(): void {
    this.filterForm = this.fb.group({
      name: ['', Validators.required],
      criteriaList: this.fb.array([this.createCriteria()]),
    });
  }

  // Create a new criteria form group with default values
  private createCriteria(): FormGroup {
    return this.fb.group({
      type: ['NUMBER', Validators.required],
      condition: ['', Validators.required],
      value: ['', Validators.required],
    });
  }
}

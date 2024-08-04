import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FilterConditions } from '../models/filter-conditions';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent {
  @Input() filterForm!: FormGroup;

  // Define the criteria type options for the select dropdown
  typeOptions = [
    { value: 'NUMBER', label: 'Amount' },
    { value: 'STRING', label: 'Title' },
    { value: 'DATE', label: 'Date' },
  ];

  constructor(private fb: FormBuilder) {}

  // Initialize the criteria form array with a default criteria
  ngOnInit(): void {
    this.initializeCriteria();
  }
  ngOnChanges(): void {
    this.initializeCriteria();
  }

  get criteriaList(): FormArray {
    return this.filterForm.get('criteriaList') as FormArray;
  }
  // Add a new criteria field to the form
  addCriteria(): void {
    this.criteriaList.push(this.createCriteria());
  }
  // Create a new criteria form group with default values
  createCriteria(): FormGroup {
    return this.fb.group({
      type: ['NUMBER', Validators.required],
      condition: ['', Validators.required],
      value: ['', Validators.required],
    });
  }
  // Remove a criteria field from the form
  removeCriteria(index: number): void {
    if (this.criteriaList.length > 1) {
      this.criteriaList.removeAt(index);
    }
  }
  // Get the condition options for a selected criteria type
  getConditionOptions(type: string): { value: string; label: string }[] {
    return FilterConditions.getConditionOptions(type);
  }
  // Reset the condition and value fields when the criteria type changes
  onTypeChange(index: number): void {
    const criteriaControl = this.criteriaList.at(index);
    criteriaControl.get('condition')?.setValue('');
    criteriaControl.get('value')?.setValue('');
  }

  // Check if the form is valid
  isFormValid(): boolean {
    return this.filterForm.valid;
  }

  // Check if the control should show an error message
  shouldShowError(controlName: string, criteriaIndex?: number): boolean {
    const control =
      criteriaIndex !== undefined
        ? this.criteriaList.at(criteriaIndex).get(controlName)
        : this.filterForm.get(controlName);

    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }
  // Initialize the criteria form array with a default criteria when the form is loaded
  private initializeCriteria(): void {
    if (this.criteriaList.length === 0) {
      this.addCriteria();
    }
  }
}

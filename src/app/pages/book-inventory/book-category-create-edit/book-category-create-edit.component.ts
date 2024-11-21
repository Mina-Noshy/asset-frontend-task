import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookCategoryService } from '../../../core/services/book-inventory/book-category.service';
import { BookCategory } from '../../../core/data/book-inventory/book-category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { DialogService } from '../../../core/services/common/dialog.service';

@Component({
  selector: 'app-book-category-create-edit',
  templateUrl: './book-category-create-edit.component.html',
  styleUrls: ['./book-category-create-edit.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
})
export class BookCategoryCreateEditComponent implements OnInit {
  bookCategoryForm: FormGroup;
  isEditMode: boolean = false;
  categoryId: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private bookCategoryService: BookCategoryService,
    private dialogService:DialogService,
    private dialogRef: MatDialogRef<BookCategoryCreateEditComponent>, 
  ) {
    this.bookCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.isEditMode = this.data.isEditMode;
        this.categoryId = this.data.id;
        this.loadCategoryData(this.data.id);
  }

  loadCategoryData(id: number): void {
    this.bookCategoryService.getById(id).subscribe((response) => {
      let category = response.data as BookCategory;
      this.bookCategoryForm.patchValue({
        name: category.name,
        description: category.description,
      });
    });
  }

  saveCategory(): void {
    if (this.bookCategoryForm.invalid) return;

    const categoryData: BookCategory = {
      id: this.categoryId,
      ...this.bookCategoryForm.value,
    };

    if (this.isEditMode) {
      // Update category
      this.bookCategoryService.update(categoryData.id, categoryData).subscribe((response) => {
        this.dialogService.openDialogMsg('Book Category successfully');
        this.dialogRef.close(true); 
      });
    } else {
      // Create new category
      this.bookCategoryService.create(categoryData).subscribe((response) => {
        this.dialogService.openDialogMsg('Book Category successfully');
        this.dialogRef.close(true); 
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

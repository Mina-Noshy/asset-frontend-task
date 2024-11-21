import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookMasterService } from '../../../core/services/book-inventory/book-master.service';
import { DialogService } from '../../../core/services/common/dialog.service';
import { BookMaster } from '../../../core/data/book-inventory/book-master';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BookCategoryService } from '../../../core/services/book-inventory/book-category.service';
import { CommonModule } from '@angular/common';
import { DropdownItem } from '../../../core/data/common/dropdown-item';

@Component({
  selector: 'app-book-master-create-edit',
  templateUrl: './book-master-create-edit.component.html',
  styleUrl: './book-master-create-edit.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
})
export class BookMasterCreateEditComponent {

  categories: DropdownItem[] = [];
  bookMasterForm: FormGroup;
  isEditMode: boolean = false;
  categoryId: number | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private bookMasterService: BookMasterService,
    private bookCategoryService: BookCategoryService,
    private dialogService: DialogService,
    private dialogRef: MatDialogRef<BookMasterCreateEditComponent>
  ) {
    this.bookMasterForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
      quantity: [1, [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      publicationDate: [new Date(2000, 1, 1), [Validators.required]],
      categoryId: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();

    this.isEditMode = this.data.isEditMode;
    this.categoryId = this.data.id;
    if (this.isEditMode) {
      this.loadBookMasterData(this.data.id);
    }
  }

  loadBookMasterData(id: number): void {
    this.bookMasterService.getById(id).subscribe(response => {
      const bookMaster = response.data as BookMaster;
      this.bookMasterForm.patchValue({
        title: bookMaster.title,
        author: bookMaster.author,
        quantity: bookMaster.quantity,
        description: bookMaster.description,
        publicationDate: bookMaster.publicationDate,
        categoryId: bookMaster.categoryId,
      });
    });
  }

  loadCategories(): void {
    this.bookCategoryService.getAsDropdown().subscribe(response => {
      console.log('Categories loaded:', response);  // Verify the API response
      this.categories = response.data as DropdownItem[];
    });
  }

  saveBookMaster(): void {
    if (this.bookMasterForm.invalid) return;

    const bookMasterData: BookMaster = {
      id: this.categoryId,
      ...this.bookMasterForm.value,
    };

    if (this.isEditMode) {
      this.bookMasterService.update(bookMasterData.id, bookMasterData).subscribe(response => {
        this.dialogService.openDialogMsg('Book Master updated successfully');
        this.dialogRef.close(true);
      });
    } else {
      this.bookMasterService.create(bookMasterData).subscribe(response => {
        this.dialogService.openDialogMsg('Book Master created successfully');
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

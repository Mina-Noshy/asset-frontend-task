import { Component, OnInit } from '@angular/core';
import { BookCategory } from '../../../core/data/book-inventory/book-category';
import { BookCategoryService } from '../../../core/services/book-inventory/book-category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../core/services/common/dialog.service';
import { ApiResponseType } from '../../../core/data/common/api-response-type';
import { MatDialog } from '@angular/material/dialog';
import { BookCategoryCreateEditComponent } from '../book-category-create-edit/book-category-create-edit.component';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrl: './book-category.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatSelectModule, 
  ],
})
export class BookCategoryComponent implements OnInit {
  bookCategories: BookCategory[] = [];
  searchTerm: string = "";
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalCount: number = 0;
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;

  pageSizes: number[] = [5, 10, 20, 50];
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  constructor(private bookCategoryService: BookCategoryService,
    private dialog: DialogService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBookCategories();
  }

  loadBookCategories(): void {
    this.bookCategoryService.getAll(this.pageNumber, this.pageSize, this.searchTerm).subscribe(response => {
      this.bookCategories = response.data.data;
      this.pageNumber = response.data.pageNumber;
      this.pageSize = response.data.pageSize;
      this.totalPages = response.data.totalPages;
      this.totalCount = response.data.totalCount;
      this.hasNextPage = response.data.hasNextPage;
      this.hasPreviousPage = response.data.hasPreviousPage;
    });
  }

  create() {
    const dialogRef = this.matDialog.open(BookCategoryCreateEditComponent, {
      width: 'auto', 
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { isEditMode: false, id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBookCategories();
      }
    });
  }

  edit(id: number) {
    const dialogRef = this.matDialog.open(BookCategoryCreateEditComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { isEditMode: true, id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBookCategories();
      }
    });
  }

  async delete(id: number) {
    const result = await this.dialog.openConfirmDialog('continue to delete this item?');

    if (result) {
      this.bookCategoryService.delete(id).subscribe(
        (response) => {
          if (response.code == ApiResponseType.Success) {
            this.dialog.openDialogMsg('deleted successfully');
            this.pageNumber = 1;
            this.loadBookCategories();
          } else {
            this.dialog.openDialogMsg(response.message);
          }
        }
      )
    }
  }

  onSearchChange(): void {
    setTimeout(() => {
      this.pageNumber = 1;
      this.loadBookCategories();
    }, 2000);
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.pageNumber = 1;
    this.loadBookCategories();
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.pageNumber++;
      this.loadBookCategories();
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage) {
      this.pageNumber--;
      this.loadBookCategories();
    }
  }

}

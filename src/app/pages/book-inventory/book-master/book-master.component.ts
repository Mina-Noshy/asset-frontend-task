import { Component, OnInit } from '@angular/core';
import { BookMaster } from '../../../core/data/book-inventory/book-master';
import { BookMasterService } from '../../../core/services/book-inventory/book-master.service';
import { DialogService } from '../../../core/services/common/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { BookMasterCreateEditComponent } from '../book-master-create-edit/book-master-create-edit.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-book-master',
  templateUrl: './book-master.component.html',
  styleUrl: './book-master.component.scss',
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
export class BookMasterComponent implements OnInit {
  bookMasters: BookMaster[] = [];
  searchTerm: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalCount: number = 0;
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;

  pageSizes: number[] = [5, 10, 20, 50];
  displayedColumns: string[] = ['id', 'category', 'title', 'author', 'publicationDate', 'quantity', 'description', 'actions'];

  constructor(
    private bookMasterService: BookMasterService,
    private dialog: DialogService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBookMasters();
  }

  loadBookMasters(): void {
    this.bookMasterService
      .getAll(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe((response) => {
        this.bookMasters = response.data.data;
        this.pageNumber = response.data.pageNumber;
        this.pageSize = response.data.pageSize;
        this.totalPages = response.data.totalPages;
        this.totalCount = response.data.totalCount;
        this.hasNextPage = response.data.hasNextPage;
        this.hasPreviousPage = response.data.hasPreviousPage;
      });
  }

  create() {
    const dialogRef = this.matDialog.open(BookMasterCreateEditComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { isEditMode: false, id: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBookMasters();
      }
    });
  }

  edit(id: number) {
    const dialogRef = this.matDialog.open(BookMasterCreateEditComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { isEditMode: true, id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBookMasters();
      }
    });
  }

  delete(id: number) {
    this.dialog.openConfirmDialog('Are you sure you want to delete this item?').then((result) => {
      if (result) {
        this.bookMasterService.delete(id).subscribe(() => {
          this.dialog.openDialogMsg('Deleted successfully');
          this.pageNumber = 1;
          this.loadBookMasters();
        });
      }
    });
  }

  onSearchChange(): void {
    setTimeout(() => {
      this.pageNumber = 1;
      this.loadBookMasters();
    }, 2000);
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.pageNumber = 1;
    this.loadBookMasters();
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.pageNumber++;
      this.loadBookMasters();
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage) {
      this.pageNumber--;
      this.loadBookMasters();
    }
  }
}

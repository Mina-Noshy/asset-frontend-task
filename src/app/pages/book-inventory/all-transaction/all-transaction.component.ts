import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BookTransactionService } from '../../../core/services/book-inventory/book-transaction.service';
import { DialogService } from '../../../core/services/common/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { BookTransaction } from '../../../core/data/book-inventory/book-transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-transaction',
  templateUrl: './all-transaction.component.html',
  styleUrl: './all-transaction.component.scss',
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
export class AllTransactionComponent implements OnInit  {
  bookTransactions: BookTransaction[] = [];
  searchTerm: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalCount: number = 0;
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;

  pageSizes: number[] = [5, 10, 20, 50];
  displayedColumns: string[] = [
    'id', 
    'bookTitle', 
    'userName', 
    'transactionType', 
    'transactionDate', 
    'dueDate', 
    'returnedDate', 
    'isOverdue', 
    'actions'
  ];

  constructor(
    private bookTransactionService: BookTransactionService,
    private dialog: DialogService,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBookTransactions();
  }

  loadBookTransactions(): void {
    this.bookTransactionService
      .getAllTransactions(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe((response) => {
        this.bookTransactions = response.data.data;
        this.pageNumber = response.data.pageNumber;
        this.pageSize = response.data.pageSize;
        this.totalPages = response.data.totalPages;
        this.totalCount = response.data.totalCount;
        this.hasNextPage = response.data.hasNextPage;
        this.hasPreviousPage = response.data.hasPreviousPage;
      });
  }

  create() {
    // const dialogRef = this.matDialog.open(BookTransactionCreateEditComponent, {
    //   width: 'auto', 
    //   height: 'auto',
    //   panelClass: 'custom-dialog-container',
    //   data: { isEditMode: false, id: 0 }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.loadBookTransactions();
    //   }
    // });
  }

  details(id: number) {
    this.router.navigate(['/book-transactions', id]);
  }

  onSearchChange(): void {
    setTimeout(() => {
      this.pageNumber = 1;
      this.loadBookTransactions();
    }, 2000);
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.pageNumber = 1;
    this.loadBookTransactions();
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.pageNumber++;
      this.loadBookTransactions();
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage) {
      this.pageNumber--;
      this.loadBookTransactions();
    }
  }
}

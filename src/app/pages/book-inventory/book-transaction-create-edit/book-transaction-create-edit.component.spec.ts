import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTransactionCreateEditComponent } from './book-transaction-create-edit.component';

describe('BookTransactionCreateEditComponent', () => {
  let component: BookTransactionCreateEditComponent;
  let fixture: ComponentFixture<BookTransactionCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTransactionCreateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTransactionCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

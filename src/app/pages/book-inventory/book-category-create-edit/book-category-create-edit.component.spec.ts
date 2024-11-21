import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoryCreateEditComponent } from './book-category-create-edit.component';

describe('BookCategoryCreateEditComponent', () => {
  let component: BookCategoryCreateEditComponent;
  let fixture: ComponentFixture<BookCategoryCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCategoryCreateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCategoryCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

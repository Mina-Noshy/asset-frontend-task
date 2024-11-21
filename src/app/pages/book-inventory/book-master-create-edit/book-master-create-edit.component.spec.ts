import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMasterCreateEditComponent } from './book-master-create-edit.component';

describe('BookMasterCreateEditComponent', () => {
  let component: BookMasterCreateEditComponent;
  let fixture: ComponentFixture<BookMasterCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookMasterCreateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMasterCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

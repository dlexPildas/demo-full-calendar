import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasListComponent } from './datas-list.component';

describe('DatasListComponent', () => {
  let component: DatasListComponent;
  let fixture: ComponentFixture<DatasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

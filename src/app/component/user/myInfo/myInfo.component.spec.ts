import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInfoComponent } from './myInfo.component';

describe('MyInfoComponent', () => {
  let component: MyInfoComponent;
  let fixture: ComponentFixture<MyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

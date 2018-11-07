import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNormalComponent } from './sidebar-normal.component';

describe('SidebarNormalComponent', () => {
  let component: SidebarNormalComponent;
  let fixture: ComponentFixture<SidebarNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

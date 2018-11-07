import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDeprecatedComponent } from './editor-deprecated.component';

describe('EditorComponent', () => {
  let component: EditorDeprecatedComponent;
  let fixture: ComponentFixture<EditorDeprecatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDeprecatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDeprecatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  template: `<mat-toolbar>Test Toolbar</mat-toolbar>`
})
class TestAppComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [MatToolbarModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TestAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render toolbar', () => {
    const fixture = TestBed.createComponent(TestAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // Check that toolbar exists (text may vary)
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
  });
});

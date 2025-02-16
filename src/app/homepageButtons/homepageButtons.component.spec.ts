import { TestBed } from '@angular/core/testing';
import { HomepageButtonsComponent } from './homepageButtons.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageButtonsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomepageButtonsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'SPA' title`, () => {
    const fixture = TestBed.createComponent(HomepageButtonsComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SPA');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomepageButtonsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, SPA');
  });
});

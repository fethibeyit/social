import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommandBarComponent } from './post-command-bar.component';

describe('PostCommandBarComponent', () => {
  let component: PostCommandBarComponent;
  let fixture: ComponentFixture<PostCommandBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCommandBarComponent]
    });
    fixture = TestBed.createComponent(PostCommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

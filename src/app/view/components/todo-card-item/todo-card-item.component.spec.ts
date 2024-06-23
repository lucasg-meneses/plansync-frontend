import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardItemComponent } from './todo-card-item.component';

describe('TodoCardItemComponent', () => {
  let component: TodoCardItemComponent;
  let fixture: ComponentFixture<TodoCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCardItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

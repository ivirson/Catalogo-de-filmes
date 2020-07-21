import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarFilmeComponent } from './visualizar-filme.component';

describe('VisualizarFilmeComponent', () => {
  let component: VisualizarFilmeComponent;
  let fixture: ComponentFixture<VisualizarFilmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarFilmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

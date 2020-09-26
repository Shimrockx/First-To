import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimulationPage } from './simulation.page';

describe('SimulationPage', () => {
  let component: SimulationPage;
  let fixture: ComponentFixture<SimulationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NopitarPage } from './nopitar.page';

describe('NopitarPage', () => {
  let component: NopitarPage;
  let fixture: ComponentFixture<NopitarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NopitarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NopitarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

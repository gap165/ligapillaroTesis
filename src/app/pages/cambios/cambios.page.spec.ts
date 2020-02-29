import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambiosPage } from './cambios.page';

describe('CambiosPage', () => {
  let component: CambiosPage;
  let fixture: ComponentFixture<CambiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

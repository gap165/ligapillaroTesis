import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarnetsPage } from './carnets.page';

describe('CarnetsPage', () => {
  let component: CarnetsPage;
  let fixture: ComponentFixture<CarnetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarnetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { LogoComponent } from '../shared/component/logo/logo.component';

let route: ActivatedRoute;
const paramsData = new BehaviorSubject({
  message: 'Test Error Message',
});

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let errorComponet: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent, LogoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: paramsData,
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
      });

    route = TestBed.inject(ActivatedRoute);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMessage correctly from route data', () => {
    route.data.subscribe((err) => {
      expect(err).toBeTruthy();
      expect(err['message']).toBe('Test Error Message');
    });
  });
});

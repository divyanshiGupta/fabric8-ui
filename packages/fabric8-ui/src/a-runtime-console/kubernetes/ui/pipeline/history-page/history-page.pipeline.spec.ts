/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { empty as observableEmpty, Observable, of as observableOf } from 'rxjs';
import { APIsStore } from '../../../store/apis.store';
import { BuildStore } from '../../../store/build.store';
import { BuildConfigStore } from '../../../store/buildconfig.store';
import { PipelinesHistoryPage } from './history-page.pipeline.component';

describe('PipelinesHistoryPage', () => {
  let component: PipelinesHistoryPage;
  let fixture: ComponentFixture<PipelinesHistoryPage>;

  beforeEach(async(() => {
    let mockBuildConfigStore: any = jasmine.createSpy('BuildConfigService');
    mockBuildConfigStore.loading = observableOf(false);
    mockBuildConfigStore.list = observableEmpty();
    let mockBuildStore: any = jasmine.createSpy('BuildStore');
    mockBuildStore.loading = observableOf(true);
    mockBuildStore.list = observableEmpty();
    let mockAPIsStore: any = jasmine.createSpyObj('APIsStore', ['load']);
    mockAPIsStore.loading = observableEmpty();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PipelinesHistoryPage],
      providers: [
        { provide: BuildConfigStore, useValue: mockBuildConfigStore },
        { provide: BuildStore, useValue: mockBuildStore },
        { provide: APIsStore, useValue: mockAPIsStore },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelinesHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

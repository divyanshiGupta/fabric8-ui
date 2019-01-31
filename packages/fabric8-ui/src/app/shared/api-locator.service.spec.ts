import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProviderService } from './account/provider.service';
import { ApiLocatorService, BaseApiLocatorService } from './api-locator.service';
import { Fabric8UIConfig } from './config/fabric8-ui-config';

@Component({
  selector: 'app-apilocatorservicecomp',
  template: '',
})
export class TestAPILocatorServiceComponent {
  constructor(public apilocator: ApiLocatorService) {}
}

class ApiLocatorServiceTest extends BaseApiLocatorService {
  get(type: string): string {
    return this.buildApiUrl(type);
  }
}

describe('API Locator Service', () => {
  const base = function() {
    return window.location.hostname + ':' + window.location.port;
  };
  const url = function(base: string) {
    return 'http://' + base;
  };

  it('Add prefix to configured service URL', () => {
    const loc = new ApiLocatorServiceTest(
      new Fabric8UIConfig(),
      new Map([['random_test', 'api']]),
      new Map(),
    );
    expect(loc.get('random_test')).toMatch(url('api.' + base()));
  });

  it('Add suffix to configured service URL', () => {
    const loc = new ApiLocatorServiceTest(
      new Fabric8UIConfig(),
      new Map(),
      new Map([['random_test', 'api']]),
    );
    expect(loc.get('random_test')).toMatch(url(base() + '/api'));
  });

  it('Add prefix and suffix to configured service URL', () => {
    const loc = new ApiLocatorServiceTest(
      new Fabric8UIConfig(),
      new Map([['random_test', 'api']]),
      new Map([['random_test', 'api']]),
    );
    expect(loc.get('random_test')).toMatch(url('api.' + base() + '/api'));
  });

  it('Do not change non configured service URL', () => {
    const loc = new ApiLocatorServiceTest(new Fabric8UIConfig(), new Map(), new Map());
    expect(loc.get('random_test')).toMatch(url(base()));
  });

  it('Ensure APILocatorService is injectable', () => {
    TestBed.configureTestingModule({
      declarations: [TestAPILocatorServiceComponent],
      providers: [ApiLocatorService, Fabric8UIConfig, ProviderService],
    });
    const fixture = TestBed.createComponent(TestAPILocatorServiceComponent);
    const comp = fixture.componentInstance;
    expect(comp.apilocator).toBeTruthy();
  });
});

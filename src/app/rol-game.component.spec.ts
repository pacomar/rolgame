import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { RolGameAppComponent } from '../app/rol-game.component';

beforeEachProviders(() => [RolGameAppComponent]);

describe('App: RolGame', () => {
  it('should create the app',
      inject([RolGameAppComponent], (app: RolGameAppComponent) => {
    expect(app).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  const actions$: Observable<any> = new Observable();
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { RolGameAppComponent, environment } from './app/';
import {FIREBASE_PROVIDERS,
	defaultFirebase,
	AngularFire,
	AuthMethods,
	AuthProviders,
	firebaseAuthConfig} from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(RolGameAppComponent, [
	FIREBASE_PROVIDERS,
	defaultFirebase('https://rolgame.firebaseio.com/'),
	firebaseAuthConfig({
		provider: AuthProviders.Password,
		method: AuthMethods.Password
	})
]);


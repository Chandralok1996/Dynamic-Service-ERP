import { CanActivateFn } from '@angular/router';

export const appGuard: CanActivateFn = (route, state) => {
  console.log("Hello",route,state);
  return true;
};

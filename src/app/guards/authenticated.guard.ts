import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserUtil } from '../utils/user.utils';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate() {
        const user = UserUtil.get();
        if (!user || !user.token) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserUtil } from '../utils/user.utils';

@Injectable()
export class ManagerGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate() {
        return UserUtil.isInRole('manager');
    }
}
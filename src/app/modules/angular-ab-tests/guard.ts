import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, } from '@angular/router';
import { GuardData, GuardDataTest } from './interfaces';
import { AbTestsService } from './service';

@Injectable()
export class AbTestsGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private service: AbTestsService
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canGoToPage(next, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canGoToPage(childRoute, state);
    }

    private canGoToPage(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const {ab} = next.data as GuardData;
        const tests = ab ? [ab].flat(1) : [];

        if (!tests.length) {
            return true;
        }

        const testPage: GuardDataTest = tests.find(n => n.redirectUrls);

        tests.forEach(({scope, redirectUrls, ...rest}) => {
            this.service.setTest(scope, rest);
            if (!testPage) {
                this.service.emitTestStarted(scope, this.service.getVersion(scope));
            }
        });


        if (!testPage) {
            return true;
        }

        const {versions, scope, redirectUrls} = testPage;

        const v = this.service.getVersion(scope);
        const urlForRedirect = redirectUrls[v];

        if (!urlForRedirect ||
            versions.length !== Object.keys(redirectUrls).length) {
            return true;
        }

        const search: RegExp = new RegExp(`${urlForRedirect}($|\\?|\\/)`);
        if (state.url.search(search) !== -1) {
            this.service.emitTestStarted(scope, this.service.getVersion(scope));
            return true;
        }

        this.router.navigateByUrl(urlForRedirect);
        return false;
    }
}

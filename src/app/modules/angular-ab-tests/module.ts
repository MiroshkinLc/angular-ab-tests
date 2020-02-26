import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbTestsService } from './service';
import { CONFIG } from './injection-tokens';
import { CookieHandler, CrawlerDetector, RandomExtractor } from './classes';
import { AbTestVersionDirective } from './directive';
import { AbTestsGuard } from './guard';
import { AbTestsPipe } from './pipe';

export interface AbTestOptions {
    versions: string[];
    domain?: string;
    versionForCrawlers?: string;
    scope?: string;
    expiration?: number;
    weights?: {
        [x: string]: number,
    };
}

@NgModule({
    declarations: [
        AbTestVersionDirective,
        AbTestsPipe
    ],
    exports: [
        AbTestVersionDirective,
        AbTestsPipe
    ],
})
export class AbTestsModule {
    static forRoot(configs: AbTestOptions[]): ModuleWithProviders {
        return {
            ngModule: AbTestsModule,
            providers: [
                AbTestsService,
                {provide: CONFIG, useValue: configs},
                CookieHandler,
                CrawlerDetector,
                RandomExtractor,
                AbTestsGuard
            ],
        };
    }
}

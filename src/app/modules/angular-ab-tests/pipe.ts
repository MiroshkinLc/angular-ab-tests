import { Pipe, PipeTransform } from '@angular/core';
import { AbTestsService } from './service';

@Pipe({
    name: 'abTests'
})
export class AbTestsPipe implements PipeTransform {
    constructor(
        private abTestsService: AbTestsService
    ) {
    }

    transform(scope: string, version: string): boolean {
        return version === this.abTestsService.getVersion(scope);
    }

}

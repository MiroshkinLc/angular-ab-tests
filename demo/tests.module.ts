import { NgModule } from '@angular/core';
import { AbTestsModule, AbTestOptions } from './angular-ab-tests/angular-ab-tests.module';

export const abTestsOptions: AbTestOptions[] = [
  {
    versions: [ 'old', 'new' ],
    versionForCrawlers: 'old',
    weights: { new: 60 }
  },
];

@NgModule({
  imports: [
    AbTestsModule.forRoot(abTestsOptions),
  ],
  exports: [
    AbTestsModule,
  ],
})
export class TestsModule {}
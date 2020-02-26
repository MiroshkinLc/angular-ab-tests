import { AbTestOptions } from './module';

export interface GuardData {
    ab: GuardDataTest | GuardDataTest[];
}

export interface GuardDataTest extends AbTestOptions {
    redirectUrls?: {[key: string]: string};
}


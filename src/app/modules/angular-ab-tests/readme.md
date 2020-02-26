# AB Tests Guard:

### interfaces for data object:
```typescript
interface GuardData {
    ab: GuardDataTest | GuardDataTest[];
}

interface GuardDataTest extends AbTestOptions {
    redirectUrls?: {[key: string]: string};
}
```
### Examples:

- Usage with redirect pages:
```typescript
const ab = {
    scope: 'page',
    versions: ['a', 'b'],
    redirectUrls: {
        a: '/PageA',
        b: '/PageB'
    }
};

const routes = [
    {
        path: 'PageA',
        canActivate: [AbTestsGuard],
        data: {
            ab
        }    
    },
    {
        path: 'PageB',
        canActivate: [AbTestsGuard],
        data: {
            ab
        } 
    },
   
]
```

- Usage with tests for page (single test)
```typescript
const youRoutes = [
    {
        path: 'MyPage',
        canActivate: [AbTestsGuard],
        data: {
            ab: {
                scope: 'my-test',
                versions: ['v1', 'v2']
            }
        }    
    },   
]
```

- Usage with tests for page (multiple tests)
```typescript
const youRoutes = [
    {
        path: 'MyPage',
        canActivate: [AbTestsGuard],
        data: {
            ab: [
                  {
                      scope: 'my-test-a',
                      versions: ['a1', 'a2', 'a3']
                  },
                  {
                      scope: 'my-test-b',
                      versions: ['b1', 'b2']
                  }
            ]
        }    
    },   
]
```

### new public service methods

- setTest dynamically:
```typescript
  // example:                            // AbTestOptions or array of versions
  this.abTestsService.setTest('myScope', ['v1', 'v2']);
```

- subscribe on test started:
```typescript
  this.abTestsService.testStarted$()
     .subscribe(({scope, version}: TestStartedEvent) => {/*...*/});
```

- emit test started
```typescript
  this.abTestsService.emitTestStarted(scope, version);
```

- set test and emit
```typescript                                          // AbTestOptions or array of versions
  this.abTestsService.setTestAndEmitStarted('myScope', ['v1', 'v2']);
```

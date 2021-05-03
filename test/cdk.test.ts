import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import { JamulusServerStack } from '../lib/jamulus-server-stack';

test('Empty Stack', () => {
    const app = new App();
    // WHEN
    const stack = new JamulusServerStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});

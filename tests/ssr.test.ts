import { renderToString } from '@vue/test-utils';
import { useSplitting } from '../src';
import { it, expect } from 'vitest';

it('processes hello world', async () => {
	const { Splitting: MainHeading } = useSplitting('Hello World', {
		lineClass: 'overflow-hidden text-3xl md:text-4xl',
		wrapperTag: 'div',
		words: false
	});

	const contents = await renderToString(MainHeading);
	expect(contents).not.toBeFalsy();
});

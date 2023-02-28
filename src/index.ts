import type { UserConfig, Counts, MaybeComputedRef, SplittingOutput } from './types';
import type { Ref, ComputedRef, VNode } from 'vue';

import { resolveConfig } from './config';
import { h, computed, isRef, ref } from 'vue';
import { processInput } from './process';
import { createClass } from './utils';

import './style.css';

export const useSplitting = (
	input: MaybeComputedRef<string>,
	userConfig: MaybeComputedRef<UserConfig> = {}
): SplittingOutput => {
	const config = resolveConfig(userConfig);

	const counts: Ref<Counts> = ref({
		lines: 0,
		words: 0,
		chars: 0
	});
	const processedInput: ComputedRef<VNode[]> = computed(() =>
		processInput(isRef(input) ? input.value : input, config.value, counts)
	);

	return {
		Splitting: () =>
			h(
				config.value.wrapperTag,
				{
					class: createClass('v3sp-wr', config.value.wrapperClass),
					style: {
						'--line-total': counts.value.lines,
						'--word-total': counts.value.words,
						'--char-total': counts.value.chars
					}
				},
				processedInput.value
			),
		counts
	};
};

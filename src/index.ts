import type { UserConfig, Counts, MaybeComputedRef, SplittingOutput } from './types';
import type { Ref, ComputedRef, VNode } from 'vue';

import { resolveConfig, defaultConfig } from './config';
import { h, computed, isRef, ref, mergeProps } from 'vue';
import { processInput } from './process';

import './style.css';

/* *********************************************
 * Component Version
 * ******************************************* */
export { Vue3Splitting } from './component';

/* *********************************************
 * Composable Version
 * ******************************************* */
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

	const Splitting = (props = {}) => {
		// Filter out the props that are part of the config to stop them polluting the HTML element
		const configProps = Object.keys(defaultConfig);
		props = Object.fromEntries(
			Object.entries(props).filter(([key]) => {
				return configProps.includes(key) === false;
			})
		);
		return h(
			config.value.wrapperTag,
			mergeProps(
				{
					class: 'v3sp-wr',
					style: {
						'--line-total': counts.value.lines,
						'--word-total': counts.value.words,
						'--char-total': counts.value.chars
					}
				},
				props
			),
			processedInput.value
		);
	};
	Splitting.inheritAttrs = false;

	return {
		Splitting,
		counts
	};
};

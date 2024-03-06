import { useResolvedConfig } from './config';
import { processSlottedContent, processInputString, createMatrix, useCounts } from './process';
import { generateOutput } from './output';
import type { UserConfig, SplittingOutput, Counts } from './types';
import { type MaybeRefOrGetter, type PropType, defineComponent, h, computed, toValue, reactive, watch } from 'vue';

import './style.postcss';

export { default as Vue3Splitting } from './component.vue';
export const useSplitting = (
	input: MaybeRefOrGetter<string> = null,
	userConfig: MaybeRefOrGetter<UserConfig> = {}
): SplittingOutput => {
	const counts: Counts = reactive({
		lines: 0,
		words: 0,
		chars: 0
	});

	const Splitting = defineComponent({
		props: {
			lines: {
				type: Boolean,
				default: true
			},
			words: {
				type: Boolean,
				default: true
			},
			chars: {
				type: Boolean,
				default: true
			},
			lineOffset: {
				type: Number,
				default: 0
			},
			wordOffset: {
				type: Number,
				default: 0
			},
			charOffset: {
				type: Number,
				default: 0
			},
			wrapperTag: {
				type: String as PropType<keyof HTMLElementTagNameMap>,
				default: 'div'
			},
			lineTag: {
				type: String as PropType<keyof HTMLElementTagNameMap>,
				default: 'div'
			},
			lineClass: {
				type: String,
				default: ''
			},
			wordTag: {
				type: String as PropType<keyof HTMLElementTagNameMap>,
				default: 'span'
			},
			wordClass: {
				type: String,
				default: ''
			},
			charTag: {
				type: String as PropType<keyof HTMLElementTagNameMap>,
				default: 'span'
			},
			charClass: {
				type: String,
				default: ''
			}
		},
		setup(props, { slots }) {
			const config = useResolvedConfig(props, userConfig);

			const processedInput = computed(() => {
				const rawInput = toValue(input);
				const hasSlottedContent = slots.default && typeof slots.default === 'function';
				const rawSlot = hasSlottedContent ? slots.default() : null;

				return hasSlottedContent ? processSlottedContent(rawSlot) : processInputString(rawInput);
			});

			const matrix = computed(() => createMatrix(processedInput.value));
			const { lineCount, wordCount, characterCount } = useCounts(matrix);

			watch(
				[lineCount, wordCount, characterCount],
				([lines, words, characters]) => {
					counts.lines = lines;
					counts.words = words;
					counts.chars = characters;
				},
				{
					immediate: true
				}
			);

			return () =>
				h(
					config.value.wrapperTag,
					{
						class: 'v3sp-wr',
						style: {
							'--line-total': lineCount.value,
							'--word-total': wordCount.value,
							'--char-total': characterCount.value
						}
					},
					generateOutput(config, matrix)
				);
		}
	});

	return {
		Splitting,
		counts
	};
};

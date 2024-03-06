import { type ComputedRef, type VNode, toValue, h, Fragment, normalizeClass } from 'vue';
import type { FullConfig } from './types';

let wordCount = 0,
	characterCount = 0;

const processWord = (word: string[], config: FullConfig) => {
	if (config.chars !== true) return [word.join('')];
	else
		return word.reduce((acc: Array<VNode>, character: string, characterIndex: number, originalArray: string[]) => {
			const isLast = characterIndex === originalArray.length - 1;
			acc.push(
				h(
					config.charTag,
					{
						class: normalizeClass(['v3sp-c', config.charClass]),
						style: {
							'--char-index': characterCount + characterIndex + config.charOffset
						},
						'data-char': character
					},
					character
				)
			);

			if (isLast) {
				characterCount += characterIndex + 1;
			}
			return acc;
		}, [] as Array<VNode>);
};

const processLine = (line: string[][], config: FullConfig) => {
	return line.reduce((acc: VNode[], word: string[], wordIndex: number, originalArray: string[][]) => {
		const wordNode = config.words ? config.wordTag : Fragment;
		const isLast = wordIndex === originalArray.length - 1;
		acc.push(
			h(
				/* @ts-expect-error */
				wordNode,
				{
					class: normalizeClass(['v3sp-w', config.wordClass]),
					style: {
						'--word-index': wordCount + wordIndex + config.wordOffset
					},
					'data-word': word.join('')
				},
				processWord(word, config)
			)
		);

		if (isLast) {
			wordCount += wordIndex + 1;
		} else {
			acc.push(
				h('span', {
					class: normalizeClass(['whitespace']),
					innerHTML: ' '
				})
			);
		}
		return acc;
	}, [] as VNode[]);
};

export const generateOutput = (config: ComputedRef<FullConfig>, matrix: ComputedRef<string[][][]>) => {
	wordCount = 0;
	characterCount = 0;
	const configValue = toValue(config);
	const matrixValue = toValue(matrix);
	return matrixValue.reduce((acc, line, lineIndex, originalArray) => {
		const lineNode = configValue.lines ? configValue.lineTag : Fragment;
		acc.push(
			h(
				/* @ts-expect-error */
				lineNode,
				{
					class: normalizeClass(['v3sp-l', configValue.lineClass]),
					style: {
						'--line-index': lineIndex + configValue.lineOffset
					}
				},
				processLine(line, configValue)
			)
		);
		if (configValue.lines !== true && lineIndex < originalArray.length - 1) {
			acc.push(h('br'));
		}
		return acc;
	}, [] as VNode[]);
};

import type { SplittingConfig, Counts } from './types';
import type { VNode, Ref } from 'vue';
import { h, Text, Fragment } from 'vue';
import { createClass } from './utils';

/**
 * Creates the initial VNodes containing each line
 */
const mapLines = (input: string, counts: Ref<Counts>): VNode[] => {
	const lines: string[] = input.split(/(?:<br>|[\r\n]+)/i);
	counts.value.lines = lines.length;
	return lines.map((line) => h(Fragment, mapWords(line, counts)));
};

/**
 * Creates the initial VNodes containing each word
 */
const mapWords = (line: string, counts: Ref<Counts>): VNode[] => {
	const words: string[] = line.split(/\s+/i);
	const wordNodes = words.map((word) => h(Fragment, mapChars(word, counts)));
	counts.value.words += wordNodes.length;
	return wordNodes;
};

/**
 * Creates the initial VNodes containing each character
 */
const mapChars = (word: string, counts: Ref<Counts>): VNode[] => {
	const chars: string[] = word.split('');
	const charNodes = chars.map((char) => h(Text, char));
	counts.value.chars += charNodes.length;
	return charNodes;
};

/**
 * Process lines (count handled in mapLines)
 */
const processLines = (lines: VNode[], config: SplittingConfig) => {
	return lines.map((line, index) =>
		h(
			config.lineTag,
			{
				class: createClass('v3sp-l', config.lineClass),
				style: {
					'--line-index': index + config.lineOffset
				}
			},
			{
				default: () => line.children
			}
		)
	);
};

/**
 * Process and count words
 */
const processWords = (lines: VNode[], config: SplittingConfig): void => {
	let words = 0;
	lines.forEach((line) => {
		line.children = (line.children as VNode[]).map((word, index) => {
			// Create a string of the word
			const textWord = word.children ? (word.children as VNode[]).map((c) => c.children).join('') : '';
			return h(
				config.wordTag,
				{
					class: createClass('v3sp-w', config.wordClass),
					style: {
						'--word-index': index + words + config.wordOffset
					},
					'data-word': textWord
				},
				{
					default: () => word.children
				}
			);
		});
		words += line.children.length;
	});
};

/**
 * Process and count characters
 */
const processChars = (lines: VNode[], config: SplittingConfig): void => {
	let chars = 0;
	lines.forEach((line) => {
		(line.children as VNode[]).forEach((words) => {
			words.children = (words.children as VNode[]).map((char, index) => {
				return h(
					config.charTag,
					{
						class: createClass('v3sp-c', config.charClass),
						style: {
							'--char-index': index + chars + config.charOffset
						},
						'data-char': char.children
					},
					char
				);
			});
			chars += words.children.length;
		});
	});
};

/**
 * Add HTML elements around each split as required
 */
const processNodeMap = (nodeMap: VNode[], config: SplittingConfig) => {
	const lines = config.lines ? processLines(nodeMap, config) : nodeMap;
	if (config.words) processWords(lines, config);
	if (config.chars) processChars(lines, config);
	return lines;
};

const insertWhitespace = (nodes: VNode[]) => {
	nodes.forEach((node) => {
		if (!node.children || Array.isArray(node.children) === false || !node.children.length) return;
		node.children = (node.children as VNode[]).reduce((acc: Array<VNode>, curr: VNode, index: Number) => {
			acc.push(curr);
			if (index === (node.children as VNode[]).length - 1) return acc;
			acc.push(
				h('span', {
					class: createClass('whitespace'),
					innerHTML: '&nbsp;'
				})
			);
			return acc;
		}, []);
	});
};

const insertLineBreaks = (nodes: VNode[]) => {
	return nodes.reduce((acc: Array<VNode>, curr: VNode) => {
		acc.push(curr);
		acc.push(h('br'));
		return acc;
	}, []);
};

/**
 * Main processing function. First maps the input and then orchestrates the required HTML elements
 */
export const processInput = (input: string, config: SplittingConfig, counts: Ref<Counts>): VNode[] => {
	counts.value.lines = 0;
	counts.value.words = 0;
	counts.value.chars = 0;
	const nodeMap = mapLines(input, counts);
	const nodes: VNode[] = processNodeMap(nodeMap, config);
	// Restore whitespace to between word elements
	insertWhitespace(nodes);
	// Restore line breaks to between line elements if required
	const output = config.lines === false ? insertLineBreaks(nodes) : nodes;

	return output;
};

import { Fragment, Text, VNode, computed, toValue } from 'vue';

const brReplacer = (input: string) => {
	return input.replace(/(<br\s*\/?>|[\r\n]+)/gi, '#line#');
};

const stripTags = (html: string, except = []) => {
	return html
		.replace(/<(\/?)(\w+)[^>]*\/?>/g, (_, endMark: string, tag: string) => {
			return except.includes(tag) ? '<' + endMark + tag + '>' : '';
		})
		.replace(/<!--.*?-->/g, '');
};

export const processSlottedContent = (nodes: VNode[]) => {
	return brReplacer(
		nodes.reduce((output, node) => {
			let processedNode = node;
			while(processedNode.type === Fragment) {
				processedNode = node.children?.[0];
			}

			if (processedNode.type === Text) output += processedNode.children;
			else if (processedNode.type === 'br') output += '<br />';

			return output;
		}, '')
	);
};

export const processInputString = (input: string) => {
	return brReplacer(stripTags(input, ['br']));
};

export const createMatrix = (input: string) => {
	return input.split('#line#').map((line) => {
		return line.split(/\s+/g).map((word) => {
			return word.split('');
		});
	});
};

export const useCounts = (matrix) => {
	const lineCount = computed(() => matrix.value?.length ?? 0);
	const wordCount = computed(() => {
		const rawMatrix = toValue(matrix) ?? [];
		return rawMatrix.reduce((acc, curr) => {
			acc += curr?.length ?? 0;
			return acc;
		}, 0);
	});
	const characterCount = computed(() => {
		const rawMatrix = toValue(matrix) ?? [];
		return rawMatrix.reduce((total, innerArray) => {
			return (
				total +
				innerArray.reduce((innerTotal, subArray) => {
					return innerTotal + (subArray.length ?? 0);
				}, 0)
			);
		}, 0);
	});

	return { lineCount, wordCount, characterCount };
};

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

const getSlotChildrenText = children => children.map(node => {
	if (!node.children && node.type === "br") return "<br />";
	else if (!node.children || typeof node.children === 'string') return node.children || ''
	else if (Array.isArray(node.children)) return getSlotChildrenText(node.children)
	else if (node.children.default) return getSlotChildrenText(node.children.default())
  }).join('')

export const processSlottedContent = (nodes: VNode[]) => {
	return brReplacer(
		nodes.reduce((output, node) => {
			const append = Array.isArray(node.children) ? 
				getSlotChildrenText(node.children) : 
				node.type === "br" ? 
				"<br />" : node.children;

			output += append;

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

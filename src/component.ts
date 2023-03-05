import { useSplitting } from './index';
import { computed } from 'vue';
import type { MaybeComputedRef, UserConfig } from './types';

export const Vue3Splitting = {
	inheritAttrs: true,
	props: {
		lines: { type: Boolean, default: true },
		words: { type: Boolean, default: true },
		chars: { type: Boolean, default: true },
		lineOffset: { type: Number, default: 0 },
		wordOffset: { type: Number, default: 0 },
		charOffset: { type: Number, default: 0 },
		wrapperTag: { type: String, default: 'div' },
		lineTag: { type: String, default: 'div' },
		lineClass: { type: String, default: '' },
		wordTag: { type: String, default: 'span' },
		wordClass: { type: String, default: '' },
		charTag: { type: String, default: 'span' },
		charClass: { type: String, default: '' }
	},
	setup(props: MaybeComputedRef<UserConfig>, { slots }) {
		const slotText = computed(() => {
			const defaultSlot = slots.default();
			if (defaultSlot && Array.isArray(defaultSlot)) {
				// Render the child nodes into a text string.
				// Drop anything that isn't text or a <br> tag
				return defaultSlot.reduce((acc, curr) => {
					if (typeof curr.children === 'string') acc += curr.children.trim();
					else if (curr.type === 'br') acc += '<br>';
					return acc;
				}, '');
			} else return 'Invalid Text';
		});
		const { Splitting } = useSplitting(slotText, props);

		return Splitting;
	}
};

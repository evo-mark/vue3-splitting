import { it, expect } from 'vitest';
import { useSplitting } from '../src';
import { mount } from '@vue/test-utils';

it('processes hello world', () => {
	const { Splitting: component } = useSplitting('Hello World');
	const wrapper = mount(component);

	expect(wrapper.findAll('.v3sp-l')).toHaveLength(1);
	expect(wrapper.findAll('.v3sp-w')).toHaveLength(2);
	expect(wrapper.findAll('.v3sp-c')).toHaveLength(10);

	expect(wrapper.classes()).toContain('v3sp-wr');
	expect(wrapper.text()).toBe('Hello World');

	const lines = wrapper.findAll('.v3sp-l');
	expect(lines[0].attributes('style')).toBe('--line-index: 0;');

	const words = wrapper.findAll('.v3sp-w');
	expect(words[0].attributes('style')).toBe('--word-index: 0;');
	expect(words[1].attributes('style')).toBe('--word-index: 1;');
	expect(words[0].attributes('data-word')).toBe('Hello');
	expect(words[1].attributes('data-word')).toBe('World');
});

it('renders correctly with no line splitting', () => {
	const { Splitting: component } = useSplitting('Hello World', {
		lines: false
	});
	const wrapper = mount(component);
	expect(wrapper.findAll('.v3sp-l')).toHaveLength(0);
	expect(wrapper.findAll('.v3sp-w')).toHaveLength(2);
	expect(wrapper.findAll('.v3sp-c')).toHaveLength(10);
});

it('renders correctly with no word splitting', () => {
	const { Splitting: component } = useSplitting('Hello World', {
		words: false
	});
	const wrapper = mount(component);
	expect(wrapper.findAll('.v3sp-l')).toHaveLength(1);
	expect(wrapper.findAll('.v3sp-w')).toHaveLength(0);
	expect(wrapper.findAll('.v3sp-c')).toHaveLength(10);
});

it('renders correctly with no char splitting', () => {
	const { Splitting: component } = useSplitting('Hello World', {
		chars: false
	});
	const wrapper = mount(component);
	expect(wrapper.findAll('.v3sp-l')).toHaveLength(1);
	expect(wrapper.findAll('.v3sp-w')).toHaveLength(2);
	expect(wrapper.findAll('.v3sp-c')).toHaveLength(0);
});

it('returns a correct counts object', () => {
	const { counts, Splitting } = useSplitting('Hello World<br>Goodbye World');
	mount(Splitting);

	expect(counts.lines).toBe(2);
	expect(counts.words).toBe(4);
	expect(counts.chars).toBe(22);
});

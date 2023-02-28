import { it, expect } from 'vitest';
import { useSplitting } from '../src';
import { mount } from '@vue/test-utils';

it('processes hello world', () => {
	const component = useSplitting('Hello World');
	const wrapper = mount(component);

	expect(wrapper.findAll('.vue3-splitting--line')).toHaveLength(1);
	expect(wrapper.findAll('.vue3-splitting--word')).toHaveLength(2);
	expect(wrapper.findAll('.vue3-splitting--char')).toHaveLength(10);

	expect(wrapper.classes()).toContain('vue3-splitting--wrapper');
	expect(wrapper.text()).toBe('Hello World');

	const lines = wrapper.findAll('.vue3-splitting--line');
	expect(lines[0].attributes('style')).toBe('--line-index: 0;');

	const words = wrapper.findAll('.vue3-splitting--word');
	expect(words[0].attributes('style')).toBe('--word-index: 0;');
	expect(words[1].attributes('style')).toBe('--word-index: 1;');
	expect(words[0].attributes('data-word')).toBe('Hello');
	expect(words[1].attributes('data-word')).toBe('World');
});

it('renders correctly with no line splitting', () => {
	const component = useSplitting('Hello World', {
		lines: false
	});
	const wrapper = mount(component);
	expect(wrapper.findAll('.vue3-splitting--line')).toHaveLength(0);
	expect(wrapper.findAll('.vue3-splitting--word')).toHaveLength(2);
	expect(wrapper.findAll('.vue3-splitting--char')).toHaveLength(10);
});

it('renders correctly with no word splitting', () => {
	const component = useSplitting('Hello World', {
		words: false
	});
	const wrapper = mount(component);
	expect(wrapper.findAll('.vue3-splitting--line')).toHaveLength(1);
	expect(wrapper.findAll('.vue3-splitting--word')).toHaveLength(0);
	expect(wrapper.findAll('.vue3-splitting--char')).toHaveLength(10);
});

it('renders correctly with no char splitting', () => {
	const component = useSplitting('Hello World', {
		chars: false
	});
	const wrapper = mount(component);
	expect(wrapper.findAll('.vue3-splitting--line')).toHaveLength(1);
	expect(wrapper.findAll('.vue3-splitting--word')).toHaveLength(2);
	expect(wrapper.findAll('.vue3-splitting--char')).toHaveLength(0);
});

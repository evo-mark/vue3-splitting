import { type ComputedRef, computed, isRef, unref } from 'vue';
import type { UserConfig, SplittingConfig, MaybeComputedRef } from './types';

/**
 * Get the value of value/ref/getter.
 */
export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
	return typeof r === 'function'
	  ? (r as any)()
	  : unref(r)
  }

export const defaultConfig: SplittingConfig = {
	lines: true,
	words: true,
	chars: true,
	lineOffset: 0,
	wordOffset: 0,
	charOffset: 0,
	wrapperTag: 'div',
	wrapperClass: '',
	lineTag: 'div',
	lineClass: '',
	wordTag: 'span',
	wordClass: '',
	charTag: 'span',
	charClass: ''
};

const processUserConfig = (userConfig: MaybeComputedRef<UserConfig>): MaybeComputedRef<UserConfig> => {
	return resolveUnref(userConfig)
};

export function resolveConfig(userConfig: MaybeComputedRef<UserConfig>): ComputedRef<SplittingConfig> {
	return computed(() => Object.assign({}, defaultConfig, processUserConfig(userConfig)));
}

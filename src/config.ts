import { type ComputedRef, computed, isRef } from 'vue';
import type { UserConfig, SplittingConfig, MaybeComputedRef } from './types';

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
	return isRef(userConfig) ? userConfig.value : userConfig;
};

export function resolveConfig(userConfig: MaybeComputedRef<UserConfig>): ComputedRef<SplittingConfig> {
	return computed(() => Object.assign({}, defaultConfig, processUserConfig(userConfig)));
}

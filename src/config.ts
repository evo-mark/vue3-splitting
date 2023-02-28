import type { UserConfig, SplittingConfig } from './types';

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

const processUserConfig = (userConfig: UserConfig): UserConfig => {
	return userConfig;
};

export function resolveConfig(userConfig: UserConfig): SplittingConfig {
	return Object.assign({}, defaultConfig, processUserConfig(userConfig));
}

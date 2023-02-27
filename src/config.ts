export interface SplittingConfig {
	lines: boolean;
	words: boolean;
	chars: boolean;
	lineOffset: number;
	wordOffset: number;
	charOffset: number;
	prefix: string;
	wrapperTag: string;
	wrapperClass: string;
	lineTag: keyof HTMLElementTagNameMap;
	lineClass: string;
	wordTag: string;
	wordClass: string;
	charTag: keyof HTMLElementTagNameMap;
	charClass: string;
}
export type UserConfig = Partial<SplittingConfig>;

export const defaultConfig: SplittingConfig = {
	lines: true,
	words: true,
	chars: true,
	lineOffset: 0,
	wordOffset: 0,
	charOffset: 0,
	prefix: '',
	wrapperTag: 'div',
	wrapperClass: 'vue3-splitting--wrapper',
	lineTag: 'div',
	lineClass: 'vue3-splitting--line',
	wordTag: 'span',
	wordClass: 'vue3-splitting--word',
	charTag: 'span',
	charClass: 'vue3-splitting--char'
};

const processUserConfig = (userConfig: UserConfig): UserConfig => {
	return userConfig;
};

export function resolveConfig(userConfig: UserConfig): SplittingConfig {
	return Object.assign({}, defaultConfig, processUserConfig(userConfig));
}

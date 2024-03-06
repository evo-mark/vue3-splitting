import type { Component } from 'vue';

export interface FullConfig {
	lines: boolean;
	words: boolean;
	chars: boolean;
	lineOffset: number;
	wordOffset: number;
	charOffset: number;
	wrapperTag: keyof HTMLElementTagNameMap;
	lineTag: keyof HTMLElementTagNameMap;
	lineClass: string;
	wordTag: keyof HTMLElementTagNameMap;
	wordClass: string;
	charTag: keyof HTMLElementTagNameMap;
	charClass: string;
}
export type UserConfig = Partial<FullConfig>;

export interface Counts {
	lines: number;
	words: number;
	chars: number;
}

export interface SplittingOutput {
	counts: Counts;
	Splitting: Component;
}

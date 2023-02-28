import type { Ref, ComputedRef, RendererNode } from 'vue';

export interface SplittingConfig {
	lines: boolean;
	words: boolean;
	chars: boolean;
	lineOffset: number;
	wordOffset: number;
	charOffset: number;
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

export interface Counts {
	lines: number;
	words: number;
	chars: number;
}

export type MaybeRef<T> = T | Ref<T>;
export type MaybeComputedRef<T> = ComputedRef<T> | MaybeRef<T>;

export interface SplittingOutput {
	counts: Ref<Counts>;
	Splitting: () => RendererNode;
}

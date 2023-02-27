import type { UserConfig } from './config';
import type { VNode } from 'vue';
import { resolveConfig } from './config';
import { h } from 'vue';
import { processInput } from './process';

/*
<h1 class="home-headline">
    <div style="--main-char-total: 0;">
        <span style="--word-total: 3; --char-total: 13;" class="words chars splitting">
            <span class="word" data-word="Let's" style="--word-index: 0;">
                <span class="char" data-char="L" style="--char-index: 0;">L</span>
                <span class="char" data-char="e" style="--char-index: 1;">e</span>
                <span class="char" data-char="t" style="--char-index: 2;">t</span>
                <span class="char" data-char="'" style="--char-index: 3;">'</span>
                <span class="char" data-char="s" style="--char-index: 4;">s</span>
            </span>
            <span class="whitespace"> </span>
            <span class="word" data-word="Take" style="--word-index: 1;">
                <span class="char" data-char="T" style="--char-index: 5;">T</span>
                <span class="char" data-char="a" style="--char-index: 6;">a</span>
                <span class="char" data-char="k" style="--char-index: 7;">k</span>
                <span class="char" data-char="e" style="--char-index: 8;">e</span>
            </span>
            <span class="whitespace"> </span>
            <span class="word" data-word="Your" style="--word-index: 2;">
                <span class="char" data-char="Y" style="--char-index: 9;">Y</span>
                <span class="char" data-char="o" style="--char-index: 10;">o</span>
                <span class="char" data-char="u" style="--char-index: 11;">u</span>
                <span class="char" data-char="r" style="--char-index: 12;">r</span>
            </span>
        </span>
    </div>
    <div style="--main-char-total: 13;">
        <span style="--word-total: 1; --char-total: 8;" class="words chars splitting">
            <span class="word" data-word="Branding" style="--word-index: 0;">
                <span class="char" data-char="B" style="--char-index: 0;">B</span>
                <span class="char" data-char="r" style="--char-index: 1;">r</span>
                <span class="char" data-char="a" style="--char-index: 2;">a</span>
                <span class="char" data-char="n" style="--char-index: 3;">n</span>
                <span class="char" data-char="d" style="--char-index: 4;">d</span>
                <span class="char" data-char="i" style="--char-index: 5;">i</span>
                <span class="char" data-char="n" style="--char-index: 6;">n</span>
                <span class="char" data-char="g" style="--char-index: 7;">g</span>
            </span>
        </span>
    </div>
    <div style="--main-char-total: 21;">
        <span style="--word-total: 1; --char-total: 8;" class="words chars splitting">
            <span class="word" data-word="Further." style="--word-index: 0;">
                <span class="char" data-char="F" style="--char-index: 0;">F</span>
                <span class="char" data-char="u" style="--char-index: 1;">u</span>
                <span class="char" data-char="r" style="--char-index: 2;">r</span>
                <span class="char" data-char="t" style="--char-index: 3;">t</span>
                <span class="char" data-char="h" style="--char-index: 4;">h</span>
                <span class="char" data-char="e" style="--char-index: 5;">e</span>
                <span class="char" data-char="r" style="--char-index: 6;">r</span>
                <span class="char" data-char="." style="--char-index: 7;">.</span>
            </span>
        </span>
    </div>
</h1>
*/

export const useSplitting = (input: string, userConfig: UserConfig = {}): VNode => {
	const config = resolveConfig(userConfig);

	return h(
		config.wrapperTag,
		{
			class: config.wrapperClass
		},
		processInput(input, config)
	);
};

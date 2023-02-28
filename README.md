<a href="https://southcoastweb.co.uk" target="_blank" alt="Link to southcoastweb's website">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://southcoastweb.co.uk/images/new-scw-logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://southcoastweb.co.uk/images/new-scw-logo.svg">
      <img alt="southcoastweb company logo" src="https://southcoastweb.co.uk/images/new-scw-logo.svg">
    </picture>
</a>

<p align="center">
  <img src="https://img.shields.io/npm/dm/vue3-splitting.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue3-splitting"><img src="https://img.shields.io/npm/v/vue3-splitting.svg" alt="Version"></a>
  <a href="https://github.com/craigrileyuk/vue3-splitting/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vue3-splitting.svg" alt="License"></a>
</p>

# Vue3 Splitting

An adaptation of Stephen Shaw's excellent <a href="https://splitting.js.org/" alt="Go to the original Splitting website" target="_blank">Splitting</a> library, designed specifically to work with Vue 3.

Because it uses Vue3's rendering engine under the hood, Vue3 Splitting is fully compatible with SSR.

## Installation

```sh
npm i vue3-splitting
```

or

```sh
yarn add vue3-splitting
```

## Usage

No need to install Vue3 Splitting. It is a composable that returns a Vue3 functional component

You can optionally import its styles though, to help make animating individual characters easier:

```js
import 'vue3-splitting/styles';
```

```html
<template>
	<Splitting />
</template>

<script setup>
	const { Splitting, counts } = useSplitting('Hello World!');
</script>
```

You can provide either a raw string, or any ref or computed object to `useSplitting` as the first argument. If the ref/computed changes, so will the rendered output and your counts.

### Options

`useSplitting` accepts a second parameter containing your user options:

```js
SplittingConfig {
	lines: boolean; // Enable splitting of lines
	words: boolean; // Enable splitting of words
	chars: boolean; // Enable splitting of characters
	lineOffset: number; // Start counting lines with this number
	wordOffset: number; // Start counting words with this number
	charOffset: number; // Start counting chars with this number
	wrapperTag: string; // HTML tag to use for the wrapper element
	wrapperClass: string; // Class applied to the wrapper element
	lineTag: keyof HTMLElementTagNameMap; // HTML tag to use for each line element
	lineClass: string;  // Class applied to line elements
	wordTag: keyof HTMLElementTagNameMap; // HTML tag to use for each word element
	wordClass: string; // Class applied to word elements
	charTag: keyof HTMLElementTagNameMap; // HTML tag to use for each char element
	charClass: string; // Class applied to char elements
}
```

> Example

```js
const splittingString = ref('Hello World');
const { Splitting: MySplittingElement } = useSplitting(splittingString, {
	wrapperClass: 'my-splitting-element'
});
```

### Counts

The composable also returns a `counts` ref in addition to the functional component. This keeps a reactive record of the number of lines, words and characters contained in your string. Note that these values are calculated regardless of whether you disable splitting for that type via your user config.

```js
ref({
	lines: number;
	words: number;
	chars: number;
});
```

<template>
	<Header />
	{{ counts }}
</template>

<script setup>
import { useSplitting } from '../src';
import { ref, computed } from 'vue';

let wrapperClass = ref('font-bold');

const sentence = ref('Hello World<br>This is a test<br>of the things to come');
const config = computed(() => ({
	lines: true,
	words: false,
	chars: true,
	lineOffset: 10,
	wrapperClass: wrapperClass.value,
	wrapperTag: 'span'
}));

setInterval(() => {
	const defaultSentence = 'Hello World<br>This is a test<br>of the things to come';
	if (sentence.value === defaultSentence) {
		sentence.value = 'This is a test';
	} else {
		sentence.value = defaultSentence;
	}
	wrapperClass.value = wrapperClass.value === 'font-bold' ? 'italic' : 'font-bold';
	//config.value.lines = !config.value.lines;
}, 5000);

const { Splitting: Header, counts } = useSplitting(sentence, config);
</script>

<style>
.font-bold {
	font-weight: bold;
}
.italic {
	font-style: italic;
}
</style>

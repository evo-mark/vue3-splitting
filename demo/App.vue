<template>
	<Header />
	{{ counts }}
</template>

<script setup>
import { useSplitting } from '../src';
import { ref } from 'vue';

const sentence = ref('Hello World<br>This is a test<br>of the things to come');

setInterval(() => {
	const defaultSentence = 'Hello World<br>This is a test<br>of the things to come';
	if (sentence.value === defaultSentence) {
		sentence.value = 'This is a test';
	} else {
		sentence.value = defaultSentence;
	}
}, 50000);

const { Splitting: Header, counts } = useSplitting(sentence, {
	lines: true,
	words: false,
	chars: true,
	lineOffset: 10
});
</script>

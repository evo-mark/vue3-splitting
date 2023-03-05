<template>
	<h2>Component</h2>
	<Vue3Splitting class="Testing" :words="false" style="color: red" wrapper-tag="ul" line-tag="li"
		>Testing this out <br />
		And a second line</Vue3Splitting
	>
	<h2>Functional component</h2>
	<Header id="test" class="font-bold" @click="onClick" />
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
	lineOffset: 10
}));

setInterval(() => {
	const defaultSentence = 'Hello World<br>This is a test<br>of the things to come';
	if (sentence.value === defaultSentence) {
		sentence.value = 'This is a test';
	} else {
		sentence.value = defaultSentence;
	}
<<<<<<< HEAD
=======
	wrapperClass.value = wrapperClass.value === 'font-bold' ? 'italic' : 'font-bold';
	//config.value.lines = !config.value.lines;
>>>>>>> efed91d29d65b620cfba178d27e4424eb46e9052
}, 5000);

const { Splitting: Header, counts } = useSplitting(sentence, config);

const onClick = () => console.log('Clicked');
</script>

<style>
.font-bold {
	font-weight: bold;
}
.italic {
	font-style: italic;
}
</style>

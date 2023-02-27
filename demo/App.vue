<template>
	<Header />
</template>

<script setup>
import { useSplitting } from '../src';

const Header = useSplitting('Hello World<br>This is a test', {
	lines: true,
	words: false,
	chars: true
});
</script>

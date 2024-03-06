<template>
	<Splitting v-bind="props">
		<slot :counts="counts"></slot>
	</Splitting>
</template>

<script setup lang="ts">
import { useSplitting } from '.';
import { FullConfig } from './types';

const props = withDefaults(defineProps<FullConfig>(), {
	lines: true,
	words: true,
	chars: true,
	lineOffset: 0,
	wordOffset: 0,
	charOffset: 0,
	wrapperTag: 'div',
	lineTag: 'div',
	lineClass: '',
	wordTag: 'span',
	wordClass: '',
	charTag: 'span',
	charClass: ''
});

const { Splitting, counts } = useSplitting();
</script>

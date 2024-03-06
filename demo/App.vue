<template>
	<h2>Functional component</h2>
	<Headline>
		<div>Now's the time to take the <br />money!</div></Headline
	>
</template>

<script setup>
import { ref, computed } from 'vue';
import Headline from './components/Headline.vue';

const config = computed(() => ({
	wrapperTag: 'header',
	lines: false,
	words: true,
	chars: true,
	lineOffset: 10
}));
</script>

<style lang="postcss">
.font-bold {
	font-weight: bold;
}
.italic {
	font-style: italic;
}
.vue3-headline {
	&.slide-up--staggered,
	&.slide-up {
		.v3sp-w {
			overflow: hidden;
		}
		.v3sp-c {
			transition-property: transform;
			transition-duration: 600ms;
			transition-timing-function: ease-in-out;
			transform: translateY(100%);
		}

		&.is-visible {
			.v3sp-c {
				transform: translateY(0%);
			}
		}
	}
	&.slide-up--staggered {
		.v3sp-c {
			transition-delay: calc(100ms + (0.07s * var(--char-index)));
		}
	}
}
</style>

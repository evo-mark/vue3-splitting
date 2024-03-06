<template>
	<h2>Functional component</h2>
	<Header
		ref="headingRef"
		id="test"
		:class="[
			'vue3-headline',
			{
				'is-visible': isVisible
			},
			animation
		]"
		@click="onClick"
		>Using the slot<br />Here</Header
	>
	{{ counts }}
	<Vue3Splitting id="test2" :lines="false" :chars="false" v-slot="{ counts }"
		>Now's the time {{ counts.lines }} take the money!</Vue3Splitting
	>
</template>

<script setup>
import { useSplitting } from '../src';
import { ref, computed } from 'vue';
import { useElementVisibility } from '@vueuse/core';

const animation = ref('slide-up--staggered');

const headingRef = ref(null);
const isVisible = useElementVisibility(headingRef);

const sentence = ref('Hello World<br>This is a test<br>of the things to come');
const config = computed(() => ({
	wrapperTag: 'header',
	lines: false,
	words: true,
	chars: true,
	lineOffset: 10
}));

const { Splitting: Header, counts } = useSplitting(sentence, config);

const onClick = () => console.log('Clicked');
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

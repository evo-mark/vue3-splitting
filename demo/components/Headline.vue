<template>
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
		><slot></slot
	></Header>
</template>

<script setup>
import { ref } from 'vue';
import { useSplitting } from '../../src';
import { useElementVisibility } from '@vueuse/core';

const animation = ref('slide-up--staggered');
const headingRef = ref(null);
const isVisible = useElementVisibility(headingRef);

const { Splitting: Header, counts } = useSplitting();

const onClick = () => console.log('Clicked');
</script>

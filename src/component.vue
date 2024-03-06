<template>
	<Splitting v-bind="props">
		<slot :counts="counts"></slot>
	</Splitting>
</template>

<script setup lang="ts">
import { useSplitting } from '.';
import { FullConfig } from './types';

const props = defineProps<FullConfig>();
const { Splitting, counts } = useSplitting();
</script>

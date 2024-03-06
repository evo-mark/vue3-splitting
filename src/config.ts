import type { FullConfig } from './types';
import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue';
import type { UserConfig } from './types';

// Define the type for the useResolvedConfig function
type UseResolvedConfigFunction = (
	props: FullConfig, // Assuming props can have any keys
	userConfig: MaybeRefOrGetter<UserConfig> // Adjust this type according to your needs
) => ComputedRef<FullConfig>;

export const useResolvedConfig: UseResolvedConfigFunction = (props, userConfig) => {
	return computed(() => {
		const userConfigValue = toValue(userConfig);

		return Object.fromEntries(
			Object.entries(props).map(([key, value]) => {
				if (Object.hasOwn(userConfigValue, key)) return [key, userConfigValue[key]];
				else return [key, value];
			})
		) as FullConfig;
	});
};

export const createClass = (internal: string, user?: string): string => {
	let str = internal;
	if (user) str += ` ${user}`;
	return str;
};

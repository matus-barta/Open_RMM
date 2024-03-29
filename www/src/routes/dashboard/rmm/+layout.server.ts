import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => ({
	orgUnits: router.createCaller(await createContext(event)).orgUnits.list()
});

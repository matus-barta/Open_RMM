<script lang="ts">
	import IconAdd from '$lib/icons/IconAdd.svelte';
	import SidebarOption from './SidebarOption.svelte';

	type T = $$Generic<{ title: string; name: string; count: number }>;

	export let options: T[];
	export let add: { title: string; path: string };
</script>

<div class="flex flex-col justify-between w-64 bg-dark-color">
	<div class="flex flex-col">
		{#each options as option}
			<SidebarOption
				title={option.title}
				name={option.name}
				path="/dashboard/rmm/"
				count={option.count}
			/>
		{/each}
	</div>
	<div class="bg-darker-color h-11">
		<a
			href={add.path}
			class="flex flex-row button-ish font-light hover:bg-transparent justify-center items-center space-x-2 h-full hover:text-accent-color hover:stroke-accent-color"
		>
			<IconAdd size="25" />
			<span class="text-sm font-light">{add.title}</span>
		</a>
	</div>
</div>

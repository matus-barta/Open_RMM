<script lang="ts">
	interface Props {
		size?: number | string;
		stroke?: number;
	}

	let { size = '1em', stroke = 1 }: Props = $props();
</script>

<svg
	width={size}
	height={size}
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	stroke-width={stroke}
	stroke="currentColor"
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
	/>
</svg>

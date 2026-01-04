<script>
	import { onMount } from 'svelte';
	import CardList from '$lib/components/CardList.svelte';

	let { data } = $props();

	let showCreated = $state(data.created);
	let showUpdated = $state(data.updated);
	let showDeleted = $state(data.deleted);

	onMount(() => {
		if (showCreated || showUpdated || showDeleted) {
			const timer = setTimeout(() => {
				showCreated = false;
				showUpdated = false;
				showDeleted = false;
			}, 5000);

			return () => clearTimeout(timer);
		}
	});
</script>

{#if showCreated}
	<div class="notice success notice-center">Karte wurde erstellt.</div>
{/if}
{#if showUpdated}
	<div class="notice info notice-center">Karte wurde angepasst.</div>
{/if}
{#if showDeleted}
	<div class="notice danger notice-center">Karte wurde gelöscht.</div>
{/if}

<CardList cards={data.cards} showActions={false} />

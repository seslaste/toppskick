<script>
	import { onMount } from 'svelte';
	import CardList from '$lib/components/CardList.svelte';

	let { data } = $props();
	let query = $state('');

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

	const filteredCards = $derived(
		query.trim()
			? data.cards.filter((card) => {
					const haystack = [
						card.player,
						card.team,
						card.position,
						card.nationality,
						card.rarity
					]
						.filter(Boolean)
						.join(' ')
						.toLowerCase();
					return haystack.includes(query.trim().toLowerCase());
			  })
			: data.cards
	);
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

<div class="search-bar">
	<input
		type="search"
		placeholder="Suche nach Spieler, Team, Position, Nationalität, Rarity"
		bind:value={query}
	/>
</div>

<CardList
	cards={filteredCards}
	showActions={false}
	emptyText={query.trim() ? 'Keine Treffer gefunden.' : 'Noch keine Karten in der Sammlung.'}
/>

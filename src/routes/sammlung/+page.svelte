<script>
	import { onMount } from 'svelte';
	import CardList from '$lib/components/CardList.svelte';

	let { data } = $props();
	let query = $state('');
	let sortKey = $state('newest');

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

	const sortedCards = $derived(
		(() => {
			const cards = [...filteredCards];
			switch (sortKey) {
				case 'oldest':
					return cards.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
				case 'player-asc':
					return cards.sort((a, b) => (a.player || '').localeCompare(b.player || ''));
				case 'rarity-desc': {
					const rank = {
						'One of One (1/1)': 5,
						'Ultra Rare': 4,
						'Very Rare': 3,
						'Rare': 2,
						'Common': 1
					};
					return cards.sort((a, b) => (rank[b.rarity] || 0) - (rank[a.rarity] || 0));
				}
				default:
					return cards.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
			}
		})()
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

<div class="collection-controls">
	<div class="search-bar">
		<input
			type="search"
			placeholder="Suche nach Spieler, Team, Position, Nationalität, Rarity"
			bind:value={query}
		/>
	</div>
	<div class="sort-bar">
		<select bind:value={sortKey}>
			<option value="newest">Neueste zuerst</option>
			<option value="oldest">Älteste zuerst</option>
			<option value="player-asc">Spieler A-Z</option>
			<option value="rarity-desc">Rarity (seltenste zuerst)</option>
		</select>
	</div>
</div>

<CardList
	cards={sortedCards}
	showActions={false}
	emptyText={query.trim() ? 'Keine Treffer gefunden.' : 'Noch keine Karten in der Sammlung.'}
/>

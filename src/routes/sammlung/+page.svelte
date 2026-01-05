<script>
	import { onMount } from 'svelte';
	import CardList from '$lib/components/CardList.svelte';

	let { data } = $props();
	let query = $state('');
	let sortKey = $state('newest');
	let onlyDuplicates = $state(false);

	let showCreated = $state(data.created);
	let showUpdated = $state(data.updated);
	let showDeleted = $state(data.deleted);

	onMount(() => {
		if (showCreated || showUpdated || showDeleted) {
			if (showCreated || showDeleted) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
			const timer = setTimeout(() => {
				showCreated = false;
				showUpdated = false;
				showDeleted = false;
			}, 5000);

			return () => clearTimeout(timer);
		}
	});

	const filteredCards = $derived.by(() =>
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

	const duplicateInfo = $derived.by(() => {
		const counts = new Map();
		const keyFor = (card) =>
			[
				card.player || '',
				card.team || '',
				card.position || '',
				card.nationality || '',
				card.rarity || ''
			].join('|');
		for (const card of data.cards) {
			const key = keyFor(card);
			counts.set(key, (counts.get(key) || 0) + 1);
		}
		const dupKeys = new Set([...counts.entries()].filter(([, c]) => c > 1).map(([k]) => k));
		return { keyFor, dupKeys };
	});

	const sortedCards = $derived.by(() => {
		const cards = filteredCards.map((card) => ({
			...card,
			_dupKey: duplicateInfo.keyFor(card)
		}));
		const list = onlyDuplicates
			? (() => {
					const seen = new Set();
					return cards.filter((card) => {
						if (!duplicateInfo.dupKeys.has(card._dupKey)) {
							return false;
						}
						if (seen.has(card._dupKey)) {
							return false;
						}
						seen.add(card._dupKey);
						return true;
					});
				})()
			: cards;
		switch (sortKey) {
			case 'oldest':
				return list.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
			case 'player-asc':
				return list.sort((a, b) => (a.player || '').localeCompare(b.player || ''));
			case 'rarity-desc': {
				const rank = {
					'One of One (1/1)': 5,
					'Ultra Rare': 4,
					'Very Rare': 3,
					'Rare': 2,
					'Common': 1
				};
				return list.sort((a, b) => (rank[b.rarity] || 0) - (rank[a.rarity] || 0));
			}
			default:
				return list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
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
	<label class="toggle">
		<input type="checkbox" bind:checked={onlyDuplicates} />
		<span>Nur Duplikate</span>
	</label>
</div>

<CardList
	cards={sortedCards}
	showActions={false}
	showDuplicateBadge={onlyDuplicates}
	duplicateKeys={duplicateInfo.dupKeys}
	emptyText={
		onlyDuplicates
			? 'Keine Duplikate gefunden.'
			: query.trim()
				? 'Keine Treffer gefunden.'
				: 'Noch keine Karten in der Sammlung.'
	}
/>

<script>
	let { cards, showHeader = true, emptyText = 'Noch keine Karten. Starte mit deinem ersten Fund.' } = $props();

	const rarityClassMap = {
		'Common': 'tag-common',
		'Rare': 'tag-rare',
		'Very Rare': 'tag-very-rare',
		'Ultra Rare': 'tag-ultra-rare',
		'One of One (1/1)': 'tag-one-of-one'
	};
</script>

<section class="card-section">
	{#if showHeader}
		<div class="section-head">
			<div>
				<h2>Sammlung</h2>
				<p class="muted">Alle gesammelten Top Kicks Karten im schnellen Ueberblick.</p>
			</div>
			<a class="btn primary" href="/cards/new">Neue Karte</a>
		</div>
	{/if}

	{#if cards.length === 0}
		<div class="empty-state">
			<p>{emptyText}</p>
			{#if showHeader}
				<a class="btn" href="/cards/new">Karte hinzufuegen</a>
			{/if}
		</div>
	{:else}
		<div class="card-grid">
			{#each cards as card}
				<article class="card">
					<div class="card-media">
						<img class="card-image" src="/images/player.png" alt="Kartenmotiv" />
					</div>
					<div class="card-top">
						<div>
							<h3>{card.player || 'Unbekannter Spieler'}</h3>
							<p class="muted">{card.team || 'Unbekanntes Team'}</p>
						</div>
						<span class={`tag ${rarityClassMap[card.rarity] || ''}`}>
							{card.rarity || 'Base'}
						</span>
					</div>
					{#if card.forTrade}
						<div class="card-meta">
							<span class="trade">Tauschbar</span>
						</div>
					{/if}
					{#if card.notes}
						<p class="notes">{card.notes}</p>
					{/if}
					<div class="card-actions">
						<a class="btn ghost" href={`/cards/${card.id}`}>Bearbeiten</a>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

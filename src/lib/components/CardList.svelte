<script>
	let { cards } = $props();
</script>

<section class="card-section">
	<div class="section-head">
		<div>
			<h2>Sammlung</h2>
			<p class="muted">Alle gesammelten Top Kicks Karten im schnellen Ueberblick.</p>
		</div>
		<a class="btn primary" href="/cards/new">Neue Karte</a>
	</div>

	{#if cards.length === 0}
		<div class="empty-state">
			<p>Noch keine Karten. Starte mit deinem ersten Fund.</p>
			<a class="btn" href="/cards/new">Karte hinzufuegen</a>
		</div>
	{:else}
		<div class="card-grid">
			{#each cards as card}
				<article class="card">
					<div class="card-top">
						<div>
							<h3>{card.player || 'Unbekannter Spieler'}</h3>
							<p class="muted">{card.team || 'Unbekanntes Team'}</p>
						</div>
						<span class="tag">{card.rarity || 'Base'}</span>
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
						<form method="post" action="?/delete">
							<input type="hidden" name="id" value={card.id} />
							<button class="btn danger" type="submit">Loeschen</button>
						</form>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

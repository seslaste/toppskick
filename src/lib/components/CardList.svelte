<script>
	let {
		cards,
		showHeader = true,
		showActions = true,
		emptyText = 'Noch keine Karten. Starte mit deinem ersten Fund.'
	} = $props();

	const rarityClassMap = {
		'Common': 'tag-common',
		'Rare': 'tag-rare',
		'Very Rare': 'tag-very-rare',
		'Ultra Rare': 'tag-ultra-rare',
		'One of One (1/1)': 'tag-one-of-one'
	};

	let selectedCard = $state(null);

	function openDetails(card) {
		selectedCard = card;
		if (typeof document !== 'undefined') {
			document.documentElement.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
		}
	}

	function closeDetails() {
		selectedCard = null;
		if (typeof document !== 'undefined') {
			document.documentElement.style.overflow = '';
			document.body.style.overflow = '';
		}
	}
</script>

<section class="card-section">
	{#if showHeader}
		<div class="section-head">
			<div>
				<h2>Sammlung</h2>
				<p class="muted">Alle gesammelten TOPPS Premier League Karten im schnellen Überblick.</p>
			</div>
			<a class="btn primary" href="/cards/new">Neue Karte</a>
		</div>
	{/if}

	{#if cards.length === 0}
		<div class="empty-state">
			<p>{emptyText}</p>
			{#if showHeader}
				<a class="btn" href="/cards/new">Karte hinzufügen</a>
			{/if}
		</div>
	{:else}
		<div class="card-grid">
			{#each cards as card}
				<article
					id={`card-${card.id}`}
					class={`card card-click ${rarityClassMap[card.rarity] ? `${rarityClassMap[card.rarity]}-border` : ''}`}
					role="button"
					tabindex="0"
					on:click={() => openDetails(card)}
				>
					<div class="card-media">
						<img class="card-image" src="/images/player.png" alt="Kartenmotiv" />
						<span class={`tag tag-topright ${rarityClassMap[card.rarity] || ''}`}>
							{card.rarity || 'Base'}
						</span>
					</div>
					<div class="card-top">
						<h3>{card.player || 'Unbekannter Spieler'}</h3>
					</div>
					{#if showActions}
						<div class="card-actions">
							<a class="btn ghost" href={`/cards/${card.id}`} on:click|stopPropagation>Bearbeiten</a>
						</div>
					{/if}
				</article>
			{/each}
		</div>
	{/if}
</section>

{#if selectedCard}
	<div class="modal-backdrop" role="dialog" aria-modal="true">
		<div class="modal-card detail-card">
			<div class="detail-header">
				<h3>{selectedCard.player || 'Unbekannter Spieler'}</h3>
				<button class="btn ghost icon-btn" type="button" on:click={closeDetails} aria-label="Schliessen">
					X
				</button>
			</div>
			<div class="detail-media">
				<img class="detail-image" src="/images/player.png" alt="Kartenmotiv" />
				<span class={`tag tag-topright ${rarityClassMap[selectedCard.rarity] || ''}`}>
					{selectedCard.rarity || 'Base'}
				</span>
			</div>
			<div class="detail-grid">
				<div>
					<p class="detail-label">Team</p>
					<p>{selectedCard.team || 'Unbekannt'}</p>
				</div>
				<div>
					<p class="detail-label">Position</p>
					<p>{selectedCard.position || 'Unbekannt'}</p>
				</div>
				<div>
					<p class="detail-label">Nationalität</p>
					<p>{selectedCard.nationality || 'Unbekannt'}</p>
				</div>
			</div>
			{#if selectedCard.notes}
				<div class="detail-notes">
					<p class="detail-label">Notizen</p>
					<p>{selectedCard.notes}</p>
				</div>
			{/if}
			<div class="detail-footer">
				<a class="btn ghost" href={`/cards/${selectedCard.id}`}>Bearbeiten</a>
			</div>
		</div>
	</div>
{/if}

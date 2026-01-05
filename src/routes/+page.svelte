<script>
	import CardList from '$lib/components/CardList.svelte';

	let { data } = $props();

	const total = data.cards.length;
	const tradeable = data.cards.filter((card) => card.forTrade).length;

	const totals = {
		collection: 595,
		common: 360,
		rare: 120,
		veryRare: 70,
		ultraRare: 30,
		oneOfOne: 15
	};

	const collected = data.cards.reduce(
		(acc, card) => {
			switch (card.rarity) {
				case 'Common':
					acc.common += 1;
					break;
				case 'Rare':
					acc.rare += 1;
					break;
				case 'Very Rare':
					acc.veryRare += 1;
					break;
				case 'Ultra Rare':
					acc.ultraRare += 1;
					break;
				case 'One of One (1/1)':
					acc.oneOfOne += 1;
					break;
				default:
					break;
			}
			return acc;
		},
		{ common: 0, rare: 0, veryRare: 0, ultraRare: 0, oneOfOne: 0 }
	);

	const duplicateCount = data.cards.reduce((acc, card) => {
		const key = [
			card.player || '',
			card.team || '',
			card.position || '',
			card.nationality || '',
			card.rarity || ''
		].join('|');
		acc[key] = (acc[key] || 0) + 1;
		return acc;
	}, {});

	const duplicates = Object.values(duplicateCount).filter((count) => count > 1).length;

	const rarityRank = {
		'One of One (1/1)': 5,
		'Ultra Rare': 4,
		'Very Rare': 3,
		'Rare': 2,
		'Common': 1
	};

	const bestCards = [...data.cards]
		.sort((a, b) => (rarityRank[b.rarity] || 0) - (rarityRank[a.rarity] || 0))
		.slice(0, 4);
</script>

<section class="home-card">
	<div>
		<h1>Willkommen zurück!</h1>
		<p class="home-sub">Deine TOPPS Premier League Sammelkarten Kollektion</p>
	</div>

	<div class="progress-wrap">
		<div class="progress-header">
			<span>Gesamtfortschritt</span>
			<span>{total} / {totals.collection} Karten ({Math.round((total / totals.collection) * 100)}%)</span>
		</div>
		<div class="progress-bar">
			<span style={`width: ${Math.max(2, (total / totals.collection) * 100)}%`}></span>
		</div>
		<div class="progress-row">
			<span>Doppelte Karten</span>
			<span>{duplicates}</span>
		</div>
		<div class="rarity-list">
			<div class="rarity-item">
				<div class="rarity-dot">
					<span style="background:#42e695"></span>Common
				</div>
				<div class="rarity-bar">
					<i style={`width:${(collected.common / totals.common) * 100}%;background:#42e695`}></i>
				</div>
				<span>{collected.common} / {totals.common}</span>
			</div>
			<div class="rarity-item">
				<div class="rarity-dot">
					<span style="background:#5d7bff"></span>Rare
				</div>
				<div class="rarity-bar">
					<i style={`width:${(collected.rare / totals.rare) * 100}%;background:#5d7bff`}></i>
				</div>
				<span>{collected.rare} / {totals.rare}</span>
			</div>
			<div class="rarity-item">
				<div class="rarity-dot">
					<span style="background:#a678ff"></span>Very Rare
				</div>
				<div class="rarity-bar">
					<i style={`width:${(collected.veryRare / totals.veryRare) * 100}%;background:#a678ff`}></i>
				</div>
				<span>{collected.veryRare} / {totals.veryRare}</span>
			</div>
			<div class="rarity-item">
				<div class="rarity-dot">
					<span style="background:#ff8a3d"></span>Ultra Rare
				</div>
				<div class="rarity-bar">
					<i style={`width:${(collected.ultraRare / totals.ultraRare) * 100}%;background:#ff8a3d`}></i>
				</div>
				<span>{collected.ultraRare} / {totals.ultraRare}</span>
			</div>
			<div class="rarity-item">
				<div class="rarity-dot">
					<span style="background:#ff4d6d"></span>One of One (1/1)
				</div>
				<div class="rarity-bar">
					<i style={`width:${(collected.oneOfOne / totals.oneOfOne) * 100}%;background:#ff4d6d`}></i>
				</div>
				<span>{collected.oneOfOne} / {totals.oneOfOne}</span>
			</div>
		</div>
	</div>
</section>

<section class="cta-panel">
	<p>Ergänze neue Funde in deiner Sammlung.</p>
	<a class="btn add" href="/cards/new">Neue Karte</a>
</section>

<section class="collection-block">
	<div class="home-split">
		<div>
			<h2>Deine besten Karten</h2>
			<CardList
				cards={bestCards}
				showHeader={false}
				showActions={false}
				emptyText="Noch keine Karten in der Sammlung."
			/>
		</div>
	</div>
</section>

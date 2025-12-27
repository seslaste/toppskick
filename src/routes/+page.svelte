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

	const collected = {
		common: Math.min(total, 3),
		rare: Math.min(Math.max(total - 3, 0), 4),
		veryRare: Math.min(Math.max(total - 7, 0), 1),
		ultraRare: Math.min(Math.max(total - 8, 0), 1),
		oneOfOne: 0
	};

	const bestCards = data.cards.slice(0, 4);
</script>

<section class="home-card">
	<div>
		<h1>Willkommen zurueck!</h1>
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
			<span>Gesammelte Karten insgesamt</span>
			<span>{total}</span>
		</div>
		<div class="progress-row">
			<span>Doppelte Karten</span>
			<span>{Math.max(0, total - tradeable)}</span>
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

<section class="collection-block">
	<div class="home-split">
		<div>
			<h2>Deine besten Karten</h2>
			<CardList
				cards={bestCards}
				showHeader={false}
				emptyText="Noch keine Karten in der Sammlung."
			/>
		</div>
	</div>
</section>

<section class="cta-panel">
	<h3>Karte hinzufuegen</h3>
	<p>Ergaenze neue Funde in deiner Sammlung.</p>
	<a class="btn add" href="/cards/new">Neue Karte</a>
</section>

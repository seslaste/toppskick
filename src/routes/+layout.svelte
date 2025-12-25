<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
	/>
</svelte:head>

<div class="app-shell">
	<header class="topbar">
		<div class="brand">
			<div class="brand-mark">
				<span>TK</span>
			</div>
			<div>
				<p class="brand-title">TOPPS Premier League</p>
				<p class="brand-sub">Sammelkarten Kollektion</p>
			</div>
		</div>
		<nav class="nav-links">
			<a class="active" href="/">Home</a>
			<a href="/">Sammlung</a>
			<a href="/">Statistiken</a>
		</nav>
	</header>
	<main class="page">
		{@render children()}
	</main>
</div>

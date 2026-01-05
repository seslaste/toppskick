<script>
	import '../app.css';
	import { page } from '$app/stores';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/images/logo.png" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
	/>
</svelte:head>

<div class="app-shell">
	<header class="topbar">
		<div class="brand">
			<div class="brand-mark">
				<img src="/images/logo.png" alt="Topps Kick Logo" />
			</div>
			<div>
				<p class="brand-title">TOPPS Premier League</p>
				<p class="brand-sub">Sammelkarten Kollektion</p>
			</div>
		</div>
		<nav class="nav-links">
			<a class:active={$page.url.pathname === '/'} href="/">Home</a>
			<a class:active={$page.url.pathname.startsWith('/sammlung')} href="/sammlung">Sammlung</a>
			{#if data.user}
				<form method="post" action="/logout">
					<button class="nav-button" type="submit">Logout ({data.user})</button>
				</form>
			{:else}
				<a class:active={$page.url.pathname.startsWith('/login')} href="/login">Login</a>
			{/if}
		</nav>
	</header>
	<main class="page">
		{@render children()}
	</main>
</div>

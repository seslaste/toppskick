<script>
	import CardForm from '$lib/components/CardForm.svelte';

	let { data } = $props();
</script>

<section class="hero">
	<div class="hero-card">
		<h1>Karte bearbeiten</h1>
		<p>Aktualisiere Details oder lösche die Karte</p>
	</div>
</section>

<CardForm
	card={data.card}
	submitLabel="Änderungen speichern"
	action="?/save"
	deleteAction="?/delete"
/>

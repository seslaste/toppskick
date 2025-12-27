<script>
	import CardForm from '$lib/components/CardForm.svelte';

	let { data } = $props();
</script>

<section class="hero">
	<div class="hero-card">
		<h1>Karte bearbeiten</h1>
		<p>Aktualisiere Details oder markiere die Karte zum Tausch.</p>
	</div>
</section>

<CardForm
	card={data.card}
	submitLabel="Aenderungen speichern"
	action="?/save"
	deleteAction="?/delete"
/>

<script>
	import CardList from '$lib/components/CardList.svelte';

	let { data } = $props();
</script>

<CardList cards={data.cards} />

<script>
	let { action, submitLabel = 'Speichern', card = null } = $props();

	let form = $state({
		player: card?.player ?? '',
		team: card?.team ?? '',
		rarity: card?.rarity ?? '',
		forTrade: card?.forTrade ?? false,
		notes: card?.notes ?? ''
	});
</script>

<form class="card-form" method="post" action={action}>
	<div class="form-grid">
		<label>
			Spieler
			<input name="player" bind:value={form.player} placeholder="z. B. Erling Haaland" />
		</label>
		<label>
			Team
			<select name="team" bind:value={form.team}>
				<option value="">Bitte wählen</option>
				<option value="Arsenal">Arsenal</option>
				<option value="Aston Villa">Aston Villa</option>
				<option value="Bournemouth">Bournemouth</option>
				<option value="Brentford">Brentford</option>
				<option value="Brighton & Hove Albion">Brighton & Hove Albion</option>
				<option value="Burnley">Burnley</option>
				<option value="Chelsea">Chelsea</option>
				<option value="Crystal Palace">Crystal Palace</option>
				<option value="Everton">Everton</option>
				<option value="Fulham">Fulham</option>
				<option value="Leeds United">Leeds United</option>
				<option value="Liverpool">Liverpool</option>
				<option value="Manchester City">Manchester City</option>
				<option value="Manchester United">Manchester United</option>
				<option value="Newcastle United">Newcastle United</option>
				<option value="Nottingham Forest">Nottingham Forest</option>
				<option value="Sunderland">Sunderland</option>
				<option value="Tottenham Hotspur">Tottenham Hotspur</option>
				<option value="West Ham United">West Ham United</option>
				<option value="Wolverhampton Wanderers">Wolverhampton Wanderers</option>
			</select>
		</label>
		<label>
			Rarity
			<select name="rarity" bind:value={form.rarity}>
				<option value="">Bitte waehlen</option>
				<option value="Common">Common</option>
				<option value="Rare">Rare</option>
				<option value="Very Rare">Very Rare</option>
				<option value="Ultra Rare">Ultra Rare</option>
				<option value="One of One (1/1)">One of One (1/1)</option>
			</select>
		</label>
	</div>

	<label>
		Notizen
		<textarea name="notes" rows="4" bind:value={form.notes} placeholder="Zustand, Fundort, Besonderheiten"></textarea>
	</label>

	<div class="form-actions">
		<button class="btn primary" type="submit">{submitLabel}</button>
		<a class="btn ghost" href="/">Zur Uebersicht</a>
	</div>
</form>

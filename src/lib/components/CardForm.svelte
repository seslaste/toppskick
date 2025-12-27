<script>
	let { action, submitLabel = 'Speichern', card = null, deleteAction = null } = $props();
	let showDeleteConfirm = $state(false);

	const initial = {
		player: card?.player ?? '',
		team: card?.team ?? '',
		position: card?.position ?? '',
		rarity: card?.rarity ?? '',
		forTrade: card?.forTrade ?? false,
		notes: card?.notes ?? ''
	};

	let form = $state({ ...initial });

	function handleCancel() {
		form = { ...initial };
		if (typeof window !== 'undefined') {
			window.location.href = '/sammlung';
		}
	}

	function openDeleteConfirm() {
		showDeleteConfirm = true;
	}

	function closeDeleteConfirm() {
		showDeleteConfirm = false;
	}
</script>

<form class="card-form" method="post" action={action}>
	<div class="form-grid">
		<label>
			Spieler
			<input name="player" required bind:value={form.player} placeholder="z. B. Erling Haaland" />
		</label>
		<label>
			Team
			<select name="team" required bind:value={form.team}>
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
			Position
			<select name="position" required bind:value={form.position}>
				<option value="">Bitte waehlen</option>
				<option value="Torwart">Torwart</option>
				<option value="Verteidiger">Verteidiger</option>
				<option value="Mittelfeldspieler">Mittelfeldspieler</option>
				<option value="Stuermer">Stuermer</option>
			</select>
		</label>
		<label>
			Rarity
			<select name="rarity" required bind:value={form.rarity}>
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
		<div class="action-group">
			<button class="btn primary" type="submit">{submitLabel}</button>
			<button class="btn ghost" type="button" on:click={handleCancel}>Cancel</button>
		</div>
		{#if deleteAction}
			<button class="btn danger" type="button" on:click={openDeleteConfirm}>
				Karte loeschen
			</button>
		{/if}
	</div>
</form>

{#if deleteAction && showDeleteConfirm}
	<div class="modal-backdrop" role="dialog" aria-modal="true">
		<div class="modal-card">
			<h3>Karte loeschen?</h3>
			<p>Diese Aktion kann nicht rueckgaengig gemacht werden.</p>
			<div class="modal-actions">
				<button class="btn ghost" type="button" on:click={closeDeleteConfirm}>Abbrechen</button>
				<form method="post" action={deleteAction}>
					<button class="btn danger" type="submit">Loeschen bestaetigen</button>
				</form>
			</div>
		</div>
	</div>
{/if}

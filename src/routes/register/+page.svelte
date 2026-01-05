<script>
	let { form } = $props();
</script>

<section class="home-card">
	<div>
		<h1>Benutzer erstellen</h1>
		<p class="home-sub">Lege einen neuen Benutzer an, um eine eigene Sammlung zu führen.</p>
	</div>
	<form class="card-form login-form" method="post">
		<label>
			Benutzername
			<input name="username" required placeholder="z. B. Alex" />
		</label>
		<label>
			Passwort
			<input name="password" type="password" required placeholder="••••••••" />
		</label>
		{#if form?.error}
			<p class="muted">{form.error}</p>
		{/if}
		<div class="form-actions">
			<button class="btn primary" type="submit">Benutzer erstellen</button>
		</div>
	</form>
</section>

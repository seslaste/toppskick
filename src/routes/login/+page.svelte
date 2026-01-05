<script>
	let { data, form } = $props();
</script>

<section class="home-card">
	<div>
		<h1>Login</h1>
		<p class="home-sub">Gib Benutzername und Passwort ein, um deine Sammlung zu verwalten.</p>
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
			<button class="btn primary" type="submit">Einloggen</button>
			<a class="btn ghost" href="/register">Benutzer erstellen</a>
		</div>
	</form>
</section>

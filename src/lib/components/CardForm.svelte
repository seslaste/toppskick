<script>
	let { action, submitLabel = 'Speichern', card = null, deleteAction = null } = $props();
	let showDeleteConfirm = $state(false);

	const initial = {
		player: card?.player ?? '',
		team: card?.team ?? '',
		position: card?.position ?? '',
		nationality: card?.nationality ?? '',
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
				<option value="">Bitte wählen</option>
				<option value="Torwart">Torwart</option>
				<option value="Verteidiger">Verteidiger</option>
				<option value="Mittelfeldspieler">Mittelfeldspieler</option>
				<option value="Stürmer">Stürmer</option>
			</select>
		</label>
		<label>
			Nationalität
			<select name="nationality" required bind:value={form.nationality}>
				<option value="">Bitte wählen</option>
				<option value="Afghanistan">Afghanistan</option>
				<option value="Ägypten">Ägypten</option>
				<option value="Ålandinseln">Ålandinseln</option>
				<option value="Albanien">Albanien</option>
				<option value="Algerien">Algerien</option>
				<option value="Amerikanisch-Samoa">Amerikanisch-Samoa</option>
				<option value="Amerikanische Jungferninseln">Amerikanische Jungferninseln</option>
				<option value="Andorra">Andorra</option>
				<option value="Angola">Angola</option>
				<option value="Anguilla">Anguilla</option>
				<option value="Antarktis">Antarktis</option>
				<option value="Antigua und Barbuda">Antigua und Barbuda</option>
				<option value="Äquatorialguinea">Äquatorialguinea</option>
				<option value="Argentinien">Argentinien</option>
				<option value="Armenien">Armenien</option>
				<option value="Aruba">Aruba</option>
				<option value="Australien">Australien</option>
				<option value="Österreich">Österreich</option>
				<option value="Aserbaidschan">Aserbaidschan</option>
				<option value="Äthiopien">Äthiopien</option>
				<option value="Bahamas">Bahamas</option>
				<option value="Bahrain">Bahrain</option>
				<option value="Bangladesch">Bangladesch</option>
				<option value="Barbados">Barbados</option>
				<option value="Belarus">Belarus</option>
				<option value="Belgien">Belgien</option>
				<option value="Belize">Belize</option>
				<option value="Benin">Benin</option>
				<option value="Bermuda">Bermuda</option>
				<option value="Bhutan">Bhutan</option>
				<option value="Bolivien">Bolivien</option>
				<option value="Bonaire, Sint Eustatius und Saba">Bonaire, Sint Eustatius und Saba</option>
				<option value="Bosnien und Herzegowina">Bosnien und Herzegowina</option>
				<option value="Botsuana">Botsuana</option>
				<option value="Bouvetinsel">Bouvetinsel</option>
				<option value="Brasilien">Brasilien</option>
				<option value="Britische Jungferninseln">Britische Jungferninseln</option>
				<option value="Britisches Territorium im Indischen Ozean">Britisches Territorium im Indischen Ozean</option>
				<option value="Brunei">Brunei</option>
				<option value="Bulgarien">Bulgarien</option>
				<option value="Burkina Faso">Burkina Faso</option>
				<option value="Burundi">Burundi</option>
				<option value="Chile">Chile</option>
				<option value="China">China</option>
				<option value="Cookinseln">Cookinseln</option>
				<option value="Costa Rica">Costa Rica</option>
				<option value="Curaçao">Curaçao</option>
				<option value="Dänemark">Dänemark</option>
				<option value="Deutschland">Deutschland</option>
				<option value="Dominica">Dominica</option>
				<option value="Dominikanische Republik">Dominikanische Republik</option>
				<option value="Dschibuti">Dschibuti</option>
				<option value="Ecuador">Ecuador</option>
				<option value="El Salvador">El Salvador</option>
				<option value="Elfenbeinküste">Elfenbeinküste</option>
				<option value="Eritrea">Eritrea</option>
				<option value="Estland">Estland</option>
				<option value="Eswatini">Eswatini</option>
				<option value="Falklandinseln">Falklandinseln</option>
				<option value="Färöer">Färöer</option>
				<option value="Fidschi">Fidschi</option>
				<option value="Finnland">Finnland</option>
				<option value="Frankreich">Frankreich</option>
				<option value="Französisch-Guayana">Französisch-Guayana</option>
				<option value="Französisch-Polynesien">Französisch-Polynesien</option>
				<option value="Französische Süd- und Antarktisgebiete">Französische Süd- und Antarktisgebiete</option>
				<option value="Gabun">Gabun</option>
				<option value="Gambia">Gambia</option>
				<option value="Georgien">Georgien</option>
				<option value="Ghana">Ghana</option>
				<option value="Gibraltar">Gibraltar</option>
				<option value="Grenada">Grenada</option>
				<option value="Griechenland">Griechenland</option>
				<option value="Grönland">Grönland</option>
				<option value="Guadeloupe">Guadeloupe</option>
				<option value="Guam">Guam</option>
				<option value="Guatemala">Guatemala</option>
				<option value="Guernsey">Guernsey</option>
				<option value="Guinea">Guinea</option>
				<option value="Guinea-Bissau">Guinea-Bissau</option>
				<option value="Guyana">Guyana</option>
				<option value="Haiti">Haiti</option>
				<option value="Heard und McDonaldinseln">Heard und McDonaldinseln</option>
				<option value="Honduras">Honduras</option>
				<option value="Hongkong">Hongkong</option>
				<option value="Indien">Indien</option>
				<option value="Indonesien">Indonesien</option>
				<option value="Irak">Irak</option>
				<option value="Iran">Iran</option>
				<option value="Irland">Irland</option>
				<option value="Island">Island</option>
				<option value="Israel">Israel</option>
				<option value="Italien">Italien</option>
				<option value="Jamaika">Jamaika</option>
				<option value="Japan">Japan</option>
				<option value="Jemen">Jemen</option>
				<option value="Jersey">Jersey</option>
				<option value="Jordanien">Jordanien</option>
				<option value="Kaimaninseln">Kaimaninseln</option>
				<option value="Kambodscha">Kambodscha</option>
				<option value="Kamerun">Kamerun</option>
				<option value="Kanada">Kanada</option>
				<option value="Kap Verde">Kap Verde</option>
				<option value="Kasachstan">Kasachstan</option>
				<option value="Katar">Katar</option>
				<option value="Kenia">Kenia</option>
				<option value="Kirgisistan">Kirgisistan</option>
				<option value="Kiribati">Kiribati</option>
				<option value="Kokosinseln">Kokosinseln</option>
				<option value="Kolumbien">Kolumbien</option>
				<option value="Komoren">Komoren</option>
				<option value="Kongo">Kongo</option>
				<option value="Kongo, Demokratische Republik">Kongo, Demokratische Republik</option>
				<option value="Korea, Demokratische Volksrepublik">Korea, Demokratische Volksrepublik</option>
				<option value="Korea, Republik">Korea, Republik</option>
				<option value="Kroatien">Kroatien</option>
				<option value="Kuba">Kuba</option>
				<option value="Kuwait">Kuwait</option>
				<option value="Laos">Laos</option>
				<option value="Lesotho">Lesotho</option>
				<option value="Lettland">Lettland</option>
				<option value="Libanon">Libanon</option>
				<option value="Liberia">Liberia</option>
				<option value="Libyen">Libyen</option>
				<option value="Liechtenstein">Liechtenstein</option>
				<option value="Litauen">Litauen</option>
				<option value="Luxemburg">Luxemburg</option>
				<option value="Macao">Macao</option>
				<option value="Madagaskar">Madagaskar</option>
				<option value="Malawi">Malawi</option>
				<option value="Malaysia">Malaysia</option>
				<option value="Malediven">Malediven</option>
				<option value="Mali">Mali</option>
				<option value="Malta">Malta</option>
				<option value="Marokko">Marokko</option>
				<option value="Marshallinseln">Marshallinseln</option>
				<option value="Martinique">Martinique</option>
				<option value="Mauretanien">Mauretanien</option>
				<option value="Mauritius">Mauritius</option>
				<option value="Mayotte">Mayotte</option>
				<option value="Mexiko">Mexiko</option>
				<option value="Mikronesien">Mikronesien</option>
				<option value="Moldau">Moldau</option>
				<option value="Monaco">Monaco</option>
				<option value="Mongolei">Mongolei</option>
				<option value="Montenegro">Montenegro</option>
				<option value="Montserrat">Montserrat</option>
				<option value="Mosambik">Mosambik</option>
				<option value="Myanmar">Myanmar</option>
				<option value="Namibia">Namibia</option>
				<option value="Nauru">Nauru</option>
				<option value="Nepal">Nepal</option>
				<option value="Neuseeland">Neuseeland</option>
				<option value="Nicaragua">Nicaragua</option>
				<option value="Niederlande">Niederlande</option>
				<option value="Niger">Niger</option>
				<option value="Nigeria">Nigeria</option>
				<option value="Niue">Niue</option>
				<option value="Norfolkinsel">Norfolkinsel</option>
				<option value="Nordmazedonien">Nordmazedonien</option>
				<option value="Nördliche Marianen">Nördliche Marianen</option>
				<option value="Norwegen">Norwegen</option>
				<option value="Oman">Oman</option>
				<option value="Pakistan">Pakistan</option>
				<option value="Palau">Palau</option>
				<option value="Palästina, Staat">Palästina, Staat</option>
				<option value="Panama">Panama</option>
				<option value="Papua-Neuguinea">Papua-Neuguinea</option>
				<option value="Paraguay">Paraguay</option>
				<option value="Peru">Peru</option>
				<option value="Philippinen">Philippinen</option>
				<option value="Pitcairninseln">Pitcairninseln</option>
				<option value="Polen">Polen</option>
				<option value="Portugal">Portugal</option>
				<option value="Puerto Rico">Puerto Rico</option>
				<option value="Réunion">Réunion</option>
				<option value="Ruanda">Ruanda</option>
				<option value="Rumänien">Rumänien</option>
				<option value="Russische Föderation">Russische Föderation</option>
				<option value="Salomonen">Salomonen</option>
				<option value="Sambia">Sambia</option>
				<option value="Samoa">Samoa</option>
				<option value="San Marino">San Marino</option>
				<option value="São Tomé und Príncipe">São Tomé und Príncipe</option>
				<option value="Saudi-Arabien">Saudi-Arabien</option>
				<option value="Schweden">Schweden</option>
				<option value="Schweiz">Schweiz</option>
				<option value="Senegal">Senegal</option>
				<option value="Serbien">Serbien</option>
				<option value="Seychellen">Seychellen</option>
				<option value="Sierra Leone">Sierra Leone</option>
				<option value="Simbabwe">Simbabwe</option>
				<option value="Singapur">Singapur</option>
				<option value="Sint Maarten">Sint Maarten</option>
				<option value="Slowakei">Slowakei</option>
				<option value="Slowenien">Slowenien</option>
				<option value="Somalia">Somalia</option>
				<option value="Spanien">Spanien</option>
				<option value="Sri Lanka">Sri Lanka</option>
				<option value="St. Barthélemy">St. Barthélemy</option>
				<option value="St. Helena, Ascension und Tristan da Cunha">St. Helena, Ascension und Tristan da Cunha</option>
				<option value="St. Kitts und Nevis">St. Kitts und Nevis</option>
				<option value="St. Lucia">St. Lucia</option>
				<option value="St. Martin (französisch)">St. Martin (französisch)</option>
				<option value="St. Pierre und Miquelon">St. Pierre und Miquelon</option>
				<option value="St. Vincent und die Grenadinen">St. Vincent und die Grenadinen</option>
				<option value="Südafrika">Südafrika</option>
				<option value="Südgeorgien und die Südlichen Sandwichinseln">Südgeorgien und die Südlichen Sandwichinseln</option>
				<option value="Südsudan">Südsudan</option>
				<option value="Suriname">Suriname</option>
				<option value="Svalbard und Jan Mayen">Svalbard und Jan Mayen</option>
				<option value="Syrien">Syrien</option>
				<option value="Tadschikistan">Tadschikistan</option>
				<option value="Taiwan">Taiwan</option>
				<option value="Tansania">Tansania</option>
				<option value="Thailand">Thailand</option>
				<option value="Timor-Leste">Timor-Leste</option>
				<option value="Togo">Togo</option>
				<option value="Tokelau">Tokelau</option>
				<option value="Tonga">Tonga</option>
				<option value="Trinidad und Tobago">Trinidad und Tobago</option>
				<option value="Tschad">Tschad</option>
				<option value="Tschechien">Tschechien</option>
				<option value="Türkei">Türkei</option>
				<option value="Turkmenistan">Turkmenistan</option>
				<option value="Turks- und Caicosinseln">Turks- und Caicosinseln</option>
				<option value="Tuvalu">Tuvalu</option>
				<option value="Uganda">Uganda</option>
				<option value="Ukraine">Ukraine</option>
				<option value="Ungarn">Ungarn</option>
				<option value="Uruguay">Uruguay</option>
				<option value="Usbekistan">Usbekistan</option>
				<option value="Vanuatu">Vanuatu</option>
				<option value="Vatikanstadt">Vatikanstadt</option>
				<option value="Venezuela">Venezuela</option>
				<option value="Vereinigte Arabische Emirate">Vereinigte Arabische Emirate</option>
				<option value="Vereinigte Staaten">Vereinigte Staaten</option>
				<option value="Vereinigtes Königreich">Vereinigtes Königreich</option>
				<option value="Vietnam">Vietnam</option>
				<option value="Wallis und Futuna">Wallis und Futuna</option>
				<option value="Weihnachtsinsel">Weihnachtsinsel</option>
				<option value="Westsahara">Westsahara</option>
				<option value="Zentralafrikanische Republik">Zentralafrikanische Republik</option>
				<option value="Zypern">Zypern</option>
			</select>
		</label>
		<label>
			Rarity
			<select name="rarity" required bind:value={form.rarity}>
				<option value="">Bitte wählen</option>
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
			<button class="btn ghost" type="button" on:click={handleCancel}>Abbrechen</button>
		</div>
		{#if deleteAction}
			<button class="btn danger" type="button" on:click={openDeleteConfirm}>
				Karte löschen
			</button>
		{/if}
	</div>
</form>

{#if deleteAction && showDeleteConfirm}
	<div class="modal-backdrop" role="dialog" aria-modal="true">
		<div class="modal-card">
			<h3>Karte löschen?</h3>
			<p>Diese Aktion kann nicht rückgängig gemacht werden.</p>
			<div class="modal-actions">
				<button class="btn ghost" type="button" on:click={closeDeleteConfirm}>Abbrechen</button>
				<form method="post" action={deleteAction}>
					<button class="btn danger" type="submit">Löschen bestätigen</button>
				</form>
			</div>
		</div>
	</div>
{/if}

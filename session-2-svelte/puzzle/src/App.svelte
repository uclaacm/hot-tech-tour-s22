<script>
	let name = "Jakob";
	let src = "./images/mom-image.jpg";
	let columns;
	let rows = [];
	let availableTickets;
	let seat;
	let chosenSeats = [];
	for(i = 0; i < rows.length; i++)
	{
		for(j = 0; j < columns; j++)
		{
			seat = rows[i] + `${j}`;
		}
	}
	let snacks = [];
	let selected;
	let answer = '';

	function handleSubmit() {
		snacks[selected.id - 1].count += answer;
	}
</script>

<main>
	<div>
		<h1>Doctor Strange in the Wandaverse of Madness</h1>
		<img {src} alt="Multiverse of Madness Image">
		<h2>Click on thy tickets please maybe possibly</h2>
	</div>
	<h1>*Scream*</h1>
	{#each rows as { row }, i}
		<div>
			{#each Array(columns) as _, column}
				<label>
					<input type=checkbox value={availableTickets[i * 14 + column]}>
					{availableTickets[i * 14 + column]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</label>
			{/each}
		</div>
	{/each}
	<h2>Currently, x amount of tickets have been purchased. There are {chosenSeats.length} open seats.</h2>
	<h2>Snacc Order</h2>

	<form on:submit|preventDefault={}>
		<select value={selected} on:change="{() => answer = ''}">
			{#each snacks as snack}
				<option value={snack}>
					{snack.text}
				</option>
			{/each}
		</select>

	<h4>How many snaccccs?</h4>

	<input type="number" value={answer}>

	<button type=submit>
		GO!
	</button>

	<p>Selected {selected ? answer + ' ' + selected.text + '(s)' : '[waiting...]'}</p>

	<ul>
		<li>Tix: {chosenSeats.length}</li>
	</ul>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	img {
		max-width: 500px;
	}

	label {
		display: inline;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	li {
		list-style: none;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
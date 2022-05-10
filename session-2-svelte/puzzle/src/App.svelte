<script>
	let name = "Jakob";
	let src = "./images/mom-image.jpg";
	let columns = 14;
	let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	let availableTickets = [];
	let i;
	let j;
	let seat;
	let chosenSeats = [];
	for(i = 0; i < rows.length; i++)
	{
		for(j = 0; j < columns; j++)
		{
			seat = rows[i] + `${j}`;
			availableTickets.push(seat);
		}
	}
	let snacks = [
		{ id: 1, text: `Large Popcorn`, count: 0 },
		{ id: 2, text: `Icee`, count: 0 },
		{ id: 3, text: `Vanilla Ice Cream Scoop`, count: 0 },
		{ id: 4, text: `Baked Pretzel`, count: 0 },
		{ id: 5, text: `Mike N Ikes Pack`, count: 0 }
	];
	let selected;
	let answer = '';

	function handleSubmit() {
		snacks[selected.id - 1].count += answer;
		alert(`Purchased ${answer} ${selected.text}(s)`);
	}
</script>

<main>
	<div>
		<h1>Doctor Strange in the Multiverse of Madness</h1>
		<img {src} alt="Multiverse of Madness Image">
		<h2>Click the tickets you want to buy! </h2>
	</div>
	<h1>*Screen*</h1>
	{#each rows as { row }, i}
		<div>
			{#each Array(columns) as _, column}
				<label>
					<input type=checkbox bind:group={chosenSeats} value={availableTickets[i * 14 + column]}>
					{availableTickets[i * 14 + column]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</label>
			{/each}
		</div>
	{/each}
	<h2>Currently, {chosenSeats.length} tickets have been purchased. There are {112 - chosenSeats.length} open seats.</h2>
	<h2>Snack Order</h2>

	<form on:submit|preventDefault={handleSubmit}>
		<select bind:value={selected} on:change="{() => answer = ''}">
			{#each snacks as snack}
				<option value={snack}>
					{snack.text}
				</option>
			{/each}
		</select>

	<h4>How many?</h4>

	<input type="number" bind:value={answer}>

	<button disabled={!answer} type=submit>
		Submit
	</button>

	<p>Selected {selected ? answer + ' ' + selected.text + '(s)' : '[waiting...]'}</p>

	<h1>Total Sales: </h1>

	<ul>
		<li>Tickets: {chosenSeats.length}</li>
		{#each snacks as snack}
			<li>{snack.text}: {snack.count}</li>
		{/each}
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
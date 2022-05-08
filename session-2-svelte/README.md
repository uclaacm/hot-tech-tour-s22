# Hot Tech Tour - Spring 2022 - Session 2

**Date**: May 4, 2022

**Location**: Boelter 9436

**Teachers**: 
- [Nareh Agazaryan](https://github.com/nareha)
- [Nathan Zhang](https://github.com/nathanzzhang)
- [Jakob Reinwald](https://github.com/jakobreinwald)
- [Anakin Trotter](https://github.com/AnakinTrotter)

## Resources

- [Slides](https://docs.google.com/presentation/d/1VNBXTLrDQU0_nzTjHRkjRetLECKXch1eQCDmZ1wPrBM/edit?usp=sharing)

## Downloads

## What we'll be learning today
- [Introduction](#introduction)
	- [Disclaimer before starting](#disclaimer)
- [Basics](#basics)
- [Reactivity](#reactivity)
- [Props](#props)
- [Logic](#logic)

## Introduction
Welcome to Svelte! Firstly, how do we even pronounce Svelte? It's pronounced *suh-velt (like felt)*, so don't forget it!

What is Svelte and why is it worth learning? Svelte is a new and rising tool for building websites. If you know some web development basics, you may have seen HTML, CSS, and JavaScript. Svelte isn't replacing that. In fact, as we'll come to see, Svelte uses many similar concepts to vanilla HTML, CSS, and JavaScript (that is, when those technologies aren't being used with an external technology). It of course has some enhancements that will make your time creating websites a lot smoother, which is the whole purpose of its existence.

If you've been to Hackschool this past fall, or even last year, you may be wondering why we're teaching *another* website-making tool. Previously, we taught React, which is already a well established framework. Svelte is *completely* differerent, so we highly recommend sticking through this, and you may find things you like about Svelte. Svelte is very new, and even though it's had a lot of patches and updates since its launch, it's only getting better with each feature update, so it's a piece of up-and-coming (hot) tech!

But why Svelte *in particular*? Let me show you a classic code example of "Hello World".

```svelte
<script>
  let name = 'world';
</script>

<h1> Hello {name}!</h1>
```

Other than the curly braces, this looks very similar to vanilla HTML with JS, and that's why Svelte is so great! It has additions to make writing websites easier, but it doesn't have a lot of convoluted syntax that some other JavaScript frameworks may have.

### Disclaimer
You may have seen mention of HTML, CSS, and/or JavaScript. It is really helpful to have *basic knowledge* about these to streamline learning of Svelte. If you're unfamiliar with these, I highly recommend checking out our workshops from Fall on [HTML/CSS](https://www.youtube.com/watch?v=F2VlOVAbBuA) and [JS](https://www.youtube.com/watch?v=Dk9kob-9Wkw).

## Basics

### Components
The basic building block in Svelte is the **component**. A component can be thought of as just one file. All the code in that file is for *one specific use case*.

### Adding Data
We saw in the "Hello World!" example that we had created a variable called `name` and used that in the `<h1>` tag. Using curly braces is the way Svelte allows us to embed JavaScript (any JS code, not just variables) directly into the "HTML" part of the Svelte code. We can even use it within attributes of HTML tags, such as `src` in an `<img>` tag. This can be done by doing `<img src={sourceVarName}`, where `sourceVarName` would be defined in the `<script>` tags.

One caveat with this is that sometimes, we might create a variable that is a string with some HTML. Just putting the variable name in curly braces is not enough, as the content in the string is displayed literally. Instead, we must use a special tag. All it is is putting `@html` in the curly brace like so: `{@html variableName}`.

## Reactivity
Not everythihing needs to be static data on the screen! Often times in web apps, we want the user to interact with certain elements on the screen.

## Props
With Reactivity, we've only dealt with values that are accessible within the given component. For example, the count variable and the button were variables that were passed within the button component.

However, in an actual application, it may be necessary to pass data from one component to its children. To do this, it’s very similar to React, and we use properties, or props.

In Svelte, this is accomplished by adding the keyword “export” in front of any values we want to pass as props.

**In Marvel.svelte**
```svelte
<script>
  export let series;
</script>

<p>The best marvel series is {series}.</p>
```

**In App.svelte**
```svelte
<script>
  import Marvel from './Marvel.svelte';
</script>

<Marvel series={'Moonknight'}/>
```

In this case, the value of “Moonknight” was passed in as a prop in the “Marvel” component within App.svelte. It resulted in displaying: *The best marvel series is Moonknight.*

### Default Props
What if no value was passed in? In this case, it would say that the series is “undefined.” To deal with this, we need to be able to set default values for certain components that require props. This is accomplished by setting the value of “series” when we export it as follows:

```svelte
<script>
  export let series = 'Loki';
</script>

<p>The best marvel series is {series}.</p>
```

If no prop is given, the default value of **series** will be 'Loki'.

### Multiple Props
In order to pass multiple props, we need to create an *object* in Svelte.
**In App.svelte**
```svelte
<script>
  import Movie from './Movie.svelte';
  
  const mov = {
    name: 'Avengers: Endgame',
    gross: '858,373,000',
    date: 'April 2019',
    distributor: 'Walt Disney Studios Motion Pictures'
  };
  
</script>

<Movie name={mov.name} gross={mov.gross} date={mov.date} distributor={mov.distributor}/>
```

**In Movie.svelte**
```svelte
<script>
  export let name;
  export let gross;
  export let date;
  export let distributor;
</script>

<p> {name} is Marvel Studios' highest grossing movie, making over ${gross} in its lifetime. It was released in {date} by {distributor}. </p>
```

Note that with this implementation, there is no default value for any of the given props. 
That’s it! Props are a very important concept to master, especially when dealing with dynamic applications that require data to be read through multiple components.

## Logic

While HTML has no way to express logic, Svelte does! Let's say we only want to render a specific component given a boolean value. Svelte allows us to do this by wrapping it in a "if" block.

### If Block
**In App.svelte**
```svelte
<script>
	let thanos = { snapped: false };

	function toggle() {
		thanos.snapped = !thanos.snapped;
	}
</script>

{#if thanos.snapped}
	<button on:click={toggle}>
		Undo the snap!
	</button>
	<p>
		OH SNAP! Thanos killed off half of life on earth. 
	</p>
{/if}

{#if !thanos.snapped}
	<button on:click={toggle}>
		Give Thanos POWER
	</button>
	<p>
		MMM big button...I wonder what it does...
	</p>
{/if}

<p>
	The value of the boolean is {thanos.snapped}.
</p>
```

I have printed out the value of the boolean “snapped.” With this example, we can easily see that the “if” statement allows for rendering of components with a simple boolean value (which is very useful). 

### Else Block
To optimize this, since Thanos has either snapped or not snapped, we can use an “else” block instead of 2 if blocks. The 2 conditions are mutually exclusive.
**In App.svelte**
```svelte
<script>
	let thanos = { snapped: false };

	function toggle() {
		thanos.snapped = !thanos.snapped;
	}
</script>

{#if thanos.snapped}
	<button on:click={toggle}>
		Undo the snap!
	</button>
	<p>
		OH SNAP! Thanos killed off half of life on earth. 
	</p>
{:else}
	<button on:click={toggle}>
		Give Thanos POWER
	</button>
	<p>
		MMM big button...I wonder what it does...
	</p>
{/if}

<p>
	The value of the boolean is {thanos.snapped}.
</p>
```

### Conditional Characters
So far, we have #, /, and : as special characters. 
- In Svelte, the **#** character indicates a block opening, as in the opening of the if statement. 
- The **/** character indicates a block closing, like in the end of the if block. 
- The **:** character indicates a block continuation, as in the else statement.

### Each Loop
In Svelte, the "for" loop is called the “each” loop. Essentially, for each item in the given range. This is very useful when we need to loop over lists of data, where the data is an array or an array-like object.
**In App.svelte**
```svelte
<script>
	let movies = [
		{ id: '1', name: 'Doctor Strange in the Multiverse of Madness' },
		{ id: '2', name: 'Spider-Man: No Way Home' },
		{ id: '3', name: 'Eternals' },
		{ id: '4', name: 'Shang-Chi and the Legend of the Ten Rings'},
		{ id: '5', name: 'Black Widow'},
		{ id: '6', name: 'Spider-Man: Far From Home'},
		{ id: '7', name: 'Avengers: Endgame'},
		{ id: '8', name: 'Captain Marvel'},
		{ id: '9', name: 'Ant-Man and then Wasp'},
		{ id: '10', name: 'Avengers: Infinity War'}
	];
</script>

<h2>Most Recent Marvel Movies </h2>
<ul>
	{#each movies as { id, name }, i}
			<li>
				{i + 1}: {name}
			</li>
	{/each}
</ul>
```

I’ve created an array of objects called “movies,” and used the “each” loop to loop through all of the movies sequentially with a given index i. I used the name of each movie to print them out in order.

### Await Block
The last logical block that I’m going to cover is the await block. These blocks are useful especially if you are accessing data from a server or waiting for a specific block or component to load. With Svelte, it’s easy to create an “await” block that waits for a “promise.” A promise is an object that represents the eventual completion or failure of an asynchronous operation. 
**In App.svelte**
```svelte
<script>
	async function getRandomNumber() {
		const res = await fetch(`/tutorial/random-number`);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}
	
	let promise = getRandomNumber();

	function handleClick() {
		promise = getRandomNumber();
	}
</script>

<button on:click={handleClick}>
	generate!
</button>

{#await promise}
	<p>generating...</p>
{:then number}
	<p>Your lucky number is {number}!</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

In this code, we see that we have defined a asynchronous function named “getRandomNumber()” that returns a number or an error. In the await block, as we are waiting for the function to return a value, the first block is displayed “generating…”. When the number is returned from the function, then the value is displayed. If an error is thrown from the function, then the “catch” block will be executed, displaying the error message. 

And that’s it! Those are some of the most important blocks that are in Svelte. 

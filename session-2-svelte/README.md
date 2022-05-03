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

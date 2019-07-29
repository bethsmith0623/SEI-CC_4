<img src="https://i.imgur.com/Ae7LmVX.jpg">

# Playing Audio in the Browser

### Intro

Playing audio in the browser is straightforward thanks to:

1. HTML5's `<audio>` element which can be added to any webpage (multiple instances if need be), and

2. the _HTMLAudioElement_ DOM interface that can be used to create an audio element in code using JS.

### Example

Here's the [link to the repl shown below](https://repl.it/@jim_clark/Playing-Audio-in-the-Browser):

<img src="https://i.imgur.com/MI0yTHs.png">


### The `<audio>` element

In the Repl above, the `<audio>` element is being used in the webpage to demonstrate how to play a background audio clip in a continuous loop.

There's a checkbox on the page that has an event handler listening for the `change` event used to pause/play the sound.

Attributes, such as `loop` can be set in the `<audio>` element directly and/or manipulated via JS. For example, the element may have its default controls shown by adding the **controls** attribute (no value is necessary).

Here are the docs for more info: [Audio HTML Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)

### The `HTMLAudioElement` API

Also in the example, an audio element is being created dynamically with this code:

```js
const player = new Audio();
```

It is being used to play the sound effect selected in radio input.

The DOM element being created is an instance of [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)

However, it inherits its useful properties & methods from the [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) class.

<img src="https://i.imgur.com/erzfdzx.png">

The object hierarchy of the `HTMLAudioElement` provides a great example of the power of inheritance in OOP.

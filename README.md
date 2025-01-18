# <wc-trim-middle/>

Shamelessly stolen from Christian Heilmann this takes his function and embeds it into a Web Component without a shadowDOM, according to Mr Heilmann:</p>

<blockquote>
One of the cool features of MacOS’ Finder app is that it does not trim file names that don’t fit the space at the end, but in the middle of the file name. This does make a lot more sense, as it also shows what format the file is.
</blockquote>

The original text is retained in the title attribute of the element, but only if the string has been trimmed.

## Usage

```html
<span is="wc-trim-middle">This is a long string that will be trimmed</span>
<script type="module" src="wc-trim-middle.js"></script>
```

## Configuration

* Adding a `width` attribute allow you to define the amount of letters you want to show - it defaults to 16.
* Adding a `replacement` attribute allows you to change what the character in between the parts should be - it defaults to `…`.

## License

MIT
Defuddle extracts the main content from web pages. It cleans up web pages by removing clutter like comments, sidebars, headers, footers, and other non-essential elements, leaving only the primary content.

## Installation

```bash
npm install defuddle
```

## Usage

Defuddle is designed to work in browser environments where the DOM is available.

```javascript
// Basic usage
const article = Defuddle.parse(document);
console.log(article.content); // HTML string of the main content
console.log(article.title);   // Title of the article

// Enable debug mode to see logs
Defuddle.enableDebug(true);
```

## Parsing

The `parse()` method returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `content` | string | HTML string of the extracted main content |
| `title` | string | Title of the article |
| `description` | string | Description or summary of the article |
| `domain` | string | Domain name of the website |
| `favicon` | string | URL of the website's favicon |
| `image` | string | URL of the article's main image |
| `published` | string | Publication date of the article |
| `author` | string | Author of the article |
| `site` | string | Name of the website |
| `schemaOrgData` | object | Raw schema.org data extracted from the page |

## Development

### Build

To build the package, you'll need Node.js and npm installed. Then run:

```bash
# Install dependencies
npm install

# Clean and build
npm run build
```

This will generate:
- `dist/index.js` - CommonJS build for Node.js
- `dist/defuddle.js` - UMD build for browsers
- `dist/index.d.ts` - TypeScript declaration file

### Using in a browser

You can include the browser bundle directly in your HTML:

```html
<script src="path/to/defuddle.js"></script>
<script>
  const article = Defuddle.parse(document);
  console.log(article.title);
</script>
```

### Using in Node.js

```javascript
const { Defuddle } = require('defuddle');
// Note: You'll need to provide a DOM-like environment in Node.js
```

## Differences from Mozilla Readability

While Defuddle aims to be a drop-in replacement for Mozilla Readability, there are some differences:

- More forgiving, removes fewer uncertain elements.
- Uses a page's mobile styles to guess at un-necessary elements.
- Extracts more metadata from the page, including schema.org data.
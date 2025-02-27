Defuddle extracts the main content from web pages. It cleans up web pages by removing clutter like comments, sidebars, headers, footers, and other non-essential elements, leaving only the primary content.

## Installation

```bash
npm install defuddle
```

## Usage

```typescript
import { Defuddle } from 'defuddle';

const article = new Defuddle(document).parse();

// Use the extracted content and metadata
console.log(article.content);  // HTML string of the main content
console.log(article.title);    // Title of the article
```

## Response

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
- `dist/index.js` - UMD build for both Node.js and browsers
- `dist/index.d.ts` - TypeScript declaration file

## Differences from Mozilla Readability

While Defuddle aims to be a drop-in replacement for Mozilla Readability, there are some differences:

- More forgiving, removes fewer uncertain elements
- Uses a page's mobile styles to guess at unnecessary elements
- Extracts more metadata from the page, including schema.org data
- Simpler scoring algorithm focused on content density and semantic markup
- Better handling of modern web components and dynamic content

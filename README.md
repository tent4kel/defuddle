> de·​fud·dle /diˈfʌdl/ *transitive verb*  
> to remove unnecessary elements from a web page, and make it easily readable.

**Beware! Defuddle is very much a work in progress!**

Defuddle extracts the main content from web pages. It cleans up web pages by removing clutter like comments, sidebars, headers, footers, and other non-essential elements, leaving only the primary content.

## Key features

Defuddle aims to output clean and consistent HTML documents. It was written for [Obsidian Web Clipper](https://github.com/obsidianmd/obsidian-clipper) with the goal of creating a more useful input for HTML-to-Markdown converters like [Turndown](https://github.com/mixmark-io/turndown).

Defuddle can be used as a replacement for [Mozilla Readability](https://github.com/mozilla/readability) with a few differences:

- More forgiving, removes fewer uncertain elements
- Uses a page's mobile styles to guess at unnecessary elements
- Extracts more metadata from the page, including schema.org data
- Standardizes footnotes and citations

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

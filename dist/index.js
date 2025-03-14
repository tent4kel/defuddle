(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Defuddle"] = factory();
	else
		root["Defuddle"] = factory();
})(typeof self !== "undefined" ? self : this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 608:
/*!*************************!*\
  !*** ./src/metadata.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataExtractor = void 0;
class MetadataExtractor {
    static extract(doc, schemaOrgData) {
        var _a, _b;
        let domain = '';
        let url = '';
        try {
            // Try to get URL from document location
            url = ((_a = doc.location) === null || _a === void 0 ? void 0 : _a.href) || '';
            // If no URL from location, try other sources
            if (!url) {
                url = this.getMetaContent(doc, "property", "og:url") ||
                    this.getMetaContent(doc, "property", "twitter:url") ||
                    this.getSchemaProperty(doc, schemaOrgData, 'url') ||
                    this.getSchemaProperty(doc, schemaOrgData, 'mainEntityOfPage.url') ||
                    this.getSchemaProperty(doc, schemaOrgData, 'mainEntity.url') ||
                    this.getSchemaProperty(doc, schemaOrgData, 'WebSite.url') ||
                    ((_b = doc.querySelector('link[rel="canonical"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('href')) || '';
            }
            if (url) {
                domain = new URL(url).hostname.replace(/^www\./, '');
            }
        }
        catch (e) {
            // If URL parsing fails, try to get from base tag
            const baseTag = doc.querySelector('base[href]');
            if (baseTag) {
                try {
                    url = baseTag.getAttribute('href') || '';
                    domain = new URL(url).hostname.replace(/^www\./, '');
                }
                catch (e) {
                    console.warn('Failed to parse base URL:', e);
                }
            }
        }
        return {
            title: this.getTitle(doc, schemaOrgData),
            description: this.getDescription(doc, schemaOrgData),
            domain,
            favicon: this.getFavicon(doc, url),
            image: this.getImage(doc, schemaOrgData),
            published: this.getPublished(doc, schemaOrgData),
            author: this.getAuthor(doc, schemaOrgData),
            site: this.getSite(doc, schemaOrgData),
            schemaOrgData,
            wordCount: 0,
            parseTime: 0
        };
    }
    static getAuthor(doc, schemaOrgData) {
        return (this.getMetaContent(doc, "name", "sailthru.author") ||
            this.getSchemaProperty(doc, schemaOrgData, 'author.name') ||
            this.getMetaContent(doc, "property", "author") ||
            this.getMetaContent(doc, "name", "byl") ||
            this.getMetaContent(doc, "name", "author") ||
            this.getMetaContent(doc, "name", "authorList") ||
            this.getMetaContent(doc, "name", "copyright") ||
            this.getSchemaProperty(doc, schemaOrgData, 'copyrightHolder.name') ||
            this.getMetaContent(doc, "property", "og:site_name") ||
            this.getSchemaProperty(doc, schemaOrgData, 'publisher.name') ||
            this.getSchemaProperty(doc, schemaOrgData, 'sourceOrganization.name') ||
            this.getSchemaProperty(doc, schemaOrgData, 'isPartOf.name') ||
            this.getMetaContent(doc, "name", "twitter:creator") ||
            this.getMetaContent(doc, "name", "application-name") ||
            '');
    }
    static getSite(doc, schemaOrgData) {
        return (this.getSchemaProperty(doc, schemaOrgData, 'publisher.name') ||
            this.getMetaContent(doc, "property", "og:site_name") ||
            this.getSchemaProperty(doc, schemaOrgData, 'WebSite.name') ||
            this.getSchemaProperty(doc, schemaOrgData, 'sourceOrganization.name') ||
            this.getMetaContent(doc, "name", "copyright") ||
            this.getSchemaProperty(doc, schemaOrgData, 'copyrightHolder.name') ||
            this.getSchemaProperty(doc, schemaOrgData, 'isPartOf.name') ||
            this.getMetaContent(doc, "name", "application-name") ||
            this.getAuthor(doc, schemaOrgData) ||
            '');
    }
    static getTitle(doc, schemaOrgData) {
        var _a, _b;
        const rawTitle = (this.getMetaContent(doc, "property", "og:title") ||
            this.getMetaContent(doc, "name", "twitter:title") ||
            this.getSchemaProperty(doc, schemaOrgData, 'headline') ||
            this.getMetaContent(doc, "name", "title") ||
            this.getMetaContent(doc, "name", "sailthru.title") ||
            ((_b = (_a = doc.querySelector('title')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) ||
            '');
        return this.cleanTitle(rawTitle, this.getSite(doc, schemaOrgData));
    }
    static cleanTitle(title, siteName) {
        if (!title || !siteName)
            return title;
        // Remove site name if it exists
        const siteNameEscaped = siteName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const patterns = [
            `\\s*[\\|\\-–—]\\s*${siteNameEscaped}\\s*$`, // Title | Site Name
            `^\\s*${siteNameEscaped}\\s*[\\|\\-–—]\\s*`, // Site Name | Title
        ];
        for (const pattern of patterns) {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(title)) {
                title = title.replace(regex, '');
                break;
            }
        }
        return title.trim();
    }
    static getDescription(doc, schemaOrgData) {
        return (this.getMetaContent(doc, "name", "description") ||
            this.getMetaContent(doc, "property", "description") ||
            this.getMetaContent(doc, "property", "og:description") ||
            this.getSchemaProperty(doc, schemaOrgData, 'description') ||
            this.getMetaContent(doc, "name", "twitter:description") ||
            this.getMetaContent(doc, "name", "sailthru.description") ||
            '');
    }
    static getImage(doc, schemaOrgData) {
        return (this.getMetaContent(doc, "property", "og:image") ||
            this.getMetaContent(doc, "name", "twitter:image") ||
            this.getSchemaProperty(doc, schemaOrgData, 'image.url') ||
            this.getMetaContent(doc, "name", "sailthru.image.full") ||
            '');
    }
    static getFavicon(doc, baseUrl) {
        var _a, _b;
        const iconFromMeta = this.getMetaContent(doc, "property", "og:image:favicon");
        if (iconFromMeta)
            return iconFromMeta;
        const iconLink = (_a = doc.querySelector("link[rel='icon']")) === null || _a === void 0 ? void 0 : _a.getAttribute("href");
        if (iconLink)
            return iconLink;
        const shortcutLink = (_b = doc.querySelector("link[rel='shortcut icon']")) === null || _b === void 0 ? void 0 : _b.getAttribute("href");
        if (shortcutLink)
            return shortcutLink;
        // Only try to construct favicon URL if we have a valid base URL
        if (baseUrl) {
            try {
                return new URL("/favicon.ico", baseUrl).href;
            }
            catch (e) {
                console.warn('Failed to construct favicon URL:', e);
            }
        }
        return '';
    }
    static getPublished(doc, schemaOrgData) {
        return (this.getSchemaProperty(doc, schemaOrgData, 'datePublished') ||
            this.getMetaContent(doc, "name", "publishDate") ||
            this.getMetaContent(doc, "property", "article:published_time") ||
            this.getTimeElement(doc) ||
            this.getMetaContent(doc, "name", "sailthru.date") ||
            '');
    }
    static getMetaContent(doc, attr, value) {
        var _a, _b;
        const selector = `meta[${attr}]`;
        const element = Array.from(doc.querySelectorAll(selector))
            .find(el => { var _a; return ((_a = el.getAttribute(attr)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === value.toLowerCase(); });
        const content = element ? (_b = (_a = element.getAttribute("content")) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "" : "";
        return this.decodeHTMLEntities(content, doc);
    }
    static getTimeElement(doc) {
        var _a, _b, _c, _d;
        const selector = `time`;
        const element = Array.from(doc.querySelectorAll(selector))[0];
        const content = element ? ((_d = (_b = (_a = element.getAttribute("datetime")) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : (_c = element.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "") : "";
        return this.decodeHTMLEntities(content, doc);
    }
    static decodeHTMLEntities(text, doc) {
        const textarea = doc.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }
    static getSchemaProperty(doc, schemaOrgData, property, defaultValue = '') {
        if (!schemaOrgData)
            return defaultValue;
        const searchSchema = (data, props, fullPath, isExactMatch = true) => {
            if (typeof data === 'string') {
                return props.length === 0 ? [data] : [];
            }
            if (!data || typeof data !== 'object') {
                return [];
            }
            if (Array.isArray(data)) {
                const currentProp = props[0];
                if (/^\[\d+\]$/.test(currentProp)) {
                    const index = parseInt(currentProp.slice(1, -1));
                    if (data[index]) {
                        return searchSchema(data[index], props.slice(1), fullPath, isExactMatch);
                    }
                    return [];
                }
                if (props.length === 0 && data.every(item => typeof item === 'string' || typeof item === 'number')) {
                    return data.map(String);
                }
                return data.flatMap(item => searchSchema(item, props, fullPath, isExactMatch));
            }
            const [currentProp, ...remainingProps] = props;
            if (!currentProp) {
                if (typeof data === 'string')
                    return [data];
                if (typeof data === 'object' && data.name) {
                    return [data.name];
                }
                return [];
            }
            if (data.hasOwnProperty(currentProp)) {
                return searchSchema(data[currentProp], remainingProps, fullPath ? `${fullPath}.${currentProp}` : currentProp, true);
            }
            if (!isExactMatch) {
                const nestedResults = [];
                for (const key in data) {
                    if (typeof data[key] === 'object') {
                        const results = searchSchema(data[key], props, fullPath ? `${fullPath}.${key}` : key, false);
                        nestedResults.push(...results);
                    }
                }
                if (nestedResults.length > 0) {
                    return nestedResults;
                }
            }
            return [];
        };
        try {
            let results = searchSchema(schemaOrgData, property.split('.'), '', true);
            if (results.length === 0) {
                results = searchSchema(schemaOrgData, property.split('.'), '', false);
            }
            const result = results.length > 0 ? results.filter(Boolean).join(', ') : defaultValue;
            return this.decodeHTMLEntities(result, doc);
        }
        catch (error) {
            console.error(`Error in getSchemaProperty for ${property}:`, error);
            return defaultValue;
        }
    }
    static extractSchemaOrgData(doc) {
        const schemaScripts = doc.querySelectorAll('script[type="application/ld+json"]');
        const schemaData = [];
        schemaScripts.forEach(script => {
            let jsonContent = script.textContent || '';
            try {
                jsonContent = jsonContent
                    .replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, '')
                    .replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1')
                    .replace(/^\s*(\*\/|\/\*)\s*|\s*(\*\/|\/\*)\s*$/g, '')
                    .trim();
                const jsonData = JSON.parse(jsonContent);
                if (jsonData['@graph'] && Array.isArray(jsonData['@graph'])) {
                    schemaData.push(...jsonData['@graph']);
                }
                else {
                    schemaData.push(jsonData);
                }
            }
            catch (error) {
                console.error('Error parsing schema.org data:', error);
                console.error('Problematic JSON content:', jsonContent);
            }
        });
        return schemaData;
    }
}
exports.MetadataExtractor = MetadataExtractor;


/***/ }),

/***/ 628:
/*!*************************!*\
  !*** ./src/defuddle.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Defuddle = void 0;
const metadata_1 = __webpack_require__(/*! ./metadata */ 608);
const constants_1 = __webpack_require__(/*! ./constants */ 640);
const ELEMENT_STANDARDIZATION_RULES = [
    // Code blocks
    {
        selector: 'pre',
        element: 'pre',
        transform: (el) => {
            if (!(el instanceof HTMLElement))
                return el;
            // Function to get language from class
            const getLanguageFromClass = (element) => {
                // Check data-lang attribute first
                const dataLang = element.getAttribute('data-lang');
                if (dataLang) {
                    return dataLang.toLowerCase();
                }
                // Define language patterns
                const languagePatterns = [
                    /^language-(\w+)$/, // language-javascript
                    /^lang-(\w+)$/, // lang-javascript
                    /^(\w+)-code$/, // javascript-code
                    /^code-(\w+)$/, // code-javascript
                    /^syntax-(\w+)$/, // syntax-javascript
                    /^code-snippet__(\w+)$/, // code-snippet__javascript
                    /^highlight-(\w+)$/, // highlight-javascript
                    /^(\w+)-snippet$/ // javascript-snippet
                ];
                // Then check the class attribute for patterns
                if (element.className && typeof element.className === 'string') {
                    for (const pattern of languagePatterns) {
                        const match = element.className.toLowerCase().match(pattern);
                        if (match) {
                            return match[1].toLowerCase();
                        }
                    }
                    // Then check for supported language
                    if (constants_1.SUPPORTED_LANGUAGES.has(element.className.toLowerCase())) {
                        return element.className.toLowerCase();
                    }
                }
                const classNames = Array.from(element.classList);
                for (const className of classNames) {
                    // Check patterns first
                    for (const pattern of languagePatterns) {
                        const match = className.match(pattern);
                        if (match) {
                            return match[1].toLowerCase();
                        }
                    }
                }
                // Only check bare language names if no patterns were found
                for (const className of classNames) {
                    if (constants_1.SUPPORTED_LANGUAGES.has(className.toLowerCase())) {
                        return className.toLowerCase();
                    }
                }
                return '';
            };
            // Try to get the language from the element and its ancestors
            let language = '';
            let currentElement = el;
            while (currentElement && !language) {
                language = getLanguageFromClass(currentElement);
                // Also check for code elements within the current element
                if (!language && currentElement.querySelector('code')) {
                    language = getLanguageFromClass(currentElement.querySelector('code'));
                }
                currentElement = currentElement.parentElement;
            }
            // Function to recursively extract text content while preserving structure
            const extractStructuredText = (element) => {
                if (element.nodeType === Node.TEXT_NODE) {
                    return element.textContent || '';
                }
                let text = '';
                if (element instanceof HTMLElement) {
                    // Handle line breaks
                    if (element.tagName === 'BR') {
                        return '\n';
                    }
                    // Handle code elements and their children
                    element.childNodes.forEach(child => {
                        text += extractStructuredText(child);
                    });
                    // Add newline after each code element
                    if (element.tagName === 'CODE') {
                        text += '\n';
                    }
                }
                return text;
            };
            // Extract all text content
            let codeContent = extractStructuredText(el);
            // Clean up the content
            codeContent = codeContent
                // Remove any extra newlines at the start
                .replace(/^\n+/, '')
                // Remove any extra newlines at the end
                .replace(/\n+$/, '')
                // Replace multiple consecutive newlines with a single newline
                .replace(/\n{3,}/g, '\n\n');
            // Create new pre element
            const newPre = document.createElement('pre');
            // Copy allowed attributes
            Array.from(el.attributes).forEach(attr => {
                if (constants_1.ALLOWED_ATTRIBUTES.has(attr.name)) {
                    newPre.setAttribute(attr.name, attr.value);
                }
            });
            // Create code element
            const code = document.createElement('code');
            if (language) {
                code.setAttribute('data-lang', language);
                code.setAttribute('class', `language-${language}`);
            }
            code.textContent = codeContent;
            newPre.appendChild(code);
            return newPre;
        }
    },
    // Simplify headings by removing internal navigation elements
    {
        selector: 'h1, h2, h3, h4, h5, h6',
        element: 'keep',
        transform: (el) => {
            var _a, _b, _c, _d, _e;
            // If heading only contains a single anchor with internal link
            if (el.children.length === 1 &&
                ((_a = el.firstElementChild) === null || _a === void 0 ? void 0 : _a.tagName) === 'A' &&
                (((_b = el.firstElementChild.getAttribute('href')) === null || _b === void 0 ? void 0 : _b.includes('#')) ||
                    ((_c = el.firstElementChild.getAttribute('href')) === null || _c === void 0 ? void 0 : _c.startsWith('#')))) {
                // Create new heading of same level
                const newHeading = document.createElement(el.tagName);
                // Copy allowed attributes from original heading
                Array.from(el.attributes).forEach(attr => {
                    if (constants_1.ALLOWED_ATTRIBUTES.has(attr.name)) {
                        newHeading.setAttribute(attr.name, attr.value);
                    }
                });
                // Just use the text content
                newHeading.textContent = ((_d = el.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '';
                return newHeading;
            }
            // If heading contains navigation buttons or other utility elements
            const buttons = el.querySelectorAll('button');
            if (buttons.length > 0) {
                const newHeading = document.createElement(el.tagName);
                // Copy allowed attributes
                Array.from(el.attributes).forEach(attr => {
                    if (constants_1.ALLOWED_ATTRIBUTES.has(attr.name)) {
                        newHeading.setAttribute(attr.name, attr.value);
                    }
                });
                // Just use the text content
                newHeading.textContent = ((_e = el.textContent) === null || _e === void 0 ? void 0 : _e.trim()) || '';
                return newHeading;
            }
            return el;
        }
    },
    // Convert divs with paragraph role to actual paragraphs
    {
        selector: 'div[data-testid^="paragraph"], div[role="paragraph"]',
        element: 'p',
        transform: (el) => {
            const p = document.createElement('p');
            // Copy innerHTML
            p.innerHTML = el.innerHTML;
            // Copy allowed attributes
            Array.from(el.attributes).forEach(attr => {
                if (constants_1.ALLOWED_ATTRIBUTES.has(attr.name)) {
                    p.setAttribute(attr.name, attr.value);
                }
            });
            return p;
        }
    },
    // Convert divs with list roles to actual lists
    {
        selector: 'div[role="list"]',
        element: 'ul',
        // Custom handler for list type detection and transformation
        transform: (el) => {
            var _a;
            // First determine if this is an ordered list
            const firstItem = el.querySelector('div[role="listitem"] .label');
            const label = ((_a = firstItem === null || firstItem === void 0 ? void 0 : firstItem.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            const isOrdered = label.match(/^\d+\)/);
            // Create the appropriate list type
            const list = document.createElement(isOrdered ? 'ol' : 'ul');
            // Process each list item
            const items = el.querySelectorAll('div[role="listitem"]');
            items.forEach(item => {
                const li = document.createElement('li');
                const content = item.querySelector('.content');
                if (content) {
                    // Convert any paragraph divs inside content
                    const paragraphDivs = content.querySelectorAll('div[role="paragraph"]');
                    paragraphDivs.forEach(div => {
                        const p = document.createElement('p');
                        p.innerHTML = div.innerHTML;
                        div.replaceWith(p);
                    });
                    // Convert any nested lists recursively
                    const nestedLists = content.querySelectorAll('div[role="list"]');
                    nestedLists.forEach(nestedList => {
                        var _a;
                        const firstNestedItem = nestedList.querySelector('div[role="listitem"] .label');
                        const nestedLabel = ((_a = firstNestedItem === null || firstNestedItem === void 0 ? void 0 : firstNestedItem.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                        const isNestedOrdered = nestedLabel.match(/^\d+\)/);
                        const newNestedList = document.createElement(isNestedOrdered ? 'ol' : 'ul');
                        // Process nested items
                        const nestedItems = nestedList.querySelectorAll('div[role="listitem"]');
                        nestedItems.forEach(nestedItem => {
                            const nestedLi = document.createElement('li');
                            const nestedContent = nestedItem.querySelector('.content');
                            if (nestedContent) {
                                // Convert paragraph divs in nested items
                                const nestedParagraphs = nestedContent.querySelectorAll('div[role="paragraph"]');
                                nestedParagraphs.forEach(div => {
                                    const p = document.createElement('p');
                                    p.innerHTML = div.innerHTML;
                                    div.replaceWith(p);
                                });
                                nestedLi.innerHTML = nestedContent.innerHTML;
                            }
                            newNestedList.appendChild(nestedLi);
                        });
                        nestedList.replaceWith(newNestedList);
                    });
                    li.innerHTML = content.innerHTML;
                }
                list.appendChild(li);
            });
            return list;
        }
    },
    {
        selector: 'div[role="listitem"]',
        element: 'li',
        // Custom handler for list item content
        transform: (el) => {
            const content = el.querySelector('.content');
            if (!content)
                return el;
            // Convert any paragraph divs inside content
            const paragraphDivs = content.querySelectorAll('div[role="paragraph"]');
            paragraphDivs.forEach(div => {
                const p = document.createElement('p');
                p.innerHTML = div.innerHTML;
                div.replaceWith(p);
            });
            return content;
        }
    },
    // Code blocks with syntax highlighting
    {
        selector: '.wp-block-syntaxhighlighter-code, .syntaxhighlighter, .highlight, .highlight-source, .wp-block-code, pre[class*="language-"], pre[class*="brush:"]',
        element: 'pre',
        transform: (el) => {
            if (!(el instanceof HTMLElement))
                return el;
            // Create new pre element
            const newPre = document.createElement('pre');
            // Try to detect language
            let language = '';
            // Check for WordPress syntax highlighter specific format
            const syntaxEl = el.querySelector('.syntaxhighlighter');
            if (syntaxEl) {
                // Get language from syntaxhighlighter class
                const classes = Array.from(syntaxEl.classList);
                const langClass = classes.find(c => !['syntaxhighlighter', 'nogutter'].includes(c));
                if (langClass && constants_1.SUPPORTED_LANGUAGES.has(langClass.toLowerCase())) {
                    language = langClass.toLowerCase();
                }
            }
            // If no language found yet, check other common patterns
            if (!language) {
                const classNames = Array.from(el.classList);
                const languagePatterns = [
                    /(?:^|\s)(?:language|lang|brush|syntax)-(\w+)(?:\s|$)/i,
                    /(?:^|\s)(\w+)(?:\s|$)/i
                ];
                for (const className of classNames) {
                    for (const pattern of languagePatterns) {
                        const match = className.match(pattern);
                        if (match && match[1] && constants_1.SUPPORTED_LANGUAGES.has(match[1].toLowerCase())) {
                            language = match[1].toLowerCase();
                            break;
                        }
                    }
                    if (language)
                        break;
                }
            }
            // Extract code content, handling various formats
            let codeContent = '';
            // Handle WordPress syntax highlighter table format
            const codeContainer = el.querySelector('.syntaxhighlighter table .code .container');
            if (codeContainer) {
                // Process each line
                const lines = Array.from(codeContainer.children);
                codeContent = lines
                    .map(line => {
                    // Get all code elements in this line
                    const codeParts = Array.from(line.querySelectorAll('code'))
                        .map(code => {
                        // Get the text content, preserving spaces
                        let text = code.textContent || '';
                        // If this is a 'spaces' class element, convert to actual spaces
                        if (code.classList.contains('spaces')) {
                            text = ' '.repeat(text.length);
                        }
                        return text;
                    })
                        .join('');
                    return codeParts || line.textContent || '';
                })
                    .join('\n');
            }
            else {
                // Handle WordPress syntax highlighter non-table format
                const codeLines = el.querySelectorAll('.code .line');
                if (codeLines.length > 0) {
                    codeContent = Array.from(codeLines)
                        .map(line => {
                        const codeParts = Array.from(line.querySelectorAll('code'))
                            .map(code => code.textContent || '')
                            .join('');
                        return codeParts || line.textContent || '';
                    })
                        .join('\n');
                }
                else {
                    // Fallback to regular text content
                    codeContent = el.textContent || '';
                }
            }
            // Clean up the content
            codeContent = codeContent
                .replace(/^\s+|\s+$/g, '') // Trim start/end whitespace
                .replace(/\t/g, '    ') // Convert tabs to spaces
                .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
                .replace(/\u00a0/g, ' '); // Replace non-breaking spaces with regular spaces
            // Create code element with language class if detected
            const code = document.createElement('code');
            if (language) {
                code.setAttribute('data-lang', language);
                code.setAttribute('class', `language-${language}`);
            }
            code.textContent = codeContent;
            newPre.appendChild(code);
            return newPre;
        }
    }
];
class Defuddle {
    /**
     * Create a new Defuddle instance
     * @param doc - The document to parse
     * @param options - Options for parsing
     */
    constructor(doc, options = {}) {
        this.doc = doc;
        this.options = options;
        this.debug = options.debug || false;
    }
    /**
     * Parse the document and extract its main content
     */
    parse() {
        const startTime = performance.now();
        // Extract metadata first since we'll need it in multiple places
        const schemaOrgData = metadata_1.MetadataExtractor.extractSchemaOrgData(this.doc);
        const metadata = metadata_1.MetadataExtractor.extract(this.doc, schemaOrgData);
        try {
            // Evaluate styles and sizes on original document
            const mobileStyles = this._evaluateMediaQueries(this.doc);
            // Check for small images in original document, excluding lazy-loaded ones
            const smallImages = this.findSmallImages(this.doc);
            // Clone document
            const clone = this.doc.cloneNode(true);
            // Apply mobile style to clone
            this.applyMobileStyles(clone, mobileStyles);
            // Find main content
            const mainContent = this.findMainContent(clone);
            if (!mainContent) {
                const endTime = performance.now();
                return Object.assign(Object.assign({ content: this.doc.body.innerHTML }, metadata), { wordCount: this.countWords(this.doc.body.innerHTML), parseTime: Math.round(endTime - startTime) });
            }
            // Remove small images identified from original document
            this.removeSmallImages(clone, smallImages);
            // Perform other destructive operations on the clone
            this.removeHiddenElements(clone);
            this.removeClutter(clone);
            // Clean up the main content
            this.cleanContent(mainContent, metadata);
            const content = mainContent ? mainContent.outerHTML : this.doc.body.innerHTML;
            const endTime = performance.now();
            return Object.assign(Object.assign({ content }, metadata), { wordCount: this.countWords(content), parseTime: Math.round(endTime - startTime) });
        }
        catch (error) {
            console.error('Defuddle', 'Error processing document:', error);
            const endTime = performance.now();
            return Object.assign(Object.assign({ content: this.doc.body.innerHTML }, metadata), { wordCount: this.countWords(this.doc.body.innerHTML), parseTime: Math.round(endTime - startTime) });
        }
    }
    countWords(content) {
        // Create a temporary div to parse HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        // Get text content, removing extra whitespace
        const text = tempDiv.textContent || '';
        const words = text
            .trim()
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .split(' ')
            .filter(word => word.length > 0); // Filter out empty strings
        return words.length;
    }
    // Make all other methods private by removing the static keyword and using private
    _log(...args) {
        if (this.debug) {
            console.log('Defuddle:', ...args);
        }
    }
    _evaluateMediaQueries(doc) {
        const mobileStyles = [];
        const maxWidthRegex = /max-width[^:]*:\s*(\d+)/;
        try {
            // Get all styles, including inline styles
            const sheets = Array.from(doc.styleSheets).filter(sheet => {
                try {
                    // Access rules once to check validity
                    sheet.cssRules;
                    return true;
                }
                catch (e) {
                    // Expected error for cross-origin stylesheets
                    if (e instanceof DOMException && e.name === 'SecurityError') {
                        return false;
                    }
                    throw e;
                }
            });
            // Process all sheets in a single pass
            const mediaRules = sheets.flatMap(sheet => {
                try {
                    return Array.from(sheet.cssRules)
                        .filter((rule) => rule instanceof CSSMediaRule &&
                        rule.conditionText.includes('max-width'));
                }
                catch (e) {
                    if (this.debug) {
                        console.warn('Defuddle: Failed to process stylesheet:', e);
                    }
                    return [];
                }
            });
            // Process all media rules in a single pass
            mediaRules.forEach(rule => {
                const match = rule.conditionText.match(maxWidthRegex);
                if (match) {
                    const maxWidth = parseInt(match[1]);
                    if (constants_1.MOBILE_WIDTH <= maxWidth) {
                        // Batch process all style rules
                        const styleRules = Array.from(rule.cssRules)
                            .filter((r) => r instanceof CSSStyleRule);
                        styleRules.forEach(cssRule => {
                            try {
                                mobileStyles.push({
                                    selector: cssRule.selectorText,
                                    styles: cssRule.style.cssText
                                });
                            }
                            catch (e) {
                                if (this.debug) {
                                    console.warn('Defuddle: Failed to process CSS rule:', e);
                                }
                            }
                        });
                    }
                }
            });
        }
        catch (e) {
            console.error('Defuddle: Error evaluating media queries:', e);
        }
        return mobileStyles;
    }
    applyMobileStyles(doc, mobileStyles) {
        let appliedCount = 0;
        mobileStyles.forEach(({ selector, styles }) => {
            try {
                const elements = doc.querySelectorAll(selector);
                elements.forEach(element => {
                    element.setAttribute('style', (element.getAttribute('style') || '') + styles);
                    appliedCount++;
                });
            }
            catch (e) {
                console.error('Defuddle', 'Error applying styles for selector:', selector, e);
            }
        });
    }
    removeHiddenElements(doc) {
        let count = 0;
        const elementsToRemove = new Set();
        // First pass: Get all elements matching hidden selectors
        const hiddenElements = doc.querySelectorAll(constants_1.HIDDEN_ELEMENT_SELECTORS);
        hiddenElements.forEach(el => elementsToRemove.add(el));
        count += hiddenElements.length;
        // Second pass: Use TreeWalker for efficient traversal
        const treeWalker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, {
            acceptNode: (node) => {
                // Skip elements already marked for removal
                if (elementsToRemove.has(node)) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        // Batch style computations
        const elements = [];
        let currentNode;
        while (currentNode = treeWalker.nextNode()) {
            elements.push(currentNode);
        }
        // Process styles in batches to minimize layout thrashing
        const BATCH_SIZE = 100;
        for (let i = 0; i < elements.length; i += BATCH_SIZE) {
            const batch = elements.slice(i, i + BATCH_SIZE);
            // Read phase - gather all computedStyles
            const styles = batch.map(el => window.getComputedStyle(el));
            // Write phase - mark elements for removal
            batch.forEach((element, index) => {
                const computedStyle = styles[index];
                if (computedStyle.display === 'none' ||
                    computedStyle.visibility === 'hidden' ||
                    computedStyle.opacity === '0') {
                    elementsToRemove.add(element);
                    count++;
                }
            });
        }
        // Final pass: Batch remove all hidden elements
        elementsToRemove.forEach(el => el.remove());
        this._log('Removed hidden elements:', count);
    }
    removeClutter(doc) {
        const startTime = performance.now();
        let exactSelectorCount = 0;
        let partialSelectorCount = 0;
        // Track all elements to be removed
        const elementsToRemove = new Set();
        // First collect elements matching exact selectors
        const exactElements = doc.querySelectorAll(constants_1.EXACT_SELECTORS.join(','));
        exactElements.forEach(el => {
            if (el === null || el === void 0 ? void 0 : el.parentNode) {
                elementsToRemove.add(el);
                exactSelectorCount++;
            }
        });
        // Pre-compile regexes and combine into a single regex for better performance
        const combinedPattern = constants_1.PARTIAL_SELECTORS.join('|');
        const partialRegex = new RegExp(combinedPattern, 'i');
        // Create an efficient attribute selector for elements we care about
        const attributeSelector = '[class],[id],[data-testid],[data-qa],[data-cy]';
        const allElements = doc.querySelectorAll(attributeSelector);
        // Process elements for partial matches
        allElements.forEach(el => {
            // Skip if already marked for removal
            if (elementsToRemove.has(el)) {
                return;
            }
            // Get all relevant attributes and combine into a single string
            const attrs = [
                el.className && typeof el.className === 'string' ? el.className : '',
                el.id || '',
                el.getAttribute('data-testid') || '',
                el.getAttribute('data-qa') || '',
                el.getAttribute('data-cy') || ''
            ].join(' ').toLowerCase();
            // Skip if no attributes to check
            if (!attrs.trim()) {
                return;
            }
            // Check for partial match using single regex test
            if (partialRegex.test(attrs)) {
                elementsToRemove.add(el);
                partialSelectorCount++;
            }
        });
        // Remove all collected elements in a single pass
        elementsToRemove.forEach(el => el.remove());
        const endTime = performance.now();
        this._log('Removed clutter elements:', {
            exactSelectors: exactSelectorCount,
            partialSelectors: partialSelectorCount,
            total: elementsToRemove.size,
            processingTime: `${(endTime - startTime).toFixed(2)}ms`
        });
    }
    flattenDivs(element) {
        let processedCount = 0;
        const startTime = performance.now();
        // Process in batches to maintain performance
        let keepProcessing = true;
        const shouldPreserveElement = (el) => {
            const tagName = el.tagName.toLowerCase();
            // Check if element should be preserved
            if (constants_1.PRESERVE_ELEMENTS.has(tagName))
                return true;
            // Check for semantic roles
            const role = el.getAttribute('role');
            if (role && ['article', 'main', 'navigation', 'banner', 'contentinfo'].includes(role)) {
                return true;
            }
            // Check for semantic classes
            const className = el.className.toLowerCase();
            if (className.match(/(?:article|main|content|footnote|reference|bibliography)/)) {
                return true;
            }
            // Check if div contains mixed content types that should be preserved
            if (tagName === 'div') {
                const children = Array.from(el.children);
                const hasPreservedElements = children.some(child => constants_1.PRESERVE_ELEMENTS.has(child.tagName.toLowerCase()) ||
                    child.getAttribute('role') === 'article' ||
                    child.className.toLowerCase().includes('article'));
                if (hasPreservedElements)
                    return true;
            }
            return false;
        };
        const isWrapperDiv = (div) => {
            var _a;
            // Check if it's just empty space
            if (!((_a = div.textContent) === null || _a === void 0 ? void 0 : _a.trim()))
                return true;
            // Check if it only contains other divs or block elements
            const children = Array.from(div.children);
            if (children.length === 0)
                return true;
            // Check if all children are block elements
            const allBlockElements = children.every(child => {
                const tag = child.tagName.toLowerCase();
                return tag === 'div' || tag === 'p' || tag === 'h1' || tag === 'h2' ||
                    tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6' ||
                    tag === 'ul' || tag === 'ol' || tag === 'pre' || tag === 'blockquote' ||
                    tag === 'figure';
            });
            if (allBlockElements)
                return true;
            // Check for common wrapper patterns
            const className = div.className.toLowerCase();
            const isWrapper = /(?:wrapper|container|layout|row|col|grid|flex|outer|inner|content-area)/i.test(className);
            if (isWrapper)
                return true;
            // Check if it has excessive whitespace or empty text nodes
            const textNodes = Array.from(div.childNodes).filter(node => { var _a; return node.nodeType === Node.TEXT_NODE && ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim()); });
            if (textNodes.length === 0)
                return true;
            // Check if it's a div that only contains block elements
            const hasOnlyBlockElements = children.length > 0 && !children.some(child => {
                const tag = child.tagName.toLowerCase();
                return constants_1.INLINE_ELEMENTS.has(tag);
            });
            if (hasOnlyBlockElements)
                return true;
            return false;
        };
        // Function to process a single div
        const processDiv = (div) => {
            var _a, _b;
            // Skip processing if div has been removed or should be preserved
            if (!div.isConnected || shouldPreserveElement(div))
                return false;
            // Case 1: Empty div or div with only whitespace
            if (!div.hasChildNodes() || !((_a = div.textContent) === null || _a === void 0 ? void 0 : _a.trim())) {
                div.remove();
                processedCount++;
                return true;
            }
            // Case 2: Top-level div - be more aggressive
            if (div.parentElement === element) {
                const children = Array.from(div.children);
                const hasOnlyBlockElements = children.length > 0 && !children.some(child => {
                    const tag = child.tagName.toLowerCase();
                    return constants_1.INLINE_ELEMENTS.has(tag);
                });
                if (hasOnlyBlockElements) {
                    const fragment = document.createDocumentFragment();
                    while (div.firstChild) {
                        fragment.appendChild(div.firstChild);
                    }
                    div.replaceWith(fragment);
                    processedCount++;
                    return true;
                }
            }
            // Case 3: Wrapper div - merge up aggressively
            if (isWrapperDiv(div)) {
                // Special case: if div only contains block elements, merge them up
                const children = Array.from(div.children);
                const onlyBlockElements = !children.some(child => {
                    const tag = child.tagName.toLowerCase();
                    return constants_1.INLINE_ELEMENTS.has(tag);
                });
                if (onlyBlockElements) {
                    const fragment = document.createDocumentFragment();
                    while (div.firstChild) {
                        fragment.appendChild(div.firstChild);
                    }
                    div.replaceWith(fragment);
                    processedCount++;
                    return true;
                }
                // Otherwise handle as normal wrapper
                const fragment = document.createDocumentFragment();
                while (div.firstChild) {
                    fragment.appendChild(div.firstChild);
                }
                div.replaceWith(fragment);
                processedCount++;
                return true;
            }
            // Case 4: Div only contains text content - convert to paragraph
            if (!div.children.length && ((_b = div.textContent) === null || _b === void 0 ? void 0 : _b.trim())) {
                const p = document.createElement('p');
                p.textContent = div.textContent;
                div.replaceWith(p);
                processedCount++;
                return true;
            }
            // Case 5: Div has single child
            if (div.children.length === 1) {
                const child = div.firstElementChild;
                const childTag = child.tagName.toLowerCase();
                // Don't unwrap if child is inline or should be preserved
                if (!constants_1.INLINE_ELEMENTS.has(childTag) && !shouldPreserveElement(child)) {
                    div.replaceWith(child);
                    processedCount++;
                    return true;
                }
            }
            // Case 6: Deeply nested div - merge up
            let nestingDepth = 0;
            let parent = div.parentElement;
            while (parent) {
                if (parent.tagName.toLowerCase() === 'div') {
                    nestingDepth++;
                }
                parent = parent.parentElement;
            }
            if (nestingDepth > 0) { // Changed from > 1 to > 0 to be more aggressive
                const fragment = document.createDocumentFragment();
                while (div.firstChild) {
                    fragment.appendChild(div.firstChild);
                }
                div.replaceWith(fragment);
                processedCount++;
                return true;
            }
            return false;
        };
        // First pass: Process top-level divs
        const processTopLevelDivs = () => {
            const topDivs = Array.from(element.children).filter(el => el.tagName.toLowerCase() === 'div');
            let modified = false;
            topDivs.forEach(div => {
                if (processDiv(div)) {
                    modified = true;
                }
            });
            return modified;
        };
        // Second pass: Process remaining divs from deepest to shallowest
        const processRemainingDivs = () => {
            const allDivs = Array.from(element.getElementsByTagName('div'))
                .sort((a, b) => {
                // Count nesting depth
                const getDepth = (el) => {
                    let depth = 0;
                    let parent = el.parentElement;
                    while (parent) {
                        if (parent.tagName.toLowerCase() === 'div')
                            depth++;
                        parent = parent.parentElement;
                    }
                    return depth;
                };
                return getDepth(b) - getDepth(a); // Process deepest first
            });
            let modified = false;
            allDivs.forEach(div => {
                if (processDiv(div)) {
                    modified = true;
                }
            });
            return modified;
        };
        // Final cleanup pass - aggressively flatten remaining divs
        const finalCleanup = () => {
            const remainingDivs = Array.from(element.getElementsByTagName('div'));
            let modified = false;
            remainingDivs.forEach(div => {
                // Check if div only contains paragraphs
                const children = Array.from(div.children);
                const onlyParagraphs = children.every(child => child.tagName.toLowerCase() === 'p');
                if (onlyParagraphs || (!shouldPreserveElement(div) && isWrapperDiv(div))) {
                    const fragment = document.createDocumentFragment();
                    while (div.firstChild) {
                        fragment.appendChild(div.firstChild);
                    }
                    div.replaceWith(fragment);
                    processedCount++;
                    modified = true;
                }
            });
            return modified;
        };
        // Execute all passes until no more changes
        do {
            keepProcessing = false;
            if (processTopLevelDivs())
                keepProcessing = true;
            if (processRemainingDivs())
                keepProcessing = true;
            if (finalCleanup())
                keepProcessing = true;
        } while (keepProcessing);
        const endTime = performance.now();
        this._log('Flattened divs:', {
            count: processedCount,
            processingTime: `${(endTime - startTime).toFixed(2)}ms`
        });
    }
    cleanContent(element, metadata) {
        // Remove HTML comments
        this.removeHtmlComments(element);
        // Handle H1 elements - remove first one and convert others to H2
        this.handleHeadings(element, metadata.title);
        // Standardize footnotes and citations
        this.standardizeFootnotes(element);
        // Handle lazy-loaded images
        this.handleLazyImages(element);
        // Convert embedded content to standard formats
        this.standardizeElements(element);
        // Skip div flattening in debug mode
        if (!this.debug) {
            // First pass of div flattening
            this.flattenDivs(element);
            // Strip unwanted attributes
            this.stripUnwantedAttributes(element);
            // Remove empty elements
            this.removeEmptyElements(element);
            // Remove trailing headings
            this.removeTrailingHeadings(element);
            // Final pass of div flattening after cleanup operations
            this.flattenDivs(element);
        }
        else {
            // In debug mode, still do basic cleanup but preserve structure
            this.stripUnwantedAttributes(element);
            this.removeEmptyElements(element);
            this.removeTrailingHeadings(element);
            this._log('Debug mode: Skipping div flattening to preserve structure');
        }
    }
    removeTrailingHeadings(element) {
        let removedCount = 0;
        const hasContentAfter = (el) => {
            // Check if there's any meaningful content after this element
            let nextContent = '';
            let sibling = el.nextSibling;
            // First check direct siblings
            while (sibling) {
                if (sibling.nodeType === Node.TEXT_NODE) {
                    nextContent += sibling.textContent || '';
                }
                else if (sibling.nodeType === Node.ELEMENT_NODE) {
                    // If we find an element sibling, check its content
                    nextContent += sibling.textContent || '';
                }
                sibling = sibling.nextSibling;
            }
            // If we found meaningful content at this level, return true
            if (nextContent.trim()) {
                return true;
            }
            // If no content found at this level and we have a parent,
            // check for content after the parent
            const parent = el.parentElement;
            if (parent && parent !== element) {
                return hasContentAfter(parent);
            }
            return false;
        };
        // Process all headings from bottom to top
        const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'))
            .reverse();
        headings.forEach(heading => {
            if (!hasContentAfter(heading)) {
                heading.remove();
                removedCount++;
            }
            else {
                // Stop processing once we find a heading with content after it
                return;
            }
        });
        if (removedCount > 0) {
            this._log('Removed trailing headings:', removedCount);
        }
    }
    handleHeadings(element, title) {
        var _a;
        const h1s = element.getElementsByTagName('h1');
        Array.from(h1s).forEach(h1 => {
            var _a;
            const h2 = document.createElement('h2');
            h2.innerHTML = h1.innerHTML;
            // Copy allowed attributes
            Array.from(h1.attributes).forEach(attr => {
                if (constants_1.ALLOWED_ATTRIBUTES.has(attr.name)) {
                    h2.setAttribute(attr.name, attr.value);
                }
            });
            (_a = h1.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(h2, h1);
        });
        // Remove first H2 if it matches title
        const h2s = element.getElementsByTagName('h2');
        if (h2s.length > 0) {
            const firstH2 = h2s[0];
            const firstH2Text = ((_a = firstH2.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) || '';
            const normalizedTitle = title.toLowerCase().trim();
            if (normalizedTitle && normalizedTitle === firstH2Text) {
                firstH2.remove();
            }
        }
    }
    removeHtmlComments(element) {
        const comments = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_COMMENT, null);
        let node;
        while (node = walker.nextNode()) {
            comments.push(node);
        }
        comments.forEach(comment => {
            comment.remove();
        });
        this._log('Removed HTML comments:', comments.length);
    }
    stripUnwantedAttributes(element) {
        let attributeCount = 0;
        const processElement = (el) => {
            // Skip SVG elements - preserve all their attributes
            if (el instanceof SVGElement) {
                return;
            }
            const attributes = Array.from(el.attributes);
            attributes.forEach(attr => {
                const attrName = attr.name.toLowerCase();
                // In debug mode, allow debug attributes and data- attributes
                if (this.debug) {
                    if (!constants_1.ALLOWED_ATTRIBUTES.has(attrName) &&
                        !constants_1.ALLOWED_ATTRIBUTES_DEBUG.has(attrName) &&
                        !attrName.startsWith('data-')) {
                        el.removeAttribute(attr.name);
                        attributeCount++;
                    }
                }
                else {
                    // In normal mode, only allow standard attributes
                    if (!constants_1.ALLOWED_ATTRIBUTES.has(attrName)) {
                        el.removeAttribute(attr.name);
                        attributeCount++;
                    }
                }
            });
        };
        processElement(element);
        element.querySelectorAll('*').forEach(processElement);
        this._log('Stripped attributes:', attributeCount);
    }
    removeEmptyElements(element) {
        let removedCount = 0;
        let iterations = 0;
        let keepRemoving = true;
        while (keepRemoving) {
            iterations++;
            keepRemoving = false;
            // Get all elements without children, working from deepest first
            const emptyElements = Array.from(element.getElementsByTagName('*')).filter(el => {
                if (constants_1.ALLOWED_EMPTY_ELEMENTS.has(el.tagName.toLowerCase())) {
                    return false;
                }
                // Check if element has only whitespace or &nbsp;
                const textContent = el.textContent || '';
                const hasOnlyWhitespace = textContent.trim().length === 0;
                const hasNbsp = textContent.includes('\u00A0'); // Unicode non-breaking space
                // Check if element has no meaningful children
                const hasNoChildren = !el.hasChildNodes() ||
                    (Array.from(el.childNodes).every(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            const nodeText = node.textContent || '';
                            return nodeText.trim().length === 0 && !nodeText.includes('\u00A0');
                        }
                        return false;
                    }));
                return hasOnlyWhitespace && !hasNbsp && hasNoChildren;
            });
            if (emptyElements.length > 0) {
                emptyElements.forEach(el => {
                    el.remove();
                    removedCount++;
                });
                keepRemoving = true;
            }
        }
        this._log('Removed empty elements:', {
            count: removedCount,
            iterations
        });
    }
    createFootnoteItem(footnoteNumber, content, refs) {
        const newItem = document.createElement('li');
        newItem.className = 'footnote';
        newItem.id = `fn:${footnoteNumber}`;
        // Handle content
        if (typeof content === 'string') {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = content;
            newItem.appendChild(paragraph);
        }
        else {
            // Get all paragraphs from the content
            const paragraphs = Array.from(content.querySelectorAll('p'));
            if (paragraphs.length === 0) {
                // If no paragraphs, wrap content in a paragraph
                const paragraph = document.createElement('p');
                paragraph.innerHTML = content.innerHTML;
                newItem.appendChild(paragraph);
            }
            else {
                // Copy existing paragraphs
                paragraphs.forEach(p => {
                    const newP = document.createElement('p');
                    newP.innerHTML = p.innerHTML;
                    newItem.appendChild(newP);
                });
            }
        }
        // Add backlink(s) to the last paragraph
        const lastParagraph = newItem.querySelector('p:last-of-type') || newItem;
        refs.forEach((refId, index) => {
            const backlink = document.createElement('a');
            backlink.href = `#${refId}`;
            backlink.title = 'return to article';
            backlink.className = 'footnote-backref';
            backlink.innerHTML = '↩';
            if (index < refs.length - 1) {
                backlink.innerHTML += ' ';
            }
            lastParagraph.appendChild(backlink);
        });
        return newItem;
    }
    collectFootnotes(element) {
        const footnotes = {};
        let footnoteCount = 1;
        const processedIds = new Set(); // Track processed IDs
        // Collect all footnotes and their IDs from footnote lists
        const footnoteLists = element.querySelectorAll(constants_1.FOOTNOTE_LIST_SELECTORS);
        footnoteLists.forEach(list => {
            // Substack has individual footnote divs with no parent
            if (list.matches('div.footnote[data-component-name="FootnoteToDOM"]')) {
                const anchor = list.querySelector('a.footnote-number');
                const content = list.querySelector('.footnote-content');
                if (anchor && content) {
                    const id = anchor.id.replace('footnote-', '').toLowerCase();
                    if (id && !processedIds.has(id)) {
                        footnotes[footnoteCount] = {
                            content: content,
                            originalId: id,
                            refs: []
                        };
                        processedIds.add(id);
                        footnoteCount++;
                    }
                }
                return;
            }
            // Common format using OL/UL and LI elements
            const items = list.querySelectorAll('li, div[role="listitem"]');
            items.forEach(li => {
                var _a, _b, _c, _d;
                let id = '';
                let content = null;
                // Handle citations with .citations class
                const citationsDiv = li.querySelector('.citations');
                if ((_a = citationsDiv === null || citationsDiv === void 0 ? void 0 : citationsDiv.id) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith('r')) {
                    id = citationsDiv.id.toLowerCase();
                    // Look for citation content within the citations div
                    const citationContent = citationsDiv.querySelector('.citation-content');
                    if (citationContent) {
                        content = citationContent;
                    }
                }
                else {
                    // Extract ID from various formats
                    if (li.id.toLowerCase().startsWith('bib.bib')) {
                        id = li.id.replace('bib.bib', '').toLowerCase();
                    }
                    else if (li.id.toLowerCase().startsWith('fn:')) {
                        id = li.id.replace('fn:', '').toLowerCase();
                    }
                    else if (li.id.toLowerCase().startsWith('fn')) {
                        id = li.id.replace('fn', '').toLowerCase();
                        // Nature.com
                    }
                    else if (li.hasAttribute('data-counter')) {
                        id = ((_c = (_b = li.getAttribute('data-counter')) === null || _b === void 0 ? void 0 : _b.replace(/\.$/, '')) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || '';
                    }
                    else {
                        const match = (_d = li.id.split('/').pop()) === null || _d === void 0 ? void 0 : _d.match(/cite_note-(.+)/);
                        id = match ? match[1].toLowerCase() : li.id.toLowerCase();
                    }
                    content = li;
                }
                if (id && !processedIds.has(id)) {
                    footnotes[footnoteCount] = {
                        content: content || li,
                        originalId: id,
                        refs: []
                    };
                    processedIds.add(id);
                    footnoteCount++;
                }
            });
        });
        return footnotes;
    }
    findOuterFootnoteContainer(el) {
        let current = el;
        let parent = el.parentElement;
        // Keep going up until we find an element that's not a span or sup
        while (parent && (parent.tagName.toLowerCase() === 'span' ||
            parent.tagName.toLowerCase() === 'sup')) {
            current = parent;
            parent = parent.parentElement;
        }
        return current;
    }
    // Every footnote reference should be a sup element with an anchor inside
    // e.g. <sup id="fnref:1"><a href="#fn:1">1</a></sup>
    createFootnoteReference(footnoteNumber, refId) {
        const sup = document.createElement('sup');
        sup.id = refId;
        const link = document.createElement('a');
        link.href = `#fn:${footnoteNumber}`;
        link.textContent = footnoteNumber;
        sup.appendChild(link);
        return sup;
    }
    standardizeFootnotes(element) {
        const footnotes = this.collectFootnotes(element);
        // Standardize inline footnotes using the collected IDs
        const footnoteInlineReferences = element.querySelectorAll(constants_1.FOOTNOTE_INLINE_REFERENCES);
        // Group references by their parent sup element
        const supGroups = new Map();
        footnoteInlineReferences.forEach(el => {
            var _a, _b, _c, _d;
            if (!(el instanceof HTMLElement))
                return;
            let footnoteId = '';
            let footnoteContent = '';
            // Extract footnote ID based on element type
            // Nature.com
            if (el.matches('a[id^="ref-link"]')) {
                footnoteId = ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                // Science.org
            }
            else if (el.matches('a[role="doc-biblioref"]')) {
                const xmlRid = el.getAttribute('data-xml-rid');
                if (xmlRid) {
                    footnoteId = xmlRid;
                }
                else {
                    const href = el.getAttribute('href');
                    if (href === null || href === void 0 ? void 0 : href.startsWith('#core-R')) {
                        footnoteId = href.replace('#core-', '');
                    }
                }
                // Substack
            }
            else if (el.matches('a.footnote-anchor, span.footnote-hovercard-target a')) {
                const id = ((_b = el.id) === null || _b === void 0 ? void 0 : _b.replace('footnote-anchor-', '')) || '';
                if (id) {
                    footnoteId = id.toLowerCase();
                }
                // Arxiv
            }
            else if (el.matches('cite.ltx_cite')) {
                const link = el.querySelector('a');
                if (link) {
                    const href = link.getAttribute('href');
                    if (href) {
                        const match = (_c = href.split('/').pop()) === null || _c === void 0 ? void 0 : _c.match(/bib\.bib(\d+)/);
                        if (match) {
                            footnoteId = match[1].toLowerCase();
                        }
                    }
                }
            }
            else if (el.matches('sup.reference')) {
                const links = el.querySelectorAll('a');
                Array.from(links).forEach(link => {
                    var _a;
                    const href = link.getAttribute('href');
                    if (href) {
                        const match = (_a = href.split('/').pop()) === null || _a === void 0 ? void 0 : _a.match(/(?:cite_note|cite_ref)-(.+)/);
                        if (match) {
                            footnoteId = match[1].toLowerCase();
                        }
                    }
                });
            }
            else if (el.matches('sup[id^="fnref:"]')) {
                footnoteId = el.id.replace('fnref:', '').toLowerCase();
            }
            else if (el.matches('sup[id^="fnr"]')) {
                footnoteId = el.id.replace('fnr', '').toLowerCase();
            }
            else if (el.matches('span.footnote-reference')) {
                footnoteId = el.getAttribute('data-footnote-id') || '';
            }
            else if (el.matches('span.footnote-link')) {
                footnoteId = el.getAttribute('data-footnote-id') || '';
                footnoteContent = el.getAttribute('data-footnote-content') || '';
            }
            else if (el.matches('a.citation')) {
                footnoteId = ((_d = el.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '';
                footnoteContent = el.getAttribute('href') || '';
            }
            else if (el.matches('a[id^="fnref"]')) {
                footnoteId = el.id.replace('fnref', '').toLowerCase();
            }
            else {
                // Other citation types
                const href = el.getAttribute('href');
                if (href) {
                    const id = href.replace(/^[#]/, '');
                    footnoteId = id.toLowerCase();
                }
            }
            if (footnoteId) {
                // Find the footnote number by matching the original ID
                const footnoteEntry = Object.entries(footnotes).find(([_, data]) => data.originalId === footnoteId.toLowerCase());
                if (footnoteEntry) {
                    const [footnoteNumber, footnoteData] = footnoteEntry;
                    // Create footnote reference ID
                    const refId = footnoteData.refs.length > 0 ?
                        `fnref:${footnoteNumber}-${footnoteData.refs.length + 1}` :
                        `fnref:${footnoteNumber}`;
                    footnoteData.refs.push(refId);
                    // Find the outermost container (span or sup)
                    const container = this.findOuterFootnoteContainer(el);
                    // If container is a sup, group references
                    if (container.tagName.toLowerCase() === 'sup') {
                        if (!supGroups.has(container)) {
                            supGroups.set(container, []);
                        }
                        const group = supGroups.get(container);
                        group.push(this.createFootnoteReference(footnoteNumber, refId));
                    }
                    else {
                        // Replace the container directly
                        container.replaceWith(this.createFootnoteReference(footnoteNumber, refId));
                    }
                }
            }
        });
        // Handle grouped references
        supGroups.forEach((references, container) => {
            if (references.length > 0) {
                // Create a document fragment to hold all the references
                const fragment = document.createDocumentFragment();
                // Add each reference as its own sup element
                references.forEach((ref, index) => {
                    const link = ref.querySelector('a');
                    if (link) {
                        const sup = document.createElement('sup');
                        sup.id = ref.id;
                        sup.appendChild(link.cloneNode(true));
                        fragment.appendChild(sup);
                    }
                });
                container.replaceWith(fragment);
            }
        });
        // Create the standardized footnote list
        const newList = document.createElement('footnotes');
        newList.className = 'footnotes';
        const orderedList = document.createElement('ol');
        // Create footnote items in order
        Object.entries(footnotes).forEach(([number, data]) => {
            const newItem = this.createFootnoteItem(parseInt(number), data.content, data.refs);
            orderedList.appendChild(newItem);
        });
        // Remove original footnote lists
        const footnoteLists = element.querySelectorAll(constants_1.FOOTNOTE_LIST_SELECTORS);
        footnoteLists.forEach(list => list.remove());
        // If we have any footnotes, add the new list to the document
        if (orderedList.children.length > 0) {
            newList.appendChild(orderedList);
            element.appendChild(newList);
        }
    }
    handleLazyImages(element) {
        let processedCount = 0;
        const lazyImages = element.querySelectorAll('img[data-src], img[data-srcset]');
        lazyImages.forEach(img => {
            if (!(img instanceof HTMLImageElement))
                return;
            // Handle data-src
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc && !img.src) {
                img.src = dataSrc;
                processedCount++;
            }
            // Handle data-srcset
            const dataSrcset = img.getAttribute('data-srcset');
            if (dataSrcset && !img.srcset) {
                img.srcset = dataSrcset;
                processedCount++;
            }
            // Remove lazy loading related classes and attributes
            img.classList.remove('lazy', 'lazyload');
            img.removeAttribute('data-ll-status');
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
        });
        this._log('Processed lazy images:', processedCount);
    }
    standardizeElements(element) {
        let processedCount = 0;
        // Convert elements based on standardization rules
        ELEMENT_STANDARDIZATION_RULES.forEach(rule => {
            const elements = element.querySelectorAll(rule.selector);
            elements.forEach(el => {
                if (rule.transform) {
                    // If there's a transform function, use it to create the new element
                    const transformed = rule.transform(el);
                    el.replaceWith(transformed);
                    processedCount++;
                }
            });
        });
        // Convert lite-youtube elements
        const liteYoutubeElements = element.querySelectorAll('lite-youtube');
        liteYoutubeElements.forEach(el => {
            const videoId = el.getAttribute('videoid');
            if (!videoId)
                return;
            const iframe = document.createElement('iframe');
            iframe.width = '560';
            iframe.height = '315';
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.title = el.getAttribute('videotitle') || 'YouTube video player';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.setAttribute('allowfullscreen', '');
            el.replaceWith(iframe);
            processedCount++;
        });
        // Add future embed conversions (Twitter, Instagram, etc.)
        this._log('Converted embedded elements:', processedCount);
    }
    // Find small IMG and SVG elements
    findSmallImages(doc) {
        const MIN_DIMENSION = 33;
        const smallImages = new Set();
        const transformRegex = /scale\(([\d.]+)\)/;
        const startTime = performance.now();
        let processedCount = 0;
        // 1. Read phase - Gather all elements in a single pass
        const elements = [
            ...Array.from(doc.getElementsByTagName('img')),
            ...Array.from(doc.getElementsByTagName('svg'))
        ].filter(element => {
            // Skip lazy-loaded images that haven't been processed yet
            if (element instanceof HTMLImageElement) {
                const isLazy = element.classList.contains('lazy') ||
                    element.classList.contains('lazyload') ||
                    element.hasAttribute('data-src') ||
                    element.hasAttribute('data-srcset');
                return !isLazy;
            }
            return true;
        });
        if (elements.length === 0) {
            return smallImages;
        }
        // 2. Batch process - Collect all measurements in one go
        const measurements = elements.map(element => ({
            element,
            // Static attributes (no reflow)
            naturalWidth: element instanceof HTMLImageElement ? element.naturalWidth : 0,
            naturalHeight: element instanceof HTMLImageElement ? element.naturalHeight : 0,
            attrWidth: parseInt(element.getAttribute('width') || '0'),
            attrHeight: parseInt(element.getAttribute('height') || '0')
        }));
        // 3. Batch compute styles - Process in chunks to avoid long tasks
        const BATCH_SIZE = 50;
        for (let i = 0; i < measurements.length; i += BATCH_SIZE) {
            const batch = measurements.slice(i, i + BATCH_SIZE);
            try {
                // Read phase - compute all styles at once
                const styles = batch.map(({ element }) => window.getComputedStyle(element));
                const rects = batch.map(({ element }) => element.getBoundingClientRect());
                // Process phase - no DOM operations
                batch.forEach((measurement, index) => {
                    var _a;
                    try {
                        const style = styles[index];
                        const rect = rects[index];
                        // Get transform scale in the same batch
                        const transform = style.transform;
                        const scale = transform ?
                            parseFloat(((_a = transform.match(transformRegex)) === null || _a === void 0 ? void 0 : _a[1]) || '1') : 1;
                        // Calculate effective dimensions
                        const widths = [
                            measurement.naturalWidth,
                            measurement.attrWidth,
                            parseInt(style.width) || 0,
                            rect.width * scale
                        ].filter(dim => typeof dim === 'number' && dim > 0);
                        const heights = [
                            measurement.naturalHeight,
                            measurement.attrHeight,
                            parseInt(style.height) || 0,
                            rect.height * scale
                        ].filter(dim => typeof dim === 'number' && dim > 0);
                        // Decision phase - no DOM operations
                        if (widths.length > 0 && heights.length > 0) {
                            const effectiveWidth = Math.min(...widths);
                            const effectiveHeight = Math.min(...heights);
                            if (effectiveWidth < MIN_DIMENSION || effectiveHeight < MIN_DIMENSION) {
                                const identifier = this.getElementIdentifier(measurement.element);
                                if (identifier) {
                                    smallImages.add(identifier);
                                    processedCount++;
                                }
                            }
                        }
                    }
                    catch (e) {
                        if (this.debug) {
                            console.warn('Defuddle: Failed to process element dimensions:', e);
                        }
                    }
                });
            }
            catch (e) {
                if (this.debug) {
                    console.warn('Defuddle: Failed to process batch:', e);
                }
            }
        }
        const endTime = performance.now();
        this._log('Found small elements:', {
            count: processedCount,
            totalElements: elements.length,
            processingTime: `${(endTime - startTime).toFixed(2)}ms`
        });
        return smallImages;
    }
    removeSmallImages(doc, smallImages) {
        let removedCount = 0;
        ['img', 'svg'].forEach(tag => {
            const elements = doc.getElementsByTagName(tag);
            Array.from(elements).forEach(element => {
                const identifier = this.getElementIdentifier(element);
                if (identifier && smallImages.has(identifier)) {
                    element.remove();
                    removedCount++;
                }
            });
        });
        this._log('Removed small elements:', removedCount);
    }
    getElementIdentifier(element) {
        // Try to create a unique identifier using various attributes
        if (element instanceof HTMLImageElement) {
            // For lazy-loaded images, use data-src as identifier if available
            const dataSrc = element.getAttribute('data-src');
            if (dataSrc)
                return `src:${dataSrc}`;
            const src = element.src || '';
            const srcset = element.srcset || '';
            const dataSrcset = element.getAttribute('data-srcset');
            if (src)
                return `src:${src}`;
            if (srcset)
                return `srcset:${srcset}`;
            if (dataSrcset)
                return `srcset:${dataSrcset}`;
        }
        const id = element.id || '';
        const className = element.className || '';
        const viewBox = element instanceof SVGElement ? element.getAttribute('viewBox') || '' : '';
        if (id)
            return `id:${id}`;
        if (viewBox)
            return `viewBox:${viewBox}`;
        if (className)
            return `class:${className}`;
        return null;
    }
    findMainContent(doc) {
        // Find all potential content containers
        const candidates = [];
        constants_1.ENTRY_POINT_ELEMENTS.forEach((selector, index) => {
            const elements = doc.querySelectorAll(selector);
            elements.forEach(element => {
                // Base score from selector priority (earlier = higher)
                let score = (constants_1.ENTRY_POINT_ELEMENTS.length - index) * 10;
                // Add score based on content analysis
                score += this.scoreElement(element);
                candidates.push({ element, score });
            });
        });
        if (candidates.length === 0) {
            // Fall back to scoring block elements
            // Currently <body> element is used as the fallback, so this is not used
            return this.findContentByScoring(doc);
        }
        // Sort by score descending
        candidates.sort((a, b) => b.score - a.score);
        if (this.debug) {
            this._log('Content candidates:', candidates.map(c => ({
                element: c.element.tagName,
                selector: this.getElementSelector(c.element),
                score: c.score
            })));
        }
        return candidates[0].element;
    }
    findContentByScoring(doc) {
        const candidates = this.scoreElements(doc);
        return candidates.length > 0 ? candidates[0].element : null;
    }
    getElementSelector(element) {
        const parts = [];
        let current = element;
        while (current && current !== this.doc.documentElement) {
            let selector = current.tagName.toLowerCase();
            if (current.id) {
                selector += '#' + current.id;
            }
            else if (current.className && typeof current.className === 'string') {
                selector += '.' + current.className.trim().split(/\s+/).join('.');
            }
            parts.unshift(selector);
            current = current.parentElement;
        }
        return parts.join(' > ');
    }
    scoreElements(doc) {
        const candidates = [];
        constants_1.BLOCK_ELEMENTS.forEach((tag) => {
            Array.from(doc.getElementsByTagName(tag)).forEach((element) => {
                const score = this.scoreElement(element);
                if (score > 0) {
                    candidates.push({ score, element });
                }
            });
        });
        return candidates.sort((a, b) => b.score - a.score);
    }
    scoreElement(element) {
        let score = 0;
        // Score based on element properties
        const className = element.className && typeof element.className === 'string' ?
            element.className.toLowerCase() : '';
        const id = element.id ? element.id.toLowerCase() : '';
        // Score based on content
        const text = element.textContent || '';
        const words = text.split(/\s+/).length;
        score += Math.min(Math.floor(words / 100), 3);
        // Score based on link density
        const links = element.getElementsByTagName('a');
        const linkText = Array.from(links).reduce((acc, link) => { var _a; return acc + (((_a = link.textContent) === null || _a === void 0 ? void 0 : _a.length) || 0); }, 0);
        const linkDensity = text.length ? linkText / text.length : 0;
        if (linkDensity > 0.5) {
            score -= 10;
        }
        // Score based on presence of meaningful elements
        const paragraphs = element.getElementsByTagName('p').length;
        score += paragraphs;
        const images = element.getElementsByTagName('img').length;
        score += Math.min(images * 3, 9);
        return score;
    }
}
exports.Defuddle = Defuddle;


/***/ }),

/***/ 640:
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SUPPORTED_LANGUAGES = exports.ALLOWED_ATTRIBUTES_DEBUG = exports.ALLOWED_ATTRIBUTES = exports.ALLOWED_EMPTY_ELEMENTS = exports.FOOTNOTE_LIST_SELECTORS = exports.FOOTNOTE_INLINE_REFERENCES = exports.PARTIAL_SELECTORS = exports.EXACT_SELECTORS = exports.HIDDEN_ELEMENT_SELECTORS = exports.INLINE_ELEMENTS = exports.PRESERVE_ELEMENTS = exports.BLOCK_ELEMENTS = exports.MOBILE_WIDTH = exports.ENTRY_POINT_ELEMENTS = void 0;
// Entry point elements
// These are the elements that will be used to find the main content
exports.ENTRY_POINT_ELEMENTS = [
    'article',
    '[role="article"]',
    '[itemprop="articleBody"]',
    '.post-content',
    '.article-content',
    '#article-content',
    '.content-article',
    'main',
    '[role="main"]',
    'body' // ensures there is always a match
];
exports.MOBILE_WIDTH = 600;
exports.BLOCK_ELEMENTS = ['div', 'section', 'article', 'main'];
// Elements that should not be unwrapped
exports.PRESERVE_ELEMENTS = new Set([
    'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'figure', 'figcaption', 'picture',
    'details', 'summary',
    'blockquote',
    'form', 'fieldset'
]);
// Inline elements that should not be unwrapped
exports.INLINE_ELEMENTS = new Set([
    'a', 'span', 'strong', 'em', 'i', 'b', 'u', 'code', 'br', 'small',
    'sub', 'sup', 'mark', 'del', 'ins', 'q', 'abbr', 'cite', 'time'
]);
// Hidden elements that should be removed
exports.HIDDEN_ELEMENT_SELECTORS = [
    '[hidden]',
    '[aria-hidden="true"]',
    //	'[style*="display: none"]', causes problems for math formulas
    //	'[style*="display:none"]',
    '[style*="visibility: hidden"]',
    '[style*="visibility:hidden"]',
    '.hidden',
    '.invisible'
].join(',');
// Selectors to be removed
exports.EXACT_SELECTORS = [
    // scripts, styles
    'noscript',
    'script',
    'style',
    // ads
    '.ad:not([class*="gradient"])',
    '[class^="ad-" i]',
    '[class$="-ad" i]',
    '[id^="ad-" i]',
    '[id$="-ad" i]',
    '[role="banner" i]',
    '.promo',
    '.Promo',
    // comments
    '[id="comments" i]',
    // header, nav
    'header',
    '.header',
    '#header',
    'nav',
    '.navigation',
    '#navigation',
    '[role="navigation" i]',
    '[role="dialog" i]',
    '[role*="complementary" i]',
    '[class*="pagination" i]',
    '.menu',
    '#menu',
    '#siteSub',
    // metadata
    '.author',
    '.Author',
    '.contributor',
    '.date',
    '.meta',
    '.tags',
    '.toc',
    '.Toc',
    '#toc',
    '#title',
    '#Title',
    '[href*="/category"]',
    '[href*="/categories"]',
    '[href*="/tag/"]',
    '[href*="/tags/"]',
    '[href*="/topics"]',
    '[href*="author"]',
    '[href="#site-content"]',
    '[src*="author"]',
    // footer
    'footer',
    // inputs, forms, elements
    'aside',
    'button',
    // '[role="button"]', Medium images
    'canvas',
    'dialog',
    'fieldset',
    'form',
    'input:not([type="checkbox"])',
    'label',
    'link',
    'option',
    'select',
    'textarea',
    'time',
    // iframes
    'instaread-player',
    'iframe:not([src*="youtube"]):not([src*="youtu.be"]):not([src*="vimeo"]):not([src*="twitter"])',
    // logos
    '[class="logo" i]',
    '#logo',
    '#Logo',
    // newsletter
    '#newsletter',
    '#Newsletter',
    // hidden for print
    '.noprint',
    '[data-link-name*="skip" i]',
    '[data-print-layout="hide" i]',
    '[data-block="donotprint" i]',
    // footnotes, citations
    '[class*="clickable-icon" i]',
    'li span[class*="ltx_tag" i][class*="ltx_tag_item" i]',
    'a[href^="#"][class*="anchor" i]',
    'a[href^="#"][class*="ref" i]',
    // link lists
    '[data-container*="most-viewed" i]',
    // sidebar
    '.sidebar',
    '.Sidebar',
    '#sidebar',
    '#Sidebar',
    '#sitesub',
    // other
    '#NYT_ABOVE_MAIN_CONTENT_REGION',
    '[data-testid="photoviewer-children-figure"] > span', // New York Times
    'table.infobox',
    '.pencraft:not(.pc-display-contents)', // Substack
    '[data-optimizely="related-articles-section" i]' // The Economist
];
// Removal patterns tested against attributes: class, id, data-testid, and data-qa
// Case insensitive, partial matches allowed
exports.PARTIAL_SELECTORS = [
    'access-wall',
    'activitypub',
    'actioncall',
    'appendix',
    'avatar',
    'advert',
    '-ad-',
    '_ad_',
    'allterms',
    'around-the-web',
    'article-bottom-section',
    'article__copy',
    'article_date',
    'article-end ',
    'article_header',
    'article__header',
    'article__info',
    'article-info',
    'article__meta',
    'article-subject',
    'article_subject',
    'article-snippet',
    'article-separator',
    'article-tags',
    'article_tags',
    'article-title',
    'article_title',
    'articletopics',
    'article-topics',
    'article-type',
    'article--lede', // The Verge
    'associated-people',
    //	'author', Gwern
    'author-name',
    'back-to-top',
    'backlinks-section',
    'banner',
    'bio-block',
    'blog-pager',
    'bottom-of-article',
    'brand-bar',
    'breadcrumb',
    'button-wrapper',
    'btn-',
    '-btn',
    'byline',
    'captcha',
    'cat_header',
    'catlinks',
    'chapter-list', // The Economist
    'collections',
    'comments',
    //	'-comment', Syntax highlighting
    'comment-count',
    'comment-content',
    'comment-form',
    'comment-number',
    'comment-respond',
    'comment-thread',
    'complementary',
    'consent',
    'content-card', // The Verge
    'content-topics',
    'contentpromo',
    'context-widget', // Reuters
    'core-collateral',
    '_cta',
    '-cta',
    'cta-',
    'cta_',
    'current-issue', // The Nation
    'custom-list-number',
    'dateline',
    'dateheader',
    'date-header',
    'date_header-',
    //	'dialog',
    'disclaimer',
    'disclosure',
    'discussion',
    'discuss_',
    'disqus',
    'donate',
    'dropdown', // Ars Technica
    'eletters',
    'emailsignup',
    'engagement-widget',
    'entry-author-info',
    'entry-categories',
    'entry-date',
    'entry-meta',
    'entry-title',
    'entry-utility',
    'eyebrow',
    'expand-reduce',
    'externallinkembedwrapper', // The New Yorker
    'extra-services',
    'extra-title',
    'facebook',
    'favorite',
    'feedback',
    'feed-links',
    'field-site-sections',
    'fixed',
    'floating-vid',
    'follow',
    'footer',
    'footnote-back',
    'footnoteback',
    'for-you',
    'frontmatter',
    'further-reading',
    'gist-meta',
    //	'global',
    'google',
    'goog-',
    'graph-view',
    'header-logo',
    'header-pattern', // The Verge
    'hero-list',
    'hide-for-print',
    'hide-print',
    'hidden-sidenote',
    'interlude',
    'interaction',
    'jumplink',
    'jump-to-',
    //	'keyword', // used in syntax highlighting
    'kicker',
    'labstab', // Arxiv
    '-labels',
    'language-name',
    'latest-content',
    '-ledes-', // The Verge
    '-license',
    'link-box',
    'links-grid', // BBC
    'links-title', // BBC
    'listing-dynamic-terms', // Boston Review
    'list-tags',
    'loading',
    'loa-info',
    'logo_container',
    'ltx_role_refnum', // Arxiv
    'ltx_tag_bibitem',
    'ltx_error',
    'marketing',
    'media-inquiry',
    'menu-',
    'meta-',
    'metadata',
    'might-like',
    '_modal',
    '-modal',
    'more-',
    'morenews',
    'morestories',
    'move-helper',
    'mw-editsection',
    'mw-cite-backlink',
    'mw-indicators',
    'mw-jump-link',
    'nav-',
    'nav_',
    'navbar',
    //	'navigation',
    'next-',
    'news-story-title',
    //	'newsletter', used on Substack
    'newsletter_',
    'newsletter-signup',
    'newslettersignup',
    'newsletterwidget',
    'newsletterwrapper',
    'not-found',
    'nomobile',
    'noprint',
    'originally-published', // Mercury News
    'outline-view',
    'overlay',
    'page-title',
    '-partners',
    'plea',
    'popular',
    //	'popup', Gwern
    'pop-up',
    'popover',
    'post-bottom',
    'post__category',
    'postcomment',
    'postdate',
    'post-author',
    'post-date',
    'post_date',
    'post-feeds',
    'postinfo',
    'post-info',
    'post_info',
    'post-inline-date',
    'post-links',
    'post-meta',
    'postmeta',
    'postsnippet',
    'post_snippet',
    'post-snippet',
    'posttitle',
    'post-title',
    'post_title',
    'posttax',
    'post-tax',
    'post_tax',
    'posttag',
    'post_tag',
    'post-tag',
    //	'preview', used on Obsidian Publish
    'prevnext',
    'previousnext',
    'print-none',
    'print-header',
    'profile',
    //	'promo',
    'promo-box',
    'pubdate',
    'pub_date',
    'pub-date',
    'publication-date',
    'publicationName', // Medium
    'qr-code',
    'qr_code',
    '_rail',
    'readmore',
    'read-next',
    'read_next',
    'read_time',
    'read-time',
    'reading_time',
    'reading-time',
    'reading-list',
    'recentpost',
    'recent_post',
    'recent-post',
    'recommend',
    'redirectedfrom',
    'recirc',
    'register',
    'related',
    'relevant',
    'reversefootnote',
    'screen-reader-text',
    //	'share',
    //	'-share', scitechdaily.com
    'share-box',
    'share-icons',
    'sharelinks',
    'share-section',
    'sidebartitle',
    'sidebar_',
    'similar-',
    'similar_',
    'similars-',
    'sideitems',
    'side-box',
    'site-index',
    'site-header',
    'site-logo',
    'site-name',
    //	'skip-',
    //	'skip-link', TechCrunch
    'social',
    'speechify-ignore',
    'sponsor',
    'springercitation',
    //	'-stats',
    '_stats',
    'sticky',
    'storyreadtime', // Medium
    'storypublishdate', // Medium
    'subject-label',
    'subscribe',
    '_tags',
    'tags__item',
    'tag_list',
    'taxonomy',
    'table-of-contents',
    'tabs-',
    //	'teaser', Nature
    'terminaltout',
    'time-rubric',
    'timestamp',
    'tip_off',
    'tiptout',
    '-tout-',
    '-toc',
    'topic-list',
    'toolbar',
    'tooltip',
    'top-wrapper',
    'tree-item',
    'trending',
    'trust-feat',
    'trust-badge',
    'twitter',
    'visually-hidden',
    'welcomebox'
];
// Selectors for footnotes and citations
exports.FOOTNOTE_INLINE_REFERENCES = [
    'sup.reference',
    'cite.ltx_cite',
    'sup[id^="fnr"]',
    'sup[id^="fnref:"]',
    'span.footnote-link',
    'a.citation',
    'a[id^="ref-link"]',
    'a[href^="#fn"]',
    'a[href^="#cite"]',
    'a[href^="#reference"]',
    'a[href^="#footnote"]',
    'a[href^="#r"]', // Common in academic papers
    'a[href^="#b"]', // Common for bibliography references
    'a[href*="cite_note"]',
    'a[href*="cite_ref"]',
    'a.footnote-anchor', // Substack
    'span.footnote-hovercard-target a', // Substack
    'a[role="doc-biblioref"]', // Science.org
    'a[id^="fnref"]',
    'a[id^="ref-link"]', // Nature.com
].join(',');
exports.FOOTNOTE_LIST_SELECTORS = [
    'div.footnote ol',
    'div.footnotes ol',
    'div[role="doc-endnotes"]',
    'div[role="doc-footnotes"]',
    'ol.footnotes-list',
    'ol.footnotes',
    'ol.references',
    'ol[class*="article-references"]',
    'section.footnotes ol',
    'section[role="doc-endnotes"]',
    'section[role="doc-footnotes"]',
    'section[role="doc-bibliography"]',
    'ul.footnotes-list',
    'ul.ltx_biblist',
    'div.footnote[data-component-name="FootnoteToDOM"]' // Substack
].join(',');
// Elements that are allowed to be empty
// These are not removed even if they have no content
exports.ALLOWED_EMPTY_ELEMENTS = new Set([
    'area',
    'audio',
    'base',
    'br',
    'circle',
    'col',
    'defs',
    'ellipse',
    'embed',
    'figure',
    'g',
    'hr',
    'iframe',
    'img',
    'input',
    'line',
    'link',
    'mask',
    'meta',
    'object',
    'param',
    'path',
    'pattern',
    'picture',
    'polygon',
    'polyline',
    'rect',
    'source',
    'stop',
    'svg',
    'td',
    'th',
    'track',
    'use',
    'video',
    'wbr'
]);
// Attributes to keep
exports.ALLOWED_ATTRIBUTES = new Set([
    'alt',
    'allow',
    'allowfullscreen',
    'aria-label',
    'checked',
    'colspan',
    'controls',
    'data-src',
    'data-srcset',
    'data-lang',
    'dir',
    'frameborder',
    'headers',
    'height',
    'href',
    'lang',
    'role',
    'rowspan',
    'src',
    'srcset',
    'title',
    'type',
    'width'
]);
exports.ALLOWED_ATTRIBUTES_DEBUG = new Set([
    'class',
    'id',
]);
// Supported languages for code blocks
exports.SUPPORTED_LANGUAGES = new Set([
    // Markup & Web
    'markup', 'html', 'xml', 'svg', 'mathml', 'ssml', 'atom', 'rss',
    'javascript', 'js', 'jsx', 'typescript', 'ts', 'tsx',
    'webassembly', 'wasm',
    // Common Programming Languages
    'python',
    'java',
    'csharp', 'cs', 'dotnet', 'aspnet',
    'cpp', 'c++', 'c', 'objc',
    'ruby', 'rb',
    'php',
    'golang',
    'rust',
    'swift',
    'kotlin',
    'scala',
    'dart',
    // Shell & Scripting
    'bash', 'shell', 'sh',
    'powershell',
    'batch',
    // Data & Config
    'json', 'jsonp',
    'yaml', 'yml',
    'toml',
    'dockerfile',
    'gitignore',
    // Query Languages
    'sql', 'mysql', 'postgresql',
    'graphql',
    'mongodb',
    'sparql',
    // Markup & Documentation
    'markdown', 'md',
    'latex', 'tex',
    'asciidoc', 'adoc',
    'jsdoc',
    // Functional Languages
    'haskell', 'hs',
    'elm',
    'elixir',
    'erlang',
    'ocaml',
    'fsharp',
    'scheme',
    'lisp', 'elisp',
    'clojure',
    // Other Languages
    'matlab',
    'fortran',
    'cobol',
    'pascal',
    'perl',
    'lua',
    'julia',
    'groovy',
    'crystal',
    'nim',
    'zig',
    // Domain Specific
    'regex',
    'gradle',
    'cmake',
    'makefile',
    'nix',
    'terraform',
    'solidity',
    'glsl',
    'hlsl',
    // Assembly
    'nasm',
    'masm',
    'armasm',
    // Game Development
    'gdscript',
    'unrealscript',
    // Others
    'abap',
    'actionscript',
    'ada',
    'agda',
    'antlr4',
    'applescript',
    'arduino',
    'coffeescript',
    'django',
    'erlang',
    'fortran',
    'haxe',
    'idris',
    'kotlin',
    'livescript',
    'matlab',
    'nginx',
    'pascal',
    'prolog',
    'puppet',
    'scala',
    'scheme',
    'tcl',
    'verilog',
    'vhdl'
]);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Defuddle = void 0;
var defuddle_1 = __webpack_require__(/*! ./defuddle */ 628);
Object.defineProperty(exports, "Defuddle", ({ enumerable: true, get: function () { return defuddle_1.Defuddle; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFDTixRQUFRO0lBQ1IsYUFBYTtJQUNiLFNBQVM7SUFDVCxjQUFjO0lBQ2QsUUFBUTtJQUNSLFFBQVE7SUFDUixTQUFTO0lBQ1QsTUFBTTtJQUNOLE9BQU87SUFDUCxRQUFRO0lBQ1IsWUFBWTtJQUNaLFFBQVE7SUFDUixPQUFPO0lBQ1AsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsT0FBTztJQUNQLFFBQVE7SUFDUixLQUFLO0lBQ0wsU0FBUztJQUNULE1BQU07Q0FDTixDQUFDLENBQUM7Ozs7Ozs7VUM5ckJIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QkEsNERBQXNDO0FBQTdCLDZHQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vRGVmdWRkbGUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0RlZnVkZGxlLy4vc3JjL21ldGFkYXRhLnRzIiwid2VicGFjazovL0RlZnVkZGxlLy4vc3JjL2RlZnVkZGxlLnRzIiwid2VicGFjazovL0RlZnVkZGxlLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWZ1ZGRsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWZ1ZGRsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsICgpID0+IHtcbnJldHVybiAiLCJpbXBvcnQgeyBEZWZ1ZGRsZU1ldGFkYXRhIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUV4dHJhY3RvciB7XG5cdHN0YXRpYyBleHRyYWN0KGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IERlZnVkZGxlTWV0YWRhdGEge1xuXHRcdGxldCBkb21haW4gPSAnJztcblx0XHRsZXQgdXJsID0gJyc7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gVHJ5IHRvIGdldCBVUkwgZnJvbSBkb2N1bWVudCBsb2NhdGlvblxuXHRcdFx0dXJsID0gZG9jLmxvY2F0aW9uPy5ocmVmIHx8ICcnO1xuXHRcdFx0XG5cdFx0XHQvLyBJZiBubyBVUkwgZnJvbSBsb2NhdGlvbiwgdHJ5IG90aGVyIHNvdXJjZXNcblx0XHRcdGlmICghdXJsKSB7XG5cdFx0XHRcdHVybCA9IHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6dXJsXCIpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJ0d2l0dGVyOnVybFwiKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAndXJsJykgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ21haW5FbnRpdHlPZlBhZ2UudXJsJykgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ21haW5FbnRpdHkudXJsJykgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ1dlYlNpdGUudXJsJykgfHxcblx0XHRcdFx0XHRkb2MucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJjYW5vbmljYWxcIl0nKT8uZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh1cmwpIHtcblx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gSWYgVVJMIHBhcnNpbmcgZmFpbHMsIHRyeSB0byBnZXQgZnJvbSBiYXNlIHRhZ1xuXHRcdFx0Y29uc3QgYmFzZVRhZyA9IGRvYy5xdWVyeVNlbGVjdG9yKCdiYXNlW2hyZWZdJyk7XG5cdFx0XHRpZiAoYmFzZVRhZykge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHVybCA9IGJhc2VUYWcuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBwYXJzZSBiYXNlIFVSTDonLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy5nZXRUaXRsZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuZ2V0RGVzY3JpcHRpb24oZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdGRvbWFpbixcblx0XHRcdGZhdmljb246IHRoaXMuZ2V0RmF2aWNvbihkb2MsIHVybCksXG5cdFx0XHRpbWFnZTogdGhpcy5nZXRJbWFnZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0cHVibGlzaGVkOiB0aGlzLmdldFB1Ymxpc2hlZChkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0YXV0aG9yOiB0aGlzLmdldEF1dGhvcihkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0c2l0ZTogdGhpcy5nZXRTaXRlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRzY2hlbWFPcmdEYXRhLFxuXHRcdFx0d29yZENvdW50OiAwLFxuXHRcdFx0cGFyc2VUaW1lOiAwXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEF1dGhvcihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2F1dGhvci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYnlsXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXV0aG9yTGlzdFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImNvcHlyaWdodFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdjb3B5cmlnaHRIb2xkZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnNpdGVfbmFtZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdwdWJsaXNoZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3NvdXJjZU9yZ2FuaXphdGlvbi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnaXNQYXJ0T2YubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjpjcmVhdG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXBwbGljYXRpb24tbmFtZVwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0U2l0ZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3B1Ymxpc2hlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6c2l0ZV9uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ1dlYlNpdGUubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3NvdXJjZU9yZ2FuaXphdGlvbi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJjb3B5cmlnaHRcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnY29weXJpZ2h0SG9sZGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdpc1BhcnRPZi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhcHBsaWNhdGlvbi1uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldEF1dGhvcihkb2MsIHNjaGVtYU9yZ0RhdGEpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRUaXRsZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHJhd1RpdGxlID0gKFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzp0aXRsZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6dGl0bGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnaGVhZGxpbmUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUudGl0bGVcIikgfHxcblx0XHRcdGRvYy5xdWVyeVNlbGVjdG9yKCd0aXRsZScpPy50ZXh0Q29udGVudD8udHJpbSgpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcy5jbGVhblRpdGxlKHJhd1RpdGxlLCB0aGlzLmdldFNpdGUoZG9jLCBzY2hlbWFPcmdEYXRhKSk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBjbGVhblRpdGxlKHRpdGxlOiBzdHJpbmcsIHNpdGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGlmICghdGl0bGUgfHwgIXNpdGVOYW1lKSByZXR1cm4gdGl0bGU7XG5cblx0XHQvLyBSZW1vdmUgc2l0ZSBuYW1lIGlmIGl0IGV4aXN0c1xuXHRcdGNvbnN0IHNpdGVOYW1lRXNjYXBlZCA9IHNpdGVOYW1lLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7XG5cdFx0Y29uc3QgcGF0dGVybnMgPSBbXG5cdFx0XHRgXFxcXHMqW1xcXFx8XFxcXC3igJPigJRdXFxcXHMqJHtzaXRlTmFtZUVzY2FwZWR9XFxcXHMqJGAsIC8vIFRpdGxlIHwgU2l0ZSBOYW1lXG5cdFx0XHRgXlxcXFxzKiR7c2l0ZU5hbWVFc2NhcGVkfVxcXFxzKltcXFxcfFxcXFwt4oCT4oCUXVxcXFxzKmAsIC8vIFNpdGUgTmFtZSB8IFRpdGxlXG5cdFx0XTtcblx0XHRcblx0XHRmb3IgKGNvbnN0IHBhdHRlcm4gb2YgcGF0dGVybnMpIHtcblx0XHRcdGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCAnaScpO1xuXHRcdFx0aWYgKHJlZ2V4LnRlc3QodGl0bGUpKSB7XG5cdFx0XHRcdHRpdGxlID0gdGl0bGUucmVwbGFjZShyZWdleCwgJycpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGl0bGUudHJpbSgpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0RGVzY3JpcHRpb24oZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImRlc2NyaXB0aW9uXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcImRlc2NyaXB0aW9uXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOmRlc2NyaXB0aW9uXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2Rlc2NyaXB0aW9uJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEltYWdlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6aW1hZ2VcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmltYWdlXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2ltYWdlLnVybCcpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuaW1hZ2UuZnVsbFwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0RmF2aWNvbihkb2M6IERvY3VtZW50LCBiYXNlVXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGNvbnN0IGljb25Gcm9tTWV0YSA9IHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6aW1hZ2U6ZmF2aWNvblwiKTtcblx0XHRpZiAoaWNvbkZyb21NZXRhKSByZXR1cm4gaWNvbkZyb21NZXRhO1xuXG5cdFx0Y29uc3QgaWNvbkxpbmsgPSBkb2MucXVlcnlTZWxlY3RvcihcImxpbmtbcmVsPSdpY29uJ11cIik/LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cdFx0aWYgKGljb25MaW5rKSByZXR1cm4gaWNvbkxpbms7XG5cblx0XHRjb25zdCBzaG9ydGN1dExpbmsgPSBkb2MucXVlcnlTZWxlY3RvcihcImxpbmtbcmVsPSdzaG9ydGN1dCBpY29uJ11cIik/LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cdFx0aWYgKHNob3J0Y3V0TGluaykgcmV0dXJuIHNob3J0Y3V0TGluaztcblxuXHRcdC8vIE9ubHkgdHJ5IHRvIGNvbnN0cnVjdCBmYXZpY29uIFVSTCBpZiB3ZSBoYXZlIGEgdmFsaWQgYmFzZSBVUkxcblx0XHRpZiAoYmFzZVVybCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmV0dXJuIG5ldyBVUkwoXCIvZmF2aWNvbi5pY29cIiwgYmFzZVVybCkuaHJlZjtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKCdGYWlsZWQgdG8gY29uc3RydWN0IGZhdmljb24gVVJMOicsIGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFB1Ymxpc2hlZChkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2RhdGVQdWJsaXNoZWQnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInB1Ymxpc2hEYXRlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcImFydGljbGU6cHVibGlzaGVkX3RpbWVcIikgfHxcblx0XHRcdHRoaXMuZ2V0VGltZUVsZW1lbnQoZG9jKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmRhdGVcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldE1ldGFDb250ZW50KGRvYzogRG9jdW1lbnQsIGF0dHI6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Y29uc3Qgc2VsZWN0b3IgPSBgbWV0YVske2F0dHJ9XWA7XG5cdFx0Y29uc3QgZWxlbWVudCA9IEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuXHRcdFx0LmZpbmQoZWwgPT4gZWwuZ2V0QXR0cmlidXRlKGF0dHIpPy50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcblx0XHRjb25zdCBjb250ZW50ID0gZWxlbWVudCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKT8udHJpbSgpID8/IFwiXCIgOiBcIlwiO1xuXHRcdHJldHVybiB0aGlzLmRlY29kZUhUTUxFbnRpdGllcyhjb250ZW50LCBkb2MpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0VGltZUVsZW1lbnQoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3Qgc2VsZWN0b3IgPSBgdGltZWA7XG5cdFx0Y29uc3QgZWxlbWVudCA9IEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVswXTtcblx0XHRjb25zdCBjb250ZW50ID0gZWxlbWVudCA/IChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGV0aW1lXCIpPy50cmltKCkgPz8gZWxlbWVudC50ZXh0Q29udGVudD8udHJpbSgpID8/IFwiXCIpIDogXCJcIjtcblx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoY29udGVudCwgZG9jKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGRlY29kZUhUTUxFbnRpdGllcyh0ZXh0OiBzdHJpbmcsIGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHRleHRhcmVhID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG5cdFx0dGV4dGFyZWEuaW5uZXJIVE1MID0gdGV4dDtcblx0XHRyZXR1cm4gdGV4dGFyZWEudmFsdWU7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRTY2hlbWFQcm9wZXJ0eShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnksIHByb3BlcnR5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuXHRcdGlmICghc2NoZW1hT3JnRGF0YSkgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuXHRcdGNvbnN0IHNlYXJjaFNjaGVtYSA9IChkYXRhOiBhbnksIHByb3BzOiBzdHJpbmdbXSwgZnVsbFBhdGg6IHN0cmluZywgaXNFeGFjdE1hdGNoOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZ1tdID0+IHtcblx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0cmV0dXJuIHByb3BzLmxlbmd0aCA9PT0gMCA/IFtkYXRhXSA6IFtdO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAoIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRcdFx0Y29uc3QgY3VycmVudFByb3AgPSBwcm9wc1swXTtcblx0XHRcdFx0aWYgKC9eXFxbXFxkK1xcXSQvLnRlc3QoY3VycmVudFByb3ApKSB7XG5cdFx0XHRcdFx0Y29uc3QgaW5kZXggPSBwYXJzZUludChjdXJyZW50UHJvcC5zbGljZSgxLCAtMSkpO1xuXHRcdFx0XHRcdGlmIChkYXRhW2luZGV4XSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXJjaFNjaGVtYShkYXRhW2luZGV4XSwgcHJvcHMuc2xpY2UoMSksIGZ1bGxQYXRoLCBpc0V4YWN0TWF0Y2gpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmIChwcm9wcy5sZW5ndGggPT09IDAgJiYgZGF0YS5ldmVyeShpdGVtID0+IHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGEubWFwKFN0cmluZyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBkYXRhLmZsYXRNYXAoaXRlbSA9PiBzZWFyY2hTY2hlbWEoaXRlbSwgcHJvcHMsIGZ1bGxQYXRoLCBpc0V4YWN0TWF0Y2gpKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgW2N1cnJlbnRQcm9wLCAuLi5yZW1haW5pbmdQcm9wc10gPSBwcm9wcztcblx0XHRcdFxuXHRcdFx0aWYgKCFjdXJyZW50UHJvcCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSByZXR1cm4gW2RhdGFdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIGRhdGEubmFtZSkge1xuXHRcdFx0XHRcdHJldHVybiBbZGF0YS5uYW1lXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KGN1cnJlbnRQcm9wKSkge1xuXHRcdFx0XHRyZXR1cm4gc2VhcmNoU2NoZW1hKGRhdGFbY3VycmVudFByb3BdLCByZW1haW5pbmdQcm9wcywgXG5cdFx0XHRcdFx0ZnVsbFBhdGggPyBgJHtmdWxsUGF0aH0uJHtjdXJyZW50UHJvcH1gIDogY3VycmVudFByb3AsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzRXhhY3RNYXRjaCkge1xuXHRcdFx0XHRjb25zdCBuZXN0ZWRSZXN1bHRzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhW2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXN1bHRzID0gc2VhcmNoU2NoZW1hKGRhdGFba2V5XSwgcHJvcHMsIFxuXHRcdFx0XHRcdFx0XHRmdWxsUGF0aCA/IGAke2Z1bGxQYXRofS4ke2tleX1gIDoga2V5LCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRuZXN0ZWRSZXN1bHRzLnB1c2goLi4ucmVzdWx0cyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuZXN0ZWRSZXN1bHRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gbmVzdGVkUmVzdWx0cztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRsZXQgcmVzdWx0cyA9IHNlYXJjaFNjaGVtYShzY2hlbWFPcmdEYXRhLCBwcm9wZXJ0eS5zcGxpdCgnLicpLCAnJywgdHJ1ZSk7XG5cdFx0XHRpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmVzdWx0cyA9IHNlYXJjaFNjaGVtYShzY2hlbWFPcmdEYXRhLCBwcm9wZXJ0eS5zcGxpdCgnLicpLCAnJywgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gcmVzdWx0cy5sZW5ndGggPiAwID8gcmVzdWx0cy5maWx0ZXIoQm9vbGVhbikuam9pbignLCAnKSA6IGRlZmF1bHRWYWx1ZTtcblx0XHRcdHJldHVybiB0aGlzLmRlY29kZUhUTUxFbnRpdGllcyhyZXN1bHQsIGRvYyk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGdldFNjaGVtYVByb3BlcnR5IGZvciAke3Byb3BlcnR5fTpgLCBlcnJvcik7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBleHRyYWN0U2NoZW1hT3JnRGF0YShkb2M6IERvY3VtZW50KTogYW55IHtcblx0XHRjb25zdCBzY2hlbWFTY3JpcHRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwiYXBwbGljYXRpb24vbGQranNvblwiXScpO1xuXHRcdGNvbnN0IHNjaGVtYURhdGE6IGFueVtdID0gW107XG5cblx0XHRzY2hlbWFTY3JpcHRzLmZvckVhY2goc2NyaXB0ID0+IHtcblx0XHRcdGxldCBqc29uQ29udGVudCA9IHNjcmlwdC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0anNvbkNvbnRlbnQgPSBqc29uQ29udGVudFxuXHRcdFx0XHRcdC5yZXBsYWNlKC9cXC9cXCpbXFxzXFxTXSo/XFwqXFwvfF5cXHMqXFwvXFwvLiokL2dtLCAnJylcblx0XHRcdFx0XHQucmVwbGFjZSgvXlxccyo8IVxcW0NEQVRBXFxbKFtcXHNcXFNdKj8pXFxdXFxdPlxccyokLywgJyQxJylcblx0XHRcdFx0XHQucmVwbGFjZSgvXlxccyooXFwqXFwvfFxcL1xcKilcXHMqfFxccyooXFwqXFwvfFxcL1xcKilcXHMqJC9nLCAnJylcblx0XHRcdFx0XHQudHJpbSgpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRjb25zdCBqc29uRGF0YSA9IEpTT04ucGFyc2UoanNvbkNvbnRlbnQpO1xuXG5cdFx0XHRcdGlmIChqc29uRGF0YVsnQGdyYXBoJ10gJiYgQXJyYXkuaXNBcnJheShqc29uRGF0YVsnQGdyYXBoJ10pKSB7XG5cdFx0XHRcdFx0c2NoZW1hRGF0YS5wdXNoKC4uLmpzb25EYXRhWydAZ3JhcGgnXSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2NoZW1hRGF0YS5wdXNoKGpzb25EYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3IgcGFyc2luZyBzY2hlbWEub3JnIGRhdGE6JywgZXJyb3IpO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdQcm9ibGVtYXRpYyBKU09OIGNvbnRlbnQ6JywganNvbkNvbnRlbnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHNjaGVtYURhdGE7XG5cdH1cbn0iLCJpbXBvcnQgeyBNZXRhZGF0YUV4dHJhY3RvciB9IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IHsgRGVmdWRkbGVPcHRpb25zLCBEZWZ1ZGRsZVJlc3BvbnNlLCBEZWZ1ZGRsZU1ldGFkYXRhIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBcblx0SElEREVOX0VMRU1FTlRfU0VMRUNUT1JTLFxuXHRNT0JJTEVfV0lEVEgsXG5cdEJMT0NLX0VMRU1FTlRTLFxuXHRQUkVTRVJWRV9FTEVNRU5UUyxcblx0SU5MSU5FX0VMRU1FTlRTLFxuXHRTVVBQT1JURURfTEFOR1VBR0VTLFxuXHRBTExPV0VEX0FUVFJJQlVURVMsXG5cdEFMTE9XRURfQVRUUklCVVRFU19ERUJVRyxcblx0RVhBQ1RfU0VMRUNUT1JTLFxuXHRQQVJUSUFMX1NFTEVDVE9SUyxcblx0Rk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMsXG5cdEZPT1ROT1RFX0lOTElORV9SRUZFUkVOQ0VTLFxuXHRFTlRSWV9QT0lOVF9FTEVNRU5UUyxcblx0QUxMT1dFRF9FTVBUWV9FTEVNRU5UU1xufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8vIEVsZW1lbnQgc3RhbmRhcmRpemF0aW9uIHJ1bGVzXG4vLyBNYXBzIHNlbGVjdG9ycyB0byB0aGVpciB0YXJnZXQgSFRNTCBlbGVtZW50IG5hbWVcbmludGVyZmFjZSBTdGFuZGFyZGl6YXRpb25SdWxlIHtcblx0c2VsZWN0b3I6IHN0cmluZztcblx0ZWxlbWVudDogc3RyaW5nO1xuXHR0cmFuc2Zvcm0/OiAoZWw6IEVsZW1lbnQpID0+IEVsZW1lbnQ7XG59XG5cbmNvbnN0IEVMRU1FTlRfU1RBTkRBUkRJWkFUSU9OX1JVTEVTOiBTdGFuZGFyZGl6YXRpb25SdWxlW10gPSBbXG5cdC8vIENvZGUgYmxvY2tzXG5cdHtcblx0XHRzZWxlY3RvcjogJ3ByZScsXG5cdFx0ZWxlbWVudDogJ3ByZScsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm4gZWw7XG5cblx0XHRcdC8vIEZ1bmN0aW9uIHRvIGdldCBsYW5ndWFnZSBmcm9tIGNsYXNzXG5cdFx0XHRjb25zdCBnZXRMYW5ndWFnZUZyb21DbGFzcyA9IChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyA9PiB7XG5cdFx0XHRcdC8vIENoZWNrIGRhdGEtbGFuZyBhdHRyaWJ1dGUgZmlyc3Rcblx0XHRcdFx0Y29uc3QgZGF0YUxhbmcgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1sYW5nJyk7XG5cdFx0XHRcdGlmIChkYXRhTGFuZykge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhTGFuZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRGVmaW5lIGxhbmd1YWdlIHBhdHRlcm5zXG5cdFx0XHRcdGNvbnN0IGxhbmd1YWdlUGF0dGVybnMgPSBbXG5cdFx0XHRcdFx0L15sYW5ndWFnZS0oXFx3KykkLywgICAgICAgICAgLy8gbGFuZ3VhZ2UtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9ebGFuZy0oXFx3KykkLywgICAgICAgICAgICAgIC8vIGxhbmctamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9eKFxcdyspLWNvZGUkLywgICAgICAgICAgICAgIC8vIGphdmFzY3JpcHQtY29kZVxuXHRcdFx0XHRcdC9eY29kZS0oXFx3KykkLywgICAgICAgICAgICAgIC8vIGNvZGUtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9ec3ludGF4LShcXHcrKSQvLCAgICAgICAgICAgIC8vIHN5bnRheC1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15jb2RlLXNuaXBwZXRfXyhcXHcrKSQvLCAgICAgLy8gY29kZS1zbmlwcGV0X19qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15oaWdobGlnaHQtKFxcdyspJC8sICAgICAgICAgLy8gaGlnaGxpZ2h0LWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXihcXHcrKS1zbmlwcGV0JC8gICAgICAgICAgICAvLyBqYXZhc2NyaXB0LXNuaXBwZXRcblx0XHRcdFx0XTtcblxuXHRcdFx0XHQvLyBUaGVuIGNoZWNrIHRoZSBjbGFzcyBhdHRyaWJ1dGUgZm9yIHBhdHRlcm5zXG5cdFx0XHRcdGlmIChlbGVtZW50LmNsYXNzTmFtZSAmJiB0eXBlb2YgZWxlbWVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIGxhbmd1YWdlUGF0dGVybnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKS5tYXRjaChwYXR0ZXJuKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gVGhlbiBjaGVjayBmb3Igc3VwcG9ydGVkIGxhbmd1YWdlXG5cdFx0XHRcdFx0aWYgKFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBjbGFzc05hbWVzID0gQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRmb3IgKGNvbnN0IGNsYXNzTmFtZSBvZiBjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgcGF0dGVybnMgZmlyc3Rcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHBhdHRlcm4gb2YgbGFuZ3VhZ2VQYXR0ZXJucykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBjbGFzc05hbWUubWF0Y2gocGF0dGVybik7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gT25seSBjaGVjayBiYXJlIGxhbmd1YWdlIG5hbWVzIGlmIG5vIHBhdHRlcm5zIHdlcmUgZm91bmRcblx0XHRcdFx0Zm9yIChjb25zdCBjbGFzc05hbWUgb2YgY2xhc3NOYW1lcykge1xuXHRcdFx0XHRcdGlmIChTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhjbGFzc05hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBUcnkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBmcm9tIHRoZSBlbGVtZW50IGFuZCBpdHMgYW5jZXN0b3JzXG5cdFx0XHRsZXQgbGFuZ3VhZ2UgPSAnJztcblx0XHRcdGxldCBjdXJyZW50RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZWw7XG5cdFx0XHRcblx0XHRcdHdoaWxlIChjdXJyZW50RWxlbWVudCAmJiAhbGFuZ3VhZ2UpIHtcblx0XHRcdFx0bGFuZ3VhZ2UgPSBnZXRMYW5ndWFnZUZyb21DbGFzcyhjdXJyZW50RWxlbWVudCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBBbHNvIGNoZWNrIGZvciBjb2RlIGVsZW1lbnRzIHdpdGhpbiB0aGUgY3VycmVudCBlbGVtZW50XG5cdFx0XHRcdGlmICghbGFuZ3VhZ2UgJiYgY3VycmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignY29kZScpKSB7XG5cdFx0XHRcdFx0bGFuZ3VhZ2UgPSBnZXRMYW5ndWFnZUZyb21DbGFzcyhjdXJyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjb2RlJykhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Y3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGdW5jdGlvbiB0byByZWN1cnNpdmVseSBleHRyYWN0IHRleHQgY29udGVudCB3aGlsZSBwcmVzZXJ2aW5nIHN0cnVjdHVyZVxuXHRcdFx0Y29uc3QgZXh0cmFjdFN0cnVjdHVyZWRUZXh0ID0gKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcgPT4ge1xuXHRcdFx0XHRpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0bGV0IHRleHQgPSAnJztcblx0XHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuXHRcdFx0XHRcdC8vIEhhbmRsZSBsaW5lIGJyZWFrc1xuXHRcdFx0XHRcdGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdCUicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnXFxuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gSGFuZGxlIGNvZGUgZWxlbWVudHMgYW5kIHRoZWlyIGNoaWxkcmVuXG5cdFx0XHRcdFx0ZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuXHRcdFx0XHRcdFx0dGV4dCArPSBleHRyYWN0U3RydWN0dXJlZFRleHQoY2hpbGQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIEFkZCBuZXdsaW5lIGFmdGVyIGVhY2ggY29kZSBlbGVtZW50XG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0NPREUnKSB7XG5cdFx0XHRcdFx0XHR0ZXh0ICs9ICdcXG4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGV4dDtcblx0XHRcdH07XG5cblx0XHRcdC8vIEV4dHJhY3QgYWxsIHRleHQgY29udGVudFxuXHRcdFx0bGV0IGNvZGVDb250ZW50ID0gZXh0cmFjdFN0cnVjdHVyZWRUZXh0KGVsKTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgdGhlIGNvbnRlbnRcblx0XHRcdGNvZGVDb250ZW50ID0gY29kZUNvbnRlbnRcblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSBleHRyYSBuZXdsaW5lcyBhdCB0aGUgc3RhcnRcblx0XHRcdFx0LnJlcGxhY2UoL15cXG4rLywgJycpXG5cdFx0XHRcdC8vIFJlbW92ZSBhbnkgZXh0cmEgbmV3bGluZXMgYXQgdGhlIGVuZFxuXHRcdFx0XHQucmVwbGFjZSgvXFxuKyQvLCAnJylcblx0XHRcdFx0Ly8gUmVwbGFjZSBtdWx0aXBsZSBjb25zZWN1dGl2ZSBuZXdsaW5lcyB3aXRoIGEgc2luZ2xlIG5ld2xpbmVcblx0XHRcdFx0LnJlcGxhY2UoL1xcbnszLH0vZywgJ1xcblxcbicpO1xuXG5cdFx0XHQvLyBDcmVhdGUgbmV3IHByZSBlbGVtZW50XG5cdFx0XHRjb25zdCBuZXdQcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdG5ld1ByZS5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIENyZWF0ZSBjb2RlIGVsZW1lbnRcblx0XHRcdGNvbnN0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG5cdFx0XHRpZiAobGFuZ3VhZ2UpIHtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZycsIGxhbmd1YWdlKTtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYGxhbmd1YWdlLSR7bGFuZ3VhZ2V9YCk7XG5cdFx0XHR9XG5cdFx0XHRjb2RlLnRleHRDb250ZW50ID0gY29kZUNvbnRlbnQ7XG5cdFx0XHRcblx0XHRcdG5ld1ByZS5hcHBlbmRDaGlsZChjb2RlKTtcblx0XHRcdHJldHVybiBuZXdQcmU7XG5cdFx0fVxuXHR9LFxuXHQvLyBTaW1wbGlmeSBoZWFkaW5ncyBieSByZW1vdmluZyBpbnRlcm5hbCBuYXZpZ2F0aW9uIGVsZW1lbnRzXG5cdHtcblx0XHRzZWxlY3RvcjogJ2gxLCBoMiwgaDMsIGg0LCBoNSwgaDYnLFxuXHRcdGVsZW1lbnQ6ICdrZWVwJyxcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Ly8gSWYgaGVhZGluZyBvbmx5IGNvbnRhaW5zIGEgc2luZ2xlIGFuY2hvciB3aXRoIGludGVybmFsIGxpbmtcblx0XHRcdGlmIChlbC5jaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgXG5cdFx0XHRcdGVsLmZpcnN0RWxlbWVudENoaWxkPy50YWdOYW1lID09PSAnQScgJiZcblx0XHRcdFx0KGVsLmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpPy5pbmNsdWRlcygnIycpIHx8IFxuXHRcdFx0XHQgZWwuZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJyk/LnN0YXJ0c1dpdGgoJyMnKSkpIHtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENyZWF0ZSBuZXcgaGVhZGluZyBvZiBzYW1lIGxldmVsXG5cdFx0XHRcdGNvbnN0IG5ld0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsLnRhZ05hbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXMgZnJvbSBvcmlnaW5hbCBoZWFkaW5nXG5cdFx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0XHRuZXdIZWFkaW5nLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBKdXN0IHVzZSB0aGUgdGV4dCBjb250ZW50XG5cdFx0XHRcdG5ld0hlYWRpbmcudGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIG5ld0hlYWRpbmc7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vIElmIGhlYWRpbmcgY29udGFpbnMgbmF2aWdhdGlvbiBidXR0b25zIG9yIG90aGVyIHV0aWxpdHkgZWxlbWVudHNcblx0XHRcdGNvbnN0IGJ1dHRvbnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblx0XHRcdGlmIChidXR0b25zLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3QgbmV3SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwudGFnTmFtZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlc1xuXHRcdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdFx0bmV3SGVhZGluZy5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gSnVzdCB1c2UgdGhlIHRleHQgY29udGVudFxuXHRcdFx0XHRuZXdIZWFkaW5nLnRleHRDb250ZW50ID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBuZXdIZWFkaW5nO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fVxuXHR9LFxuXHQvLyBDb252ZXJ0IGRpdnMgd2l0aCBwYXJhZ3JhcGggcm9sZSB0byBhY3R1YWwgcGFyYWdyYXBoc1xuXHR7IFxuXHRcdHNlbGVjdG9yOiAnZGl2W2RhdGEtdGVzdGlkXj1cInBhcmFncmFwaFwiXSwgZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nLCBcblx0XHRlbGVtZW50OiAncCcsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcblx0XHRcdC8vIENvcHkgaW5uZXJIVE1MXG5cdFx0XHRwLmlubmVySFRNTCA9IGVsLmlubmVySFRNTDtcblx0XHRcdFxuXHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdHAuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gcDtcblx0XHR9XG5cdH0sXG5cdC8vIENvbnZlcnQgZGl2cyB3aXRoIGxpc3Qgcm9sZXMgdG8gYWN0dWFsIGxpc3RzXG5cdHsgXG5cdFx0c2VsZWN0b3I6ICdkaXZbcm9sZT1cImxpc3RcIl0nLCBcblx0XHRlbGVtZW50OiAndWwnLFxuXHRcdC8vIEN1c3RvbSBoYW5kbGVyIGZvciBsaXN0IHR5cGUgZGV0ZWN0aW9uIGFuZCB0cmFuc2Zvcm1hdGlvblxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHQvLyBGaXJzdCBkZXRlcm1pbmUgaWYgdGhpcyBpcyBhbiBvcmRlcmVkIGxpc3Rcblx0XHRcdGNvbnN0IGZpcnN0SXRlbSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0gLmxhYmVsJyk7XG5cdFx0XHRjb25zdCBsYWJlbCA9IGZpcnN0SXRlbT8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdGNvbnN0IGlzT3JkZXJlZCA9IGxhYmVsLm1hdGNoKC9eXFxkK1xcKS8pO1xuXHRcdFx0XG5cdFx0XHQvLyBDcmVhdGUgdGhlIGFwcHJvcHJpYXRlIGxpc3QgdHlwZVxuXHRcdFx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXNPcmRlcmVkID8gJ29sJyA6ICd1bCcpO1xuXHRcdFx0XG5cdFx0XHQvLyBQcm9jZXNzIGVhY2ggbGlzdCBpdGVtXG5cdFx0XHRjb25zdCBpdGVtcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0nKTtcblx0XHRcdGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRcdGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRcdFx0Y29uc3QgY29udGVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChjb250ZW50KSB7XG5cdFx0XHRcdFx0Ly8gQ29udmVydCBhbnkgcGFyYWdyYXBoIGRpdnMgaW5zaWRlIGNvbnRlbnRcblx0XHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhEaXZzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cInBhcmFncmFwaFwiXScpO1xuXHRcdFx0XHRcdHBhcmFncmFwaERpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0XHRcdHAuaW5uZXJIVE1MID0gZGl2LmlubmVySFRNTDtcblx0XHRcdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChwKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBDb252ZXJ0IGFueSBuZXN0ZWQgbGlzdHMgcmVjdXJzaXZlbHlcblx0XHRcdFx0XHRjb25zdCBuZXN0ZWRMaXN0cyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJsaXN0XCJdJyk7XG5cdFx0XHRcdFx0bmVzdGVkTGlzdHMuZm9yRWFjaChuZXN0ZWRMaXN0ID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGZpcnN0TmVzdGVkSXRlbSA9IG5lc3RlZExpc3QucXVlcnlTZWxlY3RvcignZGl2W3JvbGU9XCJsaXN0aXRlbVwiXSAubGFiZWwnKTtcblx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZExhYmVsID0gZmlyc3ROZXN0ZWRJdGVtPy50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRcdFx0Y29uc3QgaXNOZXN0ZWRPcmRlcmVkID0gbmVzdGVkTGFiZWwubWF0Y2goL15cXGQrXFwpLyk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGNvbnN0IG5ld05lc3RlZExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGlzTmVzdGVkT3JkZXJlZCA/ICdvbCcgOiAndWwnKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gUHJvY2VzcyBuZXN0ZWQgaXRlbXNcblx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZEl0ZW1zID0gbmVzdGVkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRcdFx0XHRuZXN0ZWRJdGVtcy5mb3JFYWNoKG5lc3RlZEl0ZW0gPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZENvbnRlbnQgPSBuZXN0ZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRpZiAobmVzdGVkQ29udGVudCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIENvbnZlcnQgcGFyYWdyYXBoIGRpdnMgaW4gbmVzdGVkIGl0ZW1zXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkUGFyYWdyYXBocyA9IG5lc3RlZENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nKTtcblx0XHRcdFx0XHRcdFx0XHRuZXN0ZWRQYXJhZ3JhcGhzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRwLmlubmVySFRNTCA9IGRpdi5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0bmVzdGVkTGkuaW5uZXJIVE1MID0gbmVzdGVkQ29udGVudC5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdG5ld05lc3RlZExpc3QuYXBwZW5kQ2hpbGQobmVzdGVkTGkpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdG5lc3RlZExpc3QucmVwbGFjZVdpdGgobmV3TmVzdGVkTGlzdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0bGkuaW5uZXJIVE1MID0gY29udGVudC5pbm5lckhUTUw7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiBsaXN0O1xuXHRcdH1cblx0fSxcblx0eyBcblx0XHRzZWxlY3RvcjogJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0nLCBcblx0XHRlbGVtZW50OiAnbGknLFxuXHRcdC8vIEN1c3RvbSBoYW5kbGVyIGZvciBsaXN0IGl0ZW0gY29udGVudFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRjb25zdCBjb250ZW50ID0gZWwucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblx0XHRcdGlmICghY29udGVudCkgcmV0dXJuIGVsO1xuXHRcdFx0XG5cdFx0XHQvLyBDb252ZXJ0IGFueSBwYXJhZ3JhcGggZGl2cyBpbnNpZGUgY29udGVudFxuXHRcdFx0Y29uc3QgcGFyYWdyYXBoRGl2cyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nKTtcblx0XHRcdHBhcmFncmFwaERpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRwLmlubmVySFRNTCA9IGRpdi5pbm5lckhUTUw7XG5cdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChwKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHR9XG5cdH0sXG5cdC8vIENvZGUgYmxvY2tzIHdpdGggc3ludGF4IGhpZ2hsaWdodGluZ1xuXHR7XG5cdFx0c2VsZWN0b3I6ICcud3AtYmxvY2stc3ludGF4aGlnaGxpZ2h0ZXItY29kZSwgLnN5bnRheGhpZ2hsaWdodGVyLCAuaGlnaGxpZ2h0LCAuaGlnaGxpZ2h0LXNvdXJjZSwgLndwLWJsb2NrLWNvZGUsIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIHByZVtjbGFzcyo9XCJicnVzaDpcIl0nLFxuXHRcdGVsZW1lbnQ6ICdwcmUnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuIGVsO1xuXG5cdFx0XHQvLyBDcmVhdGUgbmV3IHByZSBlbGVtZW50XG5cdFx0XHRjb25zdCBuZXdQcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcblx0XHRcdFxuXHRcdFx0Ly8gVHJ5IHRvIGRldGVjdCBsYW5ndWFnZVxuXHRcdFx0bGV0IGxhbmd1YWdlID0gJyc7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGZvciBXb3JkUHJlc3Mgc3ludGF4IGhpZ2hsaWdodGVyIHNwZWNpZmljIGZvcm1hdFxuXHRcdFx0Y29uc3Qgc3ludGF4RWwgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc3ludGF4aGlnaGxpZ2h0ZXInKTtcblx0XHRcdGlmIChzeW50YXhFbCkge1xuXHRcdFx0XHQvLyBHZXQgbGFuZ3VhZ2UgZnJvbSBzeW50YXhoaWdobGlnaHRlciBjbGFzc1xuXHRcdFx0XHRjb25zdCBjbGFzc2VzID0gQXJyYXkuZnJvbShzeW50YXhFbC5jbGFzc0xpc3QpO1xuXHRcdFx0XHRjb25zdCBsYW5nQ2xhc3MgPSBjbGFzc2VzLmZpbmQoYyA9PiAhWydzeW50YXhoaWdobGlnaHRlcicsICdub2d1dHRlciddLmluY2x1ZGVzKGMpKTtcblx0XHRcdFx0aWYgKGxhbmdDbGFzcyAmJiBTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhsYW5nQ2xhc3MudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRsYW5ndWFnZSA9IGxhbmdDbGFzcy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIG5vIGxhbmd1YWdlIGZvdW5kIHlldCwgY2hlY2sgb3RoZXIgY29tbW9uIHBhdHRlcm5zXG5cdFx0XHRpZiAoIWxhbmd1YWdlKSB7XG5cdFx0XHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBBcnJheS5mcm9tKGVsLmNsYXNzTGlzdCk7XG5cdFx0XHRcdGNvbnN0IGxhbmd1YWdlUGF0dGVybnMgPSBbXG5cdFx0XHRcdFx0Lyg/Ol58XFxzKSg/Omxhbmd1YWdlfGxhbmd8YnJ1c2h8c3ludGF4KS0oXFx3KykoPzpcXHN8JCkvaSxcblx0XHRcdFx0XHQvKD86XnxcXHMpKFxcdyspKD86XFxzfCQpL2lcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IGNsYXNzTmFtZSBvZiBjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIGxhbmd1YWdlUGF0dGVybnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gY2xhc3NOYW1lLm1hdGNoKHBhdHRlcm4pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoICYmIG1hdGNoWzFdICYmIFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChsYW5ndWFnZSkgYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRXh0cmFjdCBjb2RlIGNvbnRlbnQsIGhhbmRsaW5nIHZhcmlvdXMgZm9ybWF0c1xuXHRcdFx0bGV0IGNvZGVDb250ZW50ID0gJyc7XG5cblx0XHRcdC8vIEhhbmRsZSBXb3JkUHJlc3Mgc3ludGF4IGhpZ2hsaWdodGVyIHRhYmxlIGZvcm1hdFxuXHRcdFx0Y29uc3QgY29kZUNvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zeW50YXhoaWdobGlnaHRlciB0YWJsZSAuY29kZSAuY29udGFpbmVyJyk7XG5cdFx0XHRpZiAoY29kZUNvbnRhaW5lcikge1xuXHRcdFx0XHQvLyBQcm9jZXNzIGVhY2ggbGluZVxuXHRcdFx0XHRjb25zdCBsaW5lcyA9IEFycmF5LmZyb20oY29kZUNvbnRhaW5lci5jaGlsZHJlbik7XG5cdFx0XHRcdGNvZGVDb250ZW50ID0gbGluZXNcblx0XHRcdFx0XHQubWFwKGxpbmUgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gR2V0IGFsbCBjb2RlIGVsZW1lbnRzIGluIHRoaXMgbGluZVxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZVBhcnRzID0gQXJyYXkuZnJvbShsaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvZGUnKSlcblx0XHRcdFx0XHRcdFx0Lm1hcChjb2RlID0+IHtcblx0XHRcdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHRleHQgY29udGVudCwgcHJlc2VydmluZyBzcGFjZXNcblx0XHRcdFx0XHRcdFx0XHRsZXQgdGV4dCA9IGNvZGUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhpcyBpcyBhICdzcGFjZXMnIGNsYXNzIGVsZW1lbnQsIGNvbnZlcnQgdG8gYWN0dWFsIHNwYWNlc1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjb2RlLmNsYXNzTGlzdC5jb250YWlucygnc3BhY2VzJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRleHQgPSAnICcucmVwZWF0KHRleHQubGVuZ3RoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5qb2luKCcnKTtcblx0XHRcdFx0XHRcdHJldHVybiBjb2RlUGFydHMgfHwgbGluZS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEhhbmRsZSBXb3JkUHJlc3Mgc3ludGF4IGhpZ2hsaWdodGVyIG5vbi10YWJsZSBmb3JtYXRcblx0XHRcdFx0Y29uc3QgY29kZUxpbmVzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLmNvZGUgLmxpbmUnKTtcblx0XHRcdFx0aWYgKGNvZGVMaW5lcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29kZUNvbnRlbnQgPSBBcnJheS5mcm9tKGNvZGVMaW5lcylcblx0XHRcdFx0XHRcdC5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGNvZGVQYXJ0cyA9IEFycmF5LmZyb20obGluZS5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlJykpXG5cdFx0XHRcdFx0XHRcdFx0Lm1hcChjb2RlID0+IGNvZGUudGV4dENvbnRlbnQgfHwgJycpXG5cdFx0XHRcdFx0XHRcdFx0LmpvaW4oJycpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29kZVBhcnRzIHx8IGxpbmUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEZhbGxiYWNrIHRvIHJlZ3VsYXIgdGV4dCBjb250ZW50XG5cdFx0XHRcdFx0Y29kZUNvbnRlbnQgPSBlbC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBDbGVhbiB1cCB0aGUgY29udGVudFxuXHRcdFx0Y29kZUNvbnRlbnQgPSBjb2RlQ29udGVudFxuXHRcdFx0XHQucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpIC8vIFRyaW0gc3RhcnQvZW5kIHdoaXRlc3BhY2Vcblx0XHRcdFx0LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpIC8vIENvbnZlcnQgdGFicyB0byBzcGFjZXNcblx0XHRcdFx0LnJlcGxhY2UoL1xcbnszLH0vZywgJ1xcblxcbicpIC8vIE5vcm1hbGl6ZSBtdWx0aXBsZSBuZXdsaW5lc1xuXHRcdFx0XHQucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpOyAvLyBSZXBsYWNlIG5vbi1icmVha2luZyBzcGFjZXMgd2l0aCByZWd1bGFyIHNwYWNlc1xuXG5cdFx0XHQvLyBDcmVhdGUgY29kZSBlbGVtZW50IHdpdGggbGFuZ3VhZ2UgY2xhc3MgaWYgZGV0ZWN0ZWRcblx0XHRcdGNvbnN0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG5cdFx0XHRpZiAobGFuZ3VhZ2UpIHtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZycsIGxhbmd1YWdlKTtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYGxhbmd1YWdlLSR7bGFuZ3VhZ2V9YCk7XG5cdFx0XHR9XG5cdFx0XHRjb2RlLnRleHRDb250ZW50ID0gY29kZUNvbnRlbnQ7XG5cdFx0XHRcblx0XHRcdG5ld1ByZS5hcHBlbmRDaGlsZChjb2RlKTtcblx0XHRcdHJldHVybiBuZXdQcmU7XG5cdFx0fVxuXHR9XG5dO1xuXG5pbnRlcmZhY2UgRm9vdG5vdGVEYXRhIHtcblx0Y29udGVudDogRWxlbWVudCB8IHN0cmluZztcblx0b3JpZ2luYWxJZDogc3RyaW5nO1xuXHRyZWZzOiBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIEZvb3Rub3RlQ29sbGVjdGlvbiB7XG5cdFtmb290bm90ZU51bWJlcjogbnVtYmVyXTogRm9vdG5vdGVEYXRhO1xufVxuXG5pbnRlcmZhY2UgQ29udGVudFNjb3JlIHtcblx0c2NvcmU6IG51bWJlcjtcblx0ZWxlbWVudDogRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIFN0eWxlQ2hhbmdlIHtcblx0c2VsZWN0b3I6IHN0cmluZztcblx0c3R5bGVzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZ1ZGRsZSB7XG5cdHByaXZhdGUgZG9jOiBEb2N1bWVudDtcblx0cHJpdmF0ZSBvcHRpb25zOiBEZWZ1ZGRsZU9wdGlvbnM7XG5cdHByaXZhdGUgZGVidWc6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBEZWZ1ZGRsZSBpbnN0YW5jZVxuXHQgKiBAcGFyYW0gZG9jIC0gVGhlIGRvY3VtZW50IHRvIHBhcnNlXG5cdCAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgcGFyc2luZ1xuXHQgKi9cblx0Y29uc3RydWN0b3IoZG9jOiBEb2N1bWVudCwgb3B0aW9uczogRGVmdWRkbGVPcHRpb25zID0ge30pIHtcblx0XHR0aGlzLmRvYyA9IGRvYztcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuZGVidWcgPSBvcHRpb25zLmRlYnVnIHx8IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIHRoZSBkb2N1bWVudCBhbmQgZXh0cmFjdCBpdHMgbWFpbiBjb250ZW50XG5cdCAqL1xuXHRwYXJzZSgpOiBEZWZ1ZGRsZVJlc3BvbnNlIHtcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuXHRcdC8vIEV4dHJhY3QgbWV0YWRhdGEgZmlyc3Qgc2luY2Ugd2UnbGwgbmVlZCBpdCBpbiBtdWx0aXBsZSBwbGFjZXNcblx0XHRjb25zdCBzY2hlbWFPcmdEYXRhID0gTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdFNjaGVtYU9yZ0RhdGEodGhpcy5kb2MpO1xuXHRcdGNvbnN0IG1ldGFkYXRhID0gTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdCh0aGlzLmRvYywgc2NoZW1hT3JnRGF0YSk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gRXZhbHVhdGUgc3R5bGVzIGFuZCBzaXplcyBvbiBvcmlnaW5hbCBkb2N1bWVudFxuXHRcdFx0Y29uc3QgbW9iaWxlU3R5bGVzID0gdGhpcy5fZXZhbHVhdGVNZWRpYVF1ZXJpZXModGhpcy5kb2MpO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBmb3Igc21hbGwgaW1hZ2VzIGluIG9yaWdpbmFsIGRvY3VtZW50LCBleGNsdWRpbmcgbGF6eS1sb2FkZWQgb25lc1xuXHRcdFx0Y29uc3Qgc21hbGxJbWFnZXMgPSB0aGlzLmZpbmRTbWFsbEltYWdlcyh0aGlzLmRvYyk7XG5cdFx0XHRcblx0XHRcdC8vIENsb25lIGRvY3VtZW50XG5cdFx0XHRjb25zdCBjbG9uZSA9IHRoaXMuZG9jLmNsb25lTm9kZSh0cnVlKSBhcyBEb2N1bWVudDtcblx0XHRcdFxuXHRcdFx0Ly8gQXBwbHkgbW9iaWxlIHN0eWxlIHRvIGNsb25lXG5cdFx0XHR0aGlzLmFwcGx5TW9iaWxlU3R5bGVzKGNsb25lLCBtb2JpbGVTdHlsZXMpO1xuXG5cdFx0XHQvLyBGaW5kIG1haW4gY29udGVudFxuXHRcdFx0Y29uc3QgbWFpbkNvbnRlbnQgPSB0aGlzLmZpbmRNYWluQ29udGVudChjbG9uZSk7XG5cdFx0XHRpZiAoIW1haW5Db250ZW50KSB7XG5cdFx0XHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRjb250ZW50OiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTCxcblx0XHRcdFx0XHQuLi5tZXRhZGF0YSxcblx0XHRcdFx0XHR3b3JkQ291bnQ6IHRoaXMuY291bnRXb3Jkcyh0aGlzLmRvYy5ib2R5LmlubmVySFRNTCksXG5cdFx0XHRcdFx0cGFyc2VUaW1lOiBNYXRoLnJvdW5kKGVuZFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBzbWFsbCBpbWFnZXMgaWRlbnRpZmllZCBmcm9tIG9yaWdpbmFsIGRvY3VtZW50XG5cdFx0XHR0aGlzLnJlbW92ZVNtYWxsSW1hZ2VzKGNsb25lLCBzbWFsbEltYWdlcyk7XG5cdFx0XHRcblx0XHRcdC8vIFBlcmZvcm0gb3RoZXIgZGVzdHJ1Y3RpdmUgb3BlcmF0aW9ucyBvbiB0aGUgY2xvbmVcblx0XHRcdHRoaXMucmVtb3ZlSGlkZGVuRWxlbWVudHMoY2xvbmUpO1xuXHRcdFx0dGhpcy5yZW1vdmVDbHV0dGVyKGNsb25lKTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgdGhlIG1haW4gY29udGVudFxuXHRcdFx0dGhpcy5jbGVhbkNvbnRlbnQobWFpbkNvbnRlbnQsIG1ldGFkYXRhKTtcblxuXHRcdFx0Y29uc3QgY29udGVudCA9IG1haW5Db250ZW50ID8gbWFpbkNvbnRlbnQub3V0ZXJIVE1MIDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUw7XG5cdFx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvbnRlbnQsXG5cdFx0XHRcdC4uLm1ldGFkYXRhLFxuXHRcdFx0XHR3b3JkQ291bnQ6IHRoaXMuY291bnRXb3Jkcyhjb250ZW50KSxcblx0XHRcdFx0cGFyc2VUaW1lOiBNYXRoLnJvdW5kKGVuZFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZScsICdFcnJvciBwcm9jZXNzaW5nIGRvY3VtZW50OicsIGVycm9yKTtcblx0XHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvbnRlbnQ6IHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MLFxuXHRcdFx0XHQuLi5tZXRhZGF0YSxcblx0XHRcdFx0d29yZENvdW50OiB0aGlzLmNvdW50V29yZHModGhpcy5kb2MuYm9keS5pbm5lckhUTUwpLFxuXHRcdFx0XHRwYXJzZVRpbWU6IE1hdGgucm91bmQoZW5kVGltZSAtIHN0YXJ0VGltZSlcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBjb3VudFdvcmRzKGNvbnRlbnQ6IHN0cmluZyk6IG51bWJlciB7XG5cdFx0Ly8gQ3JlYXRlIGEgdGVtcG9yYXJ5IGRpdiB0byBwYXJzZSBIVE1MIGNvbnRlbnRcblx0XHRjb25zdCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dGVtcERpdi5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdFx0Ly8gR2V0IHRleHQgY29udGVudCwgcmVtb3ZpbmcgZXh0cmEgd2hpdGVzcGFjZVxuXHRcdGNvbnN0IHRleHQgPSB0ZW1wRGl2LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdGNvbnN0IHdvcmRzID0gdGV4dFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL1xccysvZywgJyAnKSAvLyBSZXBsYWNlIG11bHRpcGxlIHNwYWNlcyB3aXRoIHNpbmdsZSBzcGFjZVxuXHRcdFx0LnNwbGl0KCcgJylcblx0XHRcdC5maWx0ZXIod29yZCA9PiB3b3JkLmxlbmd0aCA+IDApOyAvLyBGaWx0ZXIgb3V0IGVtcHR5IHN0cmluZ3NcblxuXHRcdHJldHVybiB3b3Jkcy5sZW5ndGg7XG5cdH1cblxuXHQvLyBNYWtlIGFsbCBvdGhlciBtZXRob2RzIHByaXZhdGUgYnkgcmVtb3ZpbmcgdGhlIHN0YXRpYyBrZXl3b3JkIGFuZCB1c2luZyBwcml2YXRlXG5cdHByaXZhdGUgX2xvZyguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnRGVmdWRkbGU6JywgLi4uYXJncyk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZXZhbHVhdGVNZWRpYVF1ZXJpZXMoZG9jOiBEb2N1bWVudCk6IFN0eWxlQ2hhbmdlW10ge1xuXHRcdGNvbnN0IG1vYmlsZVN0eWxlczogU3R5bGVDaGFuZ2VbXSA9IFtdO1xuXHRcdGNvbnN0IG1heFdpZHRoUmVnZXggPSAvbWF4LXdpZHRoW146XSo6XFxzKihcXGQrKS87XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gR2V0IGFsbCBzdHlsZXMsIGluY2x1ZGluZyBpbmxpbmUgc3R5bGVzXG5cdFx0XHRjb25zdCBzaGVldHMgPSBBcnJheS5mcm9tKGRvYy5zdHlsZVNoZWV0cykuZmlsdGVyKHNoZWV0ID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBBY2Nlc3MgcnVsZXMgb25jZSB0byBjaGVjayB2YWxpZGl0eVxuXHRcdFx0XHRcdHNoZWV0LmNzc1J1bGVzO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Ly8gRXhwZWN0ZWQgZXJyb3IgZm9yIGNyb3NzLW9yaWdpbiBzdHlsZXNoZWV0c1xuXHRcdFx0XHRcdGlmIChlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGUubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvLyBQcm9jZXNzIGFsbCBzaGVldHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdFx0Y29uc3QgbWVkaWFSdWxlcyA9IHNoZWV0cy5mbGF0TWFwKHNoZWV0ID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXR1cm4gQXJyYXkuZnJvbShzaGVldC5jc3NSdWxlcylcblx0XHRcdFx0XHRcdC5maWx0ZXIoKHJ1bGUpOiBydWxlIGlzIENTU01lZGlhUnVsZSA9PiBcblx0XHRcdFx0XHRcdFx0cnVsZSBpbnN0YW5jZW9mIENTU01lZGlhUnVsZSAmJlxuXHRcdFx0XHRcdFx0XHRydWxlLmNvbmRpdGlvblRleHQuaW5jbHVkZXMoJ21heC13aWR0aCcpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIHN0eWxlc2hlZXQ6JywgZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFByb2Nlc3MgYWxsIG1lZGlhIHJ1bGVzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRcdG1lZGlhUnVsZXMuZm9yRWFjaChydWxlID0+IHtcblx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBydWxlLmNvbmRpdGlvblRleHQubWF0Y2gobWF4V2lkdGhSZWdleCk7XG5cdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdGNvbnN0IG1heFdpZHRoID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChNT0JJTEVfV0lEVEggPD0gbWF4V2lkdGgpIHtcblx0XHRcdFx0XHRcdC8vIEJhdGNoIHByb2Nlc3MgYWxsIHN0eWxlIHJ1bGVzXG5cdFx0XHRcdFx0XHRjb25zdCBzdHlsZVJ1bGVzID0gQXJyYXkuZnJvbShydWxlLmNzc1J1bGVzKVxuXHRcdFx0XHRcdFx0XHQuZmlsdGVyKChyKTogciBpcyBDU1NTdHlsZVJ1bGUgPT4gciBpbnN0YW5jZW9mIENTU1N0eWxlUnVsZSk7XG5cblx0XHRcdFx0XHRcdHN0eWxlUnVsZXMuZm9yRWFjaChjc3NSdWxlID0+IHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRtb2JpbGVTdHlsZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RvcjogY3NzUnVsZS5zZWxlY3RvclRleHQsXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZXM6IGNzc1J1bGUuc3R5bGUuY3NzVGV4dFxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIENTUyBydWxlOicsIGUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZTogRXJyb3IgZXZhbHVhdGluZyBtZWRpYSBxdWVyaWVzOicsIGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb2JpbGVTdHlsZXM7XG5cdH1cblxuXHRwcml2YXRlIGFwcGx5TW9iaWxlU3R5bGVzKGRvYzogRG9jdW1lbnQsIG1vYmlsZVN0eWxlczogU3R5bGVDaGFuZ2VbXSkge1xuXHRcdGxldCBhcHBsaWVkQ291bnQgPSAwO1xuXG5cdFx0bW9iaWxlU3R5bGVzLmZvckVhY2goKHtzZWxlY3Rvciwgc3R5bGVzfSkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRcdGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXG5cdFx0XHRcdFx0XHQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJycpICsgc3R5bGVzXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRhcHBsaWVkQ291bnQrKztcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlJywgJ0Vycm9yIGFwcGx5aW5nIHN0eWxlcyBmb3Igc2VsZWN0b3I6Jywgc2VsZWN0b3IsIGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUhpZGRlbkVsZW1lbnRzKGRvYzogRG9jdW1lbnQpIHtcblx0XHRsZXQgY291bnQgPSAwO1xuXHRcdGNvbnN0IGVsZW1lbnRzVG9SZW1vdmUgPSBuZXcgU2V0PEVsZW1lbnQ+KCk7XG5cblx0XHQvLyBGaXJzdCBwYXNzOiBHZXQgYWxsIGVsZW1lbnRzIG1hdGNoaW5nIGhpZGRlbiBzZWxlY3RvcnNcblx0XHRjb25zdCBoaWRkZW5FbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKEhJRERFTl9FTEVNRU5UX1NFTEVDVE9SUyk7XG5cdFx0aGlkZGVuRWxlbWVudHMuZm9yRWFjaChlbCA9PiBlbGVtZW50c1RvUmVtb3ZlLmFkZChlbCkpO1xuXHRcdGNvdW50ICs9IGhpZGRlbkVsZW1lbnRzLmxlbmd0aDtcblxuXHRcdC8vIFNlY29uZCBwYXNzOiBVc2UgVHJlZVdhbGtlciBmb3IgZWZmaWNpZW50IHRyYXZlcnNhbFxuXHRcdGNvbnN0IHRyZWVXYWxrZXIgPSBkb2MuY3JlYXRlVHJlZVdhbGtlcihcblx0XHRcdGRvYy5ib2R5LFxuXHRcdFx0Tm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsXG5cdFx0XHR7XG5cdFx0XHRcdGFjY2VwdE5vZGU6IChub2RlOiBFbGVtZW50KSA9PiB7XG5cdFx0XHRcdFx0Ly8gU2tpcCBlbGVtZW50cyBhbHJlYWR5IG1hcmtlZCBmb3IgcmVtb3ZhbFxuXHRcdFx0XHRcdGlmIChlbGVtZW50c1RvUmVtb3ZlLmhhcyhub2RlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX1JFSkVDVDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHQvLyBCYXRjaCBzdHlsZSBjb21wdXRhdGlvbnNcblx0XHRjb25zdCBlbGVtZW50czogRWxlbWVudFtdID0gW107XG5cdFx0bGV0IGN1cnJlbnROb2RlOiBFbGVtZW50IHwgbnVsbDtcblx0XHR3aGlsZSAoY3VycmVudE5vZGUgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkgYXMgRWxlbWVudCkge1xuXHRcdFx0ZWxlbWVudHMucHVzaChjdXJyZW50Tm9kZSk7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvY2VzcyBzdHlsZXMgaW4gYmF0Y2hlcyB0byBtaW5pbWl6ZSBsYXlvdXQgdGhyYXNoaW5nXG5cdFx0Y29uc3QgQkFUQ0hfU0laRSA9IDEwMDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSArPSBCQVRDSF9TSVpFKSB7XG5cdFx0XHRjb25zdCBiYXRjaCA9IGVsZW1lbnRzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcblx0XHRcdFxuXHRcdFx0Ly8gUmVhZCBwaGFzZSAtIGdhdGhlciBhbGwgY29tcHV0ZWRTdHlsZXNcblx0XHRcdGNvbnN0IHN0eWxlcyA9IGJhdGNoLm1hcChlbCA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkpO1xuXHRcdFx0XG5cdFx0XHQvLyBXcml0ZSBwaGFzZSAtIG1hcmsgZWxlbWVudHMgZm9yIHJlbW92YWxcblx0XHRcdGJhdGNoLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBzdHlsZXNbaW5kZXhdO1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHxcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLnZpc2liaWxpdHkgPT09ICdoaWRkZW4nIHx8XG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS5vcGFjaXR5ID09PSAnMCdcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5hZGQoZWxlbWVudCk7XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gRmluYWwgcGFzczogQmF0Y2ggcmVtb3ZlIGFsbCBoaWRkZW4gZWxlbWVudHNcblx0XHRlbGVtZW50c1RvUmVtb3ZlLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIGhpZGRlbiBlbGVtZW50czonLCBjb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUNsdXR0ZXIoZG9jOiBEb2N1bWVudCkge1xuXHRcdGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdGxldCBleGFjdFNlbGVjdG9yQ291bnQgPSAwO1xuXHRcdGxldCBwYXJ0aWFsU2VsZWN0b3JDb3VudCA9IDA7XG5cblx0XHQvLyBUcmFjayBhbGwgZWxlbWVudHMgdG8gYmUgcmVtb3ZlZFxuXHRcdGNvbnN0IGVsZW1lbnRzVG9SZW1vdmUgPSBuZXcgU2V0PEVsZW1lbnQ+KCk7XG5cblx0XHQvLyBGaXJzdCBjb2xsZWN0IGVsZW1lbnRzIG1hdGNoaW5nIGV4YWN0IHNlbGVjdG9yc1xuXHRcdGNvbnN0IGV4YWN0RWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChFWEFDVF9TRUxFQ1RPUlMuam9pbignLCcpKTtcblx0XHRleGFjdEVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0aWYgKGVsPy5wYXJlbnROb2RlKSB7XG5cdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsKTtcblx0XHRcdFx0ZXhhY3RTZWxlY3RvckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBQcmUtY29tcGlsZSByZWdleGVzIGFuZCBjb21iaW5lIGludG8gYSBzaW5nbGUgcmVnZXggZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuXHRcdGNvbnN0IGNvbWJpbmVkUGF0dGVybiA9IFBBUlRJQUxfU0VMRUNUT1JTLmpvaW4oJ3wnKTtcblx0XHRjb25zdCBwYXJ0aWFsUmVnZXggPSBuZXcgUmVnRXhwKGNvbWJpbmVkUGF0dGVybiwgJ2knKTtcblxuXHRcdC8vIENyZWF0ZSBhbiBlZmZpY2llbnQgYXR0cmlidXRlIHNlbGVjdG9yIGZvciBlbGVtZW50cyB3ZSBjYXJlIGFib3V0XG5cdFx0Y29uc3QgYXR0cmlidXRlU2VsZWN0b3IgPSAnW2NsYXNzXSxbaWRdLFtkYXRhLXRlc3RpZF0sW2RhdGEtcWFdLFtkYXRhLWN5XSc7XG5cdFx0Y29uc3QgYWxsRWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChhdHRyaWJ1dGVTZWxlY3Rvcik7XG5cblx0XHQvLyBQcm9jZXNzIGVsZW1lbnRzIGZvciBwYXJ0aWFsIG1hdGNoZXNcblx0XHRhbGxFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdC8vIFNraXAgaWYgYWxyZWFkeSBtYXJrZWQgZm9yIHJlbW92YWxcblx0XHRcdGlmIChlbGVtZW50c1RvUmVtb3ZlLmhhcyhlbCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZXQgYWxsIHJlbGV2YW50IGF0dHJpYnV0ZXMgYW5kIGNvbWJpbmUgaW50byBhIHNpbmdsZSBzdHJpbmdcblx0XHRcdGNvbnN0IGF0dHJzID0gW1xuXHRcdFx0XHRlbC5jbGFzc05hbWUgJiYgdHlwZW9mIGVsLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgPyBlbC5jbGFzc05hbWUgOiAnJyxcblx0XHRcdFx0ZWwuaWQgfHwgJycsXG5cdFx0XHRcdGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0aWQnKSB8fCAnJyxcblx0XHRcdFx0ZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXFhJykgfHwgJycsXG5cdFx0XHRcdGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jeScpIHx8ICcnXG5cdFx0XHRdLmpvaW4oJyAnKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHQvLyBTa2lwIGlmIG5vIGF0dHJpYnV0ZXMgdG8gY2hlY2tcblx0XHRcdGlmICghYXR0cnMudHJpbSgpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgZm9yIHBhcnRpYWwgbWF0Y2ggdXNpbmcgc2luZ2xlIHJlZ2V4IHRlc3Rcblx0XHRcdGlmIChwYXJ0aWFsUmVnZXgudGVzdChhdHRycykpIHtcblx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5hZGQoZWwpO1xuXHRcdFx0XHRwYXJ0aWFsU2VsZWN0b3JDb3VudCsrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIGFsbCBjb2xsZWN0ZWQgZWxlbWVudHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG5cblx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIGNsdXR0ZXIgZWxlbWVudHM6Jywge1xuXHRcdFx0ZXhhY3RTZWxlY3RvcnM6IGV4YWN0U2VsZWN0b3JDb3VudCxcblx0XHRcdHBhcnRpYWxTZWxlY3RvcnM6IHBhcnRpYWxTZWxlY3RvckNvdW50LFxuXHRcdFx0dG90YWw6IGVsZW1lbnRzVG9SZW1vdmUuc2l6ZSxcblx0XHRcdHByb2Nlc3NpbmdUaW1lOiBgJHsoZW5kVGltZSAtIHN0YXJ0VGltZSkudG9GaXhlZCgyKX1tc2Bcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgZmxhdHRlbkRpdnMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cblx0XHQvLyBQcm9jZXNzIGluIGJhdGNoZXMgdG8gbWFpbnRhaW4gcGVyZm9ybWFuY2Vcblx0XHRsZXQga2VlcFByb2Nlc3NpbmcgPSB0cnVlO1xuXG5cdFx0Y29uc3Qgc2hvdWxkUHJlc2VydmVFbGVtZW50ID0gKGVsOiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHRjb25zdCB0YWdOYW1lID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBpZiBlbGVtZW50IHNob3VsZCBiZSBwcmVzZXJ2ZWRcblx0XHRcdGlmIChQUkVTRVJWRV9FTEVNRU5UUy5oYXModGFnTmFtZSkpIHJldHVybiB0cnVlO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBmb3Igc2VtYW50aWMgcm9sZXNcblx0XHRcdGNvbnN0IHJvbGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKTtcblx0XHRcdGlmIChyb2xlICYmIFsnYXJ0aWNsZScsICdtYWluJywgJ25hdmlnYXRpb24nLCAnYmFubmVyJywgJ2NvbnRlbnRpbmZvJ10uaW5jbHVkZXMocm9sZSkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGZvciBzZW1hbnRpYyBjbGFzc2VzXG5cdFx0XHRjb25zdCBjbGFzc05hbWUgPSBlbC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmIChjbGFzc05hbWUubWF0Y2goLyg/OmFydGljbGV8bWFpbnxjb250ZW50fGZvb3Rub3RlfHJlZmVyZW5jZXxiaWJsaW9ncmFwaHkpLykpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIGlmIGRpdiBjb250YWlucyBtaXhlZCBjb250ZW50IHR5cGVzIHRoYXQgc2hvdWxkIGJlIHByZXNlcnZlZFxuXHRcdFx0aWYgKHRhZ05hbWUgPT09ICdkaXYnKSB7XG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShlbC5jaGlsZHJlbik7XG5cdFx0XHRcdGNvbnN0IGhhc1ByZXNlcnZlZEVsZW1lbnRzID0gY2hpbGRyZW4uc29tZShjaGlsZCA9PiBcblx0XHRcdFx0XHRQUkVTRVJWRV9FTEVNRU5UUy5oYXMoY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSB8fFxuXHRcdFx0XHRcdGNoaWxkLmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAnYXJ0aWNsZScgfHxcblx0XHRcdFx0XHRjaGlsZC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYXJ0aWNsZScpXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChoYXNQcmVzZXJ2ZWRFbGVtZW50cykgcmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgaXNXcmFwcGVyRGl2ID0gKGRpdjogRWxlbWVudCk6IGJvb2xlYW4gPT4ge1xuXHRcdFx0Ly8gQ2hlY2sgaWYgaXQncyBqdXN0IGVtcHR5IHNwYWNlXG5cdFx0XHRpZiAoIWRpdi50ZXh0Q29udGVudD8udHJpbSgpKSByZXR1cm4gdHJ1ZTtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgaXQgb25seSBjb250YWlucyBvdGhlciBkaXZzIG9yIGJsb2NrIGVsZW1lbnRzXG5cdFx0XHRjb25zdCBjaGlsZHJlbiA9IEFycmF5LmZyb20oZGl2LmNoaWxkcmVuKTtcblx0XHRcdGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBpZiBhbGwgY2hpbGRyZW4gYXJlIGJsb2NrIGVsZW1lbnRzXG5cdFx0XHRjb25zdCBhbGxCbG9ja0VsZW1lbnRzID0gY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4ge1xuXHRcdFx0XHRjb25zdCB0YWcgPSBjaGlsZC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdHJldHVybiB0YWcgPT09ICdkaXYnIHx8IHRhZyA9PT0gJ3AnIHx8IHRhZyA9PT0gJ2gxJyB8fCB0YWcgPT09ICdoMicgfHwgXG5cdFx0XHRcdFx0ICAgdGFnID09PSAnaDMnIHx8IHRhZyA9PT0gJ2g0JyB8fCB0YWcgPT09ICdoNScgfHwgdGFnID09PSAnaDYnIHx8XG5cdFx0XHRcdFx0ICAgdGFnID09PSAndWwnIHx8IHRhZyA9PT0gJ29sJyB8fCB0YWcgPT09ICdwcmUnIHx8IHRhZyA9PT0gJ2Jsb2NrcXVvdGUnIHx8XG5cdFx0XHRcdFx0ICAgdGFnID09PSAnZmlndXJlJztcblx0XHRcdH0pO1xuXHRcdFx0aWYgKGFsbEJsb2NrRWxlbWVudHMpIHJldHVybiB0cnVlO1xuXG5cdFx0XHQvLyBDaGVjayBmb3IgY29tbW9uIHdyYXBwZXIgcGF0dGVybnNcblx0XHRcdGNvbnN0IGNsYXNzTmFtZSA9IGRpdi5jbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdGNvbnN0IGlzV3JhcHBlciA9IC8oPzp3cmFwcGVyfGNvbnRhaW5lcnxsYXlvdXR8cm93fGNvbHxncmlkfGZsZXh8b3V0ZXJ8aW5uZXJ8Y29udGVudC1hcmVhKS9pLnRlc3QoY2xhc3NOYW1lKTtcblx0XHRcdGlmIChpc1dyYXBwZXIpIHJldHVybiB0cnVlO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBpdCBoYXMgZXhjZXNzaXZlIHdoaXRlc3BhY2Ugb3IgZW1wdHkgdGV4dCBub2Rlc1xuXHRcdFx0Y29uc3QgdGV4dE5vZGVzID0gQXJyYXkuZnJvbShkaXYuY2hpbGROb2RlcykuZmlsdGVyKG5vZGUgPT4gXG5cdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIG5vZGUudGV4dENvbnRlbnQ/LnRyaW0oKVxuXHRcdFx0KTtcblx0XHRcdGlmICh0ZXh0Tm9kZXMubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgaXQncyBhIGRpdiB0aGF0IG9ubHkgY29udGFpbnMgYmxvY2sgZWxlbWVudHNcblx0XHRcdGNvbnN0IGhhc09ubHlCbG9ja0VsZW1lbnRzID0gY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhY2hpbGRyZW4uc29tZShjaGlsZCA9PiB7XG5cdFx0XHRcdGNvbnN0IHRhZyA9IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0cmV0dXJuIElOTElORV9FTEVNRU5UUy5oYXModGFnKTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKGhhc09ubHlCbG9ja0VsZW1lbnRzKSByZXR1cm4gdHJ1ZTtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHQvLyBGdW5jdGlvbiB0byBwcm9jZXNzIGEgc2luZ2xlIGRpdlxuXHRcdGNvbnN0IHByb2Nlc3NEaXYgPSAoZGl2OiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHQvLyBTa2lwIHByb2Nlc3NpbmcgaWYgZGl2IGhhcyBiZWVuIHJlbW92ZWQgb3Igc2hvdWxkIGJlIHByZXNlcnZlZFxuXHRcdFx0aWYgKCFkaXYuaXNDb25uZWN0ZWQgfHwgc2hvdWxkUHJlc2VydmVFbGVtZW50KGRpdikpIHJldHVybiBmYWxzZTtcblxuXHRcdFx0Ly8gQ2FzZSAxOiBFbXB0eSBkaXYgb3IgZGl2IHdpdGggb25seSB3aGl0ZXNwYWNlXG5cdFx0XHRpZiAoIWRpdi5oYXNDaGlsZE5vZGVzKCkgfHwgIWRpdi50ZXh0Q29udGVudD8udHJpbSgpKSB7XG5cdFx0XHRcdGRpdi5yZW1vdmUoKTtcblx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhc2UgMjogVG9wLWxldmVsIGRpdiAtIGJlIG1vcmUgYWdncmVzc2l2ZVxuXHRcdFx0aWYgKGRpdi5wYXJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShkaXYuY2hpbGRyZW4pO1xuXHRcdFx0XHRjb25zdCBoYXNPbmx5QmxvY2tFbGVtZW50cyA9IGNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgIWNoaWxkcmVuLnNvbWUoY2hpbGQgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHRhZyA9IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRyZXR1cm4gSU5MSU5FX0VMRU1FTlRTLmhhcyh0YWcpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoaGFzT25seUJsb2NrRWxlbWVudHMpIHtcblx0XHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XHR3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhc2UgMzogV3JhcHBlciBkaXYgLSBtZXJnZSB1cCBhZ2dyZXNzaXZlbHlcblx0XHRcdGlmIChpc1dyYXBwZXJEaXYoZGl2KSkge1xuXHRcdFx0XHQvLyBTcGVjaWFsIGNhc2U6IGlmIGRpdiBvbmx5IGNvbnRhaW5zIGJsb2NrIGVsZW1lbnRzLCBtZXJnZSB0aGVtIHVwXG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShkaXYuY2hpbGRyZW4pO1xuXHRcdFx0XHRjb25zdCBvbmx5QmxvY2tFbGVtZW50cyA9ICFjaGlsZHJlbi5zb21lKGNoaWxkID0+IHtcblx0XHRcdFx0XHRjb25zdCB0YWcgPSBjaGlsZC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0cmV0dXJuIElOTElORV9FTEVNRU5UUy5oYXModGFnKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAob25seUJsb2NrRWxlbWVudHMpIHtcblx0XHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XHR3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGhhbmRsZSBhcyBub3JtYWwgd3JhcHBlclxuXHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0d2hpbGUgKGRpdi5maXJzdENoaWxkKSB7XG5cdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChmcmFnbWVudCk7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYXNlIDQ6IERpdiBvbmx5IGNvbnRhaW5zIHRleHQgY29udGVudCAtIGNvbnZlcnQgdG8gcGFyYWdyYXBoXG5cdFx0XHRpZiAoIWRpdi5jaGlsZHJlbi5sZW5ndGggJiYgZGl2LnRleHRDb250ZW50Py50cmltKCkpIHtcblx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0cC50ZXh0Q29udGVudCA9IGRpdi50ZXh0Q29udGVudDtcblx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKHApO1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FzZSA1OiBEaXYgaGFzIHNpbmdsZSBjaGlsZFxuXHRcdFx0aWYgKGRpdi5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0Y29uc3QgY2hpbGQgPSBkaXYuZmlyc3RFbGVtZW50Q2hpbGQhO1xuXHRcdFx0XHRjb25zdCBjaGlsZFRhZyA9IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIERvbid0IHVud3JhcCBpZiBjaGlsZCBpcyBpbmxpbmUgb3Igc2hvdWxkIGJlIHByZXNlcnZlZFxuXHRcdFx0XHRpZiAoIUlOTElORV9FTEVNRU5UUy5oYXMoY2hpbGRUYWcpICYmICFzaG91bGRQcmVzZXJ2ZUVsZW1lbnQoY2hpbGQpKSB7XG5cdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKGNoaWxkKTtcblx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhc2UgNjogRGVlcGx5IG5lc3RlZCBkaXYgLSBtZXJnZSB1cFxuXHRcdFx0bGV0IG5lc3RpbmdEZXB0aCA9IDA7XG5cdFx0XHRsZXQgcGFyZW50ID0gZGl2LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR3aGlsZSAocGFyZW50KSB7XG5cdFx0XHRcdGlmIChwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2Jykge1xuXHRcdFx0XHRcdG5lc3RpbmdEZXB0aCsrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobmVzdGluZ0RlcHRoID4gMCkgeyAvLyBDaGFuZ2VkIGZyb20gPiAxIHRvID4gMCB0byBiZSBtb3JlIGFnZ3Jlc3NpdmVcblx0XHRcdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkaXYucmVwbGFjZVdpdGgoZnJhZ21lbnQpO1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHQvLyBGaXJzdCBwYXNzOiBQcm9jZXNzIHRvcC1sZXZlbCBkaXZzXG5cdFx0Y29uc3QgcHJvY2Vzc1RvcExldmVsRGl2cyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHRvcERpdnMgPSBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGRyZW4pLmZpbHRlcihcblx0XHRcdFx0ZWwgPT4gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2J1xuXHRcdFx0KTtcblx0XHRcdFxuXHRcdFx0bGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cdFx0XHR0b3BEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0aWYgKHByb2Nlc3NEaXYoZGl2KSkge1xuXHRcdFx0XHRcdG1vZGlmaWVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbW9kaWZpZWQ7XG5cdFx0fTtcblxuXHRcdC8vIFNlY29uZCBwYXNzOiBQcm9jZXNzIHJlbWFpbmluZyBkaXZzIGZyb20gZGVlcGVzdCB0byBzaGFsbG93ZXN0XG5cdFx0Y29uc3QgcHJvY2Vzc1JlbWFpbmluZ0RpdnMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBhbGxEaXZzID0gQXJyYXkuZnJvbShlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSlcblx0XHRcdFx0LnNvcnQoKGEsIGIpID0+IHtcblx0XHRcdFx0XHQvLyBDb3VudCBuZXN0aW5nIGRlcHRoXG5cdFx0XHRcdFx0Y29uc3QgZ2V0RGVwdGggPSAoZWw6IEVsZW1lbnQpOiBudW1iZXIgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IGRlcHRoID0gMDtcblx0XHRcdFx0XHRcdGxldCBwYXJlbnQgPSBlbC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdFx0d2hpbGUgKHBhcmVudCkge1xuXHRcdFx0XHRcdFx0XHRpZiAocGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicpIGRlcHRoKys7XG5cdFx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGRlcHRoO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cmV0dXJuIGdldERlcHRoKGIpIC0gZ2V0RGVwdGgoYSk7IC8vIFByb2Nlc3MgZGVlcGVzdCBmaXJzdFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0bGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cdFx0XHRhbGxEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0aWYgKHByb2Nlc3NEaXYoZGl2KSkge1xuXHRcdFx0XHRcdG1vZGlmaWVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbW9kaWZpZWQ7XG5cdFx0fTtcblxuXHRcdC8vIEZpbmFsIGNsZWFudXAgcGFzcyAtIGFnZ3Jlc3NpdmVseSBmbGF0dGVuIHJlbWFpbmluZyBkaXZzXG5cdFx0Y29uc3QgZmluYWxDbGVhbnVwID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgcmVtYWluaW5nRGl2cyA9IEFycmF5LmZyb20oZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JykpO1xuXHRcdFx0bGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cdFx0XHRcblx0XHRcdHJlbWFpbmluZ0RpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHQvLyBDaGVjayBpZiBkaXYgb25seSBjb250YWlucyBwYXJhZ3JhcGhzXG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShkaXYuY2hpbGRyZW4pO1xuXHRcdFx0XHRjb25zdCBvbmx5UGFyYWdyYXBocyA9IGNoaWxkcmVuLmV2ZXJ5KGNoaWxkID0+IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3AnKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChvbmx5UGFyYWdyYXBocyB8fCAoIXNob3VsZFByZXNlcnZlRWxlbWVudChkaXYpICYmIGlzV3JhcHBlckRpdihkaXYpKSkge1xuXHRcdFx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHRcdHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgoZnJhZ21lbnQpO1xuXHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBtb2RpZmllZDtcblx0XHR9O1xuXG5cdFx0Ly8gRXhlY3V0ZSBhbGwgcGFzc2VzIHVudGlsIG5vIG1vcmUgY2hhbmdlc1xuXHRcdGRvIHtcblx0XHRcdFx0a2VlcFByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0aWYgKHByb2Nlc3NUb3BMZXZlbERpdnMoKSkga2VlcFByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRpZiAocHJvY2Vzc1JlbWFpbmluZ0RpdnMoKSkga2VlcFByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRpZiAoZmluYWxDbGVhbnVwKCkpIGtlZXBQcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdH0gd2hpbGUgKGtlZXBQcm9jZXNzaW5nKTtcblxuXHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLl9sb2coJ0ZsYXR0ZW5lZCBkaXZzOicsIHtcblx0XHRcdGNvdW50OiBwcm9jZXNzZWRDb3VudCxcblx0XHRcdHByb2Nlc3NpbmdUaW1lOiBgJHsoZW5kVGltZSAtIHN0YXJ0VGltZSkudG9GaXhlZCgyKX1tc2Bcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY2xlYW5Db250ZW50KGVsZW1lbnQ6IEVsZW1lbnQsIG1ldGFkYXRhOiBEZWZ1ZGRsZU1ldGFkYXRhKSB7XG5cdFx0Ly8gUmVtb3ZlIEhUTUwgY29tbWVudHNcblx0XHR0aGlzLnJlbW92ZUh0bWxDb21tZW50cyhlbGVtZW50KTtcblx0XHRcblx0XHQvLyBIYW5kbGUgSDEgZWxlbWVudHMgLSByZW1vdmUgZmlyc3Qgb25lIGFuZCBjb252ZXJ0IG90aGVycyB0byBIMlxuXHRcdHRoaXMuaGFuZGxlSGVhZGluZ3MoZWxlbWVudCwgbWV0YWRhdGEudGl0bGUpO1xuXHRcdFxuXHRcdC8vIFN0YW5kYXJkaXplIGZvb3Rub3RlcyBhbmQgY2l0YXRpb25zXG5cdFx0dGhpcy5zdGFuZGFyZGl6ZUZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIEhhbmRsZSBsYXp5LWxvYWRlZCBpbWFnZXNcblx0XHR0aGlzLmhhbmRsZUxhenlJbWFnZXMoZWxlbWVudCk7XG5cblx0XHQvLyBDb252ZXJ0IGVtYmVkZGVkIGNvbnRlbnQgdG8gc3RhbmRhcmQgZm9ybWF0c1xuXHRcdHRoaXMuc3RhbmRhcmRpemVFbGVtZW50cyhlbGVtZW50KTtcblxuXHRcdC8vIFNraXAgZGl2IGZsYXR0ZW5pbmcgaW4gZGVidWcgbW9kZVxuXHRcdGlmICghdGhpcy5kZWJ1Zykge1xuXHRcdFx0Ly8gRmlyc3QgcGFzcyBvZiBkaXYgZmxhdHRlbmluZ1xuXHRcdFx0dGhpcy5mbGF0dGVuRGl2cyhlbGVtZW50KTtcblx0XHRcdFxuXHRcdFx0Ly8gU3RyaXAgdW53YW50ZWQgYXR0cmlidXRlc1xuXHRcdFx0dGhpcy5zdHJpcFVud2FudGVkQXR0cmlidXRlcyhlbGVtZW50KTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGVtcHR5IGVsZW1lbnRzXG5cdFx0XHR0aGlzLnJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudCk7XG5cblx0XHRcdC8vIFJlbW92ZSB0cmFpbGluZyBoZWFkaW5nc1xuXHRcdFx0dGhpcy5yZW1vdmVUcmFpbGluZ0hlYWRpbmdzKGVsZW1lbnQpO1xuXG5cdFx0XHQvLyBGaW5hbCBwYXNzIG9mIGRpdiBmbGF0dGVuaW5nIGFmdGVyIGNsZWFudXAgb3BlcmF0aW9uc1xuXHRcdFx0dGhpcy5mbGF0dGVuRGl2cyhlbGVtZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSW4gZGVidWcgbW9kZSwgc3RpbGwgZG8gYmFzaWMgY2xlYW51cCBidXQgcHJlc2VydmUgc3RydWN0dXJlXG5cdFx0XHR0aGlzLnN0cmlwVW53YW50ZWRBdHRyaWJ1dGVzKGVsZW1lbnQpO1xuXHRcdFx0dGhpcy5yZW1vdmVFbXB0eUVsZW1lbnRzKGVsZW1lbnQpO1xuXHRcdFx0dGhpcy5yZW1vdmVUcmFpbGluZ0hlYWRpbmdzKGVsZW1lbnQpO1xuXHRcdFx0dGhpcy5fbG9nKCdEZWJ1ZyBtb2RlOiBTa2lwcGluZyBkaXYgZmxhdHRlbmluZyB0byBwcmVzZXJ2ZSBzdHJ1Y3R1cmUnKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZVRyYWlsaW5nSGVhZGluZ3MoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXG5cdFx0Y29uc3QgaGFzQ29udGVudEFmdGVyID0gKGVsOiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGVyZSdzIGFueSBtZWFuaW5nZnVsIGNvbnRlbnQgYWZ0ZXIgdGhpcyBlbGVtZW50XG5cdFx0XHRsZXQgbmV4dENvbnRlbnQgPSAnJztcblx0XHRcdGxldCBzaWJsaW5nID0gZWwubmV4dFNpYmxpbmc7XG5cblx0XHRcdC8vIEZpcnN0IGNoZWNrIGRpcmVjdCBzaWJsaW5nc1xuXHRcdFx0d2hpbGUgKHNpYmxpbmcpIHtcblx0XHRcdFx0aWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRcdFx0bmV4dENvbnRlbnQgKz0gc2libGluZy50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fSBlbHNlIGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuXHRcdFx0XHRcdC8vIElmIHdlIGZpbmQgYW4gZWxlbWVudCBzaWJsaW5nLCBjaGVjayBpdHMgY29udGVudFxuXHRcdFx0XHRcdG5leHRDb250ZW50ICs9IChzaWJsaW5nIGFzIEVsZW1lbnQpLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNpYmxpbmcgPSBzaWJsaW5nLm5leHRTaWJsaW5nO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB3ZSBmb3VuZCBtZWFuaW5nZnVsIGNvbnRlbnQgYXQgdGhpcyBsZXZlbCwgcmV0dXJuIHRydWVcblx0XHRcdGlmIChuZXh0Q29udGVudC50cmltKCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIG5vIGNvbnRlbnQgZm91bmQgYXQgdGhpcyBsZXZlbCBhbmQgd2UgaGF2ZSBhIHBhcmVudCxcblx0XHRcdC8vIGNoZWNrIGZvciBjb250ZW50IGFmdGVyIHRoZSBwYXJlbnRcblx0XHRcdGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudCAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gaGFzQ29udGVudEFmdGVyKHBhcmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0Ly8gUHJvY2VzcyBhbGwgaGVhZGluZ3MgZnJvbSBib3R0b20gdG8gdG9wXG5cdFx0Y29uc3QgaGVhZGluZ3MgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaDEsIGgyLCBoMywgaDQsIGg1LCBoNicpKVxuXHRcdFx0LnJldmVyc2UoKTtcblxuXHRcdGhlYWRpbmdzLmZvckVhY2goaGVhZGluZyA9PiB7XG5cdFx0XHRpZiAoIWhhc0NvbnRlbnRBZnRlcihoZWFkaW5nKSkge1xuXHRcdFx0XHRoZWFkaW5nLnJlbW92ZSgpO1xuXHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFN0b3AgcHJvY2Vzc2luZyBvbmNlIHdlIGZpbmQgYSBoZWFkaW5nIHdpdGggY29udGVudCBhZnRlciBpdFxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAocmVtb3ZlZENvdW50ID4gMCkge1xuXHRcdFx0dGhpcy5fbG9nKCdSZW1vdmVkIHRyYWlsaW5nIGhlYWRpbmdzOicsIHJlbW92ZWRDb3VudCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBoYW5kbGVIZWFkaW5ncyhlbGVtZW50OiBFbGVtZW50LCB0aXRsZTogc3RyaW5nKSB7XG5cdFx0Y29uc3QgaDFzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDEnKTtcblxuXHRcdEFycmF5LmZyb20oaDFzKS5mb3JFYWNoKGgxID0+IHtcblx0XHRcdGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcblx0XHRcdGgyLmlubmVySFRNTCA9IGgxLmlubmVySFRNTDtcblx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRBcnJheS5mcm9tKGgxLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRoMi5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRoMS5wYXJlbnROb2RlPy5yZXBsYWNlQ2hpbGQoaDIsIGgxKTtcblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBmaXJzdCBIMiBpZiBpdCBtYXRjaGVzIHRpdGxlXG5cdFx0Y29uc3QgaDJzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDInKTtcblx0XHRpZiAoaDJzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IGZpcnN0SDIgPSBoMnNbMF07XG5cdFx0XHRjb25zdCBmaXJzdEgyVGV4dCA9IGZpcnN0SDIudGV4dENvbnRlbnQ/LnRyaW0oKS50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0Y29uc3Qgbm9ybWFsaXplZFRpdGxlID0gdGl0bGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG5cdFx0XHRpZiAobm9ybWFsaXplZFRpdGxlICYmIG5vcm1hbGl6ZWRUaXRsZSA9PT0gZmlyc3RIMlRleHQpIHtcblx0XHRcdFx0Zmlyc3RIMi5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUh0bWxDb21tZW50cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0Y29uc3QgY29tbWVudHM6IENvbW1lbnRbXSA9IFtdO1xuXHRcdGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG5cdFx0XHRlbGVtZW50LFxuXHRcdFx0Tm9kZUZpbHRlci5TSE9XX0NPTU1FTlQsXG5cdFx0XHRudWxsXG5cdFx0KTtcblxuXHRcdGxldCBub2RlO1xuXHRcdHdoaWxlIChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpIHtcblx0XHRcdGNvbW1lbnRzLnB1c2gobm9kZSBhcyBDb21tZW50KTtcblx0XHR9XG5cblx0XHRjb21tZW50cy5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuXHRcdFx0Y29tbWVudC5yZW1vdmUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBIVE1MIGNvbW1lbnRzOicsIGNvbW1lbnRzLmxlbmd0aCk7XG5cdH1cblxuXHRwcml2YXRlIHN0cmlwVW53YW50ZWRBdHRyaWJ1dGVzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgYXR0cmlidXRlQ291bnQgPSAwO1xuXG5cdFx0Y29uc3QgcHJvY2Vzc0VsZW1lbnQgPSAoZWw6IEVsZW1lbnQpID0+IHtcblx0XHRcdC8vIFNraXAgU1ZHIGVsZW1lbnRzIC0gcHJlc2VydmUgYWxsIHRoZWlyIGF0dHJpYnV0ZXNcblx0XHRcdGlmIChlbCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBhdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKTtcblx0XHRcdFxuXHRcdFx0YXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRjb25zdCBhdHRyTmFtZSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHQvLyBJbiBkZWJ1ZyBtb2RlLCBhbGxvdyBkZWJ1ZyBhdHRyaWJ1dGVzIGFuZCBkYXRhLSBhdHRyaWJ1dGVzXG5cdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0aWYgKCFBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHJOYW1lKSAmJiBcblx0XHRcdFx0XHRcdCFBTExPV0VEX0FUVFJJQlVURVNfREVCVUcuaGFzKGF0dHJOYW1lKSAmJiBcblx0XHRcdFx0XHRcdCFhdHRyTmFtZS5zdGFydHNXaXRoKCdkYXRhLScpKSB7XG5cdFx0XHRcdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKTtcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZUNvdW50Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEluIG5vcm1hbCBtb2RlLCBvbmx5IGFsbG93IHN0YW5kYXJkIGF0dHJpYnV0ZXNcblx0XHRcdFx0XHRpZiAoIUFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ck5hbWUpKSB7XG5cdFx0XHRcdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKTtcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZUNvdW50Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0cHJvY2Vzc0VsZW1lbnQoZWxlbWVudCk7XG5cdFx0ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykuZm9yRWFjaChwcm9jZXNzRWxlbWVudCk7XG5cblx0XHR0aGlzLl9sb2coJ1N0cmlwcGVkIGF0dHJpYnV0ZXM6JywgYXR0cmlidXRlQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVFbXB0eUVsZW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcmVtb3ZlZENvdW50ID0gMDtcblx0XHRsZXQgaXRlcmF0aW9ucyA9IDA7XG5cdFx0bGV0IGtlZXBSZW1vdmluZyA9IHRydWU7XG5cblx0XHR3aGlsZSAoa2VlcFJlbW92aW5nKSB7XG5cdFx0XHRpdGVyYXRpb25zKys7XG5cdFx0XHRrZWVwUmVtb3ZpbmcgPSBmYWxzZTtcblx0XHRcdC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aG91dCBjaGlsZHJlbiwgd29ya2luZyBmcm9tIGRlZXBlc3QgZmlyc3Rcblx0XHRcdGNvbnN0IGVtcHR5RWxlbWVudHMgPSBBcnJheS5mcm9tKGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSkuZmlsdGVyKGVsID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfRU1QVFlfRUxFTUVOVFMuaGFzKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIG9ubHkgd2hpdGVzcGFjZSBvciAmbmJzcDtcblx0XHRcdFx0Y29uc3QgdGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0Y29uc3QgaGFzT25seVdoaXRlc3BhY2UgPSB0ZXh0Q29udGVudC50cmltKCkubGVuZ3RoID09PSAwO1xuXHRcdFx0XHRjb25zdCBoYXNOYnNwID0gdGV4dENvbnRlbnQuaW5jbHVkZXMoJ1xcdTAwQTAnKTsgLy8gVW5pY29kZSBub24tYnJlYWtpbmcgc3BhY2Vcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIG5vIG1lYW5pbmdmdWwgY2hpbGRyZW5cblx0XHRcdFx0Y29uc3QgaGFzTm9DaGlsZHJlbiA9ICFlbC5oYXNDaGlsZE5vZGVzKCkgfHwgXG5cdFx0XHRcdFx0KEFycmF5LmZyb20oZWwuY2hpbGROb2RlcykuZXZlcnkobm9kZSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm9kZVRleHQgPSBub2RlLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbm9kZVRleHQudHJpbSgpLmxlbmd0aCA9PT0gMCAmJiAhbm9kZVRleHQuaW5jbHVkZXMoJ1xcdTAwQTAnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0cmV0dXJuIGhhc09ubHlXaGl0ZXNwYWNlICYmICFoYXNOYnNwICYmIGhhc05vQ2hpbGRyZW47XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGVtcHR5RWxlbWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRlbXB0eUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0a2VlcFJlbW92aW5nID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgZW1wdHkgZWxlbWVudHM6Jywge1xuXHRcdFx0Y291bnQ6IHJlbW92ZWRDb3VudCxcblx0XHRcdGl0ZXJhdGlvbnNcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlRm9vdG5vdGVJdGVtKFxuXHRcdGZvb3Rub3RlTnVtYmVyOiBudW1iZXIsXG5cdFx0Y29udGVudDogc3RyaW5nIHwgRWxlbWVudCxcblx0XHRyZWZzOiBzdHJpbmdbXVxuXHQpOiBIVE1MTElFbGVtZW50IHtcblx0XHRjb25zdCBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRuZXdJdGVtLmNsYXNzTmFtZSA9ICdmb290bm90ZSc7XG5cdFx0bmV3SXRlbS5pZCA9IGBmbjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cblx0XHQvLyBIYW5kbGUgY29udGVudFxuXHRcdGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSBjb250ZW50O1xuXHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBHZXQgYWxsIHBhcmFncmFwaHMgZnJvbSB0aGUgY29udGVudFxuXHRcdFx0Y29uc3QgcGFyYWdyYXBocyA9IEFycmF5LmZyb20oY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdwJykpO1xuXHRcdFx0aWYgKHBhcmFncmFwaHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdC8vIElmIG5vIHBhcmFncmFwaHMsIHdyYXAgY29udGVudCBpbiBhIHBhcmFncmFwaFxuXHRcdFx0XHRjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSBjb250ZW50LmlubmVySFRNTDtcblx0XHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ29weSBleGlzdGluZyBwYXJhZ3JhcGhzXG5cdFx0XHRcdHBhcmFncmFwaHMuZm9yRWFjaChwID0+IHtcblx0XHRcdFx0XHRjb25zdCBuZXdQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRcdG5ld1AuaW5uZXJIVE1MID0gcC5pbm5lckhUTUw7XG5cdFx0XHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChuZXdQKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIGJhY2tsaW5rKHMpIHRvIHRoZSBsYXN0IHBhcmFncmFwaFxuXHRcdGNvbnN0IGxhc3RQYXJhZ3JhcGggPSBuZXdJdGVtLnF1ZXJ5U2VsZWN0b3IoJ3A6bGFzdC1vZi10eXBlJykgfHwgbmV3SXRlbTtcblx0XHRyZWZzLmZvckVhY2goKHJlZklkLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgYmFja2xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRiYWNrbGluay5ocmVmID0gYCMke3JlZklkfWA7XG5cdFx0XHRiYWNrbGluay50aXRsZSA9ICdyZXR1cm4gdG8gYXJ0aWNsZSc7XG5cdFx0XHRiYWNrbGluay5jbGFzc05hbWUgPSAnZm9vdG5vdGUtYmFja3JlZic7XG5cdFx0XHRiYWNrbGluay5pbm5lckhUTUwgPSAn4oapJztcblx0XHRcdGlmIChpbmRleCA8IHJlZnMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRiYWNrbGluay5pbm5lckhUTUwgKz0gJyAnO1xuXHRcdFx0fVxuXHRcdFx0bGFzdFBhcmFncmFwaC5hcHBlbmRDaGlsZChiYWNrbGluayk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbmV3SXRlbTtcblx0fVxuXG5cdHByaXZhdGUgY29sbGVjdEZvb3Rub3RlcyhlbGVtZW50OiBFbGVtZW50KTogRm9vdG5vdGVDb2xsZWN0aW9uIHtcblx0XHRjb25zdCBmb290bm90ZXM6IEZvb3Rub3RlQ29sbGVjdGlvbiA9IHt9O1xuXHRcdGxldCBmb290bm90ZUNvdW50ID0gMTtcblx0XHRjb25zdCBwcm9jZXNzZWRJZHMgPSBuZXcgU2V0PHN0cmluZz4oKTsgLy8gVHJhY2sgcHJvY2Vzc2VkIElEc1xuXG5cdFx0Ly8gQ29sbGVjdCBhbGwgZm9vdG5vdGVzIGFuZCB0aGVpciBJRHMgZnJvbSBmb290bm90ZSBsaXN0c1xuXHRcdGNvbnN0IGZvb3Rub3RlTGlzdHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMpO1xuXHRcdGZvb3Rub3RlTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcblx0XHRcdC8vIFN1YnN0YWNrIGhhcyBpbmRpdmlkdWFsIGZvb3Rub3RlIGRpdnMgd2l0aCBubyBwYXJlbnRcblx0XHRcdGlmIChsaXN0Lm1hdGNoZXMoJ2Rpdi5mb290bm90ZVtkYXRhLWNvbXBvbmVudC1uYW1lPVwiRm9vdG5vdGVUb0RPTVwiXScpKSB7XG5cdFx0XHRcdGNvbnN0IGFuY2hvciA9IGxpc3QucXVlcnlTZWxlY3RvcignYS5mb290bm90ZS1udW1iZXInKTtcblx0XHRcdFx0Y29uc3QgY29udGVudCA9IGxpc3QucXVlcnlTZWxlY3RvcignLmZvb3Rub3RlLWNvbnRlbnQnKTtcblx0XHRcdFx0aWYgKGFuY2hvciAmJiBjb250ZW50KSB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBhbmNob3IuaWQucmVwbGFjZSgnZm9vdG5vdGUtJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0aWYgKGlkICYmICFwcm9jZXNzZWRJZHMuaGFzKGlkKSkge1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVzW2Zvb3Rub3RlQ291bnRdID0ge1xuXHRcdFx0XHRcdFx0XHRjb250ZW50OiBjb250ZW50LFxuXHRcdFx0XHRcdFx0XHRvcmlnaW5hbElkOiBpZCxcblx0XHRcdFx0XHRcdFx0cmVmczogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRwcm9jZXNzZWRJZHMuYWRkKGlkKTtcblx0XHRcdFx0XHRcdGZvb3Rub3RlQ291bnQrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb21tb24gZm9ybWF0IHVzaW5nIE9ML1VMIGFuZCBMSSBlbGVtZW50c1xuXHRcdFx0Y29uc3QgaXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLCBkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRpdGVtcy5mb3JFYWNoKGxpID0+IHtcblx0XHRcdFx0bGV0IGlkID0gJyc7XG5cdFx0XHRcdGxldCBjb250ZW50OiBFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIGNpdGF0aW9ucyB3aXRoIC5jaXRhdGlvbnMgY2xhc3Ncblx0XHRcdFx0Y29uc3QgY2l0YXRpb25zRGl2ID0gbGkucXVlcnlTZWxlY3RvcignLmNpdGF0aW9ucycpO1xuXHRcdFx0XHRpZiAoY2l0YXRpb25zRGl2Py5pZD8udG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdyJykpIHtcblx0XHRcdFx0XHRpZCA9IGNpdGF0aW9uc0Rpdi5pZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdC8vIExvb2sgZm9yIGNpdGF0aW9uIGNvbnRlbnQgd2l0aGluIHRoZSBjaXRhdGlvbnMgZGl2XG5cdFx0XHRcdFx0Y29uc3QgY2l0YXRpb25Db250ZW50ID0gY2l0YXRpb25zRGl2LnF1ZXJ5U2VsZWN0b3IoJy5jaXRhdGlvbi1jb250ZW50Jyk7XG5cdFx0XHRcdFx0aWYgKGNpdGF0aW9uQ29udGVudCkge1xuXHRcdFx0XHRcdFx0Y29udGVudCA9IGNpdGF0aW9uQ29udGVudDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRXh0cmFjdCBJRCBmcm9tIHZhcmlvdXMgZm9ybWF0c1xuXHRcdFx0XHRcdGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2JpYi5iaWInKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5pZC5yZXBsYWNlKCdiaWIuYmliJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2ZuOicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2ZuOicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaWQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdmbicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2ZuJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0Ly8gTmF0dXJlLmNvbVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaGFzQXR0cmlidXRlKCdkYXRhLWNvdW50ZXInKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY291bnRlcicpPy5yZXBsYWNlKC9cXC4kLywgJycpPy50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGxpLmlkLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC9jaXRlX25vdGUtKC4rKS8pO1xuXHRcdFx0XHRcdFx0aWQgPSBtYXRjaCA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiBsaS5pZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb250ZW50ID0gbGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWQgJiYgIXByb2Nlc3NlZElkcy5oYXMoaWQpKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVzW2Zvb3Rub3RlQ291bnRdID0ge1xuXHRcdFx0XHRcdFx0Y29udGVudDogY29udGVudCB8fCBsaSxcblx0XHRcdFx0XHRcdG9yaWdpbmFsSWQ6IGlkLFxuXHRcdFx0XHRcdFx0cmVmczogW11cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHByb2Nlc3NlZElkcy5hZGQoaWQpO1xuXHRcdFx0XHRcdGZvb3Rub3RlQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZm9vdG5vdGVzO1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kT3V0ZXJGb290bm90ZUNvbnRhaW5lcihlbDogRWxlbWVudCk6IEVsZW1lbnQge1xuXHRcdGxldCBjdXJyZW50OiBFbGVtZW50IHwgbnVsbCA9IGVsO1xuXHRcdGxldCBwYXJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWwucGFyZW50RWxlbWVudDtcblx0XHRcblx0XHQvLyBLZWVwIGdvaW5nIHVwIHVudGlsIHdlIGZpbmQgYW4gZWxlbWVudCB0aGF0J3Mgbm90IGEgc3BhbiBvciBzdXBcblx0XHR3aGlsZSAocGFyZW50ICYmIChcblx0XHRcdHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzcGFuJyB8fCBcblx0XHRcdHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdXAnXG5cdFx0KSkge1xuXHRcdFx0Y3VycmVudCA9IHBhcmVudDtcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gY3VycmVudDtcblx0fVxuXG5cdC8vIEV2ZXJ5IGZvb3Rub3RlIHJlZmVyZW5jZSBzaG91bGQgYmUgYSBzdXAgZWxlbWVudCB3aXRoIGFuIGFuY2hvciBpbnNpZGVcblx0Ly8gZS5nLiA8c3VwIGlkPVwiZm5yZWY6MVwiPjxhIGhyZWY9XCIjZm46MVwiPjE8L2E+PC9zdXA+XG5cdHByaXZhdGUgY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXI6IHN0cmluZywgcmVmSWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcblx0XHRjb25zdCBzdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdXAnKTtcblx0XHRzdXAuaWQgPSByZWZJZDtcblx0XHRjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdGxpbmsuaHJlZiA9IGAjZm46JHtmb290bm90ZU51bWJlcn1gO1xuXHRcdGxpbmsudGV4dENvbnRlbnQgPSBmb290bm90ZU51bWJlcjtcblx0XHRzdXAuYXBwZW5kQ2hpbGQobGluayk7XG5cdFx0cmV0dXJuIHN1cDtcblx0fVxuXG5cdHByaXZhdGUgc3RhbmRhcmRpemVGb290bm90ZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGNvbnN0IGZvb3Rub3RlcyA9IHRoaXMuY29sbGVjdEZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIFN0YW5kYXJkaXplIGlubGluZSBmb290bm90ZXMgdXNpbmcgdGhlIGNvbGxlY3RlZCBJRHNcblx0XHRjb25zdCBmb290bm90ZUlubGluZVJlZmVyZW5jZXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfSU5MSU5FX1JFRkVSRU5DRVMpO1xuXHRcdFxuXHRcdC8vIEdyb3VwIHJlZmVyZW5jZXMgYnkgdGhlaXIgcGFyZW50IHN1cCBlbGVtZW50XG5cdFx0Y29uc3Qgc3VwR3JvdXBzID0gbmV3IE1hcDxFbGVtZW50LCBFbGVtZW50W10+KCk7XG5cdFx0XG5cdFx0Zm9vdG5vdGVJbmxpbmVSZWZlcmVuY2VzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcblxuXHRcdFx0bGV0IGZvb3Rub3RlSWQgPSAnJztcblx0XHRcdGxldCBmb290bm90ZUNvbnRlbnQgPSAnJztcblxuXHRcdFx0Ly8gRXh0cmFjdCBmb290bm90ZSBJRCBiYXNlZCBvbiBlbGVtZW50IHR5cGVcblx0XHRcdC8vIE5hdHVyZS5jb21cblx0XHRcdGlmIChlbC5tYXRjaGVzKCdhW2lkXj1cInJlZi1saW5rXCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHQvLyBTY2llbmNlLm9yZ1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhW3JvbGU9XCJkb2MtYmlibGlvcmVmXCJdJykpIHtcblx0XHRcdFx0Y29uc3QgeG1sUmlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXhtbC1yaWQnKTtcblx0XHRcdFx0aWYgKHhtbFJpZCkge1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSB4bWxSaWQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmPy5zdGFydHNXaXRoKCcjY29yZS1SJykpIHtcblx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBocmVmLnJlcGxhY2UoJyNjb3JlLScsICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdC8vIFN1YnN0YWNrXG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2EuZm9vdG5vdGUtYW5jaG9yLCBzcGFuLmZvb3Rub3RlLWhvdmVyY2FyZC10YXJnZXQgYScpKSB7XG5cdFx0XHRcdGNvbnN0IGlkID0gZWwuaWQ/LnJlcGxhY2UoJ2Zvb3Rub3RlLWFuY2hvci0nLCAnJykgfHwgJyc7XG5cdFx0XHRcdGlmIChpZCkge1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBpZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHQvLyBBcnhpdlxuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdjaXRlLmx0eF9jaXRlJykpIHtcblx0XHRcdFx0Y29uc3QgbGluayA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRcdFx0aWYgKGxpbmspIHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBocmVmLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC9iaWJcXC5iaWIoXFxkKykvKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRmb290bm90ZUlkID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwLnJlZmVyZW5jZScpKSB7XG5cdFx0XHRcdGNvbnN0IGxpbmtzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdFx0XHRBcnJheS5mcm9tKGxpbmtzKS5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGhyZWYuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goLyg/OmNpdGVfbm90ZXxjaXRlX3JlZiktKC4rKS8pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3N1cFtpZF49XCJmbnJlZjpcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yZWY6JywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3N1cFtpZF49XCJmbnJcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3NwYW4uZm9vdG5vdGUtcmVmZXJlbmNlJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb290bm90ZS1pZCcpIHx8ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzcGFuLmZvb3Rub3RlLWxpbmsnKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvb3Rub3RlLWlkJykgfHwgJyc7XG5cdFx0XHRcdGZvb3Rub3RlQ29udGVudCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb290bm90ZS1jb250ZW50JykgfHwgJyc7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2EuY2l0YXRpb24nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0Zm9vdG5vdGVDb250ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2FbaWRePVwiZm5yZWZcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yZWYnLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE90aGVyIGNpdGF0aW9uIHR5cGVzXG5cdFx0XHRcdGNvbnN0IGhyZWYgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0aWYgKGhyZWYpIHtcblx0XHRcdFx0XHRjb25zdCBpZCA9IGhyZWYucmVwbGFjZSgvXlsjXS8sICcnKTtcblx0XHRcdFx0XHRmb290bm90ZUlkID0gaWQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZm9vdG5vdGVJZCkge1xuXHRcdFx0XHQvLyBGaW5kIHRoZSBmb290bm90ZSBudW1iZXIgYnkgbWF0Y2hpbmcgdGhlIG9yaWdpbmFsIElEXG5cdFx0XHRcdGNvbnN0IGZvb3Rub3RlRW50cnkgPSBPYmplY3QuZW50cmllcyhmb290bm90ZXMpLmZpbmQoXG5cdFx0XHRcdFx0KFtfLCBkYXRhXSkgPT4gZGF0YS5vcmlnaW5hbElkID09PSBmb290bm90ZUlkLnRvTG93ZXJDYXNlKClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoZm9vdG5vdGVFbnRyeSkge1xuXHRcdFx0XHRcdGNvbnN0IFtmb290bm90ZU51bWJlciwgZm9vdG5vdGVEYXRhXSA9IGZvb3Rub3RlRW50cnk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIGZvb3Rub3RlIHJlZmVyZW5jZSBJRFxuXHRcdFx0XHRcdGNvbnN0IHJlZklkID0gZm9vdG5vdGVEYXRhLnJlZnMubGVuZ3RoID4gMCA/IFxuXHRcdFx0XHRcdFx0YGZucmVmOiR7Zm9vdG5vdGVOdW1iZXJ9LSR7Zm9vdG5vdGVEYXRhLnJlZnMubGVuZ3RoICsgMX1gIDogXG5cdFx0XHRcdFx0XHRgZm5yZWY6JHtmb290bm90ZU51bWJlcn1gO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZvb3Rub3RlRGF0YS5yZWZzLnB1c2gocmVmSWQpO1xuXG5cdFx0XHRcdFx0Ly8gRmluZCB0aGUgb3V0ZXJtb3N0IGNvbnRhaW5lciAoc3BhbiBvciBzdXApXG5cdFx0XHRcdFx0Y29uc3QgY29udGFpbmVyID0gdGhpcy5maW5kT3V0ZXJGb290bm90ZUNvbnRhaW5lcihlbCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gSWYgY29udGFpbmVyIGlzIGEgc3VwLCBncm91cCByZWZlcmVuY2VzXG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lci50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdXAnKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXN1cEdyb3Vwcy5oYXMoY29udGFpbmVyKSkge1xuXHRcdFx0XHRcdFx0XHRzdXBHcm91cHMuc2V0KGNvbnRhaW5lciwgW10pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29uc3QgZ3JvdXAgPSBzdXBHcm91cHMuZ2V0KGNvbnRhaW5lcikhO1xuXHRcdFx0XHRcdFx0Z3JvdXAucHVzaCh0aGlzLmNyZWF0ZUZvb3Rub3RlUmVmZXJlbmNlKGZvb3Rub3RlTnVtYmVyLCByZWZJZCkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBSZXBsYWNlIHRoZSBjb250YWluZXIgZGlyZWN0bHlcblx0XHRcdFx0XHRcdGNvbnRhaW5lci5yZXBsYWNlV2l0aCh0aGlzLmNyZWF0ZUZvb3Rub3RlUmVmZXJlbmNlKGZvb3Rub3RlTnVtYmVyLCByZWZJZCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gSGFuZGxlIGdyb3VwZWQgcmVmZXJlbmNlc1xuXHRcdHN1cEdyb3Vwcy5mb3JFYWNoKChyZWZlcmVuY2VzLCBjb250YWluZXIpID0+IHtcblx0XHRcdGlmIChyZWZlcmVuY2VzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Ly8gQ3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgdG8gaG9sZCBhbGwgdGhlIHJlZmVyZW5jZXNcblx0XHRcdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBBZGQgZWFjaCByZWZlcmVuY2UgYXMgaXRzIG93biBzdXAgZWxlbWVudFxuXHRcdFx0XHRyZWZlcmVuY2VzLmZvckVhY2goKHJlZiwgaW5kZXgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBsaW5rID0gcmVmLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRcdFx0XHRpZiAobGluaykge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3VwJyk7XG5cdFx0XHRcdFx0XHRzdXAuaWQgPSByZWYuaWQ7XG5cdFx0XHRcdFx0XHRzdXAuYXBwZW5kQ2hpbGQobGluay5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoc3VwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Y29udGFpbmVyLnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIENyZWF0ZSB0aGUgc3RhbmRhcmRpemVkIGZvb3Rub3RlIGxpc3Rcblx0XHRjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdG5vdGVzJyk7XG5cdFx0bmV3TGlzdC5jbGFzc05hbWUgPSAnZm9vdG5vdGVzJztcblx0XHRjb25zdCBvcmRlcmVkTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29sJyk7XG5cblx0XHQvLyBDcmVhdGUgZm9vdG5vdGUgaXRlbXMgaW4gb3JkZXJcblx0XHRPYmplY3QuZW50cmllcyhmb290bm90ZXMpLmZvckVhY2goKFtudW1iZXIsIGRhdGFdKSA9PiB7XG5cdFx0XHRjb25zdCBuZXdJdGVtID0gdGhpcy5jcmVhdGVGb290bm90ZUl0ZW0oXG5cdFx0XHRcdHBhcnNlSW50KG51bWJlciksXG5cdFx0XHRcdGRhdGEuY29udGVudCxcblx0XHRcdFx0ZGF0YS5yZWZzXG5cdFx0XHQpO1xuXHRcdFx0b3JkZXJlZExpc3QuYXBwZW5kQ2hpbGQobmV3SXRlbSk7XG5cdFx0fSk7XG5cblx0XHQvLyBSZW1vdmUgb3JpZ2luYWwgZm9vdG5vdGUgbGlzdHNcblx0XHRjb25zdCBmb290bm90ZUxpc3RzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPT1ROT1RFX0xJU1RfU0VMRUNUT1JTKTtcblx0XHRmb290bm90ZUxpc3RzLmZvckVhY2gobGlzdCA9PiBsaXN0LnJlbW92ZSgpKTtcblxuXHRcdC8vIElmIHdlIGhhdmUgYW55IGZvb3Rub3RlcywgYWRkIHRoZSBuZXcgbGlzdCB0byB0aGUgZG9jdW1lbnRcblx0XHRpZiAob3JkZXJlZExpc3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0bmV3TGlzdC5hcHBlbmRDaGlsZChvcmRlcmVkTGlzdCk7XG5cdFx0XHRlbGVtZW50LmFwcGVuZENoaWxkKG5ld0xpc3QpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgaGFuZGxlTGF6eUltYWdlcyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblx0XHRjb25zdCBsYXp5SW1hZ2VzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWdbZGF0YS1zcmNdLCBpbWdbZGF0YS1zcmNzZXRdJyk7XG5cblx0XHRsYXp5SW1hZ2VzLmZvckVhY2goaW1nID0+IHtcblx0XHRcdGlmICghKGltZyBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpKSByZXR1cm47XG5cblx0XHRcdC8vIEhhbmRsZSBkYXRhLXNyY1xuXHRcdFx0Y29uc3QgZGF0YVNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0XHRpZiAoZGF0YVNyYyAmJiAhaW1nLnNyYykge1xuXHRcdFx0XHRpbWcuc3JjID0gZGF0YVNyYztcblx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdH1cblxuXHRcdFx0Ly8gSGFuZGxlIGRhdGEtc3Jjc2V0XG5cdFx0XHRjb25zdCBkYXRhU3Jjc2V0ID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHRcdGlmIChkYXRhU3Jjc2V0ICYmICFpbWcuc3Jjc2V0KSB7XG5cdFx0XHRcdGltZy5zcmNzZXQgPSBkYXRhU3Jjc2V0O1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgbGF6eSBsb2FkaW5nIHJlbGF0ZWQgY2xhc3NlcyBhbmQgYXR0cmlidXRlc1xuXHRcdFx0aW1nLmNsYXNzTGlzdC5yZW1vdmUoJ2xhenknLCAnbGF6eWxvYWQnKTtcblx0XHRcdGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbGwtc3RhdHVzJyk7XG5cdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUHJvY2Vzc2VkIGxhenkgaW1hZ2VzOicsIHByb2Nlc3NlZENvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhbmRhcmRpemVFbGVtZW50cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblxuXHRcdC8vIENvbnZlcnQgZWxlbWVudHMgYmFzZWQgb24gc3RhbmRhcmRpemF0aW9uIHJ1bGVzXG5cdFx0RUxFTUVOVF9TVEFOREFSRElaQVRJT05fUlVMRVMuZm9yRWFjaChydWxlID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHJ1bGUuc2VsZWN0b3IpO1xuXHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdGlmIChydWxlLnRyYW5zZm9ybSkge1xuXHRcdFx0XHRcdC8vIElmIHRoZXJlJ3MgYSB0cmFuc2Zvcm0gZnVuY3Rpb24sIHVzZSBpdCB0byBjcmVhdGUgdGhlIG5ldyBlbGVtZW50XG5cdFx0XHRcdFx0Y29uc3QgdHJhbnNmb3JtZWQgPSBydWxlLnRyYW5zZm9ybShlbCk7XG5cdFx0XHRcdFx0ZWwucmVwbGFjZVdpdGgodHJhbnNmb3JtZWQpO1xuXHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQ29udmVydCBsaXRlLXlvdXR1YmUgZWxlbWVudHNcblx0XHRjb25zdCBsaXRlWW91dHViZUVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaXRlLXlvdXR1YmUnKTtcblx0XHRsaXRlWW91dHViZUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0Y29uc3QgdmlkZW9JZCA9IGVsLmdldEF0dHJpYnV0ZSgndmlkZW9pZCcpO1xuXHRcdFx0aWYgKCF2aWRlb0lkKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXHRcdFx0aWZyYW1lLndpZHRoID0gJzU2MCc7XG5cdFx0XHRpZnJhbWUuaGVpZ2h0ID0gJzMxNSc7XG5cdFx0XHRpZnJhbWUuc3JjID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9JZH1gO1xuXHRcdFx0aWZyYW1lLnRpdGxlID0gZWwuZ2V0QXR0cmlidXRlKCd2aWRlb3RpdGxlJykgfHwgJ1lvdVR1YmUgdmlkZW8gcGxheWVyJztcblx0XHRcdGlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcblx0XHRcdGlmcmFtZS5hbGxvdyA9ICdhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgY2xpcGJvYXJkLXdyaXRlOyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlOyB3ZWItc2hhcmUnO1xuXHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xuXG5cdFx0XHRlbC5yZXBsYWNlV2l0aChpZnJhbWUpO1xuXHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHR9KTtcblxuXHRcdC8vIEFkZCBmdXR1cmUgZW1iZWQgY29udmVyc2lvbnMgKFR3aXR0ZXIsIEluc3RhZ3JhbSwgZXRjLilcblxuXHRcdHRoaXMuX2xvZygnQ29udmVydGVkIGVtYmVkZGVkIGVsZW1lbnRzOicsIHByb2Nlc3NlZENvdW50KTtcblx0fVxuXG5cdC8vIEZpbmQgc21hbGwgSU1HIGFuZCBTVkcgZWxlbWVudHNcblx0cHJpdmF0ZSBmaW5kU21hbGxJbWFnZXMoZG9jOiBEb2N1bWVudCk6IFNldDxzdHJpbmc+IHtcblx0XHRjb25zdCBNSU5fRElNRU5TSU9OID0gMzM7XG5cdFx0Y29uc3Qgc21hbGxJbWFnZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblx0XHRjb25zdCB0cmFuc2Zvcm1SZWdleCA9IC9zY2FsZVxcKChbXFxkLl0rKVxcKS87XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblxuXHRcdC8vIDEuIFJlYWQgcGhhc2UgLSBHYXRoZXIgYWxsIGVsZW1lbnRzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRjb25zdCBlbGVtZW50cyA9IFtcblx0XHRcdC4uLkFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKSksXG5cdFx0XHQuLi5BcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3ZnJykpXG5cdFx0XS5maWx0ZXIoZWxlbWVudCA9PiB7XG5cdFx0XHQvLyBTa2lwIGxhenktbG9hZGVkIGltYWdlcyB0aGF0IGhhdmVuJ3QgYmVlbiBwcm9jZXNzZWQgeWV0XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xhenknKSB8fCBcblx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGF6eWxvYWQnKSB8fFxuXHRcdFx0XHRcdGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLXNyYycpIHx8XG5cdFx0XHRcdFx0ZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRcdHJldHVybiAhaXNMYXp5O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gc21hbGxJbWFnZXM7XG5cdFx0fVxuXG5cdFx0Ly8gMi4gQmF0Y2ggcHJvY2VzcyAtIENvbGxlY3QgYWxsIG1lYXN1cmVtZW50cyBpbiBvbmUgZ29cblx0XHRjb25zdCBtZWFzdXJlbWVudHMgPSBlbGVtZW50cy5tYXAoZWxlbWVudCA9PiAoe1xuXHRcdFx0ZWxlbWVudCxcblx0XHRcdC8vIFN0YXRpYyBhdHRyaWJ1dGVzIChubyByZWZsb3cpXG5cdFx0XHRuYXR1cmFsV2lkdGg6IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ID8gZWxlbWVudC5uYXR1cmFsV2lkdGggOiAwLFxuXHRcdFx0bmF0dXJhbEhlaWdodDogZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgPyBlbGVtZW50Lm5hdHVyYWxIZWlnaHQgOiAwLFxuXHRcdFx0YXR0cldpZHRoOiBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnd2lkdGgnKSB8fCAnMCcpLFxuXHRcdFx0YXR0ckhlaWdodDogcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpIHx8ICcwJylcblx0XHR9KSk7XG5cblx0XHQvLyAzLiBCYXRjaCBjb21wdXRlIHN0eWxlcyAtIFByb2Nlc3MgaW4gY2h1bmtzIHRvIGF2b2lkIGxvbmcgdGFza3Ncblx0XHRjb25zdCBCQVRDSF9TSVpFID0gNTA7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtZWFzdXJlbWVudHMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcblx0XHRcdGNvbnN0IGJhdGNoID0gbWVhc3VyZW1lbnRzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcblx0XHRcdFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gUmVhZCBwaGFzZSAtIGNvbXB1dGUgYWxsIHN0eWxlcyBhdCBvbmNlXG5cdFx0XHRcdGNvbnN0IHN0eWxlcyA9IGJhdGNoLm1hcCgoeyBlbGVtZW50IH0pID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpKTtcblx0XHRcdFx0Y29uc3QgcmVjdHMgPSBiYXRjaC5tYXAoKHsgZWxlbWVudCB9KSA9PiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIFByb2Nlc3MgcGhhc2UgLSBubyBET00gb3BlcmF0aW9uc1xuXHRcdFx0XHRiYXRjaC5mb3JFYWNoKChtZWFzdXJlbWVudCwgaW5kZXgpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3R5bGUgPSBzdHlsZXNbaW5kZXhdO1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVjdCA9IHJlY3RzW2luZGV4XTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gR2V0IHRyYW5zZm9ybSBzY2FsZSBpbiB0aGUgc2FtZSBiYXRjaFxuXHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtO1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2NhbGUgPSB0cmFuc2Zvcm0gPyBcblx0XHRcdFx0XHRcdFx0cGFyc2VGbG9hdCh0cmFuc2Zvcm0ubWF0Y2godHJhbnNmb3JtUmVnZXgpPy5bMV0gfHwgJzEnKSA6IDE7XG5cblx0XHRcdFx0XHRcdC8vIENhbGN1bGF0ZSBlZmZlY3RpdmUgZGltZW5zaW9uc1xuXHRcdFx0XHRcdFx0Y29uc3Qgd2lkdGhzID0gW1xuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5uYXR1cmFsV2lkdGgsXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50LmF0dHJXaWR0aCxcblx0XHRcdFx0XHRcdFx0cGFyc2VJbnQoc3R5bGUud2lkdGgpIHx8IDAsXG5cdFx0XHRcdFx0XHRcdHJlY3Qud2lkdGggKiBzY2FsZVxuXHRcdFx0XHRcdFx0XS5maWx0ZXIoZGltID0+IHR5cGVvZiBkaW0gPT09ICdudW1iZXInICYmIGRpbSA+IDApO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBoZWlnaHRzID0gW1xuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5uYXR1cmFsSGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5hdHRySGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRwYXJzZUludChzdHlsZS5oZWlnaHQpIHx8IDAsXG5cdFx0XHRcdFx0XHRcdHJlY3QuaGVpZ2h0ICogc2NhbGVcblx0XHRcdFx0XHRcdF0uZmlsdGVyKGRpbSA9PiB0eXBlb2YgZGltID09PSAnbnVtYmVyJyAmJiBkaW0gPiAwKTtcblxuXHRcdFx0XHRcdFx0Ly8gRGVjaXNpb24gcGhhc2UgLSBubyBET00gb3BlcmF0aW9uc1xuXHRcdFx0XHRcdFx0aWYgKHdpZHRocy5sZW5ndGggPiAwICYmIGhlaWdodHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlZmZlY3RpdmVXaWR0aCA9IE1hdGgubWluKC4uLndpZHRocyk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVmZmVjdGl2ZUhlaWdodCA9IE1hdGgubWluKC4uLmhlaWdodHMpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChlZmZlY3RpdmVXaWR0aCA8IE1JTl9ESU1FTlNJT04gfHwgZWZmZWN0aXZlSGVpZ2h0IDwgTUlOX0RJTUVOU0lPTikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGlkZW50aWZpZXIgPSB0aGlzLmdldEVsZW1lbnRJZGVudGlmaWVyKG1lYXN1cmVtZW50LmVsZW1lbnQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzbWFsbEltYWdlcy5hZGQoaWRlbnRpZmllcik7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIGVsZW1lbnQgZGltZW5zaW9uczonLCBlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIGJhdGNoOicsIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuX2xvZygnRm91bmQgc21hbGwgZWxlbWVudHM6Jywge1xuXHRcdFx0Y291bnQ6IHByb2Nlc3NlZENvdW50LFxuXHRcdFx0dG90YWxFbGVtZW50czogZWxlbWVudHMubGVuZ3RoLFxuXHRcdFx0cHJvY2Vzc2luZ1RpbWU6IGAkeyhlbmRUaW1lIC0gc3RhcnRUaW1lKS50b0ZpeGVkKDIpfW1zYFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHNtYWxsSW1hZ2VzO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVTbWFsbEltYWdlcyhkb2M6IERvY3VtZW50LCBzbWFsbEltYWdlczogU2V0PHN0cmluZz4pIHtcblx0XHRsZXQgcmVtb3ZlZENvdW50ID0gMDtcblxuXHRcdFsnaW1nJywgJ3N2ZyddLmZvckVhY2godGFnID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG5cdFx0XHRBcnJheS5mcm9tKGVsZW1lbnRzKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRjb25zdCBpZGVudGlmaWVyID0gdGhpcy5nZXRFbGVtZW50SWRlbnRpZmllcihlbGVtZW50KTtcblx0XHRcdFx0aWYgKGlkZW50aWZpZXIgJiYgc21hbGxJbWFnZXMuaGFzKGlkZW50aWZpZXIpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmUoKTtcblx0XHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgc21hbGwgZWxlbWVudHM6JywgcmVtb3ZlZENvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0RWxlbWVudElkZW50aWZpZXIoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB8IG51bGwge1xuXHRcdC8vIFRyeSB0byBjcmVhdGUgYSB1bmlxdWUgaWRlbnRpZmllciB1c2luZyB2YXJpb3VzIGF0dHJpYnV0ZXNcblx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcblx0XHRcdC8vIEZvciBsYXp5LWxvYWRlZCBpbWFnZXMsIHVzZSBkYXRhLXNyYyBhcyBpZGVudGlmaWVyIGlmIGF2YWlsYWJsZVxuXHRcdFx0Y29uc3QgZGF0YVNyYyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aWYgKGRhdGFTcmMpIHJldHVybiBgc3JjOiR7ZGF0YVNyY31gO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBzcmMgPSBlbGVtZW50LnNyYyB8fCAnJztcblx0XHRcdGNvbnN0IHNyY3NldCA9IGVsZW1lbnQuc3Jjc2V0IHx8ICcnO1xuXHRcdFx0Y29uc3QgZGF0YVNyY3NldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc3JjKSByZXR1cm4gYHNyYzoke3NyY31gO1xuXHRcdFx0aWYgKHNyY3NldCkgcmV0dXJuIGBzcmNzZXQ6JHtzcmNzZXR9YDtcblx0XHRcdGlmIChkYXRhU3Jjc2V0KSByZXR1cm4gYHNyY3NldDoke2RhdGFTcmNzZXR9YDtcblx0XHR9XG5cblx0XHRjb25zdCBpZCA9IGVsZW1lbnQuaWQgfHwgJyc7XG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgfHwgJyc7XG5cdFx0Y29uc3Qgdmlld0JveCA9IGVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKSB8fCAnJyA6ICcnO1xuXHRcdFxuXHRcdGlmIChpZCkgcmV0dXJuIGBpZDoke2lkfWA7XG5cdFx0aWYgKHZpZXdCb3gpIHJldHVybiBgdmlld0JveDoke3ZpZXdCb3h9YDtcblx0XHRpZiAoY2xhc3NOYW1lKSByZXR1cm4gYGNsYXNzOiR7Y2xhc3NOYW1lfWA7XG5cdFx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRNYWluQ29udGVudChkb2M6IERvY3VtZW50KTogRWxlbWVudCB8IG51bGwge1xuXG5cdFx0Ly8gRmluZCBhbGwgcG90ZW50aWFsIGNvbnRlbnQgY29udGFpbmVyc1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXM6IHsgZWxlbWVudDogRWxlbWVudDsgc2NvcmU6IG51bWJlciB9W10gPSBbXTtcblxuXHRcdEVOVFJZX1BPSU5UX0VMRU1FTlRTLmZvckVhY2goKHNlbGVjdG9yLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHQvLyBCYXNlIHNjb3JlIGZyb20gc2VsZWN0b3IgcHJpb3JpdHkgKGVhcmxpZXIgPSBoaWdoZXIpXG5cdFx0XHRcdGxldCBzY29yZSA9IChFTlRSWV9QT0lOVF9FTEVNRU5UUy5sZW5ndGggLSBpbmRleCkgKiAxMDtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFkZCBzY29yZSBiYXNlZCBvbiBjb250ZW50IGFuYWx5c2lzXG5cdFx0XHRcdHNjb3JlICs9IHRoaXMuc2NvcmVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRcblx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoKHsgZWxlbWVudCwgc2NvcmUgfSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGlmIChjYW5kaWRhdGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0Ly8gRmFsbCBiYWNrIHRvIHNjb3JpbmcgYmxvY2sgZWxlbWVudHNcblx0XHRcdC8vIEN1cnJlbnRseSA8Ym9keT4gZWxlbWVudCBpcyB1c2VkIGFzIHRoZSBmYWxsYmFjaywgc28gdGhpcyBpcyBub3QgdXNlZFxuXHRcdFx0cmV0dXJuIHRoaXMuZmluZENvbnRlbnRCeVNjb3JpbmcoZG9jKTtcblx0XHR9XG5cblx0XHQvLyBTb3J0IGJ5IHNjb3JlIGRlc2NlbmRpbmdcblx0XHRjYW5kaWRhdGVzLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcblx0XHRcblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0dGhpcy5fbG9nKCdDb250ZW50IGNhbmRpZGF0ZXM6JywgY2FuZGlkYXRlcy5tYXAoYyA9PiAoe1xuXHRcdFx0XHRlbGVtZW50OiBjLmVsZW1lbnQudGFnTmFtZSxcblx0XHRcdFx0c2VsZWN0b3I6IHRoaXMuZ2V0RWxlbWVudFNlbGVjdG9yKGMuZWxlbWVudCksXG5cdFx0XHRcdHNjb3JlOiBjLnNjb3JlXG5cdFx0XHR9KSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYW5kaWRhdGVzWzBdLmVsZW1lbnQ7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRDb250ZW50QnlTY29yaW5nKGRvYzogRG9jdW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG5cdFx0Y29uc3QgY2FuZGlkYXRlcyA9IHRoaXMuc2NvcmVFbGVtZW50cyhkb2MpO1xuXHRcdHJldHVybiBjYW5kaWRhdGVzLmxlbmd0aCA+IDAgPyBjYW5kaWRhdGVzWzBdLmVsZW1lbnQgOiBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRFbGVtZW50U2VsZWN0b3IoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3QgcGFydHM6IHN0cmluZ1tdID0gW107XG5cdFx0bGV0IGN1cnJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWxlbWVudDtcblx0XHRcblx0XHR3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSB0aGlzLmRvYy5kb2N1bWVudEVsZW1lbnQpIHtcblx0XHRcdGxldCBzZWxlY3RvciA9IGN1cnJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKGN1cnJlbnQuaWQpIHtcblx0XHRcdFx0c2VsZWN0b3IgKz0gJyMnICsgY3VycmVudC5pZDtcblx0XHRcdH0gZWxzZSBpZiAoY3VycmVudC5jbGFzc05hbWUgJiYgdHlwZW9mIGN1cnJlbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRzZWxlY3RvciArPSAnLicgKyBjdXJyZW50LmNsYXNzTmFtZS50cmltKCkuc3BsaXQoL1xccysvKS5qb2luKCcuJyk7XG5cdFx0XHR9XG5cdFx0XHRwYXJ0cy51bnNoaWZ0KHNlbGVjdG9yKTtcblx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcgPiAnKTtcblx0fVxuXG5cdHByaXZhdGUgc2NvcmVFbGVtZW50cyhkb2M6IERvY3VtZW50KTogQ29udGVudFNjb3JlW10ge1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXM6IENvbnRlbnRTY29yZVtdID0gW107XG5cblx0XHRCTE9DS19FTEVNRU5UUy5mb3JFYWNoKCh0YWc6IHN0cmluZykgPT4ge1xuXHRcdFx0QXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKSkuZm9yRWFjaCgoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzY29yZSA9IHRoaXMuc2NvcmVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoc2NvcmUgPiAwKSB7XG5cdFx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoKHsgc2NvcmUsIGVsZW1lbnQgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXMuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuXHR9XG5cblx0cHJpdmF0ZSBzY29yZUVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IG51bWJlciB7XG5cdFx0bGV0IHNjb3JlID0gMDtcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGVsZW1lbnQgcHJvcGVydGllc1xuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICYmIHR5cGVvZiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgPyBcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0XHRjb25zdCBpZCA9IGVsZW1lbnQuaWQgPyBlbGVtZW50LmlkLnRvTG93ZXJDYXNlKCkgOiAnJztcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGNvbnRlbnRcblx0XHRjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRjb25zdCB3b3JkcyA9IHRleHQuc3BsaXQoL1xccysvKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gTWF0aC5taW4oTWF0aC5mbG9vcih3b3JkcyAvIDEwMCksIDMpO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gbGluayBkZW5zaXR5XG5cdFx0Y29uc3QgbGlua3MgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG5cdFx0Y29uc3QgbGlua1RleHQgPSBBcnJheS5mcm9tKGxpbmtzKS5yZWR1Y2UoKGFjYywgbGluaykgPT4gYWNjICsgKGxpbmsudGV4dENvbnRlbnQ/Lmxlbmd0aCB8fCAwKSwgMCk7XG5cdFx0Y29uc3QgbGlua0RlbnNpdHkgPSB0ZXh0Lmxlbmd0aCA/IGxpbmtUZXh0IC8gdGV4dC5sZW5ndGggOiAwO1xuXHRcdGlmIChsaW5rRGVuc2l0eSA+IDAuNSkge1xuXHRcdFx0c2NvcmUgLT0gMTA7XG5cdFx0fVxuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gcHJlc2VuY2Ugb2YgbWVhbmluZ2Z1bCBlbGVtZW50c1xuXHRcdGNvbnN0IHBhcmFncmFwaHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwJykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IHBhcmFncmFwaHM7XG5cblx0XHRjb25zdCBpbWFnZXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gTWF0aC5taW4oaW1hZ2VzICogMywgOSk7XG5cblx0XHRyZXR1cm4gc2NvcmU7XG5cdH1cbn0gIiwiLy8gRW50cnkgcG9pbnQgZWxlbWVudHNcbi8vIFRoZXNlIGFyZSB0aGUgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZmluZCB0aGUgbWFpbiBjb250ZW50XG5leHBvcnQgY29uc3QgRU5UUllfUE9JTlRfRUxFTUVOVFMgPSBbXG5cdCdhcnRpY2xlJyxcblx0J1tyb2xlPVwiYXJ0aWNsZVwiXScsXG5cdCdbaXRlbXByb3A9XCJhcnRpY2xlQm9keVwiXScsXG5cdCcucG9zdC1jb250ZW50Jyxcblx0Jy5hcnRpY2xlLWNvbnRlbnQnLFxuXHQnI2FydGljbGUtY29udGVudCcsXG5cdCcuY29udGVudC1hcnRpY2xlJyxcblx0J21haW4nLFxuXHQnW3JvbGU9XCJtYWluXCJdJyxcblx0J2JvZHknIC8vIGVuc3VyZXMgdGhlcmUgaXMgYWx3YXlzIGEgbWF0Y2hcbl07XG5cbmV4cG9ydCBjb25zdCBNT0JJTEVfV0lEVEggPSA2MDA7XG5leHBvcnQgY29uc3QgQkxPQ0tfRUxFTUVOVFMgPSBbJ2RpdicsICdzZWN0aW9uJywgJ2FydGljbGUnLCAnbWFpbiddO1xuXG4vLyBFbGVtZW50cyB0aGF0IHNob3VsZCBub3QgYmUgdW53cmFwcGVkXG5leHBvcnQgY29uc3QgUFJFU0VSVkVfRUxFTUVOVFMgPSBuZXcgU2V0KFtcblx0J3ByZScsICdjb2RlJywgJ3RhYmxlJywgJ3RoZWFkJywgJ3Rib2R5JywgJ3RyJywgJ3RkJywgJ3RoJyxcblx0J3VsJywgJ29sJywgJ2xpJywgJ2RsJywgJ2R0JywgJ2RkJyxcblx0J2ZpZ3VyZScsICdmaWdjYXB0aW9uJywgJ3BpY3R1cmUnLFxuXHQnZGV0YWlscycsICdzdW1tYXJ5Jyxcblx0J2Jsb2NrcXVvdGUnLFxuXHQnZm9ybScsICdmaWVsZHNldCdcbl0pO1xuXG4vLyBJbmxpbmUgZWxlbWVudHMgdGhhdCBzaG91bGQgbm90IGJlIHVud3JhcHBlZFxuZXhwb3J0IGNvbnN0IElOTElORV9FTEVNRU5UUyA9IG5ldyBTZXQoW1xuXHQnYScsICdzcGFuJywgJ3N0cm9uZycsICdlbScsICdpJywgJ2InLCAndScsICdjb2RlJywgJ2JyJywgJ3NtYWxsJyxcblx0J3N1YicsICdzdXAnLCAnbWFyaycsICdkZWwnLCAnaW5zJywgJ3EnLCAnYWJicicsICdjaXRlJywgJ3RpbWUnXG5dKTtcblxuLy8gSGlkZGVuIGVsZW1lbnRzIHRoYXQgc2hvdWxkIGJlIHJlbW92ZWRcbmV4cG9ydCBjb25zdCBISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMgPSBbXG5cdCdbaGlkZGVuXScsXG5cdCdbYXJpYS1oaWRkZW49XCJ0cnVlXCJdJyxcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nLCBjYXVzZXMgcHJvYmxlbXMgZm9yIG1hdGggZm9ybXVsYXNcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXScsXG5cdCdbc3R5bGUqPVwidmlzaWJpbGl0eTogaGlkZGVuXCJdJyxcblx0J1tzdHlsZSo9XCJ2aXNpYmlsaXR5OmhpZGRlblwiXScsXG5cdCcuaGlkZGVuJyxcblx0Jy5pbnZpc2libGUnXG5dLmpvaW4oJywnKTtcblxuLy8gU2VsZWN0b3JzIHRvIGJlIHJlbW92ZWRcbmV4cG9ydCBjb25zdCBFWEFDVF9TRUxFQ1RPUlMgPSBbXG5cdC8vIHNjcmlwdHMsIHN0eWxlc1xuXHQnbm9zY3JpcHQnLFxuXHQnc2NyaXB0Jyxcblx0J3N0eWxlJyxcblxuXHQvLyBhZHNcblx0Jy5hZDpub3QoW2NsYXNzKj1cImdyYWRpZW50XCJdKScsXG5cdCdbY2xhc3NePVwiYWQtXCIgaV0nLFxuXHQnW2NsYXNzJD1cIi1hZFwiIGldJyxcblx0J1tpZF49XCJhZC1cIiBpXScsXG5cdCdbaWQkPVwiLWFkXCIgaV0nLFxuXHQnW3JvbGU9XCJiYW5uZXJcIiBpXScsXG5cdCcucHJvbW8nLFxuXHQnLlByb21vJyxcblxuXHQvLyBjb21tZW50c1xuXHQnW2lkPVwiY29tbWVudHNcIiBpXScsXG5cblx0Ly8gaGVhZGVyLCBuYXZcblx0J2hlYWRlcicsXG5cdCcuaGVhZGVyJyxcblx0JyNoZWFkZXInLFxuXHQnbmF2Jyxcblx0Jy5uYXZpZ2F0aW9uJyxcblx0JyNuYXZpZ2F0aW9uJyxcblx0J1tyb2xlPVwibmF2aWdhdGlvblwiIGldJyxcblx0J1tyb2xlPVwiZGlhbG9nXCIgaV0nLFxuXHQnW3JvbGUqPVwiY29tcGxlbWVudGFyeVwiIGldJyxcblx0J1tjbGFzcyo9XCJwYWdpbmF0aW9uXCIgaV0nLFxuXHQnLm1lbnUnLFxuXHQnI21lbnUnLFxuXHQnI3NpdGVTdWInLFxuXG5cdC8vIG1ldGFkYXRhXG5cdCcuYXV0aG9yJyxcblx0Jy5BdXRob3InLFxuXHQnLmNvbnRyaWJ1dG9yJyxcblx0Jy5kYXRlJyxcblx0Jy5tZXRhJyxcblx0Jy50YWdzJyxcblx0Jy50b2MnLFxuXHQnLlRvYycsXG5cdCcjdG9jJyxcblx0JyN0aXRsZScsXG5cdCcjVGl0bGUnLFxuXHQnW2hyZWYqPVwiL2NhdGVnb3J5XCJdJyxcblx0J1tocmVmKj1cIi9jYXRlZ29yaWVzXCJdJyxcblx0J1tocmVmKj1cIi90YWcvXCJdJyxcblx0J1tocmVmKj1cIi90YWdzL1wiXScsXG5cdCdbaHJlZio9XCIvdG9waWNzXCJdJyxcblx0J1tocmVmKj1cImF1dGhvclwiXScsXG5cdCdbaHJlZj1cIiNzaXRlLWNvbnRlbnRcIl0nLFxuXHQnW3NyYyo9XCJhdXRob3JcIl0nLFxuXG5cdC8vIGZvb3RlclxuXHQnZm9vdGVyJyxcblxuXHQvLyBpbnB1dHMsIGZvcm1zLCBlbGVtZW50c1xuXHQnYXNpZGUnLFxuXHQnYnV0dG9uJyxcblx0XHQvLyAnW3JvbGU9XCJidXR0b25cIl0nLCBNZWRpdW0gaW1hZ2VzXG5cdCdjYW52YXMnLFxuXHQnZGlhbG9nJyxcblx0J2ZpZWxkc2V0Jyxcblx0J2Zvcm0nLFxuXHQnaW5wdXQ6bm90KFt0eXBlPVwiY2hlY2tib3hcIl0pJyxcblx0J2xhYmVsJyxcblx0J2xpbmsnLFxuXHQnb3B0aW9uJyxcblx0J3NlbGVjdCcsXG5cdCd0ZXh0YXJlYScsXG5cdCd0aW1lJyxcblxuXHQvLyBpZnJhbWVzXG5cdCdpbnN0YXJlYWQtcGxheWVyJyxcblx0J2lmcmFtZTpub3QoW3NyYyo9XCJ5b3V0dWJlXCJdKTpub3QoW3NyYyo9XCJ5b3V0dS5iZVwiXSk6bm90KFtzcmMqPVwidmltZW9cIl0pOm5vdChbc3JjKj1cInR3aXR0ZXJcIl0pJyxcblxuXHQvLyBsb2dvc1xuXHQnW2NsYXNzPVwibG9nb1wiIGldJyxcblx0JyNsb2dvJyxcblx0JyNMb2dvJyxcblxuXHQvLyBuZXdzbGV0dGVyXG5cdCcjbmV3c2xldHRlcicsXG5cdCcjTmV3c2xldHRlcicsXG5cblx0Ly8gaGlkZGVuIGZvciBwcmludFxuXHQnLm5vcHJpbnQnLFxuXHQnW2RhdGEtbGluay1uYW1lKj1cInNraXBcIiBpXScsXG5cdCdbZGF0YS1wcmludC1sYXlvdXQ9XCJoaWRlXCIgaV0nLFxuXHQnW2RhdGEtYmxvY2s9XCJkb25vdHByaW50XCIgaV0nLFxuXG5cdC8vIGZvb3Rub3RlcywgY2l0YXRpb25zXG5cdCdbY2xhc3MqPVwiY2xpY2thYmxlLWljb25cIiBpXScsXG5cdCdsaSBzcGFuW2NsYXNzKj1cImx0eF90YWdcIiBpXVtjbGFzcyo9XCJsdHhfdGFnX2l0ZW1cIiBpXScsXG5cdCdhW2hyZWZePVwiI1wiXVtjbGFzcyo9XCJhbmNob3JcIiBpXScsXG5cdCdhW2hyZWZePVwiI1wiXVtjbGFzcyo9XCJyZWZcIiBpXScsXG5cblx0Ly8gbGluayBsaXN0c1xuXHQnW2RhdGEtY29udGFpbmVyKj1cIm1vc3Qtdmlld2VkXCIgaV0nLFxuXG5cdC8vIHNpZGViYXJcblx0Jy5zaWRlYmFyJyxcblx0Jy5TaWRlYmFyJyxcblx0JyNzaWRlYmFyJyxcblx0JyNTaWRlYmFyJyxcblx0JyNzaXRlc3ViJyxcblx0XG5cdC8vIG90aGVyXG5cdCcjTllUX0FCT1ZFX01BSU5fQ09OVEVOVF9SRUdJT04nLFxuXHQnW2RhdGEtdGVzdGlkPVwicGhvdG92aWV3ZXItY2hpbGRyZW4tZmlndXJlXCJdID4gc3BhbicsIC8vIE5ldyBZb3JrIFRpbWVzXG5cdCd0YWJsZS5pbmZvYm94Jyxcblx0Jy5wZW5jcmFmdDpub3QoLnBjLWRpc3BsYXktY29udGVudHMpJywgLy8gU3Vic3RhY2tcblx0J1tkYXRhLW9wdGltaXplbHk9XCJyZWxhdGVkLWFydGljbGVzLXNlY3Rpb25cIiBpXScgLy8gVGhlIEVjb25vbWlzdFxuXTtcblxuLy8gUmVtb3ZhbCBwYXR0ZXJucyB0ZXN0ZWQgYWdhaW5zdCBhdHRyaWJ1dGVzOiBjbGFzcywgaWQsIGRhdGEtdGVzdGlkLCBhbmQgZGF0YS1xYVxuLy8gQ2FzZSBpbnNlbnNpdGl2ZSwgcGFydGlhbCBtYXRjaGVzIGFsbG93ZWRcbmV4cG9ydCBjb25zdCBQQVJUSUFMX1NFTEVDVE9SUyA9IFtcblx0J2FjY2Vzcy13YWxsJyxcblx0J2FjdGl2aXR5cHViJyxcblx0J2FjdGlvbmNhbGwnLFxuXHQnYXBwZW5kaXgnLFxuXHQnYXZhdGFyJyxcblx0J2FkdmVydCcsXG5cdCctYWQtJyxcblx0J19hZF8nLFxuXHQnYWxsdGVybXMnLFxuXHQnYXJvdW5kLXRoZS13ZWInLFxuXHQnYXJ0aWNsZS1ib3R0b20tc2VjdGlvbicsXG5cdCdhcnRpY2xlX19jb3B5Jyxcblx0J2FydGljbGVfZGF0ZScsXG5cdCdhcnRpY2xlLWVuZCAnLFxuXHQnYXJ0aWNsZV9oZWFkZXInLFxuXHQnYXJ0aWNsZV9faGVhZGVyJyxcblx0J2FydGljbGVfX2luZm8nLFxuXHQnYXJ0aWNsZS1pbmZvJyxcblx0J2FydGljbGVfX21ldGEnLFxuXHQnYXJ0aWNsZS1zdWJqZWN0Jyxcblx0J2FydGljbGVfc3ViamVjdCcsXG5cdCdhcnRpY2xlLXNuaXBwZXQnLFxuXHQnYXJ0aWNsZS1zZXBhcmF0b3InLFxuXHQnYXJ0aWNsZS10YWdzJyxcblx0J2FydGljbGVfdGFncycsXG5cdCdhcnRpY2xlLXRpdGxlJyxcblx0J2FydGljbGVfdGl0bGUnLFxuXHQnYXJ0aWNsZXRvcGljcycsXG5cdCdhcnRpY2xlLXRvcGljcycsXG5cdCdhcnRpY2xlLXR5cGUnLFxuXHQnYXJ0aWNsZS0tbGVkZScsIC8vIFRoZSBWZXJnZVxuXHQnYXNzb2NpYXRlZC1wZW9wbGUnLFxuLy9cdCdhdXRob3InLCBHd2VyblxuXHQnYXV0aG9yLW5hbWUnLFxuXHQnYmFjay10by10b3AnLFxuXHQnYmFja2xpbmtzLXNlY3Rpb24nLFxuXHQnYmFubmVyJyxcblx0J2Jpby1ibG9jaycsXG5cdCdibG9nLXBhZ2VyJyxcblx0J2JvdHRvbS1vZi1hcnRpY2xlJyxcblx0J2JyYW5kLWJhcicsXG5cdCdicmVhZGNydW1iJyxcblx0J2J1dHRvbi13cmFwcGVyJyxcblx0J2J0bi0nLFxuXHQnLWJ0bicsXG5cdCdieWxpbmUnLFxuXHQnY2FwdGNoYScsXG5cdCdjYXRfaGVhZGVyJyxcblx0J2NhdGxpbmtzJyxcblx0J2NoYXB0ZXItbGlzdCcsIC8vIFRoZSBFY29ub21pc3Rcblx0J2NvbGxlY3Rpb25zJyxcblx0J2NvbW1lbnRzJyxcbi8vXHQnLWNvbW1lbnQnLCBTeW50YXggaGlnaGxpZ2h0aW5nXG5cdCdjb21tZW50LWNvdW50Jyxcblx0J2NvbW1lbnQtY29udGVudCcsXG5cdCdjb21tZW50LWZvcm0nLFxuXHQnY29tbWVudC1udW1iZXInLFxuXHQnY29tbWVudC1yZXNwb25kJyxcblx0J2NvbW1lbnQtdGhyZWFkJyxcblx0J2NvbXBsZW1lbnRhcnknLFxuXHQnY29uc2VudCcsXG5cdCdjb250ZW50LWNhcmQnLCAvLyBUaGUgVmVyZ2Vcblx0J2NvbnRlbnQtdG9waWNzJyxcblx0J2NvbnRlbnRwcm9tbycsXG5cdCdjb250ZXh0LXdpZGdldCcsIC8vIFJldXRlcnNcblx0J2NvcmUtY29sbGF0ZXJhbCcsXG5cdCdfY3RhJyxcblx0Jy1jdGEnLFxuXHQnY3RhLScsXG5cdCdjdGFfJyxcblx0J2N1cnJlbnQtaXNzdWUnLCAvLyBUaGUgTmF0aW9uXG5cdCdjdXN0b20tbGlzdC1udW1iZXInLFxuXHQnZGF0ZWxpbmUnLFxuXHQnZGF0ZWhlYWRlcicsXG5cdCdkYXRlLWhlYWRlcicsXG5cdCdkYXRlX2hlYWRlci0nLFxuLy9cdCdkaWFsb2cnLFxuXHQnZGlzY2xhaW1lcicsXG5cdCdkaXNjbG9zdXJlJyxcblx0J2Rpc2N1c3Npb24nLFxuXHQnZGlzY3Vzc18nLFxuXHQnZGlzcXVzJyxcblx0J2RvbmF0ZScsXG5cdCdkcm9wZG93bicsIC8vIEFycyBUZWNobmljYVxuXHQnZWxldHRlcnMnLFxuXHQnZW1haWxzaWdudXAnLFxuXHQnZW5nYWdlbWVudC13aWRnZXQnLFxuXHQnZW50cnktYXV0aG9yLWluZm8nLFxuXHQnZW50cnktY2F0ZWdvcmllcycsXG5cdCdlbnRyeS1kYXRlJyxcblx0J2VudHJ5LW1ldGEnLFxuXHQnZW50cnktdGl0bGUnLFxuXHQnZW50cnktdXRpbGl0eScsXG5cdCdleWVicm93Jyxcblx0J2V4cGFuZC1yZWR1Y2UnLFxuXHQnZXh0ZXJuYWxsaW5rZW1iZWR3cmFwcGVyJywgLy8gVGhlIE5ldyBZb3JrZXJcblx0J2V4dHJhLXNlcnZpY2VzJyxcblx0J2V4dHJhLXRpdGxlJyxcblx0J2ZhY2Vib29rJyxcblx0J2Zhdm9yaXRlJyxcblx0J2ZlZWRiYWNrJyxcblx0J2ZlZWQtbGlua3MnLFxuXHQnZmllbGQtc2l0ZS1zZWN0aW9ucycsXG5cdCdmaXhlZCcsXG5cdCdmbG9hdGluZy12aWQnLFxuXHQnZm9sbG93Jyxcblx0J2Zvb3RlcicsXG5cdCdmb290bm90ZS1iYWNrJyxcblx0J2Zvb3Rub3RlYmFjaycsXG5cdCdmb3IteW91Jyxcblx0J2Zyb250bWF0dGVyJyxcblx0J2Z1cnRoZXItcmVhZGluZycsXG5cdCdnaXN0LW1ldGEnLFxuLy9cdCdnbG9iYWwnLFxuXHQnZ29vZ2xlJyxcblx0J2dvb2ctJyxcblx0J2dyYXBoLXZpZXcnLFxuXHQnaGVhZGVyLWxvZ28nLFxuXHQnaGVhZGVyLXBhdHRlcm4nLCAvLyBUaGUgVmVyZ2Vcblx0J2hlcm8tbGlzdCcsXG5cdCdoaWRlLWZvci1wcmludCcsXG5cdCdoaWRlLXByaW50Jyxcblx0J2hpZGRlbi1zaWRlbm90ZScsXG5cdCdpbnRlcmx1ZGUnLFxuXHQnaW50ZXJhY3Rpb24nLFxuXHQnanVtcGxpbmsnLFxuXHQnanVtcC10by0nLFxuLy9cdCdrZXl3b3JkJywgLy8gdXNlZCBpbiBzeW50YXggaGlnaGxpZ2h0aW5nXG5cdCdraWNrZXInLFxuXHQnbGFic3RhYicsIC8vIEFyeGl2XG5cdCctbGFiZWxzJyxcblx0J2xhbmd1YWdlLW5hbWUnLFxuXHQnbGF0ZXN0LWNvbnRlbnQnLFxuXHQnLWxlZGVzLScsIC8vIFRoZSBWZXJnZVxuXHQnLWxpY2Vuc2UnLFxuXHQnbGluay1ib3gnLFxuXHQnbGlua3MtZ3JpZCcsIC8vIEJCQ1xuXHQnbGlua3MtdGl0bGUnLCAvLyBCQkNcblx0J2xpc3RpbmctZHluYW1pYy10ZXJtcycsIC8vIEJvc3RvbiBSZXZpZXdcblx0J2xpc3QtdGFncycsXG5cdCdsb2FkaW5nJyxcblx0J2xvYS1pbmZvJyxcblx0J2xvZ29fY29udGFpbmVyJyxcblx0J2x0eF9yb2xlX3JlZm51bScsIC8vIEFyeGl2XG5cdCdsdHhfdGFnX2JpYml0ZW0nLFxuXHQnbHR4X2Vycm9yJyxcblx0J21hcmtldGluZycsXG5cdCdtZWRpYS1pbnF1aXJ5Jyxcblx0J21lbnUtJyxcblx0J21ldGEtJyxcblx0J21ldGFkYXRhJyxcblx0J21pZ2h0LWxpa2UnLFxuXHQnX21vZGFsJyxcblx0Jy1tb2RhbCcsXG5cdCdtb3JlLScsXG5cdCdtb3JlbmV3cycsXG5cdCdtb3Jlc3RvcmllcycsXG5cdCdtb3ZlLWhlbHBlcicsXG5cdCdtdy1lZGl0c2VjdGlvbicsXG5cdCdtdy1jaXRlLWJhY2tsaW5rJyxcblx0J213LWluZGljYXRvcnMnLFxuXHQnbXctanVtcC1saW5rJyxcblx0J25hdi0nLFxuXHQnbmF2XycsXG5cdCduYXZiYXInLFxuLy9cdCduYXZpZ2F0aW9uJyxcblx0J25leHQtJyxcblx0J25ld3Mtc3RvcnktdGl0bGUnLFxuLy9cdCduZXdzbGV0dGVyJywgdXNlZCBvbiBTdWJzdGFja1xuXHQnbmV3c2xldHRlcl8nLFxuXHQnbmV3c2xldHRlci1zaWdudXAnLFxuXHQnbmV3c2xldHRlcnNpZ251cCcsXG5cdCduZXdzbGV0dGVyd2lkZ2V0Jyxcblx0J25ld3NsZXR0ZXJ3cmFwcGVyJyxcblx0J25vdC1mb3VuZCcsXG5cdCdub21vYmlsZScsXG5cdCdub3ByaW50Jyxcblx0J29yaWdpbmFsbHktcHVibGlzaGVkJywgLy8gTWVyY3VyeSBOZXdzXG5cdCdvdXRsaW5lLXZpZXcnLFxuXHQnb3ZlcmxheScsXG5cdCdwYWdlLXRpdGxlJyxcblx0Jy1wYXJ0bmVycycsXG5cdCdwbGVhJyxcblx0J3BvcHVsYXInLFxuLy9cdCdwb3B1cCcsIEd3ZXJuXG5cdCdwb3AtdXAnLFxuXHQncG9wb3ZlcicsXG5cdCdwb3N0LWJvdHRvbScsXG5cdCdwb3N0X19jYXRlZ29yeScsXG5cdCdwb3N0Y29tbWVudCcsXG5cdCdwb3N0ZGF0ZScsXG5cdCdwb3N0LWF1dGhvcicsXG5cdCdwb3N0LWRhdGUnLFxuXHQncG9zdF9kYXRlJyxcblx0J3Bvc3QtZmVlZHMnLFxuXHQncG9zdGluZm8nLFxuXHQncG9zdC1pbmZvJyxcblx0J3Bvc3RfaW5mbycsXG5cdCdwb3N0LWlubGluZS1kYXRlJyxcblx0J3Bvc3QtbGlua3MnLFxuXHQncG9zdC1tZXRhJyxcblx0J3Bvc3RtZXRhJyxcblx0J3Bvc3RzbmlwcGV0Jyxcblx0J3Bvc3Rfc25pcHBldCcsXG5cdCdwb3N0LXNuaXBwZXQnLFxuXHQncG9zdHRpdGxlJyxcblx0J3Bvc3QtdGl0bGUnLFxuXHQncG9zdF90aXRsZScsXG5cdCdwb3N0dGF4Jyxcblx0J3Bvc3QtdGF4Jyxcblx0J3Bvc3RfdGF4Jyxcblx0J3Bvc3R0YWcnLFxuXHQncG9zdF90YWcnLFxuXHQncG9zdC10YWcnLFxuLy9cdCdwcmV2aWV3JywgdXNlZCBvbiBPYnNpZGlhbiBQdWJsaXNoXG5cdCdwcmV2bmV4dCcsXG5cdCdwcmV2aW91c25leHQnLFxuXHQncHJpbnQtbm9uZScsXG5cdCdwcmludC1oZWFkZXInLFxuXHQncHJvZmlsZScsXG4vL1x0J3Byb21vJyxcblx0J3Byb21vLWJveCcsXG5cdCdwdWJkYXRlJyxcblx0J3B1Yl9kYXRlJyxcblx0J3B1Yi1kYXRlJyxcblx0J3B1YmxpY2F0aW9uLWRhdGUnLFxuXHQncHVibGljYXRpb25OYW1lJywgLy8gTWVkaXVtXG5cdCdxci1jb2RlJyxcblx0J3FyX2NvZGUnLFxuXHQnX3JhaWwnLFxuXHQncmVhZG1vcmUnLFxuXHQncmVhZC1uZXh0Jyxcblx0J3JlYWRfbmV4dCcsXG5cdCdyZWFkX3RpbWUnLFxuXHQncmVhZC10aW1lJyxcblx0J3JlYWRpbmdfdGltZScsXG5cdCdyZWFkaW5nLXRpbWUnLFxuXHQncmVhZGluZy1saXN0Jyxcblx0J3JlY2VudHBvc3QnLFxuXHQncmVjZW50X3Bvc3QnLFxuXHQncmVjZW50LXBvc3QnLFxuXHQncmVjb21tZW5kJyxcblx0J3JlZGlyZWN0ZWRmcm9tJyxcblx0J3JlY2lyYycsXG5cdCdyZWdpc3RlcicsXG5cdCdyZWxhdGVkJyxcblx0J3JlbGV2YW50Jyxcblx0J3JldmVyc2Vmb290bm90ZScsXG5cdCdzY3JlZW4tcmVhZGVyLXRleHQnLFxuLy9cdCdzaGFyZScsXG4vL1x0Jy1zaGFyZScsIHNjaXRlY2hkYWlseS5jb21cblx0J3NoYXJlLWJveCcsXG5cdCdzaGFyZS1pY29ucycsXG5cdCdzaGFyZWxpbmtzJyxcblx0J3NoYXJlLXNlY3Rpb24nLFxuXHQnc2lkZWJhcnRpdGxlJyxcblx0J3NpZGViYXJfJyxcblx0J3NpbWlsYXItJyxcblx0J3NpbWlsYXJfJyxcblx0J3NpbWlsYXJzLScsXG5cdCdzaWRlaXRlbXMnLFxuXHQnc2lkZS1ib3gnLFxuXHQnc2l0ZS1pbmRleCcsXG5cdCdzaXRlLWhlYWRlcicsXG5cdCdzaXRlLWxvZ28nLFxuXHQnc2l0ZS1uYW1lJyxcbi8vXHQnc2tpcC0nLFxuLy9cdCdza2lwLWxpbmsnLCBUZWNoQ3J1bmNoXG5cdCdzb2NpYWwnLFxuXHQnc3BlZWNoaWZ5LWlnbm9yZScsXG5cdCdzcG9uc29yJyxcblx0J3NwcmluZ2VyY2l0YXRpb24nLFxuLy9cdCctc3RhdHMnLFxuXHQnX3N0YXRzJyxcblx0J3N0aWNreScsXG5cdCdzdG9yeXJlYWR0aW1lJywgLy8gTWVkaXVtXG5cdCdzdG9yeXB1Ymxpc2hkYXRlJywgLy8gTWVkaXVtXG5cdCdzdWJqZWN0LWxhYmVsJyxcblx0J3N1YnNjcmliZScsXG5cdCdfdGFncycsXG5cdCd0YWdzX19pdGVtJyxcblx0J3RhZ19saXN0Jyxcblx0J3RheG9ub215Jyxcblx0J3RhYmxlLW9mLWNvbnRlbnRzJyxcblx0J3RhYnMtJyxcbi8vXHQndGVhc2VyJywgTmF0dXJlXG5cdCd0ZXJtaW5hbHRvdXQnLFxuXHQndGltZS1ydWJyaWMnLFxuXHQndGltZXN0YW1wJyxcblx0J3RpcF9vZmYnLFxuXHQndGlwdG91dCcsXG5cdCctdG91dC0nLFxuXHQnLXRvYycsXG5cdCd0b3BpYy1saXN0Jyxcblx0J3Rvb2xiYXInLFxuXHQndG9vbHRpcCcsXG5cdCd0b3Atd3JhcHBlcicsXG5cdCd0cmVlLWl0ZW0nLFxuXHQndHJlbmRpbmcnLFxuXHQndHJ1c3QtZmVhdCcsXG5cdCd0cnVzdC1iYWRnZScsXG5cdCd0d2l0dGVyJyxcblx0J3Zpc3VhbGx5LWhpZGRlbicsXG5cdCd3ZWxjb21lYm94J1xuXTtcblxuLy8gU2VsZWN0b3JzIGZvciBmb290bm90ZXMgYW5kIGNpdGF0aW9uc1xuZXhwb3J0IGNvbnN0IEZPT1ROT1RFX0lOTElORV9SRUZFUkVOQ0VTID0gW1xuXHQnc3VwLnJlZmVyZW5jZScsXG5cdCdjaXRlLmx0eF9jaXRlJyxcblx0J3N1cFtpZF49XCJmbnJcIl0nLFxuXHQnc3VwW2lkXj1cImZucmVmOlwiXScsXG5cdCdzcGFuLmZvb3Rub3RlLWxpbmsnLFxuXHQnYS5jaXRhdGlvbicsXG5cdCdhW2lkXj1cInJlZi1saW5rXCJdJyxcblx0J2FbaHJlZl49XCIjZm5cIl0nLFxuXHQnYVtocmVmXj1cIiNjaXRlXCJdJyxcblx0J2FbaHJlZl49XCIjcmVmZXJlbmNlXCJdJyxcblx0J2FbaHJlZl49XCIjZm9vdG5vdGVcIl0nLFxuXHQnYVtocmVmXj1cIiNyXCJdJywgLy8gQ29tbW9uIGluIGFjYWRlbWljIHBhcGVyc1xuXHQnYVtocmVmXj1cIiNiXCJdJywgLy8gQ29tbW9uIGZvciBiaWJsaW9ncmFwaHkgcmVmZXJlbmNlc1xuXHQnYVtocmVmKj1cImNpdGVfbm90ZVwiXScsXG5cdCdhW2hyZWYqPVwiY2l0ZV9yZWZcIl0nLFxuXHQnYS5mb290bm90ZS1hbmNob3InLCAvLyBTdWJzdGFja1xuXHQnc3Bhbi5mb290bm90ZS1ob3ZlcmNhcmQtdGFyZ2V0IGEnLCAvLyBTdWJzdGFja1xuXHQnYVtyb2xlPVwiZG9jLWJpYmxpb3JlZlwiXScsIC8vIFNjaWVuY2Uub3JnXG5cdCdhW2lkXj1cImZucmVmXCJdJyxcblx0J2FbaWRePVwicmVmLWxpbmtcIl0nLCAvLyBOYXR1cmUuY29tXG5dLmpvaW4oJywnKTtcblxuZXhwb3J0IGNvbnN0IEZPT1ROT1RFX0xJU1RfU0VMRUNUT1JTID0gW1xuXHQnZGl2LmZvb3Rub3RlIG9sJyxcblx0J2Rpdi5mb290bm90ZXMgb2wnLFxuXHQnZGl2W3JvbGU9XCJkb2MtZW5kbm90ZXNcIl0nLFxuXHQnZGl2W3JvbGU9XCJkb2MtZm9vdG5vdGVzXCJdJyxcblx0J29sLmZvb3Rub3Rlcy1saXN0Jyxcblx0J29sLmZvb3Rub3RlcycsXG5cdCdvbC5yZWZlcmVuY2VzJyxcblx0J29sW2NsYXNzKj1cImFydGljbGUtcmVmZXJlbmNlc1wiXScsXG5cdCdzZWN0aW9uLmZvb3Rub3RlcyBvbCcsXG5cdCdzZWN0aW9uW3JvbGU9XCJkb2MtZW5kbm90ZXNcIl0nLFxuXHQnc2VjdGlvbltyb2xlPVwiZG9jLWZvb3Rub3Rlc1wiXScsXG5cdCdzZWN0aW9uW3JvbGU9XCJkb2MtYmlibGlvZ3JhcGh5XCJdJyxcblx0J3VsLmZvb3Rub3Rlcy1saXN0Jyxcblx0J3VsLmx0eF9iaWJsaXN0Jyxcblx0J2Rpdi5mb290bm90ZVtkYXRhLWNvbXBvbmVudC1uYW1lPVwiRm9vdG5vdGVUb0RPTVwiXScgLy8gU3Vic3RhY2tcbl0uam9pbignLCcpO1xuXG4vLyBFbGVtZW50cyB0aGF0IGFyZSBhbGxvd2VkIHRvIGJlIGVtcHR5XG4vLyBUaGVzZSBhcmUgbm90IHJlbW92ZWQgZXZlbiBpZiB0aGV5IGhhdmUgbm8gY29udGVudFxuZXhwb3J0IGNvbnN0IEFMTE9XRURfRU1QVFlfRUxFTUVOVFMgPSBuZXcgU2V0KFtcblx0J2FyZWEnLFxuXHQnYXVkaW8nLFxuXHQnYmFzZScsXG5cdCdicicsXG5cdCdjaXJjbGUnLFxuXHQnY29sJyxcblx0J2RlZnMnLFxuXHQnZWxsaXBzZScsXG5cdCdlbWJlZCcsXG5cdCdmaWd1cmUnLFxuXHQnZycsXG5cdCdocicsXG5cdCdpZnJhbWUnLFxuXHQnaW1nJyxcblx0J2lucHV0Jyxcblx0J2xpbmUnLFxuXHQnbGluaycsXG5cdCdtYXNrJyxcblx0J21ldGEnLFxuXHQnb2JqZWN0Jyxcblx0J3BhcmFtJyxcblx0J3BhdGgnLFxuXHQncGF0dGVybicsXG5cdCdwaWN0dXJlJyxcblx0J3BvbHlnb24nLFxuXHQncG9seWxpbmUnLFxuXHQncmVjdCcsXG5cdCdzb3VyY2UnLFxuXHQnc3RvcCcsXG5cdCdzdmcnLFxuXHQndGQnLFxuXHQndGgnLFxuXHQndHJhY2snLFxuXHQndXNlJyxcblx0J3ZpZGVvJyxcblx0J3dicidcbl0pO1xuXG4vLyBBdHRyaWJ1dGVzIHRvIGtlZXBcbmV4cG9ydCBjb25zdCBBTExPV0VEX0FUVFJJQlVURVMgPSBuZXcgU2V0KFtcblx0J2FsdCcsXG5cdCdhbGxvdycsXG5cdCdhbGxvd2Z1bGxzY3JlZW4nLFxuXHQnYXJpYS1sYWJlbCcsXG5cdCdjaGVja2VkJyxcblx0J2NvbHNwYW4nLFxuXHQnY29udHJvbHMnLFxuXHQnZGF0YS1zcmMnLFxuXHQnZGF0YS1zcmNzZXQnLFxuXHQnZGF0YS1sYW5nJyxcblx0J2RpcicsXG5cdCdmcmFtZWJvcmRlcicsXG5cdCdoZWFkZXJzJyxcblx0J2hlaWdodCcsXG5cdCdocmVmJyxcblx0J2xhbmcnLFxuXHQncm9sZScsXG5cdCdyb3dzcGFuJyxcblx0J3NyYycsXG5cdCdzcmNzZXQnLFxuXHQndGl0bGUnLFxuXHQndHlwZScsXG5cdCd3aWR0aCdcbl0pO1xuZXhwb3J0IGNvbnN0IEFMTE9XRURfQVRUUklCVVRFU19ERUJVRyA9IG5ldyBTZXQoW1xuXHQnY2xhc3MnLFxuXHQnaWQnLFxuXSk7XG5cbi8vIFN1cHBvcnRlZCBsYW5ndWFnZXMgZm9yIGNvZGUgYmxvY2tzXG5leHBvcnQgY29uc3QgU1VQUE9SVEVEX0xBTkdVQUdFUyA9IG5ldyBTZXQoW1xuXHQvLyBNYXJrdXAgJiBXZWJcblx0J21hcmt1cCcsICdodG1sJywgJ3htbCcsICdzdmcnLCAnbWF0aG1sJywgJ3NzbWwnLCAnYXRvbScsICdyc3MnLFxuXHQnamF2YXNjcmlwdCcsICdqcycsICdqc3gnLCAndHlwZXNjcmlwdCcsICd0cycsICd0c3gnLFxuXHQnd2ViYXNzZW1ibHknLCAnd2FzbScsXG5cdFxuXHQvLyBDb21tb24gUHJvZ3JhbW1pbmcgTGFuZ3VhZ2VzXG5cdCdweXRob24nLFxuXHQnamF2YScsXG5cdCdjc2hhcnAnLCAnY3MnLCAnZG90bmV0JywgJ2FzcG5ldCcsXG5cdCdjcHAnLCAnYysrJywgJ2MnLCAnb2JqYycsXG5cdCdydWJ5JywgJ3JiJyxcblx0J3BocCcsXG5cdCdnb2xhbmcnLFxuXHQncnVzdCcsXG5cdCdzd2lmdCcsXG5cdCdrb3RsaW4nLFxuXHQnc2NhbGEnLFxuXHQnZGFydCcsXG5cdFxuXHQvLyBTaGVsbCAmIFNjcmlwdGluZ1xuXHQnYmFzaCcsICdzaGVsbCcsICdzaCcsXG5cdCdwb3dlcnNoZWxsJyxcblx0J2JhdGNoJyxcblx0XG5cdC8vIERhdGEgJiBDb25maWdcblx0J2pzb24nLCAnanNvbnAnLFxuXHQneWFtbCcsICd5bWwnLFxuXHQndG9tbCcsXG5cdCdkb2NrZXJmaWxlJyxcblx0J2dpdGlnbm9yZScsXG5cdFxuXHQvLyBRdWVyeSBMYW5ndWFnZXNcblx0J3NxbCcsICdteXNxbCcsICdwb3N0Z3Jlc3FsJyxcblx0J2dyYXBocWwnLFxuXHQnbW9uZ29kYicsXG5cdCdzcGFycWwnLFxuXHRcblx0Ly8gTWFya3VwICYgRG9jdW1lbnRhdGlvblxuXHQnbWFya2Rvd24nLCAnbWQnLFxuXHQnbGF0ZXgnLCAndGV4Jyxcblx0J2FzY2lpZG9jJywgJ2Fkb2MnLFxuXHQnanNkb2MnLFxuXHRcblx0Ly8gRnVuY3Rpb25hbCBMYW5ndWFnZXNcblx0J2hhc2tlbGwnLCAnaHMnLFxuXHQnZWxtJyxcblx0J2VsaXhpcicsXG5cdCdlcmxhbmcnLFxuXHQnb2NhbWwnLFxuXHQnZnNoYXJwJyxcblx0J3NjaGVtZScsXG5cdCdsaXNwJywgJ2VsaXNwJyxcblx0J2Nsb2p1cmUnLFxuXHRcblx0Ly8gT3RoZXIgTGFuZ3VhZ2VzXG5cdCdtYXRsYWInLFxuXHQnZm9ydHJhbicsXG5cdCdjb2JvbCcsXG5cdCdwYXNjYWwnLFxuXHQncGVybCcsXG5cdCdsdWEnLFxuXHQnanVsaWEnLFxuXHQnZ3Jvb3Z5Jyxcblx0J2NyeXN0YWwnLFxuXHQnbmltJyxcblx0J3ppZycsXG5cdFxuXHQvLyBEb21haW4gU3BlY2lmaWNcblx0J3JlZ2V4Jyxcblx0J2dyYWRsZScsXG5cdCdjbWFrZScsXG5cdCdtYWtlZmlsZScsXG5cdCduaXgnLFxuXHQndGVycmFmb3JtJyxcblx0J3NvbGlkaXR5Jyxcblx0J2dsc2wnLFxuXHQnaGxzbCcsXG5cdFxuXHQvLyBBc3NlbWJseVxuXHQnbmFzbScsXG5cdCdtYXNtJyxcblx0J2FybWFzbScsXG5cdFxuXHQvLyBHYW1lIERldmVsb3BtZW50XG5cdCdnZHNjcmlwdCcsXG5cdCd1bnJlYWxzY3JpcHQnLFxuXHRcblx0Ly8gT3RoZXJzXG5cdCdhYmFwJyxcblx0J2FjdGlvbnNjcmlwdCcsXG5cdCdhZGEnLFxuXHQnYWdkYScsXG5cdCdhbnRscjQnLFxuXHQnYXBwbGVzY3JpcHQnLFxuXHQnYXJkdWlubycsXG5cdCdjb2ZmZWVzY3JpcHQnLFxuXHQnZGphbmdvJyxcblx0J2VybGFuZycsXG5cdCdmb3J0cmFuJyxcblx0J2hheGUnLFxuXHQnaWRyaXMnLFxuXHQna290bGluJyxcblx0J2xpdmVzY3JpcHQnLFxuXHQnbWF0bGFiJyxcblx0J25naW54Jyxcblx0J3Bhc2NhbCcsXG5cdCdwcm9sb2cnLFxuXHQncHVwcGV0Jyxcblx0J3NjYWxhJyxcblx0J3NjaGVtZScsXG5cdCd0Y2wnLFxuXHQndmVyaWxvZycsXG5cdCd2aGRsJ1xuXSk7XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJleHBvcnQgeyBEZWZ1ZGRsZSB9IGZyb20gJy4vZGVmdWRkbGUnO1xuZXhwb3J0IHR5cGUgeyBEZWZ1ZGRsZU9wdGlvbnMsIERlZnVkZGxlUmVzcG9uc2UsIERlZnVkZGxlTWV0YWRhdGEgfSBmcm9tICcuL3R5cGVzJzsgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
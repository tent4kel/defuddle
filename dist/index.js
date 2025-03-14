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
    'author-box',
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
    'commentbox',
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
    'welcomebox',
    'widget-'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNOLGNBQWM7SUFDZCxLQUFLO0lBQ0wsTUFBTTtJQUNOLFFBQVE7SUFDUixhQUFhO0lBQ2IsU0FBUztJQUNULGNBQWM7SUFDZCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxNQUFNO0lBQ04sT0FBTztJQUNQLFFBQVE7SUFDUixZQUFZO0lBQ1osUUFBUTtJQUNSLE9BQU87SUFDUCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixPQUFPO0lBQ1AsUUFBUTtJQUNSLEtBQUs7SUFDTCxTQUFTO0lBQ1QsTUFBTTtDQUNOLENBQUMsQ0FBQzs7Ozs7OztVQ2pzQkg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSw0REFBc0M7QUFBN0IsNkdBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZ1ZGRsZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvbWV0YWRhdGEudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvZGVmdWRkbGUudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL0RlZnVkZGxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZnVkZGxlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlZnVkZGxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlZnVkZGxlXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdGhpcywgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IERlZnVkZGxlTWV0YWRhdGEgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIE1ldGFkYXRhRXh0cmFjdG9yIHtcblx0c3RhdGljIGV4dHJhY3QoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogRGVmdWRkbGVNZXRhZGF0YSB7XG5cdFx0bGV0IGRvbWFpbiA9ICcnO1xuXHRcdGxldCB1cmwgPSAnJztcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBUcnkgdG8gZ2V0IFVSTCBmcm9tIGRvY3VtZW50IGxvY2F0aW9uXG5cdFx0XHR1cmwgPSBkb2MubG9jYXRpb24/LmhyZWYgfHwgJyc7XG5cdFx0XHRcblx0XHRcdC8vIElmIG5vIFVSTCBmcm9tIGxvY2F0aW9uLCB0cnkgb3RoZXIgc291cmNlc1xuXHRcdFx0aWYgKCF1cmwpIHtcblx0XHRcdFx0dXJsID0gdGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzp1cmxcIikgfHxcblx0XHRcdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcInR3aXR0ZXI6dXJsXCIpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICd1cmwnKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnbWFpbkVudGl0eU9mUGFnZS51cmwnKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnbWFpbkVudGl0eS51cmwnKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnV2ViU2l0ZS51cmwnKSB8fFxuXHRcdFx0XHRcdGRvYy5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cImNhbm9uaWNhbFwiXScpPy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHVybCkge1xuXHRcdFx0XHRkb21haW4gPSBuZXcgVVJMKHVybCkuaG9zdG5hbWUucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBJZiBVUkwgcGFyc2luZyBmYWlscywgdHJ5IHRvIGdldCBmcm9tIGJhc2UgdGFnXG5cdFx0XHRjb25zdCBiYXNlVGFnID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2Jhc2VbaHJlZl0nKTtcblx0XHRcdGlmIChiYXNlVGFnKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dXJsID0gYmFzZVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcblx0XHRcdFx0XHRkb21haW4gPSBuZXcgVVJMKHVybCkuaG9zdG5hbWUucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignRmFpbGVkIHRvIHBhcnNlIGJhc2UgVVJMOicsIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiB0aGlzLmdldFRpdGxlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRkZXNjcmlwdGlvbjogdGhpcy5nZXREZXNjcmlwdGlvbihkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0ZG9tYWluLFxuXHRcdFx0ZmF2aWNvbjogdGhpcy5nZXRGYXZpY29uKGRvYywgdXJsKSxcblx0XHRcdGltYWdlOiB0aGlzLmdldEltYWdlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRwdWJsaXNoZWQ6IHRoaXMuZ2V0UHVibGlzaGVkKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRhdXRob3I6IHRoaXMuZ2V0QXV0aG9yKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRzaXRlOiB0aGlzLmdldFNpdGUoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdHNjaGVtYU9yZ0RhdGEsXG5cdFx0XHR3b3JkQ291bnQ6IDAsXG5cdFx0XHRwYXJzZVRpbWU6IDBcblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0QXV0aG9yKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5hdXRob3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnYXV0aG9yLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJhdXRob3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJieWxcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhdXRob3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhdXRob3JMaXN0XCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiY29weXJpZ2h0XCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2NvcHlyaWdodEhvbGRlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6c2l0ZV9uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3B1Ymxpc2hlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnc291cmNlT3JnYW5pemF0aW9uLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdpc1BhcnRPZi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmNyZWF0b3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhcHBsaWNhdGlvbi1uYW1lXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRTaXRlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAncHVibGlzaGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpzaXRlX25hbWVcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnV2ViU2l0ZS5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnc291cmNlT3JnYW5pemF0aW9uLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImNvcHlyaWdodFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdjb3B5cmlnaHRIb2xkZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2lzUGFydE9mLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImFwcGxpY2F0aW9uLW5hbWVcIikgfHxcblx0XHRcdHRoaXMuZ2V0QXV0aG9yKGRvYywgc2NoZW1hT3JnRGF0YSkgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFRpdGxlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0Y29uc3QgcmF3VGl0bGUgPSAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjp0aXRsZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdoZWFkbGluZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidGl0bGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS50aXRsZVwiKSB8fFxuXHRcdFx0ZG9jLnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJyk/LnRleHRDb250ZW50Py50cmltKCkgfHxcblx0XHRcdCcnXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzLmNsZWFuVGl0bGUocmF3VGl0bGUsIHRoaXMuZ2V0U2l0ZShkb2MsIHNjaGVtYU9yZ0RhdGEpKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGNsZWFuVGl0bGUodGl0bGU6IHN0cmluZywgc2l0ZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0aWYgKCF0aXRsZSB8fCAhc2l0ZU5hbWUpIHJldHVybiB0aXRsZTtcblxuXHRcdC8vIFJlbW92ZSBzaXRlIG5hbWUgaWYgaXQgZXhpc3RzXG5cdFx0Y29uc3Qgc2l0ZU5hbWVFc2NhcGVkID0gc2l0ZU5hbWUucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcblx0XHRjb25zdCBwYXR0ZXJucyA9IFtcblx0XHRcdGBcXFxccypbXFxcXHxcXFxcLeKAk+KAlF1cXFxccyoke3NpdGVOYW1lRXNjYXBlZH1cXFxccyokYCwgLy8gVGl0bGUgfCBTaXRlIE5hbWVcblx0XHRcdGBeXFxcXHMqJHtzaXRlTmFtZUVzY2FwZWR9XFxcXHMqW1xcXFx8XFxcXC3igJPigJRdXFxcXHMqYCwgLy8gU2l0ZSBOYW1lIHwgVGl0bGVcblx0XHRdO1xuXHRcdFxuXHRcdGZvciAoY29uc3QgcGF0dGVybiBvZiBwYXR0ZXJucykge1xuXHRcdFx0Y29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sICdpJyk7XG5cdFx0XHRpZiAocmVnZXgudGVzdCh0aXRsZSkpIHtcblx0XHRcdFx0dGl0bGUgPSB0aXRsZS5yZXBsYWNlKHJlZ2V4LCAnJyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aXRsZS50cmltKCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXREZXNjcmlwdGlvbihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6ZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnZGVzY3JpcHRpb24nKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6ZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5kZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0SW1hZ2UoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzppbWFnZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6aW1hZ2VcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnaW1hZ2UudXJsJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5pbWFnZS5mdWxsXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRGYXZpY29uKGRvYzogRG9jdW1lbnQsIGJhc2VVcmw6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Y29uc3QgaWNvbkZyb21NZXRhID0gdGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzppbWFnZTpmYXZpY29uXCIpO1xuXHRcdGlmIChpY29uRnJvbU1ldGEpIHJldHVybiBpY29uRnJvbU1ldGE7XG5cblx0XHRjb25zdCBpY29uTGluayA9IGRvYy5xdWVyeVNlbGVjdG9yKFwibGlua1tyZWw9J2ljb24nXVwiKT8uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZiAoaWNvbkxpbmspIHJldHVybiBpY29uTGluaztcblxuXHRcdGNvbnN0IHNob3J0Y3V0TGluayA9IGRvYy5xdWVyeVNlbGVjdG9yKFwibGlua1tyZWw9J3Nob3J0Y3V0IGljb24nXVwiKT8uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZiAoc2hvcnRjdXRMaW5rKSByZXR1cm4gc2hvcnRjdXRMaW5rO1xuXG5cdFx0Ly8gT25seSB0cnkgdG8gY29uc3RydWN0IGZhdmljb24gVVJMIGlmIHdlIGhhdmUgYSB2YWxpZCBiYXNlIFVSTFxuXHRcdGlmIChiYXNlVXJsKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFVSTChcIi9mYXZpY29uLmljb1wiLCBiYXNlVXJsKS5ocmVmO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBjb25zdHJ1Y3QgZmF2aWNvbiBVUkw6JywgZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0UHVibGlzaGVkKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnZGF0ZVB1Ymxpc2hlZCcpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwicHVibGlzaERhdGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiYXJ0aWNsZTpwdWJsaXNoZWRfdGltZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRUaW1lRWxlbWVudChkb2MpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuZGF0ZVwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0TWV0YUNvbnRlbnQoZG9jOiBEb2N1bWVudCwgYXR0cjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBzZWxlY3RvciA9IGBtZXRhWyR7YXR0cn1dYDtcblx0XHRjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG5cdFx0XHQuZmluZChlbCA9PiBlbC5nZXRBdHRyaWJ1dGUoYXR0cik/LnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpPy50cmltKCkgPz8gXCJcIiA6IFwiXCI7XG5cdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGNvbnRlbnQsIGRvYyk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRUaW1lRWxlbWVudChkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCBzZWxlY3RvciA9IGB0aW1lYDtcblx0XHRjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpWzBdO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50ID8gKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0ZXRpbWVcIik/LnRyaW0oKSA/PyBlbGVtZW50LnRleHRDb250ZW50Py50cmltKCkgPz8gXCJcIikgOiBcIlwiO1xuXHRcdHJldHVybiB0aGlzLmRlY29kZUhUTUxFbnRpdGllcyhjb250ZW50LCBkb2MpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZGVjb2RlSFRNTEVudGl0aWVzKHRleHQ6IHN0cmluZywgZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3QgdGV4dGFyZWEgPSBkb2MuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcblx0XHR0ZXh0YXJlYS5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFNjaGVtYVByb3BlcnR5KGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSwgcHJvcGVydHk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XG5cdFx0aWYgKCFzY2hlbWFPcmdEYXRhKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG5cdFx0Y29uc3Qgc2VhcmNoU2NoZW1hID0gKGRhdGE6IGFueSwgcHJvcHM6IHN0cmluZ1tdLCBmdWxsUGF0aDogc3RyaW5nLCBpc0V4YWN0TWF0Y2g6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nW10gPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4gcHJvcHMubGVuZ3RoID09PSAwID8gW2RhdGFdIDogW107XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmICghZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHRcdFx0XHRjb25zdCBjdXJyZW50UHJvcCA9IHByb3BzWzBdO1xuXHRcdFx0XHRpZiAoL15cXFtcXGQrXFxdJC8udGVzdChjdXJyZW50UHJvcCkpIHtcblx0XHRcdFx0XHRjb25zdCBpbmRleCA9IHBhcnNlSW50KGN1cnJlbnRQcm9wLnNsaWNlKDEsIC0xKSk7XG5cdFx0XHRcdFx0aWYgKGRhdGFbaW5kZXhdKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhcmNoU2NoZW1hKGRhdGFbaW5kZXhdLCBwcm9wcy5zbGljZSgxKSwgZnVsbFBhdGgsIGlzRXhhY3RNYXRjaCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKHByb3BzLmxlbmd0aCA9PT0gMCAmJiBkYXRhLmV2ZXJ5KGl0ZW0gPT4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBpdGVtID09PSAnbnVtYmVyJykpIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YS5tYXAoU3RyaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIGRhdGEuZmxhdE1hcChpdGVtID0+IHNlYXJjaFNjaGVtYShpdGVtLCBwcm9wcywgZnVsbFBhdGgsIGlzRXhhY3RNYXRjaCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBbY3VycmVudFByb3AsIC4uLnJlbWFpbmluZ1Byb3BzXSA9IHByb3BzO1xuXHRcdFx0XG5cdFx0XHRpZiAoIWN1cnJlbnRQcm9wKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHJldHVybiBbZGF0YV07XG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgZGF0YS5uYW1lKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtkYXRhLm5hbWVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoY3VycmVudFByb3ApKSB7XG5cdFx0XHRcdHJldHVybiBzZWFyY2hTY2hlbWEoZGF0YVtjdXJyZW50UHJvcF0sIHJlbWFpbmluZ1Byb3BzLCBcblx0XHRcdFx0XHRmdWxsUGF0aCA/IGAke2Z1bGxQYXRofS4ke2N1cnJlbnRQcm9wfWAgOiBjdXJyZW50UHJvcCwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXNFeGFjdE1hdGNoKSB7XG5cdFx0XHRcdGNvbnN0IG5lc3RlZFJlc3VsdHM6IHN0cmluZ1tdID0gW107XG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGRhdGFba2V5XSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoZGF0YVtrZXldLCBwcm9wcywgXG5cdFx0XHRcdFx0XHRcdGZ1bGxQYXRoID8gYCR7ZnVsbFBhdGh9LiR7a2V5fWAgOiBrZXksIGZhbHNlKTtcblx0XHRcdFx0XHRcdG5lc3RlZFJlc3VsdHMucHVzaCguLi5yZXN1bHRzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG5lc3RlZFJlc3VsdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHJldHVybiBuZXN0ZWRSZXN1bHRzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBbXTtcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGxldCByZXN1bHRzID0gc2VhcmNoU2NoZW1hKHNjaGVtYU9yZ0RhdGEsIHByb3BlcnR5LnNwbGl0KCcuJyksICcnLCB0cnVlKTtcblx0XHRcdGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXN1bHRzID0gc2VhcmNoU2NoZW1hKHNjaGVtYU9yZ0RhdGEsIHByb3BlcnR5LnNwbGl0KCcuJyksICcnLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA+IDAgPyByZXN1bHRzLmZpbHRlcihCb29sZWFuKS5qb2luKCcsICcpIDogZGVmYXVsdFZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKHJlc3VsdCwgZG9jKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgaW4gZ2V0U2NoZW1hUHJvcGVydHkgZm9yICR7cHJvcGVydHl9OmAsIGVycm9yKTtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGV4dHJhY3RTY2hlbWFPcmdEYXRhKGRvYzogRG9jdW1lbnQpOiBhbnkge1xuXHRcdGNvbnN0IHNjaGVtYVNjcmlwdHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJyk7XG5cdFx0Y29uc3Qgc2NoZW1hRGF0YTogYW55W10gPSBbXTtcblxuXHRcdHNjaGVtYVNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4ge1xuXHRcdFx0bGV0IGpzb25Db250ZW50ID0gc2NyaXB0LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRqc29uQ29udGVudCA9IGpzb25Db250ZW50XG5cdFx0XHRcdFx0LnJlcGxhY2UoL1xcL1xcKltcXHNcXFNdKj9cXCpcXC98XlxccypcXC9cXC8uKiQvZ20sICcnKVxuXHRcdFx0XHRcdC5yZXBsYWNlKC9eXFxzKjwhXFxbQ0RBVEFcXFsoW1xcc1xcU10qPylcXF1cXF0+XFxzKiQvLCAnJDEnKVxuXHRcdFx0XHRcdC5yZXBsYWNlKC9eXFxzKihcXCpcXC98XFwvXFwqKVxccyp8XFxzKihcXCpcXC98XFwvXFwqKVxccyokL2csICcnKVxuXHRcdFx0XHRcdC50cmltKCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdGNvbnN0IGpzb25EYXRhID0gSlNPTi5wYXJzZShqc29uQ29udGVudCk7XG5cblx0XHRcdFx0aWYgKGpzb25EYXRhWydAZ3JhcGgnXSAmJiBBcnJheS5pc0FycmF5KGpzb25EYXRhWydAZ3JhcGgnXSkpIHtcblx0XHRcdFx0XHRzY2hlbWFEYXRhLnB1c2goLi4uanNvbkRhdGFbJ0BncmFwaCddKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY2hlbWFEYXRhLnB1c2goanNvbkRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBwYXJzaW5nIHNjaGVtYS5vcmcgZGF0YTonLCBlcnJvcik7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1Byb2JsZW1hdGljIEpTT04gY29udGVudDonLCBqc29uQ29udGVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc2NoZW1hRGF0YTtcblx0fVxufSIsImltcG9ydCB7IE1ldGFkYXRhRXh0cmFjdG9yIH0gZnJvbSAnLi9tZXRhZGF0YSc7XG5pbXBvcnQgeyBEZWZ1ZGRsZU9wdGlvbnMsIERlZnVkZGxlUmVzcG9uc2UsIERlZnVkZGxlTWV0YWRhdGEgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFxuXHRISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMsXG5cdE1PQklMRV9XSURUSCxcblx0QkxPQ0tfRUxFTUVOVFMsXG5cdFBSRVNFUlZFX0VMRU1FTlRTLFxuXHRJTkxJTkVfRUxFTUVOVFMsXG5cdFNVUFBPUlRFRF9MQU5HVUFHRVMsXG5cdEFMTE9XRURfQVRUUklCVVRFUyxcblx0QUxMT1dFRF9BVFRSSUJVVEVTX0RFQlVHLFxuXHRFWEFDVF9TRUxFQ1RPUlMsXG5cdFBBUlRJQUxfU0VMRUNUT1JTLFxuXHRGT09UTk9URV9MSVNUX1NFTEVDVE9SUyxcblx0Rk9PVE5PVEVfSU5MSU5FX1JFRkVSRU5DRVMsXG5cdEVOVFJZX1BPSU5UX0VMRU1FTlRTLFxuXHRBTExPV0VEX0VNUFRZX0VMRU1FTlRTXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuLy8gRWxlbWVudCBzdGFuZGFyZGl6YXRpb24gcnVsZXNcbi8vIE1hcHMgc2VsZWN0b3JzIHRvIHRoZWlyIHRhcmdldCBIVE1MIGVsZW1lbnQgbmFtZVxuaW50ZXJmYWNlIFN0YW5kYXJkaXphdGlvblJ1bGUge1xuXHRzZWxlY3Rvcjogc3RyaW5nO1xuXHRlbGVtZW50OiBzdHJpbmc7XG5cdHRyYW5zZm9ybT86IChlbDogRWxlbWVudCkgPT4gRWxlbWVudDtcbn1cblxuY29uc3QgRUxFTUVOVF9TVEFOREFSRElaQVRJT05fUlVMRVM6IFN0YW5kYXJkaXphdGlvblJ1bGVbXSA9IFtcblx0Ly8gQ29kZSBibG9ja3Ncblx0e1xuXHRcdHNlbGVjdG9yOiAncHJlJyxcblx0XHRlbGVtZW50OiAncHJlJyxcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybiBlbDtcblxuXHRcdFx0Ly8gRnVuY3Rpb24gdG8gZ2V0IGxhbmd1YWdlIGZyb20gY2xhc3Ncblx0XHRcdGNvbnN0IGdldExhbmd1YWdlRnJvbUNsYXNzID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nID0+IHtcblx0XHRcdFx0Ly8gQ2hlY2sgZGF0YS1sYW5nIGF0dHJpYnV0ZSBmaXJzdFxuXHRcdFx0XHRjb25zdCBkYXRhTGFuZyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxhbmcnKTtcblx0XHRcdFx0aWYgKGRhdGFMYW5nKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGFMYW5nLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBEZWZpbmUgbGFuZ3VhZ2UgcGF0dGVybnNcblx0XHRcdFx0Y29uc3QgbGFuZ3VhZ2VQYXR0ZXJucyA9IFtcblx0XHRcdFx0XHQvXmxhbmd1YWdlLShcXHcrKSQvLCAgICAgICAgICAvLyBsYW5ndWFnZS1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15sYW5nLShcXHcrKSQvLCAgICAgICAgICAgICAgLy8gbGFuZy1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L14oXFx3KyktY29kZSQvLCAgICAgICAgICAgICAgLy8gamF2YXNjcmlwdC1jb2RlXG5cdFx0XHRcdFx0L15jb2RlLShcXHcrKSQvLCAgICAgICAgICAgICAgLy8gY29kZS1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15zeW50YXgtKFxcdyspJC8sICAgICAgICAgICAgLy8gc3ludGF4LWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXmNvZGUtc25pcHBldF9fKFxcdyspJC8sICAgICAvLyBjb2RlLXNuaXBwZXRfX2phdmFzY3JpcHRcblx0XHRcdFx0XHQvXmhpZ2hsaWdodC0oXFx3KykkLywgICAgICAgICAvLyBoaWdobGlnaHQtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9eKFxcdyspLXNuaXBwZXQkLyAgICAgICAgICAgIC8vIGphdmFzY3JpcHQtc25pcHBldFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdC8vIFRoZW4gY2hlY2sgdGhlIGNsYXNzIGF0dHJpYnV0ZSBmb3IgcGF0dGVybnNcblx0XHRcdFx0aWYgKGVsZW1lbnQuY2xhc3NOYW1lICYmIHR5cGVvZiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHBhdHRlcm4gb2YgbGFuZ3VhZ2VQYXR0ZXJucykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBlbGVtZW50LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpLm1hdGNoKHBhdHRlcm4pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBUaGVuIGNoZWNrIGZvciBzdXBwb3J0ZWQgbGFuZ3VhZ2Vcblx0XHRcdFx0XHRpZiAoU1VQUE9SVEVEX0xBTkdVQUdFUy5oYXMoZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBBcnJheS5mcm9tKGVsZW1lbnQuY2xhc3NMaXN0KTtcblx0XHRcdFx0XG5cdFx0XHRcdGZvciAoY29uc3QgY2xhc3NOYW1lIG9mIGNsYXNzTmFtZXMpIHtcblx0XHRcdFx0XHQvLyBDaGVjayBwYXR0ZXJucyBmaXJzdFxuXHRcdFx0XHRcdGZvciAoY29uc3QgcGF0dGVybiBvZiBsYW5ndWFnZVBhdHRlcm5zKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGNsYXNzTmFtZS5tYXRjaChwYXR0ZXJuKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPbmx5IGNoZWNrIGJhcmUgbGFuZ3VhZ2UgbmFtZXMgaWYgbm8gcGF0dGVybnMgd2VyZSBmb3VuZFxuXHRcdFx0XHRmb3IgKGNvbnN0IGNsYXNzTmFtZSBvZiBjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0aWYgKFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKGNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAnJztcblx0XHRcdH07XG5cblx0XHRcdC8vIFRyeSB0byBnZXQgdGhlIGxhbmd1YWdlIGZyb20gdGhlIGVsZW1lbnQgYW5kIGl0cyBhbmNlc3RvcnNcblx0XHRcdGxldCBsYW5ndWFnZSA9ICcnO1xuXHRcdFx0bGV0IGN1cnJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBlbDtcblx0XHRcdFxuXHRcdFx0d2hpbGUgKGN1cnJlbnRFbGVtZW50ICYmICFsYW5ndWFnZSkge1xuXHRcdFx0XHRsYW5ndWFnZSA9IGdldExhbmd1YWdlRnJvbUNsYXNzKGN1cnJlbnRFbGVtZW50KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFsc28gY2hlY2sgZm9yIGNvZGUgZWxlbWVudHMgd2l0aGluIHRoZSBjdXJyZW50IGVsZW1lbnRcblx0XHRcdFx0aWYgKCFsYW5ndWFnZSAmJiBjdXJyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjb2RlJykpIHtcblx0XHRcdFx0XHRsYW5ndWFnZSA9IGdldExhbmd1YWdlRnJvbUNsYXNzKGN1cnJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKSEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZ1bmN0aW9uIHRvIHJlY3Vyc2l2ZWx5IGV4dHJhY3QgdGV4dCBjb250ZW50IHdoaWxlIHByZXNlcnZpbmcgc3RydWN0dXJlXG5cdFx0XHRjb25zdCBleHRyYWN0U3RydWN0dXJlZFRleHQgPSAoZWxlbWVudDogTm9kZSk6IHN0cmluZyA9PiB7XG5cdFx0XHRcdGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRsZXQgdGV4dCA9ICcnO1xuXHRcdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG5cdFx0XHRcdFx0Ly8gSGFuZGxlIGxpbmUgYnJlYWtzXG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0JSJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdcXG4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBIYW5kbGUgY29kZSBlbGVtZW50cyBhbmQgdGhlaXIgY2hpbGRyZW5cblx0XHRcdFx0XHRlbGVtZW50LmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZCA9PiB7XG5cdFx0XHRcdFx0XHR0ZXh0ICs9IGV4dHJhY3RTdHJ1Y3R1cmVkVGV4dChjaGlsZCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQWRkIG5ld2xpbmUgYWZ0ZXIgZWFjaCBjb2RlIGVsZW1lbnRcblx0XHRcdFx0XHRpZiAoZWxlbWVudC50YWdOYW1lID09PSAnQ09ERScpIHtcblx0XHRcdFx0XHRcdHRleHQgKz0gJ1xcbic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0ZXh0O1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gRXh0cmFjdCBhbGwgdGV4dCBjb250ZW50XG5cdFx0XHRsZXQgY29kZUNvbnRlbnQgPSBleHRyYWN0U3RydWN0dXJlZFRleHQoZWwpO1xuXG5cdFx0XHQvLyBDbGVhbiB1cCB0aGUgY29udGVudFxuXHRcdFx0Y29kZUNvbnRlbnQgPSBjb2RlQ29udGVudFxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IGV4dHJhIG5ld2xpbmVzIGF0IHRoZSBzdGFydFxuXHRcdFx0XHQucmVwbGFjZSgvXlxcbisvLCAnJylcblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSBleHRyYSBuZXdsaW5lcyBhdCB0aGUgZW5kXG5cdFx0XHRcdC5yZXBsYWNlKC9cXG4rJC8sICcnKVxuXHRcdFx0XHQvLyBSZXBsYWNlIG11bHRpcGxlIGNvbnNlY3V0aXZlIG5ld2xpbmVzIHdpdGggYSBzaW5nbGUgbmV3bGluZVxuXHRcdFx0XHQucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJyk7XG5cblx0XHRcdC8vIENyZWF0ZSBuZXcgcHJlIGVsZW1lbnRcblx0XHRcdGNvbnN0IG5ld1ByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuXHRcdFx0XG5cdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlc1xuXHRcdFx0QXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0bmV3UHJlLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGNvZGUgZWxlbWVudFxuXHRcdFx0Y29uc3QgY29kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKTtcblx0XHRcdGlmIChsYW5ndWFnZSkge1xuXHRcdFx0XHRjb2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1sYW5nJywgbGFuZ3VhZ2UpO1xuXHRcdFx0XHRjb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgbGFuZ3VhZ2UtJHtsYW5ndWFnZX1gKTtcblx0XHRcdH1cblx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSBjb2RlQ29udGVudDtcblx0XHRcdFxuXHRcdFx0bmV3UHJlLmFwcGVuZENoaWxkKGNvZGUpO1xuXHRcdFx0cmV0dXJuIG5ld1ByZTtcblx0XHR9XG5cdH0sXG5cdC8vIFNpbXBsaWZ5IGhlYWRpbmdzIGJ5IHJlbW92aW5nIGludGVybmFsIG5hdmlnYXRpb24gZWxlbWVudHNcblx0e1xuXHRcdHNlbGVjdG9yOiAnaDEsIGgyLCBoMywgaDQsIGg1LCBoNicsXG5cdFx0ZWxlbWVudDogJ2tlZXAnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHQvLyBJZiBoZWFkaW5nIG9ubHkgY29udGFpbnMgYSBzaW5nbGUgYW5jaG9yIHdpdGggaW50ZXJuYWwgbGlua1xuXHRcdFx0aWYgKGVsLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBcblx0XHRcdFx0ZWwuZmlyc3RFbGVtZW50Q2hpbGQ/LnRhZ05hbWUgPT09ICdBJyAmJlxuXHRcdFx0XHQoZWwuZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJyk/LmluY2x1ZGVzKCcjJykgfHwgXG5cdFx0XHRcdCBlbC5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKT8uc3RhcnRzV2l0aCgnIycpKSkge1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ3JlYXRlIG5ldyBoZWFkaW5nIG9mIHNhbWUgbGV2ZWxcblx0XHRcdFx0Y29uc3QgbmV3SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwudGFnTmFtZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlcyBmcm9tIG9yaWdpbmFsIGhlYWRpbmdcblx0XHRcdFx0QXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRcdG5ld0hlYWRpbmcuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEp1c3QgdXNlIHRoZSB0ZXh0IGNvbnRlbnRcblx0XHRcdFx0bmV3SGVhZGluZy50ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gbmV3SGVhZGluZztcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gSWYgaGVhZGluZyBjb250YWlucyBuYXZpZ2F0aW9uIGJ1dHRvbnMgb3Igb3RoZXIgdXRpbGl0eSBlbGVtZW50c1xuXHRcdFx0Y29uc3QgYnV0dG9ucyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXHRcdFx0aWYgKGJ1dHRvbnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBuZXdIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbC50YWdOYW1lKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0XHRuZXdIZWFkaW5nLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBKdXN0IHVzZSB0aGUgdGV4dCBjb250ZW50XG5cdFx0XHRcdG5ld0hlYWRpbmcudGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIG5ld0hlYWRpbmc7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHJldHVybiBlbDtcblx0XHR9XG5cdH0sXG5cdC8vIENvbnZlcnQgZGl2cyB3aXRoIHBhcmFncmFwaCByb2xlIHRvIGFjdHVhbCBwYXJhZ3JhcGhzXG5cdHsgXG5cdFx0c2VsZWN0b3I6ICdkaXZbZGF0YS10ZXN0aWRePVwicGFyYWdyYXBoXCJdLCBkaXZbcm9sZT1cInBhcmFncmFwaFwiXScsIFxuXHRcdGVsZW1lbnQ6ICdwJyxcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ29weSBpbm5lckhUTUxcblx0XHRcdHAuaW5uZXJIVE1MID0gZWwuaW5uZXJIVE1MO1xuXHRcdFx0XG5cdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlc1xuXHRcdFx0QXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0cC5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiBwO1xuXHRcdH1cblx0fSxcblx0Ly8gQ29udmVydCBkaXZzIHdpdGggbGlzdCByb2xlcyB0byBhY3R1YWwgbGlzdHNcblx0eyBcblx0XHRzZWxlY3RvcjogJ2Rpdltyb2xlPVwibGlzdFwiXScsIFxuXHRcdGVsZW1lbnQ6ICd1bCcsXG5cdFx0Ly8gQ3VzdG9tIGhhbmRsZXIgZm9yIGxpc3QgdHlwZSBkZXRlY3Rpb24gYW5kIHRyYW5zZm9ybWF0aW9uXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdC8vIEZpcnN0IGRldGVybWluZSBpZiB0aGlzIGlzIGFuIG9yZGVyZWQgbGlzdFxuXHRcdFx0Y29uc3QgZmlyc3RJdGVtID0gZWwucXVlcnlTZWxlY3RvcignZGl2W3JvbGU9XCJsaXN0aXRlbVwiXSAubGFiZWwnKTtcblx0XHRcdGNvbnN0IGxhYmVsID0gZmlyc3RJdGVtPy50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0Y29uc3QgaXNPcmRlcmVkID0gbGFiZWwubWF0Y2goL15cXGQrXFwpLyk7XG5cdFx0XHRcblx0XHRcdC8vIENyZWF0ZSB0aGUgYXBwcm9wcmlhdGUgbGlzdCB0eXBlXG5cdFx0XHRjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpc09yZGVyZWQgPyAnb2wnIDogJ3VsJyk7XG5cdFx0XHRcblx0XHRcdC8vIFByb2Nlc3MgZWFjaCBsaXN0IGl0ZW1cblx0XHRcdGNvbnN0IGl0ZW1zID0gZWwucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJsaXN0aXRlbVwiXScpO1xuXHRcdFx0aXRlbXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdFx0Y29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdFx0XHRjb25zdCBjb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGNvbnRlbnQpIHtcblx0XHRcdFx0XHQvLyBDb252ZXJ0IGFueSBwYXJhZ3JhcGggZGl2cyBpbnNpZGUgY29udGVudFxuXHRcdFx0XHRcdGNvbnN0IHBhcmFncmFwaERpdnMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwicGFyYWdyYXBoXCJdJyk7XG5cdFx0XHRcdFx0cGFyYWdyYXBoRGl2cy5mb3JFYWNoKGRpdiA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRcdFx0cC5pbm5lckhUTUwgPSBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKHApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIENvbnZlcnQgYW55IG5lc3RlZCBsaXN0cyByZWN1cnNpdmVseVxuXHRcdFx0XHRcdGNvbnN0IG5lc3RlZExpc3RzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImxpc3RcIl0nKTtcblx0XHRcdFx0XHRuZXN0ZWRMaXN0cy5mb3JFYWNoKG5lc3RlZExpc3QgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgZmlyc3ROZXN0ZWRJdGVtID0gbmVzdGVkTGlzdC5xdWVyeVNlbGVjdG9yKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdIC5sYWJlbCcpO1xuXHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkTGFiZWwgPSBmaXJzdE5lc3RlZEl0ZW0/LnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdFx0XHRjb25zdCBpc05lc3RlZE9yZGVyZWQgPSBuZXN0ZWRMYWJlbC5tYXRjaCgvXlxcZCtcXCkvKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Y29uc3QgbmV3TmVzdGVkTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXNOZXN0ZWRPcmRlcmVkID8gJ29sJyA6ICd1bCcpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBQcm9jZXNzIG5lc3RlZCBpdGVtc1xuXHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkSXRlbXMgPSBuZXN0ZWRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0nKTtcblx0XHRcdFx0XHRcdG5lc3RlZEl0ZW1zLmZvckVhY2gobmVzdGVkSXRlbSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZExpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkQ29udGVudCA9IG5lc3RlZEl0ZW0ucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdGlmIChuZXN0ZWRDb250ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ29udmVydCBwYXJhZ3JhcGggZGl2cyBpbiBuZXN0ZWQgaXRlbXNcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRQYXJhZ3JhcGhzID0gbmVzdGVkQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cInBhcmFncmFwaFwiXScpO1xuXHRcdFx0XHRcdFx0XHRcdG5lc3RlZFBhcmFncmFwaHMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0XHRcdFx0XHRcdHAuaW5uZXJIVE1MID0gZGl2LmlubmVySFRNTDtcblx0XHRcdFx0XHRcdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChwKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRuZXN0ZWRMaS5pbm5lckhUTUwgPSBuZXN0ZWRDb250ZW50LmlubmVySFRNTDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0bmV3TmVzdGVkTGlzdC5hcHBlbmRDaGlsZChuZXN0ZWRMaSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0bmVzdGVkTGlzdC5yZXBsYWNlV2l0aChuZXdOZXN0ZWRMaXN0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsaS5pbm5lckhUTUwgPSBjb250ZW50LmlubmVySFRNTDtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0bGlzdC5hcHBlbmRDaGlsZChsaSk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIGxpc3Q7XG5cdFx0fVxuXHR9LFxuXHR7IFxuXHRcdHNlbGVjdG9yOiAnZGl2W3JvbGU9XCJsaXN0aXRlbVwiXScsIFxuXHRcdGVsZW1lbnQ6ICdsaScsXG5cdFx0Ly8gQ3VzdG9tIGhhbmRsZXIgZm9yIGxpc3QgaXRlbSBjb250ZW50XG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGNvbnN0IGNvbnRlbnQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHRcdFx0aWYgKCFjb250ZW50KSByZXR1cm4gZWw7XG5cdFx0XHRcblx0XHRcdC8vIENvbnZlcnQgYW55IHBhcmFncmFwaCBkaXZzIGluc2lkZSBjb250ZW50XG5cdFx0XHRjb25zdCBwYXJhZ3JhcGhEaXZzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cInBhcmFncmFwaFwiXScpO1xuXHRcdFx0cGFyYWdyYXBoRGl2cy5mb3JFYWNoKGRpdiA9PiB7XG5cdFx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdHAuaW5uZXJIVE1MID0gZGl2LmlubmVySFRNTDtcblx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKHApO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdH1cblx0fSxcblx0Ly8gQ29kZSBibG9ja3Mgd2l0aCBzeW50YXggaGlnaGxpZ2h0aW5nXG5cdHtcblx0XHRzZWxlY3RvcjogJy53cC1ibG9jay1zeW50YXhoaWdobGlnaHRlci1jb2RlLCAuc3ludGF4aGlnaGxpZ2h0ZXIsIC5oaWdobGlnaHQsIC5oaWdobGlnaHQtc291cmNlLCAud3AtYmxvY2stY29kZSwgcHJlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgcHJlW2NsYXNzKj1cImJydXNoOlwiXScsXG5cdFx0ZWxlbWVudDogJ3ByZScsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm4gZWw7XG5cblx0XHRcdC8vIENyZWF0ZSBuZXcgcHJlIGVsZW1lbnRcblx0XHRcdGNvbnN0IG5ld1ByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuXHRcdFx0XG5cdFx0XHQvLyBUcnkgdG8gZGV0ZWN0IGxhbmd1YWdlXG5cdFx0XHRsZXQgbGFuZ3VhZ2UgPSAnJztcblx0XHRcdFxuXHRcdFx0Ly8gQ2hlY2sgZm9yIFdvcmRQcmVzcyBzeW50YXggaGlnaGxpZ2h0ZXIgc3BlY2lmaWMgZm9ybWF0XG5cdFx0XHRjb25zdCBzeW50YXhFbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zeW50YXhoaWdobGlnaHRlcicpO1xuXHRcdFx0aWYgKHN5bnRheEVsKSB7XG5cdFx0XHRcdC8vIEdldCBsYW5ndWFnZSBmcm9tIHN5bnRheGhpZ2hsaWdodGVyIGNsYXNzXG5cdFx0XHRcdGNvbnN0IGNsYXNzZXMgPSBBcnJheS5mcm9tKHN5bnRheEVsLmNsYXNzTGlzdCk7XG5cdFx0XHRcdGNvbnN0IGxhbmdDbGFzcyA9IGNsYXNzZXMuZmluZChjID0+ICFbJ3N5bnRheGhpZ2hsaWdodGVyJywgJ25vZ3V0dGVyJ10uaW5jbHVkZXMoYykpO1xuXHRcdFx0XHRpZiAobGFuZ0NsYXNzICYmIFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKGxhbmdDbGFzcy50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdGxhbmd1YWdlID0gbGFuZ0NsYXNzLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgbm8gbGFuZ3VhZ2UgZm91bmQgeWV0LCBjaGVjayBvdGhlciBjb21tb24gcGF0dGVybnNcblx0XHRcdGlmICghbGFuZ3VhZ2UpIHtcblx0XHRcdFx0Y29uc3QgY2xhc3NOYW1lcyA9IEFycmF5LmZyb20oZWwuY2xhc3NMaXN0KTtcblx0XHRcdFx0Y29uc3QgbGFuZ3VhZ2VQYXR0ZXJucyA9IFtcblx0XHRcdFx0XHQvKD86XnxcXHMpKD86bGFuZ3VhZ2V8bGFuZ3xicnVzaHxzeW50YXgpLShcXHcrKSg/Olxcc3wkKS9pLFxuXHRcdFx0XHRcdC8oPzpefFxccykoXFx3KykoPzpcXHN8JCkvaVxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgY2xhc3NOYW1lIG9mIGNsYXNzTmFtZXMpIHtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHBhdHRlcm4gb2YgbGFuZ3VhZ2VQYXR0ZXJucykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBjbGFzc05hbWUubWF0Y2gocGF0dGVybik7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2ggJiYgbWF0Y2hbMV0gJiYgU1VQUE9SVEVEX0xBTkdVQUdFUy5oYXMobWF0Y2hbMV0udG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2UgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGxhbmd1YWdlKSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBFeHRyYWN0IGNvZGUgY29udGVudCwgaGFuZGxpbmcgdmFyaW91cyBmb3JtYXRzXG5cdFx0XHRsZXQgY29kZUNvbnRlbnQgPSAnJztcblxuXHRcdFx0Ly8gSGFuZGxlIFdvcmRQcmVzcyBzeW50YXggaGlnaGxpZ2h0ZXIgdGFibGUgZm9ybWF0XG5cdFx0XHRjb25zdCBjb2RlQ29udGFpbmVyID0gZWwucXVlcnlTZWxlY3RvcignLnN5bnRheGhpZ2hsaWdodGVyIHRhYmxlIC5jb2RlIC5jb250YWluZXInKTtcblx0XHRcdGlmIChjb2RlQ29udGFpbmVyKSB7XG5cdFx0XHRcdC8vIFByb2Nlc3MgZWFjaCBsaW5lXG5cdFx0XHRcdGNvbnN0IGxpbmVzID0gQXJyYXkuZnJvbShjb2RlQ29udGFpbmVyLmNoaWxkcmVuKTtcblx0XHRcdFx0Y29kZUNvbnRlbnQgPSBsaW5lc1xuXHRcdFx0XHRcdC5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHQvLyBHZXQgYWxsIGNvZGUgZWxlbWVudHMgaW4gdGhpcyBsaW5lXG5cdFx0XHRcdFx0XHRjb25zdCBjb2RlUGFydHMgPSBBcnJheS5mcm9tKGxpbmUucXVlcnlTZWxlY3RvckFsbCgnY29kZScpKVxuXHRcdFx0XHRcdFx0XHQubWFwKGNvZGUgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdC8vIEdldCB0aGUgdGV4dCBjb250ZW50LCBwcmVzZXJ2aW5nIHNwYWNlc1xuXHRcdFx0XHRcdFx0XHRcdGxldCB0ZXh0ID0gY29kZS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0XHRcdFx0XHQvLyBJZiB0aGlzIGlzIGEgJ3NwYWNlcycgY2xhc3MgZWxlbWVudCwgY29udmVydCB0byBhY3R1YWwgc3BhY2VzXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzcGFjZXMnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGV4dCA9ICcgJy5yZXBlYXQodGV4dC5sZW5ndGgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGV4dDtcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0LmpvaW4oJycpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNvZGVQYXJ0cyB8fCBsaW5lLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSGFuZGxlIFdvcmRQcmVzcyBzeW50YXggaGlnaGxpZ2h0ZXIgbm9uLXRhYmxlIGZvcm1hdFxuXHRcdFx0XHRjb25zdCBjb2RlTGluZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY29kZSAubGluZScpO1xuXHRcdFx0XHRpZiAoY29kZUxpbmVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRjb2RlQ29udGVudCA9IEFycmF5LmZyb20oY29kZUxpbmVzKVxuXHRcdFx0XHRcdFx0Lm1hcChsaW5lID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgY29kZVBhcnRzID0gQXJyYXkuZnJvbShsaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvZGUnKSlcblx0XHRcdFx0XHRcdFx0XHQubWFwKGNvZGUgPT4gY29kZS50ZXh0Q29udGVudCB8fCAnJylcblx0XHRcdFx0XHRcdFx0XHQuam9pbignJyk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2RlUGFydHMgfHwgbGluZS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRmFsbGJhY2sgdG8gcmVndWxhciB0ZXh0IGNvbnRlbnRcblx0XHRcdFx0XHRjb2RlQ29udGVudCA9IGVsLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsZWFuIHVwIHRoZSBjb250ZW50XG5cdFx0XHRjb2RlQ29udGVudCA9IGNvZGVDb250ZW50XG5cdFx0XHRcdC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgLy8gVHJpbSBzdGFydC9lbmQgd2hpdGVzcGFjZVxuXHRcdFx0XHQucmVwbGFjZSgvXFx0L2csICcgICAgJykgLy8gQ29udmVydCB0YWJzIHRvIHNwYWNlc1xuXHRcdFx0XHQucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJykgLy8gTm9ybWFsaXplIG11bHRpcGxlIG5ld2xpbmVzXG5cdFx0XHRcdC5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7IC8vIFJlcGxhY2Ugbm9uLWJyZWFraW5nIHNwYWNlcyB3aXRoIHJlZ3VsYXIgc3BhY2VzXG5cblx0XHRcdC8vIENyZWF0ZSBjb2RlIGVsZW1lbnQgd2l0aCBsYW5ndWFnZSBjbGFzcyBpZiBkZXRlY3RlZFxuXHRcdFx0Y29uc3QgY29kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKTtcblx0XHRcdGlmIChsYW5ndWFnZSkge1xuXHRcdFx0XHRjb2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1sYW5nJywgbGFuZ3VhZ2UpO1xuXHRcdFx0XHRjb2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgbGFuZ3VhZ2UtJHtsYW5ndWFnZX1gKTtcblx0XHRcdH1cblx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSBjb2RlQ29udGVudDtcblx0XHRcdFxuXHRcdFx0bmV3UHJlLmFwcGVuZENoaWxkKGNvZGUpO1xuXHRcdFx0cmV0dXJuIG5ld1ByZTtcblx0XHR9XG5cdH1cbl07XG5cbmludGVyZmFjZSBGb290bm90ZURhdGEge1xuXHRjb250ZW50OiBFbGVtZW50IHwgc3RyaW5nO1xuXHRvcmlnaW5hbElkOiBzdHJpbmc7XG5cdHJlZnM6IHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgRm9vdG5vdGVDb2xsZWN0aW9uIHtcblx0W2Zvb3Rub3RlTnVtYmVyOiBudW1iZXJdOiBGb290bm90ZURhdGE7XG59XG5cbmludGVyZmFjZSBDb250ZW50U2NvcmUge1xuXHRzY29yZTogbnVtYmVyO1xuXHRlbGVtZW50OiBFbGVtZW50O1xufVxuXG5pbnRlcmZhY2UgU3R5bGVDaGFuZ2Uge1xuXHRzZWxlY3Rvcjogc3RyaW5nO1xuXHRzdHlsZXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlZnVkZGxlIHtcblx0cHJpdmF0ZSBkb2M6IERvY3VtZW50O1xuXHRwcml2YXRlIG9wdGlvbnM6IERlZnVkZGxlT3B0aW9ucztcblx0cHJpdmF0ZSBkZWJ1ZzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IERlZnVkZGxlIGluc3RhbmNlXG5cdCAqIEBwYXJhbSBkb2MgLSBUaGUgZG9jdW1lbnQgdG8gcGFyc2Vcblx0ICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciBwYXJzaW5nXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihkb2M6IERvY3VtZW50LCBvcHRpb25zOiBEZWZ1ZGRsZU9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuZG9jID0gZG9jO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWcgfHwgZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgdGhlIGRvY3VtZW50IGFuZCBleHRyYWN0IGl0cyBtYWluIGNvbnRlbnRcblx0ICovXG5cdHBhcnNlKCk6IERlZnVkZGxlUmVzcG9uc2Uge1xuXHRcdGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG5cdFx0Ly8gRXh0cmFjdCBtZXRhZGF0YSBmaXJzdCBzaW5jZSB3ZSdsbCBuZWVkIGl0IGluIG11bHRpcGxlIHBsYWNlc1xuXHRcdGNvbnN0IHNjaGVtYU9yZ0RhdGEgPSBNZXRhZGF0YUV4dHJhY3Rvci5leHRyYWN0U2NoZW1hT3JnRGF0YSh0aGlzLmRvYyk7XG5cdFx0Y29uc3QgbWV0YWRhdGEgPSBNZXRhZGF0YUV4dHJhY3Rvci5leHRyYWN0KHRoaXMuZG9jLCBzY2hlbWFPcmdEYXRhKTtcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBFdmFsdWF0ZSBzdHlsZXMgYW5kIHNpemVzIG9uIG9yaWdpbmFsIGRvY3VtZW50XG5cdFx0XHRjb25zdCBtb2JpbGVTdHlsZXMgPSB0aGlzLl9ldmFsdWF0ZU1lZGlhUXVlcmllcyh0aGlzLmRvYyk7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGZvciBzbWFsbCBpbWFnZXMgaW4gb3JpZ2luYWwgZG9jdW1lbnQsIGV4Y2x1ZGluZyBsYXp5LWxvYWRlZCBvbmVzXG5cdFx0XHRjb25zdCBzbWFsbEltYWdlcyA9IHRoaXMuZmluZFNtYWxsSW1hZ2VzKHRoaXMuZG9jKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ2xvbmUgZG9jdW1lbnRcblx0XHRcdGNvbnN0IGNsb25lID0gdGhpcy5kb2MuY2xvbmVOb2RlKHRydWUpIGFzIERvY3VtZW50O1xuXHRcdFx0XG5cdFx0XHQvLyBBcHBseSBtb2JpbGUgc3R5bGUgdG8gY2xvbmVcblx0XHRcdHRoaXMuYXBwbHlNb2JpbGVTdHlsZXMoY2xvbmUsIG1vYmlsZVN0eWxlcyk7XG5cblx0XHRcdC8vIEZpbmQgbWFpbiBjb250ZW50XG5cdFx0XHRjb25zdCBtYWluQ29udGVudCA9IHRoaXMuZmluZE1haW5Db250ZW50KGNsb25lKTtcblx0XHRcdGlmICghbWFpbkNvbnRlbnQpIHtcblx0XHRcdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGNvbnRlbnQ6IHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MLFxuXHRcdFx0XHRcdC4uLm1ldGFkYXRhLFxuXHRcdFx0XHRcdHdvcmRDb3VudDogdGhpcy5jb3VudFdvcmRzKHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MKSxcblx0XHRcdFx0XHRwYXJzZVRpbWU6IE1hdGgucm91bmQoZW5kVGltZSAtIHN0YXJ0VGltZSlcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIHNtYWxsIGltYWdlcyBpZGVudGlmaWVkIGZyb20gb3JpZ2luYWwgZG9jdW1lbnRcblx0XHRcdHRoaXMucmVtb3ZlU21hbGxJbWFnZXMoY2xvbmUsIHNtYWxsSW1hZ2VzKTtcblx0XHRcdFxuXHRcdFx0Ly8gUGVyZm9ybSBvdGhlciBkZXN0cnVjdGl2ZSBvcGVyYXRpb25zIG9uIHRoZSBjbG9uZVxuXHRcdFx0dGhpcy5yZW1vdmVIaWRkZW5FbGVtZW50cyhjbG9uZSk7XG5cdFx0XHR0aGlzLnJlbW92ZUNsdXR0ZXIoY2xvbmUpO1xuXG5cdFx0XHQvLyBDbGVhbiB1cCB0aGUgbWFpbiBjb250ZW50XG5cdFx0XHR0aGlzLmNsZWFuQ29udGVudChtYWluQ29udGVudCwgbWV0YWRhdGEpO1xuXG5cdFx0XHRjb25zdCBjb250ZW50ID0gbWFpbkNvbnRlbnQgPyBtYWluQ29udGVudC5vdXRlckhUTUwgOiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTDtcblx0XHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y29udGVudCxcblx0XHRcdFx0Li4ubWV0YWRhdGEsXG5cdFx0XHRcdHdvcmRDb3VudDogdGhpcy5jb3VudFdvcmRzKGNvbnRlbnQpLFxuXHRcdFx0XHRwYXJzZVRpbWU6IE1hdGgucm91bmQoZW5kVGltZSAtIHN0YXJ0VGltZSlcblx0XHRcdH07XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlJywgJ0Vycm9yIHByb2Nlc3NpbmcgZG9jdW1lbnQ6JywgZXJyb3IpO1xuXHRcdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y29udGVudDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUwsXG5cdFx0XHRcdC4uLm1ldGFkYXRhLFxuXHRcdFx0XHR3b3JkQ291bnQ6IHRoaXMuY291bnRXb3Jkcyh0aGlzLmRvYy5ib2R5LmlubmVySFRNTCksXG5cdFx0XHRcdHBhcnNlVGltZTogTWF0aC5yb3VuZChlbmRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGNvdW50V29yZHMoY29udGVudDogc3RyaW5nKTogbnVtYmVyIHtcblx0XHQvLyBDcmVhdGUgYSB0ZW1wb3JhcnkgZGl2IHRvIHBhcnNlIEhUTUwgY29udGVudFxuXHRcdGNvbnN0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0ZW1wRGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cblx0XHQvLyBHZXQgdGV4dCBjb250ZW50LCByZW1vdmluZyBleHRyYSB3aGl0ZXNwYWNlXG5cdFx0Y29uc3QgdGV4dCA9IHRlbXBEaXYudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0Y29uc3Qgd29yZHMgPSB0ZXh0XG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXFxzKy9nLCAnICcpIC8vIFJlcGxhY2UgbXVsdGlwbGUgc3BhY2VzIHdpdGggc2luZ2xlIHNwYWNlXG5cdFx0XHQuc3BsaXQoJyAnKVxuXHRcdFx0LmZpbHRlcih3b3JkID0+IHdvcmQubGVuZ3RoID4gMCk7IC8vIEZpbHRlciBvdXQgZW1wdHkgc3RyaW5nc1xuXG5cdFx0cmV0dXJuIHdvcmRzLmxlbmd0aDtcblx0fVxuXG5cdC8vIE1ha2UgYWxsIG90aGVyIG1ldGhvZHMgcHJpdmF0ZSBieSByZW1vdmluZyB0aGUgc3RhdGljIGtleXdvcmQgYW5kIHVzaW5nIHByaXZhdGVcblx0cHJpdmF0ZSBfbG9nKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdEZWZ1ZGRsZTonLCAuLi5hcmdzKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9ldmFsdWF0ZU1lZGlhUXVlcmllcyhkb2M6IERvY3VtZW50KTogU3R5bGVDaGFuZ2VbXSB7XG5cdFx0Y29uc3QgbW9iaWxlU3R5bGVzOiBTdHlsZUNoYW5nZVtdID0gW107XG5cdFx0Y29uc3QgbWF4V2lkdGhSZWdleCA9IC9tYXgtd2lkdGhbXjpdKjpcXHMqKFxcZCspLztcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBHZXQgYWxsIHN0eWxlcywgaW5jbHVkaW5nIGlubGluZSBzdHlsZXNcblx0XHRcdGNvbnN0IHNoZWV0cyA9IEFycmF5LmZyb20oZG9jLnN0eWxlU2hlZXRzKS5maWx0ZXIoc2hlZXQgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIEFjY2VzcyBydWxlcyBvbmNlIHRvIGNoZWNrIHZhbGlkaXR5XG5cdFx0XHRcdFx0c2hlZXQuY3NzUnVsZXM7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHQvLyBFeHBlY3RlZCBlcnJvciBmb3IgY3Jvc3Mtb3JpZ2luIHN0eWxlc2hlZXRzXG5cdFx0XHRcdFx0aWYgKGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZS5uYW1lID09PSAnU2VjdXJpdHlFcnJvcicpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdC8vIFByb2Nlc3MgYWxsIHNoZWV0cyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0XHRjb25zdCBtZWRpYVJ1bGVzID0gc2hlZXRzLmZsYXRNYXAoc2hlZXQgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJldHVybiBBcnJheS5mcm9tKHNoZWV0LmNzc1J1bGVzKVxuXHRcdFx0XHRcdFx0LmZpbHRlcigocnVsZSk6IHJ1bGUgaXMgQ1NTTWVkaWFSdWxlID0+IFxuXHRcdFx0XHRcdFx0XHRydWxlIGluc3RhbmNlb2YgQ1NTTWVkaWFSdWxlICYmXG5cdFx0XHRcdFx0XHRcdHJ1bGUuY29uZGl0aW9uVGV4dC5pbmNsdWRlcygnbWF4LXdpZHRoJylcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3Mgc3R5bGVzaGVldDonLCBlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gUHJvY2VzcyBhbGwgbWVkaWEgcnVsZXMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdFx0bWVkaWFSdWxlcy5mb3JFYWNoKHJ1bGUgPT4ge1xuXHRcdFx0XHRjb25zdCBtYXRjaCA9IHJ1bGUuY29uZGl0aW9uVGV4dC5tYXRjaChtYXhXaWR0aFJlZ2V4KTtcblx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0Y29uc3QgbWF4V2lkdGggPSBwYXJzZUludChtYXRjaFsxXSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgKE1PQklMRV9XSURUSCA8PSBtYXhXaWR0aCkge1xuXHRcdFx0XHRcdFx0Ly8gQmF0Y2ggcHJvY2VzcyBhbGwgc3R5bGUgcnVsZXNcblx0XHRcdFx0XHRcdGNvbnN0IHN0eWxlUnVsZXMgPSBBcnJheS5mcm9tKHJ1bGUuY3NzUnVsZXMpXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoKHIpOiByIGlzIENTU1N0eWxlUnVsZSA9PiByIGluc3RhbmNlb2YgQ1NTU3R5bGVSdWxlKTtcblxuXHRcdFx0XHRcdFx0c3R5bGVSdWxlcy5mb3JFYWNoKGNzc1J1bGUgPT4ge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdG1vYmlsZVN0eWxlcy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdG9yOiBjc3NSdWxlLnNlbGVjdG9yVGV4dCxcblx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlczogY3NzUnVsZS5zdHlsZS5jc3NUZXh0XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3MgQ1NTIHJ1bGU6JywgZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlOiBFcnJvciBldmFsdWF0aW5nIG1lZGlhIHF1ZXJpZXM6JywgZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vYmlsZVN0eWxlcztcblx0fVxuXG5cdHByaXZhdGUgYXBwbHlNb2JpbGVTdHlsZXMoZG9jOiBEb2N1bWVudCwgbW9iaWxlU3R5bGVzOiBTdHlsZUNoYW5nZVtdKSB7XG5cdFx0bGV0IGFwcGxpZWRDb3VudCA9IDA7XG5cblx0XHRtb2JpbGVTdHlsZXMuZm9yRWFjaCgoe3NlbGVjdG9yLCBzdHlsZXN9KSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcblx0XHRcdFx0XHRcdChlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJykgKyBzdHlsZXNcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGFwcGxpZWRDb3VudCsrO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRGVmdWRkbGUnLCAnRXJyb3IgYXBwbHlpbmcgc3R5bGVzIGZvciBzZWxlY3RvcjonLCBzZWxlY3RvciwgZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlSGlkZGVuRWxlbWVudHMoZG9jOiBEb2N1bWVudCkge1xuXHRcdGxldCBjb3VudCA9IDA7XG5cdFx0Y29uc3QgZWxlbWVudHNUb1JlbW92ZSA9IG5ldyBTZXQ8RWxlbWVudD4oKTtcblxuXHRcdC8vIEZpcnN0IHBhc3M6IEdldCBhbGwgZWxlbWVudHMgbWF0Y2hpbmcgaGlkZGVuIHNlbGVjdG9yc1xuXHRcdGNvbnN0IGhpZGRlbkVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoSElEREVOX0VMRU1FTlRfU0VMRUNUT1JTKTtcblx0XHRoaWRkZW5FbGVtZW50cy5mb3JFYWNoKGVsID0+IGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsKSk7XG5cdFx0Y291bnQgKz0gaGlkZGVuRWxlbWVudHMubGVuZ3RoO1xuXG5cdFx0Ly8gU2Vjb25kIHBhc3M6IFVzZSBUcmVlV2Fsa2VyIGZvciBlZmZpY2llbnQgdHJhdmVyc2FsXG5cdFx0Y29uc3QgdHJlZVdhbGtlciA9IGRvYy5jcmVhdGVUcmVlV2Fsa2VyKFxuXHRcdFx0ZG9jLmJvZHksXG5cdFx0XHROb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCxcblx0XHRcdHtcblx0XHRcdFx0YWNjZXB0Tm9kZTogKG5vZGU6IEVsZW1lbnQpID0+IHtcblx0XHRcdFx0XHQvLyBTa2lwIGVsZW1lbnRzIGFscmVhZHkgbWFya2VkIGZvciByZW1vdmFsXG5cdFx0XHRcdFx0aWYgKGVsZW1lbnRzVG9SZW1vdmUuaGFzKG5vZGUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdC8vIEJhdGNoIHN0eWxlIGNvbXB1dGF0aW9uc1xuXHRcdGNvbnN0IGVsZW1lbnRzOiBFbGVtZW50W10gPSBbXTtcblx0XHRsZXQgY3VycmVudE5vZGU6IEVsZW1lbnQgfCBudWxsO1xuXHRcdHdoaWxlIChjdXJyZW50Tm9kZSA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSBhcyBFbGVtZW50KSB7XG5cdFx0XHRlbGVtZW50cy5wdXNoKGN1cnJlbnROb2RlKTtcblx0XHR9XG5cblx0XHQvLyBQcm9jZXNzIHN0eWxlcyBpbiBiYXRjaGVzIHRvIG1pbmltaXplIGxheW91dCB0aHJhc2hpbmdcblx0XHRjb25zdCBCQVRDSF9TSVpFID0gMTAwO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcblx0XHRcdGNvbnN0IGJhdGNoID0gZWxlbWVudHMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuXHRcdFx0XG5cdFx0XHQvLyBSZWFkIHBoYXNlIC0gZ2F0aGVyIGFsbCBjb21wdXRlZFN0eWxlc1xuXHRcdFx0Y29uc3Qgc3R5bGVzID0gYmF0Y2gubWFwKGVsID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKSk7XG5cdFx0XHRcblx0XHRcdC8vIFdyaXRlIHBoYXNlIC0gbWFyayBlbGVtZW50cyBmb3IgcmVtb3ZhbFxuXHRcdFx0YmF0Y2guZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcblx0XHRcdFx0Y29uc3QgY29tcHV0ZWRTdHlsZSA9IHN0eWxlc1tpbmRleF07XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLmRpc3BsYXkgPT09ICdub25lJyB8fFxuXHRcdFx0XHRcdGNvbXB1dGVkU3R5bGUudmlzaWJpbGl0eSA9PT0gJ2hpZGRlbicgfHxcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLm9wYWNpdHkgPT09ICcwJ1xuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRlbGVtZW50c1RvUmVtb3ZlLmFkZChlbGVtZW50KTtcblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBGaW5hbCBwYXNzOiBCYXRjaCByZW1vdmUgYWxsIGhpZGRlbiBlbGVtZW50c1xuXHRcdGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgaGlkZGVuIGVsZW1lbnRzOicsIGNvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlQ2x1dHRlcihkb2M6IERvY3VtZW50KSB7XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0bGV0IGV4YWN0U2VsZWN0b3JDb3VudCA9IDA7XG5cdFx0bGV0IHBhcnRpYWxTZWxlY3RvckNvdW50ID0gMDtcblxuXHRcdC8vIFRyYWNrIGFsbCBlbGVtZW50cyB0byBiZSByZW1vdmVkXG5cdFx0Y29uc3QgZWxlbWVudHNUb1JlbW92ZSA9IG5ldyBTZXQ8RWxlbWVudD4oKTtcblxuXHRcdC8vIEZpcnN0IGNvbGxlY3QgZWxlbWVudHMgbWF0Y2hpbmcgZXhhY3Qgc2VsZWN0b3JzXG5cdFx0Y29uc3QgZXhhY3RFbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKEVYQUNUX1NFTEVDVE9SUy5qb2luKCcsJykpO1xuXHRcdGV4YWN0RWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRpZiAoZWw/LnBhcmVudE5vZGUpIHtcblx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5hZGQoZWwpO1xuXHRcdFx0XHRleGFjdFNlbGVjdG9yQ291bnQrKztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIFByZS1jb21waWxlIHJlZ2V4ZXMgYW5kIGNvbWJpbmUgaW50byBhIHNpbmdsZSByZWdleCBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG5cdFx0Y29uc3QgY29tYmluZWRQYXR0ZXJuID0gUEFSVElBTF9TRUxFQ1RPUlMuam9pbignfCcpO1xuXHRcdGNvbnN0IHBhcnRpYWxSZWdleCA9IG5ldyBSZWdFeHAoY29tYmluZWRQYXR0ZXJuLCAnaScpO1xuXG5cdFx0Ly8gQ3JlYXRlIGFuIGVmZmljaWVudCBhdHRyaWJ1dGUgc2VsZWN0b3IgZm9yIGVsZW1lbnRzIHdlIGNhcmUgYWJvdXRcblx0XHRjb25zdCBhdHRyaWJ1dGVTZWxlY3RvciA9ICdbY2xhc3NdLFtpZF0sW2RhdGEtdGVzdGlkXSxbZGF0YS1xYV0sW2RhdGEtY3ldJztcblx0XHRjb25zdCBhbGxFbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKGF0dHJpYnV0ZVNlbGVjdG9yKTtcblxuXHRcdC8vIFByb2Nlc3MgZWxlbWVudHMgZm9yIHBhcnRpYWwgbWF0Y2hlc1xuXHRcdGFsbEVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0Ly8gU2tpcCBpZiBhbHJlYWR5IG1hcmtlZCBmb3IgcmVtb3ZhbFxuXHRcdFx0aWYgKGVsZW1lbnRzVG9SZW1vdmUuaGFzKGVsKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdldCBhbGwgcmVsZXZhbnQgYXR0cmlidXRlcyBhbmQgY29tYmluZSBpbnRvIGEgc2luZ2xlIHN0cmluZ1xuXHRcdFx0Y29uc3QgYXR0cnMgPSBbXG5cdFx0XHRcdGVsLmNsYXNzTmFtZSAmJiB0eXBlb2YgZWwuY2xhc3NOYW1lID09PSAnc3RyaW5nJyA/IGVsLmNsYXNzTmFtZSA6ICcnLFxuXHRcdFx0XHRlbC5pZCB8fCAnJyxcblx0XHRcdFx0ZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRlc3RpZCcpIHx8ICcnLFxuXHRcdFx0XHRlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcWEnKSB8fCAnJyxcblx0XHRcdFx0ZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN5JykgfHwgJydcblx0XHRcdF0uam9pbignICcpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdC8vIFNraXAgaWYgbm8gYXR0cmlidXRlcyB0byBjaGVja1xuXHRcdFx0aWYgKCFhdHRycy50cmltKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayBmb3IgcGFydGlhbCBtYXRjaCB1c2luZyBzaW5nbGUgcmVnZXggdGVzdFxuXHRcdFx0aWYgKHBhcnRpYWxSZWdleC50ZXN0KGF0dHJzKSkge1xuXHRcdFx0XHRlbGVtZW50c1RvUmVtb3ZlLmFkZChlbCk7XG5cdFx0XHRcdHBhcnRpYWxTZWxlY3RvckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBSZW1vdmUgYWxsIGNvbGxlY3RlZCBlbGVtZW50cyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0ZWxlbWVudHNUb1JlbW92ZS5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcblxuXHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgY2x1dHRlciBlbGVtZW50czonLCB7XG5cdFx0XHRleGFjdFNlbGVjdG9yczogZXhhY3RTZWxlY3RvckNvdW50LFxuXHRcdFx0cGFydGlhbFNlbGVjdG9yczogcGFydGlhbFNlbGVjdG9yQ291bnQsXG5cdFx0XHR0b3RhbDogZWxlbWVudHNUb1JlbW92ZS5zaXplLFxuXHRcdFx0cHJvY2Vzc2luZ1RpbWU6IGAkeyhlbmRUaW1lIC0gc3RhcnRUaW1lKS50b0ZpeGVkKDIpfW1zYFxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBmbGF0dGVuRGl2cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuXHRcdC8vIFByb2Nlc3MgaW4gYmF0Y2hlcyB0byBtYWludGFpbiBwZXJmb3JtYW5jZVxuXHRcdGxldCBrZWVwUHJvY2Vzc2luZyA9IHRydWU7XG5cblx0XHRjb25zdCBzaG91bGRQcmVzZXJ2ZUVsZW1lbnQgPSAoZWw6IEVsZW1lbnQpOiBib29sZWFuID0+IHtcblx0XHRcdGNvbnN0IHRhZ05hbWUgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgc2hvdWxkIGJlIHByZXNlcnZlZFxuXHRcdFx0aWYgKFBSRVNFUlZFX0VMRU1FTlRTLmhhcyh0YWdOYW1lKSkgcmV0dXJuIHRydWU7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGZvciBzZW1hbnRpYyByb2xlc1xuXHRcdFx0Y29uc3Qgcm9sZSA9IGVsLmdldEF0dHJpYnV0ZSgncm9sZScpO1xuXHRcdFx0aWYgKHJvbGUgJiYgWydhcnRpY2xlJywgJ21haW4nLCAnbmF2aWdhdGlvbicsICdiYW5uZXInLCAnY29udGVudGluZm8nXS5pbmNsdWRlcyhyb2xlKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gQ2hlY2sgZm9yIHNlbWFudGljIGNsYXNzZXNcblx0XHRcdGNvbnN0IGNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKGNsYXNzTmFtZS5tYXRjaCgvKD86YXJ0aWNsZXxtYWlufGNvbnRlbnR8Zm9vdG5vdGV8cmVmZXJlbmNlfGJpYmxpb2dyYXBoeSkvKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgaWYgZGl2IGNvbnRhaW5zIG1peGVkIGNvbnRlbnQgdHlwZXMgdGhhdCBzaG91bGQgYmUgcHJlc2VydmVkXG5cdFx0XHRpZiAodGFnTmFtZSA9PT0gJ2RpdicpIHtcblx0XHRcdFx0Y29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGVsLmNoaWxkcmVuKTtcblx0XHRcdFx0Y29uc3QgaGFzUHJlc2VydmVkRWxlbWVudHMgPSBjaGlsZHJlbi5zb21lKGNoaWxkID0+IFxuXHRcdFx0XHRcdFBSRVNFUlZFX0VMRU1FTlRTLmhhcyhjaGlsZC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpIHx8XG5cdFx0XHRcdFx0Y2hpbGQuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICdhcnRpY2xlJyB8fFxuXHRcdFx0XHRcdGNoaWxkLmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhcnRpY2xlJylcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKGhhc1ByZXNlcnZlZEVsZW1lbnRzKSByZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHRjb25zdCBpc1dyYXBwZXJEaXYgPSAoZGl2OiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHQvLyBDaGVjayBpZiBpdCdzIGp1c3QgZW1wdHkgc3BhY2Vcblx0XHRcdGlmICghZGl2LnRleHRDb250ZW50Py50cmltKCkpIHJldHVybiB0cnVlO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBpdCBvbmx5IGNvbnRhaW5zIG90aGVyIGRpdnMgb3IgYmxvY2sgZWxlbWVudHNcblx0XHRcdGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShkaXYuY2hpbGRyZW4pO1xuXHRcdFx0aWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGlmIGFsbCBjaGlsZHJlbiBhcmUgYmxvY2sgZWxlbWVudHNcblx0XHRcdGNvbnN0IGFsbEJsb2NrRWxlbWVudHMgPSBjaGlsZHJlbi5ldmVyeShjaGlsZCA9PiB7XG5cdFx0XHRcdGNvbnN0IHRhZyA9IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0cmV0dXJuIHRhZyA9PT0gJ2RpdicgfHwgdGFnID09PSAncCcgfHwgdGFnID09PSAnaDEnIHx8IHRhZyA9PT0gJ2gyJyB8fCBcblx0XHRcdFx0XHQgICB0YWcgPT09ICdoMycgfHwgdGFnID09PSAnaDQnIHx8IHRhZyA9PT0gJ2g1JyB8fCB0YWcgPT09ICdoNicgfHxcblx0XHRcdFx0XHQgICB0YWcgPT09ICd1bCcgfHwgdGFnID09PSAnb2wnIHx8IHRhZyA9PT0gJ3ByZScgfHwgdGFnID09PSAnYmxvY2txdW90ZScgfHxcblx0XHRcdFx0XHQgICB0YWcgPT09ICdmaWd1cmUnO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoYWxsQmxvY2tFbGVtZW50cykgcmV0dXJuIHRydWU7XG5cblx0XHRcdC8vIENoZWNrIGZvciBjb21tb24gd3JhcHBlciBwYXR0ZXJuc1xuXHRcdFx0Y29uc3QgY2xhc3NOYW1lID0gZGl2LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0Y29uc3QgaXNXcmFwcGVyID0gLyg/OndyYXBwZXJ8Y29udGFpbmVyfGxheW91dHxyb3d8Y29sfGdyaWR8ZmxleHxvdXRlcnxpbm5lcnxjb250ZW50LWFyZWEpL2kudGVzdChjbGFzc05hbWUpO1xuXHRcdFx0aWYgKGlzV3JhcHBlcikgcmV0dXJuIHRydWU7XG5cblx0XHRcdC8vIENoZWNrIGlmIGl0IGhhcyBleGNlc3NpdmUgd2hpdGVzcGFjZSBvciBlbXB0eSB0ZXh0IG5vZGVzXG5cdFx0XHRjb25zdCB0ZXh0Tm9kZXMgPSBBcnJheS5mcm9tKGRpdi5jaGlsZE5vZGVzKS5maWx0ZXIobm9kZSA9PiBcblx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgJiYgbm9kZS50ZXh0Q29udGVudD8udHJpbSgpXG5cdFx0XHQpO1xuXHRcdFx0aWYgKHRleHROb2Rlcy5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBpdCdzIGEgZGl2IHRoYXQgb25seSBjb250YWlucyBibG9jayBlbGVtZW50c1xuXHRcdFx0Y29uc3QgaGFzT25seUJsb2NrRWxlbWVudHMgPSBjaGlsZHJlbi5sZW5ndGggPiAwICYmICFjaGlsZHJlbi5zb21lKGNoaWxkID0+IHtcblx0XHRcdFx0Y29uc3QgdGFnID0gY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRyZXR1cm4gSU5MSU5FX0VMRU1FTlRTLmhhcyh0YWcpO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoaGFzT25seUJsb2NrRWxlbWVudHMpIHJldHVybiB0cnVlO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdC8vIEZ1bmN0aW9uIHRvIHByb2Nlc3MgYSBzaW5nbGUgZGl2XG5cdFx0Y29uc3QgcHJvY2Vzc0RpdiA9IChkaXY6IEVsZW1lbnQpOiBib29sZWFuID0+IHtcblx0XHRcdC8vIFNraXAgcHJvY2Vzc2luZyBpZiBkaXYgaGFzIGJlZW4gcmVtb3ZlZCBvciBzaG91bGQgYmUgcHJlc2VydmVkXG5cdFx0XHRpZiAoIWRpdi5pc0Nvbm5lY3RlZCB8fCBzaG91bGRQcmVzZXJ2ZUVsZW1lbnQoZGl2KSkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0XHQvLyBDYXNlIDE6IEVtcHR5IGRpdiBvciBkaXYgd2l0aCBvbmx5IHdoaXRlc3BhY2Vcblx0XHRcdGlmICghZGl2Lmhhc0NoaWxkTm9kZXMoKSB8fCAhZGl2LnRleHRDb250ZW50Py50cmltKCkpIHtcblx0XHRcdFx0ZGl2LnJlbW92ZSgpO1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FzZSAyOiBUb3AtbGV2ZWwgZGl2IC0gYmUgbW9yZSBhZ2dyZXNzaXZlXG5cdFx0XHRpZiAoZGl2LnBhcmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcblx0XHRcdFx0Y29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGRpdi5jaGlsZHJlbik7XG5cdFx0XHRcdGNvbnN0IGhhc09ubHlCbG9ja0VsZW1lbnRzID0gY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhY2hpbGRyZW4uc29tZShjaGlsZCA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgdGFnID0gY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdHJldHVybiBJTkxJTkVfRUxFTUVOVFMuaGFzKHRhZyk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChoYXNPbmx5QmxvY2tFbGVtZW50cykge1xuXHRcdFx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHRcdHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgoZnJhZ21lbnQpO1xuXHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FzZSAzOiBXcmFwcGVyIGRpdiAtIG1lcmdlIHVwIGFnZ3Jlc3NpdmVseVxuXHRcdFx0aWYgKGlzV3JhcHBlckRpdihkaXYpKSB7XG5cdFx0XHRcdC8vIFNwZWNpYWwgY2FzZTogaWYgZGl2IG9ubHkgY29udGFpbnMgYmxvY2sgZWxlbWVudHMsIG1lcmdlIHRoZW0gdXBcblx0XHRcdFx0Y29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGRpdi5jaGlsZHJlbik7XG5cdFx0XHRcdGNvbnN0IG9ubHlCbG9ja0VsZW1lbnRzID0gIWNoaWxkcmVuLnNvbWUoY2hpbGQgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHRhZyA9IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRyZXR1cm4gSU5MSU5FX0VMRU1FTlRTLmhhcyh0YWcpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChvbmx5QmxvY2tFbGVtZW50cykge1xuXHRcdFx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHRcdHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgoZnJhZ21lbnQpO1xuXHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPdGhlcndpc2UgaGFuZGxlIGFzIG5vcm1hbCB3cmFwcGVyXG5cdFx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHR3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYuZmlyc3RDaGlsZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhc2UgNDogRGl2IG9ubHkgY29udGFpbnMgdGV4dCBjb250ZW50IC0gY29udmVydCB0byBwYXJhZ3JhcGhcblx0XHRcdGlmICghZGl2LmNoaWxkcmVuLmxlbmd0aCAmJiBkaXYudGV4dENvbnRlbnQ/LnRyaW0oKSkge1xuXHRcdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRwLnRleHRDb250ZW50ID0gZGl2LnRleHRDb250ZW50O1xuXHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYXNlIDU6IERpdiBoYXMgc2luZ2xlIGNoaWxkXG5cdFx0XHRpZiAoZGl2LmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRjb25zdCBjaGlsZCA9IGRpdi5maXJzdEVsZW1lbnRDaGlsZCE7XG5cdFx0XHRcdGNvbnN0IGNoaWxkVGFnID0gY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gRG9uJ3QgdW53cmFwIGlmIGNoaWxkIGlzIGlubGluZSBvciBzaG91bGQgYmUgcHJlc2VydmVkXG5cdFx0XHRcdGlmICghSU5MSU5FX0VMRU1FTlRTLmhhcyhjaGlsZFRhZykgJiYgIXNob3VsZFByZXNlcnZlRWxlbWVudChjaGlsZCkpIHtcblx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgoY2hpbGQpO1xuXHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FzZSA2OiBEZWVwbHkgbmVzdGVkIGRpdiAtIG1lcmdlIHVwXG5cdFx0XHRsZXQgbmVzdGluZ0RlcHRoID0gMDtcblx0XHRcdGxldCBwYXJlbnQgPSBkaXYucGFyZW50RWxlbWVudDtcblx0XHRcdHdoaWxlIChwYXJlbnQpIHtcblx0XHRcdFx0aWYgKHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdkaXYnKSB7XG5cdFx0XHRcdFx0bmVzdGluZ0RlcHRoKys7XG5cdFx0XHRcdH1cblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChuZXN0aW5nRGVwdGggPiAwKSB7IC8vIENoYW5nZWQgZnJvbSA+IDEgdG8gPiAwIHRvIGJlIG1vcmUgYWdncmVzc2l2ZVxuXHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0d2hpbGUgKGRpdi5maXJzdENoaWxkKSB7XG5cdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChmcmFnbWVudCk7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdC8vIEZpcnN0IHBhc3M6IFByb2Nlc3MgdG9wLWxldmVsIGRpdnNcblx0XHRjb25zdCBwcm9jZXNzVG9wTGV2ZWxEaXZzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgdG9wRGl2cyA9IEFycmF5LmZyb20oZWxlbWVudC5jaGlsZHJlbikuZmlsdGVyKFxuXHRcdFx0XHRlbCA9PiBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdkaXYnXG5cdFx0XHQpO1xuXHRcdFx0XG5cdFx0XHRsZXQgbW9kaWZpZWQgPSBmYWxzZTtcblx0XHRcdHRvcERpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRpZiAocHJvY2Vzc0RpdihkaXYpKSB7XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBtb2RpZmllZDtcblx0XHR9O1xuXG5cdFx0Ly8gU2Vjb25kIHBhc3M6IFByb2Nlc3MgcmVtYWluaW5nIGRpdnMgZnJvbSBkZWVwZXN0IHRvIHNoYWxsb3dlc3Rcblx0XHRjb25zdCBwcm9jZXNzUmVtYWluaW5nRGl2cyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGFsbERpdnMgPSBBcnJheS5mcm9tKGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpKVxuXHRcdFx0XHQuc29ydCgoYSwgYikgPT4ge1xuXHRcdFx0XHRcdC8vIENvdW50IG5lc3RpbmcgZGVwdGhcblx0XHRcdFx0XHRjb25zdCBnZXREZXB0aCA9IChlbDogRWxlbWVudCk6IG51bWJlciA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgZGVwdGggPSAwO1xuXHRcdFx0XHRcdFx0bGV0IHBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0XHR3aGlsZSAocGFyZW50KSB7XG5cdFx0XHRcdFx0XHRcdGlmIChwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JykgZGVwdGgrKztcblx0XHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGVwdGg7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRyZXR1cm4gZ2V0RGVwdGgoYikgLSBnZXREZXB0aChhKTsgLy8gUHJvY2VzcyBkZWVwZXN0IGZpcnN0XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRsZXQgbW9kaWZpZWQgPSBmYWxzZTtcblx0XHRcdGFsbERpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRpZiAocHJvY2Vzc0RpdihkaXYpKSB7XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBtb2RpZmllZDtcblx0XHR9O1xuXG5cdFx0Ly8gRmluYWwgY2xlYW51cCBwYXNzIC0gYWdncmVzc2l2ZWx5IGZsYXR0ZW4gcmVtYWluaW5nIGRpdnNcblx0XHRjb25zdCBmaW5hbENsZWFudXAgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCByZW1haW5pbmdEaXZzID0gQXJyYXkuZnJvbShlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSk7XG5cdFx0XHRsZXQgbW9kaWZpZWQgPSBmYWxzZTtcblx0XHRcdFxuXHRcdFx0cmVtYWluaW5nRGl2cy5mb3JFYWNoKGRpdiA9PiB7XG5cdFx0XHRcdC8vIENoZWNrIGlmIGRpdiBvbmx5IGNvbnRhaW5zIHBhcmFncmFwaHNcblx0XHRcdFx0Y29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGRpdi5jaGlsZHJlbik7XG5cdFx0XHRcdGNvbnN0IG9ubHlQYXJhZ3JhcGhzID0gY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4gY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncCcpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKG9ubHlQYXJhZ3JhcGhzIHx8ICghc2hvdWxkUHJlc2VydmVFbGVtZW50KGRpdikgJiYgaXNXcmFwcGVyRGl2KGRpdikpKSB7XG5cdFx0XHRcdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdFx0d2hpbGUgKGRpdi5maXJzdENoaWxkKSB7XG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYuZmlyc3RDaGlsZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChmcmFnbWVudCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0XHRtb2RpZmllZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG1vZGlmaWVkO1xuXHRcdH07XG5cblx0XHQvLyBFeGVjdXRlIGFsbCBwYXNzZXMgdW50aWwgbm8gbW9yZSBjaGFuZ2VzXG5cdFx0ZG8ge1xuXHRcdFx0XHRrZWVwUHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRpZiAocHJvY2Vzc1RvcExldmVsRGl2cygpKSBrZWVwUHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdGlmIChwcm9jZXNzUmVtYWluaW5nRGl2cygpKSBrZWVwUHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdGlmIChmaW5hbENsZWFudXAoKSkga2VlcFByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0fSB3aGlsZSAoa2VlcFByb2Nlc3NpbmcpO1xuXG5cdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuX2xvZygnRmxhdHRlbmVkIGRpdnM6Jywge1xuXHRcdFx0Y291bnQ6IHByb2Nlc3NlZENvdW50LFxuXHRcdFx0cHJvY2Vzc2luZ1RpbWU6IGAkeyhlbmRUaW1lIC0gc3RhcnRUaW1lKS50b0ZpeGVkKDIpfW1zYFxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBjbGVhbkNvbnRlbnQoZWxlbWVudDogRWxlbWVudCwgbWV0YWRhdGE6IERlZnVkZGxlTWV0YWRhdGEpIHtcblx0XHQvLyBSZW1vdmUgSFRNTCBjb21tZW50c1xuXHRcdHRoaXMucmVtb3ZlSHRtbENvbW1lbnRzKGVsZW1lbnQpO1xuXHRcdFxuXHRcdC8vIEhhbmRsZSBIMSBlbGVtZW50cyAtIHJlbW92ZSBmaXJzdCBvbmUgYW5kIGNvbnZlcnQgb3RoZXJzIHRvIEgyXG5cdFx0dGhpcy5oYW5kbGVIZWFkaW5ncyhlbGVtZW50LCBtZXRhZGF0YS50aXRsZSk7XG5cdFx0XG5cdFx0Ly8gU3RhbmRhcmRpemUgZm9vdG5vdGVzIGFuZCBjaXRhdGlvbnNcblx0XHR0aGlzLnN0YW5kYXJkaXplRm9vdG5vdGVzKGVsZW1lbnQpO1xuXG5cdFx0Ly8gSGFuZGxlIGxhenktbG9hZGVkIGltYWdlc1xuXHRcdHRoaXMuaGFuZGxlTGF6eUltYWdlcyhlbGVtZW50KTtcblxuXHRcdC8vIENvbnZlcnQgZW1iZWRkZWQgY29udGVudCB0byBzdGFuZGFyZCBmb3JtYXRzXG5cdFx0dGhpcy5zdGFuZGFyZGl6ZUVsZW1lbnRzKGVsZW1lbnQpO1xuXG5cdFx0Ly8gU2tpcCBkaXYgZmxhdHRlbmluZyBpbiBkZWJ1ZyBtb2RlXG5cdFx0aWYgKCF0aGlzLmRlYnVnKSB7XG5cdFx0XHQvLyBGaXJzdCBwYXNzIG9mIGRpdiBmbGF0dGVuaW5nXG5cdFx0XHR0aGlzLmZsYXR0ZW5EaXZzKGVsZW1lbnQpO1xuXHRcdFx0XG5cdFx0XHQvLyBTdHJpcCB1bndhbnRlZCBhdHRyaWJ1dGVzXG5cdFx0XHR0aGlzLnN0cmlwVW53YW50ZWRBdHRyaWJ1dGVzKGVsZW1lbnQpO1xuXG5cdFx0XHQvLyBSZW1vdmUgZW1wdHkgZWxlbWVudHNcblx0XHRcdHRoaXMucmVtb3ZlRW1wdHlFbGVtZW50cyhlbGVtZW50KTtcblxuXHRcdFx0Ly8gUmVtb3ZlIHRyYWlsaW5nIGhlYWRpbmdzXG5cdFx0XHR0aGlzLnJlbW92ZVRyYWlsaW5nSGVhZGluZ3MoZWxlbWVudCk7XG5cblx0XHRcdC8vIEZpbmFsIHBhc3Mgb2YgZGl2IGZsYXR0ZW5pbmcgYWZ0ZXIgY2xlYW51cCBvcGVyYXRpb25zXG5cdFx0XHR0aGlzLmZsYXR0ZW5EaXZzKGVsZW1lbnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBJbiBkZWJ1ZyBtb2RlLCBzdGlsbCBkbyBiYXNpYyBjbGVhbnVwIGJ1dCBwcmVzZXJ2ZSBzdHJ1Y3R1cmVcblx0XHRcdHRoaXMuc3RyaXBVbndhbnRlZEF0dHJpYnV0ZXMoZWxlbWVudCk7XG5cdFx0XHR0aGlzLnJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudCk7XG5cdFx0XHR0aGlzLnJlbW92ZVRyYWlsaW5nSGVhZGluZ3MoZWxlbWVudCk7XG5cdFx0XHR0aGlzLl9sb2coJ0RlYnVnIG1vZGU6IFNraXBwaW5nIGRpdiBmbGF0dGVuaW5nIHRvIHByZXNlcnZlIHN0cnVjdHVyZScpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlVHJhaWxpbmdIZWFkaW5ncyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHJlbW92ZWRDb3VudCA9IDA7XG5cblx0XHRjb25zdCBoYXNDb250ZW50QWZ0ZXIgPSAoZWw6IEVsZW1lbnQpOiBib29sZWFuID0+IHtcblx0XHRcdC8vIENoZWNrIGlmIHRoZXJlJ3MgYW55IG1lYW5pbmdmdWwgY29udGVudCBhZnRlciB0aGlzIGVsZW1lbnRcblx0XHRcdGxldCBuZXh0Q29udGVudCA9ICcnO1xuXHRcdFx0bGV0IHNpYmxpbmcgPSBlbC5uZXh0U2libGluZztcblxuXHRcdFx0Ly8gRmlyc3QgY2hlY2sgZGlyZWN0IHNpYmxpbmdzXG5cdFx0XHR3aGlsZSAoc2libGluZykge1xuXHRcdFx0XHRpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRuZXh0Q29udGVudCArPSBzaWJsaW5nLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG5cdFx0XHRcdFx0Ly8gSWYgd2UgZmluZCBhbiBlbGVtZW50IHNpYmxpbmcsIGNoZWNrIGl0cyBjb250ZW50XG5cdFx0XHRcdFx0bmV4dENvbnRlbnQgKz0gKHNpYmxpbmcgYXMgRWxlbWVudCkudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmc7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHdlIGZvdW5kIG1lYW5pbmdmdWwgY29udGVudCBhdCB0aGlzIGxldmVsLCByZXR1cm4gdHJ1ZVxuXHRcdFx0aWYgKG5leHRDb250ZW50LnRyaW0oKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgbm8gY29udGVudCBmb3VuZCBhdCB0aGlzIGxldmVsIGFuZCB3ZSBoYXZlIGEgcGFyZW50LFxuXHRcdFx0Ly8gY2hlY2sgZm9yIGNvbnRlbnQgYWZ0ZXIgdGhlIHBhcmVudFxuXHRcdFx0Y29uc3QgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcblx0XHRcdGlmIChwYXJlbnQgJiYgcGFyZW50ICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdHJldHVybiBoYXNDb250ZW50QWZ0ZXIocGFyZW50KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHQvLyBQcm9jZXNzIGFsbCBoZWFkaW5ncyBmcm9tIGJvdHRvbSB0byB0b3Bcblx0XHRjb25zdCBoZWFkaW5ncyA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoMSwgaDIsIGgzLCBoNCwgaDUsIGg2JykpXG5cdFx0XHQucmV2ZXJzZSgpO1xuXG5cdFx0aGVhZGluZ3MuZm9yRWFjaChoZWFkaW5nID0+IHtcblx0XHRcdGlmICghaGFzQ29udGVudEFmdGVyKGhlYWRpbmcpKSB7XG5cdFx0XHRcdGhlYWRpbmcucmVtb3ZlKCk7XG5cdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU3RvcCBwcm9jZXNzaW5nIG9uY2Ugd2UgZmluZCBhIGhlYWRpbmcgd2l0aCBjb250ZW50IGFmdGVyIGl0XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmIChyZW1vdmVkQ291bnQgPiAwKSB7XG5cdFx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgdHJhaWxpbmcgaGVhZGluZ3M6JywgcmVtb3ZlZENvdW50KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGhhbmRsZUhlYWRpbmdzKGVsZW1lbnQ6IEVsZW1lbnQsIHRpdGxlOiBzdHJpbmcpIHtcblx0XHRjb25zdCBoMXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMScpO1xuXG5cdFx0QXJyYXkuZnJvbShoMXMpLmZvckVhY2goaDEgPT4ge1xuXHRcdFx0Y29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuXHRcdFx0aDIuaW5uZXJIVE1MID0gaDEuaW5uZXJIVE1MO1xuXHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LmZyb20oaDEuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdGgyLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGgxLnBhcmVudE5vZGU/LnJlcGxhY2VDaGlsZChoMiwgaDEpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIGZpcnN0IEgyIGlmIGl0IG1hdGNoZXMgdGl0bGVcblx0XHRjb25zdCBoMnMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMicpO1xuXHRcdGlmIChoMnMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgZmlyc3RIMiA9IGgyc1swXTtcblx0XHRcdGNvbnN0IGZpcnN0SDJUZXh0ID0gZmlyc3RIMi50ZXh0Q29udGVudD8udHJpbSgpLnRvTG93ZXJDYXNlKCkgfHwgJyc7XG5cdFx0XHRjb25zdCBub3JtYWxpemVkVGl0bGUgPSB0aXRsZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblx0XHRcdGlmIChub3JtYWxpemVkVGl0bGUgJiYgbm9ybWFsaXplZFRpdGxlID09PSBmaXJzdEgyVGV4dCkge1xuXHRcdFx0XHRmaXJzdEgyLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlSHRtbENvbW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRjb25zdCBjb21tZW50czogQ29tbWVudFtdID0gW107XG5cdFx0Y29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcblx0XHRcdGVsZW1lbnQsXG5cdFx0XHROb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCxcblx0XHRcdG51bGxcblx0XHQpO1xuXG5cdFx0bGV0IG5vZGU7XG5cdFx0d2hpbGUgKG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKSkge1xuXHRcdFx0Y29tbWVudHMucHVzaChub2RlIGFzIENvbW1lbnQpO1xuXHRcdH1cblxuXHRcdGNvbW1lbnRzLmZvckVhY2goY29tbWVudCA9PiB7XG5cdFx0XHRjb21tZW50LnJlbW92ZSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIEhUTUwgY29tbWVudHM6JywgY29tbWVudHMubGVuZ3RoKTtcblx0fVxuXG5cdHByaXZhdGUgc3RyaXBVbndhbnRlZEF0dHJpYnV0ZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBhdHRyaWJ1dGVDb3VudCA9IDA7XG5cblx0XHRjb25zdCBwcm9jZXNzRWxlbWVudCA9IChlbDogRWxlbWVudCkgPT4ge1xuXHRcdFx0Ly8gU2tpcCBTVkcgZWxlbWVudHMgLSBwcmVzZXJ2ZSBhbGwgdGhlaXIgYXR0cmlidXRlc1xuXHRcdFx0aWYgKGVsIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpO1xuXHRcdFx0XG5cdFx0XHRhdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGNvbnN0IGF0dHJOYW1lID0gYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdC8vIEluIGRlYnVnIG1vZGUsIGFsbG93IGRlYnVnIGF0dHJpYnV0ZXMgYW5kIGRhdGEtIGF0dHJpYnV0ZXNcblx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRpZiAoIUFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ck5hbWUpICYmIFxuXHRcdFx0XHRcdFx0IUFMTE9XRURfQVRUUklCVVRFU19ERUJVRy5oYXMoYXR0ck5hbWUpICYmIFxuXHRcdFx0XHRcdFx0IWF0dHJOYW1lLnN0YXJ0c1dpdGgoJ2RhdGEtJykpIHtcblx0XHRcdFx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyLm5hbWUpO1xuXHRcdFx0XHRcdFx0YXR0cmlidXRlQ291bnQrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gSW4gbm9ybWFsIG1vZGUsIG9ubHkgYWxsb3cgc3RhbmRhcmQgYXR0cmlidXRlc1xuXHRcdFx0XHRcdGlmICghQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyTmFtZSkpIHtcblx0XHRcdFx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyLm5hbWUpO1xuXHRcdFx0XHRcdFx0YXR0cmlidXRlQ291bnQrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRwcm9jZXNzRWxlbWVudChlbGVtZW50KTtcblx0XHRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5mb3JFYWNoKHByb2Nlc3NFbGVtZW50KTtcblxuXHRcdHRoaXMuX2xvZygnU3RyaXBwZWQgYXR0cmlidXRlczonLCBhdHRyaWJ1dGVDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXHRcdGxldCBpdGVyYXRpb25zID0gMDtcblx0XHRsZXQga2VlcFJlbW92aW5nID0gdHJ1ZTtcblxuXHRcdHdoaWxlIChrZWVwUmVtb3ZpbmcpIHtcblx0XHRcdGl0ZXJhdGlvbnMrKztcblx0XHRcdGtlZXBSZW1vdmluZyA9IGZhbHNlO1xuXHRcdFx0Ly8gR2V0IGFsbCBlbGVtZW50cyB3aXRob3V0IGNoaWxkcmVuLCB3b3JraW5nIGZyb20gZGVlcGVzdCBmaXJzdFxuXHRcdFx0Y29uc3QgZW1wdHlFbGVtZW50cyA9IEFycmF5LmZyb20oZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpKS5maWx0ZXIoZWwgPT4ge1xuXHRcdFx0XHRpZiAoQUxMT1dFRF9FTVBUWV9FTEVNRU5UUy5oYXMoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgb25seSB3aGl0ZXNwYWNlIG9yICZuYnNwO1xuXHRcdFx0XHRjb25zdCB0ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRjb25zdCBoYXNPbmx5V2hpdGVzcGFjZSA9IHRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT09IDA7XG5cdFx0XHRcdGNvbnN0IGhhc05ic3AgPSB0ZXh0Q29udGVudC5pbmNsdWRlcygnXFx1MDBBMCcpOyAvLyBVbmljb2RlIG5vbi1icmVha2luZyBzcGFjZVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgbm8gbWVhbmluZ2Z1bCBjaGlsZHJlblxuXHRcdFx0XHRjb25zdCBoYXNOb0NoaWxkcmVuID0gIWVsLmhhc0NoaWxkTm9kZXMoKSB8fCBcblx0XHRcdFx0XHQoQXJyYXkuZnJvbShlbC5jaGlsZE5vZGVzKS5ldmVyeShub2RlID0+IHtcblx0XHRcdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBub2RlVGV4dCA9IG5vZGUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBub2RlVGV4dC50cmltKCkubGVuZ3RoID09PSAwICYmICFub2RlVGV4dC5pbmNsdWRlcygnXFx1MDBBMCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRyZXR1cm4gaGFzT25seVdoaXRlc3BhY2UgJiYgIWhhc05ic3AgJiYgaGFzTm9DaGlsZHJlbjtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoZW1wdHlFbGVtZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGVtcHR5RWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdFx0ZWwucmVtb3ZlKCk7XG5cdFx0XHRcdFx0cmVtb3ZlZENvdW50Kys7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRrZWVwUmVtb3ZpbmcgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBlbXB0eSBlbGVtZW50czonLCB7XG5cdFx0XHRjb3VudDogcmVtb3ZlZENvdW50LFxuXHRcdFx0aXRlcmF0aW9uc1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVGb290bm90ZUl0ZW0oXG5cdFx0Zm9vdG5vdGVOdW1iZXI6IG51bWJlcixcblx0XHRjb250ZW50OiBzdHJpbmcgfCBFbGVtZW50LFxuXHRcdHJlZnM6IHN0cmluZ1tdXG5cdCk6IEhUTUxMSUVsZW1lbnQge1xuXHRcdGNvbnN0IG5ld0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdG5ld0l0ZW0uY2xhc3NOYW1lID0gJ2Zvb3Rub3RlJztcblx0XHRuZXdJdGVtLmlkID0gYGZuOiR7Zm9vdG5vdGVOdW1iZXJ9YDtcblxuXHRcdC8vIEhhbmRsZSBjb250ZW50XG5cdFx0aWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuXHRcdFx0Y29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cdFx0XHRuZXdJdGVtLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEdldCBhbGwgcGFyYWdyYXBocyBmcm9tIHRoZSBjb250ZW50XG5cdFx0XHRjb25zdCBwYXJhZ3JhcGhzID0gQXJyYXkuZnJvbShjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3AnKSk7XG5cdFx0XHRpZiAocGFyYWdyYXBocy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0Ly8gSWYgbm8gcGFyYWdyYXBocywgd3JhcCBjb250ZW50IGluIGEgcGFyYWdyYXBoXG5cdFx0XHRcdGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9IGNvbnRlbnQuaW5uZXJIVE1MO1xuXHRcdFx0XHRuZXdJdGVtLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBDb3B5IGV4aXN0aW5nIHBhcmFncmFwaHNcblx0XHRcdFx0cGFyYWdyYXBocy5mb3JFYWNoKHAgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IG5ld1AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdFx0bmV3UC5pbm5lckhUTUwgPSBwLmlubmVySFRNTDtcblx0XHRcdFx0XHRuZXdJdGVtLmFwcGVuZENoaWxkKG5ld1ApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBZGQgYmFja2xpbmsocykgdG8gdGhlIGxhc3QgcGFyYWdyYXBoXG5cdFx0Y29uc3QgbGFzdFBhcmFncmFwaCA9IG5ld0l0ZW0ucXVlcnlTZWxlY3RvcigncDpsYXN0LW9mLXR5cGUnKSB8fCBuZXdJdGVtO1xuXHRcdHJlZnMuZm9yRWFjaCgocmVmSWQsIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBiYWNrbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdGJhY2tsaW5rLmhyZWYgPSBgIyR7cmVmSWR9YDtcblx0XHRcdGJhY2tsaW5rLnRpdGxlID0gJ3JldHVybiB0byBhcnRpY2xlJztcblx0XHRcdGJhY2tsaW5rLmNsYXNzTmFtZSA9ICdmb290bm90ZS1iYWNrcmVmJztcblx0XHRcdGJhY2tsaW5rLmlubmVySFRNTCA9ICfihqknO1xuXHRcdFx0aWYgKGluZGV4IDwgcmVmcy5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdGJhY2tsaW5rLmlubmVySFRNTCArPSAnICc7XG5cdFx0XHR9XG5cdFx0XHRsYXN0UGFyYWdyYXBoLmFwcGVuZENoaWxkKGJhY2tsaW5rKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBuZXdJdGVtO1xuXHR9XG5cblx0cHJpdmF0ZSBjb2xsZWN0Rm9vdG5vdGVzKGVsZW1lbnQ6IEVsZW1lbnQpOiBGb290bm90ZUNvbGxlY3Rpb24ge1xuXHRcdGNvbnN0IGZvb3Rub3RlczogRm9vdG5vdGVDb2xsZWN0aW9uID0ge307XG5cdFx0bGV0IGZvb3Rub3RlQ291bnQgPSAxO1xuXHRcdGNvbnN0IHByb2Nlc3NlZElkcyA9IG5ldyBTZXQ8c3RyaW5nPigpOyAvLyBUcmFjayBwcm9jZXNzZWQgSURzXG5cblx0XHQvLyBDb2xsZWN0IGFsbCBmb290bm90ZXMgYW5kIHRoZWlyIElEcyBmcm9tIGZvb3Rub3RlIGxpc3RzXG5cdFx0Y29uc3QgZm9vdG5vdGVMaXN0cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT09UTk9URV9MSVNUX1NFTEVDVE9SUyk7XG5cdFx0Zm9vdG5vdGVMaXN0cy5mb3JFYWNoKGxpc3QgPT4ge1xuXHRcdFx0Ly8gU3Vic3RhY2sgaGFzIGluZGl2aWR1YWwgZm9vdG5vdGUgZGl2cyB3aXRoIG5vIHBhcmVudFxuXHRcdFx0aWYgKGxpc3QubWF0Y2hlcygnZGl2LmZvb3Rub3RlW2RhdGEtY29tcG9uZW50LW5hbWU9XCJGb290bm90ZVRvRE9NXCJdJykpIHtcblx0XHRcdFx0Y29uc3QgYW5jaG9yID0gbGlzdC5xdWVyeVNlbGVjdG9yKCdhLmZvb3Rub3RlLW51bWJlcicpO1xuXHRcdFx0XHRjb25zdCBjb250ZW50ID0gbGlzdC5xdWVyeVNlbGVjdG9yKCcuZm9vdG5vdGUtY29udGVudCcpO1xuXHRcdFx0XHRpZiAoYW5jaG9yICYmIGNvbnRlbnQpIHtcblx0XHRcdFx0XHRjb25zdCBpZCA9IGFuY2hvci5pZC5yZXBsYWNlKCdmb290bm90ZS0nLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRpZiAoaWQgJiYgIXByb2Nlc3NlZElkcy5oYXMoaWQpKSB7XG5cdFx0XHRcdFx0XHRmb290bm90ZXNbZm9vdG5vdGVDb3VudF0gPSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQ6IGNvbnRlbnQsXG5cdFx0XHRcdFx0XHRcdG9yaWdpbmFsSWQ6IGlkLFxuXHRcdFx0XHRcdFx0XHRyZWZzOiBbXVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHByb2Nlc3NlZElkcy5hZGQoaWQpO1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVDb3VudCsrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbW1vbiBmb3JtYXQgdXNpbmcgT0wvVUwgYW5kIExJIGVsZW1lbnRzXG5cdFx0XHRjb25zdCBpdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGksIGRpdltyb2xlPVwibGlzdGl0ZW1cIl0nKTtcblx0XHRcdGl0ZW1zLmZvckVhY2gobGkgPT4ge1xuXHRcdFx0XHRsZXQgaWQgPSAnJztcblx0XHRcdFx0bGV0IGNvbnRlbnQ6IEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuXHRcdFx0XHQvLyBIYW5kbGUgY2l0YXRpb25zIHdpdGggLmNpdGF0aW9ucyBjbGFzc1xuXHRcdFx0XHRjb25zdCBjaXRhdGlvbnNEaXYgPSBsaS5xdWVyeVNlbGVjdG9yKCcuY2l0YXRpb25zJyk7XG5cdFx0XHRcdGlmIChjaXRhdGlvbnNEaXY/LmlkPy50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ3InKSkge1xuXHRcdFx0XHRcdGlkID0gY2l0YXRpb25zRGl2LmlkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0Ly8gTG9vayBmb3IgY2l0YXRpb24gY29udGVudCB3aXRoaW4gdGhlIGNpdGF0aW9ucyBkaXZcblx0XHRcdFx0XHRjb25zdCBjaXRhdGlvbkNvbnRlbnQgPSBjaXRhdGlvbnNEaXYucXVlcnlTZWxlY3RvcignLmNpdGF0aW9uLWNvbnRlbnQnKTtcblx0XHRcdFx0XHRpZiAoY2l0YXRpb25Db250ZW50KSB7XG5cdFx0XHRcdFx0XHRjb250ZW50ID0gY2l0YXRpb25Db250ZW50O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBFeHRyYWN0IElEIGZyb20gdmFyaW91cyBmb3JtYXRzXG5cdFx0XHRcdFx0aWYgKGxpLmlkLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnYmliLmJpYicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2JpYi5iaWInLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGxpLmlkLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnZm46JykpIHtcblx0XHRcdFx0XHRcdGlkID0gbGkuaWQucmVwbGFjZSgnZm46JywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2ZuJykpIHtcblx0XHRcdFx0XHRcdGlkID0gbGkuaWQucmVwbGFjZSgnZm4nLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHQvLyBOYXR1cmUuY29tXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaS5oYXNBdHRyaWJ1dGUoJ2RhdGEtY291bnRlcicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1jb3VudGVyJyk/LnJlcGxhY2UoL1xcLiQvLCAnJyk/LnRvTG93ZXJDYXNlKCkgfHwgJyc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gbGkuaWQuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goL2NpdGVfbm90ZS0oLispLyk7XG5cdFx0XHRcdFx0XHRpZCA9IG1hdGNoID8gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSA6IGxpLmlkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnRlbnQgPSBsaTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpZCAmJiAhcHJvY2Vzc2VkSWRzLmhhcyhpZCkpIHtcblx0XHRcdFx0XHRmb290bm90ZXNbZm9vdG5vdGVDb3VudF0gPSB7XG5cdFx0XHRcdFx0XHRjb250ZW50OiBjb250ZW50IHx8IGxpLFxuXHRcdFx0XHRcdFx0b3JpZ2luYWxJZDogaWQsXG5cdFx0XHRcdFx0XHRyZWZzOiBbXVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cHJvY2Vzc2VkSWRzLmFkZChpZCk7XG5cdFx0XHRcdFx0Zm9vdG5vdGVDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBmb290bm90ZXM7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRPdXRlckZvb3Rub3RlQ29udGFpbmVyKGVsOiBFbGVtZW50KTogRWxlbWVudCB7XG5cdFx0bGV0IGN1cnJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWw7XG5cdFx0bGV0IHBhcmVudDogRWxlbWVudCB8IG51bGwgPSBlbC5wYXJlbnRFbGVtZW50O1xuXHRcdFxuXHRcdC8vIEtlZXAgZ29pbmcgdXAgdW50aWwgd2UgZmluZCBhbiBlbGVtZW50IHRoYXQncyBub3QgYSBzcGFuIG9yIHN1cFxuXHRcdHdoaWxlIChwYXJlbnQgJiYgKFxuXHRcdFx0cGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NwYW4nIHx8IFxuXHRcdFx0cGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N1cCdcblx0XHQpKSB7XG5cdFx0XHRjdXJyZW50ID0gcGFyZW50O1xuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBjdXJyZW50O1xuXHR9XG5cblx0Ly8gRXZlcnkgZm9vdG5vdGUgcmVmZXJlbmNlIHNob3VsZCBiZSBhIHN1cCBlbGVtZW50IHdpdGggYW4gYW5jaG9yIGluc2lkZVxuXHQvLyBlLmcuIDxzdXAgaWQ9XCJmbnJlZjoxXCI+PGEgaHJlZj1cIiNmbjoxXCI+MTwvYT48L3N1cD5cblx0cHJpdmF0ZSBjcmVhdGVGb290bm90ZVJlZmVyZW5jZShmb290bm90ZU51bWJlcjogc3RyaW5nLCByZWZJZDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuXHRcdGNvbnN0IHN1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N1cCcpO1xuXHRcdHN1cC5pZCA9IHJlZklkO1xuXHRcdGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0bGluay5ocmVmID0gYCNmbjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cdFx0bGluay50ZXh0Q29udGVudCA9IGZvb3Rub3RlTnVtYmVyO1xuXHRcdHN1cC5hcHBlbmRDaGlsZChsaW5rKTtcblx0XHRyZXR1cm4gc3VwO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGFuZGFyZGl6ZUZvb3Rub3RlcyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0Y29uc3QgZm9vdG5vdGVzID0gdGhpcy5jb2xsZWN0Rm9vdG5vdGVzKGVsZW1lbnQpO1xuXG5cdFx0Ly8gU3RhbmRhcmRpemUgaW5saW5lIGZvb3Rub3RlcyB1c2luZyB0aGUgY29sbGVjdGVkIElEc1xuXHRcdGNvbnN0IGZvb3Rub3RlSW5saW5lUmVmZXJlbmNlcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT09UTk9URV9JTkxJTkVfUkVGRVJFTkNFUyk7XG5cdFx0XG5cdFx0Ly8gR3JvdXAgcmVmZXJlbmNlcyBieSB0aGVpciBwYXJlbnQgc3VwIGVsZW1lbnRcblx0XHRjb25zdCBzdXBHcm91cHMgPSBuZXcgTWFwPEVsZW1lbnQsIEVsZW1lbnRbXT4oKTtcblx0XHRcblx0XHRmb290bm90ZUlubGluZVJlZmVyZW5jZXMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuO1xuXG5cdFx0XHRsZXQgZm9vdG5vdGVJZCA9ICcnO1xuXHRcdFx0bGV0IGZvb3Rub3RlQ29udGVudCA9ICcnO1xuXG5cdFx0XHQvLyBFeHRyYWN0IGZvb3Rub3RlIElEIGJhc2VkIG9uIGVsZW1lbnQgdHlwZVxuXHRcdFx0Ly8gTmF0dXJlLmNvbVxuXHRcdFx0aWYgKGVsLm1hdGNoZXMoJ2FbaWRePVwicmVmLWxpbmtcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdC8vIFNjaWVuY2Uub3JnXG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2Fbcm9sZT1cImRvYy1iaWJsaW9yZWZcIl0nKSkge1xuXHRcdFx0XHRjb25zdCB4bWxSaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteG1sLXJpZCcpO1xuXHRcdFx0XHRpZiAoeG1sUmlkKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IHhtbFJpZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdFx0aWYgKGhyZWY/LnN0YXJ0c1dpdGgoJyNjb3JlLVInKSkge1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IGhyZWYucmVwbGFjZSgnI2NvcmUtJywgJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0Ly8gU3Vic3RhY2tcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYS5mb290bm90ZS1hbmNob3IsIHNwYW4uZm9vdG5vdGUtaG92ZXJjYXJkLXRhcmdldCBhJykpIHtcblx0XHRcdFx0Y29uc3QgaWQgPSBlbC5pZD8ucmVwbGFjZSgnZm9vdG5vdGUtYW5jaG9yLScsICcnKSB8fCAnJztcblx0XHRcdFx0aWYgKGlkKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IGlkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdH1cblx0XHRcdC8vIEFyeGl2XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2NpdGUubHR4X2NpdGUnKSkge1xuXHRcdFx0XHRjb25zdCBsaW5rID0gZWwucXVlcnlTZWxlY3RvcignYScpO1xuXHRcdFx0XHRpZiAobGluaykge1xuXHRcdFx0XHRcdGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGhyZWYuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goL2JpYlxcLmJpYihcXGQrKS8pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzdXAucmVmZXJlbmNlJykpIHtcblx0XHRcdFx0Y29uc3QgbGlua3MgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0XHRcdEFycmF5LmZyb20obGlua3MpLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdFx0aWYgKGhyZWYpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gaHJlZi5zcGxpdCgnLycpLnBvcCgpPy5tYXRjaCgvKD86Y2l0ZV9ub3RlfGNpdGVfcmVmKS0oLispLyk7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwW2lkXj1cImZucmVmOlwiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5pZC5yZXBsYWNlKCdmbnJlZjonLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwW2lkXj1cImZuclwiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5pZC5yZXBsYWNlKCdmbnInLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3Bhbi5mb290bm90ZS1yZWZlcmVuY2UnKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvb3Rub3RlLWlkJykgfHwgJyc7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3NwYW4uZm9vdG5vdGUtbGluaycpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vdG5vdGUtaWQnKSB8fCAnJztcblx0XHRcdFx0Zm9vdG5vdGVDb250ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvb3Rub3RlLWNvbnRlbnQnKSB8fCAnJztcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYS5jaXRhdGlvbicpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRmb290bm90ZUNvbnRlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYVtpZF49XCJmbnJlZlwiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5pZC5yZXBsYWNlKCdmbnJlZicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gT3RoZXIgY2l0YXRpb24gdHlwZXNcblx0XHRcdFx0Y29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdGNvbnN0IGlkID0gaHJlZi5yZXBsYWNlKC9eWyNdLywgJycpO1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBpZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmb290bm90ZUlkKSB7XG5cdFx0XHRcdC8vIEZpbmQgdGhlIGZvb3Rub3RlIG51bWJlciBieSBtYXRjaGluZyB0aGUgb3JpZ2luYWwgSURcblx0XHRcdFx0Y29uc3QgZm9vdG5vdGVFbnRyeSA9IE9iamVjdC5lbnRyaWVzKGZvb3Rub3RlcykuZmluZChcblx0XHRcdFx0XHQoW18sIGRhdGFdKSA9PiBkYXRhLm9yaWdpbmFsSWQgPT09IGZvb3Rub3RlSWQudG9Mb3dlckNhc2UoKVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmIChmb290bm90ZUVudHJ5KSB7XG5cdFx0XHRcdFx0Y29uc3QgW2Zvb3Rub3RlTnVtYmVyLCBmb290bm90ZURhdGFdID0gZm9vdG5vdGVFbnRyeTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBDcmVhdGUgZm9vdG5vdGUgcmVmZXJlbmNlIElEXG5cdFx0XHRcdFx0Y29uc3QgcmVmSWQgPSBmb290bm90ZURhdGEucmVmcy5sZW5ndGggPiAwID8gXG5cdFx0XHRcdFx0XHRgZm5yZWY6JHtmb290bm90ZU51bWJlcn0tJHtmb290bm90ZURhdGEucmVmcy5sZW5ndGggKyAxfWAgOiBcblx0XHRcdFx0XHRcdGBmbnJlZjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm9vdG5vdGVEYXRhLnJlZnMucHVzaChyZWZJZCk7XG5cblx0XHRcdFx0XHQvLyBGaW5kIHRoZSBvdXRlcm1vc3QgY29udGFpbmVyIChzcGFuIG9yIHN1cClcblx0XHRcdFx0XHRjb25zdCBjb250YWluZXIgPSB0aGlzLmZpbmRPdXRlckZvb3Rub3RlQ29udGFpbmVyKGVsKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBJZiBjb250YWluZXIgaXMgYSBzdXAsIGdyb3VwIHJlZmVyZW5jZXNcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N1cCcpIHtcblx0XHRcdFx0XHRcdGlmICghc3VwR3JvdXBzLmhhcyhjb250YWluZXIpKSB7XG5cdFx0XHRcdFx0XHRcdHN1cEdyb3Vwcy5zZXQoY29udGFpbmVyLCBbXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb25zdCBncm91cCA9IHN1cEdyb3Vwcy5nZXQoY29udGFpbmVyKSE7XG5cdFx0XHRcdFx0XHRncm91cC5wdXNoKHRoaXMuY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXIsIHJlZklkKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIFJlcGxhY2UgdGhlIGNvbnRhaW5lciBkaXJlY3RseVxuXHRcdFx0XHRcdFx0Y29udGFpbmVyLnJlcGxhY2VXaXRoKHRoaXMuY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXIsIHJlZklkKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBIYW5kbGUgZ3JvdXBlZCByZWZlcmVuY2VzXG5cdFx0c3VwR3JvdXBzLmZvckVhY2goKHJlZmVyZW5jZXMsIGNvbnRhaW5lcikgPT4ge1xuXHRcdFx0aWYgKHJlZmVyZW5jZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQvLyBDcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB0byBob2xkIGFsbCB0aGUgcmVmZXJlbmNlc1xuXHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFkZCBlYWNoIHJlZmVyZW5jZSBhcyBpdHMgb3duIHN1cCBlbGVtZW50XG5cdFx0XHRcdHJlZmVyZW5jZXMuZm9yRWFjaCgocmVmLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGxpbmsgPSByZWYucXVlcnlTZWxlY3RvcignYScpO1xuXHRcdFx0XHRcdGlmIChsaW5rKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdXAnKTtcblx0XHRcdFx0XHRcdHN1cC5pZCA9IHJlZi5pZDtcblx0XHRcdFx0XHRcdHN1cC5hcHBlbmRDaGlsZChsaW5rLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChzdXApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRjb250YWluZXIucmVwbGFjZVdpdGgoZnJhZ21lbnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ3JlYXRlIHRoZSBzdGFuZGFyZGl6ZWQgZm9vdG5vdGUgbGlzdFxuXHRcdGNvbnN0IG5ld0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290bm90ZXMnKTtcblx0XHRuZXdMaXN0LmNsYXNzTmFtZSA9ICdmb290bm90ZXMnO1xuXHRcdGNvbnN0IG9yZGVyZWRMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKTtcblxuXHRcdC8vIENyZWF0ZSBmb290bm90ZSBpdGVtcyBpbiBvcmRlclxuXHRcdE9iamVjdC5lbnRyaWVzKGZvb3Rub3RlcykuZm9yRWFjaCgoW251bWJlciwgZGF0YV0pID0+IHtcblx0XHRcdGNvbnN0IG5ld0l0ZW0gPSB0aGlzLmNyZWF0ZUZvb3Rub3RlSXRlbShcblx0XHRcdFx0cGFyc2VJbnQobnVtYmVyKSxcblx0XHRcdFx0ZGF0YS5jb250ZW50LFxuXHRcdFx0XHRkYXRhLnJlZnNcblx0XHRcdCk7XG5cdFx0XHRvcmRlcmVkTGlzdC5hcHBlbmRDaGlsZChuZXdJdGVtKTtcblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBvcmlnaW5hbCBmb290bm90ZSBsaXN0c1xuXHRcdGNvbnN0IGZvb3Rub3RlTGlzdHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMpO1xuXHRcdGZvb3Rub3RlTGlzdHMuZm9yRWFjaChsaXN0ID0+IGxpc3QucmVtb3ZlKCkpO1xuXG5cdFx0Ly8gSWYgd2UgaGF2ZSBhbnkgZm9vdG5vdGVzLCBhZGQgdGhlIG5ldyBsaXN0IHRvIHRoZSBkb2N1bWVudFxuXHRcdGlmIChvcmRlcmVkTGlzdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRuZXdMaXN0LmFwcGVuZENoaWxkKG9yZGVyZWRMaXN0KTtcblx0XHRcdGVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3TGlzdCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBoYW5kbGVMYXp5SW1hZ2VzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXHRcdGNvbnN0IGxhenlJbWFnZXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZ1tkYXRhLXNyY10sIGltZ1tkYXRhLXNyY3NldF0nKTtcblxuXHRcdGxhenlJbWFnZXMuZm9yRWFjaChpbWcgPT4ge1xuXHRcdFx0aWYgKCEoaW1nIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkpIHJldHVybjtcblxuXHRcdFx0Ly8gSGFuZGxlIGRhdGEtc3JjXG5cdFx0XHRjb25zdCBkYXRhU3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcblx0XHRcdGlmIChkYXRhU3JjICYmICFpbWcuc3JjKSB7XG5cdFx0XHRcdGltZy5zcmMgPSBkYXRhU3JjO1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBIYW5kbGUgZGF0YS1zcmNzZXRcblx0XHRcdGNvbnN0IGRhdGFTcmNzZXQgPSBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdFx0aWYgKGRhdGFTcmNzZXQgJiYgIWltZy5zcmNzZXQpIHtcblx0XHRcdFx0aW1nLnNyY3NldCA9IGRhdGFTcmNzZXQ7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBsYXp5IGxvYWRpbmcgcmVsYXRlZCBjbGFzc2VzIGFuZCBhdHRyaWJ1dGVzXG5cdFx0XHRpbWcuY2xhc3NMaXN0LnJlbW92ZSgnbGF6eScsICdsYXp5bG9hZCcpO1xuXHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1sbC1zdGF0dXMnKTtcblx0XHRcdGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbG9nKCdQcm9jZXNzZWQgbGF6eSBpbWFnZXM6JywgcHJvY2Vzc2VkQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGFuZGFyZGl6ZUVsZW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXG5cdFx0Ly8gQ29udmVydCBlbGVtZW50cyBiYXNlZCBvbiBzdGFuZGFyZGl6YXRpb24gcnVsZXNcblx0XHRFTEVNRU5UX1NUQU5EQVJESVpBVElPTl9SVUxFUy5mb3JFYWNoKHJ1bGUgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocnVsZS5zZWxlY3Rvcik7XG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdFx0aWYgKHJ1bGUudHJhbnNmb3JtKSB7XG5cdFx0XHRcdFx0Ly8gSWYgdGhlcmUncyBhIHRyYW5zZm9ybSBmdW5jdGlvbiwgdXNlIGl0IHRvIGNyZWF0ZSB0aGUgbmV3IGVsZW1lbnRcblx0XHRcdFx0XHRjb25zdCB0cmFuc2Zvcm1lZCA9IHJ1bGUudHJhbnNmb3JtKGVsKTtcblx0XHRcdFx0XHRlbC5yZXBsYWNlV2l0aCh0cmFuc2Zvcm1lZCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBDb252ZXJ0IGxpdGUteW91dHViZSBlbGVtZW50c1xuXHRcdGNvbnN0IGxpdGVZb3V0dWJlRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpdGUteW91dHViZScpO1xuXHRcdGxpdGVZb3V0dWJlRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRjb25zdCB2aWRlb0lkID0gZWwuZ2V0QXR0cmlidXRlKCd2aWRlb2lkJyk7XG5cdFx0XHRpZiAoIXZpZGVvSWQpIHJldHVybjtcblxuXHRcdFx0Y29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cdFx0XHRpZnJhbWUud2lkdGggPSAnNTYwJztcblx0XHRcdGlmcmFtZS5oZWlnaHQgPSAnMzE1Jztcblx0XHRcdGlmcmFtZS5zcmMgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt2aWRlb0lkfWA7XG5cdFx0XHRpZnJhbWUudGl0bGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZGVvdGl0bGUnKSB8fCAnWW91VHViZSB2aWRlbyBwbGF5ZXInO1xuXHRcdFx0aWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xuXHRcdFx0aWZyYW1lLmFsbG93ID0gJ2FjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBjbGlwYm9hcmQtd3JpdGU7IGVuY3J5cHRlZC1tZWRpYTsgZ3lyb3Njb3BlOyBwaWN0dXJlLWluLXBpY3R1cmU7IHdlYi1zaGFyZSc7XG5cdFx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XG5cblx0XHRcdGVsLnJlcGxhY2VXaXRoKGlmcmFtZSk7XG5cdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIGZ1dHVyZSBlbWJlZCBjb252ZXJzaW9ucyAoVHdpdHRlciwgSW5zdGFncmFtLCBldGMuKVxuXG5cdFx0dGhpcy5fbG9nKCdDb252ZXJ0ZWQgZW1iZWRkZWQgZWxlbWVudHM6JywgcHJvY2Vzc2VkQ291bnQpO1xuXHR9XG5cblx0Ly8gRmluZCBzbWFsbCBJTUcgYW5kIFNWRyBlbGVtZW50c1xuXHRwcml2YXRlIGZpbmRTbWFsbEltYWdlcyhkb2M6IERvY3VtZW50KTogU2V0PHN0cmluZz4ge1xuXHRcdGNvbnN0IE1JTl9ESU1FTlNJT04gPSAzMztcblx0XHRjb25zdCBzbWFsbEltYWdlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXHRcdGNvbnN0IHRyYW5zZm9ybVJlZ2V4ID0gL3NjYWxlXFwoKFtcXGQuXSspXFwpLztcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXG5cdFx0Ly8gMS4gUmVhZCBwaGFzZSAtIEdhdGhlciBhbGwgZWxlbWVudHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdGNvbnN0IGVsZW1lbnRzID0gW1xuXHRcdFx0Li4uQXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpKSxcblx0XHRcdC4uLkFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmcnKSlcblx0XHRdLmZpbHRlcihlbGVtZW50ID0+IHtcblx0XHRcdC8vIFNraXAgbGF6eS1sb2FkZWQgaW1hZ2VzIHRoYXQgaGF2ZW4ndCBiZWVuIHByb2Nlc3NlZCB5ZXRcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuXHRcdFx0XHRjb25zdCBpc0xhenkgPSBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGF6eScpIHx8IFxuXHRcdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsYXp5bG9hZCcpIHx8XG5cdFx0XHRcdFx0ZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3JjJykgfHxcblx0XHRcdFx0XHRlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHRcdFx0cmV0dXJuICFpc0xhenk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBzbWFsbEltYWdlcztcblx0XHR9XG5cblx0XHQvLyAyLiBCYXRjaCBwcm9jZXNzIC0gQ29sbGVjdCBhbGwgbWVhc3VyZW1lbnRzIGluIG9uZSBnb1xuXHRcdGNvbnN0IG1lYXN1cmVtZW50cyA9IGVsZW1lbnRzLm1hcChlbGVtZW50ID0+ICh7XG5cdFx0XHRlbGVtZW50LFxuXHRcdFx0Ly8gU3RhdGljIGF0dHJpYnV0ZXMgKG5vIHJlZmxvdylcblx0XHRcdG5hdHVyYWxXaWR0aDogZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgPyBlbGVtZW50Lm5hdHVyYWxXaWR0aCA6IDAsXG5cdFx0XHRuYXR1cmFsSGVpZ2h0OiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCA/IGVsZW1lbnQubmF0dXJhbEhlaWdodCA6IDAsXG5cdFx0XHRhdHRyV2lkdGg6IHBhcnNlSW50KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd3aWR0aCcpIHx8ICcwJyksXG5cdFx0XHRhdHRySGVpZ2h0OiBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykgfHwgJzAnKVxuXHRcdH0pKTtcblxuXHRcdC8vIDMuIEJhdGNoIGNvbXB1dGUgc3R5bGVzIC0gUHJvY2VzcyBpbiBjaHVua3MgdG8gYXZvaWQgbG9uZyB0YXNrc1xuXHRcdGNvbnN0IEJBVENIX1NJWkUgPSA1MDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1lYXN1cmVtZW50cy5sZW5ndGg7IGkgKz0gQkFUQ0hfU0laRSkge1xuXHRcdFx0Y29uc3QgYmF0Y2ggPSBtZWFzdXJlbWVudHMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuXHRcdFx0XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBSZWFkIHBoYXNlIC0gY29tcHV0ZSBhbGwgc3R5bGVzIGF0IG9uY2Vcblx0XHRcdFx0Y29uc3Qgc3R5bGVzID0gYmF0Y2gubWFwKCh7IGVsZW1lbnQgfSkgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkpO1xuXHRcdFx0XHRjb25zdCByZWN0cyA9IGJhdGNoLm1hcCgoeyBlbGVtZW50IH0pID0+IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gUHJvY2VzcyBwaGFzZSAtIG5vIERPTSBvcGVyYXRpb25zXG5cdFx0XHRcdGJhdGNoLmZvckVhY2goKG1lYXN1cmVtZW50LCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzdHlsZSA9IHN0eWxlc1tpbmRleF07XG5cdFx0XHRcdFx0XHRjb25zdCByZWN0ID0gcmVjdHNbaW5kZXhdO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBHZXQgdHJhbnNmb3JtIHNjYWxlIGluIHRoZSBzYW1lIGJhdGNoXG5cdFx0XHRcdFx0XHRjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm07XG5cdFx0XHRcdFx0XHRjb25zdCBzY2FsZSA9IHRyYW5zZm9ybSA/IFxuXHRcdFx0XHRcdFx0XHRwYXJzZUZsb2F0KHRyYW5zZm9ybS5tYXRjaCh0cmFuc2Zvcm1SZWdleCk/LlsxXSB8fCAnMScpIDogMTtcblxuXHRcdFx0XHRcdFx0Ly8gQ2FsY3VsYXRlIGVmZmVjdGl2ZSBkaW1lbnNpb25zXG5cdFx0XHRcdFx0XHRjb25zdCB3aWR0aHMgPSBbXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50Lm5hdHVyYWxXaWR0aCxcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQuYXR0cldpZHRoLFxuXHRcdFx0XHRcdFx0XHRwYXJzZUludChzdHlsZS53aWR0aCkgfHwgMCxcblx0XHRcdFx0XHRcdFx0cmVjdC53aWR0aCAqIHNjYWxlXG5cdFx0XHRcdFx0XHRdLmZpbHRlcihkaW0gPT4gdHlwZW9mIGRpbSA9PT0gJ251bWJlcicgJiYgZGltID4gMCk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IGhlaWdodHMgPSBbXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50Lm5hdHVyYWxIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50LmF0dHJIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdHBhcnNlSW50KHN0eWxlLmhlaWdodCkgfHwgMCxcblx0XHRcdFx0XHRcdFx0cmVjdC5oZWlnaHQgKiBzY2FsZVxuXHRcdFx0XHRcdFx0XS5maWx0ZXIoZGltID0+IHR5cGVvZiBkaW0gPT09ICdudW1iZXInICYmIGRpbSA+IDApO1xuXG5cdFx0XHRcdFx0XHQvLyBEZWNpc2lvbiBwaGFzZSAtIG5vIERPTSBvcGVyYXRpb25zXG5cdFx0XHRcdFx0XHRpZiAod2lkdGhzLmxlbmd0aCA+IDAgJiYgaGVpZ2h0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVmZmVjdGl2ZVdpZHRoID0gTWF0aC5taW4oLi4ud2lkdGhzKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZWZmZWN0aXZlSGVpZ2h0ID0gTWF0aC5taW4oLi4uaGVpZ2h0cyk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGVmZmVjdGl2ZVdpZHRoIDwgTUlOX0RJTUVOU0lPTiB8fCBlZmZlY3RpdmVIZWlnaHQgPCBNSU5fRElNRU5TSU9OKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgaWRlbnRpZmllciA9IHRoaXMuZ2V0RWxlbWVudElkZW50aWZpZXIobWVhc3VyZW1lbnQuZWxlbWVudCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlkZW50aWZpZXIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNtYWxsSW1hZ2VzLmFkZChpZGVudGlmaWVyKTtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3MgZWxlbWVudCBkaW1lbnNpb25zOicsIGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3MgYmF0Y2g6JywgZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5fbG9nKCdGb3VuZCBzbWFsbCBlbGVtZW50czonLCB7XG5cdFx0XHRjb3VudDogcHJvY2Vzc2VkQ291bnQsXG5cdFx0XHR0b3RhbEVsZW1lbnRzOiBlbGVtZW50cy5sZW5ndGgsXG5cdFx0XHRwcm9jZXNzaW5nVGltZTogYCR7KGVuZFRpbWUgLSBzdGFydFRpbWUpLnRvRml4ZWQoMil9bXNgXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc21hbGxJbWFnZXM7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZVNtYWxsSW1hZ2VzKGRvYzogRG9jdW1lbnQsIHNtYWxsSW1hZ2VzOiBTZXQ8c3RyaW5nPikge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXG5cdFx0WydpbWcnLCAnc3ZnJ10uZm9yRWFjaCh0YWcgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcblx0XHRcdEFycmF5LmZyb20oZWxlbWVudHMpLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdGNvbnN0IGlkZW50aWZpZXIgPSB0aGlzLmdldEVsZW1lbnRJZGVudGlmaWVyKGVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoaWRlbnRpZmllciAmJiBzbWFsbEltYWdlcy5oYXMoaWRlbnRpZmllcikpIHtcblx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBzbWFsbCBlbGVtZW50czonLCByZW1vdmVkQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRFbGVtZW50SWRlbnRpZmllcihlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHwgbnVsbCB7XG5cdFx0Ly8gVHJ5IHRvIGNyZWF0ZSBhIHVuaXF1ZSBpZGVudGlmaWVyIHVzaW5nIHZhcmlvdXMgYXR0cmlidXRlc1xuXHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuXHRcdFx0Ly8gRm9yIGxhenktbG9hZGVkIGltYWdlcywgdXNlIGRhdGEtc3JjIGFzIGlkZW50aWZpZXIgaWYgYXZhaWxhYmxlXG5cdFx0XHRjb25zdCBkYXRhU3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0XHRpZiAoZGF0YVNyYykgcmV0dXJuIGBzcmM6JHtkYXRhU3JjfWA7XG5cdFx0XHRcblx0XHRcdGNvbnN0IHNyYyA9IGVsZW1lbnQuc3JjIHx8ICcnO1xuXHRcdFx0Y29uc3Qgc3Jjc2V0ID0gZWxlbWVudC5zcmNzZXQgfHwgJyc7XG5cdFx0XHRjb25zdCBkYXRhU3Jjc2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRcblx0XHRcdGlmIChzcmMpIHJldHVybiBgc3JjOiR7c3JjfWA7XG5cdFx0XHRpZiAoc3Jjc2V0KSByZXR1cm4gYHNyY3NldDoke3NyY3NldH1gO1xuXHRcdFx0aWYgKGRhdGFTcmNzZXQpIHJldHVybiBgc3Jjc2V0OiR7ZGF0YVNyY3NldH1gO1xuXHRcdH1cblxuXHRcdGNvbnN0IGlkID0gZWxlbWVudC5pZCB8fCAnJztcblx0XHRjb25zdCBjbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSB8fCAnJztcblx0XHRjb25zdCB2aWV3Qm94ID0gZWxlbWVudCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQgPyBlbGVtZW50LmdldEF0dHJpYnV0ZSgndmlld0JveCcpIHx8ICcnIDogJyc7XG5cdFx0XG5cdFx0aWYgKGlkKSByZXR1cm4gYGlkOiR7aWR9YDtcblx0XHRpZiAodmlld0JveCkgcmV0dXJuIGB2aWV3Qm94OiR7dmlld0JveH1gO1xuXHRcdGlmIChjbGFzc05hbWUpIHJldHVybiBgY2xhc3M6JHtjbGFzc05hbWV9YDtcblx0XHRcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHByaXZhdGUgZmluZE1haW5Db250ZW50KGRvYzogRG9jdW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG5cblx0XHQvLyBGaW5kIGFsbCBwb3RlbnRpYWwgY29udGVudCBjb250YWluZXJzXG5cdFx0Y29uc3QgY2FuZGlkYXRlczogeyBlbGVtZW50OiBFbGVtZW50OyBzY29yZTogbnVtYmVyIH1bXSA9IFtdO1xuXG5cdFx0RU5UUllfUE9JTlRfRUxFTUVOVFMuZm9yRWFjaCgoc2VsZWN0b3IsIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdC8vIEJhc2Ugc2NvcmUgZnJvbSBzZWxlY3RvciBwcmlvcml0eSAoZWFybGllciA9IGhpZ2hlcilcblx0XHRcdFx0bGV0IHNjb3JlID0gKEVOVFJZX1BPSU5UX0VMRU1FTlRTLmxlbmd0aCAtIGluZGV4KSAqIDEwO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQWRkIHNjb3JlIGJhc2VkIG9uIGNvbnRlbnQgYW5hbHlzaXNcblx0XHRcdFx0c2NvcmUgKz0gdGhpcy5zY29yZUVsZW1lbnQoZWxlbWVudCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRjYW5kaWRhdGVzLnB1c2goeyBlbGVtZW50LCBzY29yZSB9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGNhbmRpZGF0ZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQvLyBGYWxsIGJhY2sgdG8gc2NvcmluZyBibG9jayBlbGVtZW50c1xuXHRcdFx0Ly8gQ3VycmVudGx5IDxib2R5PiBlbGVtZW50IGlzIHVzZWQgYXMgdGhlIGZhbGxiYWNrLCBzbyB0aGlzIGlzIG5vdCB1c2VkXG5cdFx0XHRyZXR1cm4gdGhpcy5maW5kQ29udGVudEJ5U2NvcmluZyhkb2MpO1xuXHRcdH1cblxuXHRcdC8vIFNvcnQgYnkgc2NvcmUgZGVzY2VuZGluZ1xuXHRcdGNhbmRpZGF0ZXMuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuXHRcdFxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHR0aGlzLl9sb2coJ0NvbnRlbnQgY2FuZGlkYXRlczonLCBjYW5kaWRhdGVzLm1hcChjID0+ICh7XG5cdFx0XHRcdGVsZW1lbnQ6IGMuZWxlbWVudC50YWdOYW1lLFxuXHRcdFx0XHRzZWxlY3RvcjogdGhpcy5nZXRFbGVtZW50U2VsZWN0b3IoYy5lbGVtZW50KSxcblx0XHRcdFx0c2NvcmU6IGMuc2NvcmVcblx0XHRcdH0pKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXNbMF0uZWxlbWVudDtcblx0fVxuXG5cdHByaXZhdGUgZmluZENvbnRlbnRCeVNjb3JpbmcoZG9jOiBEb2N1bWVudCk6IEVsZW1lbnQgfCBudWxsIHtcblx0XHRjb25zdCBjYW5kaWRhdGVzID0gdGhpcy5zY29yZUVsZW1lbnRzKGRvYyk7XG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXMubGVuZ3RoID4gMCA/IGNhbmRpZGF0ZXNbMF0uZWxlbWVudCA6IG51bGw7XG5cdH1cblxuXHRwcml2YXRlIGdldEVsZW1lbnRTZWxlY3RvcihlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcblx0XHRsZXQgY3VycmVudDogRWxlbWVudCB8IG51bGwgPSBlbGVtZW50O1xuXHRcdFxuXHRcdHdoaWxlIChjdXJyZW50ICYmIGN1cnJlbnQgIT09IHRoaXMuZG9jLmRvY3VtZW50RWxlbWVudCkge1xuXHRcdFx0bGV0IHNlbGVjdG9yID0gY3VycmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAoY3VycmVudC5pZCkge1xuXHRcdFx0XHRzZWxlY3RvciArPSAnIycgKyBjdXJyZW50LmlkO1xuXHRcdFx0fSBlbHNlIGlmIChjdXJyZW50LmNsYXNzTmFtZSAmJiB0eXBlb2YgY3VycmVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHNlbGVjdG9yICs9ICcuJyArIGN1cnJlbnQuY2xhc3NOYW1lLnRyaW0oKS5zcGxpdCgvXFxzKy8pLmpvaW4oJy4nKTtcblx0XHRcdH1cblx0XHRcdHBhcnRzLnVuc2hpZnQoc2VsZWN0b3IpO1xuXHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudDtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJyA+ICcpO1xuXHR9XG5cblx0cHJpdmF0ZSBzY29yZUVsZW1lbnRzKGRvYzogRG9jdW1lbnQpOiBDb250ZW50U2NvcmVbXSB7XG5cdFx0Y29uc3QgY2FuZGlkYXRlczogQ29udGVudFNjb3JlW10gPSBbXTtcblxuXHRcdEJMT0NLX0VMRU1FTlRTLmZvckVhY2goKHRhZzogc3RyaW5nKSA9PiB7XG5cdFx0XHRBcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpKS5mb3JFYWNoKChlbGVtZW50OiBFbGVtZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHNjb3JlID0gdGhpcy5zY29yZUVsZW1lbnQoZWxlbWVudCk7XG5cdFx0XHRcdGlmIChzY29yZSA+IDApIHtcblx0XHRcdFx0XHRjYW5kaWRhdGVzLnB1c2goeyBzY29yZSwgZWxlbWVudCB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gY2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG5cdH1cblxuXHRwcml2YXRlIHNjb3JlRWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogbnVtYmVyIHtcblx0XHRsZXQgc2NvcmUgPSAwO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gZWxlbWVudCBwcm9wZXJ0aWVzXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgJiYgdHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJyA/IFxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHRcdGNvbnN0IGlkID0gZWxlbWVudC5pZCA/IGVsZW1lbnQuaWQudG9Mb3dlckNhc2UoKSA6ICcnO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gY29udGVudFxuXHRcdGNvbnN0IHRleHQgPSBlbGVtZW50LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdGNvbnN0IHdvcmRzID0gdGV4dC5zcGxpdCgvXFxzKy8pLmxlbmd0aDtcblx0XHRzY29yZSArPSBNYXRoLm1pbihNYXRoLmZsb29yKHdvcmRzIC8gMTAwKSwgMyk7XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBsaW5rIGRlbnNpdHlcblx0XHRjb25zdCBsaW5rcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcblx0XHRjb25zdCBsaW5rVGV4dCA9IEFycmF5LmZyb20obGlua3MpLnJlZHVjZSgoYWNjLCBsaW5rKSA9PiBhY2MgKyAobGluay50ZXh0Q29udGVudD8ubGVuZ3RoIHx8IDApLCAwKTtcblx0XHRjb25zdCBsaW5rRGVuc2l0eSA9IHRleHQubGVuZ3RoID8gbGlua1RleHQgLyB0ZXh0Lmxlbmd0aCA6IDA7XG5cdFx0aWYgKGxpbmtEZW5zaXR5ID4gMC41KSB7XG5cdFx0XHRzY29yZSAtPSAxMDtcblx0XHR9XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBwcmVzZW5jZSBvZiBtZWFuaW5nZnVsIGVsZW1lbnRzXG5cdFx0Y29uc3QgcGFyYWdyYXBocyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3AnKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gcGFyYWdyYXBocztcblxuXHRcdGNvbnN0IGltYWdlcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpLmxlbmd0aDtcblx0XHRzY29yZSArPSBNYXRoLm1pbihpbWFnZXMgKiAzLCA5KTtcblxuXHRcdHJldHVybiBzY29yZTtcblx0fVxufSAiLCIvLyBFbnRyeSBwb2ludCBlbGVtZW50c1xuLy8gVGhlc2UgYXJlIHRoZSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgdXNlZCB0byBmaW5kIHRoZSBtYWluIGNvbnRlbnRcbmV4cG9ydCBjb25zdCBFTlRSWV9QT0lOVF9FTEVNRU5UUyA9IFtcblx0J2FydGljbGUnLFxuXHQnW3JvbGU9XCJhcnRpY2xlXCJdJyxcblx0J1tpdGVtcHJvcD1cImFydGljbGVCb2R5XCJdJyxcblx0Jy5wb3N0LWNvbnRlbnQnLFxuXHQnLmFydGljbGUtY29udGVudCcsXG5cdCcjYXJ0aWNsZS1jb250ZW50Jyxcblx0Jy5jb250ZW50LWFydGljbGUnLFxuXHQnbWFpbicsXG5cdCdbcm9sZT1cIm1haW5cIl0nLFxuXHQnYm9keScgLy8gZW5zdXJlcyB0aGVyZSBpcyBhbHdheXMgYSBtYXRjaFxuXTtcblxuZXhwb3J0IGNvbnN0IE1PQklMRV9XSURUSCA9IDYwMDtcbmV4cG9ydCBjb25zdCBCTE9DS19FTEVNRU5UUyA9IFsnZGl2JywgJ3NlY3Rpb24nLCAnYXJ0aWNsZScsICdtYWluJ107XG5cbi8vIEVsZW1lbnRzIHRoYXQgc2hvdWxkIG5vdCBiZSB1bndyYXBwZWRcbmV4cG9ydCBjb25zdCBQUkVTRVJWRV9FTEVNRU5UUyA9IG5ldyBTZXQoW1xuXHQncHJlJywgJ2NvZGUnLCAndGFibGUnLCAndGhlYWQnLCAndGJvZHknLCAndHInLCAndGQnLCAndGgnLFxuXHQndWwnLCAnb2wnLCAnbGknLCAnZGwnLCAnZHQnLCAnZGQnLFxuXHQnZmlndXJlJywgJ2ZpZ2NhcHRpb24nLCAncGljdHVyZScsXG5cdCdkZXRhaWxzJywgJ3N1bW1hcnknLFxuXHQnYmxvY2txdW90ZScsXG5cdCdmb3JtJywgJ2ZpZWxkc2V0J1xuXSk7XG5cbi8vIElubGluZSBlbGVtZW50cyB0aGF0IHNob3VsZCBub3QgYmUgdW53cmFwcGVkXG5leHBvcnQgY29uc3QgSU5MSU5FX0VMRU1FTlRTID0gbmV3IFNldChbXG5cdCdhJywgJ3NwYW4nLCAnc3Ryb25nJywgJ2VtJywgJ2knLCAnYicsICd1JywgJ2NvZGUnLCAnYnInLCAnc21hbGwnLFxuXHQnc3ViJywgJ3N1cCcsICdtYXJrJywgJ2RlbCcsICdpbnMnLCAncScsICdhYmJyJywgJ2NpdGUnLCAndGltZSdcbl0pO1xuXG4vLyBIaWRkZW4gZWxlbWVudHMgdGhhdCBzaG91bGQgYmUgcmVtb3ZlZFxuZXhwb3J0IGNvbnN0IEhJRERFTl9FTEVNRU5UX1NFTEVDVE9SUyA9IFtcblx0J1toaWRkZW5dJyxcblx0J1thcmlhLWhpZGRlbj1cInRydWVcIl0nLFxuLy9cdCdbc3R5bGUqPVwiZGlzcGxheTogbm9uZVwiXScsIGNhdXNlcyBwcm9ibGVtcyBmb3IgbWF0aCBmb3JtdWxhc1xuLy9cdCdbc3R5bGUqPVwiZGlzcGxheTpub25lXCJdJyxcblx0J1tzdHlsZSo9XCJ2aXNpYmlsaXR5OiBoaWRkZW5cIl0nLFxuXHQnW3N0eWxlKj1cInZpc2liaWxpdHk6aGlkZGVuXCJdJyxcblx0Jy5oaWRkZW4nLFxuXHQnLmludmlzaWJsZSdcbl0uam9pbignLCcpO1xuXG4vLyBTZWxlY3RvcnMgdG8gYmUgcmVtb3ZlZFxuZXhwb3J0IGNvbnN0IEVYQUNUX1NFTEVDVE9SUyA9IFtcblx0Ly8gc2NyaXB0cywgc3R5bGVzXG5cdCdub3NjcmlwdCcsXG5cdCdzY3JpcHQnLFxuXHQnc3R5bGUnLFxuXG5cdC8vIGFkc1xuXHQnLmFkOm5vdChbY2xhc3MqPVwiZ3JhZGllbnRcIl0pJyxcblx0J1tjbGFzc149XCJhZC1cIiBpXScsXG5cdCdbY2xhc3MkPVwiLWFkXCIgaV0nLFxuXHQnW2lkXj1cImFkLVwiIGldJyxcblx0J1tpZCQ9XCItYWRcIiBpXScsXG5cdCdbcm9sZT1cImJhbm5lclwiIGldJyxcblx0Jy5wcm9tbycsXG5cdCcuUHJvbW8nLFxuXG5cdC8vIGNvbW1lbnRzXG5cdCdbaWQ9XCJjb21tZW50c1wiIGldJyxcblxuXHQvLyBoZWFkZXIsIG5hdlxuXHQnaGVhZGVyJyxcblx0Jy5oZWFkZXInLFxuXHQnI2hlYWRlcicsXG5cdCduYXYnLFxuXHQnLm5hdmlnYXRpb24nLFxuXHQnI25hdmlnYXRpb24nLFxuXHQnW3JvbGU9XCJuYXZpZ2F0aW9uXCIgaV0nLFxuXHQnW3JvbGU9XCJkaWFsb2dcIiBpXScsXG5cdCdbcm9sZSo9XCJjb21wbGVtZW50YXJ5XCIgaV0nLFxuXHQnW2NsYXNzKj1cInBhZ2luYXRpb25cIiBpXScsXG5cdCcubWVudScsXG5cdCcjbWVudScsXG5cdCcjc2l0ZVN1YicsXG5cblx0Ly8gbWV0YWRhdGFcblx0Jy5hdXRob3InLFxuXHQnLkF1dGhvcicsXG5cdCcuY29udHJpYnV0b3InLFxuXHQnLmRhdGUnLFxuXHQnLm1ldGEnLFxuXHQnLnRhZ3MnLFxuXHQnLnRvYycsXG5cdCcuVG9jJyxcblx0JyN0b2MnLFxuXHQnI3RpdGxlJyxcblx0JyNUaXRsZScsXG5cdCdbaHJlZio9XCIvY2F0ZWdvcnlcIl0nLFxuXHQnW2hyZWYqPVwiL2NhdGVnb3JpZXNcIl0nLFxuXHQnW2hyZWYqPVwiL3RhZy9cIl0nLFxuXHQnW2hyZWYqPVwiL3RhZ3MvXCJdJyxcblx0J1tocmVmKj1cIi90b3BpY3NcIl0nLFxuXHQnW2hyZWYqPVwiYXV0aG9yXCJdJyxcblx0J1tocmVmPVwiI3NpdGUtY29udGVudFwiXScsXG5cdCdbc3JjKj1cImF1dGhvclwiXScsXG5cblx0Ly8gZm9vdGVyXG5cdCdmb290ZXInLFxuXG5cdC8vIGlucHV0cywgZm9ybXMsIGVsZW1lbnRzXG5cdCdhc2lkZScsXG5cdCdidXR0b24nLFxuXHRcdC8vICdbcm9sZT1cImJ1dHRvblwiXScsIE1lZGl1bSBpbWFnZXNcblx0J2NhbnZhcycsXG5cdCdkaWFsb2cnLFxuXHQnZmllbGRzZXQnLFxuXHQnZm9ybScsXG5cdCdpbnB1dDpub3QoW3R5cGU9XCJjaGVja2JveFwiXSknLFxuXHQnbGFiZWwnLFxuXHQnbGluaycsXG5cdCdvcHRpb24nLFxuXHQnc2VsZWN0Jyxcblx0J3RleHRhcmVhJyxcblx0J3RpbWUnLFxuXG5cdC8vIGlmcmFtZXNcblx0J2luc3RhcmVhZC1wbGF5ZXInLFxuXHQnaWZyYW1lOm5vdChbc3JjKj1cInlvdXR1YmVcIl0pOm5vdChbc3JjKj1cInlvdXR1LmJlXCJdKTpub3QoW3NyYyo9XCJ2aW1lb1wiXSk6bm90KFtzcmMqPVwidHdpdHRlclwiXSknLFxuXG5cdC8vIGxvZ29zXG5cdCdbY2xhc3M9XCJsb2dvXCIgaV0nLFxuXHQnI2xvZ28nLFxuXHQnI0xvZ28nLFxuXG5cdC8vIG5ld3NsZXR0ZXJcblx0JyNuZXdzbGV0dGVyJyxcblx0JyNOZXdzbGV0dGVyJyxcblxuXHQvLyBoaWRkZW4gZm9yIHByaW50XG5cdCcubm9wcmludCcsXG5cdCdbZGF0YS1saW5rLW5hbWUqPVwic2tpcFwiIGldJyxcblx0J1tkYXRhLXByaW50LWxheW91dD1cImhpZGVcIiBpXScsXG5cdCdbZGF0YS1ibG9jaz1cImRvbm90cHJpbnRcIiBpXScsXG5cblx0Ly8gZm9vdG5vdGVzLCBjaXRhdGlvbnNcblx0J1tjbGFzcyo9XCJjbGlja2FibGUtaWNvblwiIGldJyxcblx0J2xpIHNwYW5bY2xhc3MqPVwibHR4X3RhZ1wiIGldW2NsYXNzKj1cImx0eF90YWdfaXRlbVwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cImFuY2hvclwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cInJlZlwiIGldJyxcblxuXHQvLyBsaW5rIGxpc3RzXG5cdCdbZGF0YS1jb250YWluZXIqPVwibW9zdC12aWV3ZWRcIiBpXScsXG5cblx0Ly8gc2lkZWJhclxuXHQnLnNpZGViYXInLFxuXHQnLlNpZGViYXInLFxuXHQnI3NpZGViYXInLFxuXHQnI1NpZGViYXInLFxuXHQnI3NpdGVzdWInLFxuXHRcblx0Ly8gb3RoZXJcblx0JyNOWVRfQUJPVkVfTUFJTl9DT05URU5UX1JFR0lPTicsXG5cdCdbZGF0YS10ZXN0aWQ9XCJwaG90b3ZpZXdlci1jaGlsZHJlbi1maWd1cmVcIl0gPiBzcGFuJywgLy8gTmV3IFlvcmsgVGltZXNcblx0J3RhYmxlLmluZm9ib3gnLFxuXHQnLnBlbmNyYWZ0Om5vdCgucGMtZGlzcGxheS1jb250ZW50cyknLCAvLyBTdWJzdGFja1xuXHQnW2RhdGEtb3B0aW1pemVseT1cInJlbGF0ZWQtYXJ0aWNsZXMtc2VjdGlvblwiIGldJyAvLyBUaGUgRWNvbm9taXN0XG5dO1xuXG4vLyBSZW1vdmFsIHBhdHRlcm5zIHRlc3RlZCBhZ2FpbnN0IGF0dHJpYnV0ZXM6IGNsYXNzLCBpZCwgZGF0YS10ZXN0aWQsIGFuZCBkYXRhLXFhXG4vLyBDYXNlIGluc2Vuc2l0aXZlLCBwYXJ0aWFsIG1hdGNoZXMgYWxsb3dlZFxuZXhwb3J0IGNvbnN0IFBBUlRJQUxfU0VMRUNUT1JTID0gW1xuXHQnYWNjZXNzLXdhbGwnLFxuXHQnYWN0aXZpdHlwdWInLFxuXHQnYWN0aW9uY2FsbCcsXG5cdCdhcHBlbmRpeCcsXG5cdCdhdmF0YXInLFxuXHQnYWR2ZXJ0Jyxcblx0Jy1hZC0nLFxuXHQnX2FkXycsXG5cdCdhbGx0ZXJtcycsXG5cdCdhcm91bmQtdGhlLXdlYicsXG5cdCdhcnRpY2xlLWJvdHRvbS1zZWN0aW9uJyxcblx0J2FydGljbGVfX2NvcHknLFxuXHQnYXJ0aWNsZV9kYXRlJyxcblx0J2FydGljbGUtZW5kICcsXG5cdCdhcnRpY2xlX2hlYWRlcicsXG5cdCdhcnRpY2xlX19oZWFkZXInLFxuXHQnYXJ0aWNsZV9faW5mbycsXG5cdCdhcnRpY2xlLWluZm8nLFxuXHQnYXJ0aWNsZV9fbWV0YScsXG5cdCdhcnRpY2xlLXN1YmplY3QnLFxuXHQnYXJ0aWNsZV9zdWJqZWN0Jyxcblx0J2FydGljbGUtc25pcHBldCcsXG5cdCdhcnRpY2xlLXNlcGFyYXRvcicsXG5cdCdhcnRpY2xlLXRhZ3MnLFxuXHQnYXJ0aWNsZV90YWdzJyxcblx0J2FydGljbGUtdGl0bGUnLFxuXHQnYXJ0aWNsZV90aXRsZScsXG5cdCdhcnRpY2xldG9waWNzJyxcblx0J2FydGljbGUtdG9waWNzJyxcblx0J2FydGljbGUtdHlwZScsXG5cdCdhcnRpY2xlLS1sZWRlJywgLy8gVGhlIFZlcmdlXG5cdCdhc3NvY2lhdGVkLXBlb3BsZScsXG4vL1x0J2F1dGhvcicsIEd3ZXJuXG4gICAgJ2F1dGhvci1ib3gnLFxuXHQnYXV0aG9yLW5hbWUnLFxuXHQnYmFjay10by10b3AnLFxuXHQnYmFja2xpbmtzLXNlY3Rpb24nLFxuXHQnYmFubmVyJyxcblx0J2Jpby1ibG9jaycsXG5cdCdibG9nLXBhZ2VyJyxcblx0J2JvdHRvbS1vZi1hcnRpY2xlJyxcblx0J2JyYW5kLWJhcicsXG5cdCdicmVhZGNydW1iJyxcblx0J2J1dHRvbi13cmFwcGVyJyxcblx0J2J0bi0nLFxuXHQnLWJ0bicsXG5cdCdieWxpbmUnLFxuXHQnY2FwdGNoYScsXG5cdCdjYXRfaGVhZGVyJyxcblx0J2NhdGxpbmtzJyxcblx0J2NoYXB0ZXItbGlzdCcsIC8vIFRoZSBFY29ub21pc3Rcblx0J2NvbGxlY3Rpb25zJyxcblx0J2NvbW1lbnRzJyxcbi8vXHQnLWNvbW1lbnQnLCBTeW50YXggaGlnaGxpZ2h0aW5nXG4gICAgJ2NvbW1lbnRib3gnLFxuXHQnY29tbWVudC1jb3VudCcsXG5cdCdjb21tZW50LWNvbnRlbnQnLFxuXHQnY29tbWVudC1mb3JtJyxcblx0J2NvbW1lbnQtbnVtYmVyJyxcblx0J2NvbW1lbnQtcmVzcG9uZCcsXG5cdCdjb21tZW50LXRocmVhZCcsXG5cdCdjb21wbGVtZW50YXJ5Jyxcblx0J2NvbnNlbnQnLFxuXHQnY29udGVudC1jYXJkJywgLy8gVGhlIFZlcmdlXG5cdCdjb250ZW50LXRvcGljcycsXG5cdCdjb250ZW50cHJvbW8nLFxuXHQnY29udGV4dC13aWRnZXQnLCAvLyBSZXV0ZXJzXG5cdCdjb3JlLWNvbGxhdGVyYWwnLFxuXHQnX2N0YScsXG5cdCctY3RhJyxcblx0J2N0YS0nLFxuXHQnY3RhXycsXG5cdCdjdXJyZW50LWlzc3VlJywgLy8gVGhlIE5hdGlvblxuXHQnY3VzdG9tLWxpc3QtbnVtYmVyJyxcblx0J2RhdGVsaW5lJyxcblx0J2RhdGVoZWFkZXInLFxuXHQnZGF0ZS1oZWFkZXInLFxuXHQnZGF0ZV9oZWFkZXItJyxcbi8vXHQnZGlhbG9nJyxcblx0J2Rpc2NsYWltZXInLFxuXHQnZGlzY2xvc3VyZScsXG5cdCdkaXNjdXNzaW9uJyxcblx0J2Rpc2N1c3NfJyxcblx0J2Rpc3F1cycsXG5cdCdkb25hdGUnLFxuXHQnZHJvcGRvd24nLCAvLyBBcnMgVGVjaG5pY2Fcblx0J2VsZXR0ZXJzJyxcblx0J2VtYWlsc2lnbnVwJyxcblx0J2VuZ2FnZW1lbnQtd2lkZ2V0Jyxcblx0J2VudHJ5LWF1dGhvci1pbmZvJyxcblx0J2VudHJ5LWNhdGVnb3JpZXMnLFxuXHQnZW50cnktZGF0ZScsXG5cdCdlbnRyeS1tZXRhJyxcblx0J2VudHJ5LXRpdGxlJyxcblx0J2VudHJ5LXV0aWxpdHknLFxuXHQnZXllYnJvdycsXG5cdCdleHBhbmQtcmVkdWNlJyxcblx0J2V4dGVybmFsbGlua2VtYmVkd3JhcHBlcicsIC8vIFRoZSBOZXcgWW9ya2VyXG5cdCdleHRyYS1zZXJ2aWNlcycsXG5cdCdleHRyYS10aXRsZScsXG5cdCdmYWNlYm9vaycsXG5cdCdmYXZvcml0ZScsXG5cdCdmZWVkYmFjaycsXG5cdCdmZWVkLWxpbmtzJyxcblx0J2ZpZWxkLXNpdGUtc2VjdGlvbnMnLFxuXHQnZml4ZWQnLFxuXHQnZmxvYXRpbmctdmlkJyxcblx0J2ZvbGxvdycsXG5cdCdmb290ZXInLFxuXHQnZm9vdG5vdGUtYmFjaycsXG5cdCdmb290bm90ZWJhY2snLFxuXHQnZm9yLXlvdScsXG5cdCdmcm9udG1hdHRlcicsXG5cdCdmdXJ0aGVyLXJlYWRpbmcnLFxuXHQnZ2lzdC1tZXRhJyxcbi8vXHQnZ2xvYmFsJyxcblx0J2dvb2dsZScsXG5cdCdnb29nLScsXG5cdCdncmFwaC12aWV3Jyxcblx0J2hlYWRlci1sb2dvJyxcblx0J2hlYWRlci1wYXR0ZXJuJywgLy8gVGhlIFZlcmdlXG5cdCdoZXJvLWxpc3QnLFxuXHQnaGlkZS1mb3ItcHJpbnQnLFxuXHQnaGlkZS1wcmludCcsXG5cdCdoaWRkZW4tc2lkZW5vdGUnLFxuXHQnaW50ZXJsdWRlJyxcblx0J2ludGVyYWN0aW9uJyxcblx0J2p1bXBsaW5rJyxcblx0J2p1bXAtdG8tJyxcbi8vXHQna2V5d29yZCcsIC8vIHVzZWQgaW4gc3ludGF4IGhpZ2hsaWdodGluZ1xuXHQna2lja2VyJyxcblx0J2xhYnN0YWInLCAvLyBBcnhpdlxuXHQnLWxhYmVscycsXG5cdCdsYW5ndWFnZS1uYW1lJyxcblx0J2xhdGVzdC1jb250ZW50Jyxcblx0Jy1sZWRlcy0nLCAvLyBUaGUgVmVyZ2Vcblx0Jy1saWNlbnNlJyxcblx0J2xpbmstYm94Jyxcblx0J2xpbmtzLWdyaWQnLCAvLyBCQkNcblx0J2xpbmtzLXRpdGxlJywgLy8gQkJDXG5cdCdsaXN0aW5nLWR5bmFtaWMtdGVybXMnLCAvLyBCb3N0b24gUmV2aWV3XG5cdCdsaXN0LXRhZ3MnLFxuXHQnbG9hZGluZycsXG5cdCdsb2EtaW5mbycsXG5cdCdsb2dvX2NvbnRhaW5lcicsXG5cdCdsdHhfcm9sZV9yZWZudW0nLCAvLyBBcnhpdlxuXHQnbHR4X3RhZ19iaWJpdGVtJyxcblx0J2x0eF9lcnJvcicsXG5cdCdtYXJrZXRpbmcnLFxuXHQnbWVkaWEtaW5xdWlyeScsXG5cdCdtZW51LScsXG5cdCdtZXRhLScsXG5cdCdtZXRhZGF0YScsXG5cdCdtaWdodC1saWtlJyxcblx0J19tb2RhbCcsXG5cdCctbW9kYWwnLFxuXHQnbW9yZS0nLFxuXHQnbW9yZW5ld3MnLFxuXHQnbW9yZXN0b3JpZXMnLFxuXHQnbW92ZS1oZWxwZXInLFxuXHQnbXctZWRpdHNlY3Rpb24nLFxuXHQnbXctY2l0ZS1iYWNrbGluaycsXG5cdCdtdy1pbmRpY2F0b3JzJyxcblx0J213LWp1bXAtbGluaycsXG5cdCduYXYtJyxcblx0J25hdl8nLFxuXHQnbmF2YmFyJyxcbi8vXHQnbmF2aWdhdGlvbicsXG5cdCduZXh0LScsXG5cdCduZXdzLXN0b3J5LXRpdGxlJyxcbi8vXHQnbmV3c2xldHRlcicsIHVzZWQgb24gU3Vic3RhY2tcblx0J25ld3NsZXR0ZXJfJyxcblx0J25ld3NsZXR0ZXItc2lnbnVwJyxcblx0J25ld3NsZXR0ZXJzaWdudXAnLFxuXHQnbmV3c2xldHRlcndpZGdldCcsXG5cdCduZXdzbGV0dGVyd3JhcHBlcicsXG5cdCdub3QtZm91bmQnLFxuXHQnbm9tb2JpbGUnLFxuXHQnbm9wcmludCcsXG5cdCdvcmlnaW5hbGx5LXB1Ymxpc2hlZCcsIC8vIE1lcmN1cnkgTmV3c1xuXHQnb3V0bGluZS12aWV3Jyxcblx0J292ZXJsYXknLFxuXHQncGFnZS10aXRsZScsXG5cdCctcGFydG5lcnMnLFxuXHQncGxlYScsXG5cdCdwb3B1bGFyJyxcbi8vXHQncG9wdXAnLCBHd2VyblxuXHQncG9wLXVwJyxcblx0J3BvcG92ZXInLFxuXHQncG9zdC1ib3R0b20nLFxuXHQncG9zdF9fY2F0ZWdvcnknLFxuXHQncG9zdGNvbW1lbnQnLFxuXHQncG9zdGRhdGUnLFxuXHQncG9zdC1hdXRob3InLFxuXHQncG9zdC1kYXRlJyxcblx0J3Bvc3RfZGF0ZScsXG5cdCdwb3N0LWZlZWRzJyxcblx0J3Bvc3RpbmZvJyxcblx0J3Bvc3QtaW5mbycsXG5cdCdwb3N0X2luZm8nLFxuXHQncG9zdC1pbmxpbmUtZGF0ZScsXG5cdCdwb3N0LWxpbmtzJyxcblx0J3Bvc3QtbWV0YScsXG5cdCdwb3N0bWV0YScsXG5cdCdwb3N0c25pcHBldCcsXG5cdCdwb3N0X3NuaXBwZXQnLFxuXHQncG9zdC1zbmlwcGV0Jyxcblx0J3Bvc3R0aXRsZScsXG5cdCdwb3N0LXRpdGxlJyxcblx0J3Bvc3RfdGl0bGUnLFxuXHQncG9zdHRheCcsXG5cdCdwb3N0LXRheCcsXG5cdCdwb3N0X3RheCcsXG5cdCdwb3N0dGFnJyxcblx0J3Bvc3RfdGFnJyxcblx0J3Bvc3QtdGFnJyxcbi8vXHQncHJldmlldycsIHVzZWQgb24gT2JzaWRpYW4gUHVibGlzaFxuXHQncHJldm5leHQnLFxuXHQncHJldmlvdXNuZXh0Jyxcblx0J3ByaW50LW5vbmUnLFxuXHQncHJpbnQtaGVhZGVyJyxcblx0J3Byb2ZpbGUnLFxuLy9cdCdwcm9tbycsXG5cdCdwcm9tby1ib3gnLFxuXHQncHViZGF0ZScsXG5cdCdwdWJfZGF0ZScsXG5cdCdwdWItZGF0ZScsXG5cdCdwdWJsaWNhdGlvbi1kYXRlJyxcblx0J3B1YmxpY2F0aW9uTmFtZScsIC8vIE1lZGl1bVxuXHQncXItY29kZScsXG5cdCdxcl9jb2RlJyxcblx0J19yYWlsJyxcblx0J3JlYWRtb3JlJyxcblx0J3JlYWQtbmV4dCcsXG5cdCdyZWFkX25leHQnLFxuXHQncmVhZF90aW1lJyxcblx0J3JlYWQtdGltZScsXG5cdCdyZWFkaW5nX3RpbWUnLFxuXHQncmVhZGluZy10aW1lJyxcblx0J3JlYWRpbmctbGlzdCcsXG5cdCdyZWNlbnRwb3N0Jyxcblx0J3JlY2VudF9wb3N0Jyxcblx0J3JlY2VudC1wb3N0Jyxcblx0J3JlY29tbWVuZCcsXG5cdCdyZWRpcmVjdGVkZnJvbScsXG5cdCdyZWNpcmMnLFxuXHQncmVnaXN0ZXInLFxuXHQncmVsYXRlZCcsXG5cdCdyZWxldmFudCcsXG5cdCdyZXZlcnNlZm9vdG5vdGUnLFxuXHQnc2NyZWVuLXJlYWRlci10ZXh0Jyxcbi8vXHQnc2hhcmUnLFxuLy9cdCctc2hhcmUnLCBzY2l0ZWNoZGFpbHkuY29tXG5cdCdzaGFyZS1ib3gnLFxuXHQnc2hhcmUtaWNvbnMnLFxuXHQnc2hhcmVsaW5rcycsXG5cdCdzaGFyZS1zZWN0aW9uJyxcblx0J3NpZGViYXJ0aXRsZScsXG5cdCdzaWRlYmFyXycsXG5cdCdzaW1pbGFyLScsXG5cdCdzaW1pbGFyXycsXG5cdCdzaW1pbGFycy0nLFxuXHQnc2lkZWl0ZW1zJyxcblx0J3NpZGUtYm94Jyxcblx0J3NpdGUtaW5kZXgnLFxuXHQnc2l0ZS1oZWFkZXInLFxuXHQnc2l0ZS1sb2dvJyxcblx0J3NpdGUtbmFtZScsXG4vL1x0J3NraXAtJyxcbi8vXHQnc2tpcC1saW5rJywgVGVjaENydW5jaFxuXHQnc29jaWFsJyxcblx0J3NwZWVjaGlmeS1pZ25vcmUnLFxuXHQnc3BvbnNvcicsXG5cdCdzcHJpbmdlcmNpdGF0aW9uJyxcbi8vXHQnLXN0YXRzJyxcblx0J19zdGF0cycsXG5cdCdzdGlja3knLFxuXHQnc3RvcnlyZWFkdGltZScsIC8vIE1lZGl1bVxuXHQnc3RvcnlwdWJsaXNoZGF0ZScsIC8vIE1lZGl1bVxuXHQnc3ViamVjdC1sYWJlbCcsXG5cdCdzdWJzY3JpYmUnLFxuXHQnX3RhZ3MnLFxuXHQndGFnc19faXRlbScsXG5cdCd0YWdfbGlzdCcsXG5cdCd0YXhvbm9teScsXG5cdCd0YWJsZS1vZi1jb250ZW50cycsXG5cdCd0YWJzLScsXG4vL1x0J3RlYXNlcicsIE5hdHVyZVxuXHQndGVybWluYWx0b3V0Jyxcblx0J3RpbWUtcnVicmljJyxcblx0J3RpbWVzdGFtcCcsXG5cdCd0aXBfb2ZmJyxcblx0J3RpcHRvdXQnLFxuXHQnLXRvdXQtJyxcblx0Jy10b2MnLFxuXHQndG9waWMtbGlzdCcsXG5cdCd0b29sYmFyJyxcblx0J3Rvb2x0aXAnLFxuXHQndG9wLXdyYXBwZXInLFxuXHQndHJlZS1pdGVtJyxcblx0J3RyZW5kaW5nJyxcblx0J3RydXN0LWZlYXQnLFxuXHQndHJ1c3QtYmFkZ2UnLFxuXHQndHdpdHRlcicsXG5cdCd2aXN1YWxseS1oaWRkZW4nLFxuXHQnd2VsY29tZWJveCcsXG4gICAgJ3dpZGdldC0nXG5dO1xuXG4vLyBTZWxlY3RvcnMgZm9yIGZvb3Rub3RlcyBhbmQgY2l0YXRpb25zXG5leHBvcnQgY29uc3QgRk9PVE5PVEVfSU5MSU5FX1JFRkVSRU5DRVMgPSBbXG5cdCdzdXAucmVmZXJlbmNlJyxcblx0J2NpdGUubHR4X2NpdGUnLFxuXHQnc3VwW2lkXj1cImZuclwiXScsXG5cdCdzdXBbaWRePVwiZm5yZWY6XCJdJyxcblx0J3NwYW4uZm9vdG5vdGUtbGluaycsXG5cdCdhLmNpdGF0aW9uJyxcblx0J2FbaWRePVwicmVmLWxpbmtcIl0nLFxuXHQnYVtocmVmXj1cIiNmblwiXScsXG5cdCdhW2hyZWZePVwiI2NpdGVcIl0nLFxuXHQnYVtocmVmXj1cIiNyZWZlcmVuY2VcIl0nLFxuXHQnYVtocmVmXj1cIiNmb290bm90ZVwiXScsXG5cdCdhW2hyZWZePVwiI3JcIl0nLCAvLyBDb21tb24gaW4gYWNhZGVtaWMgcGFwZXJzXG5cdCdhW2hyZWZePVwiI2JcIl0nLCAvLyBDb21tb24gZm9yIGJpYmxpb2dyYXBoeSByZWZlcmVuY2VzXG5cdCdhW2hyZWYqPVwiY2l0ZV9ub3RlXCJdJyxcblx0J2FbaHJlZio9XCJjaXRlX3JlZlwiXScsXG5cdCdhLmZvb3Rub3RlLWFuY2hvcicsIC8vIFN1YnN0YWNrXG5cdCdzcGFuLmZvb3Rub3RlLWhvdmVyY2FyZC10YXJnZXQgYScsIC8vIFN1YnN0YWNrXG5cdCdhW3JvbGU9XCJkb2MtYmlibGlvcmVmXCJdJywgLy8gU2NpZW5jZS5vcmdcblx0J2FbaWRePVwiZm5yZWZcIl0nLFxuXHQnYVtpZF49XCJyZWYtbGlua1wiXScsIC8vIE5hdHVyZS5jb21cbl0uam9pbignLCcpO1xuXG5leHBvcnQgY29uc3QgRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMgPSBbXG5cdCdkaXYuZm9vdG5vdGUgb2wnLFxuXHQnZGl2LmZvb3Rub3RlcyBvbCcsXG5cdCdkaXZbcm9sZT1cImRvYy1lbmRub3Rlc1wiXScsXG5cdCdkaXZbcm9sZT1cImRvYy1mb290bm90ZXNcIl0nLFxuXHQnb2wuZm9vdG5vdGVzLWxpc3QnLFxuXHQnb2wuZm9vdG5vdGVzJyxcblx0J29sLnJlZmVyZW5jZXMnLFxuXHQnb2xbY2xhc3MqPVwiYXJ0aWNsZS1yZWZlcmVuY2VzXCJdJyxcblx0J3NlY3Rpb24uZm9vdG5vdGVzIG9sJyxcblx0J3NlY3Rpb25bcm9sZT1cImRvYy1lbmRub3Rlc1wiXScsXG5cdCdzZWN0aW9uW3JvbGU9XCJkb2MtZm9vdG5vdGVzXCJdJyxcblx0J3NlY3Rpb25bcm9sZT1cImRvYy1iaWJsaW9ncmFwaHlcIl0nLFxuXHQndWwuZm9vdG5vdGVzLWxpc3QnLFxuXHQndWwubHR4X2JpYmxpc3QnLFxuXHQnZGl2LmZvb3Rub3RlW2RhdGEtY29tcG9uZW50LW5hbWU9XCJGb290bm90ZVRvRE9NXCJdJyAvLyBTdWJzdGFja1xuXS5qb2luKCcsJyk7XG5cbi8vIEVsZW1lbnRzIHRoYXQgYXJlIGFsbG93ZWQgdG8gYmUgZW1wdHlcbi8vIFRoZXNlIGFyZSBub3QgcmVtb3ZlZCBldmVuIGlmIHRoZXkgaGF2ZSBubyBjb250ZW50XG5leHBvcnQgY29uc3QgQUxMT1dFRF9FTVBUWV9FTEVNRU5UUyA9IG5ldyBTZXQoW1xuXHQnYXJlYScsXG5cdCdhdWRpbycsXG5cdCdiYXNlJyxcblx0J2JyJyxcblx0J2NpcmNsZScsXG5cdCdjb2wnLFxuXHQnZGVmcycsXG5cdCdlbGxpcHNlJyxcblx0J2VtYmVkJyxcblx0J2ZpZ3VyZScsXG5cdCdnJyxcblx0J2hyJyxcblx0J2lmcmFtZScsXG5cdCdpbWcnLFxuXHQnaW5wdXQnLFxuXHQnbGluZScsXG5cdCdsaW5rJyxcblx0J21hc2snLFxuXHQnbWV0YScsXG5cdCdvYmplY3QnLFxuXHQncGFyYW0nLFxuXHQncGF0aCcsXG5cdCdwYXR0ZXJuJyxcblx0J3BpY3R1cmUnLFxuXHQncG9seWdvbicsXG5cdCdwb2x5bGluZScsXG5cdCdyZWN0Jyxcblx0J3NvdXJjZScsXG5cdCdzdG9wJyxcblx0J3N2ZycsXG5cdCd0ZCcsXG5cdCd0aCcsXG5cdCd0cmFjaycsXG5cdCd1c2UnLFxuXHQndmlkZW8nLFxuXHQnd2JyJ1xuXSk7XG5cbi8vIEF0dHJpYnV0ZXMgdG8ga2VlcFxuZXhwb3J0IGNvbnN0IEFMTE9XRURfQVRUUklCVVRFUyA9IG5ldyBTZXQoW1xuXHQnYWx0Jyxcblx0J2FsbG93Jyxcblx0J2FsbG93ZnVsbHNjcmVlbicsXG5cdCdhcmlhLWxhYmVsJyxcblx0J2NoZWNrZWQnLFxuXHQnY29sc3BhbicsXG5cdCdjb250cm9scycsXG5cdCdkYXRhLXNyYycsXG5cdCdkYXRhLXNyY3NldCcsXG5cdCdkYXRhLWxhbmcnLFxuXHQnZGlyJyxcblx0J2ZyYW1lYm9yZGVyJyxcblx0J2hlYWRlcnMnLFxuXHQnaGVpZ2h0Jyxcblx0J2hyZWYnLFxuXHQnbGFuZycsXG5cdCdyb2xlJyxcblx0J3Jvd3NwYW4nLFxuXHQnc3JjJyxcblx0J3NyY3NldCcsXG5cdCd0aXRsZScsXG5cdCd0eXBlJyxcblx0J3dpZHRoJ1xuXSk7XG5leHBvcnQgY29uc3QgQUxMT1dFRF9BVFRSSUJVVEVTX0RFQlVHID0gbmV3IFNldChbXG5cdCdjbGFzcycsXG5cdCdpZCcsXG5dKTtcblxuLy8gU3VwcG9ydGVkIGxhbmd1YWdlcyBmb3IgY29kZSBibG9ja3NcbmV4cG9ydCBjb25zdCBTVVBQT1JURURfTEFOR1VBR0VTID0gbmV3IFNldChbXG5cdC8vIE1hcmt1cCAmIFdlYlxuXHQnbWFya3VwJywgJ2h0bWwnLCAneG1sJywgJ3N2ZycsICdtYXRobWwnLCAnc3NtbCcsICdhdG9tJywgJ3JzcycsXG5cdCdqYXZhc2NyaXB0JywgJ2pzJywgJ2pzeCcsICd0eXBlc2NyaXB0JywgJ3RzJywgJ3RzeCcsXG5cdCd3ZWJhc3NlbWJseScsICd3YXNtJyxcblx0XG5cdC8vIENvbW1vbiBQcm9ncmFtbWluZyBMYW5ndWFnZXNcblx0J3B5dGhvbicsXG5cdCdqYXZhJyxcblx0J2NzaGFycCcsICdjcycsICdkb3RuZXQnLCAnYXNwbmV0Jyxcblx0J2NwcCcsICdjKysnLCAnYycsICdvYmpjJyxcblx0J3J1YnknLCAncmInLFxuXHQncGhwJyxcblx0J2dvbGFuZycsXG5cdCdydXN0Jyxcblx0J3N3aWZ0Jyxcblx0J2tvdGxpbicsXG5cdCdzY2FsYScsXG5cdCdkYXJ0Jyxcblx0XG5cdC8vIFNoZWxsICYgU2NyaXB0aW5nXG5cdCdiYXNoJywgJ3NoZWxsJywgJ3NoJyxcblx0J3Bvd2Vyc2hlbGwnLFxuXHQnYmF0Y2gnLFxuXHRcblx0Ly8gRGF0YSAmIENvbmZpZ1xuXHQnanNvbicsICdqc29ucCcsXG5cdCd5YW1sJywgJ3ltbCcsXG5cdCd0b21sJyxcblx0J2RvY2tlcmZpbGUnLFxuXHQnZ2l0aWdub3JlJyxcblx0XG5cdC8vIFF1ZXJ5IExhbmd1YWdlc1xuXHQnc3FsJywgJ215c3FsJywgJ3Bvc3RncmVzcWwnLFxuXHQnZ3JhcGhxbCcsXG5cdCdtb25nb2RiJyxcblx0J3NwYXJxbCcsXG5cdFxuXHQvLyBNYXJrdXAgJiBEb2N1bWVudGF0aW9uXG5cdCdtYXJrZG93bicsICdtZCcsXG5cdCdsYXRleCcsICd0ZXgnLFxuXHQnYXNjaWlkb2MnLCAnYWRvYycsXG5cdCdqc2RvYycsXG5cdFxuXHQvLyBGdW5jdGlvbmFsIExhbmd1YWdlc1xuXHQnaGFza2VsbCcsICdocycsXG5cdCdlbG0nLFxuXHQnZWxpeGlyJyxcblx0J2VybGFuZycsXG5cdCdvY2FtbCcsXG5cdCdmc2hhcnAnLFxuXHQnc2NoZW1lJyxcblx0J2xpc3AnLCAnZWxpc3AnLFxuXHQnY2xvanVyZScsXG5cdFxuXHQvLyBPdGhlciBMYW5ndWFnZXNcblx0J21hdGxhYicsXG5cdCdmb3J0cmFuJyxcblx0J2NvYm9sJyxcblx0J3Bhc2NhbCcsXG5cdCdwZXJsJyxcblx0J2x1YScsXG5cdCdqdWxpYScsXG5cdCdncm9vdnknLFxuXHQnY3J5c3RhbCcsXG5cdCduaW0nLFxuXHQnemlnJyxcblx0XG5cdC8vIERvbWFpbiBTcGVjaWZpY1xuXHQncmVnZXgnLFxuXHQnZ3JhZGxlJyxcblx0J2NtYWtlJyxcblx0J21ha2VmaWxlJyxcblx0J25peCcsXG5cdCd0ZXJyYWZvcm0nLFxuXHQnc29saWRpdHknLFxuXHQnZ2xzbCcsXG5cdCdobHNsJyxcblx0XG5cdC8vIEFzc2VtYmx5XG5cdCduYXNtJyxcblx0J21hc20nLFxuXHQnYXJtYXNtJyxcblx0XG5cdC8vIEdhbWUgRGV2ZWxvcG1lbnRcblx0J2dkc2NyaXB0Jyxcblx0J3VucmVhbHNjcmlwdCcsXG5cdFxuXHQvLyBPdGhlcnNcblx0J2FiYXAnLFxuXHQnYWN0aW9uc2NyaXB0Jyxcblx0J2FkYScsXG5cdCdhZ2RhJyxcblx0J2FudGxyNCcsXG5cdCdhcHBsZXNjcmlwdCcsXG5cdCdhcmR1aW5vJyxcblx0J2NvZmZlZXNjcmlwdCcsXG5cdCdkamFuZ28nLFxuXHQnZXJsYW5nJyxcblx0J2ZvcnRyYW4nLFxuXHQnaGF4ZScsXG5cdCdpZHJpcycsXG5cdCdrb3RsaW4nLFxuXHQnbGl2ZXNjcmlwdCcsXG5cdCdtYXRsYWInLFxuXHQnbmdpbngnLFxuXHQncGFzY2FsJyxcblx0J3Byb2xvZycsXG5cdCdwdXBwZXQnLFxuXHQnc2NhbGEnLFxuXHQnc2NoZW1lJyxcblx0J3RjbCcsXG5cdCd2ZXJpbG9nJyxcblx0J3ZoZGwnXG5dKTtcblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImV4cG9ydCB7IERlZnVkZGxlIH0gZnJvbSAnLi9kZWZ1ZGRsZSc7XG5leHBvcnQgdHlwZSB7IERlZnVkZGxlT3B0aW9ucywgRGVmdWRkbGVSZXNwb25zZSwgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnOyAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
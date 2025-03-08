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
        var _a;
        let domain = '';
        let url = '';
        try {
            // Try to get URL from document location
            url = ((_a = doc.location) === null || _a === void 0 ? void 0 : _a.href) || '';
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
            schemaOrgData
        };
    }
    static getAuthor(doc, schemaOrgData) {
        return (this.getMetaContent(doc, "name", "sailthru.author") ||
            this.getSchemaProperty(schemaOrgData, 'author.name') ||
            this.getMetaContent(doc, "property", "author") ||
            this.getMetaContent(doc, "name", "byl") ||
            this.getMetaContent(doc, "name", "author") ||
            this.getMetaContent(doc, "name", "authorList") ||
            this.getMetaContent(doc, "name", "copyright") ||
            this.getSchemaProperty(schemaOrgData, 'copyrightHolder.name') ||
            this.getMetaContent(doc, "property", "og:site_name") ||
            this.getSchemaProperty(schemaOrgData, 'publisher.name') ||
            this.getSchemaProperty(schemaOrgData, 'sourceOrganization.name') ||
            this.getSchemaProperty(schemaOrgData, 'isPartOf.name') ||
            this.getMetaContent(doc, "name", "twitter:creator") ||
            this.getMetaContent(doc, "name", "application-name") ||
            '');
    }
    static getSite(doc, schemaOrgData) {
        return (this.getSchemaProperty(schemaOrgData, 'publisher.name') ||
            this.getMetaContent(doc, "property", "og:site_name") ||
            this.getSchemaProperty(schemaOrgData, 'sourceOrganization.name') ||
            this.getMetaContent(doc, "name", "copyright") ||
            this.getSchemaProperty(schemaOrgData, 'copyrightHolder.name') ||
            this.getSchemaProperty(schemaOrgData, 'isPartOf.name') ||
            this.getMetaContent(doc, "name", "application-name") ||
            '');
    }
    static getTitle(doc, schemaOrgData) {
        var _a, _b;
        return (this.getMetaContent(doc, "property", "og:title") ||
            this.getMetaContent(doc, "name", "twitter:title") ||
            this.getSchemaProperty(schemaOrgData, 'headline') ||
            this.getMetaContent(doc, "name", "title") ||
            this.getMetaContent(doc, "name", "sailthru.title") ||
            ((_b = (_a = doc.querySelector('title')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) ||
            '');
    }
    static getDescription(doc, schemaOrgData) {
        return (this.getMetaContent(doc, "name", "description") ||
            this.getMetaContent(doc, "property", "description") ||
            this.getMetaContent(doc, "property", "og:description") ||
            this.getSchemaProperty(schemaOrgData, 'description') ||
            this.getMetaContent(doc, "name", "twitter:description") ||
            this.getMetaContent(doc, "name", "sailthru.description") ||
            '');
    }
    static getImage(doc, schemaOrgData) {
        return (this.getMetaContent(doc, "property", "og:image") ||
            this.getMetaContent(doc, "name", "twitter:image") ||
            this.getSchemaProperty(schemaOrgData, 'image.url') ||
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
        return (this.getSchemaProperty(schemaOrgData, 'datePublished') ||
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
        return this.decodeHTMLEntities(content);
    }
    static getTimeElement(doc) {
        var _a, _b, _c, _d;
        const selector = `time`;
        const element = Array.from(doc.querySelectorAll(selector))[0];
        const content = element ? ((_d = (_b = (_a = element.getAttribute("datetime")) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : (_c = element.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "") : "";
        return this.decodeHTMLEntities(content);
    }
    static decodeHTMLEntities(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }
    static getSchemaProperty(schemaOrgData, property, defaultValue = '') {
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
            return this.decodeHTMLEntities(result);
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
// Entry point elements
// These are the elements that will be used to find the main content
const ENTRY_POINT_ELEMENTS = [
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
const MOBILE_WIDTH = 600;
const BLOCK_ELEMENTS = ['div', 'section', 'article', 'main'];
// Hidden elements that should be removed
const HIDDEN_ELEMENT_SELECTORS = [
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
// Case insensitive, but matches must be exact
const EXACT_SELECTORS = [
    '.ad',
    'aside',
    'button',
    'canvas',
    '#comments',
    'dialog',
    'fieldset',
    'footer',
    'form',
    'header',
    '#header',
    'input',
    'iframe',
    'label',
    'link',
    '.logo',
    '#logo',
    '.meta',
    'nav',
    '#newsletter',
    'noscript',
    '.noprint',
    'option',
    '.promo',
    'script',
    'select',
    'sidebar',
    '.sidebar',
    '#sidebar',
    '#siteSub',
    'style',
    'time',
    '#title',
    '#toc',
    '.toc',
    'textarea',
    '.clickable-icon',
    'a[href^="#"][class*="anchor"]',
    '[data-link-name*="skip"]',
    '[data-print-layout="hide"]',
    '[data-container*="most-viewed"]',
    '[src*="author"]',
    '[href="#site-content"]',
    '[class^="ad-"]',
    '[class$="-ad"]',
    '[id^="ad-"]',
    '[id$="-ad"]',
    '[role="banner"]',
    '[role="button"]',
    '[role="dialog"]',
    '[role="complementary"]',
    '[role="navigation"]'
];
// Removal patterns tested against attributes: class, id, data-testid, and data-qa
// Case insensitive, partial matches allowed
const PARTIAL_SELECTORS = [
    'access-wall',
    'activitypub',
    'appendix',
    'avatar',
    'advert',
    '-ad-',
    '_ad_',
    'around-the-web',
    'article__copy',
    'article-end ',
    'article_header',
    'article__header',
    'article__info',
    'article__meta',
    'article-title',
    'articletopics',
    'article-topics',
    'article--lede', // The Verge
    'author',
    'banner',
    'bottom-of-article',
    'brand-bar',
    'breadcrumb',
    'button-wrapper',
    'btn-',
    '-btn',
    'byline',
    'cat_header',
    'catlinks',
    'collections',
    'comments',
    'comment-count',
    'comment-content',
    'comment-form',
    'comment-respond',
    'comment-thread',
    'complementary',
    'content-card', // The Verge
    'core-collateral',
    '_cta',
    '-cta',
    'cta-',
    'cta_',
    'current-issue', // The Nation
    'dateheader',
    'dialog',
    'disclosure',
    'discussion',
    'disqus',
    'donate',
    'dropdown', // Ars Technica
    'eletters',
    'eyebrow',
    'expand-reduce',
    'facebook',
    'favorite',
    'feedback',
    'fixed',
    'follow',
    'footer',
    'for-you',
    'frontmatter',
    //	'global',
    'google',
    'goog-',
    'header-logo',
    'header-pattern', // The Verge
    'hide-print',
    'interlude',
    'interaction',
    'kicker',
    '-labels',
    'latest-content',
    '-ledes-', // The Verge
    '-license',
    'link-box',
    'listing-dynamic-terms', // Boston Review
    'loading',
    'loa-info',
    'logo_container',
    'marketing',
    'media-inquiry',
    'menu-',
    'meta-',
    'metadata',
    'might-like',
    'more-',
    'mw-editsection',
    'mw-jump-link',
    'nav-',
    'navbar',
    'navigation',
    'next-',
    'news-story-title',
    //	'newsletter', used on Substack
    'newsletter_',
    'newsletter-signup',
    'newslettersignup',
    'newsletterwrapper',
    'not-found',
    'originally-published', // Mercury News
    'overlay',
    'page-title',
    '-partners',
    'pencraft', // Substack
    'plea',
    'popular',
    'popup',
    'pop-up',
    'post-bottom',
    'post__category',
    'postcomment',
    'postdate',
    'post-date',
    'post_date',
    'postinfo',
    'post-info',
    'post_info',
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
    'post_tag',
    'post-tag',
    //	'preview', used on Obsidian Publish
    'prevnext',
    'print-none',
    'profile',
    //	'promo',
    'pubdate',
    'pub_date',
    'pub-date',
    'publication-date',
    'publicationName', // Medium
    'qr-code',
    'qr_code',
    'readmore',
    'read-next',
    'read_next',
    'read_time',
    'read-time',
    'reading_time',
    'reading-time',
    'reading-list',
    'recommend',
    'recirc',
    'register',
    'related',
    'screen-reader-text',
    //	'share',
    '-share',
    'share-icons',
    'share-section',
    'sidebartitle',
    'similar-',
    'similar_',
    'site-index',
    'site-header',
    'site-logo',
    'site-name',
    //	'skip-',
    'social',
    'speechify-ignore',
    'sponsor',
    //	'-stats',
    '_stats',
    'storyreadtime', // Medium
    'storypublishdate', // Medium
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
    '-toc',
    'topic-list',
    'toolbar',
    'tooltip',
    'top-wrapper',
    'tree-item',
    'trending',
    'trust-feat',
    'twitter'
];
// Elements that are allowed to be empty
// These are not removed even if they have no content
const ALLOWED_EMPTY_ELEMENTS = new Set([
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
const ALLOWED_ATTRIBUTES = new Set([
    'alt',
    'aria-label',
    'class',
    'colspan',
    'data-src',
    'data-srcset',
    'dir',
    'headers',
    'height',
    'href',
    'id',
    'lang',
    'role',
    'rowspan',
    'src',
    'srcset',
    'title',
    'width'
]);
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
        try {
            // Evaluate styles and sizes on original document
            const mobileStyles = this._evaluateMediaQueries(this.doc);
            const smallImages = this.findSmallImages(this.doc);
            // Clone after evaluation
            const clone = this.doc.cloneNode(true);
            const schemaOrgData = metadata_1.MetadataExtractor.extractSchemaOrgData(this.doc);
            // Apply mobile style to clone
            this.applyMobileStyles(clone, mobileStyles);
            // Find main content
            const mainContent = this.findMainContent(clone);
            if (!mainContent) {
                return Object.assign({ content: this.doc.body.innerHTML }, metadata_1.MetadataExtractor.extract(this.doc, schemaOrgData));
            }
            // Remove small images identified from original document
            this.removeSmallImages(clone, smallImages);
            // Perform other destructive operations on the clone
            this.removeHiddenElements(clone);
            this.removeClutter(clone);
            // Clean up the main content
            this.cleanContent(mainContent);
            const metadata = metadata_1.MetadataExtractor.extract(this.doc, schemaOrgData);
            return Object.assign({ content: mainContent ? mainContent.outerHTML : this.doc.body.innerHTML }, metadata);
        }
        catch (error) {
            console.error('Defuddle', 'Error processing document:', error);
            const schemaOrgData = metadata_1.MetadataExtractor.extractSchemaOrgData(this.doc);
            return Object.assign({ content: this.doc.body.innerHTML }, metadata_1.MetadataExtractor.extract(this.doc, schemaOrgData));
        }
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
                    if (MOBILE_WIDTH <= maxWidth) {
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
        const hiddenElements = doc.querySelectorAll(HIDDEN_ELEMENT_SELECTORS);
        hiddenElements.forEach(el => elementsToRemove.add(el));
        count += hiddenElements.length;
        // Second pass: Use TreeWalker for efficient traversal
        const treeWalker = document.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, {
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
        // Combine all exact selectors into a single selector string
        const combinedExactSelector = EXACT_SELECTORS.join(',');
        // First pass: Remove elements matching exact selectors
        const exactElements = doc.querySelectorAll(combinedExactSelector);
        if (exactElements.length > 0) {
            // Batch remove elements
            const fragment = document.createDocumentFragment();
            exactElements.forEach(el => {
                if (el === null || el === void 0 ? void 0 : el.parentNode) {
                    fragment.appendChild(el);
                    exactSelectorCount++;
                }
            });
        }
        // Second pass: Handle partial selectors
        // Pre-compile regexes for better performance
        const partialRegexes = PARTIAL_SELECTORS.map(pattern => ({
            pattern,
            regex: new RegExp(pattern, 'i')
        }));
        // Create an efficient lookup for partial matches
        const shouldRemoveElement = (el) => {
            var _a, _b, _c;
            // Get all relevant attributes once
            const className = el.className && typeof el.className === 'string' ?
                el.className.toLowerCase() : '';
            const id = el.id ? el.id.toLowerCase() : '';
            const testId = ((_a = el.getAttribute('data-testid')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
            const testQa = ((_b = el.getAttribute('data-qa')) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
            const testCy = ((_c = el.getAttribute('data-cy')) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || '';
            // Combine attributes for single-pass checking
            const attributeText = `${className} ${id} ${testId} ${testQa} ${testCy}`;
            // Early return if no content to check
            if (!attributeText.trim()) {
                return false;
            }
            // Use some() for early termination
            return partialRegexes.some(({ regex }) => regex.test(attributeText));
        };
        // Process elements in batches to avoid long tasks
        const BATCH_SIZE = 100;
        const allElements = Array.from(doc.querySelectorAll('[class], [id], [data-testid], [data-qa], [data-cy]'));
        for (let i = 0; i < allElements.length; i += BATCH_SIZE) {
            const batch = allElements.slice(i, i + BATCH_SIZE);
            const elementsToRemove = [];
            // Read phase - identify elements to remove
            batch.forEach(el => {
                if (shouldRemoveElement(el)) {
                    elementsToRemove.push(el);
                    partialSelectorCount++;
                }
            });
            // Write phase - batch remove elements
            if (elementsToRemove.length > 0) {
                const fragment = document.createDocumentFragment();
                elementsToRemove.forEach(el => {
                    if (el === null || el === void 0 ? void 0 : el.parentNode) {
                        fragment.appendChild(el);
                    }
                });
            }
        }
        const endTime = performance.now();
        this._log('Found clutter elements:', {
            exactSelectors: exactSelectorCount,
            partialSelectors: partialSelectorCount,
            total: exactSelectorCount + partialSelectorCount,
            processingTime: `${(endTime - startTime).toFixed(2)}ms`
        });
    }
    cleanContent(element) {
        // Remove HTML comments
        this.removeHtmlComments(element);
        // Handle h1 elements - remove first one and convert others to h2
        this.handleHeadings(element);
        // Strip unwanted attributes
        this.stripUnwantedAttributes(element);
        // Remove empty elements
        this.removeEmptyElements(element);
    }
    handleHeadings(element) {
        const h1s = element.getElementsByTagName('h1');
        let isFirstH1 = true;
        Array.from(h1s).forEach(h1 => {
            var _a;
            if (isFirstH1) {
                h1.remove();
                isFirstH1 = false;
            }
            else {
                // Convert subsequent h1s to h2s
                const h2 = document.createElement('h2');
                h2.innerHTML = h1.innerHTML;
                // Copy allowed attributes
                Array.from(h1.attributes).forEach(attr => {
                    if (ALLOWED_ATTRIBUTES.has(attr.name)) {
                        h2.setAttribute(attr.name, attr.value);
                    }
                });
                (_a = h1.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(h2, h1);
            }
        });
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
                if (!ALLOWED_ATTRIBUTES.has(attrName) && !attrName.startsWith('data-')) {
                    el.removeAttribute(attr.name);
                    attributeCount++;
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
                if (ALLOWED_EMPTY_ELEMENTS.has(el.tagName.toLowerCase())) {
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
    // Find small IMG and SVG elements
    findSmallImages(doc) {
        const MIN_DIMENSION = 33;
        const smallImages = new Set();
        const transformRegex = /scale\(([\d.]+)\)/;
        const startTime = performance.now();
        let processedCount = 0;
        // 1. READ PHASE - Gather all elements in a single pass
        const elements = [
            ...Array.from(doc.getElementsByTagName('img')),
            ...Array.from(doc.getElementsByTagName('svg'))
        ];
        if (elements.length === 0) {
            return smallImages;
        }
        // 2. BATCH PROCESS - Collect all measurements in one go
        const measurements = elements.map(element => ({
            element,
            // Static attributes (no reflow)
            naturalWidth: element instanceof HTMLImageElement ? element.naturalWidth : 0,
            naturalHeight: element instanceof HTMLImageElement ? element.naturalHeight : 0,
            attrWidth: parseInt(element.getAttribute('width') || '0'),
            attrHeight: parseInt(element.getAttribute('height') || '0')
        }));
        // 3. BATCH COMPUTE STYLES - Process in chunks to avoid long tasks
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
            const src = element.src || element.getAttribute('data-src') || '';
            const srcset = element.srcset || element.getAttribute('data-srcset') || '';
            if (src)
                return `src:${src}`;
            if (srcset)
                return `srcset:${srcset}`;
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
        ENTRY_POINT_ELEMENTS.forEach((selector, index) => {
            const elements = doc.querySelectorAll(selector);
            elements.forEach(element => {
                // Base score from selector priority (earlier = higher)
                let score = (ENTRY_POINT_ELEMENTS.length - index) * 10;
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
        while (current && current !== document.documentElement) {
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
        BLOCK_ELEMENTS.forEach((tag) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7UUFDN0QsSUFBSSxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDdkIsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNiLENBQUM7UUFFRCxpREFBaUQ7UUFDakQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM1RCxLQUFLLElBQUksVUFBVSxDQUFDO1FBRXBCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDMUQsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVqQyxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7Q0FDRDtBQXhxQkQsNEJBd3FCQzs7Ozs7OztVQ3RoQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSw0REFBc0M7QUFBN0IsNkdBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZ1ZGRsZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvbWV0YWRhdGEudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvZGVmdWRkbGUudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVmdWRkbGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVmdWRkbGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFFeHRyYWN0b3Ige1xuXHRzdGF0aWMgZXh0cmFjdChkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBEZWZ1ZGRsZU1ldGFkYXRhIHtcblx0XHRsZXQgZG9tYWluID0gJyc7XG5cdFx0bGV0IHVybCA9ICcnO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFRyeSB0byBnZXQgVVJMIGZyb20gZG9jdW1lbnQgbG9jYXRpb25cblx0XHRcdHVybCA9IGRvYy5sb2NhdGlvbj8uaHJlZiB8fCAnJztcblx0XHRcdGlmICh1cmwpIHtcblx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gSWYgVVJMIHBhcnNpbmcgZmFpbHMsIHRyeSB0byBnZXQgZnJvbSBiYXNlIHRhZ1xuXHRcdFx0Y29uc3QgYmFzZVRhZyA9IGRvYy5xdWVyeVNlbGVjdG9yKCdiYXNlW2hyZWZdJyk7XG5cdFx0XHRpZiAoYmFzZVRhZykge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHVybCA9IGJhc2VUYWcuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBwYXJzZSBiYXNlIFVSTDonLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy5nZXRUaXRsZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuZ2V0RGVzY3JpcHRpb24oZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdGRvbWFpbixcblx0XHRcdGZhdmljb246IHRoaXMuZ2V0RmF2aWNvbihkb2MsIHVybCksXG5cdFx0XHRpbWFnZTogdGhpcy5nZXRJbWFnZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0cHVibGlzaGVkOiB0aGlzLmdldFB1Ymxpc2hlZChkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0YXV0aG9yOiB0aGlzLmdldEF1dGhvcihkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0c2l0ZTogdGhpcy5nZXRTaXRlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRzY2hlbWFPcmdEYXRhXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEF1dGhvcihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdhdXRob3IubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcImF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImJ5bFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImF1dGhvckxpc3RcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJjb3B5cmlnaHRcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ2NvcHlyaWdodEhvbGRlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6c2l0ZV9uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdwdWJsaXNoZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdzb3VyY2VPcmdhbml6YXRpb24ubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdpc1BhcnRPZi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmNyZWF0b3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhcHBsaWNhdGlvbi1uYW1lXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRTaXRlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ3B1Ymxpc2hlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6c2l0ZV9uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdzb3VyY2VPcmdhbml6YXRpb24ubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiY29weXJpZ2h0XCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdjb3B5cmlnaHRIb2xkZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdpc1BhcnRPZi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhcHBsaWNhdGlvbi1uYW1lXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRUaXRsZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjp0aXRsZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShzY2hlbWFPcmdEYXRhLCAnaGVhZGxpbmUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUudGl0bGVcIikgfHxcblx0XHRcdGRvYy5xdWVyeVNlbGVjdG9yKCd0aXRsZScpPy50ZXh0Q29udGVudD8udHJpbSgpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXREZXNjcmlwdGlvbihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6ZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ2Rlc2NyaXB0aW9uJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEltYWdlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6aW1hZ2VcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmltYWdlXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdpbWFnZS51cmwnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmltYWdlLmZ1bGxcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEZhdmljb24oZG9jOiBEb2N1bWVudCwgYmFzZVVybDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBpY29uRnJvbU1ldGEgPSB0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOmltYWdlOmZhdmljb25cIik7XG5cdFx0aWYgKGljb25Gcm9tTWV0YSkgcmV0dXJuIGljb25Gcm9tTWV0YTtcblxuXHRcdGNvbnN0IGljb25MaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0naWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChpY29uTGluaykgcmV0dXJuIGljb25MaW5rO1xuXG5cdFx0Y29uc3Qgc2hvcnRjdXRMaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0nc2hvcnRjdXQgaWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChzaG9ydGN1dExpbmspIHJldHVybiBzaG9ydGN1dExpbms7XG5cblx0XHQvLyBPbmx5IHRyeSB0byBjb25zdHJ1Y3QgZmF2aWNvbiBVUkwgaWYgd2UgaGF2ZSBhIHZhbGlkIGJhc2UgVVJMXG5cdFx0aWYgKGJhc2VVcmwpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVVJMKFwiL2Zhdmljb24uaWNvXCIsIGJhc2VVcmwpLmhyZWY7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybignRmFpbGVkIHRvIGNvbnN0cnVjdCBmYXZpY29uIFVSTDonLCBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRQdWJsaXNoZWQoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShzY2hlbWFPcmdEYXRhLCAnZGF0ZVB1Ymxpc2hlZCcpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwicHVibGlzaERhdGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiYXJ0aWNsZTpwdWJsaXNoZWRfdGltZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRUaW1lRWxlbWVudChkb2MpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuZGF0ZVwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0TWV0YUNvbnRlbnQoZG9jOiBEb2N1bWVudCwgYXR0cjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBzZWxlY3RvciA9IGBtZXRhWyR7YXR0cn1dYDtcblx0XHRjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG5cdFx0XHQuZmluZChlbCA9PiBlbC5nZXRBdHRyaWJ1dGUoYXR0cik/LnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpPy50cmltKCkgPz8gXCJcIiA6IFwiXCI7XG5cdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGNvbnRlbnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0VGltZUVsZW1lbnQoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3Qgc2VsZWN0b3IgPSBgdGltZWA7XG5cdFx0Y29uc3QgZWxlbWVudCA9IEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVswXTtcblx0XHRjb25zdCBjb250ZW50ID0gZWxlbWVudCA/IChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGV0aW1lXCIpPy50cmltKCkgPz8gZWxlbWVudC50ZXh0Q29udGVudD8udHJpbSgpID8/IFwiXCIpIDogXCJcIjtcblx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoY29udGVudCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBkZWNvZGVIVE1MRW50aXRpZXModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG5cdFx0dGV4dGFyZWEuaW5uZXJIVE1MID0gdGV4dDtcblx0XHRyZXR1cm4gdGV4dGFyZWEudmFsdWU7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRTY2hlbWFQcm9wZXJ0eShzY2hlbWFPcmdEYXRhOiBhbnksIHByb3BlcnR5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuXHRcdGlmICghc2NoZW1hT3JnRGF0YSkgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuXHRcdGNvbnN0IHNlYXJjaFNjaGVtYSA9IChkYXRhOiBhbnksIHByb3BzOiBzdHJpbmdbXSwgZnVsbFBhdGg6IHN0cmluZywgaXNFeGFjdE1hdGNoOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZ1tdID0+IHtcblx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0cmV0dXJuIHByb3BzLmxlbmd0aCA9PT0gMCA/IFtkYXRhXSA6IFtdO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAoIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRcdFx0Y29uc3QgY3VycmVudFByb3AgPSBwcm9wc1swXTtcblx0XHRcdFx0aWYgKC9eXFxbXFxkK1xcXSQvLnRlc3QoY3VycmVudFByb3ApKSB7XG5cdFx0XHRcdFx0Y29uc3QgaW5kZXggPSBwYXJzZUludChjdXJyZW50UHJvcC5zbGljZSgxLCAtMSkpO1xuXHRcdFx0XHRcdGlmIChkYXRhW2luZGV4XSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXJjaFNjaGVtYShkYXRhW2luZGV4XSwgcHJvcHMuc2xpY2UoMSksIGZ1bGxQYXRoLCBpc0V4YWN0TWF0Y2gpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmIChwcm9wcy5sZW5ndGggPT09IDAgJiYgZGF0YS5ldmVyeShpdGVtID0+IHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGEubWFwKFN0cmluZyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBkYXRhLmZsYXRNYXAoaXRlbSA9PiBzZWFyY2hTY2hlbWEoaXRlbSwgcHJvcHMsIGZ1bGxQYXRoLCBpc0V4YWN0TWF0Y2gpKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgW2N1cnJlbnRQcm9wLCAuLi5yZW1haW5pbmdQcm9wc10gPSBwcm9wcztcblx0XHRcdFxuXHRcdFx0aWYgKCFjdXJyZW50UHJvcCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSByZXR1cm4gW2RhdGFdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIGRhdGEubmFtZSkge1xuXHRcdFx0XHRcdHJldHVybiBbZGF0YS5uYW1lXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KGN1cnJlbnRQcm9wKSkge1xuXHRcdFx0XHRyZXR1cm4gc2VhcmNoU2NoZW1hKGRhdGFbY3VycmVudFByb3BdLCByZW1haW5pbmdQcm9wcywgXG5cdFx0XHRcdFx0ZnVsbFBhdGggPyBgJHtmdWxsUGF0aH0uJHtjdXJyZW50UHJvcH1gIDogY3VycmVudFByb3AsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzRXhhY3RNYXRjaCkge1xuXHRcdFx0XHRjb25zdCBuZXN0ZWRSZXN1bHRzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhW2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXN1bHRzID0gc2VhcmNoU2NoZW1hKGRhdGFba2V5XSwgcHJvcHMsIFxuXHRcdFx0XHRcdFx0XHRmdWxsUGF0aCA/IGAke2Z1bGxQYXRofS4ke2tleX1gIDoga2V5LCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRuZXN0ZWRSZXN1bHRzLnB1c2goLi4ucmVzdWx0cyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuZXN0ZWRSZXN1bHRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gbmVzdGVkUmVzdWx0cztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRsZXQgcmVzdWx0cyA9IHNlYXJjaFNjaGVtYShzY2hlbWFPcmdEYXRhLCBwcm9wZXJ0eS5zcGxpdCgnLicpLCAnJywgdHJ1ZSk7XG5cdFx0XHRpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmVzdWx0cyA9IHNlYXJjaFNjaGVtYShzY2hlbWFPcmdEYXRhLCBwcm9wZXJ0eS5zcGxpdCgnLicpLCAnJywgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gcmVzdWx0cy5sZW5ndGggPiAwID8gcmVzdWx0cy5maWx0ZXIoQm9vbGVhbikuam9pbignLCAnKSA6IGRlZmF1bHRWYWx1ZTtcblx0XHRcdHJldHVybiB0aGlzLmRlY29kZUhUTUxFbnRpdGllcyhyZXN1bHQpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciBpbiBnZXRTY2hlbWFQcm9wZXJ0eSBmb3IgJHtwcm9wZXJ0eX06YCwgZXJyb3IpO1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZXh0cmFjdFNjaGVtYU9yZ0RhdGEoZG9jOiBEb2N1bWVudCk6IGFueSB7XG5cdFx0Y29uc3Qgc2NoZW1hU2NyaXB0cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKTtcblx0XHRjb25zdCBzY2hlbWFEYXRhOiBhbnlbXSA9IFtdO1xuXG5cdFx0c2NoZW1hU2NyaXB0cy5mb3JFYWNoKHNjcmlwdCA9PiB7XG5cdFx0XHRsZXQganNvbkNvbnRlbnQgPSBzY3JpcHQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGpzb25Db250ZW50ID0ganNvbkNvbnRlbnRcblx0XHRcdFx0XHQucmVwbGFjZSgvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3xeXFxzKlxcL1xcLy4qJC9nbSwgJycpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqPCFcXFtDREFUQVxcWyhbXFxzXFxTXSo/KVxcXVxcXT5cXHMqJC8sICckMScpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqKFxcKlxcL3xcXC9cXCopXFxzKnxcXHMqKFxcKlxcL3xcXC9cXCopXFxzKiQvZywgJycpXG5cdFx0XHRcdFx0LnRyaW0oKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0Y29uc3QganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25Db250ZW50KTtcblxuXHRcdFx0XHRpZiAoanNvbkRhdGFbJ0BncmFwaCddICYmIEFycmF5LmlzQXJyYXkoanNvbkRhdGFbJ0BncmFwaCddKSkge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaCguLi5qc29uRGF0YVsnQGdyYXBoJ10pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaChqc29uRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgc2NoZW1hLm9yZyBkYXRhOicsIGVycm9yKTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignUHJvYmxlbWF0aWMgSlNPTiBjb250ZW50OicsIGpzb25Db250ZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBzY2hlbWFEYXRhO1xuXHR9XG59IiwiaW1wb3J0IHsgTWV0YWRhdGFFeHRyYWN0b3IgfSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7IERlZnVkZGxlT3B0aW9ucywgRGVmdWRkbGVSZXNwb25zZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBFbnRyeSBwb2ludCBlbGVtZW50c1xuLy8gVGhlc2UgYXJlIHRoZSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgdXNlZCB0byBmaW5kIHRoZSBtYWluIGNvbnRlbnRcbmNvbnN0IEVOVFJZX1BPSU5UX0VMRU1FTlRTID0gW1xuXHQnYXJ0aWNsZScsXG5cdCdbcm9sZT1cImFydGljbGVcIl0nLFxuXHQnW2l0ZW1wcm9wPVwiYXJ0aWNsZUJvZHlcIl0nLFxuXHQnLnBvc3QtY29udGVudCcsXG5cdCcuYXJ0aWNsZS1jb250ZW50Jyxcblx0JyNhcnRpY2xlLWNvbnRlbnQnLFxuXHQnLmNvbnRlbnQtYXJ0aWNsZScsXG5cdCdtYWluJyxcblx0J1tyb2xlPVwibWFpblwiXScsXG5cdCdib2R5JyAvLyBlbnN1cmVzIHRoZXJlIGlzIGFsd2F5cyBhIG1hdGNoXG5dO1xuXG5jb25zdCBNT0JJTEVfV0lEVEggPSA2MDA7XG5jb25zdCBCTE9DS19FTEVNRU5UUyA9IFsnZGl2JywgJ3NlY3Rpb24nLCAnYXJ0aWNsZScsICdtYWluJ107XG5cbi8vIEhpZGRlbiBlbGVtZW50cyB0aGF0IHNob3VsZCBiZSByZW1vdmVkXG5jb25zdCBISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMgPSBbXG5cdCdbaGlkZGVuXScsXG5cdCdbYXJpYS1oaWRkZW49XCJ0cnVlXCJdJyxcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nLCBjYXVzZXMgcHJvYmxlbXMgZm9yIG1hdGggZm9ybXVsYXNcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXScsXG5cdCdbc3R5bGUqPVwidmlzaWJpbGl0eTogaGlkZGVuXCJdJyxcblx0J1tzdHlsZSo9XCJ2aXNpYmlsaXR5OmhpZGRlblwiXScsXG5cdCcuaGlkZGVuJyxcblx0Jy5pbnZpc2libGUnXG5dLmpvaW4oJywnKTtcblxuLy8gU2VsZWN0b3JzIHRvIGJlIHJlbW92ZWRcbi8vIENhc2UgaW5zZW5zaXRpdmUsIGJ1dCBtYXRjaGVzIG11c3QgYmUgZXhhY3RcbmNvbnN0IEVYQUNUX1NFTEVDVE9SUyA9IFtcblx0Jy5hZCcsXG5cdCdhc2lkZScsXG5cdCdidXR0b24nLFxuXHQnY2FudmFzJyxcblx0JyNjb21tZW50cycsXG5cdCdkaWFsb2cnLFxuXHQnZmllbGRzZXQnLFxuXHQnZm9vdGVyJyxcblx0J2Zvcm0nLFxuXHQnaGVhZGVyJyxcblx0JyNoZWFkZXInLFxuXHQnaW5wdXQnLFxuXHQnaWZyYW1lJyxcblx0J2xhYmVsJyxcblx0J2xpbmsnLFxuXHQnLmxvZ28nLFxuXHQnI2xvZ28nLFxuXHQnLm1ldGEnLFxuXHQnbmF2Jyxcblx0JyNuZXdzbGV0dGVyJyxcblx0J25vc2NyaXB0Jyxcblx0Jy5ub3ByaW50Jyxcblx0J29wdGlvbicsXG5cdCcucHJvbW8nLFxuXHQnc2NyaXB0Jyxcblx0J3NlbGVjdCcsXG5cdCdzaWRlYmFyJyxcblx0Jy5zaWRlYmFyJyxcblx0JyNzaWRlYmFyJyxcblx0JyNzaXRlU3ViJyxcblx0J3N0eWxlJyxcblx0J3RpbWUnLFxuXHQnI3RpdGxlJyxcblx0JyN0b2MnLFxuXHQnLnRvYycsXG5cdCd0ZXh0YXJlYScsXG5cdCcuY2xpY2thYmxlLWljb24nLFxuXHQnYVtocmVmXj1cIiNcIl1bY2xhc3MqPVwiYW5jaG9yXCJdJyxcblx0J1tkYXRhLWxpbmstbmFtZSo9XCJza2lwXCJdJyxcblx0J1tkYXRhLXByaW50LWxheW91dD1cImhpZGVcIl0nLFxuXHQnW2RhdGEtY29udGFpbmVyKj1cIm1vc3Qtdmlld2VkXCJdJyxcblx0J1tzcmMqPVwiYXV0aG9yXCJdJyxcblx0J1tocmVmPVwiI3NpdGUtY29udGVudFwiXScsXG5cdCdbY2xhc3NePVwiYWQtXCJdJyxcblx0J1tjbGFzcyQ9XCItYWRcIl0nLFxuXHQnW2lkXj1cImFkLVwiXScsXG5cdCdbaWQkPVwiLWFkXCJdJyxcblx0J1tyb2xlPVwiYmFubmVyXCJdJyxcblx0J1tyb2xlPVwiYnV0dG9uXCJdJyxcblx0J1tyb2xlPVwiZGlhbG9nXCJdJyxcblx0J1tyb2xlPVwiY29tcGxlbWVudGFyeVwiXScsXG5cdCdbcm9sZT1cIm5hdmlnYXRpb25cIl0nXG5dO1xuXG4vLyBSZW1vdmFsIHBhdHRlcm5zIHRlc3RlZCBhZ2FpbnN0IGF0dHJpYnV0ZXM6IGNsYXNzLCBpZCwgZGF0YS10ZXN0aWQsIGFuZCBkYXRhLXFhXG4vLyBDYXNlIGluc2Vuc2l0aXZlLCBwYXJ0aWFsIG1hdGNoZXMgYWxsb3dlZFxuY29uc3QgUEFSVElBTF9TRUxFQ1RPUlMgPSBbXG5cdCdhY2Nlc3Mtd2FsbCcsXG5cdCdhY3Rpdml0eXB1YicsXG5cdCdhcHBlbmRpeCcsXG5cdCdhdmF0YXInLFxuXHQnYWR2ZXJ0Jyxcblx0Jy1hZC0nLFxuXHQnX2FkXycsXG5cdCdhcm91bmQtdGhlLXdlYicsXG5cdCdhcnRpY2xlX19jb3B5Jyxcblx0J2FydGljbGUtZW5kICcsXG5cdCdhcnRpY2xlX2hlYWRlcicsXG5cdCdhcnRpY2xlX19oZWFkZXInLFxuXHQnYXJ0aWNsZV9faW5mbycsXG5cdCdhcnRpY2xlX19tZXRhJyxcblx0J2FydGljbGUtdGl0bGUnLFxuXHQnYXJ0aWNsZXRvcGljcycsXG5cdCdhcnRpY2xlLXRvcGljcycsXG5cdCdhcnRpY2xlLS1sZWRlJywgLy8gVGhlIFZlcmdlXG5cdCdhdXRob3InLFxuXHQnYmFubmVyJyxcblx0J2JvdHRvbS1vZi1hcnRpY2xlJyxcblx0J2JyYW5kLWJhcicsXG5cdCdicmVhZGNydW1iJyxcblx0J2J1dHRvbi13cmFwcGVyJyxcblx0J2J0bi0nLFxuXHQnLWJ0bicsXG5cdCdieWxpbmUnLFxuXHQnY2F0X2hlYWRlcicsXG5cdCdjYXRsaW5rcycsXG5cdCdjb2xsZWN0aW9ucycsXG5cdCdjb21tZW50cycsXG5cdCdjb21tZW50LWNvdW50Jyxcblx0J2NvbW1lbnQtY29udGVudCcsXG5cdCdjb21tZW50LWZvcm0nLFxuXHQnY29tbWVudC1yZXNwb25kJyxcblx0J2NvbW1lbnQtdGhyZWFkJyxcblx0J2NvbXBsZW1lbnRhcnknLFxuXHQnY29udGVudC1jYXJkJywgLy8gVGhlIFZlcmdlXG5cdCdjb3JlLWNvbGxhdGVyYWwnLFxuXHQnX2N0YScsXG5cdCctY3RhJyxcblx0J2N0YS0nLFxuXHQnY3RhXycsXG5cdCdjdXJyZW50LWlzc3VlJywgLy8gVGhlIE5hdGlvblxuXHQnZGF0ZWhlYWRlcicsXG5cdCdkaWFsb2cnLFxuXHQnZGlzY2xvc3VyZScsXG5cdCdkaXNjdXNzaW9uJyxcblx0J2Rpc3F1cycsXG5cdCdkb25hdGUnLFxuXHQnZHJvcGRvd24nLCAvLyBBcnMgVGVjaG5pY2Fcblx0J2VsZXR0ZXJzJyxcblx0J2V5ZWJyb3cnLFxuXHQnZXhwYW5kLXJlZHVjZScsXG5cdCdmYWNlYm9vaycsXG5cdCdmYXZvcml0ZScsXG5cdCdmZWVkYmFjaycsXG5cdCdmaXhlZCcsXG5cdCdmb2xsb3cnLFxuXHQnZm9vdGVyJyxcblx0J2Zvci15b3UnLFxuXHQnZnJvbnRtYXR0ZXInLFxuLy9cdCdnbG9iYWwnLFxuXHQnZ29vZ2xlJyxcblx0J2dvb2ctJyxcblx0J2hlYWRlci1sb2dvJyxcblx0J2hlYWRlci1wYXR0ZXJuJywgLy8gVGhlIFZlcmdlXG5cdCdoaWRlLXByaW50Jyxcblx0J2ludGVybHVkZScsXG5cdCdpbnRlcmFjdGlvbicsXG5cdCdraWNrZXInLFxuXHQnLWxhYmVscycsXG5cdCdsYXRlc3QtY29udGVudCcsXG5cdCctbGVkZXMtJywgLy8gVGhlIFZlcmdlXG5cdCctbGljZW5zZScsXG5cdCdsaW5rLWJveCcsXG5cdCdsaXN0aW5nLWR5bmFtaWMtdGVybXMnLCAvLyBCb3N0b24gUmV2aWV3XG5cdCdsb2FkaW5nJyxcblx0J2xvYS1pbmZvJyxcblx0J2xvZ29fY29udGFpbmVyJyxcblx0J21hcmtldGluZycsXG5cdCdtZWRpYS1pbnF1aXJ5Jyxcblx0J21lbnUtJyxcblx0J21ldGEtJyxcblx0J21ldGFkYXRhJyxcblx0J21pZ2h0LWxpa2UnLFxuXHQnbW9yZS0nLFxuXHQnbXctZWRpdHNlY3Rpb24nLFxuXHQnbXctanVtcC1saW5rJyxcblx0J25hdi0nLFxuXHQnbmF2YmFyJyxcblx0J25hdmlnYXRpb24nLFxuXHQnbmV4dC0nLFxuXHQnbmV3cy1zdG9yeS10aXRsZScsXG4vL1x0J25ld3NsZXR0ZXInLCB1c2VkIG9uIFN1YnN0YWNrXG5cdCduZXdzbGV0dGVyXycsXG5cdCduZXdzbGV0dGVyLXNpZ251cCcsXG5cdCduZXdzbGV0dGVyc2lnbnVwJyxcblx0J25ld3NsZXR0ZXJ3cmFwcGVyJyxcblx0J25vdC1mb3VuZCcsXG5cdCdvcmlnaW5hbGx5LXB1Ymxpc2hlZCcsIC8vIE1lcmN1cnkgTmV3c1xuXHQnb3ZlcmxheScsXG5cdCdwYWdlLXRpdGxlJyxcblx0Jy1wYXJ0bmVycycsXG5cdCdwZW5jcmFmdCcsIC8vIFN1YnN0YWNrXG5cdCdwbGVhJyxcblx0J3BvcHVsYXInLFxuXHQncG9wdXAnLFxuXHQncG9wLXVwJyxcblx0J3Bvc3QtYm90dG9tJyxcblx0J3Bvc3RfX2NhdGVnb3J5Jyxcblx0J3Bvc3Rjb21tZW50Jyxcblx0J3Bvc3RkYXRlJyxcblx0J3Bvc3QtZGF0ZScsXG5cdCdwb3N0X2RhdGUnLFxuXHQncG9zdGluZm8nLFxuXHQncG9zdC1pbmZvJyxcblx0J3Bvc3RfaW5mbycsXG5cdCdwb3N0LWxpbmtzJyxcblx0J3Bvc3QtbWV0YScsXG5cdCdwb3N0bWV0YScsXG5cdCdwb3N0c25pcHBldCcsXG5cdCdwb3N0X3NuaXBwZXQnLFxuXHQncG9zdC1zbmlwcGV0Jyxcblx0J3Bvc3R0aXRsZScsXG5cdCdwb3N0LXRpdGxlJyxcblx0J3Bvc3RfdGl0bGUnLFxuXHQncG9zdHRheCcsXG5cdCdwb3N0LXRheCcsXG5cdCdwb3N0X3RheCcsXG5cdCdwb3N0X3RhZycsXG5cdCdwb3N0LXRhZycsXG4vL1x0J3ByZXZpZXcnLCB1c2VkIG9uIE9ic2lkaWFuIFB1Ymxpc2hcblx0J3ByZXZuZXh0Jyxcblx0J3ByaW50LW5vbmUnLFxuXHQncHJvZmlsZScsXG4vL1x0J3Byb21vJyxcblx0J3B1YmRhdGUnLFxuXHQncHViX2RhdGUnLFxuXHQncHViLWRhdGUnLFxuXHQncHVibGljYXRpb24tZGF0ZScsXG5cdCdwdWJsaWNhdGlvbk5hbWUnLCAvLyBNZWRpdW1cblx0J3FyLWNvZGUnLFxuXHQncXJfY29kZScsXG5cdCdyZWFkbW9yZScsXG5cdCdyZWFkLW5leHQnLFxuXHQncmVhZF9uZXh0Jyxcblx0J3JlYWRfdGltZScsXG5cdCdyZWFkLXRpbWUnLFxuXHQncmVhZGluZ190aW1lJyxcblx0J3JlYWRpbmctdGltZScsXG5cdCdyZWFkaW5nLWxpc3QnLFxuXHQncmVjb21tZW5kJyxcblx0J3JlY2lyYycsXG5cdCdyZWdpc3RlcicsXG5cdCdyZWxhdGVkJyxcblx0J3NjcmVlbi1yZWFkZXItdGV4dCcsXG4vL1x0J3NoYXJlJyxcblx0Jy1zaGFyZScsXG5cdCdzaGFyZS1pY29ucycsXG5cdCdzaGFyZS1zZWN0aW9uJyxcblx0J3NpZGViYXJ0aXRsZScsXG5cdCdzaW1pbGFyLScsXG5cdCdzaW1pbGFyXycsXG5cdCdzaXRlLWluZGV4Jyxcblx0J3NpdGUtaGVhZGVyJyxcblx0J3NpdGUtbG9nbycsXG5cdCdzaXRlLW5hbWUnLFxuLy9cdCdza2lwLScsXG5cdCdzb2NpYWwnLFxuXHQnc3BlZWNoaWZ5LWlnbm9yZScsXG5cdCdzcG9uc29yJyxcbi8vXHQnLXN0YXRzJyxcblx0J19zdGF0cycsXG5cdCdzdG9yeXJlYWR0aW1lJywgLy8gTWVkaXVtXG5cdCdzdG9yeXB1Ymxpc2hkYXRlJywgLy8gTWVkaXVtXG5cdCdzdWJzY3JpYmUnLFxuXHQnX3RhZ3MnLFxuXHQndGFnc19faXRlbScsXG5cdCd0YWdfbGlzdCcsXG5cdCd0YXhvbm9teScsXG5cdCd0YWJsZS1vZi1jb250ZW50cycsXG5cdCd0YWJzLScsXG4vL1x0J3RlYXNlcicsIE5hdHVyZVxuXHQndGVybWluYWx0b3V0Jyxcblx0J3RpbWUtcnVicmljJyxcblx0J3RpbWVzdGFtcCcsXG5cdCd0aXBfb2ZmJyxcblx0J3RpcHRvdXQnLFxuXHQnLXRvYycsXG5cdCd0b3BpYy1saXN0Jyxcblx0J3Rvb2xiYXInLFxuXHQndG9vbHRpcCcsXG5cdCd0b3Atd3JhcHBlcicsXG5cdCd0cmVlLWl0ZW0nLFxuXHQndHJlbmRpbmcnLFxuXHQndHJ1c3QtZmVhdCcsXG5cdCd0d2l0dGVyJ1xuXTtcblxuLy8gRWxlbWVudHMgdGhhdCBhcmUgYWxsb3dlZCB0byBiZSBlbXB0eVxuLy8gVGhlc2UgYXJlIG5vdCByZW1vdmVkIGV2ZW4gaWYgdGhleSBoYXZlIG5vIGNvbnRlbnRcbmNvbnN0IEFMTE9XRURfRU1QVFlfRUxFTUVOVFMgPSBuZXcgU2V0KFtcblx0J2FyZWEnLFxuXHQnYXVkaW8nLFxuXHQnYmFzZScsXG5cdCdicicsXG5cdCdjaXJjbGUnLFxuXHQnY29sJyxcblx0J2RlZnMnLFxuXHQnZWxsaXBzZScsXG5cdCdlbWJlZCcsXG5cdCdmaWd1cmUnLFxuXHQnZycsXG5cdCdocicsXG5cdCdpZnJhbWUnLFxuXHQnaW1nJyxcblx0J2lucHV0Jyxcblx0J2xpbmUnLFxuXHQnbGluaycsXG5cdCdtYXNrJyxcblx0J21ldGEnLFxuXHQnb2JqZWN0Jyxcblx0J3BhcmFtJyxcblx0J3BhdGgnLFxuXHQncGF0dGVybicsXG5cdCdwaWN0dXJlJyxcblx0J3BvbHlnb24nLFxuXHQncG9seWxpbmUnLFxuXHQncmVjdCcsXG5cdCdzb3VyY2UnLFxuXHQnc3RvcCcsXG5cdCdzdmcnLFxuXHQndGQnLFxuXHQndGgnLFxuXHQndHJhY2snLFxuXHQndXNlJyxcblx0J3ZpZGVvJyxcblx0J3dicidcbl0pO1xuXG4vLyBBdHRyaWJ1dGVzIHRvIGtlZXBcbmNvbnN0IEFMTE9XRURfQVRUUklCVVRFUyA9IG5ldyBTZXQoW1xuXHQnYWx0Jyxcblx0J2FyaWEtbGFiZWwnLFxuXHQnY2xhc3MnLFxuXHQnY29sc3BhbicsXG5cdCdkYXRhLXNyYycsXG5cdCdkYXRhLXNyY3NldCcsXG5cdCdkaXInLFxuXHQnaGVhZGVycycsXG5cdCdoZWlnaHQnLFxuXHQnaHJlZicsXG5cdCdpZCcsXG5cdCdsYW5nJyxcblx0J3JvbGUnLFxuXHQncm93c3BhbicsXG5cdCdzcmMnLFxuXHQnc3Jjc2V0Jyxcblx0J3RpdGxlJyxcblx0J3dpZHRoJ1xuXSk7XG5cbmludGVyZmFjZSBDb250ZW50U2NvcmUge1xuXHRzY29yZTogbnVtYmVyO1xuXHRlbGVtZW50OiBFbGVtZW50O1xufVxuXG5pbnRlcmZhY2UgU3R5bGVDaGFuZ2Uge1xuXHRzZWxlY3Rvcjogc3RyaW5nO1xuXHRzdHlsZXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlZnVkZGxlIHtcblx0cHJpdmF0ZSBkb2M6IERvY3VtZW50O1xuXHRwcml2YXRlIG9wdGlvbnM6IERlZnVkZGxlT3B0aW9ucztcblx0cHJpdmF0ZSBkZWJ1ZzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IERlZnVkZGxlIGluc3RhbmNlXG5cdCAqIEBwYXJhbSBkb2MgLSBUaGUgZG9jdW1lbnQgdG8gcGFyc2Vcblx0ICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciBwYXJzaW5nXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihkb2M6IERvY3VtZW50LCBvcHRpb25zOiBEZWZ1ZGRsZU9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuZG9jID0gZG9jO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWcgfHwgZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgdGhlIGRvY3VtZW50IGFuZCBleHRyYWN0IGl0cyBtYWluIGNvbnRlbnRcblx0ICovXG5cdHBhcnNlKCk6IERlZnVkZGxlUmVzcG9uc2Uge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBFdmFsdWF0ZSBzdHlsZXMgYW5kIHNpemVzIG9uIG9yaWdpbmFsIGRvY3VtZW50XG5cdFx0XHRjb25zdCBtb2JpbGVTdHlsZXMgPSB0aGlzLl9ldmFsdWF0ZU1lZGlhUXVlcmllcyh0aGlzLmRvYyk7XG5cdFx0XHRjb25zdCBzbWFsbEltYWdlcyA9IHRoaXMuZmluZFNtYWxsSW1hZ2VzKHRoaXMuZG9jKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ2xvbmUgYWZ0ZXIgZXZhbHVhdGlvblxuXHRcdFx0Y29uc3QgY2xvbmUgPSB0aGlzLmRvYy5jbG9uZU5vZGUodHJ1ZSkgYXMgRG9jdW1lbnQ7XG5cdFx0XHRjb25zdCBzY2hlbWFPcmdEYXRhID0gTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdFNjaGVtYU9yZ0RhdGEodGhpcy5kb2MpO1xuXG5cdFx0XHQvLyBBcHBseSBtb2JpbGUgc3R5bGUgdG8gY2xvbmVcblx0XHRcdHRoaXMuYXBwbHlNb2JpbGVTdHlsZXMoY2xvbmUsIG1vYmlsZVN0eWxlcyk7XG5cblx0XHRcdC8vIEZpbmQgbWFpbiBjb250ZW50XG5cdFx0XHRjb25zdCBtYWluQ29udGVudCA9IHRoaXMuZmluZE1haW5Db250ZW50KGNsb25lKTtcblx0XHRcdGlmICghbWFpbkNvbnRlbnQpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRjb250ZW50OiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTCxcblx0XHRcdFx0XHQuLi5NZXRhZGF0YUV4dHJhY3Rvci5leHRyYWN0KHRoaXMuZG9jLCBzY2hlbWFPcmdEYXRhKVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgc21hbGwgaW1hZ2VzIGlkZW50aWZpZWQgZnJvbSBvcmlnaW5hbCBkb2N1bWVudFxuXHRcdFx0dGhpcy5yZW1vdmVTbWFsbEltYWdlcyhjbG9uZSwgc21hbGxJbWFnZXMpO1xuXHRcdFx0XG5cdFx0XHQvLyBQZXJmb3JtIG90aGVyIGRlc3RydWN0aXZlIG9wZXJhdGlvbnMgb24gdGhlIGNsb25lXG5cdFx0XHR0aGlzLnJlbW92ZUhpZGRlbkVsZW1lbnRzKGNsb25lKTtcblx0XHRcdHRoaXMucmVtb3ZlQ2x1dHRlcihjbG9uZSk7XG5cblx0XHRcdC8vIENsZWFuIHVwIHRoZSBtYWluIGNvbnRlbnRcblx0XHRcdHRoaXMuY2xlYW5Db250ZW50KG1haW5Db250ZW50KTtcblxuXHRcdFx0Y29uc3QgbWV0YWRhdGEgPSBNZXRhZGF0YUV4dHJhY3Rvci5leHRyYWN0KHRoaXMuZG9jLCBzY2hlbWFPcmdEYXRhKTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y29udGVudDogbWFpbkNvbnRlbnQgPyBtYWluQ29udGVudC5vdXRlckhUTUwgOiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTCxcblx0XHRcdFx0Li4ubWV0YWRhdGFcblx0XHRcdH07XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlJywgJ0Vycm9yIHByb2Nlc3NpbmcgZG9jdW1lbnQ6JywgZXJyb3IpO1xuXHRcdFx0Y29uc3Qgc2NoZW1hT3JnRGF0YSA9IE1ldGFkYXRhRXh0cmFjdG9yLmV4dHJhY3RTY2hlbWFPcmdEYXRhKHRoaXMuZG9jKTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvbnRlbnQ6IHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MLFxuXHRcdFx0XHQuLi5NZXRhZGF0YUV4dHJhY3Rvci5leHRyYWN0KHRoaXMuZG9jLCBzY2hlbWFPcmdEYXRhKVxuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHQvLyBNYWtlIGFsbCBvdGhlciBtZXRob2RzIHByaXZhdGUgYnkgcmVtb3ZpbmcgdGhlIHN0YXRpYyBrZXl3b3JkIGFuZCB1c2luZyBwcml2YXRlXG5cdHByaXZhdGUgX2xvZyguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnRGVmdWRkbGU6JywgLi4uYXJncyk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZXZhbHVhdGVNZWRpYVF1ZXJpZXMoZG9jOiBEb2N1bWVudCk6IFN0eWxlQ2hhbmdlW10ge1xuXHRcdGNvbnN0IG1vYmlsZVN0eWxlczogU3R5bGVDaGFuZ2VbXSA9IFtdO1xuXHRcdGNvbnN0IG1heFdpZHRoUmVnZXggPSAvbWF4LXdpZHRoW146XSo6XFxzKihcXGQrKS87XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gR2V0IGFsbCBzdHlsZXMsIGluY2x1ZGluZyBpbmxpbmUgc3R5bGVzXG5cdFx0XHRjb25zdCBzaGVldHMgPSBBcnJheS5mcm9tKGRvYy5zdHlsZVNoZWV0cykuZmlsdGVyKHNoZWV0ID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBBY2Nlc3MgcnVsZXMgb25jZSB0byBjaGVjayB2YWxpZGl0eVxuXHRcdFx0XHRcdHNoZWV0LmNzc1J1bGVzO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Ly8gRXhwZWN0ZWQgZXJyb3IgZm9yIGNyb3NzLW9yaWdpbiBzdHlsZXNoZWV0c1xuXHRcdFx0XHRcdGlmIChlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGUubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvLyBQcm9jZXNzIGFsbCBzaGVldHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdFx0Y29uc3QgbWVkaWFSdWxlcyA9IHNoZWV0cy5mbGF0TWFwKHNoZWV0ID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXR1cm4gQXJyYXkuZnJvbShzaGVldC5jc3NSdWxlcylcblx0XHRcdFx0XHRcdC5maWx0ZXIoKHJ1bGUpOiBydWxlIGlzIENTU01lZGlhUnVsZSA9PiBcblx0XHRcdFx0XHRcdFx0cnVsZSBpbnN0YW5jZW9mIENTU01lZGlhUnVsZSAmJlxuXHRcdFx0XHRcdFx0XHRydWxlLmNvbmRpdGlvblRleHQuaW5jbHVkZXMoJ21heC13aWR0aCcpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIHN0eWxlc2hlZXQ6JywgZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFByb2Nlc3MgYWxsIG1lZGlhIHJ1bGVzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRcdG1lZGlhUnVsZXMuZm9yRWFjaChydWxlID0+IHtcblx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBydWxlLmNvbmRpdGlvblRleHQubWF0Y2gobWF4V2lkdGhSZWdleCk7XG5cdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdGNvbnN0IG1heFdpZHRoID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChNT0JJTEVfV0lEVEggPD0gbWF4V2lkdGgpIHtcblx0XHRcdFx0XHRcdC8vIEJhdGNoIHByb2Nlc3MgYWxsIHN0eWxlIHJ1bGVzXG5cdFx0XHRcdFx0XHRjb25zdCBzdHlsZVJ1bGVzID0gQXJyYXkuZnJvbShydWxlLmNzc1J1bGVzKVxuXHRcdFx0XHRcdFx0XHQuZmlsdGVyKChyKTogciBpcyBDU1NTdHlsZVJ1bGUgPT4gciBpbnN0YW5jZW9mIENTU1N0eWxlUnVsZSk7XG5cblx0XHRcdFx0XHRcdHN0eWxlUnVsZXMuZm9yRWFjaChjc3NSdWxlID0+IHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRtb2JpbGVTdHlsZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RvcjogY3NzUnVsZS5zZWxlY3RvclRleHQsXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZXM6IGNzc1J1bGUuc3R5bGUuY3NzVGV4dFxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIENTUyBydWxlOicsIGUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZTogRXJyb3IgZXZhbHVhdGluZyBtZWRpYSBxdWVyaWVzOicsIGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb2JpbGVTdHlsZXM7XG5cdH1cblxuXHRwcml2YXRlIGFwcGx5TW9iaWxlU3R5bGVzKGRvYzogRG9jdW1lbnQsIG1vYmlsZVN0eWxlczogU3R5bGVDaGFuZ2VbXSkge1xuXHRcdGxldCBhcHBsaWVkQ291bnQgPSAwO1xuXG5cdFx0bW9iaWxlU3R5bGVzLmZvckVhY2goKHtzZWxlY3Rvciwgc3R5bGVzfSkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRcdGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXG5cdFx0XHRcdFx0XHQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJycpICsgc3R5bGVzXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRhcHBsaWVkQ291bnQrKztcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlJywgJ0Vycm9yIGFwcGx5aW5nIHN0eWxlcyBmb3Igc2VsZWN0b3I6Jywgc2VsZWN0b3IsIGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUhpZGRlbkVsZW1lbnRzKGRvYzogRG9jdW1lbnQpIHtcblx0XHRsZXQgY291bnQgPSAwO1xuXHRcdGNvbnN0IGVsZW1lbnRzVG9SZW1vdmUgPSBuZXcgU2V0PEVsZW1lbnQ+KCk7XG5cblx0XHQvLyBGaXJzdCBwYXNzOiBHZXQgYWxsIGVsZW1lbnRzIG1hdGNoaW5nIGhpZGRlbiBzZWxlY3RvcnNcblx0XHRjb25zdCBoaWRkZW5FbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKEhJRERFTl9FTEVNRU5UX1NFTEVDVE9SUyk7XG5cdFx0aGlkZGVuRWxlbWVudHMuZm9yRWFjaChlbCA9PiBlbGVtZW50c1RvUmVtb3ZlLmFkZChlbCkpO1xuXHRcdGNvdW50ICs9IGhpZGRlbkVsZW1lbnRzLmxlbmd0aDtcblxuXHRcdC8vIFNlY29uZCBwYXNzOiBVc2UgVHJlZVdhbGtlciBmb3IgZWZmaWNpZW50IHRyYXZlcnNhbFxuXHRcdGNvbnN0IHRyZWVXYWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKFxuXHRcdFx0ZG9jLmJvZHksXG5cdFx0XHROb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCxcblx0XHRcdHtcblx0XHRcdFx0YWNjZXB0Tm9kZTogKG5vZGU6IEVsZW1lbnQpID0+IHtcblx0XHRcdFx0XHQvLyBTa2lwIGVsZW1lbnRzIGFscmVhZHkgbWFya2VkIGZvciByZW1vdmFsXG5cdFx0XHRcdFx0aWYgKGVsZW1lbnRzVG9SZW1vdmUuaGFzKG5vZGUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdC8vIEJhdGNoIHN0eWxlIGNvbXB1dGF0aW9uc1xuXHRcdGNvbnN0IGVsZW1lbnRzOiBFbGVtZW50W10gPSBbXTtcblx0XHRsZXQgY3VycmVudE5vZGU6IEVsZW1lbnQgfCBudWxsO1xuXHRcdHdoaWxlIChjdXJyZW50Tm9kZSA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSBhcyBFbGVtZW50KSB7XG5cdFx0XHRlbGVtZW50cy5wdXNoKGN1cnJlbnROb2RlKTtcblx0XHR9XG5cblx0XHQvLyBQcm9jZXNzIHN0eWxlcyBpbiBiYXRjaGVzIHRvIG1pbmltaXplIGxheW91dCB0aHJhc2hpbmdcblx0XHRjb25zdCBCQVRDSF9TSVpFID0gMTAwO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcblx0XHRcdGNvbnN0IGJhdGNoID0gZWxlbWVudHMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuXHRcdFx0XG5cdFx0XHQvLyBSZWFkIHBoYXNlIC0gZ2F0aGVyIGFsbCBjb21wdXRlZFN0eWxlc1xuXHRcdFx0Y29uc3Qgc3R5bGVzID0gYmF0Y2gubWFwKGVsID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKSk7XG5cdFx0XHRcblx0XHRcdC8vIFdyaXRlIHBoYXNlIC0gbWFyayBlbGVtZW50cyBmb3IgcmVtb3ZhbFxuXHRcdFx0YmF0Y2guZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcblx0XHRcdFx0Y29uc3QgY29tcHV0ZWRTdHlsZSA9IHN0eWxlc1tpbmRleF07XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLmRpc3BsYXkgPT09ICdub25lJyB8fFxuXHRcdFx0XHRcdGNvbXB1dGVkU3R5bGUudmlzaWJpbGl0eSA9PT0gJ2hpZGRlbicgfHxcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLm9wYWNpdHkgPT09ICcwJ1xuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRlbGVtZW50c1RvUmVtb3ZlLmFkZChlbGVtZW50KTtcblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBGaW5hbCBwYXNzOiBCYXRjaCByZW1vdmUgYWxsIGhpZGRlbiBlbGVtZW50c1xuXHRcdGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgaGlkZGVuIGVsZW1lbnRzOicsIGNvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlQ2x1dHRlcihkb2M6IERvY3VtZW50KSB7XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0bGV0IGV4YWN0U2VsZWN0b3JDb3VudCA9IDA7XG5cdFx0bGV0IHBhcnRpYWxTZWxlY3RvckNvdW50ID0gMDtcblxuXHRcdC8vIENvbWJpbmUgYWxsIGV4YWN0IHNlbGVjdG9ycyBpbnRvIGEgc2luZ2xlIHNlbGVjdG9yIHN0cmluZ1xuXHRcdGNvbnN0IGNvbWJpbmVkRXhhY3RTZWxlY3RvciA9IEVYQUNUX1NFTEVDVE9SUy5qb2luKCcsJyk7XG5cdFx0XG5cdFx0Ly8gRmlyc3QgcGFzczogUmVtb3ZlIGVsZW1lbnRzIG1hdGNoaW5nIGV4YWN0IHNlbGVjdG9yc1xuXHRcdGNvbnN0IGV4YWN0RWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChjb21iaW5lZEV4YWN0U2VsZWN0b3IpO1xuXHRcdGlmIChleGFjdEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdC8vIEJhdGNoIHJlbW92ZSBlbGVtZW50c1xuXHRcdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRleGFjdEVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0XHRpZiAoZWw/LnBhcmVudE5vZGUpIHtcblx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChlbCk7XG5cdFx0XHRcdFx0ZXhhY3RTZWxlY3RvckNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIFNlY29uZCBwYXNzOiBIYW5kbGUgcGFydGlhbCBzZWxlY3RvcnNcblx0XHQvLyBQcmUtY29tcGlsZSByZWdleGVzIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2Vcblx0XHRjb25zdCBwYXJ0aWFsUmVnZXhlcyA9IFBBUlRJQUxfU0VMRUNUT1JTLm1hcChwYXR0ZXJuID0+ICh7XG5cdFx0XHRwYXR0ZXJuLFxuXHRcdFx0cmVnZXg6IG5ldyBSZWdFeHAocGF0dGVybiwgJ2knKVxuXHRcdH0pKTtcblxuXHRcdC8vIENyZWF0ZSBhbiBlZmZpY2llbnQgbG9va3VwIGZvciBwYXJ0aWFsIG1hdGNoZXNcblx0XHRjb25zdCBzaG91bGRSZW1vdmVFbGVtZW50ID0gKGVsOiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHQvLyBHZXQgYWxsIHJlbGV2YW50IGF0dHJpYnV0ZXMgb25jZVxuXHRcdFx0Y29uc3QgY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICYmIHR5cGVvZiBlbC5jbGFzc05hbWUgPT09ICdzdHJpbmcnID8gXG5cdFx0XHRcdGVsLmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdFx0XHRjb25zdCBpZCA9IGVsLmlkID8gZWwuaWQudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHRcdFx0Y29uc3QgdGVzdElkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRlc3RpZCcpPy50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0Y29uc3QgdGVzdFFhID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXFhJyk/LnRvTG93ZXJDYXNlKCkgfHwgJyc7XG5cdFx0XHRjb25zdCB0ZXN0Q3kgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3knKT8udG9Mb3dlckNhc2UoKSB8fCAnJztcblxuXHRcdFx0Ly8gQ29tYmluZSBhdHRyaWJ1dGVzIGZvciBzaW5nbGUtcGFzcyBjaGVja2luZ1xuXHRcdFx0Y29uc3QgYXR0cmlidXRlVGV4dCA9IGAke2NsYXNzTmFtZX0gJHtpZH0gJHt0ZXN0SWR9ICR7dGVzdFFhfSAke3Rlc3RDeX1gO1xuXHRcdFx0XG5cdFx0XHQvLyBFYXJseSByZXR1cm4gaWYgbm8gY29udGVudCB0byBjaGVja1xuXHRcdFx0aWYgKCFhdHRyaWJ1dGVUZXh0LnRyaW0oKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVzZSBzb21lKCkgZm9yIGVhcmx5IHRlcm1pbmF0aW9uXG5cdFx0XHRyZXR1cm4gcGFydGlhbFJlZ2V4ZXMuc29tZSgoeyByZWdleCB9KSA9PiByZWdleC50ZXN0KGF0dHJpYnV0ZVRleHQpKTtcblx0XHR9O1xuXG5cdFx0Ly8gUHJvY2VzcyBlbGVtZW50cyBpbiBiYXRjaGVzIHRvIGF2b2lkIGxvbmcgdGFza3Ncblx0XHRjb25zdCBCQVRDSF9TSVpFID0gMTAwO1xuXHRcdGNvbnN0IGFsbEVsZW1lbnRzID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbCgnW2NsYXNzXSwgW2lkXSwgW2RhdGEtdGVzdGlkXSwgW2RhdGEtcWFdLCBbZGF0YS1jeV0nKSk7XG5cdFx0XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhbGxFbGVtZW50cy5sZW5ndGg7IGkgKz0gQkFUQ0hfU0laRSkge1xuXHRcdFx0Y29uc3QgYmF0Y2ggPSBhbGxFbGVtZW50cy5zbGljZShpLCBpICsgQkFUQ0hfU0laRSk7XG5cdFx0XHRjb25zdCBlbGVtZW50c1RvUmVtb3ZlOiBFbGVtZW50W10gPSBbXTtcblxuXHRcdFx0Ly8gUmVhZCBwaGFzZSAtIGlkZW50aWZ5IGVsZW1lbnRzIHRvIHJlbW92ZVxuXHRcdFx0YmF0Y2guZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdGlmIChzaG91bGRSZW1vdmVFbGVtZW50KGVsKSkge1xuXHRcdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUucHVzaChlbCk7XG5cdFx0XHRcdFx0cGFydGlhbFNlbGVjdG9yQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFdyaXRlIHBoYXNlIC0gYmF0Y2ggcmVtb3ZlIGVsZW1lbnRzXG5cdFx0XHRpZiAoZWxlbWVudHNUb1JlbW92ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHRlbGVtZW50c1RvUmVtb3ZlLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0XHRcdGlmIChlbD8ucGFyZW50Tm9kZSkge1xuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuX2xvZygnRm91bmQgY2x1dHRlciBlbGVtZW50czonLCB7XG5cdFx0XHRleGFjdFNlbGVjdG9yczogZXhhY3RTZWxlY3RvckNvdW50LFxuXHRcdFx0cGFydGlhbFNlbGVjdG9yczogcGFydGlhbFNlbGVjdG9yQ291bnQsXG5cdFx0XHR0b3RhbDogZXhhY3RTZWxlY3RvckNvdW50ICsgcGFydGlhbFNlbGVjdG9yQ291bnQsXG5cdFx0XHRwcm9jZXNzaW5nVGltZTogYCR7KGVuZFRpbWUgLSBzdGFydFRpbWUpLnRvRml4ZWQoMil9bXNgXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGNsZWFuQ29udGVudChlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0Ly8gUmVtb3ZlIEhUTUwgY29tbWVudHNcblx0XHR0aGlzLnJlbW92ZUh0bWxDb21tZW50cyhlbGVtZW50KTtcblx0XHRcblx0XHQvLyBIYW5kbGUgaDEgZWxlbWVudHMgLSByZW1vdmUgZmlyc3Qgb25lIGFuZCBjb252ZXJ0IG90aGVycyB0byBoMlxuXHRcdHRoaXMuaGFuZGxlSGVhZGluZ3MoZWxlbWVudCk7XG5cdFx0XG5cdFx0Ly8gU3RyaXAgdW53YW50ZWQgYXR0cmlidXRlc1xuXHRcdHRoaXMuc3RyaXBVbndhbnRlZEF0dHJpYnV0ZXMoZWxlbWVudCk7XG5cblx0XHQvLyBSZW1vdmUgZW1wdHkgZWxlbWVudHNcblx0XHR0aGlzLnJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudCk7XG5cdH1cblxuXHRwcml2YXRlIGhhbmRsZUhlYWRpbmdzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRjb25zdCBoMXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMScpO1xuXHRcdGxldCBpc0ZpcnN0SDEgPSB0cnVlO1xuXG5cdFx0QXJyYXkuZnJvbShoMXMpLmZvckVhY2goaDEgPT4ge1xuXHRcdFx0aWYgKGlzRmlyc3RIMSkge1xuXHRcdFx0XHRoMS5yZW1vdmUoKTtcblx0XHRcdFx0aXNGaXJzdEgxID0gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBDb252ZXJ0IHN1YnNlcXVlbnQgaDFzIHRvIGgyc1xuXHRcdFx0XHRjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG5cdFx0XHRcdGgyLmlubmVySFRNTCA9IGgxLmlubmVySFRNTDtcblx0XHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdFx0QXJyYXkuZnJvbShoMS5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRcdGgyLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGgxLnBhcmVudE5vZGU/LnJlcGxhY2VDaGlsZChoMiwgaDEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVIdG1sQ29tbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGNvbnN0IGNvbW1lbnRzOiBDb21tZW50W10gPSBbXTtcblx0XHRjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKFxuXHRcdFx0ZWxlbWVudCxcblx0XHRcdE5vZGVGaWx0ZXIuU0hPV19DT01NRU5ULFxuXHRcdFx0bnVsbFxuXHRcdCk7XG5cblx0XHRsZXQgbm9kZTtcblx0XHR3aGlsZSAobm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpKSB7XG5cdFx0XHRjb21tZW50cy5wdXNoKG5vZGUgYXMgQ29tbWVudCk7XG5cdFx0fVxuXG5cdFx0Y29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHtcblx0XHRcdGNvbW1lbnQucmVtb3ZlKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgSFRNTCBjb21tZW50czonLCBjb21tZW50cy5sZW5ndGgpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdHJpcFVud2FudGVkQXR0cmlidXRlcyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IGF0dHJpYnV0ZUNvdW50ID0gMDtcblxuXHRcdGNvbnN0IHByb2Nlc3NFbGVtZW50ID0gKGVsOiBFbGVtZW50KSA9PiB7XG5cdFx0XHQvLyBTa2lwIFNWRyBlbGVtZW50cyAtIHByZXNlcnZlIGFsbCB0aGVpciBhdHRyaWJ1dGVzXG5cdFx0XHRpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgYXR0cmlidXRlcyA9IEFycmF5LmZyb20oZWwuYXR0cmlidXRlcyk7XG5cdFx0XHRcblx0XHRcdGF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0Y29uc3QgYXR0ck5hbWUgPSBhdHRyLm5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0aWYgKCFBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHJOYW1lKSAmJiAhYXR0ck5hbWUuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xuXHRcdFx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyLm5hbWUpO1xuXHRcdFx0XHRcdGF0dHJpYnV0ZUNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRwcm9jZXNzRWxlbWVudChlbGVtZW50KTtcblx0XHRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5mb3JFYWNoKHByb2Nlc3NFbGVtZW50KTtcblxuXHRcdHRoaXMuX2xvZygnU3RyaXBwZWQgYXR0cmlidXRlczonLCBhdHRyaWJ1dGVDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXHRcdGxldCBpdGVyYXRpb25zID0gMDtcblx0XHRsZXQga2VlcFJlbW92aW5nID0gdHJ1ZTtcblxuXHRcdHdoaWxlIChrZWVwUmVtb3ZpbmcpIHtcblx0XHRcdGl0ZXJhdGlvbnMrKztcblx0XHRcdGtlZXBSZW1vdmluZyA9IGZhbHNlO1xuXHRcdFx0Ly8gR2V0IGFsbCBlbGVtZW50cyB3aXRob3V0IGNoaWxkcmVuLCB3b3JraW5nIGZyb20gZGVlcGVzdCBmaXJzdFxuXHRcdFx0Y29uc3QgZW1wdHlFbGVtZW50cyA9IEFycmF5LmZyb20oZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpKS5maWx0ZXIoZWwgPT4ge1xuXHRcdFx0XHRpZiAoQUxMT1dFRF9FTVBUWV9FTEVNRU5UUy5oYXMoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgb25seSB3aGl0ZXNwYWNlIG9yICZuYnNwO1xuXHRcdFx0XHRjb25zdCB0ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRjb25zdCBoYXNPbmx5V2hpdGVzcGFjZSA9IHRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT09IDA7XG5cdFx0XHRcdGNvbnN0IGhhc05ic3AgPSB0ZXh0Q29udGVudC5pbmNsdWRlcygnXFx1MDBBMCcpOyAvLyBVbmljb2RlIG5vbi1icmVha2luZyBzcGFjZVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgbm8gbWVhbmluZ2Z1bCBjaGlsZHJlblxuXHRcdFx0XHRjb25zdCBoYXNOb0NoaWxkcmVuID0gIWVsLmhhc0NoaWxkTm9kZXMoKSB8fCBcblx0XHRcdFx0XHQoQXJyYXkuZnJvbShlbC5jaGlsZE5vZGVzKS5ldmVyeShub2RlID0+IHtcblx0XHRcdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBub2RlVGV4dCA9IG5vZGUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBub2RlVGV4dC50cmltKCkubGVuZ3RoID09PSAwICYmICFub2RlVGV4dC5pbmNsdWRlcygnXFx1MDBBMCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRyZXR1cm4gaGFzT25seVdoaXRlc3BhY2UgJiYgIWhhc05ic3AgJiYgaGFzTm9DaGlsZHJlbjtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoZW1wdHlFbGVtZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGVtcHR5RWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdFx0ZWwucmVtb3ZlKCk7XG5cdFx0XHRcdFx0cmVtb3ZlZENvdW50Kys7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRrZWVwUmVtb3ZpbmcgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBlbXB0eSBlbGVtZW50czonLCB7XG5cdFx0XHRjb3VudDogcmVtb3ZlZENvdW50LFxuXHRcdFx0aXRlcmF0aW9uc1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gRmluZCBzbWFsbCBJTUcgYW5kIFNWRyBlbGVtZW50c1xuXHRwcml2YXRlIGZpbmRTbWFsbEltYWdlcyhkb2M6IERvY3VtZW50KTogU2V0PHN0cmluZz4ge1xuXHRcdGNvbnN0IE1JTl9ESU1FTlNJT04gPSAzMztcblx0XHRjb25zdCBzbWFsbEltYWdlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXHRcdGNvbnN0IHRyYW5zZm9ybVJlZ2V4ID0gL3NjYWxlXFwoKFtcXGQuXSspXFwpLztcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXG5cdFx0Ly8gMS4gUkVBRCBQSEFTRSAtIEdhdGhlciBhbGwgZWxlbWVudHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdGNvbnN0IGVsZW1lbnRzID0gW1xuXHRcdFx0Li4uQXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpKSxcblx0XHRcdC4uLkFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmcnKSlcblx0XHRdO1xuXG5cdFx0aWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIHNtYWxsSW1hZ2VzO1xuXHRcdH1cblxuXHRcdC8vIDIuIEJBVENIIFBST0NFU1MgLSBDb2xsZWN0IGFsbCBtZWFzdXJlbWVudHMgaW4gb25lIGdvXG5cdFx0Y29uc3QgbWVhc3VyZW1lbnRzID0gZWxlbWVudHMubWFwKGVsZW1lbnQgPT4gKHtcblx0XHRcdGVsZW1lbnQsXG5cdFx0XHQvLyBTdGF0aWMgYXR0cmlidXRlcyAobm8gcmVmbG93KVxuXHRcdFx0bmF0dXJhbFdpZHRoOiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCA/IGVsZW1lbnQubmF0dXJhbFdpZHRoIDogMCxcblx0XHRcdG5hdHVyYWxIZWlnaHQ6IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ID8gZWxlbWVudC5uYXR1cmFsSGVpZ2h0IDogMCxcblx0XHRcdGF0dHJXaWR0aDogcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgfHwgJzAnKSxcblx0XHRcdGF0dHJIZWlnaHQ6IHBhcnNlSW50KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSB8fCAnMCcpXG5cdFx0fSkpO1xuXG5cdFx0Ly8gMy4gQkFUQ0ggQ09NUFVURSBTVFlMRVMgLSBQcm9jZXNzIGluIGNodW5rcyB0byBhdm9pZCBsb25nIHRhc2tzXG5cdFx0Y29uc3QgQkFUQ0hfU0laRSA9IDUwO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWVhc3VyZW1lbnRzLmxlbmd0aDsgaSArPSBCQVRDSF9TSVpFKSB7XG5cdFx0XHRjb25zdCBiYXRjaCA9IG1lYXN1cmVtZW50cy5zbGljZShpLCBpICsgQkFUQ0hfU0laRSk7XG5cdFx0XHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIFJlYWQgcGhhc2UgLSBjb21wdXRlIGFsbCBzdHlsZXMgYXQgb25jZVxuXHRcdFx0XHRjb25zdCBzdHlsZXMgPSBiYXRjaC5tYXAoKHsgZWxlbWVudCB9KSA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSk7XG5cdFx0XHRcdGNvbnN0IHJlY3RzID0gYmF0Y2gubWFwKCh7IGVsZW1lbnQgfSkgPT4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBQcm9jZXNzIHBoYXNlIC0gbm8gRE9NIG9wZXJhdGlvbnNcblx0XHRcdFx0YmF0Y2guZm9yRWFjaCgobWVhc3VyZW1lbnQsIGluZGV4KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHN0eWxlID0gc3R5bGVzW2luZGV4XTtcblx0XHRcdFx0XHRcdGNvbnN0IHJlY3QgPSByZWN0c1tpbmRleF07XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIEdldCB0cmFuc2Zvcm0gc2NhbGUgaW4gdGhlIHNhbWUgYmF0Y2hcblx0XHRcdFx0XHRcdGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybTtcblx0XHRcdFx0XHRcdGNvbnN0IHNjYWxlID0gdHJhbnNmb3JtID8gXG5cdFx0XHRcdFx0XHRcdHBhcnNlRmxvYXQodHJhbnNmb3JtLm1hdGNoKHRyYW5zZm9ybVJlZ2V4KT8uWzFdIHx8ICcxJykgOiAxO1xuXG5cdFx0XHRcdFx0XHQvLyBDYWxjdWxhdGUgZWZmZWN0aXZlIGRpbWVuc2lvbnNcblx0XHRcdFx0XHRcdGNvbnN0IHdpZHRocyA9IFtcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQubmF0dXJhbFdpZHRoLFxuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5hdHRyV2lkdGgsXG5cdFx0XHRcdFx0XHRcdHBhcnNlSW50KHN0eWxlLndpZHRoKSB8fCAwLFxuXHRcdFx0XHRcdFx0XHRyZWN0LndpZHRoICogc2NhbGVcblx0XHRcdFx0XHRcdF0uZmlsdGVyKGRpbSA9PiB0eXBlb2YgZGltID09PSAnbnVtYmVyJyAmJiBkaW0gPiAwKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgaGVpZ2h0cyA9IFtcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQubmF0dXJhbEhlaWdodCxcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQuYXR0ckhlaWdodCxcblx0XHRcdFx0XHRcdFx0cGFyc2VJbnQoc3R5bGUuaGVpZ2h0KSB8fCAwLFxuXHRcdFx0XHRcdFx0XHRyZWN0LmhlaWdodCAqIHNjYWxlXG5cdFx0XHRcdFx0XHRdLmZpbHRlcihkaW0gPT4gdHlwZW9mIGRpbSA9PT0gJ251bWJlcicgJiYgZGltID4gMCk7XG5cblx0XHRcdFx0XHRcdC8vIERlY2lzaW9uIHBoYXNlIC0gbm8gRE9NIG9wZXJhdGlvbnNcblx0XHRcdFx0XHRcdGlmICh3aWR0aHMubGVuZ3RoID4gMCAmJiBoZWlnaHRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZWZmZWN0aXZlV2lkdGggPSBNYXRoLm1pbiguLi53aWR0aHMpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlZmZlY3RpdmVIZWlnaHQgPSBNYXRoLm1pbiguLi5oZWlnaHRzKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoZWZmZWN0aXZlV2lkdGggPCBNSU5fRElNRU5TSU9OIHx8IGVmZmVjdGl2ZUhlaWdodCA8IE1JTl9ESU1FTlNJT04pIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBpZGVudGlmaWVyID0gdGhpcy5nZXRFbGVtZW50SWRlbnRpZmllcihtZWFzdXJlbWVudC5lbGVtZW50KTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaWRlbnRpZmllcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0c21hbGxJbWFnZXMuYWRkKGlkZW50aWZpZXIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBlbGVtZW50IGRpbWVuc2lvbnM6JywgZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBiYXRjaDonLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLl9sb2coJ0ZvdW5kIHNtYWxsIGVsZW1lbnRzOicsIHtcblx0XHRcdGNvdW50OiBwcm9jZXNzZWRDb3VudCxcblx0XHRcdHRvdGFsRWxlbWVudHM6IGVsZW1lbnRzLmxlbmd0aCxcblx0XHRcdHByb2Nlc3NpbmdUaW1lOiBgJHsoZW5kVGltZSAtIHN0YXJ0VGltZSkudG9GaXhlZCgyKX1tc2Bcblx0XHR9KTtcblxuXHRcdHJldHVybiBzbWFsbEltYWdlcztcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlU21hbGxJbWFnZXMoZG9jOiBEb2N1bWVudCwgc21hbGxJbWFnZXM6IFNldDxzdHJpbmc+KSB7XG5cdFx0bGV0IHJlbW92ZWRDb3VudCA9IDA7XG5cblx0XHRbJ2ltZycsICdzdmcnXS5mb3JFYWNoKHRhZyA9PiB7XG5cdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xuXHRcdFx0QXJyYXkuZnJvbShlbGVtZW50cykuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0Y29uc3QgaWRlbnRpZmllciA9IHRoaXMuZ2V0RWxlbWVudElkZW50aWZpZXIoZWxlbWVudCk7XG5cdFx0XHRcdGlmIChpZGVudGlmaWVyICYmIHNtYWxsSW1hZ2VzLmhhcyhpZGVudGlmaWVyKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlKCk7XG5cdFx0XHRcdFx0cmVtb3ZlZENvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIHNtYWxsIGVsZW1lbnRzOicsIHJlbW92ZWRDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIGdldEVsZW1lbnRJZGVudGlmaWVyKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcgfCBudWxsIHtcblx0XHQvLyBUcnkgdG8gY3JlYXRlIGEgdW5pcXVlIGlkZW50aWZpZXIgdXNpbmcgdmFyaW91cyBhdHRyaWJ1dGVzXG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG5cdFx0XHRjb25zdCBzcmMgPSBlbGVtZW50LnNyYyB8fCBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSB8fCAnJztcblx0XHRcdGNvbnN0IHNyY3NldCA9IGVsZW1lbnQuc3Jjc2V0IHx8IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpIHx8ICcnO1xuXHRcdFx0aWYgKHNyYykgcmV0dXJuIGBzcmM6JHtzcmN9YDtcblx0XHRcdGlmIChzcmNzZXQpIHJldHVybiBgc3Jjc2V0OiR7c3Jjc2V0fWA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaWQgPSBlbGVtZW50LmlkIHx8ICcnO1xuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lIHx8ICcnO1xuXHRcdGNvbnN0IHZpZXdCb3ggPSBlbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2aWV3Qm94JykgfHwgJycgOiAnJztcblx0XHRcblx0XHRpZiAoaWQpIHJldHVybiBgaWQ6JHtpZH1gO1xuXHRcdGlmICh2aWV3Qm94KSByZXR1cm4gYHZpZXdCb3g6JHt2aWV3Qm94fWA7XG5cdFx0aWYgKGNsYXNzTmFtZSkgcmV0dXJuIGBjbGFzczoke2NsYXNzTmFtZX1gO1xuXHRcdFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kTWFpbkNvbnRlbnQoZG9jOiBEb2N1bWVudCk6IEVsZW1lbnQgfCBudWxsIHtcblxuXHRcdC8vIEZpbmQgYWxsIHBvdGVudGlhbCBjb250ZW50IGNvbnRhaW5lcnNcblx0XHRjb25zdCBjYW5kaWRhdGVzOiB7IGVsZW1lbnQ6IEVsZW1lbnQ7IHNjb3JlOiBudW1iZXIgfVtdID0gW107XG5cblx0XHRFTlRSWV9QT0lOVF9FTEVNRU5UUy5mb3JFYWNoKChzZWxlY3RvciwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0Ly8gQmFzZSBzY29yZSBmcm9tIHNlbGVjdG9yIHByaW9yaXR5IChlYXJsaWVyID0gaGlnaGVyKVxuXHRcdFx0XHRsZXQgc2NvcmUgPSAoRU5UUllfUE9JTlRfRUxFTUVOVFMubGVuZ3RoIC0gaW5kZXgpICogMTA7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBBZGQgc2NvcmUgYmFzZWQgb24gY29udGVudCBhbmFseXNpc1xuXHRcdFx0XHRzY29yZSArPSB0aGlzLnNjb3JlRWxlbWVudChlbGVtZW50KTtcblx0XHRcdFx0XG5cdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCh7IGVsZW1lbnQsIHNjb3JlIH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRpZiAoY2FuZGlkYXRlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdC8vIEZhbGwgYmFjayB0byBzY29yaW5nIGJsb2NrIGVsZW1lbnRzXG5cdFx0XHQvLyBDdXJyZW50bHkgPGJvZHk+IGVsZW1lbnQgaXMgdXNlZCBhcyB0aGUgZmFsbGJhY2ssIHNvIHRoaXMgaXMgbm90IHVzZWRcblx0XHRcdHJldHVybiB0aGlzLmZpbmRDb250ZW50QnlTY29yaW5nKGRvYyk7XG5cdFx0fVxuXG5cdFx0Ly8gU29ydCBieSBzY29yZSBkZXNjZW5kaW5nXG5cdFx0Y2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG5cdFx0XG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdHRoaXMuX2xvZygnQ29udGVudCBjYW5kaWRhdGVzOicsIGNhbmRpZGF0ZXMubWFwKGMgPT4gKHtcblx0XHRcdFx0ZWxlbWVudDogYy5lbGVtZW50LnRhZ05hbWUsXG5cdFx0XHRcdHNlbGVjdG9yOiB0aGlzLmdldEVsZW1lbnRTZWxlY3RvcihjLmVsZW1lbnQpLFxuXHRcdFx0XHRzY29yZTogYy5zY29yZVxuXHRcdFx0fSkpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FuZGlkYXRlc1swXS5lbGVtZW50O1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kQ29udGVudEJ5U2NvcmluZyhkb2M6IERvY3VtZW50KTogRWxlbWVudCB8IG51bGwge1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXMgPSB0aGlzLnNjb3JlRWxlbWVudHMoZG9jKTtcblx0XHRyZXR1cm4gY2FuZGlkYXRlcy5sZW5ndGggPiAwID8gY2FuZGlkYXRlc1swXS5lbGVtZW50IDogbnVsbDtcblx0fVxuXG5cdHByaXZhdGUgZ2V0RWxlbWVudFNlbGVjdG9yKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdGxldCBjdXJyZW50OiBFbGVtZW50IHwgbnVsbCA9IGVsZW1lbnQ7XG5cdFx0XG5cdFx0d2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG5cdFx0XHRsZXQgc2VsZWN0b3IgPSBjdXJyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmIChjdXJyZW50LmlkKSB7XG5cdFx0XHRcdHNlbGVjdG9yICs9ICcjJyArIGN1cnJlbnQuaWQ7XG5cdFx0XHR9IGVsc2UgaWYgKGN1cnJlbnQuY2xhc3NOYW1lICYmIHR5cGVvZiBjdXJyZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0c2VsZWN0b3IgKz0gJy4nICsgY3VycmVudC5jbGFzc05hbWUudHJpbSgpLnNwbGl0KC9cXHMrLykuam9pbignLicpO1xuXHRcdFx0fVxuXHRcdFx0cGFydHMudW5zaGlmdChzZWxlY3Rvcik7XG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gcGFydHMuam9pbignID4gJyk7XG5cdH1cblxuXHRwcml2YXRlIHNjb3JlRWxlbWVudHMoZG9jOiBEb2N1bWVudCk6IENvbnRlbnRTY29yZVtdIHtcblx0XHRjb25zdCBjYW5kaWRhdGVzOiBDb250ZW50U2NvcmVbXSA9IFtdO1xuXG5cdFx0QkxPQ0tfRUxFTUVOVFMuZm9yRWFjaCgodGFnOiBzdHJpbmcpID0+IHtcblx0XHRcdEFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZykpLmZvckVhY2goKGVsZW1lbnQ6IEVsZW1lbnQpID0+IHtcblx0XHRcdFx0Y29uc3Qgc2NvcmUgPSB0aGlzLnNjb3JlRWxlbWVudChlbGVtZW50KTtcblx0XHRcdFx0aWYgKHNjb3JlID4gMCkge1xuXHRcdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCh7IHNjb3JlLCBlbGVtZW50IH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBjYW5kaWRhdGVzLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcblx0fVxuXG5cdHByaXZhdGUgc2NvcmVFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBudW1iZXIge1xuXHRcdGxldCBzY29yZSA9IDA7XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBlbGVtZW50IHByb3BlcnRpZXNcblx0XHRjb25zdCBjbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSAmJiB0eXBlb2YgZWxlbWVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnID8gXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdFx0Y29uc3QgaWQgPSBlbGVtZW50LmlkID8gZWxlbWVudC5pZC50b0xvd2VyQ2FzZSgpIDogJyc7XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBjb250ZW50XG5cdFx0Y29uc3QgdGV4dCA9IGVsZW1lbnQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0Y29uc3Qgd29yZHMgPSB0ZXh0LnNwbGl0KC9cXHMrLykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IE1hdGgubWluKE1hdGguZmxvb3Iod29yZHMgLyAxMDApLCAzKTtcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGxpbmsgZGVuc2l0eVxuXHRcdGNvbnN0IGxpbmtzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpO1xuXHRcdGNvbnN0IGxpbmtUZXh0ID0gQXJyYXkuZnJvbShsaW5rcykucmVkdWNlKChhY2MsIGxpbmspID0+IGFjYyArIChsaW5rLnRleHRDb250ZW50Py5sZW5ndGggfHwgMCksIDApO1xuXHRcdGNvbnN0IGxpbmtEZW5zaXR5ID0gdGV4dC5sZW5ndGggPyBsaW5rVGV4dCAvIHRleHQubGVuZ3RoIDogMDtcblx0XHRpZiAobGlua0RlbnNpdHkgPiAwLjUpIHtcblx0XHRcdHNjb3JlIC09IDEwO1xuXHRcdH1cblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIHByZXNlbmNlIG9mIG1lYW5pbmdmdWwgZWxlbWVudHNcblx0XHRjb25zdCBwYXJhZ3JhcGhzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncCcpLmxlbmd0aDtcblx0XHRzY29yZSArPSBwYXJhZ3JhcGhzO1xuXG5cdFx0Y29uc3QgaW1hZ2VzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IE1hdGgubWluKGltYWdlcyAqIDMsIDkpO1xuXG5cdFx0cmV0dXJuIHNjb3JlO1xuXHR9XG59ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJleHBvcnQgeyBEZWZ1ZGRsZSB9IGZyb20gJy4vZGVmdWRkbGUnO1xuZXhwb3J0IHR5cGUgeyBEZWZ1ZGRsZU9wdGlvbnMsIERlZnVkZGxlUmVzcG9uc2UsIERlZnVkZGxlTWV0YWRhdGEgfSBmcm9tICcuL3R5cGVzJzsgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
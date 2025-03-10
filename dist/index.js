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
    '[class="promo" i]',
    // comments
    '[id="comments" i]',
    // header, nav
    'header',
    'nav',
    '[id="header" i]',
    '[role="navigation" i]',
    '[role="dialog" i]',
    '[role="complementary" i]',
    '[class="pagination" i]',
    // metadata
    '[class*="author" i]',
    '[class="date" i]',
    '[class="meta" i]',
    '[class="toc" i]',
    '[href*="/category" i]',
    '[href*="/categories" i]',
    '[href*="/tag/" i]',
    '[href*="/tags/" i]',
    '[href*="/topics" i]',
    '[href*="author" i]',
    '[href="#site-content" i]',
    '[id="title" i]',
    '[id="toc" i]',
    '[src*="author" i]',
    // footer
    'footer',
    // inputs, forms, elements
    'aside',
    'button',
    'canvas',
    'dialog',
    'fieldset',
    'form',
    'input',
    'label',
    'link',
    'option',
    'select',
    'textarea',
    'time',
    // 'iframe' maybe narrow this down to only allow iframes for video
    // '[role="button"]', Medium images
    // logos
    '[class="logo" i]',
    '[id="logo" i]',
    // newsletter
    '[id="newsletter" i]',
    // hidden for print
    '[class="noprint" i]',
    '[data-link-name*="skip" i]',
    '[data-print-layout="hide" i]',
    // footnotes, citations
    '[class*="clickable-icon" i]',
    'li span[class*="ltx_tag" i][class*="ltx_tag_item" i]',
    'a[href^="#"][class*="anchor" i]',
    'a[href^="#"][class*="ref" i]',
    // link lists
    '[data-container*="most-viewed" i]',
    // sidebar
    '[class="sidebar" i]',
    '[id="sidebar" i]',
    '[id="sitesub" i]',
    // other
    '[data-optimizely="related-articles-section" i]' // The Economist
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
    'allterms',
    'around-the-web',
    'article__copy',
    'article_date',
    'article-end ',
    'article_header',
    'article__header',
    'article__info',
    'article__meta',
    'article-subject',
    'article_subject',
    'article-title',
    'article_title',
    'articletopics',
    'article-topics',
    'article-type',
    'article--lede', // The Verge
    'author',
    'back-to-top',
    'banner',
    'bio-block',
    'bottom-of-article',
    'brand-bar',
    'breadcrumb',
    'button-wrapper',
    'btn-',
    '-btn',
    'byline',
    'cat_header',
    'catlinks',
    'chapter-list', // The Economist
    'collections',
    'comments',
    'comment-count',
    'comment-content',
    'comment-form',
    'comment-respond',
    'comment-thread',
    'complementary',
    'content-card', // The Verge
    'contentpromo',
    'core-collateral',
    '_cta',
    '-cta',
    'cta-',
    'cta_',
    'current-issue', // The Nation
    'dateline',
    'dateheader',
    'dialog',
    'disclaimer',
    'disclosure',
    'discussion',
    'disqus',
    'donate',
    'dropdown', // Ars Technica
    'eletters',
    'emailsignup',
    'engagement-widget',
    'entry-date',
    'entry-meta',
    'eyebrow',
    'expand-reduce',
    'facebook',
    'favorite',
    'feedback',
    'field-site-sections',
    'fixed',
    'follow',
    'footer',
    'footnote-back',
    'footnoteback',
    'for-you',
    'frontmatter',
    'gist-meta',
    //	'global',
    'google',
    'goog-',
    'header-logo',
    'header-pattern', // The Verge
    'hero-list',
    'hide-for-print',
    'hide-print',
    'interlude',
    'interaction',
    'keyword',
    'kicker',
    '-labels',
    'latest-content',
    '-ledes-', // The Verge
    '-license',
    'link-box',
    'links-grid', // BBC
    'links-title', // BBC
    'listing-dynamic-terms', // Boston Review
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
    'mw-editsection',
    'mw-cite-backlink',
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
    'newsletterwidget',
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
    'posttag',
    'post_tag',
    'post-tag',
    //	'preview', used on Obsidian Publish
    'prevnext',
    'previousnext',
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
    //	'-share', scitechdaily.com
    'share-icons',
    'sharelinks',
    'share-section',
    'sidebartitle',
    'similar-',
    'similar_',
    'site-index',
    'site-header',
    'site-logo',
    'site-name',
    //	'skip-',
    'skip-link',
    'social',
    'speechify-ignore',
    'sponsor',
    //	'-stats',
    '_stats',
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
// Selectors for footnotes and citations
const FOOTNOTE_SELECTORS = [
    'sup.reference',
    'cite.ltx_cite',
    'sup[id^="fnr"]',
    'sup[id^="fnref:"]',
    'span.footnote-link',
    'a.citation',
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
    'a[role="doc-biblioref"]' // Science.org
].join(',');
const FOOTNOTE_LIST_SELECTORS = [
    'div.footnote ol',
    'div.footnotes ol',
    'div[role="doc-endnotes"]',
    'div[role="doc-footnotes"]',
    'ol.footnotes-list',
    'ol.references',
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
    'allow',
    'allowfullscreen',
    'aria-label',
    'class',
    'colspan',
    'controls',
    'data-src',
    'data-srcset',
    'dir',
    'frameborder',
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
    'type',
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
            // Check for small images in original document, excluding lazy-loaded ones
            const smallImages = this.findSmallImages(this.doc);
            // Clone document
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
        // Handle H1 elements - remove first one and convert others to H2
        this.handleHeadings(element);
        // Standardize footnotes and citations
        this.standardizeFootnotes(element);
        // Handle lazy-loaded images
        this.handleLazyImages(element);
        // Convert embedded content to standard formats
        this.standardizeEmbeds(element);
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
        // Collect all footnotes and their IDs from footnote lists
        const footnoteLists = element.querySelectorAll(FOOTNOTE_LIST_SELECTORS);
        footnoteLists.forEach(list => {
            // Substack has individual footnote divs with no parent
            if (list.matches('div.footnote[data-component-name="FootnoteToDOM"]')) {
                const anchor = list.querySelector('a.footnote-number');
                const content = list.querySelector('.footnote-content');
                if (anchor && content) {
                    const id = anchor.id.replace('footnote-', '');
                    if (id && !footnotes[footnoteCount]) {
                        footnotes[footnoteCount] = {
                            content: content,
                            originalId: id.toLowerCase(),
                            refs: []
                        };
                        footnoteCount++;
                    }
                }
                return;
            }
            // Common format using OL/UL and LI elements
            const items = list.querySelectorAll('li, div[role="listitem"]');
            items.forEach(li => {
                var _a, _b;
                let id = '';
                let content = null;
                // Handle citations with .citations class
                const citationsDiv = li.querySelector('.citations');
                if ((_a = citationsDiv === null || citationsDiv === void 0 ? void 0 : citationsDiv.id) === null || _a === void 0 ? void 0 : _a.startsWith('R')) {
                    id = citationsDiv.id;
                    // Look for citation content within the citations div
                    const citationContent = citationsDiv.querySelector('.citation-content');
                    if (citationContent) {
                        content = citationContent;
                    }
                }
                else {
                    // Extract ID from various formats
                    if (li.id.startsWith('bib.bib')) {
                        id = li.id.replace('bib.bib', '');
                    }
                    else if (li.id.startsWith('fn:')) {
                        id = li.id.replace('fn:', '');
                    }
                    else {
                        const match = (_b = li.id.split('/').pop()) === null || _b === void 0 ? void 0 : _b.match(/cite_note-(.+)/);
                        id = match ? match[1] : li.id;
                    }
                    content = li;
                }
                if (id && !footnotes[footnoteCount]) {
                    footnotes[footnoteCount] = {
                        content: content || li,
                        originalId: id.toLowerCase(),
                        refs: []
                    };
                    footnoteCount++;
                }
            });
        });
        return footnotes;
    }
    standardizeFootnotes(element) {
        const footnotes = this.collectFootnotes(element);
        // Standardize inline footnotes using the collected IDs
        const footnoteElements = element.querySelectorAll(FOOTNOTE_SELECTORS);
        footnoteElements.forEach(el => {
            var _a, _b, _c;
            if (!(el instanceof HTMLElement))
                return;
            let footnoteId = '';
            let footnoteContent = '';
            // Extract footnote ID based on element type
            // Science.org
            if (el.matches('a[role="doc-biblioref"]')) {
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
                const id = ((_a = el.id) === null || _a === void 0 ? void 0 : _a.replace('footnote-anchor-', '')) || '';
                if (id) {
                    footnoteId = id.toLowerCase();
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
                // Arxiv
            }
            else if (el.matches('cite.ltx_cite')) {
                const link = el.querySelector('a');
                if (link) {
                    const href = link.getAttribute('href');
                    if (href) {
                        const match = (_b = href.split('/').pop()) === null || _b === void 0 ? void 0 : _b.match(/bib\.bib(\d+)/);
                        if (match) {
                            footnoteId = match[1].toLowerCase();
                        }
                    }
                }
            }
            else if (el.matches('sup[id^="fnref:"]')) {
                footnoteId = el.id.replace('fnref:', '').toLowerCase();
            }
            else if (el.matches('span.footnote-link')) {
                footnoteId = el.getAttribute('data-footnote-id') || '';
                footnoteContent = el.getAttribute('data-footnote-content') || '';
            }
            else if (el.matches('a.citation')) {
                footnoteId = ((_c = el.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || '';
                footnoteContent = el.getAttribute('href') || '';
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
                    // Create footnote reference ID - only add suffix if this is a duplicate reference
                    const refId = footnoteData.refs.length > 0 ?
                        `fnref:${footnoteNumber}-${footnoteData.refs.length + 1}` :
                        `fnref:${footnoteNumber}`;
                    footnoteData.refs.push(refId);
                    // Create standardized footnote reference
                    const sup = document.createElement('sup');
                    sup.id = refId;
                    const link = document.createElement('a');
                    link.href = `#fn:${footnoteNumber}`;
                    link.textContent = footnoteNumber;
                    sup.appendChild(link);
                    el.replaceWith(sup);
                }
            }
        });
        // Create the standardized footnote list
        const newList = document.createElement('div');
        newList.className = 'footnotes';
        const orderedList = document.createElement('ol');
        // Create footnote items in order
        Object.entries(footnotes).forEach(([number, data]) => {
            const newItem = this.createFootnoteItem(parseInt(number), data.content, data.refs);
            orderedList.appendChild(newItem);
        });
        // Remove original footnote lists
        const footnoteLists = element.querySelectorAll(FOOTNOTE_LIST_SELECTORS);
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
    standardizeEmbeds(element) {
        let processedCount = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUN2QixLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUVELGlEQUFpRDtRQUNqRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzVELEtBQUssSUFBSSxVQUFVLENBQUM7UUFFcEIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMxRCxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpDLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztDQUNEO0FBNytCRCw0QkE2K0JDOzs7Ozs7O1VDNTlDRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBLDREQUFzQztBQUE3Qiw2R0FBUSIsInNvdXJjZXMiOlsid2VicGFjazovL0RlZnVkZGxlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9tZXRhZGF0YS50cyIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9kZWZ1ZGRsZS50cyIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWZ1ZGRsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWZ1ZGRsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsICgpID0+IHtcbnJldHVybiAiLCJpbXBvcnQgeyBEZWZ1ZGRsZU1ldGFkYXRhIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUV4dHJhY3RvciB7XG5cdHN0YXRpYyBleHRyYWN0KGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IERlZnVkZGxlTWV0YWRhdGEge1xuXHRcdGxldCBkb21haW4gPSAnJztcblx0XHRsZXQgdXJsID0gJyc7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gVHJ5IHRvIGdldCBVUkwgZnJvbSBkb2N1bWVudCBsb2NhdGlvblxuXHRcdFx0dXJsID0gZG9jLmxvY2F0aW9uPy5ocmVmIHx8ICcnO1xuXHRcdFx0aWYgKHVybCkge1xuXHRcdFx0XHRkb21haW4gPSBuZXcgVVJMKHVybCkuaG9zdG5hbWUucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBJZiBVUkwgcGFyc2luZyBmYWlscywgdHJ5IHRvIGdldCBmcm9tIGJhc2UgdGFnXG5cdFx0XHRjb25zdCBiYXNlVGFnID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2Jhc2VbaHJlZl0nKTtcblx0XHRcdGlmIChiYXNlVGFnKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dXJsID0gYmFzZVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcblx0XHRcdFx0XHRkb21haW4gPSBuZXcgVVJMKHVybCkuaG9zdG5hbWUucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignRmFpbGVkIHRvIHBhcnNlIGJhc2UgVVJMOicsIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiB0aGlzLmdldFRpdGxlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRkZXNjcmlwdGlvbjogdGhpcy5nZXREZXNjcmlwdGlvbihkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0ZG9tYWluLFxuXHRcdFx0ZmF2aWNvbjogdGhpcy5nZXRGYXZpY29uKGRvYywgdXJsKSxcblx0XHRcdGltYWdlOiB0aGlzLmdldEltYWdlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRwdWJsaXNoZWQ6IHRoaXMuZ2V0UHVibGlzaGVkKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRhdXRob3I6IHRoaXMuZ2V0QXV0aG9yKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRzaXRlOiB0aGlzLmdldFNpdGUoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdHNjaGVtYU9yZ0RhdGFcblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0QXV0aG9yKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5hdXRob3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ2F1dGhvci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYnlsXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXV0aG9yTGlzdFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImNvcHlyaWdodFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShzY2hlbWFPcmdEYXRhLCAnY29weXJpZ2h0SG9sZGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpzaXRlX25hbWVcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ3B1Ymxpc2hlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ3NvdXJjZU9yZ2FuaXphdGlvbi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ2lzUGFydE9mLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6Y3JlYXRvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImFwcGxpY2F0aW9uLW5hbWVcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFNpdGUoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShzY2hlbWFPcmdEYXRhLCAncHVibGlzaGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpzaXRlX25hbWVcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ3NvdXJjZU9yZ2FuaXphdGlvbi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJjb3B5cmlnaHRcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ2NvcHlyaWdodEhvbGRlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ2lzUGFydE9mLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImFwcGxpY2F0aW9uLW5hbWVcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFRpdGxlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6dGl0bGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOnRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdoZWFkbGluZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidGl0bGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS50aXRsZVwiKSB8fFxuXHRcdFx0ZG9jLnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJyk/LnRleHRDb250ZW50Py50cmltKCkgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldERlc2NyaXB0aW9uKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShzY2hlbWFPcmdEYXRhLCAnZGVzY3JpcHRpb24nKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6ZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5kZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0SW1hZ2UoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzppbWFnZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6aW1hZ2VcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ2ltYWdlLnVybCcpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuaW1hZ2UuZnVsbFwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0RmF2aWNvbihkb2M6IERvY3VtZW50LCBiYXNlVXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGNvbnN0IGljb25Gcm9tTWV0YSA9IHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6aW1hZ2U6ZmF2aWNvblwiKTtcblx0XHRpZiAoaWNvbkZyb21NZXRhKSByZXR1cm4gaWNvbkZyb21NZXRhO1xuXG5cdFx0Y29uc3QgaWNvbkxpbmsgPSBkb2MucXVlcnlTZWxlY3RvcihcImxpbmtbcmVsPSdpY29uJ11cIik/LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cdFx0aWYgKGljb25MaW5rKSByZXR1cm4gaWNvbkxpbms7XG5cblx0XHRjb25zdCBzaG9ydGN1dExpbmsgPSBkb2MucXVlcnlTZWxlY3RvcihcImxpbmtbcmVsPSdzaG9ydGN1dCBpY29uJ11cIik/LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cdFx0aWYgKHNob3J0Y3V0TGluaykgcmV0dXJuIHNob3J0Y3V0TGluaztcblxuXHRcdC8vIE9ubHkgdHJ5IHRvIGNvbnN0cnVjdCBmYXZpY29uIFVSTCBpZiB3ZSBoYXZlIGEgdmFsaWQgYmFzZSBVUkxcblx0XHRpZiAoYmFzZVVybCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmV0dXJuIG5ldyBVUkwoXCIvZmF2aWNvbi5pY29cIiwgYmFzZVVybCkuaHJlZjtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKCdGYWlsZWQgdG8gY29uc3RydWN0IGZhdmljb24gVVJMOicsIGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFB1Ymxpc2hlZChkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdkYXRlUHVibGlzaGVkJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJwdWJsaXNoRGF0ZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJhcnRpY2xlOnB1Ymxpc2hlZF90aW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFRpbWVFbGVtZW50KGRvYykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5kYXRlXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRNZXRhQ29udGVudChkb2M6IERvY3VtZW50LCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHNlbGVjdG9yID0gYG1ldGFbJHthdHRyfV1gO1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcblx0XHRcdC5maW5kKGVsID0+IGVsLmdldEF0dHJpYnV0ZShhdHRyKT8udG9Mb3dlckNhc2UoKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKSk7XG5cdFx0Y29uc3QgY29udGVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik/LnRyaW0oKSA/PyBcIlwiIDogXCJcIjtcblx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoY29udGVudCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRUaW1lRWxlbWVudChkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCBzZWxlY3RvciA9IGB0aW1lYDtcblx0XHRjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpWzBdO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50ID8gKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0ZXRpbWVcIik/LnRyaW0oKSA/PyBlbGVtZW50LnRleHRDb250ZW50Py50cmltKCkgPz8gXCJcIikgOiBcIlwiO1xuXHRcdHJldHVybiB0aGlzLmRlY29kZUhUTUxFbnRpdGllcyhjb250ZW50KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGRlY29kZUhUTUxFbnRpdGllcyh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcblx0XHR0ZXh0YXJlYS5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGE6IGFueSwgcHJvcGVydHk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XG5cdFx0aWYgKCFzY2hlbWFPcmdEYXRhKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG5cdFx0Y29uc3Qgc2VhcmNoU2NoZW1hID0gKGRhdGE6IGFueSwgcHJvcHM6IHN0cmluZ1tdLCBmdWxsUGF0aDogc3RyaW5nLCBpc0V4YWN0TWF0Y2g6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nW10gPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4gcHJvcHMubGVuZ3RoID09PSAwID8gW2RhdGFdIDogW107XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmICghZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHRcdFx0XHRjb25zdCBjdXJyZW50UHJvcCA9IHByb3BzWzBdO1xuXHRcdFx0XHRpZiAoL15cXFtcXGQrXFxdJC8udGVzdChjdXJyZW50UHJvcCkpIHtcblx0XHRcdFx0XHRjb25zdCBpbmRleCA9IHBhcnNlSW50KGN1cnJlbnRQcm9wLnNsaWNlKDEsIC0xKSk7XG5cdFx0XHRcdFx0aWYgKGRhdGFbaW5kZXhdKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhcmNoU2NoZW1hKGRhdGFbaW5kZXhdLCBwcm9wcy5zbGljZSgxKSwgZnVsbFBhdGgsIGlzRXhhY3RNYXRjaCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKHByb3BzLmxlbmd0aCA9PT0gMCAmJiBkYXRhLmV2ZXJ5KGl0ZW0gPT4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBpdGVtID09PSAnbnVtYmVyJykpIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YS5tYXAoU3RyaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIGRhdGEuZmxhdE1hcChpdGVtID0+IHNlYXJjaFNjaGVtYShpdGVtLCBwcm9wcywgZnVsbFBhdGgsIGlzRXhhY3RNYXRjaCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBbY3VycmVudFByb3AsIC4uLnJlbWFpbmluZ1Byb3BzXSA9IHByb3BzO1xuXHRcdFx0XG5cdFx0XHRpZiAoIWN1cnJlbnRQcm9wKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHJldHVybiBbZGF0YV07XG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgZGF0YS5uYW1lKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtkYXRhLm5hbWVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoY3VycmVudFByb3ApKSB7XG5cdFx0XHRcdHJldHVybiBzZWFyY2hTY2hlbWEoZGF0YVtjdXJyZW50UHJvcF0sIHJlbWFpbmluZ1Byb3BzLCBcblx0XHRcdFx0XHRmdWxsUGF0aCA/IGAke2Z1bGxQYXRofS4ke2N1cnJlbnRQcm9wfWAgOiBjdXJyZW50UHJvcCwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXNFeGFjdE1hdGNoKSB7XG5cdFx0XHRcdGNvbnN0IG5lc3RlZFJlc3VsdHM6IHN0cmluZ1tdID0gW107XG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGRhdGFba2V5XSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoZGF0YVtrZXldLCBwcm9wcywgXG5cdFx0XHRcdFx0XHRcdGZ1bGxQYXRoID8gYCR7ZnVsbFBhdGh9LiR7a2V5fWAgOiBrZXksIGZhbHNlKTtcblx0XHRcdFx0XHRcdG5lc3RlZFJlc3VsdHMucHVzaCguLi5yZXN1bHRzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG5lc3RlZFJlc3VsdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHJldHVybiBuZXN0ZWRSZXN1bHRzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBbXTtcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGxldCByZXN1bHRzID0gc2VhcmNoU2NoZW1hKHNjaGVtYU9yZ0RhdGEsIHByb3BlcnR5LnNwbGl0KCcuJyksICcnLCB0cnVlKTtcblx0XHRcdGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXN1bHRzID0gc2VhcmNoU2NoZW1hKHNjaGVtYU9yZ0RhdGEsIHByb3BlcnR5LnNwbGl0KCcuJyksICcnLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA+IDAgPyByZXN1bHRzLmZpbHRlcihCb29sZWFuKS5qb2luKCcsICcpIDogZGVmYXVsdFZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKHJlc3VsdCk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIGdldFNjaGVtYVByb3BlcnR5IGZvciAke3Byb3BlcnR5fTpgLCBlcnJvcik7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBleHRyYWN0U2NoZW1hT3JnRGF0YShkb2M6IERvY3VtZW50KTogYW55IHtcblx0XHRjb25zdCBzY2hlbWFTY3JpcHRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwiYXBwbGljYXRpb24vbGQranNvblwiXScpO1xuXHRcdGNvbnN0IHNjaGVtYURhdGE6IGFueVtdID0gW107XG5cblx0XHRzY2hlbWFTY3JpcHRzLmZvckVhY2goc2NyaXB0ID0+IHtcblx0XHRcdGxldCBqc29uQ29udGVudCA9IHNjcmlwdC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0anNvbkNvbnRlbnQgPSBqc29uQ29udGVudFxuXHRcdFx0XHRcdC5yZXBsYWNlKC9cXC9cXCpbXFxzXFxTXSo/XFwqXFwvfF5cXHMqXFwvXFwvLiokL2dtLCAnJylcblx0XHRcdFx0XHQucmVwbGFjZSgvXlxccyo8IVxcW0NEQVRBXFxbKFtcXHNcXFNdKj8pXFxdXFxdPlxccyokLywgJyQxJylcblx0XHRcdFx0XHQucmVwbGFjZSgvXlxccyooXFwqXFwvfFxcL1xcKilcXHMqfFxccyooXFwqXFwvfFxcL1xcKilcXHMqJC9nLCAnJylcblx0XHRcdFx0XHQudHJpbSgpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRjb25zdCBqc29uRGF0YSA9IEpTT04ucGFyc2UoanNvbkNvbnRlbnQpO1xuXG5cdFx0XHRcdGlmIChqc29uRGF0YVsnQGdyYXBoJ10gJiYgQXJyYXkuaXNBcnJheShqc29uRGF0YVsnQGdyYXBoJ10pKSB7XG5cdFx0XHRcdFx0c2NoZW1hRGF0YS5wdXNoKC4uLmpzb25EYXRhWydAZ3JhcGgnXSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2NoZW1hRGF0YS5wdXNoKGpzb25EYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3IgcGFyc2luZyBzY2hlbWEub3JnIGRhdGE6JywgZXJyb3IpO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdQcm9ibGVtYXRpYyBKU09OIGNvbnRlbnQ6JywganNvbkNvbnRlbnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHNjaGVtYURhdGE7XG5cdH1cbn0iLCJpbXBvcnQgeyBNZXRhZGF0YUV4dHJhY3RvciB9IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IHsgRGVmdWRkbGVPcHRpb25zLCBEZWZ1ZGRsZVJlc3BvbnNlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8vIEVudHJ5IHBvaW50IGVsZW1lbnRzXG4vLyBUaGVzZSBhcmUgdGhlIGVsZW1lbnRzIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGZpbmQgdGhlIG1haW4gY29udGVudFxuY29uc3QgRU5UUllfUE9JTlRfRUxFTUVOVFMgPSBbXG5cdCdhcnRpY2xlJyxcblx0J1tyb2xlPVwiYXJ0aWNsZVwiXScsXG5cdCdbaXRlbXByb3A9XCJhcnRpY2xlQm9keVwiXScsXG5cdCcucG9zdC1jb250ZW50Jyxcblx0Jy5hcnRpY2xlLWNvbnRlbnQnLFxuXHQnI2FydGljbGUtY29udGVudCcsXG5cdCcuY29udGVudC1hcnRpY2xlJyxcblx0J21haW4nLFxuXHQnW3JvbGU9XCJtYWluXCJdJyxcblx0J2JvZHknIC8vIGVuc3VyZXMgdGhlcmUgaXMgYWx3YXlzIGEgbWF0Y2hcbl07XG5cbmNvbnN0IE1PQklMRV9XSURUSCA9IDYwMDtcbmNvbnN0IEJMT0NLX0VMRU1FTlRTID0gWydkaXYnLCAnc2VjdGlvbicsICdhcnRpY2xlJywgJ21haW4nXTtcblxuLy8gSGlkZGVuIGVsZW1lbnRzIHRoYXQgc2hvdWxkIGJlIHJlbW92ZWRcbmNvbnN0IEhJRERFTl9FTEVNRU5UX1NFTEVDVE9SUyA9IFtcblx0J1toaWRkZW5dJyxcblx0J1thcmlhLWhpZGRlbj1cInRydWVcIl0nLFxuLy9cdCdbc3R5bGUqPVwiZGlzcGxheTogbm9uZVwiXScsIGNhdXNlcyBwcm9ibGVtcyBmb3IgbWF0aCBmb3JtdWxhc1xuLy9cdCdbc3R5bGUqPVwiZGlzcGxheTpub25lXCJdJyxcblx0J1tzdHlsZSo9XCJ2aXNpYmlsaXR5OiBoaWRkZW5cIl0nLFxuXHQnW3N0eWxlKj1cInZpc2liaWxpdHk6aGlkZGVuXCJdJyxcblx0Jy5oaWRkZW4nLFxuXHQnLmludmlzaWJsZSdcbl0uam9pbignLCcpO1xuXG4vLyBTZWxlY3RvcnMgdG8gYmUgcmVtb3ZlZFxuLy8gQ2FzZSBpbnNlbnNpdGl2ZSwgYnV0IG1hdGNoZXMgbXVzdCBiZSBleGFjdFxuY29uc3QgRVhBQ1RfU0VMRUNUT1JTID0gW1xuXHQvLyBzY3JpcHRzLCBzdHlsZXNcblx0J25vc2NyaXB0Jyxcblx0J3NjcmlwdCcsXG5cdCdzdHlsZScsXG5cblx0Ly8gYWRzXG5cdCcuYWQ6bm90KFtjbGFzcyo9XCJncmFkaWVudFwiXSknLFxuXHQnW2NsYXNzXj1cImFkLVwiIGldJyxcblx0J1tjbGFzcyQ9XCItYWRcIiBpXScsXG5cdCdbaWRePVwiYWQtXCIgaV0nLFxuXHQnW2lkJD1cIi1hZFwiIGldJyxcblx0J1tyb2xlPVwiYmFubmVyXCIgaV0nLFxuXHQnW2NsYXNzPVwicHJvbW9cIiBpXScsXG5cblx0Ly8gY29tbWVudHNcblx0J1tpZD1cImNvbW1lbnRzXCIgaV0nLFxuXG5cdC8vIGhlYWRlciwgbmF2XG5cdCdoZWFkZXInLFxuXHQnbmF2Jyxcblx0J1tpZD1cImhlYWRlclwiIGldJyxcblx0J1tyb2xlPVwibmF2aWdhdGlvblwiIGldJyxcblx0J1tyb2xlPVwiZGlhbG9nXCIgaV0nLFxuXHQnW3JvbGU9XCJjb21wbGVtZW50YXJ5XCIgaV0nLFxuXHQnW2NsYXNzPVwicGFnaW5hdGlvblwiIGldJyxcblxuXHQvLyBtZXRhZGF0YVxuXHQnW2NsYXNzKj1cImF1dGhvclwiIGldJyxcblx0J1tjbGFzcz1cImRhdGVcIiBpXScsXG5cdCdbY2xhc3M9XCJtZXRhXCIgaV0nLFxuXHQnW2NsYXNzPVwidG9jXCIgaV0nLFxuXHQnW2hyZWYqPVwiL2NhdGVnb3J5XCIgaV0nLFxuXHQnW2hyZWYqPVwiL2NhdGVnb3JpZXNcIiBpXScsXG5cdCdbaHJlZio9XCIvdGFnL1wiIGldJyxcblx0J1tocmVmKj1cIi90YWdzL1wiIGldJyxcblx0J1tocmVmKj1cIi90b3BpY3NcIiBpXScsXG5cdCdbaHJlZio9XCJhdXRob3JcIiBpXScsXG5cdCdbaHJlZj1cIiNzaXRlLWNvbnRlbnRcIiBpXScsXG5cdCdbaWQ9XCJ0aXRsZVwiIGldJyxcblx0J1tpZD1cInRvY1wiIGldJyxcblx0J1tzcmMqPVwiYXV0aG9yXCIgaV0nLFxuXG5cdC8vIGZvb3RlclxuXHQnZm9vdGVyJyxcblxuXHQvLyBpbnB1dHMsIGZvcm1zLCBlbGVtZW50c1xuXHQnYXNpZGUnLFxuXHQnYnV0dG9uJyxcblx0J2NhbnZhcycsXG5cdCdkaWFsb2cnLFxuXHQnZmllbGRzZXQnLFxuXHQnZm9ybScsXG5cdCdpbnB1dCcsXG5cdCdsYWJlbCcsXG5cdCdsaW5rJyxcblx0J29wdGlvbicsXG5cdCdzZWxlY3QnLFxuXHQndGV4dGFyZWEnLFxuXHQndGltZScsXG5cdFx0Ly8gJ2lmcmFtZScgbWF5YmUgbmFycm93IHRoaXMgZG93biB0byBvbmx5IGFsbG93IGlmcmFtZXMgZm9yIHZpZGVvXG5cdFx0Ly8gJ1tyb2xlPVwiYnV0dG9uXCJdJywgTWVkaXVtIGltYWdlc1xuXG5cdC8vIGxvZ29zXG5cdCdbY2xhc3M9XCJsb2dvXCIgaV0nLFxuXHQnW2lkPVwibG9nb1wiIGldJyxcblxuXHQvLyBuZXdzbGV0dGVyXG5cdCdbaWQ9XCJuZXdzbGV0dGVyXCIgaV0nLFxuXG5cdC8vIGhpZGRlbiBmb3IgcHJpbnRcblx0J1tjbGFzcz1cIm5vcHJpbnRcIiBpXScsXG5cdCdbZGF0YS1saW5rLW5hbWUqPVwic2tpcFwiIGldJyxcblx0J1tkYXRhLXByaW50LWxheW91dD1cImhpZGVcIiBpXScsXG5cblx0Ly8gZm9vdG5vdGVzLCBjaXRhdGlvbnNcblx0J1tjbGFzcyo9XCJjbGlja2FibGUtaWNvblwiIGldJyxcblx0J2xpIHNwYW5bY2xhc3MqPVwibHR4X3RhZ1wiIGldW2NsYXNzKj1cImx0eF90YWdfaXRlbVwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cImFuY2hvclwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cInJlZlwiIGldJyxcblxuXHQvLyBsaW5rIGxpc3RzXG5cdCdbZGF0YS1jb250YWluZXIqPVwibW9zdC12aWV3ZWRcIiBpXScsXG5cblx0Ly8gc2lkZWJhclxuXHQnW2NsYXNzPVwic2lkZWJhclwiIGldJyxcblx0J1tpZD1cInNpZGViYXJcIiBpXScsXG5cdCdbaWQ9XCJzaXRlc3ViXCIgaV0nLFxuXHRcblx0Ly8gb3RoZXJcblx0J1tkYXRhLW9wdGltaXplbHk9XCJyZWxhdGVkLWFydGljbGVzLXNlY3Rpb25cIiBpXScgLy8gVGhlIEVjb25vbWlzdFxuXTtcblxuLy8gUmVtb3ZhbCBwYXR0ZXJucyB0ZXN0ZWQgYWdhaW5zdCBhdHRyaWJ1dGVzOiBjbGFzcywgaWQsIGRhdGEtdGVzdGlkLCBhbmQgZGF0YS1xYVxuLy8gQ2FzZSBpbnNlbnNpdGl2ZSwgcGFydGlhbCBtYXRjaGVzIGFsbG93ZWRcbmNvbnN0IFBBUlRJQUxfU0VMRUNUT1JTID0gW1xuXHQnYWNjZXNzLXdhbGwnLFxuXHQnYWN0aXZpdHlwdWInLFxuXHQnYXBwZW5kaXgnLFxuXHQnYXZhdGFyJyxcblx0J2FkdmVydCcsXG5cdCctYWQtJyxcblx0J19hZF8nLFxuXHQnYWxsdGVybXMnLFxuXHQnYXJvdW5kLXRoZS13ZWInLFxuXHQnYXJ0aWNsZV9fY29weScsXG5cdCdhcnRpY2xlX2RhdGUnLFxuXHQnYXJ0aWNsZS1lbmQgJyxcblx0J2FydGljbGVfaGVhZGVyJyxcblx0J2FydGljbGVfX2hlYWRlcicsXG5cdCdhcnRpY2xlX19pbmZvJyxcblx0J2FydGljbGVfX21ldGEnLFxuXHQnYXJ0aWNsZS1zdWJqZWN0Jyxcblx0J2FydGljbGVfc3ViamVjdCcsXG5cdCdhcnRpY2xlLXRpdGxlJyxcblx0J2FydGljbGVfdGl0bGUnLFxuXHQnYXJ0aWNsZXRvcGljcycsXG5cdCdhcnRpY2xlLXRvcGljcycsXG5cdCdhcnRpY2xlLXR5cGUnLFxuXHQnYXJ0aWNsZS0tbGVkZScsIC8vIFRoZSBWZXJnZVxuXHQnYXV0aG9yJyxcblx0J2JhY2stdG8tdG9wJyxcblx0J2Jhbm5lcicsXG5cdCdiaW8tYmxvY2snLFxuXHQnYm90dG9tLW9mLWFydGljbGUnLFxuXHQnYnJhbmQtYmFyJyxcblx0J2JyZWFkY3J1bWInLFxuXHQnYnV0dG9uLXdyYXBwZXInLFxuXHQnYnRuLScsXG5cdCctYnRuJyxcblx0J2J5bGluZScsXG5cdCdjYXRfaGVhZGVyJyxcblx0J2NhdGxpbmtzJyxcblx0J2NoYXB0ZXItbGlzdCcsIC8vIFRoZSBFY29ub21pc3Rcblx0J2NvbGxlY3Rpb25zJyxcblx0J2NvbW1lbnRzJyxcblx0J2NvbW1lbnQtY291bnQnLFxuXHQnY29tbWVudC1jb250ZW50Jyxcblx0J2NvbW1lbnQtZm9ybScsXG5cdCdjb21tZW50LXJlc3BvbmQnLFxuXHQnY29tbWVudC10aHJlYWQnLFxuXHQnY29tcGxlbWVudGFyeScsXG5cdCdjb250ZW50LWNhcmQnLCAvLyBUaGUgVmVyZ2Vcblx0J2NvbnRlbnRwcm9tbycsXG5cdCdjb3JlLWNvbGxhdGVyYWwnLFxuXHQnX2N0YScsXG5cdCctY3RhJyxcblx0J2N0YS0nLFxuXHQnY3RhXycsXG5cdCdjdXJyZW50LWlzc3VlJywgLy8gVGhlIE5hdGlvblxuXHQnZGF0ZWxpbmUnLFxuXHQnZGF0ZWhlYWRlcicsXG5cdCdkaWFsb2cnLFxuXHQnZGlzY2xhaW1lcicsXG5cdCdkaXNjbG9zdXJlJyxcblx0J2Rpc2N1c3Npb24nLFxuXHQnZGlzcXVzJyxcblx0J2RvbmF0ZScsXG5cdCdkcm9wZG93bicsIC8vIEFycyBUZWNobmljYVxuXHQnZWxldHRlcnMnLFxuXHQnZW1haWxzaWdudXAnLFxuXHQnZW5nYWdlbWVudC13aWRnZXQnLFxuXHQnZW50cnktZGF0ZScsXG5cdCdlbnRyeS1tZXRhJyxcblx0J2V5ZWJyb3cnLFxuXHQnZXhwYW5kLXJlZHVjZScsXG5cdCdmYWNlYm9vaycsXG5cdCdmYXZvcml0ZScsXG5cdCdmZWVkYmFjaycsXG5cdCdmaWVsZC1zaXRlLXNlY3Rpb25zJyxcblx0J2ZpeGVkJyxcblx0J2ZvbGxvdycsXG5cdCdmb290ZXInLFxuXHQnZm9vdG5vdGUtYmFjaycsXG5cdCdmb290bm90ZWJhY2snLFxuXHQnZm9yLXlvdScsXG5cdCdmcm9udG1hdHRlcicsXG5cdCdnaXN0LW1ldGEnLFxuLy9cdCdnbG9iYWwnLFxuXHQnZ29vZ2xlJyxcblx0J2dvb2ctJyxcblx0J2hlYWRlci1sb2dvJyxcblx0J2hlYWRlci1wYXR0ZXJuJywgLy8gVGhlIFZlcmdlXG5cdCdoZXJvLWxpc3QnLFxuXHQnaGlkZS1mb3ItcHJpbnQnLFxuXHQnaGlkZS1wcmludCcsXG5cdCdpbnRlcmx1ZGUnLFxuXHQnaW50ZXJhY3Rpb24nLFxuXHQna2V5d29yZCcsXG5cdCdraWNrZXInLFxuXHQnLWxhYmVscycsXG5cdCdsYXRlc3QtY29udGVudCcsXG5cdCctbGVkZXMtJywgLy8gVGhlIFZlcmdlXG5cdCctbGljZW5zZScsXG5cdCdsaW5rLWJveCcsXG5cdCdsaW5rcy1ncmlkJywgLy8gQkJDXG5cdCdsaW5rcy10aXRsZScsIC8vIEJCQ1xuXHQnbGlzdGluZy1keW5hbWljLXRlcm1zJywgLy8gQm9zdG9uIFJldmlld1xuXHQnbG9hZGluZycsXG5cdCdsb2EtaW5mbycsXG5cdCdsb2dvX2NvbnRhaW5lcicsXG5cdCdsdHhfcm9sZV9yZWZudW0nLCAvLyBBcnhpdlxuXHQnbHR4X3RhZ19iaWJpdGVtJyxcblx0J2x0eF9lcnJvcicsXG5cdCdtYXJrZXRpbmcnLFxuXHQnbWVkaWEtaW5xdWlyeScsXG5cdCdtZW51LScsXG5cdCdtZXRhLScsXG5cdCdtZXRhZGF0YScsXG5cdCdtaWdodC1saWtlJyxcblx0J19tb2RhbCcsXG5cdCctbW9kYWwnLFxuXHQnbW9yZS0nLFxuXHQnbW9yZW5ld3MnLFxuXHQnbW9yZXN0b3JpZXMnLFxuXHQnbXctZWRpdHNlY3Rpb24nLFxuXHQnbXctY2l0ZS1iYWNrbGluaycsXG5cdCdtdy1qdW1wLWxpbmsnLFxuXHQnbmF2LScsXG5cdCduYXZiYXInLFxuXHQnbmF2aWdhdGlvbicsXG5cdCduZXh0LScsXG5cdCduZXdzLXN0b3J5LXRpdGxlJyxcbi8vXHQnbmV3c2xldHRlcicsIHVzZWQgb24gU3Vic3RhY2tcblx0J25ld3NsZXR0ZXJfJyxcblx0J25ld3NsZXR0ZXItc2lnbnVwJyxcblx0J25ld3NsZXR0ZXJzaWdudXAnLFxuXHQnbmV3c2xldHRlcndpZGdldCcsXG5cdCduZXdzbGV0dGVyd3JhcHBlcicsXG5cdCdub3QtZm91bmQnLFxuXHQnb3JpZ2luYWxseS1wdWJsaXNoZWQnLCAvLyBNZXJjdXJ5IE5ld3Ncblx0J292ZXJsYXknLFxuXHQncGFnZS10aXRsZScsXG5cdCctcGFydG5lcnMnLFxuXHQncGVuY3JhZnQnLCAvLyBTdWJzdGFja1xuXHQncGxlYScsXG5cdCdwb3B1bGFyJyxcblx0J3BvcHVwJyxcblx0J3BvcC11cCcsXG5cdCdwb3N0LWJvdHRvbScsXG5cdCdwb3N0X19jYXRlZ29yeScsXG5cdCdwb3N0Y29tbWVudCcsXG5cdCdwb3N0ZGF0ZScsXG5cdCdwb3N0LWRhdGUnLFxuXHQncG9zdF9kYXRlJyxcblx0J3Bvc3RpbmZvJyxcblx0J3Bvc3QtaW5mbycsXG5cdCdwb3N0X2luZm8nLFxuXHQncG9zdC1saW5rcycsXG5cdCdwb3N0LW1ldGEnLFxuXHQncG9zdG1ldGEnLFxuXHQncG9zdHNuaXBwZXQnLFxuXHQncG9zdF9zbmlwcGV0Jyxcblx0J3Bvc3Qtc25pcHBldCcsXG5cdCdwb3N0dGl0bGUnLFxuXHQncG9zdC10aXRsZScsXG5cdCdwb3N0X3RpdGxlJyxcblx0J3Bvc3R0YXgnLFxuXHQncG9zdC10YXgnLFxuXHQncG9zdF90YXgnLFxuXHQncG9zdHRhZycsXG5cdCdwb3N0X3RhZycsXG5cdCdwb3N0LXRhZycsXG4vL1x0J3ByZXZpZXcnLCB1c2VkIG9uIE9ic2lkaWFuIFB1Ymxpc2hcblx0J3ByZXZuZXh0Jyxcblx0J3ByZXZpb3VzbmV4dCcsXG5cdCdwcmludC1ub25lJyxcblx0J3Byb2ZpbGUnLFxuLy9cdCdwcm9tbycsXG5cdCdwdWJkYXRlJyxcblx0J3B1Yl9kYXRlJyxcblx0J3B1Yi1kYXRlJyxcblx0J3B1YmxpY2F0aW9uLWRhdGUnLFxuXHQncHVibGljYXRpb25OYW1lJywgLy8gTWVkaXVtXG5cdCdxci1jb2RlJyxcblx0J3FyX2NvZGUnLFxuXHQncmVhZG1vcmUnLFxuXHQncmVhZC1uZXh0Jyxcblx0J3JlYWRfbmV4dCcsXG5cdCdyZWFkX3RpbWUnLFxuXHQncmVhZC10aW1lJyxcblx0J3JlYWRpbmdfdGltZScsXG5cdCdyZWFkaW5nLXRpbWUnLFxuXHQncmVhZGluZy1saXN0Jyxcblx0J3JlY29tbWVuZCcsXG5cdCdyZWNpcmMnLFxuXHQncmVnaXN0ZXInLFxuXHQncmVsYXRlZCcsXG5cdCdzY3JlZW4tcmVhZGVyLXRleHQnLFxuLy9cdCdzaGFyZScsXG4vL1x0Jy1zaGFyZScsIHNjaXRlY2hkYWlseS5jb21cblx0J3NoYXJlLWljb25zJyxcblx0J3NoYXJlbGlua3MnLFxuXHQnc2hhcmUtc2VjdGlvbicsXG5cdCdzaWRlYmFydGl0bGUnLFxuXHQnc2ltaWxhci0nLFxuXHQnc2ltaWxhcl8nLFxuXHQnc2l0ZS1pbmRleCcsXG5cdCdzaXRlLWhlYWRlcicsXG5cdCdzaXRlLWxvZ28nLFxuXHQnc2l0ZS1uYW1lJyxcbi8vXHQnc2tpcC0nLFxuXHQnc2tpcC1saW5rJyxcblx0J3NvY2lhbCcsXG5cdCdzcGVlY2hpZnktaWdub3JlJyxcblx0J3Nwb25zb3InLFxuLy9cdCctc3RhdHMnLFxuXHQnX3N0YXRzJyxcblx0J3N0b3J5cmVhZHRpbWUnLCAvLyBNZWRpdW1cblx0J3N0b3J5cHVibGlzaGRhdGUnLCAvLyBNZWRpdW1cblx0J3N1YmplY3QtbGFiZWwnLFxuXHQnc3Vic2NyaWJlJyxcblx0J190YWdzJyxcblx0J3RhZ3NfX2l0ZW0nLFxuXHQndGFnX2xpc3QnLFxuXHQndGF4b25vbXknLFxuXHQndGFibGUtb2YtY29udGVudHMnLFxuXHQndGFicy0nLFxuLy9cdCd0ZWFzZXInLCBOYXR1cmVcblx0J3Rlcm1pbmFsdG91dCcsXG5cdCd0aW1lLXJ1YnJpYycsXG5cdCd0aW1lc3RhbXAnLFxuXHQndGlwX29mZicsXG5cdCd0aXB0b3V0Jyxcblx0Jy10b2MnLFxuXHQndG9waWMtbGlzdCcsXG5cdCd0b29sYmFyJyxcblx0J3Rvb2x0aXAnLFxuXHQndG9wLXdyYXBwZXInLFxuXHQndHJlZS1pdGVtJyxcblx0J3RyZW5kaW5nJyxcblx0J3RydXN0LWZlYXQnLFxuXHQndHdpdHRlcidcbl07XG5cbi8vIFNlbGVjdG9ycyBmb3IgZm9vdG5vdGVzIGFuZCBjaXRhdGlvbnNcbmNvbnN0IEZPT1ROT1RFX1NFTEVDVE9SUyA9IFtcblx0J3N1cC5yZWZlcmVuY2UnLFxuXHQnY2l0ZS5sdHhfY2l0ZScsXG5cdCdzdXBbaWRePVwiZm5yXCJdJyxcblx0J3N1cFtpZF49XCJmbnJlZjpcIl0nLFxuXHQnc3Bhbi5mb290bm90ZS1saW5rJyxcblx0J2EuY2l0YXRpb24nLFxuXHQnYVtocmVmXj1cIiNmblwiXScsXG5cdCdhW2hyZWZePVwiI2NpdGVcIl0nLFxuXHQnYVtocmVmXj1cIiNyZWZlcmVuY2VcIl0nLFxuXHQnYVtocmVmXj1cIiNmb290bm90ZVwiXScsXG5cdCdhW2hyZWZePVwiI3JcIl0nLCAvLyBDb21tb24gaW4gYWNhZGVtaWMgcGFwZXJzXG5cdCdhW2hyZWZePVwiI2JcIl0nLCAvLyBDb21tb24gZm9yIGJpYmxpb2dyYXBoeSByZWZlcmVuY2VzXG5cdCdhW2hyZWYqPVwiY2l0ZV9ub3RlXCJdJyxcblx0J2FbaHJlZio9XCJjaXRlX3JlZlwiXScsXG5cdCdhLmZvb3Rub3RlLWFuY2hvcicsIC8vIFN1YnN0YWNrXG5cdCdzcGFuLmZvb3Rub3RlLWhvdmVyY2FyZC10YXJnZXQgYScsIC8vIFN1YnN0YWNrXG5cdCdhW3JvbGU9XCJkb2MtYmlibGlvcmVmXCJdJyAvLyBTY2llbmNlLm9yZ1xuXS5qb2luKCcsJyk7XG5cbmNvbnN0IEZPT1ROT1RFX0xJU1RfU0VMRUNUT1JTID0gW1xuXHQnZGl2LmZvb3Rub3RlIG9sJyxcblx0J2Rpdi5mb290bm90ZXMgb2wnLFxuXHQnZGl2W3JvbGU9XCJkb2MtZW5kbm90ZXNcIl0nLFxuXHQnZGl2W3JvbGU9XCJkb2MtZm9vdG5vdGVzXCJdJyxcblx0J29sLmZvb3Rub3Rlcy1saXN0Jyxcblx0J29sLnJlZmVyZW5jZXMnLFxuXHQnc2VjdGlvbi5mb290bm90ZXMgb2wnLFxuXHQnc2VjdGlvbltyb2xlPVwiZG9jLWVuZG5vdGVzXCJdJyxcblx0J3NlY3Rpb25bcm9sZT1cImRvYy1mb290bm90ZXNcIl0nLFxuXHQnc2VjdGlvbltyb2xlPVwiZG9jLWJpYmxpb2dyYXBoeVwiXScsXG5cdCd1bC5mb290bm90ZXMtbGlzdCcsXG5cdCd1bC5sdHhfYmlibGlzdCcsXG5cdCdkaXYuZm9vdG5vdGVbZGF0YS1jb21wb25lbnQtbmFtZT1cIkZvb3Rub3RlVG9ET01cIl0nIC8vIFN1YnN0YWNrXG5dLmpvaW4oJywnKTtcblxuaW50ZXJmYWNlIEZvb3Rub3RlRGF0YSB7XG5cdGNvbnRlbnQ6IEVsZW1lbnQgfCBzdHJpbmc7XG5cdG9yaWdpbmFsSWQ6IHN0cmluZztcblx0cmVmczogc3RyaW5nW107XG59XG5cbmludGVyZmFjZSBGb290bm90ZUNvbGxlY3Rpb24ge1xuXHRbZm9vdG5vdGVOdW1iZXI6IG51bWJlcl06IEZvb3Rub3RlRGF0YTtcbn1cblxuLy8gRWxlbWVudHMgdGhhdCBhcmUgYWxsb3dlZCB0byBiZSBlbXB0eVxuLy8gVGhlc2UgYXJlIG5vdCByZW1vdmVkIGV2ZW4gaWYgdGhleSBoYXZlIG5vIGNvbnRlbnRcbmNvbnN0IEFMTE9XRURfRU1QVFlfRUxFTUVOVFMgPSBuZXcgU2V0KFtcblx0J2FyZWEnLFxuXHQnYXVkaW8nLFxuXHQnYmFzZScsXG5cdCdicicsXG5cdCdjaXJjbGUnLFxuXHQnY29sJyxcblx0J2RlZnMnLFxuXHQnZWxsaXBzZScsXG5cdCdlbWJlZCcsXG5cdCdmaWd1cmUnLFxuXHQnZycsXG5cdCdocicsXG5cdCdpZnJhbWUnLFxuXHQnaW1nJyxcblx0J2lucHV0Jyxcblx0J2xpbmUnLFxuXHQnbGluaycsXG5cdCdtYXNrJyxcblx0J21ldGEnLFxuXHQnb2JqZWN0Jyxcblx0J3BhcmFtJyxcblx0J3BhdGgnLFxuXHQncGF0dGVybicsXG5cdCdwaWN0dXJlJyxcblx0J3BvbHlnb24nLFxuXHQncG9seWxpbmUnLFxuXHQncmVjdCcsXG5cdCdzb3VyY2UnLFxuXHQnc3RvcCcsXG5cdCdzdmcnLFxuXHQndGQnLFxuXHQndGgnLFxuXHQndHJhY2snLFxuXHQndXNlJyxcblx0J3ZpZGVvJyxcblx0J3dicidcbl0pO1xuXG4vLyBBdHRyaWJ1dGVzIHRvIGtlZXBcbmNvbnN0IEFMTE9XRURfQVRUUklCVVRFUyA9IG5ldyBTZXQoW1xuXHQnYWx0Jyxcblx0J2FsbG93Jyxcblx0J2FsbG93ZnVsbHNjcmVlbicsXG5cdCdhcmlhLWxhYmVsJyxcblx0J2NsYXNzJyxcblx0J2NvbHNwYW4nLFxuXHQnY29udHJvbHMnLFxuXHQnZGF0YS1zcmMnLFxuXHQnZGF0YS1zcmNzZXQnLFxuXHQnZGlyJyxcblx0J2ZyYW1lYm9yZGVyJyxcblx0J2hlYWRlcnMnLFxuXHQnaGVpZ2h0Jyxcblx0J2hyZWYnLFxuXHQnaWQnLFxuXHQnbGFuZycsXG5cdCdyb2xlJyxcblx0J3Jvd3NwYW4nLFxuXHQnc3JjJyxcblx0J3NyY3NldCcsXG5cdCd0aXRsZScsXG5cdCd0eXBlJyxcblx0J3dpZHRoJ1xuXSk7XG5cbmludGVyZmFjZSBDb250ZW50U2NvcmUge1xuXHRzY29yZTogbnVtYmVyO1xuXHRlbGVtZW50OiBFbGVtZW50O1xufVxuXG5pbnRlcmZhY2UgU3R5bGVDaGFuZ2Uge1xuXHRzZWxlY3Rvcjogc3RyaW5nO1xuXHRzdHlsZXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlZnVkZGxlIHtcblx0cHJpdmF0ZSBkb2M6IERvY3VtZW50O1xuXHRwcml2YXRlIG9wdGlvbnM6IERlZnVkZGxlT3B0aW9ucztcblx0cHJpdmF0ZSBkZWJ1ZzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IERlZnVkZGxlIGluc3RhbmNlXG5cdCAqIEBwYXJhbSBkb2MgLSBUaGUgZG9jdW1lbnQgdG8gcGFyc2Vcblx0ICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciBwYXJzaW5nXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihkb2M6IERvY3VtZW50LCBvcHRpb25zOiBEZWZ1ZGRsZU9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuZG9jID0gZG9jO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0dGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWcgfHwgZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgdGhlIGRvY3VtZW50IGFuZCBleHRyYWN0IGl0cyBtYWluIGNvbnRlbnRcblx0ICovXG5cdHBhcnNlKCk6IERlZnVkZGxlUmVzcG9uc2Uge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBFdmFsdWF0ZSBzdHlsZXMgYW5kIHNpemVzIG9uIG9yaWdpbmFsIGRvY3VtZW50XG5cdFx0XHRjb25zdCBtb2JpbGVTdHlsZXMgPSB0aGlzLl9ldmFsdWF0ZU1lZGlhUXVlcmllcyh0aGlzLmRvYyk7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGZvciBzbWFsbCBpbWFnZXMgaW4gb3JpZ2luYWwgZG9jdW1lbnQsIGV4Y2x1ZGluZyBsYXp5LWxvYWRlZCBvbmVzXG5cdFx0XHRjb25zdCBzbWFsbEltYWdlcyA9IHRoaXMuZmluZFNtYWxsSW1hZ2VzKHRoaXMuZG9jKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ2xvbmUgZG9jdW1lbnRcblx0XHRcdGNvbnN0IGNsb25lID0gdGhpcy5kb2MuY2xvbmVOb2RlKHRydWUpIGFzIERvY3VtZW50O1xuXHRcdFx0Y29uc3Qgc2NoZW1hT3JnRGF0YSA9IE1ldGFkYXRhRXh0cmFjdG9yLmV4dHJhY3RTY2hlbWFPcmdEYXRhKHRoaXMuZG9jKTtcblx0XHRcdFxuXHRcdFx0Ly8gQXBwbHkgbW9iaWxlIHN0eWxlIHRvIGNsb25lXG5cdFx0XHR0aGlzLmFwcGx5TW9iaWxlU3R5bGVzKGNsb25lLCBtb2JpbGVTdHlsZXMpO1xuXG5cdFx0XHQvLyBGaW5kIG1haW4gY29udGVudFxuXHRcdFx0Y29uc3QgbWFpbkNvbnRlbnQgPSB0aGlzLmZpbmRNYWluQ29udGVudChjbG9uZSk7XG5cdFx0XHRpZiAoIW1haW5Db250ZW50KSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y29udGVudDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUwsXG5cdFx0XHRcdFx0Li4uTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdCh0aGlzLmRvYywgc2NoZW1hT3JnRGF0YSlcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIHNtYWxsIGltYWdlcyBpZGVudGlmaWVkIGZyb20gb3JpZ2luYWwgZG9jdW1lbnRcblx0XHRcdHRoaXMucmVtb3ZlU21hbGxJbWFnZXMoY2xvbmUsIHNtYWxsSW1hZ2VzKTtcblx0XHRcdFxuXHRcdFx0Ly8gUGVyZm9ybSBvdGhlciBkZXN0cnVjdGl2ZSBvcGVyYXRpb25zIG9uIHRoZSBjbG9uZVxuXHRcdFx0dGhpcy5yZW1vdmVIaWRkZW5FbGVtZW50cyhjbG9uZSk7XG5cdFx0XHR0aGlzLnJlbW92ZUNsdXR0ZXIoY2xvbmUpO1xuXG5cdFx0XHQvLyBDbGVhbiB1cCB0aGUgbWFpbiBjb250ZW50XG5cdFx0XHR0aGlzLmNsZWFuQ29udGVudChtYWluQ29udGVudCk7XG5cblx0XHRcdGNvbnN0IG1ldGFkYXRhID0gTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdCh0aGlzLmRvYywgc2NoZW1hT3JnRGF0YSk7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvbnRlbnQ6IG1haW5Db250ZW50ID8gbWFpbkNvbnRlbnQub3V0ZXJIVE1MIDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUwsXG5cdFx0XHRcdC4uLm1ldGFkYXRhXG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZScsICdFcnJvciBwcm9jZXNzaW5nIGRvY3VtZW50OicsIGVycm9yKTtcblx0XHRcdGNvbnN0IHNjaGVtYU9yZ0RhdGEgPSBNZXRhZGF0YUV4dHJhY3Rvci5leHRyYWN0U2NoZW1hT3JnRGF0YSh0aGlzLmRvYyk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb250ZW50OiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTCxcblx0XHRcdFx0Li4uTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdCh0aGlzLmRvYywgc2NoZW1hT3JnRGF0YSlcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0Ly8gTWFrZSBhbGwgb3RoZXIgbWV0aG9kcyBwcml2YXRlIGJ5IHJlbW92aW5nIHRoZSBzdGF0aWMga2V5d29yZCBhbmQgdXNpbmcgcHJpdmF0ZVxuXHRwcml2YXRlIF9sb2coLi4uYXJnczogYW55W10pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0Y29uc29sZS5sb2coJ0RlZnVkZGxlOicsIC4uLmFyZ3MpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2V2YWx1YXRlTWVkaWFRdWVyaWVzKGRvYzogRG9jdW1lbnQpOiBTdHlsZUNoYW5nZVtdIHtcblx0XHRjb25zdCBtb2JpbGVTdHlsZXM6IFN0eWxlQ2hhbmdlW10gPSBbXTtcblx0XHRjb25zdCBtYXhXaWR0aFJlZ2V4ID0gL21heC13aWR0aFteOl0qOlxccyooXFxkKykvO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIEdldCBhbGwgc3R5bGVzLCBpbmNsdWRpbmcgaW5saW5lIHN0eWxlc1xuXHRcdFx0Y29uc3Qgc2hlZXRzID0gQXJyYXkuZnJvbShkb2Muc3R5bGVTaGVldHMpLmZpbHRlcihzaGVldCA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gQWNjZXNzIHJ1bGVzIG9uY2UgdG8gY2hlY2sgdmFsaWRpdHlcblx0XHRcdFx0XHRzaGVldC5jc3NSdWxlcztcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdC8vIEV4cGVjdGVkIGVycm9yIGZvciBjcm9zcy1vcmlnaW4gc3R5bGVzaGVldHNcblx0XHRcdFx0XHRpZiAoZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlLm5hbWUgPT09ICdTZWN1cml0eUVycm9yJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly8gUHJvY2VzcyBhbGwgc2hlZXRzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRcdGNvbnN0IG1lZGlhUnVsZXMgPSBzaGVldHMuZmxhdE1hcChzaGVldCA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmV0dXJuIEFycmF5LmZyb20oc2hlZXQuY3NzUnVsZXMpXG5cdFx0XHRcdFx0XHQuZmlsdGVyKChydWxlKTogcnVsZSBpcyBDU1NNZWRpYVJ1bGUgPT4gXG5cdFx0XHRcdFx0XHRcdHJ1bGUgaW5zdGFuY2VvZiBDU1NNZWRpYVJ1bGUgJiZcblx0XHRcdFx0XHRcdFx0cnVsZS5jb25kaXRpb25UZXh0LmluY2x1ZGVzKCdtYXgtd2lkdGgnKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBzdHlsZXNoZWV0OicsIGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBQcm9jZXNzIGFsbCBtZWRpYSBydWxlcyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0XHRtZWRpYVJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1hdGNoID0gcnVsZS5jb25kaXRpb25UZXh0Lm1hdGNoKG1heFdpZHRoUmVnZXgpO1xuXHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRjb25zdCBtYXhXaWR0aCA9IHBhcnNlSW50KG1hdGNoWzFdKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZiAoTU9CSUxFX1dJRFRIIDw9IG1heFdpZHRoKSB7XG5cdFx0XHRcdFx0XHQvLyBCYXRjaCBwcm9jZXNzIGFsbCBzdHlsZSBydWxlc1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3R5bGVSdWxlcyA9IEFycmF5LmZyb20ocnVsZS5jc3NSdWxlcylcblx0XHRcdFx0XHRcdFx0LmZpbHRlcigocik6IHIgaXMgQ1NTU3R5bGVSdWxlID0+IHIgaW5zdGFuY2VvZiBDU1NTdHlsZVJ1bGUpO1xuXG5cdFx0XHRcdFx0XHRzdHlsZVJ1bGVzLmZvckVhY2goY3NzUnVsZSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0bW9iaWxlU3R5bGVzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0b3I6IGNzc1J1bGUuc2VsZWN0b3JUZXh0LFxuXHRcdFx0XHRcdFx0XHRcdFx0c3R5bGVzOiBjc3NSdWxlLnN0eWxlLmNzc1RleHRcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBDU1MgcnVsZTonLCBlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignRGVmdWRkbGU6IEVycm9yIGV2YWx1YXRpbmcgbWVkaWEgcXVlcmllczonLCBlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbW9iaWxlU3R5bGVzO1xuXHR9XG5cblx0cHJpdmF0ZSBhcHBseU1vYmlsZVN0eWxlcyhkb2M6IERvY3VtZW50LCBtb2JpbGVTdHlsZXM6IFN0eWxlQ2hhbmdlW10pIHtcblx0XHRsZXQgYXBwbGllZENvdW50ID0gMDtcblxuXHRcdG1vYmlsZVN0eWxlcy5mb3JFYWNoKCh7c2VsZWN0b3IsIHN0eWxlc30pID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFxuXHRcdFx0XHRcdFx0KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpIHx8ICcnKSArIHN0eWxlc1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YXBwbGllZENvdW50Kys7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZScsICdFcnJvciBhcHBseWluZyBzdHlsZXMgZm9yIHNlbGVjdG9yOicsIHNlbGVjdG9yLCBlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVIaWRkZW5FbGVtZW50cyhkb2M6IERvY3VtZW50KSB7XG5cdFx0bGV0IGNvdW50ID0gMDtcblx0XHRjb25zdCBlbGVtZW50c1RvUmVtb3ZlID0gbmV3IFNldDxFbGVtZW50PigpO1xuXG5cdFx0Ly8gRmlyc3QgcGFzczogR2V0IGFsbCBlbGVtZW50cyBtYXRjaGluZyBoaWRkZW4gc2VsZWN0b3JzXG5cdFx0Y29uc3QgaGlkZGVuRWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMpO1xuXHRcdGhpZGRlbkVsZW1lbnRzLmZvckVhY2goZWwgPT4gZWxlbWVudHNUb1JlbW92ZS5hZGQoZWwpKTtcblx0XHRjb3VudCArPSBoaWRkZW5FbGVtZW50cy5sZW5ndGg7XG5cblx0XHQvLyBTZWNvbmQgcGFzczogVXNlIFRyZWVXYWxrZXIgZm9yIGVmZmljaWVudCB0cmF2ZXJzYWxcblx0XHRjb25zdCB0cmVlV2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcblx0XHRcdGRvYy5ib2R5LFxuXHRcdFx0Tm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsXG5cdFx0XHR7XG5cdFx0XHRcdGFjY2VwdE5vZGU6IChub2RlOiBFbGVtZW50KSA9PiB7XG5cdFx0XHRcdFx0Ly8gU2tpcCBlbGVtZW50cyBhbHJlYWR5IG1hcmtlZCBmb3IgcmVtb3ZhbFxuXHRcdFx0XHRcdGlmIChlbGVtZW50c1RvUmVtb3ZlLmhhcyhub2RlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX1JFSkVDVDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHQvLyBCYXRjaCBzdHlsZSBjb21wdXRhdGlvbnNcblx0XHRjb25zdCBlbGVtZW50czogRWxlbWVudFtdID0gW107XG5cdFx0bGV0IGN1cnJlbnROb2RlOiBFbGVtZW50IHwgbnVsbDtcblx0XHR3aGlsZSAoY3VycmVudE5vZGUgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkgYXMgRWxlbWVudCkge1xuXHRcdFx0ZWxlbWVudHMucHVzaChjdXJyZW50Tm9kZSk7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvY2VzcyBzdHlsZXMgaW4gYmF0Y2hlcyB0byBtaW5pbWl6ZSBsYXlvdXQgdGhyYXNoaW5nXG5cdFx0Y29uc3QgQkFUQ0hfU0laRSA9IDEwMDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSArPSBCQVRDSF9TSVpFKSB7XG5cdFx0XHRjb25zdCBiYXRjaCA9IGVsZW1lbnRzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcblx0XHRcdFxuXHRcdFx0Ly8gUmVhZCBwaGFzZSAtIGdhdGhlciBhbGwgY29tcHV0ZWRTdHlsZXNcblx0XHRcdGNvbnN0IHN0eWxlcyA9IGJhdGNoLm1hcChlbCA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkpO1xuXHRcdFx0XG5cdFx0XHQvLyBXcml0ZSBwaGFzZSAtIG1hcmsgZWxlbWVudHMgZm9yIHJlbW92YWxcblx0XHRcdGJhdGNoLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBzdHlsZXNbaW5kZXhdO1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHxcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLnZpc2liaWxpdHkgPT09ICdoaWRkZW4nIHx8XG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS5vcGFjaXR5ID09PSAnMCdcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5hZGQoZWxlbWVudCk7XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gRmluYWwgcGFzczogQmF0Y2ggcmVtb3ZlIGFsbCBoaWRkZW4gZWxlbWVudHNcblx0XHRlbGVtZW50c1RvUmVtb3ZlLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIGhpZGRlbiBlbGVtZW50czonLCBjb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUNsdXR0ZXIoZG9jOiBEb2N1bWVudCkge1xuXHRcdGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdGxldCBleGFjdFNlbGVjdG9yQ291bnQgPSAwO1xuXHRcdGxldCBwYXJ0aWFsU2VsZWN0b3JDb3VudCA9IDA7XG5cblx0XHQvLyBDb21iaW5lIGFsbCBleGFjdCBzZWxlY3RvcnMgaW50byBhIHNpbmdsZSBzZWxlY3RvciBzdHJpbmdcblx0XHRjb25zdCBjb21iaW5lZEV4YWN0U2VsZWN0b3IgPSBFWEFDVF9TRUxFQ1RPUlMuam9pbignLCcpO1xuXHRcdFxuXHRcdC8vIEZpcnN0IHBhc3M6IFJlbW92ZSBlbGVtZW50cyBtYXRjaGluZyBleGFjdCBzZWxlY3RvcnNcblx0XHRjb25zdCBleGFjdEVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoY29tYmluZWRFeGFjdFNlbGVjdG9yKTtcblx0XHRpZiAoZXhhY3RFbGVtZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHQvLyBCYXRjaCByZW1vdmUgZWxlbWVudHNcblx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0ZXhhY3RFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdFx0aWYgKGVsPy5wYXJlbnROb2RlKSB7XG5cdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWwpO1xuXHRcdFx0XHRcdGV4YWN0U2VsZWN0b3JDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBTZWNvbmQgcGFzczogSGFuZGxlIHBhcnRpYWwgc2VsZWN0b3JzXG5cdFx0Ly8gUHJlLWNvbXBpbGUgcmVnZXhlcyBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG5cdFx0Y29uc3QgcGFydGlhbFJlZ2V4ZXMgPSBQQVJUSUFMX1NFTEVDVE9SUy5tYXAocGF0dGVybiA9PiAoe1xuXHRcdFx0cGF0dGVybixcblx0XHRcdHJlZ2V4OiBuZXcgUmVnRXhwKHBhdHRlcm4sICdpJylcblx0XHR9KSk7XG5cblx0XHQvLyBDcmVhdGUgYW4gZWZmaWNpZW50IGxvb2t1cCBmb3IgcGFydGlhbCBtYXRjaGVzXG5cdFx0Y29uc3Qgc2hvdWxkUmVtb3ZlRWxlbWVudCA9IChlbDogRWxlbWVudCk6IGJvb2xlYW4gPT4ge1xuXHRcdFx0Ly8gR2V0IGFsbCByZWxldmFudCBhdHRyaWJ1dGVzIG9uY2Vcblx0XHRcdGNvbnN0IGNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZSAmJiB0eXBlb2YgZWwuY2xhc3NOYW1lID09PSAnc3RyaW5nJyA/IFxuXHRcdFx0XHRlbC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHRcdFx0Y29uc3QgaWQgPSBlbC5pZCA/IGVsLmlkLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0XHRcdGNvbnN0IHRlc3RJZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0aWQnKT8udG9Mb3dlckNhc2UoKSB8fCAnJztcblx0XHRcdGNvbnN0IHRlc3RRYSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1xYScpPy50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0Y29uc3QgdGVzdEN5ID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN5Jyk/LnRvTG93ZXJDYXNlKCkgfHwgJyc7XG5cblx0XHRcdC8vIENvbWJpbmUgYXR0cmlidXRlcyBmb3Igc2luZ2xlLXBhc3MgY2hlY2tpbmdcblx0XHRcdGNvbnN0IGF0dHJpYnV0ZVRleHQgPSBgJHtjbGFzc05hbWV9ICR7aWR9ICR7dGVzdElkfSAke3Rlc3RRYX0gJHt0ZXN0Q3l9YDtcblx0XHRcdFxuXHRcdFx0Ly8gRWFybHkgcmV0dXJuIGlmIG5vIGNvbnRlbnQgdG8gY2hlY2tcblx0XHRcdGlmICghYXR0cmlidXRlVGV4dC50cmltKCkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBVc2Ugc29tZSgpIGZvciBlYXJseSB0ZXJtaW5hdGlvblxuXHRcdFx0cmV0dXJuIHBhcnRpYWxSZWdleGVzLnNvbWUoKHsgcmVnZXggfSkgPT4gcmVnZXgudGVzdChhdHRyaWJ1dGVUZXh0KSk7XG5cdFx0fTtcblxuXHRcdC8vIFByb2Nlc3MgZWxlbWVudHMgaW4gYmF0Y2hlcyB0byBhdm9pZCBsb25nIHRhc2tzXG5cdFx0Y29uc3QgQkFUQ0hfU0laRSA9IDEwMDtcblx0XHRjb25zdCBhbGxFbGVtZW50cyA9IEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjbGFzc10sIFtpZF0sIFtkYXRhLXRlc3RpZF0sIFtkYXRhLXFhXSwgW2RhdGEtY3ldJykpO1xuXHRcdFxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYWxsRWxlbWVudHMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcblx0XHRcdGNvbnN0IGJhdGNoID0gYWxsRWxlbWVudHMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuXHRcdFx0Y29uc3QgZWxlbWVudHNUb1JlbW92ZTogRWxlbWVudFtdID0gW107XG5cblx0XHRcdC8vIFJlYWQgcGhhc2UgLSBpZGVudGlmeSBlbGVtZW50cyB0byByZW1vdmVcblx0XHRcdGJhdGNoLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0XHRpZiAoc2hvdWxkUmVtb3ZlRWxlbWVudChlbCkpIHtcblx0XHRcdFx0XHRlbGVtZW50c1RvUmVtb3ZlLnB1c2goZWwpO1xuXHRcdFx0XHRcdHBhcnRpYWxTZWxlY3RvckNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBXcml0ZSBwaGFzZSAtIGJhdGNoIHJlbW92ZSBlbGVtZW50c1xuXHRcdFx0aWYgKGVsZW1lbnRzVG9SZW1vdmUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5mb3JFYWNoKGVsID0+IHtcblx0XHRcdFx0XHRpZiAoZWw/LnBhcmVudE5vZGUpIHtcblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGVsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLl9sb2coJ0ZvdW5kIGNsdXR0ZXIgZWxlbWVudHM6Jywge1xuXHRcdFx0ZXhhY3RTZWxlY3RvcnM6IGV4YWN0U2VsZWN0b3JDb3VudCxcblx0XHRcdHBhcnRpYWxTZWxlY3RvcnM6IHBhcnRpYWxTZWxlY3RvckNvdW50LFxuXHRcdFx0dG90YWw6IGV4YWN0U2VsZWN0b3JDb3VudCArIHBhcnRpYWxTZWxlY3RvckNvdW50LFxuXHRcdFx0cHJvY2Vzc2luZ1RpbWU6IGAkeyhlbmRUaW1lIC0gc3RhcnRUaW1lKS50b0ZpeGVkKDIpfW1zYFxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBjbGVhbkNvbnRlbnQoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdC8vIFJlbW92ZSBIVE1MIGNvbW1lbnRzXG5cdFx0dGhpcy5yZW1vdmVIdG1sQ29tbWVudHMoZWxlbWVudCk7XG5cdFx0XG5cdFx0Ly8gSGFuZGxlIEgxIGVsZW1lbnRzIC0gcmVtb3ZlIGZpcnN0IG9uZSBhbmQgY29udmVydCBvdGhlcnMgdG8gSDJcblx0XHR0aGlzLmhhbmRsZUhlYWRpbmdzKGVsZW1lbnQpO1xuXHRcdFxuXHRcdC8vIFN0YW5kYXJkaXplIGZvb3Rub3RlcyBhbmQgY2l0YXRpb25zXG5cdFx0dGhpcy5zdGFuZGFyZGl6ZUZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIEhhbmRsZSBsYXp5LWxvYWRlZCBpbWFnZXNcblx0XHR0aGlzLmhhbmRsZUxhenlJbWFnZXMoZWxlbWVudCk7XG5cblx0XHQvLyBDb252ZXJ0IGVtYmVkZGVkIGNvbnRlbnQgdG8gc3RhbmRhcmQgZm9ybWF0c1xuXHRcdHRoaXMuc3RhbmRhcmRpemVFbWJlZHMoZWxlbWVudCk7XG5cdFx0XG5cdFx0Ly8gU3RyaXAgdW53YW50ZWQgYXR0cmlidXRlc1xuXHRcdHRoaXMuc3RyaXBVbndhbnRlZEF0dHJpYnV0ZXMoZWxlbWVudCk7XG5cblx0XHQvLyBSZW1vdmUgZW1wdHkgZWxlbWVudHNcblx0XHR0aGlzLnJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudCk7XG5cdH1cblxuXHRwcml2YXRlIGhhbmRsZUhlYWRpbmdzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRjb25zdCBoMXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMScpO1xuXHRcdGxldCBpc0ZpcnN0SDEgPSB0cnVlO1xuXG5cdFx0QXJyYXkuZnJvbShoMXMpLmZvckVhY2goaDEgPT4ge1xuXHRcdFx0aWYgKGlzRmlyc3RIMSkge1xuXHRcdFx0XHRoMS5yZW1vdmUoKTtcblx0XHRcdFx0aXNGaXJzdEgxID0gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBDb252ZXJ0IHN1YnNlcXVlbnQgaDFzIHRvIGgyc1xuXHRcdFx0XHRjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG5cdFx0XHRcdGgyLmlubmVySFRNTCA9IGgxLmlubmVySFRNTDtcblx0XHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdFx0QXJyYXkuZnJvbShoMS5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRcdGgyLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGgxLnBhcmVudE5vZGU/LnJlcGxhY2VDaGlsZChoMiwgaDEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVIdG1sQ29tbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGNvbnN0IGNvbW1lbnRzOiBDb21tZW50W10gPSBbXTtcblx0XHRjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKFxuXHRcdFx0ZWxlbWVudCxcblx0XHRcdE5vZGVGaWx0ZXIuU0hPV19DT01NRU5ULFxuXHRcdFx0bnVsbFxuXHRcdCk7XG5cblx0XHRsZXQgbm9kZTtcblx0XHR3aGlsZSAobm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpKSB7XG5cdFx0XHRjb21tZW50cy5wdXNoKG5vZGUgYXMgQ29tbWVudCk7XG5cdFx0fVxuXG5cdFx0Y29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHtcblx0XHRcdGNvbW1lbnQucmVtb3ZlKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgSFRNTCBjb21tZW50czonLCBjb21tZW50cy5sZW5ndGgpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdHJpcFVud2FudGVkQXR0cmlidXRlcyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IGF0dHJpYnV0ZUNvdW50ID0gMDtcblxuXHRcdGNvbnN0IHByb2Nlc3NFbGVtZW50ID0gKGVsOiBFbGVtZW50KSA9PiB7XG5cdFx0XHQvLyBTa2lwIFNWRyBlbGVtZW50cyAtIHByZXNlcnZlIGFsbCB0aGVpciBhdHRyaWJ1dGVzXG5cdFx0XHRpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgYXR0cmlidXRlcyA9IEFycmF5LmZyb20oZWwuYXR0cmlidXRlcyk7XG5cdFx0XHRcblx0XHRcdGF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0Y29uc3QgYXR0ck5hbWUgPSBhdHRyLm5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0aWYgKCFBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHJOYW1lKSAmJiAhYXR0ck5hbWUuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xuXHRcdFx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyLm5hbWUpO1xuXHRcdFx0XHRcdGF0dHJpYnV0ZUNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRwcm9jZXNzRWxlbWVudChlbGVtZW50KTtcblx0XHRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5mb3JFYWNoKHByb2Nlc3NFbGVtZW50KTtcblxuXHRcdHRoaXMuX2xvZygnU3RyaXBwZWQgYXR0cmlidXRlczonLCBhdHRyaWJ1dGVDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXHRcdGxldCBpdGVyYXRpb25zID0gMDtcblx0XHRsZXQga2VlcFJlbW92aW5nID0gdHJ1ZTtcblxuXHRcdHdoaWxlIChrZWVwUmVtb3ZpbmcpIHtcblx0XHRcdGl0ZXJhdGlvbnMrKztcblx0XHRcdGtlZXBSZW1vdmluZyA9IGZhbHNlO1xuXHRcdFx0Ly8gR2V0IGFsbCBlbGVtZW50cyB3aXRob3V0IGNoaWxkcmVuLCB3b3JraW5nIGZyb20gZGVlcGVzdCBmaXJzdFxuXHRcdFx0Y29uc3QgZW1wdHlFbGVtZW50cyA9IEFycmF5LmZyb20oZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpKS5maWx0ZXIoZWwgPT4ge1xuXHRcdFx0XHRpZiAoQUxMT1dFRF9FTVBUWV9FTEVNRU5UUy5oYXMoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgb25seSB3aGl0ZXNwYWNlIG9yICZuYnNwO1xuXHRcdFx0XHRjb25zdCB0ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRjb25zdCBoYXNPbmx5V2hpdGVzcGFjZSA9IHRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT09IDA7XG5cdFx0XHRcdGNvbnN0IGhhc05ic3AgPSB0ZXh0Q29udGVudC5pbmNsdWRlcygnXFx1MDBBMCcpOyAvLyBVbmljb2RlIG5vbi1icmVha2luZyBzcGFjZVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgbm8gbWVhbmluZ2Z1bCBjaGlsZHJlblxuXHRcdFx0XHRjb25zdCBoYXNOb0NoaWxkcmVuID0gIWVsLmhhc0NoaWxkTm9kZXMoKSB8fCBcblx0XHRcdFx0XHQoQXJyYXkuZnJvbShlbC5jaGlsZE5vZGVzKS5ldmVyeShub2RlID0+IHtcblx0XHRcdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBub2RlVGV4dCA9IG5vZGUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBub2RlVGV4dC50cmltKCkubGVuZ3RoID09PSAwICYmICFub2RlVGV4dC5pbmNsdWRlcygnXFx1MDBBMCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRyZXR1cm4gaGFzT25seVdoaXRlc3BhY2UgJiYgIWhhc05ic3AgJiYgaGFzTm9DaGlsZHJlbjtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoZW1wdHlFbGVtZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGVtcHR5RWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdFx0ZWwucmVtb3ZlKCk7XG5cdFx0XHRcdFx0cmVtb3ZlZENvdW50Kys7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRrZWVwUmVtb3ZpbmcgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBlbXB0eSBlbGVtZW50czonLCB7XG5cdFx0XHRjb3VudDogcmVtb3ZlZENvdW50LFxuXHRcdFx0aXRlcmF0aW9uc1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVGb290bm90ZUl0ZW0oXG5cdFx0Zm9vdG5vdGVOdW1iZXI6IG51bWJlcixcblx0XHRjb250ZW50OiBzdHJpbmcgfCBFbGVtZW50LFxuXHRcdHJlZnM6IHN0cmluZ1tdXG5cdCk6IEhUTUxMSUVsZW1lbnQge1xuXHRcdGNvbnN0IG5ld0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdG5ld0l0ZW0uY2xhc3NOYW1lID0gJ2Zvb3Rub3RlJztcblx0XHRuZXdJdGVtLmlkID0gYGZuOiR7Zm9vdG5vdGVOdW1iZXJ9YDtcblxuXHRcdC8vIEhhbmRsZSBjb250ZW50XG5cdFx0aWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuXHRcdFx0Y29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cdFx0XHRuZXdJdGVtLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEdldCBhbGwgcGFyYWdyYXBocyBmcm9tIHRoZSBjb250ZW50XG5cdFx0XHRjb25zdCBwYXJhZ3JhcGhzID0gQXJyYXkuZnJvbShjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3AnKSk7XG5cdFx0XHRpZiAocGFyYWdyYXBocy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0Ly8gSWYgbm8gcGFyYWdyYXBocywgd3JhcCBjb250ZW50IGluIGEgcGFyYWdyYXBoXG5cdFx0XHRcdGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9IGNvbnRlbnQuaW5uZXJIVE1MO1xuXHRcdFx0XHRuZXdJdGVtLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBDb3B5IGV4aXN0aW5nIHBhcmFncmFwaHNcblx0XHRcdFx0cGFyYWdyYXBocy5mb3JFYWNoKHAgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IG5ld1AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdFx0bmV3UC5pbm5lckhUTUwgPSBwLmlubmVySFRNTDtcblx0XHRcdFx0XHRuZXdJdGVtLmFwcGVuZENoaWxkKG5ld1ApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBZGQgYmFja2xpbmsocykgdG8gdGhlIGxhc3QgcGFyYWdyYXBoXG5cdFx0Y29uc3QgbGFzdFBhcmFncmFwaCA9IG5ld0l0ZW0ucXVlcnlTZWxlY3RvcigncDpsYXN0LW9mLXR5cGUnKSB8fCBuZXdJdGVtO1xuXHRcdHJlZnMuZm9yRWFjaCgocmVmSWQsIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBiYWNrbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdGJhY2tsaW5rLmhyZWYgPSBgIyR7cmVmSWR9YDtcblx0XHRcdGJhY2tsaW5rLnRpdGxlID0gJ3JldHVybiB0byBhcnRpY2xlJztcblx0XHRcdGJhY2tsaW5rLmNsYXNzTmFtZSA9ICdmb290bm90ZS1iYWNrcmVmJztcblx0XHRcdGJhY2tsaW5rLmlubmVySFRNTCA9ICfihqknO1xuXHRcdFx0aWYgKGluZGV4IDwgcmVmcy5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdGJhY2tsaW5rLmlubmVySFRNTCArPSAnICc7XG5cdFx0XHR9XG5cdFx0XHRsYXN0UGFyYWdyYXBoLmFwcGVuZENoaWxkKGJhY2tsaW5rKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBuZXdJdGVtO1xuXHR9XG5cblx0cHJpdmF0ZSBjb2xsZWN0Rm9vdG5vdGVzKGVsZW1lbnQ6IEVsZW1lbnQpOiBGb290bm90ZUNvbGxlY3Rpb24ge1xuXHRcdGNvbnN0IGZvb3Rub3RlczogRm9vdG5vdGVDb2xsZWN0aW9uID0ge307XG5cdFx0bGV0IGZvb3Rub3RlQ291bnQgPSAxO1xuXG5cdFx0Ly8gQ29sbGVjdCBhbGwgZm9vdG5vdGVzIGFuZCB0aGVpciBJRHMgZnJvbSBmb290bm90ZSBsaXN0c1xuXHRcdGNvbnN0IGZvb3Rub3RlTGlzdHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMpO1xuXHRcdGZvb3Rub3RlTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcblx0XHRcdC8vIFN1YnN0YWNrIGhhcyBpbmRpdmlkdWFsIGZvb3Rub3RlIGRpdnMgd2l0aCBubyBwYXJlbnRcblx0XHRcdGlmIChsaXN0Lm1hdGNoZXMoJ2Rpdi5mb290bm90ZVtkYXRhLWNvbXBvbmVudC1uYW1lPVwiRm9vdG5vdGVUb0RPTVwiXScpKSB7XG5cdFx0XHRcdGNvbnN0IGFuY2hvciA9IGxpc3QucXVlcnlTZWxlY3RvcignYS5mb290bm90ZS1udW1iZXInKTtcblx0XHRcdFx0Y29uc3QgY29udGVudCA9IGxpc3QucXVlcnlTZWxlY3RvcignLmZvb3Rub3RlLWNvbnRlbnQnKTtcblx0XHRcdFx0aWYgKGFuY2hvciAmJiBjb250ZW50KSB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBhbmNob3IuaWQucmVwbGFjZSgnZm9vdG5vdGUtJywgJycpO1xuXHRcdFx0XHRcdGlmIChpZCAmJiAhZm9vdG5vdGVzW2Zvb3Rub3RlQ291bnRdKSB7XG5cdFx0XHRcdFx0XHRmb290bm90ZXNbZm9vdG5vdGVDb3VudF0gPSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQ6IGNvbnRlbnQsXG5cdFx0XHRcdFx0XHRcdG9yaWdpbmFsSWQ6IGlkLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHRcdHJlZnM6IFtdXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVDb3VudCsrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbW1vbiBmb3JtYXQgdXNpbmcgT0wvVUwgYW5kIExJIGVsZW1lbnRzXG5cdFx0XHRjb25zdCBpdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGksIGRpdltyb2xlPVwibGlzdGl0ZW1cIl0nKTtcblx0XHRcdGl0ZW1zLmZvckVhY2gobGkgPT4ge1xuXHRcdFx0XHRsZXQgaWQgPSAnJztcblx0XHRcdFx0bGV0IGNvbnRlbnQ6IEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuXHRcdFx0XHQvLyBIYW5kbGUgY2l0YXRpb25zIHdpdGggLmNpdGF0aW9ucyBjbGFzc1xuXHRcdFx0XHRjb25zdCBjaXRhdGlvbnNEaXYgPSBsaS5xdWVyeVNlbGVjdG9yKCcuY2l0YXRpb25zJyk7XG5cdFx0XHRcdGlmIChjaXRhdGlvbnNEaXY/LmlkPy5zdGFydHNXaXRoKCdSJykpIHtcblx0XHRcdFx0XHRpZCA9IGNpdGF0aW9uc0Rpdi5pZDtcblx0XHRcdFx0XHQvLyBMb29rIGZvciBjaXRhdGlvbiBjb250ZW50IHdpdGhpbiB0aGUgY2l0YXRpb25zIGRpdlxuXHRcdFx0XHRcdGNvbnN0IGNpdGF0aW9uQ29udGVudCA9IGNpdGF0aW9uc0Rpdi5xdWVyeVNlbGVjdG9yKCcuY2l0YXRpb24tY29udGVudCcpO1xuXHRcdFx0XHRcdGlmIChjaXRhdGlvbkNvbnRlbnQpIHtcblx0XHRcdFx0XHRcdGNvbnRlbnQgPSBjaXRhdGlvbkNvbnRlbnQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEV4dHJhY3QgSUQgZnJvbSB2YXJpb3VzIGZvcm1hdHNcblx0XHRcdFx0XHRpZiAobGkuaWQuc3RhcnRzV2l0aCgnYmliLmJpYicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2JpYi5iaWInLCAnJyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaS5pZC5zdGFydHNXaXRoKCdmbjonKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5pZC5yZXBsYWNlKCdmbjonLCAnJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gbGkuaWQuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goL2NpdGVfbm90ZS0oLispLyk7XG5cdFx0XHRcdFx0XHRpZCA9IG1hdGNoID8gbWF0Y2hbMV0gOiBsaS5pZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29udGVudCA9IGxpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlkICYmICFmb290bm90ZXNbZm9vdG5vdGVDb3VudF0pIHtcblx0XHRcdFx0XHRmb290bm90ZXNbZm9vdG5vdGVDb3VudF0gPSB7XG5cdFx0XHRcdFx0XHRjb250ZW50OiBjb250ZW50IHx8IGxpLFxuXHRcdFx0XHRcdFx0b3JpZ2luYWxJZDogaWQudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdHJlZnM6IFtdXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRmb290bm90ZUNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGZvb3Rub3Rlcztcblx0fVxuXG5cdHByaXZhdGUgc3RhbmRhcmRpemVGb290bm90ZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGNvbnN0IGZvb3Rub3RlcyA9IHRoaXMuY29sbGVjdEZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIFN0YW5kYXJkaXplIGlubGluZSBmb290bm90ZXMgdXNpbmcgdGhlIGNvbGxlY3RlZCBJRHNcblx0XHRjb25zdCBmb290bm90ZUVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPT1ROT1RFX1NFTEVDVE9SUyk7XG5cdFx0Zm9vdG5vdGVFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm47XG5cblx0XHRcdGxldCBmb290bm90ZUlkID0gJyc7XG5cdFx0XHRsZXQgZm9vdG5vdGVDb250ZW50ID0gJyc7XG5cblx0XHRcdC8vIEV4dHJhY3QgZm9vdG5vdGUgSUQgYmFzZWQgb24gZWxlbWVudCB0eXBlXG5cdFx0XHQvLyBTY2llbmNlLm9yZ1xuXHRcdFx0aWYgKGVsLm1hdGNoZXMoJ2Fbcm9sZT1cImRvYy1iaWJsaW9yZWZcIl0nKSkge1xuXHRcdFx0XHRjb25zdCB4bWxSaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteG1sLXJpZCcpO1xuXHRcdFx0XHRpZiAoeG1sUmlkKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IHhtbFJpZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdFx0aWYgKGhyZWY/LnN0YXJ0c1dpdGgoJyNjb3JlLVInKSkge1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IGhyZWYucmVwbGFjZSgnI2NvcmUtJywgJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0Ly8gU3Vic3RhY2tcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYS5mb290bm90ZS1hbmNob3IsIHNwYW4uZm9vdG5vdGUtaG92ZXJjYXJkLXRhcmdldCBhJykpIHtcblx0XHRcdFx0Y29uc3QgaWQgPSBlbC5pZD8ucmVwbGFjZSgnZm9vdG5vdGUtYW5jaG9yLScsICcnKSB8fCAnJztcblx0XHRcdFx0aWYgKGlkKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IGlkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwLnJlZmVyZW5jZScpKSB7XG5cdFx0XHRcdGNvbnN0IGxpbmtzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdFx0XHRBcnJheS5mcm9tKGxpbmtzKS5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGhyZWYuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goLyg/OmNpdGVfbm90ZXxjaXRlX3JlZiktKC4rKS8pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHQvLyBBcnhpdlxuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdjaXRlLmx0eF9jaXRlJykpIHtcblx0XHRcdFx0Y29uc3QgbGluayA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRcdFx0aWYgKGxpbmspIHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBocmVmLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC9iaWJcXC5iaWIoXFxkKykvKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRmb290bm90ZUlkID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwW2lkXj1cImZucmVmOlwiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5pZC5yZXBsYWNlKCdmbnJlZjonLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3Bhbi5mb290bm90ZS1saW5rJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb290bm90ZS1pZCcpIHx8ICcnO1xuXHRcdFx0XHRmb290bm90ZUNvbnRlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vdG5vdGUtY29udGVudCcpIHx8ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhLmNpdGF0aW9uJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdGZvb3Rub3RlQ29udGVudCA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gT3RoZXIgY2l0YXRpb24gdHlwZXNcblx0XHRcdFx0Y29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdGNvbnN0IGlkID0gaHJlZi5yZXBsYWNlKC9eWyNdLywgJycpO1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBpZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmb290bm90ZUlkKSB7XG5cdFx0XHRcdC8vIEZpbmQgdGhlIGZvb3Rub3RlIG51bWJlciBieSBtYXRjaGluZyB0aGUgb3JpZ2luYWwgSURcblx0XHRcdFx0Y29uc3QgZm9vdG5vdGVFbnRyeSA9IE9iamVjdC5lbnRyaWVzKGZvb3Rub3RlcykuZmluZChcblx0XHRcdFx0XHQoW18sIGRhdGFdKSA9PiBkYXRhLm9yaWdpbmFsSWQgPT09IGZvb3Rub3RlSWQudG9Mb3dlckNhc2UoKVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmIChmb290bm90ZUVudHJ5KSB7XG5cdFx0XHRcdFx0Y29uc3QgW2Zvb3Rub3RlTnVtYmVyLCBmb290bm90ZURhdGFdID0gZm9vdG5vdGVFbnRyeTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBDcmVhdGUgZm9vdG5vdGUgcmVmZXJlbmNlIElEIC0gb25seSBhZGQgc3VmZml4IGlmIHRoaXMgaXMgYSBkdXBsaWNhdGUgcmVmZXJlbmNlXG5cdFx0XHRcdFx0Y29uc3QgcmVmSWQgPSBmb290bm90ZURhdGEucmVmcy5sZW5ndGggPiAwID8gXG5cdFx0XHRcdFx0XHRgZm5yZWY6JHtmb290bm90ZU51bWJlcn0tJHtmb290bm90ZURhdGEucmVmcy5sZW5ndGggKyAxfWAgOiBcblx0XHRcdFx0XHRcdGBmbnJlZjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm9vdG5vdGVEYXRhLnJlZnMucHVzaChyZWZJZCk7XG5cblx0XHRcdFx0XHQvLyBDcmVhdGUgc3RhbmRhcmRpemVkIGZvb3Rub3RlIHJlZmVyZW5jZVxuXHRcdFx0XHRcdGNvbnN0IHN1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N1cCcpO1xuXHRcdFx0XHRcdHN1cC5pZCA9IHJlZklkO1xuXHRcdFx0XHRcdGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRcdFx0bGluay5ocmVmID0gYCNmbjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cdFx0XHRcdFx0bGluay50ZXh0Q29udGVudCA9IGZvb3Rub3RlTnVtYmVyO1xuXHRcdFx0XHRcdHN1cC5hcHBlbmRDaGlsZChsaW5rKTtcblx0XHRcdFx0XHRlbC5yZXBsYWNlV2l0aChzdXApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBDcmVhdGUgdGhlIHN0YW5kYXJkaXplZCBmb290bm90ZSBsaXN0XG5cdFx0Y29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG5ld0xpc3QuY2xhc3NOYW1lID0gJ2Zvb3Rub3Rlcyc7XG5cdFx0Y29uc3Qgb3JkZXJlZExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpO1xuXG5cdFx0Ly8gQ3JlYXRlIGZvb3Rub3RlIGl0ZW1zIGluIG9yZGVyXG5cdFx0T2JqZWN0LmVudHJpZXMoZm9vdG5vdGVzKS5mb3JFYWNoKChbbnVtYmVyLCBkYXRhXSkgPT4ge1xuXHRcdFx0Y29uc3QgbmV3SXRlbSA9IHRoaXMuY3JlYXRlRm9vdG5vdGVJdGVtKFxuXHRcdFx0XHRwYXJzZUludChudW1iZXIpLFxuXHRcdFx0XHRkYXRhLmNvbnRlbnQsXG5cdFx0XHRcdGRhdGEucmVmc1xuXHRcdFx0KTtcblx0XHRcdG9yZGVyZWRMaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIG9yaWdpbmFsIGZvb3Rub3RlIGxpc3RzXG5cdFx0Y29uc3QgZm9vdG5vdGVMaXN0cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT09UTk9URV9MSVNUX1NFTEVDVE9SUyk7XG5cdFx0Zm9vdG5vdGVMaXN0cy5mb3JFYWNoKGxpc3QgPT4gbGlzdC5yZW1vdmUoKSk7XG5cblx0XHQvLyBJZiB3ZSBoYXZlIGFueSBmb290bm90ZXMsIGFkZCB0aGUgbmV3IGxpc3QgdG8gdGhlIGRvY3VtZW50XG5cdFx0aWYgKG9yZGVyZWRMaXN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdG5ld0xpc3QuYXBwZW5kQ2hpbGQob3JkZXJlZExpc3QpO1xuXHRcdFx0ZWxlbWVudC5hcHBlbmRDaGlsZChuZXdMaXN0KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGhhbmRsZUxhenlJbWFnZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cdFx0Y29uc3QgbGF6eUltYWdlcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nW2RhdGEtc3JjXSwgaW1nW2RhdGEtc3Jjc2V0XScpO1xuXG5cdFx0bGF6eUltYWdlcy5mb3JFYWNoKGltZyA9PiB7XG5cdFx0XHRpZiAoIShpbWcgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSkgcmV0dXJuO1xuXG5cdFx0XHQvLyBIYW5kbGUgZGF0YS1zcmNcblx0XHRcdGNvbnN0IGRhdGFTcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aWYgKGRhdGFTcmMgJiYgIWltZy5zcmMpIHtcblx0XHRcdFx0aW1nLnNyYyA9IGRhdGFTcmM7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEhhbmRsZSBkYXRhLXNyY3NldFxuXHRcdFx0Y29uc3QgZGF0YVNyY3NldCA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRpZiAoZGF0YVNyY3NldCAmJiAhaW1nLnNyY3NldCkge1xuXHRcdFx0XHRpbWcuc3Jjc2V0ID0gZGF0YVNyY3NldDtcblx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGxhenkgbG9hZGluZyByZWxhdGVkIGNsYXNzZXMgYW5kIGF0dHJpYnV0ZXNcblx0XHRcdGltZy5jbGFzc0xpc3QucmVtb3ZlKCdsYXp5JywgJ2xhenlsb2FkJyk7XG5cdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWxsLXN0YXR1cycpO1xuXHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcblx0XHRcdGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1Byb2Nlc3NlZCBsYXp5IGltYWdlczonLCBwcm9jZXNzZWRDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YW5kYXJkaXplRW1iZWRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXG5cdFx0Ly8gQ29udmVydCBsaXRlLXlvdXR1YmUgZWxlbWVudHNcblx0XHRjb25zdCBsaXRlWW91dHViZUVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaXRlLXlvdXR1YmUnKTtcblx0XHRsaXRlWW91dHViZUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0Y29uc3QgdmlkZW9JZCA9IGVsLmdldEF0dHJpYnV0ZSgndmlkZW9pZCcpO1xuXHRcdFx0aWYgKCF2aWRlb0lkKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXHRcdFx0aWZyYW1lLndpZHRoID0gJzU2MCc7XG5cdFx0XHRpZnJhbWUuaGVpZ2h0ID0gJzMxNSc7XG5cdFx0XHRpZnJhbWUuc3JjID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9JZH1gO1xuXHRcdFx0aWZyYW1lLnRpdGxlID0gZWwuZ2V0QXR0cmlidXRlKCd2aWRlb3RpdGxlJykgfHwgJ1lvdVR1YmUgdmlkZW8gcGxheWVyJztcblx0XHRcdGlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcblx0XHRcdGlmcmFtZS5hbGxvdyA9ICdhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgY2xpcGJvYXJkLXdyaXRlOyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlOyB3ZWItc2hhcmUnO1xuXHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xuXG5cdFx0XHRlbC5yZXBsYWNlV2l0aChpZnJhbWUpO1xuXHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHR9KTtcblxuXHRcdC8vIEFkZCBmdXR1cmUgZW1iZWQgY29udmVyc2lvbnMgKFR3aXR0ZXIsIEluc3RhZ3JhbSwgZXRjLilcblxuXHRcdHRoaXMuX2xvZygnQ29udmVydGVkIGVtYmVkZGVkIGVsZW1lbnRzOicsIHByb2Nlc3NlZENvdW50KTtcblx0fVxuXG5cdC8vIEZpbmQgc21hbGwgSU1HIGFuZCBTVkcgZWxlbWVudHNcblx0cHJpdmF0ZSBmaW5kU21hbGxJbWFnZXMoZG9jOiBEb2N1bWVudCk6IFNldDxzdHJpbmc+IHtcblx0XHRjb25zdCBNSU5fRElNRU5TSU9OID0gMzM7XG5cdFx0Y29uc3Qgc21hbGxJbWFnZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblx0XHRjb25zdCB0cmFuc2Zvcm1SZWdleCA9IC9zY2FsZVxcKChbXFxkLl0rKVxcKS87XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblxuXHRcdC8vIDEuIFJlYWQgcGhhc2UgLSBHYXRoZXIgYWxsIGVsZW1lbnRzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRjb25zdCBlbGVtZW50cyA9IFtcblx0XHRcdC4uLkFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKSksXG5cdFx0XHQuLi5BcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3ZnJykpXG5cdFx0XS5maWx0ZXIoZWxlbWVudCA9PiB7XG5cdFx0XHQvLyBTa2lwIGxhenktbG9hZGVkIGltYWdlcyB0aGF0IGhhdmVuJ3QgYmVlbiBwcm9jZXNzZWQgeWV0XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xhenknKSB8fCBcblx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGF6eWxvYWQnKSB8fFxuXHRcdFx0XHRcdGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLXNyYycpIHx8XG5cdFx0XHRcdFx0ZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRcdHJldHVybiAhaXNMYXp5O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gc21hbGxJbWFnZXM7XG5cdFx0fVxuXG5cdFx0Ly8gMi4gQmF0Y2ggcHJvY2VzcyAtIENvbGxlY3QgYWxsIG1lYXN1cmVtZW50cyBpbiBvbmUgZ29cblx0XHRjb25zdCBtZWFzdXJlbWVudHMgPSBlbGVtZW50cy5tYXAoZWxlbWVudCA9PiAoe1xuXHRcdFx0ZWxlbWVudCxcblx0XHRcdC8vIFN0YXRpYyBhdHRyaWJ1dGVzIChubyByZWZsb3cpXG5cdFx0XHRuYXR1cmFsV2lkdGg6IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ID8gZWxlbWVudC5uYXR1cmFsV2lkdGggOiAwLFxuXHRcdFx0bmF0dXJhbEhlaWdodDogZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgPyBlbGVtZW50Lm5hdHVyYWxIZWlnaHQgOiAwLFxuXHRcdFx0YXR0cldpZHRoOiBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnd2lkdGgnKSB8fCAnMCcpLFxuXHRcdFx0YXR0ckhlaWdodDogcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpIHx8ICcwJylcblx0XHR9KSk7XG5cblx0XHQvLyAzLiBCYXRjaCBjb21wdXRlIHN0eWxlcyAtIFByb2Nlc3MgaW4gY2h1bmtzIHRvIGF2b2lkIGxvbmcgdGFza3Ncblx0XHRjb25zdCBCQVRDSF9TSVpFID0gNTA7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtZWFzdXJlbWVudHMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcblx0XHRcdGNvbnN0IGJhdGNoID0gbWVhc3VyZW1lbnRzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcblx0XHRcdFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gUmVhZCBwaGFzZSAtIGNvbXB1dGUgYWxsIHN0eWxlcyBhdCBvbmNlXG5cdFx0XHRcdGNvbnN0IHN0eWxlcyA9IGJhdGNoLm1hcCgoeyBlbGVtZW50IH0pID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpKTtcblx0XHRcdFx0Y29uc3QgcmVjdHMgPSBiYXRjaC5tYXAoKHsgZWxlbWVudCB9KSA9PiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIFByb2Nlc3MgcGhhc2UgLSBubyBET00gb3BlcmF0aW9uc1xuXHRcdFx0XHRiYXRjaC5mb3JFYWNoKChtZWFzdXJlbWVudCwgaW5kZXgpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3R5bGUgPSBzdHlsZXNbaW5kZXhdO1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVjdCA9IHJlY3RzW2luZGV4XTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gR2V0IHRyYW5zZm9ybSBzY2FsZSBpbiB0aGUgc2FtZSBiYXRjaFxuXHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtO1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2NhbGUgPSB0cmFuc2Zvcm0gPyBcblx0XHRcdFx0XHRcdFx0cGFyc2VGbG9hdCh0cmFuc2Zvcm0ubWF0Y2godHJhbnNmb3JtUmVnZXgpPy5bMV0gfHwgJzEnKSA6IDE7XG5cblx0XHRcdFx0XHRcdC8vIENhbGN1bGF0ZSBlZmZlY3RpdmUgZGltZW5zaW9uc1xuXHRcdFx0XHRcdFx0Y29uc3Qgd2lkdGhzID0gW1xuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5uYXR1cmFsV2lkdGgsXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50LmF0dHJXaWR0aCxcblx0XHRcdFx0XHRcdFx0cGFyc2VJbnQoc3R5bGUud2lkdGgpIHx8IDAsXG5cdFx0XHRcdFx0XHRcdHJlY3Qud2lkdGggKiBzY2FsZVxuXHRcdFx0XHRcdFx0XS5maWx0ZXIoZGltID0+IHR5cGVvZiBkaW0gPT09ICdudW1iZXInICYmIGRpbSA+IDApO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBoZWlnaHRzID0gW1xuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5uYXR1cmFsSGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5hdHRySGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRwYXJzZUludChzdHlsZS5oZWlnaHQpIHx8IDAsXG5cdFx0XHRcdFx0XHRcdHJlY3QuaGVpZ2h0ICogc2NhbGVcblx0XHRcdFx0XHRcdF0uZmlsdGVyKGRpbSA9PiB0eXBlb2YgZGltID09PSAnbnVtYmVyJyAmJiBkaW0gPiAwKTtcblxuXHRcdFx0XHRcdFx0Ly8gRGVjaXNpb24gcGhhc2UgLSBubyBET00gb3BlcmF0aW9uc1xuXHRcdFx0XHRcdFx0aWYgKHdpZHRocy5sZW5ndGggPiAwICYmIGhlaWdodHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlZmZlY3RpdmVXaWR0aCA9IE1hdGgubWluKC4uLndpZHRocyk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVmZmVjdGl2ZUhlaWdodCA9IE1hdGgubWluKC4uLmhlaWdodHMpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChlZmZlY3RpdmVXaWR0aCA8IE1JTl9ESU1FTlNJT04gfHwgZWZmZWN0aXZlSGVpZ2h0IDwgTUlOX0RJTUVOU0lPTikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGlkZW50aWZpZXIgPSB0aGlzLmdldEVsZW1lbnRJZGVudGlmaWVyKG1lYXN1cmVtZW50LmVsZW1lbnQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzbWFsbEltYWdlcy5hZGQoaWRlbnRpZmllcik7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIGVsZW1lbnQgZGltZW5zaW9uczonLCBlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIGJhdGNoOicsIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuX2xvZygnRm91bmQgc21hbGwgZWxlbWVudHM6Jywge1xuXHRcdFx0Y291bnQ6IHByb2Nlc3NlZENvdW50LFxuXHRcdFx0dG90YWxFbGVtZW50czogZWxlbWVudHMubGVuZ3RoLFxuXHRcdFx0cHJvY2Vzc2luZ1RpbWU6IGAkeyhlbmRUaW1lIC0gc3RhcnRUaW1lKS50b0ZpeGVkKDIpfW1zYFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHNtYWxsSW1hZ2VzO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVTbWFsbEltYWdlcyhkb2M6IERvY3VtZW50LCBzbWFsbEltYWdlczogU2V0PHN0cmluZz4pIHtcblx0XHRsZXQgcmVtb3ZlZENvdW50ID0gMDtcblxuXHRcdFsnaW1nJywgJ3N2ZyddLmZvckVhY2godGFnID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG5cdFx0XHRBcnJheS5mcm9tKGVsZW1lbnRzKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRjb25zdCBpZGVudGlmaWVyID0gdGhpcy5nZXRFbGVtZW50SWRlbnRpZmllcihlbGVtZW50KTtcblx0XHRcdFx0aWYgKGlkZW50aWZpZXIgJiYgc21hbGxJbWFnZXMuaGFzKGlkZW50aWZpZXIpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmUoKTtcblx0XHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgc21hbGwgZWxlbWVudHM6JywgcmVtb3ZlZENvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0RWxlbWVudElkZW50aWZpZXIoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB8IG51bGwge1xuXHRcdC8vIFRyeSB0byBjcmVhdGUgYSB1bmlxdWUgaWRlbnRpZmllciB1c2luZyB2YXJpb3VzIGF0dHJpYnV0ZXNcblx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcblx0XHRcdC8vIEZvciBsYXp5LWxvYWRlZCBpbWFnZXMsIHVzZSBkYXRhLXNyYyBhcyBpZGVudGlmaWVyIGlmIGF2YWlsYWJsZVxuXHRcdFx0Y29uc3QgZGF0YVNyYyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aWYgKGRhdGFTcmMpIHJldHVybiBgc3JjOiR7ZGF0YVNyY31gO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBzcmMgPSBlbGVtZW50LnNyYyB8fCAnJztcblx0XHRcdGNvbnN0IHNyY3NldCA9IGVsZW1lbnQuc3Jjc2V0IHx8ICcnO1xuXHRcdFx0Y29uc3QgZGF0YVNyY3NldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc3JjKSByZXR1cm4gYHNyYzoke3NyY31gO1xuXHRcdFx0aWYgKHNyY3NldCkgcmV0dXJuIGBzcmNzZXQ6JHtzcmNzZXR9YDtcblx0XHRcdGlmIChkYXRhU3Jjc2V0KSByZXR1cm4gYHNyY3NldDoke2RhdGFTcmNzZXR9YDtcblx0XHR9XG5cblx0XHRjb25zdCBpZCA9IGVsZW1lbnQuaWQgfHwgJyc7XG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgfHwgJyc7XG5cdFx0Y29uc3Qgdmlld0JveCA9IGVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKSB8fCAnJyA6ICcnO1xuXHRcdFxuXHRcdGlmIChpZCkgcmV0dXJuIGBpZDoke2lkfWA7XG5cdFx0aWYgKHZpZXdCb3gpIHJldHVybiBgdmlld0JveDoke3ZpZXdCb3h9YDtcblx0XHRpZiAoY2xhc3NOYW1lKSByZXR1cm4gYGNsYXNzOiR7Y2xhc3NOYW1lfWA7XG5cdFx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRNYWluQ29udGVudChkb2M6IERvY3VtZW50KTogRWxlbWVudCB8IG51bGwge1xuXG5cdFx0Ly8gRmluZCBhbGwgcG90ZW50aWFsIGNvbnRlbnQgY29udGFpbmVyc1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXM6IHsgZWxlbWVudDogRWxlbWVudDsgc2NvcmU6IG51bWJlciB9W10gPSBbXTtcblxuXHRcdEVOVFJZX1BPSU5UX0VMRU1FTlRTLmZvckVhY2goKHNlbGVjdG9yLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHQvLyBCYXNlIHNjb3JlIGZyb20gc2VsZWN0b3IgcHJpb3JpdHkgKGVhcmxpZXIgPSBoaWdoZXIpXG5cdFx0XHRcdGxldCBzY29yZSA9IChFTlRSWV9QT0lOVF9FTEVNRU5UUy5sZW5ndGggLSBpbmRleCkgKiAxMDtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFkZCBzY29yZSBiYXNlZCBvbiBjb250ZW50IGFuYWx5c2lzXG5cdFx0XHRcdHNjb3JlICs9IHRoaXMuc2NvcmVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRcblx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoKHsgZWxlbWVudCwgc2NvcmUgfSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGlmIChjYW5kaWRhdGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0Ly8gRmFsbCBiYWNrIHRvIHNjb3JpbmcgYmxvY2sgZWxlbWVudHNcblx0XHRcdC8vIEN1cnJlbnRseSA8Ym9keT4gZWxlbWVudCBpcyB1c2VkIGFzIHRoZSBmYWxsYmFjaywgc28gdGhpcyBpcyBub3QgdXNlZFxuXHRcdFx0cmV0dXJuIHRoaXMuZmluZENvbnRlbnRCeVNjb3JpbmcoZG9jKTtcblx0XHR9XG5cblx0XHQvLyBTb3J0IGJ5IHNjb3JlIGRlc2NlbmRpbmdcblx0XHRjYW5kaWRhdGVzLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcblx0XHRcblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0dGhpcy5fbG9nKCdDb250ZW50IGNhbmRpZGF0ZXM6JywgY2FuZGlkYXRlcy5tYXAoYyA9PiAoe1xuXHRcdFx0XHRlbGVtZW50OiBjLmVsZW1lbnQudGFnTmFtZSxcblx0XHRcdFx0c2VsZWN0b3I6IHRoaXMuZ2V0RWxlbWVudFNlbGVjdG9yKGMuZWxlbWVudCksXG5cdFx0XHRcdHNjb3JlOiBjLnNjb3JlXG5cdFx0XHR9KSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYW5kaWRhdGVzWzBdLmVsZW1lbnQ7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRDb250ZW50QnlTY29yaW5nKGRvYzogRG9jdW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG5cdFx0Y29uc3QgY2FuZGlkYXRlcyA9IHRoaXMuc2NvcmVFbGVtZW50cyhkb2MpO1xuXHRcdHJldHVybiBjYW5kaWRhdGVzLmxlbmd0aCA+IDAgPyBjYW5kaWRhdGVzWzBdLmVsZW1lbnQgOiBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRFbGVtZW50U2VsZWN0b3IoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3QgcGFydHM6IHN0cmluZ1tdID0gW107XG5cdFx0bGV0IGN1cnJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWxlbWVudDtcblx0XHRcblx0XHR3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcblx0XHRcdGxldCBzZWxlY3RvciA9IGN1cnJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKGN1cnJlbnQuaWQpIHtcblx0XHRcdFx0c2VsZWN0b3IgKz0gJyMnICsgY3VycmVudC5pZDtcblx0XHRcdH0gZWxzZSBpZiAoY3VycmVudC5jbGFzc05hbWUgJiYgdHlwZW9mIGN1cnJlbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRzZWxlY3RvciArPSAnLicgKyBjdXJyZW50LmNsYXNzTmFtZS50cmltKCkuc3BsaXQoL1xccysvKS5qb2luKCcuJyk7XG5cdFx0XHR9XG5cdFx0XHRwYXJ0cy51bnNoaWZ0KHNlbGVjdG9yKTtcblx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcgPiAnKTtcblx0fVxuXG5cdHByaXZhdGUgc2NvcmVFbGVtZW50cyhkb2M6IERvY3VtZW50KTogQ29udGVudFNjb3JlW10ge1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXM6IENvbnRlbnRTY29yZVtdID0gW107XG5cblx0XHRCTE9DS19FTEVNRU5UUy5mb3JFYWNoKCh0YWc6IHN0cmluZykgPT4ge1xuXHRcdFx0QXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKSkuZm9yRWFjaCgoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzY29yZSA9IHRoaXMuc2NvcmVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoc2NvcmUgPiAwKSB7XG5cdFx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoKHsgc2NvcmUsIGVsZW1lbnQgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXMuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuXHR9XG5cblx0cHJpdmF0ZSBzY29yZUVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IG51bWJlciB7XG5cdFx0bGV0IHNjb3JlID0gMDtcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGVsZW1lbnQgcHJvcGVydGllc1xuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICYmIHR5cGVvZiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgPyBcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0XHRjb25zdCBpZCA9IGVsZW1lbnQuaWQgPyBlbGVtZW50LmlkLnRvTG93ZXJDYXNlKCkgOiAnJztcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGNvbnRlbnRcblx0XHRjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRjb25zdCB3b3JkcyA9IHRleHQuc3BsaXQoL1xccysvKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gTWF0aC5taW4oTWF0aC5mbG9vcih3b3JkcyAvIDEwMCksIDMpO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gbGluayBkZW5zaXR5XG5cdFx0Y29uc3QgbGlua3MgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG5cdFx0Y29uc3QgbGlua1RleHQgPSBBcnJheS5mcm9tKGxpbmtzKS5yZWR1Y2UoKGFjYywgbGluaykgPT4gYWNjICsgKGxpbmsudGV4dENvbnRlbnQ/Lmxlbmd0aCB8fCAwKSwgMCk7XG5cdFx0Y29uc3QgbGlua0RlbnNpdHkgPSB0ZXh0Lmxlbmd0aCA/IGxpbmtUZXh0IC8gdGV4dC5sZW5ndGggOiAwO1xuXHRcdGlmIChsaW5rRGVuc2l0eSA+IDAuNSkge1xuXHRcdFx0c2NvcmUgLT0gMTA7XG5cdFx0fVxuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gcHJlc2VuY2Ugb2YgbWVhbmluZ2Z1bCBlbGVtZW50c1xuXHRcdGNvbnN0IHBhcmFncmFwaHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwJykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IHBhcmFncmFwaHM7XG5cblx0XHRjb25zdCBpbWFnZXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gTWF0aC5taW4oaW1hZ2VzICogMywgOSk7XG5cblx0XHRyZXR1cm4gc2NvcmU7XG5cdH1cbn0gIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImV4cG9ydCB7IERlZnVkZGxlIH0gZnJvbSAnLi9kZWZ1ZGRsZSc7XG5leHBvcnQgdHlwZSB7IERlZnVkZGxlT3B0aW9ucywgRGVmdWRkbGVSZXNwb25zZSwgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnOyAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
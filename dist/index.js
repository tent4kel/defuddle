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
    '[class="navigation" i]',
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
    'article-info',
    'article__meta',
    'article-subject',
    'article_subject',
    'article-tags',
    'article_tags',
    'article-title',
    'article_title',
    'articletopics',
    'article-topics',
    'article-type',
    'article--lede', // The Verge
    //	'author', Gwern
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
    'comment-respond',
    'comment-thread',
    'complementary',
    'consent',
    'content-card', // The Verge
    'contentpromo',
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
    'dialog',
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
    'entry-date',
    'entry-meta',
    'eyebrow',
    'expand-reduce',
    'externallinkembedwrapper', // The New Yorker
    'facebook',
    'favorite',
    'feedback',
    'feed-links',
    'field-site-sections',
    'fixed',
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
    'header-logo',
    'header-pattern', // The Verge
    'hero-list',
    'hide-for-print',
    'hide-print',
    'hidden-sidenote',
    'interlude',
    'interaction',
    'jumplink',
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
    'nav_',
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
    //	'popup', Gwern
    'pop-up',
    'popover',
    'post-bottom',
    'post__category',
    'postcomment',
    'postdate',
    'post-date',
    'post_date',
    'post-feeds',
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
    'trust-badge',
    'twitter',
    'welcomebox'
];
// Selectors for footnotes and citations
const FOOTNOTE_INLINE_REFERENCES = [
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
const FOOTNOTE_LIST_SELECTORS = [
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
const ELEMENT_STANDARDIZATION_RULES = [
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
                    if (ALLOWED_ATTRIBUTES.has(attr.name)) {
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
                    if (ALLOWED_ATTRIBUTES.has(attr.name)) {
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
                if (ALLOWED_ATTRIBUTES.has(attr.name)) {
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
                return Object.assign({ content: this.doc.body.innerHTML }, metadata);
            }
            // Remove small images identified from original document
            this.removeSmallImages(clone, smallImages);
            // Perform other destructive operations on the clone
            this.removeHiddenElements(clone);
            this.removeClutter(clone);
            // Clean up the main content
            this.cleanContent(mainContent, metadata);
            return Object.assign({ content: mainContent ? mainContent.outerHTML : this.doc.body.innerHTML }, metadata);
        }
        catch (error) {
            console.error('Defuddle', 'Error processing document:', error);
            return Object.assign({ content: this.doc.body.innerHTML }, metadata);
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
        // Strip unwanted attributes
        this.stripUnwantedAttributes(element);
        // Remove empty elements
        this.removeEmptyElements(element);
        // Remove trailing headings
        this.removeTrailingHeadings(element);
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
                if (ALLOWED_ATTRIBUTES.has(attr.name)) {
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
        const processedIds = new Set(); // Track processed IDs
        // Collect all footnotes and their IDs from footnote lists
        const footnoteLists = element.querySelectorAll(FOOTNOTE_LIST_SELECTORS);
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
        const footnoteInlineReferences = element.querySelectorAll(FOOTNOTE_INLINE_REFERENCES);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztVQ3J6REQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSw0REFBc0M7QUFBN0IsNkdBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZ1ZGRsZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvbWV0YWRhdGEudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvZGVmdWRkbGUudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVmdWRkbGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVmdWRkbGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFFeHRyYWN0b3Ige1xuXHRzdGF0aWMgZXh0cmFjdChkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBEZWZ1ZGRsZU1ldGFkYXRhIHtcblx0XHRsZXQgZG9tYWluID0gJyc7XG5cdFx0bGV0IHVybCA9ICcnO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFRyeSB0byBnZXQgVVJMIGZyb20gZG9jdW1lbnQgbG9jYXRpb25cblx0XHRcdHVybCA9IGRvYy5sb2NhdGlvbj8uaHJlZiB8fCAnJztcblx0XHRcdGlmICh1cmwpIHtcblx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gSWYgVVJMIHBhcnNpbmcgZmFpbHMsIHRyeSB0byBnZXQgZnJvbSBiYXNlIHRhZ1xuXHRcdFx0Y29uc3QgYmFzZVRhZyA9IGRvYy5xdWVyeVNlbGVjdG9yKCdiYXNlW2hyZWZdJyk7XG5cdFx0XHRpZiAoYmFzZVRhZykge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHVybCA9IGJhc2VUYWcuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBwYXJzZSBiYXNlIFVSTDonLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy5nZXRUaXRsZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuZ2V0RGVzY3JpcHRpb24oZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdGRvbWFpbixcblx0XHRcdGZhdmljb246IHRoaXMuZ2V0RmF2aWNvbihkb2MsIHVybCksXG5cdFx0XHRpbWFnZTogdGhpcy5nZXRJbWFnZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0cHVibGlzaGVkOiB0aGlzLmdldFB1Ymxpc2hlZChkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0YXV0aG9yOiB0aGlzLmdldEF1dGhvcihkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0c2l0ZTogdGhpcy5nZXRTaXRlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRzY2hlbWFPcmdEYXRhXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEF1dGhvcihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdhdXRob3IubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcImF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImJ5bFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImF1dGhvckxpc3RcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJjb3B5cmlnaHRcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ2NvcHlyaWdodEhvbGRlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6c2l0ZV9uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdwdWJsaXNoZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdzb3VyY2VPcmdhbml6YXRpb24ubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdpc1BhcnRPZi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmNyZWF0b3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhcHBsaWNhdGlvbi1uYW1lXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRTaXRlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ3B1Ymxpc2hlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6c2l0ZV9uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdzb3VyY2VPcmdhbml6YXRpb24ubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiY29weXJpZ2h0XCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdjb3B5cmlnaHRIb2xkZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdpc1BhcnRPZi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhcHBsaWNhdGlvbi1uYW1lXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRUaXRsZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjp0aXRsZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShzY2hlbWFPcmdEYXRhLCAnaGVhZGxpbmUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUudGl0bGVcIikgfHxcblx0XHRcdGRvYy5xdWVyeVNlbGVjdG9yKCd0aXRsZScpPy50ZXh0Q29udGVudD8udHJpbSgpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXREZXNjcmlwdGlvbihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6ZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoc2NoZW1hT3JnRGF0YSwgJ2Rlc2NyaXB0aW9uJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEltYWdlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6aW1hZ2VcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmltYWdlXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KHNjaGVtYU9yZ0RhdGEsICdpbWFnZS51cmwnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmltYWdlLmZ1bGxcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEZhdmljb24oZG9jOiBEb2N1bWVudCwgYmFzZVVybDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBpY29uRnJvbU1ldGEgPSB0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOmltYWdlOmZhdmljb25cIik7XG5cdFx0aWYgKGljb25Gcm9tTWV0YSkgcmV0dXJuIGljb25Gcm9tTWV0YTtcblxuXHRcdGNvbnN0IGljb25MaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0naWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChpY29uTGluaykgcmV0dXJuIGljb25MaW5rO1xuXG5cdFx0Y29uc3Qgc2hvcnRjdXRMaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0nc2hvcnRjdXQgaWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChzaG9ydGN1dExpbmspIHJldHVybiBzaG9ydGN1dExpbms7XG5cblx0XHQvLyBPbmx5IHRyeSB0byBjb25zdHJ1Y3QgZmF2aWNvbiBVUkwgaWYgd2UgaGF2ZSBhIHZhbGlkIGJhc2UgVVJMXG5cdFx0aWYgKGJhc2VVcmwpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVVJMKFwiL2Zhdmljb24uaWNvXCIsIGJhc2VVcmwpLmhyZWY7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybignRmFpbGVkIHRvIGNvbnN0cnVjdCBmYXZpY29uIFVSTDonLCBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRQdWJsaXNoZWQoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShzY2hlbWFPcmdEYXRhLCAnZGF0ZVB1Ymxpc2hlZCcpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwicHVibGlzaERhdGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiYXJ0aWNsZTpwdWJsaXNoZWRfdGltZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRUaW1lRWxlbWVudChkb2MpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuZGF0ZVwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0TWV0YUNvbnRlbnQoZG9jOiBEb2N1bWVudCwgYXR0cjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBzZWxlY3RvciA9IGBtZXRhWyR7YXR0cn1dYDtcblx0XHRjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG5cdFx0XHQuZmluZChlbCA9PiBlbC5nZXRBdHRyaWJ1dGUoYXR0cik/LnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpPy50cmltKCkgPz8gXCJcIiA6IFwiXCI7XG5cdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGNvbnRlbnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0VGltZUVsZW1lbnQoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3Qgc2VsZWN0b3IgPSBgdGltZWA7XG5cdFx0Y29uc3QgZWxlbWVudCA9IEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVswXTtcblx0XHRjb25zdCBjb250ZW50ID0gZWxlbWVudCA/IChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGV0aW1lXCIpPy50cmltKCkgPz8gZWxlbWVudC50ZXh0Q29udGVudD8udHJpbSgpID8/IFwiXCIpIDogXCJcIjtcblx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoY29udGVudCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBkZWNvZGVIVE1MRW50aXRpZXModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG5cdFx0dGV4dGFyZWEuaW5uZXJIVE1MID0gdGV4dDtcblx0XHRyZXR1cm4gdGV4dGFyZWEudmFsdWU7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRTY2hlbWFQcm9wZXJ0eShzY2hlbWFPcmdEYXRhOiBhbnksIHByb3BlcnR5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuXHRcdGlmICghc2NoZW1hT3JnRGF0YSkgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuXHRcdGNvbnN0IHNlYXJjaFNjaGVtYSA9IChkYXRhOiBhbnksIHByb3BzOiBzdHJpbmdbXSwgZnVsbFBhdGg6IHN0cmluZywgaXNFeGFjdE1hdGNoOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZ1tdID0+IHtcblx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0cmV0dXJuIHByb3BzLmxlbmd0aCA9PT0gMCA/IFtkYXRhXSA6IFtdO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAoIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRcdFx0Y29uc3QgY3VycmVudFByb3AgPSBwcm9wc1swXTtcblx0XHRcdFx0aWYgKC9eXFxbXFxkK1xcXSQvLnRlc3QoY3VycmVudFByb3ApKSB7XG5cdFx0XHRcdFx0Y29uc3QgaW5kZXggPSBwYXJzZUludChjdXJyZW50UHJvcC5zbGljZSgxLCAtMSkpO1xuXHRcdFx0XHRcdGlmIChkYXRhW2luZGV4XSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXJjaFNjaGVtYShkYXRhW2luZGV4XSwgcHJvcHMuc2xpY2UoMSksIGZ1bGxQYXRoLCBpc0V4YWN0TWF0Y2gpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmIChwcm9wcy5sZW5ndGggPT09IDAgJiYgZGF0YS5ldmVyeShpdGVtID0+IHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGEubWFwKFN0cmluZyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBkYXRhLmZsYXRNYXAoaXRlbSA9PiBzZWFyY2hTY2hlbWEoaXRlbSwgcHJvcHMsIGZ1bGxQYXRoLCBpc0V4YWN0TWF0Y2gpKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgW2N1cnJlbnRQcm9wLCAuLi5yZW1haW5pbmdQcm9wc10gPSBwcm9wcztcblx0XHRcdFxuXHRcdFx0aWYgKCFjdXJyZW50UHJvcCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSByZXR1cm4gW2RhdGFdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIGRhdGEubmFtZSkge1xuXHRcdFx0XHRcdHJldHVybiBbZGF0YS5uYW1lXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KGN1cnJlbnRQcm9wKSkge1xuXHRcdFx0XHRyZXR1cm4gc2VhcmNoU2NoZW1hKGRhdGFbY3VycmVudFByb3BdLCByZW1haW5pbmdQcm9wcywgXG5cdFx0XHRcdFx0ZnVsbFBhdGggPyBgJHtmdWxsUGF0aH0uJHtjdXJyZW50UHJvcH1gIDogY3VycmVudFByb3AsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzRXhhY3RNYXRjaCkge1xuXHRcdFx0XHRjb25zdCBuZXN0ZWRSZXN1bHRzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhW2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXN1bHRzID0gc2VhcmNoU2NoZW1hKGRhdGFba2V5XSwgcHJvcHMsIFxuXHRcdFx0XHRcdFx0XHRmdWxsUGF0aCA/IGAke2Z1bGxQYXRofS4ke2tleX1gIDoga2V5LCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRuZXN0ZWRSZXN1bHRzLnB1c2goLi4ucmVzdWx0cyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuZXN0ZWRSZXN1bHRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gbmVzdGVkUmVzdWx0cztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRsZXQgcmVzdWx0cyA9IHNlYXJjaFNjaGVtYShzY2hlbWFPcmdEYXRhLCBwcm9wZXJ0eS5zcGxpdCgnLicpLCAnJywgdHJ1ZSk7XG5cdFx0XHRpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmVzdWx0cyA9IHNlYXJjaFNjaGVtYShzY2hlbWFPcmdEYXRhLCBwcm9wZXJ0eS5zcGxpdCgnLicpLCAnJywgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gcmVzdWx0cy5sZW5ndGggPiAwID8gcmVzdWx0cy5maWx0ZXIoQm9vbGVhbikuam9pbignLCAnKSA6IGRlZmF1bHRWYWx1ZTtcblx0XHRcdHJldHVybiB0aGlzLmRlY29kZUhUTUxFbnRpdGllcyhyZXN1bHQpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciBpbiBnZXRTY2hlbWFQcm9wZXJ0eSBmb3IgJHtwcm9wZXJ0eX06YCwgZXJyb3IpO1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZXh0cmFjdFNjaGVtYU9yZ0RhdGEoZG9jOiBEb2N1bWVudCk6IGFueSB7XG5cdFx0Y29uc3Qgc2NoZW1hU2NyaXB0cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKTtcblx0XHRjb25zdCBzY2hlbWFEYXRhOiBhbnlbXSA9IFtdO1xuXG5cdFx0c2NoZW1hU2NyaXB0cy5mb3JFYWNoKHNjcmlwdCA9PiB7XG5cdFx0XHRsZXQganNvbkNvbnRlbnQgPSBzY3JpcHQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGpzb25Db250ZW50ID0ganNvbkNvbnRlbnRcblx0XHRcdFx0XHQucmVwbGFjZSgvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3xeXFxzKlxcL1xcLy4qJC9nbSwgJycpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqPCFcXFtDREFUQVxcWyhbXFxzXFxTXSo/KVxcXVxcXT5cXHMqJC8sICckMScpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqKFxcKlxcL3xcXC9cXCopXFxzKnxcXHMqKFxcKlxcL3xcXC9cXCopXFxzKiQvZywgJycpXG5cdFx0XHRcdFx0LnRyaW0oKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0Y29uc3QganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25Db250ZW50KTtcblxuXHRcdFx0XHRpZiAoanNvbkRhdGFbJ0BncmFwaCddICYmIEFycmF5LmlzQXJyYXkoanNvbkRhdGFbJ0BncmFwaCddKSkge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaCguLi5qc29uRGF0YVsnQGdyYXBoJ10pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaChqc29uRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgc2NoZW1hLm9yZyBkYXRhOicsIGVycm9yKTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignUHJvYmxlbWF0aWMgSlNPTiBjb250ZW50OicsIGpzb25Db250ZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBzY2hlbWFEYXRhO1xuXHR9XG59IiwiaW1wb3J0IHsgTWV0YWRhdGFFeHRyYWN0b3IgfSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7IERlZnVkZGxlT3B0aW9ucywgRGVmdWRkbGVSZXNwb25zZSwgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBFbnRyeSBwb2ludCBlbGVtZW50c1xuLy8gVGhlc2UgYXJlIHRoZSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgdXNlZCB0byBmaW5kIHRoZSBtYWluIGNvbnRlbnRcbmNvbnN0IEVOVFJZX1BPSU5UX0VMRU1FTlRTID0gW1xuXHQnYXJ0aWNsZScsXG5cdCdbcm9sZT1cImFydGljbGVcIl0nLFxuXHQnW2l0ZW1wcm9wPVwiYXJ0aWNsZUJvZHlcIl0nLFxuXHQnLnBvc3QtY29udGVudCcsXG5cdCcuYXJ0aWNsZS1jb250ZW50Jyxcblx0JyNhcnRpY2xlLWNvbnRlbnQnLFxuXHQnLmNvbnRlbnQtYXJ0aWNsZScsXG5cdCdtYWluJyxcblx0J1tyb2xlPVwibWFpblwiXScsXG5cdCdib2R5JyAvLyBlbnN1cmVzIHRoZXJlIGlzIGFsd2F5cyBhIG1hdGNoXG5dO1xuXG5jb25zdCBNT0JJTEVfV0lEVEggPSA2MDA7XG5jb25zdCBCTE9DS19FTEVNRU5UUyA9IFsnZGl2JywgJ3NlY3Rpb24nLCAnYXJ0aWNsZScsICdtYWluJ107XG5cbi8vIEhpZGRlbiBlbGVtZW50cyB0aGF0IHNob3VsZCBiZSByZW1vdmVkXG5jb25zdCBISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMgPSBbXG5cdCdbaGlkZGVuXScsXG5cdCdbYXJpYS1oaWRkZW49XCJ0cnVlXCJdJyxcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nLCBjYXVzZXMgcHJvYmxlbXMgZm9yIG1hdGggZm9ybXVsYXNcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXScsXG5cdCdbc3R5bGUqPVwidmlzaWJpbGl0eTogaGlkZGVuXCJdJyxcblx0J1tzdHlsZSo9XCJ2aXNpYmlsaXR5OmhpZGRlblwiXScsXG5cdCcuaGlkZGVuJyxcblx0Jy5pbnZpc2libGUnXG5dLmpvaW4oJywnKTtcblxuLy8gU2VsZWN0b3JzIHRvIGJlIHJlbW92ZWRcbi8vIENhc2UgaW5zZW5zaXRpdmUsIGJ1dCBtYXRjaGVzIG11c3QgYmUgZXhhY3RcbmNvbnN0IEVYQUNUX1NFTEVDVE9SUyA9IFtcblx0Ly8gc2NyaXB0cywgc3R5bGVzXG5cdCdub3NjcmlwdCcsXG5cdCdzY3JpcHQnLFxuXHQnc3R5bGUnLFxuXG5cdC8vIGFkc1xuXHQnLmFkOm5vdChbY2xhc3MqPVwiZ3JhZGllbnRcIl0pJyxcblx0J1tjbGFzc149XCJhZC1cIiBpXScsXG5cdCdbY2xhc3MkPVwiLWFkXCIgaV0nLFxuXHQnW2lkXj1cImFkLVwiIGldJyxcblx0J1tpZCQ9XCItYWRcIiBpXScsXG5cdCdbcm9sZT1cImJhbm5lclwiIGldJyxcblx0J1tjbGFzcz1cInByb21vXCIgaV0nLFxuXG5cdC8vIGNvbW1lbnRzXG5cdCdbaWQ9XCJjb21tZW50c1wiIGldJyxcblxuXHQvLyBoZWFkZXIsIG5hdlxuXHQnaGVhZGVyJyxcblx0J25hdicsXG5cdCdbaWQ9XCJoZWFkZXJcIiBpXScsXG5cdCdbY2xhc3M9XCJuYXZpZ2F0aW9uXCIgaV0nLFxuXHQnW3JvbGU9XCJuYXZpZ2F0aW9uXCIgaV0nLFxuXHQnW3JvbGU9XCJkaWFsb2dcIiBpXScsXG5cdCdbcm9sZT1cImNvbXBsZW1lbnRhcnlcIiBpXScsXG5cdCdbY2xhc3M9XCJwYWdpbmF0aW9uXCIgaV0nLFxuXG5cdC8vIG1ldGFkYXRhXG5cdCdbY2xhc3MqPVwiYXV0aG9yXCIgaV0nLFxuXHQnW2NsYXNzPVwiZGF0ZVwiIGldJyxcblx0J1tjbGFzcz1cIm1ldGFcIiBpXScsXG5cdCdbY2xhc3M9XCJ0b2NcIiBpXScsXG5cdCdbaHJlZio9XCIvY2F0ZWdvcnlcIiBpXScsXG5cdCdbaHJlZio9XCIvY2F0ZWdvcmllc1wiIGldJyxcblx0J1tocmVmKj1cIi90YWcvXCIgaV0nLFxuXHQnW2hyZWYqPVwiL3RhZ3MvXCIgaV0nLFxuXHQnW2hyZWYqPVwiL3RvcGljc1wiIGldJyxcblx0J1tocmVmKj1cImF1dGhvclwiIGldJyxcblx0J1tocmVmPVwiI3NpdGUtY29udGVudFwiIGldJyxcblx0J1tpZD1cInRpdGxlXCIgaV0nLFxuXHQnW2lkPVwidG9jXCIgaV0nLFxuXHQnW3NyYyo9XCJhdXRob3JcIiBpXScsXG5cblx0Ly8gZm9vdGVyXG5cdCdmb290ZXInLFxuXG5cdC8vIGlucHV0cywgZm9ybXMsIGVsZW1lbnRzXG5cdCdhc2lkZScsXG5cdCdidXR0b24nLFxuXHQnY2FudmFzJyxcblx0J2RpYWxvZycsXG5cdCdmaWVsZHNldCcsXG5cdCdmb3JtJyxcblx0J2lucHV0Jyxcblx0J2xhYmVsJyxcblx0J2xpbmsnLFxuXHQnb3B0aW9uJyxcblx0J3NlbGVjdCcsXG5cdCd0ZXh0YXJlYScsXG5cdCd0aW1lJyxcblx0XHQvLyAnaWZyYW1lJyBtYXliZSBuYXJyb3cgdGhpcyBkb3duIHRvIG9ubHkgYWxsb3cgaWZyYW1lcyBmb3IgdmlkZW9cblx0XHQvLyAnW3JvbGU9XCJidXR0b25cIl0nLCBNZWRpdW0gaW1hZ2VzXG5cblx0Ly8gbG9nb3Ncblx0J1tjbGFzcz1cImxvZ29cIiBpXScsXG5cdCdbaWQ9XCJsb2dvXCIgaV0nLFxuXG5cdC8vIG5ld3NsZXR0ZXJcblx0J1tpZD1cIm5ld3NsZXR0ZXJcIiBpXScsXG5cblx0Ly8gaGlkZGVuIGZvciBwcmludFxuXHQnW2NsYXNzPVwibm9wcmludFwiIGldJyxcblx0J1tkYXRhLWxpbmstbmFtZSo9XCJza2lwXCIgaV0nLFxuXHQnW2RhdGEtcHJpbnQtbGF5b3V0PVwiaGlkZVwiIGldJyxcblxuXHQvLyBmb290bm90ZXMsIGNpdGF0aW9uc1xuXHQnW2NsYXNzKj1cImNsaWNrYWJsZS1pY29uXCIgaV0nLFxuXHQnbGkgc3BhbltjbGFzcyo9XCJsdHhfdGFnXCIgaV1bY2xhc3MqPVwibHR4X3RhZ19pdGVtXCIgaV0nLFxuXHQnYVtocmVmXj1cIiNcIl1bY2xhc3MqPVwiYW5jaG9yXCIgaV0nLFxuXHQnYVtocmVmXj1cIiNcIl1bY2xhc3MqPVwicmVmXCIgaV0nLFxuXG5cdC8vIGxpbmsgbGlzdHNcblx0J1tkYXRhLWNvbnRhaW5lcio9XCJtb3N0LXZpZXdlZFwiIGldJyxcblxuXHQvLyBzaWRlYmFyXG5cdCdbY2xhc3M9XCJzaWRlYmFyXCIgaV0nLFxuXHQnW2lkPVwic2lkZWJhclwiIGldJyxcblx0J1tpZD1cInNpdGVzdWJcIiBpXScsXG5cdFxuXHQvLyBvdGhlclxuXHQnW2RhdGEtb3B0aW1pemVseT1cInJlbGF0ZWQtYXJ0aWNsZXMtc2VjdGlvblwiIGldJyAvLyBUaGUgRWNvbm9taXN0XG5dO1xuXG4vLyBSZW1vdmFsIHBhdHRlcm5zIHRlc3RlZCBhZ2FpbnN0IGF0dHJpYnV0ZXM6IGNsYXNzLCBpZCwgZGF0YS10ZXN0aWQsIGFuZCBkYXRhLXFhXG4vLyBDYXNlIGluc2Vuc2l0aXZlLCBwYXJ0aWFsIG1hdGNoZXMgYWxsb3dlZFxuY29uc3QgUEFSVElBTF9TRUxFQ1RPUlMgPSBbXG5cdCdhY2Nlc3Mtd2FsbCcsXG5cdCdhY3Rpdml0eXB1YicsXG5cdCdhcHBlbmRpeCcsXG5cdCdhdmF0YXInLFxuXHQnYWR2ZXJ0Jyxcblx0Jy1hZC0nLFxuXHQnX2FkXycsXG5cdCdhbGx0ZXJtcycsXG5cdCdhcm91bmQtdGhlLXdlYicsXG5cdCdhcnRpY2xlX19jb3B5Jyxcblx0J2FydGljbGVfZGF0ZScsXG5cdCdhcnRpY2xlLWVuZCAnLFxuXHQnYXJ0aWNsZV9oZWFkZXInLFxuXHQnYXJ0aWNsZV9faGVhZGVyJyxcblx0J2FydGljbGVfX2luZm8nLFxuXHQnYXJ0aWNsZS1pbmZvJyxcblx0J2FydGljbGVfX21ldGEnLFxuXHQnYXJ0aWNsZS1zdWJqZWN0Jyxcblx0J2FydGljbGVfc3ViamVjdCcsXG5cdCdhcnRpY2xlLXRhZ3MnLFxuXHQnYXJ0aWNsZV90YWdzJyxcblx0J2FydGljbGUtdGl0bGUnLFxuXHQnYXJ0aWNsZV90aXRsZScsXG5cdCdhcnRpY2xldG9waWNzJyxcblx0J2FydGljbGUtdG9waWNzJyxcblx0J2FydGljbGUtdHlwZScsXG5cdCdhcnRpY2xlLS1sZWRlJywgLy8gVGhlIFZlcmdlXG4vL1x0J2F1dGhvcicsIEd3ZXJuXG5cdCdiYWNrLXRvLXRvcCcsXG5cdCdiYWNrbGlua3Mtc2VjdGlvbicsXG5cdCdiYW5uZXInLFxuXHQnYmlvLWJsb2NrJyxcblx0J2Jsb2ctcGFnZXInLFxuXHQnYm90dG9tLW9mLWFydGljbGUnLFxuXHQnYnJhbmQtYmFyJyxcblx0J2JyZWFkY3J1bWInLFxuXHQnYnV0dG9uLXdyYXBwZXInLFxuXHQnYnRuLScsXG5cdCctYnRuJyxcblx0J2J5bGluZScsXG5cdCdjYXB0Y2hhJyxcblx0J2NhdF9oZWFkZXInLFxuXHQnY2F0bGlua3MnLFxuXHQnY2hhcHRlci1saXN0JywgLy8gVGhlIEVjb25vbWlzdFxuXHQnY29sbGVjdGlvbnMnLFxuXHQnY29tbWVudHMnLFxuLy9cdCctY29tbWVudCcsIFN5bnRheCBoaWdobGlnaHRpbmdcblx0J2NvbW1lbnQtY291bnQnLFxuXHQnY29tbWVudC1jb250ZW50Jyxcblx0J2NvbW1lbnQtZm9ybScsXG5cdCdjb21tZW50LXJlc3BvbmQnLFxuXHQnY29tbWVudC10aHJlYWQnLFxuXHQnY29tcGxlbWVudGFyeScsXG5cdCdjb25zZW50Jyxcblx0J2NvbnRlbnQtY2FyZCcsIC8vIFRoZSBWZXJnZVxuXHQnY29udGVudHByb21vJyxcblx0J2NvcmUtY29sbGF0ZXJhbCcsXG5cdCdfY3RhJyxcblx0Jy1jdGEnLFxuXHQnY3RhLScsXG5cdCdjdGFfJyxcblx0J2N1cnJlbnQtaXNzdWUnLCAvLyBUaGUgTmF0aW9uXG5cdCdjdXN0b20tbGlzdC1udW1iZXInLFxuXHQnZGF0ZWxpbmUnLFxuXHQnZGF0ZWhlYWRlcicsXG5cdCdkYXRlLWhlYWRlcicsXG5cdCdkYXRlX2hlYWRlci0nLFxuXHQnZGlhbG9nJyxcblx0J2Rpc2NsYWltZXInLFxuXHQnZGlzY2xvc3VyZScsXG5cdCdkaXNjdXNzaW9uJyxcblx0J2Rpc2N1c3NfJyxcblx0J2Rpc3F1cycsXG5cdCdkb25hdGUnLFxuXHQnZHJvcGRvd24nLCAvLyBBcnMgVGVjaG5pY2Fcblx0J2VsZXR0ZXJzJyxcblx0J2VtYWlsc2lnbnVwJyxcblx0J2VuZ2FnZW1lbnQtd2lkZ2V0Jyxcblx0J2VudHJ5LWRhdGUnLFxuXHQnZW50cnktbWV0YScsXG5cdCdleWVicm93Jyxcblx0J2V4cGFuZC1yZWR1Y2UnLFxuXHQnZXh0ZXJuYWxsaW5rZW1iZWR3cmFwcGVyJywgLy8gVGhlIE5ldyBZb3JrZXJcblx0J2ZhY2Vib29rJyxcblx0J2Zhdm9yaXRlJyxcblx0J2ZlZWRiYWNrJyxcblx0J2ZlZWQtbGlua3MnLFxuXHQnZmllbGQtc2l0ZS1zZWN0aW9ucycsXG5cdCdmaXhlZCcsXG5cdCdmb2xsb3cnLFxuXHQnZm9vdGVyJyxcblx0J2Zvb3Rub3RlLWJhY2snLFxuXHQnZm9vdG5vdGViYWNrJyxcblx0J2Zvci15b3UnLFxuXHQnZnJvbnRtYXR0ZXInLFxuXHQnZnVydGhlci1yZWFkaW5nJyxcblx0J2dpc3QtbWV0YScsXG4vL1x0J2dsb2JhbCcsXG5cdCdnb29nbGUnLFxuXHQnZ29vZy0nLFxuXHQnaGVhZGVyLWxvZ28nLFxuXHQnaGVhZGVyLXBhdHRlcm4nLCAvLyBUaGUgVmVyZ2Vcblx0J2hlcm8tbGlzdCcsXG5cdCdoaWRlLWZvci1wcmludCcsXG5cdCdoaWRlLXByaW50Jyxcblx0J2hpZGRlbi1zaWRlbm90ZScsXG5cdCdpbnRlcmx1ZGUnLFxuXHQnaW50ZXJhY3Rpb24nLFxuXHQnanVtcGxpbmsnLFxuXHQna2V5d29yZCcsXG5cdCdraWNrZXInLFxuXHQnLWxhYmVscycsXG5cdCdsYXRlc3QtY29udGVudCcsXG5cdCctbGVkZXMtJywgLy8gVGhlIFZlcmdlXG5cdCctbGljZW5zZScsXG5cdCdsaW5rLWJveCcsXG5cdCdsaW5rcy1ncmlkJywgLy8gQkJDXG5cdCdsaW5rcy10aXRsZScsIC8vIEJCQ1xuXHQnbGlzdGluZy1keW5hbWljLXRlcm1zJywgLy8gQm9zdG9uIFJldmlld1xuXHQnbG9hZGluZycsXG5cdCdsb2EtaW5mbycsXG5cdCdsb2dvX2NvbnRhaW5lcicsXG5cdCdsdHhfcm9sZV9yZWZudW0nLCAvLyBBcnhpdlxuXHQnbHR4X3RhZ19iaWJpdGVtJyxcblx0J2x0eF9lcnJvcicsXG5cdCdtYXJrZXRpbmcnLFxuXHQnbWVkaWEtaW5xdWlyeScsXG5cdCdtZW51LScsXG5cdCdtZXRhLScsXG5cdCdtZXRhZGF0YScsXG5cdCdtaWdodC1saWtlJyxcblx0J19tb2RhbCcsXG5cdCctbW9kYWwnLFxuXHQnbW9yZS0nLFxuXHQnbW9yZW5ld3MnLFxuXHQnbW9yZXN0b3JpZXMnLFxuXHQnbXctZWRpdHNlY3Rpb24nLFxuXHQnbXctY2l0ZS1iYWNrbGluaycsXG5cdCdtdy1qdW1wLWxpbmsnLFxuXHQnbmF2LScsXG5cdCduYXZfJyxcblx0J25hdmJhcicsXG5cdCduYXZpZ2F0aW9uJyxcblx0J25leHQtJyxcblx0J25ld3Mtc3RvcnktdGl0bGUnLFxuLy9cdCduZXdzbGV0dGVyJywgdXNlZCBvbiBTdWJzdGFja1xuXHQnbmV3c2xldHRlcl8nLFxuXHQnbmV3c2xldHRlci1zaWdudXAnLFxuXHQnbmV3c2xldHRlcnNpZ251cCcsXG5cdCduZXdzbGV0dGVyd2lkZ2V0Jyxcblx0J25ld3NsZXR0ZXJ3cmFwcGVyJyxcblx0J25vdC1mb3VuZCcsXG5cdCdvcmlnaW5hbGx5LXB1Ymxpc2hlZCcsIC8vIE1lcmN1cnkgTmV3c1xuXHQnb3ZlcmxheScsXG5cdCdwYWdlLXRpdGxlJyxcblx0Jy1wYXJ0bmVycycsXG5cdCdwZW5jcmFmdCcsIC8vIFN1YnN0YWNrXG5cdCdwbGVhJyxcblx0J3BvcHVsYXInLFxuLy9cdCdwb3B1cCcsIEd3ZXJuXG5cdCdwb3AtdXAnLFxuXHQncG9wb3ZlcicsXG5cdCdwb3N0LWJvdHRvbScsXG5cdCdwb3N0X19jYXRlZ29yeScsXG5cdCdwb3N0Y29tbWVudCcsXG5cdCdwb3N0ZGF0ZScsXG5cdCdwb3N0LWRhdGUnLFxuXHQncG9zdF9kYXRlJyxcblx0J3Bvc3QtZmVlZHMnLFxuXHQncG9zdGluZm8nLFxuXHQncG9zdC1pbmZvJyxcblx0J3Bvc3RfaW5mbycsXG5cdCdwb3N0LWxpbmtzJyxcblx0J3Bvc3QtbWV0YScsXG5cdCdwb3N0bWV0YScsXG5cdCdwb3N0c25pcHBldCcsXG5cdCdwb3N0X3NuaXBwZXQnLFxuXHQncG9zdC1zbmlwcGV0Jyxcblx0J3Bvc3R0aXRsZScsXG5cdCdwb3N0LXRpdGxlJyxcblx0J3Bvc3RfdGl0bGUnLFxuXHQncG9zdHRheCcsXG5cdCdwb3N0LXRheCcsXG5cdCdwb3N0X3RheCcsXG5cdCdwb3N0dGFnJyxcblx0J3Bvc3RfdGFnJyxcblx0J3Bvc3QtdGFnJyxcbi8vXHQncHJldmlldycsIHVzZWQgb24gT2JzaWRpYW4gUHVibGlzaFxuXHQncHJldm5leHQnLFxuXHQncHJldmlvdXNuZXh0Jyxcblx0J3ByaW50LW5vbmUnLFxuXHQncHJvZmlsZScsXG4vL1x0J3Byb21vJyxcblx0J3B1YmRhdGUnLFxuXHQncHViX2RhdGUnLFxuXHQncHViLWRhdGUnLFxuXHQncHVibGljYXRpb24tZGF0ZScsXG5cdCdwdWJsaWNhdGlvbk5hbWUnLCAvLyBNZWRpdW1cblx0J3FyLWNvZGUnLFxuXHQncXJfY29kZScsXG5cdCdyZWFkbW9yZScsXG5cdCdyZWFkLW5leHQnLFxuXHQncmVhZF9uZXh0Jyxcblx0J3JlYWRfdGltZScsXG5cdCdyZWFkLXRpbWUnLFxuXHQncmVhZGluZ190aW1lJyxcblx0J3JlYWRpbmctdGltZScsXG5cdCdyZWFkaW5nLWxpc3QnLFxuXHQncmVjb21tZW5kJyxcblx0J3JlY2lyYycsXG5cdCdyZWdpc3RlcicsXG5cdCdyZWxhdGVkJyxcblx0J3NjcmVlbi1yZWFkZXItdGV4dCcsXG4vL1x0J3NoYXJlJyxcbi8vXHQnLXNoYXJlJywgc2NpdGVjaGRhaWx5LmNvbVxuXHQnc2hhcmUtYm94Jyxcblx0J3NoYXJlLWljb25zJyxcblx0J3NoYXJlbGlua3MnLFxuXHQnc2hhcmUtc2VjdGlvbicsXG5cdCdzaWRlYmFydGl0bGUnLFxuXHQnc2lkZWJhcl8nLFxuXHQnc2ltaWxhci0nLFxuXHQnc2ltaWxhcl8nLFxuXHQnc2ltaWxhcnMtJyxcblx0J3NpZGVpdGVtcycsXG5cdCdzaXRlLWluZGV4Jyxcblx0J3NpdGUtaGVhZGVyJyxcblx0J3NpdGUtbG9nbycsXG5cdCdzaXRlLW5hbWUnLFxuLy9cdCdza2lwLScsXG5cdCdza2lwLWxpbmsnLFxuXHQnc29jaWFsJyxcblx0J3NwZWVjaGlmeS1pZ25vcmUnLFxuXHQnc3BvbnNvcicsXG4vL1x0Jy1zdGF0cycsXG5cdCdfc3RhdHMnLFxuXHQnc3RvcnlyZWFkdGltZScsIC8vIE1lZGl1bVxuXHQnc3RvcnlwdWJsaXNoZGF0ZScsIC8vIE1lZGl1bVxuXHQnc3ViamVjdC1sYWJlbCcsXG5cdCdzdWJzY3JpYmUnLFxuXHQnX3RhZ3MnLFxuXHQndGFnc19faXRlbScsXG5cdCd0YWdfbGlzdCcsXG5cdCd0YXhvbm9teScsXG5cdCd0YWJsZS1vZi1jb250ZW50cycsXG5cdCd0YWJzLScsXG4vL1x0J3RlYXNlcicsIE5hdHVyZVxuXHQndGVybWluYWx0b3V0Jyxcblx0J3RpbWUtcnVicmljJyxcblx0J3RpbWVzdGFtcCcsXG5cdCd0aXBfb2ZmJyxcblx0J3RpcHRvdXQnLFxuXHQnLXRvYycsXG5cdCd0b3BpYy1saXN0Jyxcblx0J3Rvb2xiYXInLFxuXHQndG9vbHRpcCcsXG5cdCd0b3Atd3JhcHBlcicsXG5cdCd0cmVlLWl0ZW0nLFxuXHQndHJlbmRpbmcnLFxuXHQndHJ1c3QtZmVhdCcsXG5cdCd0cnVzdC1iYWRnZScsXG5cdCd0d2l0dGVyJyxcblx0J3dlbGNvbWVib3gnXG5dO1xuXG4vLyBTZWxlY3RvcnMgZm9yIGZvb3Rub3RlcyBhbmQgY2l0YXRpb25zXG5jb25zdCBGT09UTk9URV9JTkxJTkVfUkVGRVJFTkNFUyA9IFtcblx0J3N1cC5yZWZlcmVuY2UnLFxuXHQnY2l0ZS5sdHhfY2l0ZScsXG5cdCdzdXBbaWRePVwiZm5yXCJdJyxcblx0J3N1cFtpZF49XCJmbnJlZjpcIl0nLFxuXHQnc3Bhbi5mb290bm90ZS1saW5rJyxcblx0J2EuY2l0YXRpb24nLFxuXHQnYVtpZF49XCJyZWYtbGlua1wiXScsXG5cdCdhW2hyZWZePVwiI2ZuXCJdJyxcblx0J2FbaHJlZl49XCIjY2l0ZVwiXScsXG5cdCdhW2hyZWZePVwiI3JlZmVyZW5jZVwiXScsXG5cdCdhW2hyZWZePVwiI2Zvb3Rub3RlXCJdJyxcblx0J2FbaHJlZl49XCIjclwiXScsIC8vIENvbW1vbiBpbiBhY2FkZW1pYyBwYXBlcnNcblx0J2FbaHJlZl49XCIjYlwiXScsIC8vIENvbW1vbiBmb3IgYmlibGlvZ3JhcGh5IHJlZmVyZW5jZXNcblx0J2FbaHJlZio9XCJjaXRlX25vdGVcIl0nLFxuXHQnYVtocmVmKj1cImNpdGVfcmVmXCJdJyxcblx0J2EuZm9vdG5vdGUtYW5jaG9yJywgLy8gU3Vic3RhY2tcblx0J3NwYW4uZm9vdG5vdGUtaG92ZXJjYXJkLXRhcmdldCBhJywgLy8gU3Vic3RhY2tcblx0J2Fbcm9sZT1cImRvYy1iaWJsaW9yZWZcIl0nLCAvLyBTY2llbmNlLm9yZ1xuXHQnYVtpZF49XCJmbnJlZlwiXScsXG5cdCdhW2lkXj1cInJlZi1saW5rXCJdJywgLy8gTmF0dXJlLmNvbVxuXS5qb2luKCcsJyk7XG5cbmNvbnN0IEZPT1ROT1RFX0xJU1RfU0VMRUNUT1JTID0gW1xuXHQnZGl2LmZvb3Rub3RlIG9sJyxcblx0J2Rpdi5mb290bm90ZXMgb2wnLFxuXHQnZGl2W3JvbGU9XCJkb2MtZW5kbm90ZXNcIl0nLFxuXHQnZGl2W3JvbGU9XCJkb2MtZm9vdG5vdGVzXCJdJyxcblx0J29sLmZvb3Rub3Rlcy1saXN0Jyxcblx0J29sLmZvb3Rub3RlcycsXG5cdCdvbC5yZWZlcmVuY2VzJyxcblx0J29sW2NsYXNzKj1cImFydGljbGUtcmVmZXJlbmNlc1wiXScsXG5cdCdzZWN0aW9uLmZvb3Rub3RlcyBvbCcsXG5cdCdzZWN0aW9uW3JvbGU9XCJkb2MtZW5kbm90ZXNcIl0nLFxuXHQnc2VjdGlvbltyb2xlPVwiZG9jLWZvb3Rub3Rlc1wiXScsXG5cdCdzZWN0aW9uW3JvbGU9XCJkb2MtYmlibGlvZ3JhcGh5XCJdJyxcblx0J3VsLmZvb3Rub3Rlcy1saXN0Jyxcblx0J3VsLmx0eF9iaWJsaXN0Jyxcblx0J2Rpdi5mb290bm90ZVtkYXRhLWNvbXBvbmVudC1uYW1lPVwiRm9vdG5vdGVUb0RPTVwiXScgLy8gU3Vic3RhY2tcbl0uam9pbignLCcpO1xuXG4vLyBFbGVtZW50cyB0aGF0IGFyZSBhbGxvd2VkIHRvIGJlIGVtcHR5XG4vLyBUaGVzZSBhcmUgbm90IHJlbW92ZWQgZXZlbiBpZiB0aGV5IGhhdmUgbm8gY29udGVudFxuY29uc3QgQUxMT1dFRF9FTVBUWV9FTEVNRU5UUyA9IG5ldyBTZXQoW1xuXHQnYXJlYScsXG5cdCdhdWRpbycsXG5cdCdiYXNlJyxcblx0J2JyJyxcblx0J2NpcmNsZScsXG5cdCdjb2wnLFxuXHQnZGVmcycsXG5cdCdlbGxpcHNlJyxcblx0J2VtYmVkJyxcblx0J2ZpZ3VyZScsXG5cdCdnJyxcblx0J2hyJyxcblx0J2lmcmFtZScsXG5cdCdpbWcnLFxuXHQnaW5wdXQnLFxuXHQnbGluZScsXG5cdCdsaW5rJyxcblx0J21hc2snLFxuXHQnbWV0YScsXG5cdCdvYmplY3QnLFxuXHQncGFyYW0nLFxuXHQncGF0aCcsXG5cdCdwYXR0ZXJuJyxcblx0J3BpY3R1cmUnLFxuXHQncG9seWdvbicsXG5cdCdwb2x5bGluZScsXG5cdCdyZWN0Jyxcblx0J3NvdXJjZScsXG5cdCdzdG9wJyxcblx0J3N2ZycsXG5cdCd0ZCcsXG5cdCd0aCcsXG5cdCd0cmFjaycsXG5cdCd1c2UnLFxuXHQndmlkZW8nLFxuXHQnd2JyJ1xuXSk7XG5cbi8vIEF0dHJpYnV0ZXMgdG8ga2VlcFxuY29uc3QgQUxMT1dFRF9BVFRSSUJVVEVTID0gbmV3IFNldChbXG5cdCdhbHQnLFxuXHQnYWxsb3cnLFxuXHQnYWxsb3dmdWxsc2NyZWVuJyxcblx0J2FyaWEtbGFiZWwnLFxuXHQnY2xhc3MnLFxuXHQnY29sc3BhbicsXG5cdCdjb250cm9scycsXG5cdCdkYXRhLXNyYycsXG5cdCdkYXRhLXNyY3NldCcsXG5cdCdkaXInLFxuXHQnZnJhbWVib3JkZXInLFxuXHQnaGVhZGVycycsXG5cdCdoZWlnaHQnLFxuXHQnaHJlZicsXG5cdCdpZCcsXG5cdCdsYW5nJyxcblx0J3JvbGUnLFxuXHQncm93c3BhbicsXG5cdCdzcmMnLFxuXHQnc3Jjc2V0Jyxcblx0J3RpdGxlJyxcblx0J3R5cGUnLFxuXHQnd2lkdGgnXG5dKTtcblxuLy8gRWxlbWVudCBzdGFuZGFyZGl6YXRpb24gcnVsZXNcbi8vIE1hcHMgc2VsZWN0b3JzIHRvIHRoZWlyIHRhcmdldCBIVE1MIGVsZW1lbnQgbmFtZVxuaW50ZXJmYWNlIFN0YW5kYXJkaXphdGlvblJ1bGUge1xuXHRzZWxlY3Rvcjogc3RyaW5nO1xuXHRlbGVtZW50OiBzdHJpbmc7XG5cdHRyYW5zZm9ybT86IChlbDogRWxlbWVudCkgPT4gRWxlbWVudDtcbn1cblxuY29uc3QgRUxFTUVOVF9TVEFOREFSRElaQVRJT05fUlVMRVM6IFN0YW5kYXJkaXphdGlvblJ1bGVbXSA9IFtcblx0Ly8gU2ltcGxpZnkgaGVhZGluZ3MgYnkgcmVtb3ZpbmcgaW50ZXJuYWwgbmF2aWdhdGlvbiBlbGVtZW50c1xuXHR7XG5cdFx0c2VsZWN0b3I6ICdoMSwgaDIsIGgzLCBoNCwgaDUsIGg2Jyxcblx0XHRlbGVtZW50OiAna2VlcCcsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdC8vIElmIGhlYWRpbmcgb25seSBjb250YWlucyBhIHNpbmdsZSBhbmNob3Igd2l0aCBpbnRlcm5hbCBsaW5rXG5cdFx0XHRpZiAoZWwuY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIFxuXHRcdFx0XHRlbC5maXJzdEVsZW1lbnRDaGlsZD8udGFnTmFtZSA9PT0gJ0EnICYmXG5cdFx0XHRcdChlbC5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKT8uaW5jbHVkZXMoJyMnKSB8fCBcblx0XHRcdFx0IGVsLmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpPy5zdGFydHNXaXRoKCcjJykpKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDcmVhdGUgbmV3IGhlYWRpbmcgb2Ygc2FtZSBsZXZlbFxuXHRcdFx0XHRjb25zdCBuZXdIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbC50YWdOYW1lKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzIGZyb20gb3JpZ2luYWwgaGVhZGluZ1xuXHRcdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdFx0bmV3SGVhZGluZy5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gSnVzdCB1c2UgdGhlIHRleHQgY29udGVudFxuXHRcdFx0XHRuZXdIZWFkaW5nLnRleHRDb250ZW50ID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBuZXdIZWFkaW5nO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBJZiBoZWFkaW5nIGNvbnRhaW5zIG5hdmlnYXRpb24gYnV0dG9ucyBvciBvdGhlciB1dGlsaXR5IGVsZW1lbnRzXG5cdFx0XHRjb25zdCBidXR0b25zID0gZWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5cdFx0XHRpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IG5ld0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsLnRhZ05hbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdFx0QXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRcdG5ld0hlYWRpbmcuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEp1c3QgdXNlIHRoZSB0ZXh0IGNvbnRlbnRcblx0XHRcdFx0bmV3SGVhZGluZy50ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gbmV3SGVhZGluZztcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH1cblx0fSxcblx0Ly8gQ29udmVydCBkaXZzIHdpdGggcGFyYWdyYXBoIHJvbGUgdG8gYWN0dWFsIHBhcmFncmFwaHNcblx0eyBcblx0XHRzZWxlY3RvcjogJ2RpdltkYXRhLXRlc3RpZF49XCJwYXJhZ3JhcGhcIl0sIGRpdltyb2xlPVwicGFyYWdyYXBoXCJdJywgXG5cdFx0ZWxlbWVudDogJ3AnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XG5cdFx0XHQvLyBDb3B5IGlubmVySFRNTFxuXHRcdFx0cC5pbm5lckhUTUwgPSBlbC5pbm5lckhUTUw7XG5cdFx0XHRcblx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRwLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIHA7XG5cdFx0fVxuXHR9LFxuXHQvLyBDb252ZXJ0IGRpdnMgd2l0aCBsaXN0IHJvbGVzIHRvIGFjdHVhbCBsaXN0c1xuXHR7IFxuXHRcdHNlbGVjdG9yOiAnZGl2W3JvbGU9XCJsaXN0XCJdJywgXG5cdFx0ZWxlbWVudDogJ3VsJyxcblx0XHQvLyBDdXN0b20gaGFuZGxlciBmb3IgbGlzdCB0eXBlIGRldGVjdGlvbiBhbmQgdHJhbnNmb3JtYXRpb25cblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Ly8gRmlyc3QgZGV0ZXJtaW5lIGlmIHRoaXMgaXMgYW4gb3JkZXJlZCBsaXN0XG5cdFx0XHRjb25zdCBmaXJzdEl0ZW0gPSBlbC5xdWVyeVNlbGVjdG9yKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdIC5sYWJlbCcpO1xuXHRcdFx0Y29uc3QgbGFiZWwgPSBmaXJzdEl0ZW0/LnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRjb25zdCBpc09yZGVyZWQgPSBsYWJlbC5tYXRjaCgvXlxcZCtcXCkvKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBhcHByb3ByaWF0ZSBsaXN0IHR5cGVcblx0XHRcdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGlzT3JkZXJlZCA/ICdvbCcgOiAndWwnKTtcblx0XHRcdFxuXHRcdFx0Ly8gUHJvY2VzcyBlYWNoIGxpc3QgaXRlbVxuXHRcdFx0Y29uc3QgaXRlbXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0XHRjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0XHRcdGNvbnN0IGNvbnRlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoY29udGVudCkge1xuXHRcdFx0XHRcdC8vIENvbnZlcnQgYW55IHBhcmFncmFwaCBkaXZzIGluc2lkZSBjb250ZW50XG5cdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoRGl2cyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nKTtcblx0XHRcdFx0XHRwYXJhZ3JhcGhEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdFx0XHRwLmlubmVySFRNTCA9IGRpdi5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ29udmVydCBhbnkgbmVzdGVkIGxpc3RzIHJlY3Vyc2l2ZWx5XG5cdFx0XHRcdFx0Y29uc3QgbmVzdGVkTGlzdHMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwibGlzdFwiXScpO1xuXHRcdFx0XHRcdG5lc3RlZExpc3RzLmZvckVhY2gobmVzdGVkTGlzdCA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBmaXJzdE5lc3RlZEl0ZW0gPSBuZXN0ZWRMaXN0LnF1ZXJ5U2VsZWN0b3IoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0gLmxhYmVsJyk7XG5cdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRMYWJlbCA9IGZpcnN0TmVzdGVkSXRlbT8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0XHRcdGNvbnN0IGlzTmVzdGVkT3JkZXJlZCA9IG5lc3RlZExhYmVsLm1hdGNoKC9eXFxkK1xcKS8pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRjb25zdCBuZXdOZXN0ZWRMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpc05lc3RlZE9yZGVyZWQgPyAnb2wnIDogJ3VsJyk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIFByb2Nlc3MgbmVzdGVkIGl0ZW1zXG5cdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRJdGVtcyA9IG5lc3RlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJsaXN0aXRlbVwiXScpO1xuXHRcdFx0XHRcdFx0bmVzdGVkSXRlbXMuZm9yRWFjaChuZXN0ZWRJdGVtID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkTGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRDb250ZW50ID0gbmVzdGVkSXRlbS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYgKG5lc3RlZENvbnRlbnQpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBDb252ZXJ0IHBhcmFncmFwaCBkaXZzIGluIG5lc3RlZCBpdGVtc1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZFBhcmFncmFwaHMgPSBuZXN0ZWRDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwicGFyYWdyYXBoXCJdJyk7XG5cdFx0XHRcdFx0XHRcdFx0bmVzdGVkUGFyYWdyYXBocy5mb3JFYWNoKGRpdiA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cC5pbm5lckhUTUwgPSBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKHApO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdG5lc3RlZExpLmlubmVySFRNTCA9IG5lc3RlZENvbnRlbnQuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRuZXdOZXN0ZWRMaXN0LmFwcGVuZENoaWxkKG5lc3RlZExpKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRuZXN0ZWRMaXN0LnJlcGxhY2VXaXRoKG5ld05lc3RlZExpc3QpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxpLmlubmVySFRNTCA9IGNvbnRlbnQuaW5uZXJIVE1MO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRsaXN0LmFwcGVuZENoaWxkKGxpKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gbGlzdDtcblx0XHR9XG5cdH0sXG5cdHsgXG5cdFx0c2VsZWN0b3I6ICdkaXZbcm9sZT1cImxpc3RpdGVtXCJdJywgXG5cdFx0ZWxlbWVudDogJ2xpJyxcblx0XHQvLyBDdXN0b20gaGFuZGxlciBmb3IgbGlzdCBpdGVtIGNvbnRlbnRcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Y29uc3QgY29udGVudCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdFx0XHRpZiAoIWNvbnRlbnQpIHJldHVybiBlbDtcblx0XHRcdFxuXHRcdFx0Ly8gQ29udmVydCBhbnkgcGFyYWdyYXBoIGRpdnMgaW5zaWRlIGNvbnRlbnRcblx0XHRcdGNvbnN0IHBhcmFncmFwaERpdnMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwicGFyYWdyYXBoXCJdJyk7XG5cdFx0XHRwYXJhZ3JhcGhEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0cC5pbm5lckhUTUwgPSBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0fVxuXHR9XG5dO1xuXG5pbnRlcmZhY2UgRm9vdG5vdGVEYXRhIHtcblx0Y29udGVudDogRWxlbWVudCB8IHN0cmluZztcblx0b3JpZ2luYWxJZDogc3RyaW5nO1xuXHRyZWZzOiBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIEZvb3Rub3RlQ29sbGVjdGlvbiB7XG5cdFtmb290bm90ZU51bWJlcjogbnVtYmVyXTogRm9vdG5vdGVEYXRhO1xufVxuXG5pbnRlcmZhY2UgQ29udGVudFNjb3JlIHtcblx0c2NvcmU6IG51bWJlcjtcblx0ZWxlbWVudDogRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIFN0eWxlQ2hhbmdlIHtcblx0c2VsZWN0b3I6IHN0cmluZztcblx0c3R5bGVzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZ1ZGRsZSB7XG5cdHByaXZhdGUgZG9jOiBEb2N1bWVudDtcblx0cHJpdmF0ZSBvcHRpb25zOiBEZWZ1ZGRsZU9wdGlvbnM7XG5cdHByaXZhdGUgZGVidWc6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBEZWZ1ZGRsZSBpbnN0YW5jZVxuXHQgKiBAcGFyYW0gZG9jIC0gVGhlIGRvY3VtZW50IHRvIHBhcnNlXG5cdCAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgcGFyc2luZ1xuXHQgKi9cblx0Y29uc3RydWN0b3IoZG9jOiBEb2N1bWVudCwgb3B0aW9uczogRGVmdWRkbGVPcHRpb25zID0ge30pIHtcblx0XHR0aGlzLmRvYyA9IGRvYztcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuZGVidWcgPSBvcHRpb25zLmRlYnVnIHx8IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIHRoZSBkb2N1bWVudCBhbmQgZXh0cmFjdCBpdHMgbWFpbiBjb250ZW50XG5cdCAqL1xuXHRwYXJzZSgpOiBEZWZ1ZGRsZVJlc3BvbnNlIHtcblx0XHQvLyBFeHRyYWN0IG1ldGFkYXRhIGZpcnN0IHNpbmNlIHdlJ2xsIG5lZWQgaXQgaW4gbXVsdGlwbGUgcGxhY2VzXG5cdFx0Y29uc3Qgc2NoZW1hT3JnRGF0YSA9IE1ldGFkYXRhRXh0cmFjdG9yLmV4dHJhY3RTY2hlbWFPcmdEYXRhKHRoaXMuZG9jKTtcblx0XHRjb25zdCBtZXRhZGF0YSA9IE1ldGFkYXRhRXh0cmFjdG9yLmV4dHJhY3QodGhpcy5kb2MsIHNjaGVtYU9yZ0RhdGEpO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIEV2YWx1YXRlIHN0eWxlcyBhbmQgc2l6ZXMgb24gb3JpZ2luYWwgZG9jdW1lbnRcblx0XHRcdGNvbnN0IG1vYmlsZVN0eWxlcyA9IHRoaXMuX2V2YWx1YXRlTWVkaWFRdWVyaWVzKHRoaXMuZG9jKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ2hlY2sgZm9yIHNtYWxsIGltYWdlcyBpbiBvcmlnaW5hbCBkb2N1bWVudCwgZXhjbHVkaW5nIGxhenktbG9hZGVkIG9uZXNcblx0XHRcdGNvbnN0IHNtYWxsSW1hZ2VzID0gdGhpcy5maW5kU21hbGxJbWFnZXModGhpcy5kb2MpO1xuXHRcdFx0XG5cdFx0XHQvLyBDbG9uZSBkb2N1bWVudFxuXHRcdFx0Y29uc3QgY2xvbmUgPSB0aGlzLmRvYy5jbG9uZU5vZGUodHJ1ZSkgYXMgRG9jdW1lbnQ7XG5cdFx0XHRcblx0XHRcdC8vIEFwcGx5IG1vYmlsZSBzdHlsZSB0byBjbG9uZVxuXHRcdFx0dGhpcy5hcHBseU1vYmlsZVN0eWxlcyhjbG9uZSwgbW9iaWxlU3R5bGVzKTtcblxuXHRcdFx0Ly8gRmluZCBtYWluIGNvbnRlbnRcblx0XHRcdGNvbnN0IG1haW5Db250ZW50ID0gdGhpcy5maW5kTWFpbkNvbnRlbnQoY2xvbmUpO1xuXHRcdFx0aWYgKCFtYWluQ29udGVudCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGNvbnRlbnQ6IHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MLFxuXHRcdFx0XHRcdC4uLm1ldGFkYXRhXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBzbWFsbCBpbWFnZXMgaWRlbnRpZmllZCBmcm9tIG9yaWdpbmFsIGRvY3VtZW50XG5cdFx0XHR0aGlzLnJlbW92ZVNtYWxsSW1hZ2VzKGNsb25lLCBzbWFsbEltYWdlcyk7XG5cdFx0XHRcblx0XHRcdC8vIFBlcmZvcm0gb3RoZXIgZGVzdHJ1Y3RpdmUgb3BlcmF0aW9ucyBvbiB0aGUgY2xvbmVcblx0XHRcdHRoaXMucmVtb3ZlSGlkZGVuRWxlbWVudHMoY2xvbmUpO1xuXHRcdFx0dGhpcy5yZW1vdmVDbHV0dGVyKGNsb25lKTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgdGhlIG1haW4gY29udGVudFxuXHRcdFx0dGhpcy5jbGVhbkNvbnRlbnQobWFpbkNvbnRlbnQsIG1ldGFkYXRhKTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y29udGVudDogbWFpbkNvbnRlbnQgPyBtYWluQ29udGVudC5vdXRlckhUTUwgOiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTCxcblx0XHRcdFx0Li4ubWV0YWRhdGFcblx0XHRcdH07XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlJywgJ0Vycm9yIHByb2Nlc3NpbmcgZG9jdW1lbnQ6JywgZXJyb3IpO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y29udGVudDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUwsXG5cdFx0XHRcdC4uLm1ldGFkYXRhXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdC8vIE1ha2UgYWxsIG90aGVyIG1ldGhvZHMgcHJpdmF0ZSBieSByZW1vdmluZyB0aGUgc3RhdGljIGtleXdvcmQgYW5kIHVzaW5nIHByaXZhdGVcblx0cHJpdmF0ZSBfbG9nKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdEZWZ1ZGRsZTonLCAuLi5hcmdzKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9ldmFsdWF0ZU1lZGlhUXVlcmllcyhkb2M6IERvY3VtZW50KTogU3R5bGVDaGFuZ2VbXSB7XG5cdFx0Y29uc3QgbW9iaWxlU3R5bGVzOiBTdHlsZUNoYW5nZVtdID0gW107XG5cdFx0Y29uc3QgbWF4V2lkdGhSZWdleCA9IC9tYXgtd2lkdGhbXjpdKjpcXHMqKFxcZCspLztcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBHZXQgYWxsIHN0eWxlcywgaW5jbHVkaW5nIGlubGluZSBzdHlsZXNcblx0XHRcdGNvbnN0IHNoZWV0cyA9IEFycmF5LmZyb20oZG9jLnN0eWxlU2hlZXRzKS5maWx0ZXIoc2hlZXQgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIEFjY2VzcyBydWxlcyBvbmNlIHRvIGNoZWNrIHZhbGlkaXR5XG5cdFx0XHRcdFx0c2hlZXQuY3NzUnVsZXM7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHQvLyBFeHBlY3RlZCBlcnJvciBmb3IgY3Jvc3Mtb3JpZ2luIHN0eWxlc2hlZXRzXG5cdFx0XHRcdFx0aWYgKGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZS5uYW1lID09PSAnU2VjdXJpdHlFcnJvcicpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdC8vIFByb2Nlc3MgYWxsIHNoZWV0cyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0XHRjb25zdCBtZWRpYVJ1bGVzID0gc2hlZXRzLmZsYXRNYXAoc2hlZXQgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJldHVybiBBcnJheS5mcm9tKHNoZWV0LmNzc1J1bGVzKVxuXHRcdFx0XHRcdFx0LmZpbHRlcigocnVsZSk6IHJ1bGUgaXMgQ1NTTWVkaWFSdWxlID0+IFxuXHRcdFx0XHRcdFx0XHRydWxlIGluc3RhbmNlb2YgQ1NTTWVkaWFSdWxlICYmXG5cdFx0XHRcdFx0XHRcdHJ1bGUuY29uZGl0aW9uVGV4dC5pbmNsdWRlcygnbWF4LXdpZHRoJylcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3Mgc3R5bGVzaGVldDonLCBlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gUHJvY2VzcyBhbGwgbWVkaWEgcnVsZXMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdFx0bWVkaWFSdWxlcy5mb3JFYWNoKHJ1bGUgPT4ge1xuXHRcdFx0XHRjb25zdCBtYXRjaCA9IHJ1bGUuY29uZGl0aW9uVGV4dC5tYXRjaChtYXhXaWR0aFJlZ2V4KTtcblx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0Y29uc3QgbWF4V2lkdGggPSBwYXJzZUludChtYXRjaFsxXSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgKE1PQklMRV9XSURUSCA8PSBtYXhXaWR0aCkge1xuXHRcdFx0XHRcdFx0Ly8gQmF0Y2ggcHJvY2VzcyBhbGwgc3R5bGUgcnVsZXNcblx0XHRcdFx0XHRcdGNvbnN0IHN0eWxlUnVsZXMgPSBBcnJheS5mcm9tKHJ1bGUuY3NzUnVsZXMpXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoKHIpOiByIGlzIENTU1N0eWxlUnVsZSA9PiByIGluc3RhbmNlb2YgQ1NTU3R5bGVSdWxlKTtcblxuXHRcdFx0XHRcdFx0c3R5bGVSdWxlcy5mb3JFYWNoKGNzc1J1bGUgPT4ge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdG1vYmlsZVN0eWxlcy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdG9yOiBjc3NSdWxlLnNlbGVjdG9yVGV4dCxcblx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlczogY3NzUnVsZS5zdHlsZS5jc3NUZXh0XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3MgQ1NTIHJ1bGU6JywgZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlOiBFcnJvciBldmFsdWF0aW5nIG1lZGlhIHF1ZXJpZXM6JywgZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vYmlsZVN0eWxlcztcblx0fVxuXG5cdHByaXZhdGUgYXBwbHlNb2JpbGVTdHlsZXMoZG9jOiBEb2N1bWVudCwgbW9iaWxlU3R5bGVzOiBTdHlsZUNoYW5nZVtdKSB7XG5cdFx0bGV0IGFwcGxpZWRDb3VudCA9IDA7XG5cblx0XHRtb2JpbGVTdHlsZXMuZm9yRWFjaCgoe3NlbGVjdG9yLCBzdHlsZXN9KSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcblx0XHRcdFx0XHRcdChlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJykgKyBzdHlsZXNcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGFwcGxpZWRDb3VudCsrO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRGVmdWRkbGUnLCAnRXJyb3IgYXBwbHlpbmcgc3R5bGVzIGZvciBzZWxlY3RvcjonLCBzZWxlY3RvciwgZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlSGlkZGVuRWxlbWVudHMoZG9jOiBEb2N1bWVudCkge1xuXHRcdGxldCBjb3VudCA9IDA7XG5cdFx0Y29uc3QgZWxlbWVudHNUb1JlbW92ZSA9IG5ldyBTZXQ8RWxlbWVudD4oKTtcblxuXHRcdC8vIEZpcnN0IHBhc3M6IEdldCBhbGwgZWxlbWVudHMgbWF0Y2hpbmcgaGlkZGVuIHNlbGVjdG9yc1xuXHRcdGNvbnN0IGhpZGRlbkVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoSElEREVOX0VMRU1FTlRfU0VMRUNUT1JTKTtcblx0XHRoaWRkZW5FbGVtZW50cy5mb3JFYWNoKGVsID0+IGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsKSk7XG5cdFx0Y291bnQgKz0gaGlkZGVuRWxlbWVudHMubGVuZ3RoO1xuXG5cdFx0Ly8gU2Vjb25kIHBhc3M6IFVzZSBUcmVlV2Fsa2VyIGZvciBlZmZpY2llbnQgdHJhdmVyc2FsXG5cdFx0Y29uc3QgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG5cdFx0XHRkb2MuYm9keSxcblx0XHRcdE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULFxuXHRcdFx0e1xuXHRcdFx0XHRhY2NlcHROb2RlOiAobm9kZTogRWxlbWVudCkgPT4ge1xuXHRcdFx0XHRcdC8vIFNraXAgZWxlbWVudHMgYWxyZWFkeSBtYXJrZWQgZm9yIHJlbW92YWxcblx0XHRcdFx0XHRpZiAoZWxlbWVudHNUb1JlbW92ZS5oYXMobm9kZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0Ly8gQmF0Y2ggc3R5bGUgY29tcHV0YXRpb25zXG5cdFx0Y29uc3QgZWxlbWVudHM6IEVsZW1lbnRbXSA9IFtdO1xuXHRcdGxldCBjdXJyZW50Tm9kZTogRWxlbWVudCB8IG51bGw7XG5cdFx0d2hpbGUgKGN1cnJlbnROb2RlID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpIGFzIEVsZW1lbnQpIHtcblx0XHRcdGVsZW1lbnRzLnB1c2goY3VycmVudE5vZGUpO1xuXHRcdH1cblxuXHRcdC8vIFByb2Nlc3Mgc3R5bGVzIGluIGJhdGNoZXMgdG8gbWluaW1pemUgbGF5b3V0IHRocmFzaGluZ1xuXHRcdGNvbnN0IEJBVENIX1NJWkUgPSAxMDA7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkgKz0gQkFUQ0hfU0laRSkge1xuXHRcdFx0Y29uc3QgYmF0Y2ggPSBlbGVtZW50cy5zbGljZShpLCBpICsgQkFUQ0hfU0laRSk7XG5cdFx0XHRcblx0XHRcdC8vIFJlYWQgcGhhc2UgLSBnYXRoZXIgYWxsIGNvbXB1dGVkU3R5bGVzXG5cdFx0XHRjb25zdCBzdHlsZXMgPSBiYXRjaC5tYXAoZWwgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpKTtcblx0XHRcdFxuXHRcdFx0Ly8gV3JpdGUgcGhhc2UgLSBtYXJrIGVsZW1lbnRzIGZvciByZW1vdmFsXG5cdFx0XHRiYXRjaC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjb21wdXRlZFN0eWxlID0gc3R5bGVzW2luZGV4XTtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGNvbXB1dGVkU3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnIHx8XG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS52aXNpYmlsaXR5ID09PSAnaGlkZGVuJyB8fFxuXHRcdFx0XHRcdGNvbXB1dGVkU3R5bGUub3BhY2l0eSA9PT0gJzAnXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsZW1lbnQpO1xuXHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIEZpbmFsIHBhc3M6IEJhdGNoIHJlbW92ZSBhbGwgaGlkZGVuIGVsZW1lbnRzXG5cdFx0ZWxlbWVudHNUb1JlbW92ZS5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBoaWRkZW4gZWxlbWVudHM6JywgY291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVDbHV0dGVyKGRvYzogRG9jdW1lbnQpIHtcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRsZXQgZXhhY3RTZWxlY3RvckNvdW50ID0gMDtcblx0XHRsZXQgcGFydGlhbFNlbGVjdG9yQ291bnQgPSAwO1xuXG5cdFx0Ly8gQ29tYmluZSBhbGwgZXhhY3Qgc2VsZWN0b3JzIGludG8gYSBzaW5nbGUgc2VsZWN0b3Igc3RyaW5nXG5cdFx0Y29uc3QgY29tYmluZWRFeGFjdFNlbGVjdG9yID0gRVhBQ1RfU0VMRUNUT1JTLmpvaW4oJywnKTtcblx0XHRcblx0XHQvLyBGaXJzdCBwYXNzOiBSZW1vdmUgZWxlbWVudHMgbWF0Y2hpbmcgZXhhY3Qgc2VsZWN0b3JzXG5cdFx0Y29uc3QgZXhhY3RFbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKGNvbWJpbmVkRXhhY3RTZWxlY3Rvcik7XG5cdFx0aWYgKGV4YWN0RWxlbWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Ly8gQmF0Y2ggcmVtb3ZlIGVsZW1lbnRzXG5cdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdGV4YWN0RWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdGlmIChlbD8ucGFyZW50Tm9kZSkge1xuXHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGVsKTtcblx0XHRcdFx0XHRleGFjdFNlbGVjdG9yQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gU2Vjb25kIHBhc3M6IEhhbmRsZSBwYXJ0aWFsIHNlbGVjdG9yc1xuXHRcdC8vIFByZS1jb21waWxlIHJlZ2V4ZXMgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuXHRcdGNvbnN0IHBhcnRpYWxSZWdleGVzID0gUEFSVElBTF9TRUxFQ1RPUlMubWFwKHBhdHRlcm4gPT4gKHtcblx0XHRcdHBhdHRlcm4sXG5cdFx0XHRyZWdleDogbmV3IFJlZ0V4cChwYXR0ZXJuLCAnaScpXG5cdFx0fSkpO1xuXG5cdFx0Ly8gQ3JlYXRlIGFuIGVmZmljaWVudCBsb29rdXAgZm9yIHBhcnRpYWwgbWF0Y2hlc1xuXHRcdGNvbnN0IHNob3VsZFJlbW92ZUVsZW1lbnQgPSAoZWw6IEVsZW1lbnQpOiBib29sZWFuID0+IHtcblx0XHRcdC8vIEdldCBhbGwgcmVsZXZhbnQgYXR0cmlidXRlcyBvbmNlXG5cdFx0XHRjb25zdCBjbGFzc05hbWUgPSBlbC5jbGFzc05hbWUgJiYgdHlwZW9mIGVsLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgPyBcblx0XHRcdFx0ZWwuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0XHRcdGNvbnN0IGlkID0gZWwuaWQgPyBlbC5pZC50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdFx0XHRjb25zdCB0ZXN0SWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdGlkJyk/LnRvTG93ZXJDYXNlKCkgfHwgJyc7XG5cdFx0XHRjb25zdCB0ZXN0UWEgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcWEnKT8udG9Mb3dlckNhc2UoKSB8fCAnJztcblx0XHRcdGNvbnN0IHRlc3RDeSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jeScpPy50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXG5cdFx0XHQvLyBDb21iaW5lIGF0dHJpYnV0ZXMgZm9yIHNpbmdsZS1wYXNzIGNoZWNraW5nXG5cdFx0XHRjb25zdCBhdHRyaWJ1dGVUZXh0ID0gYCR7Y2xhc3NOYW1lfSAke2lkfSAke3Rlc3RJZH0gJHt0ZXN0UWF9ICR7dGVzdEN5fWA7XG5cdFx0XHRcblx0XHRcdC8vIEVhcmx5IHJldHVybiBpZiBubyBjb250ZW50IHRvIGNoZWNrXG5cdFx0XHRpZiAoIWF0dHJpYnV0ZVRleHQudHJpbSgpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVXNlIHNvbWUoKSBmb3IgZWFybHkgdGVybWluYXRpb25cblx0XHRcdHJldHVybiBwYXJ0aWFsUmVnZXhlcy5zb21lKCh7IHJlZ2V4IH0pID0+IHJlZ2V4LnRlc3QoYXR0cmlidXRlVGV4dCkpO1xuXHRcdH07XG5cblx0XHQvLyBQcm9jZXNzIGVsZW1lbnRzIGluIGJhdGNoZXMgdG8gYXZvaWQgbG9uZyB0YXNrc1xuXHRcdGNvbnN0IEJBVENIX1NJWkUgPSAxMDA7XG5cdFx0Y29uc3QgYWxsRWxlbWVudHMgPSBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdbY2xhc3NdLCBbaWRdLCBbZGF0YS10ZXN0aWRdLCBbZGF0YS1xYV0sIFtkYXRhLWN5XScpKTtcblx0XHRcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaSArPSBCQVRDSF9TSVpFKSB7XG5cdFx0XHRjb25zdCBiYXRjaCA9IGFsbEVsZW1lbnRzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcblx0XHRcdGNvbnN0IGVsZW1lbnRzVG9SZW1vdmU6IEVsZW1lbnRbXSA9IFtdO1xuXG5cdFx0XHQvLyBSZWFkIHBoYXNlIC0gaWRlbnRpZnkgZWxlbWVudHMgdG8gcmVtb3ZlXG5cdFx0XHRiYXRjaC5mb3JFYWNoKGVsID0+IHtcblx0XHRcdFx0aWYgKHNob3VsZFJlbW92ZUVsZW1lbnQoZWwpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5wdXNoKGVsKTtcblx0XHRcdFx0XHRwYXJ0aWFsU2VsZWN0b3JDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gV3JpdGUgcGhhc2UgLSBiYXRjaCByZW1vdmUgZWxlbWVudHNcblx0XHRcdGlmIChlbGVtZW50c1RvUmVtb3ZlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdFx0aWYgKGVsPy5wYXJlbnROb2RlKSB7XG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChlbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5fbG9nKCdGb3VuZCBjbHV0dGVyIGVsZW1lbnRzOicsIHtcblx0XHRcdGV4YWN0U2VsZWN0b3JzOiBleGFjdFNlbGVjdG9yQ291bnQsXG5cdFx0XHRwYXJ0aWFsU2VsZWN0b3JzOiBwYXJ0aWFsU2VsZWN0b3JDb3VudCxcblx0XHRcdHRvdGFsOiBleGFjdFNlbGVjdG9yQ291bnQgKyBwYXJ0aWFsU2VsZWN0b3JDb3VudCxcblx0XHRcdHByb2Nlc3NpbmdUaW1lOiBgJHsoZW5kVGltZSAtIHN0YXJ0VGltZSkudG9GaXhlZCgyKX1tc2Bcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY2xlYW5Db250ZW50KGVsZW1lbnQ6IEVsZW1lbnQsIG1ldGFkYXRhOiBEZWZ1ZGRsZU1ldGFkYXRhKSB7XG5cdFx0Ly8gUmVtb3ZlIEhUTUwgY29tbWVudHNcblx0XHR0aGlzLnJlbW92ZUh0bWxDb21tZW50cyhlbGVtZW50KTtcblx0XHRcblx0XHQvLyBIYW5kbGUgSDEgZWxlbWVudHMgLSByZW1vdmUgZmlyc3Qgb25lIGFuZCBjb252ZXJ0IG90aGVycyB0byBIMlxuXHRcdHRoaXMuaGFuZGxlSGVhZGluZ3MoZWxlbWVudCwgbWV0YWRhdGEudGl0bGUpO1xuXHRcdFxuXHRcdC8vIFN0YW5kYXJkaXplIGZvb3Rub3RlcyBhbmQgY2l0YXRpb25zXG5cdFx0dGhpcy5zdGFuZGFyZGl6ZUZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIEhhbmRsZSBsYXp5LWxvYWRlZCBpbWFnZXNcblx0XHR0aGlzLmhhbmRsZUxhenlJbWFnZXMoZWxlbWVudCk7XG5cblx0XHQvLyBDb252ZXJ0IGVtYmVkZGVkIGNvbnRlbnQgdG8gc3RhbmRhcmQgZm9ybWF0c1xuXHRcdHRoaXMuc3RhbmRhcmRpemVFbGVtZW50cyhlbGVtZW50KTtcblx0XHRcblx0XHQvLyBTdHJpcCB1bndhbnRlZCBhdHRyaWJ1dGVzXG5cdFx0dGhpcy5zdHJpcFVud2FudGVkQXR0cmlidXRlcyhlbGVtZW50KTtcblxuXHRcdC8vIFJlbW92ZSBlbXB0eSBlbGVtZW50c1xuXHRcdHRoaXMucmVtb3ZlRW1wdHlFbGVtZW50cyhlbGVtZW50KTtcblxuXHRcdC8vIFJlbW92ZSB0cmFpbGluZyBoZWFkaW5nc1xuXHRcdHRoaXMucmVtb3ZlVHJhaWxpbmdIZWFkaW5ncyhlbGVtZW50KTtcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlVHJhaWxpbmdIZWFkaW5ncyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHJlbW92ZWRDb3VudCA9IDA7XG5cblx0XHRjb25zdCBoYXNDb250ZW50QWZ0ZXIgPSAoZWw6IEVsZW1lbnQpOiBib29sZWFuID0+IHtcblx0XHRcdC8vIENoZWNrIGlmIHRoZXJlJ3MgYW55IG1lYW5pbmdmdWwgY29udGVudCBhZnRlciB0aGlzIGVsZW1lbnRcblx0XHRcdGxldCBuZXh0Q29udGVudCA9ICcnO1xuXHRcdFx0bGV0IHNpYmxpbmcgPSBlbC5uZXh0U2libGluZztcblxuXHRcdFx0Ly8gRmlyc3QgY2hlY2sgZGlyZWN0IHNpYmxpbmdzXG5cdFx0XHR3aGlsZSAoc2libGluZykge1xuXHRcdFx0XHRpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRuZXh0Q29udGVudCArPSBzaWJsaW5nLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG5cdFx0XHRcdFx0Ly8gSWYgd2UgZmluZCBhbiBlbGVtZW50IHNpYmxpbmcsIGNoZWNrIGl0cyBjb250ZW50XG5cdFx0XHRcdFx0bmV4dENvbnRlbnQgKz0gKHNpYmxpbmcgYXMgRWxlbWVudCkudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmc7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHdlIGZvdW5kIG1lYW5pbmdmdWwgY29udGVudCBhdCB0aGlzIGxldmVsLCByZXR1cm4gdHJ1ZVxuXHRcdFx0aWYgKG5leHRDb250ZW50LnRyaW0oKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgbm8gY29udGVudCBmb3VuZCBhdCB0aGlzIGxldmVsIGFuZCB3ZSBoYXZlIGEgcGFyZW50LFxuXHRcdFx0Ly8gY2hlY2sgZm9yIGNvbnRlbnQgYWZ0ZXIgdGhlIHBhcmVudFxuXHRcdFx0Y29uc3QgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcblx0XHRcdGlmIChwYXJlbnQgJiYgcGFyZW50ICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdHJldHVybiBoYXNDb250ZW50QWZ0ZXIocGFyZW50KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHQvLyBQcm9jZXNzIGFsbCBoZWFkaW5ncyBmcm9tIGJvdHRvbSB0byB0b3Bcblx0XHRjb25zdCBoZWFkaW5ncyA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoMSwgaDIsIGgzLCBoNCwgaDUsIGg2JykpXG5cdFx0XHQucmV2ZXJzZSgpO1xuXG5cdFx0aGVhZGluZ3MuZm9yRWFjaChoZWFkaW5nID0+IHtcblx0XHRcdGlmICghaGFzQ29udGVudEFmdGVyKGhlYWRpbmcpKSB7XG5cdFx0XHRcdGhlYWRpbmcucmVtb3ZlKCk7XG5cdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU3RvcCBwcm9jZXNzaW5nIG9uY2Ugd2UgZmluZCBhIGhlYWRpbmcgd2l0aCBjb250ZW50IGFmdGVyIGl0XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmIChyZW1vdmVkQ291bnQgPiAwKSB7XG5cdFx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgdHJhaWxpbmcgaGVhZGluZ3M6JywgcmVtb3ZlZENvdW50KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGhhbmRsZUhlYWRpbmdzKGVsZW1lbnQ6IEVsZW1lbnQsIHRpdGxlOiBzdHJpbmcpIHtcblx0XHRjb25zdCBoMXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMScpO1xuXG5cdFx0QXJyYXkuZnJvbShoMXMpLmZvckVhY2goaDEgPT4ge1xuXHRcdFx0Y29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuXHRcdFx0aDIuaW5uZXJIVE1MID0gaDEuaW5uZXJIVE1MO1xuXHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LmZyb20oaDEuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdGgyLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGgxLnBhcmVudE5vZGU/LnJlcGxhY2VDaGlsZChoMiwgaDEpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIGZpcnN0IEgyIGlmIGl0IG1hdGNoZXMgdGl0bGVcblx0XHRjb25zdCBoMnMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMicpO1xuXHRcdGlmIChoMnMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgZmlyc3RIMiA9IGgyc1swXTtcblx0XHRcdGNvbnN0IGZpcnN0SDJUZXh0ID0gZmlyc3RIMi50ZXh0Q29udGVudD8udHJpbSgpLnRvTG93ZXJDYXNlKCkgfHwgJyc7XG5cdFx0XHRjb25zdCBub3JtYWxpemVkVGl0bGUgPSB0aXRsZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblx0XHRcdGlmIChub3JtYWxpemVkVGl0bGUgJiYgbm9ybWFsaXplZFRpdGxlID09PSBmaXJzdEgyVGV4dCkge1xuXHRcdFx0XHRmaXJzdEgyLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlSHRtbENvbW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRjb25zdCBjb21tZW50czogQ29tbWVudFtdID0gW107XG5cdFx0Y29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcblx0XHRcdGVsZW1lbnQsXG5cdFx0XHROb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCxcblx0XHRcdG51bGxcblx0XHQpO1xuXG5cdFx0bGV0IG5vZGU7XG5cdFx0d2hpbGUgKG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKSkge1xuXHRcdFx0Y29tbWVudHMucHVzaChub2RlIGFzIENvbW1lbnQpO1xuXHRcdH1cblxuXHRcdGNvbW1lbnRzLmZvckVhY2goY29tbWVudCA9PiB7XG5cdFx0XHRjb21tZW50LnJlbW92ZSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIEhUTUwgY29tbWVudHM6JywgY29tbWVudHMubGVuZ3RoKTtcblx0fVxuXG5cdHByaXZhdGUgc3RyaXBVbndhbnRlZEF0dHJpYnV0ZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBhdHRyaWJ1dGVDb3VudCA9IDA7XG5cblx0XHRjb25zdCBwcm9jZXNzRWxlbWVudCA9IChlbDogRWxlbWVudCkgPT4ge1xuXHRcdFx0Ly8gU2tpcCBTVkcgZWxlbWVudHMgLSBwcmVzZXJ2ZSBhbGwgdGhlaXIgYXR0cmlidXRlc1xuXHRcdFx0aWYgKGVsIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpO1xuXHRcdFx0XG5cdFx0XHRhdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGNvbnN0IGF0dHJOYW1lID0gYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdGlmICghQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyTmFtZSkgJiYgIWF0dHJOYW1lLnN0YXJ0c1dpdGgoJ2RhdGEtJykpIHtcblx0XHRcdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKTtcblx0XHRcdFx0XHRhdHRyaWJ1dGVDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0cHJvY2Vzc0VsZW1lbnQoZWxlbWVudCk7XG5cdFx0ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykuZm9yRWFjaChwcm9jZXNzRWxlbWVudCk7XG5cblx0XHR0aGlzLl9sb2coJ1N0cmlwcGVkIGF0dHJpYnV0ZXM6JywgYXR0cmlidXRlQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVFbXB0eUVsZW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcmVtb3ZlZENvdW50ID0gMDtcblx0XHRsZXQgaXRlcmF0aW9ucyA9IDA7XG5cdFx0bGV0IGtlZXBSZW1vdmluZyA9IHRydWU7XG5cblx0XHR3aGlsZSAoa2VlcFJlbW92aW5nKSB7XG5cdFx0XHRpdGVyYXRpb25zKys7XG5cdFx0XHRrZWVwUmVtb3ZpbmcgPSBmYWxzZTtcblx0XHRcdC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aG91dCBjaGlsZHJlbiwgd29ya2luZyBmcm9tIGRlZXBlc3QgZmlyc3Rcblx0XHRcdGNvbnN0IGVtcHR5RWxlbWVudHMgPSBBcnJheS5mcm9tKGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSkuZmlsdGVyKGVsID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfRU1QVFlfRUxFTUVOVFMuaGFzKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIG9ubHkgd2hpdGVzcGFjZSBvciAmbmJzcDtcblx0XHRcdFx0Y29uc3QgdGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0Y29uc3QgaGFzT25seVdoaXRlc3BhY2UgPSB0ZXh0Q29udGVudC50cmltKCkubGVuZ3RoID09PSAwO1xuXHRcdFx0XHRjb25zdCBoYXNOYnNwID0gdGV4dENvbnRlbnQuaW5jbHVkZXMoJ1xcdTAwQTAnKTsgLy8gVW5pY29kZSBub24tYnJlYWtpbmcgc3BhY2Vcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIG5vIG1lYW5pbmdmdWwgY2hpbGRyZW5cblx0XHRcdFx0Y29uc3QgaGFzTm9DaGlsZHJlbiA9ICFlbC5oYXNDaGlsZE5vZGVzKCkgfHwgXG5cdFx0XHRcdFx0KEFycmF5LmZyb20oZWwuY2hpbGROb2RlcykuZXZlcnkobm9kZSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm9kZVRleHQgPSBub2RlLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbm9kZVRleHQudHJpbSgpLmxlbmd0aCA9PT0gMCAmJiAhbm9kZVRleHQuaW5jbHVkZXMoJ1xcdTAwQTAnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0cmV0dXJuIGhhc09ubHlXaGl0ZXNwYWNlICYmICFoYXNOYnNwICYmIGhhc05vQ2hpbGRyZW47XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGVtcHR5RWxlbWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRlbXB0eUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0a2VlcFJlbW92aW5nID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgZW1wdHkgZWxlbWVudHM6Jywge1xuXHRcdFx0Y291bnQ6IHJlbW92ZWRDb3VudCxcblx0XHRcdGl0ZXJhdGlvbnNcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlRm9vdG5vdGVJdGVtKFxuXHRcdGZvb3Rub3RlTnVtYmVyOiBudW1iZXIsXG5cdFx0Y29udGVudDogc3RyaW5nIHwgRWxlbWVudCxcblx0XHRyZWZzOiBzdHJpbmdbXVxuXHQpOiBIVE1MTElFbGVtZW50IHtcblx0XHRjb25zdCBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRuZXdJdGVtLmNsYXNzTmFtZSA9ICdmb290bm90ZSc7XG5cdFx0bmV3SXRlbS5pZCA9IGBmbjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cblx0XHQvLyBIYW5kbGUgY29udGVudFxuXHRcdGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSBjb250ZW50O1xuXHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBHZXQgYWxsIHBhcmFncmFwaHMgZnJvbSB0aGUgY29udGVudFxuXHRcdFx0Y29uc3QgcGFyYWdyYXBocyA9IEFycmF5LmZyb20oY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdwJykpO1xuXHRcdFx0aWYgKHBhcmFncmFwaHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdC8vIElmIG5vIHBhcmFncmFwaHMsIHdyYXAgY29udGVudCBpbiBhIHBhcmFncmFwaFxuXHRcdFx0XHRjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSBjb250ZW50LmlubmVySFRNTDtcblx0XHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ29weSBleGlzdGluZyBwYXJhZ3JhcGhzXG5cdFx0XHRcdHBhcmFncmFwaHMuZm9yRWFjaChwID0+IHtcblx0XHRcdFx0XHRjb25zdCBuZXdQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRcdG5ld1AuaW5uZXJIVE1MID0gcC5pbm5lckhUTUw7XG5cdFx0XHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChuZXdQKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIGJhY2tsaW5rKHMpIHRvIHRoZSBsYXN0IHBhcmFncmFwaFxuXHRcdGNvbnN0IGxhc3RQYXJhZ3JhcGggPSBuZXdJdGVtLnF1ZXJ5U2VsZWN0b3IoJ3A6bGFzdC1vZi10eXBlJykgfHwgbmV3SXRlbTtcblx0XHRyZWZzLmZvckVhY2goKHJlZklkLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgYmFja2xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRiYWNrbGluay5ocmVmID0gYCMke3JlZklkfWA7XG5cdFx0XHRiYWNrbGluay50aXRsZSA9ICdyZXR1cm4gdG8gYXJ0aWNsZSc7XG5cdFx0XHRiYWNrbGluay5jbGFzc05hbWUgPSAnZm9vdG5vdGUtYmFja3JlZic7XG5cdFx0XHRiYWNrbGluay5pbm5lckhUTUwgPSAn4oapJztcblx0XHRcdGlmIChpbmRleCA8IHJlZnMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRiYWNrbGluay5pbm5lckhUTUwgKz0gJyAnO1xuXHRcdFx0fVxuXHRcdFx0bGFzdFBhcmFncmFwaC5hcHBlbmRDaGlsZChiYWNrbGluayk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbmV3SXRlbTtcblx0fVxuXG5cdHByaXZhdGUgY29sbGVjdEZvb3Rub3RlcyhlbGVtZW50OiBFbGVtZW50KTogRm9vdG5vdGVDb2xsZWN0aW9uIHtcblx0XHRjb25zdCBmb290bm90ZXM6IEZvb3Rub3RlQ29sbGVjdGlvbiA9IHt9O1xuXHRcdGxldCBmb290bm90ZUNvdW50ID0gMTtcblx0XHRjb25zdCBwcm9jZXNzZWRJZHMgPSBuZXcgU2V0PHN0cmluZz4oKTsgLy8gVHJhY2sgcHJvY2Vzc2VkIElEc1xuXG5cdFx0Ly8gQ29sbGVjdCBhbGwgZm9vdG5vdGVzIGFuZCB0aGVpciBJRHMgZnJvbSBmb290bm90ZSBsaXN0c1xuXHRcdGNvbnN0IGZvb3Rub3RlTGlzdHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMpO1xuXHRcdGZvb3Rub3RlTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcblx0XHRcdC8vIFN1YnN0YWNrIGhhcyBpbmRpdmlkdWFsIGZvb3Rub3RlIGRpdnMgd2l0aCBubyBwYXJlbnRcblx0XHRcdGlmIChsaXN0Lm1hdGNoZXMoJ2Rpdi5mb290bm90ZVtkYXRhLWNvbXBvbmVudC1uYW1lPVwiRm9vdG5vdGVUb0RPTVwiXScpKSB7XG5cdFx0XHRcdGNvbnN0IGFuY2hvciA9IGxpc3QucXVlcnlTZWxlY3RvcignYS5mb290bm90ZS1udW1iZXInKTtcblx0XHRcdFx0Y29uc3QgY29udGVudCA9IGxpc3QucXVlcnlTZWxlY3RvcignLmZvb3Rub3RlLWNvbnRlbnQnKTtcblx0XHRcdFx0aWYgKGFuY2hvciAmJiBjb250ZW50KSB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBhbmNob3IuaWQucmVwbGFjZSgnZm9vdG5vdGUtJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0aWYgKGlkICYmICFwcm9jZXNzZWRJZHMuaGFzKGlkKSkge1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVzW2Zvb3Rub3RlQ291bnRdID0ge1xuXHRcdFx0XHRcdFx0XHRjb250ZW50OiBjb250ZW50LFxuXHRcdFx0XHRcdFx0XHRvcmlnaW5hbElkOiBpZCxcblx0XHRcdFx0XHRcdFx0cmVmczogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRwcm9jZXNzZWRJZHMuYWRkKGlkKTtcblx0XHRcdFx0XHRcdGZvb3Rub3RlQ291bnQrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb21tb24gZm9ybWF0IHVzaW5nIE9ML1VMIGFuZCBMSSBlbGVtZW50c1xuXHRcdFx0Y29uc3QgaXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLCBkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRpdGVtcy5mb3JFYWNoKGxpID0+IHtcblx0XHRcdFx0bGV0IGlkID0gJyc7XG5cdFx0XHRcdGxldCBjb250ZW50OiBFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIGNpdGF0aW9ucyB3aXRoIC5jaXRhdGlvbnMgY2xhc3Ncblx0XHRcdFx0Y29uc3QgY2l0YXRpb25zRGl2ID0gbGkucXVlcnlTZWxlY3RvcignLmNpdGF0aW9ucycpO1xuXHRcdFx0XHRpZiAoY2l0YXRpb25zRGl2Py5pZD8udG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdyJykpIHtcblx0XHRcdFx0XHRpZCA9IGNpdGF0aW9uc0Rpdi5pZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdC8vIExvb2sgZm9yIGNpdGF0aW9uIGNvbnRlbnQgd2l0aGluIHRoZSBjaXRhdGlvbnMgZGl2XG5cdFx0XHRcdFx0Y29uc3QgY2l0YXRpb25Db250ZW50ID0gY2l0YXRpb25zRGl2LnF1ZXJ5U2VsZWN0b3IoJy5jaXRhdGlvbi1jb250ZW50Jyk7XG5cdFx0XHRcdFx0aWYgKGNpdGF0aW9uQ29udGVudCkge1xuXHRcdFx0XHRcdFx0Y29udGVudCA9IGNpdGF0aW9uQ29udGVudDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRXh0cmFjdCBJRCBmcm9tIHZhcmlvdXMgZm9ybWF0c1xuXHRcdFx0XHRcdGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2JpYi5iaWInKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5pZC5yZXBsYWNlKCdiaWIuYmliJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2ZuOicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2ZuOicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaWQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdmbicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2ZuJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0Ly8gTmF0dXJlLmNvbVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaGFzQXR0cmlidXRlKCdkYXRhLWNvdW50ZXInKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY291bnRlcicpPy5yZXBsYWNlKC9cXC4kLywgJycpPy50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGxpLmlkLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC9jaXRlX25vdGUtKC4rKS8pO1xuXHRcdFx0XHRcdFx0aWQgPSBtYXRjaCA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiBsaS5pZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb250ZW50ID0gbGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWQgJiYgIXByb2Nlc3NlZElkcy5oYXMoaWQpKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVzW2Zvb3Rub3RlQ291bnRdID0ge1xuXHRcdFx0XHRcdFx0Y29udGVudDogY29udGVudCB8fCBsaSxcblx0XHRcdFx0XHRcdG9yaWdpbmFsSWQ6IGlkLFxuXHRcdFx0XHRcdFx0cmVmczogW11cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHByb2Nlc3NlZElkcy5hZGQoaWQpO1xuXHRcdFx0XHRcdGZvb3Rub3RlQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZm9vdG5vdGVzO1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kT3V0ZXJGb290bm90ZUNvbnRhaW5lcihlbDogRWxlbWVudCk6IEVsZW1lbnQge1xuXHRcdGxldCBjdXJyZW50OiBFbGVtZW50IHwgbnVsbCA9IGVsO1xuXHRcdGxldCBwYXJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWwucGFyZW50RWxlbWVudDtcblx0XHRcblx0XHQvLyBLZWVwIGdvaW5nIHVwIHVudGlsIHdlIGZpbmQgYW4gZWxlbWVudCB0aGF0J3Mgbm90IGEgc3BhbiBvciBzdXBcblx0XHR3aGlsZSAocGFyZW50ICYmIChcblx0XHRcdHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzcGFuJyB8fCBcblx0XHRcdHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdXAnXG5cdFx0KSkge1xuXHRcdFx0Y3VycmVudCA9IHBhcmVudDtcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gY3VycmVudDtcblx0fVxuXG5cdC8vIEV2ZXJ5IGZvb3Rub3RlIHJlZmVyZW5jZSBzaG91bGQgYmUgYSBzdXAgZWxlbWVudCB3aXRoIGFuIGFuY2hvciBpbnNpZGVcblx0Ly8gZS5nLiA8c3VwIGlkPVwiZm5yZWY6MVwiPjxhIGhyZWY9XCIjZm46MVwiPjE8L2E+PC9zdXA+XG5cdHByaXZhdGUgY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXI6IHN0cmluZywgcmVmSWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcblx0XHRjb25zdCBzdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdXAnKTtcblx0XHRzdXAuaWQgPSByZWZJZDtcblx0XHRjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdGxpbmsuaHJlZiA9IGAjZm46JHtmb290bm90ZU51bWJlcn1gO1xuXHRcdGxpbmsudGV4dENvbnRlbnQgPSBmb290bm90ZU51bWJlcjtcblx0XHRzdXAuYXBwZW5kQ2hpbGQobGluayk7XG5cdFx0cmV0dXJuIHN1cDtcblx0fVxuXG5cdHByaXZhdGUgc3RhbmRhcmRpemVGb290bm90ZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGNvbnN0IGZvb3Rub3RlcyA9IHRoaXMuY29sbGVjdEZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIFN0YW5kYXJkaXplIGlubGluZSBmb290bm90ZXMgdXNpbmcgdGhlIGNvbGxlY3RlZCBJRHNcblx0XHRjb25zdCBmb290bm90ZUlubGluZVJlZmVyZW5jZXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfSU5MSU5FX1JFRkVSRU5DRVMpO1xuXHRcdFxuXHRcdC8vIEdyb3VwIHJlZmVyZW5jZXMgYnkgdGhlaXIgcGFyZW50IHN1cCBlbGVtZW50XG5cdFx0Y29uc3Qgc3VwR3JvdXBzID0gbmV3IE1hcDxFbGVtZW50LCBFbGVtZW50W10+KCk7XG5cdFx0XG5cdFx0Zm9vdG5vdGVJbmxpbmVSZWZlcmVuY2VzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcblxuXHRcdFx0bGV0IGZvb3Rub3RlSWQgPSAnJztcblx0XHRcdGxldCBmb290bm90ZUNvbnRlbnQgPSAnJztcblxuXHRcdFx0Ly8gRXh0cmFjdCBmb290bm90ZSBJRCBiYXNlZCBvbiBlbGVtZW50IHR5cGVcblx0XHRcdC8vIE5hdHVyZS5jb21cblx0XHRcdGlmIChlbC5tYXRjaGVzKCdhW2lkXj1cInJlZi1saW5rXCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHQvLyBTY2llbmNlLm9yZ1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhW3JvbGU9XCJkb2MtYmlibGlvcmVmXCJdJykpIHtcblx0XHRcdFx0Y29uc3QgeG1sUmlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXhtbC1yaWQnKTtcblx0XHRcdFx0aWYgKHhtbFJpZCkge1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSB4bWxSaWQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmPy5zdGFydHNXaXRoKCcjY29yZS1SJykpIHtcblx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBocmVmLnJlcGxhY2UoJyNjb3JlLScsICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdC8vIFN1YnN0YWNrXG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2EuZm9vdG5vdGUtYW5jaG9yLCBzcGFuLmZvb3Rub3RlLWhvdmVyY2FyZC10YXJnZXQgYScpKSB7XG5cdFx0XHRcdGNvbnN0IGlkID0gZWwuaWQ/LnJlcGxhY2UoJ2Zvb3Rub3RlLWFuY2hvci0nLCAnJykgfHwgJyc7XG5cdFx0XHRcdGlmIChpZCkge1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBpZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHQvLyBBcnhpdlxuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdjaXRlLmx0eF9jaXRlJykpIHtcblx0XHRcdFx0Y29uc3QgbGluayA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRcdFx0aWYgKGxpbmspIHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBocmVmLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC9iaWJcXC5iaWIoXFxkKykvKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRmb290bm90ZUlkID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwLnJlZmVyZW5jZScpKSB7XG5cdFx0XHRcdGNvbnN0IGxpbmtzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdFx0XHRBcnJheS5mcm9tKGxpbmtzKS5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGhyZWYuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goLyg/OmNpdGVfbm90ZXxjaXRlX3JlZiktKC4rKS8pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3N1cFtpZF49XCJmbnJlZjpcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yZWY6JywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3NwYW4uZm9vdG5vdGUtbGluaycpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vdG5vdGUtaWQnKSB8fCAnJztcblx0XHRcdFx0Zm9vdG5vdGVDb250ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvb3Rub3RlLWNvbnRlbnQnKSB8fCAnJztcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYS5jaXRhdGlvbicpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRmb290bm90ZUNvbnRlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYVtpZF49XCJmbnJlZlwiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5pZC5yZXBsYWNlKCdmbnJlZicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gT3RoZXIgY2l0YXRpb24gdHlwZXNcblx0XHRcdFx0Y29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdGNvbnN0IGlkID0gaHJlZi5yZXBsYWNlKC9eWyNdLywgJycpO1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBpZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmb290bm90ZUlkKSB7XG5cdFx0XHRcdC8vIEZpbmQgdGhlIGZvb3Rub3RlIG51bWJlciBieSBtYXRjaGluZyB0aGUgb3JpZ2luYWwgSURcblx0XHRcdFx0Y29uc3QgZm9vdG5vdGVFbnRyeSA9IE9iamVjdC5lbnRyaWVzKGZvb3Rub3RlcykuZmluZChcblx0XHRcdFx0XHQoW18sIGRhdGFdKSA9PiBkYXRhLm9yaWdpbmFsSWQgPT09IGZvb3Rub3RlSWQudG9Mb3dlckNhc2UoKVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmIChmb290bm90ZUVudHJ5KSB7XG5cdFx0XHRcdFx0Y29uc3QgW2Zvb3Rub3RlTnVtYmVyLCBmb290bm90ZURhdGFdID0gZm9vdG5vdGVFbnRyeTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBDcmVhdGUgZm9vdG5vdGUgcmVmZXJlbmNlIElEXG5cdFx0XHRcdFx0Y29uc3QgcmVmSWQgPSBmb290bm90ZURhdGEucmVmcy5sZW5ndGggPiAwID8gXG5cdFx0XHRcdFx0XHRgZm5yZWY6JHtmb290bm90ZU51bWJlcn0tJHtmb290bm90ZURhdGEucmVmcy5sZW5ndGggKyAxfWAgOiBcblx0XHRcdFx0XHRcdGBmbnJlZjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm9vdG5vdGVEYXRhLnJlZnMucHVzaChyZWZJZCk7XG5cblx0XHRcdFx0XHQvLyBGaW5kIHRoZSBvdXRlcm1vc3QgY29udGFpbmVyIChzcGFuIG9yIHN1cClcblx0XHRcdFx0XHRjb25zdCBjb250YWluZXIgPSB0aGlzLmZpbmRPdXRlckZvb3Rub3RlQ29udGFpbmVyKGVsKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBJZiBjb250YWluZXIgaXMgYSBzdXAsIGdyb3VwIHJlZmVyZW5jZXNcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N1cCcpIHtcblx0XHRcdFx0XHRcdGlmICghc3VwR3JvdXBzLmhhcyhjb250YWluZXIpKSB7XG5cdFx0XHRcdFx0XHRcdHN1cEdyb3Vwcy5zZXQoY29udGFpbmVyLCBbXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjb25zdCBncm91cCA9IHN1cEdyb3Vwcy5nZXQoY29udGFpbmVyKSE7XG5cdFx0XHRcdFx0XHRncm91cC5wdXNoKHRoaXMuY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXIsIHJlZklkKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIFJlcGxhY2UgdGhlIGNvbnRhaW5lciBkaXJlY3RseVxuXHRcdFx0XHRcdFx0Y29udGFpbmVyLnJlcGxhY2VXaXRoKHRoaXMuY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXIsIHJlZklkKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBIYW5kbGUgZ3JvdXBlZCByZWZlcmVuY2VzXG5cdFx0c3VwR3JvdXBzLmZvckVhY2goKHJlZmVyZW5jZXMsIGNvbnRhaW5lcikgPT4ge1xuXHRcdFx0aWYgKHJlZmVyZW5jZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQvLyBDcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB0byBob2xkIGFsbCB0aGUgcmVmZXJlbmNlc1xuXHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFkZCBlYWNoIHJlZmVyZW5jZSBhcyBpdHMgb3duIHN1cCBlbGVtZW50XG5cdFx0XHRcdHJlZmVyZW5jZXMuZm9yRWFjaCgocmVmLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGxpbmsgPSByZWYucXVlcnlTZWxlY3RvcignYScpO1xuXHRcdFx0XHRcdGlmIChsaW5rKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdXAnKTtcblx0XHRcdFx0XHRcdHN1cC5pZCA9IHJlZi5pZDtcblx0XHRcdFx0XHRcdHN1cC5hcHBlbmRDaGlsZChsaW5rLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChzdXApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRjb250YWluZXIucmVwbGFjZVdpdGgoZnJhZ21lbnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ3JlYXRlIHRoZSBzdGFuZGFyZGl6ZWQgZm9vdG5vdGUgbGlzdFxuXHRcdGNvbnN0IG5ld0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRuZXdMaXN0LmNsYXNzTmFtZSA9ICdmb290bm90ZXMnO1xuXHRcdGNvbnN0IG9yZGVyZWRMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKTtcblxuXHRcdC8vIENyZWF0ZSBmb290bm90ZSBpdGVtcyBpbiBvcmRlclxuXHRcdE9iamVjdC5lbnRyaWVzKGZvb3Rub3RlcykuZm9yRWFjaCgoW251bWJlciwgZGF0YV0pID0+IHtcblx0XHRcdGNvbnN0IG5ld0l0ZW0gPSB0aGlzLmNyZWF0ZUZvb3Rub3RlSXRlbShcblx0XHRcdFx0cGFyc2VJbnQobnVtYmVyKSxcblx0XHRcdFx0ZGF0YS5jb250ZW50LFxuXHRcdFx0XHRkYXRhLnJlZnNcblx0XHRcdCk7XG5cdFx0XHRvcmRlcmVkTGlzdC5hcHBlbmRDaGlsZChuZXdJdGVtKTtcblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBvcmlnaW5hbCBmb290bm90ZSBsaXN0c1xuXHRcdGNvbnN0IGZvb3Rub3RlTGlzdHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMpO1xuXHRcdGZvb3Rub3RlTGlzdHMuZm9yRWFjaChsaXN0ID0+IGxpc3QucmVtb3ZlKCkpO1xuXG5cdFx0Ly8gSWYgd2UgaGF2ZSBhbnkgZm9vdG5vdGVzLCBhZGQgdGhlIG5ldyBsaXN0IHRvIHRoZSBkb2N1bWVudFxuXHRcdGlmIChvcmRlcmVkTGlzdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRuZXdMaXN0LmFwcGVuZENoaWxkKG9yZGVyZWRMaXN0KTtcblx0XHRcdGVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3TGlzdCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBoYW5kbGVMYXp5SW1hZ2VzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXHRcdGNvbnN0IGxhenlJbWFnZXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZ1tkYXRhLXNyY10sIGltZ1tkYXRhLXNyY3NldF0nKTtcblxuXHRcdGxhenlJbWFnZXMuZm9yRWFjaChpbWcgPT4ge1xuXHRcdFx0aWYgKCEoaW1nIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkpIHJldHVybjtcblxuXHRcdFx0Ly8gSGFuZGxlIGRhdGEtc3JjXG5cdFx0XHRjb25zdCBkYXRhU3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcblx0XHRcdGlmIChkYXRhU3JjICYmICFpbWcuc3JjKSB7XG5cdFx0XHRcdGltZy5zcmMgPSBkYXRhU3JjO1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBIYW5kbGUgZGF0YS1zcmNzZXRcblx0XHRcdGNvbnN0IGRhdGFTcmNzZXQgPSBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdFx0aWYgKGRhdGFTcmNzZXQgJiYgIWltZy5zcmNzZXQpIHtcblx0XHRcdFx0aW1nLnNyY3NldCA9IGRhdGFTcmNzZXQ7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBsYXp5IGxvYWRpbmcgcmVsYXRlZCBjbGFzc2VzIGFuZCBhdHRyaWJ1dGVzXG5cdFx0XHRpbWcuY2xhc3NMaXN0LnJlbW92ZSgnbGF6eScsICdsYXp5bG9hZCcpO1xuXHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1sbC1zdGF0dXMnKTtcblx0XHRcdGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbG9nKCdQcm9jZXNzZWQgbGF6eSBpbWFnZXM6JywgcHJvY2Vzc2VkQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGFuZGFyZGl6ZUVsZW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXG5cdFx0Ly8gQ29udmVydCBlbGVtZW50cyBiYXNlZCBvbiBzdGFuZGFyZGl6YXRpb24gcnVsZXNcblx0XHRFTEVNRU5UX1NUQU5EQVJESVpBVElPTl9SVUxFUy5mb3JFYWNoKHJ1bGUgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocnVsZS5zZWxlY3Rvcik7XG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdFx0aWYgKHJ1bGUudHJhbnNmb3JtKSB7XG5cdFx0XHRcdFx0Ly8gSWYgdGhlcmUncyBhIHRyYW5zZm9ybSBmdW5jdGlvbiwgdXNlIGl0IHRvIGNyZWF0ZSB0aGUgbmV3IGVsZW1lbnRcblx0XHRcdFx0XHRjb25zdCB0cmFuc2Zvcm1lZCA9IHJ1bGUudHJhbnNmb3JtKGVsKTtcblx0XHRcdFx0XHRlbC5yZXBsYWNlV2l0aCh0cmFuc2Zvcm1lZCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBDb252ZXJ0IGxpdGUteW91dHViZSBlbGVtZW50c1xuXHRcdGNvbnN0IGxpdGVZb3V0dWJlRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpdGUteW91dHViZScpO1xuXHRcdGxpdGVZb3V0dWJlRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRjb25zdCB2aWRlb0lkID0gZWwuZ2V0QXR0cmlidXRlKCd2aWRlb2lkJyk7XG5cdFx0XHRpZiAoIXZpZGVvSWQpIHJldHVybjtcblxuXHRcdFx0Y29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cdFx0XHRpZnJhbWUud2lkdGggPSAnNTYwJztcblx0XHRcdGlmcmFtZS5oZWlnaHQgPSAnMzE1Jztcblx0XHRcdGlmcmFtZS5zcmMgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt2aWRlb0lkfWA7XG5cdFx0XHRpZnJhbWUudGl0bGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZGVvdGl0bGUnKSB8fCAnWW91VHViZSB2aWRlbyBwbGF5ZXInO1xuXHRcdFx0aWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xuXHRcdFx0aWZyYW1lLmFsbG93ID0gJ2FjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBjbGlwYm9hcmQtd3JpdGU7IGVuY3J5cHRlZC1tZWRpYTsgZ3lyb3Njb3BlOyBwaWN0dXJlLWluLXBpY3R1cmU7IHdlYi1zaGFyZSc7XG5cdFx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XG5cblx0XHRcdGVsLnJlcGxhY2VXaXRoKGlmcmFtZSk7XG5cdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIGZ1dHVyZSBlbWJlZCBjb252ZXJzaW9ucyAoVHdpdHRlciwgSW5zdGFncmFtLCBldGMuKVxuXG5cdFx0dGhpcy5fbG9nKCdDb252ZXJ0ZWQgZW1iZWRkZWQgZWxlbWVudHM6JywgcHJvY2Vzc2VkQ291bnQpO1xuXHR9XG5cblx0Ly8gRmluZCBzbWFsbCBJTUcgYW5kIFNWRyBlbGVtZW50c1xuXHRwcml2YXRlIGZpbmRTbWFsbEltYWdlcyhkb2M6IERvY3VtZW50KTogU2V0PHN0cmluZz4ge1xuXHRcdGNvbnN0IE1JTl9ESU1FTlNJT04gPSAzMztcblx0XHRjb25zdCBzbWFsbEltYWdlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXHRcdGNvbnN0IHRyYW5zZm9ybVJlZ2V4ID0gL3NjYWxlXFwoKFtcXGQuXSspXFwpLztcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRsZXQgcHJvY2Vzc2VkQ291bnQgPSAwO1xuXG5cdFx0Ly8gMS4gUmVhZCBwaGFzZSAtIEdhdGhlciBhbGwgZWxlbWVudHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdGNvbnN0IGVsZW1lbnRzID0gW1xuXHRcdFx0Li4uQXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpKSxcblx0XHRcdC4uLkFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmcnKSlcblx0XHRdLmZpbHRlcihlbGVtZW50ID0+IHtcblx0XHRcdC8vIFNraXAgbGF6eS1sb2FkZWQgaW1hZ2VzIHRoYXQgaGF2ZW4ndCBiZWVuIHByb2Nlc3NlZCB5ZXRcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuXHRcdFx0XHRjb25zdCBpc0xhenkgPSBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGF6eScpIHx8IFxuXHRcdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsYXp5bG9hZCcpIHx8XG5cdFx0XHRcdFx0ZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3JjJykgfHxcblx0XHRcdFx0XHRlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHRcdFx0cmV0dXJuICFpc0xhenk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBzbWFsbEltYWdlcztcblx0XHR9XG5cblx0XHQvLyAyLiBCYXRjaCBwcm9jZXNzIC0gQ29sbGVjdCBhbGwgbWVhc3VyZW1lbnRzIGluIG9uZSBnb1xuXHRcdGNvbnN0IG1lYXN1cmVtZW50cyA9IGVsZW1lbnRzLm1hcChlbGVtZW50ID0+ICh7XG5cdFx0XHRlbGVtZW50LFxuXHRcdFx0Ly8gU3RhdGljIGF0dHJpYnV0ZXMgKG5vIHJlZmxvdylcblx0XHRcdG5hdHVyYWxXaWR0aDogZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgPyBlbGVtZW50Lm5hdHVyYWxXaWR0aCA6IDAsXG5cdFx0XHRuYXR1cmFsSGVpZ2h0OiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCA/IGVsZW1lbnQubmF0dXJhbEhlaWdodCA6IDAsXG5cdFx0XHRhdHRyV2lkdGg6IHBhcnNlSW50KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd3aWR0aCcpIHx8ICcwJyksXG5cdFx0XHRhdHRySGVpZ2h0OiBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykgfHwgJzAnKVxuXHRcdH0pKTtcblxuXHRcdC8vIDMuIEJhdGNoIGNvbXB1dGUgc3R5bGVzIC0gUHJvY2VzcyBpbiBjaHVua3MgdG8gYXZvaWQgbG9uZyB0YXNrc1xuXHRcdGNvbnN0IEJBVENIX1NJWkUgPSA1MDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1lYXN1cmVtZW50cy5sZW5ndGg7IGkgKz0gQkFUQ0hfU0laRSkge1xuXHRcdFx0Y29uc3QgYmF0Y2ggPSBtZWFzdXJlbWVudHMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuXHRcdFx0XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBSZWFkIHBoYXNlIC0gY29tcHV0ZSBhbGwgc3R5bGVzIGF0IG9uY2Vcblx0XHRcdFx0Y29uc3Qgc3R5bGVzID0gYmF0Y2gubWFwKCh7IGVsZW1lbnQgfSkgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkpO1xuXHRcdFx0XHRjb25zdCByZWN0cyA9IGJhdGNoLm1hcCgoeyBlbGVtZW50IH0pID0+IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gUHJvY2VzcyBwaGFzZSAtIG5vIERPTSBvcGVyYXRpb25zXG5cdFx0XHRcdGJhdGNoLmZvckVhY2goKG1lYXN1cmVtZW50LCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzdHlsZSA9IHN0eWxlc1tpbmRleF07XG5cdFx0XHRcdFx0XHRjb25zdCByZWN0ID0gcmVjdHNbaW5kZXhdO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBHZXQgdHJhbnNmb3JtIHNjYWxlIGluIHRoZSBzYW1lIGJhdGNoXG5cdFx0XHRcdFx0XHRjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm07XG5cdFx0XHRcdFx0XHRjb25zdCBzY2FsZSA9IHRyYW5zZm9ybSA/IFxuXHRcdFx0XHRcdFx0XHRwYXJzZUZsb2F0KHRyYW5zZm9ybS5tYXRjaCh0cmFuc2Zvcm1SZWdleCk/LlsxXSB8fCAnMScpIDogMTtcblxuXHRcdFx0XHRcdFx0Ly8gQ2FsY3VsYXRlIGVmZmVjdGl2ZSBkaW1lbnNpb25zXG5cdFx0XHRcdFx0XHRjb25zdCB3aWR0aHMgPSBbXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50Lm5hdHVyYWxXaWR0aCxcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQuYXR0cldpZHRoLFxuXHRcdFx0XHRcdFx0XHRwYXJzZUludChzdHlsZS53aWR0aCkgfHwgMCxcblx0XHRcdFx0XHRcdFx0cmVjdC53aWR0aCAqIHNjYWxlXG5cdFx0XHRcdFx0XHRdLmZpbHRlcihkaW0gPT4gdHlwZW9mIGRpbSA9PT0gJ251bWJlcicgJiYgZGltID4gMCk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IGhlaWdodHMgPSBbXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50Lm5hdHVyYWxIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50LmF0dHJIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdHBhcnNlSW50KHN0eWxlLmhlaWdodCkgfHwgMCxcblx0XHRcdFx0XHRcdFx0cmVjdC5oZWlnaHQgKiBzY2FsZVxuXHRcdFx0XHRcdFx0XS5maWx0ZXIoZGltID0+IHR5cGVvZiBkaW0gPT09ICdudW1iZXInICYmIGRpbSA+IDApO1xuXG5cdFx0XHRcdFx0XHQvLyBEZWNpc2lvbiBwaGFzZSAtIG5vIERPTSBvcGVyYXRpb25zXG5cdFx0XHRcdFx0XHRpZiAod2lkdGhzLmxlbmd0aCA+IDAgJiYgaGVpZ2h0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVmZmVjdGl2ZVdpZHRoID0gTWF0aC5taW4oLi4ud2lkdGhzKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZWZmZWN0aXZlSGVpZ2h0ID0gTWF0aC5taW4oLi4uaGVpZ2h0cyk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGVmZmVjdGl2ZVdpZHRoIDwgTUlOX0RJTUVOU0lPTiB8fCBlZmZlY3RpdmVIZWlnaHQgPCBNSU5fRElNRU5TSU9OKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgaWRlbnRpZmllciA9IHRoaXMuZ2V0RWxlbWVudElkZW50aWZpZXIobWVhc3VyZW1lbnQuZWxlbWVudCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGlkZW50aWZpZXIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNtYWxsSW1hZ2VzLmFkZChpZGVudGlmaWVyKTtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3MgZWxlbWVudCBkaW1lbnNpb25zOicsIGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdEZWZ1ZGRsZTogRmFpbGVkIHRvIHByb2Nlc3MgYmF0Y2g6JywgZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5fbG9nKCdGb3VuZCBzbWFsbCBlbGVtZW50czonLCB7XG5cdFx0XHRjb3VudDogcHJvY2Vzc2VkQ291bnQsXG5cdFx0XHR0b3RhbEVsZW1lbnRzOiBlbGVtZW50cy5sZW5ndGgsXG5cdFx0XHRwcm9jZXNzaW5nVGltZTogYCR7KGVuZFRpbWUgLSBzdGFydFRpbWUpLnRvRml4ZWQoMil9bXNgXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc21hbGxJbWFnZXM7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZVNtYWxsSW1hZ2VzKGRvYzogRG9jdW1lbnQsIHNtYWxsSW1hZ2VzOiBTZXQ8c3RyaW5nPikge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXG5cdFx0WydpbWcnLCAnc3ZnJ10uZm9yRWFjaCh0YWcgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcblx0XHRcdEFycmF5LmZyb20oZWxlbWVudHMpLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdGNvbnN0IGlkZW50aWZpZXIgPSB0aGlzLmdldEVsZW1lbnRJZGVudGlmaWVyKGVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoaWRlbnRpZmllciAmJiBzbWFsbEltYWdlcy5oYXMoaWRlbnRpZmllcikpIHtcblx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBzbWFsbCBlbGVtZW50czonLCByZW1vdmVkQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRFbGVtZW50SWRlbnRpZmllcihlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHwgbnVsbCB7XG5cdFx0Ly8gVHJ5IHRvIGNyZWF0ZSBhIHVuaXF1ZSBpZGVudGlmaWVyIHVzaW5nIHZhcmlvdXMgYXR0cmlidXRlc1xuXHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuXHRcdFx0Ly8gRm9yIGxhenktbG9hZGVkIGltYWdlcywgdXNlIGRhdGEtc3JjIGFzIGlkZW50aWZpZXIgaWYgYXZhaWxhYmxlXG5cdFx0XHRjb25zdCBkYXRhU3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0XHRpZiAoZGF0YVNyYykgcmV0dXJuIGBzcmM6JHtkYXRhU3JjfWA7XG5cdFx0XHRcblx0XHRcdGNvbnN0IHNyYyA9IGVsZW1lbnQuc3JjIHx8ICcnO1xuXHRcdFx0Y29uc3Qgc3Jjc2V0ID0gZWxlbWVudC5zcmNzZXQgfHwgJyc7XG5cdFx0XHRjb25zdCBkYXRhU3Jjc2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRcblx0XHRcdGlmIChzcmMpIHJldHVybiBgc3JjOiR7c3JjfWA7XG5cdFx0XHRpZiAoc3Jjc2V0KSByZXR1cm4gYHNyY3NldDoke3NyY3NldH1gO1xuXHRcdFx0aWYgKGRhdGFTcmNzZXQpIHJldHVybiBgc3Jjc2V0OiR7ZGF0YVNyY3NldH1gO1xuXHRcdH1cblxuXHRcdGNvbnN0IGlkID0gZWxlbWVudC5pZCB8fCAnJztcblx0XHRjb25zdCBjbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSB8fCAnJztcblx0XHRjb25zdCB2aWV3Qm94ID0gZWxlbWVudCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQgPyBlbGVtZW50LmdldEF0dHJpYnV0ZSgndmlld0JveCcpIHx8ICcnIDogJyc7XG5cdFx0XG5cdFx0aWYgKGlkKSByZXR1cm4gYGlkOiR7aWR9YDtcblx0XHRpZiAodmlld0JveCkgcmV0dXJuIGB2aWV3Qm94OiR7dmlld0JveH1gO1xuXHRcdGlmIChjbGFzc05hbWUpIHJldHVybiBgY2xhc3M6JHtjbGFzc05hbWV9YDtcblx0XHRcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHByaXZhdGUgZmluZE1haW5Db250ZW50KGRvYzogRG9jdW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG5cblx0XHQvLyBGaW5kIGFsbCBwb3RlbnRpYWwgY29udGVudCBjb250YWluZXJzXG5cdFx0Y29uc3QgY2FuZGlkYXRlczogeyBlbGVtZW50OiBFbGVtZW50OyBzY29yZTogbnVtYmVyIH1bXSA9IFtdO1xuXG5cdFx0RU5UUllfUE9JTlRfRUxFTUVOVFMuZm9yRWFjaCgoc2VsZWN0b3IsIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdC8vIEJhc2Ugc2NvcmUgZnJvbSBzZWxlY3RvciBwcmlvcml0eSAoZWFybGllciA9IGhpZ2hlcilcblx0XHRcdFx0bGV0IHNjb3JlID0gKEVOVFJZX1BPSU5UX0VMRU1FTlRTLmxlbmd0aCAtIGluZGV4KSAqIDEwO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQWRkIHNjb3JlIGJhc2VkIG9uIGNvbnRlbnQgYW5hbHlzaXNcblx0XHRcdFx0c2NvcmUgKz0gdGhpcy5zY29yZUVsZW1lbnQoZWxlbWVudCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRjYW5kaWRhdGVzLnB1c2goeyBlbGVtZW50LCBzY29yZSB9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGNhbmRpZGF0ZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQvLyBGYWxsIGJhY2sgdG8gc2NvcmluZyBibG9jayBlbGVtZW50c1xuXHRcdFx0Ly8gQ3VycmVudGx5IDxib2R5PiBlbGVtZW50IGlzIHVzZWQgYXMgdGhlIGZhbGxiYWNrLCBzbyB0aGlzIGlzIG5vdCB1c2VkXG5cdFx0XHRyZXR1cm4gdGhpcy5maW5kQ29udGVudEJ5U2NvcmluZyhkb2MpO1xuXHRcdH1cblxuXHRcdC8vIFNvcnQgYnkgc2NvcmUgZGVzY2VuZGluZ1xuXHRcdGNhbmRpZGF0ZXMuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuXHRcdFxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHR0aGlzLl9sb2coJ0NvbnRlbnQgY2FuZGlkYXRlczonLCBjYW5kaWRhdGVzLm1hcChjID0+ICh7XG5cdFx0XHRcdGVsZW1lbnQ6IGMuZWxlbWVudC50YWdOYW1lLFxuXHRcdFx0XHRzZWxlY3RvcjogdGhpcy5nZXRFbGVtZW50U2VsZWN0b3IoYy5lbGVtZW50KSxcblx0XHRcdFx0c2NvcmU6IGMuc2NvcmVcblx0XHRcdH0pKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXNbMF0uZWxlbWVudDtcblx0fVxuXG5cdHByaXZhdGUgZmluZENvbnRlbnRCeVNjb3JpbmcoZG9jOiBEb2N1bWVudCk6IEVsZW1lbnQgfCBudWxsIHtcblx0XHRjb25zdCBjYW5kaWRhdGVzID0gdGhpcy5zY29yZUVsZW1lbnRzKGRvYyk7XG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXMubGVuZ3RoID4gMCA/IGNhbmRpZGF0ZXNbMF0uZWxlbWVudCA6IG51bGw7XG5cdH1cblxuXHRwcml2YXRlIGdldEVsZW1lbnRTZWxlY3RvcihlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcblx0XHRsZXQgY3VycmVudDogRWxlbWVudCB8IG51bGwgPSBlbGVtZW50O1xuXHRcdFxuXHRcdHdoaWxlIChjdXJyZW50ICYmIGN1cnJlbnQgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuXHRcdFx0bGV0IHNlbGVjdG9yID0gY3VycmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAoY3VycmVudC5pZCkge1xuXHRcdFx0XHRzZWxlY3RvciArPSAnIycgKyBjdXJyZW50LmlkO1xuXHRcdFx0fSBlbHNlIGlmIChjdXJyZW50LmNsYXNzTmFtZSAmJiB0eXBlb2YgY3VycmVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHNlbGVjdG9yICs9ICcuJyArIGN1cnJlbnQuY2xhc3NOYW1lLnRyaW0oKS5zcGxpdCgvXFxzKy8pLmpvaW4oJy4nKTtcblx0XHRcdH1cblx0XHRcdHBhcnRzLnVuc2hpZnQoc2VsZWN0b3IpO1xuXHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudDtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJyA+ICcpO1xuXHR9XG5cblx0cHJpdmF0ZSBzY29yZUVsZW1lbnRzKGRvYzogRG9jdW1lbnQpOiBDb250ZW50U2NvcmVbXSB7XG5cdFx0Y29uc3QgY2FuZGlkYXRlczogQ29udGVudFNjb3JlW10gPSBbXTtcblxuXHRcdEJMT0NLX0VMRU1FTlRTLmZvckVhY2goKHRhZzogc3RyaW5nKSA9PiB7XG5cdFx0XHRBcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpKS5mb3JFYWNoKChlbGVtZW50OiBFbGVtZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHNjb3JlID0gdGhpcy5zY29yZUVsZW1lbnQoZWxlbWVudCk7XG5cdFx0XHRcdGlmIChzY29yZSA+IDApIHtcblx0XHRcdFx0XHRjYW5kaWRhdGVzLnB1c2goeyBzY29yZSwgZWxlbWVudCB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gY2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG5cdH1cblxuXHRwcml2YXRlIHNjb3JlRWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogbnVtYmVyIHtcblx0XHRsZXQgc2NvcmUgPSAwO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gZWxlbWVudCBwcm9wZXJ0aWVzXG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgJiYgdHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJyA/IFxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHRcdGNvbnN0IGlkID0gZWxlbWVudC5pZCA/IGVsZW1lbnQuaWQudG9Mb3dlckNhc2UoKSA6ICcnO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gY29udGVudFxuXHRcdGNvbnN0IHRleHQgPSBlbGVtZW50LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdGNvbnN0IHdvcmRzID0gdGV4dC5zcGxpdCgvXFxzKy8pLmxlbmd0aDtcblx0XHRzY29yZSArPSBNYXRoLm1pbihNYXRoLmZsb29yKHdvcmRzIC8gMTAwKSwgMyk7XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBsaW5rIGRlbnNpdHlcblx0XHRjb25zdCBsaW5rcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcblx0XHRjb25zdCBsaW5rVGV4dCA9IEFycmF5LmZyb20obGlua3MpLnJlZHVjZSgoYWNjLCBsaW5rKSA9PiBhY2MgKyAobGluay50ZXh0Q29udGVudD8ubGVuZ3RoIHx8IDApLCAwKTtcblx0XHRjb25zdCBsaW5rRGVuc2l0eSA9IHRleHQubGVuZ3RoID8gbGlua1RleHQgLyB0ZXh0Lmxlbmd0aCA6IDA7XG5cdFx0aWYgKGxpbmtEZW5zaXR5ID4gMC41KSB7XG5cdFx0XHRzY29yZSAtPSAxMDtcblx0XHR9XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBwcmVzZW5jZSBvZiBtZWFuaW5nZnVsIGVsZW1lbnRzXG5cdFx0Y29uc3QgcGFyYWdyYXBocyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3AnKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gcGFyYWdyYXBocztcblxuXHRcdGNvbnN0IGltYWdlcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpLmxlbmd0aDtcblx0XHRzY29yZSArPSBNYXRoLm1pbihpbWFnZXMgKiAzLCA5KTtcblxuXHRcdHJldHVybiBzY29yZTtcblx0fVxufSAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiZXhwb3J0IHsgRGVmdWRkbGUgfSBmcm9tICcuL2RlZnVkZGxlJztcbmV4cG9ydCB0eXBlIHsgRGVmdWRkbGVPcHRpb25zLCBEZWZ1ZGRsZVJlc3BvbnNlLCBEZWZ1ZGRsZU1ldGFkYXRhIH0gZnJvbSAnLi90eXBlcyc7ICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
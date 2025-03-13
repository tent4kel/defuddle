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
            this.getSchemaProperty(doc, schemaOrgData, 'sourceOrganization.name') ||
            this.getMetaContent(doc, "name", "copyright") ||
            this.getSchemaProperty(doc, schemaOrgData, 'copyrightHolder.name') ||
            this.getSchemaProperty(doc, schemaOrgData, 'isPartOf.name') ||
            this.getMetaContent(doc, "name", "application-name") ||
            '');
    }
    static getTitle(doc, schemaOrgData) {
        var _a, _b;
        return (this.getMetaContent(doc, "property", "og:title") ||
            this.getMetaContent(doc, "name", "twitter:title") ||
            this.getSchemaProperty(doc, schemaOrgData, 'headline') ||
            this.getMetaContent(doc, "name", "title") ||
            this.getMetaContent(doc, "name", "sailthru.title") ||
            ((_b = (_a = doc.querySelector('title')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) ||
            '');
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
    '.promo',
    '.Promo',
    // comments
    '[id="comments" i]',
    // header, nav
    'header',
    '#header',
    'nav',
    '.navigation',
    '#navigation',
    '[role="navigation" i]',
    '[role="dialog" i]',
    '[role*="complementary" i]',
    '[class*="pagination" i]',
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
    'table.infobox',
    '.pencraft:not(.pc-display-contents)', // Substack
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
    'article-snippet',
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
    'content-topics',
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
    'entry-date',
    'entry-meta',
    'entry-title',
    'entry-utility',
    'eyebrow',
    'expand-reduce',
    'externallinkembedwrapper', // The New Yorker
    'extra-title',
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
    //	'keyword', // used in syntax highlighting
    'kicker',
    '-labels',
    'language-name',
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
    'skip-link',
    'social',
    'speechify-ignore',
    'sponsor',
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
// Supported languages for code blocks
const SUPPORTED_LANGUAGES = new Set([
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
                    if (SUPPORTED_LANGUAGES.has(element.className.toLowerCase())) {
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
                    if (SUPPORTED_LANGUAGES.has(className.toLowerCase())) {
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
                if (ALLOWED_ATTRIBUTES.has(attr.name)) {
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
                if (langClass && SUPPORTED_LANGUAGES.has(langClass.toLowerCase())) {
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
                        if (match && match[1] && SUPPORTED_LANGUAGES.has(match[1].toLowerCase())) {
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
        const exactElements = doc.querySelectorAll(EXACT_SELECTORS.join(','));
        exactElements.forEach(el => {
            if (el === null || el === void 0 ? void 0 : el.parentNode) {
                elementsToRemove.add(el);
                exactSelectorCount++;
            }
        });
        // Pre-compile regexes and combine into a single regex for better performance
        const combinedPattern = PARTIAL_SELECTORS.join('|');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7QUNSQSxNQUFhLGlCQUFpQjtJQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQWEsRUFBRSxhQUFrQjs7UUFDL0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQztZQUNKLHdDQUF3QztZQUN4QyxHQUFHLEdBQUcsVUFBRyxDQUFDLFFBQVEsMENBQUUsSUFBSSxLQUFJLEVBQUUsQ0FBQztZQUUvQiw2Q0FBNkM7WUFDN0MsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNWLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDO29CQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDO29CQUNuRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUM7b0JBQ2pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLHNCQUFzQixDQUFDO29CQUNsRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDO3FCQUN6RCxTQUFHLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLDBDQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSSxFQUFFLENBQUM7WUFDekUsQ0FBQztZQUVELElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELENBQUM7UUFDRixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNaLGlEQUFpRDtZQUNqRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hELElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxDQUFDO29CQUNKLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDekMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ1osT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDO1FBRUQsT0FBTztZQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUM7WUFDeEMsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQztZQUNwRCxNQUFNO1lBQ04sT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUNsQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDO1lBQ3hDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUM7WUFDaEQsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQztZQUMxQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDO1lBQ3RDLGFBQWE7WUFDYixTQUFTLEVBQUUsQ0FBQztZQUNaLFNBQVMsRUFBRSxDQUFDO1NBQ1osQ0FBQztJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQWEsRUFBRSxhQUFrQjtRQUN6RCxPQUFPLENBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixDQUFDO1lBQ25ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQztZQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDO1lBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztZQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDO1lBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUM7WUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsc0JBQXNCLENBQUM7WUFDbEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQztZQUNwRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQztZQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSx5QkFBeUIsQ0FBQztZQUNyRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUM7WUFDM0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixDQUFDO1lBQ25ELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQztZQUNwRCxFQUFFLENBQ0YsQ0FBQztJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQWEsRUFBRSxhQUFrQjtRQUN2RCxPQUFPLENBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUM7WUFDNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQztZQUNwRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSx5QkFBeUIsQ0FBQztZQUNyRSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDO1lBQzdDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLHNCQUFzQixDQUFDO1lBQ2xFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQztZQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLENBQUM7WUFDcEQsRUFBRSxDQUNGLENBQUM7SUFDSCxDQUFDO0lBRU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFhLEVBQUUsYUFBa0I7O1FBQ3hELE9BQU8sQ0FDTixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO1lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxlQUFlLENBQUM7WUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDO1lBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7WUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixDQUFDO2FBQ2xELGVBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLDBDQUFFLFdBQVcsMENBQUUsSUFBSSxFQUFFO1lBQy9DLEVBQUUsQ0FDRixDQUFDO0lBQ0gsQ0FBQztJQUVPLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBYSxFQUFFLGFBQWtCO1FBQzlELE9BQU8sQ0FDTixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDO1lBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7WUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixDQUFDO1lBQ3RELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQztZQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUscUJBQXFCLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLHNCQUFzQixDQUFDO1lBQ3hELEVBQUUsQ0FDRixDQUFDO0lBQ0gsQ0FBQztJQUVPLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBYSxFQUFFLGFBQWtCO1FBQ3hELE9BQU8sQ0FDTixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO1lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxlQUFlLENBQUM7WUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQztZQUN2RCxFQUFFLENBQ0YsQ0FBQztJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQWEsRUFBRSxPQUFlOztRQUN2RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUM5RSxJQUFJLFlBQVk7WUFBRSxPQUFPLFlBQVksQ0FBQztRQUV0QyxNQUFNLFFBQVEsR0FBRyxTQUFHLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLDBDQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLFFBQVE7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUU5QixNQUFNLFlBQVksR0FBRyxTQUFHLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLDBDQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRixJQUFJLFlBQVk7WUFBRSxPQUFPLFlBQVksQ0FBQztRQUV0QyxnRUFBZ0U7UUFDaEUsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQztnQkFDSixPQUFPLElBQUksR0FBRyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDOUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0YsQ0FBQztRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVPLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBYSxFQUFFLGFBQWtCO1FBQzVELE9BQU8sQ0FDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUM7WUFDM0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQztZQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsd0JBQXdCLENBQUM7WUFDOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQztZQUNqRCxFQUFFLENBQ0YsQ0FBQztJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQWEsRUFBRSxJQUFZLEVBQUUsS0FBYTs7UUFDdkUsTUFBTSxRQUFRLEdBQUcsUUFBUSxJQUFJLEdBQUcsQ0FBQztRQUNqQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN4RCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBQyxnQkFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsMENBQUUsV0FBVyxFQUFFLE1BQUssS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFDLENBQUM7UUFDM0UsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsMENBQUUsSUFBSSxFQUFFLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzdFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFhOztRQUMxQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDeEIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMseUJBQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLDBDQUFFLElBQUksRUFBRSxtQ0FBSSxhQUFPLENBQUMsV0FBVywwQ0FBRSxJQUFJLEVBQUUsbUNBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsR0FBYTtRQUM1RCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRU8sTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQWEsRUFBRSxhQUFrQixFQUFFLFFBQWdCLEVBQUUsZUFBdUIsRUFBRTtRQUM5RyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sWUFBWSxDQUFDO1FBRXhDLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBUyxFQUFFLEtBQWUsRUFBRSxRQUFnQixFQUFFLGVBQXdCLElBQUksRUFBWSxFQUFFO1lBQzdHLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQzlCLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN6QyxDQUFDO1lBRUQsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDdkMsT0FBTyxFQUFFLENBQUM7WUFDWCxDQUFDO1lBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7b0JBQ25DLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7d0JBQ2pCLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDMUUsQ0FBQztvQkFDRCxPQUFPLEVBQUUsQ0FBQztnQkFDWCxDQUFDO2dCQUVELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsRUFBRSxDQUFDO29CQUNwRyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDaEYsQ0FBQztZQUVELE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxjQUFjLENBQUMsR0FBRyxLQUFLLENBQUM7WUFFL0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNsQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7b0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDWCxDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RDLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxjQUFjLEVBQ3BELFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNuQixNQUFNLGFBQWEsR0FBYSxFQUFFLENBQUM7Z0JBQ25DLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ3hCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7d0JBQ25DLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUM1QyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQy9DLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztnQkFDRixDQUFDO2dCQUNELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDOUIsT0FBTyxhQUFhLENBQUM7Z0JBQ3RCLENBQUM7WUFDRixDQUFDO1lBRUQsT0FBTyxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUM7WUFDSixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pFLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDMUIsT0FBTyxHQUFHLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkUsQ0FBQztZQUNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ3RGLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxRQUFRLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRSxPQUFPLFlBQVksQ0FBQztRQUNyQixDQUFDO0lBQ0YsQ0FBQztJQUVELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFhO1FBQ3hDLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ2pGLE1BQU0sVUFBVSxHQUFVLEVBQUUsQ0FBQztRQUU3QixhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1lBRTNDLElBQUksQ0FBQztnQkFDSixXQUFXLEdBQUcsV0FBVztxQkFDdkIsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsQ0FBQztxQkFDN0MsT0FBTyxDQUFDLG9DQUFvQyxFQUFFLElBQUksQ0FBQztxQkFDbkQsT0FBTyxDQUFDLHdDQUF3QyxFQUFFLEVBQUUsQ0FBQztxQkFDckQsSUFBSSxFQUFFLENBQUM7Z0JBRVQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFekMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUM3RCxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7cUJBQU0sQ0FBQztvQkFDUCxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO1lBQ0YsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDekQsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxVQUFVLENBQUM7SUFDbkIsQ0FBQztDQUNEO0FBblJELDhDQW1SQzs7Ozs7Ozs7Ozs7Ozs7QUNyUkQsOERBQStDO0FBRy9DLHVCQUF1QjtBQUN2QixvRUFBb0U7QUFDcEUsTUFBTSxvQkFBb0IsR0FBRztJQUM1QixTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLDBCQUEwQjtJQUMxQixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLGVBQWU7SUFDZixNQUFNLENBQUMsa0NBQWtDO0NBQ3pDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDekIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUU3RCx5Q0FBeUM7QUFDekMsTUFBTSx3QkFBd0IsR0FBRztJQUNoQyxVQUFVO0lBQ1Ysc0JBQXNCO0lBQ3ZCLGdFQUFnRTtJQUNoRSw2QkFBNkI7SUFDNUIsK0JBQStCO0lBQy9CLDhCQUE4QjtJQUM5QixTQUFTO0lBQ1QsWUFBWTtDQUNaLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRVosMEJBQTBCO0FBQzFCLE1BQU0sZUFBZSxHQUFHO0lBQ3ZCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsUUFBUTtJQUNSLE9BQU87SUFFUCxNQUFNO0lBQ04sOEJBQThCO0lBQzlCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsUUFBUTtJQUNSLFFBQVE7SUFFUixXQUFXO0lBQ1gsbUJBQW1CO0lBRW5CLGNBQWM7SUFDZCxRQUFRO0lBQ1IsU0FBUztJQUNULEtBQUs7SUFDTCxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsMkJBQTJCO0lBQzNCLHlCQUF5QjtJQUV6QixXQUFXO0lBQ1gsU0FBUztJQUNULFNBQVM7SUFDVCxjQUFjO0lBQ2QsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQix3QkFBd0I7SUFDeEIsaUJBQWlCO0lBRWpCLFNBQVM7SUFDVCxRQUFRO0lBRVIsMEJBQTBCO0lBQzFCLE9BQU87SUFDUCxRQUFRO0lBQ1AsbUNBQW1DO0lBQ3BDLFFBQVE7SUFDUixRQUFRO0lBQ1IsVUFBVTtJQUNWLE1BQU07SUFDTiw4QkFBOEI7SUFDOUIsT0FBTztJQUNQLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLFVBQVU7SUFDVixNQUFNO0lBRU4sVUFBVTtJQUNWLGtCQUFrQjtJQUNsQiwrRkFBK0Y7SUFFL0YsUUFBUTtJQUNSLGtCQUFrQjtJQUNsQixPQUFPO0lBQ1AsT0FBTztJQUVQLGFBQWE7SUFDYixhQUFhO0lBQ2IsYUFBYTtJQUViLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsNEJBQTRCO0lBQzVCLDhCQUE4QjtJQUM5Qiw2QkFBNkI7SUFFN0IsdUJBQXVCO0lBQ3ZCLDZCQUE2QjtJQUM3QixzREFBc0Q7SUFDdEQsaUNBQWlDO0lBQ2pDLDhCQUE4QjtJQUU5QixhQUFhO0lBQ2IsbUNBQW1DO0lBRW5DLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUVWLFFBQVE7SUFDUixlQUFlO0lBQ2YscUNBQXFDLEVBQUUsV0FBVztJQUNsRCxnREFBZ0QsQ0FBQyxnQkFBZ0I7Q0FDakUsQ0FBQztBQUVGLGtGQUFrRjtBQUNsRiw0Q0FBNEM7QUFDNUMsTUFBTSxpQkFBaUIsR0FBRztJQUN6QixhQUFhO0lBQ2IsYUFBYTtJQUNiLFVBQVU7SUFDVixRQUFRO0lBQ1IsUUFBUTtJQUNSLE1BQU07SUFDTixNQUFNO0lBQ04sVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsY0FBYztJQUNkLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixjQUFjO0lBQ2QsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxjQUFjO0lBQ2QsZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxlQUFlLEVBQUUsWUFBWTtJQUM3QixtQkFBbUI7SUFDcEIsa0JBQWtCO0lBQ2pCLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsUUFBUTtJQUNSLFdBQVc7SUFDWCxZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLE1BQU07SUFDTixNQUFNO0lBQ04sUUFBUTtJQUNSLFNBQVM7SUFDVCxZQUFZO0lBQ1osVUFBVTtJQUNWLGNBQWMsRUFBRSxnQkFBZ0I7SUFDaEMsYUFBYTtJQUNiLFVBQVU7SUFDWCxrQ0FBa0M7SUFDakMsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsU0FBUztJQUNULGNBQWMsRUFBRSxZQUFZO0lBQzVCLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixlQUFlLEVBQUUsYUFBYTtJQUM5QixvQkFBb0I7SUFDcEIsVUFBVTtJQUNWLFlBQVk7SUFDWixhQUFhO0lBQ2IsY0FBYztJQUNmLFlBQVk7SUFDWCxZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixVQUFVO0lBQ1YsUUFBUTtJQUNSLFFBQVE7SUFDUixVQUFVLEVBQUUsZUFBZTtJQUMzQixVQUFVO0lBQ1YsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLFlBQVk7SUFDWixhQUFhO0lBQ2IsZUFBZTtJQUNmLFNBQVM7SUFDVCxlQUFlO0lBQ2YsMEJBQTBCLEVBQUUsaUJBQWlCO0lBQzdDLGFBQWE7SUFDYixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLE9BQU87SUFDUCxRQUFRO0lBQ1IsUUFBUTtJQUNSLGVBQWU7SUFDZixjQUFjO0lBQ2QsU0FBUztJQUNULGFBQWE7SUFDYixpQkFBaUI7SUFDakIsV0FBVztJQUNaLFlBQVk7SUFDWCxRQUFRO0lBQ1IsT0FBTztJQUNQLFlBQVk7SUFDWixhQUFhO0lBQ2IsZ0JBQWdCLEVBQUUsWUFBWTtJQUM5QixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsV0FBVztJQUNYLGFBQWE7SUFDYixVQUFVO0lBQ1gsNENBQTRDO0lBQzNDLFFBQVE7SUFDUixTQUFTO0lBQ1QsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixTQUFTLEVBQUUsWUFBWTtJQUN2QixVQUFVO0lBQ1YsVUFBVTtJQUNWLFlBQVksRUFBRSxNQUFNO0lBQ3BCLGFBQWEsRUFBRSxNQUFNO0lBQ3JCLHVCQUF1QixFQUFFLGdCQUFnQjtJQUN6QyxTQUFTO0lBQ1QsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixpQkFBaUIsRUFBRSxRQUFRO0lBQzNCLGlCQUFpQjtJQUNqQixXQUFXO0lBQ1gsV0FBVztJQUNYLGVBQWU7SUFDZixPQUFPO0lBQ1AsT0FBTztJQUNQLFVBQVU7SUFDVixZQUFZO0lBQ1osUUFBUTtJQUNSLFFBQVE7SUFDUixPQUFPO0lBQ1AsVUFBVTtJQUNWLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixjQUFjO0lBQ2QsTUFBTTtJQUNOLE1BQU07SUFDTixRQUFRO0lBQ1QsZ0JBQWdCO0lBQ2YsT0FBTztJQUNQLGtCQUFrQjtJQUNuQixpQ0FBaUM7SUFDaEMsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsVUFBVTtJQUNWLFNBQVM7SUFDVCxzQkFBc0IsRUFBRSxlQUFlO0lBQ3ZDLGNBQWM7SUFDZCxTQUFTO0lBQ1QsWUFBWTtJQUNaLFdBQVc7SUFDWCxNQUFNO0lBQ04sU0FBUztJQUNWLGlCQUFpQjtJQUNoQixRQUFRO0lBQ1IsU0FBUztJQUNULGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLFVBQVU7SUFDVixXQUFXO0lBQ1gsV0FBVztJQUNYLFlBQVk7SUFDWixVQUFVO0lBQ1YsV0FBVztJQUNYLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFdBQVc7SUFDWCxVQUFVO0lBQ1YsYUFBYTtJQUNiLGNBQWM7SUFDZCxjQUFjO0lBQ2QsV0FBVztJQUNYLFlBQVk7SUFDWixZQUFZO0lBQ1osU0FBUztJQUNULFVBQVU7SUFDVixVQUFVO0lBQ1YsU0FBUztJQUNULFVBQVU7SUFDVixVQUFVO0lBQ1gsc0NBQXNDO0lBQ3JDLFVBQVU7SUFDVixjQUFjO0lBQ2QsWUFBWTtJQUNaLGNBQWM7SUFDZCxTQUFTO0lBQ1YsV0FBVztJQUNWLFNBQVM7SUFDVCxVQUFVO0lBQ1YsVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixpQkFBaUIsRUFBRSxTQUFTO0lBQzVCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsT0FBTztJQUNQLFVBQVU7SUFDVixXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsWUFBWTtJQUNaLGFBQWE7SUFDYixhQUFhO0lBQ2IsV0FBVztJQUNYLGdCQUFnQjtJQUNoQixRQUFRO0lBQ1IsVUFBVTtJQUNWLFNBQVM7SUFDVCxpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3JCLFdBQVc7SUFDWCw2QkFBNkI7SUFDNUIsV0FBVztJQUNYLGFBQWE7SUFDYixZQUFZO0lBQ1osZUFBZTtJQUNmLGNBQWM7SUFDZCxVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixXQUFXO0lBQ1gsV0FBVztJQUNYLFVBQVU7SUFDVixZQUFZO0lBQ1osYUFBYTtJQUNiLFdBQVc7SUFDWCxXQUFXO0lBQ1osV0FBVztJQUNWLFdBQVc7SUFDWCxRQUFRO0lBQ1Isa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVixZQUFZO0lBQ1gsUUFBUTtJQUNSLFFBQVE7SUFDUixlQUFlLEVBQUUsU0FBUztJQUMxQixrQkFBa0IsRUFBRSxTQUFTO0lBQzdCLGVBQWU7SUFDZixXQUFXO0lBQ1gsT0FBTztJQUNQLFlBQVk7SUFDWixVQUFVO0lBQ1YsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixPQUFPO0lBQ1IsbUJBQW1CO0lBQ2xCLGNBQWM7SUFDZCxhQUFhO0lBQ2IsV0FBVztJQUNYLFNBQVM7SUFDVCxTQUFTO0lBQ1QsTUFBTTtJQUNOLFlBQVk7SUFDWixTQUFTO0lBQ1QsU0FBUztJQUNULGFBQWE7SUFDYixXQUFXO0lBQ1gsVUFBVTtJQUNWLFlBQVk7SUFDWixhQUFhO0lBQ2IsU0FBUztJQUNULGlCQUFpQjtJQUNqQixZQUFZO0NBQ1osQ0FBQztBQUVGLHdDQUF3QztBQUN4QyxNQUFNLDBCQUEwQixHQUFHO0lBQ2xDLGVBQWU7SUFDZixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsZUFBZSxFQUFFLDRCQUE0QjtJQUM3QyxlQUFlLEVBQUUscUNBQXFDO0lBQ3RELHNCQUFzQjtJQUN0QixxQkFBcUI7SUFDckIsbUJBQW1CLEVBQUUsV0FBVztJQUNoQyxrQ0FBa0MsRUFBRSxXQUFXO0lBQy9DLHlCQUF5QixFQUFFLGNBQWM7SUFDekMsZ0JBQWdCO0lBQ2hCLG1CQUFtQixFQUFFLGFBQWE7Q0FDbEMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFWixNQUFNLHVCQUF1QixHQUFHO0lBQy9CLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsMEJBQTBCO0lBQzFCLDJCQUEyQjtJQUMzQixtQkFBbUI7SUFDbkIsY0FBYztJQUNkLGVBQWU7SUFDZixpQ0FBaUM7SUFDakMsc0JBQXNCO0lBQ3RCLDhCQUE4QjtJQUM5QiwrQkFBK0I7SUFDL0Isa0NBQWtDO0lBQ2xDLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsbURBQW1ELENBQUMsV0FBVztDQUMvRCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVaLHdDQUF3QztBQUN4QyxxREFBcUQ7QUFDckQsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUN0QyxNQUFNO0lBQ04sT0FBTztJQUNQLE1BQU07SUFDTixJQUFJO0lBQ0osUUFBUTtJQUNSLEtBQUs7SUFDTCxNQUFNO0lBQ04sU0FBUztJQUNULE9BQU87SUFDUCxRQUFRO0lBQ1IsR0FBRztJQUNILElBQUk7SUFDSixRQUFRO0lBQ1IsS0FBSztJQUNMLE9BQU87SUFDUCxNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sUUFBUTtJQUNSLE9BQU87SUFDUCxNQUFNO0lBQ04sU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsVUFBVTtJQUNWLE1BQU07SUFDTixRQUFRO0lBQ1IsTUFBTTtJQUNOLEtBQUs7SUFDTCxJQUFJO0lBQ0osSUFBSTtJQUNKLE9BQU87SUFDUCxLQUFLO0lBQ0wsT0FBTztJQUNQLEtBQUs7Q0FDTCxDQUFDLENBQUM7QUFFSCxxQkFBcUI7QUFDckIsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUNsQyxLQUFLO0lBQ0wsT0FBTztJQUNQLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osT0FBTztJQUNQLFNBQVM7SUFDVCxTQUFTO0lBQ1QsVUFBVTtJQUNWLFVBQVU7SUFDVixhQUFhO0lBQ2IsV0FBVztJQUNYLEtBQUs7SUFDTCxhQUFhO0lBQ2IsU0FBUztJQUNULFFBQVE7SUFDUixNQUFNO0lBQ04sSUFBSTtJQUNKLE1BQU07SUFDTixNQUFNO0lBQ04sU0FBUztJQUNULEtBQUs7SUFDTCxRQUFRO0lBQ1IsT0FBTztJQUNQLE1BQU07SUFDTixPQUFPO0NBQ1AsQ0FBQyxDQUFDO0FBRUgsc0NBQXNDO0FBQ3RDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDbkMsZUFBZTtJQUNmLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLO0lBQy9ELFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSztJQUNwRCxhQUFhLEVBQUUsTUFBTTtJQUVyQiwrQkFBK0I7SUFDL0IsUUFBUTtJQUNSLE1BQU07SUFDTixRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRO0lBQ2xDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU07SUFDekIsTUFBTSxFQUFFLElBQUk7SUFDWixLQUFLO0lBQ0wsUUFBUTtJQUNSLE1BQU07SUFDTixPQUFPO0lBQ1AsUUFBUTtJQUNSLE9BQU87SUFDUCxNQUFNO0lBRU4sb0JBQW9CO0lBQ3BCLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSTtJQUNyQixZQUFZO0lBQ1osT0FBTztJQUVQLGdCQUFnQjtJQUNoQixNQUFNLEVBQUUsT0FBTztJQUNmLE1BQU0sRUFBRSxLQUFLO0lBQ2IsTUFBTTtJQUNOLFlBQVk7SUFDWixXQUFXO0lBRVgsa0JBQWtCO0lBQ2xCLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWTtJQUM1QixTQUFTO0lBQ1QsU0FBUztJQUNULFFBQVE7SUFFUix5QkFBeUI7SUFDekIsVUFBVSxFQUFFLElBQUk7SUFDaEIsT0FBTyxFQUFFLEtBQUs7SUFDZCxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPO0lBRVAsdUJBQXVCO0lBQ3ZCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsS0FBSztJQUNMLFFBQVE7SUFDUixRQUFRO0lBQ1IsT0FBTztJQUNQLFFBQVE7SUFDUixRQUFRO0lBQ1IsTUFBTSxFQUFFLE9BQU87SUFDZixTQUFTO0lBRVQsa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsT0FBTztJQUNQLFFBQVE7SUFDUixNQUFNO0lBQ04sS0FBSztJQUNMLE9BQU87SUFDUCxRQUFRO0lBQ1IsU0FBUztJQUNULEtBQUs7SUFDTCxLQUFLO0lBRUwsa0JBQWtCO0lBQ2xCLE9BQU87SUFDUCxRQUFRO0lBQ1IsT0FBTztJQUNQLFVBQVU7SUFDVixLQUFLO0lBQ0wsV0FBVztJQUNYLFVBQVU7SUFDVixNQUFNO0lBQ04sTUFBTTtJQUVOLFdBQVc7SUFDWCxNQUFNO0lBQ04sTUFBTTtJQUNOLFFBQVE7SUFFUixtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLGNBQWM7SUFFZCxTQUFTO0lBQ1QsTUFBTTtJQUNOLGNBQWM7SUFDZCxLQUFLO0lBQ0wsTUFBTTtJQUNOLFFBQVE7SUFDUixhQUFhO0lBQ2IsU0FBUztJQUNULGNBQWM7SUFDZCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxNQUFNO0lBQ04sT0FBTztJQUNQLFFBQVE7SUFDUixZQUFZO0lBQ1osUUFBUTtJQUNSLE9BQU87SUFDUCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixPQUFPO0lBQ1AsUUFBUTtJQUNSLEtBQUs7SUFDTCxTQUFTO0lBQ1QsTUFBTTtDQUNOLENBQUMsQ0FBQztBQVdILE1BQU0sNkJBQTZCLEdBQTBCO0lBQzVELGNBQWM7SUFDZDtRQUNDLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxTQUFTLEVBQUUsQ0FBQyxFQUFXLEVBQVcsRUFBRTtZQUNuQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFlBQVksV0FBVyxDQUFDO2dCQUFFLE9BQU8sRUFBRSxDQUFDO1lBRTVDLHNDQUFzQztZQUN0QyxNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBb0IsRUFBVSxFQUFFO2dCQUM3RCxrQ0FBa0M7Z0JBQ2xDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ25ELElBQUksUUFBUSxFQUFFLENBQUM7b0JBQ2QsT0FBTyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQsMkJBQTJCO2dCQUMzQixNQUFNLGdCQUFnQixHQUFHO29CQUN4QixrQkFBa0IsRUFBVyxzQkFBc0I7b0JBQ25ELGNBQWMsRUFBZSxrQkFBa0I7b0JBQy9DLGNBQWMsRUFBZSxrQkFBa0I7b0JBQy9DLGNBQWMsRUFBZSxrQkFBa0I7b0JBQy9DLGdCQUFnQixFQUFhLG9CQUFvQjtvQkFDakQsdUJBQXVCLEVBQU0sMkJBQTJCO29CQUN4RCxtQkFBbUIsRUFBVSx1QkFBdUI7b0JBQ3BELGlCQUFpQixDQUFZLHFCQUFxQjtpQkFDbEQsQ0FBQztnQkFFRiw4Q0FBOEM7Z0JBQzlDLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFLENBQUM7b0JBQ2hFLEtBQUssTUFBTSxPQUFPLElBQUksZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDeEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzdELElBQUksS0FBSyxFQUFFLENBQUM7NEJBQ1gsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQy9CLENBQUM7b0JBQ0YsQ0FBQztvQkFDRCxvQ0FBb0M7b0JBQ3BDLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUM5RCxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ3hDLENBQUM7Z0JBQ0YsQ0FBQztnQkFFRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFakQsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUUsQ0FBQztvQkFDcEMsdUJBQXVCO29CQUN2QixLQUFLLE1BQU0sT0FBTyxJQUFJLGdCQUFnQixFQUFFLENBQUM7d0JBQ3hDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksS0FBSyxFQUFFLENBQUM7NEJBQ1gsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQy9CLENBQUM7b0JBQ0YsQ0FBQztnQkFDRixDQUFDO2dCQUVELDJEQUEyRDtnQkFDM0QsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUUsQ0FBQztvQkFDcEMsSUFBSSxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDdEQsT0FBTyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ2hDLENBQUM7Z0JBQ0YsQ0FBQztnQkFFRCxPQUFPLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQztZQUVGLDZEQUE2RDtZQUM3RCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxjQUFjLEdBQXVCLEVBQUUsQ0FBQztZQUU1QyxPQUFPLGNBQWMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNwQyxRQUFRLEdBQUcsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRWhELDBEQUEwRDtnQkFDMUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ3ZELFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUM7Z0JBQ3hFLENBQUM7Z0JBRUQsY0FBYyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7WUFDL0MsQ0FBQztZQUVELDBFQUEwRTtZQUMxRSxNQUFNLHFCQUFxQixHQUFHLENBQUMsT0FBYSxFQUFVLEVBQUU7Z0JBQ3ZELElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3pDLE9BQU8sT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLENBQUM7Z0JBRUQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNkLElBQUksT0FBTyxZQUFZLFdBQVcsRUFBRSxDQUFDO29CQUNwQyxxQkFBcUI7b0JBQ3JCLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQzt3QkFDOUIsT0FBTyxJQUFJLENBQUM7b0JBQ2IsQ0FBQztvQkFFRCwwQ0FBMEM7b0JBQzFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNsQyxJQUFJLElBQUkscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RDLENBQUMsQ0FBQyxDQUFDO29CQUVILHNDQUFzQztvQkFDdEMsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRSxDQUFDO3dCQUNoQyxJQUFJLElBQUksSUFBSSxDQUFDO29CQUNkLENBQUM7Z0JBQ0YsQ0FBQztnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNiLENBQUMsQ0FBQztZQUVGLDJCQUEyQjtZQUMzQixJQUFJLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUU1Qyx1QkFBdUI7WUFDdkIsV0FBVyxHQUFHLFdBQVc7Z0JBQ3hCLHlDQUF5QztpQkFDeEMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7Z0JBQ3BCLHVDQUF1QztpQkFDdEMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7Z0JBQ3BCLDhEQUE4RDtpQkFDN0QsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3Qix5QkFBeUI7WUFDekIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU3QywwQkFBMEI7WUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDdkMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsc0JBQXNCO1lBQ3RCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELENBQUM7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUUvQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sTUFBTSxDQUFDO1FBQ2YsQ0FBQztLQUNEO0lBQ0QsNkRBQTZEO0lBQzdEO1FBQ0MsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxPQUFPLEVBQUUsTUFBTTtRQUNmLFNBQVMsRUFBRSxDQUFDLEVBQVcsRUFBVyxFQUFFOztZQUNuQyw4REFBOEQ7WUFDOUQsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUMzQixTQUFFLENBQUMsaUJBQWlCLDBDQUFFLE9BQU8sTUFBSyxHQUFHO2dCQUNyQyxDQUFDLFNBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLDBDQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUM7cUJBQ3hELFFBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLDBDQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBQyxFQUFFLENBQUM7Z0JBRS9ELG1DQUFtQztnQkFDbkMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRXRELGdEQUFnRDtnQkFDaEQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN4QyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDdkMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEQsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztnQkFFSCw0QkFBNEI7Z0JBQzVCLFVBQVUsQ0FBQyxXQUFXLEdBQUcsU0FBRSxDQUFDLFdBQVcsMENBQUUsSUFBSSxFQUFFLEtBQUksRUFBRSxDQUFDO2dCQUV0RCxPQUFPLFVBQVUsQ0FBQztZQUNuQixDQUFDO1lBRUQsbUVBQW1FO1lBQ25FLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV0RCwwQkFBMEI7Z0JBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDeEMsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ3ZDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hELENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsNEJBQTRCO2dCQUM1QixVQUFVLENBQUMsV0FBVyxHQUFHLFNBQUUsQ0FBQyxXQUFXLDBDQUFFLElBQUksRUFBRSxLQUFJLEVBQUUsQ0FBQztnQkFFdEQsT0FBTyxVQUFVLENBQUM7WUFDbkIsQ0FBQztZQUVELE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQztLQUNEO0lBQ0Qsd0RBQXdEO0lBQ3hEO1FBQ0MsUUFBUSxFQUFFLHNEQUFzRDtRQUNoRSxPQUFPLEVBQUUsR0FBRztRQUNaLFNBQVMsRUFBRSxDQUFDLEVBQVcsRUFBVyxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFdEMsaUJBQWlCO1lBQ2pCLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUUzQiwwQkFBMEI7WUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLENBQUM7UUFDVixDQUFDO0tBQ0Q7SUFDRCwrQ0FBK0M7SUFDL0M7UUFDQyxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsNERBQTREO1FBQzVELFNBQVMsRUFBRSxDQUFDLEVBQVcsRUFBVyxFQUFFOztZQUNuQyw2Q0FBNkM7WUFDN0MsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sS0FBSyxHQUFHLGdCQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsV0FBVywwQ0FBRSxJQUFJLEVBQUUsS0FBSSxFQUFFLENBQUM7WUFDbkQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV4QyxtQ0FBbUM7WUFDbkMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFN0QseUJBQXlCO1lBQ3pCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQzFELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRS9DLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ2IsNENBQTRDO29CQUM1QyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDeEUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDM0IsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO3dCQUM1QixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQztvQkFFSCx1Q0FBdUM7b0JBQ3ZDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUNqRSxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFOzt3QkFDaEMsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO3dCQUNoRixNQUFNLFdBQVcsR0FBRyxzQkFBZSxhQUFmLGVBQWUsdUJBQWYsZUFBZSxDQUFFLFdBQVcsMENBQUUsSUFBSSxFQUFFLEtBQUksRUFBRSxDQUFDO3dCQUMvRCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUVwRCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFNUUsdUJBQXVCO3dCQUN2QixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQzt3QkFDeEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDaEMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDOUMsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFFM0QsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQ0FDbkIseUNBQXlDO2dDQUN6QyxNQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dDQUNqRixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0NBQzlCLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQ3RDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQ0FDNUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDcEIsQ0FBQyxDQUFDLENBQUM7Z0NBQ0gsUUFBUSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDOzRCQUM5QyxDQUFDOzRCQUVELGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3JDLENBQUMsQ0FBQyxDQUFDO3dCQUVILFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztnQkFDbEMsQ0FBQztnQkFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDO0tBQ0Q7SUFDRDtRQUNDLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsT0FBTyxFQUFFLElBQUk7UUFDYix1Q0FBdUM7UUFDdkMsU0FBUyxFQUFFLENBQUMsRUFBVyxFQUFXLEVBQUU7WUFDbkMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPLEVBQUUsQ0FBQztZQUV4Qiw0Q0FBNEM7WUFDNUMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDeEUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO2dCQUM1QixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxPQUFPLENBQUM7UUFDaEIsQ0FBQztLQUNEO0lBQ0QsdUNBQXVDO0lBQ3ZDO1FBQ0MsUUFBUSxFQUFFLG9KQUFvSjtRQUM5SixPQUFPLEVBQUUsS0FBSztRQUNkLFNBQVMsRUFBRSxDQUFDLEVBQVcsRUFBVyxFQUFFO1lBQ25DLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxXQUFXLENBQUM7Z0JBQUUsT0FBTyxFQUFFLENBQUM7WUFFNUMseUJBQXlCO1lBQ3pCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFN0MseUJBQXlCO1lBQ3pCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUVsQix5REFBeUQ7WUFDekQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3hELElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ2QsNENBQTRDO2dCQUM1QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEYsSUFBSSxTQUFTLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ25FLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3BDLENBQUM7WUFDRixDQUFDO1lBRUQsd0RBQXdEO1lBQ3hELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDZixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxnQkFBZ0IsR0FBRztvQkFDeEIsdURBQXVEO29CQUN2RCx3QkFBd0I7aUJBQ3hCLENBQUM7Z0JBRUYsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUUsQ0FBQztvQkFDcEMsS0FBSyxNQUFNLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO3dCQUN4QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN2QyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7NEJBQzFFLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQ2xDLE1BQU07d0JBQ1AsQ0FBQztvQkFDRixDQUFDO29CQUNELElBQUksUUFBUTt3QkFBRSxNQUFNO2dCQUNyQixDQUFDO1lBQ0YsQ0FBQztZQUVELGlEQUFpRDtZQUNqRCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFckIsbURBQW1EO1lBQ25ELE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsMkNBQTJDLENBQUMsQ0FBQztZQUNwRixJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNuQixvQkFBb0I7Z0JBQ3BCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRCxXQUFXLEdBQUcsS0FBSztxQkFDakIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNYLHFDQUFxQztvQkFDckMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3pELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDWCwwQ0FBMEM7d0JBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO3dCQUNsQyxnRUFBZ0U7d0JBQ2hFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzs0QkFDdkMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNoQyxDQUFDO3dCQUNELE9BQU8sSUFBSSxDQUFDO29CQUNiLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ1gsT0FBTyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7Z0JBQzVDLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ1AsdURBQXVEO2dCQUN2RCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3JELElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDMUIsV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO3lCQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ1gsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ3pELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDOzZCQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ1gsT0FBTyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7b0JBQzVDLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2QsQ0FBQztxQkFBTSxDQUFDO29CQUNQLG1DQUFtQztvQkFDbkMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO2dCQUNwQyxDQUFDO1lBQ0YsQ0FBQztZQUVELHVCQUF1QjtZQUN2QixXQUFXLEdBQUcsV0FBVztpQkFDdkIsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyw0QkFBNEI7aUJBQ3RELE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMseUJBQXlCO2lCQUNoRCxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLDhCQUE4QjtpQkFDekQsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLGtEQUFrRDtZQUU3RSxzREFBc0Q7WUFDdEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBRS9CLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsT0FBTyxNQUFNLENBQUM7UUFDZixDQUFDO0tBQ0Q7Q0FDRCxDQUFDO0FBc0JGLE1BQWEsUUFBUTtJQUtwQjs7OztPQUlHO0lBQ0gsWUFBWSxHQUFhLEVBQUUsVUFBMkIsRUFBRTtRQUN2RCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNKLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVwQyxnRUFBZ0U7UUFDaEUsTUFBTSxhQUFhLEdBQUcsNEJBQWlCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sUUFBUSxHQUFHLDRCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXBFLElBQUksQ0FBQztZQUNKLGlEQUFpRDtZQUNqRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTFELDBFQUEwRTtZQUMxRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVuRCxpQkFBaUI7WUFDakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFhLENBQUM7WUFFbkQsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFNUMsb0JBQW9CO1lBQ3BCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNsQixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2xDLHFDQUNDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQzdCLFFBQVEsS0FDWCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFDbkQsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUN6QztZQUNILENBQUM7WUFFRCx3REFBd0Q7WUFDeEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztZQUUzQyxvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUIsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzlFLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVsQyxxQ0FDQyxPQUFPLElBQ0osUUFBUSxLQUNYLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQ3pDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0QsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2xDLHFDQUNDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQzdCLFFBQVEsS0FDWCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFDbkQsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUN6QztRQUNILENBQUM7SUFDRixDQUFDO0lBRU8sVUFBVSxDQUFDLE9BQWU7UUFDakMsK0NBQStDO1FBQy9DLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFFNUIsOENBQThDO1FBQzlDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUk7YUFDaEIsSUFBSSxFQUFFO2FBQ04sT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyw0Q0FBNEM7YUFDakUsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkI7UUFFOUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrRkFBa0Y7SUFDMUUsSUFBSSxDQUFDLEdBQUcsSUFBVztRQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDRixDQUFDO0lBRU8scUJBQXFCLENBQUMsR0FBYTtRQUMxQyxNQUFNLFlBQVksR0FBa0IsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sYUFBYSxHQUFHLHlCQUF5QixDQUFDO1FBRWhELElBQUksQ0FBQztZQUNKLDBDQUEwQztZQUMxQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pELElBQUksQ0FBQztvQkFDSixzQ0FBc0M7b0JBQ3RDLEtBQUssQ0FBQyxRQUFRLENBQUM7b0JBQ2YsT0FBTyxJQUFJLENBQUM7Z0JBQ2IsQ0FBQztnQkFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO29CQUNaLDhDQUE4QztvQkFDOUMsSUFBSSxDQUFDLFlBQVksWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssZUFBZSxFQUFFLENBQUM7d0JBQzdELE9BQU8sS0FBSyxDQUFDO29CQUNkLENBQUM7b0JBQ0QsTUFBTSxDQUFDLENBQUM7Z0JBQ1QsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsc0NBQXNDO1lBQ3RDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQztvQkFDSixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzt5QkFDL0IsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUF3QixFQUFFLENBQ3RDLElBQUksWUFBWSxZQUFZO3dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FDeEMsQ0FBQztnQkFDSixDQUFDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ1osSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMseUNBQXlDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzVELENBQUM7b0JBQ0QsT0FBTyxFQUFFLENBQUM7Z0JBQ1gsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsMkNBQTJDO1lBQzNDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLEtBQUssRUFBRSxDQUFDO29CQUNYLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFcEMsSUFBSSxZQUFZLElBQUksUUFBUSxFQUFFLENBQUM7d0JBQzlCLGdDQUFnQzt3QkFDaEMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzZCQUMxQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQXFCLEVBQUUsQ0FBQyxDQUFDLFlBQVksWUFBWSxDQUFDLENBQUM7d0JBRTlELFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQzVCLElBQUksQ0FBQztnQ0FDSixZQUFZLENBQUMsSUFBSSxDQUFDO29DQUNqQixRQUFRLEVBQUUsT0FBTyxDQUFDLFlBQVk7b0NBQzlCLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU87aUNBQzdCLENBQUMsQ0FBQzs0QkFDSixDQUFDOzRCQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0NBQ1osSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0NBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUNBQXVDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQzFELENBQUM7NEJBQ0YsQ0FBQzt3QkFDRixDQUFDLENBQUMsQ0FBQztvQkFDSixDQUFDO2dCQUNGLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDckIsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEdBQWEsRUFBRSxZQUEyQjtRQUNuRSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFckIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDO2dCQUNKLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDMUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQzNCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxNQUFNLENBQzlDLENBQUM7b0JBQ0YsWUFBWSxFQUFFLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUscUNBQXFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9FLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUVKLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxHQUFhO1FBQ3pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQVcsQ0FBQztRQUU1Qyx5REFBeUQ7UUFDekQsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdEUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELEtBQUssSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDO1FBRS9CLHNEQUFzRDtRQUN0RCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQ3RDLEdBQUcsQ0FBQyxJQUFJLEVBQ1IsVUFBVSxDQUFDLFlBQVksRUFDdkI7WUFDQyxVQUFVLEVBQUUsQ0FBQyxJQUFhLEVBQUUsRUFBRTtnQkFDN0IsMkNBQTJDO2dCQUMzQyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNoQyxPQUFPLFVBQVUsQ0FBQyxhQUFhLENBQUM7Z0JBQ2pDLENBQUM7Z0JBQ0QsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ2pDLENBQUM7U0FDRCxDQUNELENBQUM7UUFFRiwyQkFBMkI7UUFDM0IsTUFBTSxRQUFRLEdBQWMsRUFBRSxDQUFDO1FBQy9CLElBQUksV0FBMkIsQ0FBQztRQUNoQyxPQUFPLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFhLEVBQUUsQ0FBQztZQUN2RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRCx5REFBeUQ7UUFDekQsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUN0RCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7WUFFaEQseUNBQXlDO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUU1RCwwQ0FBMEM7WUFDMUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDaEMsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxJQUNDLGFBQWEsQ0FBQyxPQUFPLEtBQUssTUFBTTtvQkFDaEMsYUFBYSxDQUFDLFVBQVUsS0FBSyxRQUFRO29CQUNyQyxhQUFhLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFDNUIsQ0FBQztvQkFDRixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlCLEtBQUssRUFBRSxDQUFDO2dCQUNULENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCwrQ0FBK0M7UUFDL0MsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU8sYUFBYSxDQUFDLEdBQWE7UUFDbEMsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLG1DQUFtQztRQUNuQyxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUFXLENBQUM7UUFFNUMsa0RBQWtEO1FBQ2xELE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUMxQixJQUFJLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxVQUFVLEVBQUUsQ0FBQztnQkFDcEIsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixrQkFBa0IsRUFBRSxDQUFDO1lBQ3RCLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILDZFQUE2RTtRQUM3RSxNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXRELG9FQUFvRTtRQUNwRSxNQUFNLGlCQUFpQixHQUFHLGdEQUFnRCxDQUFDO1FBQzNFLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTVELHVDQUF1QztRQUN2QyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLHFDQUFxQztZQUNyQyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUM5QixPQUFPO1lBQ1IsQ0FBQztZQUVELCtEQUErRDtZQUMvRCxNQUFNLEtBQUssR0FBRztnQkFDYixFQUFFLENBQUMsU0FBUyxJQUFJLE9BQU8sRUFBRSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRTtnQkFDWCxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDaEMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO2FBQ2hDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTFCLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ25CLE9BQU87WUFDUixDQUFDO1lBRUQsa0RBQWtEO1lBQ2xELElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUM5QixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLG9CQUFvQixFQUFFLENBQUM7WUFDeEIsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsaURBQWlEO1FBQ2pELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFO1lBQ3RDLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsZ0JBQWdCLEVBQUUsb0JBQW9CO1lBQ3RDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJO1lBQzVCLGNBQWMsRUFBRSxHQUFHLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUN2RCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8sWUFBWSxDQUFDLE9BQWdCLEVBQUUsUUFBMEI7UUFDaEUsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqQyxpRUFBaUU7UUFDakUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbkMsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUvQiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxDLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdEMsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsQywyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxPQUFnQjtRQUM5QyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFckIsTUFBTSxlQUFlLEdBQUcsQ0FBQyxFQUFXLEVBQVcsRUFBRTtZQUNoRCw2REFBNkQ7WUFDN0QsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFFN0IsOEJBQThCO1lBQzlCLE9BQU8sT0FBTyxFQUFFLENBQUM7Z0JBQ2hCLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3pDLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztnQkFDMUMsQ0FBQztxQkFBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNuRCxtREFBbUQ7b0JBQ25ELFdBQVcsSUFBSyxPQUFtQixDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7Z0JBQ3ZELENBQUM7Z0JBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDL0IsQ0FBQztZQUVELDREQUE0RDtZQUM1RCxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUN4QixPQUFPLElBQUksQ0FBQztZQUNiLENBQUM7WUFFRCwwREFBMEQ7WUFDMUQscUNBQXFDO1lBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDaEMsSUFBSSxNQUFNLElBQUksTUFBTSxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUNsQyxPQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUM7UUFFRiwwQ0FBMEM7UUFDMUMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUM3RSxPQUFPLEVBQUUsQ0FBQztRQUVaLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUMvQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2pCLFlBQVksRUFBRSxDQUFDO1lBQ2hCLENBQUM7aUJBQU0sQ0FBQztnQkFDUCwrREFBK0Q7Z0JBQy9ELE9BQU87WUFDUixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDRixDQUFDO0lBRU8sY0FBYyxDQUFDLE9BQWdCLEVBQUUsS0FBYTs7UUFDckQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9DLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFOztZQUM1QixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUM1QiwwQkFBMEI7WUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDdkMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0gsUUFBRSxDQUFDLFVBQVUsMENBQUUsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILHNDQUFzQztRQUN0QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLFdBQVcsR0FBRyxjQUFPLENBQUMsV0FBVywwQ0FBRSxJQUFJLEdBQUcsV0FBVyxFQUFFLEtBQUksRUFBRSxDQUFDO1lBQ3BFLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuRCxJQUFJLGVBQWUsSUFBSSxlQUFlLEtBQUssV0FBVyxFQUFFLENBQUM7Z0JBQ3hELE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQixDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxPQUFnQjtRQUMxQyxNQUFNLFFBQVEsR0FBYyxFQUFFLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUN2QyxPQUFPLEVBQ1AsVUFBVSxDQUFDLFlBQVksRUFDdkIsSUFBSSxDQUNKLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQztRQUNULE9BQU8sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBZSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVPLHVCQUF1QixDQUFDLE9BQWdCO1FBQy9DLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztRQUV2QixNQUFNLGNBQWMsR0FBRyxDQUFDLEVBQVcsRUFBRSxFQUFFO1lBQ3RDLG9EQUFvRDtZQUNwRCxJQUFJLEVBQUUsWUFBWSxVQUFVLEVBQUUsQ0FBQztnQkFDOUIsT0FBTztZQUNSLENBQUM7WUFFRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU3QyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO29CQUN4RSxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsY0FBYyxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLG1CQUFtQixDQUFDLE9BQWdCO1FBQzNDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXhCLE9BQU8sWUFBWSxFQUFFLENBQUM7WUFDckIsVUFBVSxFQUFFLENBQUM7WUFDYixZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLGdFQUFnRTtZQUNoRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQzFELE9BQU8sS0FBSyxDQUFDO2dCQUNkLENBQUM7Z0JBRUQsaURBQWlEO2dCQUNqRCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLDZCQUE2QjtnQkFFN0UsOENBQThDO2dCQUM5QyxNQUFNLGFBQWEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7b0JBQ3hDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN2QyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQzs0QkFDeEMsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3JFLENBQUM7d0JBQ0QsT0FBTyxLQUFLLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFTCxPQUFPLGlCQUFpQixJQUFJLENBQUMsT0FBTyxJQUFJLGFBQWEsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDOUIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDMUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNaLFlBQVksRUFBRSxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztnQkFDSCxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLENBQUM7UUFDRixDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNwQyxLQUFLLEVBQUUsWUFBWTtZQUNuQixVQUFVO1NBQ1YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVPLGtCQUFrQixDQUN6QixjQUFzQixFQUN0QixPQUF5QixFQUN6QixJQUFjO1FBRWQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUMvQixPQUFPLENBQUMsRUFBRSxHQUFHLE1BQU0sY0FBYyxFQUFFLENBQUM7UUFFcEMsaUJBQWlCO1FBQ2pCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDakMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxTQUFTLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUM5QixPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7YUFBTSxDQUFDO1lBQ1Asc0NBQXNDO1lBQ3RDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUM3QixnREFBZ0Q7Z0JBQ2hELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztnQkFDeEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxDQUFDO2lCQUFNLENBQUM7Z0JBQ1AsMkJBQTJCO2dCQUMzQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUN0QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQzdCLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUM7UUFFRCx3Q0FBd0M7UUFDeEMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQU8sQ0FBQztRQUN6RSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzdCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7WUFDckMsUUFBUSxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztZQUN4QyxRQUFRLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM3QixRQUFRLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQztZQUMzQixDQUFDO1lBQ0QsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUN4QyxNQUFNLFNBQVMsR0FBdUIsRUFBRSxDQUFDO1FBQ3pDLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDLENBQUMsc0JBQXNCO1FBRTlELDBEQUEwRDtRQUMxRCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN4RSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLHVEQUF1RDtZQUN2RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsbURBQW1ELENBQUMsRUFBRSxDQUFDO2dCQUN2RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ3ZCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDNUQsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQ2pDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRzs0QkFDMUIsT0FBTyxFQUFFLE9BQU87NEJBQ2hCLFVBQVUsRUFBRSxFQUFFOzRCQUNkLElBQUksRUFBRSxFQUFFO3lCQUNSLENBQUM7d0JBQ0YsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDckIsYUFBYSxFQUFFLENBQUM7b0JBQ2pCLENBQUM7Z0JBQ0YsQ0FBQztnQkFDRCxPQUFPO1lBQ1IsQ0FBQztZQUVELDRDQUE0QztZQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUNoRSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFOztnQkFDbEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNaLElBQUksT0FBTyxHQUFtQixJQUFJLENBQUM7Z0JBRW5DLHlDQUF5QztnQkFDekMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxrQkFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEVBQUUsMENBQUUsV0FBVyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNyRCxFQUFFLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkMscURBQXFEO29CQUNyRCxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ3hFLElBQUksZUFBZSxFQUFFLENBQUM7d0JBQ3JCLE9BQU8sR0FBRyxlQUFlLENBQUM7b0JBQzNCLENBQUM7Z0JBQ0YsQ0FBQztxQkFBTSxDQUFDO29CQUNQLGtDQUFrQztvQkFDbEMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUMvQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNqRCxDQUFDO3lCQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzt3QkFDbEQsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDN0MsQ0FBQzt5QkFBTSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ2pELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzVDLGFBQWE7b0JBQ2IsQ0FBQzt5QkFBTSxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQzt3QkFDNUMsRUFBRSxHQUFHLGVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLDBDQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLDBDQUFFLFdBQVcsRUFBRSxLQUFJLEVBQUUsQ0FBQztvQkFDL0UsQ0FBQzt5QkFBTSxDQUFDO3dCQUNQLE1BQU0sS0FBSyxHQUFHLFFBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSwwQ0FBRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDOUQsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMzRCxDQUFDO29CQUNELE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDakMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHO3dCQUMxQixPQUFPLEVBQUUsT0FBTyxJQUFJLEVBQUU7d0JBQ3RCLFVBQVUsRUFBRSxFQUFFO3dCQUNkLElBQUksRUFBRSxFQUFFO3FCQUNSLENBQUM7b0JBQ0YsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDckIsYUFBYSxFQUFFLENBQUM7Z0JBQ2pCLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUVPLDBCQUEwQixDQUFDLEVBQVc7UUFDN0MsSUFBSSxPQUFPLEdBQW1CLEVBQUUsQ0FBQztRQUNqQyxJQUFJLE1BQU0sR0FBbUIsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUU5QyxrRUFBa0U7UUFDbEUsT0FBTyxNQUFNLElBQUksQ0FDaEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNO1lBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxDQUN0QyxFQUFFLENBQUM7WUFDSCxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2pCLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQy9CLENBQUM7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBRUQseUVBQXlFO0lBQ3pFLHFEQUFxRDtJQUM3Qyx1QkFBdUIsQ0FBQyxjQUFzQixFQUFFLEtBQWE7UUFDcEUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNmLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDO0lBRU8sb0JBQW9CLENBQUMsT0FBZ0I7UUFDNUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpELHVEQUF1RDtRQUN2RCxNQUFNLHdCQUF3QixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRXRGLCtDQUErQztRQUMvQyxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBc0IsQ0FBQztRQUVoRCx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7O1lBQ3JDLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxXQUFXLENBQUM7Z0JBQUUsT0FBTztZQUV6QyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBRXpCLDRDQUE0QztZQUM1QyxhQUFhO1lBQ2IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztnQkFDckMsVUFBVSxHQUFHLFNBQUUsQ0FBQyxXQUFXLDBDQUFFLElBQUksRUFBRSxLQUFJLEVBQUUsQ0FBQztnQkFDM0MsY0FBYztZQUNkLENBQUM7aUJBQU0sSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsQ0FBQztnQkFDbEQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDWixVQUFVLEdBQUcsTUFBTSxDQUFDO2dCQUNyQixDQUFDO3FCQUFNLENBQUM7b0JBQ1AsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDckMsSUFBSSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ2pDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDekMsQ0FBQztnQkFDRixDQUFDO2dCQUNGLFdBQVc7WUFDWCxDQUFDO2lCQUFNLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxxREFBcUQsQ0FBQyxFQUFFLENBQUM7Z0JBQzlFLE1BQU0sRUFBRSxHQUFHLFNBQUUsQ0FBQyxFQUFFLDBDQUFFLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsS0FBSSxFQUFFLENBQUM7Z0JBQ3hELElBQUksRUFBRSxFQUFFLENBQUM7b0JBQ1IsVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQztnQkFDRixRQUFRO1lBQ1IsQ0FBQztpQkFBTSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztnQkFDeEMsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2QyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNWLE1BQU0sS0FBSyxHQUFHLFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLDBDQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDNUQsSUFBSSxLQUFLLEVBQUUsQ0FBQzs0QkFDWCxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNyQyxDQUFDO29CQUNGLENBQUM7Z0JBQ0YsQ0FBQztZQUNGLENBQUM7aUJBQU0sSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3hDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7O29CQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2QyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNWLE1BQU0sS0FBSyxHQUFHLFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLDBDQUFFLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLEtBQUssRUFBRSxDQUFDOzRCQUNYLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ3JDLENBQUM7b0JBQ0YsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7aUJBQU0sSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztnQkFDNUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4RCxDQUFDO2lCQUFNLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pDLFVBQVUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckQsQ0FBQztpQkFBTSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRSxDQUFDO2dCQUNsRCxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4RCxDQUFDO2lCQUFNLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7Z0JBQzdDLFVBQVUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2RCxlQUFlLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsRSxDQUFDO2lCQUFNLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO2dCQUNyQyxVQUFVLEdBQUcsU0FBRSxDQUFDLFdBQVcsMENBQUUsSUFBSSxFQUFFLEtBQUksRUFBRSxDQUFDO2dCQUMxQyxlQUFlLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakQsQ0FBQztpQkFBTSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO2dCQUN6QyxVQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZELENBQUM7aUJBQU0sQ0FBQztnQkFDUCx1QkFBdUI7Z0JBQ3ZCLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ1YsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3BDLFVBQVUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQy9CLENBQUM7WUFDRixDQUFDO1lBRUQsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDaEIsdURBQXVEO2dCQUN2RCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDbkQsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQzNELENBQUM7Z0JBRUYsSUFBSSxhQUFhLEVBQUUsQ0FBQztvQkFDbkIsTUFBTSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsR0FBRyxhQUFhLENBQUM7b0JBRXJELCtCQUErQjtvQkFDL0IsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLFNBQVMsY0FBYyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQzNELFNBQVMsY0FBYyxFQUFFLENBQUM7b0JBRTNCLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUU5Qiw2Q0FBNkM7b0JBQzdDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFdEQsMENBQTBDO29CQUMxQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFFLENBQUM7d0JBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7NEJBQy9CLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUM5QixDQUFDO3dCQUNELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFFLENBQUM7d0JBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxDQUFDO3lCQUFNLENBQUM7d0JBQ1AsaUNBQWlDO3dCQUNqQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDNUUsQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsNEJBQTRCO1FBQzVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUMzQix3REFBd0Q7Z0JBQ3hELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUVuRCw0Q0FBNEM7Z0JBQzVDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQ2pDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BDLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ1YsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDMUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUNoQixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDM0IsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztnQkFFSCxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILHdDQUF3QztRQUN4QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakQsaUNBQWlDO1FBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQ3RDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFDaEIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsSUFBSSxDQUNULENBQUM7WUFDRixXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsaUNBQWlDO1FBQ2pDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3hFLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUU3Qyw2REFBNkQ7UUFDN0QsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNyQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNGLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUN4QyxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDdkIsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFFL0UsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksZ0JBQWdCLENBQUM7Z0JBQUUsT0FBTztZQUUvQyxrQkFBa0I7WUFDbEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDekIsR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7Z0JBQ2xCLGNBQWMsRUFBRSxDQUFDO1lBQ2xCLENBQUM7WUFFRCxxQkFBcUI7WUFDckIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNuRCxJQUFJLFVBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDL0IsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7Z0JBQ3hCLGNBQWMsRUFBRSxDQUFDO1lBQ2xCLENBQUM7WUFFRCxxREFBcUQ7WUFDckQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLEdBQUcsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN0QyxHQUFHLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxPQUFnQjtRQUMzQyxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFFdkIsa0RBQWtEO1FBQ2xELDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNwQixvRUFBb0U7b0JBQ3BFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3ZDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzVCLGNBQWMsRUFBRSxDQUFDO2dCQUNsQixDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILGdDQUFnQztRQUNoQyxNQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyRSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDaEMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBRXJCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDckIsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxpQ0FBaUMsT0FBTyxFQUFFLENBQUM7WUFDeEQsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLHNCQUFzQixDQUFDO1lBQ3ZFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxLQUFLLEdBQUcscUdBQXFHLENBQUM7WUFDckgsTUFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUzQyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLGNBQWMsRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBRUgsMERBQTBEO1FBRTFELElBQUksQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGtDQUFrQztJQUMxQixlQUFlLENBQUMsR0FBYTtRQUNwQyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDekIsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUN0QyxNQUFNLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDcEMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLHVEQUF1RDtRQUN2RCxNQUFNLFFBQVEsR0FBRztZQUNoQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEIsMERBQTBEO1lBQzFELElBQUksT0FBTyxZQUFZLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3pDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztvQkFDaEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO29CQUN0QyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztvQkFDaEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNoQixDQUFDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUMzQixPQUFPLFdBQVcsQ0FBQztRQUNwQixDQUFDO1FBRUQsd0RBQXdEO1FBQ3hELE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLE9BQU87WUFDUCxnQ0FBZ0M7WUFDaEMsWUFBWSxFQUFFLE9BQU8sWUFBWSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RSxhQUFhLEVBQUUsT0FBTyxZQUFZLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlFLFNBQVMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDekQsVUFBVSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQztTQUMzRCxDQUFDLENBQUMsQ0FBQztRQUVKLGtFQUFrRTtRQUNsRSxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQzFELE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUM7Z0JBQ0osMENBQTBDO2dCQUMxQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO2dCQUUxRSxvQ0FBb0M7Z0JBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUU7O29CQUNwQyxJQUFJLENBQUM7d0JBQ0osTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM1QixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRTFCLHdDQUF3Qzt3QkFDeEMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzt3QkFDbEMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUM7NEJBQ3hCLFVBQVUsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsMENBQUcsQ0FBQyxDQUFDLEtBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFN0QsaUNBQWlDO3dCQUNqQyxNQUFNLE1BQU0sR0FBRzs0QkFDZCxXQUFXLENBQUMsWUFBWTs0QkFDeEIsV0FBVyxDQUFDLFNBQVM7NEJBQ3JCLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLO3lCQUNsQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBRXBELE1BQU0sT0FBTyxHQUFHOzRCQUNmLFdBQVcsQ0FBQyxhQUFhOzRCQUN6QixXQUFXLENBQUMsVUFBVTs0QkFDdEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDOzRCQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUs7eUJBQ25CLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFFcEQscUNBQXFDO3dCQUNyQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7NEJBQzdDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQzs0QkFDM0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDOzRCQUU3QyxJQUFJLGNBQWMsR0FBRyxhQUFhLElBQUksZUFBZSxHQUFHLGFBQWEsRUFBRSxDQUFDO2dDQUN2RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUNsRSxJQUFJLFVBQVUsRUFBRSxDQUFDO29DQUNoQixXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29DQUM1QixjQUFjLEVBQUUsQ0FBQztnQ0FDbEIsQ0FBQzs0QkFDRixDQUFDO3dCQUNGLENBQUM7b0JBQ0YsQ0FBQztvQkFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO3dCQUNaLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLGlEQUFpRCxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNwRSxDQUFDO29CQUNGLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDO1lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDWixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDO1FBRUQsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDbEMsS0FBSyxFQUFFLGNBQWM7WUFDckIsYUFBYSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1lBQzlCLGNBQWMsRUFBRSxHQUFHLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUN2RCxDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRU8saUJBQWlCLENBQUMsR0FBYSxFQUFFLFdBQXdCO1FBQ2hFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUVyQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN0QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RELElBQUksVUFBVSxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDL0MsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNqQixZQUFZLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxPQUFnQjtRQUM1Qyw2REFBNkQ7UUFDN0QsSUFBSSxPQUFPLFlBQVksZ0JBQWdCLEVBQUUsQ0FBQztZQUN6QyxrRUFBa0U7WUFDbEUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRCxJQUFJLE9BQU87Z0JBQUUsT0FBTyxPQUFPLE9BQU8sRUFBRSxDQUFDO1lBRXJDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1lBQzlCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1lBQ3BDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFdkQsSUFBSSxHQUFHO2dCQUFFLE9BQU8sT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUM3QixJQUFJLE1BQU07Z0JBQUUsT0FBTyxVQUFVLE1BQU0sRUFBRSxDQUFDO1lBQ3RDLElBQUksVUFBVTtnQkFBRSxPQUFPLFVBQVUsVUFBVSxFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUVELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQzVCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQzFDLE1BQU0sT0FBTyxHQUFHLE9BQU8sWUFBWSxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFM0YsSUFBSSxFQUFFO1lBQUUsT0FBTyxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBQzFCLElBQUksT0FBTztZQUFFLE9BQU8sV0FBVyxPQUFPLEVBQUUsQ0FBQztRQUN6QyxJQUFJLFNBQVM7WUFBRSxPQUFPLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFFM0MsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRU8sZUFBZSxDQUFDLEdBQWE7UUFFcEMsd0NBQXdDO1FBQ3hDLE1BQU0sVUFBVSxHQUEwQyxFQUFFLENBQUM7UUFFN0Qsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMxQix1REFBdUQ7Z0JBQ3ZELElBQUksS0FBSyxHQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFFdkQsc0NBQXNDO2dCQUN0QyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFcEMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDN0Isc0NBQXNDO1lBQ3RDLHdFQUF3RTtZQUN4RSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsMkJBQTJCO1FBQzNCLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRCxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPO2dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzVDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSzthQUNkLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDO1FBRUQsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQzlCLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxHQUFhO1FBQ3pDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsT0FBTyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzdELENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxPQUFnQjtRQUMxQyxNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7UUFDM0IsSUFBSSxPQUFPLEdBQW1CLE9BQU8sQ0FBQztRQUV0QyxPQUFPLE9BQU8sSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4RCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzdDLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNoQixRQUFRLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDOUIsQ0FBQztpQkFBTSxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxPQUFPLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUN2RSxRQUFRLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRSxDQUFDO1lBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUNqQyxDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyxhQUFhLENBQUMsR0FBYTtRQUNsQyxNQUFNLFVBQVUsR0FBbUIsRUFBRSxDQUFDO1FBRXRDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtnQkFDdEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTyxZQUFZLENBQUMsT0FBZ0I7UUFDcEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWQsb0NBQW9DO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxPQUFPLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQzdFLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN0QyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFdEQseUJBQXlCO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTlDLDhCQUE4QjtRQUM5QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsV0FBQyxVQUFHLEdBQUcsQ0FBQyxXQUFJLENBQUMsV0FBVywwQ0FBRSxNQUFNLEtBQUksQ0FBQyxDQUFDLEtBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkcsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUN2QixLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUVELGlEQUFpRDtRQUNqRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzVELEtBQUssSUFBSSxVQUFVLENBQUM7UUFFcEIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMxRCxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpDLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztDQUNEO0FBMW9DRCw0QkEwb0NDOzs7Ozs7O1VDcHRFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBLDREQUFzQztBQUE3Qiw2R0FBUSIsInNvdXJjZXMiOlsid2VicGFjazovL0RlZnVkZGxlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9tZXRhZGF0YS50cyIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9kZWZ1ZGRsZS50cyIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWZ1ZGRsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWZ1ZGRsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsICgpID0+IHtcbnJldHVybiAiLCJpbXBvcnQgeyBEZWZ1ZGRsZU1ldGFkYXRhIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUV4dHJhY3RvciB7XG5cdHN0YXRpYyBleHRyYWN0KGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IERlZnVkZGxlTWV0YWRhdGEge1xuXHRcdGxldCBkb21haW4gPSAnJztcblx0XHRsZXQgdXJsID0gJyc7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gVHJ5IHRvIGdldCBVUkwgZnJvbSBkb2N1bWVudCBsb2NhdGlvblxuXHRcdFx0dXJsID0gZG9jLmxvY2F0aW9uPy5ocmVmIHx8ICcnO1xuXHRcdFx0XG5cdFx0XHQvLyBJZiBubyBVUkwgZnJvbSBsb2NhdGlvbiwgdHJ5IG90aGVyIHNvdXJjZXNcblx0XHRcdGlmICghdXJsKSB7XG5cdFx0XHRcdHVybCA9IHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6dXJsXCIpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJ0d2l0dGVyOnVybFwiKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAndXJsJykgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ21haW5FbnRpdHlPZlBhZ2UudXJsJykgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ21haW5FbnRpdHkudXJsJykgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ1dlYlNpdGUudXJsJykgfHxcblx0XHRcdFx0XHRkb2MucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJjYW5vbmljYWxcIl0nKT8uZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh1cmwpIHtcblx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gSWYgVVJMIHBhcnNpbmcgZmFpbHMsIHRyeSB0byBnZXQgZnJvbSBiYXNlIHRhZ1xuXHRcdFx0Y29uc3QgYmFzZVRhZyA9IGRvYy5xdWVyeVNlbGVjdG9yKCdiYXNlW2hyZWZdJyk7XG5cdFx0XHRpZiAoYmFzZVRhZykge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHVybCA9IGJhc2VUYWcuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBwYXJzZSBiYXNlIFVSTDonLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy5nZXRUaXRsZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuZ2V0RGVzY3JpcHRpb24oZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdGRvbWFpbixcblx0XHRcdGZhdmljb246IHRoaXMuZ2V0RmF2aWNvbihkb2MsIHVybCksXG5cdFx0XHRpbWFnZTogdGhpcy5nZXRJbWFnZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0cHVibGlzaGVkOiB0aGlzLmdldFB1Ymxpc2hlZChkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0YXV0aG9yOiB0aGlzLmdldEF1dGhvcihkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0c2l0ZTogdGhpcy5nZXRTaXRlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRzY2hlbWFPcmdEYXRhLFxuXHRcdFx0d29yZENvdW50OiAwLFxuXHRcdFx0cGFyc2VUaW1lOiAwXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEF1dGhvcihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2F1dGhvci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYnlsXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXV0aG9yTGlzdFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImNvcHlyaWdodFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdjb3B5cmlnaHRIb2xkZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnNpdGVfbmFtZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdwdWJsaXNoZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3NvdXJjZU9yZ2FuaXphdGlvbi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnaXNQYXJ0T2YubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjpjcmVhdG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXBwbGljYXRpb24tbmFtZVwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0U2l0ZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3B1Ymxpc2hlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6c2l0ZV9uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3NvdXJjZU9yZ2FuaXphdGlvbi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJjb3B5cmlnaHRcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnY29weXJpZ2h0SG9sZGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdpc1BhcnRPZi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhcHBsaWNhdGlvbi1uYW1lXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRUaXRsZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjp0aXRsZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdoZWFkbGluZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidGl0bGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS50aXRsZVwiKSB8fFxuXHRcdFx0ZG9jLnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJyk/LnRleHRDb250ZW50Py50cmltKCkgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldERlc2NyaXB0aW9uKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdkZXNjcmlwdGlvbicpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjpkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmRlc2NyaXB0aW9uXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRJbWFnZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOmltYWdlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjppbWFnZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdpbWFnZS51cmwnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmltYWdlLmZ1bGxcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEZhdmljb24oZG9jOiBEb2N1bWVudCwgYmFzZVVybDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBpY29uRnJvbU1ldGEgPSB0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOmltYWdlOmZhdmljb25cIik7XG5cdFx0aWYgKGljb25Gcm9tTWV0YSkgcmV0dXJuIGljb25Gcm9tTWV0YTtcblxuXHRcdGNvbnN0IGljb25MaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0naWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChpY29uTGluaykgcmV0dXJuIGljb25MaW5rO1xuXG5cdFx0Y29uc3Qgc2hvcnRjdXRMaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0nc2hvcnRjdXQgaWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChzaG9ydGN1dExpbmspIHJldHVybiBzaG9ydGN1dExpbms7XG5cblx0XHQvLyBPbmx5IHRyeSB0byBjb25zdHJ1Y3QgZmF2aWNvbiBVUkwgaWYgd2UgaGF2ZSBhIHZhbGlkIGJhc2UgVVJMXG5cdFx0aWYgKGJhc2VVcmwpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVVJMKFwiL2Zhdmljb24uaWNvXCIsIGJhc2VVcmwpLmhyZWY7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybignRmFpbGVkIHRvIGNvbnN0cnVjdCBmYXZpY29uIFVSTDonLCBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRQdWJsaXNoZWQoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdkYXRlUHVibGlzaGVkJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJwdWJsaXNoRGF0ZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJhcnRpY2xlOnB1Ymxpc2hlZF90aW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFRpbWVFbGVtZW50KGRvYykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5kYXRlXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRNZXRhQ29udGVudChkb2M6IERvY3VtZW50LCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHNlbGVjdG9yID0gYG1ldGFbJHthdHRyfV1gO1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcblx0XHRcdC5maW5kKGVsID0+IGVsLmdldEF0dHJpYnV0ZShhdHRyKT8udG9Mb3dlckNhc2UoKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKSk7XG5cdFx0Y29uc3QgY29udGVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik/LnRyaW0oKSA/PyBcIlwiIDogXCJcIjtcblx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoY29udGVudCwgZG9jKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFRpbWVFbGVtZW50KGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHNlbGVjdG9yID0gYHRpbWVgO1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlbMF07XG5cdFx0Y29uc3QgY29udGVudCA9IGVsZW1lbnQgPyAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRldGltZVwiKT8udHJpbSgpID8/IGVsZW1lbnQudGV4dENvbnRlbnQ/LnRyaW0oKSA/PyBcIlwiKSA6IFwiXCI7XG5cdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGNvbnRlbnQsIGRvYyk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBkZWNvZGVIVE1MRW50aXRpZXModGV4dDogc3RyaW5nLCBkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCB0ZXh0YXJlYSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuXHRcdHRleHRhcmVhLmlubmVySFRNTCA9IHRleHQ7XG5cdFx0cmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0U2NoZW1hUHJvcGVydHkoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55LCBwcm9wZXJ0eTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcblx0XHRpZiAoIXNjaGVtYU9yZ0RhdGEpIHJldHVybiBkZWZhdWx0VmFsdWU7XG5cblx0XHRjb25zdCBzZWFyY2hTY2hlbWEgPSAoZGF0YTogYW55LCBwcm9wczogc3RyaW5nW10sIGZ1bGxQYXRoOiBzdHJpbmcsIGlzRXhhY3RNYXRjaDogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmdbXSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wcy5sZW5ndGggPT09IDAgPyBbZGF0YV0gOiBbXTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG5cdFx0XHRcdGNvbnN0IGN1cnJlbnRQcm9wID0gcHJvcHNbMF07XG5cdFx0XHRcdGlmICgvXlxcW1xcZCtcXF0kLy50ZXN0KGN1cnJlbnRQcm9wKSkge1xuXHRcdFx0XHRcdGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoY3VycmVudFByb3Auc2xpY2UoMSwgLTEpKTtcblx0XHRcdFx0XHRpZiAoZGF0YVtpbmRleF0pIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWFyY2hTY2hlbWEoZGF0YVtpbmRleF0sIHByb3BzLnNsaWNlKDEpLCBmdWxsUGF0aCwgaXNFeGFjdE1hdGNoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAocHJvcHMubGVuZ3RoID09PSAwICYmIGRhdGEuZXZlcnkoaXRlbSA9PiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGl0ZW0gPT09ICdudW1iZXInKSkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhLm1hcChTdHJpbmcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gZGF0YS5mbGF0TWFwKGl0ZW0gPT4gc2VhcmNoU2NoZW1hKGl0ZW0sIHByb3BzLCBmdWxsUGF0aCwgaXNFeGFjdE1hdGNoKSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IFtjdXJyZW50UHJvcCwgLi4ucmVtYWluaW5nUHJvcHNdID0gcHJvcHM7XG5cdFx0XHRcblx0XHRcdGlmICghY3VycmVudFByb3ApIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykgcmV0dXJuIFtkYXRhXTtcblx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiBkYXRhLm5hbWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gW2RhdGEubmFtZV07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShjdXJyZW50UHJvcCkpIHtcblx0XHRcdFx0cmV0dXJuIHNlYXJjaFNjaGVtYShkYXRhW2N1cnJlbnRQcm9wXSwgcmVtYWluaW5nUHJvcHMsIFxuXHRcdFx0XHRcdGZ1bGxQYXRoID8gYCR7ZnVsbFBhdGh9LiR7Y3VycmVudFByb3B9YCA6IGN1cnJlbnRQcm9wLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFpc0V4YWN0TWF0Y2gpIHtcblx0XHRcdFx0Y29uc3QgbmVzdGVkUmVzdWx0czogc3RyaW5nW10gPSBbXTtcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgZGF0YVtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVzdWx0cyA9IHNlYXJjaFNjaGVtYShkYXRhW2tleV0sIHByb3BzLCBcblx0XHRcdFx0XHRcdFx0ZnVsbFBhdGggPyBgJHtmdWxsUGF0aH0uJHtrZXl9YCA6IGtleSwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0bmVzdGVkUmVzdWx0cy5wdXNoKC4uLnJlc3VsdHMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobmVzdGVkUmVzdWx0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5lc3RlZFJlc3VsdHM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0bGV0IHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoc2NoZW1hT3JnRGF0YSwgcHJvcGVydHkuc3BsaXQoJy4nKSwgJycsIHRydWUpO1xuXHRcdFx0aWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoc2NoZW1hT3JnRGF0YSwgcHJvcGVydHkuc3BsaXQoJy4nKSwgJycsIGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHJlc3VsdCA9IHJlc3VsdHMubGVuZ3RoID4gMCA/IHJlc3VsdHMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywgJykgOiBkZWZhdWx0VmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMocmVzdWx0LCBkb2MpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciBpbiBnZXRTY2hlbWFQcm9wZXJ0eSBmb3IgJHtwcm9wZXJ0eX06YCwgZXJyb3IpO1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZXh0cmFjdFNjaGVtYU9yZ0RhdGEoZG9jOiBEb2N1bWVudCk6IGFueSB7XG5cdFx0Y29uc3Qgc2NoZW1hU2NyaXB0cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKTtcblx0XHRjb25zdCBzY2hlbWFEYXRhOiBhbnlbXSA9IFtdO1xuXG5cdFx0c2NoZW1hU2NyaXB0cy5mb3JFYWNoKHNjcmlwdCA9PiB7XG5cdFx0XHRsZXQganNvbkNvbnRlbnQgPSBzY3JpcHQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGpzb25Db250ZW50ID0ganNvbkNvbnRlbnRcblx0XHRcdFx0XHQucmVwbGFjZSgvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3xeXFxzKlxcL1xcLy4qJC9nbSwgJycpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqPCFcXFtDREFUQVxcWyhbXFxzXFxTXSo/KVxcXVxcXT5cXHMqJC8sICckMScpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqKFxcKlxcL3xcXC9cXCopXFxzKnxcXHMqKFxcKlxcL3xcXC9cXCopXFxzKiQvZywgJycpXG5cdFx0XHRcdFx0LnRyaW0oKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0Y29uc3QganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25Db250ZW50KTtcblxuXHRcdFx0XHRpZiAoanNvbkRhdGFbJ0BncmFwaCddICYmIEFycmF5LmlzQXJyYXkoanNvbkRhdGFbJ0BncmFwaCddKSkge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaCguLi5qc29uRGF0YVsnQGdyYXBoJ10pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaChqc29uRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgc2NoZW1hLm9yZyBkYXRhOicsIGVycm9yKTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignUHJvYmxlbWF0aWMgSlNPTiBjb250ZW50OicsIGpzb25Db250ZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBzY2hlbWFEYXRhO1xuXHR9XG59IiwiaW1wb3J0IHsgTWV0YWRhdGFFeHRyYWN0b3IgfSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7IERlZnVkZGxlT3B0aW9ucywgRGVmdWRkbGVSZXNwb25zZSwgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBFbnRyeSBwb2ludCBlbGVtZW50c1xuLy8gVGhlc2UgYXJlIHRoZSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgdXNlZCB0byBmaW5kIHRoZSBtYWluIGNvbnRlbnRcbmNvbnN0IEVOVFJZX1BPSU5UX0VMRU1FTlRTID0gW1xuXHQnYXJ0aWNsZScsXG5cdCdbcm9sZT1cImFydGljbGVcIl0nLFxuXHQnW2l0ZW1wcm9wPVwiYXJ0aWNsZUJvZHlcIl0nLFxuXHQnLnBvc3QtY29udGVudCcsXG5cdCcuYXJ0aWNsZS1jb250ZW50Jyxcblx0JyNhcnRpY2xlLWNvbnRlbnQnLFxuXHQnLmNvbnRlbnQtYXJ0aWNsZScsXG5cdCdtYWluJyxcblx0J1tyb2xlPVwibWFpblwiXScsXG5cdCdib2R5JyAvLyBlbnN1cmVzIHRoZXJlIGlzIGFsd2F5cyBhIG1hdGNoXG5dO1xuXG5jb25zdCBNT0JJTEVfV0lEVEggPSA2MDA7XG5jb25zdCBCTE9DS19FTEVNRU5UUyA9IFsnZGl2JywgJ3NlY3Rpb24nLCAnYXJ0aWNsZScsICdtYWluJ107XG5cbi8vIEhpZGRlbiBlbGVtZW50cyB0aGF0IHNob3VsZCBiZSByZW1vdmVkXG5jb25zdCBISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMgPSBbXG5cdCdbaGlkZGVuXScsXG5cdCdbYXJpYS1oaWRkZW49XCJ0cnVlXCJdJyxcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nLCBjYXVzZXMgcHJvYmxlbXMgZm9yIG1hdGggZm9ybXVsYXNcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXScsXG5cdCdbc3R5bGUqPVwidmlzaWJpbGl0eTogaGlkZGVuXCJdJyxcblx0J1tzdHlsZSo9XCJ2aXNpYmlsaXR5OmhpZGRlblwiXScsXG5cdCcuaGlkZGVuJyxcblx0Jy5pbnZpc2libGUnXG5dLmpvaW4oJywnKTtcblxuLy8gU2VsZWN0b3JzIHRvIGJlIHJlbW92ZWRcbmNvbnN0IEVYQUNUX1NFTEVDVE9SUyA9IFtcblx0Ly8gc2NyaXB0cywgc3R5bGVzXG5cdCdub3NjcmlwdCcsXG5cdCdzY3JpcHQnLFxuXHQnc3R5bGUnLFxuXG5cdC8vIGFkc1xuXHQnLmFkOm5vdChbY2xhc3MqPVwiZ3JhZGllbnRcIl0pJyxcblx0J1tjbGFzc149XCJhZC1cIiBpXScsXG5cdCdbY2xhc3MkPVwiLWFkXCIgaV0nLFxuXHQnW2lkXj1cImFkLVwiIGldJyxcblx0J1tpZCQ9XCItYWRcIiBpXScsXG5cdCdbcm9sZT1cImJhbm5lclwiIGldJyxcblx0Jy5wcm9tbycsXG5cdCcuUHJvbW8nLFxuXG5cdC8vIGNvbW1lbnRzXG5cdCdbaWQ9XCJjb21tZW50c1wiIGldJyxcblxuXHQvLyBoZWFkZXIsIG5hdlxuXHQnaGVhZGVyJyxcblx0JyNoZWFkZXInLFxuXHQnbmF2Jyxcblx0Jy5uYXZpZ2F0aW9uJyxcblx0JyNuYXZpZ2F0aW9uJyxcblx0J1tyb2xlPVwibmF2aWdhdGlvblwiIGldJyxcblx0J1tyb2xlPVwiZGlhbG9nXCIgaV0nLFxuXHQnW3JvbGUqPVwiY29tcGxlbWVudGFyeVwiIGldJyxcblx0J1tjbGFzcyo9XCJwYWdpbmF0aW9uXCIgaV0nLFxuXG5cdC8vIG1ldGFkYXRhXG5cdCcuYXV0aG9yJyxcblx0Jy5BdXRob3InLFxuXHQnLmNvbnRyaWJ1dG9yJyxcblx0Jy5kYXRlJyxcblx0Jy5tZXRhJyxcblx0Jy50YWdzJyxcblx0Jy50b2MnLFxuXHQnLlRvYycsXG5cdCcjdG9jJyxcblx0JyN0aXRsZScsXG5cdCcjVGl0bGUnLFxuXHQnW2hyZWYqPVwiL2NhdGVnb3J5XCJdJyxcblx0J1tocmVmKj1cIi9jYXRlZ29yaWVzXCJdJyxcblx0J1tocmVmKj1cIi90YWcvXCJdJyxcblx0J1tocmVmKj1cIi90YWdzL1wiXScsXG5cdCdbaHJlZio9XCIvdG9waWNzXCJdJyxcblx0J1tocmVmKj1cImF1dGhvclwiXScsXG5cdCdbaHJlZj1cIiNzaXRlLWNvbnRlbnRcIl0nLFxuXHQnW3NyYyo9XCJhdXRob3JcIl0nLFxuXG5cdC8vIGZvb3RlclxuXHQnZm9vdGVyJyxcblxuXHQvLyBpbnB1dHMsIGZvcm1zLCBlbGVtZW50c1xuXHQnYXNpZGUnLFxuXHQnYnV0dG9uJyxcblx0XHQvLyAnW3JvbGU9XCJidXR0b25cIl0nLCBNZWRpdW0gaW1hZ2VzXG5cdCdjYW52YXMnLFxuXHQnZGlhbG9nJyxcblx0J2ZpZWxkc2V0Jyxcblx0J2Zvcm0nLFxuXHQnaW5wdXQ6bm90KFt0eXBlPVwiY2hlY2tib3hcIl0pJyxcblx0J2xhYmVsJyxcblx0J2xpbmsnLFxuXHQnb3B0aW9uJyxcblx0J3NlbGVjdCcsXG5cdCd0ZXh0YXJlYScsXG5cdCd0aW1lJyxcblxuXHQvLyBpZnJhbWVzXG5cdCdpbnN0YXJlYWQtcGxheWVyJyxcblx0J2lmcmFtZTpub3QoW3NyYyo9XCJ5b3V0dWJlXCJdKTpub3QoW3NyYyo9XCJ5b3V0dS5iZVwiXSk6bm90KFtzcmMqPVwidmltZW9cIl0pOm5vdChbc3JjKj1cInR3aXR0ZXJcIl0pJyxcblxuXHQvLyBsb2dvc1xuXHQnW2NsYXNzPVwibG9nb1wiIGldJyxcblx0JyNsb2dvJyxcblx0JyNMb2dvJyxcblxuXHQvLyBuZXdzbGV0dGVyXG5cdCcjbmV3c2xldHRlcicsXG5cdCcjTmV3c2xldHRlcicsXG5cblx0Ly8gaGlkZGVuIGZvciBwcmludFxuXHQnLm5vcHJpbnQnLFxuXHQnW2RhdGEtbGluay1uYW1lKj1cInNraXBcIiBpXScsXG5cdCdbZGF0YS1wcmludC1sYXlvdXQ9XCJoaWRlXCIgaV0nLFxuXHQnW2RhdGEtYmxvY2s9XCJkb25vdHByaW50XCIgaV0nLFxuXG5cdC8vIGZvb3Rub3RlcywgY2l0YXRpb25zXG5cdCdbY2xhc3MqPVwiY2xpY2thYmxlLWljb25cIiBpXScsXG5cdCdsaSBzcGFuW2NsYXNzKj1cImx0eF90YWdcIiBpXVtjbGFzcyo9XCJsdHhfdGFnX2l0ZW1cIiBpXScsXG5cdCdhW2hyZWZePVwiI1wiXVtjbGFzcyo9XCJhbmNob3JcIiBpXScsXG5cdCdhW2hyZWZePVwiI1wiXVtjbGFzcyo9XCJyZWZcIiBpXScsXG5cblx0Ly8gbGluayBsaXN0c1xuXHQnW2RhdGEtY29udGFpbmVyKj1cIm1vc3Qtdmlld2VkXCIgaV0nLFxuXG5cdC8vIHNpZGViYXJcblx0Jy5zaWRlYmFyJyxcblx0Jy5TaWRlYmFyJyxcblx0JyNzaWRlYmFyJyxcblx0JyNTaWRlYmFyJyxcblx0JyNzaXRlc3ViJyxcblx0XG5cdC8vIG90aGVyXG5cdCd0YWJsZS5pbmZvYm94Jyxcblx0Jy5wZW5jcmFmdDpub3QoLnBjLWRpc3BsYXktY29udGVudHMpJywgLy8gU3Vic3RhY2tcblx0J1tkYXRhLW9wdGltaXplbHk9XCJyZWxhdGVkLWFydGljbGVzLXNlY3Rpb25cIiBpXScgLy8gVGhlIEVjb25vbWlzdFxuXTtcblxuLy8gUmVtb3ZhbCBwYXR0ZXJucyB0ZXN0ZWQgYWdhaW5zdCBhdHRyaWJ1dGVzOiBjbGFzcywgaWQsIGRhdGEtdGVzdGlkLCBhbmQgZGF0YS1xYVxuLy8gQ2FzZSBpbnNlbnNpdGl2ZSwgcGFydGlhbCBtYXRjaGVzIGFsbG93ZWRcbmNvbnN0IFBBUlRJQUxfU0VMRUNUT1JTID0gW1xuXHQnYWNjZXNzLXdhbGwnLFxuXHQnYWN0aXZpdHlwdWInLFxuXHQnYXBwZW5kaXgnLFxuXHQnYXZhdGFyJyxcblx0J2FkdmVydCcsXG5cdCctYWQtJyxcblx0J19hZF8nLFxuXHQnYWxsdGVybXMnLFxuXHQnYXJvdW5kLXRoZS13ZWInLFxuXHQnYXJ0aWNsZV9fY29weScsXG5cdCdhcnRpY2xlX2RhdGUnLFxuXHQnYXJ0aWNsZS1lbmQgJyxcblx0J2FydGljbGVfaGVhZGVyJyxcblx0J2FydGljbGVfX2hlYWRlcicsXG5cdCdhcnRpY2xlX19pbmZvJyxcblx0J2FydGljbGUtaW5mbycsXG5cdCdhcnRpY2xlX19tZXRhJyxcblx0J2FydGljbGUtc3ViamVjdCcsXG5cdCdhcnRpY2xlX3N1YmplY3QnLFxuXHQnYXJ0aWNsZS1zbmlwcGV0Jyxcblx0J2FydGljbGUtdGFncycsXG5cdCdhcnRpY2xlX3RhZ3MnLFxuXHQnYXJ0aWNsZS10aXRsZScsXG5cdCdhcnRpY2xlX3RpdGxlJyxcblx0J2FydGljbGV0b3BpY3MnLFxuXHQnYXJ0aWNsZS10b3BpY3MnLFxuXHQnYXJ0aWNsZS10eXBlJyxcblx0J2FydGljbGUtLWxlZGUnLCAvLyBUaGUgVmVyZ2Vcblx0J2Fzc29jaWF0ZWQtcGVvcGxlJyxcbi8vXHQnYXV0aG9yJywgR3dlcm5cblx0J2JhY2stdG8tdG9wJyxcblx0J2JhY2tsaW5rcy1zZWN0aW9uJyxcblx0J2Jhbm5lcicsXG5cdCdiaW8tYmxvY2snLFxuXHQnYmxvZy1wYWdlcicsXG5cdCdib3R0b20tb2YtYXJ0aWNsZScsXG5cdCdicmFuZC1iYXInLFxuXHQnYnJlYWRjcnVtYicsXG5cdCdidXR0b24td3JhcHBlcicsXG5cdCdidG4tJyxcblx0Jy1idG4nLFxuXHQnYnlsaW5lJyxcblx0J2NhcHRjaGEnLFxuXHQnY2F0X2hlYWRlcicsXG5cdCdjYXRsaW5rcycsXG5cdCdjaGFwdGVyLWxpc3QnLCAvLyBUaGUgRWNvbm9taXN0XG5cdCdjb2xsZWN0aW9ucycsXG5cdCdjb21tZW50cycsXG4vL1x0Jy1jb21tZW50JywgU3ludGF4IGhpZ2hsaWdodGluZ1xuXHQnY29tbWVudC1jb3VudCcsXG5cdCdjb21tZW50LWNvbnRlbnQnLFxuXHQnY29tbWVudC1mb3JtJyxcblx0J2NvbW1lbnQtcmVzcG9uZCcsXG5cdCdjb21tZW50LXRocmVhZCcsXG5cdCdjb21wbGVtZW50YXJ5Jyxcblx0J2NvbnNlbnQnLFxuXHQnY29udGVudC1jYXJkJywgLy8gVGhlIFZlcmdlXG5cdCdjb250ZW50LXRvcGljcycsXG5cdCdjb250ZW50cHJvbW8nLFxuXHQnY29yZS1jb2xsYXRlcmFsJyxcblx0J19jdGEnLFxuXHQnLWN0YScsXG5cdCdjdGEtJyxcblx0J2N0YV8nLFxuXHQnY3VycmVudC1pc3N1ZScsIC8vIFRoZSBOYXRpb25cblx0J2N1c3RvbS1saXN0LW51bWJlcicsXG5cdCdkYXRlbGluZScsXG5cdCdkYXRlaGVhZGVyJyxcblx0J2RhdGUtaGVhZGVyJyxcblx0J2RhdGVfaGVhZGVyLScsXG4vL1x0J2RpYWxvZycsXG5cdCdkaXNjbGFpbWVyJyxcblx0J2Rpc2Nsb3N1cmUnLFxuXHQnZGlzY3Vzc2lvbicsXG5cdCdkaXNjdXNzXycsXG5cdCdkaXNxdXMnLFxuXHQnZG9uYXRlJyxcblx0J2Ryb3Bkb3duJywgLy8gQXJzIFRlY2huaWNhXG5cdCdlbGV0dGVycycsXG5cdCdlbWFpbHNpZ251cCcsXG5cdCdlbmdhZ2VtZW50LXdpZGdldCcsXG5cdCdlbnRyeS1hdXRob3ItaW5mbycsXG5cdCdlbnRyeS1kYXRlJyxcblx0J2VudHJ5LW1ldGEnLFxuXHQnZW50cnktdGl0bGUnLFxuXHQnZW50cnktdXRpbGl0eScsXG5cdCdleWVicm93Jyxcblx0J2V4cGFuZC1yZWR1Y2UnLFxuXHQnZXh0ZXJuYWxsaW5rZW1iZWR3cmFwcGVyJywgLy8gVGhlIE5ldyBZb3JrZXJcblx0J2V4dHJhLXRpdGxlJyxcblx0J2ZhY2Vib29rJyxcblx0J2Zhdm9yaXRlJyxcblx0J2ZlZWRiYWNrJyxcblx0J2ZlZWQtbGlua3MnLFxuXHQnZmllbGQtc2l0ZS1zZWN0aW9ucycsXG5cdCdmaXhlZCcsXG5cdCdmb2xsb3cnLFxuXHQnZm9vdGVyJyxcblx0J2Zvb3Rub3RlLWJhY2snLFxuXHQnZm9vdG5vdGViYWNrJyxcblx0J2Zvci15b3UnLFxuXHQnZnJvbnRtYXR0ZXInLFxuXHQnZnVydGhlci1yZWFkaW5nJyxcblx0J2dpc3QtbWV0YScsXG4vL1x0J2dsb2JhbCcsXG5cdCdnb29nbGUnLFxuXHQnZ29vZy0nLFxuXHQnZ3JhcGgtdmlldycsXG5cdCdoZWFkZXItbG9nbycsXG5cdCdoZWFkZXItcGF0dGVybicsIC8vIFRoZSBWZXJnZVxuXHQnaGVyby1saXN0Jyxcblx0J2hpZGUtZm9yLXByaW50Jyxcblx0J2hpZGUtcHJpbnQnLFxuXHQnaGlkZGVuLXNpZGVub3RlJyxcblx0J2ludGVybHVkZScsXG5cdCdpbnRlcmFjdGlvbicsXG5cdCdqdW1wbGluaycsXG4vL1x0J2tleXdvcmQnLCAvLyB1c2VkIGluIHN5bnRheCBoaWdobGlnaHRpbmdcblx0J2tpY2tlcicsXG5cdCctbGFiZWxzJyxcblx0J2xhbmd1YWdlLW5hbWUnLFxuXHQnbGF0ZXN0LWNvbnRlbnQnLFxuXHQnLWxlZGVzLScsIC8vIFRoZSBWZXJnZVxuXHQnLWxpY2Vuc2UnLFxuXHQnbGluay1ib3gnLFxuXHQnbGlua3MtZ3JpZCcsIC8vIEJCQ1xuXHQnbGlua3MtdGl0bGUnLCAvLyBCQkNcblx0J2xpc3RpbmctZHluYW1pYy10ZXJtcycsIC8vIEJvc3RvbiBSZXZpZXdcblx0J2xvYWRpbmcnLFxuXHQnbG9hLWluZm8nLFxuXHQnbG9nb19jb250YWluZXInLFxuXHQnbHR4X3JvbGVfcmVmbnVtJywgLy8gQXJ4aXZcblx0J2x0eF90YWdfYmliaXRlbScsXG5cdCdsdHhfZXJyb3InLFxuXHQnbWFya2V0aW5nJyxcblx0J21lZGlhLWlucXVpcnknLFxuXHQnbWVudS0nLFxuXHQnbWV0YS0nLFxuXHQnbWV0YWRhdGEnLFxuXHQnbWlnaHQtbGlrZScsXG5cdCdfbW9kYWwnLFxuXHQnLW1vZGFsJyxcblx0J21vcmUtJyxcblx0J21vcmVuZXdzJyxcblx0J21vcmVzdG9yaWVzJyxcblx0J213LWVkaXRzZWN0aW9uJyxcblx0J213LWNpdGUtYmFja2xpbmsnLFxuXHQnbXctaW5kaWNhdG9ycycsXG5cdCdtdy1qdW1wLWxpbmsnLFxuXHQnbmF2LScsXG5cdCduYXZfJyxcblx0J25hdmJhcicsXG4vL1x0J25hdmlnYXRpb24nLFxuXHQnbmV4dC0nLFxuXHQnbmV3cy1zdG9yeS10aXRsZScsXG4vL1x0J25ld3NsZXR0ZXInLCB1c2VkIG9uIFN1YnN0YWNrXG5cdCduZXdzbGV0dGVyXycsXG5cdCduZXdzbGV0dGVyLXNpZ251cCcsXG5cdCduZXdzbGV0dGVyc2lnbnVwJyxcblx0J25ld3NsZXR0ZXJ3aWRnZXQnLFxuXHQnbmV3c2xldHRlcndyYXBwZXInLFxuXHQnbm90LWZvdW5kJyxcblx0J25vbW9iaWxlJyxcblx0J25vcHJpbnQnLFxuXHQnb3JpZ2luYWxseS1wdWJsaXNoZWQnLCAvLyBNZXJjdXJ5IE5ld3Ncblx0J291dGxpbmUtdmlldycsXG5cdCdvdmVybGF5Jyxcblx0J3BhZ2UtdGl0bGUnLFxuXHQnLXBhcnRuZXJzJyxcblx0J3BsZWEnLFxuXHQncG9wdWxhcicsXG4vL1x0J3BvcHVwJywgR3dlcm5cblx0J3BvcC11cCcsXG5cdCdwb3BvdmVyJyxcblx0J3Bvc3QtYm90dG9tJyxcblx0J3Bvc3RfX2NhdGVnb3J5Jyxcblx0J3Bvc3Rjb21tZW50Jyxcblx0J3Bvc3RkYXRlJyxcblx0J3Bvc3QtZGF0ZScsXG5cdCdwb3N0X2RhdGUnLFxuXHQncG9zdC1mZWVkcycsXG5cdCdwb3N0aW5mbycsXG5cdCdwb3N0LWluZm8nLFxuXHQncG9zdF9pbmZvJyxcblx0J3Bvc3QtaW5saW5lLWRhdGUnLFxuXHQncG9zdC1saW5rcycsXG5cdCdwb3N0LW1ldGEnLFxuXHQncG9zdG1ldGEnLFxuXHQncG9zdHNuaXBwZXQnLFxuXHQncG9zdF9zbmlwcGV0Jyxcblx0J3Bvc3Qtc25pcHBldCcsXG5cdCdwb3N0dGl0bGUnLFxuXHQncG9zdC10aXRsZScsXG5cdCdwb3N0X3RpdGxlJyxcblx0J3Bvc3R0YXgnLFxuXHQncG9zdC10YXgnLFxuXHQncG9zdF90YXgnLFxuXHQncG9zdHRhZycsXG5cdCdwb3N0X3RhZycsXG5cdCdwb3N0LXRhZycsXG4vL1x0J3ByZXZpZXcnLCB1c2VkIG9uIE9ic2lkaWFuIFB1Ymxpc2hcblx0J3ByZXZuZXh0Jyxcblx0J3ByZXZpb3VzbmV4dCcsXG5cdCdwcmludC1ub25lJyxcblx0J3ByaW50LWhlYWRlcicsXG5cdCdwcm9maWxlJyxcbi8vXHQncHJvbW8nLFxuXHQncHViZGF0ZScsXG5cdCdwdWJfZGF0ZScsXG5cdCdwdWItZGF0ZScsXG5cdCdwdWJsaWNhdGlvbi1kYXRlJyxcblx0J3B1YmxpY2F0aW9uTmFtZScsIC8vIE1lZGl1bVxuXHQncXItY29kZScsXG5cdCdxcl9jb2RlJyxcblx0J19yYWlsJyxcblx0J3JlYWRtb3JlJyxcblx0J3JlYWQtbmV4dCcsXG5cdCdyZWFkX25leHQnLFxuXHQncmVhZF90aW1lJyxcblx0J3JlYWQtdGltZScsXG5cdCdyZWFkaW5nX3RpbWUnLFxuXHQncmVhZGluZy10aW1lJyxcblx0J3JlYWRpbmctbGlzdCcsXG5cdCdyZWNlbnRwb3N0Jyxcblx0J3JlY2VudF9wb3N0Jyxcblx0J3JlY2VudC1wb3N0Jyxcblx0J3JlY29tbWVuZCcsXG5cdCdyZWRpcmVjdGVkZnJvbScsXG5cdCdyZWNpcmMnLFxuXHQncmVnaXN0ZXInLFxuXHQncmVsYXRlZCcsXG5cdCdyZXZlcnNlZm9vdG5vdGUnLFxuXHQnc2NyZWVuLXJlYWRlci10ZXh0Jyxcbi8vXHQnc2hhcmUnLFxuLy9cdCctc2hhcmUnLCBzY2l0ZWNoZGFpbHkuY29tXG5cdCdzaGFyZS1ib3gnLFxuXHQnc2hhcmUtaWNvbnMnLFxuXHQnc2hhcmVsaW5rcycsXG5cdCdzaGFyZS1zZWN0aW9uJyxcblx0J3NpZGViYXJ0aXRsZScsXG5cdCdzaWRlYmFyXycsXG5cdCdzaW1pbGFyLScsXG5cdCdzaW1pbGFyXycsXG5cdCdzaW1pbGFycy0nLFxuXHQnc2lkZWl0ZW1zJyxcblx0J3NpZGUtYm94Jyxcblx0J3NpdGUtaW5kZXgnLFxuXHQnc2l0ZS1oZWFkZXInLFxuXHQnc2l0ZS1sb2dvJyxcblx0J3NpdGUtbmFtZScsXG4vL1x0J3NraXAtJyxcblx0J3NraXAtbGluaycsXG5cdCdzb2NpYWwnLFxuXHQnc3BlZWNoaWZ5LWlnbm9yZScsXG5cdCdzcG9uc29yJyxcbi8vXHQnLXN0YXRzJyxcblx0J19zdGF0cycsXG5cdCdzdGlja3knLFxuXHQnc3RvcnlyZWFkdGltZScsIC8vIE1lZGl1bVxuXHQnc3RvcnlwdWJsaXNoZGF0ZScsIC8vIE1lZGl1bVxuXHQnc3ViamVjdC1sYWJlbCcsXG5cdCdzdWJzY3JpYmUnLFxuXHQnX3RhZ3MnLFxuXHQndGFnc19faXRlbScsXG5cdCd0YWdfbGlzdCcsXG5cdCd0YXhvbm9teScsXG5cdCd0YWJsZS1vZi1jb250ZW50cycsXG5cdCd0YWJzLScsXG4vL1x0J3RlYXNlcicsIE5hdHVyZVxuXHQndGVybWluYWx0b3V0Jyxcblx0J3RpbWUtcnVicmljJyxcblx0J3RpbWVzdGFtcCcsXG5cdCd0aXBfb2ZmJyxcblx0J3RpcHRvdXQnLFxuXHQnLXRvYycsXG5cdCd0b3BpYy1saXN0Jyxcblx0J3Rvb2xiYXInLFxuXHQndG9vbHRpcCcsXG5cdCd0b3Atd3JhcHBlcicsXG5cdCd0cmVlLWl0ZW0nLFxuXHQndHJlbmRpbmcnLFxuXHQndHJ1c3QtZmVhdCcsXG5cdCd0cnVzdC1iYWRnZScsXG5cdCd0d2l0dGVyJyxcblx0J3Zpc3VhbGx5LWhpZGRlbicsXG5cdCd3ZWxjb21lYm94J1xuXTtcblxuLy8gU2VsZWN0b3JzIGZvciBmb290bm90ZXMgYW5kIGNpdGF0aW9uc1xuY29uc3QgRk9PVE5PVEVfSU5MSU5FX1JFRkVSRU5DRVMgPSBbXG5cdCdzdXAucmVmZXJlbmNlJyxcblx0J2NpdGUubHR4X2NpdGUnLFxuXHQnc3VwW2lkXj1cImZuclwiXScsXG5cdCdzdXBbaWRePVwiZm5yZWY6XCJdJyxcblx0J3NwYW4uZm9vdG5vdGUtbGluaycsXG5cdCdhLmNpdGF0aW9uJyxcblx0J2FbaWRePVwicmVmLWxpbmtcIl0nLFxuXHQnYVtocmVmXj1cIiNmblwiXScsXG5cdCdhW2hyZWZePVwiI2NpdGVcIl0nLFxuXHQnYVtocmVmXj1cIiNyZWZlcmVuY2VcIl0nLFxuXHQnYVtocmVmXj1cIiNmb290bm90ZVwiXScsXG5cdCdhW2hyZWZePVwiI3JcIl0nLCAvLyBDb21tb24gaW4gYWNhZGVtaWMgcGFwZXJzXG5cdCdhW2hyZWZePVwiI2JcIl0nLCAvLyBDb21tb24gZm9yIGJpYmxpb2dyYXBoeSByZWZlcmVuY2VzXG5cdCdhW2hyZWYqPVwiY2l0ZV9ub3RlXCJdJyxcblx0J2FbaHJlZio9XCJjaXRlX3JlZlwiXScsXG5cdCdhLmZvb3Rub3RlLWFuY2hvcicsIC8vIFN1YnN0YWNrXG5cdCdzcGFuLmZvb3Rub3RlLWhvdmVyY2FyZC10YXJnZXQgYScsIC8vIFN1YnN0YWNrXG5cdCdhW3JvbGU9XCJkb2MtYmlibGlvcmVmXCJdJywgLy8gU2NpZW5jZS5vcmdcblx0J2FbaWRePVwiZm5yZWZcIl0nLFxuXHQnYVtpZF49XCJyZWYtbGlua1wiXScsIC8vIE5hdHVyZS5jb21cbl0uam9pbignLCcpO1xuXG5jb25zdCBGT09UTk9URV9MSVNUX1NFTEVDVE9SUyA9IFtcblx0J2Rpdi5mb290bm90ZSBvbCcsXG5cdCdkaXYuZm9vdG5vdGVzIG9sJyxcblx0J2Rpdltyb2xlPVwiZG9jLWVuZG5vdGVzXCJdJyxcblx0J2Rpdltyb2xlPVwiZG9jLWZvb3Rub3Rlc1wiXScsXG5cdCdvbC5mb290bm90ZXMtbGlzdCcsXG5cdCdvbC5mb290bm90ZXMnLFxuXHQnb2wucmVmZXJlbmNlcycsXG5cdCdvbFtjbGFzcyo9XCJhcnRpY2xlLXJlZmVyZW5jZXNcIl0nLFxuXHQnc2VjdGlvbi5mb290bm90ZXMgb2wnLFxuXHQnc2VjdGlvbltyb2xlPVwiZG9jLWVuZG5vdGVzXCJdJyxcblx0J3NlY3Rpb25bcm9sZT1cImRvYy1mb290bm90ZXNcIl0nLFxuXHQnc2VjdGlvbltyb2xlPVwiZG9jLWJpYmxpb2dyYXBoeVwiXScsXG5cdCd1bC5mb290bm90ZXMtbGlzdCcsXG5cdCd1bC5sdHhfYmlibGlzdCcsXG5cdCdkaXYuZm9vdG5vdGVbZGF0YS1jb21wb25lbnQtbmFtZT1cIkZvb3Rub3RlVG9ET01cIl0nIC8vIFN1YnN0YWNrXG5dLmpvaW4oJywnKTtcblxuLy8gRWxlbWVudHMgdGhhdCBhcmUgYWxsb3dlZCB0byBiZSBlbXB0eVxuLy8gVGhlc2UgYXJlIG5vdCByZW1vdmVkIGV2ZW4gaWYgdGhleSBoYXZlIG5vIGNvbnRlbnRcbmNvbnN0IEFMTE9XRURfRU1QVFlfRUxFTUVOVFMgPSBuZXcgU2V0KFtcblx0J2FyZWEnLFxuXHQnYXVkaW8nLFxuXHQnYmFzZScsXG5cdCdicicsXG5cdCdjaXJjbGUnLFxuXHQnY29sJyxcblx0J2RlZnMnLFxuXHQnZWxsaXBzZScsXG5cdCdlbWJlZCcsXG5cdCdmaWd1cmUnLFxuXHQnZycsXG5cdCdocicsXG5cdCdpZnJhbWUnLFxuXHQnaW1nJyxcblx0J2lucHV0Jyxcblx0J2xpbmUnLFxuXHQnbGluaycsXG5cdCdtYXNrJyxcblx0J21ldGEnLFxuXHQnb2JqZWN0Jyxcblx0J3BhcmFtJyxcblx0J3BhdGgnLFxuXHQncGF0dGVybicsXG5cdCdwaWN0dXJlJyxcblx0J3BvbHlnb24nLFxuXHQncG9seWxpbmUnLFxuXHQncmVjdCcsXG5cdCdzb3VyY2UnLFxuXHQnc3RvcCcsXG5cdCdzdmcnLFxuXHQndGQnLFxuXHQndGgnLFxuXHQndHJhY2snLFxuXHQndXNlJyxcblx0J3ZpZGVvJyxcblx0J3dicidcbl0pO1xuXG4vLyBBdHRyaWJ1dGVzIHRvIGtlZXBcbmNvbnN0IEFMTE9XRURfQVRUUklCVVRFUyA9IG5ldyBTZXQoW1xuXHQnYWx0Jyxcblx0J2FsbG93Jyxcblx0J2FsbG93ZnVsbHNjcmVlbicsXG5cdCdhcmlhLWxhYmVsJyxcblx0J2NsYXNzJyxcblx0J2NoZWNrZWQnLFxuXHQnY29sc3BhbicsXG5cdCdjb250cm9scycsXG5cdCdkYXRhLXNyYycsXG5cdCdkYXRhLXNyY3NldCcsXG5cdCdkYXRhLWxhbmcnLFxuXHQnZGlyJyxcblx0J2ZyYW1lYm9yZGVyJyxcblx0J2hlYWRlcnMnLFxuXHQnaGVpZ2h0Jyxcblx0J2hyZWYnLFxuXHQnaWQnLFxuXHQnbGFuZycsXG5cdCdyb2xlJyxcblx0J3Jvd3NwYW4nLFxuXHQnc3JjJyxcblx0J3NyY3NldCcsXG5cdCd0aXRsZScsXG5cdCd0eXBlJyxcblx0J3dpZHRoJ1xuXSk7XG5cbi8vIFN1cHBvcnRlZCBsYW5ndWFnZXMgZm9yIGNvZGUgYmxvY2tzXG5jb25zdCBTVVBQT1JURURfTEFOR1VBR0VTID0gbmV3IFNldChbXG5cdC8vIE1hcmt1cCAmIFdlYlxuXHQnbWFya3VwJywgJ2h0bWwnLCAneG1sJywgJ3N2ZycsICdtYXRobWwnLCAnc3NtbCcsICdhdG9tJywgJ3JzcycsXG5cdCdqYXZhc2NyaXB0JywgJ2pzJywgJ2pzeCcsICd0eXBlc2NyaXB0JywgJ3RzJywgJ3RzeCcsXG5cdCd3ZWJhc3NlbWJseScsICd3YXNtJyxcblx0XG5cdC8vIENvbW1vbiBQcm9ncmFtbWluZyBMYW5ndWFnZXNcblx0J3B5dGhvbicsXG5cdCdqYXZhJyxcblx0J2NzaGFycCcsICdjcycsICdkb3RuZXQnLCAnYXNwbmV0Jyxcblx0J2NwcCcsICdjKysnLCAnYycsICdvYmpjJyxcblx0J3J1YnknLCAncmInLFxuXHQncGhwJyxcblx0J2dvbGFuZycsXG5cdCdydXN0Jyxcblx0J3N3aWZ0Jyxcblx0J2tvdGxpbicsXG5cdCdzY2FsYScsXG5cdCdkYXJ0Jyxcblx0XG5cdC8vIFNoZWxsICYgU2NyaXB0aW5nXG5cdCdiYXNoJywgJ3NoZWxsJywgJ3NoJyxcblx0J3Bvd2Vyc2hlbGwnLFxuXHQnYmF0Y2gnLFxuXHRcblx0Ly8gRGF0YSAmIENvbmZpZ1xuXHQnanNvbicsICdqc29ucCcsXG5cdCd5YW1sJywgJ3ltbCcsXG5cdCd0b21sJyxcblx0J2RvY2tlcmZpbGUnLFxuXHQnZ2l0aWdub3JlJyxcblx0XG5cdC8vIFF1ZXJ5IExhbmd1YWdlc1xuXHQnc3FsJywgJ215c3FsJywgJ3Bvc3RncmVzcWwnLFxuXHQnZ3JhcGhxbCcsXG5cdCdtb25nb2RiJyxcblx0J3NwYXJxbCcsXG5cdFxuXHQvLyBNYXJrdXAgJiBEb2N1bWVudGF0aW9uXG5cdCdtYXJrZG93bicsICdtZCcsXG5cdCdsYXRleCcsICd0ZXgnLFxuXHQnYXNjaWlkb2MnLCAnYWRvYycsXG5cdCdqc2RvYycsXG5cdFxuXHQvLyBGdW5jdGlvbmFsIExhbmd1YWdlc1xuXHQnaGFza2VsbCcsICdocycsXG5cdCdlbG0nLFxuXHQnZWxpeGlyJyxcblx0J2VybGFuZycsXG5cdCdvY2FtbCcsXG5cdCdmc2hhcnAnLFxuXHQnc2NoZW1lJyxcblx0J2xpc3AnLCAnZWxpc3AnLFxuXHQnY2xvanVyZScsXG5cdFxuXHQvLyBPdGhlciBMYW5ndWFnZXNcblx0J21hdGxhYicsXG5cdCdmb3J0cmFuJyxcblx0J2NvYm9sJyxcblx0J3Bhc2NhbCcsXG5cdCdwZXJsJyxcblx0J2x1YScsXG5cdCdqdWxpYScsXG5cdCdncm9vdnknLFxuXHQnY3J5c3RhbCcsXG5cdCduaW0nLFxuXHQnemlnJyxcblx0XG5cdC8vIERvbWFpbiBTcGVjaWZpY1xuXHQncmVnZXgnLFxuXHQnZ3JhZGxlJyxcblx0J2NtYWtlJyxcblx0J21ha2VmaWxlJyxcblx0J25peCcsXG5cdCd0ZXJyYWZvcm0nLFxuXHQnc29saWRpdHknLFxuXHQnZ2xzbCcsXG5cdCdobHNsJyxcblx0XG5cdC8vIEFzc2VtYmx5XG5cdCduYXNtJyxcblx0J21hc20nLFxuXHQnYXJtYXNtJyxcblx0XG5cdC8vIEdhbWUgRGV2ZWxvcG1lbnRcblx0J2dkc2NyaXB0Jyxcblx0J3VucmVhbHNjcmlwdCcsXG5cdFxuXHQvLyBPdGhlcnNcblx0J2FiYXAnLFxuXHQnYWN0aW9uc2NyaXB0Jyxcblx0J2FkYScsXG5cdCdhZ2RhJyxcblx0J2FudGxyNCcsXG5cdCdhcHBsZXNjcmlwdCcsXG5cdCdhcmR1aW5vJyxcblx0J2NvZmZlZXNjcmlwdCcsXG5cdCdkamFuZ28nLFxuXHQnZXJsYW5nJyxcblx0J2ZvcnRyYW4nLFxuXHQnaGF4ZScsXG5cdCdpZHJpcycsXG5cdCdrb3RsaW4nLFxuXHQnbGl2ZXNjcmlwdCcsXG5cdCdtYXRsYWInLFxuXHQnbmdpbngnLFxuXHQncGFzY2FsJyxcblx0J3Byb2xvZycsXG5cdCdwdXBwZXQnLFxuXHQnc2NhbGEnLFxuXHQnc2NoZW1lJyxcblx0J3RjbCcsXG5cdCd2ZXJpbG9nJyxcblx0J3ZoZGwnXG5dKTtcblxuXG4vLyBFbGVtZW50IHN0YW5kYXJkaXphdGlvbiBydWxlc1xuLy8gTWFwcyBzZWxlY3RvcnMgdG8gdGhlaXIgdGFyZ2V0IEhUTUwgZWxlbWVudCBuYW1lXG5pbnRlcmZhY2UgU3RhbmRhcmRpemF0aW9uUnVsZSB7XG5cdHNlbGVjdG9yOiBzdHJpbmc7XG5cdGVsZW1lbnQ6IHN0cmluZztcblx0dHJhbnNmb3JtPzogKGVsOiBFbGVtZW50KSA9PiBFbGVtZW50O1xufVxuXG5jb25zdCBFTEVNRU5UX1NUQU5EQVJESVpBVElPTl9SVUxFUzogU3RhbmRhcmRpemF0aW9uUnVsZVtdID0gW1xuXHQvLyBDb2RlIGJsb2Nrc1xuXHR7XG5cdFx0c2VsZWN0b3I6ICdwcmUnLFxuXHRcdGVsZW1lbnQ6ICdwcmUnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuIGVsO1xuXG5cdFx0XHQvLyBGdW5jdGlvbiB0byBnZXQgbGFuZ3VhZ2UgZnJvbSBjbGFzc1xuXHRcdFx0Y29uc3QgZ2V0TGFuZ3VhZ2VGcm9tQ2xhc3MgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcgPT4ge1xuXHRcdFx0XHQvLyBDaGVjayBkYXRhLWxhbmcgYXR0cmlidXRlIGZpcnN0XG5cdFx0XHRcdGNvbnN0IGRhdGFMYW5nID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZycpO1xuXHRcdFx0XHRpZiAoZGF0YUxhbmcpIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YUxhbmcudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIERlZmluZSBsYW5ndWFnZSBwYXR0ZXJuc1xuXHRcdFx0XHRjb25zdCBsYW5ndWFnZVBhdHRlcm5zID0gW1xuXHRcdFx0XHRcdC9ebGFuZ3VhZ2UtKFxcdyspJC8sICAgICAgICAgIC8vIGxhbmd1YWdlLWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXmxhbmctKFxcdyspJC8sICAgICAgICAgICAgICAvLyBsYW5nLWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXihcXHcrKS1jb2RlJC8sICAgICAgICAgICAgICAvLyBqYXZhc2NyaXB0LWNvZGVcblx0XHRcdFx0XHQvXmNvZGUtKFxcdyspJC8sICAgICAgICAgICAgICAvLyBjb2RlLWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXnN5bnRheC0oXFx3KykkLywgICAgICAgICAgICAvLyBzeW50YXgtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9eY29kZS1zbmlwcGV0X18oXFx3KykkLywgICAgIC8vIGNvZGUtc25pcHBldF9famF2YXNjcmlwdFxuXHRcdFx0XHRcdC9eaGlnaGxpZ2h0LShcXHcrKSQvLCAgICAgICAgIC8vIGhpZ2hsaWdodC1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L14oXFx3Kyktc25pcHBldCQvICAgICAgICAgICAgLy8gamF2YXNjcmlwdC1zbmlwcGV0XG5cdFx0XHRcdF07XG5cblx0XHRcdFx0Ly8gVGhlbiBjaGVjayB0aGUgY2xhc3MgYXR0cmlidXRlIGZvciBwYXR0ZXJuc1xuXHRcdFx0XHRpZiAoZWxlbWVudC5jbGFzc05hbWUgJiYgdHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgcGF0dGVybiBvZiBsYW5ndWFnZVBhdHRlcm5zKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkubWF0Y2gocGF0dGVybik7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIFRoZW4gY2hlY2sgZm9yIHN1cHBvcnRlZCBsYW5ndWFnZVxuXHRcdFx0XHRcdGlmIChTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhlbGVtZW50LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgY2xhc3NOYW1lcyA9IEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpO1xuXHRcdFx0XHRcblx0XHRcdFx0Zm9yIChjb25zdCBjbGFzc05hbWUgb2YgY2xhc3NOYW1lcykge1xuXHRcdFx0XHRcdC8vIENoZWNrIHBhdHRlcm5zIGZpcnN0XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIGxhbmd1YWdlUGF0dGVybnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gY2xhc3NOYW1lLm1hdGNoKHBhdHRlcm4pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE9ubHkgY2hlY2sgYmFyZSBsYW5ndWFnZSBuYW1lcyBpZiBubyBwYXR0ZXJucyB3ZXJlIGZvdW5kXG5cdFx0XHRcdGZvciAoY29uc3QgY2xhc3NOYW1lIG9mIGNsYXNzTmFtZXMpIHtcblx0XHRcdFx0XHRpZiAoU1VQUE9SVEVEX0xBTkdVQUdFUy5oYXMoY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gVHJ5IHRvIGdldCB0aGUgbGFuZ3VhZ2UgZnJvbSB0aGUgZWxlbWVudCBhbmQgaXRzIGFuY2VzdG9yc1xuXHRcdFx0bGV0IGxhbmd1YWdlID0gJyc7XG5cdFx0XHRsZXQgY3VycmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGVsO1xuXHRcdFx0XG5cdFx0XHR3aGlsZSAoY3VycmVudEVsZW1lbnQgJiYgIWxhbmd1YWdlKSB7XG5cdFx0XHRcdGxhbmd1YWdlID0gZ2V0TGFuZ3VhZ2VGcm9tQ2xhc3MoY3VycmVudEVsZW1lbnQpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQWxzbyBjaGVjayBmb3IgY29kZSBlbGVtZW50cyB3aXRoaW4gdGhlIGN1cnJlbnQgZWxlbWVudFxuXHRcdFx0XHRpZiAoIWxhbmd1YWdlICYmIGN1cnJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKSkge1xuXHRcdFx0XHRcdGxhbmd1YWdlID0gZ2V0TGFuZ3VhZ2VGcm9tQ2xhc3MoY3VycmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignY29kZScpISk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRnVuY3Rpb24gdG8gcmVjdXJzaXZlbHkgZXh0cmFjdCB0ZXh0IGNvbnRlbnQgd2hpbGUgcHJlc2VydmluZyBzdHJ1Y3R1cmVcblx0XHRcdGNvbnN0IGV4dHJhY3RTdHJ1Y3R1cmVkVGV4dCA9IChlbGVtZW50OiBOb2RlKTogc3RyaW5nID0+IHtcblx0XHRcdFx0aWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGxldCB0ZXh0ID0gJyc7XG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcblx0XHRcdFx0XHQvLyBIYW5kbGUgbGluZSBicmVha3Ncblx0XHRcdFx0XHRpZiAoZWxlbWVudC50YWdOYW1lID09PSAnQlInKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ1xcbic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIEhhbmRsZSBjb2RlIGVsZW1lbnRzIGFuZCB0aGVpciBjaGlsZHJlblxuXHRcdFx0XHRcdGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKGNoaWxkID0+IHtcblx0XHRcdFx0XHRcdHRleHQgKz0gZXh0cmFjdFN0cnVjdHVyZWRUZXh0KGNoaWxkKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBBZGQgbmV3bGluZSBhZnRlciBlYWNoIGNvZGUgZWxlbWVudFxuXHRcdFx0XHRcdGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdDT0RFJykge1xuXHRcdFx0XHRcdFx0dGV4dCArPSAnXFxuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBFeHRyYWN0IGFsbCB0ZXh0IGNvbnRlbnRcblx0XHRcdGxldCBjb2RlQ29udGVudCA9IGV4dHJhY3RTdHJ1Y3R1cmVkVGV4dChlbCk7XG5cblx0XHRcdC8vIENsZWFuIHVwIHRoZSBjb250ZW50XG5cdFx0XHRjb2RlQ29udGVudCA9IGNvZGVDb250ZW50XG5cdFx0XHRcdC8vIFJlbW92ZSBhbnkgZXh0cmEgbmV3bGluZXMgYXQgdGhlIHN0YXJ0XG5cdFx0XHRcdC5yZXBsYWNlKC9eXFxuKy8sICcnKVxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IGV4dHJhIG5ld2xpbmVzIGF0IHRoZSBlbmRcblx0XHRcdFx0LnJlcGxhY2UoL1xcbiskLywgJycpXG5cdFx0XHRcdC8vIFJlcGxhY2UgbXVsdGlwbGUgY29uc2VjdXRpdmUgbmV3bGluZXMgd2l0aCBhIHNpbmdsZSBuZXdsaW5lXG5cdFx0XHRcdC5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIG5ldyBwcmUgZWxlbWVudFxuXHRcdFx0Y29uc3QgbmV3UHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG5cdFx0XHRcblx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRuZXdQcmUuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBDcmVhdGUgY29kZSBlbGVtZW50XG5cdFx0XHRjb25zdCBjb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29kZScpO1xuXHRcdFx0aWYgKGxhbmd1YWdlKSB7XG5cdFx0XHRcdGNvZGUuc2V0QXR0cmlidXRlKCdkYXRhLWxhbmcnLCBsYW5ndWFnZSk7XG5cdFx0XHRcdGNvZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIGBsYW5ndWFnZS0ke2xhbmd1YWdlfWApO1xuXHRcdFx0fVxuXHRcdFx0Y29kZS50ZXh0Q29udGVudCA9IGNvZGVDb250ZW50O1xuXHRcdFx0XG5cdFx0XHRuZXdQcmUuYXBwZW5kQ2hpbGQoY29kZSk7XG5cdFx0XHRyZXR1cm4gbmV3UHJlO1xuXHRcdH1cblx0fSxcblx0Ly8gU2ltcGxpZnkgaGVhZGluZ3MgYnkgcmVtb3ZpbmcgaW50ZXJuYWwgbmF2aWdhdGlvbiBlbGVtZW50c1xuXHR7XG5cdFx0c2VsZWN0b3I6ICdoMSwgaDIsIGgzLCBoNCwgaDUsIGg2Jyxcblx0XHRlbGVtZW50OiAna2VlcCcsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdC8vIElmIGhlYWRpbmcgb25seSBjb250YWlucyBhIHNpbmdsZSBhbmNob3Igd2l0aCBpbnRlcm5hbCBsaW5rXG5cdFx0XHRpZiAoZWwuY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIFxuXHRcdFx0XHRlbC5maXJzdEVsZW1lbnRDaGlsZD8udGFnTmFtZSA9PT0gJ0EnICYmXG5cdFx0XHRcdChlbC5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKT8uaW5jbHVkZXMoJyMnKSB8fCBcblx0XHRcdFx0IGVsLmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpPy5zdGFydHNXaXRoKCcjJykpKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDcmVhdGUgbmV3IGhlYWRpbmcgb2Ygc2FtZSBsZXZlbFxuXHRcdFx0XHRjb25zdCBuZXdIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbC50YWdOYW1lKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzIGZyb20gb3JpZ2luYWwgaGVhZGluZ1xuXHRcdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdFx0bmV3SGVhZGluZy5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gSnVzdCB1c2UgdGhlIHRleHQgY29udGVudFxuXHRcdFx0XHRuZXdIZWFkaW5nLnRleHRDb250ZW50ID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBuZXdIZWFkaW5nO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBJZiBoZWFkaW5nIGNvbnRhaW5zIG5hdmlnYXRpb24gYnV0dG9ucyBvciBvdGhlciB1dGlsaXR5IGVsZW1lbnRzXG5cdFx0XHRjb25zdCBidXR0b25zID0gZWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5cdFx0XHRpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IG5ld0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsLnRhZ05hbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdFx0QXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRcdG5ld0hlYWRpbmcuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEp1c3QgdXNlIHRoZSB0ZXh0IGNvbnRlbnRcblx0XHRcdFx0bmV3SGVhZGluZy50ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gbmV3SGVhZGluZztcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH1cblx0fSxcblx0Ly8gQ29udmVydCBkaXZzIHdpdGggcGFyYWdyYXBoIHJvbGUgdG8gYWN0dWFsIHBhcmFncmFwaHNcblx0eyBcblx0XHRzZWxlY3RvcjogJ2RpdltkYXRhLXRlc3RpZF49XCJwYXJhZ3JhcGhcIl0sIGRpdltyb2xlPVwicGFyYWdyYXBoXCJdJywgXG5cdFx0ZWxlbWVudDogJ3AnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XG5cdFx0XHQvLyBDb3B5IGlubmVySFRNTFxuXHRcdFx0cC5pbm5lckhUTUwgPSBlbC5pbm5lckhUTUw7XG5cdFx0XHRcblx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRwLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIHA7XG5cdFx0fVxuXHR9LFxuXHQvLyBDb252ZXJ0IGRpdnMgd2l0aCBsaXN0IHJvbGVzIHRvIGFjdHVhbCBsaXN0c1xuXHR7IFxuXHRcdHNlbGVjdG9yOiAnZGl2W3JvbGU9XCJsaXN0XCJdJywgXG5cdFx0ZWxlbWVudDogJ3VsJyxcblx0XHQvLyBDdXN0b20gaGFuZGxlciBmb3IgbGlzdCB0eXBlIGRldGVjdGlvbiBhbmQgdHJhbnNmb3JtYXRpb25cblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Ly8gRmlyc3QgZGV0ZXJtaW5lIGlmIHRoaXMgaXMgYW4gb3JkZXJlZCBsaXN0XG5cdFx0XHRjb25zdCBmaXJzdEl0ZW0gPSBlbC5xdWVyeVNlbGVjdG9yKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdIC5sYWJlbCcpO1xuXHRcdFx0Y29uc3QgbGFiZWwgPSBmaXJzdEl0ZW0/LnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRjb25zdCBpc09yZGVyZWQgPSBsYWJlbC5tYXRjaCgvXlxcZCtcXCkvKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBhcHByb3ByaWF0ZSBsaXN0IHR5cGVcblx0XHRcdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGlzT3JkZXJlZCA/ICdvbCcgOiAndWwnKTtcblx0XHRcdFxuXHRcdFx0Ly8gUHJvY2VzcyBlYWNoIGxpc3QgaXRlbVxuXHRcdFx0Y29uc3QgaXRlbXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0XHRjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0XHRcdGNvbnN0IGNvbnRlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoY29udGVudCkge1xuXHRcdFx0XHRcdC8vIENvbnZlcnQgYW55IHBhcmFncmFwaCBkaXZzIGluc2lkZSBjb250ZW50XG5cdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoRGl2cyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nKTtcblx0XHRcdFx0XHRwYXJhZ3JhcGhEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdFx0XHRwLmlubmVySFRNTCA9IGRpdi5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ29udmVydCBhbnkgbmVzdGVkIGxpc3RzIHJlY3Vyc2l2ZWx5XG5cdFx0XHRcdFx0Y29uc3QgbmVzdGVkTGlzdHMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwibGlzdFwiXScpO1xuXHRcdFx0XHRcdG5lc3RlZExpc3RzLmZvckVhY2gobmVzdGVkTGlzdCA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBmaXJzdE5lc3RlZEl0ZW0gPSBuZXN0ZWRMaXN0LnF1ZXJ5U2VsZWN0b3IoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0gLmxhYmVsJyk7XG5cdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRMYWJlbCA9IGZpcnN0TmVzdGVkSXRlbT8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0XHRcdGNvbnN0IGlzTmVzdGVkT3JkZXJlZCA9IG5lc3RlZExhYmVsLm1hdGNoKC9eXFxkK1xcKS8pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRjb25zdCBuZXdOZXN0ZWRMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpc05lc3RlZE9yZGVyZWQgPyAnb2wnIDogJ3VsJyk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIFByb2Nlc3MgbmVzdGVkIGl0ZW1zXG5cdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRJdGVtcyA9IG5lc3RlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJsaXN0aXRlbVwiXScpO1xuXHRcdFx0XHRcdFx0bmVzdGVkSXRlbXMuZm9yRWFjaChuZXN0ZWRJdGVtID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkTGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRDb250ZW50ID0gbmVzdGVkSXRlbS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYgKG5lc3RlZENvbnRlbnQpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBDb252ZXJ0IHBhcmFncmFwaCBkaXZzIGluIG5lc3RlZCBpdGVtc1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZFBhcmFncmFwaHMgPSBuZXN0ZWRDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwicGFyYWdyYXBoXCJdJyk7XG5cdFx0XHRcdFx0XHRcdFx0bmVzdGVkUGFyYWdyYXBocy5mb3JFYWNoKGRpdiA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cC5pbm5lckhUTUwgPSBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKHApO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdG5lc3RlZExpLmlubmVySFRNTCA9IG5lc3RlZENvbnRlbnQuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRuZXdOZXN0ZWRMaXN0LmFwcGVuZENoaWxkKG5lc3RlZExpKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRuZXN0ZWRMaXN0LnJlcGxhY2VXaXRoKG5ld05lc3RlZExpc3QpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxpLmlubmVySFRNTCA9IGNvbnRlbnQuaW5uZXJIVE1MO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRsaXN0LmFwcGVuZENoaWxkKGxpKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gbGlzdDtcblx0XHR9XG5cdH0sXG5cdHsgXG5cdFx0c2VsZWN0b3I6ICdkaXZbcm9sZT1cImxpc3RpdGVtXCJdJywgXG5cdFx0ZWxlbWVudDogJ2xpJyxcblx0XHQvLyBDdXN0b20gaGFuZGxlciBmb3IgbGlzdCBpdGVtIGNvbnRlbnRcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Y29uc3QgY29udGVudCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdFx0XHRpZiAoIWNvbnRlbnQpIHJldHVybiBlbDtcblx0XHRcdFxuXHRcdFx0Ly8gQ29udmVydCBhbnkgcGFyYWdyYXBoIGRpdnMgaW5zaWRlIGNvbnRlbnRcblx0XHRcdGNvbnN0IHBhcmFncmFwaERpdnMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwicGFyYWdyYXBoXCJdJyk7XG5cdFx0XHRwYXJhZ3JhcGhEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0cC5pbm5lckhUTUwgPSBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0fVxuXHR9LFxuXHQvLyBDb2RlIGJsb2NrcyB3aXRoIHN5bnRheCBoaWdobGlnaHRpbmdcblx0e1xuXHRcdHNlbGVjdG9yOiAnLndwLWJsb2NrLXN5bnRheGhpZ2hsaWdodGVyLWNvZGUsIC5zeW50YXhoaWdobGlnaHRlciwgLmhpZ2hsaWdodCwgLmhpZ2hsaWdodC1zb3VyY2UsIC53cC1ibG9jay1jb2RlLCBwcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdLCBwcmVbY2xhc3MqPVwiYnJ1c2g6XCJdJyxcblx0XHRlbGVtZW50OiAncHJlJyxcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybiBlbDtcblxuXHRcdFx0Ly8gQ3JlYXRlIG5ldyBwcmUgZWxlbWVudFxuXHRcdFx0Y29uc3QgbmV3UHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG5cdFx0XHRcblx0XHRcdC8vIFRyeSB0byBkZXRlY3QgbGFuZ3VhZ2Vcblx0XHRcdGxldCBsYW5ndWFnZSA9ICcnO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBmb3IgV29yZFByZXNzIHN5bnRheCBoaWdobGlnaHRlciBzcGVjaWZpYyBmb3JtYXRcblx0XHRcdGNvbnN0IHN5bnRheEVsID0gZWwucXVlcnlTZWxlY3RvcignLnN5bnRheGhpZ2hsaWdodGVyJyk7XG5cdFx0XHRpZiAoc3ludGF4RWwpIHtcblx0XHRcdFx0Ly8gR2V0IGxhbmd1YWdlIGZyb20gc3ludGF4aGlnaGxpZ2h0ZXIgY2xhc3Ncblx0XHRcdFx0Y29uc3QgY2xhc3NlcyA9IEFycmF5LmZyb20oc3ludGF4RWwuY2xhc3NMaXN0KTtcblx0XHRcdFx0Y29uc3QgbGFuZ0NsYXNzID0gY2xhc3Nlcy5maW5kKGMgPT4gIVsnc3ludGF4aGlnaGxpZ2h0ZXInLCAnbm9ndXR0ZXInXS5pbmNsdWRlcyhjKSk7XG5cdFx0XHRcdGlmIChsYW5nQ2xhc3MgJiYgU1VQUE9SVEVEX0xBTkdVQUdFUy5oYXMobGFuZ0NsYXNzLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0bGFuZ3VhZ2UgPSBsYW5nQ2xhc3MudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBubyBsYW5ndWFnZSBmb3VuZCB5ZXQsIGNoZWNrIG90aGVyIGNvbW1vbiBwYXR0ZXJuc1xuXHRcdFx0aWYgKCFsYW5ndWFnZSkge1xuXHRcdFx0XHRjb25zdCBjbGFzc05hbWVzID0gQXJyYXkuZnJvbShlbC5jbGFzc0xpc3QpO1xuXHRcdFx0XHRjb25zdCBsYW5ndWFnZVBhdHRlcm5zID0gW1xuXHRcdFx0XHRcdC8oPzpefFxccykoPzpsYW5ndWFnZXxsYW5nfGJydXNofHN5bnRheCktKFxcdyspKD86XFxzfCQpL2ksXG5cdFx0XHRcdFx0Lyg/Ol58XFxzKShcXHcrKSg/Olxcc3wkKS9pXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0Zm9yIChjb25zdCBjbGFzc05hbWUgb2YgY2xhc3NOYW1lcykge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgcGF0dGVybiBvZiBsYW5ndWFnZVBhdHRlcm5zKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGNsYXNzTmFtZS5tYXRjaChwYXR0ZXJuKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCAmJiBtYXRjaFsxXSAmJiBTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhtYXRjaFsxXS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAobGFuZ3VhZ2UpIGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEV4dHJhY3QgY29kZSBjb250ZW50LCBoYW5kbGluZyB2YXJpb3VzIGZvcm1hdHNcblx0XHRcdGxldCBjb2RlQ29udGVudCA9ICcnO1xuXG5cdFx0XHQvLyBIYW5kbGUgV29yZFByZXNzIHN5bnRheCBoaWdobGlnaHRlciB0YWJsZSBmb3JtYXRcblx0XHRcdGNvbnN0IGNvZGVDb250YWluZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc3ludGF4aGlnaGxpZ2h0ZXIgdGFibGUgLmNvZGUgLmNvbnRhaW5lcicpO1xuXHRcdFx0aWYgKGNvZGVDb250YWluZXIpIHtcblx0XHRcdFx0Ly8gUHJvY2VzcyBlYWNoIGxpbmVcblx0XHRcdFx0Y29uc3QgbGluZXMgPSBBcnJheS5mcm9tKGNvZGVDb250YWluZXIuY2hpbGRyZW4pO1xuXHRcdFx0XHRjb2RlQ29udGVudCA9IGxpbmVzXG5cdFx0XHRcdFx0Lm1hcChsaW5lID0+IHtcblx0XHRcdFx0XHRcdC8vIEdldCBhbGwgY29kZSBlbGVtZW50cyBpbiB0aGlzIGxpbmVcblx0XHRcdFx0XHRcdGNvbnN0IGNvZGVQYXJ0cyA9IEFycmF5LmZyb20obGluZS5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlJykpXG5cdFx0XHRcdFx0XHRcdC5tYXAoY29kZSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSB0ZXh0IGNvbnRlbnQsIHByZXNlcnZpbmcgc3BhY2VzXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHRleHQgPSBjb2RlLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdFx0XHRcdC8vIElmIHRoaXMgaXMgYSAnc3BhY2VzJyBjbGFzcyBlbGVtZW50LCBjb252ZXJ0IHRvIGFjdHVhbCBzcGFjZXNcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NwYWNlcycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0ZXh0ID0gJyAnLnJlcGVhdCh0ZXh0Lmxlbmd0aCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0ZXh0O1xuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuam9pbignJyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29kZVBhcnRzIHx8IGxpbmUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBIYW5kbGUgV29yZFByZXNzIHN5bnRheCBoaWdobGlnaHRlciBub24tdGFibGUgZm9ybWF0XG5cdFx0XHRcdGNvbnN0IGNvZGVMaW5lcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2RlIC5saW5lJyk7XG5cdFx0XHRcdGlmIChjb2RlTGluZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGNvZGVDb250ZW50ID0gQXJyYXkuZnJvbShjb2RlTGluZXMpXG5cdFx0XHRcdFx0XHQubWFwKGxpbmUgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBjb2RlUGFydHMgPSBBcnJheS5mcm9tKGxpbmUucXVlcnlTZWxlY3RvckFsbCgnY29kZScpKVxuXHRcdFx0XHRcdFx0XHRcdC5tYXAoY29kZSA9PiBjb2RlLnRleHRDb250ZW50IHx8ICcnKVxuXHRcdFx0XHRcdFx0XHRcdC5qb2luKCcnKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvZGVQYXJ0cyB8fCBsaW5lLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBGYWxsYmFjayB0byByZWd1bGFyIHRleHQgY29udGVudFxuXHRcdFx0XHRcdGNvZGVDb250ZW50ID0gZWwudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xlYW4gdXAgdGhlIGNvbnRlbnRcblx0XHRcdGNvZGVDb250ZW50ID0gY29kZUNvbnRlbnRcblx0XHRcdFx0LnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSAvLyBUcmltIHN0YXJ0L2VuZCB3aGl0ZXNwYWNlXG5cdFx0XHRcdC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKSAvLyBDb252ZXJ0IHRhYnMgdG8gc3BhY2VzXG5cdFx0XHRcdC5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKSAvLyBOb3JtYWxpemUgbXVsdGlwbGUgbmV3bGluZXNcblx0XHRcdFx0LnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTsgLy8gUmVwbGFjZSBub24tYnJlYWtpbmcgc3BhY2VzIHdpdGggcmVndWxhciBzcGFjZXNcblxuXHRcdFx0Ly8gQ3JlYXRlIGNvZGUgZWxlbWVudCB3aXRoIGxhbmd1YWdlIGNsYXNzIGlmIGRldGVjdGVkXG5cdFx0XHRjb25zdCBjb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29kZScpO1xuXHRcdFx0aWYgKGxhbmd1YWdlKSB7XG5cdFx0XHRcdGNvZGUuc2V0QXR0cmlidXRlKCdkYXRhLWxhbmcnLCBsYW5ndWFnZSk7XG5cdFx0XHRcdGNvZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIGBsYW5ndWFnZS0ke2xhbmd1YWdlfWApO1xuXHRcdFx0fVxuXHRcdFx0Y29kZS50ZXh0Q29udGVudCA9IGNvZGVDb250ZW50O1xuXHRcdFx0XG5cdFx0XHRuZXdQcmUuYXBwZW5kQ2hpbGQoY29kZSk7XG5cdFx0XHRyZXR1cm4gbmV3UHJlO1xuXHRcdH1cblx0fVxuXTtcblxuaW50ZXJmYWNlIEZvb3Rub3RlRGF0YSB7XG5cdGNvbnRlbnQ6IEVsZW1lbnQgfCBzdHJpbmc7XG5cdG9yaWdpbmFsSWQ6IHN0cmluZztcblx0cmVmczogc3RyaW5nW107XG59XG5cbmludGVyZmFjZSBGb290bm90ZUNvbGxlY3Rpb24ge1xuXHRbZm9vdG5vdGVOdW1iZXI6IG51bWJlcl06IEZvb3Rub3RlRGF0YTtcbn1cblxuaW50ZXJmYWNlIENvbnRlbnRTY29yZSB7XG5cdHNjb3JlOiBudW1iZXI7XG5cdGVsZW1lbnQ6IEVsZW1lbnQ7XG59XG5cbmludGVyZmFjZSBTdHlsZUNoYW5nZSB7XG5cdHNlbGVjdG9yOiBzdHJpbmc7XG5cdHN0eWxlczogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmdWRkbGUge1xuXHRwcml2YXRlIGRvYzogRG9jdW1lbnQ7XG5cdHByaXZhdGUgb3B0aW9uczogRGVmdWRkbGVPcHRpb25zO1xuXHRwcml2YXRlIGRlYnVnOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgRGVmdWRkbGUgaW5zdGFuY2Vcblx0ICogQHBhcmFtIGRvYyAtIFRoZSBkb2N1bWVudCB0byBwYXJzZVxuXHQgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHBhcnNpbmdcblx0ICovXG5cdGNvbnN0cnVjdG9yKGRvYzogRG9jdW1lbnQsIG9wdGlvbnM6IERlZnVkZGxlT3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5kb2MgPSBkb2M7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLmRlYnVnID0gb3B0aW9ucy5kZWJ1ZyB8fCBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXJzZSB0aGUgZG9jdW1lbnQgYW5kIGV4dHJhY3QgaXRzIG1haW4gY29udGVudFxuXHQgKi9cblx0cGFyc2UoKTogRGVmdWRkbGVSZXNwb25zZSB7XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cblx0XHQvLyBFeHRyYWN0IG1ldGFkYXRhIGZpcnN0IHNpbmNlIHdlJ2xsIG5lZWQgaXQgaW4gbXVsdGlwbGUgcGxhY2VzXG5cdFx0Y29uc3Qgc2NoZW1hT3JnRGF0YSA9IE1ldGFkYXRhRXh0cmFjdG9yLmV4dHJhY3RTY2hlbWFPcmdEYXRhKHRoaXMuZG9jKTtcblx0XHRjb25zdCBtZXRhZGF0YSA9IE1ldGFkYXRhRXh0cmFjdG9yLmV4dHJhY3QodGhpcy5kb2MsIHNjaGVtYU9yZ0RhdGEpO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIEV2YWx1YXRlIHN0eWxlcyBhbmQgc2l6ZXMgb24gb3JpZ2luYWwgZG9jdW1lbnRcblx0XHRcdGNvbnN0IG1vYmlsZVN0eWxlcyA9IHRoaXMuX2V2YWx1YXRlTWVkaWFRdWVyaWVzKHRoaXMuZG9jKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ2hlY2sgZm9yIHNtYWxsIGltYWdlcyBpbiBvcmlnaW5hbCBkb2N1bWVudCwgZXhjbHVkaW5nIGxhenktbG9hZGVkIG9uZXNcblx0XHRcdGNvbnN0IHNtYWxsSW1hZ2VzID0gdGhpcy5maW5kU21hbGxJbWFnZXModGhpcy5kb2MpO1xuXHRcdFx0XG5cdFx0XHQvLyBDbG9uZSBkb2N1bWVudFxuXHRcdFx0Y29uc3QgY2xvbmUgPSB0aGlzLmRvYy5jbG9uZU5vZGUodHJ1ZSkgYXMgRG9jdW1lbnQ7XG5cdFx0XHRcblx0XHRcdC8vIEFwcGx5IG1vYmlsZSBzdHlsZSB0byBjbG9uZVxuXHRcdFx0dGhpcy5hcHBseU1vYmlsZVN0eWxlcyhjbG9uZSwgbW9iaWxlU3R5bGVzKTtcblxuXHRcdFx0Ly8gRmluZCBtYWluIGNvbnRlbnRcblx0XHRcdGNvbnN0IG1haW5Db250ZW50ID0gdGhpcy5maW5kTWFpbkNvbnRlbnQoY2xvbmUpO1xuXHRcdFx0aWYgKCFtYWluQ29udGVudCkge1xuXHRcdFx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y29udGVudDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUwsXG5cdFx0XHRcdFx0Li4ubWV0YWRhdGEsXG5cdFx0XHRcdFx0d29yZENvdW50OiB0aGlzLmNvdW50V29yZHModGhpcy5kb2MuYm9keS5pbm5lckhUTUwpLFxuXHRcdFx0XHRcdHBhcnNlVGltZTogTWF0aC5yb3VuZChlbmRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgc21hbGwgaW1hZ2VzIGlkZW50aWZpZWQgZnJvbSBvcmlnaW5hbCBkb2N1bWVudFxuXHRcdFx0dGhpcy5yZW1vdmVTbWFsbEltYWdlcyhjbG9uZSwgc21hbGxJbWFnZXMpO1xuXHRcdFx0XG5cdFx0XHQvLyBQZXJmb3JtIG90aGVyIGRlc3RydWN0aXZlIG9wZXJhdGlvbnMgb24gdGhlIGNsb25lXG5cdFx0XHR0aGlzLnJlbW92ZUhpZGRlbkVsZW1lbnRzKGNsb25lKTtcblx0XHRcdHRoaXMucmVtb3ZlQ2x1dHRlcihjbG9uZSk7XG5cblx0XHRcdC8vIENsZWFuIHVwIHRoZSBtYWluIGNvbnRlbnRcblx0XHRcdHRoaXMuY2xlYW5Db250ZW50KG1haW5Db250ZW50LCBtZXRhZGF0YSk7XG5cblx0XHRcdGNvbnN0IGNvbnRlbnQgPSBtYWluQ29udGVudCA/IG1haW5Db250ZW50Lm91dGVySFRNTCA6IHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MO1xuXHRcdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb250ZW50LFxuXHRcdFx0XHQuLi5tZXRhZGF0YSxcblx0XHRcdFx0d29yZENvdW50OiB0aGlzLmNvdW50V29yZHMoY29udGVudCksXG5cdFx0XHRcdHBhcnNlVGltZTogTWF0aC5yb3VuZChlbmRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdFx0fTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcignRGVmdWRkbGUnLCAnRXJyb3IgcHJvY2Vzc2luZyBkb2N1bWVudDonLCBlcnJvcik7XG5cdFx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb250ZW50OiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTCxcblx0XHRcdFx0Li4ubWV0YWRhdGEsXG5cdFx0XHRcdHdvcmRDb3VudDogdGhpcy5jb3VudFdvcmRzKHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MKSxcblx0XHRcdFx0cGFyc2VUaW1lOiBNYXRoLnJvdW5kKGVuZFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgY291bnRXb3Jkcyhjb250ZW50OiBzdHJpbmcpOiBudW1iZXIge1xuXHRcdC8vIENyZWF0ZSBhIHRlbXBvcmFyeSBkaXYgdG8gcGFyc2UgSFRNTCBjb250ZW50XG5cdFx0Y29uc3QgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRlbXBEaXYuaW5uZXJIVE1MID0gY29udGVudDtcblxuXHRcdC8vIEdldCB0ZXh0IGNvbnRlbnQsIHJlbW92aW5nIGV4dHJhIHdoaXRlc3BhY2Vcblx0XHRjb25zdCB0ZXh0ID0gdGVtcERpdi50ZXh0Q29udGVudCB8fCAnJztcblx0XHRjb25zdCB3b3JkcyA9IHRleHRcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9cXHMrL2csICcgJykgLy8gUmVwbGFjZSBtdWx0aXBsZSBzcGFjZXMgd2l0aCBzaW5nbGUgc3BhY2Vcblx0XHRcdC5zcGxpdCgnICcpXG5cdFx0XHQuZmlsdGVyKHdvcmQgPT4gd29yZC5sZW5ndGggPiAwKTsgLy8gRmlsdGVyIG91dCBlbXB0eSBzdHJpbmdzXG5cblx0XHRyZXR1cm4gd29yZHMubGVuZ3RoO1xuXHR9XG5cblx0Ly8gTWFrZSBhbGwgb3RoZXIgbWV0aG9kcyBwcml2YXRlIGJ5IHJlbW92aW5nIHRoZSBzdGF0aWMga2V5d29yZCBhbmQgdXNpbmcgcHJpdmF0ZVxuXHRwcml2YXRlIF9sb2coLi4uYXJnczogYW55W10pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0Y29uc29sZS5sb2coJ0RlZnVkZGxlOicsIC4uLmFyZ3MpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2V2YWx1YXRlTWVkaWFRdWVyaWVzKGRvYzogRG9jdW1lbnQpOiBTdHlsZUNoYW5nZVtdIHtcblx0XHRjb25zdCBtb2JpbGVTdHlsZXM6IFN0eWxlQ2hhbmdlW10gPSBbXTtcblx0XHRjb25zdCBtYXhXaWR0aFJlZ2V4ID0gL21heC13aWR0aFteOl0qOlxccyooXFxkKykvO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIEdldCBhbGwgc3R5bGVzLCBpbmNsdWRpbmcgaW5saW5lIHN0eWxlc1xuXHRcdFx0Y29uc3Qgc2hlZXRzID0gQXJyYXkuZnJvbShkb2Muc3R5bGVTaGVldHMpLmZpbHRlcihzaGVldCA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gQWNjZXNzIHJ1bGVzIG9uY2UgdG8gY2hlY2sgdmFsaWRpdHlcblx0XHRcdFx0XHRzaGVldC5jc3NSdWxlcztcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdC8vIEV4cGVjdGVkIGVycm9yIGZvciBjcm9zcy1vcmlnaW4gc3R5bGVzaGVldHNcblx0XHRcdFx0XHRpZiAoZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlLm5hbWUgPT09ICdTZWN1cml0eUVycm9yJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly8gUHJvY2VzcyBhbGwgc2hlZXRzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRcdGNvbnN0IG1lZGlhUnVsZXMgPSBzaGVldHMuZmxhdE1hcChzaGVldCA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmV0dXJuIEFycmF5LmZyb20oc2hlZXQuY3NzUnVsZXMpXG5cdFx0XHRcdFx0XHQuZmlsdGVyKChydWxlKTogcnVsZSBpcyBDU1NNZWRpYVJ1bGUgPT4gXG5cdFx0XHRcdFx0XHRcdHJ1bGUgaW5zdGFuY2VvZiBDU1NNZWRpYVJ1bGUgJiZcblx0XHRcdFx0XHRcdFx0cnVsZS5jb25kaXRpb25UZXh0LmluY2x1ZGVzKCdtYXgtd2lkdGgnKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBzdHlsZXNoZWV0OicsIGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBQcm9jZXNzIGFsbCBtZWRpYSBydWxlcyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0XHRtZWRpYVJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1hdGNoID0gcnVsZS5jb25kaXRpb25UZXh0Lm1hdGNoKG1heFdpZHRoUmVnZXgpO1xuXHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRjb25zdCBtYXhXaWR0aCA9IHBhcnNlSW50KG1hdGNoWzFdKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZiAoTU9CSUxFX1dJRFRIIDw9IG1heFdpZHRoKSB7XG5cdFx0XHRcdFx0XHQvLyBCYXRjaCBwcm9jZXNzIGFsbCBzdHlsZSBydWxlc1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3R5bGVSdWxlcyA9IEFycmF5LmZyb20ocnVsZS5jc3NSdWxlcylcblx0XHRcdFx0XHRcdFx0LmZpbHRlcigocik6IHIgaXMgQ1NTU3R5bGVSdWxlID0+IHIgaW5zdGFuY2VvZiBDU1NTdHlsZVJ1bGUpO1xuXG5cdFx0XHRcdFx0XHRzdHlsZVJ1bGVzLmZvckVhY2goY3NzUnVsZSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0bW9iaWxlU3R5bGVzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0b3I6IGNzc1J1bGUuc2VsZWN0b3JUZXh0LFxuXHRcdFx0XHRcdFx0XHRcdFx0c3R5bGVzOiBjc3NSdWxlLnN0eWxlLmNzc1RleHRcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBDU1MgcnVsZTonLCBlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignRGVmdWRkbGU6IEVycm9yIGV2YWx1YXRpbmcgbWVkaWEgcXVlcmllczonLCBlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbW9iaWxlU3R5bGVzO1xuXHR9XG5cblx0cHJpdmF0ZSBhcHBseU1vYmlsZVN0eWxlcyhkb2M6IERvY3VtZW50LCBtb2JpbGVTdHlsZXM6IFN0eWxlQ2hhbmdlW10pIHtcblx0XHRsZXQgYXBwbGllZENvdW50ID0gMDtcblxuXHRcdG1vYmlsZVN0eWxlcy5mb3JFYWNoKCh7c2VsZWN0b3IsIHN0eWxlc30pID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFxuXHRcdFx0XHRcdFx0KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpIHx8ICcnKSArIHN0eWxlc1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YXBwbGllZENvdW50Kys7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZScsICdFcnJvciBhcHBseWluZyBzdHlsZXMgZm9yIHNlbGVjdG9yOicsIHNlbGVjdG9yLCBlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVIaWRkZW5FbGVtZW50cyhkb2M6IERvY3VtZW50KSB7XG5cdFx0bGV0IGNvdW50ID0gMDtcblx0XHRjb25zdCBlbGVtZW50c1RvUmVtb3ZlID0gbmV3IFNldDxFbGVtZW50PigpO1xuXG5cdFx0Ly8gRmlyc3QgcGFzczogR2V0IGFsbCBlbGVtZW50cyBtYXRjaGluZyBoaWRkZW4gc2VsZWN0b3JzXG5cdFx0Y29uc3QgaGlkZGVuRWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMpO1xuXHRcdGhpZGRlbkVsZW1lbnRzLmZvckVhY2goZWwgPT4gZWxlbWVudHNUb1JlbW92ZS5hZGQoZWwpKTtcblx0XHRjb3VudCArPSBoaWRkZW5FbGVtZW50cy5sZW5ndGg7XG5cblx0XHQvLyBTZWNvbmQgcGFzczogVXNlIFRyZWVXYWxrZXIgZm9yIGVmZmljaWVudCB0cmF2ZXJzYWxcblx0XHRjb25zdCB0cmVlV2Fsa2VyID0gZG9jLmNyZWF0ZVRyZWVXYWxrZXIoXG5cdFx0XHRkb2MuYm9keSxcblx0XHRcdE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULFxuXHRcdFx0e1xuXHRcdFx0XHRhY2NlcHROb2RlOiAobm9kZTogRWxlbWVudCkgPT4ge1xuXHRcdFx0XHRcdC8vIFNraXAgZWxlbWVudHMgYWxyZWFkeSBtYXJrZWQgZm9yIHJlbW92YWxcblx0XHRcdFx0XHRpZiAoZWxlbWVudHNUb1JlbW92ZS5oYXMobm9kZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0Ly8gQmF0Y2ggc3R5bGUgY29tcHV0YXRpb25zXG5cdFx0Y29uc3QgZWxlbWVudHM6IEVsZW1lbnRbXSA9IFtdO1xuXHRcdGxldCBjdXJyZW50Tm9kZTogRWxlbWVudCB8IG51bGw7XG5cdFx0d2hpbGUgKGN1cnJlbnROb2RlID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpIGFzIEVsZW1lbnQpIHtcblx0XHRcdGVsZW1lbnRzLnB1c2goY3VycmVudE5vZGUpO1xuXHRcdH1cblxuXHRcdC8vIFByb2Nlc3Mgc3R5bGVzIGluIGJhdGNoZXMgdG8gbWluaW1pemUgbGF5b3V0IHRocmFzaGluZ1xuXHRcdGNvbnN0IEJBVENIX1NJWkUgPSAxMDA7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkgKz0gQkFUQ0hfU0laRSkge1xuXHRcdFx0Y29uc3QgYmF0Y2ggPSBlbGVtZW50cy5zbGljZShpLCBpICsgQkFUQ0hfU0laRSk7XG5cdFx0XHRcblx0XHRcdC8vIFJlYWQgcGhhc2UgLSBnYXRoZXIgYWxsIGNvbXB1dGVkU3R5bGVzXG5cdFx0XHRjb25zdCBzdHlsZXMgPSBiYXRjaC5tYXAoZWwgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpKTtcblx0XHRcdFxuXHRcdFx0Ly8gV3JpdGUgcGhhc2UgLSBtYXJrIGVsZW1lbnRzIGZvciByZW1vdmFsXG5cdFx0XHRiYXRjaC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjb21wdXRlZFN0eWxlID0gc3R5bGVzW2luZGV4XTtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGNvbXB1dGVkU3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnIHx8XG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS52aXNpYmlsaXR5ID09PSAnaGlkZGVuJyB8fFxuXHRcdFx0XHRcdGNvbXB1dGVkU3R5bGUub3BhY2l0eSA9PT0gJzAnXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsZW1lbnQpO1xuXHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIEZpbmFsIHBhc3M6IEJhdGNoIHJlbW92ZSBhbGwgaGlkZGVuIGVsZW1lbnRzXG5cdFx0ZWxlbWVudHNUb1JlbW92ZS5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBoaWRkZW4gZWxlbWVudHM6JywgY291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVDbHV0dGVyKGRvYzogRG9jdW1lbnQpIHtcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRsZXQgZXhhY3RTZWxlY3RvckNvdW50ID0gMDtcblx0XHRsZXQgcGFydGlhbFNlbGVjdG9yQ291bnQgPSAwO1xuXG5cdFx0Ly8gVHJhY2sgYWxsIGVsZW1lbnRzIHRvIGJlIHJlbW92ZWRcblx0XHRjb25zdCBlbGVtZW50c1RvUmVtb3ZlID0gbmV3IFNldDxFbGVtZW50PigpO1xuXG5cdFx0Ly8gRmlyc3QgY29sbGVjdCBlbGVtZW50cyBtYXRjaGluZyBleGFjdCBzZWxlY3RvcnNcblx0XHRjb25zdCBleGFjdEVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoRVhBQ1RfU0VMRUNUT1JTLmpvaW4oJywnKSk7XG5cdFx0ZXhhY3RFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdGlmIChlbD8ucGFyZW50Tm9kZSkge1xuXHRcdFx0XHRlbGVtZW50c1RvUmVtb3ZlLmFkZChlbCk7XG5cdFx0XHRcdGV4YWN0U2VsZWN0b3JDb3VudCsrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gUHJlLWNvbXBpbGUgcmVnZXhlcyBhbmQgY29tYmluZSBpbnRvIGEgc2luZ2xlIHJlZ2V4IGZvciBiZXR0ZXIgcGVyZm9ybWFuY2Vcblx0XHRjb25zdCBjb21iaW5lZFBhdHRlcm4gPSBQQVJUSUFMX1NFTEVDVE9SUy5qb2luKCd8Jyk7XG5cdFx0Y29uc3QgcGFydGlhbFJlZ2V4ID0gbmV3IFJlZ0V4cChjb21iaW5lZFBhdHRlcm4sICdpJyk7XG5cblx0XHQvLyBDcmVhdGUgYW4gZWZmaWNpZW50IGF0dHJpYnV0ZSBzZWxlY3RvciBmb3IgZWxlbWVudHMgd2UgY2FyZSBhYm91dFxuXHRcdGNvbnN0IGF0dHJpYnV0ZVNlbGVjdG9yID0gJ1tjbGFzc10sW2lkXSxbZGF0YS10ZXN0aWRdLFtkYXRhLXFhXSxbZGF0YS1jeV0nO1xuXHRcdGNvbnN0IGFsbEVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoYXR0cmlidXRlU2VsZWN0b3IpO1xuXG5cdFx0Ly8gUHJvY2VzcyBlbGVtZW50cyBmb3IgcGFydGlhbCBtYXRjaGVzXG5cdFx0YWxsRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHQvLyBTa2lwIGlmIGFscmVhZHkgbWFya2VkIGZvciByZW1vdmFsXG5cdFx0XHRpZiAoZWxlbWVudHNUb1JlbW92ZS5oYXMoZWwpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2V0IGFsbCByZWxldmFudCBhdHRyaWJ1dGVzIGFuZCBjb21iaW5lIGludG8gYSBzaW5nbGUgc3RyaW5nXG5cdFx0XHRjb25zdCBhdHRycyA9IFtcblx0XHRcdFx0ZWwuY2xhc3NOYW1lICYmIHR5cGVvZiBlbC5jbGFzc05hbWUgPT09ICdzdHJpbmcnID8gZWwuY2xhc3NOYW1lIDogJycsXG5cdFx0XHRcdGVsLmlkIHx8ICcnLFxuXHRcdFx0XHRlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdGlkJykgfHwgJycsXG5cdFx0XHRcdGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1xYScpIHx8ICcnLFxuXHRcdFx0XHRlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3knKSB8fCAnJ1xuXHRcdFx0XS5qb2luKCcgJykudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0Ly8gU2tpcCBpZiBubyBhdHRyaWJ1dGVzIHRvIGNoZWNrXG5cdFx0XHRpZiAoIWF0dHJzLnRyaW0oKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIGZvciBwYXJ0aWFsIG1hdGNoIHVzaW5nIHNpbmdsZSByZWdleCB0ZXN0XG5cdFx0XHRpZiAocGFydGlhbFJlZ2V4LnRlc3QoYXR0cnMpKSB7XG5cdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsKTtcblx0XHRcdFx0cGFydGlhbFNlbGVjdG9yQ291bnQrKztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBhbGwgY29sbGVjdGVkIGVsZW1lbnRzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRlbGVtZW50c1RvUmVtb3ZlLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuXG5cdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBjbHV0dGVyIGVsZW1lbnRzOicsIHtcblx0XHRcdGV4YWN0U2VsZWN0b3JzOiBleGFjdFNlbGVjdG9yQ291bnQsXG5cdFx0XHRwYXJ0aWFsU2VsZWN0b3JzOiBwYXJ0aWFsU2VsZWN0b3JDb3VudCxcblx0XHRcdHRvdGFsOiBlbGVtZW50c1RvUmVtb3ZlLnNpemUsXG5cdFx0XHRwcm9jZXNzaW5nVGltZTogYCR7KGVuZFRpbWUgLSBzdGFydFRpbWUpLnRvRml4ZWQoMil9bXNgXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGNsZWFuQ29udGVudChlbGVtZW50OiBFbGVtZW50LCBtZXRhZGF0YTogRGVmdWRkbGVNZXRhZGF0YSkge1xuXHRcdC8vIFJlbW92ZSBIVE1MIGNvbW1lbnRzXG5cdFx0dGhpcy5yZW1vdmVIdG1sQ29tbWVudHMoZWxlbWVudCk7XG5cdFx0XG5cdFx0Ly8gSGFuZGxlIEgxIGVsZW1lbnRzIC0gcmVtb3ZlIGZpcnN0IG9uZSBhbmQgY29udmVydCBvdGhlcnMgdG8gSDJcblx0XHR0aGlzLmhhbmRsZUhlYWRpbmdzKGVsZW1lbnQsIG1ldGFkYXRhLnRpdGxlKTtcblx0XHRcblx0XHQvLyBTdGFuZGFyZGl6ZSBmb290bm90ZXMgYW5kIGNpdGF0aW9uc1xuXHRcdHRoaXMuc3RhbmRhcmRpemVGb290bm90ZXMoZWxlbWVudCk7XG5cblx0XHQvLyBIYW5kbGUgbGF6eS1sb2FkZWQgaW1hZ2VzXG5cdFx0dGhpcy5oYW5kbGVMYXp5SW1hZ2VzKGVsZW1lbnQpO1xuXG5cdFx0Ly8gQ29udmVydCBlbWJlZGRlZCBjb250ZW50IHRvIHN0YW5kYXJkIGZvcm1hdHNcblx0XHR0aGlzLnN0YW5kYXJkaXplRWxlbWVudHMoZWxlbWVudCk7XG5cdFx0XG5cdFx0Ly8gU3RyaXAgdW53YW50ZWQgYXR0cmlidXRlc1xuXHRcdHRoaXMuc3RyaXBVbndhbnRlZEF0dHJpYnV0ZXMoZWxlbWVudCk7XG5cblx0XHQvLyBSZW1vdmUgZW1wdHkgZWxlbWVudHNcblx0XHR0aGlzLnJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudCk7XG5cblx0XHQvLyBSZW1vdmUgdHJhaWxpbmcgaGVhZGluZ3Ncblx0XHR0aGlzLnJlbW92ZVRyYWlsaW5nSGVhZGluZ3MoZWxlbWVudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZVRyYWlsaW5nSGVhZGluZ3MoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXG5cdFx0Y29uc3QgaGFzQ29udGVudEFmdGVyID0gKGVsOiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGVyZSdzIGFueSBtZWFuaW5nZnVsIGNvbnRlbnQgYWZ0ZXIgdGhpcyBlbGVtZW50XG5cdFx0XHRsZXQgbmV4dENvbnRlbnQgPSAnJztcblx0XHRcdGxldCBzaWJsaW5nID0gZWwubmV4dFNpYmxpbmc7XG5cblx0XHRcdC8vIEZpcnN0IGNoZWNrIGRpcmVjdCBzaWJsaW5nc1xuXHRcdFx0d2hpbGUgKHNpYmxpbmcpIHtcblx0XHRcdFx0aWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRcdFx0bmV4dENvbnRlbnQgKz0gc2libGluZy50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fSBlbHNlIGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuXHRcdFx0XHRcdC8vIElmIHdlIGZpbmQgYW4gZWxlbWVudCBzaWJsaW5nLCBjaGVjayBpdHMgY29udGVudFxuXHRcdFx0XHRcdG5leHRDb250ZW50ICs9IChzaWJsaW5nIGFzIEVsZW1lbnQpLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNpYmxpbmcgPSBzaWJsaW5nLm5leHRTaWJsaW5nO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB3ZSBmb3VuZCBtZWFuaW5nZnVsIGNvbnRlbnQgYXQgdGhpcyBsZXZlbCwgcmV0dXJuIHRydWVcblx0XHRcdGlmIChuZXh0Q29udGVudC50cmltKCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIG5vIGNvbnRlbnQgZm91bmQgYXQgdGhpcyBsZXZlbCBhbmQgd2UgaGF2ZSBhIHBhcmVudCxcblx0XHRcdC8vIGNoZWNrIGZvciBjb250ZW50IGFmdGVyIHRoZSBwYXJlbnRcblx0XHRcdGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudCAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gaGFzQ29udGVudEFmdGVyKHBhcmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0Ly8gUHJvY2VzcyBhbGwgaGVhZGluZ3MgZnJvbSBib3R0b20gdG8gdG9wXG5cdFx0Y29uc3QgaGVhZGluZ3MgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaDEsIGgyLCBoMywgaDQsIGg1LCBoNicpKVxuXHRcdFx0LnJldmVyc2UoKTtcblxuXHRcdGhlYWRpbmdzLmZvckVhY2goaGVhZGluZyA9PiB7XG5cdFx0XHRpZiAoIWhhc0NvbnRlbnRBZnRlcihoZWFkaW5nKSkge1xuXHRcdFx0XHRoZWFkaW5nLnJlbW92ZSgpO1xuXHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFN0b3AgcHJvY2Vzc2luZyBvbmNlIHdlIGZpbmQgYSBoZWFkaW5nIHdpdGggY29udGVudCBhZnRlciBpdFxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAocmVtb3ZlZENvdW50ID4gMCkge1xuXHRcdFx0dGhpcy5fbG9nKCdSZW1vdmVkIHRyYWlsaW5nIGhlYWRpbmdzOicsIHJlbW92ZWRDb3VudCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBoYW5kbGVIZWFkaW5ncyhlbGVtZW50OiBFbGVtZW50LCB0aXRsZTogc3RyaW5nKSB7XG5cdFx0Y29uc3QgaDFzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDEnKTtcblxuXHRcdEFycmF5LmZyb20oaDFzKS5mb3JFYWNoKGgxID0+IHtcblx0XHRcdGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcblx0XHRcdGgyLmlubmVySFRNTCA9IGgxLmlubmVySFRNTDtcblx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRBcnJheS5mcm9tKGgxLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRoMi5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRoMS5wYXJlbnROb2RlPy5yZXBsYWNlQ2hpbGQoaDIsIGgxKTtcblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBmaXJzdCBIMiBpZiBpdCBtYXRjaGVzIHRpdGxlXG5cdFx0Y29uc3QgaDJzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDInKTtcblx0XHRpZiAoaDJzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IGZpcnN0SDIgPSBoMnNbMF07XG5cdFx0XHRjb25zdCBmaXJzdEgyVGV4dCA9IGZpcnN0SDIudGV4dENvbnRlbnQ/LnRyaW0oKS50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0Y29uc3Qgbm9ybWFsaXplZFRpdGxlID0gdGl0bGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG5cdFx0XHRpZiAobm9ybWFsaXplZFRpdGxlICYmIG5vcm1hbGl6ZWRUaXRsZSA9PT0gZmlyc3RIMlRleHQpIHtcblx0XHRcdFx0Zmlyc3RIMi5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUh0bWxDb21tZW50cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0Y29uc3QgY29tbWVudHM6IENvbW1lbnRbXSA9IFtdO1xuXHRcdGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG5cdFx0XHRlbGVtZW50LFxuXHRcdFx0Tm9kZUZpbHRlci5TSE9XX0NPTU1FTlQsXG5cdFx0XHRudWxsXG5cdFx0KTtcblxuXHRcdGxldCBub2RlO1xuXHRcdHdoaWxlIChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpIHtcblx0XHRcdGNvbW1lbnRzLnB1c2gobm9kZSBhcyBDb21tZW50KTtcblx0XHR9XG5cblx0XHRjb21tZW50cy5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuXHRcdFx0Y29tbWVudC5yZW1vdmUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBIVE1MIGNvbW1lbnRzOicsIGNvbW1lbnRzLmxlbmd0aCk7XG5cdH1cblxuXHRwcml2YXRlIHN0cmlwVW53YW50ZWRBdHRyaWJ1dGVzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgYXR0cmlidXRlQ291bnQgPSAwO1xuXG5cdFx0Y29uc3QgcHJvY2Vzc0VsZW1lbnQgPSAoZWw6IEVsZW1lbnQpID0+IHtcblx0XHRcdC8vIFNraXAgU1ZHIGVsZW1lbnRzIC0gcHJlc2VydmUgYWxsIHRoZWlyIGF0dHJpYnV0ZXNcblx0XHRcdGlmIChlbCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBhdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKTtcblx0XHRcdFxuXHRcdFx0YXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRjb25zdCBhdHRyTmFtZSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRpZiAoIUFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ck5hbWUpICYmICFhdHRyTmFtZS5zdGFydHNXaXRoKCdkYXRhLScpKSB7XG5cdFx0XHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKGF0dHIubmFtZSk7XG5cdFx0XHRcdFx0YXR0cmlidXRlQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdHByb2Nlc3NFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnKicpLmZvckVhY2gocHJvY2Vzc0VsZW1lbnQpO1xuXG5cdFx0dGhpcy5fbG9nKCdTdHJpcHBlZCBhdHRyaWJ1dGVzOicsIGF0dHJpYnV0ZUNvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlRW1wdHlFbGVtZW50cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHJlbW92ZWRDb3VudCA9IDA7XG5cdFx0bGV0IGl0ZXJhdGlvbnMgPSAwO1xuXHRcdGxldCBrZWVwUmVtb3ZpbmcgPSB0cnVlO1xuXG5cdFx0d2hpbGUgKGtlZXBSZW1vdmluZykge1xuXHRcdFx0aXRlcmF0aW9ucysrO1xuXHRcdFx0a2VlcFJlbW92aW5nID0gZmFsc2U7XG5cdFx0XHQvLyBHZXQgYWxsIGVsZW1lbnRzIHdpdGhvdXQgY2hpbGRyZW4sIHdvcmtpbmcgZnJvbSBkZWVwZXN0IGZpcnN0XG5cdFx0XHRjb25zdCBlbXB0eUVsZW1lbnRzID0gQXJyYXkuZnJvbShlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJykpLmZpbHRlcihlbCA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0VNUFRZX0VMRU1FTlRTLmhhcyhlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDaGVjayBpZiBlbGVtZW50IGhhcyBvbmx5IHdoaXRlc3BhY2Ugb3IgJm5ic3A7XG5cdFx0XHRcdGNvbnN0IHRleHRDb250ZW50ID0gZWwudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGhhc09ubHlXaGl0ZXNwYWNlID0gdGV4dENvbnRlbnQudHJpbSgpLmxlbmd0aCA9PT0gMDtcblx0XHRcdFx0Y29uc3QgaGFzTmJzcCA9IHRleHRDb250ZW50LmluY2x1ZGVzKCdcXHUwMEEwJyk7IC8vIFVuaWNvZGUgbm9uLWJyZWFraW5nIHNwYWNlXG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDaGVjayBpZiBlbGVtZW50IGhhcyBubyBtZWFuaW5nZnVsIGNoaWxkcmVuXG5cdFx0XHRcdGNvbnN0IGhhc05vQ2hpbGRyZW4gPSAhZWwuaGFzQ2hpbGROb2RlcygpIHx8IFxuXHRcdFx0XHRcdChBcnJheS5mcm9tKGVsLmNoaWxkTm9kZXMpLmV2ZXJ5KG5vZGUgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG5vZGVUZXh0ID0gbm9kZS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5vZGVUZXh0LnRyaW0oKS5sZW5ndGggPT09IDAgJiYgIW5vZGVUZXh0LmluY2x1ZGVzKCdcXHUwMEEwJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdHJldHVybiBoYXNPbmx5V2hpdGVzcGFjZSAmJiAhaGFzTmJzcCAmJiBoYXNOb0NoaWxkcmVuO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChlbXB0eUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0ZW1wdHlFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdFx0XHRlbC5yZW1vdmUoKTtcblx0XHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGtlZXBSZW1vdmluZyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIGVtcHR5IGVsZW1lbnRzOicsIHtcblx0XHRcdGNvdW50OiByZW1vdmVkQ291bnQsXG5cdFx0XHRpdGVyYXRpb25zXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZUZvb3Rub3RlSXRlbShcblx0XHRmb290bm90ZU51bWJlcjogbnVtYmVyLFxuXHRcdGNvbnRlbnQ6IHN0cmluZyB8IEVsZW1lbnQsXG5cdFx0cmVmczogc3RyaW5nW11cblx0KTogSFRNTExJRWxlbWVudCB7XG5cdFx0Y29uc3QgbmV3SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0bmV3SXRlbS5jbGFzc05hbWUgPSAnZm9vdG5vdGUnO1xuXHRcdG5ld0l0ZW0uaWQgPSBgZm46JHtmb290bm90ZU51bWJlcn1gO1xuXG5cdFx0Ly8gSGFuZGxlIGNvbnRlbnRcblx0XHRpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRwYXJhZ3JhcGguaW5uZXJIVE1MID0gY29udGVudDtcblx0XHRcdG5ld0l0ZW0uYXBwZW5kQ2hpbGQocGFyYWdyYXBoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gR2V0IGFsbCBwYXJhZ3JhcGhzIGZyb20gdGhlIGNvbnRlbnRcblx0XHRcdGNvbnN0IHBhcmFncmFwaHMgPSBBcnJheS5mcm9tKGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgncCcpKTtcblx0XHRcdGlmIChwYXJhZ3JhcGhzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHQvLyBJZiBubyBwYXJhZ3JhcGhzLCB3cmFwIGNvbnRlbnQgaW4gYSBwYXJhZ3JhcGhcblx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRwYXJhZ3JhcGguaW5uZXJIVE1MID0gY29udGVudC5pbm5lckhUTUw7XG5cdFx0XHRcdG5ld0l0ZW0uYXBwZW5kQ2hpbGQocGFyYWdyYXBoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIENvcHkgZXhpc3RpbmcgcGFyYWdyYXBoc1xuXHRcdFx0XHRwYXJhZ3JhcGhzLmZvckVhY2gocCA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgbmV3UCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0XHRuZXdQLmlubmVySFRNTCA9IHAuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdG5ld0l0ZW0uYXBwZW5kQ2hpbGQobmV3UCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFkZCBiYWNrbGluayhzKSB0byB0aGUgbGFzdCBwYXJhZ3JhcGhcblx0XHRjb25zdCBsYXN0UGFyYWdyYXBoID0gbmV3SXRlbS5xdWVyeVNlbGVjdG9yKCdwOmxhc3Qtb2YtdHlwZScpIHx8IG5ld0l0ZW07XG5cdFx0cmVmcy5mb3JFYWNoKChyZWZJZCwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IGJhY2tsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdFx0YmFja2xpbmsuaHJlZiA9IGAjJHtyZWZJZH1gO1xuXHRcdFx0YmFja2xpbmsudGl0bGUgPSAncmV0dXJuIHRvIGFydGljbGUnO1xuXHRcdFx0YmFja2xpbmsuY2xhc3NOYW1lID0gJ2Zvb3Rub3RlLWJhY2tyZWYnO1xuXHRcdFx0YmFja2xpbmsuaW5uZXJIVE1MID0gJ+KGqSc7XG5cdFx0XHRpZiAoaW5kZXggPCByZWZzLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0YmFja2xpbmsuaW5uZXJIVE1MICs9ICcgJztcblx0XHRcdH1cblx0XHRcdGxhc3RQYXJhZ3JhcGguYXBwZW5kQ2hpbGQoYmFja2xpbmspO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIG5ld0l0ZW07XG5cdH1cblxuXHRwcml2YXRlIGNvbGxlY3RGb290bm90ZXMoZWxlbWVudDogRWxlbWVudCk6IEZvb3Rub3RlQ29sbGVjdGlvbiB7XG5cdFx0Y29uc3QgZm9vdG5vdGVzOiBGb290bm90ZUNvbGxlY3Rpb24gPSB7fTtcblx0XHRsZXQgZm9vdG5vdGVDb3VudCA9IDE7XG5cdFx0Y29uc3QgcHJvY2Vzc2VkSWRzID0gbmV3IFNldDxzdHJpbmc+KCk7IC8vIFRyYWNrIHByb2Nlc3NlZCBJRHNcblxuXHRcdC8vIENvbGxlY3QgYWxsIGZvb3Rub3RlcyBhbmQgdGhlaXIgSURzIGZyb20gZm9vdG5vdGUgbGlzdHNcblx0XHRjb25zdCBmb290bm90ZUxpc3RzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPT1ROT1RFX0xJU1RfU0VMRUNUT1JTKTtcblx0XHRmb290bm90ZUxpc3RzLmZvckVhY2gobGlzdCA9PiB7XG5cdFx0XHQvLyBTdWJzdGFjayBoYXMgaW5kaXZpZHVhbCBmb290bm90ZSBkaXZzIHdpdGggbm8gcGFyZW50XG5cdFx0XHRpZiAobGlzdC5tYXRjaGVzKCdkaXYuZm9vdG5vdGVbZGF0YS1jb21wb25lbnQtbmFtZT1cIkZvb3Rub3RlVG9ET01cIl0nKSkge1xuXHRcdFx0XHRjb25zdCBhbmNob3IgPSBsaXN0LnF1ZXJ5U2VsZWN0b3IoJ2EuZm9vdG5vdGUtbnVtYmVyJyk7XG5cdFx0XHRcdGNvbnN0IGNvbnRlbnQgPSBsaXN0LnF1ZXJ5U2VsZWN0b3IoJy5mb290bm90ZS1jb250ZW50Jyk7XG5cdFx0XHRcdGlmIChhbmNob3IgJiYgY29udGVudCkge1xuXHRcdFx0XHRcdGNvbnN0IGlkID0gYW5jaG9yLmlkLnJlcGxhY2UoJ2Zvb3Rub3RlLScsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdGlmIChpZCAmJiAhcHJvY2Vzc2VkSWRzLmhhcyhpZCkpIHtcblx0XHRcdFx0XHRcdGZvb3Rub3Rlc1tmb290bm90ZUNvdW50XSA9IHtcblx0XHRcdFx0XHRcdFx0Y29udGVudDogY29udGVudCxcblx0XHRcdFx0XHRcdFx0b3JpZ2luYWxJZDogaWQsXG5cdFx0XHRcdFx0XHRcdHJlZnM6IFtdXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2VkSWRzLmFkZChpZCk7XG5cdFx0XHRcdFx0XHRmb290bm90ZUNvdW50Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29tbW9uIGZvcm1hdCB1c2luZyBPTC9VTCBhbmQgTEkgZWxlbWVudHNcblx0XHRcdGNvbnN0IGl0ZW1zID0gbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaSwgZGl2W3JvbGU9XCJsaXN0aXRlbVwiXScpO1xuXHRcdFx0aXRlbXMuZm9yRWFjaChsaSA9PiB7XG5cdFx0XHRcdGxldCBpZCA9ICcnO1xuXHRcdFx0XHRsZXQgY29udGVudDogRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG5cdFx0XHRcdC8vIEhhbmRsZSBjaXRhdGlvbnMgd2l0aCAuY2l0YXRpb25zIGNsYXNzXG5cdFx0XHRcdGNvbnN0IGNpdGF0aW9uc0RpdiA9IGxpLnF1ZXJ5U2VsZWN0b3IoJy5jaXRhdGlvbnMnKTtcblx0XHRcdFx0aWYgKGNpdGF0aW9uc0Rpdj8uaWQ/LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgncicpKSB7XG5cdFx0XHRcdFx0aWQgPSBjaXRhdGlvbnNEaXYuaWQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHQvLyBMb29rIGZvciBjaXRhdGlvbiBjb250ZW50IHdpdGhpbiB0aGUgY2l0YXRpb25zIGRpdlxuXHRcdFx0XHRcdGNvbnN0IGNpdGF0aW9uQ29udGVudCA9IGNpdGF0aW9uc0Rpdi5xdWVyeVNlbGVjdG9yKCcuY2l0YXRpb24tY29udGVudCcpO1xuXHRcdFx0XHRcdGlmIChjaXRhdGlvbkNvbnRlbnQpIHtcblx0XHRcdFx0XHRcdGNvbnRlbnQgPSBjaXRhdGlvbkNvbnRlbnQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEV4dHJhY3QgSUQgZnJvbSB2YXJpb3VzIGZvcm1hdHNcblx0XHRcdFx0XHRpZiAobGkuaWQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdiaWIuYmliJykpIHtcblx0XHRcdFx0XHRcdGlkID0gbGkuaWQucmVwbGFjZSgnYmliLmJpYicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaWQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdmbjonKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5pZC5yZXBsYWNlKCdmbjonLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGxpLmlkLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnZm4nKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5pZC5yZXBsYWNlKCdmbicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdC8vIE5hdHVyZS5jb21cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGxpLmhhc0F0dHJpYnV0ZSgnZGF0YS1jb3VudGVyJykpIHtcblx0XHRcdFx0XHRcdGlkID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLWNvdW50ZXInKT8ucmVwbGFjZSgvXFwuJC8sICcnKT8udG9Mb3dlckNhc2UoKSB8fCAnJztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBsaS5pZC5zcGxpdCgnLycpLnBvcCgpPy5tYXRjaCgvY2l0ZV9ub3RlLSguKykvKTtcblx0XHRcdFx0XHRcdGlkID0gbWF0Y2ggPyBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpIDogbGkuaWQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29udGVudCA9IGxpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlkICYmICFwcm9jZXNzZWRJZHMuaGFzKGlkKSkge1xuXHRcdFx0XHRcdGZvb3Rub3Rlc1tmb290bm90ZUNvdW50XSA9IHtcblx0XHRcdFx0XHRcdGNvbnRlbnQ6IGNvbnRlbnQgfHwgbGksXG5cdFx0XHRcdFx0XHRvcmlnaW5hbElkOiBpZCxcblx0XHRcdFx0XHRcdHJlZnM6IFtdXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRwcm9jZXNzZWRJZHMuYWRkKGlkKTtcblx0XHRcdFx0XHRmb290bm90ZUNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGZvb3Rub3Rlcztcblx0fVxuXG5cdHByaXZhdGUgZmluZE91dGVyRm9vdG5vdGVDb250YWluZXIoZWw6IEVsZW1lbnQpOiBFbGVtZW50IHtcblx0XHRsZXQgY3VycmVudDogRWxlbWVudCB8IG51bGwgPSBlbDtcblx0XHRsZXQgcGFyZW50OiBFbGVtZW50IHwgbnVsbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG5cdFx0XG5cdFx0Ly8gS2VlcCBnb2luZyB1cCB1bnRpbCB3ZSBmaW5kIGFuIGVsZW1lbnQgdGhhdCdzIG5vdCBhIHNwYW4gb3Igc3VwXG5cdFx0d2hpbGUgKHBhcmVudCAmJiAoXG5cdFx0XHRwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3BhbicgfHwgXG5cdFx0XHRwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3VwJ1xuXHRcdCkpIHtcblx0XHRcdGN1cnJlbnQgPSBwYXJlbnQ7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIGN1cnJlbnQ7XG5cdH1cblxuXHQvLyBFdmVyeSBmb290bm90ZSByZWZlcmVuY2Ugc2hvdWxkIGJlIGEgc3VwIGVsZW1lbnQgd2l0aCBhbiBhbmNob3IgaW5zaWRlXG5cdC8vIGUuZy4gPHN1cCBpZD1cImZucmVmOjFcIj48YSBocmVmPVwiI2ZuOjFcIj4xPC9hPjwvc3VwPlxuXHRwcml2YXRlIGNyZWF0ZUZvb3Rub3RlUmVmZXJlbmNlKGZvb3Rub3RlTnVtYmVyOiBzdHJpbmcsIHJlZklkOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG5cdFx0Y29uc3Qgc3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3VwJyk7XG5cdFx0c3VwLmlkID0gcmVmSWQ7XG5cdFx0Y29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRsaW5rLmhyZWYgPSBgI2ZuOiR7Zm9vdG5vdGVOdW1iZXJ9YDtcblx0XHRsaW5rLnRleHRDb250ZW50ID0gZm9vdG5vdGVOdW1iZXI7XG5cdFx0c3VwLmFwcGVuZENoaWxkKGxpbmspO1xuXHRcdHJldHVybiBzdXA7XG5cdH1cblxuXHRwcml2YXRlIHN0YW5kYXJkaXplRm9vdG5vdGVzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRjb25zdCBmb290bm90ZXMgPSB0aGlzLmNvbGxlY3RGb290bm90ZXMoZWxlbWVudCk7XG5cblx0XHQvLyBTdGFuZGFyZGl6ZSBpbmxpbmUgZm9vdG5vdGVzIHVzaW5nIHRoZSBjb2xsZWN0ZWQgSURzXG5cdFx0Y29uc3QgZm9vdG5vdGVJbmxpbmVSZWZlcmVuY2VzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPT1ROT1RFX0lOTElORV9SRUZFUkVOQ0VTKTtcblx0XHRcblx0XHQvLyBHcm91cCByZWZlcmVuY2VzIGJ5IHRoZWlyIHBhcmVudCBzdXAgZWxlbWVudFxuXHRcdGNvbnN0IHN1cEdyb3VwcyA9IG5ldyBNYXA8RWxlbWVudCwgRWxlbWVudFtdPigpO1xuXHRcdFxuXHRcdGZvb3Rub3RlSW5saW5lUmVmZXJlbmNlcy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm47XG5cblx0XHRcdGxldCBmb290bm90ZUlkID0gJyc7XG5cdFx0XHRsZXQgZm9vdG5vdGVDb250ZW50ID0gJyc7XG5cblx0XHRcdC8vIEV4dHJhY3QgZm9vdG5vdGUgSUQgYmFzZWQgb24gZWxlbWVudCB0eXBlXG5cdFx0XHQvLyBOYXR1cmUuY29tXG5cdFx0XHRpZiAoZWwubWF0Y2hlcygnYVtpZF49XCJyZWYtbGlua1wiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0Ly8gU2NpZW5jZS5vcmdcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYVtyb2xlPVwiZG9jLWJpYmxpb3JlZlwiXScpKSB7XG5cdFx0XHRcdGNvbnN0IHhtbFJpZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS14bWwtcmlkJyk7XG5cdFx0XHRcdGlmICh4bWxSaWQpIHtcblx0XHRcdFx0XHRmb290bm90ZUlkID0geG1sUmlkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IGhyZWYgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRpZiAoaHJlZj8uc3RhcnRzV2l0aCgnI2NvcmUtUicpKSB7XG5cdFx0XHRcdFx0XHRmb290bm90ZUlkID0gaHJlZi5yZXBsYWNlKCcjY29yZS0nLCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQvLyBTdWJzdGFja1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhLmZvb3Rub3RlLWFuY2hvciwgc3Bhbi5mb290bm90ZS1ob3ZlcmNhcmQtdGFyZ2V0IGEnKSkge1xuXHRcdFx0XHRjb25zdCBpZCA9IGVsLmlkPy5yZXBsYWNlKCdmb290bm90ZS1hbmNob3ItJywgJycpIHx8ICcnO1xuXHRcdFx0XHRpZiAoaWQpIHtcblx0XHRcdFx0XHRmb290bm90ZUlkID0gaWQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0Ly8gQXJ4aXZcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnY2l0ZS5sdHhfY2l0ZScpKSB7XG5cdFx0XHRcdGNvbnN0IGxpbmsgPSBlbC5xdWVyeVNlbGVjdG9yKCdhJyk7XG5cdFx0XHRcdGlmIChsaW5rKSB7XG5cdFx0XHRcdFx0Y29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdFx0aWYgKGhyZWYpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gaHJlZi5zcGxpdCgnLycpLnBvcCgpPy5tYXRjaCgvYmliXFwuYmliKFxcZCspLyk7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3N1cC5yZWZlcmVuY2UnKSkge1xuXHRcdFx0XHRjb25zdCBsaW5rcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHRcdFx0QXJyYXkuZnJvbShsaW5rcykuZm9yRWFjaChsaW5rID0+IHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBocmVmLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC8oPzpjaXRlX25vdGV8Y2l0ZV9yZWYpLSguKykvKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRmb290bm90ZUlkID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzdXBbaWRePVwiZm5yZWY6XCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmlkLnJlcGxhY2UoJ2ZucmVmOicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzdXBbaWRePVwiZm5yXCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmlkLnJlcGxhY2UoJ2ZucicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzcGFuLmZvb3Rub3RlLXJlZmVyZW5jZScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vdG5vdGUtaWQnKSB8fCAnJztcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3Bhbi5mb290bm90ZS1saW5rJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb290bm90ZS1pZCcpIHx8ICcnO1xuXHRcdFx0XHRmb290bm90ZUNvbnRlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vdG5vdGUtY29udGVudCcpIHx8ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhLmNpdGF0aW9uJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdGZvb3Rub3RlQ29udGVudCA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhW2lkXj1cImZucmVmXCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmlkLnJlcGxhY2UoJ2ZucmVmJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBPdGhlciBjaXRhdGlvbiB0eXBlc1xuXHRcdFx0XHRjb25zdCBocmVmID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBocmVmLnJlcGxhY2UoL15bI10vLCAnJyk7XG5cdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IGlkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGZvb3Rub3RlSWQpIHtcblx0XHRcdFx0Ly8gRmluZCB0aGUgZm9vdG5vdGUgbnVtYmVyIGJ5IG1hdGNoaW5nIHRoZSBvcmlnaW5hbCBJRFxuXHRcdFx0XHRjb25zdCBmb290bm90ZUVudHJ5ID0gT2JqZWN0LmVudHJpZXMoZm9vdG5vdGVzKS5maW5kKFxuXHRcdFx0XHRcdChbXywgZGF0YV0pID0+IGRhdGEub3JpZ2luYWxJZCA9PT0gZm9vdG5vdGVJZC50b0xvd2VyQ2FzZSgpXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0aWYgKGZvb3Rub3RlRW50cnkpIHtcblx0XHRcdFx0XHRjb25zdCBbZm9vdG5vdGVOdW1iZXIsIGZvb3Rub3RlRGF0YV0gPSBmb290bm90ZUVudHJ5O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIENyZWF0ZSBmb290bm90ZSByZWZlcmVuY2UgSURcblx0XHRcdFx0XHRjb25zdCByZWZJZCA9IGZvb3Rub3RlRGF0YS5yZWZzLmxlbmd0aCA+IDAgPyBcblx0XHRcdFx0XHRcdGBmbnJlZjoke2Zvb3Rub3RlTnVtYmVyfS0ke2Zvb3Rub3RlRGF0YS5yZWZzLmxlbmd0aCArIDF9YCA6IFxuXHRcdFx0XHRcdFx0YGZucmVmOiR7Zm9vdG5vdGVOdW1iZXJ9YDtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmb290bm90ZURhdGEucmVmcy5wdXNoKHJlZklkKTtcblxuXHRcdFx0XHRcdC8vIEZpbmQgdGhlIG91dGVybW9zdCBjb250YWluZXIgKHNwYW4gb3Igc3VwKVxuXHRcdFx0XHRcdGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZmluZE91dGVyRm9vdG5vdGVDb250YWluZXIoZWwpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIElmIGNvbnRhaW5lciBpcyBhIHN1cCwgZ3JvdXAgcmVmZXJlbmNlc1xuXHRcdFx0XHRcdGlmIChjb250YWluZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3VwJykge1xuXHRcdFx0XHRcdFx0aWYgKCFzdXBHcm91cHMuaGFzKGNvbnRhaW5lcikpIHtcblx0XHRcdFx0XHRcdFx0c3VwR3JvdXBzLnNldChjb250YWluZXIsIFtdKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IGdyb3VwID0gc3VwR3JvdXBzLmdldChjb250YWluZXIpITtcblx0XHRcdFx0XHRcdGdyb3VwLnB1c2godGhpcy5jcmVhdGVGb290bm90ZVJlZmVyZW5jZShmb290bm90ZU51bWJlciwgcmVmSWQpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gUmVwbGFjZSB0aGUgY29udGFpbmVyIGRpcmVjdGx5XG5cdFx0XHRcdFx0XHRjb250YWluZXIucmVwbGFjZVdpdGgodGhpcy5jcmVhdGVGb290bm90ZVJlZmVyZW5jZShmb290bm90ZU51bWJlciwgcmVmSWQpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEhhbmRsZSBncm91cGVkIHJlZmVyZW5jZXNcblx0XHRzdXBHcm91cHMuZm9yRWFjaCgocmVmZXJlbmNlcywgY29udGFpbmVyKSA9PiB7XG5cdFx0XHRpZiAocmVmZXJlbmNlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdC8vIENyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50IHRvIGhvbGQgYWxsIHRoZSByZWZlcmVuY2VzXG5cdFx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQWRkIGVhY2ggcmVmZXJlbmNlIGFzIGl0cyBvd24gc3VwIGVsZW1lbnRcblx0XHRcdFx0cmVmZXJlbmNlcy5mb3JFYWNoKChyZWYsIGluZGV4KSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgbGluayA9IHJlZi5xdWVyeVNlbGVjdG9yKCdhJyk7XG5cdFx0XHRcdFx0aWYgKGxpbmspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHN1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N1cCcpO1xuXHRcdFx0XHRcdFx0c3VwLmlkID0gcmVmLmlkO1xuXHRcdFx0XHRcdFx0c3VwLmFwcGVuZENoaWxkKGxpbmsuY2xvbmVOb2RlKHRydWUpKTtcblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKHN1cCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdGNvbnRhaW5lci5yZXBsYWNlV2l0aChmcmFnbWVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBDcmVhdGUgdGhlIHN0YW5kYXJkaXplZCBmb290bm90ZSBsaXN0XG5cdFx0Y29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG5ld0xpc3QuY2xhc3NOYW1lID0gJ2Zvb3Rub3Rlcyc7XG5cdFx0Y29uc3Qgb3JkZXJlZExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpO1xuXG5cdFx0Ly8gQ3JlYXRlIGZvb3Rub3RlIGl0ZW1zIGluIG9yZGVyXG5cdFx0T2JqZWN0LmVudHJpZXMoZm9vdG5vdGVzKS5mb3JFYWNoKChbbnVtYmVyLCBkYXRhXSkgPT4ge1xuXHRcdFx0Y29uc3QgbmV3SXRlbSA9IHRoaXMuY3JlYXRlRm9vdG5vdGVJdGVtKFxuXHRcdFx0XHRwYXJzZUludChudW1iZXIpLFxuXHRcdFx0XHRkYXRhLmNvbnRlbnQsXG5cdFx0XHRcdGRhdGEucmVmc1xuXHRcdFx0KTtcblx0XHRcdG9yZGVyZWRMaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIG9yaWdpbmFsIGZvb3Rub3RlIGxpc3RzXG5cdFx0Y29uc3QgZm9vdG5vdGVMaXN0cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT09UTk9URV9MSVNUX1NFTEVDVE9SUyk7XG5cdFx0Zm9vdG5vdGVMaXN0cy5mb3JFYWNoKGxpc3QgPT4gbGlzdC5yZW1vdmUoKSk7XG5cblx0XHQvLyBJZiB3ZSBoYXZlIGFueSBmb290bm90ZXMsIGFkZCB0aGUgbmV3IGxpc3QgdG8gdGhlIGRvY3VtZW50XG5cdFx0aWYgKG9yZGVyZWRMaXN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdG5ld0xpc3QuYXBwZW5kQ2hpbGQob3JkZXJlZExpc3QpO1xuXHRcdFx0ZWxlbWVudC5hcHBlbmRDaGlsZChuZXdMaXN0KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGhhbmRsZUxhenlJbWFnZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cdFx0Y29uc3QgbGF6eUltYWdlcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nW2RhdGEtc3JjXSwgaW1nW2RhdGEtc3Jjc2V0XScpO1xuXG5cdFx0bGF6eUltYWdlcy5mb3JFYWNoKGltZyA9PiB7XG5cdFx0XHRpZiAoIShpbWcgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSkgcmV0dXJuO1xuXG5cdFx0XHQvLyBIYW5kbGUgZGF0YS1zcmNcblx0XHRcdGNvbnN0IGRhdGFTcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aWYgKGRhdGFTcmMgJiYgIWltZy5zcmMpIHtcblx0XHRcdFx0aW1nLnNyYyA9IGRhdGFTcmM7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEhhbmRsZSBkYXRhLXNyY3NldFxuXHRcdFx0Y29uc3QgZGF0YVNyY3NldCA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRpZiAoZGF0YVNyY3NldCAmJiAhaW1nLnNyY3NldCkge1xuXHRcdFx0XHRpbWcuc3Jjc2V0ID0gZGF0YVNyY3NldDtcblx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGxhenkgbG9hZGluZyByZWxhdGVkIGNsYXNzZXMgYW5kIGF0dHJpYnV0ZXNcblx0XHRcdGltZy5jbGFzc0xpc3QucmVtb3ZlKCdsYXp5JywgJ2xhenlsb2FkJyk7XG5cdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWxsLXN0YXR1cycpO1xuXHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcblx0XHRcdGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1Byb2Nlc3NlZCBsYXp5IGltYWdlczonLCBwcm9jZXNzZWRDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YW5kYXJkaXplRWxlbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cblx0XHQvLyBDb252ZXJ0IGVsZW1lbnRzIGJhc2VkIG9uIHN0YW5kYXJkaXphdGlvbiBydWxlc1xuXHRcdEVMRU1FTlRfU1RBTkRBUkRJWkFUSU9OX1JVTEVTLmZvckVhY2gocnVsZSA9PiB7XG5cdFx0XHRjb25zdCBlbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChydWxlLnNlbGVjdG9yKTtcblx0XHRcdGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0XHRpZiAocnVsZS50cmFuc2Zvcm0pIHtcblx0XHRcdFx0XHQvLyBJZiB0aGVyZSdzIGEgdHJhbnNmb3JtIGZ1bmN0aW9uLCB1c2UgaXQgdG8gY3JlYXRlIHRoZSBuZXcgZWxlbWVudFxuXHRcdFx0XHRcdGNvbnN0IHRyYW5zZm9ybWVkID0gcnVsZS50cmFuc2Zvcm0oZWwpO1xuXHRcdFx0XHRcdGVsLnJlcGxhY2VXaXRoKHRyYW5zZm9ybWVkKTtcblx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIENvbnZlcnQgbGl0ZS15b3V0dWJlIGVsZW1lbnRzXG5cdFx0Y29uc3QgbGl0ZVlvdXR1YmVFbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGl0ZS15b3V0dWJlJyk7XG5cdFx0bGl0ZVlvdXR1YmVFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdGNvbnN0IHZpZGVvSWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZGVvaWQnKTtcblx0XHRcdGlmICghdmlkZW9JZCkgcmV0dXJuO1xuXG5cdFx0XHRjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcblx0XHRcdGlmcmFtZS53aWR0aCA9ICc1NjAnO1xuXHRcdFx0aWZyYW1lLmhlaWdodCA9ICczMTUnO1xuXHRcdFx0aWZyYW1lLnNyYyA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3ZpZGVvSWR9YDtcblx0XHRcdGlmcmFtZS50aXRsZSA9IGVsLmdldEF0dHJpYnV0ZSgndmlkZW90aXRsZScpIHx8ICdZb3VUdWJlIHZpZGVvIHBsYXllcic7XG5cdFx0XHRpZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCc7XG5cdFx0XHRpZnJhbWUuYWxsb3cgPSAnYWNjZWxlcm9tZXRlcjsgYXV0b3BsYXk7IGNsaXBib2FyZC13cml0ZTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZTsgd2ViLXNoYXJlJztcblx0XHRcdGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93ZnVsbHNjcmVlbicsICcnKTtcblxuXHRcdFx0ZWwucmVwbGFjZVdpdGgoaWZyYW1lKTtcblx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0fSk7XG5cblx0XHQvLyBBZGQgZnV0dXJlIGVtYmVkIGNvbnZlcnNpb25zIChUd2l0dGVyLCBJbnN0YWdyYW0sIGV0Yy4pXG5cblx0XHR0aGlzLl9sb2coJ0NvbnZlcnRlZCBlbWJlZGRlZCBlbGVtZW50czonLCBwcm9jZXNzZWRDb3VudCk7XG5cdH1cblxuXHQvLyBGaW5kIHNtYWxsIElNRyBhbmQgU1ZHIGVsZW1lbnRzXG5cdHByaXZhdGUgZmluZFNtYWxsSW1hZ2VzKGRvYzogRG9jdW1lbnQpOiBTZXQ8c3RyaW5nPiB7XG5cdFx0Y29uc3QgTUlOX0RJTUVOU0lPTiA9IDMzO1xuXHRcdGNvbnN0IHNtYWxsSW1hZ2VzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cdFx0Y29uc3QgdHJhbnNmb3JtUmVnZXggPSAvc2NhbGVcXCgoW1xcZC5dKylcXCkvO1xuXHRcdGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cblx0XHQvLyAxLiBSZWFkIHBoYXNlIC0gR2F0aGVyIGFsbCBlbGVtZW50cyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0Y29uc3QgZWxlbWVudHMgPSBbXG5cdFx0XHQuLi5BcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJykpLFxuXHRcdFx0Li4uQXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N2ZycpKVxuXHRcdF0uZmlsdGVyKGVsZW1lbnQgPT4ge1xuXHRcdFx0Ly8gU2tpcCBsYXp5LWxvYWRlZCBpbWFnZXMgdGhhdCBoYXZlbid0IGJlZW4gcHJvY2Vzc2VkIHlldFxuXHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsYXp5JykgfHwgXG5cdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xhenlsb2FkJykgfHxcblx0XHRcdFx0XHRlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1zcmMnKSB8fFxuXHRcdFx0XHRcdGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdFx0XHRyZXR1cm4gIWlzTGF6eTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIHNtYWxsSW1hZ2VzO1xuXHRcdH1cblxuXHRcdC8vIDIuIEJhdGNoIHByb2Nlc3MgLSBDb2xsZWN0IGFsbCBtZWFzdXJlbWVudHMgaW4gb25lIGdvXG5cdFx0Y29uc3QgbWVhc3VyZW1lbnRzID0gZWxlbWVudHMubWFwKGVsZW1lbnQgPT4gKHtcblx0XHRcdGVsZW1lbnQsXG5cdFx0XHQvLyBTdGF0aWMgYXR0cmlidXRlcyAobm8gcmVmbG93KVxuXHRcdFx0bmF0dXJhbFdpZHRoOiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCA/IGVsZW1lbnQubmF0dXJhbFdpZHRoIDogMCxcblx0XHRcdG5hdHVyYWxIZWlnaHQ6IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ID8gZWxlbWVudC5uYXR1cmFsSGVpZ2h0IDogMCxcblx0XHRcdGF0dHJXaWR0aDogcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgfHwgJzAnKSxcblx0XHRcdGF0dHJIZWlnaHQ6IHBhcnNlSW50KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSB8fCAnMCcpXG5cdFx0fSkpO1xuXG5cdFx0Ly8gMy4gQmF0Y2ggY29tcHV0ZSBzdHlsZXMgLSBQcm9jZXNzIGluIGNodW5rcyB0byBhdm9pZCBsb25nIHRhc2tzXG5cdFx0Y29uc3QgQkFUQ0hfU0laRSA9IDUwO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWVhc3VyZW1lbnRzLmxlbmd0aDsgaSArPSBCQVRDSF9TSVpFKSB7XG5cdFx0XHRjb25zdCBiYXRjaCA9IG1lYXN1cmVtZW50cy5zbGljZShpLCBpICsgQkFUQ0hfU0laRSk7XG5cdFx0XHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIFJlYWQgcGhhc2UgLSBjb21wdXRlIGFsbCBzdHlsZXMgYXQgb25jZVxuXHRcdFx0XHRjb25zdCBzdHlsZXMgPSBiYXRjaC5tYXAoKHsgZWxlbWVudCB9KSA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSk7XG5cdFx0XHRcdGNvbnN0IHJlY3RzID0gYmF0Y2gubWFwKCh7IGVsZW1lbnQgfSkgPT4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBQcm9jZXNzIHBoYXNlIC0gbm8gRE9NIG9wZXJhdGlvbnNcblx0XHRcdFx0YmF0Y2guZm9yRWFjaCgobWVhc3VyZW1lbnQsIGluZGV4KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHN0eWxlID0gc3R5bGVzW2luZGV4XTtcblx0XHRcdFx0XHRcdGNvbnN0IHJlY3QgPSByZWN0c1tpbmRleF07XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIEdldCB0cmFuc2Zvcm0gc2NhbGUgaW4gdGhlIHNhbWUgYmF0Y2hcblx0XHRcdFx0XHRcdGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybTtcblx0XHRcdFx0XHRcdGNvbnN0IHNjYWxlID0gdHJhbnNmb3JtID8gXG5cdFx0XHRcdFx0XHRcdHBhcnNlRmxvYXQodHJhbnNmb3JtLm1hdGNoKHRyYW5zZm9ybVJlZ2V4KT8uWzFdIHx8ICcxJykgOiAxO1xuXG5cdFx0XHRcdFx0XHQvLyBDYWxjdWxhdGUgZWZmZWN0aXZlIGRpbWVuc2lvbnNcblx0XHRcdFx0XHRcdGNvbnN0IHdpZHRocyA9IFtcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQubmF0dXJhbFdpZHRoLFxuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5hdHRyV2lkdGgsXG5cdFx0XHRcdFx0XHRcdHBhcnNlSW50KHN0eWxlLndpZHRoKSB8fCAwLFxuXHRcdFx0XHRcdFx0XHRyZWN0LndpZHRoICogc2NhbGVcblx0XHRcdFx0XHRcdF0uZmlsdGVyKGRpbSA9PiB0eXBlb2YgZGltID09PSAnbnVtYmVyJyAmJiBkaW0gPiAwKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgaGVpZ2h0cyA9IFtcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQubmF0dXJhbEhlaWdodCxcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQuYXR0ckhlaWdodCxcblx0XHRcdFx0XHRcdFx0cGFyc2VJbnQoc3R5bGUuaGVpZ2h0KSB8fCAwLFxuXHRcdFx0XHRcdFx0XHRyZWN0LmhlaWdodCAqIHNjYWxlXG5cdFx0XHRcdFx0XHRdLmZpbHRlcihkaW0gPT4gdHlwZW9mIGRpbSA9PT0gJ251bWJlcicgJiYgZGltID4gMCk7XG5cblx0XHRcdFx0XHRcdC8vIERlY2lzaW9uIHBoYXNlIC0gbm8gRE9NIG9wZXJhdGlvbnNcblx0XHRcdFx0XHRcdGlmICh3aWR0aHMubGVuZ3RoID4gMCAmJiBoZWlnaHRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZWZmZWN0aXZlV2lkdGggPSBNYXRoLm1pbiguLi53aWR0aHMpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlZmZlY3RpdmVIZWlnaHQgPSBNYXRoLm1pbiguLi5oZWlnaHRzKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoZWZmZWN0aXZlV2lkdGggPCBNSU5fRElNRU5TSU9OIHx8IGVmZmVjdGl2ZUhlaWdodCA8IE1JTl9ESU1FTlNJT04pIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBpZGVudGlmaWVyID0gdGhpcy5nZXRFbGVtZW50SWRlbnRpZmllcihtZWFzdXJlbWVudC5lbGVtZW50KTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaWRlbnRpZmllcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0c21hbGxJbWFnZXMuYWRkKGlkZW50aWZpZXIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBlbGVtZW50IGRpbWVuc2lvbnM6JywgZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBiYXRjaDonLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLl9sb2coJ0ZvdW5kIHNtYWxsIGVsZW1lbnRzOicsIHtcblx0XHRcdGNvdW50OiBwcm9jZXNzZWRDb3VudCxcblx0XHRcdHRvdGFsRWxlbWVudHM6IGVsZW1lbnRzLmxlbmd0aCxcblx0XHRcdHByb2Nlc3NpbmdUaW1lOiBgJHsoZW5kVGltZSAtIHN0YXJ0VGltZSkudG9GaXhlZCgyKX1tc2Bcblx0XHR9KTtcblxuXHRcdHJldHVybiBzbWFsbEltYWdlcztcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlU21hbGxJbWFnZXMoZG9jOiBEb2N1bWVudCwgc21hbGxJbWFnZXM6IFNldDxzdHJpbmc+KSB7XG5cdFx0bGV0IHJlbW92ZWRDb3VudCA9IDA7XG5cblx0XHRbJ2ltZycsICdzdmcnXS5mb3JFYWNoKHRhZyA9PiB7XG5cdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xuXHRcdFx0QXJyYXkuZnJvbShlbGVtZW50cykuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0Y29uc3QgaWRlbnRpZmllciA9IHRoaXMuZ2V0RWxlbWVudElkZW50aWZpZXIoZWxlbWVudCk7XG5cdFx0XHRcdGlmIChpZGVudGlmaWVyICYmIHNtYWxsSW1hZ2VzLmhhcyhpZGVudGlmaWVyKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlKCk7XG5cdFx0XHRcdFx0cmVtb3ZlZENvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIHNtYWxsIGVsZW1lbnRzOicsIHJlbW92ZWRDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIGdldEVsZW1lbnRJZGVudGlmaWVyKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcgfCBudWxsIHtcblx0XHQvLyBUcnkgdG8gY3JlYXRlIGEgdW5pcXVlIGlkZW50aWZpZXIgdXNpbmcgdmFyaW91cyBhdHRyaWJ1dGVzXG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG5cdFx0XHQvLyBGb3IgbGF6eS1sb2FkZWQgaW1hZ2VzLCB1c2UgZGF0YS1zcmMgYXMgaWRlbnRpZmllciBpZiBhdmFpbGFibGVcblx0XHRcdGNvbnN0IGRhdGFTcmMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcblx0XHRcdGlmIChkYXRhU3JjKSByZXR1cm4gYHNyYzoke2RhdGFTcmN9YDtcblx0XHRcdFxuXHRcdFx0Y29uc3Qgc3JjID0gZWxlbWVudC5zcmMgfHwgJyc7XG5cdFx0XHRjb25zdCBzcmNzZXQgPSBlbGVtZW50LnNyY3NldCB8fCAnJztcblx0XHRcdGNvbnN0IGRhdGFTcmNzZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHRcdFxuXHRcdFx0aWYgKHNyYykgcmV0dXJuIGBzcmM6JHtzcmN9YDtcblx0XHRcdGlmIChzcmNzZXQpIHJldHVybiBgc3Jjc2V0OiR7c3Jjc2V0fWA7XG5cdFx0XHRpZiAoZGF0YVNyY3NldCkgcmV0dXJuIGBzcmNzZXQ6JHtkYXRhU3Jjc2V0fWA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaWQgPSBlbGVtZW50LmlkIHx8ICcnO1xuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lIHx8ICcnO1xuXHRcdGNvbnN0IHZpZXdCb3ggPSBlbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2aWV3Qm94JykgfHwgJycgOiAnJztcblx0XHRcblx0XHRpZiAoaWQpIHJldHVybiBgaWQ6JHtpZH1gO1xuXHRcdGlmICh2aWV3Qm94KSByZXR1cm4gYHZpZXdCb3g6JHt2aWV3Qm94fWA7XG5cdFx0aWYgKGNsYXNzTmFtZSkgcmV0dXJuIGBjbGFzczoke2NsYXNzTmFtZX1gO1xuXHRcdFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kTWFpbkNvbnRlbnQoZG9jOiBEb2N1bWVudCk6IEVsZW1lbnQgfCBudWxsIHtcblxuXHRcdC8vIEZpbmQgYWxsIHBvdGVudGlhbCBjb250ZW50IGNvbnRhaW5lcnNcblx0XHRjb25zdCBjYW5kaWRhdGVzOiB7IGVsZW1lbnQ6IEVsZW1lbnQ7IHNjb3JlOiBudW1iZXIgfVtdID0gW107XG5cblx0XHRFTlRSWV9QT0lOVF9FTEVNRU5UUy5mb3JFYWNoKChzZWxlY3RvciwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0Ly8gQmFzZSBzY29yZSBmcm9tIHNlbGVjdG9yIHByaW9yaXR5IChlYXJsaWVyID0gaGlnaGVyKVxuXHRcdFx0XHRsZXQgc2NvcmUgPSAoRU5UUllfUE9JTlRfRUxFTUVOVFMubGVuZ3RoIC0gaW5kZXgpICogMTA7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBBZGQgc2NvcmUgYmFzZWQgb24gY29udGVudCBhbmFseXNpc1xuXHRcdFx0XHRzY29yZSArPSB0aGlzLnNjb3JlRWxlbWVudChlbGVtZW50KTtcblx0XHRcdFx0XG5cdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCh7IGVsZW1lbnQsIHNjb3JlIH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRpZiAoY2FuZGlkYXRlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdC8vIEZhbGwgYmFjayB0byBzY29yaW5nIGJsb2NrIGVsZW1lbnRzXG5cdFx0XHQvLyBDdXJyZW50bHkgPGJvZHk+IGVsZW1lbnQgaXMgdXNlZCBhcyB0aGUgZmFsbGJhY2ssIHNvIHRoaXMgaXMgbm90IHVzZWRcblx0XHRcdHJldHVybiB0aGlzLmZpbmRDb250ZW50QnlTY29yaW5nKGRvYyk7XG5cdFx0fVxuXG5cdFx0Ly8gU29ydCBieSBzY29yZSBkZXNjZW5kaW5nXG5cdFx0Y2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG5cdFx0XG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdHRoaXMuX2xvZygnQ29udGVudCBjYW5kaWRhdGVzOicsIGNhbmRpZGF0ZXMubWFwKGMgPT4gKHtcblx0XHRcdFx0ZWxlbWVudDogYy5lbGVtZW50LnRhZ05hbWUsXG5cdFx0XHRcdHNlbGVjdG9yOiB0aGlzLmdldEVsZW1lbnRTZWxlY3RvcihjLmVsZW1lbnQpLFxuXHRcdFx0XHRzY29yZTogYy5zY29yZVxuXHRcdFx0fSkpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FuZGlkYXRlc1swXS5lbGVtZW50O1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kQ29udGVudEJ5U2NvcmluZyhkb2M6IERvY3VtZW50KTogRWxlbWVudCB8IG51bGwge1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXMgPSB0aGlzLnNjb3JlRWxlbWVudHMoZG9jKTtcblx0XHRyZXR1cm4gY2FuZGlkYXRlcy5sZW5ndGggPiAwID8gY2FuZGlkYXRlc1swXS5lbGVtZW50IDogbnVsbDtcblx0fVxuXG5cdHByaXZhdGUgZ2V0RWxlbWVudFNlbGVjdG9yKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdGxldCBjdXJyZW50OiBFbGVtZW50IHwgbnVsbCA9IGVsZW1lbnQ7XG5cdFx0XG5cdFx0d2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gdGhpcy5kb2MuZG9jdW1lbnRFbGVtZW50KSB7XG5cdFx0XHRsZXQgc2VsZWN0b3IgPSBjdXJyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmIChjdXJyZW50LmlkKSB7XG5cdFx0XHRcdHNlbGVjdG9yICs9ICcjJyArIGN1cnJlbnQuaWQ7XG5cdFx0XHR9IGVsc2UgaWYgKGN1cnJlbnQuY2xhc3NOYW1lICYmIHR5cGVvZiBjdXJyZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0c2VsZWN0b3IgKz0gJy4nICsgY3VycmVudC5jbGFzc05hbWUudHJpbSgpLnNwbGl0KC9cXHMrLykuam9pbignLicpO1xuXHRcdFx0fVxuXHRcdFx0cGFydHMudW5zaGlmdChzZWxlY3Rvcik7XG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gcGFydHMuam9pbignID4gJyk7XG5cdH1cblxuXHRwcml2YXRlIHNjb3JlRWxlbWVudHMoZG9jOiBEb2N1bWVudCk6IENvbnRlbnRTY29yZVtdIHtcblx0XHRjb25zdCBjYW5kaWRhdGVzOiBDb250ZW50U2NvcmVbXSA9IFtdO1xuXG5cdFx0QkxPQ0tfRUxFTUVOVFMuZm9yRWFjaCgodGFnOiBzdHJpbmcpID0+IHtcblx0XHRcdEFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZykpLmZvckVhY2goKGVsZW1lbnQ6IEVsZW1lbnQpID0+IHtcblx0XHRcdFx0Y29uc3Qgc2NvcmUgPSB0aGlzLnNjb3JlRWxlbWVudChlbGVtZW50KTtcblx0XHRcdFx0aWYgKHNjb3JlID4gMCkge1xuXHRcdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCh7IHNjb3JlLCBlbGVtZW50IH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBjYW5kaWRhdGVzLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcblx0fVxuXG5cdHByaXZhdGUgc2NvcmVFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBudW1iZXIge1xuXHRcdGxldCBzY29yZSA9IDA7XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBlbGVtZW50IHByb3BlcnRpZXNcblx0XHRjb25zdCBjbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSAmJiB0eXBlb2YgZWxlbWVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnID8gXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdFx0Y29uc3QgaWQgPSBlbGVtZW50LmlkID8gZWxlbWVudC5pZC50b0xvd2VyQ2FzZSgpIDogJyc7XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBjb250ZW50XG5cdFx0Y29uc3QgdGV4dCA9IGVsZW1lbnQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0Y29uc3Qgd29yZHMgPSB0ZXh0LnNwbGl0KC9cXHMrLykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IE1hdGgubWluKE1hdGguZmxvb3Iod29yZHMgLyAxMDApLCAzKTtcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGxpbmsgZGVuc2l0eVxuXHRcdGNvbnN0IGxpbmtzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpO1xuXHRcdGNvbnN0IGxpbmtUZXh0ID0gQXJyYXkuZnJvbShsaW5rcykucmVkdWNlKChhY2MsIGxpbmspID0+IGFjYyArIChsaW5rLnRleHRDb250ZW50Py5sZW5ndGggfHwgMCksIDApO1xuXHRcdGNvbnN0IGxpbmtEZW5zaXR5ID0gdGV4dC5sZW5ndGggPyBsaW5rVGV4dCAvIHRleHQubGVuZ3RoIDogMDtcblx0XHRpZiAobGlua0RlbnNpdHkgPiAwLjUpIHtcblx0XHRcdHNjb3JlIC09IDEwO1xuXHRcdH1cblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIHByZXNlbmNlIG9mIG1lYW5pbmdmdWwgZWxlbWVudHNcblx0XHRjb25zdCBwYXJhZ3JhcGhzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncCcpLmxlbmd0aDtcblx0XHRzY29yZSArPSBwYXJhZ3JhcGhzO1xuXG5cdFx0Y29uc3QgaW1hZ2VzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IE1hdGgubWluKGltYWdlcyAqIDMsIDkpO1xuXG5cdFx0cmV0dXJuIHNjb3JlO1xuXHR9XG59ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJleHBvcnQgeyBEZWZ1ZGRsZSB9IGZyb20gJy4vZGVmdWRkbGUnO1xuZXhwb3J0IHR5cGUgeyBEZWZ1ZGRsZU9wdGlvbnMsIERlZnVkZGxlUmVzcG9uc2UsIERlZnVkZGxlTWV0YWRhdGEgfSBmcm9tICcuL3R5cGVzJzsgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
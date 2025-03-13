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
            this.getAuthor(doc, schemaOrgData));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsV0FBQyxVQUFHLEdBQUcsQ0FBQyxXQUFJLENBQUMsV0FBVywwQ0FBRSxNQUFNLEtBQUksQ0FBQyxDQUFDLEtBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkcsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUN2QixLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUVELGlEQUFpRDtRQUNqRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzVELEtBQUssSUFBSSxVQUFVLENBQUM7UUFFcEIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMxRCxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpDLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztDQUNEO0FBMW9DRCw0QkEwb0NDOzs7Ozs7O1VDMXRFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBLDREQUFzQztBQUE3Qiw2R0FBUSIsInNvdXJjZXMiOlsid2VicGFjazovL0RlZnVkZGxlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9tZXRhZGF0YS50cyIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9kZWZ1ZGRsZS50cyIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9EZWZ1ZGRsZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWZ1ZGRsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWZ1ZGRsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsICgpID0+IHtcbnJldHVybiAiLCJpbXBvcnQgeyBEZWZ1ZGRsZU1ldGFkYXRhIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUV4dHJhY3RvciB7XG5cdHN0YXRpYyBleHRyYWN0KGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IERlZnVkZGxlTWV0YWRhdGEge1xuXHRcdGxldCBkb21haW4gPSAnJztcblx0XHRsZXQgdXJsID0gJyc7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gVHJ5IHRvIGdldCBVUkwgZnJvbSBkb2N1bWVudCBsb2NhdGlvblxuXHRcdFx0dXJsID0gZG9jLmxvY2F0aW9uPy5ocmVmIHx8ICcnO1xuXHRcdFx0XG5cdFx0XHQvLyBJZiBubyBVUkwgZnJvbSBsb2NhdGlvbiwgdHJ5IG90aGVyIHNvdXJjZXNcblx0XHRcdGlmICghdXJsKSB7XG5cdFx0XHRcdHVybCA9IHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6dXJsXCIpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJ0d2l0dGVyOnVybFwiKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAndXJsJykgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ21haW5FbnRpdHlPZlBhZ2UudXJsJykgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ21haW5FbnRpdHkudXJsJykgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ1dlYlNpdGUudXJsJykgfHxcblx0XHRcdFx0XHRkb2MucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJjYW5vbmljYWxcIl0nKT8uZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh1cmwpIHtcblx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gSWYgVVJMIHBhcnNpbmcgZmFpbHMsIHRyeSB0byBnZXQgZnJvbSBiYXNlIHRhZ1xuXHRcdFx0Y29uc3QgYmFzZVRhZyA9IGRvYy5xdWVyeVNlbGVjdG9yKCdiYXNlW2hyZWZdJyk7XG5cdFx0XHRpZiAoYmFzZVRhZykge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHVybCA9IGJhc2VUYWcuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHRcdFx0ZG9tYWluID0gbmV3IFVSTCh1cmwpLmhvc3RuYW1lLnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBwYXJzZSBiYXNlIFVSTDonLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogdGhpcy5nZXRUaXRsZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0ZGVzY3JpcHRpb246IHRoaXMuZ2V0RGVzY3JpcHRpb24oZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdGRvbWFpbixcblx0XHRcdGZhdmljb246IHRoaXMuZ2V0RmF2aWNvbihkb2MsIHVybCksXG5cdFx0XHRpbWFnZTogdGhpcy5nZXRJbWFnZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0cHVibGlzaGVkOiB0aGlzLmdldFB1Ymxpc2hlZChkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0YXV0aG9yOiB0aGlzLmdldEF1dGhvcihkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0c2l0ZTogdGhpcy5nZXRTaXRlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRzY2hlbWFPcmdEYXRhLFxuXHRcdFx0d29yZENvdW50OiAwLFxuXHRcdFx0cGFyc2VUaW1lOiAwXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEF1dGhvcihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2F1dGhvci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYnlsXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXV0aG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXV0aG9yTGlzdFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImNvcHlyaWdodFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdjb3B5cmlnaHRIb2xkZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnNpdGVfbmFtZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdwdWJsaXNoZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3NvdXJjZU9yZ2FuaXphdGlvbi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnaXNQYXJ0T2YubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjpjcmVhdG9yXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXBwbGljYXRpb24tbmFtZVwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0U2l0ZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3B1Ymxpc2hlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6c2l0ZV9uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ1dlYlNpdGUubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3NvdXJjZU9yZ2FuaXphdGlvbi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJjb3B5cmlnaHRcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnY29weXJpZ2h0SG9sZGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdpc1BhcnRPZi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhcHBsaWNhdGlvbi1uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldEF1dGhvcihkb2MsIHNjaGVtYU9yZ0RhdGEpXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFRpdGxlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0Y29uc3QgcmF3VGl0bGUgPSAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjp0aXRsZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdoZWFkbGluZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidGl0bGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS50aXRsZVwiKSB8fFxuXHRcdFx0ZG9jLnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJyk/LnRleHRDb250ZW50Py50cmltKCkgfHxcblx0XHRcdCcnXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzLmNsZWFuVGl0bGUocmF3VGl0bGUsIHRoaXMuZ2V0U2l0ZShkb2MsIHNjaGVtYU9yZ0RhdGEpKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGNsZWFuVGl0bGUodGl0bGU6IHN0cmluZywgc2l0ZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0aWYgKCF0aXRsZSB8fCAhc2l0ZU5hbWUpIHJldHVybiB0aXRsZTtcblxuXHRcdC8vIFJlbW92ZSBzaXRlIG5hbWUgaWYgaXQgZXhpc3RzXG5cdFx0Y29uc3Qgc2l0ZU5hbWVFc2NhcGVkID0gc2l0ZU5hbWUucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcblx0XHRjb25zdCBwYXR0ZXJucyA9IFtcblx0XHRcdGBcXFxccypbXFxcXHxcXFxcLeKAk+KAlF1cXFxccyoke3NpdGVOYW1lRXNjYXBlZH1cXFxccyokYCwgLy8gVGl0bGUgfCBTaXRlIE5hbWVcblx0XHRcdGBeXFxcXHMqJHtzaXRlTmFtZUVzY2FwZWR9XFxcXHMqW1xcXFx8XFxcXC3igJPigJRdXFxcXHMqYCwgLy8gU2l0ZSBOYW1lIHwgVGl0bGVcblx0XHRdO1xuXHRcdFxuXHRcdGZvciAoY29uc3QgcGF0dGVybiBvZiBwYXR0ZXJucykge1xuXHRcdFx0Y29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sICdpJyk7XG5cdFx0XHRpZiAocmVnZXgudGVzdCh0aXRsZSkpIHtcblx0XHRcdFx0dGl0bGUgPSB0aXRsZS5yZXBsYWNlKHJlZ2V4LCAnJyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aXRsZS50cmltKCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXREZXNjcmlwdGlvbihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6ZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnZGVzY3JpcHRpb24nKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6ZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5kZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0SW1hZ2UoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzppbWFnZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6aW1hZ2VcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnaW1hZ2UudXJsJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5pbWFnZS5mdWxsXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRGYXZpY29uKGRvYzogRG9jdW1lbnQsIGJhc2VVcmw6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Y29uc3QgaWNvbkZyb21NZXRhID0gdGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzppbWFnZTpmYXZpY29uXCIpO1xuXHRcdGlmIChpY29uRnJvbU1ldGEpIHJldHVybiBpY29uRnJvbU1ldGE7XG5cblx0XHRjb25zdCBpY29uTGluayA9IGRvYy5xdWVyeVNlbGVjdG9yKFwibGlua1tyZWw9J2ljb24nXVwiKT8uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZiAoaWNvbkxpbmspIHJldHVybiBpY29uTGluaztcblxuXHRcdGNvbnN0IHNob3J0Y3V0TGluayA9IGRvYy5xdWVyeVNlbGVjdG9yKFwibGlua1tyZWw9J3Nob3J0Y3V0IGljb24nXVwiKT8uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZiAoc2hvcnRjdXRMaW5rKSByZXR1cm4gc2hvcnRjdXRMaW5rO1xuXG5cdFx0Ly8gT25seSB0cnkgdG8gY29uc3RydWN0IGZhdmljb24gVVJMIGlmIHdlIGhhdmUgYSB2YWxpZCBiYXNlIFVSTFxuXHRcdGlmIChiYXNlVXJsKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFVSTChcIi9mYXZpY29uLmljb1wiLCBiYXNlVXJsKS5ocmVmO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBjb25zdHJ1Y3QgZmF2aWNvbiBVUkw6JywgZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0UHVibGlzaGVkKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnZGF0ZVB1Ymxpc2hlZCcpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwicHVibGlzaERhdGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiYXJ0aWNsZTpwdWJsaXNoZWRfdGltZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRUaW1lRWxlbWVudChkb2MpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuZGF0ZVwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0TWV0YUNvbnRlbnQoZG9jOiBEb2N1bWVudCwgYXR0cjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBzZWxlY3RvciA9IGBtZXRhWyR7YXR0cn1dYDtcblx0XHRjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG5cdFx0XHQuZmluZChlbCA9PiBlbC5nZXRBdHRyaWJ1dGUoYXR0cik/LnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpPy50cmltKCkgPz8gXCJcIiA6IFwiXCI7XG5cdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGNvbnRlbnQsIGRvYyk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRUaW1lRWxlbWVudChkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCBzZWxlY3RvciA9IGB0aW1lYDtcblx0XHRjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpWzBdO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50ID8gKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0ZXRpbWVcIik/LnRyaW0oKSA/PyBlbGVtZW50LnRleHRDb250ZW50Py50cmltKCkgPz8gXCJcIikgOiBcIlwiO1xuXHRcdHJldHVybiB0aGlzLmRlY29kZUhUTUxFbnRpdGllcyhjb250ZW50LCBkb2MpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZGVjb2RlSFRNTEVudGl0aWVzKHRleHQ6IHN0cmluZywgZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3QgdGV4dGFyZWEgPSBkb2MuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcblx0XHR0ZXh0YXJlYS5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFNjaGVtYVByb3BlcnR5KGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSwgcHJvcGVydHk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XG5cdFx0aWYgKCFzY2hlbWFPcmdEYXRhKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG5cdFx0Y29uc3Qgc2VhcmNoU2NoZW1hID0gKGRhdGE6IGFueSwgcHJvcHM6IHN0cmluZ1tdLCBmdWxsUGF0aDogc3RyaW5nLCBpc0V4YWN0TWF0Y2g6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nW10gPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4gcHJvcHMubGVuZ3RoID09PSAwID8gW2RhdGFdIDogW107XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmICghZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHRcdFx0XHRjb25zdCBjdXJyZW50UHJvcCA9IHByb3BzWzBdO1xuXHRcdFx0XHRpZiAoL15cXFtcXGQrXFxdJC8udGVzdChjdXJyZW50UHJvcCkpIHtcblx0XHRcdFx0XHRjb25zdCBpbmRleCA9IHBhcnNlSW50KGN1cnJlbnRQcm9wLnNsaWNlKDEsIC0xKSk7XG5cdFx0XHRcdFx0aWYgKGRhdGFbaW5kZXhdKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhcmNoU2NoZW1hKGRhdGFbaW5kZXhdLCBwcm9wcy5zbGljZSgxKSwgZnVsbFBhdGgsIGlzRXhhY3RNYXRjaCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKHByb3BzLmxlbmd0aCA9PT0gMCAmJiBkYXRhLmV2ZXJ5KGl0ZW0gPT4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBpdGVtID09PSAnbnVtYmVyJykpIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YS5tYXAoU3RyaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIGRhdGEuZmxhdE1hcChpdGVtID0+IHNlYXJjaFNjaGVtYShpdGVtLCBwcm9wcywgZnVsbFBhdGgsIGlzRXhhY3RNYXRjaCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBbY3VycmVudFByb3AsIC4uLnJlbWFpbmluZ1Byb3BzXSA9IHByb3BzO1xuXHRcdFx0XG5cdFx0XHRpZiAoIWN1cnJlbnRQcm9wKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHJldHVybiBbZGF0YV07XG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgZGF0YS5uYW1lKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtkYXRhLm5hbWVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoY3VycmVudFByb3ApKSB7XG5cdFx0XHRcdHJldHVybiBzZWFyY2hTY2hlbWEoZGF0YVtjdXJyZW50UHJvcF0sIHJlbWFpbmluZ1Byb3BzLCBcblx0XHRcdFx0XHRmdWxsUGF0aCA/IGAke2Z1bGxQYXRofS4ke2N1cnJlbnRQcm9wfWAgOiBjdXJyZW50UHJvcCwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXNFeGFjdE1hdGNoKSB7XG5cdFx0XHRcdGNvbnN0IG5lc3RlZFJlc3VsdHM6IHN0cmluZ1tdID0gW107XG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGRhdGFba2V5XSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoZGF0YVtrZXldLCBwcm9wcywgXG5cdFx0XHRcdFx0XHRcdGZ1bGxQYXRoID8gYCR7ZnVsbFBhdGh9LiR7a2V5fWAgOiBrZXksIGZhbHNlKTtcblx0XHRcdFx0XHRcdG5lc3RlZFJlc3VsdHMucHVzaCguLi5yZXN1bHRzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG5lc3RlZFJlc3VsdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHJldHVybiBuZXN0ZWRSZXN1bHRzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBbXTtcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGxldCByZXN1bHRzID0gc2VhcmNoU2NoZW1hKHNjaGVtYU9yZ0RhdGEsIHByb3BlcnR5LnNwbGl0KCcuJyksICcnLCB0cnVlKTtcblx0XHRcdGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXN1bHRzID0gc2VhcmNoU2NoZW1hKHNjaGVtYU9yZ0RhdGEsIHByb3BlcnR5LnNwbGl0KCcuJyksICcnLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA+IDAgPyByZXN1bHRzLmZpbHRlcihCb29sZWFuKS5qb2luKCcsICcpIDogZGVmYXVsdFZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKHJlc3VsdCwgZG9jKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgaW4gZ2V0U2NoZW1hUHJvcGVydHkgZm9yICR7cHJvcGVydHl9OmAsIGVycm9yKTtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGV4dHJhY3RTY2hlbWFPcmdEYXRhKGRvYzogRG9jdW1lbnQpOiBhbnkge1xuXHRcdGNvbnN0IHNjaGVtYVNjcmlwdHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJyk7XG5cdFx0Y29uc3Qgc2NoZW1hRGF0YTogYW55W10gPSBbXTtcblxuXHRcdHNjaGVtYVNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4ge1xuXHRcdFx0bGV0IGpzb25Db250ZW50ID0gc2NyaXB0LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRqc29uQ29udGVudCA9IGpzb25Db250ZW50XG5cdFx0XHRcdFx0LnJlcGxhY2UoL1xcL1xcKltcXHNcXFNdKj9cXCpcXC98XlxccypcXC9cXC8uKiQvZ20sICcnKVxuXHRcdFx0XHRcdC5yZXBsYWNlKC9eXFxzKjwhXFxbQ0RBVEFcXFsoW1xcc1xcU10qPylcXF1cXF0+XFxzKiQvLCAnJDEnKVxuXHRcdFx0XHRcdC5yZXBsYWNlKC9eXFxzKihcXCpcXC98XFwvXFwqKVxccyp8XFxzKihcXCpcXC98XFwvXFwqKVxccyokL2csICcnKVxuXHRcdFx0XHRcdC50cmltKCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdGNvbnN0IGpzb25EYXRhID0gSlNPTi5wYXJzZShqc29uQ29udGVudCk7XG5cblx0XHRcdFx0aWYgKGpzb25EYXRhWydAZ3JhcGgnXSAmJiBBcnJheS5pc0FycmF5KGpzb25EYXRhWydAZ3JhcGgnXSkpIHtcblx0XHRcdFx0XHRzY2hlbWFEYXRhLnB1c2goLi4uanNvbkRhdGFbJ0BncmFwaCddKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY2hlbWFEYXRhLnB1c2goanNvbkRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBwYXJzaW5nIHNjaGVtYS5vcmcgZGF0YTonLCBlcnJvcik7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1Byb2JsZW1hdGljIEpTT04gY29udGVudDonLCBqc29uQ29udGVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc2NoZW1hRGF0YTtcblx0fVxufSIsImltcG9ydCB7IE1ldGFkYXRhRXh0cmFjdG9yIH0gZnJvbSAnLi9tZXRhZGF0YSc7XG5pbXBvcnQgeyBEZWZ1ZGRsZU9wdGlvbnMsIERlZnVkZGxlUmVzcG9uc2UsIERlZnVkZGxlTWV0YWRhdGEgfSBmcm9tICcuL3R5cGVzJztcblxuLy8gRW50cnkgcG9pbnQgZWxlbWVudHNcbi8vIFRoZXNlIGFyZSB0aGUgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZmluZCB0aGUgbWFpbiBjb250ZW50XG5jb25zdCBFTlRSWV9QT0lOVF9FTEVNRU5UUyA9IFtcblx0J2FydGljbGUnLFxuXHQnW3JvbGU9XCJhcnRpY2xlXCJdJyxcblx0J1tpdGVtcHJvcD1cImFydGljbGVCb2R5XCJdJyxcblx0Jy5wb3N0LWNvbnRlbnQnLFxuXHQnLmFydGljbGUtY29udGVudCcsXG5cdCcjYXJ0aWNsZS1jb250ZW50Jyxcblx0Jy5jb250ZW50LWFydGljbGUnLFxuXHQnbWFpbicsXG5cdCdbcm9sZT1cIm1haW5cIl0nLFxuXHQnYm9keScgLy8gZW5zdXJlcyB0aGVyZSBpcyBhbHdheXMgYSBtYXRjaFxuXTtcblxuY29uc3QgTU9CSUxFX1dJRFRIID0gNjAwO1xuY29uc3QgQkxPQ0tfRUxFTUVOVFMgPSBbJ2RpdicsICdzZWN0aW9uJywgJ2FydGljbGUnLCAnbWFpbiddO1xuXG4vLyBIaWRkZW4gZWxlbWVudHMgdGhhdCBzaG91bGQgYmUgcmVtb3ZlZFxuY29uc3QgSElEREVOX0VMRU1FTlRfU0VMRUNUT1JTID0gW1xuXHQnW2hpZGRlbl0nLFxuXHQnW2FyaWEtaGlkZGVuPVwidHJ1ZVwiXScsXG4vL1x0J1tzdHlsZSo9XCJkaXNwbGF5OiBub25lXCJdJywgY2F1c2VzIHByb2JsZW1zIGZvciBtYXRoIGZvcm11bGFzXG4vL1x0J1tzdHlsZSo9XCJkaXNwbGF5Om5vbmVcIl0nLFxuXHQnW3N0eWxlKj1cInZpc2liaWxpdHk6IGhpZGRlblwiXScsXG5cdCdbc3R5bGUqPVwidmlzaWJpbGl0eTpoaWRkZW5cIl0nLFxuXHQnLmhpZGRlbicsXG5cdCcuaW52aXNpYmxlJ1xuXS5qb2luKCcsJyk7XG5cbi8vIFNlbGVjdG9ycyB0byBiZSByZW1vdmVkXG5jb25zdCBFWEFDVF9TRUxFQ1RPUlMgPSBbXG5cdC8vIHNjcmlwdHMsIHN0eWxlc1xuXHQnbm9zY3JpcHQnLFxuXHQnc2NyaXB0Jyxcblx0J3N0eWxlJyxcblxuXHQvLyBhZHNcblx0Jy5hZDpub3QoW2NsYXNzKj1cImdyYWRpZW50XCJdKScsXG5cdCdbY2xhc3NePVwiYWQtXCIgaV0nLFxuXHQnW2NsYXNzJD1cIi1hZFwiIGldJyxcblx0J1tpZF49XCJhZC1cIiBpXScsXG5cdCdbaWQkPVwiLWFkXCIgaV0nLFxuXHQnW3JvbGU9XCJiYW5uZXJcIiBpXScsXG5cdCcucHJvbW8nLFxuXHQnLlByb21vJyxcblxuXHQvLyBjb21tZW50c1xuXHQnW2lkPVwiY29tbWVudHNcIiBpXScsXG5cblx0Ly8gaGVhZGVyLCBuYXZcblx0J2hlYWRlcicsXG5cdCcuaGVhZGVyJyxcblx0JyNoZWFkZXInLFxuXHQnbmF2Jyxcblx0Jy5uYXZpZ2F0aW9uJyxcblx0JyNuYXZpZ2F0aW9uJyxcblx0J1tyb2xlPVwibmF2aWdhdGlvblwiIGldJyxcblx0J1tyb2xlPVwiZGlhbG9nXCIgaV0nLFxuXHQnW3JvbGUqPVwiY29tcGxlbWVudGFyeVwiIGldJyxcblx0J1tjbGFzcyo9XCJwYWdpbmF0aW9uXCIgaV0nLFxuXHQnLm1lbnUnLFxuXHQnI21lbnUnLFxuXG5cdC8vIG1ldGFkYXRhXG5cdCcuYXV0aG9yJyxcblx0Jy5BdXRob3InLFxuXHQnLmNvbnRyaWJ1dG9yJyxcblx0Jy5kYXRlJyxcblx0Jy5tZXRhJyxcblx0Jy50YWdzJyxcblx0Jy50b2MnLFxuXHQnLlRvYycsXG5cdCcjdG9jJyxcblx0JyN0aXRsZScsXG5cdCcjVGl0bGUnLFxuXHQnW2hyZWYqPVwiL2NhdGVnb3J5XCJdJyxcblx0J1tocmVmKj1cIi9jYXRlZ29yaWVzXCJdJyxcblx0J1tocmVmKj1cIi90YWcvXCJdJyxcblx0J1tocmVmKj1cIi90YWdzL1wiXScsXG5cdCdbaHJlZio9XCIvdG9waWNzXCJdJyxcblx0J1tocmVmKj1cImF1dGhvclwiXScsXG5cdCdbaHJlZj1cIiNzaXRlLWNvbnRlbnRcIl0nLFxuXHQnW3NyYyo9XCJhdXRob3JcIl0nLFxuXG5cdC8vIGZvb3RlclxuXHQnZm9vdGVyJyxcblxuXHQvLyBpbnB1dHMsIGZvcm1zLCBlbGVtZW50c1xuXHQnYXNpZGUnLFxuXHQnYnV0dG9uJyxcblx0XHQvLyAnW3JvbGU9XCJidXR0b25cIl0nLCBNZWRpdW0gaW1hZ2VzXG5cdCdjYW52YXMnLFxuXHQnZGlhbG9nJyxcblx0J2ZpZWxkc2V0Jyxcblx0J2Zvcm0nLFxuXHQnaW5wdXQ6bm90KFt0eXBlPVwiY2hlY2tib3hcIl0pJyxcblx0J2xhYmVsJyxcblx0J2xpbmsnLFxuXHQnb3B0aW9uJyxcblx0J3NlbGVjdCcsXG5cdCd0ZXh0YXJlYScsXG5cdCd0aW1lJyxcblxuXHQvLyBpZnJhbWVzXG5cdCdpbnN0YXJlYWQtcGxheWVyJyxcblx0J2lmcmFtZTpub3QoW3NyYyo9XCJ5b3V0dWJlXCJdKTpub3QoW3NyYyo9XCJ5b3V0dS5iZVwiXSk6bm90KFtzcmMqPVwidmltZW9cIl0pOm5vdChbc3JjKj1cInR3aXR0ZXJcIl0pJyxcblxuXHQvLyBsb2dvc1xuXHQnW2NsYXNzPVwibG9nb1wiIGldJyxcblx0JyNsb2dvJyxcblx0JyNMb2dvJyxcblxuXHQvLyBuZXdzbGV0dGVyXG5cdCcjbmV3c2xldHRlcicsXG5cdCcjTmV3c2xldHRlcicsXG5cblx0Ly8gaGlkZGVuIGZvciBwcmludFxuXHQnLm5vcHJpbnQnLFxuXHQnW2RhdGEtbGluay1uYW1lKj1cInNraXBcIiBpXScsXG5cdCdbZGF0YS1wcmludC1sYXlvdXQ9XCJoaWRlXCIgaV0nLFxuXHQnW2RhdGEtYmxvY2s9XCJkb25vdHByaW50XCIgaV0nLFxuXG5cdC8vIGZvb3Rub3RlcywgY2l0YXRpb25zXG5cdCdbY2xhc3MqPVwiY2xpY2thYmxlLWljb25cIiBpXScsXG5cdCdsaSBzcGFuW2NsYXNzKj1cImx0eF90YWdcIiBpXVtjbGFzcyo9XCJsdHhfdGFnX2l0ZW1cIiBpXScsXG5cdCdhW2hyZWZePVwiI1wiXVtjbGFzcyo9XCJhbmNob3JcIiBpXScsXG5cdCdhW2hyZWZePVwiI1wiXVtjbGFzcyo9XCJyZWZcIiBpXScsXG5cblx0Ly8gbGluayBsaXN0c1xuXHQnW2RhdGEtY29udGFpbmVyKj1cIm1vc3Qtdmlld2VkXCIgaV0nLFxuXG5cdC8vIHNpZGViYXJcblx0Jy5zaWRlYmFyJyxcblx0Jy5TaWRlYmFyJyxcblx0JyNzaWRlYmFyJyxcblx0JyNTaWRlYmFyJyxcblx0JyNzaXRlc3ViJyxcblx0XG5cdC8vIG90aGVyXG5cdCd0YWJsZS5pbmZvYm94Jyxcblx0Jy5wZW5jcmFmdDpub3QoLnBjLWRpc3BsYXktY29udGVudHMpJywgLy8gU3Vic3RhY2tcblx0J1tkYXRhLW9wdGltaXplbHk9XCJyZWxhdGVkLWFydGljbGVzLXNlY3Rpb25cIiBpXScgLy8gVGhlIEVjb25vbWlzdFxuXTtcblxuLy8gUmVtb3ZhbCBwYXR0ZXJucyB0ZXN0ZWQgYWdhaW5zdCBhdHRyaWJ1dGVzOiBjbGFzcywgaWQsIGRhdGEtdGVzdGlkLCBhbmQgZGF0YS1xYVxuLy8gQ2FzZSBpbnNlbnNpdGl2ZSwgcGFydGlhbCBtYXRjaGVzIGFsbG93ZWRcbmNvbnN0IFBBUlRJQUxfU0VMRUNUT1JTID0gW1xuXHQnYWNjZXNzLXdhbGwnLFxuXHQnYWN0aXZpdHlwdWInLFxuXHQnYXBwZW5kaXgnLFxuXHQnYXZhdGFyJyxcblx0J2FkdmVydCcsXG5cdCctYWQtJyxcblx0J19hZF8nLFxuXHQnYWxsdGVybXMnLFxuXHQnYXJvdW5kLXRoZS13ZWInLFxuXHQnYXJ0aWNsZV9fY29weScsXG5cdCdhcnRpY2xlX2RhdGUnLFxuXHQnYXJ0aWNsZS1lbmQgJyxcblx0J2FydGljbGVfaGVhZGVyJyxcblx0J2FydGljbGVfX2hlYWRlcicsXG5cdCdhcnRpY2xlX19pbmZvJyxcblx0J2FydGljbGUtaW5mbycsXG5cdCdhcnRpY2xlX19tZXRhJyxcblx0J2FydGljbGUtc3ViamVjdCcsXG5cdCdhcnRpY2xlX3N1YmplY3QnLFxuXHQnYXJ0aWNsZS1zbmlwcGV0Jyxcblx0J2FydGljbGUtc2VwYXJhdG9yJyxcblx0J2FydGljbGUtdGFncycsXG5cdCdhcnRpY2xlX3RhZ3MnLFxuXHQnYXJ0aWNsZS10aXRsZScsXG5cdCdhcnRpY2xlX3RpdGxlJyxcblx0J2FydGljbGV0b3BpY3MnLFxuXHQnYXJ0aWNsZS10b3BpY3MnLFxuXHQnYXJ0aWNsZS10eXBlJyxcblx0J2FydGljbGUtLWxlZGUnLCAvLyBUaGUgVmVyZ2Vcblx0J2Fzc29jaWF0ZWQtcGVvcGxlJyxcbi8vXHQnYXV0aG9yJywgR3dlcm5cblx0J2JhY2stdG8tdG9wJyxcblx0J2JhY2tsaW5rcy1zZWN0aW9uJyxcblx0J2Jhbm5lcicsXG5cdCdiaW8tYmxvY2snLFxuXHQnYmxvZy1wYWdlcicsXG5cdCdib3R0b20tb2YtYXJ0aWNsZScsXG5cdCdicmFuZC1iYXInLFxuXHQnYnJlYWRjcnVtYicsXG5cdCdidXR0b24td3JhcHBlcicsXG5cdCdidG4tJyxcblx0Jy1idG4nLFxuXHQnYnlsaW5lJyxcblx0J2NhcHRjaGEnLFxuXHQnY2F0X2hlYWRlcicsXG5cdCdjYXRsaW5rcycsXG5cdCdjaGFwdGVyLWxpc3QnLCAvLyBUaGUgRWNvbm9taXN0XG5cdCdjb2xsZWN0aW9ucycsXG5cdCdjb21tZW50cycsXG4vL1x0Jy1jb21tZW50JywgU3ludGF4IGhpZ2hsaWdodGluZ1xuXHQnY29tbWVudC1jb3VudCcsXG5cdCdjb21tZW50LWNvbnRlbnQnLFxuXHQnY29tbWVudC1mb3JtJyxcblx0J2NvbW1lbnQtbnVtYmVyJyxcblx0J2NvbW1lbnQtcmVzcG9uZCcsXG5cdCdjb21tZW50LXRocmVhZCcsXG5cdCdjb21wbGVtZW50YXJ5Jyxcblx0J2NvbnNlbnQnLFxuXHQnY29udGVudC1jYXJkJywgLy8gVGhlIFZlcmdlXG5cdCdjb250ZW50LXRvcGljcycsXG5cdCdjb250ZW50cHJvbW8nLFxuXHQnY29yZS1jb2xsYXRlcmFsJyxcblx0J19jdGEnLFxuXHQnLWN0YScsXG5cdCdjdGEtJyxcblx0J2N0YV8nLFxuXHQnY3VycmVudC1pc3N1ZScsIC8vIFRoZSBOYXRpb25cblx0J2N1c3RvbS1saXN0LW51bWJlcicsXG5cdCdkYXRlbGluZScsXG5cdCdkYXRlaGVhZGVyJyxcblx0J2RhdGUtaGVhZGVyJyxcblx0J2RhdGVfaGVhZGVyLScsXG4vL1x0J2RpYWxvZycsXG5cdCdkaXNjbGFpbWVyJyxcblx0J2Rpc2Nsb3N1cmUnLFxuXHQnZGlzY3Vzc2lvbicsXG5cdCdkaXNjdXNzXycsXG5cdCdkaXNxdXMnLFxuXHQnZG9uYXRlJyxcblx0J2Ryb3Bkb3duJywgLy8gQXJzIFRlY2huaWNhXG5cdCdlbGV0dGVycycsXG5cdCdlbWFpbHNpZ251cCcsXG5cdCdlbmdhZ2VtZW50LXdpZGdldCcsXG5cdCdlbnRyeS1hdXRob3ItaW5mbycsXG5cdCdlbnRyeS1jYXRlZ29yaWVzJyxcblx0J2VudHJ5LWRhdGUnLFxuXHQnZW50cnktbWV0YScsXG5cdCdlbnRyeS10aXRsZScsXG5cdCdlbnRyeS11dGlsaXR5Jyxcblx0J2V5ZWJyb3cnLFxuXHQnZXhwYW5kLXJlZHVjZScsXG5cdCdleHRlcm5hbGxpbmtlbWJlZHdyYXBwZXInLCAvLyBUaGUgTmV3IFlvcmtlclxuXHQnZXh0cmEtdGl0bGUnLFxuXHQnZmFjZWJvb2snLFxuXHQnZmF2b3JpdGUnLFxuXHQnZmVlZGJhY2snLFxuXHQnZmVlZC1saW5rcycsXG5cdCdmaWVsZC1zaXRlLXNlY3Rpb25zJyxcblx0J2ZpeGVkJyxcblx0J2ZvbGxvdycsXG5cdCdmb290ZXInLFxuXHQnZm9vdG5vdGUtYmFjaycsXG5cdCdmb290bm90ZWJhY2snLFxuXHQnZm9yLXlvdScsXG5cdCdmcm9udG1hdHRlcicsXG5cdCdmdXJ0aGVyLXJlYWRpbmcnLFxuXHQnZ2lzdC1tZXRhJyxcbi8vXHQnZ2xvYmFsJyxcblx0J2dvb2dsZScsXG5cdCdnb29nLScsXG5cdCdncmFwaC12aWV3Jyxcblx0J2hlYWRlci1sb2dvJyxcblx0J2hlYWRlci1wYXR0ZXJuJywgLy8gVGhlIFZlcmdlXG5cdCdoZXJvLWxpc3QnLFxuXHQnaGlkZS1mb3ItcHJpbnQnLFxuXHQnaGlkZS1wcmludCcsXG5cdCdoaWRkZW4tc2lkZW5vdGUnLFxuXHQnaW50ZXJsdWRlJyxcblx0J2ludGVyYWN0aW9uJyxcblx0J2p1bXBsaW5rJyxcbi8vXHQna2V5d29yZCcsIC8vIHVzZWQgaW4gc3ludGF4IGhpZ2hsaWdodGluZ1xuXHQna2lja2VyJyxcblx0Jy1sYWJlbHMnLFxuXHQnbGFuZ3VhZ2UtbmFtZScsXG5cdCdsYXRlc3QtY29udGVudCcsXG5cdCctbGVkZXMtJywgLy8gVGhlIFZlcmdlXG5cdCctbGljZW5zZScsXG5cdCdsaW5rLWJveCcsXG5cdCdsaW5rcy1ncmlkJywgLy8gQkJDXG5cdCdsaW5rcy10aXRsZScsIC8vIEJCQ1xuXHQnbGlzdGluZy1keW5hbWljLXRlcm1zJywgLy8gQm9zdG9uIFJldmlld1xuXHQnbG9hZGluZycsXG5cdCdsb2EtaW5mbycsXG5cdCdsb2dvX2NvbnRhaW5lcicsXG5cdCdsdHhfcm9sZV9yZWZudW0nLCAvLyBBcnhpdlxuXHQnbHR4X3RhZ19iaWJpdGVtJyxcblx0J2x0eF9lcnJvcicsXG5cdCdtYXJrZXRpbmcnLFxuXHQnbWVkaWEtaW5xdWlyeScsXG5cdCdtZW51LScsXG5cdCdtZXRhLScsXG5cdCdtZXRhZGF0YScsXG5cdCdtaWdodC1saWtlJyxcblx0J19tb2RhbCcsXG5cdCctbW9kYWwnLFxuXHQnbW9yZS0nLFxuXHQnbW9yZW5ld3MnLFxuXHQnbW9yZXN0b3JpZXMnLFxuXHQnbXctZWRpdHNlY3Rpb24nLFxuXHQnbXctY2l0ZS1iYWNrbGluaycsXG5cdCdtdy1pbmRpY2F0b3JzJyxcblx0J213LWp1bXAtbGluaycsXG5cdCduYXYtJyxcblx0J25hdl8nLFxuXHQnbmF2YmFyJyxcbi8vXHQnbmF2aWdhdGlvbicsXG5cdCduZXh0LScsXG5cdCduZXdzLXN0b3J5LXRpdGxlJyxcbi8vXHQnbmV3c2xldHRlcicsIHVzZWQgb24gU3Vic3RhY2tcblx0J25ld3NsZXR0ZXJfJyxcblx0J25ld3NsZXR0ZXItc2lnbnVwJyxcblx0J25ld3NsZXR0ZXJzaWdudXAnLFxuXHQnbmV3c2xldHRlcndpZGdldCcsXG5cdCduZXdzbGV0dGVyd3JhcHBlcicsXG5cdCdub3QtZm91bmQnLFxuXHQnbm9tb2JpbGUnLFxuXHQnbm9wcmludCcsXG5cdCdvcmlnaW5hbGx5LXB1Ymxpc2hlZCcsIC8vIE1lcmN1cnkgTmV3c1xuXHQnb3V0bGluZS12aWV3Jyxcblx0J292ZXJsYXknLFxuXHQncGFnZS10aXRsZScsXG5cdCctcGFydG5lcnMnLFxuXHQncGxlYScsXG5cdCdwb3B1bGFyJyxcbi8vXHQncG9wdXAnLCBHd2VyblxuXHQncG9wLXVwJyxcblx0J3BvcG92ZXInLFxuXHQncG9zdC1ib3R0b20nLFxuXHQncG9zdF9fY2F0ZWdvcnknLFxuXHQncG9zdGNvbW1lbnQnLFxuXHQncG9zdGRhdGUnLFxuXHQncG9zdC1kYXRlJyxcblx0J3Bvc3RfZGF0ZScsXG5cdCdwb3N0LWZlZWRzJyxcblx0J3Bvc3RpbmZvJyxcblx0J3Bvc3QtaW5mbycsXG5cdCdwb3N0X2luZm8nLFxuXHQncG9zdC1pbmxpbmUtZGF0ZScsXG5cdCdwb3N0LWxpbmtzJyxcblx0J3Bvc3QtbWV0YScsXG5cdCdwb3N0bWV0YScsXG5cdCdwb3N0c25pcHBldCcsXG5cdCdwb3N0X3NuaXBwZXQnLFxuXHQncG9zdC1zbmlwcGV0Jyxcblx0J3Bvc3R0aXRsZScsXG5cdCdwb3N0LXRpdGxlJyxcblx0J3Bvc3RfdGl0bGUnLFxuXHQncG9zdHRheCcsXG5cdCdwb3N0LXRheCcsXG5cdCdwb3N0X3RheCcsXG5cdCdwb3N0dGFnJyxcblx0J3Bvc3RfdGFnJyxcblx0J3Bvc3QtdGFnJyxcbi8vXHQncHJldmlldycsIHVzZWQgb24gT2JzaWRpYW4gUHVibGlzaFxuXHQncHJldm5leHQnLFxuXHQncHJldmlvdXNuZXh0Jyxcblx0J3ByaW50LW5vbmUnLFxuXHQncHJpbnQtaGVhZGVyJyxcblx0J3Byb2ZpbGUnLFxuLy9cdCdwcm9tbycsXG5cdCdwdWJkYXRlJyxcblx0J3B1Yl9kYXRlJyxcblx0J3B1Yi1kYXRlJyxcblx0J3B1YmxpY2F0aW9uLWRhdGUnLFxuXHQncHVibGljYXRpb25OYW1lJywgLy8gTWVkaXVtXG5cdCdxci1jb2RlJyxcblx0J3FyX2NvZGUnLFxuXHQnX3JhaWwnLFxuXHQncmVhZG1vcmUnLFxuXHQncmVhZC1uZXh0Jyxcblx0J3JlYWRfbmV4dCcsXG5cdCdyZWFkX3RpbWUnLFxuXHQncmVhZC10aW1lJyxcblx0J3JlYWRpbmdfdGltZScsXG5cdCdyZWFkaW5nLXRpbWUnLFxuXHQncmVhZGluZy1saXN0Jyxcblx0J3JlY2VudHBvc3QnLFxuXHQncmVjZW50X3Bvc3QnLFxuXHQncmVjZW50LXBvc3QnLFxuXHQncmVjb21tZW5kJyxcblx0J3JlZGlyZWN0ZWRmcm9tJyxcblx0J3JlY2lyYycsXG5cdCdyZWdpc3RlcicsXG5cdCdyZWxhdGVkJyxcblx0J3JldmVyc2Vmb290bm90ZScsXG5cdCdzY3JlZW4tcmVhZGVyLXRleHQnLFxuLy9cdCdzaGFyZScsXG4vL1x0Jy1zaGFyZScsIHNjaXRlY2hkYWlseS5jb21cblx0J3NoYXJlLWJveCcsXG5cdCdzaGFyZS1pY29ucycsXG5cdCdzaGFyZWxpbmtzJyxcblx0J3NoYXJlLXNlY3Rpb24nLFxuXHQnc2lkZWJhcnRpdGxlJyxcblx0J3NpZGViYXJfJyxcblx0J3NpbWlsYXItJyxcblx0J3NpbWlsYXJfJyxcblx0J3NpbWlsYXJzLScsXG5cdCdzaWRlaXRlbXMnLFxuXHQnc2lkZS1ib3gnLFxuXHQnc2l0ZS1pbmRleCcsXG5cdCdzaXRlLWhlYWRlcicsXG5cdCdzaXRlLWxvZ28nLFxuXHQnc2l0ZS1uYW1lJyxcbi8vXHQnc2tpcC0nLFxuXHQnc2tpcC1saW5rJyxcblx0J3NvY2lhbCcsXG5cdCdzcGVlY2hpZnktaWdub3JlJyxcblx0J3Nwb25zb3InLFxuLy9cdCctc3RhdHMnLFxuXHQnX3N0YXRzJyxcblx0J3N0aWNreScsXG5cdCdzdG9yeXJlYWR0aW1lJywgLy8gTWVkaXVtXG5cdCdzdG9yeXB1Ymxpc2hkYXRlJywgLy8gTWVkaXVtXG5cdCdzdWJqZWN0LWxhYmVsJyxcblx0J3N1YnNjcmliZScsXG5cdCdfdGFncycsXG5cdCd0YWdzX19pdGVtJyxcblx0J3RhZ19saXN0Jyxcblx0J3RheG9ub215Jyxcblx0J3RhYmxlLW9mLWNvbnRlbnRzJyxcblx0J3RhYnMtJyxcbi8vXHQndGVhc2VyJywgTmF0dXJlXG5cdCd0ZXJtaW5hbHRvdXQnLFxuXHQndGltZS1ydWJyaWMnLFxuXHQndGltZXN0YW1wJyxcblx0J3RpcF9vZmYnLFxuXHQndGlwdG91dCcsXG5cdCctdG9jJyxcblx0J3RvcGljLWxpc3QnLFxuXHQndG9vbGJhcicsXG5cdCd0b29sdGlwJyxcblx0J3RvcC13cmFwcGVyJyxcblx0J3RyZWUtaXRlbScsXG5cdCd0cmVuZGluZycsXG5cdCd0cnVzdC1mZWF0Jyxcblx0J3RydXN0LWJhZGdlJyxcblx0J3R3aXR0ZXInLFxuXHQndmlzdWFsbHktaGlkZGVuJyxcblx0J3dlbGNvbWVib3gnXG5dO1xuXG4vLyBTZWxlY3RvcnMgZm9yIGZvb3Rub3RlcyBhbmQgY2l0YXRpb25zXG5jb25zdCBGT09UTk9URV9JTkxJTkVfUkVGRVJFTkNFUyA9IFtcblx0J3N1cC5yZWZlcmVuY2UnLFxuXHQnY2l0ZS5sdHhfY2l0ZScsXG5cdCdzdXBbaWRePVwiZm5yXCJdJyxcblx0J3N1cFtpZF49XCJmbnJlZjpcIl0nLFxuXHQnc3Bhbi5mb290bm90ZS1saW5rJyxcblx0J2EuY2l0YXRpb24nLFxuXHQnYVtpZF49XCJyZWYtbGlua1wiXScsXG5cdCdhW2hyZWZePVwiI2ZuXCJdJyxcblx0J2FbaHJlZl49XCIjY2l0ZVwiXScsXG5cdCdhW2hyZWZePVwiI3JlZmVyZW5jZVwiXScsXG5cdCdhW2hyZWZePVwiI2Zvb3Rub3RlXCJdJyxcblx0J2FbaHJlZl49XCIjclwiXScsIC8vIENvbW1vbiBpbiBhY2FkZW1pYyBwYXBlcnNcblx0J2FbaHJlZl49XCIjYlwiXScsIC8vIENvbW1vbiBmb3IgYmlibGlvZ3JhcGh5IHJlZmVyZW5jZXNcblx0J2FbaHJlZio9XCJjaXRlX25vdGVcIl0nLFxuXHQnYVtocmVmKj1cImNpdGVfcmVmXCJdJyxcblx0J2EuZm9vdG5vdGUtYW5jaG9yJywgLy8gU3Vic3RhY2tcblx0J3NwYW4uZm9vdG5vdGUtaG92ZXJjYXJkLXRhcmdldCBhJywgLy8gU3Vic3RhY2tcblx0J2Fbcm9sZT1cImRvYy1iaWJsaW9yZWZcIl0nLCAvLyBTY2llbmNlLm9yZ1xuXHQnYVtpZF49XCJmbnJlZlwiXScsXG5cdCdhW2lkXj1cInJlZi1saW5rXCJdJywgLy8gTmF0dXJlLmNvbVxuXS5qb2luKCcsJyk7XG5cbmNvbnN0IEZPT1ROT1RFX0xJU1RfU0VMRUNUT1JTID0gW1xuXHQnZGl2LmZvb3Rub3RlIG9sJyxcblx0J2Rpdi5mb290bm90ZXMgb2wnLFxuXHQnZGl2W3JvbGU9XCJkb2MtZW5kbm90ZXNcIl0nLFxuXHQnZGl2W3JvbGU9XCJkb2MtZm9vdG5vdGVzXCJdJyxcblx0J29sLmZvb3Rub3Rlcy1saXN0Jyxcblx0J29sLmZvb3Rub3RlcycsXG5cdCdvbC5yZWZlcmVuY2VzJyxcblx0J29sW2NsYXNzKj1cImFydGljbGUtcmVmZXJlbmNlc1wiXScsXG5cdCdzZWN0aW9uLmZvb3Rub3RlcyBvbCcsXG5cdCdzZWN0aW9uW3JvbGU9XCJkb2MtZW5kbm90ZXNcIl0nLFxuXHQnc2VjdGlvbltyb2xlPVwiZG9jLWZvb3Rub3Rlc1wiXScsXG5cdCdzZWN0aW9uW3JvbGU9XCJkb2MtYmlibGlvZ3JhcGh5XCJdJyxcblx0J3VsLmZvb3Rub3Rlcy1saXN0Jyxcblx0J3VsLmx0eF9iaWJsaXN0Jyxcblx0J2Rpdi5mb290bm90ZVtkYXRhLWNvbXBvbmVudC1uYW1lPVwiRm9vdG5vdGVUb0RPTVwiXScgLy8gU3Vic3RhY2tcbl0uam9pbignLCcpO1xuXG4vLyBFbGVtZW50cyB0aGF0IGFyZSBhbGxvd2VkIHRvIGJlIGVtcHR5XG4vLyBUaGVzZSBhcmUgbm90IHJlbW92ZWQgZXZlbiBpZiB0aGV5IGhhdmUgbm8gY29udGVudFxuY29uc3QgQUxMT1dFRF9FTVBUWV9FTEVNRU5UUyA9IG5ldyBTZXQoW1xuXHQnYXJlYScsXG5cdCdhdWRpbycsXG5cdCdiYXNlJyxcblx0J2JyJyxcblx0J2NpcmNsZScsXG5cdCdjb2wnLFxuXHQnZGVmcycsXG5cdCdlbGxpcHNlJyxcblx0J2VtYmVkJyxcblx0J2ZpZ3VyZScsXG5cdCdnJyxcblx0J2hyJyxcblx0J2lmcmFtZScsXG5cdCdpbWcnLFxuXHQnaW5wdXQnLFxuXHQnbGluZScsXG5cdCdsaW5rJyxcblx0J21hc2snLFxuXHQnbWV0YScsXG5cdCdvYmplY3QnLFxuXHQncGFyYW0nLFxuXHQncGF0aCcsXG5cdCdwYXR0ZXJuJyxcblx0J3BpY3R1cmUnLFxuXHQncG9seWdvbicsXG5cdCdwb2x5bGluZScsXG5cdCdyZWN0Jyxcblx0J3NvdXJjZScsXG5cdCdzdG9wJyxcblx0J3N2ZycsXG5cdCd0ZCcsXG5cdCd0aCcsXG5cdCd0cmFjaycsXG5cdCd1c2UnLFxuXHQndmlkZW8nLFxuXHQnd2JyJ1xuXSk7XG5cbi8vIEF0dHJpYnV0ZXMgdG8ga2VlcFxuY29uc3QgQUxMT1dFRF9BVFRSSUJVVEVTID0gbmV3IFNldChbXG5cdCdhbHQnLFxuXHQnYWxsb3cnLFxuXHQnYWxsb3dmdWxsc2NyZWVuJyxcblx0J2FyaWEtbGFiZWwnLFxuXHQnY2xhc3MnLFxuXHQnY2hlY2tlZCcsXG5cdCdjb2xzcGFuJyxcblx0J2NvbnRyb2xzJyxcblx0J2RhdGEtc3JjJyxcblx0J2RhdGEtc3Jjc2V0Jyxcblx0J2RhdGEtbGFuZycsXG5cdCdkaXInLFxuXHQnZnJhbWVib3JkZXInLFxuXHQnaGVhZGVycycsXG5cdCdoZWlnaHQnLFxuXHQnaHJlZicsXG5cdCdpZCcsXG5cdCdsYW5nJyxcblx0J3JvbGUnLFxuXHQncm93c3BhbicsXG5cdCdzcmMnLFxuXHQnc3Jjc2V0Jyxcblx0J3RpdGxlJyxcblx0J3R5cGUnLFxuXHQnd2lkdGgnXG5dKTtcblxuLy8gU3VwcG9ydGVkIGxhbmd1YWdlcyBmb3IgY29kZSBibG9ja3NcbmNvbnN0IFNVUFBPUlRFRF9MQU5HVUFHRVMgPSBuZXcgU2V0KFtcblx0Ly8gTWFya3VwICYgV2ViXG5cdCdtYXJrdXAnLCAnaHRtbCcsICd4bWwnLCAnc3ZnJywgJ21hdGhtbCcsICdzc21sJywgJ2F0b20nLCAncnNzJyxcblx0J2phdmFzY3JpcHQnLCAnanMnLCAnanN4JywgJ3R5cGVzY3JpcHQnLCAndHMnLCAndHN4Jyxcblx0J3dlYmFzc2VtYmx5JywgJ3dhc20nLFxuXHRcblx0Ly8gQ29tbW9uIFByb2dyYW1taW5nIExhbmd1YWdlc1xuXHQncHl0aG9uJyxcblx0J2phdmEnLFxuXHQnY3NoYXJwJywgJ2NzJywgJ2RvdG5ldCcsICdhc3BuZXQnLFxuXHQnY3BwJywgJ2MrKycsICdjJywgJ29iamMnLFxuXHQncnVieScsICdyYicsXG5cdCdwaHAnLFxuXHQnZ29sYW5nJyxcblx0J3J1c3QnLFxuXHQnc3dpZnQnLFxuXHQna290bGluJyxcblx0J3NjYWxhJyxcblx0J2RhcnQnLFxuXHRcblx0Ly8gU2hlbGwgJiBTY3JpcHRpbmdcblx0J2Jhc2gnLCAnc2hlbGwnLCAnc2gnLFxuXHQncG93ZXJzaGVsbCcsXG5cdCdiYXRjaCcsXG5cdFxuXHQvLyBEYXRhICYgQ29uZmlnXG5cdCdqc29uJywgJ2pzb25wJyxcblx0J3lhbWwnLCAneW1sJyxcblx0J3RvbWwnLFxuXHQnZG9ja2VyZmlsZScsXG5cdCdnaXRpZ25vcmUnLFxuXHRcblx0Ly8gUXVlcnkgTGFuZ3VhZ2VzXG5cdCdzcWwnLCAnbXlzcWwnLCAncG9zdGdyZXNxbCcsXG5cdCdncmFwaHFsJyxcblx0J21vbmdvZGInLFxuXHQnc3BhcnFsJyxcblx0XG5cdC8vIE1hcmt1cCAmIERvY3VtZW50YXRpb25cblx0J21hcmtkb3duJywgJ21kJyxcblx0J2xhdGV4JywgJ3RleCcsXG5cdCdhc2NpaWRvYycsICdhZG9jJyxcblx0J2pzZG9jJyxcblx0XG5cdC8vIEZ1bmN0aW9uYWwgTGFuZ3VhZ2VzXG5cdCdoYXNrZWxsJywgJ2hzJyxcblx0J2VsbScsXG5cdCdlbGl4aXInLFxuXHQnZXJsYW5nJyxcblx0J29jYW1sJyxcblx0J2ZzaGFycCcsXG5cdCdzY2hlbWUnLFxuXHQnbGlzcCcsICdlbGlzcCcsXG5cdCdjbG9qdXJlJyxcblx0XG5cdC8vIE90aGVyIExhbmd1YWdlc1xuXHQnbWF0bGFiJyxcblx0J2ZvcnRyYW4nLFxuXHQnY29ib2wnLFxuXHQncGFzY2FsJyxcblx0J3BlcmwnLFxuXHQnbHVhJyxcblx0J2p1bGlhJyxcblx0J2dyb292eScsXG5cdCdjcnlzdGFsJyxcblx0J25pbScsXG5cdCd6aWcnLFxuXHRcblx0Ly8gRG9tYWluIFNwZWNpZmljXG5cdCdyZWdleCcsXG5cdCdncmFkbGUnLFxuXHQnY21ha2UnLFxuXHQnbWFrZWZpbGUnLFxuXHQnbml4Jyxcblx0J3RlcnJhZm9ybScsXG5cdCdzb2xpZGl0eScsXG5cdCdnbHNsJyxcblx0J2hsc2wnLFxuXHRcblx0Ly8gQXNzZW1ibHlcblx0J25hc20nLFxuXHQnbWFzbScsXG5cdCdhcm1hc20nLFxuXHRcblx0Ly8gR2FtZSBEZXZlbG9wbWVudFxuXHQnZ2RzY3JpcHQnLFxuXHQndW5yZWFsc2NyaXB0Jyxcblx0XG5cdC8vIE90aGVyc1xuXHQnYWJhcCcsXG5cdCdhY3Rpb25zY3JpcHQnLFxuXHQnYWRhJyxcblx0J2FnZGEnLFxuXHQnYW50bHI0Jyxcblx0J2FwcGxlc2NyaXB0Jyxcblx0J2FyZHVpbm8nLFxuXHQnY29mZmVlc2NyaXB0Jyxcblx0J2RqYW5nbycsXG5cdCdlcmxhbmcnLFxuXHQnZm9ydHJhbicsXG5cdCdoYXhlJyxcblx0J2lkcmlzJyxcblx0J2tvdGxpbicsXG5cdCdsaXZlc2NyaXB0Jyxcblx0J21hdGxhYicsXG5cdCduZ2lueCcsXG5cdCdwYXNjYWwnLFxuXHQncHJvbG9nJyxcblx0J3B1cHBldCcsXG5cdCdzY2FsYScsXG5cdCdzY2hlbWUnLFxuXHQndGNsJyxcblx0J3Zlcmlsb2cnLFxuXHQndmhkbCdcbl0pO1xuXG5cbi8vIEVsZW1lbnQgc3RhbmRhcmRpemF0aW9uIHJ1bGVzXG4vLyBNYXBzIHNlbGVjdG9ycyB0byB0aGVpciB0YXJnZXQgSFRNTCBlbGVtZW50IG5hbWVcbmludGVyZmFjZSBTdGFuZGFyZGl6YXRpb25SdWxlIHtcblx0c2VsZWN0b3I6IHN0cmluZztcblx0ZWxlbWVudDogc3RyaW5nO1xuXHR0cmFuc2Zvcm0/OiAoZWw6IEVsZW1lbnQpID0+IEVsZW1lbnQ7XG59XG5cbmNvbnN0IEVMRU1FTlRfU1RBTkRBUkRJWkFUSU9OX1JVTEVTOiBTdGFuZGFyZGl6YXRpb25SdWxlW10gPSBbXG5cdC8vIENvZGUgYmxvY2tzXG5cdHtcblx0XHRzZWxlY3RvcjogJ3ByZScsXG5cdFx0ZWxlbWVudDogJ3ByZScsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm4gZWw7XG5cblx0XHRcdC8vIEZ1bmN0aW9uIHRvIGdldCBsYW5ndWFnZSBmcm9tIGNsYXNzXG5cdFx0XHRjb25zdCBnZXRMYW5ndWFnZUZyb21DbGFzcyA9IChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyA9PiB7XG5cdFx0XHRcdC8vIENoZWNrIGRhdGEtbGFuZyBhdHRyaWJ1dGUgZmlyc3Rcblx0XHRcdFx0Y29uc3QgZGF0YUxhbmcgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1sYW5nJyk7XG5cdFx0XHRcdGlmIChkYXRhTGFuZykge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhTGFuZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRGVmaW5lIGxhbmd1YWdlIHBhdHRlcm5zXG5cdFx0XHRcdGNvbnN0IGxhbmd1YWdlUGF0dGVybnMgPSBbXG5cdFx0XHRcdFx0L15sYW5ndWFnZS0oXFx3KykkLywgICAgICAgICAgLy8gbGFuZ3VhZ2UtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9ebGFuZy0oXFx3KykkLywgICAgICAgICAgICAgIC8vIGxhbmctamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9eKFxcdyspLWNvZGUkLywgICAgICAgICAgICAgIC8vIGphdmFzY3JpcHQtY29kZVxuXHRcdFx0XHRcdC9eY29kZS0oXFx3KykkLywgICAgICAgICAgICAgIC8vIGNvZGUtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9ec3ludGF4LShcXHcrKSQvLCAgICAgICAgICAgIC8vIHN5bnRheC1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15jb2RlLXNuaXBwZXRfXyhcXHcrKSQvLCAgICAgLy8gY29kZS1zbmlwcGV0X19qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15oaWdobGlnaHQtKFxcdyspJC8sICAgICAgICAgLy8gaGlnaGxpZ2h0LWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXihcXHcrKS1zbmlwcGV0JC8gICAgICAgICAgICAvLyBqYXZhc2NyaXB0LXNuaXBwZXRcblx0XHRcdFx0XTtcblxuXHRcdFx0XHQvLyBUaGVuIGNoZWNrIHRoZSBjbGFzcyBhdHRyaWJ1dGUgZm9yIHBhdHRlcm5zXG5cdFx0XHRcdGlmIChlbGVtZW50LmNsYXNzTmFtZSAmJiB0eXBlb2YgZWxlbWVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIGxhbmd1YWdlUGF0dGVybnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKS5tYXRjaChwYXR0ZXJuKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gVGhlbiBjaGVjayBmb3Igc3VwcG9ydGVkIGxhbmd1YWdlXG5cdFx0XHRcdFx0aWYgKFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBjbGFzc05hbWVzID0gQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRmb3IgKGNvbnN0IGNsYXNzTmFtZSBvZiBjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgcGF0dGVybnMgZmlyc3Rcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHBhdHRlcm4gb2YgbGFuZ3VhZ2VQYXR0ZXJucykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBjbGFzc05hbWUubWF0Y2gocGF0dGVybik7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gT25seSBjaGVjayBiYXJlIGxhbmd1YWdlIG5hbWVzIGlmIG5vIHBhdHRlcm5zIHdlcmUgZm91bmRcblx0XHRcdFx0Zm9yIChjb25zdCBjbGFzc05hbWUgb2YgY2xhc3NOYW1lcykge1xuXHRcdFx0XHRcdGlmIChTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhjbGFzc05hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBUcnkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBmcm9tIHRoZSBlbGVtZW50IGFuZCBpdHMgYW5jZXN0b3JzXG5cdFx0XHRsZXQgbGFuZ3VhZ2UgPSAnJztcblx0XHRcdGxldCBjdXJyZW50RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZWw7XG5cdFx0XHRcblx0XHRcdHdoaWxlIChjdXJyZW50RWxlbWVudCAmJiAhbGFuZ3VhZ2UpIHtcblx0XHRcdFx0bGFuZ3VhZ2UgPSBnZXRMYW5ndWFnZUZyb21DbGFzcyhjdXJyZW50RWxlbWVudCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBBbHNvIGNoZWNrIGZvciBjb2RlIGVsZW1lbnRzIHdpdGhpbiB0aGUgY3VycmVudCBlbGVtZW50XG5cdFx0XHRcdGlmICghbGFuZ3VhZ2UgJiYgY3VycmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignY29kZScpKSB7XG5cdFx0XHRcdFx0bGFuZ3VhZ2UgPSBnZXRMYW5ndWFnZUZyb21DbGFzcyhjdXJyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjb2RlJykhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Y3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGdW5jdGlvbiB0byByZWN1cnNpdmVseSBleHRyYWN0IHRleHQgY29udGVudCB3aGlsZSBwcmVzZXJ2aW5nIHN0cnVjdHVyZVxuXHRcdFx0Y29uc3QgZXh0cmFjdFN0cnVjdHVyZWRUZXh0ID0gKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcgPT4ge1xuXHRcdFx0XHRpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0bGV0IHRleHQgPSAnJztcblx0XHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuXHRcdFx0XHRcdC8vIEhhbmRsZSBsaW5lIGJyZWFrc1xuXHRcdFx0XHRcdGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdCUicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnXFxuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gSGFuZGxlIGNvZGUgZWxlbWVudHMgYW5kIHRoZWlyIGNoaWxkcmVuXG5cdFx0XHRcdFx0ZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuXHRcdFx0XHRcdFx0dGV4dCArPSBleHRyYWN0U3RydWN0dXJlZFRleHQoY2hpbGQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIEFkZCBuZXdsaW5lIGFmdGVyIGVhY2ggY29kZSBlbGVtZW50XG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0NPREUnKSB7XG5cdFx0XHRcdFx0XHR0ZXh0ICs9ICdcXG4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGV4dDtcblx0XHRcdH07XG5cblx0XHRcdC8vIEV4dHJhY3QgYWxsIHRleHQgY29udGVudFxuXHRcdFx0bGV0IGNvZGVDb250ZW50ID0gZXh0cmFjdFN0cnVjdHVyZWRUZXh0KGVsKTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgdGhlIGNvbnRlbnRcblx0XHRcdGNvZGVDb250ZW50ID0gY29kZUNvbnRlbnRcblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSBleHRyYSBuZXdsaW5lcyBhdCB0aGUgc3RhcnRcblx0XHRcdFx0LnJlcGxhY2UoL15cXG4rLywgJycpXG5cdFx0XHRcdC8vIFJlbW92ZSBhbnkgZXh0cmEgbmV3bGluZXMgYXQgdGhlIGVuZFxuXHRcdFx0XHQucmVwbGFjZSgvXFxuKyQvLCAnJylcblx0XHRcdFx0Ly8gUmVwbGFjZSBtdWx0aXBsZSBjb25zZWN1dGl2ZSBuZXdsaW5lcyB3aXRoIGEgc2luZ2xlIG5ld2xpbmVcblx0XHRcdFx0LnJlcGxhY2UoL1xcbnszLH0vZywgJ1xcblxcbicpO1xuXG5cdFx0XHQvLyBDcmVhdGUgbmV3IHByZSBlbGVtZW50XG5cdFx0XHRjb25zdCBuZXdQcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdG5ld1ByZS5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIENyZWF0ZSBjb2RlIGVsZW1lbnRcblx0XHRcdGNvbnN0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG5cdFx0XHRpZiAobGFuZ3VhZ2UpIHtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZycsIGxhbmd1YWdlKTtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYGxhbmd1YWdlLSR7bGFuZ3VhZ2V9YCk7XG5cdFx0XHR9XG5cdFx0XHRjb2RlLnRleHRDb250ZW50ID0gY29kZUNvbnRlbnQ7XG5cdFx0XHRcblx0XHRcdG5ld1ByZS5hcHBlbmRDaGlsZChjb2RlKTtcblx0XHRcdHJldHVybiBuZXdQcmU7XG5cdFx0fVxuXHR9LFxuXHQvLyBTaW1wbGlmeSBoZWFkaW5ncyBieSByZW1vdmluZyBpbnRlcm5hbCBuYXZpZ2F0aW9uIGVsZW1lbnRzXG5cdHtcblx0XHRzZWxlY3RvcjogJ2gxLCBoMiwgaDMsIGg0LCBoNSwgaDYnLFxuXHRcdGVsZW1lbnQ6ICdrZWVwJyxcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Ly8gSWYgaGVhZGluZyBvbmx5IGNvbnRhaW5zIGEgc2luZ2xlIGFuY2hvciB3aXRoIGludGVybmFsIGxpbmtcblx0XHRcdGlmIChlbC5jaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgXG5cdFx0XHRcdGVsLmZpcnN0RWxlbWVudENoaWxkPy50YWdOYW1lID09PSAnQScgJiZcblx0XHRcdFx0KGVsLmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpPy5pbmNsdWRlcygnIycpIHx8IFxuXHRcdFx0XHQgZWwuZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJyk/LnN0YXJ0c1dpdGgoJyMnKSkpIHtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENyZWF0ZSBuZXcgaGVhZGluZyBvZiBzYW1lIGxldmVsXG5cdFx0XHRcdGNvbnN0IG5ld0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsLnRhZ05hbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXMgZnJvbSBvcmlnaW5hbCBoZWFkaW5nXG5cdFx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0XHRuZXdIZWFkaW5nLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBKdXN0IHVzZSB0aGUgdGV4dCBjb250ZW50XG5cdFx0XHRcdG5ld0hlYWRpbmcudGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIG5ld0hlYWRpbmc7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vIElmIGhlYWRpbmcgY29udGFpbnMgbmF2aWdhdGlvbiBidXR0b25zIG9yIG90aGVyIHV0aWxpdHkgZWxlbWVudHNcblx0XHRcdGNvbnN0IGJ1dHRvbnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblx0XHRcdGlmIChidXR0b25zLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3QgbmV3SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwudGFnTmFtZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlc1xuXHRcdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdFx0bmV3SGVhZGluZy5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gSnVzdCB1c2UgdGhlIHRleHQgY29udGVudFxuXHRcdFx0XHRuZXdIZWFkaW5nLnRleHRDb250ZW50ID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBuZXdIZWFkaW5nO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fVxuXHR9LFxuXHQvLyBDb252ZXJ0IGRpdnMgd2l0aCBwYXJhZ3JhcGggcm9sZSB0byBhY3R1YWwgcGFyYWdyYXBoc1xuXHR7IFxuXHRcdHNlbGVjdG9yOiAnZGl2W2RhdGEtdGVzdGlkXj1cInBhcmFncmFwaFwiXSwgZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nLCBcblx0XHRlbGVtZW50OiAncCcsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcblx0XHRcdC8vIENvcHkgaW5uZXJIVE1MXG5cdFx0XHRwLmlubmVySFRNTCA9IGVsLmlubmVySFRNTDtcblx0XHRcdFxuXHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdHAuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gcDtcblx0XHR9XG5cdH0sXG5cdC8vIENvbnZlcnQgZGl2cyB3aXRoIGxpc3Qgcm9sZXMgdG8gYWN0dWFsIGxpc3RzXG5cdHsgXG5cdFx0c2VsZWN0b3I6ICdkaXZbcm9sZT1cImxpc3RcIl0nLCBcblx0XHRlbGVtZW50OiAndWwnLFxuXHRcdC8vIEN1c3RvbSBoYW5kbGVyIGZvciBsaXN0IHR5cGUgZGV0ZWN0aW9uIGFuZCB0cmFuc2Zvcm1hdGlvblxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHQvLyBGaXJzdCBkZXRlcm1pbmUgaWYgdGhpcyBpcyBhbiBvcmRlcmVkIGxpc3Rcblx0XHRcdGNvbnN0IGZpcnN0SXRlbSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0gLmxhYmVsJyk7XG5cdFx0XHRjb25zdCBsYWJlbCA9IGZpcnN0SXRlbT8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdGNvbnN0IGlzT3JkZXJlZCA9IGxhYmVsLm1hdGNoKC9eXFxkK1xcKS8pO1xuXHRcdFx0XG5cdFx0XHQvLyBDcmVhdGUgdGhlIGFwcHJvcHJpYXRlIGxpc3QgdHlwZVxuXHRcdFx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXNPcmRlcmVkID8gJ29sJyA6ICd1bCcpO1xuXHRcdFx0XG5cdFx0XHQvLyBQcm9jZXNzIGVhY2ggbGlzdCBpdGVtXG5cdFx0XHRjb25zdCBpdGVtcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0nKTtcblx0XHRcdGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRcdGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRcdFx0Y29uc3QgY29udGVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChjb250ZW50KSB7XG5cdFx0XHRcdFx0Ly8gQ29udmVydCBhbnkgcGFyYWdyYXBoIGRpdnMgaW5zaWRlIGNvbnRlbnRcblx0XHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhEaXZzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cInBhcmFncmFwaFwiXScpO1xuXHRcdFx0XHRcdHBhcmFncmFwaERpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0XHRcdHAuaW5uZXJIVE1MID0gZGl2LmlubmVySFRNTDtcblx0XHRcdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChwKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBDb252ZXJ0IGFueSBuZXN0ZWQgbGlzdHMgcmVjdXJzaXZlbHlcblx0XHRcdFx0XHRjb25zdCBuZXN0ZWRMaXN0cyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJsaXN0XCJdJyk7XG5cdFx0XHRcdFx0bmVzdGVkTGlzdHMuZm9yRWFjaChuZXN0ZWRMaXN0ID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGZpcnN0TmVzdGVkSXRlbSA9IG5lc3RlZExpc3QucXVlcnlTZWxlY3RvcignZGl2W3JvbGU9XCJsaXN0aXRlbVwiXSAubGFiZWwnKTtcblx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZExhYmVsID0gZmlyc3ROZXN0ZWRJdGVtPy50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRcdFx0Y29uc3QgaXNOZXN0ZWRPcmRlcmVkID0gbmVzdGVkTGFiZWwubWF0Y2goL15cXGQrXFwpLyk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGNvbnN0IG5ld05lc3RlZExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGlzTmVzdGVkT3JkZXJlZCA/ICdvbCcgOiAndWwnKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gUHJvY2VzcyBuZXN0ZWQgaXRlbXNcblx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZEl0ZW1zID0gbmVzdGVkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRcdFx0XHRuZXN0ZWRJdGVtcy5mb3JFYWNoKG5lc3RlZEl0ZW0gPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZENvbnRlbnQgPSBuZXN0ZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRpZiAobmVzdGVkQ29udGVudCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIENvbnZlcnQgcGFyYWdyYXBoIGRpdnMgaW4gbmVzdGVkIGl0ZW1zXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkUGFyYWdyYXBocyA9IG5lc3RlZENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nKTtcblx0XHRcdFx0XHRcdFx0XHRuZXN0ZWRQYXJhZ3JhcGhzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRwLmlubmVySFRNTCA9IGRpdi5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0bmVzdGVkTGkuaW5uZXJIVE1MID0gbmVzdGVkQ29udGVudC5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdG5ld05lc3RlZExpc3QuYXBwZW5kQ2hpbGQobmVzdGVkTGkpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdG5lc3RlZExpc3QucmVwbGFjZVdpdGgobmV3TmVzdGVkTGlzdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0bGkuaW5uZXJIVE1MID0gY29udGVudC5pbm5lckhUTUw7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiBsaXN0O1xuXHRcdH1cblx0fSxcblx0eyBcblx0XHRzZWxlY3RvcjogJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0nLCBcblx0XHRlbGVtZW50OiAnbGknLFxuXHRcdC8vIEN1c3RvbSBoYW5kbGVyIGZvciBsaXN0IGl0ZW0gY29udGVudFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRjb25zdCBjb250ZW50ID0gZWwucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblx0XHRcdGlmICghY29udGVudCkgcmV0dXJuIGVsO1xuXHRcdFx0XG5cdFx0XHQvLyBDb252ZXJ0IGFueSBwYXJhZ3JhcGggZGl2cyBpbnNpZGUgY29udGVudFxuXHRcdFx0Y29uc3QgcGFyYWdyYXBoRGl2cyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nKTtcblx0XHRcdHBhcmFncmFwaERpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRwLmlubmVySFRNTCA9IGRpdi5pbm5lckhUTUw7XG5cdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChwKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHR9XG5cdH0sXG5cdC8vIENvZGUgYmxvY2tzIHdpdGggc3ludGF4IGhpZ2hsaWdodGluZ1xuXHR7XG5cdFx0c2VsZWN0b3I6ICcud3AtYmxvY2stc3ludGF4aGlnaGxpZ2h0ZXItY29kZSwgLnN5bnRheGhpZ2hsaWdodGVyLCAuaGlnaGxpZ2h0LCAuaGlnaGxpZ2h0LXNvdXJjZSwgLndwLWJsb2NrLWNvZGUsIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIHByZVtjbGFzcyo9XCJicnVzaDpcIl0nLFxuXHRcdGVsZW1lbnQ6ICdwcmUnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuIGVsO1xuXG5cdFx0XHQvLyBDcmVhdGUgbmV3IHByZSBlbGVtZW50XG5cdFx0XHRjb25zdCBuZXdQcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcblx0XHRcdFxuXHRcdFx0Ly8gVHJ5IHRvIGRldGVjdCBsYW5ndWFnZVxuXHRcdFx0bGV0IGxhbmd1YWdlID0gJyc7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGZvciBXb3JkUHJlc3Mgc3ludGF4IGhpZ2hsaWdodGVyIHNwZWNpZmljIGZvcm1hdFxuXHRcdFx0Y29uc3Qgc3ludGF4RWwgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc3ludGF4aGlnaGxpZ2h0ZXInKTtcblx0XHRcdGlmIChzeW50YXhFbCkge1xuXHRcdFx0XHQvLyBHZXQgbGFuZ3VhZ2UgZnJvbSBzeW50YXhoaWdobGlnaHRlciBjbGFzc1xuXHRcdFx0XHRjb25zdCBjbGFzc2VzID0gQXJyYXkuZnJvbShzeW50YXhFbC5jbGFzc0xpc3QpO1xuXHRcdFx0XHRjb25zdCBsYW5nQ2xhc3MgPSBjbGFzc2VzLmZpbmQoYyA9PiAhWydzeW50YXhoaWdobGlnaHRlcicsICdub2d1dHRlciddLmluY2x1ZGVzKGMpKTtcblx0XHRcdFx0aWYgKGxhbmdDbGFzcyAmJiBTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhsYW5nQ2xhc3MudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRsYW5ndWFnZSA9IGxhbmdDbGFzcy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIG5vIGxhbmd1YWdlIGZvdW5kIHlldCwgY2hlY2sgb3RoZXIgY29tbW9uIHBhdHRlcm5zXG5cdFx0XHRpZiAoIWxhbmd1YWdlKSB7XG5cdFx0XHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBBcnJheS5mcm9tKGVsLmNsYXNzTGlzdCk7XG5cdFx0XHRcdGNvbnN0IGxhbmd1YWdlUGF0dGVybnMgPSBbXG5cdFx0XHRcdFx0Lyg/Ol58XFxzKSg/Omxhbmd1YWdlfGxhbmd8YnJ1c2h8c3ludGF4KS0oXFx3KykoPzpcXHN8JCkvaSxcblx0XHRcdFx0XHQvKD86XnxcXHMpKFxcdyspKD86XFxzfCQpL2lcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IGNsYXNzTmFtZSBvZiBjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIGxhbmd1YWdlUGF0dGVybnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gY2xhc3NOYW1lLm1hdGNoKHBhdHRlcm4pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoICYmIG1hdGNoWzFdICYmIFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChsYW5ndWFnZSkgYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRXh0cmFjdCBjb2RlIGNvbnRlbnQsIGhhbmRsaW5nIHZhcmlvdXMgZm9ybWF0c1xuXHRcdFx0bGV0IGNvZGVDb250ZW50ID0gJyc7XG5cblx0XHRcdC8vIEhhbmRsZSBXb3JkUHJlc3Mgc3ludGF4IGhpZ2hsaWdodGVyIHRhYmxlIGZvcm1hdFxuXHRcdFx0Y29uc3QgY29kZUNvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zeW50YXhoaWdobGlnaHRlciB0YWJsZSAuY29kZSAuY29udGFpbmVyJyk7XG5cdFx0XHRpZiAoY29kZUNvbnRhaW5lcikge1xuXHRcdFx0XHQvLyBQcm9jZXNzIGVhY2ggbGluZVxuXHRcdFx0XHRjb25zdCBsaW5lcyA9IEFycmF5LmZyb20oY29kZUNvbnRhaW5lci5jaGlsZHJlbik7XG5cdFx0XHRcdGNvZGVDb250ZW50ID0gbGluZXNcblx0XHRcdFx0XHQubWFwKGxpbmUgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gR2V0IGFsbCBjb2RlIGVsZW1lbnRzIGluIHRoaXMgbGluZVxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZVBhcnRzID0gQXJyYXkuZnJvbShsaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvZGUnKSlcblx0XHRcdFx0XHRcdFx0Lm1hcChjb2RlID0+IHtcblx0XHRcdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHRleHQgY29udGVudCwgcHJlc2VydmluZyBzcGFjZXNcblx0XHRcdFx0XHRcdFx0XHRsZXQgdGV4dCA9IGNvZGUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhpcyBpcyBhICdzcGFjZXMnIGNsYXNzIGVsZW1lbnQsIGNvbnZlcnQgdG8gYWN0dWFsIHNwYWNlc1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjb2RlLmNsYXNzTGlzdC5jb250YWlucygnc3BhY2VzJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRleHQgPSAnICcucmVwZWF0KHRleHQubGVuZ3RoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5qb2luKCcnKTtcblx0XHRcdFx0XHRcdHJldHVybiBjb2RlUGFydHMgfHwgbGluZS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEhhbmRsZSBXb3JkUHJlc3Mgc3ludGF4IGhpZ2hsaWdodGVyIG5vbi10YWJsZSBmb3JtYXRcblx0XHRcdFx0Y29uc3QgY29kZUxpbmVzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLmNvZGUgLmxpbmUnKTtcblx0XHRcdFx0aWYgKGNvZGVMaW5lcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29kZUNvbnRlbnQgPSBBcnJheS5mcm9tKGNvZGVMaW5lcylcblx0XHRcdFx0XHRcdC5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGNvZGVQYXJ0cyA9IEFycmF5LmZyb20obGluZS5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlJykpXG5cdFx0XHRcdFx0XHRcdFx0Lm1hcChjb2RlID0+IGNvZGUudGV4dENvbnRlbnQgfHwgJycpXG5cdFx0XHRcdFx0XHRcdFx0LmpvaW4oJycpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29kZVBhcnRzIHx8IGxpbmUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEZhbGxiYWNrIHRvIHJlZ3VsYXIgdGV4dCBjb250ZW50XG5cdFx0XHRcdFx0Y29kZUNvbnRlbnQgPSBlbC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBDbGVhbiB1cCB0aGUgY29udGVudFxuXHRcdFx0Y29kZUNvbnRlbnQgPSBjb2RlQ29udGVudFxuXHRcdFx0XHQucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpIC8vIFRyaW0gc3RhcnQvZW5kIHdoaXRlc3BhY2Vcblx0XHRcdFx0LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpIC8vIENvbnZlcnQgdGFicyB0byBzcGFjZXNcblx0XHRcdFx0LnJlcGxhY2UoL1xcbnszLH0vZywgJ1xcblxcbicpIC8vIE5vcm1hbGl6ZSBtdWx0aXBsZSBuZXdsaW5lc1xuXHRcdFx0XHQucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpOyAvLyBSZXBsYWNlIG5vbi1icmVha2luZyBzcGFjZXMgd2l0aCByZWd1bGFyIHNwYWNlc1xuXG5cdFx0XHQvLyBDcmVhdGUgY29kZSBlbGVtZW50IHdpdGggbGFuZ3VhZ2UgY2xhc3MgaWYgZGV0ZWN0ZWRcblx0XHRcdGNvbnN0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG5cdFx0XHRpZiAobGFuZ3VhZ2UpIHtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZycsIGxhbmd1YWdlKTtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYGxhbmd1YWdlLSR7bGFuZ3VhZ2V9YCk7XG5cdFx0XHR9XG5cdFx0XHRjb2RlLnRleHRDb250ZW50ID0gY29kZUNvbnRlbnQ7XG5cdFx0XHRcblx0XHRcdG5ld1ByZS5hcHBlbmRDaGlsZChjb2RlKTtcblx0XHRcdHJldHVybiBuZXdQcmU7XG5cdFx0fVxuXHR9XG5dO1xuXG5pbnRlcmZhY2UgRm9vdG5vdGVEYXRhIHtcblx0Y29udGVudDogRWxlbWVudCB8IHN0cmluZztcblx0b3JpZ2luYWxJZDogc3RyaW5nO1xuXHRyZWZzOiBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIEZvb3Rub3RlQ29sbGVjdGlvbiB7XG5cdFtmb290bm90ZU51bWJlcjogbnVtYmVyXTogRm9vdG5vdGVEYXRhO1xufVxuXG5pbnRlcmZhY2UgQ29udGVudFNjb3JlIHtcblx0c2NvcmU6IG51bWJlcjtcblx0ZWxlbWVudDogRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIFN0eWxlQ2hhbmdlIHtcblx0c2VsZWN0b3I6IHN0cmluZztcblx0c3R5bGVzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZ1ZGRsZSB7XG5cdHByaXZhdGUgZG9jOiBEb2N1bWVudDtcblx0cHJpdmF0ZSBvcHRpb25zOiBEZWZ1ZGRsZU9wdGlvbnM7XG5cdHByaXZhdGUgZGVidWc6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBEZWZ1ZGRsZSBpbnN0YW5jZVxuXHQgKiBAcGFyYW0gZG9jIC0gVGhlIGRvY3VtZW50IHRvIHBhcnNlXG5cdCAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgcGFyc2luZ1xuXHQgKi9cblx0Y29uc3RydWN0b3IoZG9jOiBEb2N1bWVudCwgb3B0aW9uczogRGVmdWRkbGVPcHRpb25zID0ge30pIHtcblx0XHR0aGlzLmRvYyA9IGRvYztcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuZGVidWcgPSBvcHRpb25zLmRlYnVnIHx8IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIHRoZSBkb2N1bWVudCBhbmQgZXh0cmFjdCBpdHMgbWFpbiBjb250ZW50XG5cdCAqL1xuXHRwYXJzZSgpOiBEZWZ1ZGRsZVJlc3BvbnNlIHtcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuXHRcdC8vIEV4dHJhY3QgbWV0YWRhdGEgZmlyc3Qgc2luY2Ugd2UnbGwgbmVlZCBpdCBpbiBtdWx0aXBsZSBwbGFjZXNcblx0XHRjb25zdCBzY2hlbWFPcmdEYXRhID0gTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdFNjaGVtYU9yZ0RhdGEodGhpcy5kb2MpO1xuXHRcdGNvbnN0IG1ldGFkYXRhID0gTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdCh0aGlzLmRvYywgc2NoZW1hT3JnRGF0YSk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gRXZhbHVhdGUgc3R5bGVzIGFuZCBzaXplcyBvbiBvcmlnaW5hbCBkb2N1bWVudFxuXHRcdFx0Y29uc3QgbW9iaWxlU3R5bGVzID0gdGhpcy5fZXZhbHVhdGVNZWRpYVF1ZXJpZXModGhpcy5kb2MpO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBmb3Igc21hbGwgaW1hZ2VzIGluIG9yaWdpbmFsIGRvY3VtZW50LCBleGNsdWRpbmcgbGF6eS1sb2FkZWQgb25lc1xuXHRcdFx0Y29uc3Qgc21hbGxJbWFnZXMgPSB0aGlzLmZpbmRTbWFsbEltYWdlcyh0aGlzLmRvYyk7XG5cdFx0XHRcblx0XHRcdC8vIENsb25lIGRvY3VtZW50XG5cdFx0XHRjb25zdCBjbG9uZSA9IHRoaXMuZG9jLmNsb25lTm9kZSh0cnVlKSBhcyBEb2N1bWVudDtcblx0XHRcdFxuXHRcdFx0Ly8gQXBwbHkgbW9iaWxlIHN0eWxlIHRvIGNsb25lXG5cdFx0XHR0aGlzLmFwcGx5TW9iaWxlU3R5bGVzKGNsb25lLCBtb2JpbGVTdHlsZXMpO1xuXG5cdFx0XHQvLyBGaW5kIG1haW4gY29udGVudFxuXHRcdFx0Y29uc3QgbWFpbkNvbnRlbnQgPSB0aGlzLmZpbmRNYWluQ29udGVudChjbG9uZSk7XG5cdFx0XHRpZiAoIW1haW5Db250ZW50KSB7XG5cdFx0XHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRjb250ZW50OiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTCxcblx0XHRcdFx0XHQuLi5tZXRhZGF0YSxcblx0XHRcdFx0XHR3b3JkQ291bnQ6IHRoaXMuY291bnRXb3Jkcyh0aGlzLmRvYy5ib2R5LmlubmVySFRNTCksXG5cdFx0XHRcdFx0cGFyc2VUaW1lOiBNYXRoLnJvdW5kKGVuZFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBzbWFsbCBpbWFnZXMgaWRlbnRpZmllZCBmcm9tIG9yaWdpbmFsIGRvY3VtZW50XG5cdFx0XHR0aGlzLnJlbW92ZVNtYWxsSW1hZ2VzKGNsb25lLCBzbWFsbEltYWdlcyk7XG5cdFx0XHRcblx0XHRcdC8vIFBlcmZvcm0gb3RoZXIgZGVzdHJ1Y3RpdmUgb3BlcmF0aW9ucyBvbiB0aGUgY2xvbmVcblx0XHRcdHRoaXMucmVtb3ZlSGlkZGVuRWxlbWVudHMoY2xvbmUpO1xuXHRcdFx0dGhpcy5yZW1vdmVDbHV0dGVyKGNsb25lKTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgdGhlIG1haW4gY29udGVudFxuXHRcdFx0dGhpcy5jbGVhbkNvbnRlbnQobWFpbkNvbnRlbnQsIG1ldGFkYXRhKTtcblxuXHRcdFx0Y29uc3QgY29udGVudCA9IG1haW5Db250ZW50ID8gbWFpbkNvbnRlbnQub3V0ZXJIVE1MIDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUw7XG5cdFx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvbnRlbnQsXG5cdFx0XHRcdC4uLm1ldGFkYXRhLFxuXHRcdFx0XHR3b3JkQ291bnQ6IHRoaXMuY291bnRXb3Jkcyhjb250ZW50KSxcblx0XHRcdFx0cGFyc2VUaW1lOiBNYXRoLnJvdW5kKGVuZFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZScsICdFcnJvciBwcm9jZXNzaW5nIGRvY3VtZW50OicsIGVycm9yKTtcblx0XHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvbnRlbnQ6IHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MLFxuXHRcdFx0XHQuLi5tZXRhZGF0YSxcblx0XHRcdFx0d29yZENvdW50OiB0aGlzLmNvdW50V29yZHModGhpcy5kb2MuYm9keS5pbm5lckhUTUwpLFxuXHRcdFx0XHRwYXJzZVRpbWU6IE1hdGgucm91bmQoZW5kVGltZSAtIHN0YXJ0VGltZSlcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBjb3VudFdvcmRzKGNvbnRlbnQ6IHN0cmluZyk6IG51bWJlciB7XG5cdFx0Ly8gQ3JlYXRlIGEgdGVtcG9yYXJ5IGRpdiB0byBwYXJzZSBIVE1MIGNvbnRlbnRcblx0XHRjb25zdCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dGVtcERpdi5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdFx0Ly8gR2V0IHRleHQgY29udGVudCwgcmVtb3ZpbmcgZXh0cmEgd2hpdGVzcGFjZVxuXHRcdGNvbnN0IHRleHQgPSB0ZW1wRGl2LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdGNvbnN0IHdvcmRzID0gdGV4dFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL1xccysvZywgJyAnKSAvLyBSZXBsYWNlIG11bHRpcGxlIHNwYWNlcyB3aXRoIHNpbmdsZSBzcGFjZVxuXHRcdFx0LnNwbGl0KCcgJylcblx0XHRcdC5maWx0ZXIod29yZCA9PiB3b3JkLmxlbmd0aCA+IDApOyAvLyBGaWx0ZXIgb3V0IGVtcHR5IHN0cmluZ3NcblxuXHRcdHJldHVybiB3b3Jkcy5sZW5ndGg7XG5cdH1cblxuXHQvLyBNYWtlIGFsbCBvdGhlciBtZXRob2RzIHByaXZhdGUgYnkgcmVtb3ZpbmcgdGhlIHN0YXRpYyBrZXl3b3JkIGFuZCB1c2luZyBwcml2YXRlXG5cdHByaXZhdGUgX2xvZyguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnRGVmdWRkbGU6JywgLi4uYXJncyk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZXZhbHVhdGVNZWRpYVF1ZXJpZXMoZG9jOiBEb2N1bWVudCk6IFN0eWxlQ2hhbmdlW10ge1xuXHRcdGNvbnN0IG1vYmlsZVN0eWxlczogU3R5bGVDaGFuZ2VbXSA9IFtdO1xuXHRcdGNvbnN0IG1heFdpZHRoUmVnZXggPSAvbWF4LXdpZHRoW146XSo6XFxzKihcXGQrKS87XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gR2V0IGFsbCBzdHlsZXMsIGluY2x1ZGluZyBpbmxpbmUgc3R5bGVzXG5cdFx0XHRjb25zdCBzaGVldHMgPSBBcnJheS5mcm9tKGRvYy5zdHlsZVNoZWV0cykuZmlsdGVyKHNoZWV0ID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBBY2Nlc3MgcnVsZXMgb25jZSB0byBjaGVjayB2YWxpZGl0eVxuXHRcdFx0XHRcdHNoZWV0LmNzc1J1bGVzO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Ly8gRXhwZWN0ZWQgZXJyb3IgZm9yIGNyb3NzLW9yaWdpbiBzdHlsZXNoZWV0c1xuXHRcdFx0XHRcdGlmIChlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGUubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvLyBQcm9jZXNzIGFsbCBzaGVldHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdFx0Y29uc3QgbWVkaWFSdWxlcyA9IHNoZWV0cy5mbGF0TWFwKHNoZWV0ID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXR1cm4gQXJyYXkuZnJvbShzaGVldC5jc3NSdWxlcylcblx0XHRcdFx0XHRcdC5maWx0ZXIoKHJ1bGUpOiBydWxlIGlzIENTU01lZGlhUnVsZSA9PiBcblx0XHRcdFx0XHRcdFx0cnVsZSBpbnN0YW5jZW9mIENTU01lZGlhUnVsZSAmJlxuXHRcdFx0XHRcdFx0XHRydWxlLmNvbmRpdGlvblRleHQuaW5jbHVkZXMoJ21heC13aWR0aCcpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIHN0eWxlc2hlZXQ6JywgZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFByb2Nlc3MgYWxsIG1lZGlhIHJ1bGVzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRcdG1lZGlhUnVsZXMuZm9yRWFjaChydWxlID0+IHtcblx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBydWxlLmNvbmRpdGlvblRleHQubWF0Y2gobWF4V2lkdGhSZWdleCk7XG5cdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdGNvbnN0IG1heFdpZHRoID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChNT0JJTEVfV0lEVEggPD0gbWF4V2lkdGgpIHtcblx0XHRcdFx0XHRcdC8vIEJhdGNoIHByb2Nlc3MgYWxsIHN0eWxlIHJ1bGVzXG5cdFx0XHRcdFx0XHRjb25zdCBzdHlsZVJ1bGVzID0gQXJyYXkuZnJvbShydWxlLmNzc1J1bGVzKVxuXHRcdFx0XHRcdFx0XHQuZmlsdGVyKChyKTogciBpcyBDU1NTdHlsZVJ1bGUgPT4gciBpbnN0YW5jZW9mIENTU1N0eWxlUnVsZSk7XG5cblx0XHRcdFx0XHRcdHN0eWxlUnVsZXMuZm9yRWFjaChjc3NSdWxlID0+IHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRtb2JpbGVTdHlsZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RvcjogY3NzUnVsZS5zZWxlY3RvclRleHQsXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZXM6IGNzc1J1bGUuc3R5bGUuY3NzVGV4dFxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIENTUyBydWxlOicsIGUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZTogRXJyb3IgZXZhbHVhdGluZyBtZWRpYSBxdWVyaWVzOicsIGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb2JpbGVTdHlsZXM7XG5cdH1cblxuXHRwcml2YXRlIGFwcGx5TW9iaWxlU3R5bGVzKGRvYzogRG9jdW1lbnQsIG1vYmlsZVN0eWxlczogU3R5bGVDaGFuZ2VbXSkge1xuXHRcdGxldCBhcHBsaWVkQ291bnQgPSAwO1xuXG5cdFx0bW9iaWxlU3R5bGVzLmZvckVhY2goKHtzZWxlY3Rvciwgc3R5bGVzfSkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRcdGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXG5cdFx0XHRcdFx0XHQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJycpICsgc3R5bGVzXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRhcHBsaWVkQ291bnQrKztcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlJywgJ0Vycm9yIGFwcGx5aW5nIHN0eWxlcyBmb3Igc2VsZWN0b3I6Jywgc2VsZWN0b3IsIGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUhpZGRlbkVsZW1lbnRzKGRvYzogRG9jdW1lbnQpIHtcblx0XHRsZXQgY291bnQgPSAwO1xuXHRcdGNvbnN0IGVsZW1lbnRzVG9SZW1vdmUgPSBuZXcgU2V0PEVsZW1lbnQ+KCk7XG5cblx0XHQvLyBGaXJzdCBwYXNzOiBHZXQgYWxsIGVsZW1lbnRzIG1hdGNoaW5nIGhpZGRlbiBzZWxlY3RvcnNcblx0XHRjb25zdCBoaWRkZW5FbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKEhJRERFTl9FTEVNRU5UX1NFTEVDVE9SUyk7XG5cdFx0aGlkZGVuRWxlbWVudHMuZm9yRWFjaChlbCA9PiBlbGVtZW50c1RvUmVtb3ZlLmFkZChlbCkpO1xuXHRcdGNvdW50ICs9IGhpZGRlbkVsZW1lbnRzLmxlbmd0aDtcblxuXHRcdC8vIFNlY29uZCBwYXNzOiBVc2UgVHJlZVdhbGtlciBmb3IgZWZmaWNpZW50IHRyYXZlcnNhbFxuXHRcdGNvbnN0IHRyZWVXYWxrZXIgPSBkb2MuY3JlYXRlVHJlZVdhbGtlcihcblx0XHRcdGRvYy5ib2R5LFxuXHRcdFx0Tm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsXG5cdFx0XHR7XG5cdFx0XHRcdGFjY2VwdE5vZGU6IChub2RlOiBFbGVtZW50KSA9PiB7XG5cdFx0XHRcdFx0Ly8gU2tpcCBlbGVtZW50cyBhbHJlYWR5IG1hcmtlZCBmb3IgcmVtb3ZhbFxuXHRcdFx0XHRcdGlmIChlbGVtZW50c1RvUmVtb3ZlLmhhcyhub2RlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX1JFSkVDVDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHQvLyBCYXRjaCBzdHlsZSBjb21wdXRhdGlvbnNcblx0XHRjb25zdCBlbGVtZW50czogRWxlbWVudFtdID0gW107XG5cdFx0bGV0IGN1cnJlbnROb2RlOiBFbGVtZW50IHwgbnVsbDtcblx0XHR3aGlsZSAoY3VycmVudE5vZGUgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkgYXMgRWxlbWVudCkge1xuXHRcdFx0ZWxlbWVudHMucHVzaChjdXJyZW50Tm9kZSk7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvY2VzcyBzdHlsZXMgaW4gYmF0Y2hlcyB0byBtaW5pbWl6ZSBsYXlvdXQgdGhyYXNoaW5nXG5cdFx0Y29uc3QgQkFUQ0hfU0laRSA9IDEwMDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSArPSBCQVRDSF9TSVpFKSB7XG5cdFx0XHRjb25zdCBiYXRjaCA9IGVsZW1lbnRzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcblx0XHRcdFxuXHRcdFx0Ly8gUmVhZCBwaGFzZSAtIGdhdGhlciBhbGwgY29tcHV0ZWRTdHlsZXNcblx0XHRcdGNvbnN0IHN0eWxlcyA9IGJhdGNoLm1hcChlbCA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkpO1xuXHRcdFx0XG5cdFx0XHQvLyBXcml0ZSBwaGFzZSAtIG1hcmsgZWxlbWVudHMgZm9yIHJlbW92YWxcblx0XHRcdGJhdGNoLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBzdHlsZXNbaW5kZXhdO1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHxcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLnZpc2liaWxpdHkgPT09ICdoaWRkZW4nIHx8XG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS5vcGFjaXR5ID09PSAnMCdcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5hZGQoZWxlbWVudCk7XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gRmluYWwgcGFzczogQmF0Y2ggcmVtb3ZlIGFsbCBoaWRkZW4gZWxlbWVudHNcblx0XHRlbGVtZW50c1RvUmVtb3ZlLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIGhpZGRlbiBlbGVtZW50czonLCBjb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUNsdXR0ZXIoZG9jOiBEb2N1bWVudCkge1xuXHRcdGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdGxldCBleGFjdFNlbGVjdG9yQ291bnQgPSAwO1xuXHRcdGxldCBwYXJ0aWFsU2VsZWN0b3JDb3VudCA9IDA7XG5cblx0XHQvLyBUcmFjayBhbGwgZWxlbWVudHMgdG8gYmUgcmVtb3ZlZFxuXHRcdGNvbnN0IGVsZW1lbnRzVG9SZW1vdmUgPSBuZXcgU2V0PEVsZW1lbnQ+KCk7XG5cblx0XHQvLyBGaXJzdCBjb2xsZWN0IGVsZW1lbnRzIG1hdGNoaW5nIGV4YWN0IHNlbGVjdG9yc1xuXHRcdGNvbnN0IGV4YWN0RWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChFWEFDVF9TRUxFQ1RPUlMuam9pbignLCcpKTtcblx0XHRleGFjdEVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0aWYgKGVsPy5wYXJlbnROb2RlKSB7XG5cdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsKTtcblx0XHRcdFx0ZXhhY3RTZWxlY3RvckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBQcmUtY29tcGlsZSByZWdleGVzIGFuZCBjb21iaW5lIGludG8gYSBzaW5nbGUgcmVnZXggZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuXHRcdGNvbnN0IGNvbWJpbmVkUGF0dGVybiA9IFBBUlRJQUxfU0VMRUNUT1JTLmpvaW4oJ3wnKTtcblx0XHRjb25zdCBwYXJ0aWFsUmVnZXggPSBuZXcgUmVnRXhwKGNvbWJpbmVkUGF0dGVybiwgJ2knKTtcblxuXHRcdC8vIENyZWF0ZSBhbiBlZmZpY2llbnQgYXR0cmlidXRlIHNlbGVjdG9yIGZvciBlbGVtZW50cyB3ZSBjYXJlIGFib3V0XG5cdFx0Y29uc3QgYXR0cmlidXRlU2VsZWN0b3IgPSAnW2NsYXNzXSxbaWRdLFtkYXRhLXRlc3RpZF0sW2RhdGEtcWFdLFtkYXRhLWN5XSc7XG5cdFx0Y29uc3QgYWxsRWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChhdHRyaWJ1dGVTZWxlY3Rvcik7XG5cblx0XHQvLyBQcm9jZXNzIGVsZW1lbnRzIGZvciBwYXJ0aWFsIG1hdGNoZXNcblx0XHRhbGxFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdC8vIFNraXAgaWYgYWxyZWFkeSBtYXJrZWQgZm9yIHJlbW92YWxcblx0XHRcdGlmIChlbGVtZW50c1RvUmVtb3ZlLmhhcyhlbCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZXQgYWxsIHJlbGV2YW50IGF0dHJpYnV0ZXMgYW5kIGNvbWJpbmUgaW50byBhIHNpbmdsZSBzdHJpbmdcblx0XHRcdGNvbnN0IGF0dHJzID0gW1xuXHRcdFx0XHRlbC5jbGFzc05hbWUgJiYgdHlwZW9mIGVsLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgPyBlbC5jbGFzc05hbWUgOiAnJyxcblx0XHRcdFx0ZWwuaWQgfHwgJycsXG5cdFx0XHRcdGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0aWQnKSB8fCAnJyxcblx0XHRcdFx0ZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXFhJykgfHwgJycsXG5cdFx0XHRcdGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jeScpIHx8ICcnXG5cdFx0XHRdLmpvaW4oJyAnKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHQvLyBTa2lwIGlmIG5vIGF0dHJpYnV0ZXMgdG8gY2hlY2tcblx0XHRcdGlmICghYXR0cnMudHJpbSgpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgZm9yIHBhcnRpYWwgbWF0Y2ggdXNpbmcgc2luZ2xlIHJlZ2V4IHRlc3Rcblx0XHRcdGlmIChwYXJ0aWFsUmVnZXgudGVzdChhdHRycykpIHtcblx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5hZGQoZWwpO1xuXHRcdFx0XHRwYXJ0aWFsU2VsZWN0b3JDb3VudCsrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIGFsbCBjb2xsZWN0ZWQgZWxlbWVudHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG5cblx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIGNsdXR0ZXIgZWxlbWVudHM6Jywge1xuXHRcdFx0ZXhhY3RTZWxlY3RvcnM6IGV4YWN0U2VsZWN0b3JDb3VudCxcblx0XHRcdHBhcnRpYWxTZWxlY3RvcnM6IHBhcnRpYWxTZWxlY3RvckNvdW50LFxuXHRcdFx0dG90YWw6IGVsZW1lbnRzVG9SZW1vdmUuc2l6ZSxcblx0XHRcdHByb2Nlc3NpbmdUaW1lOiBgJHsoZW5kVGltZSAtIHN0YXJ0VGltZSkudG9GaXhlZCgyKX1tc2Bcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY2xlYW5Db250ZW50KGVsZW1lbnQ6IEVsZW1lbnQsIG1ldGFkYXRhOiBEZWZ1ZGRsZU1ldGFkYXRhKSB7XG5cdFx0Ly8gUmVtb3ZlIEhUTUwgY29tbWVudHNcblx0XHR0aGlzLnJlbW92ZUh0bWxDb21tZW50cyhlbGVtZW50KTtcblx0XHRcblx0XHQvLyBIYW5kbGUgSDEgZWxlbWVudHMgLSByZW1vdmUgZmlyc3Qgb25lIGFuZCBjb252ZXJ0IG90aGVycyB0byBIMlxuXHRcdHRoaXMuaGFuZGxlSGVhZGluZ3MoZWxlbWVudCwgbWV0YWRhdGEudGl0bGUpO1xuXHRcdFxuXHRcdC8vIFN0YW5kYXJkaXplIGZvb3Rub3RlcyBhbmQgY2l0YXRpb25zXG5cdFx0dGhpcy5zdGFuZGFyZGl6ZUZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIEhhbmRsZSBsYXp5LWxvYWRlZCBpbWFnZXNcblx0XHR0aGlzLmhhbmRsZUxhenlJbWFnZXMoZWxlbWVudCk7XG5cblx0XHQvLyBDb252ZXJ0IGVtYmVkZGVkIGNvbnRlbnQgdG8gc3RhbmRhcmQgZm9ybWF0c1xuXHRcdHRoaXMuc3RhbmRhcmRpemVFbGVtZW50cyhlbGVtZW50KTtcblx0XHRcblx0XHQvLyBTdHJpcCB1bndhbnRlZCBhdHRyaWJ1dGVzXG5cdFx0dGhpcy5zdHJpcFVud2FudGVkQXR0cmlidXRlcyhlbGVtZW50KTtcblxuXHRcdC8vIFJlbW92ZSBlbXB0eSBlbGVtZW50c1xuXHRcdHRoaXMucmVtb3ZlRW1wdHlFbGVtZW50cyhlbGVtZW50KTtcblxuXHRcdC8vIFJlbW92ZSB0cmFpbGluZyBoZWFkaW5nc1xuXHRcdHRoaXMucmVtb3ZlVHJhaWxpbmdIZWFkaW5ncyhlbGVtZW50KTtcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlVHJhaWxpbmdIZWFkaW5ncyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHJlbW92ZWRDb3VudCA9IDA7XG5cblx0XHRjb25zdCBoYXNDb250ZW50QWZ0ZXIgPSAoZWw6IEVsZW1lbnQpOiBib29sZWFuID0+IHtcblx0XHRcdC8vIENoZWNrIGlmIHRoZXJlJ3MgYW55IG1lYW5pbmdmdWwgY29udGVudCBhZnRlciB0aGlzIGVsZW1lbnRcblx0XHRcdGxldCBuZXh0Q29udGVudCA9ICcnO1xuXHRcdFx0bGV0IHNpYmxpbmcgPSBlbC5uZXh0U2libGluZztcblxuXHRcdFx0Ly8gRmlyc3QgY2hlY2sgZGlyZWN0IHNpYmxpbmdzXG5cdFx0XHR3aGlsZSAoc2libGluZykge1xuXHRcdFx0XHRpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRuZXh0Q29udGVudCArPSBzaWJsaW5nLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG5cdFx0XHRcdFx0Ly8gSWYgd2UgZmluZCBhbiBlbGVtZW50IHNpYmxpbmcsIGNoZWNrIGl0cyBjb250ZW50XG5cdFx0XHRcdFx0bmV4dENvbnRlbnQgKz0gKHNpYmxpbmcgYXMgRWxlbWVudCkudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmc7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHdlIGZvdW5kIG1lYW5pbmdmdWwgY29udGVudCBhdCB0aGlzIGxldmVsLCByZXR1cm4gdHJ1ZVxuXHRcdFx0aWYgKG5leHRDb250ZW50LnRyaW0oKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgbm8gY29udGVudCBmb3VuZCBhdCB0aGlzIGxldmVsIGFuZCB3ZSBoYXZlIGEgcGFyZW50LFxuXHRcdFx0Ly8gY2hlY2sgZm9yIGNvbnRlbnQgYWZ0ZXIgdGhlIHBhcmVudFxuXHRcdFx0Y29uc3QgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcblx0XHRcdGlmIChwYXJlbnQgJiYgcGFyZW50ICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdHJldHVybiBoYXNDb250ZW50QWZ0ZXIocGFyZW50KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHQvLyBQcm9jZXNzIGFsbCBoZWFkaW5ncyBmcm9tIGJvdHRvbSB0byB0b3Bcblx0XHRjb25zdCBoZWFkaW5ncyA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoMSwgaDIsIGgzLCBoNCwgaDUsIGg2JykpXG5cdFx0XHQucmV2ZXJzZSgpO1xuXG5cdFx0aGVhZGluZ3MuZm9yRWFjaChoZWFkaW5nID0+IHtcblx0XHRcdGlmICghaGFzQ29udGVudEFmdGVyKGhlYWRpbmcpKSB7XG5cdFx0XHRcdGhlYWRpbmcucmVtb3ZlKCk7XG5cdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU3RvcCBwcm9jZXNzaW5nIG9uY2Ugd2UgZmluZCBhIGhlYWRpbmcgd2l0aCBjb250ZW50IGFmdGVyIGl0XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmIChyZW1vdmVkQ291bnQgPiAwKSB7XG5cdFx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgdHJhaWxpbmcgaGVhZGluZ3M6JywgcmVtb3ZlZENvdW50KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGhhbmRsZUhlYWRpbmdzKGVsZW1lbnQ6IEVsZW1lbnQsIHRpdGxlOiBzdHJpbmcpIHtcblx0XHRjb25zdCBoMXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMScpO1xuXG5cdFx0QXJyYXkuZnJvbShoMXMpLmZvckVhY2goaDEgPT4ge1xuXHRcdFx0Y29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuXHRcdFx0aDIuaW5uZXJIVE1MID0gaDEuaW5uZXJIVE1MO1xuXHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LmZyb20oaDEuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdGgyLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGgxLnBhcmVudE5vZGU/LnJlcGxhY2VDaGlsZChoMiwgaDEpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIGZpcnN0IEgyIGlmIGl0IG1hdGNoZXMgdGl0bGVcblx0XHRjb25zdCBoMnMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMicpO1xuXHRcdGlmIChoMnMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgZmlyc3RIMiA9IGgyc1swXTtcblx0XHRcdGNvbnN0IGZpcnN0SDJUZXh0ID0gZmlyc3RIMi50ZXh0Q29udGVudD8udHJpbSgpLnRvTG93ZXJDYXNlKCkgfHwgJyc7XG5cdFx0XHRjb25zdCBub3JtYWxpemVkVGl0bGUgPSB0aXRsZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblx0XHRcdGlmIChub3JtYWxpemVkVGl0bGUgJiYgbm9ybWFsaXplZFRpdGxlID09PSBmaXJzdEgyVGV4dCkge1xuXHRcdFx0XHRmaXJzdEgyLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlSHRtbENvbW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRjb25zdCBjb21tZW50czogQ29tbWVudFtdID0gW107XG5cdFx0Y29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcblx0XHRcdGVsZW1lbnQsXG5cdFx0XHROb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCxcblx0XHRcdG51bGxcblx0XHQpO1xuXG5cdFx0bGV0IG5vZGU7XG5cdFx0d2hpbGUgKG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKSkge1xuXHRcdFx0Y29tbWVudHMucHVzaChub2RlIGFzIENvbW1lbnQpO1xuXHRcdH1cblxuXHRcdGNvbW1lbnRzLmZvckVhY2goY29tbWVudCA9PiB7XG5cdFx0XHRjb21tZW50LnJlbW92ZSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIEhUTUwgY29tbWVudHM6JywgY29tbWVudHMubGVuZ3RoKTtcblx0fVxuXG5cdHByaXZhdGUgc3RyaXBVbndhbnRlZEF0dHJpYnV0ZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBhdHRyaWJ1dGVDb3VudCA9IDA7XG5cblx0XHRjb25zdCBwcm9jZXNzRWxlbWVudCA9IChlbDogRWxlbWVudCkgPT4ge1xuXHRcdFx0Ly8gU2tpcCBTVkcgZWxlbWVudHMgLSBwcmVzZXJ2ZSBhbGwgdGhlaXIgYXR0cmlidXRlc1xuXHRcdFx0aWYgKGVsIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpO1xuXHRcdFx0XG5cdFx0XHRhdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGNvbnN0IGF0dHJOYW1lID0gYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdGlmICghQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyTmFtZSkgJiYgIWF0dHJOYW1lLnN0YXJ0c1dpdGgoJ2RhdGEtJykpIHtcblx0XHRcdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKTtcblx0XHRcdFx0XHRhdHRyaWJ1dGVDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0cHJvY2Vzc0VsZW1lbnQoZWxlbWVudCk7XG5cdFx0ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykuZm9yRWFjaChwcm9jZXNzRWxlbWVudCk7XG5cblx0XHR0aGlzLl9sb2coJ1N0cmlwcGVkIGF0dHJpYnV0ZXM6JywgYXR0cmlidXRlQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVFbXB0eUVsZW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcmVtb3ZlZENvdW50ID0gMDtcblx0XHRsZXQgaXRlcmF0aW9ucyA9IDA7XG5cdFx0bGV0IGtlZXBSZW1vdmluZyA9IHRydWU7XG5cblx0XHR3aGlsZSAoa2VlcFJlbW92aW5nKSB7XG5cdFx0XHRpdGVyYXRpb25zKys7XG5cdFx0XHRrZWVwUmVtb3ZpbmcgPSBmYWxzZTtcblx0XHRcdC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aG91dCBjaGlsZHJlbiwgd29ya2luZyBmcm9tIGRlZXBlc3QgZmlyc3Rcblx0XHRcdGNvbnN0IGVtcHR5RWxlbWVudHMgPSBBcnJheS5mcm9tKGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSkuZmlsdGVyKGVsID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfRU1QVFlfRUxFTUVOVFMuaGFzKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIG9ubHkgd2hpdGVzcGFjZSBvciAmbmJzcDtcblx0XHRcdFx0Y29uc3QgdGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0Y29uc3QgaGFzT25seVdoaXRlc3BhY2UgPSB0ZXh0Q29udGVudC50cmltKCkubGVuZ3RoID09PSAwO1xuXHRcdFx0XHRjb25zdCBoYXNOYnNwID0gdGV4dENvbnRlbnQuaW5jbHVkZXMoJ1xcdTAwQTAnKTsgLy8gVW5pY29kZSBub24tYnJlYWtpbmcgc3BhY2Vcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIG5vIG1lYW5pbmdmdWwgY2hpbGRyZW5cblx0XHRcdFx0Y29uc3QgaGFzTm9DaGlsZHJlbiA9ICFlbC5oYXNDaGlsZE5vZGVzKCkgfHwgXG5cdFx0XHRcdFx0KEFycmF5LmZyb20oZWwuY2hpbGROb2RlcykuZXZlcnkobm9kZSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm9kZVRleHQgPSBub2RlLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbm9kZVRleHQudHJpbSgpLmxlbmd0aCA9PT0gMCAmJiAhbm9kZVRleHQuaW5jbHVkZXMoJ1xcdTAwQTAnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0cmV0dXJuIGhhc09ubHlXaGl0ZXNwYWNlICYmICFoYXNOYnNwICYmIGhhc05vQ2hpbGRyZW47XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGVtcHR5RWxlbWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRlbXB0eUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0a2VlcFJlbW92aW5nID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgZW1wdHkgZWxlbWVudHM6Jywge1xuXHRcdFx0Y291bnQ6IHJlbW92ZWRDb3VudCxcblx0XHRcdGl0ZXJhdGlvbnNcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlRm9vdG5vdGVJdGVtKFxuXHRcdGZvb3Rub3RlTnVtYmVyOiBudW1iZXIsXG5cdFx0Y29udGVudDogc3RyaW5nIHwgRWxlbWVudCxcblx0XHRyZWZzOiBzdHJpbmdbXVxuXHQpOiBIVE1MTElFbGVtZW50IHtcblx0XHRjb25zdCBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRuZXdJdGVtLmNsYXNzTmFtZSA9ICdmb290bm90ZSc7XG5cdFx0bmV3SXRlbS5pZCA9IGBmbjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cblx0XHQvLyBIYW5kbGUgY29udGVudFxuXHRcdGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSBjb250ZW50O1xuXHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBHZXQgYWxsIHBhcmFncmFwaHMgZnJvbSB0aGUgY29udGVudFxuXHRcdFx0Y29uc3QgcGFyYWdyYXBocyA9IEFycmF5LmZyb20oY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdwJykpO1xuXHRcdFx0aWYgKHBhcmFncmFwaHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdC8vIElmIG5vIHBhcmFncmFwaHMsIHdyYXAgY29udGVudCBpbiBhIHBhcmFncmFwaFxuXHRcdFx0XHRjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSBjb250ZW50LmlubmVySFRNTDtcblx0XHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ29weSBleGlzdGluZyBwYXJhZ3JhcGhzXG5cdFx0XHRcdHBhcmFncmFwaHMuZm9yRWFjaChwID0+IHtcblx0XHRcdFx0XHRjb25zdCBuZXdQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRcdG5ld1AuaW5uZXJIVE1MID0gcC5pbm5lckhUTUw7XG5cdFx0XHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChuZXdQKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIGJhY2tsaW5rKHMpIHRvIHRoZSBsYXN0IHBhcmFncmFwaFxuXHRcdGNvbnN0IGxhc3RQYXJhZ3JhcGggPSBuZXdJdGVtLnF1ZXJ5U2VsZWN0b3IoJ3A6bGFzdC1vZi10eXBlJykgfHwgbmV3SXRlbTtcblx0XHRyZWZzLmZvckVhY2goKHJlZklkLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgYmFja2xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRiYWNrbGluay5ocmVmID0gYCMke3JlZklkfWA7XG5cdFx0XHRiYWNrbGluay50aXRsZSA9ICdyZXR1cm4gdG8gYXJ0aWNsZSc7XG5cdFx0XHRiYWNrbGluay5jbGFzc05hbWUgPSAnZm9vdG5vdGUtYmFja3JlZic7XG5cdFx0XHRiYWNrbGluay5pbm5lckhUTUwgPSAn4oapJztcblx0XHRcdGlmIChpbmRleCA8IHJlZnMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRiYWNrbGluay5pbm5lckhUTUwgKz0gJyAnO1xuXHRcdFx0fVxuXHRcdFx0bGFzdFBhcmFncmFwaC5hcHBlbmRDaGlsZChiYWNrbGluayk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbmV3SXRlbTtcblx0fVxuXG5cdHByaXZhdGUgY29sbGVjdEZvb3Rub3RlcyhlbGVtZW50OiBFbGVtZW50KTogRm9vdG5vdGVDb2xsZWN0aW9uIHtcblx0XHRjb25zdCBmb290bm90ZXM6IEZvb3Rub3RlQ29sbGVjdGlvbiA9IHt9O1xuXHRcdGxldCBmb290bm90ZUNvdW50ID0gMTtcblx0XHRjb25zdCBwcm9jZXNzZWRJZHMgPSBuZXcgU2V0PHN0cmluZz4oKTsgLy8gVHJhY2sgcHJvY2Vzc2VkIElEc1xuXG5cdFx0Ly8gQ29sbGVjdCBhbGwgZm9vdG5vdGVzIGFuZCB0aGVpciBJRHMgZnJvbSBmb290bm90ZSBsaXN0c1xuXHRcdGNvbnN0IGZvb3Rub3RlTGlzdHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMpO1xuXHRcdGZvb3Rub3RlTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcblx0XHRcdC8vIFN1YnN0YWNrIGhhcyBpbmRpdmlkdWFsIGZvb3Rub3RlIGRpdnMgd2l0aCBubyBwYXJlbnRcblx0XHRcdGlmIChsaXN0Lm1hdGNoZXMoJ2Rpdi5mb290bm90ZVtkYXRhLWNvbXBvbmVudC1uYW1lPVwiRm9vdG5vdGVUb0RPTVwiXScpKSB7XG5cdFx0XHRcdGNvbnN0IGFuY2hvciA9IGxpc3QucXVlcnlTZWxlY3RvcignYS5mb290bm90ZS1udW1iZXInKTtcblx0XHRcdFx0Y29uc3QgY29udGVudCA9IGxpc3QucXVlcnlTZWxlY3RvcignLmZvb3Rub3RlLWNvbnRlbnQnKTtcblx0XHRcdFx0aWYgKGFuY2hvciAmJiBjb250ZW50KSB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBhbmNob3IuaWQucmVwbGFjZSgnZm9vdG5vdGUtJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0aWYgKGlkICYmICFwcm9jZXNzZWRJZHMuaGFzKGlkKSkge1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVzW2Zvb3Rub3RlQ291bnRdID0ge1xuXHRcdFx0XHRcdFx0XHRjb250ZW50OiBjb250ZW50LFxuXHRcdFx0XHRcdFx0XHRvcmlnaW5hbElkOiBpZCxcblx0XHRcdFx0XHRcdFx0cmVmczogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRwcm9jZXNzZWRJZHMuYWRkKGlkKTtcblx0XHRcdFx0XHRcdGZvb3Rub3RlQ291bnQrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb21tb24gZm9ybWF0IHVzaW5nIE9ML1VMIGFuZCBMSSBlbGVtZW50c1xuXHRcdFx0Y29uc3QgaXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLCBkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRpdGVtcy5mb3JFYWNoKGxpID0+IHtcblx0XHRcdFx0bGV0IGlkID0gJyc7XG5cdFx0XHRcdGxldCBjb250ZW50OiBFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIGNpdGF0aW9ucyB3aXRoIC5jaXRhdGlvbnMgY2xhc3Ncblx0XHRcdFx0Y29uc3QgY2l0YXRpb25zRGl2ID0gbGkucXVlcnlTZWxlY3RvcignLmNpdGF0aW9ucycpO1xuXHRcdFx0XHRpZiAoY2l0YXRpb25zRGl2Py5pZD8udG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdyJykpIHtcblx0XHRcdFx0XHRpZCA9IGNpdGF0aW9uc0Rpdi5pZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdC8vIExvb2sgZm9yIGNpdGF0aW9uIGNvbnRlbnQgd2l0aGluIHRoZSBjaXRhdGlvbnMgZGl2XG5cdFx0XHRcdFx0Y29uc3QgY2l0YXRpb25Db250ZW50ID0gY2l0YXRpb25zRGl2LnF1ZXJ5U2VsZWN0b3IoJy5jaXRhdGlvbi1jb250ZW50Jyk7XG5cdFx0XHRcdFx0aWYgKGNpdGF0aW9uQ29udGVudCkge1xuXHRcdFx0XHRcdFx0Y29udGVudCA9IGNpdGF0aW9uQ29udGVudDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRXh0cmFjdCBJRCBmcm9tIHZhcmlvdXMgZm9ybWF0c1xuXHRcdFx0XHRcdGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2JpYi5iaWInKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5pZC5yZXBsYWNlKCdiaWIuYmliJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2ZuOicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2ZuOicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaWQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdmbicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2ZuJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0Ly8gTmF0dXJlLmNvbVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaGFzQXR0cmlidXRlKCdkYXRhLWNvdW50ZXInKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY291bnRlcicpPy5yZXBsYWNlKC9cXC4kLywgJycpPy50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGxpLmlkLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC9jaXRlX25vdGUtKC4rKS8pO1xuXHRcdFx0XHRcdFx0aWQgPSBtYXRjaCA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiBsaS5pZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb250ZW50ID0gbGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWQgJiYgIXByb2Nlc3NlZElkcy5oYXMoaWQpKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVzW2Zvb3Rub3RlQ291bnRdID0ge1xuXHRcdFx0XHRcdFx0Y29udGVudDogY29udGVudCB8fCBsaSxcblx0XHRcdFx0XHRcdG9yaWdpbmFsSWQ6IGlkLFxuXHRcdFx0XHRcdFx0cmVmczogW11cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHByb2Nlc3NlZElkcy5hZGQoaWQpO1xuXHRcdFx0XHRcdGZvb3Rub3RlQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZm9vdG5vdGVzO1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kT3V0ZXJGb290bm90ZUNvbnRhaW5lcihlbDogRWxlbWVudCk6IEVsZW1lbnQge1xuXHRcdGxldCBjdXJyZW50OiBFbGVtZW50IHwgbnVsbCA9IGVsO1xuXHRcdGxldCBwYXJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWwucGFyZW50RWxlbWVudDtcblx0XHRcblx0XHQvLyBLZWVwIGdvaW5nIHVwIHVudGlsIHdlIGZpbmQgYW4gZWxlbWVudCB0aGF0J3Mgbm90IGEgc3BhbiBvciBzdXBcblx0XHR3aGlsZSAocGFyZW50ICYmIChcblx0XHRcdHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzcGFuJyB8fCBcblx0XHRcdHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdXAnXG5cdFx0KSkge1xuXHRcdFx0Y3VycmVudCA9IHBhcmVudDtcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gY3VycmVudDtcblx0fVxuXG5cdC8vIEV2ZXJ5IGZvb3Rub3RlIHJlZmVyZW5jZSBzaG91bGQgYmUgYSBzdXAgZWxlbWVudCB3aXRoIGFuIGFuY2hvciBpbnNpZGVcblx0Ly8gZS5nLiA8c3VwIGlkPVwiZm5yZWY6MVwiPjxhIGhyZWY9XCIjZm46MVwiPjE8L2E+PC9zdXA+XG5cdHByaXZhdGUgY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXI6IHN0cmluZywgcmVmSWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcblx0XHRjb25zdCBzdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdXAnKTtcblx0XHRzdXAuaWQgPSByZWZJZDtcblx0XHRjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdGxpbmsuaHJlZiA9IGAjZm46JHtmb290bm90ZU51bWJlcn1gO1xuXHRcdGxpbmsudGV4dENvbnRlbnQgPSBmb290bm90ZU51bWJlcjtcblx0XHRzdXAuYXBwZW5kQ2hpbGQobGluayk7XG5cdFx0cmV0dXJuIHN1cDtcblx0fVxuXG5cdHByaXZhdGUgc3RhbmRhcmRpemVGb290bm90ZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGNvbnN0IGZvb3Rub3RlcyA9IHRoaXMuY29sbGVjdEZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIFN0YW5kYXJkaXplIGlubGluZSBmb290bm90ZXMgdXNpbmcgdGhlIGNvbGxlY3RlZCBJRHNcblx0XHRjb25zdCBmb290bm90ZUlubGluZVJlZmVyZW5jZXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfSU5MSU5FX1JFRkVSRU5DRVMpO1xuXHRcdFxuXHRcdC8vIEdyb3VwIHJlZmVyZW5jZXMgYnkgdGhlaXIgcGFyZW50IHN1cCBlbGVtZW50XG5cdFx0Y29uc3Qgc3VwR3JvdXBzID0gbmV3IE1hcDxFbGVtZW50LCBFbGVtZW50W10+KCk7XG5cdFx0XG5cdFx0Zm9vdG5vdGVJbmxpbmVSZWZlcmVuY2VzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcblxuXHRcdFx0bGV0IGZvb3Rub3RlSWQgPSAnJztcblx0XHRcdGxldCBmb290bm90ZUNvbnRlbnQgPSAnJztcblxuXHRcdFx0Ly8gRXh0cmFjdCBmb290bm90ZSBJRCBiYXNlZCBvbiBlbGVtZW50IHR5cGVcblx0XHRcdC8vIE5hdHVyZS5jb21cblx0XHRcdGlmIChlbC5tYXRjaGVzKCdhW2lkXj1cInJlZi1saW5rXCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHQvLyBTY2llbmNlLm9yZ1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhW3JvbGU9XCJkb2MtYmlibGlvcmVmXCJdJykpIHtcblx0XHRcdFx0Y29uc3QgeG1sUmlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXhtbC1yaWQnKTtcblx0XHRcdFx0aWYgKHhtbFJpZCkge1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSB4bWxSaWQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmPy5zdGFydHNXaXRoKCcjY29yZS1SJykpIHtcblx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBocmVmLnJlcGxhY2UoJyNjb3JlLScsICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdC8vIFN1YnN0YWNrXG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2EuZm9vdG5vdGUtYW5jaG9yLCBzcGFuLmZvb3Rub3RlLWhvdmVyY2FyZC10YXJnZXQgYScpKSB7XG5cdFx0XHRcdGNvbnN0IGlkID0gZWwuaWQ/LnJlcGxhY2UoJ2Zvb3Rub3RlLWFuY2hvci0nLCAnJykgfHwgJyc7XG5cdFx0XHRcdGlmIChpZCkge1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBpZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHQvLyBBcnhpdlxuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdjaXRlLmx0eF9jaXRlJykpIHtcblx0XHRcdFx0Y29uc3QgbGluayA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRcdFx0aWYgKGxpbmspIHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBocmVmLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC9iaWJcXC5iaWIoXFxkKykvKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRmb290bm90ZUlkID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwLnJlZmVyZW5jZScpKSB7XG5cdFx0XHRcdGNvbnN0IGxpbmtzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdFx0XHRBcnJheS5mcm9tKGxpbmtzKS5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGhyZWYuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goLyg/OmNpdGVfbm90ZXxjaXRlX3JlZiktKC4rKS8pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3N1cFtpZF49XCJmbnJlZjpcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yZWY6JywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3N1cFtpZF49XCJmbnJcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3NwYW4uZm9vdG5vdGUtcmVmZXJlbmNlJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb290bm90ZS1pZCcpIHx8ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzcGFuLmZvb3Rub3RlLWxpbmsnKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvb3Rub3RlLWlkJykgfHwgJyc7XG5cdFx0XHRcdGZvb3Rub3RlQ29udGVudCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb290bm90ZS1jb250ZW50JykgfHwgJyc7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2EuY2l0YXRpb24nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0Zm9vdG5vdGVDb250ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2FbaWRePVwiZm5yZWZcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yZWYnLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE90aGVyIGNpdGF0aW9uIHR5cGVzXG5cdFx0XHRcdGNvbnN0IGhyZWYgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0aWYgKGhyZWYpIHtcblx0XHRcdFx0XHRjb25zdCBpZCA9IGhyZWYucmVwbGFjZSgvXlsjXS8sICcnKTtcblx0XHRcdFx0XHRmb290bm90ZUlkID0gaWQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZm9vdG5vdGVJZCkge1xuXHRcdFx0XHQvLyBGaW5kIHRoZSBmb290bm90ZSBudW1iZXIgYnkgbWF0Y2hpbmcgdGhlIG9yaWdpbmFsIElEXG5cdFx0XHRcdGNvbnN0IGZvb3Rub3RlRW50cnkgPSBPYmplY3QuZW50cmllcyhmb290bm90ZXMpLmZpbmQoXG5cdFx0XHRcdFx0KFtfLCBkYXRhXSkgPT4gZGF0YS5vcmlnaW5hbElkID09PSBmb290bm90ZUlkLnRvTG93ZXJDYXNlKClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoZm9vdG5vdGVFbnRyeSkge1xuXHRcdFx0XHRcdGNvbnN0IFtmb290bm90ZU51bWJlciwgZm9vdG5vdGVEYXRhXSA9IGZvb3Rub3RlRW50cnk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIGZvb3Rub3RlIHJlZmVyZW5jZSBJRFxuXHRcdFx0XHRcdGNvbnN0IHJlZklkID0gZm9vdG5vdGVEYXRhLnJlZnMubGVuZ3RoID4gMCA/IFxuXHRcdFx0XHRcdFx0YGZucmVmOiR7Zm9vdG5vdGVOdW1iZXJ9LSR7Zm9vdG5vdGVEYXRhLnJlZnMubGVuZ3RoICsgMX1gIDogXG5cdFx0XHRcdFx0XHRgZm5yZWY6JHtmb290bm90ZU51bWJlcn1gO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZvb3Rub3RlRGF0YS5yZWZzLnB1c2gocmVmSWQpO1xuXG5cdFx0XHRcdFx0Ly8gRmluZCB0aGUgb3V0ZXJtb3N0IGNvbnRhaW5lciAoc3BhbiBvciBzdXApXG5cdFx0XHRcdFx0Y29uc3QgY29udGFpbmVyID0gdGhpcy5maW5kT3V0ZXJGb290bm90ZUNvbnRhaW5lcihlbCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gSWYgY29udGFpbmVyIGlzIGEgc3VwLCBncm91cCByZWZlcmVuY2VzXG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lci50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdXAnKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXN1cEdyb3Vwcy5oYXMoY29udGFpbmVyKSkge1xuXHRcdFx0XHRcdFx0XHRzdXBHcm91cHMuc2V0KGNvbnRhaW5lciwgW10pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29uc3QgZ3JvdXAgPSBzdXBHcm91cHMuZ2V0KGNvbnRhaW5lcikhO1xuXHRcdFx0XHRcdFx0Z3JvdXAucHVzaCh0aGlzLmNyZWF0ZUZvb3Rub3RlUmVmZXJlbmNlKGZvb3Rub3RlTnVtYmVyLCByZWZJZCkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBSZXBsYWNlIHRoZSBjb250YWluZXIgZGlyZWN0bHlcblx0XHRcdFx0XHRcdGNvbnRhaW5lci5yZXBsYWNlV2l0aCh0aGlzLmNyZWF0ZUZvb3Rub3RlUmVmZXJlbmNlKGZvb3Rub3RlTnVtYmVyLCByZWZJZCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gSGFuZGxlIGdyb3VwZWQgcmVmZXJlbmNlc1xuXHRcdHN1cEdyb3Vwcy5mb3JFYWNoKChyZWZlcmVuY2VzLCBjb250YWluZXIpID0+IHtcblx0XHRcdGlmIChyZWZlcmVuY2VzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Ly8gQ3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgdG8gaG9sZCBhbGwgdGhlIHJlZmVyZW5jZXNcblx0XHRcdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBBZGQgZWFjaCByZWZlcmVuY2UgYXMgaXRzIG93biBzdXAgZWxlbWVudFxuXHRcdFx0XHRyZWZlcmVuY2VzLmZvckVhY2goKHJlZiwgaW5kZXgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBsaW5rID0gcmVmLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRcdFx0XHRpZiAobGluaykge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3VwJyk7XG5cdFx0XHRcdFx0XHRzdXAuaWQgPSByZWYuaWQ7XG5cdFx0XHRcdFx0XHRzdXAuYXBwZW5kQ2hpbGQobGluay5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoc3VwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Y29udGFpbmVyLnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIENyZWF0ZSB0aGUgc3RhbmRhcmRpemVkIGZvb3Rub3RlIGxpc3Rcblx0XHRjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0bmV3TGlzdC5jbGFzc05hbWUgPSAnZm9vdG5vdGVzJztcblx0XHRjb25zdCBvcmRlcmVkTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29sJyk7XG5cblx0XHQvLyBDcmVhdGUgZm9vdG5vdGUgaXRlbXMgaW4gb3JkZXJcblx0XHRPYmplY3QuZW50cmllcyhmb290bm90ZXMpLmZvckVhY2goKFtudW1iZXIsIGRhdGFdKSA9PiB7XG5cdFx0XHRjb25zdCBuZXdJdGVtID0gdGhpcy5jcmVhdGVGb290bm90ZUl0ZW0oXG5cdFx0XHRcdHBhcnNlSW50KG51bWJlciksXG5cdFx0XHRcdGRhdGEuY29udGVudCxcblx0XHRcdFx0ZGF0YS5yZWZzXG5cdFx0XHQpO1xuXHRcdFx0b3JkZXJlZExpc3QuYXBwZW5kQ2hpbGQobmV3SXRlbSk7XG5cdFx0fSk7XG5cblx0XHQvLyBSZW1vdmUgb3JpZ2luYWwgZm9vdG5vdGUgbGlzdHNcblx0XHRjb25zdCBmb290bm90ZUxpc3RzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPT1ROT1RFX0xJU1RfU0VMRUNUT1JTKTtcblx0XHRmb290bm90ZUxpc3RzLmZvckVhY2gobGlzdCA9PiBsaXN0LnJlbW92ZSgpKTtcblxuXHRcdC8vIElmIHdlIGhhdmUgYW55IGZvb3Rub3RlcywgYWRkIHRoZSBuZXcgbGlzdCB0byB0aGUgZG9jdW1lbnRcblx0XHRpZiAob3JkZXJlZExpc3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0bmV3TGlzdC5hcHBlbmRDaGlsZChvcmRlcmVkTGlzdCk7XG5cdFx0XHRlbGVtZW50LmFwcGVuZENoaWxkKG5ld0xpc3QpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgaGFuZGxlTGF6eUltYWdlcyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblx0XHRjb25zdCBsYXp5SW1hZ2VzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWdbZGF0YS1zcmNdLCBpbWdbZGF0YS1zcmNzZXRdJyk7XG5cblx0XHRsYXp5SW1hZ2VzLmZvckVhY2goaW1nID0+IHtcblx0XHRcdGlmICghKGltZyBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpKSByZXR1cm47XG5cblx0XHRcdC8vIEhhbmRsZSBkYXRhLXNyY1xuXHRcdFx0Y29uc3QgZGF0YVNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0XHRpZiAoZGF0YVNyYyAmJiAhaW1nLnNyYykge1xuXHRcdFx0XHRpbWcuc3JjID0gZGF0YVNyYztcblx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdH1cblxuXHRcdFx0Ly8gSGFuZGxlIGRhdGEtc3Jjc2V0XG5cdFx0XHRjb25zdCBkYXRhU3Jjc2V0ID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHRcdGlmIChkYXRhU3Jjc2V0ICYmICFpbWcuc3Jjc2V0KSB7XG5cdFx0XHRcdGltZy5zcmNzZXQgPSBkYXRhU3Jjc2V0O1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgbGF6eSBsb2FkaW5nIHJlbGF0ZWQgY2xhc3NlcyBhbmQgYXR0cmlidXRlc1xuXHRcdFx0aW1nLmNsYXNzTGlzdC5yZW1vdmUoJ2xhenknLCAnbGF6eWxvYWQnKTtcblx0XHRcdGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbGwtc3RhdHVzJyk7XG5cdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUHJvY2Vzc2VkIGxhenkgaW1hZ2VzOicsIHByb2Nlc3NlZENvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhbmRhcmRpemVFbGVtZW50cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblxuXHRcdC8vIENvbnZlcnQgZWxlbWVudHMgYmFzZWQgb24gc3RhbmRhcmRpemF0aW9uIHJ1bGVzXG5cdFx0RUxFTUVOVF9TVEFOREFSRElaQVRJT05fUlVMRVMuZm9yRWFjaChydWxlID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHJ1bGUuc2VsZWN0b3IpO1xuXHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdGlmIChydWxlLnRyYW5zZm9ybSkge1xuXHRcdFx0XHRcdC8vIElmIHRoZXJlJ3MgYSB0cmFuc2Zvcm0gZnVuY3Rpb24sIHVzZSBpdCB0byBjcmVhdGUgdGhlIG5ldyBlbGVtZW50XG5cdFx0XHRcdFx0Y29uc3QgdHJhbnNmb3JtZWQgPSBydWxlLnRyYW5zZm9ybShlbCk7XG5cdFx0XHRcdFx0ZWwucmVwbGFjZVdpdGgodHJhbnNmb3JtZWQpO1xuXHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQ29udmVydCBsaXRlLXlvdXR1YmUgZWxlbWVudHNcblx0XHRjb25zdCBsaXRlWW91dHViZUVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaXRlLXlvdXR1YmUnKTtcblx0XHRsaXRlWW91dHViZUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0Y29uc3QgdmlkZW9JZCA9IGVsLmdldEF0dHJpYnV0ZSgndmlkZW9pZCcpO1xuXHRcdFx0aWYgKCF2aWRlb0lkKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXHRcdFx0aWZyYW1lLndpZHRoID0gJzU2MCc7XG5cdFx0XHRpZnJhbWUuaGVpZ2h0ID0gJzMxNSc7XG5cdFx0XHRpZnJhbWUuc3JjID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9JZH1gO1xuXHRcdFx0aWZyYW1lLnRpdGxlID0gZWwuZ2V0QXR0cmlidXRlKCd2aWRlb3RpdGxlJykgfHwgJ1lvdVR1YmUgdmlkZW8gcGxheWVyJztcblx0XHRcdGlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcblx0XHRcdGlmcmFtZS5hbGxvdyA9ICdhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgY2xpcGJvYXJkLXdyaXRlOyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlOyB3ZWItc2hhcmUnO1xuXHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xuXG5cdFx0XHRlbC5yZXBsYWNlV2l0aChpZnJhbWUpO1xuXHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHR9KTtcblxuXHRcdC8vIEFkZCBmdXR1cmUgZW1iZWQgY29udmVyc2lvbnMgKFR3aXR0ZXIsIEluc3RhZ3JhbSwgZXRjLilcblxuXHRcdHRoaXMuX2xvZygnQ29udmVydGVkIGVtYmVkZGVkIGVsZW1lbnRzOicsIHByb2Nlc3NlZENvdW50KTtcblx0fVxuXG5cdC8vIEZpbmQgc21hbGwgSU1HIGFuZCBTVkcgZWxlbWVudHNcblx0cHJpdmF0ZSBmaW5kU21hbGxJbWFnZXMoZG9jOiBEb2N1bWVudCk6IFNldDxzdHJpbmc+IHtcblx0XHRjb25zdCBNSU5fRElNRU5TSU9OID0gMzM7XG5cdFx0Y29uc3Qgc21hbGxJbWFnZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblx0XHRjb25zdCB0cmFuc2Zvcm1SZWdleCA9IC9zY2FsZVxcKChbXFxkLl0rKVxcKS87XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblxuXHRcdC8vIDEuIFJlYWQgcGhhc2UgLSBHYXRoZXIgYWxsIGVsZW1lbnRzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRjb25zdCBlbGVtZW50cyA9IFtcblx0XHRcdC4uLkFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKSksXG5cdFx0XHQuLi5BcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3ZnJykpXG5cdFx0XS5maWx0ZXIoZWxlbWVudCA9PiB7XG5cdFx0XHQvLyBTa2lwIGxhenktbG9hZGVkIGltYWdlcyB0aGF0IGhhdmVuJ3QgYmVlbiBwcm9jZXNzZWQgeWV0XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xhenknKSB8fCBcblx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGF6eWxvYWQnKSB8fFxuXHRcdFx0XHRcdGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLXNyYycpIHx8XG5cdFx0XHRcdFx0ZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRcdHJldHVybiAhaXNMYXp5O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gc21hbGxJbWFnZXM7XG5cdFx0fVxuXG5cdFx0Ly8gMi4gQmF0Y2ggcHJvY2VzcyAtIENvbGxlY3QgYWxsIG1lYXN1cmVtZW50cyBpbiBvbmUgZ29cblx0XHRjb25zdCBtZWFzdXJlbWVudHMgPSBlbGVtZW50cy5tYXAoZWxlbWVudCA9PiAoe1xuXHRcdFx0ZWxlbWVudCxcblx0XHRcdC8vIFN0YXRpYyBhdHRyaWJ1dGVzIChubyByZWZsb3cpXG5cdFx0XHRuYXR1cmFsV2lkdGg6IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ID8gZWxlbWVudC5uYXR1cmFsV2lkdGggOiAwLFxuXHRcdFx0bmF0dXJhbEhlaWdodDogZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgPyBlbGVtZW50Lm5hdHVyYWxIZWlnaHQgOiAwLFxuXHRcdFx0YXR0cldpZHRoOiBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnd2lkdGgnKSB8fCAnMCcpLFxuXHRcdFx0YXR0ckhlaWdodDogcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpIHx8ICcwJylcblx0XHR9KSk7XG5cblx0XHQvLyAzLiBCYXRjaCBjb21wdXRlIHN0eWxlcyAtIFByb2Nlc3MgaW4gY2h1bmtzIHRvIGF2b2lkIGxvbmcgdGFza3Ncblx0XHRjb25zdCBCQVRDSF9TSVpFID0gNTA7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtZWFzdXJlbWVudHMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcblx0XHRcdGNvbnN0IGJhdGNoID0gbWVhc3VyZW1lbnRzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcblx0XHRcdFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gUmVhZCBwaGFzZSAtIGNvbXB1dGUgYWxsIHN0eWxlcyBhdCBvbmNlXG5cdFx0XHRcdGNvbnN0IHN0eWxlcyA9IGJhdGNoLm1hcCgoeyBlbGVtZW50IH0pID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpKTtcblx0XHRcdFx0Y29uc3QgcmVjdHMgPSBiYXRjaC5tYXAoKHsgZWxlbWVudCB9KSA9PiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIFByb2Nlc3MgcGhhc2UgLSBubyBET00gb3BlcmF0aW9uc1xuXHRcdFx0XHRiYXRjaC5mb3JFYWNoKChtZWFzdXJlbWVudCwgaW5kZXgpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3R5bGUgPSBzdHlsZXNbaW5kZXhdO1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVjdCA9IHJlY3RzW2luZGV4XTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gR2V0IHRyYW5zZm9ybSBzY2FsZSBpbiB0aGUgc2FtZSBiYXRjaFxuXHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtO1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2NhbGUgPSB0cmFuc2Zvcm0gPyBcblx0XHRcdFx0XHRcdFx0cGFyc2VGbG9hdCh0cmFuc2Zvcm0ubWF0Y2godHJhbnNmb3JtUmVnZXgpPy5bMV0gfHwgJzEnKSA6IDE7XG5cblx0XHRcdFx0XHRcdC8vIENhbGN1bGF0ZSBlZmZlY3RpdmUgZGltZW5zaW9uc1xuXHRcdFx0XHRcdFx0Y29uc3Qgd2lkdGhzID0gW1xuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5uYXR1cmFsV2lkdGgsXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50LmF0dHJXaWR0aCxcblx0XHRcdFx0XHRcdFx0cGFyc2VJbnQoc3R5bGUud2lkdGgpIHx8IDAsXG5cdFx0XHRcdFx0XHRcdHJlY3Qud2lkdGggKiBzY2FsZVxuXHRcdFx0XHRcdFx0XS5maWx0ZXIoZGltID0+IHR5cGVvZiBkaW0gPT09ICdudW1iZXInICYmIGRpbSA+IDApO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBoZWlnaHRzID0gW1xuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5uYXR1cmFsSGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5hdHRySGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRwYXJzZUludChzdHlsZS5oZWlnaHQpIHx8IDAsXG5cdFx0XHRcdFx0XHRcdHJlY3QuaGVpZ2h0ICogc2NhbGVcblx0XHRcdFx0XHRcdF0uZmlsdGVyKGRpbSA9PiB0eXBlb2YgZGltID09PSAnbnVtYmVyJyAmJiBkaW0gPiAwKTtcblxuXHRcdFx0XHRcdFx0Ly8gRGVjaXNpb24gcGhhc2UgLSBubyBET00gb3BlcmF0aW9uc1xuXHRcdFx0XHRcdFx0aWYgKHdpZHRocy5sZW5ndGggPiAwICYmIGhlaWdodHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlZmZlY3RpdmVXaWR0aCA9IE1hdGgubWluKC4uLndpZHRocyk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVmZmVjdGl2ZUhlaWdodCA9IE1hdGgubWluKC4uLmhlaWdodHMpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChlZmZlY3RpdmVXaWR0aCA8IE1JTl9ESU1FTlNJT04gfHwgZWZmZWN0aXZlSGVpZ2h0IDwgTUlOX0RJTUVOU0lPTikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGlkZW50aWZpZXIgPSB0aGlzLmdldEVsZW1lbnRJZGVudGlmaWVyKG1lYXN1cmVtZW50LmVsZW1lbnQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzbWFsbEltYWdlcy5hZGQoaWRlbnRpZmllcik7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIGVsZW1lbnQgZGltZW5zaW9uczonLCBlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIGJhdGNoOicsIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuX2xvZygnRm91bmQgc21hbGwgZWxlbWVudHM6Jywge1xuXHRcdFx0Y291bnQ6IHByb2Nlc3NlZENvdW50LFxuXHRcdFx0dG90YWxFbGVtZW50czogZWxlbWVudHMubGVuZ3RoLFxuXHRcdFx0cHJvY2Vzc2luZ1RpbWU6IGAkeyhlbmRUaW1lIC0gc3RhcnRUaW1lKS50b0ZpeGVkKDIpfW1zYFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHNtYWxsSW1hZ2VzO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVTbWFsbEltYWdlcyhkb2M6IERvY3VtZW50LCBzbWFsbEltYWdlczogU2V0PHN0cmluZz4pIHtcblx0XHRsZXQgcmVtb3ZlZENvdW50ID0gMDtcblxuXHRcdFsnaW1nJywgJ3N2ZyddLmZvckVhY2godGFnID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG5cdFx0XHRBcnJheS5mcm9tKGVsZW1lbnRzKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRjb25zdCBpZGVudGlmaWVyID0gdGhpcy5nZXRFbGVtZW50SWRlbnRpZmllcihlbGVtZW50KTtcblx0XHRcdFx0aWYgKGlkZW50aWZpZXIgJiYgc21hbGxJbWFnZXMuaGFzKGlkZW50aWZpZXIpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmUoKTtcblx0XHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgc21hbGwgZWxlbWVudHM6JywgcmVtb3ZlZENvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0RWxlbWVudElkZW50aWZpZXIoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB8IG51bGwge1xuXHRcdC8vIFRyeSB0byBjcmVhdGUgYSB1bmlxdWUgaWRlbnRpZmllciB1c2luZyB2YXJpb3VzIGF0dHJpYnV0ZXNcblx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcblx0XHRcdC8vIEZvciBsYXp5LWxvYWRlZCBpbWFnZXMsIHVzZSBkYXRhLXNyYyBhcyBpZGVudGlmaWVyIGlmIGF2YWlsYWJsZVxuXHRcdFx0Y29uc3QgZGF0YVNyYyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aWYgKGRhdGFTcmMpIHJldHVybiBgc3JjOiR7ZGF0YVNyY31gO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBzcmMgPSBlbGVtZW50LnNyYyB8fCAnJztcblx0XHRcdGNvbnN0IHNyY3NldCA9IGVsZW1lbnQuc3Jjc2V0IHx8ICcnO1xuXHRcdFx0Y29uc3QgZGF0YVNyY3NldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc3JjKSByZXR1cm4gYHNyYzoke3NyY31gO1xuXHRcdFx0aWYgKHNyY3NldCkgcmV0dXJuIGBzcmNzZXQ6JHtzcmNzZXR9YDtcblx0XHRcdGlmIChkYXRhU3Jjc2V0KSByZXR1cm4gYHNyY3NldDoke2RhdGFTcmNzZXR9YDtcblx0XHR9XG5cblx0XHRjb25zdCBpZCA9IGVsZW1lbnQuaWQgfHwgJyc7XG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgfHwgJyc7XG5cdFx0Y29uc3Qgdmlld0JveCA9IGVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKSB8fCAnJyA6ICcnO1xuXHRcdFxuXHRcdGlmIChpZCkgcmV0dXJuIGBpZDoke2lkfWA7XG5cdFx0aWYgKHZpZXdCb3gpIHJldHVybiBgdmlld0JveDoke3ZpZXdCb3h9YDtcblx0XHRpZiAoY2xhc3NOYW1lKSByZXR1cm4gYGNsYXNzOiR7Y2xhc3NOYW1lfWA7XG5cdFx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRNYWluQ29udGVudChkb2M6IERvY3VtZW50KTogRWxlbWVudCB8IG51bGwge1xuXG5cdFx0Ly8gRmluZCBhbGwgcG90ZW50aWFsIGNvbnRlbnQgY29udGFpbmVyc1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXM6IHsgZWxlbWVudDogRWxlbWVudDsgc2NvcmU6IG51bWJlciB9W10gPSBbXTtcblxuXHRcdEVOVFJZX1BPSU5UX0VMRU1FTlRTLmZvckVhY2goKHNlbGVjdG9yLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHQvLyBCYXNlIHNjb3JlIGZyb20gc2VsZWN0b3IgcHJpb3JpdHkgKGVhcmxpZXIgPSBoaWdoZXIpXG5cdFx0XHRcdGxldCBzY29yZSA9IChFTlRSWV9QT0lOVF9FTEVNRU5UUy5sZW5ndGggLSBpbmRleCkgKiAxMDtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFkZCBzY29yZSBiYXNlZCBvbiBjb250ZW50IGFuYWx5c2lzXG5cdFx0XHRcdHNjb3JlICs9IHRoaXMuc2NvcmVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRcblx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoKHsgZWxlbWVudCwgc2NvcmUgfSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGlmIChjYW5kaWRhdGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0Ly8gRmFsbCBiYWNrIHRvIHNjb3JpbmcgYmxvY2sgZWxlbWVudHNcblx0XHRcdC8vIEN1cnJlbnRseSA8Ym9keT4gZWxlbWVudCBpcyB1c2VkIGFzIHRoZSBmYWxsYmFjaywgc28gdGhpcyBpcyBub3QgdXNlZFxuXHRcdFx0cmV0dXJuIHRoaXMuZmluZENvbnRlbnRCeVNjb3JpbmcoZG9jKTtcblx0XHR9XG5cblx0XHQvLyBTb3J0IGJ5IHNjb3JlIGRlc2NlbmRpbmdcblx0XHRjYW5kaWRhdGVzLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcblx0XHRcblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0dGhpcy5fbG9nKCdDb250ZW50IGNhbmRpZGF0ZXM6JywgY2FuZGlkYXRlcy5tYXAoYyA9PiAoe1xuXHRcdFx0XHRlbGVtZW50OiBjLmVsZW1lbnQudGFnTmFtZSxcblx0XHRcdFx0c2VsZWN0b3I6IHRoaXMuZ2V0RWxlbWVudFNlbGVjdG9yKGMuZWxlbWVudCksXG5cdFx0XHRcdHNjb3JlOiBjLnNjb3JlXG5cdFx0XHR9KSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYW5kaWRhdGVzWzBdLmVsZW1lbnQ7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRDb250ZW50QnlTY29yaW5nKGRvYzogRG9jdW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG5cdFx0Y29uc3QgY2FuZGlkYXRlcyA9IHRoaXMuc2NvcmVFbGVtZW50cyhkb2MpO1xuXHRcdHJldHVybiBjYW5kaWRhdGVzLmxlbmd0aCA+IDAgPyBjYW5kaWRhdGVzWzBdLmVsZW1lbnQgOiBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRFbGVtZW50U2VsZWN0b3IoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3QgcGFydHM6IHN0cmluZ1tdID0gW107XG5cdFx0bGV0IGN1cnJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWxlbWVudDtcblx0XHRcblx0XHR3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSB0aGlzLmRvYy5kb2N1bWVudEVsZW1lbnQpIHtcblx0XHRcdGxldCBzZWxlY3RvciA9IGN1cnJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKGN1cnJlbnQuaWQpIHtcblx0XHRcdFx0c2VsZWN0b3IgKz0gJyMnICsgY3VycmVudC5pZDtcblx0XHRcdH0gZWxzZSBpZiAoY3VycmVudC5jbGFzc05hbWUgJiYgdHlwZW9mIGN1cnJlbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRzZWxlY3RvciArPSAnLicgKyBjdXJyZW50LmNsYXNzTmFtZS50cmltKCkuc3BsaXQoL1xccysvKS5qb2luKCcuJyk7XG5cdFx0XHR9XG5cdFx0XHRwYXJ0cy51bnNoaWZ0KHNlbGVjdG9yKTtcblx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcgPiAnKTtcblx0fVxuXG5cdHByaXZhdGUgc2NvcmVFbGVtZW50cyhkb2M6IERvY3VtZW50KTogQ29udGVudFNjb3JlW10ge1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXM6IENvbnRlbnRTY29yZVtdID0gW107XG5cblx0XHRCTE9DS19FTEVNRU5UUy5mb3JFYWNoKCh0YWc6IHN0cmluZykgPT4ge1xuXHRcdFx0QXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKSkuZm9yRWFjaCgoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzY29yZSA9IHRoaXMuc2NvcmVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoc2NvcmUgPiAwKSB7XG5cdFx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoKHsgc2NvcmUsIGVsZW1lbnQgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXMuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuXHR9XG5cblx0cHJpdmF0ZSBzY29yZUVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IG51bWJlciB7XG5cdFx0bGV0IHNjb3JlID0gMDtcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGVsZW1lbnQgcHJvcGVydGllc1xuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICYmIHR5cGVvZiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgPyBcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0XHRjb25zdCBpZCA9IGVsZW1lbnQuaWQgPyBlbGVtZW50LmlkLnRvTG93ZXJDYXNlKCkgOiAnJztcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGNvbnRlbnRcblx0XHRjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRjb25zdCB3b3JkcyA9IHRleHQuc3BsaXQoL1xccysvKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gTWF0aC5taW4oTWF0aC5mbG9vcih3b3JkcyAvIDEwMCksIDMpO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gbGluayBkZW5zaXR5XG5cdFx0Y29uc3QgbGlua3MgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG5cdFx0Y29uc3QgbGlua1RleHQgPSBBcnJheS5mcm9tKGxpbmtzKS5yZWR1Y2UoKGFjYywgbGluaykgPT4gYWNjICsgKGxpbmsudGV4dENvbnRlbnQ/Lmxlbmd0aCB8fCAwKSwgMCk7XG5cdFx0Y29uc3QgbGlua0RlbnNpdHkgPSB0ZXh0Lmxlbmd0aCA/IGxpbmtUZXh0IC8gdGV4dC5sZW5ndGggOiAwO1xuXHRcdGlmIChsaW5rRGVuc2l0eSA+IDAuNSkge1xuXHRcdFx0c2NvcmUgLT0gMTA7XG5cdFx0fVxuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gcHJlc2VuY2Ugb2YgbWVhbmluZ2Z1bCBlbGVtZW50c1xuXHRcdGNvbnN0IHBhcmFncmFwaHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwJykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IHBhcmFncmFwaHM7XG5cblx0XHRjb25zdCBpbWFnZXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gTWF0aC5taW4oaW1hZ2VzICogMywgOSk7XG5cblx0XHRyZXR1cm4gc2NvcmU7XG5cdH1cbn0gIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImV4cG9ydCB7IERlZnVkZGxlIH0gZnJvbSAnLi9kZWZ1ZGRsZSc7XG5leHBvcnQgdHlwZSB7IERlZnVkZGxlT3B0aW9ucywgRGVmdWRkbGVSZXNwb25zZSwgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnOyAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
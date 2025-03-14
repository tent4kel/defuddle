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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLFdBQUMsVUFBRyxHQUFHLENBQUMsV0FBSSxDQUFDLFdBQVcsMENBQUUsTUFBTSxLQUFJLENBQUMsQ0FBQyxLQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25HLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDdkIsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNiLENBQUM7UUFFRCxpREFBaUQ7UUFDakQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM1RCxLQUFLLElBQUksVUFBVSxDQUFDO1FBRXBCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDMUQsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVqQyxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7Q0FDRDtBQTFvQ0QsNEJBMG9DQzs7Ozs7OztVQ2h1RUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQSw0REFBc0M7QUFBN0IsNkdBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZ1ZGRsZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvbWV0YWRhdGEudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvZGVmdWRkbGUudHMiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGVmdWRkbGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVmdWRkbGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVmdWRkbGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFFeHRyYWN0b3Ige1xuXHRzdGF0aWMgZXh0cmFjdChkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBEZWZ1ZGRsZU1ldGFkYXRhIHtcblx0XHRsZXQgZG9tYWluID0gJyc7XG5cdFx0bGV0IHVybCA9ICcnO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFRyeSB0byBnZXQgVVJMIGZyb20gZG9jdW1lbnQgbG9jYXRpb25cblx0XHRcdHVybCA9IGRvYy5sb2NhdGlvbj8uaHJlZiB8fCAnJztcblx0XHRcdFxuXHRcdFx0Ly8gSWYgbm8gVVJMIGZyb20gbG9jYXRpb24sIHRyeSBvdGhlciBzb3VyY2VzXG5cdFx0XHRpZiAoIXVybCkge1xuXHRcdFx0XHR1cmwgPSB0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnVybFwiKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwidHdpdHRlcjp1cmxcIikgfHxcblx0XHRcdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3VybCcpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdtYWluRW50aXR5T2ZQYWdlLnVybCcpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdtYWluRW50aXR5LnVybCcpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdXZWJTaXRlLnVybCcpIHx8XG5cdFx0XHRcdFx0ZG9jLnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwiY2Fub25pY2FsXCJdJyk/LmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodXJsKSB7XG5cdFx0XHRcdGRvbWFpbiA9IG5ldyBVUkwodXJsKS5ob3N0bmFtZS5yZXBsYWNlKC9ed3d3XFwuLywgJycpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIElmIFVSTCBwYXJzaW5nIGZhaWxzLCB0cnkgdG8gZ2V0IGZyb20gYmFzZSB0YWdcblx0XHRcdGNvbnN0IGJhc2VUYWcgPSBkb2MucXVlcnlTZWxlY3RvcignYmFzZVtocmVmXScpO1xuXHRcdFx0aWYgKGJhc2VUYWcpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR1cmwgPSBiYXNlVGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuXHRcdFx0XHRcdGRvbWFpbiA9IG5ldyBVUkwodXJsKS5ob3N0bmFtZS5yZXBsYWNlKC9ed3d3XFwuLywgJycpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdGYWlsZWQgdG8gcGFyc2UgYmFzZSBVUkw6JywgZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IHRoaXMuZ2V0VGl0bGUoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdGRlc2NyaXB0aW9uOiB0aGlzLmdldERlc2NyaXB0aW9uKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRkb21haW4sXG5cdFx0XHRmYXZpY29uOiB0aGlzLmdldEZhdmljb24oZG9jLCB1cmwpLFxuXHRcdFx0aW1hZ2U6IHRoaXMuZ2V0SW1hZ2UoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdHB1Ymxpc2hlZDogdGhpcy5nZXRQdWJsaXNoZWQoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdGF1dGhvcjogdGhpcy5nZXRBdXRob3IoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdHNpdGU6IHRoaXMuZ2V0U2l0ZShkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0c2NoZW1hT3JnRGF0YSxcblx0XHRcdHdvcmRDb3VudDogMCxcblx0XHRcdHBhcnNlVGltZTogMFxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRBdXRob3IoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdhdXRob3IubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcImF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImJ5bFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImF1dGhvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImF1dGhvckxpc3RcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJjb3B5cmlnaHRcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnY29weXJpZ2h0SG9sZGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpzaXRlX25hbWVcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAncHVibGlzaGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdzb3VyY2VPcmdhbml6YXRpb24ubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2lzUGFydE9mLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6Y3JlYXRvclwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImFwcGxpY2F0aW9uLW5hbWVcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFNpdGUoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdwdWJsaXNoZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnNpdGVfbmFtZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdXZWJTaXRlLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdzb3VyY2VPcmdhbml6YXRpb24ubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiY29weXJpZ2h0XCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2NvcHlyaWdodEhvbGRlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnaXNQYXJ0T2YubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiYXBwbGljYXRpb24tbmFtZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRBdXRob3IoZG9jLCBzY2hlbWFPcmdEYXRhKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0VGl0bGUoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRjb25zdCByYXdUaXRsZSA9IChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6dGl0bGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOnRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2hlYWRsaW5lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0aXRsZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LnRpdGxlXCIpIHx8XG5cdFx0XHRkb2MucXVlcnlTZWxlY3RvcigndGl0bGUnKT8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuY2xlYW5UaXRsZShyYXdUaXRsZSwgdGhpcy5nZXRTaXRlKGRvYywgc2NoZW1hT3JnRGF0YSkpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgY2xlYW5UaXRsZSh0aXRsZTogc3RyaW5nLCBzaXRlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRpZiAoIXRpdGxlIHx8ICFzaXRlTmFtZSkgcmV0dXJuIHRpdGxlO1xuXG5cdFx0Ly8gUmVtb3ZlIHNpdGUgbmFtZSBpZiBpdCBleGlzdHNcblx0XHRjb25zdCBzaXRlTmFtZUVzY2FwZWQgPSBzaXRlTmFtZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpO1xuXHRcdGNvbnN0IHBhdHRlcm5zID0gW1xuXHRcdFx0YFxcXFxzKltcXFxcfFxcXFwt4oCT4oCUXVxcXFxzKiR7c2l0ZU5hbWVFc2NhcGVkfVxcXFxzKiRgLCAvLyBUaXRsZSB8IFNpdGUgTmFtZVxuXHRcdFx0YF5cXFxccyoke3NpdGVOYW1lRXNjYXBlZH1cXFxccypbXFxcXHxcXFxcLeKAk+KAlF1cXFxccypgLCAvLyBTaXRlIE5hbWUgfCBUaXRsZVxuXHRcdF07XG5cdFx0XG5cdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIHBhdHRlcm5zKSB7XG5cdFx0XHRjb25zdCByZWdleCA9IG5ldyBSZWdFeHAocGF0dGVybiwgJ2knKTtcblx0XHRcdGlmIChyZWdleC50ZXN0KHRpdGxlKSkge1xuXHRcdFx0XHR0aXRsZSA9IHRpdGxlLnJlcGxhY2UocmVnZXgsICcnKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRpdGxlLnRyaW0oKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldERlc2NyaXB0aW9uKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdkZXNjcmlwdGlvbicpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjpkZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmRlc2NyaXB0aW9uXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRJbWFnZShkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOmltYWdlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjppbWFnZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdpbWFnZS51cmwnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInNhaWx0aHJ1LmltYWdlLmZ1bGxcIikgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldEZhdmljb24oZG9jOiBEb2N1bWVudCwgYmFzZVVybDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBpY29uRnJvbU1ldGEgPSB0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOmltYWdlOmZhdmljb25cIik7XG5cdFx0aWYgKGljb25Gcm9tTWV0YSkgcmV0dXJuIGljb25Gcm9tTWV0YTtcblxuXHRcdGNvbnN0IGljb25MaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0naWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChpY29uTGluaykgcmV0dXJuIGljb25MaW5rO1xuXG5cdFx0Y29uc3Qgc2hvcnRjdXRMaW5rID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0nc2hvcnRjdXQgaWNvbiddXCIpPy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmIChzaG9ydGN1dExpbmspIHJldHVybiBzaG9ydGN1dExpbms7XG5cblx0XHQvLyBPbmx5IHRyeSB0byBjb25zdHJ1Y3QgZmF2aWNvbiBVUkwgaWYgd2UgaGF2ZSBhIHZhbGlkIGJhc2UgVVJMXG5cdFx0aWYgKGJhc2VVcmwpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVVJMKFwiL2Zhdmljb24uaWNvXCIsIGJhc2VVcmwpLmhyZWY7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybignRmFpbGVkIHRvIGNvbnN0cnVjdCBmYXZpY29uIFVSTDonLCBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRQdWJsaXNoZWQoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdkYXRlUHVibGlzaGVkJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJwdWJsaXNoRGF0ZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJhcnRpY2xlOnB1Ymxpc2hlZF90aW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFRpbWVFbGVtZW50KGRvYykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5kYXRlXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRNZXRhQ29udGVudChkb2M6IERvY3VtZW50LCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHNlbGVjdG9yID0gYG1ldGFbJHthdHRyfV1gO1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcblx0XHRcdC5maW5kKGVsID0+IGVsLmdldEF0dHJpYnV0ZShhdHRyKT8udG9Mb3dlckNhc2UoKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKSk7XG5cdFx0Y29uc3QgY29udGVudCA9IGVsZW1lbnQgPyBlbGVtZW50LmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik/LnRyaW0oKSA/PyBcIlwiIDogXCJcIjtcblx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoY29udGVudCwgZG9jKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFRpbWVFbGVtZW50KGRvYzogRG9jdW1lbnQpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHNlbGVjdG9yID0gYHRpbWVgO1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlbMF07XG5cdFx0Y29uc3QgY29udGVudCA9IGVsZW1lbnQgPyAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRldGltZVwiKT8udHJpbSgpID8/IGVsZW1lbnQudGV4dENvbnRlbnQ/LnRyaW0oKSA/PyBcIlwiKSA6IFwiXCI7XG5cdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGNvbnRlbnQsIGRvYyk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBkZWNvZGVIVE1MRW50aXRpZXModGV4dDogc3RyaW5nLCBkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCB0ZXh0YXJlYSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuXHRcdHRleHRhcmVhLmlubmVySFRNTCA9IHRleHQ7XG5cdFx0cmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0U2NoZW1hUHJvcGVydHkoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55LCBwcm9wZXJ0eTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcblx0XHRpZiAoIXNjaGVtYU9yZ0RhdGEpIHJldHVybiBkZWZhdWx0VmFsdWU7XG5cblx0XHRjb25zdCBzZWFyY2hTY2hlbWEgPSAoZGF0YTogYW55LCBwcm9wczogc3RyaW5nW10sIGZ1bGxQYXRoOiBzdHJpbmcsIGlzRXhhY3RNYXRjaDogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmdbXSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wcy5sZW5ndGggPT09IDAgPyBbZGF0YV0gOiBbXTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG5cdFx0XHRcdGNvbnN0IGN1cnJlbnRQcm9wID0gcHJvcHNbMF07XG5cdFx0XHRcdGlmICgvXlxcW1xcZCtcXF0kLy50ZXN0KGN1cnJlbnRQcm9wKSkge1xuXHRcdFx0XHRcdGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoY3VycmVudFByb3Auc2xpY2UoMSwgLTEpKTtcblx0XHRcdFx0XHRpZiAoZGF0YVtpbmRleF0pIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWFyY2hTY2hlbWEoZGF0YVtpbmRleF0sIHByb3BzLnNsaWNlKDEpLCBmdWxsUGF0aCwgaXNFeGFjdE1hdGNoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAocHJvcHMubGVuZ3RoID09PSAwICYmIGRhdGEuZXZlcnkoaXRlbSA9PiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGl0ZW0gPT09ICdudW1iZXInKSkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhLm1hcChTdHJpbmcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gZGF0YS5mbGF0TWFwKGl0ZW0gPT4gc2VhcmNoU2NoZW1hKGl0ZW0sIHByb3BzLCBmdWxsUGF0aCwgaXNFeGFjdE1hdGNoKSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IFtjdXJyZW50UHJvcCwgLi4ucmVtYWluaW5nUHJvcHNdID0gcHJvcHM7XG5cdFx0XHRcblx0XHRcdGlmICghY3VycmVudFByb3ApIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykgcmV0dXJuIFtkYXRhXTtcblx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiBkYXRhLm5hbWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gW2RhdGEubmFtZV07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShjdXJyZW50UHJvcCkpIHtcblx0XHRcdFx0cmV0dXJuIHNlYXJjaFNjaGVtYShkYXRhW2N1cnJlbnRQcm9wXSwgcmVtYWluaW5nUHJvcHMsIFxuXHRcdFx0XHRcdGZ1bGxQYXRoID8gYCR7ZnVsbFBhdGh9LiR7Y3VycmVudFByb3B9YCA6IGN1cnJlbnRQcm9wLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFpc0V4YWN0TWF0Y2gpIHtcblx0XHRcdFx0Y29uc3QgbmVzdGVkUmVzdWx0czogc3RyaW5nW10gPSBbXTtcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgZGF0YVtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVzdWx0cyA9IHNlYXJjaFNjaGVtYShkYXRhW2tleV0sIHByb3BzLCBcblx0XHRcdFx0XHRcdFx0ZnVsbFBhdGggPyBgJHtmdWxsUGF0aH0uJHtrZXl9YCA6IGtleSwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0bmVzdGVkUmVzdWx0cy5wdXNoKC4uLnJlc3VsdHMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobmVzdGVkUmVzdWx0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5lc3RlZFJlc3VsdHM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0bGV0IHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoc2NoZW1hT3JnRGF0YSwgcHJvcGVydHkuc3BsaXQoJy4nKSwgJycsIHRydWUpO1xuXHRcdFx0aWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoc2NoZW1hT3JnRGF0YSwgcHJvcGVydHkuc3BsaXQoJy4nKSwgJycsIGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHJlc3VsdCA9IHJlc3VsdHMubGVuZ3RoID4gMCA/IHJlc3VsdHMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywgJykgOiBkZWZhdWx0VmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMocmVzdWx0LCBkb2MpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciBpbiBnZXRTY2hlbWFQcm9wZXJ0eSBmb3IgJHtwcm9wZXJ0eX06YCwgZXJyb3IpO1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZXh0cmFjdFNjaGVtYU9yZ0RhdGEoZG9jOiBEb2N1bWVudCk6IGFueSB7XG5cdFx0Y29uc3Qgc2NoZW1hU2NyaXB0cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKTtcblx0XHRjb25zdCBzY2hlbWFEYXRhOiBhbnlbXSA9IFtdO1xuXG5cdFx0c2NoZW1hU2NyaXB0cy5mb3JFYWNoKHNjcmlwdCA9PiB7XG5cdFx0XHRsZXQganNvbkNvbnRlbnQgPSBzY3JpcHQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGpzb25Db250ZW50ID0ganNvbkNvbnRlbnRcblx0XHRcdFx0XHQucmVwbGFjZSgvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3xeXFxzKlxcL1xcLy4qJC9nbSwgJycpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqPCFcXFtDREFUQVxcWyhbXFxzXFxTXSo/KVxcXVxcXT5cXHMqJC8sICckMScpXG5cdFx0XHRcdFx0LnJlcGxhY2UoL15cXHMqKFxcKlxcL3xcXC9cXCopXFxzKnxcXHMqKFxcKlxcL3xcXC9cXCopXFxzKiQvZywgJycpXG5cdFx0XHRcdFx0LnRyaW0oKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0Y29uc3QganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25Db250ZW50KTtcblxuXHRcdFx0XHRpZiAoanNvbkRhdGFbJ0BncmFwaCddICYmIEFycmF5LmlzQXJyYXkoanNvbkRhdGFbJ0BncmFwaCddKSkge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaCguLi5qc29uRGF0YVsnQGdyYXBoJ10pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjaGVtYURhdGEucHVzaChqc29uRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgc2NoZW1hLm9yZyBkYXRhOicsIGVycm9yKTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignUHJvYmxlbWF0aWMgSlNPTiBjb250ZW50OicsIGpzb25Db250ZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBzY2hlbWFEYXRhO1xuXHR9XG59IiwiaW1wb3J0IHsgTWV0YWRhdGFFeHRyYWN0b3IgfSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7IERlZnVkZGxlT3B0aW9ucywgRGVmdWRkbGVSZXNwb25zZSwgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBFbnRyeSBwb2ludCBlbGVtZW50c1xuLy8gVGhlc2UgYXJlIHRoZSBlbGVtZW50cyB0aGF0IHdpbGwgYmUgdXNlZCB0byBmaW5kIHRoZSBtYWluIGNvbnRlbnRcbmNvbnN0IEVOVFJZX1BPSU5UX0VMRU1FTlRTID0gW1xuXHQnYXJ0aWNsZScsXG5cdCdbcm9sZT1cImFydGljbGVcIl0nLFxuXHQnW2l0ZW1wcm9wPVwiYXJ0aWNsZUJvZHlcIl0nLFxuXHQnLnBvc3QtY29udGVudCcsXG5cdCcuYXJ0aWNsZS1jb250ZW50Jyxcblx0JyNhcnRpY2xlLWNvbnRlbnQnLFxuXHQnLmNvbnRlbnQtYXJ0aWNsZScsXG5cdCdtYWluJyxcblx0J1tyb2xlPVwibWFpblwiXScsXG5cdCdib2R5JyAvLyBlbnN1cmVzIHRoZXJlIGlzIGFsd2F5cyBhIG1hdGNoXG5dO1xuXG5jb25zdCBNT0JJTEVfV0lEVEggPSA2MDA7XG5jb25zdCBCTE9DS19FTEVNRU5UUyA9IFsnZGl2JywgJ3NlY3Rpb24nLCAnYXJ0aWNsZScsICdtYWluJ107XG5cbi8vIEhpZGRlbiBlbGVtZW50cyB0aGF0IHNob3VsZCBiZSByZW1vdmVkXG5jb25zdCBISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMgPSBbXG5cdCdbaGlkZGVuXScsXG5cdCdbYXJpYS1oaWRkZW49XCJ0cnVlXCJdJyxcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nLCBjYXVzZXMgcHJvYmxlbXMgZm9yIG1hdGggZm9ybXVsYXNcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXScsXG5cdCdbc3R5bGUqPVwidmlzaWJpbGl0eTogaGlkZGVuXCJdJyxcblx0J1tzdHlsZSo9XCJ2aXNpYmlsaXR5OmhpZGRlblwiXScsXG5cdCcuaGlkZGVuJyxcblx0Jy5pbnZpc2libGUnXG5dLmpvaW4oJywnKTtcblxuLy8gU2VsZWN0b3JzIHRvIGJlIHJlbW92ZWRcbmNvbnN0IEVYQUNUX1NFTEVDVE9SUyA9IFtcblx0Ly8gc2NyaXB0cywgc3R5bGVzXG5cdCdub3NjcmlwdCcsXG5cdCdzY3JpcHQnLFxuXHQnc3R5bGUnLFxuXG5cdC8vIGFkc1xuXHQnLmFkOm5vdChbY2xhc3MqPVwiZ3JhZGllbnRcIl0pJyxcblx0J1tjbGFzc149XCJhZC1cIiBpXScsXG5cdCdbY2xhc3MkPVwiLWFkXCIgaV0nLFxuXHQnW2lkXj1cImFkLVwiIGldJyxcblx0J1tpZCQ9XCItYWRcIiBpXScsXG5cdCdbcm9sZT1cImJhbm5lclwiIGldJyxcblx0Jy5wcm9tbycsXG5cdCcuUHJvbW8nLFxuXG5cdC8vIGNvbW1lbnRzXG5cdCdbaWQ9XCJjb21tZW50c1wiIGldJyxcblxuXHQvLyBoZWFkZXIsIG5hdlxuXHQnaGVhZGVyJyxcblx0Jy5oZWFkZXInLFxuXHQnI2hlYWRlcicsXG5cdCduYXYnLFxuXHQnLm5hdmlnYXRpb24nLFxuXHQnI25hdmlnYXRpb24nLFxuXHQnW3JvbGU9XCJuYXZpZ2F0aW9uXCIgaV0nLFxuXHQnW3JvbGU9XCJkaWFsb2dcIiBpXScsXG5cdCdbcm9sZSo9XCJjb21wbGVtZW50YXJ5XCIgaV0nLFxuXHQnW2NsYXNzKj1cInBhZ2luYXRpb25cIiBpXScsXG5cdCcubWVudScsXG5cdCcjbWVudScsXG5cblx0Ly8gbWV0YWRhdGFcblx0Jy5hdXRob3InLFxuXHQnLkF1dGhvcicsXG5cdCcuY29udHJpYnV0b3InLFxuXHQnLmRhdGUnLFxuXHQnLm1ldGEnLFxuXHQnLnRhZ3MnLFxuXHQnLnRvYycsXG5cdCcuVG9jJyxcblx0JyN0b2MnLFxuXHQnI3RpdGxlJyxcblx0JyNUaXRsZScsXG5cdCdbaHJlZio9XCIvY2F0ZWdvcnlcIl0nLFxuXHQnW2hyZWYqPVwiL2NhdGVnb3JpZXNcIl0nLFxuXHQnW2hyZWYqPVwiL3RhZy9cIl0nLFxuXHQnW2hyZWYqPVwiL3RhZ3MvXCJdJyxcblx0J1tocmVmKj1cIi90b3BpY3NcIl0nLFxuXHQnW2hyZWYqPVwiYXV0aG9yXCJdJyxcblx0J1tocmVmPVwiI3NpdGUtY29udGVudFwiXScsXG5cdCdbc3JjKj1cImF1dGhvclwiXScsXG5cblx0Ly8gZm9vdGVyXG5cdCdmb290ZXInLFxuXG5cdC8vIGlucHV0cywgZm9ybXMsIGVsZW1lbnRzXG5cdCdhc2lkZScsXG5cdCdidXR0b24nLFxuXHRcdC8vICdbcm9sZT1cImJ1dHRvblwiXScsIE1lZGl1bSBpbWFnZXNcblx0J2NhbnZhcycsXG5cdCdkaWFsb2cnLFxuXHQnZmllbGRzZXQnLFxuXHQnZm9ybScsXG5cdCdpbnB1dDpub3QoW3R5cGU9XCJjaGVja2JveFwiXSknLFxuXHQnbGFiZWwnLFxuXHQnbGluaycsXG5cdCdvcHRpb24nLFxuXHQnc2VsZWN0Jyxcblx0J3RleHRhcmVhJyxcblx0J3RpbWUnLFxuXG5cdC8vIGlmcmFtZXNcblx0J2luc3RhcmVhZC1wbGF5ZXInLFxuXHQnaWZyYW1lOm5vdChbc3JjKj1cInlvdXR1YmVcIl0pOm5vdChbc3JjKj1cInlvdXR1LmJlXCJdKTpub3QoW3NyYyo9XCJ2aW1lb1wiXSk6bm90KFtzcmMqPVwidHdpdHRlclwiXSknLFxuXG5cdC8vIGxvZ29zXG5cdCdbY2xhc3M9XCJsb2dvXCIgaV0nLFxuXHQnI2xvZ28nLFxuXHQnI0xvZ28nLFxuXG5cdC8vIG5ld3NsZXR0ZXJcblx0JyNuZXdzbGV0dGVyJyxcblx0JyNOZXdzbGV0dGVyJyxcblxuXHQvLyBoaWRkZW4gZm9yIHByaW50XG5cdCcubm9wcmludCcsXG5cdCdbZGF0YS1saW5rLW5hbWUqPVwic2tpcFwiIGldJyxcblx0J1tkYXRhLXByaW50LWxheW91dD1cImhpZGVcIiBpXScsXG5cdCdbZGF0YS1ibG9jaz1cImRvbm90cHJpbnRcIiBpXScsXG5cblx0Ly8gZm9vdG5vdGVzLCBjaXRhdGlvbnNcblx0J1tjbGFzcyo9XCJjbGlja2FibGUtaWNvblwiIGldJyxcblx0J2xpIHNwYW5bY2xhc3MqPVwibHR4X3RhZ1wiIGldW2NsYXNzKj1cImx0eF90YWdfaXRlbVwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cImFuY2hvclwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cInJlZlwiIGldJyxcblxuXHQvLyBsaW5rIGxpc3RzXG5cdCdbZGF0YS1jb250YWluZXIqPVwibW9zdC12aWV3ZWRcIiBpXScsXG5cblx0Ly8gc2lkZWJhclxuXHQnLnNpZGViYXInLFxuXHQnLlNpZGViYXInLFxuXHQnI3NpZGViYXInLFxuXHQnI1NpZGViYXInLFxuXHQnI3NpdGVzdWInLFxuXHRcblx0Ly8gb3RoZXJcblx0J3RhYmxlLmluZm9ib3gnLFxuXHQnLnBlbmNyYWZ0Om5vdCgucGMtZGlzcGxheS1jb250ZW50cyknLCAvLyBTdWJzdGFja1xuXHQnW2RhdGEtb3B0aW1pemVseT1cInJlbGF0ZWQtYXJ0aWNsZXMtc2VjdGlvblwiIGldJyAvLyBUaGUgRWNvbm9taXN0XG5dO1xuXG4vLyBSZW1vdmFsIHBhdHRlcm5zIHRlc3RlZCBhZ2FpbnN0IGF0dHJpYnV0ZXM6IGNsYXNzLCBpZCwgZGF0YS10ZXN0aWQsIGFuZCBkYXRhLXFhXG4vLyBDYXNlIGluc2Vuc2l0aXZlLCBwYXJ0aWFsIG1hdGNoZXMgYWxsb3dlZFxuY29uc3QgUEFSVElBTF9TRUxFQ1RPUlMgPSBbXG5cdCdhY2Nlc3Mtd2FsbCcsXG5cdCdhY3Rpdml0eXB1YicsXG5cdCdhcHBlbmRpeCcsXG5cdCdhdmF0YXInLFxuXHQnYWR2ZXJ0Jyxcblx0Jy1hZC0nLFxuXHQnX2FkXycsXG5cdCdhbGx0ZXJtcycsXG5cdCdhcm91bmQtdGhlLXdlYicsXG5cdCdhcnRpY2xlLWJvdHRvbS1zZWN0aW9uJyxcblx0J2FydGljbGVfX2NvcHknLFxuXHQnYXJ0aWNsZV9kYXRlJyxcblx0J2FydGljbGUtZW5kICcsXG5cdCdhcnRpY2xlX2hlYWRlcicsXG5cdCdhcnRpY2xlX19oZWFkZXInLFxuXHQnYXJ0aWNsZV9faW5mbycsXG5cdCdhcnRpY2xlLWluZm8nLFxuXHQnYXJ0aWNsZV9fbWV0YScsXG5cdCdhcnRpY2xlLXN1YmplY3QnLFxuXHQnYXJ0aWNsZV9zdWJqZWN0Jyxcblx0J2FydGljbGUtc25pcHBldCcsXG5cdCdhcnRpY2xlLXNlcGFyYXRvcicsXG5cdCdhcnRpY2xlLXRhZ3MnLFxuXHQnYXJ0aWNsZV90YWdzJyxcblx0J2FydGljbGUtdGl0bGUnLFxuXHQnYXJ0aWNsZV90aXRsZScsXG5cdCdhcnRpY2xldG9waWNzJyxcblx0J2FydGljbGUtdG9waWNzJyxcblx0J2FydGljbGUtdHlwZScsXG5cdCdhcnRpY2xlLS1sZWRlJywgLy8gVGhlIFZlcmdlXG5cdCdhc3NvY2lhdGVkLXBlb3BsZScsXG4vL1x0J2F1dGhvcicsIEd3ZXJuXG5cdCdiYWNrLXRvLXRvcCcsXG5cdCdiYWNrbGlua3Mtc2VjdGlvbicsXG5cdCdiYW5uZXInLFxuXHQnYmlvLWJsb2NrJyxcblx0J2Jsb2ctcGFnZXInLFxuXHQnYm90dG9tLW9mLWFydGljbGUnLFxuXHQnYnJhbmQtYmFyJyxcblx0J2JyZWFkY3J1bWInLFxuXHQnYnV0dG9uLXdyYXBwZXInLFxuXHQnYnRuLScsXG5cdCctYnRuJyxcblx0J2J5bGluZScsXG5cdCdjYXB0Y2hhJyxcblx0J2NhdF9oZWFkZXInLFxuXHQnY2F0bGlua3MnLFxuXHQnY2hhcHRlci1saXN0JywgLy8gVGhlIEVjb25vbWlzdFxuXHQnY29sbGVjdGlvbnMnLFxuXHQnY29tbWVudHMnLFxuLy9cdCctY29tbWVudCcsIFN5bnRheCBoaWdobGlnaHRpbmdcblx0J2NvbW1lbnQtY291bnQnLFxuXHQnY29tbWVudC1jb250ZW50Jyxcblx0J2NvbW1lbnQtZm9ybScsXG5cdCdjb21tZW50LW51bWJlcicsXG5cdCdjb21tZW50LXJlc3BvbmQnLFxuXHQnY29tbWVudC10aHJlYWQnLFxuXHQnY29tcGxlbWVudGFyeScsXG5cdCdjb25zZW50Jyxcblx0J2NvbnRlbnQtY2FyZCcsIC8vIFRoZSBWZXJnZVxuXHQnY29udGVudC10b3BpY3MnLFxuXHQnY29udGVudHByb21vJyxcblx0J2NvcmUtY29sbGF0ZXJhbCcsXG5cdCdfY3RhJyxcblx0Jy1jdGEnLFxuXHQnY3RhLScsXG5cdCdjdGFfJyxcblx0J2N1cnJlbnQtaXNzdWUnLCAvLyBUaGUgTmF0aW9uXG5cdCdjdXN0b20tbGlzdC1udW1iZXInLFxuXHQnZGF0ZWxpbmUnLFxuXHQnZGF0ZWhlYWRlcicsXG5cdCdkYXRlLWhlYWRlcicsXG5cdCdkYXRlX2hlYWRlci0nLFxuLy9cdCdkaWFsb2cnLFxuXHQnZGlzY2xhaW1lcicsXG5cdCdkaXNjbG9zdXJlJyxcblx0J2Rpc2N1c3Npb24nLFxuXHQnZGlzY3Vzc18nLFxuXHQnZGlzcXVzJyxcblx0J2RvbmF0ZScsXG5cdCdkcm9wZG93bicsIC8vIEFycyBUZWNobmljYVxuXHQnZWxldHRlcnMnLFxuXHQnZW1haWxzaWdudXAnLFxuXHQnZW5nYWdlbWVudC13aWRnZXQnLFxuXHQnZW50cnktYXV0aG9yLWluZm8nLFxuXHQnZW50cnktY2F0ZWdvcmllcycsXG5cdCdlbnRyeS1kYXRlJyxcblx0J2VudHJ5LW1ldGEnLFxuXHQnZW50cnktdGl0bGUnLFxuXHQnZW50cnktdXRpbGl0eScsXG5cdCdleWVicm93Jyxcblx0J2V4cGFuZC1yZWR1Y2UnLFxuXHQnZXh0ZXJuYWxsaW5rZW1iZWR3cmFwcGVyJywgLy8gVGhlIE5ldyBZb3JrZXJcblx0J2V4dHJhLXRpdGxlJyxcblx0J2ZhY2Vib29rJyxcblx0J2Zhdm9yaXRlJyxcblx0J2ZlZWRiYWNrJyxcblx0J2ZlZWQtbGlua3MnLFxuXHQnZmllbGQtc2l0ZS1zZWN0aW9ucycsXG5cdCdmaXhlZCcsXG5cdCdmb2xsb3cnLFxuXHQnZm9vdGVyJyxcblx0J2Zvb3Rub3RlLWJhY2snLFxuXHQnZm9vdG5vdGViYWNrJyxcblx0J2Zvci15b3UnLFxuXHQnZnJvbnRtYXR0ZXInLFxuXHQnZnVydGhlci1yZWFkaW5nJyxcblx0J2dpc3QtbWV0YScsXG4vL1x0J2dsb2JhbCcsXG5cdCdnb29nbGUnLFxuXHQnZ29vZy0nLFxuXHQnZ3JhcGgtdmlldycsXG5cdCdoZWFkZXItbG9nbycsXG5cdCdoZWFkZXItcGF0dGVybicsIC8vIFRoZSBWZXJnZVxuXHQnaGVyby1saXN0Jyxcblx0J2hpZGUtZm9yLXByaW50Jyxcblx0J2hpZGUtcHJpbnQnLFxuXHQnaGlkZGVuLXNpZGVub3RlJyxcblx0J2ludGVybHVkZScsXG5cdCdpbnRlcmFjdGlvbicsXG5cdCdqdW1wbGluaycsXG4vL1x0J2tleXdvcmQnLCAvLyB1c2VkIGluIHN5bnRheCBoaWdobGlnaHRpbmdcblx0J2tpY2tlcicsXG5cdCctbGFiZWxzJyxcblx0J2xhbmd1YWdlLW5hbWUnLFxuXHQnbGF0ZXN0LWNvbnRlbnQnLFxuXHQnLWxlZGVzLScsIC8vIFRoZSBWZXJnZVxuXHQnLWxpY2Vuc2UnLFxuXHQnbGluay1ib3gnLFxuXHQnbGlua3MtZ3JpZCcsIC8vIEJCQ1xuXHQnbGlua3MtdGl0bGUnLCAvLyBCQkNcblx0J2xpc3RpbmctZHluYW1pYy10ZXJtcycsIC8vIEJvc3RvbiBSZXZpZXdcblx0J2xpc3QtdGFncycsXG5cdCdsb2FkaW5nJyxcblx0J2xvYS1pbmZvJyxcblx0J2xvZ29fY29udGFpbmVyJyxcblx0J2x0eF9yb2xlX3JlZm51bScsIC8vIEFyeGl2XG5cdCdsdHhfdGFnX2JpYml0ZW0nLFxuXHQnbHR4X2Vycm9yJyxcblx0J21hcmtldGluZycsXG5cdCdtZWRpYS1pbnF1aXJ5Jyxcblx0J21lbnUtJyxcblx0J21ldGEtJyxcblx0J21ldGFkYXRhJyxcblx0J21pZ2h0LWxpa2UnLFxuXHQnX21vZGFsJyxcblx0Jy1tb2RhbCcsXG5cdCdtb3JlLScsXG5cdCdtb3JlbmV3cycsXG5cdCdtb3Jlc3RvcmllcycsXG5cdCdtb3ZlLWhlbHBlcicsXG5cdCdtdy1lZGl0c2VjdGlvbicsXG5cdCdtdy1jaXRlLWJhY2tsaW5rJyxcblx0J213LWluZGljYXRvcnMnLFxuXHQnbXctanVtcC1saW5rJyxcblx0J25hdi0nLFxuXHQnbmF2XycsXG5cdCduYXZiYXInLFxuLy9cdCduYXZpZ2F0aW9uJyxcblx0J25leHQtJyxcblx0J25ld3Mtc3RvcnktdGl0bGUnLFxuLy9cdCduZXdzbGV0dGVyJywgdXNlZCBvbiBTdWJzdGFja1xuXHQnbmV3c2xldHRlcl8nLFxuXHQnbmV3c2xldHRlci1zaWdudXAnLFxuXHQnbmV3c2xldHRlcnNpZ251cCcsXG5cdCduZXdzbGV0dGVyd2lkZ2V0Jyxcblx0J25ld3NsZXR0ZXJ3cmFwcGVyJyxcblx0J25vdC1mb3VuZCcsXG5cdCdub21vYmlsZScsXG5cdCdub3ByaW50Jyxcblx0J29yaWdpbmFsbHktcHVibGlzaGVkJywgLy8gTWVyY3VyeSBOZXdzXG5cdCdvdXRsaW5lLXZpZXcnLFxuXHQnb3ZlcmxheScsXG5cdCdwYWdlLXRpdGxlJyxcblx0Jy1wYXJ0bmVycycsXG5cdCdwbGVhJyxcblx0J3BvcHVsYXInLFxuLy9cdCdwb3B1cCcsIEd3ZXJuXG5cdCdwb3AtdXAnLFxuXHQncG9wb3ZlcicsXG5cdCdwb3N0LWJvdHRvbScsXG5cdCdwb3N0X19jYXRlZ29yeScsXG5cdCdwb3N0Y29tbWVudCcsXG5cdCdwb3N0ZGF0ZScsXG5cdCdwb3N0LWF1dGhvcicsXG5cdCdwb3N0LWRhdGUnLFxuXHQncG9zdF9kYXRlJyxcblx0J3Bvc3QtZmVlZHMnLFxuXHQncG9zdGluZm8nLFxuXHQncG9zdC1pbmZvJyxcblx0J3Bvc3RfaW5mbycsXG5cdCdwb3N0LWlubGluZS1kYXRlJyxcblx0J3Bvc3QtbGlua3MnLFxuXHQncG9zdC1tZXRhJyxcblx0J3Bvc3RtZXRhJyxcblx0J3Bvc3RzbmlwcGV0Jyxcblx0J3Bvc3Rfc25pcHBldCcsXG5cdCdwb3N0LXNuaXBwZXQnLFxuXHQncG9zdHRpdGxlJyxcblx0J3Bvc3QtdGl0bGUnLFxuXHQncG9zdF90aXRsZScsXG5cdCdwb3N0dGF4Jyxcblx0J3Bvc3QtdGF4Jyxcblx0J3Bvc3RfdGF4Jyxcblx0J3Bvc3R0YWcnLFxuXHQncG9zdF90YWcnLFxuXHQncG9zdC10YWcnLFxuLy9cdCdwcmV2aWV3JywgdXNlZCBvbiBPYnNpZGlhbiBQdWJsaXNoXG5cdCdwcmV2bmV4dCcsXG5cdCdwcmV2aW91c25leHQnLFxuXHQncHJpbnQtbm9uZScsXG5cdCdwcmludC1oZWFkZXInLFxuXHQncHJvZmlsZScsXG4vL1x0J3Byb21vJyxcblx0J3B1YmRhdGUnLFxuXHQncHViX2RhdGUnLFxuXHQncHViLWRhdGUnLFxuXHQncHVibGljYXRpb24tZGF0ZScsXG5cdCdwdWJsaWNhdGlvbk5hbWUnLCAvLyBNZWRpdW1cblx0J3FyLWNvZGUnLFxuXHQncXJfY29kZScsXG5cdCdfcmFpbCcsXG5cdCdyZWFkbW9yZScsXG5cdCdyZWFkLW5leHQnLFxuXHQncmVhZF9uZXh0Jyxcblx0J3JlYWRfdGltZScsXG5cdCdyZWFkLXRpbWUnLFxuXHQncmVhZGluZ190aW1lJyxcblx0J3JlYWRpbmctdGltZScsXG5cdCdyZWFkaW5nLWxpc3QnLFxuXHQncmVjZW50cG9zdCcsXG5cdCdyZWNlbnRfcG9zdCcsXG5cdCdyZWNlbnQtcG9zdCcsXG5cdCdyZWNvbW1lbmQnLFxuXHQncmVkaXJlY3RlZGZyb20nLFxuXHQncmVjaXJjJyxcblx0J3JlZ2lzdGVyJyxcblx0J3JlbGF0ZWQnLFxuXHQncmVsZXZhbnQnLFxuXHQncmV2ZXJzZWZvb3Rub3RlJyxcblx0J3NjcmVlbi1yZWFkZXItdGV4dCcsXG4vL1x0J3NoYXJlJyxcbi8vXHQnLXNoYXJlJywgc2NpdGVjaGRhaWx5LmNvbVxuXHQnc2hhcmUtYm94Jyxcblx0J3NoYXJlLWljb25zJyxcblx0J3NoYXJlbGlua3MnLFxuXHQnc2hhcmUtc2VjdGlvbicsXG5cdCdzaWRlYmFydGl0bGUnLFxuXHQnc2lkZWJhcl8nLFxuXHQnc2ltaWxhci0nLFxuXHQnc2ltaWxhcl8nLFxuXHQnc2ltaWxhcnMtJyxcblx0J3NpZGVpdGVtcycsXG5cdCdzaWRlLWJveCcsXG5cdCdzaXRlLWluZGV4Jyxcblx0J3NpdGUtaGVhZGVyJyxcblx0J3NpdGUtbG9nbycsXG5cdCdzaXRlLW5hbWUnLFxuLy9cdCdza2lwLScsXG4vL1x0J3NraXAtbGluaycsIFRlY2hDcnVuY2hcblx0J3NvY2lhbCcsXG5cdCdzcGVlY2hpZnktaWdub3JlJyxcblx0J3Nwb25zb3InLFxuLy9cdCctc3RhdHMnLFxuXHQnX3N0YXRzJyxcblx0J3N0aWNreScsXG5cdCdzdG9yeXJlYWR0aW1lJywgLy8gTWVkaXVtXG5cdCdzdG9yeXB1Ymxpc2hkYXRlJywgLy8gTWVkaXVtXG5cdCdzdWJqZWN0LWxhYmVsJyxcblx0J3N1YnNjcmliZScsXG5cdCdfdGFncycsXG5cdCd0YWdzX19pdGVtJyxcblx0J3RhZ19saXN0Jyxcblx0J3RheG9ub215Jyxcblx0J3RhYmxlLW9mLWNvbnRlbnRzJyxcblx0J3RhYnMtJyxcbi8vXHQndGVhc2VyJywgTmF0dXJlXG5cdCd0ZXJtaW5hbHRvdXQnLFxuXHQndGltZS1ydWJyaWMnLFxuXHQndGltZXN0YW1wJyxcblx0J3RpcF9vZmYnLFxuXHQndGlwdG91dCcsXG5cdCctdG91dC0nLFxuXHQnLXRvYycsXG5cdCd0b3BpYy1saXN0Jyxcblx0J3Rvb2xiYXInLFxuXHQndG9vbHRpcCcsXG5cdCd0b3Atd3JhcHBlcicsXG5cdCd0cmVlLWl0ZW0nLFxuXHQndHJlbmRpbmcnLFxuXHQndHJ1c3QtZmVhdCcsXG5cdCd0cnVzdC1iYWRnZScsXG5cdCd0d2l0dGVyJyxcblx0J3Zpc3VhbGx5LWhpZGRlbicsXG5cdCd3ZWxjb21lYm94J1xuXTtcblxuLy8gU2VsZWN0b3JzIGZvciBmb290bm90ZXMgYW5kIGNpdGF0aW9uc1xuY29uc3QgRk9PVE5PVEVfSU5MSU5FX1JFRkVSRU5DRVMgPSBbXG5cdCdzdXAucmVmZXJlbmNlJyxcblx0J2NpdGUubHR4X2NpdGUnLFxuXHQnc3VwW2lkXj1cImZuclwiXScsXG5cdCdzdXBbaWRePVwiZm5yZWY6XCJdJyxcblx0J3NwYW4uZm9vdG5vdGUtbGluaycsXG5cdCdhLmNpdGF0aW9uJyxcblx0J2FbaWRePVwicmVmLWxpbmtcIl0nLFxuXHQnYVtocmVmXj1cIiNmblwiXScsXG5cdCdhW2hyZWZePVwiI2NpdGVcIl0nLFxuXHQnYVtocmVmXj1cIiNyZWZlcmVuY2VcIl0nLFxuXHQnYVtocmVmXj1cIiNmb290bm90ZVwiXScsXG5cdCdhW2hyZWZePVwiI3JcIl0nLCAvLyBDb21tb24gaW4gYWNhZGVtaWMgcGFwZXJzXG5cdCdhW2hyZWZePVwiI2JcIl0nLCAvLyBDb21tb24gZm9yIGJpYmxpb2dyYXBoeSByZWZlcmVuY2VzXG5cdCdhW2hyZWYqPVwiY2l0ZV9ub3RlXCJdJyxcblx0J2FbaHJlZio9XCJjaXRlX3JlZlwiXScsXG5cdCdhLmZvb3Rub3RlLWFuY2hvcicsIC8vIFN1YnN0YWNrXG5cdCdzcGFuLmZvb3Rub3RlLWhvdmVyY2FyZC10YXJnZXQgYScsIC8vIFN1YnN0YWNrXG5cdCdhW3JvbGU9XCJkb2MtYmlibGlvcmVmXCJdJywgLy8gU2NpZW5jZS5vcmdcblx0J2FbaWRePVwiZm5yZWZcIl0nLFxuXHQnYVtpZF49XCJyZWYtbGlua1wiXScsIC8vIE5hdHVyZS5jb21cbl0uam9pbignLCcpO1xuXG5jb25zdCBGT09UTk9URV9MSVNUX1NFTEVDVE9SUyA9IFtcblx0J2Rpdi5mb290bm90ZSBvbCcsXG5cdCdkaXYuZm9vdG5vdGVzIG9sJyxcblx0J2Rpdltyb2xlPVwiZG9jLWVuZG5vdGVzXCJdJyxcblx0J2Rpdltyb2xlPVwiZG9jLWZvb3Rub3Rlc1wiXScsXG5cdCdvbC5mb290bm90ZXMtbGlzdCcsXG5cdCdvbC5mb290bm90ZXMnLFxuXHQnb2wucmVmZXJlbmNlcycsXG5cdCdvbFtjbGFzcyo9XCJhcnRpY2xlLXJlZmVyZW5jZXNcIl0nLFxuXHQnc2VjdGlvbi5mb290bm90ZXMgb2wnLFxuXHQnc2VjdGlvbltyb2xlPVwiZG9jLWVuZG5vdGVzXCJdJyxcblx0J3NlY3Rpb25bcm9sZT1cImRvYy1mb290bm90ZXNcIl0nLFxuXHQnc2VjdGlvbltyb2xlPVwiZG9jLWJpYmxpb2dyYXBoeVwiXScsXG5cdCd1bC5mb290bm90ZXMtbGlzdCcsXG5cdCd1bC5sdHhfYmlibGlzdCcsXG5cdCdkaXYuZm9vdG5vdGVbZGF0YS1jb21wb25lbnQtbmFtZT1cIkZvb3Rub3RlVG9ET01cIl0nIC8vIFN1YnN0YWNrXG5dLmpvaW4oJywnKTtcblxuLy8gRWxlbWVudHMgdGhhdCBhcmUgYWxsb3dlZCB0byBiZSBlbXB0eVxuLy8gVGhlc2UgYXJlIG5vdCByZW1vdmVkIGV2ZW4gaWYgdGhleSBoYXZlIG5vIGNvbnRlbnRcbmNvbnN0IEFMTE9XRURfRU1QVFlfRUxFTUVOVFMgPSBuZXcgU2V0KFtcblx0J2FyZWEnLFxuXHQnYXVkaW8nLFxuXHQnYmFzZScsXG5cdCdicicsXG5cdCdjaXJjbGUnLFxuXHQnY29sJyxcblx0J2RlZnMnLFxuXHQnZWxsaXBzZScsXG5cdCdlbWJlZCcsXG5cdCdmaWd1cmUnLFxuXHQnZycsXG5cdCdocicsXG5cdCdpZnJhbWUnLFxuXHQnaW1nJyxcblx0J2lucHV0Jyxcblx0J2xpbmUnLFxuXHQnbGluaycsXG5cdCdtYXNrJyxcblx0J21ldGEnLFxuXHQnb2JqZWN0Jyxcblx0J3BhcmFtJyxcblx0J3BhdGgnLFxuXHQncGF0dGVybicsXG5cdCdwaWN0dXJlJyxcblx0J3BvbHlnb24nLFxuXHQncG9seWxpbmUnLFxuXHQncmVjdCcsXG5cdCdzb3VyY2UnLFxuXHQnc3RvcCcsXG5cdCdzdmcnLFxuXHQndGQnLFxuXHQndGgnLFxuXHQndHJhY2snLFxuXHQndXNlJyxcblx0J3ZpZGVvJyxcblx0J3dicidcbl0pO1xuXG4vLyBBdHRyaWJ1dGVzIHRvIGtlZXBcbmNvbnN0IEFMTE9XRURfQVRUUklCVVRFUyA9IG5ldyBTZXQoW1xuXHQnYWx0Jyxcblx0J2FsbG93Jyxcblx0J2FsbG93ZnVsbHNjcmVlbicsXG5cdCdhcmlhLWxhYmVsJyxcblx0J2NsYXNzJyxcblx0J2NoZWNrZWQnLFxuXHQnY29sc3BhbicsXG5cdCdjb250cm9scycsXG5cdCdkYXRhLXNyYycsXG5cdCdkYXRhLXNyY3NldCcsXG5cdCdkYXRhLWxhbmcnLFxuXHQnZGlyJyxcblx0J2ZyYW1lYm9yZGVyJyxcblx0J2hlYWRlcnMnLFxuXHQnaGVpZ2h0Jyxcblx0J2hyZWYnLFxuXHQnaWQnLFxuXHQnbGFuZycsXG5cdCdyb2xlJyxcblx0J3Jvd3NwYW4nLFxuXHQnc3JjJyxcblx0J3NyY3NldCcsXG5cdCd0aXRsZScsXG5cdCd0eXBlJyxcblx0J3dpZHRoJ1xuXSk7XG5cbi8vIFN1cHBvcnRlZCBsYW5ndWFnZXMgZm9yIGNvZGUgYmxvY2tzXG5jb25zdCBTVVBQT1JURURfTEFOR1VBR0VTID0gbmV3IFNldChbXG5cdC8vIE1hcmt1cCAmIFdlYlxuXHQnbWFya3VwJywgJ2h0bWwnLCAneG1sJywgJ3N2ZycsICdtYXRobWwnLCAnc3NtbCcsICdhdG9tJywgJ3JzcycsXG5cdCdqYXZhc2NyaXB0JywgJ2pzJywgJ2pzeCcsICd0eXBlc2NyaXB0JywgJ3RzJywgJ3RzeCcsXG5cdCd3ZWJhc3NlbWJseScsICd3YXNtJyxcblx0XG5cdC8vIENvbW1vbiBQcm9ncmFtbWluZyBMYW5ndWFnZXNcblx0J3B5dGhvbicsXG5cdCdqYXZhJyxcblx0J2NzaGFycCcsICdjcycsICdkb3RuZXQnLCAnYXNwbmV0Jyxcblx0J2NwcCcsICdjKysnLCAnYycsICdvYmpjJyxcblx0J3J1YnknLCAncmInLFxuXHQncGhwJyxcblx0J2dvbGFuZycsXG5cdCdydXN0Jyxcblx0J3N3aWZ0Jyxcblx0J2tvdGxpbicsXG5cdCdzY2FsYScsXG5cdCdkYXJ0Jyxcblx0XG5cdC8vIFNoZWxsICYgU2NyaXB0aW5nXG5cdCdiYXNoJywgJ3NoZWxsJywgJ3NoJyxcblx0J3Bvd2Vyc2hlbGwnLFxuXHQnYmF0Y2gnLFxuXHRcblx0Ly8gRGF0YSAmIENvbmZpZ1xuXHQnanNvbicsICdqc29ucCcsXG5cdCd5YW1sJywgJ3ltbCcsXG5cdCd0b21sJyxcblx0J2RvY2tlcmZpbGUnLFxuXHQnZ2l0aWdub3JlJyxcblx0XG5cdC8vIFF1ZXJ5IExhbmd1YWdlc1xuXHQnc3FsJywgJ215c3FsJywgJ3Bvc3RncmVzcWwnLFxuXHQnZ3JhcGhxbCcsXG5cdCdtb25nb2RiJyxcblx0J3NwYXJxbCcsXG5cdFxuXHQvLyBNYXJrdXAgJiBEb2N1bWVudGF0aW9uXG5cdCdtYXJrZG93bicsICdtZCcsXG5cdCdsYXRleCcsICd0ZXgnLFxuXHQnYXNjaWlkb2MnLCAnYWRvYycsXG5cdCdqc2RvYycsXG5cdFxuXHQvLyBGdW5jdGlvbmFsIExhbmd1YWdlc1xuXHQnaGFza2VsbCcsICdocycsXG5cdCdlbG0nLFxuXHQnZWxpeGlyJyxcblx0J2VybGFuZycsXG5cdCdvY2FtbCcsXG5cdCdmc2hhcnAnLFxuXHQnc2NoZW1lJyxcblx0J2xpc3AnLCAnZWxpc3AnLFxuXHQnY2xvanVyZScsXG5cdFxuXHQvLyBPdGhlciBMYW5ndWFnZXNcblx0J21hdGxhYicsXG5cdCdmb3J0cmFuJyxcblx0J2NvYm9sJyxcblx0J3Bhc2NhbCcsXG5cdCdwZXJsJyxcblx0J2x1YScsXG5cdCdqdWxpYScsXG5cdCdncm9vdnknLFxuXHQnY3J5c3RhbCcsXG5cdCduaW0nLFxuXHQnemlnJyxcblx0XG5cdC8vIERvbWFpbiBTcGVjaWZpY1xuXHQncmVnZXgnLFxuXHQnZ3JhZGxlJyxcblx0J2NtYWtlJyxcblx0J21ha2VmaWxlJyxcblx0J25peCcsXG5cdCd0ZXJyYWZvcm0nLFxuXHQnc29saWRpdHknLFxuXHQnZ2xzbCcsXG5cdCdobHNsJyxcblx0XG5cdC8vIEFzc2VtYmx5XG5cdCduYXNtJyxcblx0J21hc20nLFxuXHQnYXJtYXNtJyxcblx0XG5cdC8vIEdhbWUgRGV2ZWxvcG1lbnRcblx0J2dkc2NyaXB0Jyxcblx0J3VucmVhbHNjcmlwdCcsXG5cdFxuXHQvLyBPdGhlcnNcblx0J2FiYXAnLFxuXHQnYWN0aW9uc2NyaXB0Jyxcblx0J2FkYScsXG5cdCdhZ2RhJyxcblx0J2FudGxyNCcsXG5cdCdhcHBsZXNjcmlwdCcsXG5cdCdhcmR1aW5vJyxcblx0J2NvZmZlZXNjcmlwdCcsXG5cdCdkamFuZ28nLFxuXHQnZXJsYW5nJyxcblx0J2ZvcnRyYW4nLFxuXHQnaGF4ZScsXG5cdCdpZHJpcycsXG5cdCdrb3RsaW4nLFxuXHQnbGl2ZXNjcmlwdCcsXG5cdCdtYXRsYWInLFxuXHQnbmdpbngnLFxuXHQncGFzY2FsJyxcblx0J3Byb2xvZycsXG5cdCdwdXBwZXQnLFxuXHQnc2NhbGEnLFxuXHQnc2NoZW1lJyxcblx0J3RjbCcsXG5cdCd2ZXJpbG9nJyxcblx0J3ZoZGwnXG5dKTtcblxuXG4vLyBFbGVtZW50IHN0YW5kYXJkaXphdGlvbiBydWxlc1xuLy8gTWFwcyBzZWxlY3RvcnMgdG8gdGhlaXIgdGFyZ2V0IEhUTUwgZWxlbWVudCBuYW1lXG5pbnRlcmZhY2UgU3RhbmRhcmRpemF0aW9uUnVsZSB7XG5cdHNlbGVjdG9yOiBzdHJpbmc7XG5cdGVsZW1lbnQ6IHN0cmluZztcblx0dHJhbnNmb3JtPzogKGVsOiBFbGVtZW50KSA9PiBFbGVtZW50O1xufVxuXG5jb25zdCBFTEVNRU5UX1NUQU5EQVJESVpBVElPTl9SVUxFUzogU3RhbmRhcmRpemF0aW9uUnVsZVtdID0gW1xuXHQvLyBDb2RlIGJsb2Nrc1xuXHR7XG5cdFx0c2VsZWN0b3I6ICdwcmUnLFxuXHRcdGVsZW1lbnQ6ICdwcmUnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuIGVsO1xuXG5cdFx0XHQvLyBGdW5jdGlvbiB0byBnZXQgbGFuZ3VhZ2UgZnJvbSBjbGFzc1xuXHRcdFx0Y29uc3QgZ2V0TGFuZ3VhZ2VGcm9tQ2xhc3MgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcgPT4ge1xuXHRcdFx0XHQvLyBDaGVjayBkYXRhLWxhbmcgYXR0cmlidXRlIGZpcnN0XG5cdFx0XHRcdGNvbnN0IGRhdGFMYW5nID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZycpO1xuXHRcdFx0XHRpZiAoZGF0YUxhbmcpIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YUxhbmcudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIERlZmluZSBsYW5ndWFnZSBwYXR0ZXJuc1xuXHRcdFx0XHRjb25zdCBsYW5ndWFnZVBhdHRlcm5zID0gW1xuXHRcdFx0XHRcdC9ebGFuZ3VhZ2UtKFxcdyspJC8sICAgICAgICAgIC8vIGxhbmd1YWdlLWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXmxhbmctKFxcdyspJC8sICAgICAgICAgICAgICAvLyBsYW5nLWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXihcXHcrKS1jb2RlJC8sICAgICAgICAgICAgICAvLyBqYXZhc2NyaXB0LWNvZGVcblx0XHRcdFx0XHQvXmNvZGUtKFxcdyspJC8sICAgICAgICAgICAgICAvLyBjb2RlLWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXnN5bnRheC0oXFx3KykkLywgICAgICAgICAgICAvLyBzeW50YXgtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9eY29kZS1zbmlwcGV0X18oXFx3KykkLywgICAgIC8vIGNvZGUtc25pcHBldF9famF2YXNjcmlwdFxuXHRcdFx0XHRcdC9eaGlnaGxpZ2h0LShcXHcrKSQvLCAgICAgICAgIC8vIGhpZ2hsaWdodC1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L14oXFx3Kyktc25pcHBldCQvICAgICAgICAgICAgLy8gamF2YXNjcmlwdC1zbmlwcGV0XG5cdFx0XHRcdF07XG5cblx0XHRcdFx0Ly8gVGhlbiBjaGVjayB0aGUgY2xhc3MgYXR0cmlidXRlIGZvciBwYXR0ZXJuc1xuXHRcdFx0XHRpZiAoZWxlbWVudC5jbGFzc05hbWUgJiYgdHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgcGF0dGVybiBvZiBsYW5ndWFnZVBhdHRlcm5zKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkubWF0Y2gocGF0dGVybik7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIFRoZW4gY2hlY2sgZm9yIHN1cHBvcnRlZCBsYW5ndWFnZVxuXHRcdFx0XHRcdGlmIChTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhlbGVtZW50LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgY2xhc3NOYW1lcyA9IEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpO1xuXHRcdFx0XHRcblx0XHRcdFx0Zm9yIChjb25zdCBjbGFzc05hbWUgb2YgY2xhc3NOYW1lcykge1xuXHRcdFx0XHRcdC8vIENoZWNrIHBhdHRlcm5zIGZpcnN0XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIGxhbmd1YWdlUGF0dGVybnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gY2xhc3NOYW1lLm1hdGNoKHBhdHRlcm4pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE9ubHkgY2hlY2sgYmFyZSBsYW5ndWFnZSBuYW1lcyBpZiBubyBwYXR0ZXJucyB3ZXJlIGZvdW5kXG5cdFx0XHRcdGZvciAoY29uc3QgY2xhc3NOYW1lIG9mIGNsYXNzTmFtZXMpIHtcblx0XHRcdFx0XHRpZiAoU1VQUE9SVEVEX0xBTkdVQUdFUy5oYXMoY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gVHJ5IHRvIGdldCB0aGUgbGFuZ3VhZ2UgZnJvbSB0aGUgZWxlbWVudCBhbmQgaXRzIGFuY2VzdG9yc1xuXHRcdFx0bGV0IGxhbmd1YWdlID0gJyc7XG5cdFx0XHRsZXQgY3VycmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGVsO1xuXHRcdFx0XG5cdFx0XHR3aGlsZSAoY3VycmVudEVsZW1lbnQgJiYgIWxhbmd1YWdlKSB7XG5cdFx0XHRcdGxhbmd1YWdlID0gZ2V0TGFuZ3VhZ2VGcm9tQ2xhc3MoY3VycmVudEVsZW1lbnQpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQWxzbyBjaGVjayBmb3IgY29kZSBlbGVtZW50cyB3aXRoaW4gdGhlIGN1cnJlbnQgZWxlbWVudFxuXHRcdFx0XHRpZiAoIWxhbmd1YWdlICYmIGN1cnJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKSkge1xuXHRcdFx0XHRcdGxhbmd1YWdlID0gZ2V0TGFuZ3VhZ2VGcm9tQ2xhc3MoY3VycmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignY29kZScpISk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRnVuY3Rpb24gdG8gcmVjdXJzaXZlbHkgZXh0cmFjdCB0ZXh0IGNvbnRlbnQgd2hpbGUgcHJlc2VydmluZyBzdHJ1Y3R1cmVcblx0XHRcdGNvbnN0IGV4dHJhY3RTdHJ1Y3R1cmVkVGV4dCA9IChlbGVtZW50OiBOb2RlKTogc3RyaW5nID0+IHtcblx0XHRcdFx0aWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGxldCB0ZXh0ID0gJyc7XG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcblx0XHRcdFx0XHQvLyBIYW5kbGUgbGluZSBicmVha3Ncblx0XHRcdFx0XHRpZiAoZWxlbWVudC50YWdOYW1lID09PSAnQlInKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ1xcbic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIEhhbmRsZSBjb2RlIGVsZW1lbnRzIGFuZCB0aGVpciBjaGlsZHJlblxuXHRcdFx0XHRcdGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKGNoaWxkID0+IHtcblx0XHRcdFx0XHRcdHRleHQgKz0gZXh0cmFjdFN0cnVjdHVyZWRUZXh0KGNoaWxkKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBBZGQgbmV3bGluZSBhZnRlciBlYWNoIGNvZGUgZWxlbWVudFxuXHRcdFx0XHRcdGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdDT0RFJykge1xuXHRcdFx0XHRcdFx0dGV4dCArPSAnXFxuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBFeHRyYWN0IGFsbCB0ZXh0IGNvbnRlbnRcblx0XHRcdGxldCBjb2RlQ29udGVudCA9IGV4dHJhY3RTdHJ1Y3R1cmVkVGV4dChlbCk7XG5cblx0XHRcdC8vIENsZWFuIHVwIHRoZSBjb250ZW50XG5cdFx0XHRjb2RlQ29udGVudCA9IGNvZGVDb250ZW50XG5cdFx0XHRcdC8vIFJlbW92ZSBhbnkgZXh0cmEgbmV3bGluZXMgYXQgdGhlIHN0YXJ0XG5cdFx0XHRcdC5yZXBsYWNlKC9eXFxuKy8sICcnKVxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IGV4dHJhIG5ld2xpbmVzIGF0IHRoZSBlbmRcblx0XHRcdFx0LnJlcGxhY2UoL1xcbiskLywgJycpXG5cdFx0XHRcdC8vIFJlcGxhY2UgbXVsdGlwbGUgY29uc2VjdXRpdmUgbmV3bGluZXMgd2l0aCBhIHNpbmdsZSBuZXdsaW5lXG5cdFx0XHRcdC5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIG5ldyBwcmUgZWxlbWVudFxuXHRcdFx0Y29uc3QgbmV3UHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG5cdFx0XHRcblx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRuZXdQcmUuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBDcmVhdGUgY29kZSBlbGVtZW50XG5cdFx0XHRjb25zdCBjb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29kZScpO1xuXHRcdFx0aWYgKGxhbmd1YWdlKSB7XG5cdFx0XHRcdGNvZGUuc2V0QXR0cmlidXRlKCdkYXRhLWxhbmcnLCBsYW5ndWFnZSk7XG5cdFx0XHRcdGNvZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIGBsYW5ndWFnZS0ke2xhbmd1YWdlfWApO1xuXHRcdFx0fVxuXHRcdFx0Y29kZS50ZXh0Q29udGVudCA9IGNvZGVDb250ZW50O1xuXHRcdFx0XG5cdFx0XHRuZXdQcmUuYXBwZW5kQ2hpbGQoY29kZSk7XG5cdFx0XHRyZXR1cm4gbmV3UHJlO1xuXHRcdH1cblx0fSxcblx0Ly8gU2ltcGxpZnkgaGVhZGluZ3MgYnkgcmVtb3ZpbmcgaW50ZXJuYWwgbmF2aWdhdGlvbiBlbGVtZW50c1xuXHR7XG5cdFx0c2VsZWN0b3I6ICdoMSwgaDIsIGgzLCBoNCwgaDUsIGg2Jyxcblx0XHRlbGVtZW50OiAna2VlcCcsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdC8vIElmIGhlYWRpbmcgb25seSBjb250YWlucyBhIHNpbmdsZSBhbmNob3Igd2l0aCBpbnRlcm5hbCBsaW5rXG5cdFx0XHRpZiAoZWwuY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIFxuXHRcdFx0XHRlbC5maXJzdEVsZW1lbnRDaGlsZD8udGFnTmFtZSA9PT0gJ0EnICYmXG5cdFx0XHRcdChlbC5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKT8uaW5jbHVkZXMoJyMnKSB8fCBcblx0XHRcdFx0IGVsLmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpPy5zdGFydHNXaXRoKCcjJykpKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDcmVhdGUgbmV3IGhlYWRpbmcgb2Ygc2FtZSBsZXZlbFxuXHRcdFx0XHRjb25zdCBuZXdIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbC50YWdOYW1lKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzIGZyb20gb3JpZ2luYWwgaGVhZGluZ1xuXHRcdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdFx0bmV3SGVhZGluZy5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gSnVzdCB1c2UgdGhlIHRleHQgY29udGVudFxuXHRcdFx0XHRuZXdIZWFkaW5nLnRleHRDb250ZW50ID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBuZXdIZWFkaW5nO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBJZiBoZWFkaW5nIGNvbnRhaW5zIG5hdmlnYXRpb24gYnV0dG9ucyBvciBvdGhlciB1dGlsaXR5IGVsZW1lbnRzXG5cdFx0XHRjb25zdCBidXR0b25zID0gZWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5cdFx0XHRpZiAoYnV0dG9ucy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IG5ld0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsLnRhZ05hbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdFx0QXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRcdG5ld0hlYWRpbmcuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEp1c3QgdXNlIHRoZSB0ZXh0IGNvbnRlbnRcblx0XHRcdFx0bmV3SGVhZGluZy50ZXh0Q29udGVudCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gbmV3SGVhZGluZztcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH1cblx0fSxcblx0Ly8gQ29udmVydCBkaXZzIHdpdGggcGFyYWdyYXBoIHJvbGUgdG8gYWN0dWFsIHBhcmFncmFwaHNcblx0eyBcblx0XHRzZWxlY3RvcjogJ2RpdltkYXRhLXRlc3RpZF49XCJwYXJhZ3JhcGhcIl0sIGRpdltyb2xlPVwicGFyYWdyYXBoXCJdJywgXG5cdFx0ZWxlbWVudDogJ3AnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XG5cdFx0XHQvLyBDb3B5IGlubmVySFRNTFxuXHRcdFx0cC5pbm5lckhUTUwgPSBlbC5pbm5lckhUTUw7XG5cdFx0XHRcblx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRwLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIHA7XG5cdFx0fVxuXHR9LFxuXHQvLyBDb252ZXJ0IGRpdnMgd2l0aCBsaXN0IHJvbGVzIHRvIGFjdHVhbCBsaXN0c1xuXHR7IFxuXHRcdHNlbGVjdG9yOiAnZGl2W3JvbGU9XCJsaXN0XCJdJywgXG5cdFx0ZWxlbWVudDogJ3VsJyxcblx0XHQvLyBDdXN0b20gaGFuZGxlciBmb3IgbGlzdCB0eXBlIGRldGVjdGlvbiBhbmQgdHJhbnNmb3JtYXRpb25cblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Ly8gRmlyc3QgZGV0ZXJtaW5lIGlmIHRoaXMgaXMgYW4gb3JkZXJlZCBsaXN0XG5cdFx0XHRjb25zdCBmaXJzdEl0ZW0gPSBlbC5xdWVyeVNlbGVjdG9yKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdIC5sYWJlbCcpO1xuXHRcdFx0Y29uc3QgbGFiZWwgPSBmaXJzdEl0ZW0/LnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRjb25zdCBpc09yZGVyZWQgPSBsYWJlbC5tYXRjaCgvXlxcZCtcXCkvKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBhcHByb3ByaWF0ZSBsaXN0IHR5cGVcblx0XHRcdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGlzT3JkZXJlZCA/ICdvbCcgOiAndWwnKTtcblx0XHRcdFxuXHRcdFx0Ly8gUHJvY2VzcyBlYWNoIGxpc3QgaXRlbVxuXHRcdFx0Y29uc3QgaXRlbXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0XHRjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0XHRcdGNvbnN0IGNvbnRlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAoY29udGVudCkge1xuXHRcdFx0XHRcdC8vIENvbnZlcnQgYW55IHBhcmFncmFwaCBkaXZzIGluc2lkZSBjb250ZW50XG5cdFx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoRGl2cyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nKTtcblx0XHRcdFx0XHRwYXJhZ3JhcGhEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdFx0XHRwLmlubmVySFRNTCA9IGRpdi5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ29udmVydCBhbnkgbmVzdGVkIGxpc3RzIHJlY3Vyc2l2ZWx5XG5cdFx0XHRcdFx0Y29uc3QgbmVzdGVkTGlzdHMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwibGlzdFwiXScpO1xuXHRcdFx0XHRcdG5lc3RlZExpc3RzLmZvckVhY2gobmVzdGVkTGlzdCA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBmaXJzdE5lc3RlZEl0ZW0gPSBuZXN0ZWRMaXN0LnF1ZXJ5U2VsZWN0b3IoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0gLmxhYmVsJyk7XG5cdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRMYWJlbCA9IGZpcnN0TmVzdGVkSXRlbT8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0XHRcdGNvbnN0IGlzTmVzdGVkT3JkZXJlZCA9IG5lc3RlZExhYmVsLm1hdGNoKC9eXFxkK1xcKS8pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRjb25zdCBuZXdOZXN0ZWRMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpc05lc3RlZE9yZGVyZWQgPyAnb2wnIDogJ3VsJyk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIFByb2Nlc3MgbmVzdGVkIGl0ZW1zXG5cdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRJdGVtcyA9IG5lc3RlZExpc3QucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJsaXN0aXRlbVwiXScpO1xuXHRcdFx0XHRcdFx0bmVzdGVkSXRlbXMuZm9yRWFjaChuZXN0ZWRJdGVtID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkTGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRDb250ZW50ID0gbmVzdGVkSXRlbS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYgKG5lc3RlZENvbnRlbnQpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBDb252ZXJ0IHBhcmFncmFwaCBkaXZzIGluIG5lc3RlZCBpdGVtc1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZFBhcmFncmFwaHMgPSBuZXN0ZWRDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwicGFyYWdyYXBoXCJdJyk7XG5cdFx0XHRcdFx0XHRcdFx0bmVzdGVkUGFyYWdyYXBocy5mb3JFYWNoKGRpdiA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cC5pbm5lckhUTUwgPSBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKHApO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdG5lc3RlZExpLmlubmVySFRNTCA9IG5lc3RlZENvbnRlbnQuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRuZXdOZXN0ZWRMaXN0LmFwcGVuZENoaWxkKG5lc3RlZExpKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRuZXN0ZWRMaXN0LnJlcGxhY2VXaXRoKG5ld05lc3RlZExpc3QpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxpLmlubmVySFRNTCA9IGNvbnRlbnQuaW5uZXJIVE1MO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRsaXN0LmFwcGVuZENoaWxkKGxpKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gbGlzdDtcblx0XHR9XG5cdH0sXG5cdHsgXG5cdFx0c2VsZWN0b3I6ICdkaXZbcm9sZT1cImxpc3RpdGVtXCJdJywgXG5cdFx0ZWxlbWVudDogJ2xpJyxcblx0XHQvLyBDdXN0b20gaGFuZGxlciBmb3IgbGlzdCBpdGVtIGNvbnRlbnRcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Y29uc3QgY29udGVudCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdFx0XHRpZiAoIWNvbnRlbnQpIHJldHVybiBlbDtcblx0XHRcdFxuXHRcdFx0Ly8gQ29udmVydCBhbnkgcGFyYWdyYXBoIGRpdnMgaW5zaWRlIGNvbnRlbnRcblx0XHRcdGNvbnN0IHBhcmFncmFwaERpdnMgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwicGFyYWdyYXBoXCJdJyk7XG5cdFx0XHRwYXJhZ3JhcGhEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0cC5pbm5lckhUTUwgPSBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0fVxuXHR9LFxuXHQvLyBDb2RlIGJsb2NrcyB3aXRoIHN5bnRheCBoaWdobGlnaHRpbmdcblx0e1xuXHRcdHNlbGVjdG9yOiAnLndwLWJsb2NrLXN5bnRheGhpZ2hsaWdodGVyLWNvZGUsIC5zeW50YXhoaWdobGlnaHRlciwgLmhpZ2hsaWdodCwgLmhpZ2hsaWdodC1zb3VyY2UsIC53cC1ibG9jay1jb2RlLCBwcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdLCBwcmVbY2xhc3MqPVwiYnJ1c2g6XCJdJyxcblx0XHRlbGVtZW50OiAncHJlJyxcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybiBlbDtcblxuXHRcdFx0Ly8gQ3JlYXRlIG5ldyBwcmUgZWxlbWVudFxuXHRcdFx0Y29uc3QgbmV3UHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG5cdFx0XHRcblx0XHRcdC8vIFRyeSB0byBkZXRlY3QgbGFuZ3VhZ2Vcblx0XHRcdGxldCBsYW5ndWFnZSA9ICcnO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBmb3IgV29yZFByZXNzIHN5bnRheCBoaWdobGlnaHRlciBzcGVjaWZpYyBmb3JtYXRcblx0XHRcdGNvbnN0IHN5bnRheEVsID0gZWwucXVlcnlTZWxlY3RvcignLnN5bnRheGhpZ2hsaWdodGVyJyk7XG5cdFx0XHRpZiAoc3ludGF4RWwpIHtcblx0XHRcdFx0Ly8gR2V0IGxhbmd1YWdlIGZyb20gc3ludGF4aGlnaGxpZ2h0ZXIgY2xhc3Ncblx0XHRcdFx0Y29uc3QgY2xhc3NlcyA9IEFycmF5LmZyb20oc3ludGF4RWwuY2xhc3NMaXN0KTtcblx0XHRcdFx0Y29uc3QgbGFuZ0NsYXNzID0gY2xhc3Nlcy5maW5kKGMgPT4gIVsnc3ludGF4aGlnaGxpZ2h0ZXInLCAnbm9ndXR0ZXInXS5pbmNsdWRlcyhjKSk7XG5cdFx0XHRcdGlmIChsYW5nQ2xhc3MgJiYgU1VQUE9SVEVEX0xBTkdVQUdFUy5oYXMobGFuZ0NsYXNzLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0bGFuZ3VhZ2UgPSBsYW5nQ2xhc3MudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBubyBsYW5ndWFnZSBmb3VuZCB5ZXQsIGNoZWNrIG90aGVyIGNvbW1vbiBwYXR0ZXJuc1xuXHRcdFx0aWYgKCFsYW5ndWFnZSkge1xuXHRcdFx0XHRjb25zdCBjbGFzc05hbWVzID0gQXJyYXkuZnJvbShlbC5jbGFzc0xpc3QpO1xuXHRcdFx0XHRjb25zdCBsYW5ndWFnZVBhdHRlcm5zID0gW1xuXHRcdFx0XHRcdC8oPzpefFxccykoPzpsYW5ndWFnZXxsYW5nfGJydXNofHN5bnRheCktKFxcdyspKD86XFxzfCQpL2ksXG5cdFx0XHRcdFx0Lyg/Ol58XFxzKShcXHcrKSg/Olxcc3wkKS9pXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0Zm9yIChjb25zdCBjbGFzc05hbWUgb2YgY2xhc3NOYW1lcykge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgcGF0dGVybiBvZiBsYW5ndWFnZVBhdHRlcm5zKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGNsYXNzTmFtZS5tYXRjaChwYXR0ZXJuKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCAmJiBtYXRjaFsxXSAmJiBTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhtYXRjaFsxXS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRcdFx0XHRsYW5ndWFnZSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAobGFuZ3VhZ2UpIGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEV4dHJhY3QgY29kZSBjb250ZW50LCBoYW5kbGluZyB2YXJpb3VzIGZvcm1hdHNcblx0XHRcdGxldCBjb2RlQ29udGVudCA9ICcnO1xuXG5cdFx0XHQvLyBIYW5kbGUgV29yZFByZXNzIHN5bnRheCBoaWdobGlnaHRlciB0YWJsZSBmb3JtYXRcblx0XHRcdGNvbnN0IGNvZGVDb250YWluZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc3ludGF4aGlnaGxpZ2h0ZXIgdGFibGUgLmNvZGUgLmNvbnRhaW5lcicpO1xuXHRcdFx0aWYgKGNvZGVDb250YWluZXIpIHtcblx0XHRcdFx0Ly8gUHJvY2VzcyBlYWNoIGxpbmVcblx0XHRcdFx0Y29uc3QgbGluZXMgPSBBcnJheS5mcm9tKGNvZGVDb250YWluZXIuY2hpbGRyZW4pO1xuXHRcdFx0XHRjb2RlQ29udGVudCA9IGxpbmVzXG5cdFx0XHRcdFx0Lm1hcChsaW5lID0+IHtcblx0XHRcdFx0XHRcdC8vIEdldCBhbGwgY29kZSBlbGVtZW50cyBpbiB0aGlzIGxpbmVcblx0XHRcdFx0XHRcdGNvbnN0IGNvZGVQYXJ0cyA9IEFycmF5LmZyb20obGluZS5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlJykpXG5cdFx0XHRcdFx0XHRcdC5tYXAoY29kZSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSB0ZXh0IGNvbnRlbnQsIHByZXNlcnZpbmcgc3BhY2VzXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHRleHQgPSBjb2RlLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdFx0XHRcdC8vIElmIHRoaXMgaXMgYSAnc3BhY2VzJyBjbGFzcyBlbGVtZW50LCBjb252ZXJ0IHRvIGFjdHVhbCBzcGFjZXNcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NwYWNlcycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0ZXh0ID0gJyAnLnJlcGVhdCh0ZXh0Lmxlbmd0aCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0ZXh0O1xuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuam9pbignJyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29kZVBhcnRzIHx8IGxpbmUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBIYW5kbGUgV29yZFByZXNzIHN5bnRheCBoaWdobGlnaHRlciBub24tdGFibGUgZm9ybWF0XG5cdFx0XHRcdGNvbnN0IGNvZGVMaW5lcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2RlIC5saW5lJyk7XG5cdFx0XHRcdGlmIChjb2RlTGluZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGNvZGVDb250ZW50ID0gQXJyYXkuZnJvbShjb2RlTGluZXMpXG5cdFx0XHRcdFx0XHQubWFwKGxpbmUgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBjb2RlUGFydHMgPSBBcnJheS5mcm9tKGxpbmUucXVlcnlTZWxlY3RvckFsbCgnY29kZScpKVxuXHRcdFx0XHRcdFx0XHRcdC5tYXAoY29kZSA9PiBjb2RlLnRleHRDb250ZW50IHx8ICcnKVxuXHRcdFx0XHRcdFx0XHRcdC5qb2luKCcnKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvZGVQYXJ0cyB8fCBsaW5lLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBGYWxsYmFjayB0byByZWd1bGFyIHRleHQgY29udGVudFxuXHRcdFx0XHRcdGNvZGVDb250ZW50ID0gZWwudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xlYW4gdXAgdGhlIGNvbnRlbnRcblx0XHRcdGNvZGVDb250ZW50ID0gY29kZUNvbnRlbnRcblx0XHRcdFx0LnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSAvLyBUcmltIHN0YXJ0L2VuZCB3aGl0ZXNwYWNlXG5cdFx0XHRcdC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKSAvLyBDb252ZXJ0IHRhYnMgdG8gc3BhY2VzXG5cdFx0XHRcdC5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKSAvLyBOb3JtYWxpemUgbXVsdGlwbGUgbmV3bGluZXNcblx0XHRcdFx0LnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTsgLy8gUmVwbGFjZSBub24tYnJlYWtpbmcgc3BhY2VzIHdpdGggcmVndWxhciBzcGFjZXNcblxuXHRcdFx0Ly8gQ3JlYXRlIGNvZGUgZWxlbWVudCB3aXRoIGxhbmd1YWdlIGNsYXNzIGlmIGRldGVjdGVkXG5cdFx0XHRjb25zdCBjb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29kZScpO1xuXHRcdFx0aWYgKGxhbmd1YWdlKSB7XG5cdFx0XHRcdGNvZGUuc2V0QXR0cmlidXRlKCdkYXRhLWxhbmcnLCBsYW5ndWFnZSk7XG5cdFx0XHRcdGNvZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIGBsYW5ndWFnZS0ke2xhbmd1YWdlfWApO1xuXHRcdFx0fVxuXHRcdFx0Y29kZS50ZXh0Q29udGVudCA9IGNvZGVDb250ZW50O1xuXHRcdFx0XG5cdFx0XHRuZXdQcmUuYXBwZW5kQ2hpbGQoY29kZSk7XG5cdFx0XHRyZXR1cm4gbmV3UHJlO1xuXHRcdH1cblx0fVxuXTtcblxuaW50ZXJmYWNlIEZvb3Rub3RlRGF0YSB7XG5cdGNvbnRlbnQ6IEVsZW1lbnQgfCBzdHJpbmc7XG5cdG9yaWdpbmFsSWQ6IHN0cmluZztcblx0cmVmczogc3RyaW5nW107XG59XG5cbmludGVyZmFjZSBGb290bm90ZUNvbGxlY3Rpb24ge1xuXHRbZm9vdG5vdGVOdW1iZXI6IG51bWJlcl06IEZvb3Rub3RlRGF0YTtcbn1cblxuaW50ZXJmYWNlIENvbnRlbnRTY29yZSB7XG5cdHNjb3JlOiBudW1iZXI7XG5cdGVsZW1lbnQ6IEVsZW1lbnQ7XG59XG5cbmludGVyZmFjZSBTdHlsZUNoYW5nZSB7XG5cdHNlbGVjdG9yOiBzdHJpbmc7XG5cdHN0eWxlczogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmdWRkbGUge1xuXHRwcml2YXRlIGRvYzogRG9jdW1lbnQ7XG5cdHByaXZhdGUgb3B0aW9uczogRGVmdWRkbGVPcHRpb25zO1xuXHRwcml2YXRlIGRlYnVnOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgRGVmdWRkbGUgaW5zdGFuY2Vcblx0ICogQHBhcmFtIGRvYyAtIFRoZSBkb2N1bWVudCB0byBwYXJzZVxuXHQgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHBhcnNpbmdcblx0ICovXG5cdGNvbnN0cnVjdG9yKGRvYzogRG9jdW1lbnQsIG9wdGlvbnM6IERlZnVkZGxlT3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5kb2MgPSBkb2M7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLmRlYnVnID0gb3B0aW9ucy5kZWJ1ZyB8fCBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXJzZSB0aGUgZG9jdW1lbnQgYW5kIGV4dHJhY3QgaXRzIG1haW4gY29udGVudFxuXHQgKi9cblx0cGFyc2UoKTogRGVmdWRkbGVSZXNwb25zZSB7XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cblx0XHQvLyBFeHRyYWN0IG1ldGFkYXRhIGZpcnN0IHNpbmNlIHdlJ2xsIG5lZWQgaXQgaW4gbXVsdGlwbGUgcGxhY2VzXG5cdFx0Y29uc3Qgc2NoZW1hT3JnRGF0YSA9IE1ldGFkYXRhRXh0cmFjdG9yLmV4dHJhY3RTY2hlbWFPcmdEYXRhKHRoaXMuZG9jKTtcblx0XHRjb25zdCBtZXRhZGF0YSA9IE1ldGFkYXRhRXh0cmFjdG9yLmV4dHJhY3QodGhpcy5kb2MsIHNjaGVtYU9yZ0RhdGEpO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIEV2YWx1YXRlIHN0eWxlcyBhbmQgc2l6ZXMgb24gb3JpZ2luYWwgZG9jdW1lbnRcblx0XHRcdGNvbnN0IG1vYmlsZVN0eWxlcyA9IHRoaXMuX2V2YWx1YXRlTWVkaWFRdWVyaWVzKHRoaXMuZG9jKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ2hlY2sgZm9yIHNtYWxsIGltYWdlcyBpbiBvcmlnaW5hbCBkb2N1bWVudCwgZXhjbHVkaW5nIGxhenktbG9hZGVkIG9uZXNcblx0XHRcdGNvbnN0IHNtYWxsSW1hZ2VzID0gdGhpcy5maW5kU21hbGxJbWFnZXModGhpcy5kb2MpO1xuXHRcdFx0XG5cdFx0XHQvLyBDbG9uZSBkb2N1bWVudFxuXHRcdFx0Y29uc3QgY2xvbmUgPSB0aGlzLmRvYy5jbG9uZU5vZGUodHJ1ZSkgYXMgRG9jdW1lbnQ7XG5cdFx0XHRcblx0XHRcdC8vIEFwcGx5IG1vYmlsZSBzdHlsZSB0byBjbG9uZVxuXHRcdFx0dGhpcy5hcHBseU1vYmlsZVN0eWxlcyhjbG9uZSwgbW9iaWxlU3R5bGVzKTtcblxuXHRcdFx0Ly8gRmluZCBtYWluIGNvbnRlbnRcblx0XHRcdGNvbnN0IG1haW5Db250ZW50ID0gdGhpcy5maW5kTWFpbkNvbnRlbnQoY2xvbmUpO1xuXHRcdFx0aWYgKCFtYWluQ29udGVudCkge1xuXHRcdFx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y29udGVudDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUwsXG5cdFx0XHRcdFx0Li4ubWV0YWRhdGEsXG5cdFx0XHRcdFx0d29yZENvdW50OiB0aGlzLmNvdW50V29yZHModGhpcy5kb2MuYm9keS5pbm5lckhUTUwpLFxuXHRcdFx0XHRcdHBhcnNlVGltZTogTWF0aC5yb3VuZChlbmRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgc21hbGwgaW1hZ2VzIGlkZW50aWZpZWQgZnJvbSBvcmlnaW5hbCBkb2N1bWVudFxuXHRcdFx0dGhpcy5yZW1vdmVTbWFsbEltYWdlcyhjbG9uZSwgc21hbGxJbWFnZXMpO1xuXHRcdFx0XG5cdFx0XHQvLyBQZXJmb3JtIG90aGVyIGRlc3RydWN0aXZlIG9wZXJhdGlvbnMgb24gdGhlIGNsb25lXG5cdFx0XHR0aGlzLnJlbW92ZUhpZGRlbkVsZW1lbnRzKGNsb25lKTtcblx0XHRcdHRoaXMucmVtb3ZlQ2x1dHRlcihjbG9uZSk7XG5cblx0XHRcdC8vIENsZWFuIHVwIHRoZSBtYWluIGNvbnRlbnRcblx0XHRcdHRoaXMuY2xlYW5Db250ZW50KG1haW5Db250ZW50LCBtZXRhZGF0YSk7XG5cblx0XHRcdGNvbnN0IGNvbnRlbnQgPSBtYWluQ29udGVudCA/IG1haW5Db250ZW50Lm91dGVySFRNTCA6IHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MO1xuXHRcdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb250ZW50LFxuXHRcdFx0XHQuLi5tZXRhZGF0YSxcblx0XHRcdFx0d29yZENvdW50OiB0aGlzLmNvdW50V29yZHMoY29udGVudCksXG5cdFx0XHRcdHBhcnNlVGltZTogTWF0aC5yb3VuZChlbmRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdFx0fTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcignRGVmdWRkbGUnLCAnRXJyb3IgcHJvY2Vzc2luZyBkb2N1bWVudDonLCBlcnJvcik7XG5cdFx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb250ZW50OiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTCxcblx0XHRcdFx0Li4ubWV0YWRhdGEsXG5cdFx0XHRcdHdvcmRDb3VudDogdGhpcy5jb3VudFdvcmRzKHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MKSxcblx0XHRcdFx0cGFyc2VUaW1lOiBNYXRoLnJvdW5kKGVuZFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgY291bnRXb3Jkcyhjb250ZW50OiBzdHJpbmcpOiBudW1iZXIge1xuXHRcdC8vIENyZWF0ZSBhIHRlbXBvcmFyeSBkaXYgdG8gcGFyc2UgSFRNTCBjb250ZW50XG5cdFx0Y29uc3QgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRlbXBEaXYuaW5uZXJIVE1MID0gY29udGVudDtcblxuXHRcdC8vIEdldCB0ZXh0IGNvbnRlbnQsIHJlbW92aW5nIGV4dHJhIHdoaXRlc3BhY2Vcblx0XHRjb25zdCB0ZXh0ID0gdGVtcERpdi50ZXh0Q29udGVudCB8fCAnJztcblx0XHRjb25zdCB3b3JkcyA9IHRleHRcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9cXHMrL2csICcgJykgLy8gUmVwbGFjZSBtdWx0aXBsZSBzcGFjZXMgd2l0aCBzaW5nbGUgc3BhY2Vcblx0XHRcdC5zcGxpdCgnICcpXG5cdFx0XHQuZmlsdGVyKHdvcmQgPT4gd29yZC5sZW5ndGggPiAwKTsgLy8gRmlsdGVyIG91dCBlbXB0eSBzdHJpbmdzXG5cblx0XHRyZXR1cm4gd29yZHMubGVuZ3RoO1xuXHR9XG5cblx0Ly8gTWFrZSBhbGwgb3RoZXIgbWV0aG9kcyBwcml2YXRlIGJ5IHJlbW92aW5nIHRoZSBzdGF0aWMga2V5d29yZCBhbmQgdXNpbmcgcHJpdmF0ZVxuXHRwcml2YXRlIF9sb2coLi4uYXJnczogYW55W10pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0Y29uc29sZS5sb2coJ0RlZnVkZGxlOicsIC4uLmFyZ3MpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgX2V2YWx1YXRlTWVkaWFRdWVyaWVzKGRvYzogRG9jdW1lbnQpOiBTdHlsZUNoYW5nZVtdIHtcblx0XHRjb25zdCBtb2JpbGVTdHlsZXM6IFN0eWxlQ2hhbmdlW10gPSBbXTtcblx0XHRjb25zdCBtYXhXaWR0aFJlZ2V4ID0gL21heC13aWR0aFteOl0qOlxccyooXFxkKykvO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIEdldCBhbGwgc3R5bGVzLCBpbmNsdWRpbmcgaW5saW5lIHN0eWxlc1xuXHRcdFx0Y29uc3Qgc2hlZXRzID0gQXJyYXkuZnJvbShkb2Muc3R5bGVTaGVldHMpLmZpbHRlcihzaGVldCA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gQWNjZXNzIHJ1bGVzIG9uY2UgdG8gY2hlY2sgdmFsaWRpdHlcblx0XHRcdFx0XHRzaGVldC5jc3NSdWxlcztcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdC8vIEV4cGVjdGVkIGVycm9yIGZvciBjcm9zcy1vcmlnaW4gc3R5bGVzaGVldHNcblx0XHRcdFx0XHRpZiAoZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlLm5hbWUgPT09ICdTZWN1cml0eUVycm9yJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly8gUHJvY2VzcyBhbGwgc2hlZXRzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRcdGNvbnN0IG1lZGlhUnVsZXMgPSBzaGVldHMuZmxhdE1hcChzaGVldCA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmV0dXJuIEFycmF5LmZyb20oc2hlZXQuY3NzUnVsZXMpXG5cdFx0XHRcdFx0XHQuZmlsdGVyKChydWxlKTogcnVsZSBpcyBDU1NNZWRpYVJ1bGUgPT4gXG5cdFx0XHRcdFx0XHRcdHJ1bGUgaW5zdGFuY2VvZiBDU1NNZWRpYVJ1bGUgJiZcblx0XHRcdFx0XHRcdFx0cnVsZS5jb25kaXRpb25UZXh0LmluY2x1ZGVzKCdtYXgtd2lkdGgnKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBzdHlsZXNoZWV0OicsIGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBQcm9jZXNzIGFsbCBtZWRpYSBydWxlcyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0XHRtZWRpYVJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1hdGNoID0gcnVsZS5jb25kaXRpb25UZXh0Lm1hdGNoKG1heFdpZHRoUmVnZXgpO1xuXHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRjb25zdCBtYXhXaWR0aCA9IHBhcnNlSW50KG1hdGNoWzFdKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZiAoTU9CSUxFX1dJRFRIIDw9IG1heFdpZHRoKSB7XG5cdFx0XHRcdFx0XHQvLyBCYXRjaCBwcm9jZXNzIGFsbCBzdHlsZSBydWxlc1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3R5bGVSdWxlcyA9IEFycmF5LmZyb20ocnVsZS5jc3NSdWxlcylcblx0XHRcdFx0XHRcdFx0LmZpbHRlcigocik6IHIgaXMgQ1NTU3R5bGVSdWxlID0+IHIgaW5zdGFuY2VvZiBDU1NTdHlsZVJ1bGUpO1xuXG5cdFx0XHRcdFx0XHRzdHlsZVJ1bGVzLmZvckVhY2goY3NzUnVsZSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0bW9iaWxlU3R5bGVzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0b3I6IGNzc1J1bGUuc2VsZWN0b3JUZXh0LFxuXHRcdFx0XHRcdFx0XHRcdFx0c3R5bGVzOiBjc3NSdWxlLnN0eWxlLmNzc1RleHRcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBDU1MgcnVsZTonLCBlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignRGVmdWRkbGU6IEVycm9yIGV2YWx1YXRpbmcgbWVkaWEgcXVlcmllczonLCBlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbW9iaWxlU3R5bGVzO1xuXHR9XG5cblx0cHJpdmF0ZSBhcHBseU1vYmlsZVN0eWxlcyhkb2M6IERvY3VtZW50LCBtb2JpbGVTdHlsZXM6IFN0eWxlQ2hhbmdlW10pIHtcblx0XHRsZXQgYXBwbGllZENvdW50ID0gMDtcblxuXHRcdG1vYmlsZVN0eWxlcy5mb3JFYWNoKCh7c2VsZWN0b3IsIHN0eWxlc30pID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFxuXHRcdFx0XHRcdFx0KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpIHx8ICcnKSArIHN0eWxlc1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YXBwbGllZENvdW50Kys7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZScsICdFcnJvciBhcHBseWluZyBzdHlsZXMgZm9yIHNlbGVjdG9yOicsIHNlbGVjdG9yLCBlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVIaWRkZW5FbGVtZW50cyhkb2M6IERvY3VtZW50KSB7XG5cdFx0bGV0IGNvdW50ID0gMDtcblx0XHRjb25zdCBlbGVtZW50c1RvUmVtb3ZlID0gbmV3IFNldDxFbGVtZW50PigpO1xuXG5cdFx0Ly8gRmlyc3QgcGFzczogR2V0IGFsbCBlbGVtZW50cyBtYXRjaGluZyBoaWRkZW4gc2VsZWN0b3JzXG5cdFx0Y29uc3QgaGlkZGVuRWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMpO1xuXHRcdGhpZGRlbkVsZW1lbnRzLmZvckVhY2goZWwgPT4gZWxlbWVudHNUb1JlbW92ZS5hZGQoZWwpKTtcblx0XHRjb3VudCArPSBoaWRkZW5FbGVtZW50cy5sZW5ndGg7XG5cblx0XHQvLyBTZWNvbmQgcGFzczogVXNlIFRyZWVXYWxrZXIgZm9yIGVmZmljaWVudCB0cmF2ZXJzYWxcblx0XHRjb25zdCB0cmVlV2Fsa2VyID0gZG9jLmNyZWF0ZVRyZWVXYWxrZXIoXG5cdFx0XHRkb2MuYm9keSxcblx0XHRcdE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULFxuXHRcdFx0e1xuXHRcdFx0XHRhY2NlcHROb2RlOiAobm9kZTogRWxlbWVudCkgPT4ge1xuXHRcdFx0XHRcdC8vIFNraXAgZWxlbWVudHMgYWxyZWFkeSBtYXJrZWQgZm9yIHJlbW92YWxcblx0XHRcdFx0XHRpZiAoZWxlbWVudHNUb1JlbW92ZS5oYXMobm9kZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0Ly8gQmF0Y2ggc3R5bGUgY29tcHV0YXRpb25zXG5cdFx0Y29uc3QgZWxlbWVudHM6IEVsZW1lbnRbXSA9IFtdO1xuXHRcdGxldCBjdXJyZW50Tm9kZTogRWxlbWVudCB8IG51bGw7XG5cdFx0d2hpbGUgKGN1cnJlbnROb2RlID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpIGFzIEVsZW1lbnQpIHtcblx0XHRcdGVsZW1lbnRzLnB1c2goY3VycmVudE5vZGUpO1xuXHRcdH1cblxuXHRcdC8vIFByb2Nlc3Mgc3R5bGVzIGluIGJhdGNoZXMgdG8gbWluaW1pemUgbGF5b3V0IHRocmFzaGluZ1xuXHRcdGNvbnN0IEJBVENIX1NJWkUgPSAxMDA7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkgKz0gQkFUQ0hfU0laRSkge1xuXHRcdFx0Y29uc3QgYmF0Y2ggPSBlbGVtZW50cy5zbGljZShpLCBpICsgQkFUQ0hfU0laRSk7XG5cdFx0XHRcblx0XHRcdC8vIFJlYWQgcGhhc2UgLSBnYXRoZXIgYWxsIGNvbXB1dGVkU3R5bGVzXG5cdFx0XHRjb25zdCBzdHlsZXMgPSBiYXRjaC5tYXAoZWwgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpKTtcblx0XHRcdFxuXHRcdFx0Ly8gV3JpdGUgcGhhc2UgLSBtYXJrIGVsZW1lbnRzIGZvciByZW1vdmFsXG5cdFx0XHRiYXRjaC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjb21wdXRlZFN0eWxlID0gc3R5bGVzW2luZGV4XTtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGNvbXB1dGVkU3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnIHx8XG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS52aXNpYmlsaXR5ID09PSAnaGlkZGVuJyB8fFxuXHRcdFx0XHRcdGNvbXB1dGVkU3R5bGUub3BhY2l0eSA9PT0gJzAnXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsZW1lbnQpO1xuXHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIEZpbmFsIHBhc3M6IEJhdGNoIHJlbW92ZSBhbGwgaGlkZGVuIGVsZW1lbnRzXG5cdFx0ZWxlbWVudHNUb1JlbW92ZS5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBoaWRkZW4gZWxlbWVudHM6JywgY291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVDbHV0dGVyKGRvYzogRG9jdW1lbnQpIHtcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRsZXQgZXhhY3RTZWxlY3RvckNvdW50ID0gMDtcblx0XHRsZXQgcGFydGlhbFNlbGVjdG9yQ291bnQgPSAwO1xuXG5cdFx0Ly8gVHJhY2sgYWxsIGVsZW1lbnRzIHRvIGJlIHJlbW92ZWRcblx0XHRjb25zdCBlbGVtZW50c1RvUmVtb3ZlID0gbmV3IFNldDxFbGVtZW50PigpO1xuXG5cdFx0Ly8gRmlyc3QgY29sbGVjdCBlbGVtZW50cyBtYXRjaGluZyBleGFjdCBzZWxlY3RvcnNcblx0XHRjb25zdCBleGFjdEVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoRVhBQ1RfU0VMRUNUT1JTLmpvaW4oJywnKSk7XG5cdFx0ZXhhY3RFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdGlmIChlbD8ucGFyZW50Tm9kZSkge1xuXHRcdFx0XHRlbGVtZW50c1RvUmVtb3ZlLmFkZChlbCk7XG5cdFx0XHRcdGV4YWN0U2VsZWN0b3JDb3VudCsrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gUHJlLWNvbXBpbGUgcmVnZXhlcyBhbmQgY29tYmluZSBpbnRvIGEgc2luZ2xlIHJlZ2V4IGZvciBiZXR0ZXIgcGVyZm9ybWFuY2Vcblx0XHRjb25zdCBjb21iaW5lZFBhdHRlcm4gPSBQQVJUSUFMX1NFTEVDVE9SUy5qb2luKCd8Jyk7XG5cdFx0Y29uc3QgcGFydGlhbFJlZ2V4ID0gbmV3IFJlZ0V4cChjb21iaW5lZFBhdHRlcm4sICdpJyk7XG5cblx0XHQvLyBDcmVhdGUgYW4gZWZmaWNpZW50IGF0dHJpYnV0ZSBzZWxlY3RvciBmb3IgZWxlbWVudHMgd2UgY2FyZSBhYm91dFxuXHRcdGNvbnN0IGF0dHJpYnV0ZVNlbGVjdG9yID0gJ1tjbGFzc10sW2lkXSxbZGF0YS10ZXN0aWRdLFtkYXRhLXFhXSxbZGF0YS1jeV0nO1xuXHRcdGNvbnN0IGFsbEVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoYXR0cmlidXRlU2VsZWN0b3IpO1xuXG5cdFx0Ly8gUHJvY2VzcyBlbGVtZW50cyBmb3IgcGFydGlhbCBtYXRjaGVzXG5cdFx0YWxsRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHQvLyBTa2lwIGlmIGFscmVhZHkgbWFya2VkIGZvciByZW1vdmFsXG5cdFx0XHRpZiAoZWxlbWVudHNUb1JlbW92ZS5oYXMoZWwpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2V0IGFsbCByZWxldmFudCBhdHRyaWJ1dGVzIGFuZCBjb21iaW5lIGludG8gYSBzaW5nbGUgc3RyaW5nXG5cdFx0XHRjb25zdCBhdHRycyA9IFtcblx0XHRcdFx0ZWwuY2xhc3NOYW1lICYmIHR5cGVvZiBlbC5jbGFzc05hbWUgPT09ICdzdHJpbmcnID8gZWwuY2xhc3NOYW1lIDogJycsXG5cdFx0XHRcdGVsLmlkIHx8ICcnLFxuXHRcdFx0XHRlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdGlkJykgfHwgJycsXG5cdFx0XHRcdGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1xYScpIHx8ICcnLFxuXHRcdFx0XHRlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3knKSB8fCAnJ1xuXHRcdFx0XS5qb2luKCcgJykudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0Ly8gU2tpcCBpZiBubyBhdHRyaWJ1dGVzIHRvIGNoZWNrXG5cdFx0XHRpZiAoIWF0dHJzLnRyaW0oKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIGZvciBwYXJ0aWFsIG1hdGNoIHVzaW5nIHNpbmdsZSByZWdleCB0ZXN0XG5cdFx0XHRpZiAocGFydGlhbFJlZ2V4LnRlc3QoYXR0cnMpKSB7XG5cdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsKTtcblx0XHRcdFx0cGFydGlhbFNlbGVjdG9yQ291bnQrKztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBhbGwgY29sbGVjdGVkIGVsZW1lbnRzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRlbGVtZW50c1RvUmVtb3ZlLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuXG5cdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBjbHV0dGVyIGVsZW1lbnRzOicsIHtcblx0XHRcdGV4YWN0U2VsZWN0b3JzOiBleGFjdFNlbGVjdG9yQ291bnQsXG5cdFx0XHRwYXJ0aWFsU2VsZWN0b3JzOiBwYXJ0aWFsU2VsZWN0b3JDb3VudCxcblx0XHRcdHRvdGFsOiBlbGVtZW50c1RvUmVtb3ZlLnNpemUsXG5cdFx0XHRwcm9jZXNzaW5nVGltZTogYCR7KGVuZFRpbWUgLSBzdGFydFRpbWUpLnRvRml4ZWQoMil9bXNgXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGNsZWFuQ29udGVudChlbGVtZW50OiBFbGVtZW50LCBtZXRhZGF0YTogRGVmdWRkbGVNZXRhZGF0YSkge1xuXHRcdC8vIFJlbW92ZSBIVE1MIGNvbW1lbnRzXG5cdFx0dGhpcy5yZW1vdmVIdG1sQ29tbWVudHMoZWxlbWVudCk7XG5cdFx0XG5cdFx0Ly8gSGFuZGxlIEgxIGVsZW1lbnRzIC0gcmVtb3ZlIGZpcnN0IG9uZSBhbmQgY29udmVydCBvdGhlcnMgdG8gSDJcblx0XHR0aGlzLmhhbmRsZUhlYWRpbmdzKGVsZW1lbnQsIG1ldGFkYXRhLnRpdGxlKTtcblx0XHRcblx0XHQvLyBTdGFuZGFyZGl6ZSBmb290bm90ZXMgYW5kIGNpdGF0aW9uc1xuXHRcdHRoaXMuc3RhbmRhcmRpemVGb290bm90ZXMoZWxlbWVudCk7XG5cblx0XHQvLyBIYW5kbGUgbGF6eS1sb2FkZWQgaW1hZ2VzXG5cdFx0dGhpcy5oYW5kbGVMYXp5SW1hZ2VzKGVsZW1lbnQpO1xuXG5cdFx0Ly8gQ29udmVydCBlbWJlZGRlZCBjb250ZW50IHRvIHN0YW5kYXJkIGZvcm1hdHNcblx0XHR0aGlzLnN0YW5kYXJkaXplRWxlbWVudHMoZWxlbWVudCk7XG5cdFx0XG5cdFx0Ly8gU3RyaXAgdW53YW50ZWQgYXR0cmlidXRlc1xuXHRcdHRoaXMuc3RyaXBVbndhbnRlZEF0dHJpYnV0ZXMoZWxlbWVudCk7XG5cblx0XHQvLyBSZW1vdmUgZW1wdHkgZWxlbWVudHNcblx0XHR0aGlzLnJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudCk7XG5cblx0XHQvLyBSZW1vdmUgdHJhaWxpbmcgaGVhZGluZ3Ncblx0XHR0aGlzLnJlbW92ZVRyYWlsaW5nSGVhZGluZ3MoZWxlbWVudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZVRyYWlsaW5nSGVhZGluZ3MoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXG5cdFx0Y29uc3QgaGFzQ29udGVudEFmdGVyID0gKGVsOiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGVyZSdzIGFueSBtZWFuaW5nZnVsIGNvbnRlbnQgYWZ0ZXIgdGhpcyBlbGVtZW50XG5cdFx0XHRsZXQgbmV4dENvbnRlbnQgPSAnJztcblx0XHRcdGxldCBzaWJsaW5nID0gZWwubmV4dFNpYmxpbmc7XG5cblx0XHRcdC8vIEZpcnN0IGNoZWNrIGRpcmVjdCBzaWJsaW5nc1xuXHRcdFx0d2hpbGUgKHNpYmxpbmcpIHtcblx0XHRcdFx0aWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRcdFx0bmV4dENvbnRlbnQgKz0gc2libGluZy50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fSBlbHNlIGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuXHRcdFx0XHRcdC8vIElmIHdlIGZpbmQgYW4gZWxlbWVudCBzaWJsaW5nLCBjaGVjayBpdHMgY29udGVudFxuXHRcdFx0XHRcdG5leHRDb250ZW50ICs9IChzaWJsaW5nIGFzIEVsZW1lbnQpLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNpYmxpbmcgPSBzaWJsaW5nLm5leHRTaWJsaW5nO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB3ZSBmb3VuZCBtZWFuaW5nZnVsIGNvbnRlbnQgYXQgdGhpcyBsZXZlbCwgcmV0dXJuIHRydWVcblx0XHRcdGlmIChuZXh0Q29udGVudC50cmltKCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIG5vIGNvbnRlbnQgZm91bmQgYXQgdGhpcyBsZXZlbCBhbmQgd2UgaGF2ZSBhIHBhcmVudCxcblx0XHRcdC8vIGNoZWNrIGZvciBjb250ZW50IGFmdGVyIHRoZSBwYXJlbnRcblx0XHRcdGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudCAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gaGFzQ29udGVudEFmdGVyKHBhcmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0Ly8gUHJvY2VzcyBhbGwgaGVhZGluZ3MgZnJvbSBib3R0b20gdG8gdG9wXG5cdFx0Y29uc3QgaGVhZGluZ3MgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaDEsIGgyLCBoMywgaDQsIGg1LCBoNicpKVxuXHRcdFx0LnJldmVyc2UoKTtcblxuXHRcdGhlYWRpbmdzLmZvckVhY2goaGVhZGluZyA9PiB7XG5cdFx0XHRpZiAoIWhhc0NvbnRlbnRBZnRlcihoZWFkaW5nKSkge1xuXHRcdFx0XHRoZWFkaW5nLnJlbW92ZSgpO1xuXHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFN0b3AgcHJvY2Vzc2luZyBvbmNlIHdlIGZpbmQgYSBoZWFkaW5nIHdpdGggY29udGVudCBhZnRlciBpdFxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAocmVtb3ZlZENvdW50ID4gMCkge1xuXHRcdFx0dGhpcy5fbG9nKCdSZW1vdmVkIHRyYWlsaW5nIGhlYWRpbmdzOicsIHJlbW92ZWRDb3VudCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBoYW5kbGVIZWFkaW5ncyhlbGVtZW50OiBFbGVtZW50LCB0aXRsZTogc3RyaW5nKSB7XG5cdFx0Y29uc3QgaDFzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDEnKTtcblxuXHRcdEFycmF5LmZyb20oaDFzKS5mb3JFYWNoKGgxID0+IHtcblx0XHRcdGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcblx0XHRcdGgyLmlubmVySFRNTCA9IGgxLmlubmVySFRNTDtcblx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRBcnJheS5mcm9tKGgxLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRoMi5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRoMS5wYXJlbnROb2RlPy5yZXBsYWNlQ2hpbGQoaDIsIGgxKTtcblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBmaXJzdCBIMiBpZiBpdCBtYXRjaGVzIHRpdGxlXG5cdFx0Y29uc3QgaDJzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDInKTtcblx0XHRpZiAoaDJzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IGZpcnN0SDIgPSBoMnNbMF07XG5cdFx0XHRjb25zdCBmaXJzdEgyVGV4dCA9IGZpcnN0SDIudGV4dENvbnRlbnQ/LnRyaW0oKS50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0Y29uc3Qgbm9ybWFsaXplZFRpdGxlID0gdGl0bGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG5cdFx0XHRpZiAobm9ybWFsaXplZFRpdGxlICYmIG5vcm1hbGl6ZWRUaXRsZSA9PT0gZmlyc3RIMlRleHQpIHtcblx0XHRcdFx0Zmlyc3RIMi5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUh0bWxDb21tZW50cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0Y29uc3QgY29tbWVudHM6IENvbW1lbnRbXSA9IFtdO1xuXHRcdGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG5cdFx0XHRlbGVtZW50LFxuXHRcdFx0Tm9kZUZpbHRlci5TSE9XX0NPTU1FTlQsXG5cdFx0XHRudWxsXG5cdFx0KTtcblxuXHRcdGxldCBub2RlO1xuXHRcdHdoaWxlIChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpIHtcblx0XHRcdGNvbW1lbnRzLnB1c2gobm9kZSBhcyBDb21tZW50KTtcblx0XHR9XG5cblx0XHRjb21tZW50cy5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuXHRcdFx0Y29tbWVudC5yZW1vdmUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBIVE1MIGNvbW1lbnRzOicsIGNvbW1lbnRzLmxlbmd0aCk7XG5cdH1cblxuXHRwcml2YXRlIHN0cmlwVW53YW50ZWRBdHRyaWJ1dGVzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgYXR0cmlidXRlQ291bnQgPSAwO1xuXG5cdFx0Y29uc3QgcHJvY2Vzc0VsZW1lbnQgPSAoZWw6IEVsZW1lbnQpID0+IHtcblx0XHRcdC8vIFNraXAgU1ZHIGVsZW1lbnRzIC0gcHJlc2VydmUgYWxsIHRoZWlyIGF0dHJpYnV0ZXNcblx0XHRcdGlmIChlbCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBhdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKTtcblx0XHRcdFxuXHRcdFx0YXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRjb25zdCBhdHRyTmFtZSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRpZiAoIUFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ck5hbWUpICYmICFhdHRyTmFtZS5zdGFydHNXaXRoKCdkYXRhLScpKSB7XG5cdFx0XHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKGF0dHIubmFtZSk7XG5cdFx0XHRcdFx0YXR0cmlidXRlQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdHByb2Nlc3NFbGVtZW50KGVsZW1lbnQpO1xuXHRcdGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnKicpLmZvckVhY2gocHJvY2Vzc0VsZW1lbnQpO1xuXG5cdFx0dGhpcy5fbG9nKCdTdHJpcHBlZCBhdHRyaWJ1dGVzOicsIGF0dHJpYnV0ZUNvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlRW1wdHlFbGVtZW50cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHJlbW92ZWRDb3VudCA9IDA7XG5cdFx0bGV0IGl0ZXJhdGlvbnMgPSAwO1xuXHRcdGxldCBrZWVwUmVtb3ZpbmcgPSB0cnVlO1xuXG5cdFx0d2hpbGUgKGtlZXBSZW1vdmluZykge1xuXHRcdFx0aXRlcmF0aW9ucysrO1xuXHRcdFx0a2VlcFJlbW92aW5nID0gZmFsc2U7XG5cdFx0XHQvLyBHZXQgYWxsIGVsZW1lbnRzIHdpdGhvdXQgY2hpbGRyZW4sIHdvcmtpbmcgZnJvbSBkZWVwZXN0IGZpcnN0XG5cdFx0XHRjb25zdCBlbXB0eUVsZW1lbnRzID0gQXJyYXkuZnJvbShlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJykpLmZpbHRlcihlbCA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0VNUFRZX0VMRU1FTlRTLmhhcyhlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDaGVjayBpZiBlbGVtZW50IGhhcyBvbmx5IHdoaXRlc3BhY2Ugb3IgJm5ic3A7XG5cdFx0XHRcdGNvbnN0IHRleHRDb250ZW50ID0gZWwudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGhhc09ubHlXaGl0ZXNwYWNlID0gdGV4dENvbnRlbnQudHJpbSgpLmxlbmd0aCA9PT0gMDtcblx0XHRcdFx0Y29uc3QgaGFzTmJzcCA9IHRleHRDb250ZW50LmluY2x1ZGVzKCdcXHUwMEEwJyk7IC8vIFVuaWNvZGUgbm9uLWJyZWFraW5nIHNwYWNlXG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDaGVjayBpZiBlbGVtZW50IGhhcyBubyBtZWFuaW5nZnVsIGNoaWxkcmVuXG5cdFx0XHRcdGNvbnN0IGhhc05vQ2hpbGRyZW4gPSAhZWwuaGFzQ2hpbGROb2RlcygpIHx8IFxuXHRcdFx0XHRcdChBcnJheS5mcm9tKGVsLmNoaWxkTm9kZXMpLmV2ZXJ5KG5vZGUgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG5vZGVUZXh0ID0gbm9kZS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5vZGVUZXh0LnRyaW0oKS5sZW5ndGggPT09IDAgJiYgIW5vZGVUZXh0LmluY2x1ZGVzKCdcXHUwMEEwJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdHJldHVybiBoYXNPbmx5V2hpdGVzcGFjZSAmJiAhaGFzTmJzcCAmJiBoYXNOb0NoaWxkcmVuO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChlbXB0eUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0ZW1wdHlFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdFx0XHRlbC5yZW1vdmUoKTtcblx0XHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGtlZXBSZW1vdmluZyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIGVtcHR5IGVsZW1lbnRzOicsIHtcblx0XHRcdGNvdW50OiByZW1vdmVkQ291bnQsXG5cdFx0XHRpdGVyYXRpb25zXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZUZvb3Rub3RlSXRlbShcblx0XHRmb290bm90ZU51bWJlcjogbnVtYmVyLFxuXHRcdGNvbnRlbnQ6IHN0cmluZyB8IEVsZW1lbnQsXG5cdFx0cmVmczogc3RyaW5nW11cblx0KTogSFRNTExJRWxlbWVudCB7XG5cdFx0Y29uc3QgbmV3SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0bmV3SXRlbS5jbGFzc05hbWUgPSAnZm9vdG5vdGUnO1xuXHRcdG5ld0l0ZW0uaWQgPSBgZm46JHtmb290bm90ZU51bWJlcn1gO1xuXG5cdFx0Ly8gSGFuZGxlIGNvbnRlbnRcblx0XHRpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRwYXJhZ3JhcGguaW5uZXJIVE1MID0gY29udGVudDtcblx0XHRcdG5ld0l0ZW0uYXBwZW5kQ2hpbGQocGFyYWdyYXBoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gR2V0IGFsbCBwYXJhZ3JhcGhzIGZyb20gdGhlIGNvbnRlbnRcblx0XHRcdGNvbnN0IHBhcmFncmFwaHMgPSBBcnJheS5mcm9tKGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgncCcpKTtcblx0XHRcdGlmIChwYXJhZ3JhcGhzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHQvLyBJZiBubyBwYXJhZ3JhcGhzLCB3cmFwIGNvbnRlbnQgaW4gYSBwYXJhZ3JhcGhcblx0XHRcdFx0Y29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRwYXJhZ3JhcGguaW5uZXJIVE1MID0gY29udGVudC5pbm5lckhUTUw7XG5cdFx0XHRcdG5ld0l0ZW0uYXBwZW5kQ2hpbGQocGFyYWdyYXBoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIENvcHkgZXhpc3RpbmcgcGFyYWdyYXBoc1xuXHRcdFx0XHRwYXJhZ3JhcGhzLmZvckVhY2gocCA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgbmV3UCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0XHRuZXdQLmlubmVySFRNTCA9IHAuaW5uZXJIVE1MO1xuXHRcdFx0XHRcdG5ld0l0ZW0uYXBwZW5kQ2hpbGQobmV3UCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFkZCBiYWNrbGluayhzKSB0byB0aGUgbGFzdCBwYXJhZ3JhcGhcblx0XHRjb25zdCBsYXN0UGFyYWdyYXBoID0gbmV3SXRlbS5xdWVyeVNlbGVjdG9yKCdwOmxhc3Qtb2YtdHlwZScpIHx8IG5ld0l0ZW07XG5cdFx0cmVmcy5mb3JFYWNoKChyZWZJZCwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IGJhY2tsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdFx0YmFja2xpbmsuaHJlZiA9IGAjJHtyZWZJZH1gO1xuXHRcdFx0YmFja2xpbmsudGl0bGUgPSAncmV0dXJuIHRvIGFydGljbGUnO1xuXHRcdFx0YmFja2xpbmsuY2xhc3NOYW1lID0gJ2Zvb3Rub3RlLWJhY2tyZWYnO1xuXHRcdFx0YmFja2xpbmsuaW5uZXJIVE1MID0gJ+KGqSc7XG5cdFx0XHRpZiAoaW5kZXggPCByZWZzLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0YmFja2xpbmsuaW5uZXJIVE1MICs9ICcgJztcblx0XHRcdH1cblx0XHRcdGxhc3RQYXJhZ3JhcGguYXBwZW5kQ2hpbGQoYmFja2xpbmspO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIG5ld0l0ZW07XG5cdH1cblxuXHRwcml2YXRlIGNvbGxlY3RGb290bm90ZXMoZWxlbWVudDogRWxlbWVudCk6IEZvb3Rub3RlQ29sbGVjdGlvbiB7XG5cdFx0Y29uc3QgZm9vdG5vdGVzOiBGb290bm90ZUNvbGxlY3Rpb24gPSB7fTtcblx0XHRsZXQgZm9vdG5vdGVDb3VudCA9IDE7XG5cdFx0Y29uc3QgcHJvY2Vzc2VkSWRzID0gbmV3IFNldDxzdHJpbmc+KCk7IC8vIFRyYWNrIHByb2Nlc3NlZCBJRHNcblxuXHRcdC8vIENvbGxlY3QgYWxsIGZvb3Rub3RlcyBhbmQgdGhlaXIgSURzIGZyb20gZm9vdG5vdGUgbGlzdHNcblx0XHRjb25zdCBmb290bm90ZUxpc3RzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPT1ROT1RFX0xJU1RfU0VMRUNUT1JTKTtcblx0XHRmb290bm90ZUxpc3RzLmZvckVhY2gobGlzdCA9PiB7XG5cdFx0XHQvLyBTdWJzdGFjayBoYXMgaW5kaXZpZHVhbCBmb290bm90ZSBkaXZzIHdpdGggbm8gcGFyZW50XG5cdFx0XHRpZiAobGlzdC5tYXRjaGVzKCdkaXYuZm9vdG5vdGVbZGF0YS1jb21wb25lbnQtbmFtZT1cIkZvb3Rub3RlVG9ET01cIl0nKSkge1xuXHRcdFx0XHRjb25zdCBhbmNob3IgPSBsaXN0LnF1ZXJ5U2VsZWN0b3IoJ2EuZm9vdG5vdGUtbnVtYmVyJyk7XG5cdFx0XHRcdGNvbnN0IGNvbnRlbnQgPSBsaXN0LnF1ZXJ5U2VsZWN0b3IoJy5mb290bm90ZS1jb250ZW50Jyk7XG5cdFx0XHRcdGlmIChhbmNob3IgJiYgY29udGVudCkge1xuXHRcdFx0XHRcdGNvbnN0IGlkID0gYW5jaG9yLmlkLnJlcGxhY2UoJ2Zvb3Rub3RlLScsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdGlmIChpZCAmJiAhcHJvY2Vzc2VkSWRzLmhhcyhpZCkpIHtcblx0XHRcdFx0XHRcdGZvb3Rub3Rlc1tmb290bm90ZUNvdW50XSA9IHtcblx0XHRcdFx0XHRcdFx0Y29udGVudDogY29udGVudCxcblx0XHRcdFx0XHRcdFx0b3JpZ2luYWxJZDogaWQsXG5cdFx0XHRcdFx0XHRcdHJlZnM6IFtdXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2VkSWRzLmFkZChpZCk7XG5cdFx0XHRcdFx0XHRmb290bm90ZUNvdW50Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29tbW9uIGZvcm1hdCB1c2luZyBPTC9VTCBhbmQgTEkgZWxlbWVudHNcblx0XHRcdGNvbnN0IGl0ZW1zID0gbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaSwgZGl2W3JvbGU9XCJsaXN0aXRlbVwiXScpO1xuXHRcdFx0aXRlbXMuZm9yRWFjaChsaSA9PiB7XG5cdFx0XHRcdGxldCBpZCA9ICcnO1xuXHRcdFx0XHRsZXQgY29udGVudDogRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG5cdFx0XHRcdC8vIEhhbmRsZSBjaXRhdGlvbnMgd2l0aCAuY2l0YXRpb25zIGNsYXNzXG5cdFx0XHRcdGNvbnN0IGNpdGF0aW9uc0RpdiA9IGxpLnF1ZXJ5U2VsZWN0b3IoJy5jaXRhdGlvbnMnKTtcblx0XHRcdFx0aWYgKGNpdGF0aW9uc0Rpdj8uaWQ/LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgncicpKSB7XG5cdFx0XHRcdFx0aWQgPSBjaXRhdGlvbnNEaXYuaWQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHQvLyBMb29rIGZvciBjaXRhdGlvbiBjb250ZW50IHdpdGhpbiB0aGUgY2l0YXRpb25zIGRpdlxuXHRcdFx0XHRcdGNvbnN0IGNpdGF0aW9uQ29udGVudCA9IGNpdGF0aW9uc0Rpdi5xdWVyeVNlbGVjdG9yKCcuY2l0YXRpb24tY29udGVudCcpO1xuXHRcdFx0XHRcdGlmIChjaXRhdGlvbkNvbnRlbnQpIHtcblx0XHRcdFx0XHRcdGNvbnRlbnQgPSBjaXRhdGlvbkNvbnRlbnQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEV4dHJhY3QgSUQgZnJvbSB2YXJpb3VzIGZvcm1hdHNcblx0XHRcdFx0XHRpZiAobGkuaWQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdiaWIuYmliJykpIHtcblx0XHRcdFx0XHRcdGlkID0gbGkuaWQucmVwbGFjZSgnYmliLmJpYicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaWQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdmbjonKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5pZC5yZXBsYWNlKCdmbjonLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGxpLmlkLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnZm4nKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5pZC5yZXBsYWNlKCdmbicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdC8vIE5hdHVyZS5jb21cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGxpLmhhc0F0dHJpYnV0ZSgnZGF0YS1jb3VudGVyJykpIHtcblx0XHRcdFx0XHRcdGlkID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLWNvdW50ZXInKT8ucmVwbGFjZSgvXFwuJC8sICcnKT8udG9Mb3dlckNhc2UoKSB8fCAnJztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBsaS5pZC5zcGxpdCgnLycpLnBvcCgpPy5tYXRjaCgvY2l0ZV9ub3RlLSguKykvKTtcblx0XHRcdFx0XHRcdGlkID0gbWF0Y2ggPyBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpIDogbGkuaWQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29udGVudCA9IGxpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlkICYmICFwcm9jZXNzZWRJZHMuaGFzKGlkKSkge1xuXHRcdFx0XHRcdGZvb3Rub3Rlc1tmb290bm90ZUNvdW50XSA9IHtcblx0XHRcdFx0XHRcdGNvbnRlbnQ6IGNvbnRlbnQgfHwgbGksXG5cdFx0XHRcdFx0XHRvcmlnaW5hbElkOiBpZCxcblx0XHRcdFx0XHRcdHJlZnM6IFtdXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRwcm9jZXNzZWRJZHMuYWRkKGlkKTtcblx0XHRcdFx0XHRmb290bm90ZUNvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGZvb3Rub3Rlcztcblx0fVxuXG5cdHByaXZhdGUgZmluZE91dGVyRm9vdG5vdGVDb250YWluZXIoZWw6IEVsZW1lbnQpOiBFbGVtZW50IHtcblx0XHRsZXQgY3VycmVudDogRWxlbWVudCB8IG51bGwgPSBlbDtcblx0XHRsZXQgcGFyZW50OiBFbGVtZW50IHwgbnVsbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG5cdFx0XG5cdFx0Ly8gS2VlcCBnb2luZyB1cCB1bnRpbCB3ZSBmaW5kIGFuIGVsZW1lbnQgdGhhdCdzIG5vdCBhIHNwYW4gb3Igc3VwXG5cdFx0d2hpbGUgKHBhcmVudCAmJiAoXG5cdFx0XHRwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3BhbicgfHwgXG5cdFx0XHRwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3VwJ1xuXHRcdCkpIHtcblx0XHRcdGN1cnJlbnQgPSBwYXJlbnQ7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIGN1cnJlbnQ7XG5cdH1cblxuXHQvLyBFdmVyeSBmb290bm90ZSByZWZlcmVuY2Ugc2hvdWxkIGJlIGEgc3VwIGVsZW1lbnQgd2l0aCBhbiBhbmNob3IgaW5zaWRlXG5cdC8vIGUuZy4gPHN1cCBpZD1cImZucmVmOjFcIj48YSBocmVmPVwiI2ZuOjFcIj4xPC9hPjwvc3VwPlxuXHRwcml2YXRlIGNyZWF0ZUZvb3Rub3RlUmVmZXJlbmNlKGZvb3Rub3RlTnVtYmVyOiBzdHJpbmcsIHJlZklkOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG5cdFx0Y29uc3Qgc3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3VwJyk7XG5cdFx0c3VwLmlkID0gcmVmSWQ7XG5cdFx0Y29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRsaW5rLmhyZWYgPSBgI2ZuOiR7Zm9vdG5vdGVOdW1iZXJ9YDtcblx0XHRsaW5rLnRleHRDb250ZW50ID0gZm9vdG5vdGVOdW1iZXI7XG5cdFx0c3VwLmFwcGVuZENoaWxkKGxpbmspO1xuXHRcdHJldHVybiBzdXA7XG5cdH1cblxuXHRwcml2YXRlIHN0YW5kYXJkaXplRm9vdG5vdGVzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRjb25zdCBmb290bm90ZXMgPSB0aGlzLmNvbGxlY3RGb290bm90ZXMoZWxlbWVudCk7XG5cblx0XHQvLyBTdGFuZGFyZGl6ZSBpbmxpbmUgZm9vdG5vdGVzIHVzaW5nIHRoZSBjb2xsZWN0ZWQgSURzXG5cdFx0Y29uc3QgZm9vdG5vdGVJbmxpbmVSZWZlcmVuY2VzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPT1ROT1RFX0lOTElORV9SRUZFUkVOQ0VTKTtcblx0XHRcblx0XHQvLyBHcm91cCByZWZlcmVuY2VzIGJ5IHRoZWlyIHBhcmVudCBzdXAgZWxlbWVudFxuXHRcdGNvbnN0IHN1cEdyb3VwcyA9IG5ldyBNYXA8RWxlbWVudCwgRWxlbWVudFtdPigpO1xuXHRcdFxuXHRcdGZvb3Rub3RlSW5saW5lUmVmZXJlbmNlcy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm47XG5cblx0XHRcdGxldCBmb290bm90ZUlkID0gJyc7XG5cdFx0XHRsZXQgZm9vdG5vdGVDb250ZW50ID0gJyc7XG5cblx0XHRcdC8vIEV4dHJhY3QgZm9vdG5vdGUgSUQgYmFzZWQgb24gZWxlbWVudCB0eXBlXG5cdFx0XHQvLyBOYXR1cmUuY29tXG5cdFx0XHRpZiAoZWwubWF0Y2hlcygnYVtpZF49XCJyZWYtbGlua1wiXScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0Ly8gU2NpZW5jZS5vcmdcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnYVtyb2xlPVwiZG9jLWJpYmxpb3JlZlwiXScpKSB7XG5cdFx0XHRcdGNvbnN0IHhtbFJpZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS14bWwtcmlkJyk7XG5cdFx0XHRcdGlmICh4bWxSaWQpIHtcblx0XHRcdFx0XHRmb290bm90ZUlkID0geG1sUmlkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IGhyZWYgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRpZiAoaHJlZj8uc3RhcnRzV2l0aCgnI2NvcmUtUicpKSB7XG5cdFx0XHRcdFx0XHRmb290bm90ZUlkID0gaHJlZi5yZXBsYWNlKCcjY29yZS0nLCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQvLyBTdWJzdGFja1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhLmZvb3Rub3RlLWFuY2hvciwgc3Bhbi5mb290bm90ZS1ob3ZlcmNhcmQtdGFyZ2V0IGEnKSkge1xuXHRcdFx0XHRjb25zdCBpZCA9IGVsLmlkPy5yZXBsYWNlKCdmb290bm90ZS1hbmNob3ItJywgJycpIHx8ICcnO1xuXHRcdFx0XHRpZiAoaWQpIHtcblx0XHRcdFx0XHRmb290bm90ZUlkID0gaWQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0Ly8gQXJ4aXZcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnY2l0ZS5sdHhfY2l0ZScpKSB7XG5cdFx0XHRcdGNvbnN0IGxpbmsgPSBlbC5xdWVyeVNlbGVjdG9yKCdhJyk7XG5cdFx0XHRcdGlmIChsaW5rKSB7XG5cdFx0XHRcdFx0Y29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdFx0aWYgKGhyZWYpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gaHJlZi5zcGxpdCgnLycpLnBvcCgpPy5tYXRjaCgvYmliXFwuYmliKFxcZCspLyk7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3N1cC5yZWZlcmVuY2UnKSkge1xuXHRcdFx0XHRjb25zdCBsaW5rcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHRcdFx0QXJyYXkuZnJvbShsaW5rcykuZm9yRWFjaChsaW5rID0+IHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBocmVmLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC8oPzpjaXRlX25vdGV8Y2l0ZV9yZWYpLSguKykvKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRmb290bm90ZUlkID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzdXBbaWRePVwiZm5yZWY6XCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmlkLnJlcGxhY2UoJ2ZucmVmOicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzdXBbaWRePVwiZm5yXCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmlkLnJlcGxhY2UoJ2ZucicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzcGFuLmZvb3Rub3RlLXJlZmVyZW5jZScpKSB7XG5cdFx0XHRcdGZvb3Rub3RlSWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vdG5vdGUtaWQnKSB8fCAnJztcblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3Bhbi5mb290bm90ZS1saW5rJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb290bm90ZS1pZCcpIHx8ICcnO1xuXHRcdFx0XHRmb290bm90ZUNvbnRlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vdG5vdGUtY29udGVudCcpIHx8ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhLmNpdGF0aW9uJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHRcdGZvb3Rub3RlQ29udGVudCA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhW2lkXj1cImZucmVmXCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmlkLnJlcGxhY2UoJ2ZucmVmJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBPdGhlciBjaXRhdGlvbiB0eXBlc1xuXHRcdFx0XHRjb25zdCBocmVmID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBocmVmLnJlcGxhY2UoL15bI10vLCAnJyk7XG5cdFx0XHRcdFx0Zm9vdG5vdGVJZCA9IGlkLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGZvb3Rub3RlSWQpIHtcblx0XHRcdFx0Ly8gRmluZCB0aGUgZm9vdG5vdGUgbnVtYmVyIGJ5IG1hdGNoaW5nIHRoZSBvcmlnaW5hbCBJRFxuXHRcdFx0XHRjb25zdCBmb290bm90ZUVudHJ5ID0gT2JqZWN0LmVudHJpZXMoZm9vdG5vdGVzKS5maW5kKFxuXHRcdFx0XHRcdChbXywgZGF0YV0pID0+IGRhdGEub3JpZ2luYWxJZCA9PT0gZm9vdG5vdGVJZC50b0xvd2VyQ2FzZSgpXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0aWYgKGZvb3Rub3RlRW50cnkpIHtcblx0XHRcdFx0XHRjb25zdCBbZm9vdG5vdGVOdW1iZXIsIGZvb3Rub3RlRGF0YV0gPSBmb290bm90ZUVudHJ5O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIENyZWF0ZSBmb290bm90ZSByZWZlcmVuY2UgSURcblx0XHRcdFx0XHRjb25zdCByZWZJZCA9IGZvb3Rub3RlRGF0YS5yZWZzLmxlbmd0aCA+IDAgPyBcblx0XHRcdFx0XHRcdGBmbnJlZjoke2Zvb3Rub3RlTnVtYmVyfS0ke2Zvb3Rub3RlRGF0YS5yZWZzLmxlbmd0aCArIDF9YCA6IFxuXHRcdFx0XHRcdFx0YGZucmVmOiR7Zm9vdG5vdGVOdW1iZXJ9YDtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmb290bm90ZURhdGEucmVmcy5wdXNoKHJlZklkKTtcblxuXHRcdFx0XHRcdC8vIEZpbmQgdGhlIG91dGVybW9zdCBjb250YWluZXIgKHNwYW4gb3Igc3VwKVxuXHRcdFx0XHRcdGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZmluZE91dGVyRm9vdG5vdGVDb250YWluZXIoZWwpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIElmIGNvbnRhaW5lciBpcyBhIHN1cCwgZ3JvdXAgcmVmZXJlbmNlc1xuXHRcdFx0XHRcdGlmIChjb250YWluZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3VwJykge1xuXHRcdFx0XHRcdFx0aWYgKCFzdXBHcm91cHMuaGFzKGNvbnRhaW5lcikpIHtcblx0XHRcdFx0XHRcdFx0c3VwR3JvdXBzLnNldChjb250YWluZXIsIFtdKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IGdyb3VwID0gc3VwR3JvdXBzLmdldChjb250YWluZXIpITtcblx0XHRcdFx0XHRcdGdyb3VwLnB1c2godGhpcy5jcmVhdGVGb290bm90ZVJlZmVyZW5jZShmb290bm90ZU51bWJlciwgcmVmSWQpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gUmVwbGFjZSB0aGUgY29udGFpbmVyIGRpcmVjdGx5XG5cdFx0XHRcdFx0XHRjb250YWluZXIucmVwbGFjZVdpdGgodGhpcy5jcmVhdGVGb290bm90ZVJlZmVyZW5jZShmb290bm90ZU51bWJlciwgcmVmSWQpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEhhbmRsZSBncm91cGVkIHJlZmVyZW5jZXNcblx0XHRzdXBHcm91cHMuZm9yRWFjaCgocmVmZXJlbmNlcywgY29udGFpbmVyKSA9PiB7XG5cdFx0XHRpZiAocmVmZXJlbmNlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdC8vIENyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50IHRvIGhvbGQgYWxsIHRoZSByZWZlcmVuY2VzXG5cdFx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQWRkIGVhY2ggcmVmZXJlbmNlIGFzIGl0cyBvd24gc3VwIGVsZW1lbnRcblx0XHRcdFx0cmVmZXJlbmNlcy5mb3JFYWNoKChyZWYsIGluZGV4KSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgbGluayA9IHJlZi5xdWVyeVNlbGVjdG9yKCdhJyk7XG5cdFx0XHRcdFx0aWYgKGxpbmspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHN1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N1cCcpO1xuXHRcdFx0XHRcdFx0c3VwLmlkID0gcmVmLmlkO1xuXHRcdFx0XHRcdFx0c3VwLmFwcGVuZENoaWxkKGxpbmsuY2xvbmVOb2RlKHRydWUpKTtcblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKHN1cCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdGNvbnRhaW5lci5yZXBsYWNlV2l0aChmcmFnbWVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBDcmVhdGUgdGhlIHN0YW5kYXJkaXplZCBmb290bm90ZSBsaXN0XG5cdFx0Y29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG5ld0xpc3QuY2xhc3NOYW1lID0gJ2Zvb3Rub3Rlcyc7XG5cdFx0Y29uc3Qgb3JkZXJlZExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpO1xuXG5cdFx0Ly8gQ3JlYXRlIGZvb3Rub3RlIGl0ZW1zIGluIG9yZGVyXG5cdFx0T2JqZWN0LmVudHJpZXMoZm9vdG5vdGVzKS5mb3JFYWNoKChbbnVtYmVyLCBkYXRhXSkgPT4ge1xuXHRcdFx0Y29uc3QgbmV3SXRlbSA9IHRoaXMuY3JlYXRlRm9vdG5vdGVJdGVtKFxuXHRcdFx0XHRwYXJzZUludChudW1iZXIpLFxuXHRcdFx0XHRkYXRhLmNvbnRlbnQsXG5cdFx0XHRcdGRhdGEucmVmc1xuXHRcdFx0KTtcblx0XHRcdG9yZGVyZWRMaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIG9yaWdpbmFsIGZvb3Rub3RlIGxpc3RzXG5cdFx0Y29uc3QgZm9vdG5vdGVMaXN0cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT09UTk9URV9MSVNUX1NFTEVDVE9SUyk7XG5cdFx0Zm9vdG5vdGVMaXN0cy5mb3JFYWNoKGxpc3QgPT4gbGlzdC5yZW1vdmUoKSk7XG5cblx0XHQvLyBJZiB3ZSBoYXZlIGFueSBmb290bm90ZXMsIGFkZCB0aGUgbmV3IGxpc3QgdG8gdGhlIGRvY3VtZW50XG5cdFx0aWYgKG9yZGVyZWRMaXN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdG5ld0xpc3QuYXBwZW5kQ2hpbGQob3JkZXJlZExpc3QpO1xuXHRcdFx0ZWxlbWVudC5hcHBlbmRDaGlsZChuZXdMaXN0KTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGhhbmRsZUxhenlJbWFnZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cdFx0Y29uc3QgbGF6eUltYWdlcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nW2RhdGEtc3JjXSwgaW1nW2RhdGEtc3Jjc2V0XScpO1xuXG5cdFx0bGF6eUltYWdlcy5mb3JFYWNoKGltZyA9PiB7XG5cdFx0XHRpZiAoIShpbWcgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSkgcmV0dXJuO1xuXG5cdFx0XHQvLyBIYW5kbGUgZGF0YS1zcmNcblx0XHRcdGNvbnN0IGRhdGFTcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aWYgKGRhdGFTcmMgJiYgIWltZy5zcmMpIHtcblx0XHRcdFx0aW1nLnNyYyA9IGRhdGFTcmM7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEhhbmRsZSBkYXRhLXNyY3NldFxuXHRcdFx0Y29uc3QgZGF0YVNyY3NldCA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRpZiAoZGF0YVNyY3NldCAmJiAhaW1nLnNyY3NldCkge1xuXHRcdFx0XHRpbWcuc3Jjc2V0ID0gZGF0YVNyY3NldDtcblx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGxhenkgbG9hZGluZyByZWxhdGVkIGNsYXNzZXMgYW5kIGF0dHJpYnV0ZXNcblx0XHRcdGltZy5jbGFzc0xpc3QucmVtb3ZlKCdsYXp5JywgJ2xhenlsb2FkJyk7XG5cdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWxsLXN0YXR1cycpO1xuXHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcblx0XHRcdGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1Byb2Nlc3NlZCBsYXp5IGltYWdlczonLCBwcm9jZXNzZWRDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YW5kYXJkaXplRWxlbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cblx0XHQvLyBDb252ZXJ0IGVsZW1lbnRzIGJhc2VkIG9uIHN0YW5kYXJkaXphdGlvbiBydWxlc1xuXHRcdEVMRU1FTlRfU1RBTkRBUkRJWkFUSU9OX1JVTEVTLmZvckVhY2gocnVsZSA9PiB7XG5cdFx0XHRjb25zdCBlbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChydWxlLnNlbGVjdG9yKTtcblx0XHRcdGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0XHRpZiAocnVsZS50cmFuc2Zvcm0pIHtcblx0XHRcdFx0XHQvLyBJZiB0aGVyZSdzIGEgdHJhbnNmb3JtIGZ1bmN0aW9uLCB1c2UgaXQgdG8gY3JlYXRlIHRoZSBuZXcgZWxlbWVudFxuXHRcdFx0XHRcdGNvbnN0IHRyYW5zZm9ybWVkID0gcnVsZS50cmFuc2Zvcm0oZWwpO1xuXHRcdFx0XHRcdGVsLnJlcGxhY2VXaXRoKHRyYW5zZm9ybWVkKTtcblx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIENvbnZlcnQgbGl0ZS15b3V0dWJlIGVsZW1lbnRzXG5cdFx0Y29uc3QgbGl0ZVlvdXR1YmVFbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGl0ZS15b3V0dWJlJyk7XG5cdFx0bGl0ZVlvdXR1YmVFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdGNvbnN0IHZpZGVvSWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZGVvaWQnKTtcblx0XHRcdGlmICghdmlkZW9JZCkgcmV0dXJuO1xuXG5cdFx0XHRjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcblx0XHRcdGlmcmFtZS53aWR0aCA9ICc1NjAnO1xuXHRcdFx0aWZyYW1lLmhlaWdodCA9ICczMTUnO1xuXHRcdFx0aWZyYW1lLnNyYyA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3ZpZGVvSWR9YDtcblx0XHRcdGlmcmFtZS50aXRsZSA9IGVsLmdldEF0dHJpYnV0ZSgndmlkZW90aXRsZScpIHx8ICdZb3VUdWJlIHZpZGVvIHBsYXllcic7XG5cdFx0XHRpZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCc7XG5cdFx0XHRpZnJhbWUuYWxsb3cgPSAnYWNjZWxlcm9tZXRlcjsgYXV0b3BsYXk7IGNsaXBib2FyZC13cml0ZTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZTsgd2ViLXNoYXJlJztcblx0XHRcdGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93ZnVsbHNjcmVlbicsICcnKTtcblxuXHRcdFx0ZWwucmVwbGFjZVdpdGgoaWZyYW1lKTtcblx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0fSk7XG5cblx0XHQvLyBBZGQgZnV0dXJlIGVtYmVkIGNvbnZlcnNpb25zIChUd2l0dGVyLCBJbnN0YWdyYW0sIGV0Yy4pXG5cblx0XHR0aGlzLl9sb2coJ0NvbnZlcnRlZCBlbWJlZGRlZCBlbGVtZW50czonLCBwcm9jZXNzZWRDb3VudCk7XG5cdH1cblxuXHQvLyBGaW5kIHNtYWxsIElNRyBhbmQgU1ZHIGVsZW1lbnRzXG5cdHByaXZhdGUgZmluZFNtYWxsSW1hZ2VzKGRvYzogRG9jdW1lbnQpOiBTZXQ8c3RyaW5nPiB7XG5cdFx0Y29uc3QgTUlOX0RJTUVOU0lPTiA9IDMzO1xuXHRcdGNvbnN0IHNtYWxsSW1hZ2VzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cdFx0Y29uc3QgdHJhbnNmb3JtUmVnZXggPSAvc2NhbGVcXCgoW1xcZC5dKylcXCkvO1xuXHRcdGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cblx0XHQvLyAxLiBSZWFkIHBoYXNlIC0gR2F0aGVyIGFsbCBlbGVtZW50cyBpbiBhIHNpbmdsZSBwYXNzXG5cdFx0Y29uc3QgZWxlbWVudHMgPSBbXG5cdFx0XHQuLi5BcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJykpLFxuXHRcdFx0Li4uQXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N2ZycpKVxuXHRcdF0uZmlsdGVyKGVsZW1lbnQgPT4ge1xuXHRcdFx0Ly8gU2tpcCBsYXp5LWxvYWRlZCBpbWFnZXMgdGhhdCBoYXZlbid0IGJlZW4gcHJvY2Vzc2VkIHlldFxuXHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG5cdFx0XHRcdGNvbnN0IGlzTGF6eSA9IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsYXp5JykgfHwgXG5cdFx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xhenlsb2FkJykgfHxcblx0XHRcdFx0XHRlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1zcmMnKSB8fFxuXHRcdFx0XHRcdGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdFx0XHRyZXR1cm4gIWlzTGF6eTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIHNtYWxsSW1hZ2VzO1xuXHRcdH1cblxuXHRcdC8vIDIuIEJhdGNoIHByb2Nlc3MgLSBDb2xsZWN0IGFsbCBtZWFzdXJlbWVudHMgaW4gb25lIGdvXG5cdFx0Y29uc3QgbWVhc3VyZW1lbnRzID0gZWxlbWVudHMubWFwKGVsZW1lbnQgPT4gKHtcblx0XHRcdGVsZW1lbnQsXG5cdFx0XHQvLyBTdGF0aWMgYXR0cmlidXRlcyAobm8gcmVmbG93KVxuXHRcdFx0bmF0dXJhbFdpZHRoOiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCA/IGVsZW1lbnQubmF0dXJhbFdpZHRoIDogMCxcblx0XHRcdG5hdHVyYWxIZWlnaHQ6IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ID8gZWxlbWVudC5uYXR1cmFsSGVpZ2h0IDogMCxcblx0XHRcdGF0dHJXaWR0aDogcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgfHwgJzAnKSxcblx0XHRcdGF0dHJIZWlnaHQ6IHBhcnNlSW50KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSB8fCAnMCcpXG5cdFx0fSkpO1xuXG5cdFx0Ly8gMy4gQmF0Y2ggY29tcHV0ZSBzdHlsZXMgLSBQcm9jZXNzIGluIGNodW5rcyB0byBhdm9pZCBsb25nIHRhc2tzXG5cdFx0Y29uc3QgQkFUQ0hfU0laRSA9IDUwO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWVhc3VyZW1lbnRzLmxlbmd0aDsgaSArPSBCQVRDSF9TSVpFKSB7XG5cdFx0XHRjb25zdCBiYXRjaCA9IG1lYXN1cmVtZW50cy5zbGljZShpLCBpICsgQkFUQ0hfU0laRSk7XG5cdFx0XHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIFJlYWQgcGhhc2UgLSBjb21wdXRlIGFsbCBzdHlsZXMgYXQgb25jZVxuXHRcdFx0XHRjb25zdCBzdHlsZXMgPSBiYXRjaC5tYXAoKHsgZWxlbWVudCB9KSA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSk7XG5cdFx0XHRcdGNvbnN0IHJlY3RzID0gYmF0Y2gubWFwKCh7IGVsZW1lbnQgfSkgPT4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBQcm9jZXNzIHBoYXNlIC0gbm8gRE9NIG9wZXJhdGlvbnNcblx0XHRcdFx0YmF0Y2guZm9yRWFjaCgobWVhc3VyZW1lbnQsIGluZGV4KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHN0eWxlID0gc3R5bGVzW2luZGV4XTtcblx0XHRcdFx0XHRcdGNvbnN0IHJlY3QgPSByZWN0c1tpbmRleF07XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIEdldCB0cmFuc2Zvcm0gc2NhbGUgaW4gdGhlIHNhbWUgYmF0Y2hcblx0XHRcdFx0XHRcdGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybTtcblx0XHRcdFx0XHRcdGNvbnN0IHNjYWxlID0gdHJhbnNmb3JtID8gXG5cdFx0XHRcdFx0XHRcdHBhcnNlRmxvYXQodHJhbnNmb3JtLm1hdGNoKHRyYW5zZm9ybVJlZ2V4KT8uWzFdIHx8ICcxJykgOiAxO1xuXG5cdFx0XHRcdFx0XHQvLyBDYWxjdWxhdGUgZWZmZWN0aXZlIGRpbWVuc2lvbnNcblx0XHRcdFx0XHRcdGNvbnN0IHdpZHRocyA9IFtcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQubmF0dXJhbFdpZHRoLFxuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5hdHRyV2lkdGgsXG5cdFx0XHRcdFx0XHRcdHBhcnNlSW50KHN0eWxlLndpZHRoKSB8fCAwLFxuXHRcdFx0XHRcdFx0XHRyZWN0LndpZHRoICogc2NhbGVcblx0XHRcdFx0XHRcdF0uZmlsdGVyKGRpbSA9PiB0eXBlb2YgZGltID09PSAnbnVtYmVyJyAmJiBkaW0gPiAwKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgaGVpZ2h0cyA9IFtcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQubmF0dXJhbEhlaWdodCxcblx0XHRcdFx0XHRcdFx0bWVhc3VyZW1lbnQuYXR0ckhlaWdodCxcblx0XHRcdFx0XHRcdFx0cGFyc2VJbnQoc3R5bGUuaGVpZ2h0KSB8fCAwLFxuXHRcdFx0XHRcdFx0XHRyZWN0LmhlaWdodCAqIHNjYWxlXG5cdFx0XHRcdFx0XHRdLmZpbHRlcihkaW0gPT4gdHlwZW9mIGRpbSA9PT0gJ251bWJlcicgJiYgZGltID4gMCk7XG5cblx0XHRcdFx0XHRcdC8vIERlY2lzaW9uIHBoYXNlIC0gbm8gRE9NIG9wZXJhdGlvbnNcblx0XHRcdFx0XHRcdGlmICh3aWR0aHMubGVuZ3RoID4gMCAmJiBoZWlnaHRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgZWZmZWN0aXZlV2lkdGggPSBNYXRoLm1pbiguLi53aWR0aHMpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlZmZlY3RpdmVIZWlnaHQgPSBNYXRoLm1pbiguLi5oZWlnaHRzKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoZWZmZWN0aXZlV2lkdGggPCBNSU5fRElNRU5TSU9OIHx8IGVmZmVjdGl2ZUhlaWdodCA8IE1JTl9ESU1FTlNJT04pIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBpZGVudGlmaWVyID0gdGhpcy5nZXRFbGVtZW50SWRlbnRpZmllcihtZWFzdXJlbWVudC5lbGVtZW50KTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaWRlbnRpZmllcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0c21hbGxJbWFnZXMuYWRkKGlkZW50aWZpZXIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBlbGVtZW50IGRpbWVuc2lvbnM6JywgZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0RlZnVkZGxlOiBGYWlsZWQgdG8gcHJvY2VzcyBiYXRjaDonLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLl9sb2coJ0ZvdW5kIHNtYWxsIGVsZW1lbnRzOicsIHtcblx0XHRcdGNvdW50OiBwcm9jZXNzZWRDb3VudCxcblx0XHRcdHRvdGFsRWxlbWVudHM6IGVsZW1lbnRzLmxlbmd0aCxcblx0XHRcdHByb2Nlc3NpbmdUaW1lOiBgJHsoZW5kVGltZSAtIHN0YXJ0VGltZSkudG9GaXhlZCgyKX1tc2Bcblx0XHR9KTtcblxuXHRcdHJldHVybiBzbWFsbEltYWdlcztcblx0fVxuXG5cdHByaXZhdGUgcmVtb3ZlU21hbGxJbWFnZXMoZG9jOiBEb2N1bWVudCwgc21hbGxJbWFnZXM6IFNldDxzdHJpbmc+KSB7XG5cdFx0bGV0IHJlbW92ZWRDb3VudCA9IDA7XG5cblx0XHRbJ2ltZycsICdzdmcnXS5mb3JFYWNoKHRhZyA9PiB7XG5cdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xuXHRcdFx0QXJyYXkuZnJvbShlbGVtZW50cykuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0Y29uc3QgaWRlbnRpZmllciA9IHRoaXMuZ2V0RWxlbWVudElkZW50aWZpZXIoZWxlbWVudCk7XG5cdFx0XHRcdGlmIChpZGVudGlmaWVyICYmIHNtYWxsSW1hZ2VzLmhhcyhpZGVudGlmaWVyKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlKCk7XG5cdFx0XHRcdFx0cmVtb3ZlZENvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIHNtYWxsIGVsZW1lbnRzOicsIHJlbW92ZWRDb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIGdldEVsZW1lbnRJZGVudGlmaWVyKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcgfCBudWxsIHtcblx0XHQvLyBUcnkgdG8gY3JlYXRlIGEgdW5pcXVlIGlkZW50aWZpZXIgdXNpbmcgdmFyaW91cyBhdHRyaWJ1dGVzXG5cdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG5cdFx0XHQvLyBGb3IgbGF6eS1sb2FkZWQgaW1hZ2VzLCB1c2UgZGF0YS1zcmMgYXMgaWRlbnRpZmllciBpZiBhdmFpbGFibGVcblx0XHRcdGNvbnN0IGRhdGFTcmMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcblx0XHRcdGlmIChkYXRhU3JjKSByZXR1cm4gYHNyYzoke2RhdGFTcmN9YDtcblx0XHRcdFxuXHRcdFx0Y29uc3Qgc3JjID0gZWxlbWVudC5zcmMgfHwgJyc7XG5cdFx0XHRjb25zdCBzcmNzZXQgPSBlbGVtZW50LnNyY3NldCB8fCAnJztcblx0XHRcdGNvbnN0IGRhdGFTcmNzZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHRcdFxuXHRcdFx0aWYgKHNyYykgcmV0dXJuIGBzcmM6JHtzcmN9YDtcblx0XHRcdGlmIChzcmNzZXQpIHJldHVybiBgc3Jjc2V0OiR7c3Jjc2V0fWA7XG5cdFx0XHRpZiAoZGF0YVNyY3NldCkgcmV0dXJuIGBzcmNzZXQ6JHtkYXRhU3Jjc2V0fWA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaWQgPSBlbGVtZW50LmlkIHx8ICcnO1xuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lIHx8ICcnO1xuXHRcdGNvbnN0IHZpZXdCb3ggPSBlbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2aWV3Qm94JykgfHwgJycgOiAnJztcblx0XHRcblx0XHRpZiAoaWQpIHJldHVybiBgaWQ6JHtpZH1gO1xuXHRcdGlmICh2aWV3Qm94KSByZXR1cm4gYHZpZXdCb3g6JHt2aWV3Qm94fWA7XG5cdFx0aWYgKGNsYXNzTmFtZSkgcmV0dXJuIGBjbGFzczoke2NsYXNzTmFtZX1gO1xuXHRcdFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kTWFpbkNvbnRlbnQoZG9jOiBEb2N1bWVudCk6IEVsZW1lbnQgfCBudWxsIHtcblxuXHRcdC8vIEZpbmQgYWxsIHBvdGVudGlhbCBjb250ZW50IGNvbnRhaW5lcnNcblx0XHRjb25zdCBjYW5kaWRhdGVzOiB7IGVsZW1lbnQ6IEVsZW1lbnQ7IHNjb3JlOiBudW1iZXIgfVtdID0gW107XG5cblx0XHRFTlRSWV9QT0lOVF9FTEVNRU5UUy5mb3JFYWNoKChzZWxlY3RvciwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0Ly8gQmFzZSBzY29yZSBmcm9tIHNlbGVjdG9yIHByaW9yaXR5IChlYXJsaWVyID0gaGlnaGVyKVxuXHRcdFx0XHRsZXQgc2NvcmUgPSAoRU5UUllfUE9JTlRfRUxFTUVOVFMubGVuZ3RoIC0gaW5kZXgpICogMTA7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBBZGQgc2NvcmUgYmFzZWQgb24gY29udGVudCBhbmFseXNpc1xuXHRcdFx0XHRzY29yZSArPSB0aGlzLnNjb3JlRWxlbWVudChlbGVtZW50KTtcblx0XHRcdFx0XG5cdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCh7IGVsZW1lbnQsIHNjb3JlIH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRpZiAoY2FuZGlkYXRlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdC8vIEZhbGwgYmFjayB0byBzY29yaW5nIGJsb2NrIGVsZW1lbnRzXG5cdFx0XHQvLyBDdXJyZW50bHkgPGJvZHk+IGVsZW1lbnQgaXMgdXNlZCBhcyB0aGUgZmFsbGJhY2ssIHNvIHRoaXMgaXMgbm90IHVzZWRcblx0XHRcdHJldHVybiB0aGlzLmZpbmRDb250ZW50QnlTY29yaW5nKGRvYyk7XG5cdFx0fVxuXG5cdFx0Ly8gU29ydCBieSBzY29yZSBkZXNjZW5kaW5nXG5cdFx0Y2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG5cdFx0XG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdHRoaXMuX2xvZygnQ29udGVudCBjYW5kaWRhdGVzOicsIGNhbmRpZGF0ZXMubWFwKGMgPT4gKHtcblx0XHRcdFx0ZWxlbWVudDogYy5lbGVtZW50LnRhZ05hbWUsXG5cdFx0XHRcdHNlbGVjdG9yOiB0aGlzLmdldEVsZW1lbnRTZWxlY3RvcihjLmVsZW1lbnQpLFxuXHRcdFx0XHRzY29yZTogYy5zY29yZVxuXHRcdFx0fSkpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FuZGlkYXRlc1swXS5lbGVtZW50O1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kQ29udGVudEJ5U2NvcmluZyhkb2M6IERvY3VtZW50KTogRWxlbWVudCB8IG51bGwge1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXMgPSB0aGlzLnNjb3JlRWxlbWVudHMoZG9jKTtcblx0XHRyZXR1cm4gY2FuZGlkYXRlcy5sZW5ndGggPiAwID8gY2FuZGlkYXRlc1swXS5lbGVtZW50IDogbnVsbDtcblx0fVxuXG5cdHByaXZhdGUgZ2V0RWxlbWVudFNlbGVjdG9yKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcge1xuXHRcdGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdGxldCBjdXJyZW50OiBFbGVtZW50IHwgbnVsbCA9IGVsZW1lbnQ7XG5cdFx0XG5cdFx0d2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gdGhpcy5kb2MuZG9jdW1lbnRFbGVtZW50KSB7XG5cdFx0XHRsZXQgc2VsZWN0b3IgPSBjdXJyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmIChjdXJyZW50LmlkKSB7XG5cdFx0XHRcdHNlbGVjdG9yICs9ICcjJyArIGN1cnJlbnQuaWQ7XG5cdFx0XHR9IGVsc2UgaWYgKGN1cnJlbnQuY2xhc3NOYW1lICYmIHR5cGVvZiBjdXJyZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0c2VsZWN0b3IgKz0gJy4nICsgY3VycmVudC5jbGFzc05hbWUudHJpbSgpLnNwbGl0KC9cXHMrLykuam9pbignLicpO1xuXHRcdFx0fVxuXHRcdFx0cGFydHMudW5zaGlmdChzZWxlY3Rvcik7XG5cdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gcGFydHMuam9pbignID4gJyk7XG5cdH1cblxuXHRwcml2YXRlIHNjb3JlRWxlbWVudHMoZG9jOiBEb2N1bWVudCk6IENvbnRlbnRTY29yZVtdIHtcblx0XHRjb25zdCBjYW5kaWRhdGVzOiBDb250ZW50U2NvcmVbXSA9IFtdO1xuXG5cdFx0QkxPQ0tfRUxFTUVOVFMuZm9yRWFjaCgodGFnOiBzdHJpbmcpID0+IHtcblx0XHRcdEFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZykpLmZvckVhY2goKGVsZW1lbnQ6IEVsZW1lbnQpID0+IHtcblx0XHRcdFx0Y29uc3Qgc2NvcmUgPSB0aGlzLnNjb3JlRWxlbWVudChlbGVtZW50KTtcblx0XHRcdFx0aWYgKHNjb3JlID4gMCkge1xuXHRcdFx0XHRcdGNhbmRpZGF0ZXMucHVzaCh7IHNjb3JlLCBlbGVtZW50IH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBjYW5kaWRhdGVzLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcblx0fVxuXG5cdHByaXZhdGUgc2NvcmVFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBudW1iZXIge1xuXHRcdGxldCBzY29yZSA9IDA7XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBlbGVtZW50IHByb3BlcnRpZXNcblx0XHRjb25zdCBjbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSAmJiB0eXBlb2YgZWxlbWVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnID8gXG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdFx0Y29uc3QgaWQgPSBlbGVtZW50LmlkID8gZWxlbWVudC5pZC50b0xvd2VyQ2FzZSgpIDogJyc7XG5cblx0XHQvLyBTY29yZSBiYXNlZCBvbiBjb250ZW50XG5cdFx0Y29uc3QgdGV4dCA9IGVsZW1lbnQudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0Y29uc3Qgd29yZHMgPSB0ZXh0LnNwbGl0KC9cXHMrLykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IE1hdGgubWluKE1hdGguZmxvb3Iod29yZHMgLyAxMDApLCAzKTtcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGxpbmsgZGVuc2l0eVxuXHRcdGNvbnN0IGxpbmtzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpO1xuXHRcdGNvbnN0IGxpbmtUZXh0ID0gQXJyYXkuZnJvbShsaW5rcykucmVkdWNlKChhY2MsIGxpbmspID0+IGFjYyArIChsaW5rLnRleHRDb250ZW50Py5sZW5ndGggfHwgMCksIDApO1xuXHRcdGNvbnN0IGxpbmtEZW5zaXR5ID0gdGV4dC5sZW5ndGggPyBsaW5rVGV4dCAvIHRleHQubGVuZ3RoIDogMDtcblx0XHRpZiAobGlua0RlbnNpdHkgPiAwLjUpIHtcblx0XHRcdHNjb3JlIC09IDEwO1xuXHRcdH1cblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIHByZXNlbmNlIG9mIG1lYW5pbmdmdWwgZWxlbWVudHNcblx0XHRjb25zdCBwYXJhZ3JhcGhzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncCcpLmxlbmd0aDtcblx0XHRzY29yZSArPSBwYXJhZ3JhcGhzO1xuXG5cdFx0Y29uc3QgaW1hZ2VzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IE1hdGgubWluKGltYWdlcyAqIDMsIDkpO1xuXG5cdFx0cmV0dXJuIHNjb3JlO1xuXHR9XG59ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJleHBvcnQgeyBEZWZ1ZGRsZSB9IGZyb20gJy4vZGVmdWRkbGUnO1xuZXhwb3J0IHR5cGUgeyBEZWZ1ZGRsZU9wdGlvbnMsIERlZnVkZGxlUmVzcG9uc2UsIERlZnVkZGxlTWV0YWRhdGEgfSBmcm9tICcuL3R5cGVzJzsgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
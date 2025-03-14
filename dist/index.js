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
// Elements that should not be unwrapped
const PRESERVE_ELEMENTS = new Set([
    'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'figure', 'figcaption', 'picture',
    'details', 'summary',
    'blockquote',
    'form', 'fieldset'
]);
// Inline elements that should not be unwrapped
const INLINE_ELEMENTS = new Set([
    'a', 'span', 'strong', 'em', 'i', 'b', 'u', 'code', 'br', 'small',
    'sub', 'sup', 'mark', 'del', 'ins', 'q', 'abbr', 'cite', 'time'
]);
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
const PARTIAL_SELECTORS = [
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
const ALLOWED_ATTRIBUTES_DEBUG = new Set([
    'class',
    'id',
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
    flattenDivs(element) {
        let processedCount = 0;
        const startTime = performance.now();
        // Process in batches to maintain performance
        let keepProcessing = true;
        const shouldPreserveElement = (el) => {
            const tagName = el.tagName.toLowerCase();
            // Check if element should be preserved
            if (PRESERVE_ELEMENTS.has(tagName))
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
                const hasPreservedElements = children.some(child => PRESERVE_ELEMENTS.has(child.tagName.toLowerCase()) ||
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
                return INLINE_ELEMENTS.has(tag);
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
                    return INLINE_ELEMENTS.has(tag);
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
                    return INLINE_ELEMENTS.has(tag);
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
                if (!INLINE_ELEMENTS.has(childTag) && !shouldPreserveElement(child)) {
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
                // In debug mode, allow debug attributes and data- attributes
                if (this.debug) {
                    if (!ALLOWED_ATTRIBUTES.has(attrName) &&
                        !ALLOWED_ATTRIBUTES_DEBUG.has(attrName) &&
                        !attrName.startsWith('data-')) {
                        el.removeAttribute(attr.name);
                        attributeCount++;
                    }
                }
                else {
                    // In normal mode, only allow standard attributes
                    if (!ALLOWED_ATTRIBUTES.has(attrName)) {
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
        const newList = document.createElement('footnotes');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDNUQsS0FBSyxJQUFJLFVBQVUsQ0FBQztRQUVwQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzFELEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFakMsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0NBQ0Q7QUExNkNELDRCQTA2Q0M7Ozs7Ozs7VUM5aEZEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QkEsNERBQXNDO0FBQTdCLDZHQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vRGVmdWRkbGUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0RlZnVkZGxlLy4vc3JjL21ldGFkYXRhLnRzIiwid2VicGFjazovL0RlZnVkZGxlLy4vc3JjL2RlZnVkZGxlLnRzIiwid2VicGFjazovL0RlZnVkZGxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZnVkZGxlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlZnVkZGxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlZnVkZGxlXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdGhpcywgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IERlZnVkZGxlTWV0YWRhdGEgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIE1ldGFkYXRhRXh0cmFjdG9yIHtcblx0c3RhdGljIGV4dHJhY3QoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogRGVmdWRkbGVNZXRhZGF0YSB7XG5cdFx0bGV0IGRvbWFpbiA9ICcnO1xuXHRcdGxldCB1cmwgPSAnJztcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBUcnkgdG8gZ2V0IFVSTCBmcm9tIGRvY3VtZW50IGxvY2F0aW9uXG5cdFx0XHR1cmwgPSBkb2MubG9jYXRpb24/LmhyZWYgfHwgJyc7XG5cdFx0XHRcblx0XHRcdC8vIElmIG5vIFVSTCBmcm9tIGxvY2F0aW9uLCB0cnkgb3RoZXIgc291cmNlc1xuXHRcdFx0aWYgKCF1cmwpIHtcblx0XHRcdFx0dXJsID0gdGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzp1cmxcIikgfHxcblx0XHRcdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcInR3aXR0ZXI6dXJsXCIpIHx8XG5cdFx0XHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICd1cmwnKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnbWFpbkVudGl0eU9mUGFnZS51cmwnKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnbWFpbkVudGl0eS51cmwnKSB8fFxuXHRcdFx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnV2ViU2l0ZS51cmwnKSB8fFxuXHRcdFx0XHRcdGRvYy5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cImNhbm9uaWNhbFwiXScpPy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHVybCkge1xuXHRcdFx0XHRkb21haW4gPSBuZXcgVVJMKHVybCkuaG9zdG5hbWUucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBJZiBVUkwgcGFyc2luZyBmYWlscywgdHJ5IHRvIGdldCBmcm9tIGJhc2UgdGFnXG5cdFx0XHRjb25zdCBiYXNlVGFnID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ2Jhc2VbaHJlZl0nKTtcblx0XHRcdGlmIChiYXNlVGFnKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dXJsID0gYmFzZVRhZy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcblx0XHRcdFx0XHRkb21haW4gPSBuZXcgVVJMKHVybCkuaG9zdG5hbWUucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignRmFpbGVkIHRvIHBhcnNlIGJhc2UgVVJMOicsIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiB0aGlzLmdldFRpdGxlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRkZXNjcmlwdGlvbjogdGhpcy5nZXREZXNjcmlwdGlvbihkb2MsIHNjaGVtYU9yZ0RhdGEpLFxuXHRcdFx0ZG9tYWluLFxuXHRcdFx0ZmF2aWNvbjogdGhpcy5nZXRGYXZpY29uKGRvYywgdXJsKSxcblx0XHRcdGltYWdlOiB0aGlzLmdldEltYWdlKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRwdWJsaXNoZWQ6IHRoaXMuZ2V0UHVibGlzaGVkKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRhdXRob3I6IHRoaXMuZ2V0QXV0aG9yKGRvYywgc2NoZW1hT3JnRGF0YSksXG5cdFx0XHRzaXRlOiB0aGlzLmdldFNpdGUoZG9jLCBzY2hlbWFPcmdEYXRhKSxcblx0XHRcdHNjaGVtYU9yZ0RhdGEsXG5cdFx0XHR3b3JkQ291bnQ6IDAsXG5cdFx0XHRwYXJzZVRpbWU6IDBcblx0XHR9O1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0QXV0aG9yKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5hdXRob3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnYXV0aG9yLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJhdXRob3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJieWxcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhdXRob3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhdXRob3JMaXN0XCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiY29weXJpZ2h0XCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2NvcHlyaWdodEhvbGRlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6c2l0ZV9uYW1lXCIpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ3B1Ymxpc2hlci5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnc291cmNlT3JnYW5pemF0aW9uLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdpc1BhcnRPZi5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJ0d2l0dGVyOmNyZWF0b3JcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJhcHBsaWNhdGlvbi1uYW1lXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRTaXRlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAncHVibGlzaGVyLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzpzaXRlX25hbWVcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnV2ViU2l0ZS5uYW1lJykgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnc291cmNlT3JnYW5pemF0aW9uLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImNvcHlyaWdodFwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdjb3B5cmlnaHRIb2xkZXIubmFtZScpIHx8XG5cdFx0XHR0aGlzLmdldFNjaGVtYVByb3BlcnR5KGRvYywgc2NoZW1hT3JnRGF0YSwgJ2lzUGFydE9mLm5hbWUnKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcImFwcGxpY2F0aW9uLW5hbWVcIikgfHxcblx0XHRcdHRoaXMuZ2V0QXV0aG9yKGRvYywgc2NoZW1hT3JnRGF0YSkgfHxcblx0XHRcdCcnXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFRpdGxlKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0Y29uc3QgcmF3VGl0bGUgPSAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJwcm9wZXJ0eVwiLCBcIm9nOnRpdGxlXCIpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidHdpdHRlcjp0aXRsZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRTY2hlbWFQcm9wZXJ0eShkb2MsIHNjaGVtYU9yZ0RhdGEsICdoZWFkbGluZScpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwidGl0bGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS50aXRsZVwiKSB8fFxuXHRcdFx0ZG9jLnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJyk/LnRleHRDb250ZW50Py50cmltKCkgfHxcblx0XHRcdCcnXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzLmNsZWFuVGl0bGUocmF3VGl0bGUsIHRoaXMuZ2V0U2l0ZShkb2MsIHNjaGVtYU9yZ0RhdGEpKTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGNsZWFuVGl0bGUodGl0bGU6IHN0cmluZywgc2l0ZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0aWYgKCF0aXRsZSB8fCAhc2l0ZU5hbWUpIHJldHVybiB0aXRsZTtcblxuXHRcdC8vIFJlbW92ZSBzaXRlIG5hbWUgaWYgaXQgZXhpc3RzXG5cdFx0Y29uc3Qgc2l0ZU5hbWVFc2NhcGVkID0gc2l0ZU5hbWUucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcblx0XHRjb25zdCBwYXR0ZXJucyA9IFtcblx0XHRcdGBcXFxccypbXFxcXHxcXFxcLeKAk+KAlF1cXFxccyoke3NpdGVOYW1lRXNjYXBlZH1cXFxccyokYCwgLy8gVGl0bGUgfCBTaXRlIE5hbWVcblx0XHRcdGBeXFxcXHMqJHtzaXRlTmFtZUVzY2FwZWR9XFxcXHMqW1xcXFx8XFxcXC3igJPigJRdXFxcXHMqYCwgLy8gU2l0ZSBOYW1lIHwgVGl0bGVcblx0XHRdO1xuXHRcdFxuXHRcdGZvciAoY29uc3QgcGF0dGVybiBvZiBwYXR0ZXJucykge1xuXHRcdFx0Y29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4sICdpJyk7XG5cdFx0XHRpZiAocmVnZXgudGVzdCh0aXRsZSkpIHtcblx0XHRcdFx0dGl0bGUgPSB0aXRsZS5yZXBsYWNlKHJlZ2V4LCAnJyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aXRsZS50cmltKCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXREZXNjcmlwdGlvbihkb2M6IERvY3VtZW50LCBzY2hlbWFPcmdEYXRhOiBhbnkpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwib2c6ZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnZGVzY3JpcHRpb24nKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6ZGVzY3JpcHRpb25cIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5kZXNjcmlwdGlvblwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0SW1hZ2UoZG9jOiBEb2N1bWVudCwgc2NoZW1hT3JnRGF0YTogYW55KTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzppbWFnZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwibmFtZVwiLCBcInR3aXR0ZXI6aW1hZ2VcIikgfHxcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnaW1hZ2UudXJsJykgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcIm5hbWVcIiwgXCJzYWlsdGhydS5pbWFnZS5mdWxsXCIpIHx8XG5cdFx0XHQnJ1xuXHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRGYXZpY29uKGRvYzogRG9jdW1lbnQsIGJhc2VVcmw6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0Y29uc3QgaWNvbkZyb21NZXRhID0gdGhpcy5nZXRNZXRhQ29udGVudChkb2MsIFwicHJvcGVydHlcIiwgXCJvZzppbWFnZTpmYXZpY29uXCIpO1xuXHRcdGlmIChpY29uRnJvbU1ldGEpIHJldHVybiBpY29uRnJvbU1ldGE7XG5cblx0XHRjb25zdCBpY29uTGluayA9IGRvYy5xdWVyeVNlbGVjdG9yKFwibGlua1tyZWw9J2ljb24nXVwiKT8uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZiAoaWNvbkxpbmspIHJldHVybiBpY29uTGluaztcblxuXHRcdGNvbnN0IHNob3J0Y3V0TGluayA9IGRvYy5xdWVyeVNlbGVjdG9yKFwibGlua1tyZWw9J3Nob3J0Y3V0IGljb24nXVwiKT8uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZiAoc2hvcnRjdXRMaW5rKSByZXR1cm4gc2hvcnRjdXRMaW5rO1xuXG5cdFx0Ly8gT25seSB0cnkgdG8gY29uc3RydWN0IGZhdmljb24gVVJMIGlmIHdlIGhhdmUgYSB2YWxpZCBiYXNlIFVSTFxuXHRcdGlmIChiYXNlVXJsKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFVSTChcIi9mYXZpY29uLmljb1wiLCBiYXNlVXJsKS5ocmVmO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBjb25zdHJ1Y3QgZmF2aWNvbiBVUkw6JywgZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0UHVibGlzaGVkKGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuZ2V0U2NoZW1hUHJvcGVydHkoZG9jLCBzY2hlbWFPcmdEYXRhLCAnZGF0ZVB1Ymxpc2hlZCcpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwicHVibGlzaERhdGVcIikgfHxcblx0XHRcdHRoaXMuZ2V0TWV0YUNvbnRlbnQoZG9jLCBcInByb3BlcnR5XCIsIFwiYXJ0aWNsZTpwdWJsaXNoZWRfdGltZVwiKSB8fFxuXHRcdFx0dGhpcy5nZXRUaW1lRWxlbWVudChkb2MpIHx8XG5cdFx0XHR0aGlzLmdldE1ldGFDb250ZW50KGRvYywgXCJuYW1lXCIsIFwic2FpbHRocnUuZGF0ZVwiKSB8fFxuXHRcdFx0Jydcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZ2V0TWV0YUNvbnRlbnQoZG9jOiBEb2N1bWVudCwgYXR0cjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRjb25zdCBzZWxlY3RvciA9IGBtZXRhWyR7YXR0cn1dYDtcblx0XHRjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG5cdFx0XHQuZmluZChlbCA9PiBlbC5nZXRBdHRyaWJ1dGUoYXR0cik/LnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpPy50cmltKCkgPz8gXCJcIiA6IFwiXCI7XG5cdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGNvbnRlbnQsIGRvYyk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBnZXRUaW1lRWxlbWVudChkb2M6IERvY3VtZW50KTogc3RyaW5nIHtcblx0XHRjb25zdCBzZWxlY3RvciA9IGB0aW1lYDtcblx0XHRjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpWzBdO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50ID8gKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0ZXRpbWVcIik/LnRyaW0oKSA/PyBlbGVtZW50LnRleHRDb250ZW50Py50cmltKCkgPz8gXCJcIikgOiBcIlwiO1xuXHRcdHJldHVybiB0aGlzLmRlY29kZUhUTUxFbnRpdGllcyhjb250ZW50LCBkb2MpO1xuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgZGVjb2RlSFRNTEVudGl0aWVzKHRleHQ6IHN0cmluZywgZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3QgdGV4dGFyZWEgPSBkb2MuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcblx0XHR0ZXh0YXJlYS5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGdldFNjaGVtYVByb3BlcnR5KGRvYzogRG9jdW1lbnQsIHNjaGVtYU9yZ0RhdGE6IGFueSwgcHJvcGVydHk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XG5cdFx0aWYgKCFzY2hlbWFPcmdEYXRhKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG5cdFx0Y29uc3Qgc2VhcmNoU2NoZW1hID0gKGRhdGE6IGFueSwgcHJvcHM6IHN0cmluZ1tdLCBmdWxsUGF0aDogc3RyaW5nLCBpc0V4YWN0TWF0Y2g6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nW10gPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4gcHJvcHMubGVuZ3RoID09PSAwID8gW2RhdGFdIDogW107XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmICghZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHRcdFx0XHRjb25zdCBjdXJyZW50UHJvcCA9IHByb3BzWzBdO1xuXHRcdFx0XHRpZiAoL15cXFtcXGQrXFxdJC8udGVzdChjdXJyZW50UHJvcCkpIHtcblx0XHRcdFx0XHRjb25zdCBpbmRleCA9IHBhcnNlSW50KGN1cnJlbnRQcm9wLnNsaWNlKDEsIC0xKSk7XG5cdFx0XHRcdFx0aWYgKGRhdGFbaW5kZXhdKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhcmNoU2NoZW1hKGRhdGFbaW5kZXhdLCBwcm9wcy5zbGljZSgxKSwgZnVsbFBhdGgsIGlzRXhhY3RNYXRjaCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKHByb3BzLmxlbmd0aCA9PT0gMCAmJiBkYXRhLmV2ZXJ5KGl0ZW0gPT4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBpdGVtID09PSAnbnVtYmVyJykpIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YS5tYXAoU3RyaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIGRhdGEuZmxhdE1hcChpdGVtID0+IHNlYXJjaFNjaGVtYShpdGVtLCBwcm9wcywgZnVsbFBhdGgsIGlzRXhhY3RNYXRjaCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBbY3VycmVudFByb3AsIC4uLnJlbWFpbmluZ1Byb3BzXSA9IHByb3BzO1xuXHRcdFx0XG5cdFx0XHRpZiAoIWN1cnJlbnRQcm9wKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHJldHVybiBbZGF0YV07XG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgZGF0YS5uYW1lKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtkYXRhLm5hbWVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoY3VycmVudFByb3ApKSB7XG5cdFx0XHRcdHJldHVybiBzZWFyY2hTY2hlbWEoZGF0YVtjdXJyZW50UHJvcF0sIHJlbWFpbmluZ1Byb3BzLCBcblx0XHRcdFx0XHRmdWxsUGF0aCA/IGAke2Z1bGxQYXRofS4ke2N1cnJlbnRQcm9wfWAgOiBjdXJyZW50UHJvcCwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXNFeGFjdE1hdGNoKSB7XG5cdFx0XHRcdGNvbnN0IG5lc3RlZFJlc3VsdHM6IHN0cmluZ1tdID0gW107XG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGRhdGFba2V5XSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdHMgPSBzZWFyY2hTY2hlbWEoZGF0YVtrZXldLCBwcm9wcywgXG5cdFx0XHRcdFx0XHRcdGZ1bGxQYXRoID8gYCR7ZnVsbFBhdGh9LiR7a2V5fWAgOiBrZXksIGZhbHNlKTtcblx0XHRcdFx0XHRcdG5lc3RlZFJlc3VsdHMucHVzaCguLi5yZXN1bHRzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG5lc3RlZFJlc3VsdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHJldHVybiBuZXN0ZWRSZXN1bHRzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBbXTtcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGxldCByZXN1bHRzID0gc2VhcmNoU2NoZW1hKHNjaGVtYU9yZ0RhdGEsIHByb3BlcnR5LnNwbGl0KCcuJyksICcnLCB0cnVlKTtcblx0XHRcdGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXN1bHRzID0gc2VhcmNoU2NoZW1hKHNjaGVtYU9yZ0RhdGEsIHByb3BlcnR5LnNwbGl0KCcuJyksICcnLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA+IDAgPyByZXN1bHRzLmZpbHRlcihCb29sZWFuKS5qb2luKCcsICcpIDogZGVmYXVsdFZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuZGVjb2RlSFRNTEVudGl0aWVzKHJlc3VsdCwgZG9jKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgaW4gZ2V0U2NoZW1hUHJvcGVydHkgZm9yICR7cHJvcGVydHl9OmAsIGVycm9yKTtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGV4dHJhY3RTY2hlbWFPcmdEYXRhKGRvYzogRG9jdW1lbnQpOiBhbnkge1xuXHRcdGNvbnN0IHNjaGVtYVNjcmlwdHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJyk7XG5cdFx0Y29uc3Qgc2NoZW1hRGF0YTogYW55W10gPSBbXTtcblxuXHRcdHNjaGVtYVNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4ge1xuXHRcdFx0bGV0IGpzb25Db250ZW50ID0gc2NyaXB0LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRqc29uQ29udGVudCA9IGpzb25Db250ZW50XG5cdFx0XHRcdFx0LnJlcGxhY2UoL1xcL1xcKltcXHNcXFNdKj9cXCpcXC98XlxccypcXC9cXC8uKiQvZ20sICcnKVxuXHRcdFx0XHRcdC5yZXBsYWNlKC9eXFxzKjwhXFxbQ0RBVEFcXFsoW1xcc1xcU10qPylcXF1cXF0+XFxzKiQvLCAnJDEnKVxuXHRcdFx0XHRcdC5yZXBsYWNlKC9eXFxzKihcXCpcXC98XFwvXFwqKVxccyp8XFxzKihcXCpcXC98XFwvXFwqKVxccyokL2csICcnKVxuXHRcdFx0XHRcdC50cmltKCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdGNvbnN0IGpzb25EYXRhID0gSlNPTi5wYXJzZShqc29uQ29udGVudCk7XG5cblx0XHRcdFx0aWYgKGpzb25EYXRhWydAZ3JhcGgnXSAmJiBBcnJheS5pc0FycmF5KGpzb25EYXRhWydAZ3JhcGgnXSkpIHtcblx0XHRcdFx0XHRzY2hlbWFEYXRhLnB1c2goLi4uanNvbkRhdGFbJ0BncmFwaCddKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY2hlbWFEYXRhLnB1c2goanNvbkRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBwYXJzaW5nIHNjaGVtYS5vcmcgZGF0YTonLCBlcnJvcik7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1Byb2JsZW1hdGljIEpTT04gY29udGVudDonLCBqc29uQ29udGVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc2NoZW1hRGF0YTtcblx0fVxufSIsImltcG9ydCB7IE1ldGFkYXRhRXh0cmFjdG9yIH0gZnJvbSAnLi9tZXRhZGF0YSc7XG5pbXBvcnQgeyBEZWZ1ZGRsZU9wdGlvbnMsIERlZnVkZGxlUmVzcG9uc2UsIERlZnVkZGxlTWV0YWRhdGEgfSBmcm9tICcuL3R5cGVzJztcblxuLy8gRW50cnkgcG9pbnQgZWxlbWVudHNcbi8vIFRoZXNlIGFyZSB0aGUgZWxlbWVudHMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZmluZCB0aGUgbWFpbiBjb250ZW50XG5jb25zdCBFTlRSWV9QT0lOVF9FTEVNRU5UUyA9IFtcblx0J2FydGljbGUnLFxuXHQnW3JvbGU9XCJhcnRpY2xlXCJdJyxcblx0J1tpdGVtcHJvcD1cImFydGljbGVCb2R5XCJdJyxcblx0Jy5wb3N0LWNvbnRlbnQnLFxuXHQnLmFydGljbGUtY29udGVudCcsXG5cdCcjYXJ0aWNsZS1jb250ZW50Jyxcblx0Jy5jb250ZW50LWFydGljbGUnLFxuXHQnbWFpbicsXG5cdCdbcm9sZT1cIm1haW5cIl0nLFxuXHQnYm9keScgLy8gZW5zdXJlcyB0aGVyZSBpcyBhbHdheXMgYSBtYXRjaFxuXTtcblxuY29uc3QgTU9CSUxFX1dJRFRIID0gNjAwO1xuY29uc3QgQkxPQ0tfRUxFTUVOVFMgPSBbJ2RpdicsICdzZWN0aW9uJywgJ2FydGljbGUnLCAnbWFpbiddO1xuXG4vLyBFbGVtZW50cyB0aGF0IHNob3VsZCBub3QgYmUgdW53cmFwcGVkXG5jb25zdCBQUkVTRVJWRV9FTEVNRU5UUyA9IG5ldyBTZXQoW1xuXHQncHJlJywgJ2NvZGUnLCAndGFibGUnLCAndGhlYWQnLCAndGJvZHknLCAndHInLCAndGQnLCAndGgnLFxuXHQndWwnLCAnb2wnLCAnbGknLCAnZGwnLCAnZHQnLCAnZGQnLFxuXHQnZmlndXJlJywgJ2ZpZ2NhcHRpb24nLCAncGljdHVyZScsXG5cdCdkZXRhaWxzJywgJ3N1bW1hcnknLFxuXHQnYmxvY2txdW90ZScsXG5cdCdmb3JtJywgJ2ZpZWxkc2V0J1xuXSk7XG5cbi8vIElubGluZSBlbGVtZW50cyB0aGF0IHNob3VsZCBub3QgYmUgdW53cmFwcGVkXG5jb25zdCBJTkxJTkVfRUxFTUVOVFMgPSBuZXcgU2V0KFtcblx0J2EnLCAnc3BhbicsICdzdHJvbmcnLCAnZW0nLCAnaScsICdiJywgJ3UnLCAnY29kZScsICdicicsICdzbWFsbCcsXG5cdCdzdWInLCAnc3VwJywgJ21hcmsnLCAnZGVsJywgJ2lucycsICdxJywgJ2FiYnInLCAnY2l0ZScsICd0aW1lJ1xuXSk7XG5cbi8vIEhpZGRlbiBlbGVtZW50cyB0aGF0IHNob3VsZCBiZSByZW1vdmVkXG5jb25zdCBISURERU5fRUxFTUVOVF9TRUxFQ1RPUlMgPSBbXG5cdCdbaGlkZGVuXScsXG5cdCdbYXJpYS1oaWRkZW49XCJ0cnVlXCJdJyxcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nLCBjYXVzZXMgcHJvYmxlbXMgZm9yIG1hdGggZm9ybXVsYXNcbi8vXHQnW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXScsXG5cdCdbc3R5bGUqPVwidmlzaWJpbGl0eTogaGlkZGVuXCJdJyxcblx0J1tzdHlsZSo9XCJ2aXNpYmlsaXR5OmhpZGRlblwiXScsXG5cdCcuaGlkZGVuJyxcblx0Jy5pbnZpc2libGUnXG5dLmpvaW4oJywnKTtcblxuLy8gU2VsZWN0b3JzIHRvIGJlIHJlbW92ZWRcbmNvbnN0IEVYQUNUX1NFTEVDVE9SUyA9IFtcblx0Ly8gc2NyaXB0cywgc3R5bGVzXG5cdCdub3NjcmlwdCcsXG5cdCdzY3JpcHQnLFxuXHQnc3R5bGUnLFxuXG5cdC8vIGFkc1xuXHQnLmFkOm5vdChbY2xhc3MqPVwiZ3JhZGllbnRcIl0pJyxcblx0J1tjbGFzc149XCJhZC1cIiBpXScsXG5cdCdbY2xhc3MkPVwiLWFkXCIgaV0nLFxuXHQnW2lkXj1cImFkLVwiIGldJyxcblx0J1tpZCQ9XCItYWRcIiBpXScsXG5cdCdbcm9sZT1cImJhbm5lclwiIGldJyxcblx0Jy5wcm9tbycsXG5cdCcuUHJvbW8nLFxuXG5cdC8vIGNvbW1lbnRzXG5cdCdbaWQ9XCJjb21tZW50c1wiIGldJyxcblxuXHQvLyBoZWFkZXIsIG5hdlxuXHQnaGVhZGVyJyxcblx0Jy5oZWFkZXInLFxuXHQnI2hlYWRlcicsXG5cdCduYXYnLFxuXHQnLm5hdmlnYXRpb24nLFxuXHQnI25hdmlnYXRpb24nLFxuXHQnW3JvbGU9XCJuYXZpZ2F0aW9uXCIgaV0nLFxuXHQnW3JvbGU9XCJkaWFsb2dcIiBpXScsXG5cdCdbcm9sZSo9XCJjb21wbGVtZW50YXJ5XCIgaV0nLFxuXHQnW2NsYXNzKj1cInBhZ2luYXRpb25cIiBpXScsXG5cdCcubWVudScsXG5cdCcjbWVudScsXG5cdCcjc2l0ZVN1YicsXG5cblx0Ly8gbWV0YWRhdGFcblx0Jy5hdXRob3InLFxuXHQnLkF1dGhvcicsXG5cdCcuY29udHJpYnV0b3InLFxuXHQnLmRhdGUnLFxuXHQnLm1ldGEnLFxuXHQnLnRhZ3MnLFxuXHQnLnRvYycsXG5cdCcuVG9jJyxcblx0JyN0b2MnLFxuXHQnI3RpdGxlJyxcblx0JyNUaXRsZScsXG5cdCdbaHJlZio9XCIvY2F0ZWdvcnlcIl0nLFxuXHQnW2hyZWYqPVwiL2NhdGVnb3JpZXNcIl0nLFxuXHQnW2hyZWYqPVwiL3RhZy9cIl0nLFxuXHQnW2hyZWYqPVwiL3RhZ3MvXCJdJyxcblx0J1tocmVmKj1cIi90b3BpY3NcIl0nLFxuXHQnW2hyZWYqPVwiYXV0aG9yXCJdJyxcblx0J1tocmVmPVwiI3NpdGUtY29udGVudFwiXScsXG5cdCdbc3JjKj1cImF1dGhvclwiXScsXG5cblx0Ly8gZm9vdGVyXG5cdCdmb290ZXInLFxuXG5cdC8vIGlucHV0cywgZm9ybXMsIGVsZW1lbnRzXG5cdCdhc2lkZScsXG5cdCdidXR0b24nLFxuXHRcdC8vICdbcm9sZT1cImJ1dHRvblwiXScsIE1lZGl1bSBpbWFnZXNcblx0J2NhbnZhcycsXG5cdCdkaWFsb2cnLFxuXHQnZmllbGRzZXQnLFxuXHQnZm9ybScsXG5cdCdpbnB1dDpub3QoW3R5cGU9XCJjaGVja2JveFwiXSknLFxuXHQnbGFiZWwnLFxuXHQnbGluaycsXG5cdCdvcHRpb24nLFxuXHQnc2VsZWN0Jyxcblx0J3RleHRhcmVhJyxcblx0J3RpbWUnLFxuXG5cdC8vIGlmcmFtZXNcblx0J2luc3RhcmVhZC1wbGF5ZXInLFxuXHQnaWZyYW1lOm5vdChbc3JjKj1cInlvdXR1YmVcIl0pOm5vdChbc3JjKj1cInlvdXR1LmJlXCJdKTpub3QoW3NyYyo9XCJ2aW1lb1wiXSk6bm90KFtzcmMqPVwidHdpdHRlclwiXSknLFxuXG5cdC8vIGxvZ29zXG5cdCdbY2xhc3M9XCJsb2dvXCIgaV0nLFxuXHQnI2xvZ28nLFxuXHQnI0xvZ28nLFxuXG5cdC8vIG5ld3NsZXR0ZXJcblx0JyNuZXdzbGV0dGVyJyxcblx0JyNOZXdzbGV0dGVyJyxcblxuXHQvLyBoaWRkZW4gZm9yIHByaW50XG5cdCcubm9wcmludCcsXG5cdCdbZGF0YS1saW5rLW5hbWUqPVwic2tpcFwiIGldJyxcblx0J1tkYXRhLXByaW50LWxheW91dD1cImhpZGVcIiBpXScsXG5cdCdbZGF0YS1ibG9jaz1cImRvbm90cHJpbnRcIiBpXScsXG5cblx0Ly8gZm9vdG5vdGVzLCBjaXRhdGlvbnNcblx0J1tjbGFzcyo9XCJjbGlja2FibGUtaWNvblwiIGldJyxcblx0J2xpIHNwYW5bY2xhc3MqPVwibHR4X3RhZ1wiIGldW2NsYXNzKj1cImx0eF90YWdfaXRlbVwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cImFuY2hvclwiIGldJyxcblx0J2FbaHJlZl49XCIjXCJdW2NsYXNzKj1cInJlZlwiIGldJyxcblxuXHQvLyBsaW5rIGxpc3RzXG5cdCdbZGF0YS1jb250YWluZXIqPVwibW9zdC12aWV3ZWRcIiBpXScsXG5cblx0Ly8gc2lkZWJhclxuXHQnLnNpZGViYXInLFxuXHQnLlNpZGViYXInLFxuXHQnI3NpZGViYXInLFxuXHQnI1NpZGViYXInLFxuXHQnI3NpdGVzdWInLFxuXHRcblx0Ly8gb3RoZXJcblx0JyNOWVRfQUJPVkVfTUFJTl9DT05URU5UX1JFR0lPTicsXG5cdCdbZGF0YS10ZXN0aWQ9XCJwaG90b3ZpZXdlci1jaGlsZHJlbi1maWd1cmVcIl0gPiBzcGFuJywgLy8gTmV3IFlvcmsgVGltZXNcblx0J3RhYmxlLmluZm9ib3gnLFxuXHQnLnBlbmNyYWZ0Om5vdCgucGMtZGlzcGxheS1jb250ZW50cyknLCAvLyBTdWJzdGFja1xuXHQnW2RhdGEtb3B0aW1pemVseT1cInJlbGF0ZWQtYXJ0aWNsZXMtc2VjdGlvblwiIGldJyAvLyBUaGUgRWNvbm9taXN0XG5dO1xuXG4vLyBSZW1vdmFsIHBhdHRlcm5zIHRlc3RlZCBhZ2FpbnN0IGF0dHJpYnV0ZXM6IGNsYXNzLCBpZCwgZGF0YS10ZXN0aWQsIGFuZCBkYXRhLXFhXG4vLyBDYXNlIGluc2Vuc2l0aXZlLCBwYXJ0aWFsIG1hdGNoZXMgYWxsb3dlZFxuY29uc3QgUEFSVElBTF9TRUxFQ1RPUlMgPSBbXG5cdCdhY2Nlc3Mtd2FsbCcsXG5cdCdhY3Rpdml0eXB1YicsXG5cdCdhY3Rpb25jYWxsJyxcblx0J2FwcGVuZGl4Jyxcblx0J2F2YXRhcicsXG5cdCdhZHZlcnQnLFxuXHQnLWFkLScsXG5cdCdfYWRfJyxcblx0J2FsbHRlcm1zJyxcblx0J2Fyb3VuZC10aGUtd2ViJyxcblx0J2FydGljbGUtYm90dG9tLXNlY3Rpb24nLFxuXHQnYXJ0aWNsZV9fY29weScsXG5cdCdhcnRpY2xlX2RhdGUnLFxuXHQnYXJ0aWNsZS1lbmQgJyxcblx0J2FydGljbGVfaGVhZGVyJyxcblx0J2FydGljbGVfX2hlYWRlcicsXG5cdCdhcnRpY2xlX19pbmZvJyxcblx0J2FydGljbGUtaW5mbycsXG5cdCdhcnRpY2xlX19tZXRhJyxcblx0J2FydGljbGUtc3ViamVjdCcsXG5cdCdhcnRpY2xlX3N1YmplY3QnLFxuXHQnYXJ0aWNsZS1zbmlwcGV0Jyxcblx0J2FydGljbGUtc2VwYXJhdG9yJyxcblx0J2FydGljbGUtdGFncycsXG5cdCdhcnRpY2xlX3RhZ3MnLFxuXHQnYXJ0aWNsZS10aXRsZScsXG5cdCdhcnRpY2xlX3RpdGxlJyxcblx0J2FydGljbGV0b3BpY3MnLFxuXHQnYXJ0aWNsZS10b3BpY3MnLFxuXHQnYXJ0aWNsZS10eXBlJyxcblx0J2FydGljbGUtLWxlZGUnLCAvLyBUaGUgVmVyZ2Vcblx0J2Fzc29jaWF0ZWQtcGVvcGxlJyxcbi8vXHQnYXV0aG9yJywgR3dlcm5cblx0J2F1dGhvci1uYW1lJyxcblx0J2JhY2stdG8tdG9wJyxcblx0J2JhY2tsaW5rcy1zZWN0aW9uJyxcblx0J2Jhbm5lcicsXG5cdCdiaW8tYmxvY2snLFxuXHQnYmxvZy1wYWdlcicsXG5cdCdib3R0b20tb2YtYXJ0aWNsZScsXG5cdCdicmFuZC1iYXInLFxuXHQnYnJlYWRjcnVtYicsXG5cdCdidXR0b24td3JhcHBlcicsXG5cdCdidG4tJyxcblx0Jy1idG4nLFxuXHQnYnlsaW5lJyxcblx0J2NhcHRjaGEnLFxuXHQnY2F0X2hlYWRlcicsXG5cdCdjYXRsaW5rcycsXG5cdCdjaGFwdGVyLWxpc3QnLCAvLyBUaGUgRWNvbm9taXN0XG5cdCdjb2xsZWN0aW9ucycsXG5cdCdjb21tZW50cycsXG4vL1x0Jy1jb21tZW50JywgU3ludGF4IGhpZ2hsaWdodGluZ1xuXHQnY29tbWVudC1jb3VudCcsXG5cdCdjb21tZW50LWNvbnRlbnQnLFxuXHQnY29tbWVudC1mb3JtJyxcblx0J2NvbW1lbnQtbnVtYmVyJyxcblx0J2NvbW1lbnQtcmVzcG9uZCcsXG5cdCdjb21tZW50LXRocmVhZCcsXG5cdCdjb21wbGVtZW50YXJ5Jyxcblx0J2NvbnNlbnQnLFxuXHQnY29udGVudC1jYXJkJywgLy8gVGhlIFZlcmdlXG5cdCdjb250ZW50LXRvcGljcycsXG5cdCdjb250ZW50cHJvbW8nLFxuXHQnY29udGV4dC13aWRnZXQnLCAvLyBSZXV0ZXJzXG5cdCdjb3JlLWNvbGxhdGVyYWwnLFxuXHQnX2N0YScsXG5cdCctY3RhJyxcblx0J2N0YS0nLFxuXHQnY3RhXycsXG5cdCdjdXJyZW50LWlzc3VlJywgLy8gVGhlIE5hdGlvblxuXHQnY3VzdG9tLWxpc3QtbnVtYmVyJyxcblx0J2RhdGVsaW5lJyxcblx0J2RhdGVoZWFkZXInLFxuXHQnZGF0ZS1oZWFkZXInLFxuXHQnZGF0ZV9oZWFkZXItJyxcbi8vXHQnZGlhbG9nJyxcblx0J2Rpc2NsYWltZXInLFxuXHQnZGlzY2xvc3VyZScsXG5cdCdkaXNjdXNzaW9uJyxcblx0J2Rpc2N1c3NfJyxcblx0J2Rpc3F1cycsXG5cdCdkb25hdGUnLFxuXHQnZHJvcGRvd24nLCAvLyBBcnMgVGVjaG5pY2Fcblx0J2VsZXR0ZXJzJyxcblx0J2VtYWlsc2lnbnVwJyxcblx0J2VuZ2FnZW1lbnQtd2lkZ2V0Jyxcblx0J2VudHJ5LWF1dGhvci1pbmZvJyxcblx0J2VudHJ5LWNhdGVnb3JpZXMnLFxuXHQnZW50cnktZGF0ZScsXG5cdCdlbnRyeS1tZXRhJyxcblx0J2VudHJ5LXRpdGxlJyxcblx0J2VudHJ5LXV0aWxpdHknLFxuXHQnZXllYnJvdycsXG5cdCdleHBhbmQtcmVkdWNlJyxcblx0J2V4dGVybmFsbGlua2VtYmVkd3JhcHBlcicsIC8vIFRoZSBOZXcgWW9ya2VyXG5cdCdleHRyYS1zZXJ2aWNlcycsXG5cdCdleHRyYS10aXRsZScsXG5cdCdmYWNlYm9vaycsXG5cdCdmYXZvcml0ZScsXG5cdCdmZWVkYmFjaycsXG5cdCdmZWVkLWxpbmtzJyxcblx0J2ZpZWxkLXNpdGUtc2VjdGlvbnMnLFxuXHQnZml4ZWQnLFxuXHQnZmxvYXRpbmctdmlkJyxcblx0J2ZvbGxvdycsXG5cdCdmb290ZXInLFxuXHQnZm9vdG5vdGUtYmFjaycsXG5cdCdmb290bm90ZWJhY2snLFxuXHQnZm9yLXlvdScsXG5cdCdmcm9udG1hdHRlcicsXG5cdCdmdXJ0aGVyLXJlYWRpbmcnLFxuXHQnZ2lzdC1tZXRhJyxcbi8vXHQnZ2xvYmFsJyxcblx0J2dvb2dsZScsXG5cdCdnb29nLScsXG5cdCdncmFwaC12aWV3Jyxcblx0J2hlYWRlci1sb2dvJyxcblx0J2hlYWRlci1wYXR0ZXJuJywgLy8gVGhlIFZlcmdlXG5cdCdoZXJvLWxpc3QnLFxuXHQnaGlkZS1mb3ItcHJpbnQnLFxuXHQnaGlkZS1wcmludCcsXG5cdCdoaWRkZW4tc2lkZW5vdGUnLFxuXHQnaW50ZXJsdWRlJyxcblx0J2ludGVyYWN0aW9uJyxcblx0J2p1bXBsaW5rJyxcblx0J2p1bXAtdG8tJyxcbi8vXHQna2V5d29yZCcsIC8vIHVzZWQgaW4gc3ludGF4IGhpZ2hsaWdodGluZ1xuXHQna2lja2VyJyxcblx0J2xhYnN0YWInLCAvLyBBcnhpdlxuXHQnLWxhYmVscycsXG5cdCdsYW5ndWFnZS1uYW1lJyxcblx0J2xhdGVzdC1jb250ZW50Jyxcblx0Jy1sZWRlcy0nLCAvLyBUaGUgVmVyZ2Vcblx0Jy1saWNlbnNlJyxcblx0J2xpbmstYm94Jyxcblx0J2xpbmtzLWdyaWQnLCAvLyBCQkNcblx0J2xpbmtzLXRpdGxlJywgLy8gQkJDXG5cdCdsaXN0aW5nLWR5bmFtaWMtdGVybXMnLCAvLyBCb3N0b24gUmV2aWV3XG5cdCdsaXN0LXRhZ3MnLFxuXHQnbG9hZGluZycsXG5cdCdsb2EtaW5mbycsXG5cdCdsb2dvX2NvbnRhaW5lcicsXG5cdCdsdHhfcm9sZV9yZWZudW0nLCAvLyBBcnhpdlxuXHQnbHR4X3RhZ19iaWJpdGVtJyxcblx0J2x0eF9lcnJvcicsXG5cdCdtYXJrZXRpbmcnLFxuXHQnbWVkaWEtaW5xdWlyeScsXG5cdCdtZW51LScsXG5cdCdtZXRhLScsXG5cdCdtZXRhZGF0YScsXG5cdCdtaWdodC1saWtlJyxcblx0J19tb2RhbCcsXG5cdCctbW9kYWwnLFxuXHQnbW9yZS0nLFxuXHQnbW9yZW5ld3MnLFxuXHQnbW9yZXN0b3JpZXMnLFxuXHQnbW92ZS1oZWxwZXInLFxuXHQnbXctZWRpdHNlY3Rpb24nLFxuXHQnbXctY2l0ZS1iYWNrbGluaycsXG5cdCdtdy1pbmRpY2F0b3JzJyxcblx0J213LWp1bXAtbGluaycsXG5cdCduYXYtJyxcblx0J25hdl8nLFxuXHQnbmF2YmFyJyxcbi8vXHQnbmF2aWdhdGlvbicsXG5cdCduZXh0LScsXG5cdCduZXdzLXN0b3J5LXRpdGxlJyxcbi8vXHQnbmV3c2xldHRlcicsIHVzZWQgb24gU3Vic3RhY2tcblx0J25ld3NsZXR0ZXJfJyxcblx0J25ld3NsZXR0ZXItc2lnbnVwJyxcblx0J25ld3NsZXR0ZXJzaWdudXAnLFxuXHQnbmV3c2xldHRlcndpZGdldCcsXG5cdCduZXdzbGV0dGVyd3JhcHBlcicsXG5cdCdub3QtZm91bmQnLFxuXHQnbm9tb2JpbGUnLFxuXHQnbm9wcmludCcsXG5cdCdvcmlnaW5hbGx5LXB1Ymxpc2hlZCcsIC8vIE1lcmN1cnkgTmV3c1xuXHQnb3V0bGluZS12aWV3Jyxcblx0J292ZXJsYXknLFxuXHQncGFnZS10aXRsZScsXG5cdCctcGFydG5lcnMnLFxuXHQncGxlYScsXG5cdCdwb3B1bGFyJyxcbi8vXHQncG9wdXAnLCBHd2VyblxuXHQncG9wLXVwJyxcblx0J3BvcG92ZXInLFxuXHQncG9zdC1ib3R0b20nLFxuXHQncG9zdF9fY2F0ZWdvcnknLFxuXHQncG9zdGNvbW1lbnQnLFxuXHQncG9zdGRhdGUnLFxuXHQncG9zdC1hdXRob3InLFxuXHQncG9zdC1kYXRlJyxcblx0J3Bvc3RfZGF0ZScsXG5cdCdwb3N0LWZlZWRzJyxcblx0J3Bvc3RpbmZvJyxcblx0J3Bvc3QtaW5mbycsXG5cdCdwb3N0X2luZm8nLFxuXHQncG9zdC1pbmxpbmUtZGF0ZScsXG5cdCdwb3N0LWxpbmtzJyxcblx0J3Bvc3QtbWV0YScsXG5cdCdwb3N0bWV0YScsXG5cdCdwb3N0c25pcHBldCcsXG5cdCdwb3N0X3NuaXBwZXQnLFxuXHQncG9zdC1zbmlwcGV0Jyxcblx0J3Bvc3R0aXRsZScsXG5cdCdwb3N0LXRpdGxlJyxcblx0J3Bvc3RfdGl0bGUnLFxuXHQncG9zdHRheCcsXG5cdCdwb3N0LXRheCcsXG5cdCdwb3N0X3RheCcsXG5cdCdwb3N0dGFnJyxcblx0J3Bvc3RfdGFnJyxcblx0J3Bvc3QtdGFnJyxcbi8vXHQncHJldmlldycsIHVzZWQgb24gT2JzaWRpYW4gUHVibGlzaFxuXHQncHJldm5leHQnLFxuXHQncHJldmlvdXNuZXh0Jyxcblx0J3ByaW50LW5vbmUnLFxuXHQncHJpbnQtaGVhZGVyJyxcblx0J3Byb2ZpbGUnLFxuLy9cdCdwcm9tbycsXG5cdCdwcm9tby1ib3gnLFxuXHQncHViZGF0ZScsXG5cdCdwdWJfZGF0ZScsXG5cdCdwdWItZGF0ZScsXG5cdCdwdWJsaWNhdGlvbi1kYXRlJyxcblx0J3B1YmxpY2F0aW9uTmFtZScsIC8vIE1lZGl1bVxuXHQncXItY29kZScsXG5cdCdxcl9jb2RlJyxcblx0J19yYWlsJyxcblx0J3JlYWRtb3JlJyxcblx0J3JlYWQtbmV4dCcsXG5cdCdyZWFkX25leHQnLFxuXHQncmVhZF90aW1lJyxcblx0J3JlYWQtdGltZScsXG5cdCdyZWFkaW5nX3RpbWUnLFxuXHQncmVhZGluZy10aW1lJyxcblx0J3JlYWRpbmctbGlzdCcsXG5cdCdyZWNlbnRwb3N0Jyxcblx0J3JlY2VudF9wb3N0Jyxcblx0J3JlY2VudC1wb3N0Jyxcblx0J3JlY29tbWVuZCcsXG5cdCdyZWRpcmVjdGVkZnJvbScsXG5cdCdyZWNpcmMnLFxuXHQncmVnaXN0ZXInLFxuXHQncmVsYXRlZCcsXG5cdCdyZWxldmFudCcsXG5cdCdyZXZlcnNlZm9vdG5vdGUnLFxuXHQnc2NyZWVuLXJlYWRlci10ZXh0Jyxcbi8vXHQnc2hhcmUnLFxuLy9cdCctc2hhcmUnLCBzY2l0ZWNoZGFpbHkuY29tXG5cdCdzaGFyZS1ib3gnLFxuXHQnc2hhcmUtaWNvbnMnLFxuXHQnc2hhcmVsaW5rcycsXG5cdCdzaGFyZS1zZWN0aW9uJyxcblx0J3NpZGViYXJ0aXRsZScsXG5cdCdzaWRlYmFyXycsXG5cdCdzaW1pbGFyLScsXG5cdCdzaW1pbGFyXycsXG5cdCdzaW1pbGFycy0nLFxuXHQnc2lkZWl0ZW1zJyxcblx0J3NpZGUtYm94Jyxcblx0J3NpdGUtaW5kZXgnLFxuXHQnc2l0ZS1oZWFkZXInLFxuXHQnc2l0ZS1sb2dvJyxcblx0J3NpdGUtbmFtZScsXG4vL1x0J3NraXAtJyxcbi8vXHQnc2tpcC1saW5rJywgVGVjaENydW5jaFxuXHQnc29jaWFsJyxcblx0J3NwZWVjaGlmeS1pZ25vcmUnLFxuXHQnc3BvbnNvcicsXG5cdCdzcHJpbmdlcmNpdGF0aW9uJyxcbi8vXHQnLXN0YXRzJyxcblx0J19zdGF0cycsXG5cdCdzdGlja3knLFxuXHQnc3RvcnlyZWFkdGltZScsIC8vIE1lZGl1bVxuXHQnc3RvcnlwdWJsaXNoZGF0ZScsIC8vIE1lZGl1bVxuXHQnc3ViamVjdC1sYWJlbCcsXG5cdCdzdWJzY3JpYmUnLFxuXHQnX3RhZ3MnLFxuXHQndGFnc19faXRlbScsXG5cdCd0YWdfbGlzdCcsXG5cdCd0YXhvbm9teScsXG5cdCd0YWJsZS1vZi1jb250ZW50cycsXG5cdCd0YWJzLScsXG4vL1x0J3RlYXNlcicsIE5hdHVyZVxuXHQndGVybWluYWx0b3V0Jyxcblx0J3RpbWUtcnVicmljJyxcblx0J3RpbWVzdGFtcCcsXG5cdCd0aXBfb2ZmJyxcblx0J3RpcHRvdXQnLFxuXHQnLXRvdXQtJyxcblx0Jy10b2MnLFxuXHQndG9waWMtbGlzdCcsXG5cdCd0b29sYmFyJyxcblx0J3Rvb2x0aXAnLFxuXHQndG9wLXdyYXBwZXInLFxuXHQndHJlZS1pdGVtJyxcblx0J3RyZW5kaW5nJyxcblx0J3RydXN0LWZlYXQnLFxuXHQndHJ1c3QtYmFkZ2UnLFxuXHQndHdpdHRlcicsXG5cdCd2aXN1YWxseS1oaWRkZW4nLFxuXHQnd2VsY29tZWJveCdcbl07XG5cbi8vIFNlbGVjdG9ycyBmb3IgZm9vdG5vdGVzIGFuZCBjaXRhdGlvbnNcbmNvbnN0IEZPT1ROT1RFX0lOTElORV9SRUZFUkVOQ0VTID0gW1xuXHQnc3VwLnJlZmVyZW5jZScsXG5cdCdjaXRlLmx0eF9jaXRlJyxcblx0J3N1cFtpZF49XCJmbnJcIl0nLFxuXHQnc3VwW2lkXj1cImZucmVmOlwiXScsXG5cdCdzcGFuLmZvb3Rub3RlLWxpbmsnLFxuXHQnYS5jaXRhdGlvbicsXG5cdCdhW2lkXj1cInJlZi1saW5rXCJdJyxcblx0J2FbaHJlZl49XCIjZm5cIl0nLFxuXHQnYVtocmVmXj1cIiNjaXRlXCJdJyxcblx0J2FbaHJlZl49XCIjcmVmZXJlbmNlXCJdJyxcblx0J2FbaHJlZl49XCIjZm9vdG5vdGVcIl0nLFxuXHQnYVtocmVmXj1cIiNyXCJdJywgLy8gQ29tbW9uIGluIGFjYWRlbWljIHBhcGVyc1xuXHQnYVtocmVmXj1cIiNiXCJdJywgLy8gQ29tbW9uIGZvciBiaWJsaW9ncmFwaHkgcmVmZXJlbmNlc1xuXHQnYVtocmVmKj1cImNpdGVfbm90ZVwiXScsXG5cdCdhW2hyZWYqPVwiY2l0ZV9yZWZcIl0nLFxuXHQnYS5mb290bm90ZS1hbmNob3InLCAvLyBTdWJzdGFja1xuXHQnc3Bhbi5mb290bm90ZS1ob3ZlcmNhcmQtdGFyZ2V0IGEnLCAvLyBTdWJzdGFja1xuXHQnYVtyb2xlPVwiZG9jLWJpYmxpb3JlZlwiXScsIC8vIFNjaWVuY2Uub3JnXG5cdCdhW2lkXj1cImZucmVmXCJdJyxcblx0J2FbaWRePVwicmVmLWxpbmtcIl0nLCAvLyBOYXR1cmUuY29tXG5dLmpvaW4oJywnKTtcblxuY29uc3QgRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMgPSBbXG5cdCdkaXYuZm9vdG5vdGUgb2wnLFxuXHQnZGl2LmZvb3Rub3RlcyBvbCcsXG5cdCdkaXZbcm9sZT1cImRvYy1lbmRub3Rlc1wiXScsXG5cdCdkaXZbcm9sZT1cImRvYy1mb290bm90ZXNcIl0nLFxuXHQnb2wuZm9vdG5vdGVzLWxpc3QnLFxuXHQnb2wuZm9vdG5vdGVzJyxcblx0J29sLnJlZmVyZW5jZXMnLFxuXHQnb2xbY2xhc3MqPVwiYXJ0aWNsZS1yZWZlcmVuY2VzXCJdJyxcblx0J3NlY3Rpb24uZm9vdG5vdGVzIG9sJyxcblx0J3NlY3Rpb25bcm9sZT1cImRvYy1lbmRub3Rlc1wiXScsXG5cdCdzZWN0aW9uW3JvbGU9XCJkb2MtZm9vdG5vdGVzXCJdJyxcblx0J3NlY3Rpb25bcm9sZT1cImRvYy1iaWJsaW9ncmFwaHlcIl0nLFxuXHQndWwuZm9vdG5vdGVzLWxpc3QnLFxuXHQndWwubHR4X2JpYmxpc3QnLFxuXHQnZGl2LmZvb3Rub3RlW2RhdGEtY29tcG9uZW50LW5hbWU9XCJGb290bm90ZVRvRE9NXCJdJyAvLyBTdWJzdGFja1xuXS5qb2luKCcsJyk7XG5cbi8vIEVsZW1lbnRzIHRoYXQgYXJlIGFsbG93ZWQgdG8gYmUgZW1wdHlcbi8vIFRoZXNlIGFyZSBub3QgcmVtb3ZlZCBldmVuIGlmIHRoZXkgaGF2ZSBubyBjb250ZW50XG5jb25zdCBBTExPV0VEX0VNUFRZX0VMRU1FTlRTID0gbmV3IFNldChbXG5cdCdhcmVhJyxcblx0J2F1ZGlvJyxcblx0J2Jhc2UnLFxuXHQnYnInLFxuXHQnY2lyY2xlJyxcblx0J2NvbCcsXG5cdCdkZWZzJyxcblx0J2VsbGlwc2UnLFxuXHQnZW1iZWQnLFxuXHQnZmlndXJlJyxcblx0J2cnLFxuXHQnaHInLFxuXHQnaWZyYW1lJyxcblx0J2ltZycsXG5cdCdpbnB1dCcsXG5cdCdsaW5lJyxcblx0J2xpbmsnLFxuXHQnbWFzaycsXG5cdCdtZXRhJyxcblx0J29iamVjdCcsXG5cdCdwYXJhbScsXG5cdCdwYXRoJyxcblx0J3BhdHRlcm4nLFxuXHQncGljdHVyZScsXG5cdCdwb2x5Z29uJyxcblx0J3BvbHlsaW5lJyxcblx0J3JlY3QnLFxuXHQnc291cmNlJyxcblx0J3N0b3AnLFxuXHQnc3ZnJyxcblx0J3RkJyxcblx0J3RoJyxcblx0J3RyYWNrJyxcblx0J3VzZScsXG5cdCd2aWRlbycsXG5cdCd3YnInXG5dKTtcblxuLy8gQXR0cmlidXRlcyB0byBrZWVwXG5jb25zdCBBTExPV0VEX0FUVFJJQlVURVMgPSBuZXcgU2V0KFtcblx0J2FsdCcsXG5cdCdhbGxvdycsXG5cdCdhbGxvd2Z1bGxzY3JlZW4nLFxuXHQnYXJpYS1sYWJlbCcsXG5cdCdjaGVja2VkJyxcblx0J2NvbHNwYW4nLFxuXHQnY29udHJvbHMnLFxuXHQnZGF0YS1zcmMnLFxuXHQnZGF0YS1zcmNzZXQnLFxuXHQnZGF0YS1sYW5nJyxcblx0J2RpcicsXG5cdCdmcmFtZWJvcmRlcicsXG5cdCdoZWFkZXJzJyxcblx0J2hlaWdodCcsXG5cdCdocmVmJyxcblx0J2xhbmcnLFxuXHQncm9sZScsXG5cdCdyb3dzcGFuJyxcblx0J3NyYycsXG5cdCdzcmNzZXQnLFxuXHQndGl0bGUnLFxuXHQndHlwZScsXG5cdCd3aWR0aCdcbl0pO1xuY29uc3QgQUxMT1dFRF9BVFRSSUJVVEVTX0RFQlVHID0gbmV3IFNldChbXG5cdCdjbGFzcycsXG5cdCdpZCcsXG5dKTtcblxuLy8gU3VwcG9ydGVkIGxhbmd1YWdlcyBmb3IgY29kZSBibG9ja3NcbmNvbnN0IFNVUFBPUlRFRF9MQU5HVUFHRVMgPSBuZXcgU2V0KFtcblx0Ly8gTWFya3VwICYgV2ViXG5cdCdtYXJrdXAnLCAnaHRtbCcsICd4bWwnLCAnc3ZnJywgJ21hdGhtbCcsICdzc21sJywgJ2F0b20nLCAncnNzJyxcblx0J2phdmFzY3JpcHQnLCAnanMnLCAnanN4JywgJ3R5cGVzY3JpcHQnLCAndHMnLCAndHN4Jyxcblx0J3dlYmFzc2VtYmx5JywgJ3dhc20nLFxuXHRcblx0Ly8gQ29tbW9uIFByb2dyYW1taW5nIExhbmd1YWdlc1xuXHQncHl0aG9uJyxcblx0J2phdmEnLFxuXHQnY3NoYXJwJywgJ2NzJywgJ2RvdG5ldCcsICdhc3BuZXQnLFxuXHQnY3BwJywgJ2MrKycsICdjJywgJ29iamMnLFxuXHQncnVieScsICdyYicsXG5cdCdwaHAnLFxuXHQnZ29sYW5nJyxcblx0J3J1c3QnLFxuXHQnc3dpZnQnLFxuXHQna290bGluJyxcblx0J3NjYWxhJyxcblx0J2RhcnQnLFxuXHRcblx0Ly8gU2hlbGwgJiBTY3JpcHRpbmdcblx0J2Jhc2gnLCAnc2hlbGwnLCAnc2gnLFxuXHQncG93ZXJzaGVsbCcsXG5cdCdiYXRjaCcsXG5cdFxuXHQvLyBEYXRhICYgQ29uZmlnXG5cdCdqc29uJywgJ2pzb25wJyxcblx0J3lhbWwnLCAneW1sJyxcblx0J3RvbWwnLFxuXHQnZG9ja2VyZmlsZScsXG5cdCdnaXRpZ25vcmUnLFxuXHRcblx0Ly8gUXVlcnkgTGFuZ3VhZ2VzXG5cdCdzcWwnLCAnbXlzcWwnLCAncG9zdGdyZXNxbCcsXG5cdCdncmFwaHFsJyxcblx0J21vbmdvZGInLFxuXHQnc3BhcnFsJyxcblx0XG5cdC8vIE1hcmt1cCAmIERvY3VtZW50YXRpb25cblx0J21hcmtkb3duJywgJ21kJyxcblx0J2xhdGV4JywgJ3RleCcsXG5cdCdhc2NpaWRvYycsICdhZG9jJyxcblx0J2pzZG9jJyxcblx0XG5cdC8vIEZ1bmN0aW9uYWwgTGFuZ3VhZ2VzXG5cdCdoYXNrZWxsJywgJ2hzJyxcblx0J2VsbScsXG5cdCdlbGl4aXInLFxuXHQnZXJsYW5nJyxcblx0J29jYW1sJyxcblx0J2ZzaGFycCcsXG5cdCdzY2hlbWUnLFxuXHQnbGlzcCcsICdlbGlzcCcsXG5cdCdjbG9qdXJlJyxcblx0XG5cdC8vIE90aGVyIExhbmd1YWdlc1xuXHQnbWF0bGFiJyxcblx0J2ZvcnRyYW4nLFxuXHQnY29ib2wnLFxuXHQncGFzY2FsJyxcblx0J3BlcmwnLFxuXHQnbHVhJyxcblx0J2p1bGlhJyxcblx0J2dyb292eScsXG5cdCdjcnlzdGFsJyxcblx0J25pbScsXG5cdCd6aWcnLFxuXHRcblx0Ly8gRG9tYWluIFNwZWNpZmljXG5cdCdyZWdleCcsXG5cdCdncmFkbGUnLFxuXHQnY21ha2UnLFxuXHQnbWFrZWZpbGUnLFxuXHQnbml4Jyxcblx0J3RlcnJhZm9ybScsXG5cdCdzb2xpZGl0eScsXG5cdCdnbHNsJyxcblx0J2hsc2wnLFxuXHRcblx0Ly8gQXNzZW1ibHlcblx0J25hc20nLFxuXHQnbWFzbScsXG5cdCdhcm1hc20nLFxuXHRcblx0Ly8gR2FtZSBEZXZlbG9wbWVudFxuXHQnZ2RzY3JpcHQnLFxuXHQndW5yZWFsc2NyaXB0Jyxcblx0XG5cdC8vIE90aGVyc1xuXHQnYWJhcCcsXG5cdCdhY3Rpb25zY3JpcHQnLFxuXHQnYWRhJyxcblx0J2FnZGEnLFxuXHQnYW50bHI0Jyxcblx0J2FwcGxlc2NyaXB0Jyxcblx0J2FyZHVpbm8nLFxuXHQnY29mZmVlc2NyaXB0Jyxcblx0J2RqYW5nbycsXG5cdCdlcmxhbmcnLFxuXHQnZm9ydHJhbicsXG5cdCdoYXhlJyxcblx0J2lkcmlzJyxcblx0J2tvdGxpbicsXG5cdCdsaXZlc2NyaXB0Jyxcblx0J21hdGxhYicsXG5cdCduZ2lueCcsXG5cdCdwYXNjYWwnLFxuXHQncHJvbG9nJyxcblx0J3B1cHBldCcsXG5cdCdzY2FsYScsXG5cdCdzY2hlbWUnLFxuXHQndGNsJyxcblx0J3Zlcmlsb2cnLFxuXHQndmhkbCdcbl0pO1xuXG5cbi8vIEVsZW1lbnQgc3RhbmRhcmRpemF0aW9uIHJ1bGVzXG4vLyBNYXBzIHNlbGVjdG9ycyB0byB0aGVpciB0YXJnZXQgSFRNTCBlbGVtZW50IG5hbWVcbmludGVyZmFjZSBTdGFuZGFyZGl6YXRpb25SdWxlIHtcblx0c2VsZWN0b3I6IHN0cmluZztcblx0ZWxlbWVudDogc3RyaW5nO1xuXHR0cmFuc2Zvcm0/OiAoZWw6IEVsZW1lbnQpID0+IEVsZW1lbnQ7XG59XG5cbmNvbnN0IEVMRU1FTlRfU1RBTkRBUkRJWkFUSU9OX1JVTEVTOiBTdGFuZGFyZGl6YXRpb25SdWxlW10gPSBbXG5cdC8vIENvZGUgYmxvY2tzXG5cdHtcblx0XHRzZWxlY3RvcjogJ3ByZScsXG5cdFx0ZWxlbWVudDogJ3ByZScsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm4gZWw7XG5cblx0XHRcdC8vIEZ1bmN0aW9uIHRvIGdldCBsYW5ndWFnZSBmcm9tIGNsYXNzXG5cdFx0XHRjb25zdCBnZXRMYW5ndWFnZUZyb21DbGFzcyA9IChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyA9PiB7XG5cdFx0XHRcdC8vIENoZWNrIGRhdGEtbGFuZyBhdHRyaWJ1dGUgZmlyc3Rcblx0XHRcdFx0Y29uc3QgZGF0YUxhbmcgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1sYW5nJyk7XG5cdFx0XHRcdGlmIChkYXRhTGFuZykge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhTGFuZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRGVmaW5lIGxhbmd1YWdlIHBhdHRlcm5zXG5cdFx0XHRcdGNvbnN0IGxhbmd1YWdlUGF0dGVybnMgPSBbXG5cdFx0XHRcdFx0L15sYW5ndWFnZS0oXFx3KykkLywgICAgICAgICAgLy8gbGFuZ3VhZ2UtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9ebGFuZy0oXFx3KykkLywgICAgICAgICAgICAgIC8vIGxhbmctamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9eKFxcdyspLWNvZGUkLywgICAgICAgICAgICAgIC8vIGphdmFzY3JpcHQtY29kZVxuXHRcdFx0XHRcdC9eY29kZS0oXFx3KykkLywgICAgICAgICAgICAgIC8vIGNvZGUtamF2YXNjcmlwdFxuXHRcdFx0XHRcdC9ec3ludGF4LShcXHcrKSQvLCAgICAgICAgICAgIC8vIHN5bnRheC1qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15jb2RlLXNuaXBwZXRfXyhcXHcrKSQvLCAgICAgLy8gY29kZS1zbmlwcGV0X19qYXZhc2NyaXB0XG5cdFx0XHRcdFx0L15oaWdobGlnaHQtKFxcdyspJC8sICAgICAgICAgLy8gaGlnaGxpZ2h0LWphdmFzY3JpcHRcblx0XHRcdFx0XHQvXihcXHcrKS1zbmlwcGV0JC8gICAgICAgICAgICAvLyBqYXZhc2NyaXB0LXNuaXBwZXRcblx0XHRcdFx0XTtcblxuXHRcdFx0XHQvLyBUaGVuIGNoZWNrIHRoZSBjbGFzcyBhdHRyaWJ1dGUgZm9yIHBhdHRlcm5zXG5cdFx0XHRcdGlmIChlbGVtZW50LmNsYXNzTmFtZSAmJiB0eXBlb2YgZWxlbWVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIGxhbmd1YWdlUGF0dGVybnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKS5tYXRjaChwYXR0ZXJuKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gVGhlbiBjaGVjayBmb3Igc3VwcG9ydGVkIGxhbmd1YWdlXG5cdFx0XHRcdFx0aWYgKFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBjbGFzc05hbWVzID0gQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRmb3IgKGNvbnN0IGNsYXNzTmFtZSBvZiBjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgcGF0dGVybnMgZmlyc3Rcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHBhdHRlcm4gb2YgbGFuZ3VhZ2VQYXR0ZXJucykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBjbGFzc05hbWUubWF0Y2gocGF0dGVybik7XG5cdFx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gT25seSBjaGVjayBiYXJlIGxhbmd1YWdlIG5hbWVzIGlmIG5vIHBhdHRlcm5zIHdlcmUgZm91bmRcblx0XHRcdFx0Zm9yIChjb25zdCBjbGFzc05hbWUgb2YgY2xhc3NOYW1lcykge1xuXHRcdFx0XHRcdGlmIChTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhjbGFzc05hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBUcnkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBmcm9tIHRoZSBlbGVtZW50IGFuZCBpdHMgYW5jZXN0b3JzXG5cdFx0XHRsZXQgbGFuZ3VhZ2UgPSAnJztcblx0XHRcdGxldCBjdXJyZW50RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZWw7XG5cdFx0XHRcblx0XHRcdHdoaWxlIChjdXJyZW50RWxlbWVudCAmJiAhbGFuZ3VhZ2UpIHtcblx0XHRcdFx0bGFuZ3VhZ2UgPSBnZXRMYW5ndWFnZUZyb21DbGFzcyhjdXJyZW50RWxlbWVudCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBBbHNvIGNoZWNrIGZvciBjb2RlIGVsZW1lbnRzIHdpdGhpbiB0aGUgY3VycmVudCBlbGVtZW50XG5cdFx0XHRcdGlmICghbGFuZ3VhZ2UgJiYgY3VycmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignY29kZScpKSB7XG5cdFx0XHRcdFx0bGFuZ3VhZ2UgPSBnZXRMYW5ndWFnZUZyb21DbGFzcyhjdXJyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjb2RlJykhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Y3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGdW5jdGlvbiB0byByZWN1cnNpdmVseSBleHRyYWN0IHRleHQgY29udGVudCB3aGlsZSBwcmVzZXJ2aW5nIHN0cnVjdHVyZVxuXHRcdFx0Y29uc3QgZXh0cmFjdFN0cnVjdHVyZWRUZXh0ID0gKGVsZW1lbnQ6IE5vZGUpOiBzdHJpbmcgPT4ge1xuXHRcdFx0XHRpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0bGV0IHRleHQgPSAnJztcblx0XHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuXHRcdFx0XHRcdC8vIEhhbmRsZSBsaW5lIGJyZWFrc1xuXHRcdFx0XHRcdGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdCUicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnXFxuJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gSGFuZGxlIGNvZGUgZWxlbWVudHMgYW5kIHRoZWlyIGNoaWxkcmVuXG5cdFx0XHRcdFx0ZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuXHRcdFx0XHRcdFx0dGV4dCArPSBleHRyYWN0U3RydWN0dXJlZFRleHQoY2hpbGQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIEFkZCBuZXdsaW5lIGFmdGVyIGVhY2ggY29kZSBlbGVtZW50XG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0NPREUnKSB7XG5cdFx0XHRcdFx0XHR0ZXh0ICs9ICdcXG4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGV4dDtcblx0XHRcdH07XG5cblx0XHRcdC8vIEV4dHJhY3QgYWxsIHRleHQgY29udGVudFxuXHRcdFx0bGV0IGNvZGVDb250ZW50ID0gZXh0cmFjdFN0cnVjdHVyZWRUZXh0KGVsKTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgdGhlIGNvbnRlbnRcblx0XHRcdGNvZGVDb250ZW50ID0gY29kZUNvbnRlbnRcblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSBleHRyYSBuZXdsaW5lcyBhdCB0aGUgc3RhcnRcblx0XHRcdFx0LnJlcGxhY2UoL15cXG4rLywgJycpXG5cdFx0XHRcdC8vIFJlbW92ZSBhbnkgZXh0cmEgbmV3bGluZXMgYXQgdGhlIGVuZFxuXHRcdFx0XHQucmVwbGFjZSgvXFxuKyQvLCAnJylcblx0XHRcdFx0Ly8gUmVwbGFjZSBtdWx0aXBsZSBjb25zZWN1dGl2ZSBuZXdsaW5lcyB3aXRoIGEgc2luZ2xlIG5ld2xpbmVcblx0XHRcdFx0LnJlcGxhY2UoL1xcbnszLH0vZywgJ1xcblxcbicpO1xuXG5cdFx0XHQvLyBDcmVhdGUgbmV3IHByZSBlbGVtZW50XG5cdFx0XHRjb25zdCBuZXdQcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcblx0XHRcdFxuXHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdG5ld1ByZS5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIENyZWF0ZSBjb2RlIGVsZW1lbnRcblx0XHRcdGNvbnN0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG5cdFx0XHRpZiAobGFuZ3VhZ2UpIHtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZycsIGxhbmd1YWdlKTtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYGxhbmd1YWdlLSR7bGFuZ3VhZ2V9YCk7XG5cdFx0XHR9XG5cdFx0XHRjb2RlLnRleHRDb250ZW50ID0gY29kZUNvbnRlbnQ7XG5cdFx0XHRcblx0XHRcdG5ld1ByZS5hcHBlbmRDaGlsZChjb2RlKTtcblx0XHRcdHJldHVybiBuZXdQcmU7XG5cdFx0fVxuXHR9LFxuXHQvLyBTaW1wbGlmeSBoZWFkaW5ncyBieSByZW1vdmluZyBpbnRlcm5hbCBuYXZpZ2F0aW9uIGVsZW1lbnRzXG5cdHtcblx0XHRzZWxlY3RvcjogJ2gxLCBoMiwgaDMsIGg0LCBoNSwgaDYnLFxuXHRcdGVsZW1lbnQ6ICdrZWVwJyxcblx0XHR0cmFuc2Zvcm06IChlbDogRWxlbWVudCk6IEVsZW1lbnQgPT4ge1xuXHRcdFx0Ly8gSWYgaGVhZGluZyBvbmx5IGNvbnRhaW5zIGEgc2luZ2xlIGFuY2hvciB3aXRoIGludGVybmFsIGxpbmtcblx0XHRcdGlmIChlbC5jaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgXG5cdFx0XHRcdGVsLmZpcnN0RWxlbWVudENoaWxkPy50YWdOYW1lID09PSAnQScgJiZcblx0XHRcdFx0KGVsLmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpPy5pbmNsdWRlcygnIycpIHx8IFxuXHRcdFx0XHQgZWwuZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJyk/LnN0YXJ0c1dpdGgoJyMnKSkpIHtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENyZWF0ZSBuZXcgaGVhZGluZyBvZiBzYW1lIGxldmVsXG5cdFx0XHRcdGNvbnN0IG5ld0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsLnRhZ05hbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXMgZnJvbSBvcmlnaW5hbCBoZWFkaW5nXG5cdFx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0XHRpZiAoQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0XHRuZXdIZWFkaW5nLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBKdXN0IHVzZSB0aGUgdGV4dCBjb250ZW50XG5cdFx0XHRcdG5ld0hlYWRpbmcudGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIG5ld0hlYWRpbmc7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vIElmIGhlYWRpbmcgY29udGFpbnMgbmF2aWdhdGlvbiBidXR0b25zIG9yIG90aGVyIHV0aWxpdHkgZWxlbWVudHNcblx0XHRcdGNvbnN0IGJ1dHRvbnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblx0XHRcdGlmIChidXR0b25zLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3QgbmV3SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwudGFnTmFtZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBDb3B5IGFsbG93ZWQgYXR0cmlidXRlc1xuXHRcdFx0XHRBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdFx0bmV3SGVhZGluZy5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gSnVzdCB1c2UgdGhlIHRleHQgY29udGVudFxuXHRcdFx0XHRuZXdIZWFkaW5nLnRleHRDb250ZW50ID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBuZXdIZWFkaW5nO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fVxuXHR9LFxuXHQvLyBDb252ZXJ0IGRpdnMgd2l0aCBwYXJhZ3JhcGggcm9sZSB0byBhY3R1YWwgcGFyYWdyYXBoc1xuXHR7IFxuXHRcdHNlbGVjdG9yOiAnZGl2W2RhdGEtdGVzdGlkXj1cInBhcmFncmFwaFwiXSwgZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nLCBcblx0XHRlbGVtZW50OiAncCcsXG5cdFx0dHJhbnNmb3JtOiAoZWw6IEVsZW1lbnQpOiBFbGVtZW50ID0+IHtcblx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcblx0XHRcdC8vIENvcHkgaW5uZXJIVE1MXG5cdFx0XHRwLmlubmVySFRNTCA9IGVsLmlubmVySFRNTDtcblx0XHRcdFxuXHRcdFx0Ly8gQ29weSBhbGxvd2VkIGF0dHJpYnV0ZXNcblx0XHRcdEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ci5uYW1lKSkge1xuXHRcdFx0XHRcdHAuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gcDtcblx0XHR9XG5cdH0sXG5cdC8vIENvbnZlcnQgZGl2cyB3aXRoIGxpc3Qgcm9sZXMgdG8gYWN0dWFsIGxpc3RzXG5cdHsgXG5cdFx0c2VsZWN0b3I6ICdkaXZbcm9sZT1cImxpc3RcIl0nLCBcblx0XHRlbGVtZW50OiAndWwnLFxuXHRcdC8vIEN1c3RvbSBoYW5kbGVyIGZvciBsaXN0IHR5cGUgZGV0ZWN0aW9uIGFuZCB0cmFuc2Zvcm1hdGlvblxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHQvLyBGaXJzdCBkZXRlcm1pbmUgaWYgdGhpcyBpcyBhbiBvcmRlcmVkIGxpc3Rcblx0XHRcdGNvbnN0IGZpcnN0SXRlbSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0gLmxhYmVsJyk7XG5cdFx0XHRjb25zdCBsYWJlbCA9IGZpcnN0SXRlbT8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdGNvbnN0IGlzT3JkZXJlZCA9IGxhYmVsLm1hdGNoKC9eXFxkK1xcKS8pO1xuXHRcdFx0XG5cdFx0XHQvLyBDcmVhdGUgdGhlIGFwcHJvcHJpYXRlIGxpc3QgdHlwZVxuXHRcdFx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXNPcmRlcmVkID8gJ29sJyA6ICd1bCcpO1xuXHRcdFx0XG5cdFx0XHQvLyBQcm9jZXNzIGVhY2ggbGlzdCBpdGVtXG5cdFx0XHRjb25zdCBpdGVtcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0nKTtcblx0XHRcdGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRcdGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRcdFx0Y29uc3QgY29udGVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChjb250ZW50KSB7XG5cdFx0XHRcdFx0Ly8gQ29udmVydCBhbnkgcGFyYWdyYXBoIGRpdnMgaW5zaWRlIGNvbnRlbnRcblx0XHRcdFx0XHRjb25zdCBwYXJhZ3JhcGhEaXZzID0gY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cInBhcmFncmFwaFwiXScpO1xuXHRcdFx0XHRcdHBhcmFncmFwaERpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0XHRcdHAuaW5uZXJIVE1MID0gZGl2LmlubmVySFRNTDtcblx0XHRcdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChwKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvLyBDb252ZXJ0IGFueSBuZXN0ZWQgbGlzdHMgcmVjdXJzaXZlbHlcblx0XHRcdFx0XHRjb25zdCBuZXN0ZWRMaXN0cyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJsaXN0XCJdJyk7XG5cdFx0XHRcdFx0bmVzdGVkTGlzdHMuZm9yRWFjaChuZXN0ZWRMaXN0ID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGZpcnN0TmVzdGVkSXRlbSA9IG5lc3RlZExpc3QucXVlcnlTZWxlY3RvcignZGl2W3JvbGU9XCJsaXN0aXRlbVwiXSAubGFiZWwnKTtcblx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZExhYmVsID0gZmlyc3ROZXN0ZWRJdGVtPy50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXHRcdFx0XHRcdFx0Y29uc3QgaXNOZXN0ZWRPcmRlcmVkID0gbmVzdGVkTGFiZWwubWF0Y2goL15cXGQrXFwpLyk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGNvbnN0IG5ld05lc3RlZExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGlzTmVzdGVkT3JkZXJlZCA/ICdvbCcgOiAndWwnKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gUHJvY2VzcyBuZXN0ZWQgaXRlbXNcblx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZEl0ZW1zID0gbmVzdGVkTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRcdFx0XHRuZXN0ZWRJdGVtcy5mb3JFYWNoKG5lc3RlZEl0ZW0gPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBuZXN0ZWRMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG5lc3RlZENvbnRlbnQgPSBuZXN0ZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRpZiAobmVzdGVkQ29udGVudCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIENvbnZlcnQgcGFyYWdyYXBoIGRpdnMgaW4gbmVzdGVkIGl0ZW1zXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmVzdGVkUGFyYWdyYXBocyA9IG5lc3RlZENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nKTtcblx0XHRcdFx0XHRcdFx0XHRuZXN0ZWRQYXJhZ3JhcGhzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRwLmlubmVySFRNTCA9IGRpdi5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgocCk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0bmVzdGVkTGkuaW5uZXJIVE1MID0gbmVzdGVkQ29udGVudC5pbm5lckhUTUw7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdG5ld05lc3RlZExpc3QuYXBwZW5kQ2hpbGQobmVzdGVkTGkpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdG5lc3RlZExpc3QucmVwbGFjZVdpdGgobmV3TmVzdGVkTGlzdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0bGkuaW5uZXJIVE1MID0gY29udGVudC5pbm5lckhUTUw7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiBsaXN0O1xuXHRcdH1cblx0fSxcblx0eyBcblx0XHRzZWxlY3RvcjogJ2Rpdltyb2xlPVwibGlzdGl0ZW1cIl0nLCBcblx0XHRlbGVtZW50OiAnbGknLFxuXHRcdC8vIEN1c3RvbSBoYW5kbGVyIGZvciBsaXN0IGl0ZW0gY29udGVudFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRjb25zdCBjb250ZW50ID0gZWwucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblx0XHRcdGlmICghY29udGVudCkgcmV0dXJuIGVsO1xuXHRcdFx0XG5cdFx0XHQvLyBDb252ZXJ0IGFueSBwYXJhZ3JhcGggZGl2cyBpbnNpZGUgY29udGVudFxuXHRcdFx0Y29uc3QgcGFyYWdyYXBoRGl2cyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W3JvbGU9XCJwYXJhZ3JhcGhcIl0nKTtcblx0XHRcdHBhcmFncmFwaERpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRwLmlubmVySFRNTCA9IGRpdi5pbm5lckhUTUw7XG5cdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChwKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHR9XG5cdH0sXG5cdC8vIENvZGUgYmxvY2tzIHdpdGggc3ludGF4IGhpZ2hsaWdodGluZ1xuXHR7XG5cdFx0c2VsZWN0b3I6ICcud3AtYmxvY2stc3ludGF4aGlnaGxpZ2h0ZXItY29kZSwgLnN5bnRheGhpZ2hsaWdodGVyLCAuaGlnaGxpZ2h0LCAuaGlnaGxpZ2h0LXNvdXJjZSwgLndwLWJsb2NrLWNvZGUsIHByZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIHByZVtjbGFzcyo9XCJicnVzaDpcIl0nLFxuXHRcdGVsZW1lbnQ6ICdwcmUnLFxuXHRcdHRyYW5zZm9ybTogKGVsOiBFbGVtZW50KTogRWxlbWVudCA9PiB7XG5cdFx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuIGVsO1xuXG5cdFx0XHQvLyBDcmVhdGUgbmV3IHByZSBlbGVtZW50XG5cdFx0XHRjb25zdCBuZXdQcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcblx0XHRcdFxuXHRcdFx0Ly8gVHJ5IHRvIGRldGVjdCBsYW5ndWFnZVxuXHRcdFx0bGV0IGxhbmd1YWdlID0gJyc7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGZvciBXb3JkUHJlc3Mgc3ludGF4IGhpZ2hsaWdodGVyIHNwZWNpZmljIGZvcm1hdFxuXHRcdFx0Y29uc3Qgc3ludGF4RWwgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc3ludGF4aGlnaGxpZ2h0ZXInKTtcblx0XHRcdGlmIChzeW50YXhFbCkge1xuXHRcdFx0XHQvLyBHZXQgbGFuZ3VhZ2UgZnJvbSBzeW50YXhoaWdobGlnaHRlciBjbGFzc1xuXHRcdFx0XHRjb25zdCBjbGFzc2VzID0gQXJyYXkuZnJvbShzeW50YXhFbC5jbGFzc0xpc3QpO1xuXHRcdFx0XHRjb25zdCBsYW5nQ2xhc3MgPSBjbGFzc2VzLmZpbmQoYyA9PiAhWydzeW50YXhoaWdobGlnaHRlcicsICdub2d1dHRlciddLmluY2x1ZGVzKGMpKTtcblx0XHRcdFx0aWYgKGxhbmdDbGFzcyAmJiBTVVBQT1JURURfTEFOR1VBR0VTLmhhcyhsYW5nQ2xhc3MudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRsYW5ndWFnZSA9IGxhbmdDbGFzcy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIG5vIGxhbmd1YWdlIGZvdW5kIHlldCwgY2hlY2sgb3RoZXIgY29tbW9uIHBhdHRlcm5zXG5cdFx0XHRpZiAoIWxhbmd1YWdlKSB7XG5cdFx0XHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBBcnJheS5mcm9tKGVsLmNsYXNzTGlzdCk7XG5cdFx0XHRcdGNvbnN0IGxhbmd1YWdlUGF0dGVybnMgPSBbXG5cdFx0XHRcdFx0Lyg/Ol58XFxzKSg/Omxhbmd1YWdlfGxhbmd8YnJ1c2h8c3ludGF4KS0oXFx3KykoPzpcXHN8JCkvaSxcblx0XHRcdFx0XHQvKD86XnxcXHMpKFxcdyspKD86XFxzfCQpL2lcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IGNsYXNzTmFtZSBvZiBjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBwYXR0ZXJuIG9mIGxhbmd1YWdlUGF0dGVybnMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1hdGNoID0gY2xhc3NOYW1lLm1hdGNoKHBhdHRlcm4pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoICYmIG1hdGNoWzFdICYmIFNVUFBPUlRFRF9MQU5HVUFHRVMuaGFzKG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChsYW5ndWFnZSkgYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRXh0cmFjdCBjb2RlIGNvbnRlbnQsIGhhbmRsaW5nIHZhcmlvdXMgZm9ybWF0c1xuXHRcdFx0bGV0IGNvZGVDb250ZW50ID0gJyc7XG5cblx0XHRcdC8vIEhhbmRsZSBXb3JkUHJlc3Mgc3ludGF4IGhpZ2hsaWdodGVyIHRhYmxlIGZvcm1hdFxuXHRcdFx0Y29uc3QgY29kZUNvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zeW50YXhoaWdobGlnaHRlciB0YWJsZSAuY29kZSAuY29udGFpbmVyJyk7XG5cdFx0XHRpZiAoY29kZUNvbnRhaW5lcikge1xuXHRcdFx0XHQvLyBQcm9jZXNzIGVhY2ggbGluZVxuXHRcdFx0XHRjb25zdCBsaW5lcyA9IEFycmF5LmZyb20oY29kZUNvbnRhaW5lci5jaGlsZHJlbik7XG5cdFx0XHRcdGNvZGVDb250ZW50ID0gbGluZXNcblx0XHRcdFx0XHQubWFwKGxpbmUgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gR2V0IGFsbCBjb2RlIGVsZW1lbnRzIGluIHRoaXMgbGluZVxuXHRcdFx0XHRcdFx0Y29uc3QgY29kZVBhcnRzID0gQXJyYXkuZnJvbShsaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvZGUnKSlcblx0XHRcdFx0XHRcdFx0Lm1hcChjb2RlID0+IHtcblx0XHRcdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHRleHQgY29udGVudCwgcHJlc2VydmluZyBzcGFjZXNcblx0XHRcdFx0XHRcdFx0XHRsZXQgdGV4dCA9IGNvZGUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhpcyBpcyBhICdzcGFjZXMnIGNsYXNzIGVsZW1lbnQsIGNvbnZlcnQgdG8gYWN0dWFsIHNwYWNlc1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjb2RlLmNsYXNzTGlzdC5jb250YWlucygnc3BhY2VzJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRleHQgPSAnICcucmVwZWF0KHRleHQubGVuZ3RoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5qb2luKCcnKTtcblx0XHRcdFx0XHRcdHJldHVybiBjb2RlUGFydHMgfHwgbGluZS50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEhhbmRsZSBXb3JkUHJlc3Mgc3ludGF4IGhpZ2hsaWdodGVyIG5vbi10YWJsZSBmb3JtYXRcblx0XHRcdFx0Y29uc3QgY29kZUxpbmVzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLmNvZGUgLmxpbmUnKTtcblx0XHRcdFx0aWYgKGNvZGVMaW5lcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Y29kZUNvbnRlbnQgPSBBcnJheS5mcm9tKGNvZGVMaW5lcylcblx0XHRcdFx0XHRcdC5tYXAobGluZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGNvZGVQYXJ0cyA9IEFycmF5LmZyb20obGluZS5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlJykpXG5cdFx0XHRcdFx0XHRcdFx0Lm1hcChjb2RlID0+IGNvZGUudGV4dENvbnRlbnQgfHwgJycpXG5cdFx0XHRcdFx0XHRcdFx0LmpvaW4oJycpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29kZVBhcnRzIHx8IGxpbmUudGV4dENvbnRlbnQgfHwgJyc7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEZhbGxiYWNrIHRvIHJlZ3VsYXIgdGV4dCBjb250ZW50XG5cdFx0XHRcdFx0Y29kZUNvbnRlbnQgPSBlbC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBDbGVhbiB1cCB0aGUgY29udGVudFxuXHRcdFx0Y29kZUNvbnRlbnQgPSBjb2RlQ29udGVudFxuXHRcdFx0XHQucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpIC8vIFRyaW0gc3RhcnQvZW5kIHdoaXRlc3BhY2Vcblx0XHRcdFx0LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpIC8vIENvbnZlcnQgdGFicyB0byBzcGFjZXNcblx0XHRcdFx0LnJlcGxhY2UoL1xcbnszLH0vZywgJ1xcblxcbicpIC8vIE5vcm1hbGl6ZSBtdWx0aXBsZSBuZXdsaW5lc1xuXHRcdFx0XHQucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpOyAvLyBSZXBsYWNlIG5vbi1icmVha2luZyBzcGFjZXMgd2l0aCByZWd1bGFyIHNwYWNlc1xuXG5cdFx0XHQvLyBDcmVhdGUgY29kZSBlbGVtZW50IHdpdGggbGFuZ3VhZ2UgY2xhc3MgaWYgZGV0ZWN0ZWRcblx0XHRcdGNvbnN0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG5cdFx0XHRpZiAobGFuZ3VhZ2UpIHtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGFuZycsIGxhbmd1YWdlKTtcblx0XHRcdFx0Y29kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYGxhbmd1YWdlLSR7bGFuZ3VhZ2V9YCk7XG5cdFx0XHR9XG5cdFx0XHRjb2RlLnRleHRDb250ZW50ID0gY29kZUNvbnRlbnQ7XG5cdFx0XHRcblx0XHRcdG5ld1ByZS5hcHBlbmRDaGlsZChjb2RlKTtcblx0XHRcdHJldHVybiBuZXdQcmU7XG5cdFx0fVxuXHR9XG5dO1xuXG5pbnRlcmZhY2UgRm9vdG5vdGVEYXRhIHtcblx0Y29udGVudDogRWxlbWVudCB8IHN0cmluZztcblx0b3JpZ2luYWxJZDogc3RyaW5nO1xuXHRyZWZzOiBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIEZvb3Rub3RlQ29sbGVjdGlvbiB7XG5cdFtmb290bm90ZU51bWJlcjogbnVtYmVyXTogRm9vdG5vdGVEYXRhO1xufVxuXG5pbnRlcmZhY2UgQ29udGVudFNjb3JlIHtcblx0c2NvcmU6IG51bWJlcjtcblx0ZWxlbWVudDogRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIFN0eWxlQ2hhbmdlIHtcblx0c2VsZWN0b3I6IHN0cmluZztcblx0c3R5bGVzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZ1ZGRsZSB7XG5cdHByaXZhdGUgZG9jOiBEb2N1bWVudDtcblx0cHJpdmF0ZSBvcHRpb25zOiBEZWZ1ZGRsZU9wdGlvbnM7XG5cdHByaXZhdGUgZGVidWc6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBEZWZ1ZGRsZSBpbnN0YW5jZVxuXHQgKiBAcGFyYW0gZG9jIC0gVGhlIGRvY3VtZW50IHRvIHBhcnNlXG5cdCAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgcGFyc2luZ1xuXHQgKi9cblx0Y29uc3RydWN0b3IoZG9jOiBEb2N1bWVudCwgb3B0aW9uczogRGVmdWRkbGVPcHRpb25zID0ge30pIHtcblx0XHR0aGlzLmRvYyA9IGRvYztcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuZGVidWcgPSBvcHRpb25zLmRlYnVnIHx8IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIHRoZSBkb2N1bWVudCBhbmQgZXh0cmFjdCBpdHMgbWFpbiBjb250ZW50XG5cdCAqL1xuXHRwYXJzZSgpOiBEZWZ1ZGRsZVJlc3BvbnNlIHtcblx0XHRjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuXHRcdC8vIEV4dHJhY3QgbWV0YWRhdGEgZmlyc3Qgc2luY2Ugd2UnbGwgbmVlZCBpdCBpbiBtdWx0aXBsZSBwbGFjZXNcblx0XHRjb25zdCBzY2hlbWFPcmdEYXRhID0gTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdFNjaGVtYU9yZ0RhdGEodGhpcy5kb2MpO1xuXHRcdGNvbnN0IG1ldGFkYXRhID0gTWV0YWRhdGFFeHRyYWN0b3IuZXh0cmFjdCh0aGlzLmRvYywgc2NoZW1hT3JnRGF0YSk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gRXZhbHVhdGUgc3R5bGVzIGFuZCBzaXplcyBvbiBvcmlnaW5hbCBkb2N1bWVudFxuXHRcdFx0Y29uc3QgbW9iaWxlU3R5bGVzID0gdGhpcy5fZXZhbHVhdGVNZWRpYVF1ZXJpZXModGhpcy5kb2MpO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBmb3Igc21hbGwgaW1hZ2VzIGluIG9yaWdpbmFsIGRvY3VtZW50LCBleGNsdWRpbmcgbGF6eS1sb2FkZWQgb25lc1xuXHRcdFx0Y29uc3Qgc21hbGxJbWFnZXMgPSB0aGlzLmZpbmRTbWFsbEltYWdlcyh0aGlzLmRvYyk7XG5cdFx0XHRcblx0XHRcdC8vIENsb25lIGRvY3VtZW50XG5cdFx0XHRjb25zdCBjbG9uZSA9IHRoaXMuZG9jLmNsb25lTm9kZSh0cnVlKSBhcyBEb2N1bWVudDtcblx0XHRcdFxuXHRcdFx0Ly8gQXBwbHkgbW9iaWxlIHN0eWxlIHRvIGNsb25lXG5cdFx0XHR0aGlzLmFwcGx5TW9iaWxlU3R5bGVzKGNsb25lLCBtb2JpbGVTdHlsZXMpO1xuXG5cdFx0XHQvLyBGaW5kIG1haW4gY29udGVudFxuXHRcdFx0Y29uc3QgbWFpbkNvbnRlbnQgPSB0aGlzLmZpbmRNYWluQ29udGVudChjbG9uZSk7XG5cdFx0XHRpZiAoIW1haW5Db250ZW50KSB7XG5cdFx0XHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRjb250ZW50OiB0aGlzLmRvYy5ib2R5LmlubmVySFRNTCxcblx0XHRcdFx0XHQuLi5tZXRhZGF0YSxcblx0XHRcdFx0XHR3b3JkQ291bnQ6IHRoaXMuY291bnRXb3Jkcyh0aGlzLmRvYy5ib2R5LmlubmVySFRNTCksXG5cdFx0XHRcdFx0cGFyc2VUaW1lOiBNYXRoLnJvdW5kKGVuZFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBzbWFsbCBpbWFnZXMgaWRlbnRpZmllZCBmcm9tIG9yaWdpbmFsIGRvY3VtZW50XG5cdFx0XHR0aGlzLnJlbW92ZVNtYWxsSW1hZ2VzKGNsb25lLCBzbWFsbEltYWdlcyk7XG5cdFx0XHRcblx0XHRcdC8vIFBlcmZvcm0gb3RoZXIgZGVzdHJ1Y3RpdmUgb3BlcmF0aW9ucyBvbiB0aGUgY2xvbmVcblx0XHRcdHRoaXMucmVtb3ZlSGlkZGVuRWxlbWVudHMoY2xvbmUpO1xuXHRcdFx0dGhpcy5yZW1vdmVDbHV0dGVyKGNsb25lKTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgdGhlIG1haW4gY29udGVudFxuXHRcdFx0dGhpcy5jbGVhbkNvbnRlbnQobWFpbkNvbnRlbnQsIG1ldGFkYXRhKTtcblxuXHRcdFx0Y29uc3QgY29udGVudCA9IG1haW5Db250ZW50ID8gbWFpbkNvbnRlbnQub3V0ZXJIVE1MIDogdGhpcy5kb2MuYm9keS5pbm5lckhUTUw7XG5cdFx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvbnRlbnQsXG5cdFx0XHRcdC4uLm1ldGFkYXRhLFxuXHRcdFx0XHR3b3JkQ291bnQ6IHRoaXMuY291bnRXb3Jkcyhjb250ZW50KSxcblx0XHRcdFx0cGFyc2VUaW1lOiBNYXRoLnJvdW5kKGVuZFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZScsICdFcnJvciBwcm9jZXNzaW5nIGRvY3VtZW50OicsIGVycm9yKTtcblx0XHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvbnRlbnQ6IHRoaXMuZG9jLmJvZHkuaW5uZXJIVE1MLFxuXHRcdFx0XHQuLi5tZXRhZGF0YSxcblx0XHRcdFx0d29yZENvdW50OiB0aGlzLmNvdW50V29yZHModGhpcy5kb2MuYm9keS5pbm5lckhUTUwpLFxuXHRcdFx0XHRwYXJzZVRpbWU6IE1hdGgucm91bmQoZW5kVGltZSAtIHN0YXJ0VGltZSlcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBjb3VudFdvcmRzKGNvbnRlbnQ6IHN0cmluZyk6IG51bWJlciB7XG5cdFx0Ly8gQ3JlYXRlIGEgdGVtcG9yYXJ5IGRpdiB0byBwYXJzZSBIVE1MIGNvbnRlbnRcblx0XHRjb25zdCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dGVtcERpdi5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdFx0Ly8gR2V0IHRleHQgY29udGVudCwgcmVtb3ZpbmcgZXh0cmEgd2hpdGVzcGFjZVxuXHRcdGNvbnN0IHRleHQgPSB0ZW1wRGl2LnRleHRDb250ZW50IHx8ICcnO1xuXHRcdGNvbnN0IHdvcmRzID0gdGV4dFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL1xccysvZywgJyAnKSAvLyBSZXBsYWNlIG11bHRpcGxlIHNwYWNlcyB3aXRoIHNpbmdsZSBzcGFjZVxuXHRcdFx0LnNwbGl0KCcgJylcblx0XHRcdC5maWx0ZXIod29yZCA9PiB3b3JkLmxlbmd0aCA+IDApOyAvLyBGaWx0ZXIgb3V0IGVtcHR5IHN0cmluZ3NcblxuXHRcdHJldHVybiB3b3Jkcy5sZW5ndGg7XG5cdH1cblxuXHQvLyBNYWtlIGFsbCBvdGhlciBtZXRob2RzIHByaXZhdGUgYnkgcmVtb3ZpbmcgdGhlIHN0YXRpYyBrZXl3b3JkIGFuZCB1c2luZyBwcml2YXRlXG5cdHByaXZhdGUgX2xvZyguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnRGVmdWRkbGU6JywgLi4uYXJncyk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZXZhbHVhdGVNZWRpYVF1ZXJpZXMoZG9jOiBEb2N1bWVudCk6IFN0eWxlQ2hhbmdlW10ge1xuXHRcdGNvbnN0IG1vYmlsZVN0eWxlczogU3R5bGVDaGFuZ2VbXSA9IFtdO1xuXHRcdGNvbnN0IG1heFdpZHRoUmVnZXggPSAvbWF4LXdpZHRoW146XSo6XFxzKihcXGQrKS87XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gR2V0IGFsbCBzdHlsZXMsIGluY2x1ZGluZyBpbmxpbmUgc3R5bGVzXG5cdFx0XHRjb25zdCBzaGVldHMgPSBBcnJheS5mcm9tKGRvYy5zdHlsZVNoZWV0cykuZmlsdGVyKHNoZWV0ID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBBY2Nlc3MgcnVsZXMgb25jZSB0byBjaGVjayB2YWxpZGl0eVxuXHRcdFx0XHRcdHNoZWV0LmNzc1J1bGVzO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Ly8gRXhwZWN0ZWQgZXJyb3IgZm9yIGNyb3NzLW9yaWdpbiBzdHlsZXNoZWV0c1xuXHRcdFx0XHRcdGlmIChlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGUubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvLyBQcm9jZXNzIGFsbCBzaGVldHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdFx0Y29uc3QgbWVkaWFSdWxlcyA9IHNoZWV0cy5mbGF0TWFwKHNoZWV0ID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXR1cm4gQXJyYXkuZnJvbShzaGVldC5jc3NSdWxlcylcblx0XHRcdFx0XHRcdC5maWx0ZXIoKHJ1bGUpOiBydWxlIGlzIENTU01lZGlhUnVsZSA9PiBcblx0XHRcdFx0XHRcdFx0cnVsZSBpbnN0YW5jZW9mIENTU01lZGlhUnVsZSAmJlxuXHRcdFx0XHRcdFx0XHRydWxlLmNvbmRpdGlvblRleHQuaW5jbHVkZXMoJ21heC13aWR0aCcpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIHN0eWxlc2hlZXQ6JywgZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFByb2Nlc3MgYWxsIG1lZGlhIHJ1bGVzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRcdG1lZGlhUnVsZXMuZm9yRWFjaChydWxlID0+IHtcblx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBydWxlLmNvbmRpdGlvblRleHQubWF0Y2gobWF4V2lkdGhSZWdleCk7XG5cdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdGNvbnN0IG1heFdpZHRoID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChNT0JJTEVfV0lEVEggPD0gbWF4V2lkdGgpIHtcblx0XHRcdFx0XHRcdC8vIEJhdGNoIHByb2Nlc3MgYWxsIHN0eWxlIHJ1bGVzXG5cdFx0XHRcdFx0XHRjb25zdCBzdHlsZVJ1bGVzID0gQXJyYXkuZnJvbShydWxlLmNzc1J1bGVzKVxuXHRcdFx0XHRcdFx0XHQuZmlsdGVyKChyKTogciBpcyBDU1NTdHlsZVJ1bGUgPT4gciBpbnN0YW5jZW9mIENTU1N0eWxlUnVsZSk7XG5cblx0XHRcdFx0XHRcdHN0eWxlUnVsZXMuZm9yRWFjaChjc3NSdWxlID0+IHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRtb2JpbGVTdHlsZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RvcjogY3NzUnVsZS5zZWxlY3RvclRleHQsXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZXM6IGNzc1J1bGUuc3R5bGUuY3NzVGV4dFxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIENTUyBydWxlOicsIGUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdEZWZ1ZGRsZTogRXJyb3IgZXZhbHVhdGluZyBtZWRpYSBxdWVyaWVzOicsIGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb2JpbGVTdHlsZXM7XG5cdH1cblxuXHRwcml2YXRlIGFwcGx5TW9iaWxlU3R5bGVzKGRvYzogRG9jdW1lbnQsIG1vYmlsZVN0eWxlczogU3R5bGVDaGFuZ2VbXSkge1xuXHRcdGxldCBhcHBsaWVkQ291bnQgPSAwO1xuXG5cdFx0bW9iaWxlU3R5bGVzLmZvckVhY2goKHtzZWxlY3Rvciwgc3R5bGVzfSkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRcdGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXG5cdFx0XHRcdFx0XHQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJycpICsgc3R5bGVzXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRhcHBsaWVkQ291bnQrKztcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0RlZnVkZGxlJywgJ0Vycm9yIGFwcGx5aW5nIHN0eWxlcyBmb3Igc2VsZWN0b3I6Jywgc2VsZWN0b3IsIGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUhpZGRlbkVsZW1lbnRzKGRvYzogRG9jdW1lbnQpIHtcblx0XHRsZXQgY291bnQgPSAwO1xuXHRcdGNvbnN0IGVsZW1lbnRzVG9SZW1vdmUgPSBuZXcgU2V0PEVsZW1lbnQ+KCk7XG5cblx0XHQvLyBGaXJzdCBwYXNzOiBHZXQgYWxsIGVsZW1lbnRzIG1hdGNoaW5nIGhpZGRlbiBzZWxlY3RvcnNcblx0XHRjb25zdCBoaWRkZW5FbGVtZW50cyA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKEhJRERFTl9FTEVNRU5UX1NFTEVDVE9SUyk7XG5cdFx0aGlkZGVuRWxlbWVudHMuZm9yRWFjaChlbCA9PiBlbGVtZW50c1RvUmVtb3ZlLmFkZChlbCkpO1xuXHRcdGNvdW50ICs9IGhpZGRlbkVsZW1lbnRzLmxlbmd0aDtcblxuXHRcdC8vIFNlY29uZCBwYXNzOiBVc2UgVHJlZVdhbGtlciBmb3IgZWZmaWNpZW50IHRyYXZlcnNhbFxuXHRcdGNvbnN0IHRyZWVXYWxrZXIgPSBkb2MuY3JlYXRlVHJlZVdhbGtlcihcblx0XHRcdGRvYy5ib2R5LFxuXHRcdFx0Tm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsXG5cdFx0XHR7XG5cdFx0XHRcdGFjY2VwdE5vZGU6IChub2RlOiBFbGVtZW50KSA9PiB7XG5cdFx0XHRcdFx0Ly8gU2tpcCBlbGVtZW50cyBhbHJlYWR5IG1hcmtlZCBmb3IgcmVtb3ZhbFxuXHRcdFx0XHRcdGlmIChlbGVtZW50c1RvUmVtb3ZlLmhhcyhub2RlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX1JFSkVDVDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHQvLyBCYXRjaCBzdHlsZSBjb21wdXRhdGlvbnNcblx0XHRjb25zdCBlbGVtZW50czogRWxlbWVudFtdID0gW107XG5cdFx0bGV0IGN1cnJlbnROb2RlOiBFbGVtZW50IHwgbnVsbDtcblx0XHR3aGlsZSAoY3VycmVudE5vZGUgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkgYXMgRWxlbWVudCkge1xuXHRcdFx0ZWxlbWVudHMucHVzaChjdXJyZW50Tm9kZSk7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvY2VzcyBzdHlsZXMgaW4gYmF0Y2hlcyB0byBtaW5pbWl6ZSBsYXlvdXQgdGhyYXNoaW5nXG5cdFx0Y29uc3QgQkFUQ0hfU0laRSA9IDEwMDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSArPSBCQVRDSF9TSVpFKSB7XG5cdFx0XHRjb25zdCBiYXRjaCA9IGVsZW1lbnRzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcblx0XHRcdFxuXHRcdFx0Ly8gUmVhZCBwaGFzZSAtIGdhdGhlciBhbGwgY29tcHV0ZWRTdHlsZXNcblx0XHRcdGNvbnN0IHN0eWxlcyA9IGJhdGNoLm1hcChlbCA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkpO1xuXHRcdFx0XG5cdFx0XHQvLyBXcml0ZSBwaGFzZSAtIG1hcmsgZWxlbWVudHMgZm9yIHJlbW92YWxcblx0XHRcdGJhdGNoLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBzdHlsZXNbaW5kZXhdO1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHxcblx0XHRcdFx0XHRjb21wdXRlZFN0eWxlLnZpc2liaWxpdHkgPT09ICdoaWRkZW4nIHx8XG5cdFx0XHRcdFx0Y29tcHV0ZWRTdHlsZS5vcGFjaXR5ID09PSAnMCdcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5hZGQoZWxlbWVudCk7XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gRmluYWwgcGFzczogQmF0Y2ggcmVtb3ZlIGFsbCBoaWRkZW4gZWxlbWVudHNcblx0XHRlbGVtZW50c1RvUmVtb3ZlLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuXG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIGhpZGRlbiBlbGVtZW50czonLCBjb3VudCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUNsdXR0ZXIoZG9jOiBEb2N1bWVudCkge1xuXHRcdGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdGxldCBleGFjdFNlbGVjdG9yQ291bnQgPSAwO1xuXHRcdGxldCBwYXJ0aWFsU2VsZWN0b3JDb3VudCA9IDA7XG5cblx0XHQvLyBUcmFjayBhbGwgZWxlbWVudHMgdG8gYmUgcmVtb3ZlZFxuXHRcdGNvbnN0IGVsZW1lbnRzVG9SZW1vdmUgPSBuZXcgU2V0PEVsZW1lbnQ+KCk7XG5cblx0XHQvLyBGaXJzdCBjb2xsZWN0IGVsZW1lbnRzIG1hdGNoaW5nIGV4YWN0IHNlbGVjdG9yc1xuXHRcdGNvbnN0IGV4YWN0RWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChFWEFDVF9TRUxFQ1RPUlMuam9pbignLCcpKTtcblx0XHRleGFjdEVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0aWYgKGVsPy5wYXJlbnROb2RlKSB7XG5cdFx0XHRcdGVsZW1lbnRzVG9SZW1vdmUuYWRkKGVsKTtcblx0XHRcdFx0ZXhhY3RTZWxlY3RvckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBQcmUtY29tcGlsZSByZWdleGVzIGFuZCBjb21iaW5lIGludG8gYSBzaW5nbGUgcmVnZXggZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuXHRcdGNvbnN0IGNvbWJpbmVkUGF0dGVybiA9IFBBUlRJQUxfU0VMRUNUT1JTLmpvaW4oJ3wnKTtcblx0XHRjb25zdCBwYXJ0aWFsUmVnZXggPSBuZXcgUmVnRXhwKGNvbWJpbmVkUGF0dGVybiwgJ2knKTtcblxuXHRcdC8vIENyZWF0ZSBhbiBlZmZpY2llbnQgYXR0cmlidXRlIHNlbGVjdG9yIGZvciBlbGVtZW50cyB3ZSBjYXJlIGFib3V0XG5cdFx0Y29uc3QgYXR0cmlidXRlU2VsZWN0b3IgPSAnW2NsYXNzXSxbaWRdLFtkYXRhLXRlc3RpZF0sW2RhdGEtcWFdLFtkYXRhLWN5XSc7XG5cdFx0Y29uc3QgYWxsRWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChhdHRyaWJ1dGVTZWxlY3Rvcik7XG5cblx0XHQvLyBQcm9jZXNzIGVsZW1lbnRzIGZvciBwYXJ0aWFsIG1hdGNoZXNcblx0XHRhbGxFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcblx0XHRcdC8vIFNraXAgaWYgYWxyZWFkeSBtYXJrZWQgZm9yIHJlbW92YWxcblx0XHRcdGlmIChlbGVtZW50c1RvUmVtb3ZlLmhhcyhlbCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZXQgYWxsIHJlbGV2YW50IGF0dHJpYnV0ZXMgYW5kIGNvbWJpbmUgaW50byBhIHNpbmdsZSBzdHJpbmdcblx0XHRcdGNvbnN0IGF0dHJzID0gW1xuXHRcdFx0XHRlbC5jbGFzc05hbWUgJiYgdHlwZW9mIGVsLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgPyBlbC5jbGFzc05hbWUgOiAnJyxcblx0XHRcdFx0ZWwuaWQgfHwgJycsXG5cdFx0XHRcdGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0aWQnKSB8fCAnJyxcblx0XHRcdFx0ZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXFhJykgfHwgJycsXG5cdFx0XHRcdGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1jeScpIHx8ICcnXG5cdFx0XHRdLmpvaW4oJyAnKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHQvLyBTa2lwIGlmIG5vIGF0dHJpYnV0ZXMgdG8gY2hlY2tcblx0XHRcdGlmICghYXR0cnMudHJpbSgpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgZm9yIHBhcnRpYWwgbWF0Y2ggdXNpbmcgc2luZ2xlIHJlZ2V4IHRlc3Rcblx0XHRcdGlmIChwYXJ0aWFsUmVnZXgudGVzdChhdHRycykpIHtcblx0XHRcdFx0ZWxlbWVudHNUb1JlbW92ZS5hZGQoZWwpO1xuXHRcdFx0XHRwYXJ0aWFsU2VsZWN0b3JDb3VudCsrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIGFsbCBjb2xsZWN0ZWQgZWxlbWVudHMgaW4gYSBzaW5nbGUgcGFzc1xuXHRcdGVsZW1lbnRzVG9SZW1vdmUuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG5cblx0XHRjb25zdCBlbmRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5fbG9nKCdSZW1vdmVkIGNsdXR0ZXIgZWxlbWVudHM6Jywge1xuXHRcdFx0ZXhhY3RTZWxlY3RvcnM6IGV4YWN0U2VsZWN0b3JDb3VudCxcblx0XHRcdHBhcnRpYWxTZWxlY3RvcnM6IHBhcnRpYWxTZWxlY3RvckNvdW50LFxuXHRcdFx0dG90YWw6IGVsZW1lbnRzVG9SZW1vdmUuc2l6ZSxcblx0XHRcdHByb2Nlc3NpbmdUaW1lOiBgJHsoZW5kVGltZSAtIHN0YXJ0VGltZSkudG9GaXhlZCgyKX1tc2Bcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgZmxhdHRlbkRpdnMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCBwcm9jZXNzZWRDb3VudCA9IDA7XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cblx0XHQvLyBQcm9jZXNzIGluIGJhdGNoZXMgdG8gbWFpbnRhaW4gcGVyZm9ybWFuY2Vcblx0XHRsZXQga2VlcFByb2Nlc3NpbmcgPSB0cnVlO1xuXG5cdFx0Y29uc3Qgc2hvdWxkUHJlc2VydmVFbGVtZW50ID0gKGVsOiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHRjb25zdCB0YWdOYW1lID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBpZiBlbGVtZW50IHNob3VsZCBiZSBwcmVzZXJ2ZWRcblx0XHRcdGlmIChQUkVTRVJWRV9FTEVNRU5UUy5oYXModGFnTmFtZSkpIHJldHVybiB0cnVlO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBmb3Igc2VtYW50aWMgcm9sZXNcblx0XHRcdGNvbnN0IHJvbGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKTtcblx0XHRcdGlmIChyb2xlICYmIFsnYXJ0aWNsZScsICdtYWluJywgJ25hdmlnYXRpb24nLCAnYmFubmVyJywgJ2NvbnRlbnRpbmZvJ10uaW5jbHVkZXMocm9sZSkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGZvciBzZW1hbnRpYyBjbGFzc2VzXG5cdFx0XHRjb25zdCBjbGFzc05hbWUgPSBlbC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmIChjbGFzc05hbWUubWF0Y2goLyg/OmFydGljbGV8bWFpbnxjb250ZW50fGZvb3Rub3RlfHJlZmVyZW5jZXxiaWJsaW9ncmFwaHkpLykpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIGlmIGRpdiBjb250YWlucyBtaXhlZCBjb250ZW50IHR5cGVzIHRoYXQgc2hvdWxkIGJlIHByZXNlcnZlZFxuXHRcdFx0aWYgKHRhZ05hbWUgPT09ICdkaXYnKSB7XG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShlbC5jaGlsZHJlbik7XG5cdFx0XHRcdGNvbnN0IGhhc1ByZXNlcnZlZEVsZW1lbnRzID0gY2hpbGRyZW4uc29tZShjaGlsZCA9PiBcblx0XHRcdFx0XHRQUkVTRVJWRV9FTEVNRU5UUy5oYXMoY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSB8fFxuXHRcdFx0XHRcdGNoaWxkLmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAnYXJ0aWNsZScgfHxcblx0XHRcdFx0XHRjaGlsZC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYXJ0aWNsZScpXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChoYXNQcmVzZXJ2ZWRFbGVtZW50cykgcmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgaXNXcmFwcGVyRGl2ID0gKGRpdjogRWxlbWVudCk6IGJvb2xlYW4gPT4ge1xuXHRcdFx0Ly8gQ2hlY2sgaWYgaXQncyBqdXN0IGVtcHR5IHNwYWNlXG5cdFx0XHRpZiAoIWRpdi50ZXh0Q29udGVudD8udHJpbSgpKSByZXR1cm4gdHJ1ZTtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgaXQgb25seSBjb250YWlucyBvdGhlciBkaXZzIG9yIGJsb2NrIGVsZW1lbnRzXG5cdFx0XHRjb25zdCBjaGlsZHJlbiA9IEFycmF5LmZyb20oZGl2LmNoaWxkcmVuKTtcblx0XHRcdGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xuXHRcdFx0XG5cdFx0XHQvLyBDaGVjayBpZiBhbGwgY2hpbGRyZW4gYXJlIGJsb2NrIGVsZW1lbnRzXG5cdFx0XHRjb25zdCBhbGxCbG9ja0VsZW1lbnRzID0gY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4ge1xuXHRcdFx0XHRjb25zdCB0YWcgPSBjaGlsZC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdHJldHVybiB0YWcgPT09ICdkaXYnIHx8IHRhZyA9PT0gJ3AnIHx8IHRhZyA9PT0gJ2gxJyB8fCB0YWcgPT09ICdoMicgfHwgXG5cdFx0XHRcdFx0ICAgdGFnID09PSAnaDMnIHx8IHRhZyA9PT0gJ2g0JyB8fCB0YWcgPT09ICdoNScgfHwgdGFnID09PSAnaDYnIHx8XG5cdFx0XHRcdFx0ICAgdGFnID09PSAndWwnIHx8IHRhZyA9PT0gJ29sJyB8fCB0YWcgPT09ICdwcmUnIHx8IHRhZyA9PT0gJ2Jsb2NrcXVvdGUnIHx8XG5cdFx0XHRcdFx0ICAgdGFnID09PSAnZmlndXJlJztcblx0XHRcdH0pO1xuXHRcdFx0aWYgKGFsbEJsb2NrRWxlbWVudHMpIHJldHVybiB0cnVlO1xuXG5cdFx0XHQvLyBDaGVjayBmb3IgY29tbW9uIHdyYXBwZXIgcGF0dGVybnNcblx0XHRcdGNvbnN0IGNsYXNzTmFtZSA9IGRpdi5jbGFzc05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdGNvbnN0IGlzV3JhcHBlciA9IC8oPzp3cmFwcGVyfGNvbnRhaW5lcnxsYXlvdXR8cm93fGNvbHxncmlkfGZsZXh8b3V0ZXJ8aW5uZXJ8Y29udGVudC1hcmVhKS9pLnRlc3QoY2xhc3NOYW1lKTtcblx0XHRcdGlmIChpc1dyYXBwZXIpIHJldHVybiB0cnVlO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBpdCBoYXMgZXhjZXNzaXZlIHdoaXRlc3BhY2Ugb3IgZW1wdHkgdGV4dCBub2Rlc1xuXHRcdFx0Y29uc3QgdGV4dE5vZGVzID0gQXJyYXkuZnJvbShkaXYuY2hpbGROb2RlcykuZmlsdGVyKG5vZGUgPT4gXG5cdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIG5vZGUudGV4dENvbnRlbnQ/LnRyaW0oKVxuXHRcdFx0KTtcblx0XHRcdGlmICh0ZXh0Tm9kZXMubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgaXQncyBhIGRpdiB0aGF0IG9ubHkgY29udGFpbnMgYmxvY2sgZWxlbWVudHNcblx0XHRcdGNvbnN0IGhhc09ubHlCbG9ja0VsZW1lbnRzID0gY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhY2hpbGRyZW4uc29tZShjaGlsZCA9PiB7XG5cdFx0XHRcdGNvbnN0IHRhZyA9IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0cmV0dXJuIElOTElORV9FTEVNRU5UUy5oYXModGFnKTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKGhhc09ubHlCbG9ja0VsZW1lbnRzKSByZXR1cm4gdHJ1ZTtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHQvLyBGdW5jdGlvbiB0byBwcm9jZXNzIGEgc2luZ2xlIGRpdlxuXHRcdGNvbnN0IHByb2Nlc3NEaXYgPSAoZGl2OiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHQvLyBTa2lwIHByb2Nlc3NpbmcgaWYgZGl2IGhhcyBiZWVuIHJlbW92ZWQgb3Igc2hvdWxkIGJlIHByZXNlcnZlZFxuXHRcdFx0aWYgKCFkaXYuaXNDb25uZWN0ZWQgfHwgc2hvdWxkUHJlc2VydmVFbGVtZW50KGRpdikpIHJldHVybiBmYWxzZTtcblxuXHRcdFx0Ly8gQ2FzZSAxOiBFbXB0eSBkaXYgb3IgZGl2IHdpdGggb25seSB3aGl0ZXNwYWNlXG5cdFx0XHRpZiAoIWRpdi5oYXNDaGlsZE5vZGVzKCkgfHwgIWRpdi50ZXh0Q29udGVudD8udHJpbSgpKSB7XG5cdFx0XHRcdGRpdi5yZW1vdmUoKTtcblx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhc2UgMjogVG9wLWxldmVsIGRpdiAtIGJlIG1vcmUgYWdncmVzc2l2ZVxuXHRcdFx0aWYgKGRpdi5wYXJlbnRFbGVtZW50ID09PSBlbGVtZW50KSB7XG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShkaXYuY2hpbGRyZW4pO1xuXHRcdFx0XHRjb25zdCBoYXNPbmx5QmxvY2tFbGVtZW50cyA9IGNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgIWNoaWxkcmVuLnNvbWUoY2hpbGQgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHRhZyA9IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRyZXR1cm4gSU5MSU5FX0VMRU1FTlRTLmhhcyh0YWcpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoaGFzT25seUJsb2NrRWxlbWVudHMpIHtcblx0XHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XHR3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhc2UgMzogV3JhcHBlciBkaXYgLSBtZXJnZSB1cCBhZ2dyZXNzaXZlbHlcblx0XHRcdGlmIChpc1dyYXBwZXJEaXYoZGl2KSkge1xuXHRcdFx0XHQvLyBTcGVjaWFsIGNhc2U6IGlmIGRpdiBvbmx5IGNvbnRhaW5zIGJsb2NrIGVsZW1lbnRzLCBtZXJnZSB0aGVtIHVwXG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShkaXYuY2hpbGRyZW4pO1xuXHRcdFx0XHRjb25zdCBvbmx5QmxvY2tFbGVtZW50cyA9ICFjaGlsZHJlbi5zb21lKGNoaWxkID0+IHtcblx0XHRcdFx0XHRjb25zdCB0YWcgPSBjaGlsZC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0cmV0dXJuIElOTElORV9FTEVNRU5UUy5oYXModGFnKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAob25seUJsb2NrRWxlbWVudHMpIHtcblx0XHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XHR3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGhhbmRsZSBhcyBub3JtYWwgd3JhcHBlclxuXHRcdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0d2hpbGUgKGRpdi5maXJzdENoaWxkKSB7XG5cdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRpdi5yZXBsYWNlV2l0aChmcmFnbWVudCk7XG5cdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYXNlIDQ6IERpdiBvbmx5IGNvbnRhaW5zIHRleHQgY29udGVudCAtIGNvbnZlcnQgdG8gcGFyYWdyYXBoXG5cdFx0XHRpZiAoIWRpdi5jaGlsZHJlbi5sZW5ndGggJiYgZGl2LnRleHRDb250ZW50Py50cmltKCkpIHtcblx0XHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0cC50ZXh0Q29udGVudCA9IGRpdi50ZXh0Q29udGVudDtcblx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKHApO1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FzZSA1OiBEaXYgaGFzIHNpbmdsZSBjaGlsZFxuXHRcdFx0aWYgKGRpdi5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0Y29uc3QgY2hpbGQgPSBkaXYuZmlyc3RFbGVtZW50Q2hpbGQhO1xuXHRcdFx0XHRjb25zdCBjaGlsZFRhZyA9IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIERvbid0IHVud3JhcCBpZiBjaGlsZCBpcyBpbmxpbmUgb3Igc2hvdWxkIGJlIHByZXNlcnZlZFxuXHRcdFx0XHRpZiAoIUlOTElORV9FTEVNRU5UUy5oYXMoY2hpbGRUYWcpICYmICFzaG91bGRQcmVzZXJ2ZUVsZW1lbnQoY2hpbGQpKSB7XG5cdFx0XHRcdFx0ZGl2LnJlcGxhY2VXaXRoKGNoaWxkKTtcblx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhc2UgNjogRGVlcGx5IG5lc3RlZCBkaXYgLSBtZXJnZSB1cFxuXHRcdFx0bGV0IG5lc3RpbmdEZXB0aCA9IDA7XG5cdFx0XHRsZXQgcGFyZW50ID0gZGl2LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR3aGlsZSAocGFyZW50KSB7XG5cdFx0XHRcdGlmIChwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2Jykge1xuXHRcdFx0XHRcdG5lc3RpbmdEZXB0aCsrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobmVzdGluZ0RlcHRoID4gMCkgeyAvLyBDaGFuZ2VkIGZyb20gPiAxIHRvID4gMCB0byBiZSBtb3JlIGFnZ3Jlc3NpdmVcblx0XHRcdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkaXYucmVwbGFjZVdpdGgoZnJhZ21lbnQpO1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHQvLyBGaXJzdCBwYXNzOiBQcm9jZXNzIHRvcC1sZXZlbCBkaXZzXG5cdFx0Y29uc3QgcHJvY2Vzc1RvcExldmVsRGl2cyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHRvcERpdnMgPSBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGRyZW4pLmZpbHRlcihcblx0XHRcdFx0ZWwgPT4gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2J1xuXHRcdFx0KTtcblx0XHRcdFxuXHRcdFx0bGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cdFx0XHR0b3BEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0aWYgKHByb2Nlc3NEaXYoZGl2KSkge1xuXHRcdFx0XHRcdG1vZGlmaWVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbW9kaWZpZWQ7XG5cdFx0fTtcblxuXHRcdC8vIFNlY29uZCBwYXNzOiBQcm9jZXNzIHJlbWFpbmluZyBkaXZzIGZyb20gZGVlcGVzdCB0byBzaGFsbG93ZXN0XG5cdFx0Y29uc3QgcHJvY2Vzc1JlbWFpbmluZ0RpdnMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBhbGxEaXZzID0gQXJyYXkuZnJvbShlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSlcblx0XHRcdFx0LnNvcnQoKGEsIGIpID0+IHtcblx0XHRcdFx0XHQvLyBDb3VudCBuZXN0aW5nIGRlcHRoXG5cdFx0XHRcdFx0Y29uc3QgZ2V0RGVwdGggPSAoZWw6IEVsZW1lbnQpOiBudW1iZXIgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IGRlcHRoID0gMDtcblx0XHRcdFx0XHRcdGxldCBwYXJlbnQgPSBlbC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdFx0d2hpbGUgKHBhcmVudCkge1xuXHRcdFx0XHRcdFx0XHRpZiAocGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2RpdicpIGRlcHRoKys7XG5cdFx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGRlcHRoO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cmV0dXJuIGdldERlcHRoKGIpIC0gZ2V0RGVwdGgoYSk7IC8vIFByb2Nlc3MgZGVlcGVzdCBmaXJzdFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0bGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cdFx0XHRhbGxEaXZzLmZvckVhY2goZGl2ID0+IHtcblx0XHRcdFx0aWYgKHByb2Nlc3NEaXYoZGl2KSkge1xuXHRcdFx0XHRcdG1vZGlmaWVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbW9kaWZpZWQ7XG5cdFx0fTtcblxuXHRcdC8vIEZpbmFsIGNsZWFudXAgcGFzcyAtIGFnZ3Jlc3NpdmVseSBmbGF0dGVuIHJlbWFpbmluZyBkaXZzXG5cdFx0Y29uc3QgZmluYWxDbGVhbnVwID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgcmVtYWluaW5nRGl2cyA9IEFycmF5LmZyb20oZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JykpO1xuXHRcdFx0bGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cdFx0XHRcblx0XHRcdHJlbWFpbmluZ0RpdnMuZm9yRWFjaChkaXYgPT4ge1xuXHRcdFx0XHQvLyBDaGVjayBpZiBkaXYgb25seSBjb250YWlucyBwYXJhZ3JhcGhzXG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShkaXYuY2hpbGRyZW4pO1xuXHRcdFx0XHRjb25zdCBvbmx5UGFyYWdyYXBocyA9IGNoaWxkcmVuLmV2ZXJ5KGNoaWxkID0+IGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3AnKTtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChvbmx5UGFyYWdyYXBocyB8fCAoIXNob3VsZFByZXNlcnZlRWxlbWVudChkaXYpICYmIGlzV3JhcHBlckRpdihkaXYpKSkge1xuXHRcdFx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0XHRcdHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkaXYucmVwbGFjZVdpdGgoZnJhZ21lbnQpO1xuXHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBtb2RpZmllZDtcblx0XHR9O1xuXG5cdFx0Ly8gRXhlY3V0ZSBhbGwgcGFzc2VzIHVudGlsIG5vIG1vcmUgY2hhbmdlc1xuXHRcdGRvIHtcblx0XHRcdFx0a2VlcFByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0aWYgKHByb2Nlc3NUb3BMZXZlbERpdnMoKSkga2VlcFByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRpZiAocHJvY2Vzc1JlbWFpbmluZ0RpdnMoKSkga2VlcFByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRpZiAoZmluYWxDbGVhbnVwKCkpIGtlZXBQcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdH0gd2hpbGUgKGtlZXBQcm9jZXNzaW5nKTtcblxuXHRcdGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLl9sb2coJ0ZsYXR0ZW5lZCBkaXZzOicsIHtcblx0XHRcdGNvdW50OiBwcm9jZXNzZWRDb3VudCxcblx0XHRcdHByb2Nlc3NpbmdUaW1lOiBgJHsoZW5kVGltZSAtIHN0YXJ0VGltZSkudG9GaXhlZCgyKX1tc2Bcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY2xlYW5Db250ZW50KGVsZW1lbnQ6IEVsZW1lbnQsIG1ldGFkYXRhOiBEZWZ1ZGRsZU1ldGFkYXRhKSB7XG5cdFx0Ly8gUmVtb3ZlIEhUTUwgY29tbWVudHNcblx0XHR0aGlzLnJlbW92ZUh0bWxDb21tZW50cyhlbGVtZW50KTtcblx0XHRcblx0XHQvLyBIYW5kbGUgSDEgZWxlbWVudHMgLSByZW1vdmUgZmlyc3Qgb25lIGFuZCBjb252ZXJ0IG90aGVycyB0byBIMlxuXHRcdHRoaXMuaGFuZGxlSGVhZGluZ3MoZWxlbWVudCwgbWV0YWRhdGEudGl0bGUpO1xuXHRcdFxuXHRcdC8vIFN0YW5kYXJkaXplIGZvb3Rub3RlcyBhbmQgY2l0YXRpb25zXG5cdFx0dGhpcy5zdGFuZGFyZGl6ZUZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIEhhbmRsZSBsYXp5LWxvYWRlZCBpbWFnZXNcblx0XHR0aGlzLmhhbmRsZUxhenlJbWFnZXMoZWxlbWVudCk7XG5cblx0XHQvLyBDb252ZXJ0IGVtYmVkZGVkIGNvbnRlbnQgdG8gc3RhbmRhcmQgZm9ybWF0c1xuXHRcdHRoaXMuc3RhbmRhcmRpemVFbGVtZW50cyhlbGVtZW50KTtcblxuXHRcdC8vIFNraXAgZGl2IGZsYXR0ZW5pbmcgaW4gZGVidWcgbW9kZVxuXHRcdGlmICghdGhpcy5kZWJ1Zykge1xuXHRcdFx0Ly8gRmlyc3QgcGFzcyBvZiBkaXYgZmxhdHRlbmluZ1xuXHRcdFx0dGhpcy5mbGF0dGVuRGl2cyhlbGVtZW50KTtcblx0XHRcdFxuXHRcdFx0Ly8gU3RyaXAgdW53YW50ZWQgYXR0cmlidXRlc1xuXHRcdFx0dGhpcy5zdHJpcFVud2FudGVkQXR0cmlidXRlcyhlbGVtZW50KTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGVtcHR5IGVsZW1lbnRzXG5cdFx0XHR0aGlzLnJlbW92ZUVtcHR5RWxlbWVudHMoZWxlbWVudCk7XG5cblx0XHRcdC8vIFJlbW92ZSB0cmFpbGluZyBoZWFkaW5nc1xuXHRcdFx0dGhpcy5yZW1vdmVUcmFpbGluZ0hlYWRpbmdzKGVsZW1lbnQpO1xuXG5cdFx0XHQvLyBGaW5hbCBwYXNzIG9mIGRpdiBmbGF0dGVuaW5nIGFmdGVyIGNsZWFudXAgb3BlcmF0aW9uc1xuXHRcdFx0dGhpcy5mbGF0dGVuRGl2cyhlbGVtZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSW4gZGVidWcgbW9kZSwgc3RpbGwgZG8gYmFzaWMgY2xlYW51cCBidXQgcHJlc2VydmUgc3RydWN0dXJlXG5cdFx0XHR0aGlzLnN0cmlwVW53YW50ZWRBdHRyaWJ1dGVzKGVsZW1lbnQpO1xuXHRcdFx0dGhpcy5yZW1vdmVFbXB0eUVsZW1lbnRzKGVsZW1lbnQpO1xuXHRcdFx0dGhpcy5yZW1vdmVUcmFpbGluZ0hlYWRpbmdzKGVsZW1lbnQpO1xuXHRcdFx0dGhpcy5fbG9nKCdEZWJ1ZyBtb2RlOiBTa2lwcGluZyBkaXYgZmxhdHRlbmluZyB0byBwcmVzZXJ2ZSBzdHJ1Y3R1cmUnKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZVRyYWlsaW5nSGVhZGluZ3MoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGxldCByZW1vdmVkQ291bnQgPSAwO1xuXG5cdFx0Y29uc3QgaGFzQ29udGVudEFmdGVyID0gKGVsOiBFbGVtZW50KTogYm9vbGVhbiA9PiB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGVyZSdzIGFueSBtZWFuaW5nZnVsIGNvbnRlbnQgYWZ0ZXIgdGhpcyBlbGVtZW50XG5cdFx0XHRsZXQgbmV4dENvbnRlbnQgPSAnJztcblx0XHRcdGxldCBzaWJsaW5nID0gZWwubmV4dFNpYmxpbmc7XG5cblx0XHRcdC8vIEZpcnN0IGNoZWNrIGRpcmVjdCBzaWJsaW5nc1xuXHRcdFx0d2hpbGUgKHNpYmxpbmcpIHtcblx0XHRcdFx0aWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRcdFx0bmV4dENvbnRlbnQgKz0gc2libGluZy50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0fSBlbHNlIGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuXHRcdFx0XHRcdC8vIElmIHdlIGZpbmQgYW4gZWxlbWVudCBzaWJsaW5nLCBjaGVjayBpdHMgY29udGVudFxuXHRcdFx0XHRcdG5leHRDb250ZW50ICs9IChzaWJsaW5nIGFzIEVsZW1lbnQpLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNpYmxpbmcgPSBzaWJsaW5nLm5leHRTaWJsaW5nO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB3ZSBmb3VuZCBtZWFuaW5nZnVsIGNvbnRlbnQgYXQgdGhpcyBsZXZlbCwgcmV0dXJuIHRydWVcblx0XHRcdGlmIChuZXh0Q29udGVudC50cmltKCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIG5vIGNvbnRlbnQgZm91bmQgYXQgdGhpcyBsZXZlbCBhbmQgd2UgaGF2ZSBhIHBhcmVudCxcblx0XHRcdC8vIGNoZWNrIGZvciBjb250ZW50IGFmdGVyIHRoZSBwYXJlbnRcblx0XHRcdGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudCAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gaGFzQ29udGVudEFmdGVyKHBhcmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0Ly8gUHJvY2VzcyBhbGwgaGVhZGluZ3MgZnJvbSBib3R0b20gdG8gdG9wXG5cdFx0Y29uc3QgaGVhZGluZ3MgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaDEsIGgyLCBoMywgaDQsIGg1LCBoNicpKVxuXHRcdFx0LnJldmVyc2UoKTtcblxuXHRcdGhlYWRpbmdzLmZvckVhY2goaGVhZGluZyA9PiB7XG5cdFx0XHRpZiAoIWhhc0NvbnRlbnRBZnRlcihoZWFkaW5nKSkge1xuXHRcdFx0XHRoZWFkaW5nLnJlbW92ZSgpO1xuXHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFN0b3AgcHJvY2Vzc2luZyBvbmNlIHdlIGZpbmQgYSBoZWFkaW5nIHdpdGggY29udGVudCBhZnRlciBpdFxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAocmVtb3ZlZENvdW50ID4gMCkge1xuXHRcdFx0dGhpcy5fbG9nKCdSZW1vdmVkIHRyYWlsaW5nIGhlYWRpbmdzOicsIHJlbW92ZWRDb3VudCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBoYW5kbGVIZWFkaW5ncyhlbGVtZW50OiBFbGVtZW50LCB0aXRsZTogc3RyaW5nKSB7XG5cdFx0Y29uc3QgaDFzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDEnKTtcblxuXHRcdEFycmF5LmZyb20oaDFzKS5mb3JFYWNoKGgxID0+IHtcblx0XHRcdGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcblx0XHRcdGgyLmlubmVySFRNTCA9IGgxLmlubmVySFRNTDtcblx0XHRcdC8vIENvcHkgYWxsb3dlZCBhdHRyaWJ1dGVzXG5cdFx0XHRBcnJheS5mcm9tKGgxLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7XG5cdFx0XHRcdGlmIChBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHIubmFtZSkpIHtcblx0XHRcdFx0XHRoMi5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRoMS5wYXJlbnROb2RlPy5yZXBsYWNlQ2hpbGQoaDIsIGgxKTtcblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBmaXJzdCBIMiBpZiBpdCBtYXRjaGVzIHRpdGxlXG5cdFx0Y29uc3QgaDJzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDInKTtcblx0XHRpZiAoaDJzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbnN0IGZpcnN0SDIgPSBoMnNbMF07XG5cdFx0XHRjb25zdCBmaXJzdEgyVGV4dCA9IGZpcnN0SDIudGV4dENvbnRlbnQ/LnRyaW0oKS50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0Y29uc3Qgbm9ybWFsaXplZFRpdGxlID0gdGl0bGUudG9Mb3dlckNhc2UoKS50cmltKCk7XG5cdFx0XHRpZiAobm9ybWFsaXplZFRpdGxlICYmIG5vcm1hbGl6ZWRUaXRsZSA9PT0gZmlyc3RIMlRleHQpIHtcblx0XHRcdFx0Zmlyc3RIMi5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlbW92ZUh0bWxDb21tZW50cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0Y29uc3QgY29tbWVudHM6IENvbW1lbnRbXSA9IFtdO1xuXHRcdGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG5cdFx0XHRlbGVtZW50LFxuXHRcdFx0Tm9kZUZpbHRlci5TSE9XX0NPTU1FTlQsXG5cdFx0XHRudWxsXG5cdFx0KTtcblxuXHRcdGxldCBub2RlO1xuXHRcdHdoaWxlIChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpIHtcblx0XHRcdGNvbW1lbnRzLnB1c2gobm9kZSBhcyBDb21tZW50KTtcblx0XHR9XG5cblx0XHRjb21tZW50cy5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuXHRcdFx0Y29tbWVudC5yZW1vdmUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUmVtb3ZlZCBIVE1MIGNvbW1lbnRzOicsIGNvbW1lbnRzLmxlbmd0aCk7XG5cdH1cblxuXHRwcml2YXRlIHN0cmlwVW53YW50ZWRBdHRyaWJ1dGVzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgYXR0cmlidXRlQ291bnQgPSAwO1xuXG5cdFx0Y29uc3QgcHJvY2Vzc0VsZW1lbnQgPSAoZWw6IEVsZW1lbnQpID0+IHtcblx0XHRcdC8vIFNraXAgU1ZHIGVsZW1lbnRzIC0gcHJlc2VydmUgYWxsIHRoZWlyIGF0dHJpYnV0ZXNcblx0XHRcdGlmIChlbCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBhdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKTtcblx0XHRcdFxuXHRcdFx0YXR0cmlidXRlcy5mb3JFYWNoKGF0dHIgPT4ge1xuXHRcdFx0XHRjb25zdCBhdHRyTmFtZSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHQvLyBJbiBkZWJ1ZyBtb2RlLCBhbGxvdyBkZWJ1ZyBhdHRyaWJ1dGVzIGFuZCBkYXRhLSBhdHRyaWJ1dGVzXG5cdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0aWYgKCFBTExPV0VEX0FUVFJJQlVURVMuaGFzKGF0dHJOYW1lKSAmJiBcblx0XHRcdFx0XHRcdCFBTExPV0VEX0FUVFJJQlVURVNfREVCVUcuaGFzKGF0dHJOYW1lKSAmJiBcblx0XHRcdFx0XHRcdCFhdHRyTmFtZS5zdGFydHNXaXRoKCdkYXRhLScpKSB7XG5cdFx0XHRcdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKTtcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZUNvdW50Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEluIG5vcm1hbCBtb2RlLCBvbmx5IGFsbG93IHN0YW5kYXJkIGF0dHJpYnV0ZXNcblx0XHRcdFx0XHRpZiAoIUFMTE9XRURfQVRUUklCVVRFUy5oYXMoYXR0ck5hbWUpKSB7XG5cdFx0XHRcdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKTtcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZUNvdW50Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0cHJvY2Vzc0VsZW1lbnQoZWxlbWVudCk7XG5cdFx0ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykuZm9yRWFjaChwcm9jZXNzRWxlbWVudCk7XG5cblx0XHR0aGlzLl9sb2coJ1N0cmlwcGVkIGF0dHJpYnV0ZXM6JywgYXR0cmlidXRlQ291bnQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVFbXB0eUVsZW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcblx0XHRsZXQgcmVtb3ZlZENvdW50ID0gMDtcblx0XHRsZXQgaXRlcmF0aW9ucyA9IDA7XG5cdFx0bGV0IGtlZXBSZW1vdmluZyA9IHRydWU7XG5cblx0XHR3aGlsZSAoa2VlcFJlbW92aW5nKSB7XG5cdFx0XHRpdGVyYXRpb25zKys7XG5cdFx0XHRrZWVwUmVtb3ZpbmcgPSBmYWxzZTtcblx0XHRcdC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aG91dCBjaGlsZHJlbiwgd29ya2luZyBmcm9tIGRlZXBlc3QgZmlyc3Rcblx0XHRcdGNvbnN0IGVtcHR5RWxlbWVudHMgPSBBcnJheS5mcm9tKGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSkuZmlsdGVyKGVsID0+IHtcblx0XHRcdFx0aWYgKEFMTE9XRURfRU1QVFlfRUxFTUVOVFMuaGFzKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIG9ubHkgd2hpdGVzcGFjZSBvciAmbmJzcDtcblx0XHRcdFx0Y29uc3QgdGV4dENvbnRlbnQgPSBlbC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRcdFx0Y29uc3QgaGFzT25seVdoaXRlc3BhY2UgPSB0ZXh0Q29udGVudC50cmltKCkubGVuZ3RoID09PSAwO1xuXHRcdFx0XHRjb25zdCBoYXNOYnNwID0gdGV4dENvbnRlbnQuaW5jbHVkZXMoJ1xcdTAwQTAnKTsgLy8gVW5pY29kZSBub24tYnJlYWtpbmcgc3BhY2Vcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIG5vIG1lYW5pbmdmdWwgY2hpbGRyZW5cblx0XHRcdFx0Y29uc3QgaGFzTm9DaGlsZHJlbiA9ICFlbC5oYXNDaGlsZE5vZGVzKCkgfHwgXG5cdFx0XHRcdFx0KEFycmF5LmZyb20oZWwuY2hpbGROb2RlcykuZXZlcnkobm9kZSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgbm9kZVRleHQgPSBub2RlLnRleHRDb250ZW50IHx8ICcnO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbm9kZVRleHQudHJpbSgpLmxlbmd0aCA9PT0gMCAmJiAhbm9kZVRleHQuaW5jbHVkZXMoJ1xcdTAwQTAnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0cmV0dXJuIGhhc09ubHlXaGl0ZXNwYWNlICYmICFoYXNOYnNwICYmIGhhc05vQ2hpbGRyZW47XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGVtcHR5RWxlbWVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRlbXB0eUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xuXHRcdFx0XHRcdHJlbW92ZWRDb3VudCsrO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0a2VlcFJlbW92aW5nID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgZW1wdHkgZWxlbWVudHM6Jywge1xuXHRcdFx0Y291bnQ6IHJlbW92ZWRDb3VudCxcblx0XHRcdGl0ZXJhdGlvbnNcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlRm9vdG5vdGVJdGVtKFxuXHRcdGZvb3Rub3RlTnVtYmVyOiBudW1iZXIsXG5cdFx0Y29udGVudDogc3RyaW5nIHwgRWxlbWVudCxcblx0XHRyZWZzOiBzdHJpbmdbXVxuXHQpOiBIVE1MTElFbGVtZW50IHtcblx0XHRjb25zdCBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRuZXdJdGVtLmNsYXNzTmFtZSA9ICdmb290bm90ZSc7XG5cdFx0bmV3SXRlbS5pZCA9IGBmbjoke2Zvb3Rub3RlTnVtYmVyfWA7XG5cblx0XHQvLyBIYW5kbGUgY29udGVudFxuXHRcdGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSBjb250ZW50O1xuXHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBHZXQgYWxsIHBhcmFncmFwaHMgZnJvbSB0aGUgY29udGVudFxuXHRcdFx0Y29uc3QgcGFyYWdyYXBocyA9IEFycmF5LmZyb20oY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdwJykpO1xuXHRcdFx0aWYgKHBhcmFncmFwaHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdC8vIElmIG5vIHBhcmFncmFwaHMsIHdyYXAgY29udGVudCBpbiBhIHBhcmFncmFwaFxuXHRcdFx0XHRjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSBjb250ZW50LmlubmVySFRNTDtcblx0XHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ29weSBleGlzdGluZyBwYXJhZ3JhcGhzXG5cdFx0XHRcdHBhcmFncmFwaHMuZm9yRWFjaChwID0+IHtcblx0XHRcdFx0XHRjb25zdCBuZXdQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0XHRcdG5ld1AuaW5uZXJIVE1MID0gcC5pbm5lckhUTUw7XG5cdFx0XHRcdFx0bmV3SXRlbS5hcHBlbmRDaGlsZChuZXdQKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIGJhY2tsaW5rKHMpIHRvIHRoZSBsYXN0IHBhcmFncmFwaFxuXHRcdGNvbnN0IGxhc3RQYXJhZ3JhcGggPSBuZXdJdGVtLnF1ZXJ5U2VsZWN0b3IoJ3A6bGFzdC1vZi10eXBlJykgfHwgbmV3SXRlbTtcblx0XHRyZWZzLmZvckVhY2goKHJlZklkLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgYmFja2xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRiYWNrbGluay5ocmVmID0gYCMke3JlZklkfWA7XG5cdFx0XHRiYWNrbGluay50aXRsZSA9ICdyZXR1cm4gdG8gYXJ0aWNsZSc7XG5cdFx0XHRiYWNrbGluay5jbGFzc05hbWUgPSAnZm9vdG5vdGUtYmFja3JlZic7XG5cdFx0XHRiYWNrbGluay5pbm5lckhUTUwgPSAn4oapJztcblx0XHRcdGlmIChpbmRleCA8IHJlZnMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRiYWNrbGluay5pbm5lckhUTUwgKz0gJyAnO1xuXHRcdFx0fVxuXHRcdFx0bGFzdFBhcmFncmFwaC5hcHBlbmRDaGlsZChiYWNrbGluayk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbmV3SXRlbTtcblx0fVxuXG5cdHByaXZhdGUgY29sbGVjdEZvb3Rub3RlcyhlbGVtZW50OiBFbGVtZW50KTogRm9vdG5vdGVDb2xsZWN0aW9uIHtcblx0XHRjb25zdCBmb290bm90ZXM6IEZvb3Rub3RlQ29sbGVjdGlvbiA9IHt9O1xuXHRcdGxldCBmb290bm90ZUNvdW50ID0gMTtcblx0XHRjb25zdCBwcm9jZXNzZWRJZHMgPSBuZXcgU2V0PHN0cmluZz4oKTsgLy8gVHJhY2sgcHJvY2Vzc2VkIElEc1xuXG5cdFx0Ly8gQ29sbGVjdCBhbGwgZm9vdG5vdGVzIGFuZCB0aGVpciBJRHMgZnJvbSBmb290bm90ZSBsaXN0c1xuXHRcdGNvbnN0IGZvb3Rub3RlTGlzdHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfTElTVF9TRUxFQ1RPUlMpO1xuXHRcdGZvb3Rub3RlTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcblx0XHRcdC8vIFN1YnN0YWNrIGhhcyBpbmRpdmlkdWFsIGZvb3Rub3RlIGRpdnMgd2l0aCBubyBwYXJlbnRcblx0XHRcdGlmIChsaXN0Lm1hdGNoZXMoJ2Rpdi5mb290bm90ZVtkYXRhLWNvbXBvbmVudC1uYW1lPVwiRm9vdG5vdGVUb0RPTVwiXScpKSB7XG5cdFx0XHRcdGNvbnN0IGFuY2hvciA9IGxpc3QucXVlcnlTZWxlY3RvcignYS5mb290bm90ZS1udW1iZXInKTtcblx0XHRcdFx0Y29uc3QgY29udGVudCA9IGxpc3QucXVlcnlTZWxlY3RvcignLmZvb3Rub3RlLWNvbnRlbnQnKTtcblx0XHRcdFx0aWYgKGFuY2hvciAmJiBjb250ZW50KSB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSBhbmNob3IuaWQucmVwbGFjZSgnZm9vdG5vdGUtJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0aWYgKGlkICYmICFwcm9jZXNzZWRJZHMuaGFzKGlkKSkge1xuXHRcdFx0XHRcdFx0Zm9vdG5vdGVzW2Zvb3Rub3RlQ291bnRdID0ge1xuXHRcdFx0XHRcdFx0XHRjb250ZW50OiBjb250ZW50LFxuXHRcdFx0XHRcdFx0XHRvcmlnaW5hbElkOiBpZCxcblx0XHRcdFx0XHRcdFx0cmVmczogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRwcm9jZXNzZWRJZHMuYWRkKGlkKTtcblx0XHRcdFx0XHRcdGZvb3Rub3RlQ291bnQrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb21tb24gZm9ybWF0IHVzaW5nIE9ML1VMIGFuZCBMSSBlbGVtZW50c1xuXHRcdFx0Y29uc3QgaXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLCBkaXZbcm9sZT1cImxpc3RpdGVtXCJdJyk7XG5cdFx0XHRpdGVtcy5mb3JFYWNoKGxpID0+IHtcblx0XHRcdFx0bGV0IGlkID0gJyc7XG5cdFx0XHRcdGxldCBjb250ZW50OiBFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIGNpdGF0aW9ucyB3aXRoIC5jaXRhdGlvbnMgY2xhc3Ncblx0XHRcdFx0Y29uc3QgY2l0YXRpb25zRGl2ID0gbGkucXVlcnlTZWxlY3RvcignLmNpdGF0aW9ucycpO1xuXHRcdFx0XHRpZiAoY2l0YXRpb25zRGl2Py5pZD8udG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdyJykpIHtcblx0XHRcdFx0XHRpZCA9IGNpdGF0aW9uc0Rpdi5pZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdC8vIExvb2sgZm9yIGNpdGF0aW9uIGNvbnRlbnQgd2l0aGluIHRoZSBjaXRhdGlvbnMgZGl2XG5cdFx0XHRcdFx0Y29uc3QgY2l0YXRpb25Db250ZW50ID0gY2l0YXRpb25zRGl2LnF1ZXJ5U2VsZWN0b3IoJy5jaXRhdGlvbi1jb250ZW50Jyk7XG5cdFx0XHRcdFx0aWYgKGNpdGF0aW9uQ29udGVudCkge1xuXHRcdFx0XHRcdFx0Y29udGVudCA9IGNpdGF0aW9uQ29udGVudDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRXh0cmFjdCBJRCBmcm9tIHZhcmlvdXMgZm9ybWF0c1xuXHRcdFx0XHRcdGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2JpYi5iaWInKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5pZC5yZXBsYWNlKCdiaWIuYmliJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsaS5pZC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2ZuOicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2ZuOicsICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaWQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdmbicpKSB7XG5cdFx0XHRcdFx0XHRpZCA9IGxpLmlkLnJlcGxhY2UoJ2ZuJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0Ly8gTmF0dXJlLmNvbVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAobGkuaGFzQXR0cmlidXRlKCdkYXRhLWNvdW50ZXInKSkge1xuXHRcdFx0XHRcdFx0aWQgPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY291bnRlcicpPy5yZXBsYWNlKC9cXC4kLywgJycpPy50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGxpLmlkLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC9jaXRlX25vdGUtKC4rKS8pO1xuXHRcdFx0XHRcdFx0aWQgPSBtYXRjaCA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiBsaS5pZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb250ZW50ID0gbGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWQgJiYgIXByb2Nlc3NlZElkcy5oYXMoaWQpKSB7XG5cdFx0XHRcdFx0Zm9vdG5vdGVzW2Zvb3Rub3RlQ291bnRdID0ge1xuXHRcdFx0XHRcdFx0Y29udGVudDogY29udGVudCB8fCBsaSxcblx0XHRcdFx0XHRcdG9yaWdpbmFsSWQ6IGlkLFxuXHRcdFx0XHRcdFx0cmVmczogW11cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHByb2Nlc3NlZElkcy5hZGQoaWQpO1xuXHRcdFx0XHRcdGZvb3Rub3RlQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZm9vdG5vdGVzO1xuXHR9XG5cblx0cHJpdmF0ZSBmaW5kT3V0ZXJGb290bm90ZUNvbnRhaW5lcihlbDogRWxlbWVudCk6IEVsZW1lbnQge1xuXHRcdGxldCBjdXJyZW50OiBFbGVtZW50IHwgbnVsbCA9IGVsO1xuXHRcdGxldCBwYXJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWwucGFyZW50RWxlbWVudDtcblx0XHRcblx0XHQvLyBLZWVwIGdvaW5nIHVwIHVudGlsIHdlIGZpbmQgYW4gZWxlbWVudCB0aGF0J3Mgbm90IGEgc3BhbiBvciBzdXBcblx0XHR3aGlsZSAocGFyZW50ICYmIChcblx0XHRcdHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzcGFuJyB8fCBcblx0XHRcdHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdXAnXG5cdFx0KSkge1xuXHRcdFx0Y3VycmVudCA9IHBhcmVudDtcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gY3VycmVudDtcblx0fVxuXG5cdC8vIEV2ZXJ5IGZvb3Rub3RlIHJlZmVyZW5jZSBzaG91bGQgYmUgYSBzdXAgZWxlbWVudCB3aXRoIGFuIGFuY2hvciBpbnNpZGVcblx0Ly8gZS5nLiA8c3VwIGlkPVwiZm5yZWY6MVwiPjxhIGhyZWY9XCIjZm46MVwiPjE8L2E+PC9zdXA+XG5cdHByaXZhdGUgY3JlYXRlRm9vdG5vdGVSZWZlcmVuY2UoZm9vdG5vdGVOdW1iZXI6IHN0cmluZywgcmVmSWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcblx0XHRjb25zdCBzdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdXAnKTtcblx0XHRzdXAuaWQgPSByZWZJZDtcblx0XHRjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdGxpbmsuaHJlZiA9IGAjZm46JHtmb290bm90ZU51bWJlcn1gO1xuXHRcdGxpbmsudGV4dENvbnRlbnQgPSBmb290bm90ZU51bWJlcjtcblx0XHRzdXAuYXBwZW5kQ2hpbGQobGluayk7XG5cdFx0cmV0dXJuIHN1cDtcblx0fVxuXG5cdHByaXZhdGUgc3RhbmRhcmRpemVGb290bm90ZXMoZWxlbWVudDogRWxlbWVudCkge1xuXHRcdGNvbnN0IGZvb3Rub3RlcyA9IHRoaXMuY29sbGVjdEZvb3Rub3RlcyhlbGVtZW50KTtcblxuXHRcdC8vIFN0YW5kYXJkaXplIGlubGluZSBmb290bm90ZXMgdXNpbmcgdGhlIGNvbGxlY3RlZCBJRHNcblx0XHRjb25zdCBmb290bm90ZUlubGluZVJlZmVyZW5jZXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9PVE5PVEVfSU5MSU5FX1JFRkVSRU5DRVMpO1xuXHRcdFxuXHRcdC8vIEdyb3VwIHJlZmVyZW5jZXMgYnkgdGhlaXIgcGFyZW50IHN1cCBlbGVtZW50XG5cdFx0Y29uc3Qgc3VwR3JvdXBzID0gbmV3IE1hcDxFbGVtZW50LCBFbGVtZW50W10+KCk7XG5cdFx0XG5cdFx0Zm9vdG5vdGVJbmxpbmVSZWZlcmVuY2VzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcblxuXHRcdFx0bGV0IGZvb3Rub3RlSWQgPSAnJztcblx0XHRcdGxldCBmb290bm90ZUNvbnRlbnQgPSAnJztcblxuXHRcdFx0Ly8gRXh0cmFjdCBmb290bm90ZSBJRCBiYXNlZCBvbiBlbGVtZW50IHR5cGVcblx0XHRcdC8vIE5hdHVyZS5jb21cblx0XHRcdGlmIChlbC5tYXRjaGVzKCdhW2lkXj1cInJlZi1saW5rXCJdJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cdFx0XHQvLyBTY2llbmNlLm9yZ1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdhW3JvbGU9XCJkb2MtYmlibGlvcmVmXCJdJykpIHtcblx0XHRcdFx0Y29uc3QgeG1sUmlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXhtbC1yaWQnKTtcblx0XHRcdFx0aWYgKHhtbFJpZCkge1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSB4bWxSaWQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmPy5zdGFydHNXaXRoKCcjY29yZS1SJykpIHtcblx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBocmVmLnJlcGxhY2UoJyNjb3JlLScsICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdC8vIFN1YnN0YWNrXG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2EuZm9vdG5vdGUtYW5jaG9yLCBzcGFuLmZvb3Rub3RlLWhvdmVyY2FyZC10YXJnZXQgYScpKSB7XG5cdFx0XHRcdGNvbnN0IGlkID0gZWwuaWQ/LnJlcGxhY2UoJ2Zvb3Rub3RlLWFuY2hvci0nLCAnJykgfHwgJyc7XG5cdFx0XHRcdGlmIChpZCkge1xuXHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBpZC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHQvLyBBcnhpdlxuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdjaXRlLmx0eF9jaXRlJykpIHtcblx0XHRcdFx0Y29uc3QgbGluayA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRcdFx0aWYgKGxpbmspIHtcblx0XHRcdFx0XHRjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2ggPSBocmVmLnNwbGl0KCcvJykucG9wKCk/Lm1hdGNoKC9iaWJcXC5iaWIoXFxkKykvKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRmb290bm90ZUlkID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZWwubWF0Y2hlcygnc3VwLnJlZmVyZW5jZScpKSB7XG5cdFx0XHRcdGNvbnN0IGxpbmtzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdFx0XHRBcnJheS5mcm9tKGxpbmtzKS5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IGhyZWYuc3BsaXQoJy8nKS5wb3AoKT8ubWF0Y2goLyg/OmNpdGVfbm90ZXxjaXRlX3JlZiktKC4rKS8pO1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGZvb3Rub3RlSWQgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3N1cFtpZF49XCJmbnJlZjpcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yZWY6JywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3N1cFtpZF49XCJmbnJcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yJywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ3NwYW4uZm9vdG5vdGUtcmVmZXJlbmNlJykpIHtcblx0XHRcdFx0Zm9vdG5vdGVJZCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb290bm90ZS1pZCcpIHx8ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChlbC5tYXRjaGVzKCdzcGFuLmZvb3Rub3RlLWxpbmsnKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvb3Rub3RlLWlkJykgfHwgJyc7XG5cdFx0XHRcdGZvb3Rub3RlQ29udGVudCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb290bm90ZS1jb250ZW50JykgfHwgJyc7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2EuY2l0YXRpb24nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblx0XHRcdFx0Zm9vdG5vdGVDb250ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG5cdFx0XHR9IGVsc2UgaWYgKGVsLm1hdGNoZXMoJ2FbaWRePVwiZm5yZWZcIl0nKSkge1xuXHRcdFx0XHRmb290bm90ZUlkID0gZWwuaWQucmVwbGFjZSgnZm5yZWYnLCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE90aGVyIGNpdGF0aW9uIHR5cGVzXG5cdFx0XHRcdGNvbnN0IGhyZWYgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0aWYgKGhyZWYpIHtcblx0XHRcdFx0XHRjb25zdCBpZCA9IGhyZWYucmVwbGFjZSgvXlsjXS8sICcnKTtcblx0XHRcdFx0XHRmb290bm90ZUlkID0gaWQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZm9vdG5vdGVJZCkge1xuXHRcdFx0XHQvLyBGaW5kIHRoZSBmb290bm90ZSBudW1iZXIgYnkgbWF0Y2hpbmcgdGhlIG9yaWdpbmFsIElEXG5cdFx0XHRcdGNvbnN0IGZvb3Rub3RlRW50cnkgPSBPYmplY3QuZW50cmllcyhmb290bm90ZXMpLmZpbmQoXG5cdFx0XHRcdFx0KFtfLCBkYXRhXSkgPT4gZGF0YS5vcmlnaW5hbElkID09PSBmb290bm90ZUlkLnRvTG93ZXJDYXNlKClcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoZm9vdG5vdGVFbnRyeSkge1xuXHRcdFx0XHRcdGNvbnN0IFtmb290bm90ZU51bWJlciwgZm9vdG5vdGVEYXRhXSA9IGZvb3Rub3RlRW50cnk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIGZvb3Rub3RlIHJlZmVyZW5jZSBJRFxuXHRcdFx0XHRcdGNvbnN0IHJlZklkID0gZm9vdG5vdGVEYXRhLnJlZnMubGVuZ3RoID4gMCA/IFxuXHRcdFx0XHRcdFx0YGZucmVmOiR7Zm9vdG5vdGVOdW1iZXJ9LSR7Zm9vdG5vdGVEYXRhLnJlZnMubGVuZ3RoICsgMX1gIDogXG5cdFx0XHRcdFx0XHRgZm5yZWY6JHtmb290bm90ZU51bWJlcn1gO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZvb3Rub3RlRGF0YS5yZWZzLnB1c2gocmVmSWQpO1xuXG5cdFx0XHRcdFx0Ly8gRmluZCB0aGUgb3V0ZXJtb3N0IGNvbnRhaW5lciAoc3BhbiBvciBzdXApXG5cdFx0XHRcdFx0Y29uc3QgY29udGFpbmVyID0gdGhpcy5maW5kT3V0ZXJGb290bm90ZUNvbnRhaW5lcihlbCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gSWYgY29udGFpbmVyIGlzIGEgc3VwLCBncm91cCByZWZlcmVuY2VzXG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lci50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzdXAnKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXN1cEdyb3Vwcy5oYXMoY29udGFpbmVyKSkge1xuXHRcdFx0XHRcdFx0XHRzdXBHcm91cHMuc2V0KGNvbnRhaW5lciwgW10pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29uc3QgZ3JvdXAgPSBzdXBHcm91cHMuZ2V0KGNvbnRhaW5lcikhO1xuXHRcdFx0XHRcdFx0Z3JvdXAucHVzaCh0aGlzLmNyZWF0ZUZvb3Rub3RlUmVmZXJlbmNlKGZvb3Rub3RlTnVtYmVyLCByZWZJZCkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBSZXBsYWNlIHRoZSBjb250YWluZXIgZGlyZWN0bHlcblx0XHRcdFx0XHRcdGNvbnRhaW5lci5yZXBsYWNlV2l0aCh0aGlzLmNyZWF0ZUZvb3Rub3RlUmVmZXJlbmNlKGZvb3Rub3RlTnVtYmVyLCByZWZJZCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gSGFuZGxlIGdyb3VwZWQgcmVmZXJlbmNlc1xuXHRcdHN1cEdyb3Vwcy5mb3JFYWNoKChyZWZlcmVuY2VzLCBjb250YWluZXIpID0+IHtcblx0XHRcdGlmIChyZWZlcmVuY2VzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Ly8gQ3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgdG8gaG9sZCBhbGwgdGhlIHJlZmVyZW5jZXNcblx0XHRcdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBBZGQgZWFjaCByZWZlcmVuY2UgYXMgaXRzIG93biBzdXAgZWxlbWVudFxuXHRcdFx0XHRyZWZlcmVuY2VzLmZvckVhY2goKHJlZiwgaW5kZXgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBsaW5rID0gcmVmLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRcdFx0XHRpZiAobGluaykge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3VwJyk7XG5cdFx0XHRcdFx0XHRzdXAuaWQgPSByZWYuaWQ7XG5cdFx0XHRcdFx0XHRzdXAuYXBwZW5kQ2hpbGQobGluay5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoc3VwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Y29udGFpbmVyLnJlcGxhY2VXaXRoKGZyYWdtZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIENyZWF0ZSB0aGUgc3RhbmRhcmRpemVkIGZvb3Rub3RlIGxpc3Rcblx0XHRjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdG5vdGVzJyk7XG5cdFx0bmV3TGlzdC5jbGFzc05hbWUgPSAnZm9vdG5vdGVzJztcblx0XHRjb25zdCBvcmRlcmVkTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29sJyk7XG5cblx0XHQvLyBDcmVhdGUgZm9vdG5vdGUgaXRlbXMgaW4gb3JkZXJcblx0XHRPYmplY3QuZW50cmllcyhmb290bm90ZXMpLmZvckVhY2goKFtudW1iZXIsIGRhdGFdKSA9PiB7XG5cdFx0XHRjb25zdCBuZXdJdGVtID0gdGhpcy5jcmVhdGVGb290bm90ZUl0ZW0oXG5cdFx0XHRcdHBhcnNlSW50KG51bWJlciksXG5cdFx0XHRcdGRhdGEuY29udGVudCxcblx0XHRcdFx0ZGF0YS5yZWZzXG5cdFx0XHQpO1xuXHRcdFx0b3JkZXJlZExpc3QuYXBwZW5kQ2hpbGQobmV3SXRlbSk7XG5cdFx0fSk7XG5cblx0XHQvLyBSZW1vdmUgb3JpZ2luYWwgZm9vdG5vdGUgbGlzdHNcblx0XHRjb25zdCBmb290bm90ZUxpc3RzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPT1ROT1RFX0xJU1RfU0VMRUNUT1JTKTtcblx0XHRmb290bm90ZUxpc3RzLmZvckVhY2gobGlzdCA9PiBsaXN0LnJlbW92ZSgpKTtcblxuXHRcdC8vIElmIHdlIGhhdmUgYW55IGZvb3Rub3RlcywgYWRkIHRoZSBuZXcgbGlzdCB0byB0aGUgZG9jdW1lbnRcblx0XHRpZiAob3JkZXJlZExpc3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0bmV3TGlzdC5hcHBlbmRDaGlsZChvcmRlcmVkTGlzdCk7XG5cdFx0XHRlbGVtZW50LmFwcGVuZENoaWxkKG5ld0xpc3QpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgaGFuZGxlTGF6eUltYWdlcyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblx0XHRjb25zdCBsYXp5SW1hZ2VzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWdbZGF0YS1zcmNdLCBpbWdbZGF0YS1zcmNzZXRdJyk7XG5cblx0XHRsYXp5SW1hZ2VzLmZvckVhY2goaW1nID0+IHtcblx0XHRcdGlmICghKGltZyBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpKSByZXR1cm47XG5cblx0XHRcdC8vIEhhbmRsZSBkYXRhLXNyY1xuXHRcdFx0Y29uc3QgZGF0YVNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0XHRpZiAoZGF0YVNyYyAmJiAhaW1nLnNyYykge1xuXHRcdFx0XHRpbWcuc3JjID0gZGF0YVNyYztcblx0XHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHRcdH1cblxuXHRcdFx0Ly8gSGFuZGxlIGRhdGEtc3Jjc2V0XG5cdFx0XHRjb25zdCBkYXRhU3Jjc2V0ID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHRcdGlmIChkYXRhU3Jjc2V0ICYmICFpbWcuc3Jjc2V0KSB7XG5cdFx0XHRcdGltZy5zcmNzZXQgPSBkYXRhU3Jjc2V0O1xuXHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgbGF6eSBsb2FkaW5nIHJlbGF0ZWQgY2xhc3NlcyBhbmQgYXR0cmlidXRlc1xuXHRcdFx0aW1nLmNsYXNzTGlzdC5yZW1vdmUoJ2xhenknLCAnbGF6eWxvYWQnKTtcblx0XHRcdGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbGwtc3RhdHVzJyk7XG5cdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2xvZygnUHJvY2Vzc2VkIGxhenkgaW1hZ2VzOicsIHByb2Nlc3NlZENvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhbmRhcmRpemVFbGVtZW50cyhlbGVtZW50OiBFbGVtZW50KSB7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblxuXHRcdC8vIENvbnZlcnQgZWxlbWVudHMgYmFzZWQgb24gc3RhbmRhcmRpemF0aW9uIHJ1bGVzXG5cdFx0RUxFTUVOVF9TVEFOREFSRElaQVRJT05fUlVMRVMuZm9yRWFjaChydWxlID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHJ1bGUuc2VsZWN0b3IpO1xuXHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRcdGlmIChydWxlLnRyYW5zZm9ybSkge1xuXHRcdFx0XHRcdC8vIElmIHRoZXJlJ3MgYSB0cmFuc2Zvcm0gZnVuY3Rpb24sIHVzZSBpdCB0byBjcmVhdGUgdGhlIG5ldyBlbGVtZW50XG5cdFx0XHRcdFx0Y29uc3QgdHJhbnNmb3JtZWQgPSBydWxlLnRyYW5zZm9ybShlbCk7XG5cdFx0XHRcdFx0ZWwucmVwbGFjZVdpdGgodHJhbnNmb3JtZWQpO1xuXHRcdFx0XHRcdHByb2Nlc3NlZENvdW50Kys7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQ29udmVydCBsaXRlLXlvdXR1YmUgZWxlbWVudHNcblx0XHRjb25zdCBsaXRlWW91dHViZUVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaXRlLXlvdXR1YmUnKTtcblx0XHRsaXRlWW91dHViZUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0Y29uc3QgdmlkZW9JZCA9IGVsLmdldEF0dHJpYnV0ZSgndmlkZW9pZCcpO1xuXHRcdFx0aWYgKCF2aWRlb0lkKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXHRcdFx0aWZyYW1lLndpZHRoID0gJzU2MCc7XG5cdFx0XHRpZnJhbWUuaGVpZ2h0ID0gJzMxNSc7XG5cdFx0XHRpZnJhbWUuc3JjID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9JZH1gO1xuXHRcdFx0aWZyYW1lLnRpdGxlID0gZWwuZ2V0QXR0cmlidXRlKCd2aWRlb3RpdGxlJykgfHwgJ1lvdVR1YmUgdmlkZW8gcGxheWVyJztcblx0XHRcdGlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcblx0XHRcdGlmcmFtZS5hbGxvdyA9ICdhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgY2xpcGJvYXJkLXdyaXRlOyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlOyB3ZWItc2hhcmUnO1xuXHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xuXG5cdFx0XHRlbC5yZXBsYWNlV2l0aChpZnJhbWUpO1xuXHRcdFx0cHJvY2Vzc2VkQ291bnQrKztcblx0XHR9KTtcblxuXHRcdC8vIEFkZCBmdXR1cmUgZW1iZWQgY29udmVyc2lvbnMgKFR3aXR0ZXIsIEluc3RhZ3JhbSwgZXRjLilcblxuXHRcdHRoaXMuX2xvZygnQ29udmVydGVkIGVtYmVkZGVkIGVsZW1lbnRzOicsIHByb2Nlc3NlZENvdW50KTtcblx0fVxuXG5cdC8vIEZpbmQgc21hbGwgSU1HIGFuZCBTVkcgZWxlbWVudHNcblx0cHJpdmF0ZSBmaW5kU21hbGxJbWFnZXMoZG9jOiBEb2N1bWVudCk6IFNldDxzdHJpbmc+IHtcblx0XHRjb25zdCBNSU5fRElNRU5TSU9OID0gMzM7XG5cdFx0Y29uc3Qgc21hbGxJbWFnZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblx0XHRjb25zdCB0cmFuc2Zvcm1SZWdleCA9IC9zY2FsZVxcKChbXFxkLl0rKVxcKS87XG5cdFx0Y29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0bGV0IHByb2Nlc3NlZENvdW50ID0gMDtcblxuXHRcdC8vIDEuIFJlYWQgcGhhc2UgLSBHYXRoZXIgYWxsIGVsZW1lbnRzIGluIGEgc2luZ2xlIHBhc3Ncblx0XHRjb25zdCBlbGVtZW50cyA9IFtcblx0XHRcdC4uLkFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKSksXG5cdFx0XHQuLi5BcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3ZnJykpXG5cdFx0XS5maWx0ZXIoZWxlbWVudCA9PiB7XG5cdFx0XHQvLyBTa2lwIGxhenktbG9hZGVkIGltYWdlcyB0aGF0IGhhdmVuJ3QgYmVlbiBwcm9jZXNzZWQgeWV0XG5cdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcblx0XHRcdFx0Y29uc3QgaXNMYXp5ID0gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xhenknKSB8fCBcblx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGF6eWxvYWQnKSB8fFxuXHRcdFx0XHRcdGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLXNyYycpIHx8XG5cdFx0XHRcdFx0ZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG5cdFx0XHRcdHJldHVybiAhaXNMYXp5O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gc21hbGxJbWFnZXM7XG5cdFx0fVxuXG5cdFx0Ly8gMi4gQmF0Y2ggcHJvY2VzcyAtIENvbGxlY3QgYWxsIG1lYXN1cmVtZW50cyBpbiBvbmUgZ29cblx0XHRjb25zdCBtZWFzdXJlbWVudHMgPSBlbGVtZW50cy5tYXAoZWxlbWVudCA9PiAoe1xuXHRcdFx0ZWxlbWVudCxcblx0XHRcdC8vIFN0YXRpYyBhdHRyaWJ1dGVzIChubyByZWZsb3cpXG5cdFx0XHRuYXR1cmFsV2lkdGg6IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ID8gZWxlbWVudC5uYXR1cmFsV2lkdGggOiAwLFxuXHRcdFx0bmF0dXJhbEhlaWdodDogZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgPyBlbGVtZW50Lm5hdHVyYWxIZWlnaHQgOiAwLFxuXHRcdFx0YXR0cldpZHRoOiBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnd2lkdGgnKSB8fCAnMCcpLFxuXHRcdFx0YXR0ckhlaWdodDogcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpIHx8ICcwJylcblx0XHR9KSk7XG5cblx0XHQvLyAzLiBCYXRjaCBjb21wdXRlIHN0eWxlcyAtIFByb2Nlc3MgaW4gY2h1bmtzIHRvIGF2b2lkIGxvbmcgdGFza3Ncblx0XHRjb25zdCBCQVRDSF9TSVpFID0gNTA7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtZWFzdXJlbWVudHMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcblx0XHRcdGNvbnN0IGJhdGNoID0gbWVhc3VyZW1lbnRzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcblx0XHRcdFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gUmVhZCBwaGFzZSAtIGNvbXB1dGUgYWxsIHN0eWxlcyBhdCBvbmNlXG5cdFx0XHRcdGNvbnN0IHN0eWxlcyA9IGJhdGNoLm1hcCgoeyBlbGVtZW50IH0pID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpKTtcblx0XHRcdFx0Y29uc3QgcmVjdHMgPSBiYXRjaC5tYXAoKHsgZWxlbWVudCB9KSA9PiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIFByb2Nlc3MgcGhhc2UgLSBubyBET00gb3BlcmF0aW9uc1xuXHRcdFx0XHRiYXRjaC5mb3JFYWNoKChtZWFzdXJlbWVudCwgaW5kZXgpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3R5bGUgPSBzdHlsZXNbaW5kZXhdO1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVjdCA9IHJlY3RzW2luZGV4XTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly8gR2V0IHRyYW5zZm9ybSBzY2FsZSBpbiB0aGUgc2FtZSBiYXRjaFxuXHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtO1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2NhbGUgPSB0cmFuc2Zvcm0gPyBcblx0XHRcdFx0XHRcdFx0cGFyc2VGbG9hdCh0cmFuc2Zvcm0ubWF0Y2godHJhbnNmb3JtUmVnZXgpPy5bMV0gfHwgJzEnKSA6IDE7XG5cblx0XHRcdFx0XHRcdC8vIENhbGN1bGF0ZSBlZmZlY3RpdmUgZGltZW5zaW9uc1xuXHRcdFx0XHRcdFx0Y29uc3Qgd2lkdGhzID0gW1xuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5uYXR1cmFsV2lkdGgsXG5cdFx0XHRcdFx0XHRcdG1lYXN1cmVtZW50LmF0dHJXaWR0aCxcblx0XHRcdFx0XHRcdFx0cGFyc2VJbnQoc3R5bGUud2lkdGgpIHx8IDAsXG5cdFx0XHRcdFx0XHRcdHJlY3Qud2lkdGggKiBzY2FsZVxuXHRcdFx0XHRcdFx0XS5maWx0ZXIoZGltID0+IHR5cGVvZiBkaW0gPT09ICdudW1iZXInICYmIGRpbSA+IDApO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBoZWlnaHRzID0gW1xuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5uYXR1cmFsSGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRtZWFzdXJlbWVudC5hdHRySGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRwYXJzZUludChzdHlsZS5oZWlnaHQpIHx8IDAsXG5cdFx0XHRcdFx0XHRcdHJlY3QuaGVpZ2h0ICogc2NhbGVcblx0XHRcdFx0XHRcdF0uZmlsdGVyKGRpbSA9PiB0eXBlb2YgZGltID09PSAnbnVtYmVyJyAmJiBkaW0gPiAwKTtcblxuXHRcdFx0XHRcdFx0Ly8gRGVjaXNpb24gcGhhc2UgLSBubyBET00gb3BlcmF0aW9uc1xuXHRcdFx0XHRcdFx0aWYgKHdpZHRocy5sZW5ndGggPiAwICYmIGhlaWdodHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlZmZlY3RpdmVXaWR0aCA9IE1hdGgubWluKC4uLndpZHRocyk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVmZmVjdGl2ZUhlaWdodCA9IE1hdGgubWluKC4uLmhlaWdodHMpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChlZmZlY3RpdmVXaWR0aCA8IE1JTl9ESU1FTlNJT04gfHwgZWZmZWN0aXZlSGVpZ2h0IDwgTUlOX0RJTUVOU0lPTikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGlkZW50aWZpZXIgPSB0aGlzLmdldEVsZW1lbnRJZGVudGlmaWVyKG1lYXN1cmVtZW50LmVsZW1lbnQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzbWFsbEltYWdlcy5hZGQoaWRlbnRpZmllcik7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzZWRDb3VudCsrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIGVsZW1lbnQgZGltZW5zaW9uczonLCBlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignRGVmdWRkbGU6IEZhaWxlZCB0byBwcm9jZXNzIGJhdGNoOicsIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuX2xvZygnRm91bmQgc21hbGwgZWxlbWVudHM6Jywge1xuXHRcdFx0Y291bnQ6IHByb2Nlc3NlZENvdW50LFxuXHRcdFx0dG90YWxFbGVtZW50czogZWxlbWVudHMubGVuZ3RoLFxuXHRcdFx0cHJvY2Vzc2luZ1RpbWU6IGAkeyhlbmRUaW1lIC0gc3RhcnRUaW1lKS50b0ZpeGVkKDIpfW1zYFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHNtYWxsSW1hZ2VzO1xuXHR9XG5cblx0cHJpdmF0ZSByZW1vdmVTbWFsbEltYWdlcyhkb2M6IERvY3VtZW50LCBzbWFsbEltYWdlczogU2V0PHN0cmluZz4pIHtcblx0XHRsZXQgcmVtb3ZlZENvdW50ID0gMDtcblxuXHRcdFsnaW1nJywgJ3N2ZyddLmZvckVhY2godGFnID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG5cdFx0XHRBcnJheS5mcm9tKGVsZW1lbnRzKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRjb25zdCBpZGVudGlmaWVyID0gdGhpcy5nZXRFbGVtZW50SWRlbnRpZmllcihlbGVtZW50KTtcblx0XHRcdFx0aWYgKGlkZW50aWZpZXIgJiYgc21hbGxJbWFnZXMuaGFzKGlkZW50aWZpZXIpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmUoKTtcblx0XHRcdFx0XHRyZW1vdmVkQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9sb2coJ1JlbW92ZWQgc21hbGwgZWxlbWVudHM6JywgcmVtb3ZlZENvdW50KTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0RWxlbWVudElkZW50aWZpZXIoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB8IG51bGwge1xuXHRcdC8vIFRyeSB0byBjcmVhdGUgYSB1bmlxdWUgaWRlbnRpZmllciB1c2luZyB2YXJpb3VzIGF0dHJpYnV0ZXNcblx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcblx0XHRcdC8vIEZvciBsYXp5LWxvYWRlZCBpbWFnZXMsIHVzZSBkYXRhLXNyYyBhcyBpZGVudGlmaWVyIGlmIGF2YWlsYWJsZVxuXHRcdFx0Y29uc3QgZGF0YVNyYyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXHRcdFx0aWYgKGRhdGFTcmMpIHJldHVybiBgc3JjOiR7ZGF0YVNyY31gO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBzcmMgPSBlbGVtZW50LnNyYyB8fCAnJztcblx0XHRcdGNvbnN0IHNyY3NldCA9IGVsZW1lbnQuc3Jjc2V0IHx8ICcnO1xuXHRcdFx0Y29uc3QgZGF0YVNyY3NldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc3JjKSByZXR1cm4gYHNyYzoke3NyY31gO1xuXHRcdFx0aWYgKHNyY3NldCkgcmV0dXJuIGBzcmNzZXQ6JHtzcmNzZXR9YDtcblx0XHRcdGlmIChkYXRhU3Jjc2V0KSByZXR1cm4gYHNyY3NldDoke2RhdGFTcmNzZXR9YDtcblx0XHR9XG5cblx0XHRjb25zdCBpZCA9IGVsZW1lbnQuaWQgfHwgJyc7XG5cdFx0Y29uc3QgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgfHwgJyc7XG5cdFx0Y29uc3Qgdmlld0JveCA9IGVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKSB8fCAnJyA6ICcnO1xuXHRcdFxuXHRcdGlmIChpZCkgcmV0dXJuIGBpZDoke2lkfWA7XG5cdFx0aWYgKHZpZXdCb3gpIHJldHVybiBgdmlld0JveDoke3ZpZXdCb3h9YDtcblx0XHRpZiAoY2xhc3NOYW1lKSByZXR1cm4gYGNsYXNzOiR7Y2xhc3NOYW1lfWA7XG5cdFx0XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRNYWluQ29udGVudChkb2M6IERvY3VtZW50KTogRWxlbWVudCB8IG51bGwge1xuXG5cdFx0Ly8gRmluZCBhbGwgcG90ZW50aWFsIGNvbnRlbnQgY29udGFpbmVyc1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXM6IHsgZWxlbWVudDogRWxlbWVudDsgc2NvcmU6IG51bWJlciB9W10gPSBbXTtcblxuXHRcdEVOVFJZX1BPSU5UX0VMRU1FTlRTLmZvckVhY2goKHNlbGVjdG9yLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHQvLyBCYXNlIHNjb3JlIGZyb20gc2VsZWN0b3IgcHJpb3JpdHkgKGVhcmxpZXIgPSBoaWdoZXIpXG5cdFx0XHRcdGxldCBzY29yZSA9IChFTlRSWV9QT0lOVF9FTEVNRU5UUy5sZW5ndGggLSBpbmRleCkgKiAxMDtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEFkZCBzY29yZSBiYXNlZCBvbiBjb250ZW50IGFuYWx5c2lzXG5cdFx0XHRcdHNjb3JlICs9IHRoaXMuc2NvcmVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRcblx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoKHsgZWxlbWVudCwgc2NvcmUgfSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGlmIChjYW5kaWRhdGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0Ly8gRmFsbCBiYWNrIHRvIHNjb3JpbmcgYmxvY2sgZWxlbWVudHNcblx0XHRcdC8vIEN1cnJlbnRseSA8Ym9keT4gZWxlbWVudCBpcyB1c2VkIGFzIHRoZSBmYWxsYmFjaywgc28gdGhpcyBpcyBub3QgdXNlZFxuXHRcdFx0cmV0dXJuIHRoaXMuZmluZENvbnRlbnRCeVNjb3JpbmcoZG9jKTtcblx0XHR9XG5cblx0XHQvLyBTb3J0IGJ5IHNjb3JlIGRlc2NlbmRpbmdcblx0XHRjYW5kaWRhdGVzLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcblx0XHRcblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0dGhpcy5fbG9nKCdDb250ZW50IGNhbmRpZGF0ZXM6JywgY2FuZGlkYXRlcy5tYXAoYyA9PiAoe1xuXHRcdFx0XHRlbGVtZW50OiBjLmVsZW1lbnQudGFnTmFtZSxcblx0XHRcdFx0c2VsZWN0b3I6IHRoaXMuZ2V0RWxlbWVudFNlbGVjdG9yKGMuZWxlbWVudCksXG5cdFx0XHRcdHNjb3JlOiBjLnNjb3JlXG5cdFx0XHR9KSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYW5kaWRhdGVzWzBdLmVsZW1lbnQ7XG5cdH1cblxuXHRwcml2YXRlIGZpbmRDb250ZW50QnlTY29yaW5nKGRvYzogRG9jdW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG5cdFx0Y29uc3QgY2FuZGlkYXRlcyA9IHRoaXMuc2NvcmVFbGVtZW50cyhkb2MpO1xuXHRcdHJldHVybiBjYW5kaWRhdGVzLmxlbmd0aCA+IDAgPyBjYW5kaWRhdGVzWzBdLmVsZW1lbnQgOiBudWxsO1xuXHR9XG5cblx0cHJpdmF0ZSBnZXRFbGVtZW50U2VsZWN0b3IoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB7XG5cdFx0Y29uc3QgcGFydHM6IHN0cmluZ1tdID0gW107XG5cdFx0bGV0IGN1cnJlbnQ6IEVsZW1lbnQgfCBudWxsID0gZWxlbWVudDtcblx0XHRcblx0XHR3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSB0aGlzLmRvYy5kb2N1bWVudEVsZW1lbnQpIHtcblx0XHRcdGxldCBzZWxlY3RvciA9IGN1cnJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKGN1cnJlbnQuaWQpIHtcblx0XHRcdFx0c2VsZWN0b3IgKz0gJyMnICsgY3VycmVudC5pZDtcblx0XHRcdH0gZWxzZSBpZiAoY3VycmVudC5jbGFzc05hbWUgJiYgdHlwZW9mIGN1cnJlbnQuY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRzZWxlY3RvciArPSAnLicgKyBjdXJyZW50LmNsYXNzTmFtZS50cmltKCkuc3BsaXQoL1xccysvKS5qb2luKCcuJyk7XG5cdFx0XHR9XG5cdFx0XHRwYXJ0cy51bnNoaWZ0KHNlbGVjdG9yKTtcblx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcgPiAnKTtcblx0fVxuXG5cdHByaXZhdGUgc2NvcmVFbGVtZW50cyhkb2M6IERvY3VtZW50KTogQ29udGVudFNjb3JlW10ge1xuXHRcdGNvbnN0IGNhbmRpZGF0ZXM6IENvbnRlbnRTY29yZVtdID0gW107XG5cblx0XHRCTE9DS19FTEVNRU5UUy5mb3JFYWNoKCh0YWc6IHN0cmluZykgPT4ge1xuXHRcdFx0QXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKSkuZm9yRWFjaCgoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzY29yZSA9IHRoaXMuc2NvcmVFbGVtZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoc2NvcmUgPiAwKSB7XG5cdFx0XHRcdFx0Y2FuZGlkYXRlcy5wdXNoKHsgc2NvcmUsIGVsZW1lbnQgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNhbmRpZGF0ZXMuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuXHR9XG5cblx0cHJpdmF0ZSBzY29yZUVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IG51bWJlciB7XG5cdFx0bGV0IHNjb3JlID0gMDtcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGVsZW1lbnQgcHJvcGVydGllc1xuXHRcdGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICYmIHR5cGVvZiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgPyBcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0XHRjb25zdCBpZCA9IGVsZW1lbnQuaWQgPyBlbGVtZW50LmlkLnRvTG93ZXJDYXNlKCkgOiAnJztcblxuXHRcdC8vIFNjb3JlIGJhc2VkIG9uIGNvbnRlbnRcblx0XHRjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0Q29udGVudCB8fCAnJztcblx0XHRjb25zdCB3b3JkcyA9IHRleHQuc3BsaXQoL1xccysvKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gTWF0aC5taW4oTWF0aC5mbG9vcih3b3JkcyAvIDEwMCksIDMpO1xuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gbGluayBkZW5zaXR5XG5cdFx0Y29uc3QgbGlua3MgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG5cdFx0Y29uc3QgbGlua1RleHQgPSBBcnJheS5mcm9tKGxpbmtzKS5yZWR1Y2UoKGFjYywgbGluaykgPT4gYWNjICsgKGxpbmsudGV4dENvbnRlbnQ/Lmxlbmd0aCB8fCAwKSwgMCk7XG5cdFx0Y29uc3QgbGlua0RlbnNpdHkgPSB0ZXh0Lmxlbmd0aCA/IGxpbmtUZXh0IC8gdGV4dC5sZW5ndGggOiAwO1xuXHRcdGlmIChsaW5rRGVuc2l0eSA+IDAuNSkge1xuXHRcdFx0c2NvcmUgLT0gMTA7XG5cdFx0fVxuXG5cdFx0Ly8gU2NvcmUgYmFzZWQgb24gcHJlc2VuY2Ugb2YgbWVhbmluZ2Z1bCBlbGVtZW50c1xuXHRcdGNvbnN0IHBhcmFncmFwaHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwJykubGVuZ3RoO1xuXHRcdHNjb3JlICs9IHBhcmFncmFwaHM7XG5cblx0XHRjb25zdCBpbWFnZXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKS5sZW5ndGg7XG5cdFx0c2NvcmUgKz0gTWF0aC5taW4oaW1hZ2VzICogMywgOSk7XG5cblx0XHRyZXR1cm4gc2NvcmU7XG5cdH1cbn0gIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImV4cG9ydCB7IERlZnVkZGxlIH0gZnJvbSAnLi9kZWZ1ZGRsZSc7XG5leHBvcnQgdHlwZSB7IERlZnVkZGxlT3B0aW9ucywgRGVmdWRkbGVSZXNwb25zZSwgRGVmdWRkbGVNZXRhZGF0YSB9IGZyb20gJy4vdHlwZXMnOyAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
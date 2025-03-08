import { MetadataExtractor } from './metadata';
import { DefuddleOptions, DefuddleResponse } from './types';

// Patterns for scoring content
const BLOCK_ELEMENTS = ['div', 'section', 'article', 'main'];
const MOBILE_WIDTH = 600;

const HIDDEN_ELEMENTS_SELECTOR = [
	'[hidden]',
	'[aria-hidden="true"]',
//	'[style*="display: none"]', causes problems for math formulas
//	'[style*="display:none"]',
	'[style*="visibility: hidden"]',
	'[style*="visibility:hidden"]',
	'.hidden',
	'.invisible'
].join(',');

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

// Delete all element attributes except these
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
	'article__info',
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

interface ContentScore {
	score: number;
	element: Element;
}

interface StyleChange {
	selector: string;
	styles: string;
}

export class Defuddle {
	private doc: Document;
	private options: DefuddleOptions;
	private debug: boolean;

	/**
	 * Create a new Defuddle instance
	 * @param doc - The document to parse
	 * @param options - Options for parsing
	 */
	constructor(doc: Document, options: DefuddleOptions = {}) {
		this.doc = doc;
		this.options = options;
		this.debug = options.debug || false;
	}

	/**
	 * Parse the document and extract its main content
	 */
	parse(): DefuddleResponse {
		try {
			// Evaluate styles and sizes on original document
			const mobileStyles = this._evaluateMediaQueries(this.doc);
			const smallImages = this.findSmallImages(this.doc);
			
			// Clone after evaluation
			const clone = this.doc.cloneNode(true) as Document;
			const schemaOrgData = MetadataExtractor.extractSchemaOrgData(this.doc);

			// Apply mobile style to clone
			this.applyMobileStyles(clone, mobileStyles);

			// Find main content
			const mainContent = this.findMainContent(clone);
			if (!mainContent) {
				return {
					content: this.doc.body.innerHTML,
					...MetadataExtractor.extract(this.doc, schemaOrgData)
				};
			}

			// Remove small images identified from original document
			this.removeSmallImages(clone, smallImages);
			
			// Perform other destructive operations on the clone
			this.removeHiddenElements(clone);
			this.removeClutter(clone);

			// Clean up the main content
			this.cleanContent(mainContent);

			const metadata = MetadataExtractor.extract(this.doc, schemaOrgData);

			return {
				content: mainContent ? mainContent.outerHTML : this.doc.body.innerHTML,
				...metadata
			};
		} catch (error) {
			console.error('Defuddle', 'Error processing document:', error);
			const schemaOrgData = MetadataExtractor.extractSchemaOrgData(this.doc);
			return {
				content: this.doc.body.innerHTML,
				...MetadataExtractor.extract(this.doc, schemaOrgData)
			};
		}
	}

	// Make all other methods private by removing the static keyword and using private
	private _log(...args: any[]): void {
		if (this.debug) {
			console.log('Defuddle:', ...args);
		}
	}

	private _evaluateMediaQueries(doc: Document): StyleChange[] {
		const mobileStyles: StyleChange[] = [];

		try {
			// Get all styles, including inline styles
			const sheets = Array.from(doc.styleSheets).filter(sheet => {
				try {
					const rules = sheet.cssRules;
					return true;
				} catch (e) {
					return false;
				}
			});
			
			sheets.forEach(sheet => {
				try {
					const rules = Array.from(sheet.cssRules);
					rules.forEach(rule => {
						if (rule instanceof CSSMediaRule) {
							if (rule.conditionText.includes('max-width')) {
								const maxWidth = parseInt(rule.conditionText.match(/\d+/)?.[0] || '0');
								
								if (MOBILE_WIDTH <= maxWidth) {
									Array.from(rule.cssRules).forEach(cssRule => {
										if (cssRule instanceof CSSStyleRule) {
											try {
												mobileStyles.push({
													selector: cssRule.selectorText,
													styles: cssRule.style.cssText
												});
											} catch (e) {
												console.error('Defuddle', 'Error collecting styles for selector:', cssRule.selectorText, e);
											}
										}
									});
								}
							}
						}
					});
				} catch (e) {
					console.error('Defuddle', 'Error processing stylesheet:', e);
				}
			});
		} catch (e) {
			console.error('Defuddle', 'Error evaluating media queries:', e);
		}

		return mobileStyles;
	}

	private applyMobileStyles(doc: Document, mobileStyles: StyleChange[]) {
		let appliedCount = 0;

		mobileStyles.forEach(({selector, styles}) => {
			try {
				const elements = doc.querySelectorAll(selector);
				elements.forEach(element => {
					element.setAttribute('style', 
						(element.getAttribute('style') || '') + styles
					);
					appliedCount++;
				});
			} catch (e) {
				console.error('Defuddle', 'Error applying styles for selector:', selector, e);
			}
		});

	}

	private removeHiddenElements(doc: Document) {
		let count = 0;

		// Existing hidden elements selector
		const hiddenElements = doc.querySelectorAll(HIDDEN_ELEMENTS_SELECTOR);
		hiddenElements.forEach(el => {
			el.remove();
			count++;
		});

		// Also remove elements hidden by computed style
		const allElements = doc.getElementsByTagName('*');
		Array.from(allElements).forEach(element => {
			const computedStyle = window.getComputedStyle(element);
			if (
				computedStyle.display === 'none' ||
				computedStyle.visibility === 'hidden' ||
				computedStyle.opacity === '0'
			) {
				element.remove();
				count++;
			}
		});

		this._log('Removed hidden elements:', count);
	}

	private removeClutter(doc: Document) {
		let exactSelectorCount = 0;
		let partialSelectorCount = 0;

		// Normalize and combine all exact selectors into a single selector string
		const normalizedSelectors = EXACT_SELECTORS.map(selector => {
			// Handle attribute selectors separately
			if (selector.includes('[')) {
				// Split attribute selectors into parts
				const parts = selector.split(/(\[.*?\])/);
				return parts.map(part => {
					// Don't lowercase the attribute value if it's in quotes
					if (part.startsWith('[') && part.includes('=')) {
						const [attr, value] = part.slice(1, -1).split('=');
						if (value.startsWith('"') || value.startsWith("'")) {
							return `[${attr.toLowerCase()}=${value}]`;
						}
					}
					return part.toLowerCase();
				}).join('');
			}
			return selector.toLowerCase();
		});

		const combinedSelector = normalizedSelectors.join(',');
		
		// Query and remove elements
		const exactElements = doc.querySelectorAll(combinedSelector);
		exactElements.forEach(el => {
			if (el?.parentNode) {
				el.remove();
				exactSelectorCount++;
			}
		});

		// Create RegExp objects once instead of creating them in each iteration
		const patternRegexes = PARTIAL_SELECTORS.map(pattern => new RegExp(pattern, 'i'));

		// Use a DocumentFragment for batch removals
		const elementsToRemove = new Set<Element>();
		
		// Get all elements with class, id, or data-testid attributes for more targeted iteration
		const elements = doc.querySelectorAll('[class], [id], [data-testid], [data-qa], [data-cy]');
		
		elements.forEach(el => {
			if (!el || !el.parentNode) return;

			const className = el.className && typeof el.className === 'string' ? 
				el.className.toLowerCase() : '';
			const id = el.id ? el.id.toLowerCase() : '';
			const testId = el.getAttribute('data-testid')?.toLowerCase() || '';
			const testQa = el.getAttribute('data-qa')?.toLowerCase() || '';
			const testCy = el.getAttribute('data-cy')?.toLowerCase() || '';

			// Combine all attributes into one string for single pass checking
			const attributeText = `${className} ${id} ${testId} ${testQa} ${testCy}`;
			
			// Check if any pattern matches
			const shouldRemove = patternRegexes.some(regex => regex.test(attributeText));
			
			if (shouldRemove) {
				elementsToRemove.add(el);
				partialSelectorCount++;
			}
		});

		// Batch remove elements
		elementsToRemove.forEach(el => el.remove());

		this._log('Found clutter elements:', {
			exactSelectors: exactSelectorCount,
			partialSelectors: partialSelectorCount,
			total: exactSelectorCount + partialSelectorCount
		});
	}

	private cleanContent(element: Element) {
		// Remove HTML comments
		this.removeHtmlComments(element);
		
		// Handle h1 elements - remove first one and convert others to h2
		this.handleHeadings(element);
		
		// Strip unwanted attributes
		this.stripUnwantedAttributes(element);

		// Remove empty elements
		this.removeEmptyElements(element);
	}

	private handleHeadings(element: Element) {
		const h1s = element.getElementsByTagName('h1');
		let isFirstH1 = true;

		Array.from(h1s).forEach(h1 => {
			if (isFirstH1) {
				h1.remove();
				isFirstH1 = false;
			} else {
				// Convert subsequent h1s to h2s
				const h2 = document.createElement('h2');
				h2.innerHTML = h1.innerHTML;
				// Copy allowed attributes
				Array.from(h1.attributes).forEach(attr => {
					if (ALLOWED_ATTRIBUTES.has(attr.name)) {
						h2.setAttribute(attr.name, attr.value);
					}
				});
				h1.parentNode?.replaceChild(h2, h1);
			}
		});
	}

	private removeHtmlComments(element: Element) {
		const comments: Comment[] = [];
		const walker = document.createTreeWalker(
			element,
			NodeFilter.SHOW_COMMENT,
			null
		);

		let node;
		while (node = walker.nextNode()) {
			comments.push(node as Comment);
		}

		comments.forEach(comment => {
			comment.remove();
		});

		this._log('Removed HTML comments:', comments.length);
	}

	private stripUnwantedAttributes(element: Element) {
		let attributeCount = 0;

		const processElement = (el: Element) => {
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

	private removeEmptyElements(element: Element) {
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
				
				// Check if element has only whitespace
				const hasOnlyWhitespace = el.textContent?.trim().length === 0;
				
				// Check if element has no meaningful children
				// Note: comments were already removed
				const hasNoChildren = !el.hasChildNodes() || 
					(Array.from(el.childNodes).every(node => 
						node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length === 0
					));

				return hasOnlyWhitespace && hasNoChildren;
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
	private findSmallImages(doc: Document): Set<string> {
		let removedCount = 0;
		const MIN_DIMENSION = 33;
		const smallImages = new Set<string>();

		const processElements = (elements: HTMLCollectionOf<Element>, type: 'img' | 'svg') => {
			Array.from(elements).forEach(element => {
				try {
					const computedStyle = window.getComputedStyle(element);
					
					if (type === 'img') {
						const img = element as HTMLImageElement;
						// Get all possible dimensions
						const naturalWidth = img.naturalWidth || 0;
						const naturalHeight = img.naturalHeight || 0;
						const attrWidth = parseInt(img.getAttribute('width') || '0');
						const attrHeight = parseInt(img.getAttribute('height') || '0');
						const styleWidth = parseInt(computedStyle.width) || 0;
						const styleHeight = parseInt(computedStyle.height) || 0;
						const rect = img.getBoundingClientRect();
						const displayWidth = rect.width;
						const displayHeight = rect.height;

						// Check if image is scaled down by CSS transform
						const transform = computedStyle.transform;
						const scale = transform ? parseFloat(transform.match(/scale\(([\d.]+)\)/)?.[1] || '1') : 1;
						const scaledWidth = displayWidth * scale;
						const scaledHeight = displayHeight * scale;

						// Use the smallest non-zero dimensions we can find
						const effectiveWidth = Math.min(
							...[naturalWidth, attrWidth, styleWidth, scaledWidth]
								.filter(dim => dim > 0)
						);
						const effectiveHeight = Math.min(
							...[naturalHeight, attrHeight, styleHeight, scaledHeight]
								.filter(dim => dim > 0)
						);

						if (effectiveWidth > 0 && effectiveHeight > 0 && 
							(effectiveWidth < MIN_DIMENSION || effectiveHeight < MIN_DIMENSION)) {
							// Store unique identifier for the image
							const identifier = this.getElementIdentifier(img);
							if (identifier) {
								smallImages.add(identifier);
								removedCount++;
							}
						}
					} else {
						// Handle SVG elements
						const svg = element as SVGElement;
						const rect = svg.getBoundingClientRect();
						const styleWidth = parseInt(computedStyle.width) || 0;
						const styleHeight = parseInt(computedStyle.height) || 0;
						const attrWidth = parseInt(svg.getAttribute('width') || '0');
						const attrHeight = parseInt(svg.getAttribute('height') || '0');
						
						// Get effective dimensions
						const effectiveWidth = Math.min(
							...[rect.width, styleWidth, attrWidth]
								.filter(dim => dim > 0)
						);
						const effectiveHeight = Math.min(
							...[rect.height, styleHeight, attrHeight]
								.filter(dim => dim > 0)
						);

						if (effectiveWidth > 0 && effectiveHeight > 0 && 
							(effectiveWidth < MIN_DIMENSION || effectiveHeight < MIN_DIMENSION)) {
							const identifier = this.getElementIdentifier(svg);
							if (identifier) {
								smallImages.add(identifier);
								removedCount++;
							}
						}
					}
				} catch (e) {
					console.error('Error processing element:', e);
				}
			});
		};

		processElements(doc.getElementsByTagName('img'), 'img');
		processElements(doc.getElementsByTagName('svg'), 'svg');

		this._log('Found small elements:', removedCount);
		return smallImages;
	}

	private removeSmallImages(doc: Document, smallImages: Set<string>) {
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

	private getElementIdentifier(element: Element): string | null {
		// Try to create a unique identifier using various attributes
		if (element instanceof HTMLImageElement) {
			const src = element.src || element.getAttribute('data-src') || '';
			const srcset = element.srcset || element.getAttribute('data-srcset') || '';
			if (src) return `src:${src}`;
			if (srcset) return `srcset:${srcset}`;
		}

		const id = element.id || '';
		const className = element.className || '';
		const viewBox = element instanceof SVGElement ? element.getAttribute('viewBox') || '' : '';
		
		if (id) return `id:${id}`;
		if (viewBox) return `viewBox:${viewBox}`;
		if (className) return `class:${className}`;
		
		return null;
	}

	private findMainContent(doc: Document): Element | null {

		// Find all potential content containers
		const candidates: { element: Element; score: number }[] = [];

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

	private findContentByScoring(doc: Document): Element | null {
		const candidates = this.scoreElements(doc);
		return candidates.length > 0 ? candidates[0].element : null;
	}

	private getElementSelector(element: Element): string {
		const parts: string[] = [];
		let current: Element | null = element;
		
		while (current && current !== document.documentElement) {
			let selector = current.tagName.toLowerCase();
			if (current.id) {
				selector += '#' + current.id;
			} else if (current.className && typeof current.className === 'string') {
				selector += '.' + current.className.trim().split(/\s+/).join('.');
			}
			parts.unshift(selector);
			current = current.parentElement;
		}
		
		return parts.join(' > ');
	}

	private scoreElements(doc: Document): ContentScore[] {
		const candidates: ContentScore[] = [];

		BLOCK_ELEMENTS.forEach((tag: string) => {
			Array.from(doc.getElementsByTagName(tag)).forEach((element: Element) => {
				const score = this.scoreElement(element);
				if (score > 0) {
					candidates.push({ score, element });
				}
			});
		});

		return candidates.sort((a, b) => b.score - a.score);
	}

	private scoreElement(element: Element): number {
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
		const linkText = Array.from(links).reduce((acc, link) => acc + (link.textContent?.length || 0), 0);
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
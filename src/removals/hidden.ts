import { DebugRemoval } from '../types';
import { textPreview, logDebug } from '../utils';
import { hasResponsiveShowClass } from '../utils/dom';

export function removeHiddenElements(doc: Document, debug: boolean, debugRemovals?: DebugRemoval[]) {
	let count = 0;
	const elementsToRemove = new Map<Element, string>();

	// Check inline styles and CSS class-based hidden patterns.
	const hiddenStylePattern = /(?:^|;\s*)(?:display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0)(?:\s*;|\s*$)/i;

	// Only use getComputedStyle in browser environments where it's meaningful.
	// In JSDOM/linkedom without stylesheets, it's extremely slow and unreliable.
	const defaultView = doc.defaultView;
	const isBrowser = typeof window !== 'undefined' && defaultView === window;

	const allElements = doc.querySelectorAll('*');
	for (const element of allElements) {
		// Skip elements that contain math — sites like Wikipedia wrap MathML
		// in display:none spans for accessibility (the visible version is an
		// image/SVG fallback). We need to preserve these for math extraction.
		if (element.querySelector('math, [data-mathml], .katex-mathml') ||
			element.tagName.toLowerCase() === 'math') {
			continue;
		}

		// Check inline style for hidden patterns
		const style = element.getAttribute('style');
		if (style && hiddenStylePattern.test(style)) {
			const reason = style.includes('display') ? 'display:none' :
				style.includes('visibility') ? 'visibility:hidden' : 'opacity:0';
			elementsToRemove.set(element, reason);
			count++;
			continue;
		}

		// Use getComputedStyle only in real browser environments
		if (isBrowser) {
			try {
				const computedStyle = defaultView!.getComputedStyle(element);
				let reason = '';
				if (computedStyle.display === 'none') reason = 'display:none';
				else if (computedStyle.visibility === 'hidden') reason = 'visibility:hidden';
				else if (computedStyle.opacity === '0') reason = 'opacity:0';
				if (reason) {
					elementsToRemove.set(element, reason);
					count++;
					continue;
				}
			} catch (e) {}
		}

		// Detect CSS framework hidden utilities (e.g. Tailwind's "hidden",
		// "sm:hidden", "not-machine:hidden")
		const className = element.getAttribute('class') || '';
		if (className) {
			const tokens = className.split(/\s+/);
			if (hasResponsiveShowClass(className)) continue;

			// A breakpoint-prefixed "X:hidden" (e.g. "sm:hidden") only means
			// "hidden from this breakpoint" — the element IS visible at some
			// real viewport. That's a safe removal signal for UI chrome (nav
			// menus, mobile-only buttons: tests/fixtures/*obsidian*), where any
			// single variant is redundant if removed. It's an unsafe one for
			// actual media: sites commonly ship one <img>/<picture>/<source>
			// per breakpoint with *different* crops or resolutions, each
			// hidden at a different range and none carrying a companion
			// "show" class for hasResponsiveShowClass to catch — removing
			// whichever one this heuristic happens to flag can strip the
			// image's alt/title/attributes entirely if it empties the
			// <picture> before the image-processing rules run. Only the
			// unconditional "hidden"/"invisible" token is trusted for these
			// tags; picking the best of several real variants is left to
			// _deduplicateImages, which compares actual image identity.
			const tagName = element.tagName;
			const isMediaElement = tagName === 'IMG' || tagName === 'PICTURE' || tagName === 'SOURCE';

			for (const token of tokens) {
				// Match exact "hidden"/"invisible" and variant prefixes like
				// "sm:hidden", "lg:invisible". Skip Tailwind arbitrary variants
				// containing "[" (e.g. "[&_.class]:hidden", "group-[.state]:hidden")
				// — those are conditional state selectors, not unconditional hiding.
				const isExact = token === 'hidden' || token === 'invisible';
				const isVariant = !isMediaElement && !token.includes('[') &&
					(token.endsWith(':hidden') || token.endsWith(':invisible'));

				if (isExact || isVariant) {
					elementsToRemove.set(element, `class:${token}`);
					count++;
					break;
				}
			}
		}
	}

	// Batch remove all hidden elements
	elementsToRemove.forEach((reason, el) => {
		if (debug && debugRemovals) {
			debugRemovals.push({
				step: 'removeHiddenElements',
				reason,
				text: textPreview(el)
			});
		}
		el.remove();
	});
	logDebug(debug, 'Removed hidden elements:', count);
}

import { SUPPORTED_LANGUAGES, ALLOWED_ATTRIBUTES } from '../constants';

// Converts code blocks with different syntax highlighters and line numbers
// to a standard <pre> and <code> element with a language attribute
export const codeBlockRules = [
	{
		selector: [
			// Basic code blocks
			'pre',
			
			// Common syntax highlighter containers
			'div[class*="prismjs"]',
			'.syntaxhighlighter',
			'.highlight',
			'.highlight-source',
			'.wp-block-syntaxhighlighter-code',
			'.wp-block-code'
		].join(', '),
		element: 'pre',
		transform: (el: Element): Element => {
			if (!(el instanceof HTMLElement)) return el;

			const getCodeLanguage = (element: HTMLElement): string => {
				// Check data-lang attribute first
				const dataLang = element.getAttribute('data-lang') || element.getAttribute('data-language');
				if (dataLang) {
					return dataLang.toLowerCase();
				}

				// Language patterns
				const languagePatterns = [
					/^language-(\w+)$/,          // language-javascript
					/^lang-(\w+)$/,              // lang-javascript
					/^(\w+)-code$/,              // javascript-code
					/^code-(\w+)$/,              // code-javascript
					/^syntax-(\w+)$/,            // syntax-javascript
					/^code-snippet__(\w+)$/,     // code-snippet__javascript
					/^highlight-(\w+)$/,         // highlight-javascript
					/^(\w+)-snippet$/,           // javascript-snippet
					/(?:^|\s)(?:language|lang|brush|syntax)-(\w+)(?:\s|$)/i  // Additional syntax highlighter patterns
				];

				// Check class names for patterns and supported languages
				const classNames = Array.from(element.classList);
				
				// First check for syntax highlighter specific format
				if (element.classList.contains('syntaxhighlighter')) {
					const langClass = classNames.find(c => !['syntaxhighlighter', 'nogutter'].includes(c));
					if (langClass && SUPPORTED_LANGUAGES.has(langClass.toLowerCase())) {
						return langClass.toLowerCase();
					}
				}

				// Then check patterns
				for (const className of classNames) {
					for (const pattern of languagePatterns) {
						const match = className.toLowerCase().match(pattern);
						if (match && match[1] && SUPPORTED_LANGUAGES.has(match[1].toLowerCase())) {
							return match[1].toLowerCase();
						}
					}
				}

				// Finally check for bare language names
				for (const className of classNames) {
					if (SUPPORTED_LANGUAGES.has(className.toLowerCase())) {
						return className.toLowerCase();
					}
				}

				return '';
			};

			// Try to get the language from the element and its ancestors
			let language = '';
			let currentElement: HTMLElement | null = el;
			
			while (currentElement && !language) {
				language = getCodeLanguage(currentElement);
				
				// Also check for code elements within the current element
				if (!language && currentElement.querySelector('code')) {
					language = getCodeLanguage(currentElement.querySelector('code')!);
				}
				
				currentElement = currentElement.parentElement;
			}

			// Extract content from WordPress syntax highlighter
			const extractWordPressContent = (element: HTMLElement): string => {
				// Handle WordPress syntax highlighter table format
				const codeContainer = element.querySelector('.syntaxhighlighter table .code .container');
				if (codeContainer) {
					return Array.from(codeContainer.children)
						.map(line => {
							const codeParts = Array.from(line.querySelectorAll('code'))
								.map(code => {
									let text = code.textContent || '';
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

				// Handle WordPress syntax highlighter non-table format
				const codeLines = element.querySelectorAll('.code .line');
				if (codeLines.length > 0) {
					return Array.from(codeLines)
						.map(line => {
							const codeParts = Array.from(line.querySelectorAll('code'))
								.map(code => code.textContent || '')
								.join('');
							return codeParts || line.textContent || '';
						})
						.join('\n');
				}

				return '';
			};

			// Recursively extract text content while preserving structure
			const extractStructuredText = (element: Node): string => {
				if (element.nodeType === Node.TEXT_NODE) {
					return element.textContent || '';
				}
				
				let text = '';
				if (element instanceof HTMLElement) {
					// Handle explicit line breaks
					if (element.tagName === 'BR') {
						return '\n';
					}

					// Handle common line-based code formats
					// This covers various syntax highlighter implementations that use
					// divs or spans to represent individual lines
					if (element.matches('div[class*="line"], span[class*="line"], .ec-line, [data-line-number], [data-line]')) {
						// Try to find the actual code content in common structures:
						// 1. A dedicated code container
						const codeContainer = element.querySelector('.code, .content, [class*="code-"], [class*="content-"]');
						if (codeContainer) {
							return (codeContainer.textContent || '') + '\n';
						}
						
						// 2. Line number is in a separate element
						const lineNumber = element.querySelector('.line-number, .gutter, [class*="line-number"], [class*="gutter"]');
						if (lineNumber) {
							const withoutLineNum = Array.from(element.childNodes)
								.filter(node => !lineNumber.contains(node))
								.map(node => extractStructuredText(node))
								.join('');
							return withoutLineNum + '\n';
						}
						
						// 3. Fallback to the entire line content
						return element.textContent + '\n';
					}
					
					element.childNodes.forEach(child => {
						text += extractStructuredText(child);
					});
				}
				return text;
			};

			// Extract content based on element type
			let codeContent = '';
			if (el.matches('.syntaxhighlighter, .wp-block-syntaxhighlighter-code')) {
				codeContent = extractWordPressContent(el);
			}
			
			// If no content extracted from WordPress format, use structured text extraction
			if (!codeContent) {
				codeContent = extractStructuredText(el);
			}

			// Clean up the content
			codeContent = codeContent
				.replace(/^\s+|\s+$/g, '')      // Trim start/end whitespace
				.replace(/\t/g, '    ')         // Convert tabs to spaces
				.replace(/\n{3,}/g, '\n\n')     // Normalize multiple newlines
				.replace(/\u00a0/g, ' ')        // Replace non-breaking spaces
				.replace(/^\n+/, '')            // Remove extra newlines at start
				.replace(/\n+$/, '');           // Remove extra newlines at end

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
	}
];
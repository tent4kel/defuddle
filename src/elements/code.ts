import { SUPPORTED_LANGUAGES, ALLOWED_ATTRIBUTES } from '../constants';

export const codeBlockRules = [
	// Code blocks
	{
		selector: 'pre',
		element: 'pre',
		transform: (el: Element): Element => {
			if (!(el instanceof HTMLElement)) return el;

			// Function to get language from class
			const getLanguageFromClass = (element: HTMLElement): string => {
				// Check data-lang attribute first
				const dataLang = element.getAttribute('data-lang') || element.getAttribute('data-language');
				if (dataLang) {
					return dataLang.toLowerCase();
				}

				// Define language patterns
				const languagePatterns = [
					/^language-(\w+)$/,          // language-javascript
					/^lang-(\w+)$/,              // lang-javascript
					/^(\w+)-code$/,              // javascript-code
					/^code-(\w+)$/,              // code-javascript
					/^syntax-(\w+)$/,            // syntax-javascript
					/^code-snippet__(\w+)$/,     // code-snippet__javascript
					/^highlight-(\w+)$/,         // highlight-javascript
					/^(\w+)-snippet$/            // javascript-snippet
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
			let currentElement: HTMLElement | null = el;
			
			while (currentElement && !language) {
				language = getLanguageFromClass(currentElement);
				
				// Also check for code elements within the current element
				if (!language && currentElement.querySelector('code')) {
					language = getLanguageFromClass(currentElement.querySelector('code')!);
				}
				
				currentElement = currentElement.parentElement;
			}

			// Function to recursively extract text content while preserving structure
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
							// Get all text content except the line number
							const withoutLineNum = Array.from(element.childNodes)
								.filter(node => !lineNumber.contains(node))
								.map(node => extractStructuredText(node))
								.join('');
							return withoutLineNum + '\n';
						}
						
						// 3. Fallback to the entire line content
						return element.textContent + '\n';
					}
					
					// Handle code elements and their children
					element.childNodes.forEach(child => {
						text += extractStructuredText(child);
					});
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
				// Preserve single newlines but collapse multiple newlines
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
	// Code blocks with syntax highlighting
	{
		selector: 'div[class*="prismjs"], .wp-block-syntaxhighlighter-code, .syntaxhighlighter, .highlight, .highlight-source, .wp-block-code, pre[class*="language-"], pre[class*="brush:"]',
		element: 'pre',
		transform: (el: Element): Element => {
			if (!(el instanceof HTMLElement)) return el;

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
					if (language) break;
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
			} else {
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
				} else {
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
]
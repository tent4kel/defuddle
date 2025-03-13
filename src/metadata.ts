import { DefuddleMetadata } from './types';

export class MetadataExtractor {
	static extract(doc: Document, schemaOrgData: any): DefuddleMetadata {
		let domain = '';
		let url = '';

		try {
			// Try to get URL from document location
			url = doc.location?.href || '';
			
			// If no URL from location, try other sources
			if (!url) {
				url = this.getMetaContent(doc, "property", "og:url") ||
					this.getMetaContent(doc, "property", "twitter:url") ||
					this.getSchemaProperty(doc, schemaOrgData, 'url') ||
					this.getSchemaProperty(doc, schemaOrgData, 'mainEntityOfPage.url') ||
					this.getSchemaProperty(doc, schemaOrgData, 'mainEntity.url') ||
					this.getSchemaProperty(doc, schemaOrgData, 'WebSite.url') ||
					doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
			}

			if (url) {
				domain = new URL(url).hostname.replace(/^www\./, '');
			}
		} catch (e) {
			// If URL parsing fails, try to get from base tag
			const baseTag = doc.querySelector('base[href]');
			if (baseTag) {
				try {
					url = baseTag.getAttribute('href') || '';
					domain = new URL(url).hostname.replace(/^www\./, '');
				} catch (e) {
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

	private static getAuthor(doc: Document, schemaOrgData: any): string {
		return (
			this.getMetaContent(doc, "name", "sailthru.author") ||
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
			''
		);
	}

	private static getSite(doc: Document, schemaOrgData: any): string {
		return (
			this.getSchemaProperty(doc, schemaOrgData, 'publisher.name') ||
			this.getMetaContent(doc, "property", "og:site_name") ||
			this.getSchemaProperty(doc, schemaOrgData, 'WebSite.name') ||
			this.getSchemaProperty(doc, schemaOrgData, 'sourceOrganization.name') ||
			this.getMetaContent(doc, "name", "copyright") ||
			this.getSchemaProperty(doc, schemaOrgData, 'copyrightHolder.name') ||
			this.getSchemaProperty(doc, schemaOrgData, 'isPartOf.name') ||
			this.getMetaContent(doc, "name", "application-name") ||
			''
		);
	}

	private static getTitle(doc: Document, schemaOrgData: any): string {
		const rawTitle = (
			this.getMetaContent(doc, "property", "og:title") ||
			this.getMetaContent(doc, "name", "twitter:title") ||
			this.getSchemaProperty(doc, schemaOrgData, 'headline') ||
			this.getMetaContent(doc, "name", "title") ||
			this.getMetaContent(doc, "name", "sailthru.title") ||
			doc.querySelector('title')?.textContent?.trim() ||
			''
		);

		return this.cleanTitle(rawTitle, this.getSite(doc, schemaOrgData));
	}

	private static cleanTitle(title: string, siteName: string): string {
		if (!title || !siteName) {
			console.log('cleanTitle: Empty title or siteName', { title, siteName });
			return title;
		}

		console.log('cleanTitle: Starting with', { title, siteName });

		// Remove site name if it exists
		const siteNameEscaped = siteName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const patterns = [
			`\\s*[\\|\\-–—]\\s*${siteNameEscaped}\\s*$`, // Title | Site Name
			`^\\s*${siteNameEscaped}\\s*[\\|\\-–—]\\s*`, // Site Name | Title
		];
		
		console.log('cleanTitle: Using patterns', patterns);
		
		for (const pattern of patterns) {
			const regex = new RegExp(pattern, 'i');
			console.log('cleanTitle: Testing pattern', pattern);
			if (regex.test(title)) {
				console.log('cleanTitle: Pattern matched');
				title = title.replace(regex, '');
				break;
			}
		}

		const finalTitle = title.trim();
		console.log('cleanTitle: Final result', finalTitle);
		return finalTitle;
	}

	private static getDescription(doc: Document, schemaOrgData: any): string {
		return (
			this.getMetaContent(doc, "name", "description") ||
			this.getMetaContent(doc, "property", "description") ||
			this.getMetaContent(doc, "property", "og:description") ||
			this.getSchemaProperty(doc, schemaOrgData, 'description') ||
			this.getMetaContent(doc, "name", "twitter:description") ||
			this.getMetaContent(doc, "name", "sailthru.description") ||
			''
		);
	}

	private static getImage(doc: Document, schemaOrgData: any): string {
		return (
			this.getMetaContent(doc, "property", "og:image") ||
			this.getMetaContent(doc, "name", "twitter:image") ||
			this.getSchemaProperty(doc, schemaOrgData, 'image.url') ||
			this.getMetaContent(doc, "name", "sailthru.image.full") ||
			''
		);
	}

	private static getFavicon(doc: Document, baseUrl: string): string {
		const iconFromMeta = this.getMetaContent(doc, "property", "og:image:favicon");
		if (iconFromMeta) return iconFromMeta;

		const iconLink = doc.querySelector("link[rel='icon']")?.getAttribute("href");
		if (iconLink) return iconLink;

		const shortcutLink = doc.querySelector("link[rel='shortcut icon']")?.getAttribute("href");
		if (shortcutLink) return shortcutLink;

		// Only try to construct favicon URL if we have a valid base URL
		if (baseUrl) {
			try {
				return new URL("/favicon.ico", baseUrl).href;
			} catch (e) {
				console.warn('Failed to construct favicon URL:', e);
			}
		}

		return '';
	}

	private static getPublished(doc: Document, schemaOrgData: any): string {
		return (
			this.getSchemaProperty(doc, schemaOrgData, 'datePublished') ||
			this.getMetaContent(doc, "name", "publishDate") ||
			this.getMetaContent(doc, "property", "article:published_time") ||
			this.getTimeElement(doc) ||
			this.getMetaContent(doc, "name", "sailthru.date") ||
			''
		);
	}

	private static getMetaContent(doc: Document, attr: string, value: string): string {
		const selector = `meta[${attr}]`;
		const element = Array.from(doc.querySelectorAll(selector))
			.find(el => el.getAttribute(attr)?.toLowerCase() === value.toLowerCase());
		const content = element ? element.getAttribute("content")?.trim() ?? "" : "";
		return this.decodeHTMLEntities(content, doc);
	}

	private static getTimeElement(doc: Document): string {
		const selector = `time`;
		const element = Array.from(doc.querySelectorAll(selector))[0];
		const content = element ? (element.getAttribute("datetime")?.trim() ?? element.textContent?.trim() ?? "") : "";
		return this.decodeHTMLEntities(content, doc);
	}

	private static decodeHTMLEntities(text: string, doc: Document): string {
		const textarea = doc.createElement('textarea');
		textarea.innerHTML = text;
		return textarea.value;
	}

	private static getSchemaProperty(doc: Document, schemaOrgData: any, property: string, defaultValue: string = ''): string {
		if (!schemaOrgData) return defaultValue;

		console.log('getSchemaProperty called with property:', property);
		console.log('Schema data type:', Array.isArray(schemaOrgData) ? 'array' : typeof schemaOrgData);

		// If schemaOrgData is an array but doesn't have @graph, wrap it in a @graph structure
		const data = Array.isArray(schemaOrgData) ? { '@graph': schemaOrgData } : schemaOrgData;

		const searchSchema = (data: any, props: string[], fullPath: string, isExactMatch: boolean = true): string[] => {
			if (typeof data === 'string') {
				return props.length === 0 ? [data] : [];
			}
			
			if (!data || typeof data !== 'object') {
				return [];
			}

			// Special handling for type-based properties (e.g. 'WebSite.name')
			const typeMatch = property.match(/^([^.]+)\.(.+)$/);
			if (typeMatch) {
				const [_, type, remainingProp] = typeMatch;
				console.log('Type match found:', { type, remainingProp });

				// If we're at an object with the matching @type, return its property
				if (data['@type'] === type && data[remainingProp]) {
					console.log('Found direct match:', data[remainingProp]);
					return [data[remainingProp]];
				}

				// Look for matching type in @graph array
				if (Array.isArray(data['@graph'])) {
					const matchingItems = data['@graph'].filter(item => item['@type'] === type);
					console.log('Matching items in @graph:', matchingItems);
					return matchingItems.flatMap(item => item[remainingProp] ? [item[remainingProp]] : []);
				}

				// Look for matching type in regular arrays
				if (Array.isArray(data)) {
					const matchingItems = data.filter(item => item['@type'] === type);
					console.log('Matching items in array:', matchingItems);
					return matchingItems.flatMap(item => item[remainingProp] ? [item[remainingProp]] : []);
				}
			}

			// Handle arrays
			if (Array.isArray(data)) {
				return data.flatMap(item => searchSchema(item, props, fullPath, isExactMatch));
			}

			// Handle objects
			const [currentProp, ...remainingProps] = props;
			
			if (!currentProp) {
				if (typeof data === 'string') return [data];
				if (typeof data === 'object' && data.name) {
					return [data.name];
				}
				return [];
			}

			if (data.hasOwnProperty(currentProp)) {
				return searchSchema(data[currentProp], remainingProps, 
					fullPath ? `${fullPath}.${currentProp}` : currentProp, true);
			}

			if (!isExactMatch) {
				const nestedResults: string[] = [];
				for (const key in data) {
					if (typeof data[key] === 'object') {
						const results = searchSchema(data[key], props, 
							fullPath ? `${fullPath}.${key}` : key, false);
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
			const results = searchSchema(data, property.split('.'), '', true);
			const result = results.length > 0 ? results.filter(Boolean).join(', ') : defaultValue;
			console.log(`Result for ${property}:`, result);
			return this.decodeHTMLEntities(result, doc);
		} catch (error) {
			console.error(`Error in getSchemaProperty for ${property}:`, error);
			return defaultValue;
		}
	}

	static extractSchemaOrgData(doc: Document): any {
		const schemaScripts = doc.querySelectorAll('script[type="application/ld+json"]');
		const schemaData: any[] = [];

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
				} else {
					schemaData.push(jsonData);
				}
			} catch (error) {
				console.error('Error parsing schema.org data:', error);
				console.error('Problematic JSON content:', jsonContent);
			}
		});

		return schemaData;
	}
}
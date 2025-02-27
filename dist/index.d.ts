declare module "metadata" {
    export interface DefuddleMetadata {
        title: string;
        description: string;
        domain: string;
        favicon: string;
        image: string;
        published: string;
        author: string;
        site: string;
        schemaOrgData: any;
    }
    export class MetadataExtractor {
        static extract(doc: Document, schemaOrgData: any): DefuddleMetadata;
        private static getAuthor;
        private static getSite;
        private static getTitle;
        private static getDescription;
        private static getImage;
        private static getFavicon;
        private static getPublished;
        private static getMetaContent;
        private static getTimeElement;
        private static decodeHTMLEntities;
        private static getSchemaProperty;
        static extractSchemaOrgData(doc: Document): any;
    }
}
declare module "defuddle" {
    import { DefuddleMetadata } from "metadata";
    global {
        interface Window {
            Defuddle: typeof Defuddle;
        }
    }
    interface DefuddleResponse extends DefuddleMetadata {
        content: string;
    }
    export class Defuddle {
        #private;
        /**
         * Enable or disable debug logging
         */
        static enableDebug(enable?: boolean): void;
        /**
         * Parse a document and extract its main content
         */
        static parse(doc: Document): DefuddleResponse;
        private static applyMobileStyles;
        private static removeHiddenElements;
        private static removeClutter;
        private static cleanContent;
        private static handleHeadings;
        private static removeHtmlComments;
        private static stripUnwantedAttributes;
        private static removeEmptyElements;
        private static findSmallImages;
        private static removeSmallImages;
        private static getImageIdentifier;
        private static findMainContent;
        private static findContentByScoring;
        private static getElementSelector;
        private static scoreElements;
        private static scoreElement;
    }
}
declare module "index" {
    export { Defuddle } from "defuddle";
    export type { DefuddleMetadata } from "metadata";
    import { Defuddle } from "defuddle";
    export type DefuddleResponse = ReturnType<typeof Defuddle.parse>;
}

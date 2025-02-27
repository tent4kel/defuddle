import { DefuddleMetadata } from './metadata';
declare global {
    interface Window {
        Defuddle: typeof Defuddle;
    }
}
interface DefuddleResponse extends DefuddleMetadata {
    content: string;
}
export declare class Defuddle {
    private static debug;
    static enableDebug(enable?: boolean): void;
    private static log;
    private static readonly POSITIVE_PATTERNS;
    private static readonly NEGATIVE_PATTERNS;
    private static readonly BLOCK_ELEMENTS;
    private static readonly HIDDEN_ELEMENTS_SELECTOR;
    private static readonly ALLOWED_ATTRIBUTES;
    static parse(doc: Document): DefuddleResponse;
    private static evaluateMediaQueries;
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
export {};

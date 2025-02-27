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
export interface DefuddleResponse extends DefuddleMetadata {
    content: string;
}
export interface DefuddleOptions {
    debug?: boolean;
    keepClasses?: boolean;
}

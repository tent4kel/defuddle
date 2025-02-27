// Define the DefuddleMetadata interface
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

// Define the DefuddleResponse interface
export interface DefuddleResponse extends DefuddleMetadata {
	content: string;
}

// Define the DefuddleOptions interface
export interface DefuddleOptions {
	debug?: boolean;
	keepClasses?: boolean;
} 
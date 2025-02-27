export { Defuddle } from './defuddle';
export type { DefuddleMetadata } from './metadata';

// Re-export the DefuddleResponse interface for TypeScript users
import { Defuddle } from './defuddle';

// Extract the return type of the parse method for TypeScript users
export type DefuddleResponse = ReturnType<typeof Defuddle.parse>; 
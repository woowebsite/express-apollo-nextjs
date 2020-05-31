import glue from 'schemaglue';
export { schemaDirectives } from './directives';
export const { schema, resolver } = glue('../graphql/schemas', { mode: 'ts' });

import { Parameters } from './types';

/**
 * A helper to define atoms for Storybook with strong type checking.
 *
 * @example
 *
 * MyStory.parameters = {
 *   jotai: atomsForStorybook({
 *     atoms: {
 *       foo: atom('foo'),
 *       bar: atom(1),
 *     },
 *     values: {
 *       foo: 'baz',
 *       bar: 2,
 *     },
 *   }),
 * };
 */
export function atomsForStorybook<T extends Record<string, unknown>>({ atoms, values }: Parameters<T>) {
  return { atoms, values };
}

import type { DecoratorFunction } from '@storybook/types';

import { withJotai } from './withJotai';

export const decorators: DecoratorFunction[] = [withJotai];

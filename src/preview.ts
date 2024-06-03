import type { ProjectAnnotations, Renderer } from '@storybook/types';
import { withJotai } from './withJotai';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withJotai],
};

export default preview;

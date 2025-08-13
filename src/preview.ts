import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';
import { withJotai } from './withJotai';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withJotai],
};

export default preview;

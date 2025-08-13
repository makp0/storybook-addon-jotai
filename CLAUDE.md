# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Storybook addon that provides Jotai state management integration for React components. The addon allows mocking Jotai atoms in Storybook stories and displays atom values in a dedicated panel.

## Development Commands

- `bun run storybook` - Start Storybook development server on port 6006
- `bun run build` - Build the library using tsup (outputs to `dist/`)

## Build System

The project uses `tsup` for building with the following key characteristics:
- Builds both CommonJS and ESM formats
- Generates TypeScript declarations
- Creates separate entry points for different addon parts (index, manager, preset, preview)
- Uses Storybook's global packages as externals to avoid bundling conflicts

## Architecture

### Core Components

**Decorator System (`withJotai.tsx`)**:
- `withJotai` is the main decorator that wraps stories with Jotai provider
- `StorybookAddonJotai` provides the root JotaiProvider context
- `StorybookAddonJotaiInContext` handles atom initialization and value management
- Uses Storybook's channel system to communicate between preview and manager

**Manager Panel (`Panel.tsx`, `manager.tsx`)**:
- Displays atom values in two tabs: "Initial Values" and "Current Values" 
- Updates in real-time as atoms change during story interaction
- Shows helpful error messages when configuration is missing

**Entry Points**:
- `src/index.ts` - Main exports for consumers
- `src/manager.tsx` - Storybook manager (UI) integration 
- `src/preset.ts` - Storybook preset configuration
- `src/preview.ts` - Storybook preview (iframe) integration

### Key Patterns

- Parameters are evaluated lazily (can be functions) to support dynamic atom creation
- Uses Storybook's event system for real-time communication between preview and manager
- Follows Storybook addon conventions with proper entry points and registration

## Usage Pattern

Stories use `atomsForStorybook()` helper to configure atoms:

```tsx
export const MyStory: Story = {
  parameters: {
    jotai: atomsForStorybook({
      atoms: { user: userAtom },
      values: { user: { name: 'John' } }
    })
  }
};
```

## Important Notes

- The addon provides its own JotaiProvider - story components should NOT wrap themselves with Provider
- Both `atoms` and `values` in parameters can be functions for deferred evaluation
- The addon requires Jotai v2+, React 18+, and Storybook v8+
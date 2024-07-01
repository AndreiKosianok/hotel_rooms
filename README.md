# Front-end developer recruitment task

Simple application displaying the hotel rooms

# Project structure

```Text
- name-project/
  - node-modules/                           # Node.js dependencies
  - src/                                    # The main source code directory
   - app/                                   # Contains pages to display for the current Next.js application
    -page                                   # Represents a specific page in the application
    -layout                                 # Template where page will be inserted
    -loading                                # Page that will be displayed during data loading
    -error                                  # Page that will be displayed during the error
   - components/                            # Reusable components for the pages
    - shared/                               # Represents a specific page in the application
    - .../                                  #
   - types/                                 # Type definitions used across different parts of the application
 - ...                                      # Other files or directories not explicitly mentioned
```

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Running Locally

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Scripts:

```Text
    dev                                     # Starts the development server
    build                                   # Builds the production-ready application
    start                                   # used to run the app in production mode,
                                            # but requires next build to be run first to generate an optimized production build.
    lint                                    # Runs ESLint to check code without auto-fixing
    prettier:fix                            # Formats code using Prettier with auto-fixing
    prettier:check                          # Checks code formatting using Prettier

```

# Tech Stack:

```Text
   - next                                    # Next.js framework for React applications
   - react, react-dom                        # Core libraries for building React app
   - typescript                              # Used for adding static types to JavaScript
   - eslint, eslint-config-next              # ESLint and Next.js configurations for code linting and quality checks
   - @eslint/js, @types/eslint__js           # ESLint core and types for linting JavaScript
   - @types/node                             # TypeScript definitions for Node.js
   - @types/react, @types/react-dom          # TypeScript definitions for React and React DOM
   - eslint-config-prettier                  # Disables ESLint rules that conflict with Prettier
   - prettier                                # Code formatter for consistent code styling
   - prettier-plugin-tailwindcss             # Tailwind CSS plugin for Prettier
   - postcss                                 # Tool for transforming CSS with JavaScript plugins
   - tailwindcss                             # Utility-first CSS framework for styling
   - typescript-eslint                       # Integrates ESLint with TypeScript
```

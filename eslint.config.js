import fs from 'node:fs'
import path from 'node:path'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

const featuresDir = path.join(process.cwd(), 'src', 'features')
const featureNames = fs.existsSync(featuresDir)
  ? fs.readdirSync(featuresDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : []

// Features are sealed modules: a feature may import from src/shared and its own
// files, never from a sibling feature or from src/app. Shared code that more
// than one feature needs belongs in src/shared.
const featureBoundaryRules = featureNames.map((name) => {
  const otherFeatures = featureNames.filter((other) => other !== name)

  return {
    files: [`src/features/${name}/**/*.{js,jsx}`],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...otherFeatures.flatMap((other) => [
              {
                group: [
                  `../${other}`,
                  `../${other}/**`,
                  `../../features/${other}`,
                  `../../features/${other}/**`,
                ],
                message:
                  'Features must not import each other. Move shared code to src/shared.',
              },
            ]),
            {
              group: ['../app/**', '../../app/**'],
              message: 'Features must not import from src/app. Keep routing in src/app.',
            },
          ],
        },
      ],
    },
  }
})

export default defineConfig([
  globalIgnores(['dist', 'cypress/screenshots', 'cypress/videos']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  ...featureBoundaryRules,
  {
    files: ['src/shared/**/*.{js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../features/**', '../../features/**', '**/features/**'],
              message:
                'src/shared must stay feature-agnostic. Move this into the feature that needs it.',
            },
            {
              group: ['../app/**', '../../app/**'],
              message: 'src/shared must not depend on src/app.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['vite.config.js', 'eslint.config.js', 'scripts/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['cypress/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        context: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])

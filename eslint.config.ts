import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    name: 'app/custom-rules',
    rules: {
      // TypeScript unused variables
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // Ignore parameters starting with _
          varsIgnorePattern: '^_', // Ignore variables starting with _
          caughtErrorsIgnorePattern: '^_', // Ignore caught errors starting with _
          destructuredArrayIgnorePattern: '^_', // Ignore destructured array items starting with _
          ignoreRestSiblings: true, // Ignore rest siblings in object destructuring
        },
      ],

      // JavaScript unused variables (fallback)
      'no-unused-vars': 'off', // Turn off base rule as it can conflict with TypeScript rule

      // Vue specific unused variables
      'vue/no-unused-vars': [
        'warn',
        {
          ignorePattern: '^_', // Ignore variables starting with _
        },
      ],
    },
  },
  skipFormatting,
)

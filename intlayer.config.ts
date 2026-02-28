import { Locales, type IntlayerConfig } from 'intlayer'

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
  content: {
    contentDir: ['./src', require.resolve( '@intlayer/design-system')],
    codeDir: ['./src', require.resolve( '@intlayer/design-system')],
  },
  routing:{
    mode:'prefix-no-default',
  }
}

export default config

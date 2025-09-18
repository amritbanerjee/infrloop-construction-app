import { createThemes, defaultComponentThemes } from '@tamagui/theme-builder'
import * as Colors from '@tamagui/colors'

const darkPalette = ['hsla(33, 16%, 1%, 1)','hsla(33, 16%, 6%, 1)','hsla(33, 16%, 12%, 1)','hsla(33, 16%, 17%, 1)','hsla(33, 16%, 23%, 1)','hsla(33, 16%, 28%, 1)','hsla(33, 16%, 34%, 1)','hsla(33, 16%, 39%, 1)','hsla(33, 16%, 45%, 1)','hsla(33, 16%, 50%, 1)','hsla(0, 15%, 93%, 1)','hsla(0, 15%, 99%, 1)']
const lightPalette = ['hsla(33, 16%, 85%, 1)','hsla(33, 16%, 81%, 1)','hsla(33, 16%, 77%, 1)','hsla(33, 16%, 73%, 1)','hsla(33, 16%, 69%, 1)','hsla(33, 16%, 66%, 1)','hsla(33, 16%, 62%, 1)','hsla(33, 16%, 58%, 1)','hsla(33, 16%, 54%, 1)','hsla(33, 16%, 50%, 1)','hsla(0, 15%, 15%, 1)','hsla(0, 15%, 1%, 1)']

const lightShadows = {
  shadow1: 'rgba(0,0,0,0.04)',
  shadow2: 'rgba(0,0,0,0.08)',
  shadow3: 'rgba(0,0,0,0.16)',
  shadow4: 'rgba(0,0,0,0.24)',
  shadow5: 'rgba(0,0,0,0.32)',
  shadow6: 'rgba(0,0,0,0.4)',
}

const darkShadows = {
  shadow1: 'rgba(0,0,0,0.2)',
  shadow2: 'rgba(0,0,0,0.3)',
  shadow3: 'rgba(0,0,0,0.4)',
  shadow4: 'rgba(0,0,0,0.5)',
  shadow5: 'rgba(0,0,0,0.6)',
  shadow6: 'rgba(0,0,0,0.7)',
}

// we're adding some example sub-themes for you to show how they are done, "success" "warning", "error":

const builtThemes = createThemes({
  componentThemes: defaultComponentThemes,

  base: {
    palette: {
      dark: darkPalette,
      light: lightPalette,
    },

    extra: {
      light: {
        ...Colors.green,
        ...Colors.red,
        ...Colors.yellow,
        ...Colors.blue,
        ...lightShadows,
        shadowColor: lightShadows.shadow1,
      },
      dark: {
        ...Colors.greenDark,
        ...Colors.redDark,
        ...Colors.yellowDark,
        ...Colors.blueDark,
        ...darkShadows,
        shadowColor: darkShadows.shadow1,
      },
    },
  },

  accent: {
    palette: {
      dark: ['hsla(91, 24%, 35%, 1)','hsla(91, 24%, 38%, 1)','hsla(91, 24%, 41%, 1)','hsla(91, 24%, 43%, 1)','hsla(91, 24%, 46%, 1)','hsla(91, 24%, 49%, 1)','hsla(91, 24%, 52%, 1)','hsla(91, 24%, 54%, 1)','hsla(91, 24%, 57%, 1)','hsla(91, 24%, 60%, 1)','hsla(250, 50%, 90%, 1)','hsla(250, 50%, 95%, 1)'],
      light: ['hsla(91, 24%, 55%, 1)','hsla(91, 24%, 56%, 1)','hsla(91, 24%, 57%, 1)','hsla(91, 24%, 58%, 1)','hsla(91, 24%, 59%, 1)','hsla(91, 24%, 61%, 1)','hsla(91, 24%, 62%, 1)','hsla(91, 24%, 63%, 1)','hsla(91, 24%, 64%, 1)','hsla(91, 24%, 65%, 1)','hsla(250, 50%, 95%, 1)','hsla(250, 50%, 95%, 1)'],
    },
  },

  childrenThemes: {
    warning: {
      palette: {
        dark: Object.values(Colors.yellowDark),
        light: Object.values(Colors.yellow),
      },
    },

    error: {
      palette: {
        dark: Object.values(Colors.redDark),
        light: Object.values(Colors.red),
      },
    },

    success: {
      palette: {
        dark: Object.values(Colors.greenDark),
        light: Object.values(Colors.green),
      },
    },
  },

  // optionally add more, can pass palette or template

  // grandChildrenThemes: {
  //   alt1: {
  //     template: 'alt1',
  //   },
  //   alt2: {
  //     template: 'alt2',
  //   },
  //   surface1: {
  //     template: 'surface1',
  //   },
  //   surface2: {
  //     template: 'surface2',
  //   },
  //   surface3: {
  //     template: 'surface3',
  //   },
  // },
})

export type Themes = typeof builtThemes

// the process.env conditional here is optional but saves web client-side bundle
// size by leaving out themes JS. tamagui automatically hydrates themes from CSS
// back into JS for you, and the bundler plugins set TAMAGUI_ENVIRONMENT. so
// long as you are using the Vite, Next, Webpack plugins this should just work,
// but if not you can just export builtThemes directly as themes:
export const themes: Themes = builtThemes

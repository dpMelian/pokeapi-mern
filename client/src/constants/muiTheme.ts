import { createTheme } from "@mui/material/styles"
import { colors } from "./colors"

let MUI_THEME = createTheme({
  typography: {
    fontFamily: `"Kadwa", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary.DEFAULT,
    },
    accent: {
      main: colors.accent,
    },
  },
})

MUI_THEME = createTheme(MUI_THEME, {
  palette: {
    accent: {
      main: colors.accent,
    },
  },
})

export default MUI_THEME

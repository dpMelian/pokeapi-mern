import { createTheme } from "@mui/material/styles"
import { THEME } from "./theme"

export const MUI_THEME = createTheme({
  typography: {
    fontFamily: `"Kadwa", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    primary: {
      main: THEME["primary--darker"],
    },
    secondary: {
      main: THEME.secondary,
    },
  },
})

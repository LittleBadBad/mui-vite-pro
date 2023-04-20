import {createContext, Dispatch, SetStateAction, useMemo, useState} from "react";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material";
import {ant} from "@/theme/ant";

const antTheme = ant
export const GlobalThemeContext = createContext<[(ThemeOptions | undefined), Dispatch<SetStateAction<ThemeOptions>>]>([antTheme, () => undefined])

export default function GlobalThemeProvider({children}: { children: JSX.Element }) {

    const value = useState<ThemeOptions>(antTheme)

    const theme = useMemo(() => createTheme(value[0]), [value[0]])

    return <GlobalThemeContext.Provider value={value}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </GlobalThemeContext.Provider>
}
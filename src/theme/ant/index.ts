import {ThemeOptions} from "@mui/material";

export const ant: ThemeOptions = {
    palette: {
        background: {
            default: '#f5f5f5'
        },
        text: {
            primary: '#000000A5',
        }
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({theme}) =>
                    (theme.palette.mode === 'light' ? {
                        borderBlockEnd: '1px solid rgba(5, 5, 5, 0.06)',
                        boxShadow: 'none',
                        backgroundColor: "white",
                        color: theme.palette.text.primary
                    } : {})
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 5
                }
            }
        }
    },
    typography: {
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.57
        },
        button: {
            fontWeight: 600
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 500,
            lineHeight: 1.66
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.57
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.57
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            lineHeight: 2.5,
            textTransform: 'uppercase'
        },
        h1: {
            // fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 500,
            fontSize: '3.5rem',
            lineHeight: 1.2
        },
        h2: {
            // fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 500,
            fontSize: '3rem',
            lineHeight: 1.2
        },
        h3: {
            // fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 500,
            fontSize: '2.25rem',
            lineHeight: 1.2
        },
        h4: {
            // fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 500,
            fontSize: '2rem',
            lineHeight: 1.2
        },
        h5: {
            // fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 500,
            fontSize: '1.5rem',
            lineHeight: 1.2
        },
        h6: {
            // fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 500,
            fontSize: '1.125rem',
            lineHeight: 1.2
        }
    }
}
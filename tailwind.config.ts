import type { Config } from 'tailwindcss';

interface ExtendedConfig extends Config {
    daisyui?: {
        themes: Array<Record<string, unknown>>;
        darkTheme?: string;
        base?: boolean;
        styled?: boolean;
        utils?: boolean;
        prefix?: string;
        logs?: boolean;
        themeRoot?: string;
    };
}

const config: ExtendedConfig = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                accent: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#1e40af",
                    "primary-focus": "#1e3a8a",
                    "primary-content": "#ffffff",
                    "secondary": "#64748b",
                    "accent": "#3b82f6",
                    "neutral": "#3d4451",
                    "base-100": "#ffffff",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
                dark: {
                    "primary": "#3b82f6",
                    "primary-focus": "#2563eb",
                    "primary-content": "#ffffff",
                    "secondary": "#94a3b8",
                    "accent": "#60a5fa",
                    "neutral": "#1f2937",
                    "base-100": "#0f172a",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
        ],
        darkTheme: "dark",
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        logs: true,
        themeRoot: ":root",
    },
};

export default config;

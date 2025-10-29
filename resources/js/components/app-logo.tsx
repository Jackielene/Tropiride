import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-lg ring-1 ring-primary/20">
                <AppLogoIcon className="size-5" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Tropiride
                </span>
                <span className="text-xs text-muted-foreground">
                    Admin Dashboard
                </span>
            </div>
        </>
    );
}

import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Car/Vehicle Icon for Tropiride - Modern Design */}
            <path d="M5 17h14l-1-7H6l-1 7z" />
            <path d="M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            <path d="M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            <path d="M2 12h20" />
            <path d="M4 12V8h2l2-2h8l2 2h2v4" />
            <path d="M7 8h10" />
        </svg>
    );
}

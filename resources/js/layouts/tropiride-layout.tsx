import { type ReactNode } from 'react';
import TropirideNavbar from '@/components/tropiride/TropirideNavbar';

interface TropirideLayoutProps {
    children: ReactNode;
    activeLink?: string;
}

export default function TropirideLayout({ children, activeLink }: TropirideLayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Tropiride Navbar */}
            <TropirideNavbar activeLink={activeLink} />
            
            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>
            
            {/* Tropiride Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12">
                        {/* Brand Section */}
                        <div className="md:col-span-1">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold">Tropiride</span>
                            </div>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Your trusted partner for Siargao transportation needs.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        {/* Services */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-cyan-400">Services</h3>
                            <ul className="space-y-3 text-gray-400">
                                {["Multicab Rental", "Van Rental", "Airport Transfer", "Island Tours"].map((item, i) => (
                                    <li key={i} className="cursor-pointer hover:text-cyan-400 transition-colors">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Support */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-cyan-400">Support</h3>
                            <ul className="space-y-3 text-gray-400">
                                {["Help Center", "Contact Us", "Terms of Service", "Privacy Policy"].map((item, i) => (
                                    <li key={i} className="cursor-pointer hover:text-cyan-400 transition-colors">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-cyan-400">Contact Info</h3>
                            <div className="space-y-4 text-gray-400">
                                {[
                                    { icon: "📞", text: "+63 917 123 4567" },
                                    { icon: "✉️", text: "info@tropiride.com" },
                                    { icon: "📍", text: "Siargao Island, Philippines" },
                                ].map(({ icon, text }, i) => (
                                    <div key={i} className="flex items-center cursor-pointer hover:text-cyan-400 transition-colors">
                                        <span className="mr-3">{icon}</span>
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Tropiride. All rights reserved. Made with ❤️ in Siargao</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

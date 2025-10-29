import { motion } from "framer-motion"
import { FaCar, FaShieldAlt, FaUsers, FaRocket } from "react-icons/fa"
import { Link } from "@inertiajs/react"
import { type PropsWithChildren } from "react"

interface AuthTwoColumnLayoutProps {
    title: string
    description: string
    type: "login" | "register"
}

export default function AuthTwoColumnLayout({
    children,
    title,
    description,
    type
}: PropsWithChildren<AuthTwoColumnLayoutProps>) {
    const features = [
        {
            icon: FaCar,
            title: "Premium Vehicles",
            description: "Access to our fleet of luxury and eco-friendly vehicles"
        },
        {
            icon: FaShieldAlt,
            title: "Secure & Safe",
            description: "Your data and payments are protected with bank-level security"
        },
        {
            icon: FaUsers,
            title: "24/7 Support",
            description: "Round-the-clock customer support for all your needs"
        },
        {
            icon: FaRocket,
            title: "Fast Booking",
            description: "Book your ride in seconds with our streamlined process"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
            <div className="flex min-h-screen">
                {/* Left Column - Branding & Features */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <Link href="/" className="flex items-center space-x-3 group">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                                >
                                    <FaCar className="text-white text-xl" />
                                </motion.div>
                                <span className="text-3xl font-bold">Tropiride</span>
                            </Link>
                        </motion.div>

                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-12"
                        >
                            <h1 className="text-4xl font-bold mb-4">
                                {type === "login" ? "Welcome Back!" : "Join Tropiride"}
                            </h1>
                            <p className="text-xl text-white/90 leading-relaxed">
                                {type === "login" 
                                    ? "Sign in to continue your journey with us"
                                    : "Start your premium ride-sharing experience today"
                                }
                            </p>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-6"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    className="flex items-start space-x-4"
                                >
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                                        <p className="text-white/80 text-sm">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-md"
                    >
                        {/* Mobile Logo */}
                        <div className="lg:hidden mb-8 text-center">
                            <Link href="/" className="inline-flex items-center space-x-2 group">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50"
                                >
                                    <FaCar className="text-white text-lg" />
                                </motion.div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                    Tropiride
                                </span>
                            </Link>
                        </div>

                        {/* Form Container */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                                <p className="text-gray-600">{description}</p>
                            </div>

                            {children}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center text-sm text-gray-500">
                            <p>
                                By continuing, you agree to our{" "}
                                <Link href="/terms" className="text-cyan-600 hover:text-cyan-700 font-medium">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-cyan-600 hover:text-cyan-700 font-medium">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

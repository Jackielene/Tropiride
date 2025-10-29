import type React from "react"

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  FaCar,
  FaMapMarkerAlt,
  FaUsers,
  FaShieldAlt,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaChevronRight,
  FaMotorcycle,
  FaCheckCircle,
  FaRoute,
  FaLocationArrow,
  FaCalendarAlt,
} from "react-icons/fa"
import { Link, usePage } from "@inertiajs/react"
import { Head } from "@inertiajs/react"
import TropirideNavbar from "@/components/tropiride/TropirideNavbar"
import { SharedData } from "@/types"

const vehicleTypes = [
  {
    icon: FaMotorcycle,
    name: "Tricycle",
    capacity: "2-4 passengers",
    description: "Motorcycle with sidecar, perfect for quick local transport and short trips around the island",
    color: "from-yellow-400 via-amber-400 to-orange-400",
    shadowColor: "rgba(251, 191, 36, 0.5)",
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&auto=format&fit=crop",
  },
  {
    icon: FaMotorcycle,
    name: "Motorcycle",
    capacity: "1-2 passengers",
    description: "Perfect for solo travelers and couples who want flexibility and speed",
    color: "from-rose-500 via-pink-500 to-orange-400",
    shadowColor: "rgba(244, 63, 94, 0.5)",
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&auto=format&fit=crop",
  },
  {
    icon: FaMotorcycle,
    name: "Tuktuk",
    capacity: "2-3 passengers",
    description: "Traditional three-wheeled vehicle for short trips and local exploration",
    color: "from-emerald-500 via-green-500 to-teal-500",
    shadowColor: "rgba(16, 185, 129, 0.5)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
  },
  {
    icon: FaCar,
    name: "Multicab",
    capacity: "6-8 passengers",
    description: "Perfect for small groups and island hopping adventures",
    color: "from-purple-500 via-indigo-500 to-blue-500",
    shadowColor: "rgba(147, 51, 234, 0.5)",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop",
  },
  {
    icon: FaCar,
    name: "Car (Private Van)",
    capacity: "6-14 passengers",
    description: "Comfortable and spacious vehicles ideal for families and groups, perfect for island tours",
    color: "from-cyan-500 via-teal-500 to-blue-500",
    shadowColor: "rgba(6, 182, 212, 0.5)",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "Choose your pickup and destination",
    description: "Enter your pickup location and where you want to go. Our system will match you with the best route and available vehicles.",
    icon: FaMapMarkerAlt,
    color: "from-cyan-500 to-blue-600",
  },
  {
    step: "02",
    title: "Confirm fare and driver",
    description: "See transparent pricing upfront and get matched with a verified, experienced local driver. Review details and confirm your booking.",
    icon: FaCheckCircle,
    color: "from-emerald-500 to-teal-600",
  },
  {
    step: "03",
    title: "Track your ride in real-time",
    description: "Follow your driver's location with GPS tracking from pickup to destination. Know exactly when they'll arrive.",
    icon: FaLocationArrow,
    color: "from-orange-500 to-amber-600",
  },
]

const features = [
  {
    icon: FaShieldAlt,
    title: "Safe & Reliable",
    description: "All vehicles are regularly maintained and driven by experienced local drivers",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Local Expertise",
    description: "Our drivers know Siargao like the back of their hand",
  },
  {
    icon: FaUsers,
    title: "Group Friendly",
    description: "Perfect vehicles for families, friends, and tour groups",
  },
  {
    icon: FaCalendarAlt,
    title: "Easy Booking",
    description: "Simple online booking with instant confirmation",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Australia",
    rating: 5,
    text: "Amazing service! Our driver was knowledgeable and took us to all the best spots in Siargao.",
  },
  {
    name: "Mike Chen",
    location: "Singapore",
    rating: 5,
    text: "Great value for money. The van was clean and comfortable for our group of 12.",
  },
  {
    name: "Emma Rodriguez",
    location: "Philippines",
    rating: 5,
    text: "Professional service from start to finish. Highly recommend for Siargao tours!",
  },
]

function useCardTilt() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

export default function TropirideLanding() {
  const { scrollYProgress } = useScroll()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const { auth } = usePage<SharedData>().props
  const isAuthenticated = auth.user && auth.user.id

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

  const layer1Y = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const layer2Y = useTransform(scrollYProgress, [0, 0.5], [0, -250])
  const layer3Y = useTransform(scrollYProgress, [0, 0.5], [0, -350])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head title="Tropiride - Siargao Vehicle Booking" />

      <TropirideNavbar activeLink="home" />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-50 to-blue-50">
        {/* Background Image Layer */}
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1610987067555-2947ed187d8b?q=80&w=1224&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/40 via-blue-900/30 to-transparent" />
        </motion.div>

        <motion.div style={{ y: layer1Y }} className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        <motion.div style={{ y: layer2Y }} className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              className="absolute w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        <motion.div style={{ y: layer3Y }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                },
              }}
            >
              <motion.span
                className="inline-block text-white drop-shadow-2xl"
                variants={{
                  hidden: { opacity: 0, x: -30, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    scale: 1,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }
                }}
                whileHover={{ 
                  scale: 1.02,
                  textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                Book Your Ride in Siargao{" "}
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl relative"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { duration: 0.8, ease: "easeOut" }
                  }
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  textShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                    "0 0 30px rgba(6, 182, 212, 0.5)",
                    "0 0 20px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ 
                  backgroundPosition: { duration: 5, repeat: Number.POSITIVE_INFINITY },
                  textShadow: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                }}
                style={{ backgroundSize: "200% 200%" }}
                whileHover={{ 
                  scale: 1.03,
                  filter: "brightness(1.2)",
                  textShadow: "0 0 40px rgba(6, 182, 212, 0.8)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                Fast, Safe, and Reliable
              </motion.span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                textShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 max-w-3xl mx-auto drop-shadow-lg font-medium cursor-default"
            >
              Easily reserve tricycles, motorcycles, and cars anytime, anywhere.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  href="/tropiride/vehicles"
                  className="relative bg-white text-cyan-600 px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-300 flex items-center group overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-blue-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Book a Ride Now</span>
                  <motion.div
                    className="relative z-10 ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <FaChevronRight />
                  </motion.div>
                </Link>
              </motion.div>
              {!isAuthenticated && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Link
                    href="/login"
                    className="relative bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 flex items-center"
                  >
                    <span>Already have an account? Login</span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            className="w-8 h-12 border-3 border-white/80 rounded-full flex justify-center backdrop-blur-sm bg-white/10"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1.5 h-4 bg-white rounded-full mt-2 shadow-lg"
            />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              fill="white"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #06b6d4 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Three simple steps to get you moving around Siargao
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-cyan-300 to-transparent z-0">
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 h-full"
                >
                  {/* Step Number */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    className={`absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl`}
                  >
                    <span className="text-white font-black text-2xl">{step.step}</span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 mt-4 shadow-lg`}
                  >
                    <step.icon className="text-white text-3xl" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Link
              href="/tropiride/vehicles"
              className="inline-flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-300 group"
            >
              <span>Get Started Today</span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <FaChevronRight />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="vehicles" className="py-24 bg-white relative overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-100/40 to-blue-100/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-100/40 to-amber-100/40 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
             <motion.div className="inline-block">
               <motion.h2
                 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 relative"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, ease: "easeOut" }}
               >
                 <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                   Choose Your Ride
                 </span>
                 <motion.div
                   initial={{ scaleX: 0 }}
                   whileInView={{ scaleX: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                   className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full origin-left"
                 />
               </motion.h2>
             </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mt-6"
            >
              Select the perfect vehicle for your island adventure
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {vehicleTypes.map((vehicle, index) => (
              <VehicleCard key={vehicle.name} vehicle={vehicle} index={index} totalItems={vehicleTypes.length} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-100/40 to-blue-100/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-100/40 to-amber-100/40 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl md:text-6xl font-black mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                About Tropiride
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Your trusted partner for Siargao transportation needs
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3
                className="text-4xl font-bold text-gray-900 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Discover Siargao with Confidence
              </motion.h3>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  TropiRide is Siargao's premier transportation platform, dedicated to simplifying how you move around the island. 
                  Our mission is to make transportation accessible, safe, and convenient for everyone.
                </p>
                <p className="text-lg">
                  With GPS-tracked rides, you can book tricycles, motorcycles, and cars with confidence, knowing exactly where 
                  your driver is in real-time. Every ride is transparent, reliable, and driven by experienced local drivers 
                  who know Siargao inside and out.
                </p>
                <p className="text-lg">
                  From airport transfers to island tours, we connect you with the perfect vehicle for your adventure while 
                  supporting the local community and promoting sustainable tourism in our beautiful island paradise.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <div
                  className="w-full h-96 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-white text-2xl font-bold mb-2">Siargao Island Paradise</h4>
                  <p className="text-white/90 text-sm">Explore the beauty of Siargao with our reliable vehicles</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <FaLocationArrow className="text-white text-3xl" />
              </motion.div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">GPS Tracking</h4>
              <p className="text-gray-600 leading-relaxed">
                Track your ride in real-time with GPS technology. Know exactly where your driver is 
                and when they'll arrive, giving you peace of mind throughout your journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <FaShieldAlt className="text-white text-3xl" />
              </motion.div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Safe & Reliable</h4>
              <p className="text-gray-600 leading-relaxed">
                All vehicles are regularly maintained and driven by verified, experienced local drivers 
                who prioritize your safety and comfort.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <FaMapMarkerAlt className="text-white text-3xl" />
              </motion.div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Easy Booking</h4>
              <p className="text-gray-600 leading-relaxed">
                Simple online booking process. Choose your pickup, destination, and vehicle type. 
                Book rides anytime, anywhere with just a few clicks.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-8 md:p-12 text-center"
          >
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Our Mission
            </motion.h3>
            <motion.p
              className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              To simplify transportation in Siargao by providing fast, safe, and reliable GPS-tracked rides 
              that connect visitors with experienced local drivers. We're committed to making island travel 
              accessible while supporting our local community and preserving Siargao's natural beauty for future generations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #06b6d4 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl md:text-6xl font-black mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                Why Choose Tropiride?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              We make your Siargao experience unforgettable
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="text-center group relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300"
              >
                <motion.div className="relative inline-block mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md relative z-10"
                  >
                    <feature.icon className="text-white text-2xl" />
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-20 left-20 w-24 h-24 border-4 border-cyan-200 rounded-2xl opacity-30"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-20 right-20 w-32 h-32 border-4 border-orange-200 rounded-full opacity-30"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-5xl md:text-6xl font-black mb-4"
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                What Travelers Say
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Real experiences from happy adventurers
            </motion.p>
          </motion.div>

          <div className="relative h-96 flex items-center justify-center perspective-1000">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === activeTestimonial && (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                      exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="absolute max-w-2xl w-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-10 shadow-2xl border border-cyan-100 relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        />

                        <div className="flex items-center mb-6 relative z-10">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0, rotate: -180 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{ delay: i * 0.1, type: "spring" }}
                              whileHover={{ scale: 1.4, rotate: 360 }}
                            >
                              <FaStar className="text-yellow-400 text-xl mr-1" />
                            </motion.div>
                          ))}
                        </div>

                        <motion.p
                          className="text-2xl text-gray-700 mb-8 italic relative z-10 leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          "{testimonial.text}"
                        </motion.p>

                        <motion.div
                          className="relative z-10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="font-bold text-xl text-gray-900">{testimonial.name}</p>
                          <p className="text-cyan-600 font-medium">{testimonial.location}</p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? "bg-gradient-to-r from-cyan-500 to-blue-600 w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-teal-600"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-0 left-0 w-full h-full opacity-10"
        >
          <svg viewBox="0 0 1440 320" className="absolute top-0">
            <path
              fill="white"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              {["Ready", "for", "Your", "Siargao", "Adventure?"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    type: "spring",
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: "#fef3c7",
                    transition: { duration: 0.2 },
                  }}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-2xl text-cyan-50 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Book your vehicle now and explore the beautiful island with confidence
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/tropiride/vehicles"
                className="inline-flex items-center bg-white text-cyan-600 px-12 py-5 rounded-full text-xl font-black hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Browse Rides</span>
                <motion.div
                  className="relative z-10 ml-3"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <FaChevronRight className="text-2xl" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#111827"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center space-x-2 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50"
                >
                  <FaCar className="text-white text-lg" />
                </motion.div>
                <span className="text-2xl font-bold">Tropiride</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for Siargao transportation needs.
              </p>
              <div className="flex space-x-4">
                {[FaFacebook, FaInstagram, FaTwitter].map((Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.3, y: -5, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors text-xl" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-6 text-cyan-400">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <motion.li whileHover={{ x: 8, color: "#06b6d4" }} className="cursor-pointer transition-colors">
                  <Link href="/tropiride/about">About</Link>
                </motion.li>
                <motion.li whileHover={{ x: 8, color: "#06b6d4" }} className="cursor-pointer transition-colors">
                  <Link href="/tropiride/contact">Contact</Link>
                </motion.li>
                <motion.li whileHover={{ x: 8, color: "#06b6d4" }} className="cursor-pointer transition-colors">
                  <Link href="/tropiride/faq">FAQ</Link>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6 text-cyan-400">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <motion.li whileHover={{ x: 8, color: "#06b6d4" }} className="cursor-pointer transition-colors">
                  <Link href="/tropiride/terms">Terms</Link>
                </motion.li>
                <motion.li whileHover={{ x: 8, color: "#06b6d4" }} className="cursor-pointer transition-colors">
                  <Link href="/tropiride/privacy">Privacy Policy</Link>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6 text-cyan-400">Contact Info</h3>
              <div className="space-y-4 text-gray-400">
                {[
                  { Icon: FaPhone, text: "+63 123 456 7890" },
                  { Icon: FaEnvelope, text: "info@tropiride.com" },
                  { Icon: FaMapMarkerAlt, text: "Siargao Island, Philippines" },
                ].map(({ Icon, text }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 8, color: "#06b6d4" }}
                    className="flex items-center cursor-pointer transition-colors"
                  >
                    <Icon className="mr-3 text-cyan-400" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2025 Tropiride. All rights reserved. Made with ❤️ in Siargao</p>
          </motion.div>
        </div>
      </footer>
    </>
  )
}

function VehicleCard({ vehicle, index, totalItems }: { vehicle: (typeof vehicleTypes)[0]; index: number; totalItems?: number }) {
  // Center Multicab (index 3) and Car (index 4) in the second row
  const getGridClasses = () => {
    if (totalItems === 5 && index === 3) {
      // Multicab - position in column 1 of second row, right-aligned with margin
      return "lg:col-start-1 lg:col-end-2 lg:justify-self-end lg:mr-3"
    } else if (totalItems === 5 && index === 4) {
      // Car - position in column 3 of second row, left-aligned with margin
      return "lg:col-start-3 lg:col-end-4 lg:justify-self-start lg:ml-3"
    }
    return ""
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className={`${getGridClasses()} group w-full max-w-md`}
    >
     <motion.div
       whileHover={{
         y: -8,
         scale: 1.02,
       }}
       whileTap={{ scale: 0.98 }}
       transition={{ 
         duration: 0.3, 
         ease: [0.4, 0, 0.2, 1],
       }}
       className="relative h-full min-h-[320px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 focus-within:ring-4 focus-within:ring-cyan-400/50 focus-within:outline-none"
     >
        {/* Background Image */}
        <div className="absolute inset-0">
           <motion.div
             className="w-full h-full bg-cover bg-center"
             style={{
               backgroundImage: `url(${vehicle.image})`,
             }}
             whileHover={{ scale: 1.02 }}
             transition={{ duration: 0.3, ease: "easeOut" }}
           />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${vehicle.color} opacity-80 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Glassmorphism Card Content */}
        <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
          {/* Top Section - Icon and Name */}
          <div className="flex items-start justify-between">
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
              }}
              transition={{ 
                duration: 0.25, 
                ease: [0.4, 0, 0.2, 1]
              }}
              className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <vehicle.icon className="text-white text-3xl md:text-4xl drop-shadow-lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-full px-4 py-2 hover:bg-white/30 transition-colors duration-200"
            >
              <span className="text-white font-bold text-sm">{vehicle.capacity}</span>
            </motion.div>
          </div>

          {/* Bottom Section - Details */}
          <div className="space-y-4">
            <div>
              <motion.h3
                className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg"
                whileHover={{ 
                  scale: 1.02,
                  y: -2
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeOut" 
                }}
              >
                {vehicle.name}
              </motion.h3>
              <motion.p 
                className="text-white/90 text-sm md:text-base leading-relaxed drop-shadow-md"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {vehicle.description}
              </motion.p>
            </div>

          </div>
        </div>

        {/* Subtle Hover Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${vehicle.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-3xl`}
          style={{
            filter: "blur(20px)",
          }}
          whileHover={{ opacity: 0.15 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Border highlight on hover */}
        <motion.div
          className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-colors duration-300 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  )
}

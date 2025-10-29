import { motion, useScroll, useTransform } from "framer-motion"
import { useState } from "react"
import {
  FaCar,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCheckCircle,
  FaInfoCircle,
  FaUmbrellaBeach,
  FaSun,
  FaWater,
  FaPassport,
  FaMoneyBillWave,
  FaChevronRight,
  FaStar,
  FaHeart,
  FaGlobe,
  FaAward,
  FaClock,
  FaHandshake,
} from "react-icons/fa"
import { Link } from "@inertiajs/react"
import { Head } from "@inertiajs/react"
import TropirideNavbar from "@/components/tropiride/TropirideNavbar"

const services = [
  {
    icon: FaCar,
    title: "Vehicle Rentals",
    description: "Wide selection of vehicles from motorcycles to vans, all well-maintained and reliable.",
    features: ["Daily & weekly rates", "Flexible booking", "Free delivery to hotel", "24/7 roadside assistance"],
    color: "from-cyan-500 to-blue-600",
    bgColor: "from-cyan-50 to-blue-50",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Island Tours",
    description: "Guided tours to Siargao's most beautiful spots with experienced local drivers.",
    features: ["Cloud 9 surf break", "Sugba Lagoon", "Magpupungko Rock Pools", "Secret beaches"],
    color: "from-orange-500 to-amber-600",
    bgColor: "from-orange-50 to-amber-50",
  },
  {
    icon: FaUsers,
    title: "Airport Transfers",
    description: "Reliable pickup and drop-off services from Sayak Airport to your accommodation.",
    features: ["Meet & greet service", "Fixed rates", "No hidden charges", "Luggage assistance"],
    color: "from-emerald-500 to-teal-600",
    bgColor: "from-emerald-50 to-teal-50",
  },
  {
    icon: FaCalendarAlt,
    title: "Custom Itineraries",
    description: "Personalized tour packages designed around your interests and schedule.",
    features: ["Surfing spots", "Island hopping", "Food tours", "Photography tours"],
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-50 to-pink-50",
  },
]

const stats = [
  { number: "500+", label: "Happy Customers", icon: FaHeart },
  { number: "50+", label: "Vehicles Available", icon: FaCar },
  { number: "5+", label: "Years Experience", icon: FaAward },
  { number: "24/7", label: "Customer Support", icon: FaClock },
]

const values = [
  {
    icon: FaShieldAlt,
    title: "Safety First",
    description: "Your safety is our top priority. All vehicles undergo regular maintenance and our drivers are fully licensed and experienced.",
    color: "from-red-500 to-pink-600",
  },
  {
    icon: FaHandshake,
    title: "Trust & Reliability",
    description: "We build lasting relationships with our customers through honest service and reliable transportation solutions.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: FaGlobe,
    title: "Local Expertise",
    description: "Born and raised in Siargao, we know every hidden gem, secret spot, and the best routes around the island.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: FaUsers,
    title: "Community Support",
    description: "We're proud to support the local Siargao community through employment and sustainable tourism practices.",
    color: "from-purple-500 to-indigo-600",
  },
]

const travelTips = [
  {
    icon: FaSun,
    title: "Best Time to Visit",
    description:
      "The dry season (March to October) is ideal for surfing and beach activities. Cloud 9 has the best waves from August to November.",
  },
  {
    icon: FaPassport,
    title: "Entry Requirements",
    description:
      "Valid passport required. Most nationalities get 30 days visa-free. Check with your embassy for specific requirements.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Currency & Payments",
    description:
      "Philippine Peso (₱) is the local currency. ATMs available in General Luna. Many places accept cash only, so bring enough pesos.",
  },
  {
    icon: FaUmbrellaBeach,
    title: "What to Pack",
    description:
      "Sunscreen, reef-safe sunblock, light clothing, swimwear, insect repellent, and waterproof bags for island hopping.",
  },
  {
    icon: FaWater,
    title: "Water Activities",
    description:
      "Siargao is famous for surfing, but also offers island hopping, snorkeling, diving, and stand-up paddleboarding.",
  },
  {
    icon: FaInfoCircle,
    title: "Local Etiquette",
    description:
      "Respect local customs, dress modestly when not at the beach, and always ask permission before taking photos of locals.",
  },
]

const safetyGuidelines = [
  "Always wear helmets when riding motorcycles or scooters",
  "Check vehicle condition before departure",
  "Keep emergency contact numbers handy",
  "Inform someone of your travel plans",
  "Stay hydrated and use sun protection",
  "Respect ocean conditions and local warnings",
  "Keep valuables secure and insured",
  "Have travel insurance that covers activities",
]

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const [activeTab, setActiveTab] = useState(0)

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0])

  return (
    <>
      <Head title="About Tropiride - Siargao Vehicle Rental Services" />
      
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <TropirideNavbar activeLink="about" />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-50 to-blue-50">
          {/* Background Image Layer */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1565565978731-f9e8cd35a317?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/40 via-blue-900/30 to-transparent" />
          </motion.div>

          {/* Floating Elements */}
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
                className="text-5xl md:text-7xl font-black mb-6"
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
                  About{" "}
                </motion.span>
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
                  Tropiride
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
                className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto drop-shadow-lg font-medium cursor-default"
              >
                Your trusted partner for exploring the beautiful island of Siargao with confidence and comfort.
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
                    <span className="relative z-10">Explore Our Services</span>
                    <motion.div
                      className="relative z-10 ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <FaChevronRight />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
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
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                  >
                    <stat.icon className="text-white text-2xl" />
                  </motion.div>
                  <motion.div
                    className="text-4xl md:text-5xl font-black text-gray-900 mb-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-24 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 relative overflow-hidden">
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
                  Our Services
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Comprehensive transportation solutions for your Siargao adventure
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-gradient-to-br ${service.bgColor} rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <service.icon className="text-white text-2xl" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
                      >
                        <FaCheckCircle className="text-cyan-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                    style={{
                      filter: "blur(20px)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Our Values
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                The principles that guide everything we do
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <value.icon className="text-white text-3xl" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Tips Section */}
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
                  Essential Travel Tips
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Everything you need to know before visiting Siargao
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {travelTips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-all duration-300"
                  >
                    <tip.icon className="text-white text-xl" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors duration-300">{tip.title}</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{tip.description}</p>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                    style={{
                      filter: "blur(20px)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Guidelines Section */}
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
                  Safety First
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Important safety guidelines for your Siargao adventure
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-cyan-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {safetyGuidelines.map((guideline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 group-hover:shadow-lg transition-all duration-300"
                    >
                      <FaShieldAlt className="text-white text-xs" />
                    </motion.div>
                    <span className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{guideline}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      {/* CTA Section */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 className="text-5xl md:text-7xl font-black text-white mb-6">Ready to Explore Siargao?</motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-cyan-50 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Book your vehicle now and start your island adventure with confidence
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
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
                <span className="relative z-10">Browse Vehicles</span>
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
      </section>

      {/* Footer */}
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
    </div>
    </>
  )
}

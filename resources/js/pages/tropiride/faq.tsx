import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  FaCar,
  FaQuestionCircle,
  FaChevronDown,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCreditCard,
  FaShieldAlt,
  FaUserCheck,
  FaCalendarAlt,
  FaBan,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa"
import { Link } from "@inertiajs/react"
import { Head } from "@inertiajs/react"
import TropirideNavbar from "@/components/tropiride/TropirideNavbar"

interface FAQItem {
  id: number
  category: string
  question: string
  answer: string
  icon: any
}

const faqCategories = [
  { id: "all", label: "All Questions", icon: FaQuestionCircle },
  { id: "booking", label: "Booking", icon: FaCalendarAlt },
  { id: "pricing", label: "Pricing & Payment", icon: FaCreditCard },
  { id: "vehicles", label: "Vehicles", icon: FaCar },
  { id: "safety", label: "Safety & Insurance", icon: FaShieldAlt },
  { id: "policies", label: "Policies", icon: FaBan },
]

const faqs: FAQItem[] = [
  // Booking FAQs
  {
    id: 1,
    category: "booking",
    question: "How do I make a reservation?",
    answer: "You can easily book a vehicle through our website. Simply select your desired vehicle type, choose your pickup and drop-off locations on the map, set your dates (if applicable), and submit your ride request. You'll receive a confirmation once your booking is processed.",
    icon: FaCalendarAlt,
  },
  {
    id: 2,
    category: "booking",
    question: "Can I book for immediate pickup?",
    answer: "Yes! You can request an immediate ride by leaving the pickup date/time fields empty when making your booking. Our system will match you with available drivers right away.",
    icon: FaClock,
  },
  {
    id: 3,
    category: "booking",
    question: "Do I need to create an account to book?",
    answer: "Yes, creating an account is required to make bookings. This allows us to keep track of your ride history, save your preferences, and provide better customer service. Don't worry, the signup process is quick and easy!",
    icon: FaUserCheck,
  },
  {
    id: 4,
    category: "booking",
    question: "Can I modify my booking after confirmation?",
    answer: "Yes, you can cancel your booking from your profile page. For modifications to pickup/drop-off locations or times, please contact us directly via phone, WhatsApp, or email, and we'll do our best to accommodate your changes.",
    icon: FaInfoCircle,
  },
  {
    id: 5,
    category: "booking",
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 24 hours in advance for best availability, especially during peak season (August to November). However, you can also book immediately for same-day service if vehicles are available.",
    icon: FaCalendarAlt,
  },

  // Pricing & Payment FAQs
  {
    id: 6,
    category: "pricing",
    question: "How is the fare calculated?",
    answer: "Our fares are calculated based on distance, estimated travel time, and vehicle type. The system automatically calculates your fare when you select your pickup and drop-off locations. You'll see the estimated fare before confirming your booking.",
    icon: FaCreditCard,
  },
  {
    id: 7,
    category: "pricing",
    question: "What payment methods do you accept?",
    answer: "We accept cash (Philippine Peso), GCash, PayMaya, and major credit cards. Payment can be made upon vehicle pickup or online when booking. Cash is preferred for same-day bookings.",
    icon: FaCreditCard,
  },
  {
    id: 8,
    category: "pricing",
    question: "Are there any hidden fees?",
    answer: "No! The fare displayed when you book is the total price. We're transparent about all costs upfront. However, additional fees may apply for extra stops, extended rental periods, or special requests - all of which will be discussed before confirmation.",
    icon: FaCheckCircle,
  },
  {
    id: 9,
    category: "pricing",
    question: "Do you offer discounts for multiple days?",
    answer: "Yes! We offer special rates for multi-day rentals. Contact us directly via WhatsApp or email to discuss package deals for extended stays. Early bird bookings and group discounts are also available.",
    icon: FaCreditCard,
  },

  // Vehicles FAQs
  {
    id: 10,
    category: "vehicles",
    question: "What types of vehicles do you offer?",
    answer: "We offer a wide range of vehicles including motorcycles, scooters, multicabs (multipurpose vehicles), vans, and cars. All vehicles are regularly maintained and inspected to ensure safety and reliability.",
    icon: FaCar,
  },
  {
    id: 11,
    category: "vehicles",
    question: "Are the vehicles insured?",
    answer: "Yes, all our vehicles are fully insured. However, we recommend that you also have your own travel insurance that covers vehicle rentals and driving activities while in Siargao.",
    icon: FaShieldAlt,
  },
  {
    id: 12,
    category: "vehicles",
    question: "Can I drive the vehicle myself?",
    answer: "This depends on the vehicle type and your preferences. For motorcycles and cars, you can drive yourself if you have a valid international driving license. Alternatively, we can provide a professional local driver for your comfort and safety.",
    icon: FaCar,
  },
  {
    id: 13,
    category: "vehicles",
    question: "What if the vehicle breaks down?",
    answer: "All our vehicles undergo regular maintenance. In the rare event of a breakdown, we provide 24/7 roadside assistance. Just call our emergency hotline, and we'll send help immediately or arrange for a replacement vehicle.",
    icon: FaExclamationTriangle,
  },

  // Safety & Insurance FAQs
  {
    id: 14,
    category: "safety",
    question: "Do I need a driver's license?",
    answer: "Yes, if you plan to drive yourself, you must have a valid international driving license or a Philippine driver's license. If you prefer, we can provide a professional driver for your trip - this is recommended for first-time visitors to Siargao.",
    icon: FaUserCheck,
  },
  {
    id: 15,
    category: "safety",
    question: "What safety measures are in place?",
    answer: "All our vehicles are regularly inspected, and drivers are trained and licensed. We provide helmets for motorcycle rentals (mandatory), and all vehicles have basic safety equipment. We also recommend wearing seatbelts at all times.",
    icon: FaShieldAlt,
  },
  {
    id: 16,
    category: "safety",
    question: "Is it safe to drive in Siargao?",
    answer: "Yes, Siargao is generally safe to drive around. However, road conditions can vary, especially on rural roads. We recommend driving during daylight hours, wearing appropriate safety gear, and following local traffic rules. Our drivers are familiar with all routes and road conditions.",
    icon: FaShieldAlt,
  },

  // Policies FAQs
  {
    id: 17,
    category: "policies",
    question: "What is your cancellation policy?",
    answer: "You can cancel your booking free of charge up to 24 hours before your scheduled pickup time. Cancellations within 24 hours may incur a 50% cancellation fee. No-show bookings will be charged the full amount. Cancelled bookings can be done directly from your profile page.",
    icon: FaBan,
  },
  {
    id: 18,
    category: "policies",
    question: "What happens if I'm late for my pickup?",
    answer: "Please contact us immediately if you're running late. We'll try to accommodate a reasonable delay. If you're more than 30 minutes late without notice, your booking may be subject to additional waiting fees or cancellation.",
    icon: FaClock,
  },
  {
    id: 19,
    category: "policies",
    question: "Can I cancel my booking?",
    answer: "Yes! You can cancel your booking directly from your profile page. Simply go to 'My Bookings', find your booking, and click the 'Cancel' button. Cancellation policies apply based on timing (free if 24+ hours in advance).",
    icon: FaBan,
  },
  {
    id: 20,
    category: "policies",
    question: "What is your refund policy?",
    answer: "Refunds are processed according to our cancellation policy. Full refunds are issued for cancellations made 24+ hours in advance. Cancellations within 24 hours receive a 50% refund. Refunds are processed within 5-7 business days to your original payment method.",
    icon: FaCreditCard,
  },
  {
    id: 21,
    category: "policies",
    question: "Are there age restrictions for drivers?",
    answer: "Yes, you must be at least 21 years old to rent and drive our vehicles. Drivers must also have a valid driver's license for at least 2 years. Some vehicle types may have additional age requirements.",
    icon: FaUserCheck,
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <>
      <Head title="FAQ - Tropiride Siargao" />

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <TropirideNavbar activeLink="faq" />

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.4)",
                    "0 0 40px rgba(6, 182, 212, 0.6)",
                    "0 0 20px rgba(6, 182, 212, 0.4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <p className="text-white text-sm font-bold uppercase tracking-wider">Got Questions?</p>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Frequently Asked
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Everything you need to know about booking with Tropiride in Siargao
              </p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl mx-auto relative"
              >
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 text-lg shadow-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-4 justify-center">
                {faqCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <category.icon className="text-lg" />
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* FAQ Accordion */}
            <div className="max-w-4xl mx-auto space-y-4">
              <AnimatePresence mode="wait">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gradient-to-br from-white to-cyan-50/30 rounded-2xl border-2 border-gray-100 hover:border-cyan-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-6 flex items-start text-left group transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                          <faq.icon className="text-white text-xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-cyan-700 transition-colors duration-300">
                            {faq.question}
                          </h3>
                          <motion.div
                            initial={false}
                            animate={{
                              height: openFAQ === faq.id ? "auto" : 0,
                              opacity: openFAQ === faq.id ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 leading-relaxed pt-2">{faq.answer}</p>
                          </motion.div>
                        </div>
                        <motion.div
                          animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 ml-4 text-cyan-600 text-xl"
                        >
                          <FaChevronDown />
                        </motion.div>
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">No FAQs found matching your search.</p>
                    <p className="text-gray-500 mt-2">Try a different search term or category.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Still Have Questions Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-teal-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-black mb-4">Still Have Questions?</h2>
                  <p className="text-xl text-cyan-50 mb-8">
                    Our friendly team is here to help! Get in touch with us anytime.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <motion.a
                      href="tel:+631234567890"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 bg-white text-cyan-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                    >
                      <FaPhone />
                      Call Us
                    </motion.a>
                    <motion.a
                      href="mailto:info@tropiride.com"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                    >
                      <FaEnvelope />
                      Email Us
                    </motion.a>
                    <Link
                      href="/tropiride/contact"
                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                    >
                      <FaMapMarkerAlt />
                      Visit Us
                    </Link>
                  </div>
                </div>
              </div>
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
                  {[FaEnvelope, FaPhone, FaMapMarkerAlt].map((Icon, i) => (
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


import { motion } from "framer-motion"
import {
  FaCar,
  FaFileContract,
  FaGavel,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBan,
  FaCreditCard,
  FaShieldAlt,
  FaUserCheck,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHandshake,
} from "react-icons/fa"
import { Link } from "@inertiajs/react"
import { Head } from "@inertiajs/react"
import TropirideNavbar from "@/components/tropiride/TropirideNavbar"

const sections = [
  {
    icon: FaHandshake,
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to Terms",
        text: "By accessing and using Tropiride's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services."
      },
      {
        subtitle: "Modifications",
        text: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the modified terms."
      },
    ]
  },
  {
    icon: FaUserCheck,
    title: "Eligibility and Account",
    content: [
      {
        subtitle: "Age Requirement",
        text: "You must be at least 18 years old to use our services. For vehicle rentals requiring self-driving, you must be at least 21 years old with a valid driver's license for at least 2 years."
      },
      {
        subtitle: "Account Responsibility",
        text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account."
      },
      {
        subtitle: "Accurate Information",
        text: "You agree to provide accurate, current, and complete information when creating an account or making a booking. Providing false information may result in suspension or termination of your account."
      },
    ]
  },
  {
    icon: FaCar,
    title: "Service Usage",
    content: [
      {
        subtitle: "Booking Process",
        text: "All bookings are subject to availability and driver acceptance. We reserve the right to refuse or cancel bookings at our discretion. Fares are calculated based on distance, time, and vehicle type at the time of booking."
      },
      {
        subtitle: "Driver Responsibility",
        text: "If you choose to drive yourself, you are responsible for operating the vehicle safely and in compliance with all local traffic laws. You must have valid insurance and appropriate licenses."
      },
      {
        subtitle: "Vehicle Condition",
        text: "You must inspect the vehicle upon pickup and report any damages or issues immediately. You are responsible for any damages to the vehicle during the rental period that exceed normal wear and tear."
      },
    ]
  },
  {
    icon: FaCreditCard,
    title: "Payment and Pricing",
    content: [
      {
        subtitle: "Fare Calculation",
        text: "Fares are calculated based on distance, estimated travel time, and vehicle type. The displayed fare is an estimate and may vary based on actual route and traffic conditions."
      },
      {
        subtitle: "Payment Terms",
        text: "Payment is due upon vehicle pickup or as specified in your booking confirmation. We accept cash (Philippine Peso), GCash, PayMaya, and major credit cards. Late payments may incur additional fees."
      },
      {
        subtitle: "Additional Charges",
        text: "Additional charges may apply for extra stops, extended rental periods, cleaning fees (if vehicle is returned in poor condition), or damages. All charges will be communicated before final payment."
      },
    ]
  },
  {
    icon: FaBan,
    title: "Cancellation and Refunds",
    content: [
      {
        subtitle: "Cancellation Policy",
        text: "You may cancel your booking free of charge up to 24 hours before scheduled pickup. Cancellations within 24 hours may incur a 50% cancellation fee. No-show bookings will be charged the full amount."
      },
      {
        subtitle: "Refund Process",
        text: "Refunds for eligible cancellations will be processed within 5-7 business days to your original payment method. Refunds are subject to our cancellation policy terms."
      },
      {
        subtitle: "Service Cancellation",
        text: "We reserve the right to cancel or reschedule bookings due to safety concerns, severe weather, vehicle unavailability, or other circumstances beyond our control. In such cases, you will receive a full refund."
      },
    ]
  },
  {
    icon: FaShieldAlt,
    title: "Liability and Insurance",
    content: [
      {
        subtitle: "Vehicle Insurance",
        text: "All vehicles are insured according to Philippine law. However, you are encouraged to have your own travel insurance that covers vehicle rentals. You may be liable for deductibles or damages not covered by insurance."
      },
      {
        subtitle: "Limitation of Liability",
        text: "Tropiride is not liable for delays, accidents, losses, or damages resulting from factors beyond our control, including but not limited to weather, traffic, road conditions, or third-party actions."
      },
      {
        subtitle: "Personal Belongings",
        text: "You are responsible for your personal belongings. Tropiride is not liable for loss, theft, or damage to personal items left in vehicles. Please remove all belongings when returning the vehicle."
      },
    ]
  },
  {
    icon: FaExclamationTriangle,
    title: "Prohibited Activities",
    content: [
      {
        subtitle: "Illegal Use",
        text: "You must not use our vehicles for any illegal activities, including but not limited to transporting illegal goods, violations of traffic laws, or any activity that violates Philippine law."
      },
      {
        subtitle: "Unauthorized Drivers",
        text: "Only authorized drivers listed in the booking may operate the vehicle. Allowing unauthorized persons to drive may result in immediate termination of the rental and voiding of insurance coverage."
      },
      {
        subtitle: "Vehicle Abuse",
        text: "You must not abuse, misuse, or damage the vehicle. This includes off-road driving (unless specifically authorized), racing, towing unauthorized loads, or using the vehicle in a manner that exceeds its specifications."
      },
    ]
  },
  {
    icon: FaGavel,
    title: "Dispute Resolution",
    content: [
      {
        subtitle: "Governing Law",
        text: "These Terms of Service are governed by the laws of the Philippines. Any disputes arising from these terms or our services will be subject to the jurisdiction of Philippine courts."
      },
      {
        subtitle: "Contact for Disputes",
        text: "If you have a dispute, please contact us first to attempt resolution. We are committed to resolving issues fairly and efficiently through good faith negotiations."
      },
    ]
  },
]

export default function TermsPage() {
  return (
    <>
      <Head title="Terms of Service - Tropiride Siargao" />

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <TropirideNavbar />

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
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
                <p className="text-white text-sm font-bold uppercase tracking-wider">Legal Information</p>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Terms of Service
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Please read these terms carefully before using Tropiride's services.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: January 2025
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <FaFileContract className="text-cyan-600" />
                  Legal Agreement
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and Tropiride 
                  regarding your use of our vehicle rental and transportation services in Siargao, Philippines. 
                  By using our services, you agree to comply with and be bound by these Terms.
                </p>
              </div>
            </motion.div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-cyan-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <section.icon className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 pt-2">{section.title}</h3>
                  </div>
                  
                  <div className="space-y-6 ml-16">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <FaCheckCircle className="text-cyan-500 text-sm" />
                          {item.subtitle}
                        </h4>
                        <p className="text-gray-600 leading-relaxed ml-6">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-to-br from-cyan-600 via-blue-600 to-teal-600 rounded-3xl p-10 text-white text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
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
                <h3 className="text-3xl font-black mb-4">Questions About Terms?</h3>
                <p className="text-xl text-cyan-50 mb-6">
                  If you have any questions about these Terms of Service, please contact us.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="mailto:info@tropiride.com"
                    className="inline-flex items-center gap-2 bg-white text-cyan-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                  >
                    <FaEnvelope />
                    Email Us
                  </a>
                  <a
                    href="tel:+631234567890"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                  >
                    <FaPhone />
                    Call Us
                  </a>
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


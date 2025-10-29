import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  FaCar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaViber,
  FaPaperPlane,
  FaCheckCircle,
  FaUser,
  FaCommentDots,
  FaCalendarAlt,
  FaQuestionCircle,
  FaHeadset,
  FaLightbulb,
  FaRocket,
  FaHeart,
  FaStar,
  FaAward,
} from "react-icons/fa"
import { Link } from "@inertiajs/react"
import { Head } from "@inertiajs/react"
import TropirideNavbar from "@/components/tropiride/TropirideNavbar"

const contactChannels = [
  {
    icon: FaPhone,
    title: "Instant Call",
    subtitle: "Talk to our team",
    details: ["+63 917 123 4567", "+63 918 765 4321"],
    action: "Call Now",
    color: "from-purple-500 via-pink-500 to-red-500",
    iconBg: "bg-gradient-to-br from-purple-100 to-pink-100",
    delay: 0,
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    subtitle: "Quick chat support",
    details: ["+63 917 123 4567", "Online 24/7"],
    action: "Chat on WhatsApp",
    color: "from-green-500 via-emerald-500 to-teal-500",
    iconBg: "bg-gradient-to-br from-green-100 to-emerald-100",
    delay: 0.1,
  },
  {
    icon: FaEnvelope,
    title: "Email",
    subtitle: "Detailed inquiries",
    details: ["info@tropiride.com", "Response within 24hrs"],
    action: "Send Email",
    color: "from-blue-500 via-cyan-500 to-sky-500",
    iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100",
    delay: 0.2,
  },
  {
    icon: FaMapMarkerAlt,
    title: "Visit Office",
    subtitle: "Come say hello",
    details: ["General Luna, Siargao", "Open 7AM - 10PM"],
    action: "Get Directions",
    color: "from-orange-500 via-amber-500 to-yellow-500",
    iconBg: "bg-gradient-to-br from-orange-100 to-amber-100",
    delay: 0.3,
  },
]

const responseTime = [
  { icon: FaRocket, label: "Quick Response", time: "< 30 mins", description: "WhatsApp & Phone" },
  { icon: FaClock, label: "Email Reply", time: "< 24 hours", description: "Detailed inquiries" },
  { icon: FaHeadset, label: "24/7 Support", time: "Always", description: "Emergency assistance" },
]

const whyContactUs = [
  {
    icon: FaLightbulb,
    title: "Expert Guidance",
    description: "Get personalized recommendations for your Siargao adventure",
  },
  {
    icon: FaAward,
    title: "Best Prices",
    description: "Exclusive deals and discounts available via direct booking",
  },
  {
    icon: FaHeart,
    title: "Local Insights",
    description: "Insider tips on hidden gems and must-visit spots",
  },
  {
    icon: FaStar,
    title: "Custom Packages",
    description: "Tailored itineraries designed just for you",
  },
]

const socialMedia = [
  { icon: FaFacebook, name: "Facebook", handle: "@TropirideStargao", color: "hover:bg-blue-600" },
  { icon: FaInstagram, name: "Instagram", handle: "@tropiride_ph", color: "hover:bg-pink-600" },
  { icon: FaTwitter, name: "Twitter", handle: "@TropiridePH", color: "hover:bg-sky-500" },
  { icon: FaWhatsapp, name: "WhatsApp", handle: "+63 917 123 4567", color: "hover:bg-green-600" },
  { icon: FaViber, name: "Viber", handle: "+63 917 123 4567", color: "hover:bg-purple-600" },
]

const officeHours = [
  { day: "Monday - Friday", hours: "7:00 AM - 10:00 PM", available: true },
  { day: "Saturday - Sunday", hours: "7:00 AM - 10:00 PM", available: true },
  { day: "Public Holidays", hours: "8:00 AM - 8:00 PM", available: true },
]

const faqs = [
  {
    question: "How do I make a reservation?",
    answer: "You can book online through our website, call us directly, or message us on social media. We recommend booking at least 24 hours in advance.",
  },
  {
    question: "What are your cancellation policies?",
    answer: "Free cancellation up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a 50% charge.",
  },
  {
    question: "Do you offer airport pickup?",
    answer: "Yes! We provide airport transfer services from Sayak Airport to anywhere in Siargao. Just let us know your flight details when booking.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, GCash, PayMaya, and major credit cards. Payment can be made online or upon vehicle pickup.",
  },
]

export default function ContactPage() {
  const { scrollYProgress } = useScroll()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeChannel, setActiveChannel] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.7, 0])

  // Auto-rotate active channel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChannel((prev) => (prev + 1) % contactChannels.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Handle form submission here
    console.log("Form submitted:", formData)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Head title="Contact Tropiride - Get in Touch" />

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <TropirideNavbar activeLink="contact" />

        {/* Hero Section - Modern Bento Grid Design */}
        <section className="relative pt-24 pb-12 overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1549954853-ba4e35aa66fb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.4)",
                    "0 0 60px rgba(236, 72, 153, 0.6)",
                    "0 0 20px rgba(168, 85, 247, 0.4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <p className="text-white text-sm font-bold uppercase tracking-wider">Let's Connect</p>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  We're Here to Help
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Choose your preferred way to connect with our team in Siargao
              </p>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 mb-12">
              {/* Large Featured Card - Contact Channels Carousel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-6 lg:col-span-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-between"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Contact Channels
                  </h2>
                  <p className="text-white/90 text-lg mb-8">
                    Pick your favorite way to reach us
                  </p>

                  {/* Active Channel Display */}
                  <AnimatePresence mode="wait">
                    {contactChannels.map((channel, index) =>
                      activeChannel === index ? (
                        <motion.div
                          key={channel.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6"
                        >
                          <channel.icon className="text-6xl mb-4" />
                          <h3 className="text-3xl font-black mb-2">{channel.title}</h3>
                          <p className="text-white/80 mb-4">{channel.subtitle}</p>
                          {channel.details.map((detail, i) => (
                            <p key={i} className="text-xl font-semibold mb-2">
                              {detail}
                            </p>
                          ))}
                        </motion.div>
                      ) : null
                    )}
                  </AnimatePresence>

                  {/* Channel Dots Indicator */}
                  <div className="flex gap-3">
                    {contactChannels.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveChannel(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === activeChannel ? "bg-white w-12" : "bg-white/40 w-2"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats at bottom */}
                <div className="relative z-10 grid grid-cols-3 gap-6">
                  {responseTime.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="text-center"
                    >
                      <item.icon className="text-3xl mb-2 mx-auto opacity-80" />
                      <p className="font-black text-2xl">{item.time}</p>
                      <p className="text-xs text-white/70">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Small Cards Grid */}
              <div className="md:col-span-6 lg:col-span-4 grid grid-cols-2 md:grid-cols-2 gap-6">
                {/* Quick Call Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="col-span-2 bg-white rounded-3xl p-6 shadow-xl border border-gray-100 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <FaPhone className="text-4xl text-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Quick Call</h3>
                      <p className="text-purple-600 font-semibold">+63 917 123 4567</p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                    >
                      <FaPhone className="text-white text-2xl" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* WhatsApp Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 shadow-xl text-white cursor-pointer"
                >
                  <FaWhatsapp className="text-5xl mb-3" />
                  <h3 className="text-lg font-bold mb-1">WhatsApp</h3>
                  <p className="text-sm text-white/90">Chat Now</p>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-6 shadow-xl text-white cursor-pointer"
                >
                  <FaEnvelope className="text-5xl mb-3" />
                  <h3 className="text-lg font-bold mb-1">Email</h3>
                  <p className="text-sm text-white/90">Write to Us</p>
                </motion.div>

                {/* Visit Us Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="col-span-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-6 shadow-xl text-white cursor-pointer"
                >
                  <FaMapMarkerAlt className="text-5xl mb-3" />
                  <h3 className="text-2xl font-bold mb-1">Visit Our Office</h3>
                  <p className="text-white/90">General Luna, Siargao Island</p>
                  <p className="text-sm text-white/80">Open 7AM - 10PM Daily</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Contact Us Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2
                className="text-4xl md:text-5xl font-black mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Why Reach Out?
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Discover the benefits of booking directly with us
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyContactUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300"
                  >
                    <item.icon className="text-white text-3xl" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section - Modern Card Design */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Floating Shapes Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Get in Touch
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Send us a message and we'll respond within 24 hours
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Contact Form - Takes 3 columns */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3 bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-200"
              >
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <FaPaperPlane className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Send a Message</h3>
                      <p className="text-sm text-gray-500">We'll get back to you ASAP</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaUser className="text-purple-400 group-focus-within:text-purple-600 transition-colors duration-300" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 font-medium"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaPhone className="text-purple-400 group-focus-within:text-purple-600 transition-colors duration-300" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 font-medium"
                          placeholder="+63 917 123 4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaEnvelope className="text-purple-400 group-focus-within:text-purple-600 transition-colors duration-300" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 font-medium"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                      What's this about? *
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaCommentDots className="text-purple-400 group-focus-within:text-purple-600 transition-colors duration-300" />
                      </div>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 appearance-none font-medium cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">🚗 Booking Inquiry</option>
                        <option value="general">💬 General Question</option>
                        <option value="support">🛟 Customer Support</option>
                        <option value="feedback">⭐ Feedback</option>
                        <option value="other">📝 Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none font-medium"
                      placeholder="Tell us how we can help you explore Siargao..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitted}
                    whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
                    className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${
                      isSubmitted
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:shadow-2xl"
                    } text-white`}
                  >
                    {!isSubmitted ? (
                      <>
                        <span>Send Message</span>
                        <motion.div
                          className="ml-3"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <FaPaperPlane />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="mr-2 text-2xl" />
                        <span>Message Sent!</span>
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-3 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl"
                      >
                        <FaCheckCircle className="text-2xl" />
                        <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>

              {/* Sidebar - Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Office Hours - Modern Card */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                        <FaClock className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black">We're Available</h3>
                        <p className="text-white/80 text-sm">Open 7 days a week</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {officeHours.map((schedule, index) => (
                        <motion.div
                          key={schedule.day}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl"
                        >
                          <div>
                            <p className="font-bold">{schedule.day}</p>
                            <p className="text-sm text-white/80">{schedule.hours}</p>
                          </div>
                          {schedule.available && (
                            <div className="bg-green-500 px-3 py-1 rounded-full text-xs font-bold">
                              OPEN
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Social Media - Grid Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100"
                >
                  <h3 className="text-2xl font-black text-gray-900 mb-6">Follow Us</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialMedia.slice(0, 5).map((social, index) => (
                      <motion.div
                        key={social.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`${
                          index === 4 ? "col-span-2" : ""
                        } p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg group text-center border-2 border-transparent hover:border-purple-200`}
                      >
                        <social.icon className="text-4xl text-gray-700 group-hover:text-purple-600 transition-colors duration-300 mx-auto mb-3" />
                        <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                          {social.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">{social.handle}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Location - Image Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 relative group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1000&auto=format&fit=crop')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <FaMapMarkerAlt className="text-3xl mb-2" />
                      <h3 className="text-xl font-black">Visit Our Office</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-bold text-gray-900 mb-1">General Luna, Siargao Island</p>
                    <p className="text-sm text-gray-600 mb-3">Surigao del Norte, Philippines</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300"
                    >
                      Get Directions →
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Modern Accordion */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl"></div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mb-6 font-bold text-sm uppercase tracking-wide"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                    "0 0 40px rgba(236, 72, 153, 0.5)",
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                FAQ
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Quick Answers
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about booking with Tropiride
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-purple-200 hover:shadow-2xl transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full px-6 py-6 flex items-start text-left group transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <FaQuestionCircle className="text-purple-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{
                          height: activeFaq === index ? "auto" : 0,
                          opacity: activeFaq === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 leading-relaxed text-sm pt-2">{faq.answer}</p>
                      </motion.div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-purple-600 text-lg ml-4 flex-shrink-0"
                    >
                      ▼
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Unique Card Design */}
        <section className="relative py-24 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[3rem] p-12 md:p-16 overflow-hidden shadow-2xl"
            >
              {/* Animated Background */}
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-white/20 rounded-full"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                    }}
                    animate={{
                      y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                      x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 3,
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                    Ready to Start Your
                    <br />
                    <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                      Siargao Adventure?
                    </span>
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                    Book your perfect vehicle now and explore the island paradise with confidence
                  </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.div
                    whileHover={{ scale: 1.08, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/tropiride/vehicles"
                      className="inline-flex items-center bg-white text-purple-600 px-10 py-5 rounded-full text-lg font-black hover:shadow-2xl transition-all duration-300 group"
                    >
                      <FaCar className="mr-3 text-2xl" />
                      <span>Browse Vehicles</span>
                      <motion.div
                        className="ml-3"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        →
                      </motion.div>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.08, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/tropiride"
                      className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
                    >
                      <span>Back to Home</span>
                    </Link>
                  </motion.div>
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


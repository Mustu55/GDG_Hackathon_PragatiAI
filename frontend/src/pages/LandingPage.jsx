import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Bot, Shield, Zap, ArrowRight, Mic, MapPin, BarChart2,
  CheckCircle2, Users, Globe, FileText, ChevronRight, Star,
  Layers, Activity, AlertTriangle
} from 'lucide-react';

/* ─── Animated Counter ─────────────────────────── */
function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{count.toLocaleString()}{suffix}</>;
}

/* ─── Feature Card ──────────────────────────────── */
function FeatureCard({ icon: Icon, title, description, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-100 transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${gradient}`} />
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${gradient} text-white shadow-lg`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center text-brand-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Learn more <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  );
}

/* ─── How It Works Step ─────────────────────────── */
function Step({ number, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-6"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-brand-200">
        {number}
      </div>
      <div className="pt-1">
        <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-500">{description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Floating Badge ────────────────────────────── */
function FloatingBadge({ children, className }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Landing Page ─────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-200">
              <span className="text-white font-black text-lg">P</span>
            </div>
            <div>
              <span className="font-black text-xl text-gray-900 tracking-tight">PRAGATI <span className="text-brand-600">AI</span></span>
              <div className="text-[10px] font-medium text-gray-400 tracking-widest uppercase -mt-0.5">Governance Platform</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#portals" className="hover:text-gray-900 transition-colors">Portals</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register/citizen">
              <Button variant="primary" size="sm" className="shadow-md shadow-brand-200">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white pt-20 pb-32">

        {/* Background mesh gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #0ea5e9 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-8"
            >
              Citizen-Led Civic Action
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]"
            >
              Citizen Voices.
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-brand-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                  Government Action.
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" fill="none">
                  <path d="M2 8 Q100 2 200 8 Q300 14 398 8" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-8 text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl mx-auto"
            >
              PRAGATI AI listens to millions of citizens, clusters issues by impact, and delivers precise intelligence to decision-makers — in real time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/register/citizen">
                <Button variant="primary" size="lg" className="shadow-xl shadow-brand-200/50 text-base px-8">
                  Report a Civic Issue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/register/officer">
                <Button variant="outline" size="lg" className="text-base px-8">
                  <Shield className="w-5 h-5 mr-2 text-gray-700" />
                  Officer Portal
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 flex justify-center gap-8 text-sm text-gray-400"
            >
              {[
                { icon: CheckCircle2, label: 'No account needed to report' },
                { icon: Globe, label: 'All Indian languages supported' },
                { icon: Shield, label: 'Secure & Government-grade' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-brand-500" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual — Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 60 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            {/* Main Dashboard Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Fake browser chrome */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200">
                  pragati-ai.gov.in/admin
                </div>
              </div>
              {/* Dashboard Preview Content */}
              <div className="bg-gray-50 p-6">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Issues', value: '1,240', color: 'bg-red-50 border-red-100 text-red-600' },
                    { label: 'In Progress', value: '210', color: 'bg-blue-50 border-blue-100 text-blue-600' },
                    { label: 'Resolved', value: '850', color: 'bg-green-50 border-green-100 text-green-600' },
                    { label: 'Avg Resolution', value: '4.2d', color: 'bg-brand-50 border-brand-100 text-brand-600' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className={`rounded-xl p-4 border ${color} bg-white`}>
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <p className="text-2xl font-black text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
                {/* Fake Issue List */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">AI Prioritized Issues</span>
                    <span className="text-xs text-brand-600 bg-brand-50 px-2 py-1 rounded-full">Live</span>
                  </div>
                  {[
                    { title: 'Severe Water Contamination — Ward 7', badge: 'Critical', badgeColor: 'bg-red-100 text-red-700', citizens: 340, confidence: 96 },
                    { title: 'Major Potholes on Bypass Road', badge: 'High', badgeColor: 'bg-orange-100 text-orange-700', citizens: 120, confidence: 88 },
                  ].map((item) => (
                    <div key={item.title} className="px-4 py-3 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-sm font-medium text-gray-800">{item.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.badgeColor}`}>{item.badge}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{item.citizens} citizens</span>
                        <span className="text-brand-600 font-semibold">{item.confidence}% AI</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <FloatingBadge className="hidden md:flex -top-6 -left-10 z-10">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Issue Resolved!</p>
                <p className="text-[11px] text-gray-500">Ward 7 Water Supply</p>
              </div>
            </FloatingBadge>

            <FloatingBadge className="hidden md:flex -bottom-4 -right-8 z-10" style={{ animationDelay: '1.5s' }}>
              <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Voice Detected</p>
                <p className="text-[11px] text-gray-500">Hindi → Translated ✓</p>
              </div>
            </FloatingBadge>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: 1240, suffix: '+', label: 'Issues Tracked' },
              { value: 340, suffix: 'K+', label: 'Citizens Reached' },
              { value: 22, suffix: ' States', label: 'Deployment Ready' },
              { value: 96, suffix: '%', label: 'AI Accuracy' },
            ].map(({ value, suffix, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-1"
              >
                <p className="text-4xl md:text-5xl font-black">
                  <CountUp target={value} suffix={suffix} />
                </p>
                <p className="text-brand-200 font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-brand-600 font-bold text-sm tracking-widest uppercase">Core Intelligence</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">
              AI that understands <span className="text-brand-600">context</span>
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
              Not just complaint collection — PRAGATI AI creates structured, evidence-based decision intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Mic}
              title="Multilingual Voice Input"
              description="Citizens speak in any Indian language. PRAGATI AI transcribes, translates, and understands — no literacy barrier."
              gradient="bg-gradient-to-br from-brand-500 to-teal-500"
              delay={0}
            />
            <FeatureCard
              icon={Layers}
              title="Intelligent Issue Clustering"
              description="Automatically merges 340 complaints about the same broken pipe into one high-priority issue with a single AI analysis."
              gradient="bg-gradient-to-br from-purple-500 to-brand-500"
              delay={0.1}
            />
            <FeatureCard
              icon={MapPin}
              title="Geospatial Hotspot Mapping"
              description="Visualize issue density on a live map. Identify patterns across wards, districts, and regions at a glance."
              gradient="bg-gradient-to-br from-orange-500 to-red-500"
              delay={0.2}
            />
            <FeatureCard
              icon={BarChart2}
              title="Impact Score Prioritization"
              description="AI calculates severity, affected population, and proximity to critical infrastructure to rank issues scientifically."
              gradient="bg-gradient-to-br from-blue-500 to-brand-500"
              delay={0.3}
            />
            <FeatureCard
              icon={FileText}
              title="Daily Governance Briefs"
              description="Officers receive AI-written executive summaries with recommended actions — ready for morning review."
              gradient="bg-gradient-to-br from-teal-500 to-green-500"
              delay={0.4}
            />
            <FeatureCard
              icon={Bot}
              title="AI Chatbot Assistant"
              description="Citizens get instant answers on complaint status, government schemes, and safety advisories — 24/7 in their language."
              gradient="bg-gradient-to-br from-pink-500 to-purple-500"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-brand-600 font-bold text-sm tracking-widest uppercase">The Flow</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-12">
                From complaint to<br />
                <span className="text-brand-600">action in 4 steps</span>
              </h2>
              <div className="space-y-10">
                <Step number="1" title="Citizen Reports an Issue" description="Via voice, text, or photo. In any language. On any device. No account required." delay={0} />
                <Step number="2" title="AI Processes & Clusters" description="Transcription, translation, categorization, and merging of duplicate reports happens instantly." delay={0.1} />
                <Step number="3" title="Impact Score Calculated" description="The AI weighs population, infrastructure, and trend data to assign a priority score." delay={0.2} />
                <Step number="4" title="Officer Takes Action" description="Prioritized issues appear in the Command Center. Assign, update, resolve — with full AI context." delay={0.3} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-5 h-5 text-brand-600" />
                  <span className="font-bold text-gray-900">Live AI Analysis</span>
                  <span className="ml-auto text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Processing
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { step: 'Voice Input', status: '✅ Received (Hindi)', color: 'bg-green-50 border-green-200' },
                    { step: 'Transcription', status: '✅ "पानी की लाइन टूटी है..."', color: 'bg-green-50 border-green-200' },
                    { step: 'Translation', status: '✅ "Water pipeline broken..."', color: 'bg-green-50 border-green-200' },
                    { step: 'Category', status: '🏷️ Water & Sanitation', color: 'bg-blue-50 border-blue-200' },
                    { step: 'Cluster Match', status: '🔗 Merged with 45 reports', color: 'bg-purple-50 border-purple-200' },
                    { step: 'Priority Score', status: '🔴 Critical — 96% confidence', color: 'bg-red-50 border-red-200' },
                  ].map(({ step, status, color }) => (
                    <div key={step} className={`flex items-center justify-between p-3 rounded-xl border ${color}`}>
                      <span className="text-sm font-medium text-gray-700">{step}</span>
                      <span className="text-sm text-gray-600">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PORTALS ── */}
      <section id="portals" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-brand-600 font-bold text-sm tracking-widest uppercase">Two Portals</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">
              Built for every role
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Citizen Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-brand-50 to-teal-50 rounded-3xl p-10 border border-brand-100 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-200">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-3">For Citizens</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">Simple, accessible, and designed for everyone — from urban residents to rural farmers.</p>
              <ul className="space-y-3 mb-10">
                {['Voice complaints in your language', 'Upload photos of the issue', 'Track status with a single ID', 'AI chatbot for instant help', 'Get safety advisories'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register/citizen">
                <Button variant="primary" className="shadow-lg shadow-brand-200">
                  Register as Citizen <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Officer Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 border border-gray-700 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-3">For Officers</h3>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">A full Command Center to manage civic intelligence, resolve issues, and drive governance.</p>
              <ul className="space-y-3 mb-10">
                {['AI-prioritized issues dashboard', 'Geospatial hotspot map', 'Daily governance intelligence briefs', 'Department assignment & tracking', 'Analytics and trend reports'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register/officer">
                <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
                  Apply for Officer Access <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-teal-600" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 60%)' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-14 h-14 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Have a civic issue to report?
            </h2>
            <p className="text-xl text-brand-200 mb-10 max-w-2xl mx-auto">
              It takes less than 60 seconds. Your voice matters. Let AI carry it to the right authority.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register/citizen">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-gray-100 shadow-xl text-base px-8">
                  Report Now — It's Free <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/status-check">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base px-8">
                  Check Complaint Status
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black">P</span>
              </div>
              <span className="text-white font-bold">PRAGATI AI</span>
              <span className="text-gray-600">— AI-Powered Civic Governance</span>
            </div>
            <p className="text-sm">Built with ❤️ for Civic Good</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

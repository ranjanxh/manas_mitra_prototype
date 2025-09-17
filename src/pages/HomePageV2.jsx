import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { MessageCircle, Calendar, BookOpen, Users, Heart, Star, ArrowRight, CheckCircle } from 'lucide-react';

// --- Reusable Animated Components ---

const AnimatedCard = ({ children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

// --- Page Sections ---

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20
    });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden flex items-center" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-teal-400/10 rounded-full blur-3xl transition-transform duration-300" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl transition-transform duration-300" style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
              Your Private Space for <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Mental Wellness</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
              Confidential support, guided resources, and professional help—integrated with your campus life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-semibold relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <span className="relative z-10 flex items-center justify-center gap-2">Get Started for Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/ai-chat" className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all">
                <span className="flex items-center justify-center gap-2"><MessageCircle className="w-5 h-5" /> Talk to AI Friend</span>
              </Link>
            </div>
          </motion.div>
          <div className="flex justify-center">
            <div className="relative" style={{ transformStyle: 'preserve-3d', transform: `rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)` }}>
              <div className="w-80 h-80 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center shadow-2xl">
                <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center"><Heart className="w-20 h-20 text-blue-400 animate-pulse" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProofSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-2xl font-semibold text-slate-700">
          Join <span className="text-blue-600"><CountUp end={1250} duration={3} enableScrollSpy />+</span> Students and <span className="text-blue-600"><CountUp end={15} duration={3} enableScrollSpy />+</span> Partner Institutions
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="text-center p-6"><p className="text-5xl font-bold text-blue-600"><CountUp end={5000} duration={3} enableScrollSpy />+</p><p className="text-slate-600 mt-2 font-medium">Wellness Sessions Initiated</p></div>
        <div className="text-center p-6"><p className="text-5xl font-bold text-green-600"><CountUp end={4.8} duration={3} decimals={1} enableScrollSpy />/5</p><p className="text-slate-600 mt-2 font-medium">Average Mood Improvement</p></div>
        <div className="text-center p-6"><p className="text-5xl font-bold text-purple-600"><CountUp end={97} duration={3} enableScrollSpy />%</p><p className="text-slate-600 mt-2 font-medium">Student Satisfaction Rate</p></div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    { icon: <MessageCircle className="w-8 h-8 text-blue-400" />, title: "24/7 AI Companion", description: "Get instant, confidential support from our AI friend." },
    { icon: <Calendar className="w-8 h-8 text-green-400" />, title: "Book Appointments", description: "Schedule sessions with on-campus counsellors easily." },
    { icon: <BookOpen className="w-8 h-8 text-teal-400" />, title: "Explore Wellness Guides", description: "Access a library of articles, audio, and videos." },
    { icon: <Users className="w-8 h-8 text-purple-400" />, title: "Connect with Peers", description: "Join our anonymous forum to find support from others." }
  ];
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white">A Complete Support System</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedCard key={index} index={index}>
              <div className="group relative p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-blue-400 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    { text: "Finally, a space where I don't feel judged. Booking a session was so much less intimidating than walking into the counselling centre.", author: "A B.Tech Student, 3rd Year" },
    { text: "The AI chat is surprisingly helpful for late-night anxiety before an exam. Just having something to talk to helps a lot.", author: "A Commerce Student, 1st Year" },
    { text: "The peer support forum helped me realize I wasn't alone. Finding community here changed everything for me.", author: "An Arts Student, 2nd Year" }
  ];
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800">Trusted by Students Like You</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedCard key={i} index={i}>
              <div className="bg-white p-8 rounded-xl shadow-lg h-full">
                <p className="text-slate-700 italic">"{t.text}"</p>
                <p className="text-sm text-slate-500 mt-4">- {t.author}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-24 bg-gradient-to-br from-blue-600 to-teal-600">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-5xl font-bold text-white mb-6">Ready to Start Your Wellness Journey?</h2>
      <p className="text-xl text-blue-100 mb-8">Join thousands of students who have taken the first step.</p>
      <Link to="/signup" className="group inline-block px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:scale-105">
        <span className="flex items-center justify-center gap-2">Get Started Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
      </Link>
    </div>
  </section>
);

const HomePageV2 = () => {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePageV2;
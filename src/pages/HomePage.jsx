import React from 'react';
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Heart,
  Phone
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer'; // <-- The missing import

// Section Components
const HeroSection = () => (
  <section className="relative bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-teal-100/30"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl font-bold text-slate-800 leading-tight">
            Your Private Space for{' '}
            <span className="text-blue-600">Mental Wellness</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Manas Mitra offers confidential support, resources, and professional help, right on your campus. You are not alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              Get Started for Free
            </button>
            <button className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
              Talk to AI Friend
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-80 h-80 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full flex items-center justify-center shadow-2xl">
            <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center">
              <Heart className="w-20 h-20 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
 
const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
      title: "24/7 AI Companion",
      description: "Get instant, confidential support and coping strategies from our AI friend, anytime you need to talk."
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      title: "Book Appointments Easily",
      description: "Schedule confidential sessions with on-campus counsellors through a simple and secure booking system."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-teal-600" />,
      title: "Explore Wellness Guides",
      description: "Access a library of articles, audio sessions, and videos in your regional language to help you navigate college life."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Connect with Peers",
      description: "Join our anonymous, moderated forum to share experiences and find support from fellow students who understand."
    }
  ];
  
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            A Complete Support System, Designed for You
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Finally, a space where I don't feel judged. Booking a session was so much less intimidating than walking into the counselling centre.",
      author: "A B.Tech Student, 3rd Year"
    },
    {
      text: "The AI chat is surprisingly helpful for late-night anxiety before an exam. Just having something to talk to helps a lot.",
      author: "A Commerce Student, 1st Year"
    },
    {
      text: "The peer support forum helped me realize I wasn't alone in my struggles. Finding community here changed everything for me.",
      author: "A Arts Student, 2nd Year"
    }
  ];
  
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Trusted by Students Like You
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <p className="text-slate-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              <div className="text-sm text-slate-500">
                - {testimonial.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold text-slate-800 mb-8">
        Ready to Prioritize Your Well-being?
      </h2>
      <button className="px-12 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-xl">
        Sign Up for Free
      </button>
    </div>
  </section>
);
 
// This is the main component for the HomePage
const HomePage = () => {
  return (
    <div className="min-h-screen font-sans">
      
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
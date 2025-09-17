import React from 'react';
import { Sprout, Heart, Lock, Wifi, HandHeart } from 'lucide-react';
// Note: Navbar and Footer are now handled by App.jsx, so they are not needed here.

const HeroSection = () => (
  <section className="relative h-96 bg-gradient-to-r from-blue-600 to-teal-600 overflow-hidden">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative h-full flex items-center justify-center text-center px-4">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          More Than a Platform, It's a Promise
        </h1>
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
          Learn about our mission to make mental well-being a priority for every student.
        </p>
      </div>
    </div>
  </section>
);

const OurStorySection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-slate-800">
            Born from a Need, Built with Empathy
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Walking through college campuses, we witnessed a silent struggle. Students facing immense pressure, yet hesitating to seek help. We realized technology shouldn't replace human connection—it should make it more accessible, private, and immediate.
          </p>
          <p className="text-slate-600 leading-relaxed font-medium">
            Our mission is to empower students with the tools and support they need, fostering a campus culture where seeking help is a sign of strength.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-80 h-80 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center shadow-xl">
              <div className="w-60 h-60 bg-white rounded-full flex items-center justify-center">
                <Sprout className="w-24 h-24 text-green-600" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TeamSection = () => {
  // --- UPDATED TEAM LIST ---
  const teamMembers = [
    { name: "Himanshu Ranjan",  image: "HR" },
    { name: "Parth Prakash",  image: "PP" },
    { name: "Moksh Kaushish",  image: "MK" },
    { name: "Tanmay Chaddha",  image: "TC" },
    { name: "Navya Arora",  image: "NA" },
    { name: "Ansh Dua",  image: "AD" },
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            The Team Behind the Mission
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">{member.image}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{member.name}</h3>
              <p className="text-primary-blue text-sm font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
const ValuesSection = () => {
  const values = [
    { icon: <Lock className="w-8 h-8 text-blue-600" />, title: "Confidentiality", description: "Your privacy is sacred. We are committed to creating a secure and anonymous space where you can feel safe to share." },
    { icon: <Wifi className="w-8 h-8 text-green-600" />, title: "Accessibility", description: "We believe support should be for everyone. Our platform is free for students and available in multiple languages." },
    { icon: <HandHeart className="w-8 h-8 text-purple-600" />, title: "Empathy", description: "Every feature is designed with a deep understanding of the student experience. We listen, we care, and we build for you." }
  ];
 
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Guided by Our Values</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border">
                {value.icon}
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">{value.title}</h3>
              <p className="text-slate-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main AboutUsPage component
const AboutUsPage = () => {
  return (
    // The Navbar and Footer are handled by App.jsx, so they are removed from here.
    <>
      <HeroSection />
      <OurStorySection />
      <TeamSection />
      <ValuesSection />
    </>
  );
};

export default AboutUsPage;
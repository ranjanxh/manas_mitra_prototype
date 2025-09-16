import React, { useState } from 'react';
import { Search, Calendar, CheckCircle, ChevronDown, ChevronUp, Shield, Clock, MapPin, Video, Phone, Star, User } from 'lucide-react';

// --- Mock Data ---
const mockCounselors = [
  { id: 1, name: "Dr. Anjali Sharma", credentials: "M.Sc. Clinical Psychology", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face", specializations: ["Anxiety", "Stress Management", "Academic Pressure"], bio: "I believe in creating a safe, non-judgmental space for students to explore their thoughts and feelings.", rating: 4.9, experience: "8 years", languages: ["English", "Hindi"], sessionTypes: ["In-Person", "Video Call"], availability: "Available today" },
  { id: 2, name: "Dr. Rajesh Kumar", credentials: "M.Phil. Psychology", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face", specializations: ["Relationships", "Social Anxiety", "Self-Esteem"], bio: "I help students navigate college life while building resilience and confidence for their future.", rating: 4.8, experience: "6 years", languages: ["English", "Hindi", "Punjabi"], sessionTypes: ["In-Person", "Video Call", "Phone Call"], availability: "Next available: Tomorrow" }
];

// --- Sub-Components ---

const CounselorProfileCard = ({ counselor, onViewProfile }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start space-x-4 mb-4">
        <img src={counselor.photo} alt={counselor.name} className="w-20 h-20 rounded-full object-cover" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{counselor.credentials}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center"><Star className="w-3 h-3 text-yellow-500 mr-1" /><span>{counselor.rating}</span></div>
            <div className="flex items-center"><Clock className="w-3 h-3 mr-1" /><span>{counselor.experience}</span></div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {counselor.specializations.map(spec => <span key={spec} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">{spec}</span>)}
      </div>
      <p className="text-sm text-gray-700 mb-4">{counselor.bio}</p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-xs font-medium text-green-600">{counselor.availability}</div>
        <button onClick={() => onViewProfile(counselor)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">View & Book</button>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const steps = [
    { icon: Search, title: "Browse Profiles", description: "Find a counselor that fits your needs." },
    { icon: Calendar, title: "Select a Time", description: "View their calendar and pick an open slot." },
    { icon: CheckCircle, title: "Confirm Session", description: "Book your confidential appointment." }
  ];
  return (
    <div className="bg-blue-50 rounded-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3"><step.icon className="w-6 h-6" /></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const faqs = [
    { question: "Is my session really confidential?", answer: "Yes, absolutely. All counseling sessions are completely confidential and protected by professional ethics codes." },
    { question: "What types of appointments are available?", answer: "Our counselors offer in-person meetings, secure video calls, and phone consultations." },
    { question: "How much do sessions cost?", answer: "All counseling sessions are completely free for registered students." }
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0">
            <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="flex items-center justify-between w-full py-4 text-left">
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openFAQ === index ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            {openFAQ === index && <div className="pb-4"><p className="text-gray-600">{faq.answer}</p></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Counselor Connect Page Component ---

const CounselorConnectPage = () => {
  const [counselors] = useState(mockCounselors);

  const handleViewProfile = (counselor) => {
    alert(`Opening booking page for ${counselor.name}`);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Counselor Connect</h1>
        <p className="text-lg text-gray-600">Schedule a confidential session with a certified on-campus professional.</p>
        <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center"><Shield className="w-4 h-4 text-green-600 mr-2" /><span>100% Confidential</span></div>
          <div className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /><span>Licensed Professionals</span></div>
        </div>
      </div>
      
      <HowItWorksSection />
      
      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Counselors</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {counselors.map(counselor => <CounselorProfileCard key={counselor.id} counselor={counselor} onViewProfile={handleViewProfile} />)}
        </div>
      </div>
      
      <FAQSection />
    </div>
  );
};

export default CounselorConnectPage;
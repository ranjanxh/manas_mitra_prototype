import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit3, 
  MessageSquare, 
  UserX, 
  Trash2, 
  Upload,
  Save,
  X,
  Star,
  TrendingUp,
  Users,
  Clock,
  Calendar,
  Mail,
  Shield
} from 'lucide-react';

const CounselorManagementPage = () => {
  const [counselors, setCounselors] = useState([
    { id: 1, name: "Dr. Anjali Sharma", credentials: "M.Sc. Clinical Psychology", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face", specializations: ["Anxiety", "Stress Management"], status: "Active", sessionsLastMonth: 42, avgRating: 4.9, bookingRate: 95, bio: "Dr. Sharma specializes in evidence-based therapeutic approaches.", weeklyAvailability: { monday: { start: "09:00", end: "17:00" } } },
    { id: 2, name: "Dr. Rajesh Kumar", credentials: "M.Phil. Psychology", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face", specializations: ["Relationships", "Social Anxiety"], status: "Active", sessionsLastMonth: 35, avgRating: 4.8, bookingRate: 91, bio: "Dr. Kumar brings a compassionate approach to supporting students.", weeklyAvailability: { tuesday: { start: "10:00", end: "18:00" } } },
    { id: 3, name: "Dr. Priya Mehta", credentials: "M.A. Counseling", avatar: "https://images.unsplash.com/photo-1594824949296-c8cfb14e87c8?w=100&h=100&fit=crop&crop=face", specializations: ["Trauma", "PTSD"], status: "Inactive", sessionsLastMonth: 0, avgRating: 0, bookingRate: 0, bio: "Dr. Mehta has extensive experience in trauma-informed care.", weeklyAvailability: {} },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [editingCounselor, setEditingCounselor] = useState(null);
  const [isNewCounselor, setIsNewCounselor] = useState(false);
  const [formData, setFormData] = useState({});

  const allSpecializations = useMemo(() => Array.from(new Set(counselors.flatMap(c => c.specializations))), [counselors]);

  const filteredCounselors = useMemo(() => {
    return counselors.filter(counselor => {
      const matchesSearch = searchTerm === "" || counselor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || counselor.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [counselors, searchTerm, statusFilter]);

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-800";
    if (status === "Inactive") return "bg-gray-100 text-gray-800";
    if (status === "Onboarding") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };
  
  const handleNewCounselor = () => {
    setIsNewCounselor(true);
    setEditingCounselor(null);
    setFormData({ name: "", credentials: "", status: "Onboarding", specializations: [], weeklyAvailability: {} });
    setActiveTab("profile");
    setIsModalOpen(true);
  };

  const handleEditCounselor = (counselor) => {
    setIsNewCounselor(false);
    setEditingCounselor(counselor);
    setFormData({ ...counselor });
    setActiveTab("profile");
    setIsModalOpen(true);
  };

  const handleSaveCounselor = () => {
    if (isNewCounselor) {
      setCounselors([...counselors, { ...formData, id: Date.now(), sessionsLastMonth: 0, avgRating: 0, bookingRate: 0 }]);
    } else {
      setCounselors(counselors.map(c => c.id === editingCounselor.id ? { ...formData } : c));
    }
    setIsModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Counselor Roster</h1>
        <button onClick={handleNewCounselor} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2">
          <Plus size={20} /> Onboard New Counselor
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500">
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Onboarding">Onboarding</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counselor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specializations</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance (30d)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCounselors.map(counselor => (
              <tr key={counselor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={counselor.avatar} alt={counselor.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{counselor.name}</div>
                      <div className="text-sm text-gray-500">{counselor.credentials}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {counselor.specializations.slice(0, 3).map(spec => <span key={spec} className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">{spec}</span>)}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div>{counselor.sessionsLastMonth} sessions</div>
                  <div className="flex items-center"><Star className="w-3 h-3 text-yellow-400 mr-1" /> {counselor.avgRating} rating</div>
                </td>
                <td className="px-6 py-4"><span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(counselor.status)}`}>{counselor.status}</span></td>
                <td className="px-6 py-4"><button onClick={() => handleEditCounselor(counselor)} className="text-blue-600 hover:text-blue-900"><Edit3 size={18} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">{isNewCounselor ? "Onboard New Counselor" : "Edit Counselor Profile"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="border-b">
              <nav className="flex space-x-4 px-4">
                {["profile", "professional", "scheduling", "account"].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 border-b-2 text-sm font-medium ${activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-6 overflow-y-auto">
              {/* Form content will go here based on activeTab */}
            </div>
            <div className="flex justify-end space-x-3 px-6 py-4 border-t bg-gray-50">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveCounselor} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Save size={18} /> {isNewCounselor ? "Create Counselor" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselorManagementPage;
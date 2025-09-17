import React, { useState } from 'react';
import { Save, X, Image } from 'lucide-react';

const EventCreateEditForm = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState(event || { title: '', description: '' });
  
  const isCreating = !event;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    onSave(formData);
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{isCreating ? 'Create New Event' : 'Edit Event'}</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <form className="space-y-6">
          {/* ... Your entire form structure is excellent ... */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onCancel} className="px-6 py-2 border rounded-lg">Cancel</button>
            <button type="button" onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg">{isCreating ? 'Create Event' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreateEditForm;
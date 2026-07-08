import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { api } from '../utils/api';
import { FileText, MapPin, Calendar, Clock, Zap, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function MyReportsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    toast.success('Report ID copied!');
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/api/complaints/my');
        if (res.success) {
          setComplaints(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading reports...</div>;

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Reports</h1>
        <p className="text-lg text-gray-500 mt-1">Track the status and resolution of the issues you have reported.</p>
      </motion.div>

      <div className="space-y-6">
        {complaints.length === 0 && <p className="text-gray-500">You have not reported any issues yet.</p>}
        {complaints.map((complaint, i) => (
          <Card 
            key={complaint._id} 
            animate 
            delay={i * 0.1}
            className="hover:shadow-lg transition-shadow duration-300 group"
          >
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {complaint.imageUrl ? (
                  <div className="w-full md:w-56 h-40 bg-gray-200 rounded-2xl overflow-hidden flex-shrink-0 relative group-hover:scale-[1.02] transition-transform duration-300">
                    <img src={complaint.imageUrl} alt="Issue" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full md:w-56 h-40 bg-gray-50 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 border-2 border-dashed border-gray-200 text-gray-400 group-hover:border-brand-200 group-hover:text-brand-400 transition-colors duration-300">
                    <FileText className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-sm font-medium">No Image</span>
                  </div>
                )}
                
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-xl text-gray-900">{complaint.category || 'General'} Issue</h3>
                        <StatusBadge status={complaint.status} />
                      </div>
                      <span className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg whitespace-nowrap">
                        ID: {complaint._id.substring(0, 8).toUpperCase()}
                        <button 
                          onClick={() => handleCopyId(complaint._id)}
                          className="hover:text-brand-500 transition-colors focus:outline-none"
                          title="Copy Full ID"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-base line-clamp-2 mb-4">{complaint.text}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-medium">
                    <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {complaint.location?.address || 'Unknown Location'}
                    </div>
                    <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {complaint.status === 'Open' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-brand-50/50 border border-brand-100 text-brand-700 text-sm p-4 rounded-xl flex items-start gap-3 mt-4"
                    >
                      <div className="bg-brand-100 p-1.5 rounded-full flex-shrink-0">
                        <Zap className="w-4 h-4 text-brand-600" />
                      </div>
                      <p className="leading-relaxed">
                        <span className="font-semibold text-brand-800">AI Merged:</span> This report was clustered with <strong>{complaint.duplicateCount} similar reports</strong> to increase priority. Estimated action within 48 hours.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  if (!status) return null;
  switch (status.toLowerCase()) {
    case 'pending': return <Badge variant="warning" dot>Pending</Badge>;
    case 'open': return <Badge variant="warning" dot>Open</Badge>;
    case 'processing': 
    case 'in progress': return <Badge variant="info" dot>In Progress</Badge>;
    case 'resolved': return <Badge variant="success" dot>Resolved</Badge>;
    default: return <Badge dot>{status}</Badge>;
  }
}

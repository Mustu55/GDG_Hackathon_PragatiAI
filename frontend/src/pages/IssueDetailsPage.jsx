import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { Users, AlertTriangle, ArrowLeft, Bot, MapPin, Building, Activity, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IssueDetailsPage() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIssue = async () => {
    try {
      const res = await api.get(`/api/issues/${id}`);
      if (res.success) {
        setIssue(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch issue:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      const res = await api.put(`/api/issues/${id}`, { status });
      if (res.success) {
        setIssue(res.data);
        toast.success(`Issue marked as ${status}`);
      }
    } catch (err) {
      toast.error('Failed to update issue status');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading issue details...</div>;
  if (!issue) return <div className="p-8 text-center text-red-500">Issue not found</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/admin/issues" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-brand-600 mb-6 group transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Prioritized Issues
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary" className="bg-brand-50 text-brand-700 border border-brand-200 shadow-sm">ID: {issue._id.substring(0,8).toUpperCase()}</Badge>
              {issue.priority === 'Critical' && <Badge variant="danger" dot className="shadow-sm">Critical Severity</Badge>}
              <Badge variant="info" dot className="shadow-sm">{issue.status}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{issue.title}</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-gray-50" onClick={() => updateStatus('In Progress')}>Mark In Progress</Button>
            <Button variant="primary" className="shadow-lg shadow-brand-200/50" onClick={() => updateStatus('Resolved')} disabled={issue.status === 'Resolved'}><ShieldCheck className="w-4 h-4 mr-2"/> Mark Done</Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card animate delay={0.1} className="shadow-lg shadow-brand-100/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-100 rounded-full blur-3xl pointer-events-none" />
            <CardHeader className="bg-white/50 border-b border-brand-100/50 backdrop-blur pb-4">
              <CardTitle className="flex items-center gap-2 text-brand-900"><Zap className="w-5 h-5 text-brand-600"/> AI Analysis & Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 md:p-8 relative">
              <div className="bg-gradient-to-r from-brand-50 to-teal-50 border border-brand-100/50 rounded-2xl p-6 flex gap-5">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Governance Brief</h4>
                  <p className="text-base text-gray-700 leading-relaxed">
                    This issue has clustered <strong className="text-brand-700">{issue.duplicateCount || 1} individual reports</strong>. Immediate inspection by <strong className="text-gray-900">{issue.department}</strong> is recommended.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                 <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Reports Merged</p>
                    <p className="font-black text-2xl text-gray-900 flex items-center gap-2"><Users className="w-5 h-5 text-brand-500"/> {issue.duplicateCount || 1}</p>
                 </div>
                 <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</p>
                    <p className="font-bold text-lg text-gray-900 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-brand-500"/> {issue.category}</p>
                 </div>
                 <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Department</p>
                    <p className="font-bold text-lg text-gray-900 flex items-center gap-2"><Building className="w-4 h-4 text-brand-500"/> {issue.department.split(' ')[0]}</p>
                 </div>
                 <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Impact Score</p>
                    <p className="font-bold text-lg text-gray-900 flex items-center gap-2"><Activity className="w-4 h-4 text-brand-500"/> {issue.impactScore}/100</p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card animate delay={0.2} className="border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle>Merged Individual Reports <Badge className="ml-2 bg-brand-100 text-brand-700">{issue.linkedComplaints?.length || 0}</Badge></CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <ul className="divide-y divide-gray-100">
                {issue.linkedComplaints && issue.linkedComplaints.map((comp, i) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.1) }}
                    key={comp._id || comp} 
                    className="p-5 flex justify-between items-center hover:bg-brand-50/50 transition-colors group"
                  >
                    <span className="font-bold text-gray-700 group-hover:text-brand-700">Complaint: {typeof comp === 'object' ? comp.text?.substring(0, 30) : comp.substring(0,8)}...</span>
                    <Button variant="outline" size="sm" className="bg-white shadow-sm hover:border-brand-300">View Original</Button>
                  </motion.li>
                ))}
               </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
           <Card animate delay={0.3} className="border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full h-56 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-200 mb-6 relative overflow-hidden group">
                 <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #0284c7 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                 <div className="relative z-10 flex flex-col items-center gap-3">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-brand-100 group-hover:-translate-y-2 transition-transform duration-300">
                     <MapPin className="w-6 h-6 text-brand-600" />
                   </div>
                 </div>
              </div>
              <p className="font-bold text-lg text-gray-900 mb-1">{issue.location?.address || 'Unknown'}</p>
              <p className="text-sm font-medium text-gray-500 bg-gray-50 inline-block px-2 py-1 rounded">Coords: {issue.location?.lat || 'N/A'}, {issue.location?.lng || 'N/A'}</p>
            </CardContent>
          </Card>

          <Card animate delay={0.4} className="border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle className="text-gray-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-gray-600"/> Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white">
                 <p className="text-sm font-medium text-gray-500 p-4 bg-gray-50 rounded-lg text-center">No critical infrastructure identified nearby.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

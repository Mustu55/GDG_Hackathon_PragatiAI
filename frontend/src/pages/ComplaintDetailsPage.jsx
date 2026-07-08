import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { mockComplaints } from '../data/mockComplaints';
import { MapPin, Calendar, Clock, ArrowLeft, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const complaint = mockComplaints.find(c => c.id === id) || mockComplaints[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/my-reports" className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to My Reports
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-600 font-black text-xl border border-brand-100">
            {complaint.issueType[0]}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Complaint {complaint.id}</h1>
              <StatusBadge status={complaint.status} />
            </div>
            <p className="text-gray-500 font-medium mt-1">Submitted on {new Date(complaint.date).toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>

      <Card animate delay={0.1} className="shadow-lg shadow-gray-200/50">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <CardTitle>Issue Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-6 md:p-8">
          {complaint.imageUrl && (
            <div className="w-full h-80 bg-gray-100 rounded-2xl overflow-hidden relative group">
               <img src={complaint.imageUrl} alt="Issue evidence" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-white font-semibold flex items-center gap-2"><Zap className="w-4 h-4"/> AI Analyzed</span>
               </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</p>
              <p className="text-lg font-bold text-gray-900">{complaint.issueType} Issue</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date Reported</p>
              <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(complaint.date).toLocaleDateString()}
              </p>
            </div>
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</p>
              <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {complaint.location}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Description</p>
              <p className="text-base text-gray-700 p-6 bg-white rounded-xl border-2 border-gray-100 leading-relaxed shadow-sm">
                {complaint.description}
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100">
            <h3 className="font-bold text-xl text-gray-900 mb-8 flex items-center gap-2">
              <Clock className="w-6 h-6 text-brand-600" />
              AI Status Timeline
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-brand-500 before:via-brand-200 before:to-gray-200 before:rounded-full">
              <TimelineItem date={new Date(complaint.date).toLocaleDateString()} title="Complaint Submitted" active />
              <TimelineItem date="Analyzing..." title="AI Prioritization & Merging" active={complaint.status !== 'Open'} />
              <TimelineItem date="Pending" title="Assigned to Department" active={complaint.status === 'Resolved'} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }) {
  switch (status.toLowerCase()) {
    case 'open': return <Badge variant="warning" dot className="shadow-sm">Open</Badge>;
    case 'in progress': return <Badge variant="info" dot className="shadow-sm">In Progress</Badge>;
    case 'resolved': return <Badge variant="success" dot className="shadow-sm">Resolved</Badge>;
    default: return <Badge dot className="shadow-sm">{status}</Badge>;
  }
}

function TimelineItem({ date, title, active }) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-white border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10 ${active ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
            <div className="w-2 h-2 bg-current rounded-full"></div>
        </div>
        <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-2xl border transition-all ${active ? 'border-brand-200 bg-brand-50 shadow-sm' : 'border-gray-100 bg-white'}`}>
            <div className="font-bold text-gray-900 text-lg mb-1">{title}</div>
            <div className="text-gray-500 font-medium text-sm">{date}</div>
        </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { AlertTriangle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function CitizenDashboardPage() {
  const [complaints, setComplaints] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/api/complaints/my');
        if (res.success) setComplaints(res.data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const recentComplaints = complaints.slice(0, 3);
  const totalReports = complaints.length;
  const inProgress = complaints.filter(c => c.status === 'In Progress' || c.status === 'Processing').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</h1>
          <p className="text-lg text-gray-500 mt-1">Here's an overview of your civic reports and activities.</p>
        </div>
        <Link to="/report">
          <Button variant="primary" size="lg" className="w-full md:w-auto shadow-lg shadow-brand-200/50">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Report New Issue
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard delay={0.1} title="Total Reports" value={totalReports} icon={AlertTriangle} color="bg-blue-50 text-blue-600 border border-blue-100" />
        <StatCard delay={0.2} title="In Progress" value={inProgress} icon={Clock} color="bg-yellow-50 text-yellow-600 border border-yellow-100" />
        <StatCard delay={0.3} title="Resolved" value={resolved} icon={CheckCircle2} color="bg-green-50 text-green-600 border border-green-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card animate delay={0.4} className="shadow-sm border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between bg-white border-b border-gray-100/50">
              <CardTitle className="text-xl">Recent Reports</CardTitle>
              <Link to="/my-reports" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center group">
                View All <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-50">
              {loading ? (
                <li className="p-8 text-center text-gray-400">Loading your reports...</li>
              ) : recentComplaints.length === 0 ? (
                <li className="p-8 text-center text-gray-400">No complaints submitted yet. Report your first issue!</li>
              ) : recentComplaints.map((complaint) => (
                <li key={complaint._id} className="p-6 hover:bg-gray-50/80 transition-colors group">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-gray-900">{complaint.category || 'General'}</span>
                        <StatusBadge status={complaint.status} />
                      </div>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{complaint.text || complaint.description}</p>
                      <div className="flex items-center text-xs font-medium text-gray-400 gap-4">
                        <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />{complaint.location?.address || complaint.location}</span>
                        <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />{new Date(complaint.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card animate delay={0.5} className="bg-gradient-to-br from-brand-50 to-teal-50 border-brand-100/50 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-200/50 rounded-full blur-3xl pointer-events-none" />
            <CardContent className="p-8 relative">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-brand-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">Need Help?</h3>
              <p className="text-sm text-brand-700/80 mb-8 leading-relaxed">Our AI assistant can help you check status, understand schemes, or draft a better complaint.</p>
              <Link to="/chat">
                <Button variant="primary" className="w-full shadow-lg shadow-brand-200/50">Chat with AI Assistant</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, delay }) {
  return (
    <Card animate delay={delay} className="hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="p-6 flex items-center gap-5">
        <div className={`p-4 rounded-2xl shadow-sm ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">{title}</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
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

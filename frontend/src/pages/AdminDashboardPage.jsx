import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Users, AlertTriangle, CheckCircle, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState({
    totalIssues: 0,
    inProgress: 0,
    resolvedIssues: 0,
    avgResolutionTime: 'N/A'
  });
  const [issues, setIssues] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, issuesRes] = await Promise.all([
          api.get('/api/analytics'),
          api.get('/api/issues')
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (issuesRes.success) setIssues(issuesRes.data.slice(0, 5)); // show top 5
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Command Center</h1>
        <p className="text-lg text-gray-500 mt-1">Real-time overview of civic issues and AI-driven insights.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard delay={0.1} title="Total Issues" value={stats.totalIssues} icon={AlertTriangle} color="text-red-600 bg-red-50 border-red-100" />
        <StatCard delay={0.2} title="In Progress" value={stats.inProgress} icon={TrendingUp} color="text-blue-600 bg-blue-50 border-blue-100" />
        <StatCard delay={0.3} title="Resolved" value={stats.resolvedIssues} icon={CheckCircle} color="text-green-600 bg-green-50 border-green-100" />
        <StatCard delay={0.4} title="Avg Resolution" value={stats.avgResolutionTime} icon={Users} color="text-brand-600 bg-brand-50 border-brand-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card animate delay={0.5} className="shadow-lg shadow-gray-200/40 border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-100 text-brand-600 rounded-md">
                  <Zap className="w-4 h-4" />
                </div>
                <CardTitle>AI Prioritized Hotspots</CardTitle>
              </div>
              <Link to="/admin/issues" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center group">
                View All <ChevronRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {issues.length === 0 && (
                  <div className="p-8 text-center text-gray-400">
                    <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                    <p className="font-medium">No active issues yet.</p>
                    <p className="text-sm mt-1">They will appear here after citizens submit complaints.</p>
                  </div>
                )}
                {issues.map((issue) => (
                  <Link to={`/admin/issues/${issue._id}`} key={issue._id} className="block p-6 hover:bg-gray-50/80 transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-600 transition-colors">{issue.title}</h3>
                        {issue.impactScore > 80 && <Badge variant="danger" dot>Critical</Badge>}
                      </div>
                      <Badge variant="primary" className="bg-brand-50 border border-brand-200">
                        {issue.impactScore} Impact Score
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">{issue.summary}</p>
                    <div className="flex gap-6 text-sm font-medium text-gray-500">
                      <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md"><Users className="w-4 h-4 text-gray-400"/> {issue.duplicateCount || 1} Reports</span>
                      <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md"><AlertTriangle className="w-4 h-4 text-gray-400"/> {issue.category}</span>
                      <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md">📍 {issue.location?.address || 'Unknown'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card animate delay={0.6} className="bg-gradient-to-br from-brand-900 to-gray-900 border-none shadow-xl shadow-brand-900/20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <CardHeader className="border-b border-white/10 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-500/20 rounded-lg text-brand-300">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <CardTitle className="text-white text-lg">Daily Governance Brief</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 relative z-10">
              <div className="space-y-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <strong className="text-white font-semibold block mb-1">Priority 1 - Ward 7:</strong> 
                  Water contamination reported by 340 citizens. Trend is increasing. 2 schools and 1 PHC in affected zone.
                </p>
                <div className="mt-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <Zap className="w-4 h-4" />
                    <p className="text-sm font-bold tracking-wide uppercase">AI Recommended Action</p>
                  </div>
                  <p className="text-sm text-yellow-100/90 leading-relaxed">Deploy inspection team immediately. Issue public advisory via SMS to Ward 7 residents to boil water before consumption.</p>
                </div>
                <Link to="/admin/brief" className="inline-block mt-4 text-sm font-medium text-brand-300 hover:text-white transition-colors">
                  Read full brief →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, delay }) {
  return (
    <Card animate delay={delay} className="hover:-translate-y-1 transition-transform duration-300 border shadow-sm">
      <CardContent className="p-6 flex items-center gap-5">
        <div className={`p-4 rounded-2xl shadow-sm border ${color}`}>
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

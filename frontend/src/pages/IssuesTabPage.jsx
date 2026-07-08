import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { api } from '../utils/api';
import { Users, AlertTriangle, ArrowRight, Filter, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IssuesTabPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await api.get('/api/issues');
        if (res.success) {
          setIssues(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch issues:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading issues...</div>;

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Prioritized Issues
            <Badge variant="primary" className="bg-brand-100 text-brand-700 font-bold border border-brand-200">
              <Zap className="w-3 h-3 mr-1" /> Live AI Clustered
            </Badge>
          </h1>
          <p className="text-lg text-gray-500 mt-1">AI-clustered community issues requiring attention.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white"><Filter className="w-4 h-4 mr-2"/> Filter by Ward</Button>
        </div>
      </motion.div>

      <div className="space-y-5">
        {issues.length === 0 && <p className="text-gray-500">No issues found.</p>}
        {issues.map((issue, i) => (
          <Card key={issue._id} animate delay={i * 0.1} className="hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100/50 transition-all duration-300 group">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6 md:p-8 space-y-5">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-bold text-2xl text-gray-900 group-hover:text-brand-700 transition-colors">{issue.title}</h3>
                        {issue.priority === 'Critical' && <Badge variant="danger" dot>Priority 1</Badge>}
                        {issue.priority === 'High' && <Badge variant="warning" dot>Priority 2</Badge>}
                        <Badge variant="primary" className="bg-brand-50 border border-brand-200 text-brand-700 shadow-sm">
                          <Target className="w-3 h-3 mr-1" /> {issue.impactScore}% AI Impact
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed max-w-3xl">{issue.summary}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5 font-bold text-red-700 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg shadow-sm">
                      <Users className="w-4 h-4" /> {issue.duplicateCount || 1} Reports Merged
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <AlertTriangle className="w-4 h-4 text-gray-400" /> {issue.category}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      📍 {issue.location?.address || 'Unknown'}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      Status: <strong className="text-gray-900 ml-1">{issue.status}</strong>
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center bg-gray-50/50 border-t lg:border-t-0 lg:border-l border-gray-100 p-6 md:p-8 lg:min-w-[280px]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Assigned Department</p>
                  <p className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center">🏛️</div>
                    {issue.department}
                  </p>
                  <Link to={`/admin/issues/${issue._id}`} className="w-full">
                    <Button variant="primary" className="w-full justify-between shadow-md group-hover:bg-brand-700 transition-colors">
                      Action Dashboard
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

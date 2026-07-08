import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { FileText, Download, CheckSquare, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../utils/api';
import jsPDF from 'jspdf';

export default function GovernanceBriefPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await api.get('/api/issues');
        if (res.success) {
          // Sort by impact score or priority and take top 5
          const sorted = res.data.sort((a, b) => b.impactScore - a.impactScore).slice(0, 5);
          setIssues(sorted);
        }
      } catch (err) {
        console.error('Failed to fetch issues for brief:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Pragati AI - Governance Brief', 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    let y = 40;
    issues.forEach((issue, idx) => {
      doc.setFontSize(14);
      doc.text(`${idx + 1}. ${issue.title}`, 14, y);
      doc.setFontSize(10);
      y += 6;
      const splitText = doc.splitTextToSize(issue.summary || '', 180);
      doc.text(splitText, 14, y);
      y += (splitText.length * 5) + 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('governance_brief.pdf');
  };

  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Governance Brief...</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-900 p-8 rounded-3xl text-white shadow-xl shadow-gray-900/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <span className="text-brand-300 font-bold uppercase tracking-wider text-sm">AI Executive Summary</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">Daily Governance Brief</h1>
          <p className="text-gray-400 mt-2 text-lg">{dateStr}</p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Button variant="primary" className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg" onClick={exportPDF}>
            <Download className="w-4 h-4 mr-2"/> Export PDF
          </Button>
        </div>
      </motion.div>

      <Card animate delay={0.1} className="border-0 shadow-xl shadow-gray-200/50">
        <CardContent className="p-0">
          <div className="p-8 md:p-12 border-b border-gray-100 bg-gradient-to-br from-white to-gray-50 flex items-start gap-6">
             <div className="p-4 bg-brand-100 rounded-2xl text-brand-600 shadow-sm border border-brand-200 flex-shrink-0">
               <FileText className="w-8 h-8" />
             </div>
             <div>
               <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
               <p className="mt-4 text-gray-600 leading-relaxed text-lg">
                 The system has processed <strong className="text-gray-900">1,240 citizen reports</strong> over the last 24 hours. A critical cluster regarding water contamination has been identified in Ward 7, affecting approximately <strong className="text-red-600">340 citizens</strong> and critical infrastructure. Overall resolution rates remain stable at 68%, but action is required on Priority 1 items immediately.
               </p>
             </div>
          </div>

          <div className="p-8 md:p-12 space-y-8 bg-white">
             <div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-brand-600" /> Top Priorities for Action
                </h3>
                <div className="space-y-6">
                  {issues.length === 0 && <p className="text-gray-500">No critical issues identified.</p>}
                  {issues.map((issue, idx) => (
                    <motion.div 
                      key={issue._id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="group p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 relative overflow-hidden"
                    >
                       <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-black text-2xl text-gray-400 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors flex-shrink-0">
                         {idx + 1}
                       </div>
                       <div className="flex-1">
                         <div className="flex flex-wrap items-center gap-3 mb-2">
                           <h4 className="font-bold text-xl text-gray-900">{issue.title}</h4>
                           <span className="bg-red-50 text-red-700 text-xs font-bold px-2.5 py-1 rounded-md border border-red-100 flex items-center gap-1">
                             <AlertTriangle className="w-3 h-3" /> Priority {idx + 1}
                           </span>
                         </div>
                         <p className="text-base text-gray-600 mb-4 leading-relaxed">{issue.summary}</p>
                         <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-200/60">
                            <strong className="text-yellow-800 flex items-center gap-2 mb-2 font-bold uppercase tracking-wide text-xs">
                              <CheckSquare className="w-4 h-4"/> AI Recommended Action
                            </strong> 
                            <span className="text-gray-800 text-base">Deploy emergency response team from <strong className="text-brand-700">{issue.department}</strong>. Priority score: <strong className="text-gray-900">{issue.impactScore}</strong>.</span>
                         </div>
                       </div>
                    </motion.div>
                  ))}
                </div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

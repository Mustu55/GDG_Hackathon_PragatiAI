import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { mockStats } from '../data/mockStats';
import { TrendingUp, BarChart2, PieChart, Activity, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { api } from '../utils/api';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = React.useState(null);

  React.useEffect(() => {
    api.get('/api/analytics').then(res => {
      if (res.success) setAnalytics(res.data);
    }).catch(console.error);
  }, []);

  const exportPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Pragati AI - Civic Governance Report', 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    let yPos = 40;
    if (analytics) {
      doc.text(`Total Reports: ${analytics.totalComplaints || 0}`, 14, yPos); yPos += 8;
      doc.text(`Resolved Issues: ${analytics.resolvedIssues || 0}`, 14, yPos); yPos += 8;
      doc.text(`Average Resolution Time: ${analytics.avgResolutionTime || 'N/A'}`, 14, yPos); yPos += 15;
    }

    try {
      const res = await api.get('/api/issues');
      if (res.success && res.data.length > 0) {
        autoTable(doc, {
          startY: yPos,
          head: [['ID', 'Title', 'Priority', 'Status', 'Dept']],
          body: res.data.map(i => [
            i._id.substring(0,6),
            i.title,
            i.priority,
            i.status,
            i.department || 'N/A'
          ]),
        });
      }
    } catch (err) {
      console.error('Failed to fetch issues for PDF', err);
    }
    
    doc.save('pragati_report.pdf');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Performance Analytics <Activity className="w-6 h-6 text-brand-600" />
          </h1>
          <p className="text-lg text-gray-500 mt-1">Deep dive into issue trends and departmental efficiency metrics.</p>
        </div>
        <Button variant="outline" className="bg-white hover:bg-brand-50 hover:text-brand-700 hover:border-brand-300 shadow-sm" onClick={exportPDF}>
          <Download className="w-4 h-4 mr-2" /> Export Report (PDF)
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
            <CardContent className="p-8">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Reports Processed</p>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-black text-gray-900">{analytics?.totalComplaints || mockStats.totalIssues}</p>
                <span className="text-sm font-bold text-green-500 mb-1 flex items-center bg-green-50 px-2 py-0.5 rounded"><TrendingUp className="w-3 h-3 mr-1"/> 12%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-brand-500">
            <CardContent className="p-8">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Avg Resolution Time</p>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-black text-gray-900">{analytics?.avgResolutionTime || mockStats.avgResolutionTime}</p>
                <span className="text-sm font-bold text-green-500 mb-1 flex items-center bg-green-50 px-2 py-0.5 rounded"><TrendingUp className="w-3 h-3 mr-1" style={{transform: "scaleY(-1)"}}/> 1.5d</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500 bg-gradient-to-br from-white to-purple-50/30">
            <CardContent className="p-8">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Auto-merged Duplicates</p>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-brand-600">64%</p>
                <span className="text-sm font-bold text-gray-500 mb-1">by AI Engine</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card animate delay={0.4} className="shadow-lg shadow-gray-200/50">
          <CardHeader className="bg-gray-50/50 border-b-gray-100 p-6">
             <CardTitle className="flex items-center gap-2 text-xl"><BarChart2 className="w-5 h-5 text-brand-600"/> Reports Over Time (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
             <div className="h-72 flex items-end gap-3 justify-between">
                {[45, 60, 30, 80, 50, 90, 75].map((val, i) => (
                  <div key={i} className="w-full bg-brand-50 rounded-t-lg relative group h-full flex items-end">
                     <motion.div 
                       initial={{ height: 0 }} 
                       whileInView={{ height: `${val}%` }} 
                       viewport={{ once: true }}
                       transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                       className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-lg group-hover:opacity-80 transition-opacity relative"
                     >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{val}</span>
                     </motion.div>
                  </div>
                ))}
             </div>
             <div className="flex justify-between text-sm font-medium text-gray-400 mt-4 px-2">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
          </CardContent>
        </Card>

        <Card animate delay={0.5} className="shadow-lg shadow-gray-200/50">
          <CardHeader className="bg-gray-50/50 border-b-gray-100 p-6">
             <CardTitle className="flex items-center gap-2 text-xl"><PieChart className="w-5 h-5 text-brand-600"/> Issues by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
             <div className="space-y-6">
                {[
                  { label: 'Water & Sanitation', val: 45, color: 'bg-blue-500' },
                  { label: 'Roads & Infrastructure', val: 30, color: 'bg-gray-600' },
                  { label: 'Electricity & Power', val: 15, color: 'bg-yellow-500' },
                  { label: 'Other', val: 10, color: 'bg-brand-400' },
                ].map((item, i) => (
                  <div key={item.label} className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span className="font-semibold text-gray-700">{item.label}</span>
                       <span className="font-black text-gray-900">{item.val}%</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${item.val}%` }}
                         viewport={{ once: true }}
                         transition={{ duration: 1, delay: 0.3 + (i * 0.1) }}
                         className={`${item.color} h-3 rounded-full relative overflow-hidden`}
                       >
                         <div className="absolute inset-0 bg-white/20 w-full h-full transform -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                       </motion.div>
                     </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

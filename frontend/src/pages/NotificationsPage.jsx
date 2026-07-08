import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Bell, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { api } from '../utils/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [issuesRes, complaintsRes] = await Promise.all([
          api.get('/api/issues'),
          api.get('/api/complaints/my')
        ]);
        
        let notifs = [];
        
        if (issuesRes.success) {
          issuesRes.data.slice(0,3).forEach((issue, i) => {
            if (issue.priority === 'Critical') {
              notifs.push({
                id: `iss-${issue._id}`,
                title: 'New Critical Issue Detected',
                desc: `AI has clustered reports into a single critical issue: ${issue.title}.`,
                type: 'alert',
                time: new Date(issue.createdAt || Date.now()).toLocaleDateString(),
                unread: i === 0
              });
            }
          });
        }
        
        if (complaintsRes.success) {
          complaintsRes.data.slice(0,3).forEach((comp, i) => {
            if (comp.status === 'Resolved') {
              notifs.push({
                id: `comp-${comp._id}`,
                title: 'Report Resolved',
                desc: `Your report regarding "${comp.text?.substring(0,20)}..." has been resolved.`,
                type: 'success',
                time: new Date(comp.updatedAt || Date.now()).toLocaleDateString(),
                unread: i === 0
              });
            }
          });
        }
        
        // Add a static one if list is too small
        if (notifs.length < 3) {
           notifs.push({
             id: 'sys-1', title: 'Daily Brief Ready', desc: 'Your Daily Governance Brief for today is ready to view.', type: 'info', time: new Date().toLocaleDateString(), unread: false
           });
        }
        
        setNotifications(notifs);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500">System alerts and updates.</p>
        </div>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <ul className="divide-y divide-gray-100">
             {loading && <li className="p-8 text-center text-gray-500">Loading notifications...</li>}
             {!loading && notifications.length === 0 && <li className="p-8 text-center text-gray-500">No new notifications.</li>}
             {!loading && notifications.map((n) => (
               <li key={n.id} className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors ${n.unread ? 'bg-blue-50/30' : ''}`}>
                  <div className={`p-2 rounded-full h-fit ${n.type === 'alert' ? 'bg-red-100 text-red-600' : n.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                     {n.type === 'alert' && <AlertTriangle className="w-5 h-5" />}
                     {n.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                     {n.type === 'info' && <Bell className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-sm font-medium ${n.unread ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</h4>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{n.desc}</p>
                  </div>
               </li>
             ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

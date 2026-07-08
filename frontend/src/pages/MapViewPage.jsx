import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Filter, Layers, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { api } from '../utils/api';

// Fix Leaflet's default icon path issues with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapViewPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default center (can be dynamically set to the city's coordinates)
  const defaultCenter = [28.6139, 77.2090]; // New Delhi

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await api.get('/api/issues');
        if (res.success) {
          setIssues(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch issues for map:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-10rem)] max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Geospatial Hotspots <Navigation className="w-6 h-6 text-brand-600" />
          </h1>
          <p className="text-lg text-gray-500 mt-1">Real-time mapping of AI-clustered civic issues across the region.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors"><Filter className="w-4 h-4 mr-2"/> Filter Map</Button>
          <Button variant="outline" className="bg-white shadow-sm hover:border-brand-300 hover:text-brand-700 transition-colors"><Layers className="w-4 h-4 mr-2"/> Layers</Button>
        </div>
      </motion.div>

      <Card animate delay={0.1} className="flex-1 overflow-hidden shadow-xl shadow-brand-100/50 border-gray-200 relative group">
        <CardContent className="p-0 h-full relative">
          <div className="absolute inset-0 bg-[#eef2f5] flex flex-col items-center justify-center text-gray-500 overflow-hidden">
             
             {/* Decorative Map Grid Background */}
             <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, #0284c7 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
             
             {/* Map UI Elements */}
             <div className="absolute top-6 left-6 bg-white/90 backdrop-blur shadow-lg rounded-xl p-4 border border-white max-w-xs z-[1000] hidden md:block transition-transform duration-300 group-hover:scale-[1.02]">
                <h3 className="font-bold text-gray-900 mb-2">Live Heatmap</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Areas with high density of similar reports are highlighted. AI has identified {issues.length} active hotspots today.</p>
             </div>

             {/* Leaflet Map Integration */}
             <div className="absolute inset-0 z-0">
               {loading ? (
                 <div className="flex h-full items-center justify-center">Loading Map Data...</div>
               ) : (
                 <MapContainer center={defaultCenter} zoom={11} style={{ height: '100%', width: '100%' }}>
                   <TileLayer
                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   />
                   {issues.map(issue => {
                     // Add slight randomization for demo purposes if lat/lng are missing
                     const lat = issue.location?.lat || defaultCenter[0] + (Math.random() - 0.5) * 0.1;
                     const lng = issue.location?.lng || defaultCenter[1] + (Math.random() - 0.5) * 0.1;

                     return (
                       <Marker key={issue._id} position={[lat, lng]}>
                         <Popup>
                           <div>
                             <h4 className="font-bold text-sm mb-1">{issue.title}</h4>
                             <p className="text-xs text-gray-600 mb-2">{issue.summary}</p>
                             <div className="text-xs font-semibold text-brand-600">Priority: {issue.priority}</div>
                           </div>
                         </Popup>
                       </Marker>
                     );
                   })}
                 </MapContainer>
               )}
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

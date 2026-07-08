import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Search, MapPin, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function StatusCheckPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Navigate to the details page (simulated logic)
    navigate(`/complaint/${data.identifier}`);
  };

  return (
    <div className="max-w-3xl mx-auto pt-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-brand-200">
          <Activity className="w-8 h-8 text-brand-600" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Track Your Report</h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          Enter your <span className="font-semibold text-gray-700">Complaint ID</span> or registered <span className="font-semibold text-gray-700">Phone Number</span> to see real-time AI status updates.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="shadow-2xl shadow-brand-100/50 border-0 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-teal-500" />
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="relative group">
                <Input
                  label="Complaint ID or Phone Number"
                  placeholder="e.g. COMP-2024-001 or +91 9876543210"
                  {...register("identifier", { required: "Please enter a valid identifier" })}
                  error={errors.identifier?.message}
                  className="pl-12 py-4 text-lg bg-white border-2 border-gray-200 focus:border-brand-500 shadow-sm transition-shadow group-focus-within:shadow-md"
                />
                <Search className="w-6 h-6 text-gray-400 absolute left-4 top-[44px] group-focus-within:text-brand-500 transition-colors" />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full text-lg py-4 shadow-xl shadow-brand-200/50 group">
                Search Database
                <Search className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12 text-center flex flex-col items-center justify-center text-gray-400 text-sm gap-2">
        <MapPin className="w-5 h-5" />
        <p>Your request is securely processed via Pragati AI Government Gateway.</p>
      </motion.div>
    </div>
  );
}

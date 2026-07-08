import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card, CardContent } from '../components/common/Card';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Building2 } from 'lucide-react';

export default function OfficerRegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser({ 
        name: data.name, 
        email: data.email, 
        password: data.password, 
        role: 'admin', 
        department: data.department 
      });
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Background (Similar to Citizen but with blue/slate tones) */}
      <div className="absolute top-0 left-0 w-full max-w-2xl h-[50vh] bg-blue-500/10 blur-[120px] pointer-events-none rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-full max-w-lg h-[40vh] bg-slate-500/10 blur-[100px] pointer-events-none rounded-tl-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200/50 border border-gray-100">
            <ShieldCheck className="w-8 h-8 text-gray-800" />
          </div>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-6 text-center text-4xl font-black text-gray-900 tracking-tight"
        >
          Officer Access
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-2 text-center text-gray-500 font-medium flex justify-center items-center gap-2"
        >
          <Building2 className="w-4 h-4 text-gray-400" /> Secure government portal
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <Card className="shadow-2xl shadow-gray-900/5 border-0 bg-white/80 backdrop-blur-xl">
          <CardContent className="p-8 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                placeholder="e.g. Anjali Desai"
                {...register("name", { required: "Name is required" })}
                error={errors.name?.message}
                className="bg-gray-50/50 focus:bg-white"
              />
              <Input
                label="Government Email"
                type="email"
                placeholder="name@gov.in"
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /.*@gov\.in$/, message: "Must be a valid @gov.in email address" }
                })}
                error={errors.email?.message}
                className="bg-gray-50/50 focus:bg-white"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Department"
                  {...register("department", { required: "Department is required" })}
                  error={errors.department?.message}
                  placeholder="e.g. PWD"
                  className="bg-gray-50/50 focus:bg-white"
                />
                <Input
                  label="Employee ID"
                  {...register("employeeId", { required: "ID is required" })}
                  error={errors.employeeId?.message}
                  placeholder="EMP-1234"
                  className="bg-gray-50/50 focus:bg-white"
                />
              </div>

              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 characters" } })}
                error={errors.password?.message}
                className="bg-gray-50/50 focus:bg-white"
              />
              
              <div className="pt-2">
                <Button type="submit" size="lg" className="w-full text-lg shadow-xl shadow-gray-200/50 bg-gray-900 hover:bg-gray-800 text-white border-none group" isLoading={loading}>
                  Request Access <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm font-medium text-gray-600">
                Already have access? <Link to="/login" className="font-bold text-gray-900 hover:text-gray-700 transition-colors">Sign in here</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

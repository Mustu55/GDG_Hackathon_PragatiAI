import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card, CardContent } from '../components/common/Card';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Building2 } from 'lucide-react';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await login(data);
      if (user.role === 'admin' || user.role === 'officer' || user.role === 'department_head') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[40vh] bg-brand-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-brand-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/30 ring-4 ring-white">
            <span className="text-white font-black text-3xl tracking-tighter">P<span className="text-teal-200">AI</span></span>
          </div>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-6 text-center text-4xl font-black text-gray-900 tracking-tight"
        >
          Welcome to Pragati
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-2 text-center text-gray-500 font-medium"
        >
          Sign in to access the unified civic platform
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <Card className="shadow-2xl shadow-brand-900/10 border-0 bg-white/80 backdrop-blur-xl">
          <CardContent className="p-8 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  label="Email address"
                  type="email"
                  placeholder="Enter your registered email"
                  {...register("email", { required: "Email is required" })}
                  error={errors.email?.message}
                  className="bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  error={errors.password?.message}
                  className="bg-gray-50/50 focus:bg-white"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded cursor-pointer" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-brand-600 hover:text-brand-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full text-lg shadow-xl shadow-brand-200/50" isLoading={loading}>
                Sign in securely
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-medium">Or join the platform</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <Link to="/register/citizen" className="flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  Citizen
                </Link>
                <Link to="/register/officer" className="flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  Officer
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-brand-500" />
              <p className="text-xs font-medium text-gray-500">
                Hint: Use <strong className="text-gray-900 bg-gray-100 px-1 py-0.5 rounded">admin@gov.in</strong> to login as an officer
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

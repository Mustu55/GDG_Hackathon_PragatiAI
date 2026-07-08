import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { Mic, Camera, Send, FileWarning, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../utils/api';

export default function ReportComplaintPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.location); // use location as title default
      formData.append('description', data.description);
      formData.append('location', data.location);
      formData.append('category', data.category);
      if (selectedFile) {
        formData.append('media', selectedFile);
      }

      await api.post('/api/complaints', formData);
      toast.success("Issue reported successfully! AI is analyzing it.");
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info("Recording started. Speak your issue in any language.");
    } else {
      toast.success("Recording saved. AI is transcribing...");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      toast.info(`File selected: ${file.name}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Report an Issue</h1>
        <p className="text-lg text-gray-500 mt-1">Provide details about the civic issue. You can use voice, text, or upload photos.</p>
      </motion.div>

      <Card animate delay={0.1} className="shadow-lg shadow-gray-200/50 border-gray-200">
        <CardHeader className="bg-gray-50/50 border-b-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-100 text-brand-600 rounded-lg">
              <FileWarning className="w-5 h-5" />
            </div>
            <CardTitle className="text-xl">Issue Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Select
                  label="Issue Category"
                  options={[
                    { value: '', label: 'Select a category...' },
                    { value: 'water', label: 'Water & Sanitation' },
                    { value: 'road', label: 'Roads & Infrastructure' },
                    { value: 'electricity', label: 'Electricity & Power' },
                    { value: 'health', label: 'Public Health' },
                    { value: 'other', label: 'Other' },
                  ]}
                  {...register("category", { required: "Category is required" })}
                  error={errors.category?.message}
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Input
                  label="Location / Ward / Address"
                  placeholder="e.g., Ward 7, Main Street"
                  {...register("location", { required: "Location is required" })}
                  error={errors.location?.message}
                />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
              <div className="relative group">
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-brand-500 focus:border-brand-500 min-h-[140px] text-gray-700 bg-gray-50/50 hover:bg-white transition-colors resize-y"
                  placeholder="Describe the issue in detail. You can type or use the voice button below..."
                  {...register("description", { required: "Description is required" })}
                ></textarea>
                <div className="absolute bottom-3 right-3 flex items-center gap-3">
                  <AnimatePresence>
                    {isRecording && (
                      <motion.span 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-md"
                      >
                        Recording...
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`p-3 rounded-xl transition-all duration-300 shadow-sm ${
                      isRecording 
                        ? 'bg-red-500 text-white shadow-red-200 animate-pulse' 
                        : 'bg-white text-gray-500 hover:text-brand-600 hover:bg-brand-50 border border-gray-200'
                    }`}
                    title="Use Voice Input"
                  >
                    <Mic className={`w-5 h-5 ${isRecording ? '' : 'group-focus-within:text-brand-600'}`} />
                  </button>
                </div>
              </div>
              {errors.description && (
                <p className="mt-2 text-sm font-medium text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description.message}
                </p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Photo Evidence (Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-xl hover:border-brand-400 hover:bg-brand-50/30 transition-all cursor-pointer bg-gray-50/50 group">
                <div className="space-y-2 text-center">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                    {selectedFile ? <CheckCircle className="h-7 w-7 text-green-500" /> : <Camera className="h-7 w-7 text-gray-400 group-hover:text-brand-500 transition-colors" />}
                  </div>
                  <div className="flex text-sm text-gray-600 justify-center mt-4">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-brand-600 hover:text-brand-700 focus-within:outline-none">
                      <span>{selectedFile ? selectedFile.name : 'Click to upload'}</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                    </label>
                    {!selectedFile && <p className="pl-1">or drag and drop</p>}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="pt-6 flex justify-end border-t border-gray-100"
            >
              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-brand-200/50 group" isLoading={isLoading}>
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Submit Report to AI
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

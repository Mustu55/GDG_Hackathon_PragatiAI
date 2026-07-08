import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateProfile({ name, department });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">Manage your personal information and credentials.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-3xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email Address" defaultValue={user?.email || ''} disabled />
            <Input label="Role" defaultValue={user?.role || 'Citizen'} disabled className="capitalize" />
            {user?.role === 'officer' || user?.role === 'admin' ? (
              <Input label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
            ) : null}
          </div>

          <div className="pt-4 flex justify-end">
            <Button variant="primary" onClick={handleUpdate} disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

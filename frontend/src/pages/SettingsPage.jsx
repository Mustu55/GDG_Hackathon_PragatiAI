import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-500">Configure AI thresholds and platform preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Prioritization Engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
             <div>
               <h4 className="font-medium text-gray-900">Auto-merge Confidence Threshold</h4>
               <p className="text-sm text-gray-500">Minimum AI confidence required to automatically merge identical complaints.</p>
             </div>
             <div className="w-24">
               <Input defaultValue="85%" />
             </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
             <div>
               <h4 className="font-medium text-gray-900">Critical Infrastructure Radius</h4>
               <p className="text-sm text-gray-500">Distance in meters to check for schools/hospitals around an issue.</p>
             </div>
             <div className="w-24">
               <Input defaultValue="500m" />
             </div>
          </div>
          <div className="pt-4 flex justify-end">
            <Button variant="primary">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

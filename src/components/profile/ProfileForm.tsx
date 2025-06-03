
import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface ProfileFormProps {
  profile: {
    full_name: string;
    email: string;
  };
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onProfileChange: (field: string, value: string) => void;
}

const ProfileForm = memo(({ profile, isLoading, onSubmit, onProfileChange }: ProfileFormProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <User className="h-5 w-5" />
        Profile Information
      </CardTitle>
      <CardDescription>
        Update your personal information and account settings.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            value={profile.full_name}
            onChange={(e) => onProfileChange('full_name', e.target.value)}
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => onProfileChange('email', e.target.value)}
            placeholder="your@email.com"
            disabled
          />
          <p className="text-sm text-gray-500">
            Email cannot be changed here. Use account settings to update email.
          </p>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </CardContent>
  </Card>
));

ProfileForm.displayName = 'ProfileForm';

export default ProfileForm;

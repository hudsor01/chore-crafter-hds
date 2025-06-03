
import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Mail } from 'lucide-react';

interface PreferencesCardProps {
  preferences: {
    theme_preference: string;
    email_notifications: boolean;
  };
  isLoading: boolean;
  onUpdate: () => void;
  onPreferenceChange: (field: string, value: any) => void;
}

const PreferencesCard = memo(({ preferences, isLoading, onUpdate, onPreferenceChange }: PreferencesCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Settings className="h-5 w-5" />
        Preferences
      </CardTitle>
      <CardDescription>
        Customize your app experience.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Theme</Label>
          <p className="text-sm text-gray-500">Choose your preferred theme</p>
        </div>
        <Select
          value={preferences.theme_preference}
          onValueChange={(value) => onPreferenceChange('theme_preference', value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Notifications
          </Label>
          <p className="text-sm text-gray-500">Receive email reminders and updates</p>
        </div>
        <Switch
          checked={preferences.email_notifications}
          onCheckedChange={(checked) => onPreferenceChange('email_notifications', checked)}
        />
      </div>

      <Button onClick={onUpdate} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Preferences"}
      </Button>
    </CardContent>
  </Card>
));

PreferencesCard.displayName = 'PreferencesCard';

export default PreferencesCard;


import React, { useState, useEffect, useCallback, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ProfileForm from './profile/ProfileForm';
import PreferencesCard from './profile/PreferencesCard';

interface UserProfileData {
  full_name: string;
  email: string;
  theme_preference: string;
  email_notifications: boolean;
}

const UserProfile = memo(() => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfileData>({
    full_name: '',
    email: '',
    theme_preference: 'light',
    email_notifications: true,
  });

  const fetchProfile = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          email: data.email || user?.email || '',
          theme_preference: data.theme_preference || 'light',
          email_notifications: data.email_notifications ?? true,
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const handleProfileChange = useCallback((field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePreferenceChange = useCallback((field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateProfile = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
        });

      if (error) throw error;

      // Update auth user metadata if full name changed
      if (profile.full_name !== user?.user_metadata?.full_name) {
        await supabase.auth.updateUser({
          data: { full_name: profile.full_name }
        });
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [profile, user, toast]);

  const updatePreferences = useCallback(async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
        });

      if (error) throw error;

      toast({
        title: "Preferences updated",
        description: "Your preferences have been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [profile, user, toast]);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <ProfileForm
        profile={profile}
        isLoading={isLoading}
        onSubmit={updateProfile}
        onProfileChange={handleProfileChange}
      />

      <PreferencesCard
        preferences={profile}
        isLoading={isLoading}
        onUpdate={updatePreferences}
        onPreferenceChange={handlePreferenceChange}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Account Actions</CardTitle>
          <CardDescription>
            Manage your account settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignOut} variant="destructive">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});

UserProfile.displayName = 'UserProfile';

export default UserProfile;

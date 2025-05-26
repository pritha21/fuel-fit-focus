
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  email: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  activity_level: string;
  goal: string;
  daily_calorie_target: number;
}

export const UserProfileForm: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    age: null,
    height: null,
    weight: null,
    activity_level: 'moderately_active',
    goal: 'maintain_weight',
    daily_calorie_target: 2000
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data',
          variant: 'destructive'
        });
        return;
      }

      if (data) {
        setProfile({
          name: data.name || '',
          email: data.email || user.email || '',
          age: data.age,
          height: data.height,
          weight: data.weight,
          activity_level: data.activity_level || 'moderately_active',
          goal: data.goal || 'maintain_weight',
          daily_calorie_target: data.daily_calorie_target || 2000
        });
      } else {
        // No profile exists, set defaults
        setProfile(prev => ({
          ...prev,
          email: user.email || '',
          name: user.user_metadata?.name || user.email?.split('@')[0] || ''
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          user_id: user.id,
          name: profile.name,
          email: profile.email,
          age: profile.age,
          height: profile.height,
          weight: profile.weight,
          activity_level: profile.activity_level,
          goal: profile.goal,
          daily_calorie_target: profile.daily_calorie_target,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to save profile',
          variant: 'destructive'
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Profile saved successfully!'
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information to get personalized nutrition recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={profile.age || ''}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  age: e.target.value ? parseInt(e.target.value) : null 
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                min="1"
                max="300"
                value={profile.height || ''}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  height: e.target.value ? parseFloat(e.target.value) : null 
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                min="1"
                max="500"
                step="0.1"
                value={profile.weight || ''}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  weight: e.target.value ? parseFloat(e.target.value) : null 
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daily_calorie_target">Daily Calorie Target</Label>
              <Input
                id="daily_calorie_target"
                type="number"
                min="800"
                max="5000"
                value={profile.daily_calorie_target}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  daily_calorie_target: parseInt(e.target.value) || 2000 
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity_level">Activity Level</Label>
              <Select
                value={profile.activity_level}
                onValueChange={(value) => setProfile(prev => ({ ...prev, activity_level: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                  <SelectItem value="lightly_active">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="very_active">Very Active (hard exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="extremely_active">Extremely Active (very hard exercise, physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Select
                value={profile.goal}
                onValueChange={(value) => setProfile(prev => ({ ...prev, goal: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose_weight">Lose Weight</SelectItem>
                  <SelectItem value="maintain_weight">Maintain Weight</SelectItem>
                  <SelectItem value="gain_weight">Gain Weight</SelectItem>
                  <SelectItem value="build_muscle">Build Muscle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

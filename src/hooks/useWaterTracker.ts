
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { fetchWaterIntake, updateWaterIntakeInDB } from '@/services/waterService';

export const useWaterTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [waterIntake, setWaterIntake] = useState(0);

  useEffect(() => {
    if (user) {
      fetchWaterIntake(user.id).then(setWaterIntake);
    }
  }, [user]);

  const updateWaterIntake = async (amount: number) => {
    if (!user) return;

    const newAmount = waterIntake + amount;
    const success = await updateWaterIntakeInDB(user.id, newAmount);

    if (success) {
      setWaterIntake(newAmount);
      toast({
        title: "Success",
        description: `Added ${amount}ml of water`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update water intake",
        variant: "destructive"
      });
    }
  };

  return {
    waterIntake,
    updateWaterIntake
  };
};

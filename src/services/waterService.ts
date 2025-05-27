
import { supabase } from '@/integrations/supabase/client';
import { getTodayDate } from '@/utils/dateUtils';

export const fetchWaterIntake = async (userId: string): Promise<number> => {
  const today = getTodayDate();
  const { data, error } = await supabase
    .from('daily_water_intake')
    .select('water_consumed_ml')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching water intake:', error);
    return 0;
  }

  return data?.water_consumed_ml || 0;
};

export const updateWaterIntakeInDB = async (userId: string, newAmount: number): Promise<boolean> => {
  const today = getTodayDate();

  try {
    // First try to update existing record
    const { data: existingRecord, error: fetchError } = await supabase
      .from('daily_water_intake')
      .select('id')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingRecord) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('daily_water_intake')
        .update({ water_consumed_ml: newAmount })
        .eq('user_id', userId)
        .eq('date', today);

      if (updateError) throw updateError;
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from('daily_water_intake')
        .insert({
          user_id: userId,
          date: today,
          water_consumed_ml: newAmount
        });

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error('Error updating water intake:', error);
    return false;
  }
};

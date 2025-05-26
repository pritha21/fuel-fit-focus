export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      daily_summary: {
        Row: {
          calorie_goal: number | null
          created_at: string | null
          date: string
          protein_goal: number | null
          summary_id: string
          total_calories: number | null
          total_carbs: number | null
          total_fat: number | null
          total_fiber: number | null
          total_protein: number | null
          updated_at: string | null
          user_id: string
          water_intake_ml: number | null
        }
        Insert: {
          calorie_goal?: number | null
          created_at?: string | null
          date: string
          protein_goal?: number | null
          summary_id?: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_fiber?: number | null
          total_protein?: number | null
          updated_at?: string | null
          user_id: string
          water_intake_ml?: number | null
        }
        Update: {
          calorie_goal?: number | null
          created_at?: string | null
          date?: string
          protein_goal?: number | null
          summary_id?: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_fiber?: number | null
          total_protein?: number | null
          updated_at?: string | null
          user_id?: string
          water_intake_ml?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_summary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      food_items: {
        Row: {
          calories_per_100g: number
          carbs_per_100g: number | null
          category: string | null
          created_at: string | null
          fat_per_100g: number | null
          fiber_per_100g: number | null
          food_id: string
          name: string
          protein_per_100g: number | null
          sodium_per_100g: number | null
          sugar_per_100g: number | null
        }
        Insert: {
          calories_per_100g: number
          carbs_per_100g?: number | null
          category?: string | null
          created_at?: string | null
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          food_id?: string
          name: string
          protein_per_100g?: number | null
          sodium_per_100g?: number | null
          sugar_per_100g?: number | null
        }
        Update: {
          calories_per_100g?: number
          carbs_per_100g?: number | null
          category?: string | null
          created_at?: string | null
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          food_id?: string
          name?: string
          protein_per_100g?: number | null
          sodium_per_100g?: number | null
          sugar_per_100g?: number | null
        }
        Relationships: []
      }
      meal_items: {
        Row: {
          calories: number
          carbs: number | null
          created_at: string | null
          fat: number | null
          food_id: string
          meal_id: string
          meal_item_id: string
          protein: number | null
          quantity_grams: number
        }
        Insert: {
          calories: number
          carbs?: number | null
          created_at?: string | null
          fat?: number | null
          food_id: string
          meal_id: string
          meal_item_id?: string
          protein?: number | null
          quantity_grams: number
        }
        Update: {
          calories?: number
          carbs?: number | null
          created_at?: string | null
          fat?: number | null
          food_id?: string
          meal_id?: string
          meal_item_id?: string
          protein?: number | null
          quantity_grams?: number
        }
        Relationships: [
          {
            foreignKeyName: "meal_items_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "food_items"
            referencedColumns: ["food_id"]
          },
          {
            foreignKeyName: "meal_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["meal_id"]
          },
        ]
      }
      meals: {
        Row: {
          created_at: string | null
          date: string
          meal_id: string
          meal_type: string
          total_calories: number | null
          total_carbs: number | null
          total_fat: number | null
          total_protein: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          meal_id?: string
          meal_type: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          meal_id?: string
          meal_type?: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_feedback: {
        Row: {
          feature_used: string | null
          feedback: string
          feedback_id: string
          page_url: string | null
          rating: number | null
          status: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          feature_used?: string | null
          feedback: string
          feedback_id?: string
          page_url?: string | null
          rating?: number | null
          status?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          feature_used?: string | null
          feedback?: string
          feedback_id?: string
          page_url?: string | null
          rating?: number | null
          status?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_goals: {
        Row: {
          calorie_target: number
          carb_target: number | null
          created_at: string | null
          fat_target: number | null
          goal_id: string
          protein_target: number | null
          updated_at: string | null
          user_id: string
          water_target_ml: number | null
        }
        Insert: {
          calorie_target?: number
          carb_target?: number | null
          created_at?: string | null
          fat_target?: number | null
          goal_id?: string
          protein_target?: number | null
          updated_at?: string | null
          user_id: string
          water_target_ml?: number | null
        }
        Update: {
          calorie_target?: number
          carb_target?: number | null
          created_at?: string | null
          fat_target?: number | null
          goal_id?: string
          protein_target?: number | null
          updated_at?: string | null
          user_id?: string
          water_target_ml?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          daily_calorie_limit: number | null
          email_address: string | null
          id: string
          notification_email: boolean | null
          notification_time: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          daily_calorie_limit?: number | null
          email_address?: string | null
          id?: string
          notification_email?: boolean | null
          notification_time?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          daily_calorie_limit?: number | null
          email_address?: string | null
          id?: string
          notification_email?: boolean | null
          notification_time?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          activity_level: string | null
          age: number | null
          created_at: string | null
          daily_calorie_target: number | null
          email: string
          goal: string | null
          height: number | null
          name: string
          updated_at: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          created_at?: string | null
          daily_calorie_target?: number | null
          email: string
          goal?: string | null
          height?: number | null
          name: string
          updated_at?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          created_at?: string | null
          daily_calorie_target?: number | null
          email?: string
          goal?: string | null
          height?: number | null
          name?: string
          updated_at?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_daily_summary: {
        Args: { user_uuid: string; summary_date: string }
        Returns: {
          total_calories: number
          total_protein: number
          total_carbs: number
          total_fat: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

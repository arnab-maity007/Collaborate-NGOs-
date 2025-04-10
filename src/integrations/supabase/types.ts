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
      donations: {
        Row: {
          amount: number | null
          category: string
          created_at: string
          delivery_address: string | null
          donation_mode: string | null
          donation_type: string
          id: string
          impact_report: string | null
          ngo_id: string | null
          other_details: string | null
          status: string
          subcategory: string | null
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          category: string
          created_at?: string
          delivery_address?: string | null
          donation_mode?: string | null
          donation_type: string
          id?: string
          impact_report?: string | null
          ngo_id?: string | null
          other_details?: string | null
          status?: string
          subcategory?: string | null
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          category?: string
          created_at?: string
          delivery_address?: string | null
          donation_mode?: string | null
          donation_type?: string
          id?: string
          impact_report?: string | null
          ngo_id?: string | null
          other_details?: string | null
          status?: string
          subcategory?: string | null
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ngos: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          impact_reports: number | null
          is_verified: boolean | null
          name: string
          wallet_address: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          impact_reports?: number | null
          is_verified?: boolean | null
          name: string
          wallet_address: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          impact_reports?: number | null
          is_verified?: boolean | null
          name?: string
          wallet_address?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          background_preference: string | null
          bio: string | null
          created_at: string | null
          custom_background_url: string | null
          date_of_birth: string
          first_name: string
          id: string
          last_name: string
          updated_at: string | null
          username: string
          youtube_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          background_preference?: string | null
          bio?: string | null
          created_at?: string | null
          custom_background_url?: string | null
          date_of_birth: string
          first_name: string
          id: string
          last_name: string
          updated_at?: string | null
          username: string
          youtube_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          background_preference?: string | null
          bio?: string | null
          created_at?: string | null
          custom_background_url?: string | null
          date_of_birth?: string
          first_name?: string
          id?: string
          last_name?: string
          updated_at?: string | null
          username?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

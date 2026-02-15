export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      payments: {
        Row: {
          amount: number
          cinetpay_data: Json | null
          created_at: string
          currency: string
          customer_email: string | null
          customer_name: string
          customer_phone: string
          description: string | null
          id: string
          payment_method: string | null
          status: string
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          cinetpay_data?: Json | null
          created_at?: string
          currency?: string
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          description?: string | null
          id?: string
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          cinetpay_data?: Json | null
          created_at?: string
          currency?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          description?: string | null
          id?: string
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      shop_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      shop_order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          quantity?: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "shop_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shop_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shop_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "shop_products"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_orders: {
        Row: {
          created_at: string
          currency: string
          customer_email: string | null
          customer_name: string
          customer_phone: string
          id: string
          notes: string | null
          order_number: string
          payment_id: string | null
          shipping_address: string | null
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          id?: string
          notes?: string | null
          order_number: string
          payment_id?: string | null
          shipping_address?: string | null
          status?: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          id?: string
          notes?: string | null
          order_number?: string
          payment_id?: string | null
          shipping_address?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_orders_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_products: {
        Row: {
          category_id: string | null
          compare_at_price: number | null
          created_at: string
          currency: string
          description: string | null
          id: string
          image_url: string | null
          images: string[] | null
          is_active: boolean
          name: string
          price: number
          product_type: string
          slug: string
          sort_order: number | null
          stock_quantity: number | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          compare_at_price?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_active?: boolean
          name: string
          price: number
          product_type?: string
          slug: string
          sort_order?: number | null
          stock_quantity?: number | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          compare_at_price?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_active?: boolean
          name?: string
          price?: number
          product_type?: string
          slug?: string
          sort_order?: number | null
          stock_quantity?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "shop_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          category: string
          created_at: string
          field_type: string
          id: string
          key: string
          label: string
          sort_order: number | null
          updated_at: string
          value: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          field_type?: string
          id?: string
          key: string
          label: string
          sort_order?: number | null
          updated_at?: string
          value?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          field_type?: string
          id?: string
          key?: string
          label?: string
          sort_order?: number | null
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          content: string
          created_at: string
          id: string
          is_approved: boolean
          name: string
          rating: number
          role: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_approved?: boolean
          name: string
          rating?: number
          role?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          name?: string
          rating?: number
          role?: string | null
        }
        Relationships: []
      }
      tournament_matches: {
        Row: {
          created_at: string
          id: string
          match_date: string
          match_number: number
          match_time: string
          played: boolean
          round: string
          score1: number | null
          score2: number | null
          team1_id: string | null
          team2_id: string | null
          updated_at: string
          venue: string
          winner_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          match_date: string
          match_number: number
          match_time?: string
          played?: boolean
          round: string
          score1?: number | null
          score2?: number | null
          team1_id?: string | null
          team2_id?: string | null
          updated_at?: string
          venue?: string
          winner_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          match_date?: string
          match_number?: number
          match_time?: string
          played?: boolean
          round?: string
          score1?: number | null
          score2?: number | null
          team1_id?: string | null
          team2_id?: string | null
          updated_at?: string
          venue?: string
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_matches_team1_id_fkey"
            columns: ["team1_id"]
            isOneToOne: false
            referencedRelation: "tournament_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_matches_team2_id_fkey"
            columns: ["team2_id"]
            isOneToOne: false
            referencedRelation: "tournament_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "tournament_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_teams: {
        Row: {
          created_at: string
          group_name: string | null
          id: string
          logo_url: string | null
          name: string
          seed_number: number
        }
        Insert: {
          created_at?: string
          group_name?: string | null
          id?: string
          logo_url?: string | null
          name: string
          seed_number: number
        }
        Update: {
          created_at?: string
          group_name?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          seed_number?: number
        }
        Relationships: []
      }
      tv_broadcasts: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_live: boolean
          scheduled_at: string | null
          stream_url: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_live?: boolean
          scheduled_at?: string | null
          stream_url?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_live?: boolean
          scheduled_at?: string | null
          stream_url?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tv_schedule: {
        Row: {
          broadcast_id: string | null
          created_at: string
          description: string | null
          end_time: string
          id: string
          start_time: string
          title: string
        }
        Insert: {
          broadcast_id?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          start_time: string
          title: string
        }
        Update: {
          broadcast_id?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          start_time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tv_schedule_broadcast_id_fkey"
            columns: ["broadcast_id"]
            isOneToOne: false
            referencedRelation: "tv_broadcasts"
            referencedColumns: ["id"]
          },
        ]
      }
      tv_videos: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          duration: string | null
          id: string
          published_at: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string
          views_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          published_at?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url: string
          views_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          published_at?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string
          views_count?: number | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

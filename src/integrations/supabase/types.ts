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
      application_activities: {
        Row: {
          activity_type: string
          application_id: string
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
          new_status: Database["public"]["Enums"]["application_status"] | null
          old_status: Database["public"]["Enums"]["application_status"] | null
          performed_by: string | null
        }
        Insert: {
          activity_type: string
          application_id: string
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
          new_status?: Database["public"]["Enums"]["application_status"] | null
          old_status?: Database["public"]["Enums"]["application_status"] | null
          performed_by?: string | null
        }
        Update: {
          activity_type?: string
          application_id?: string
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
          new_status?: Database["public"]["Enums"]["application_status"] | null
          old_status?: Database["public"]["Enums"]["application_status"] | null
          performed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_activities_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_activities_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          amount: number
          application_id: string
          collected_by: string | null
          collection_date: string
          created_at: string | null
          customer_id: string
          emi_id: string | null
          id: string
          notes: string | null
          payment_mode: string
          reference_number: string | null
        }
        Insert: {
          amount: number
          application_id: string
          collected_by?: string | null
          collection_date: string
          created_at?: string | null
          customer_id: string
          emi_id?: string | null
          id?: string
          notes?: string | null
          payment_mode: string
          reference_number?: string | null
        }
        Update: {
          amount?: number
          application_id?: string
          collected_by?: string | null
          collection_date?: string
          created_at?: string | null
          customer_id?: string
          emi_id?: string | null
          id?: string
          notes?: string | null
          payment_mode?: string
          reference_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collections_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collections_collected_by_fkey"
            columns: ["collected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collections_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collections_emi_id_fkey"
            columns: ["emi_id"]
            isOneToOne: false
            referencedRelation: "emi_schedule"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          aadhaar_number: string | null
          address: Json | null
          business_name: string | null
          business_type: string | null
          business_vintage: number | null
          cibil_score: number | null
          created_at: string | null
          email: string | null
          id: string
          monthly_income: number | null
          name: string
          pan_number: string | null
          phone: string
          updated_at: string | null
        }
        Insert: {
          aadhaar_number?: string | null
          address?: Json | null
          business_name?: string | null
          business_type?: string | null
          business_vintage?: number | null
          cibil_score?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          monthly_income?: number | null
          name: string
          pan_number?: string | null
          phone: string
          updated_at?: string | null
        }
        Update: {
          aadhaar_number?: string | null
          address?: Json | null
          business_name?: string | null
          business_type?: string | null
          business_vintage?: number | null
          cibil_score?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          monthly_income?: number | null
          name?: string
          pan_number?: string | null
          phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      disbursements: {
        Row: {
          amount: number
          application_id: string
          bank_account_number: string
          beneficiary_name: string
          created_at: string | null
          customer_id: string
          disbursed_at: string | null
          disbursed_by: string | null
          failure_reason: string | null
          id: string
          ifsc_code: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          application_id: string
          bank_account_number: string
          beneficiary_name: string
          created_at?: string | null
          customer_id: string
          disbursed_at?: string | null
          disbursed_by?: string | null
          failure_reason?: string | null
          id?: string
          ifsc_code: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          application_id?: string
          bank_account_number?: string
          beneficiary_name?: string
          created_at?: string | null
          customer_id?: string
          disbursed_at?: string | null
          disbursed_by?: string | null
          failure_reason?: string | null
          id?: string
          ifsc_code?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disbursements_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disbursements_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disbursements_disbursed_by_fkey"
            columns: ["disbursed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          application_id: string
          created_at: string | null
          customer_id: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_verified: boolean | null
          mime_type: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          application_id: string
          created_at?: string | null
          customer_id: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_verified?: boolean | null
          mime_type?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string | null
          customer_id?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_verified?: boolean | null
          mime_type?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emi_schedule: {
        Row: {
          application_id: string
          created_at: string | null
          customer_id: string
          due_date: string
          emi_number: number
          id: string
          interest_amount: number
          is_paid: boolean | null
          late_fee: number | null
          outstanding_balance: number
          paid_amount: number | null
          paid_date: string | null
          payment_method: string | null
          principal_amount: number
          total_amount: number
        }
        Insert: {
          application_id: string
          created_at?: string | null
          customer_id: string
          due_date: string
          emi_number: number
          id?: string
          interest_amount: number
          is_paid?: boolean | null
          late_fee?: number | null
          outstanding_balance: number
          paid_amount?: number | null
          paid_date?: string | null
          payment_method?: string | null
          principal_amount: number
          total_amount: number
        }
        Update: {
          application_id?: string
          created_at?: string | null
          customer_id?: string
          due_date?: string
          emi_number?: number
          id?: string
          interest_amount?: number
          is_paid?: boolean | null
          late_fee?: number | null
          outstanding_balance?: number
          paid_amount?: number | null
          paid_date?: string | null
          payment_method?: string | null
          principal_amount?: number
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "emi_schedule_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emi_schedule_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_applications: {
        Row: {
          amount: number
          application_number: string
          approval_conditions: string[] | null
          approved_amount: number | null
          assigned_to: string | null
          created_at: string | null
          customer_id: string
          disbursement_date: string | null
          id: string
          interest_rate: number | null
          kyc_status: Database["public"]["Enums"]["kyc_status"] | null
          maturity_date: string | null
          priority: Database["public"]["Enums"]["priority_level"] | null
          processing_fee: number | null
          purpose: Database["public"]["Enums"]["loan_purpose"]
          rejection_reason: string | null
          risk_score: number | null
          status: Database["public"]["Enums"]["application_status"] | null
          tenure: number
          updated_at: string | null
          vkyc_status: Database["public"]["Enums"]["kyc_status"] | null
        }
        Insert: {
          amount: number
          application_number: string
          approval_conditions?: string[] | null
          approved_amount?: number | null
          assigned_to?: string | null
          created_at?: string | null
          customer_id: string
          disbursement_date?: string | null
          id?: string
          interest_rate?: number | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          maturity_date?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          processing_fee?: number | null
          purpose: Database["public"]["Enums"]["loan_purpose"]
          rejection_reason?: string | null
          risk_score?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          tenure: number
          updated_at?: string | null
          vkyc_status?: Database["public"]["Enums"]["kyc_status"] | null
        }
        Update: {
          amount?: number
          application_number?: string
          approval_conditions?: string[] | null
          approved_amount?: number | null
          assigned_to?: string | null
          created_at?: string | null
          customer_id?: string
          disbursement_date?: string | null
          id?: string
          interest_rate?: number | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          maturity_date?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          processing_fee?: number | null
          purpose?: Database["public"]["Enums"]["loan_purpose"]
          rejection_reason?: string | null
          risk_score?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          tenure?: number
          updated_at?: string | null
          vkyc_status?: Database["public"]["Enums"]["kyc_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_applications_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loan_applications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          reference_id: string | null
          reference_type: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          reference_id?: string | null
          reference_type?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          reference_id?: string | null
          reference_type?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          employee_id: string | null
          full_name: string
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          employee_id?: string | null
          full_name: string
          id: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          employee_id?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      create_emi_schedule: {
        Args: {
          p_application_id: string
          p_customer_id: string
          p_principal: number
          p_rate: number
          p_tenure: number
        }
        Returns: undefined
      }
      generate_application_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
    }
    Enums: {
      application_status:
        | "submitted"
        | "in_review"
        | "approved"
        | "rejected"
        | "disbursed"
        | "closed"
      document_type:
        | "pan"
        | "aadhaar"
        | "bank_statement"
        | "gst_certificate"
        | "business_proof"
        | "address_proof"
      kyc_status: "pending" | "verified" | "failed" | "expired"
      loan_purpose:
        | "working_capital"
        | "inventory_purchase"
        | "equipment_purchase"
        | "shop_expansion"
        | "business_growth"
      payment_status: "pending" | "completed" | "failed" | "overdue"
      priority_level: "low" | "normal" | "high" | "urgent"
      user_role:
        | "admin"
        | "credit_officer"
        | "risk_manager"
        | "collections_officer"
        | "compliance_officer"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
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
    Enums: {
      application_status: [
        "submitted",
        "in_review",
        "approved",
        "rejected",
        "disbursed",
        "closed",
      ],
      document_type: [
        "pan",
        "aadhaar",
        "bank_statement",
        "gst_certificate",
        "business_proof",
        "address_proof",
      ],
      kyc_status: ["pending", "verified", "failed", "expired"],
      loan_purpose: [
        "working_capital",
        "inventory_purchase",
        "equipment_purchase",
        "shop_expansion",
        "business_growth",
      ],
      payment_status: ["pending", "completed", "failed", "overdue"],
      priority_level: ["low", "normal", "high", "urgent"],
      user_role: [
        "admin",
        "credit_officer",
        "risk_manager",
        "collections_officer",
        "compliance_officer",
      ],
    },
  },
} as const

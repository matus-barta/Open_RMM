export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      computers: {
        Row: {
          created_at: string
          is_added: boolean
          is_allowed: boolean
          one_time_key: string | null
          org_unit_uuid: string
          tenant_uuid: string
          uuid: string
        }
        Insert: {
          created_at?: string
          is_added?: boolean
          is_allowed?: boolean
          one_time_key?: string | null
          org_unit_uuid?: string
          tenant_uuid?: string
          uuid?: string
        }
        Update: {
          created_at?: string
          is_added?: boolean
          is_allowed?: boolean
          one_time_key?: string | null
          org_unit_uuid?: string
          tenant_uuid?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_computer_org_unit_uuid_fkey"
            columns: ["org_unit_uuid"]
            isOneToOne: false
            referencedRelation: "org_units"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "public_computer_tenant_uuid_fkey"
            columns: ["tenant_uuid"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["uuid"]
          },
        ]
      }
      org_units: {
        Row: {
          created_at: string
          name: string
          tenant_uuid: string
          uuid: string
        }
        Insert: {
          created_at?: string
          name?: string
          tenant_uuid?: string
          uuid?: string
        }
        Update: {
          created_at?: string
          name?: string
          tenant_uuid?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_org_unit_tenant_uuid_fkey"
            columns: ["tenant_uuid"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["uuid"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          photo: string | null
          tenant_id: string | null
          uuid: string
        }
        Insert: {
          created_at?: string
          full_name: string
          photo?: string | null
          tenant_id?: string | null
          uuid: string
        }
        Update: {
          created_at?: string
          full_name?: string
          photo?: string | null
          tenant_id?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "public_profiles_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_info: {
        Row: {
          computer_name: string | null
          computer_uuid: string
          created_at: string
          kernel_version: string | null
          last_bootup_time: string | null
          machine_type: Database["public"]["Enums"]["machine_type"]
          os_name: string | null
          os_version: string | null
          pending_reboot: boolean | null
        }
        Insert: {
          computer_name?: string | null
          computer_uuid?: string
          created_at?: string
          kernel_version?: string | null
          last_bootup_time?: string | null
          machine_type?: Database["public"]["Enums"]["machine_type"]
          os_name?: string | null
          os_version?: string | null
          pending_reboot?: boolean | null
        }
        Update: {
          computer_name?: string | null
          computer_uuid?: string
          created_at?: string
          kernel_version?: string | null
          last_bootup_time?: string | null
          machine_type?: Database["public"]["Enums"]["machine_type"]
          os_name?: string | null
          os_version?: string | null
          pending_reboot?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_system_info_computer_uuid_fkey"
            columns: ["computer_uuid"]
            isOneToOne: true
            referencedRelation: "computers"
            referencedColumns: ["uuid"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          name: string
          uuid: string
        }
        Insert: {
          created_at?: string
          name: string
          uuid?: string
        }
        Update: {
          created_at?: string
          name?: string
          uuid?: string
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
      machine_type: "LXC" | "VM" | "Physical" | "Unknown"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never


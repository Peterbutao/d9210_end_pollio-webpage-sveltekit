export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          country: string | null;
          created_at: string;
          email: string;
          id: string;
          name: string | null;
        };
        Insert: {
          country?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          name?: string | null;
        };
        Update: {
          country?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          club_name: string | null;
          country: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          club_name?: string | null;
          country?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          club_name?: string | null;
          country?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

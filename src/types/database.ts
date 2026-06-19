export type AccountType = "worker" | "client";
export type NotifType = "application" | "job" | "interview" | "system";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          phone: string;
          account_type: AccountType;
          role: string | null;
          location: string | null;
          profile_image: string | null;
          coins_left: number;
          verified: boolean;
          verified_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          phone: string;
          account_type?: AccountType;
          role?: string | null;
          location?: string | null;
          profile_image?: string | null;
          coins_left?: number;
          verified?: boolean;
          verified_date?: string | null;
        };
        Update: {
          name?: string;
          account_type?: AccountType;
          role?: string | null;
          location?: string | null;
          profile_image?: string | null;
          coins_left?: number;
          verified?: boolean;
        };
      };

      listings: {
        Row: {
          id: string;
          worker_id: string;
          title: string;
          company: string;
          category: string;
          description: string;
          salary: string;
          salary_value: number;
          location: string;
          logo: string | null;
          chips: string[];
          rating: number | null;
          review_count: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          worker_id: string;
          title: string;
          company: string;
          category: string;
          description: string;
          salary: string;
          salary_value: number;
          location: string;
          logo?: string | null;
          chips?: string[];
          rating?: number | null;
          review_count?: number;
          is_active?: boolean;
        };
        Update: {
          title?: string;
          category?: string;
          description?: string;
          salary?: string;
          salary_value?: number;
          location?: string;
          logo?: string | null;
          chips?: string[];
          is_active?: boolean;
        };
      };

      saved_jobs: {
        Row: {
          id: string;
          user_id: string;
          listing_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          listing_id: string;
        };
        Update: never;
      };

      conversations: {
        Row: {
          id: string;
          client_id: string;
          worker_id: string;
          listing_id: string | null;
          last_message: string | null;
          last_message_at: string | null;
          created_at: string;
        };
        Insert: {
          client_id: string;
          worker_id: string;
          listing_id?: string | null;
          last_message?: string | null;
          last_message_at?: string | null;
        };
        Update: {
          last_message?: string | null;
          last_message_at?: string | null;
        };
      };

      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          text: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          conversation_id: string;
          sender_id: string;
          text: string;
          read?: boolean;
        };
        Update: {
          read?: boolean;
        };
      };

      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: NotifType;
          title: string;
          message: string;
          read: boolean;
          action_href: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: NotifType;
          title: string;
          message: string;
          read?: boolean;
          action_href?: string | null;
        };
        Update: {
          read?: boolean;
        };
      };

      user_preferences: {
        Row: {
          user_id: string;
          categories: string[];
          location_visible: boolean;
          phone_visible: boolean;
          notif_job_matches: boolean;
          notif_application_updates: boolean;
          notif_profile_tips: boolean;
          notif_reviews: boolean;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          categories?: string[];
          location_visible?: boolean;
          phone_visible?: boolean;
          notif_job_matches?: boolean;
          notif_application_updates?: boolean;
          notif_profile_tips?: boolean;
          notif_reviews?: boolean;
        };
        Update: {
          categories?: string[];
          location_visible?: boolean;
          phone_visible?: boolean;
          notif_job_matches?: boolean;
          notif_application_updates?: boolean;
          notif_profile_tips?: boolean;
          notif_reviews?: boolean;
        };
      };
    };
  };
};

// Convenience row types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Listing = Database["public"]["Tables"]["listings"]["Row"];
export type SavedJob = Database["public"]["Tables"]["saved_jobs"]["Row"];
export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type UserPreferences = Database["public"]["Tables"]["user_preferences"]["Row"];

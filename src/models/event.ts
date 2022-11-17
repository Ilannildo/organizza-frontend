export interface IEvent {
  id: string;
  title: string;
  slug: string;
  created_by_user_id: string;
  event_type_id: string;
  credit_hour?: number;
  main_subject: string;
  short_description: string;
  summary: string;
  venue_type: "presential" | "online";
  is_private: boolean;
  start_date: Date;
  start_time: Date;
  end_date: Date;
  end_time: Date;
  cover_url: string;
  logo_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  event_responsible_id: string;
  status: "published" | "started" | "pending";
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}


export interface Donation {
  id: string;
  user_id: string;
  created_at: string;
  amount: number | null;
  category: string;
  subcategory: string | null;
  donation_type: string;
  donation_mode: string | null;
  status: "pending" | "processing" | "completed";
  transaction_id: string | null;
  ngo_id: string | null;
  other_details: string | null;
  delivery_address: string | null;
  impact_report: string | null;
  ngos?: NGO | null | { error: boolean }; // Added error type to handle error state
}

export interface NGO {
  id: string;
  name: string;
  wallet_address: string;
  created_at: string;
  category: string | null;
  description: string | null;
  impact_reports: number | null;
  is_verified: boolean | null;
}

export interface UserMetadata {
  name?: string;
  age?: string;
  profession?: string;
}

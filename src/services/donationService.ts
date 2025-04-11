
import { supabase } from "@/integrations/supabase/client";
import { Donation, NGO } from "@/types/supabase";
import { v4 as uuidv4 } from 'uuid';

// Get user's donations
export const getUserDonations = async () => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*, ngos(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user donations:', error);
    return [];
  }
};

// Submit a donation
export const submitDonation = async (donationData: {
  amount?: number;
  category: string;
  subcategory?: string;
  donation_type: string;
  donation_mode?: string;
  other_details?: string;
  delivery_address?: string;
  ngo_id?: string;
}) => {
  try {
    // Generate a unique transaction ID for this donation
    const transaction_id = `tx_${uuidv4().replace(/-/g, '')}`;
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('donations')
      .insert({
        ...donationData,
        transaction_id,
        status: 'pending',
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, donation: data };
  } catch (error) {
    console.error('Error submitting donation:', error);
    return { success: false, error };
  }
};

// Track a donation by transaction ID
export const getDonationByTransactionId = async (transactionId: string) => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*, ngos(*)')
      .eq('transaction_id', transactionId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error tracking donation:', error);
    return null;
  }
};

// Get NGOs
export const getNGOs = async () => {
  try {
    const { data, error } = await supabase
      .from('ngos')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    return [];
  }
};

// Create or update NGO (for admin use)
export const upsertNGO = async (ngo: {
  id?: string;
  name: string;
  wallet_address: string;
  category?: string;
  description?: string;
  impact_reports?: number;
  is_verified?: boolean;
}) => {
  try {
    const { data, error } = await supabase
      .from('ngos')
      .upsert(ngo)
      .select()
      .single();

    if (error) throw error;
    return { success: true, ngo: data };
  } catch (error) {
    console.error('Error creating/updating NGO:', error);
    return { success: false, error };
  }
};

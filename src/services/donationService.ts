
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
    
    // If there are no NGOs, let's create some sample NGOs
    if (!data || data.length === 0) {
      const sampleNGOs = [
        {
          name: "Save the Children",
          wallet_address: "0x123456789abcdef",
          category: "children",
          description: "Helping children in need",
          is_verified: true
        },
        {
          name: "Animal Rescue",
          wallet_address: "0xabcdef123456789",
          category: "animals",
          description: "Protecting endangered animals",
          is_verified: true
        },
        {
          name: "Brave Soldiers Fund",
          wallet_address: "0x987654321abcdef",
          category: "army",
          description: "Supporting veterans and their families",
          is_verified: true
        },
        {
          name: "Science Research Institute",
          wallet_address: "0xfedcba987654321",
          category: "research",
          description: "Advancing scientific research",
          is_verified: true
        }
      ];
      
      for (const ngo of sampleNGOs) {
        await upsertNGO(ngo);
      }
      
      // Fetch the NGOs again
      const { data: refreshedData } = await supabase
        .from('ngos')
        .select('*')
        .order('name');
        
      return refreshedData || [];
    }
    
    return data;
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

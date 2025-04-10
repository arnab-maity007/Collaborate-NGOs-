
-- Add some sample NGOs if none exist
INSERT INTO public.ngos (name, wallet_address, category, description, is_verified)
SELECT 'Save The Animals Foundation', '0x1234567890abcdef1234567890abcdef12345678', 'animals', 'We help protect and care for endangered animals across the country.', true
WHERE NOT EXISTS (SELECT 1 FROM public.ngos LIMIT 1);

INSERT INTO public.ngos (name, wallet_address, category, description, is_verified)
SELECT 'Human Relief Organization', '0xabcdef1234567890abcdef1234567890abcdef12', 'people', 'Supporting vulnerable populations with food, shelter, and medical aid.', true
WHERE NOT EXISTS (SELECT 1 FROM public.ngos LIMIT 1);

INSERT INTO public.ngos (name, wallet_address, category, description, is_verified)
SELECT 'Green Earth Initiative', '0x7890abcdef1234567890abcdef1234567890abcd', 'forestation', 'Planting trees and protecting forests for a greener planet.', true
WHERE NOT EXISTS (SELECT 1 FROM public.ngos LIMIT 1);

INSERT INTO public.ngos (name, wallet_address, category, description, is_verified)
SELECT 'Soldiers Family Support', '0xdef1234567890abcdef1234567890abcdef12345', 'army', 'Supporting families of soldiers with financial and emotional assistance.', true
WHERE NOT EXISTS (SELECT 1 FROM public.ngos LIMIT 1);


export interface NGO {
  id: string;
  name: string;
  description: string;
  category: string[];
  location: string;
  impact: string;
  yearFounded: number;
  profileImageUrl: string;
  coverImageUrl: string;
  website?: string;
  blockchainAddress?: string;
  rating: number;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  donationGoal?: number;
  donations?: number;
}

const NGOS: NGO[] = [
  {
    id: "ngo-1",
    name: "Child Education Initiative",
    description: "Providing quality education to underprivileged children worldwide. Our programs support over 50,000 children in 15 countries.",
    category: ["education", "children", "development"],
    location: "Global",
    impact: "50,000+ children educated",
    yearFounded: 2010,
    profileImageUrl: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D",
    coverImageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbGRyZW4lMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D",
    website: "https://www.childeducationinitiative.org",
    blockchainAddress: "0x1234567890abcdef1234567890abcdef12345678",
    rating: 4.8,
    verificationStatus: "verified",
    donationGoal: 1000000,
    donations: 750000
  },
  {
    id: "ngo-2",
    name: "Green Earth Alliance",
    description: "Protecting and conserving ecosystems and biodiversity. Our initiatives include reforestation, wildlife conservation, and climate action.",
    category: ["environment", "climate", "conservation"],
    location: "International",
    impact: "10M+ trees planted, 25+ endangered species protected",
    yearFounded: 2005,
    profileImageUrl: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW52aXJvbm1lbnR8ZW58MHx8MHx8fDA%3D",
    coverImageUrl: "https://images.unsplash.com/photo-1604336755604-65caccc021f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVmb3Jlc3RhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    website: "https://www.greenearthalliance.org",
    blockchainAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    rating: 4.7,
    verificationStatus: "verified",
    donationGoal: 2000000,
    donations: 1500000
  },
  {
    id: "ngo-3",
    name: "Medical Aid Without Borders",
    description: "Providing critical medical assistance in conflict zones and underserved regions worldwide.",
    category: ["healthcare", "emergency", "humanitarian"],
    location: "Global",
    impact: "Over 100,000 surgeries performed and 2M+ vaccinations administered",
    yearFounded: 1998,
    profileImageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNhbCUyMGFpZHxlbnwwfHwwfHx8MA%3D%3D",
    coverImageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhbCUyMGFpZHxlbnwwfHwwfHx8MA%3D%3D",
    website: "https://www.medicalaidwithoutborders.org",
    blockchainAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
    rating: 4.9,
    verificationStatus: "verified",
    donationGoal: 5000000,
    donations: 3500000
  },
  {
    id: "ngo-4",
    name: "Women Empowerment Foundation",
    description: "Advancing gender equality and supporting women's economic independence through education and entrepreneurship.",
    category: ["women", "gender equality", "education", "entrepreneurship"],
    location: "Asia, Africa",
    impact: "25,000+ women entrepreneurs supported",
    yearFounded: 2012,
    profileImageUrl: "https://images.unsplash.com/photo-1573497613881-069ff4069864?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBlbXBvd2VybWVudHxlbnwwfHwwfHx8MA%3D%3D",
    coverImageUrl: "https://images.unsplash.com/photo-1596705725412-c2fc5afeb51c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBlbXBvd2VybWVudHxlbnwwfHwwfHx8MA%3D%3D",
    website: "https://www.womenempowermentfoundation.org",
    blockchainAddress: "0xdef1234567890abcdef1234567890abcdef123456",
    rating: 4.6,
    verificationStatus: "verified",
    donationGoal: 1500000,
    donations: 900000
  },
  {
    id: "ngo-5",
    name: "Clean Water Initiative",
    description: "Providing access to clean water and sanitation facilities in underserved communities.",
    category: ["water", "sanitation", "health", "development"],
    location: "Africa, South Asia",
    impact: "Built 1,000+ wells serving over 500,000 people",
    yearFounded: 2008,
    profileImageUrl: "https://images.unsplash.com/photo-1585844536743-b3547882e05e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsZWFuJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D",
    coverImageUrl: "https://images.unsplash.com/photo-1553163010-bb4052fcb997?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsZWFuJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D",
    website: "https://www.cleanwaterinitiative.org",
    blockchainAddress: "0x45678901abcdef1234567890abcdef1234567890",
    rating: 4.7,
    verificationStatus: "verified",
    donationGoal: 3000000,
    donations: 2200000
  },
  {
    id: "ngo-6",
    name: "Animal Rights Collective",
    description: "Protecting animal welfare and creating sustainable habitats for endangered species.",
    category: ["animals", "wildlife", "conservation"],
    location: "Global",
    impact: "Saved 30+ endangered species from extinction",
    yearFounded: 2014,
    profileImageUrl: "https://images.unsplash.com/photo-1566245024852-f9714a30e6bb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWFsJTIwcHJvdGVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    coverImageUrl: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsJTIwcHJvdGVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    website: "https://www.animalrightscollective.org",
    blockchainAddress: "0x90abcdef1234567890abcdef1234567890abcdef",
    rating: 4.5,
    verificationStatus: "verified",
    donationGoal: 1000000,
    donations: 650000
  },
  {
    id: "ngo-7",
    name: "Disaster Relief Network",
    description: "Providing immediate assistance and long-term support for communities affected by natural disasters.",
    category: ["disaster relief", "emergency", "humanitarian"],
    location: "Global",
    impact: "Assisted 2M+ people across 45 disaster zones",
    yearFounded: 2007,
    profileImageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzYXN0ZXIlMjByZWxpZWZ8ZW58MHx8MHx8fDA%3D",
    coverImageUrl: "https://images.unsplash.com/photo-1587691592099-24045742c181?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpc2FzdGVyJTIwcmVsaWVmfGVufDB8fDB8fHww",
    website: "https://www.disasterreliefnetwork.org",
    blockchainAddress: "0x2345678901abcdef1234567890abcdef123456789",
    rating: 4.8,
    verificationStatus: "verified",
    donationGoal: 4000000,
    donations: 3200000
  },
  {
    id: "ngo-8",
    name: "Digital Education Access",
    description: "Bridging the digital divide by providing technology and internet access to underserved communities.",
    category: ["education", "technology", "digital inclusion"],
    location: "Global",
    impact: "Distributed 50,000+ devices and setup 500+ community internet centers",
    yearFounded: 2015,
    profileImageUrl: "https://images.unsplash.com/photo-1488998527040-85054a85150e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGlnaXRhbCUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    coverImageUrl: "https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpZ2l0YWwlMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D",
    website: "https://www.digitaleducationaccess.org",
    blockchainAddress: "0x34567890abcdef1234567890abcdef1234567890a",
    rating: 4.6,
    verificationStatus: "verified",
    donationGoal: 2000000,
    donations: 1100000
  }
];

export default NGOS;

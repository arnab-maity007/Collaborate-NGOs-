
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Web3ContextType {
  isConnected: boolean;
  accountAddress: string | null;
  chainId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if ethereum is available
  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        console.log("Found ethereum object");
        
        // Check if we're authorized to access the user's wallet
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setAccountAddress(account);
          setIsConnected(true);
          
          // Get the connected chain ID
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
          setChainId(chainId);
        } else {
          console.log("No authorized account found");
          setIsConnected(false);
        }
      } else {
        console.log("No ethereum wallet found. Please install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      if (!window.ethereum) {
        toast({
          title: "Wallet not found",
          description: "Please install MetaMask or another Web3 wallet to continue",
          variant: "destructive",
        });
        return;
      }
      
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      setAccountAddress(account);
      setIsConnected(true);
      
      // Get the connected chain ID
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setChainId(chainId);
      
      toast({
        title: "Wallet connected",
        description: "Your wallet has been successfully connected",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to your wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccountAddress(null);
    setIsConnected(false);
    setChainId(null);
    
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setAccountAddress(null);
          setIsConnected(false);
        }
      });

      window.ethereum.on("chainChanged", (chainId: string) => {
        setChainId(chainId);
      });
    }

    checkIfWalletIsConnected();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create the context value
  const contextValue: Web3ContextType = {
    isConnected,
    accountAddress,
    chainId,
    connectWallet,
    disconnectWallet,
    isLoading,
  };

  return <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>;
};

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
    };
  }
}

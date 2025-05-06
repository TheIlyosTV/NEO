"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

// Define types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Address {
  id: number;
  type: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: number;
  type: string;
  cardType?: string;
  cardImage?: string;
  lastFour: string;
  expiryDate: string;
  cardName: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: User | null;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (data: {
    name: string;
    email: string;
    avatar?: string;
  }) => Promise<void>;
  addAddress: (address: Omit<Address, "id" | "isDefault">) => Promise<void>;
  updateAddress: (id: number, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  addPaymentMethod: (
    payment: Omit<PaymentMethod, "id" | "isDefault">
  ) => Promise<void>;
  deletePaymentMethod: (id: number) => Promise<void>;
  setDefaultAddress: (id: number) => Promise<void>;
  setDefaultPaymentMethod: (id: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  addresses: [],
  paymentMethods: [],
  isLoading: false,
  login: async () => false,
  register: async () => false,
  loginWithGoogle: async () => false,
  logout: () => {},
  updateUserProfile: async () => {},
  addAddress: async () => {},
  updateAddress: async () => {},
  deleteAddress: async () => {},
  addPaymentMethod: async () => {},
  deletePaymentMethod: async () => {},
  setDefaultAddress: async () => {},
  setDefaultPaymentMethod: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

// Mock data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    avatar: "/avatars/avatar1.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    avatar: "/avatars/avatar2.jpg",
  },
];

const mockAddresses = [
  {
    id: 1,
    type: "Home",
    name: "John Doe",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    name: "John Doe",
    address: "456 Office Park",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "United States",
    isDefault: false,
  },
];

const mockPaymentMethods = [
  {
    id: 1,
    type: "Credit Card",
    cardType: "Visa",
    lastFour: "4242",
    expiryDate: "09/25",
    cardName: "Ilyosbek Axmedjanov",
    isDefault: true,
  },
  {
    id: 2,
    type: "Credit Card",
    cardType: "Mastercard",
    lastFour: "8888",
    expiryDate: "12/24",
    cardName: "Ilyosbek Axmedjanov",
    isDefault: false,
  },
];

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadData = () => {
      const savedUser = localStorage.getItem("user");
      const savedAddresses = localStorage.getItem("addresses");
      const savedPayments = localStorage.getItem("paymentMethods");

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse user data:", error);
          localStorage.removeItem("user");
        }
      }

      if (savedAddresses) {
        try {
          setAddresses(JSON.parse(savedAddresses));
        } catch (error) {
          console.error("Failed to parse addresses:", error);
          localStorage.removeItem("addresses");
        }
      }

      if (savedPayments) {
        try {
          setPaymentMethods(JSON.parse(savedPayments));
        } catch (error) {
          console.error("Failed to parse payment methods:", error);
          localStorage.removeItem("paymentMethods");
        }
      }
    };

    loadData();
    setIsLoading(false);
  }, []);

  // Update user when session changes
  useEffect(() => {
    if (session && session.user) {
      const newUser = {
        id: session.user.id || "",
        name: session.user.name || "",
        email: session.user.email || "",
        avatar: session.user.image || undefined,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, [session]);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(addresses));
    }
  }, [addresses]);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
    }
  }, [paymentMethods]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);

        // Load default addresses and payments for demo
        if (addresses.length === 0) {
          setAddresses(mockAddresses);
        }
        if (paymentMethods.length === 0) {
          setPaymentMethods(mockPaymentMethods);
        }

        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        setIsLoading(false);
        return true;
      }

      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user exists
      if (mockUsers.some((u) => u.email === email)) {
        toast({
          title: "Registration failed",
          description: "Email already in use",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }

      // Create new user
      const newUser = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        avatar: `/avatars/avatar${mockUsers.length + 1}.jpg`,
      };

      setUser(newUser);

      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration error",
        description: "An error occurred during registration",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/account",
        redirect: false,
      });
      setIsLoading(false);
      return result?.ok || false;
    } catch (error) {
      console.error("Google login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const updateUserProfile = async (data: {
    name: string;
    email: string;
    avatar?: string;
  }): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);

        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update failed",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAddress = async (
    address: Omit<Address, "id" | "isDefault">
  ): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newAddress = {
        ...address,
        id: Date.now(), // Use timestamp as ID for demo
        isDefault: addresses.length === 0, // Set as default if first address
      };

      setAddresses((prev) => [...prev, newAddress]);

      toast({
        title: "Address added",
        description: "New address has been added to your account",
      });
    } catch (error) {
      console.error("Add address error:", error);
      toast({
        title: "Add address failed",
        description: "Failed to add new address",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateAddress = async (
    id: number,
    updates: Partial<Address>
  ): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAddresses((prev) =>
        prev.map((addr) => (addr.id === id ? { ...addr, ...updates } : addr))
      );

      toast({
        title: "Address updated",
        description: "Address has been updated successfully",
      });
    } catch (error) {
      console.error("Update address error:", error);
      toast({
        title: "Update failed",
        description: "Failed to update address",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (id: number): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAddresses((prev) => {
        const newAddresses = prev.filter((addr) => addr.id !== id);

        // If we deleted the default address and there are other addresses,
        // set the first one as default
        if (
          newAddresses.length > 0 &&
          !newAddresses.some((addr) => addr.isDefault)
        ) {
          newAddresses[0].isDefault = true;
        }

        return newAddresses;
      });

      toast({
        title: "Address deleted",
        description: "Address has been removed from your account",
      });
    } catch (error) {
      console.error("Delete address error:", error);
      toast({
        title: "Delete failed",
        description: "Failed to delete address",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setDefaultAddress = async (id: number): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }))
      );

      toast({
        title: "Default address updated",
        description: "Your default address has been changed",
      });
    } catch (error) {
      console.error("Set default address error:", error);
      toast({
        title: "Update failed",
        description: "Failed to set default address",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addPaymentMethod = async (
    payment: Omit<PaymentMethod, "id" | "isDefault">
  ): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPayment = {
        ...payment,
        id: Date.now(), // Use timestamp as ID for demo
        isDefault: paymentMethods.length === 0, // Set as default if first payment
      };

      setPaymentMethods((prev) => [...prev, newPayment]);

      toast({
        title: "Payment method added",
        description: "New payment method has been added to your account",
      });
    } catch (error) {
      console.error("Add payment error:", error);
      toast({
        title: "Add payment failed",
        description: "Failed to add new payment method",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deletePaymentMethod = async (id: number): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPaymentMethods((prev) => {
        const newPayments = prev.filter((pm) => pm.id !== id);

        // If we deleted the default payment and there are other payments,
        // set the first one as default
        if (newPayments.length > 0 && !newPayments.some((pm) => pm.isDefault)) {
          newPayments[0].isDefault = true;
        }

        return newPayments;
      });

      toast({
        title: "Payment method deleted",
        description: "Payment method has been removed from your account",
      });
    } catch (error) {
      console.error("Delete payment error:", error);
      toast({
        title: "Delete failed",
        description: "Failed to delete payment method",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setDefaultPaymentMethod = async (id: number): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPaymentMethods((prev) =>
        prev.map((pm) => ({
          ...pm,
          isDefault: pm.id === id,
        }))
      );

      toast({
        title: "Default payment updated",
        description: "Your default payment method has been changed",
      });
    } catch (error) {
      console.error("Set default payment error:", error);
      toast({
        title: "Update failed",
        description: "Failed to set default payment method",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("addresses");
    localStorage.removeItem("paymentMethods");
    setUser(null);
    setAddresses([]);
    setPaymentMethods([]);
    signOut({ callbackUrl: "/" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        addresses,
        paymentMethods,
        isLoading: isLoading || status === "loading",
        login,
        register,
        loginWithGoogle,
        logout,
        updateUserProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        addPaymentMethod,
        deletePaymentMethod,
        setDefaultAddress,
        setDefaultPaymentMethod,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

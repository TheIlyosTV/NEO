"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

// Define user type
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// Define auth context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => void
  updateUserProfile: (data: { name: string; email: string }) => Promise<void>
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => false,
  register: async () => false,
  loginWithGoogle: async () => false,
  logout: () => {},
  updateUserProfile: async () => {},
})

// Auth provider props
interface AuthProviderProps {
  children: ReactNode
}

// Mock user data for demo purposes (will be used for email/password login)
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Update user when session changes
  useEffect(() => {
    if (session && session.user) {
      setUser({
        id: session.user.id || "",
        name: session.user.name || "",
        email: session.user.email || "",
        avatar: session.user.image || undefined,
      })
      setIsLoading(false)
    } else if (status === "unauthenticated") {
      // Check for saved user in localStorage for non-OAuth logins
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
        } catch (error) {
          console.error("Failed to parse saved user:", error)
          localStorage.removeItem("user")
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }
  }, [session, status])

  // Login function (for email/password)
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // For now, we'll keep the mock login for email/password
    // In a real implementation, you would add a credentials provider to NextAuth
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  // Google login function using NextAuth
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      const result = await signIn("google", { callbackUrl: "/account", redirect: false })
      setIsLoading(false)
      return result?.ok || false
    } catch (error) {
      console.error("Google login error:", error)
      setIsLoading(false)
      return false
    }
  }

  // Update user profile function
  const updateUserProfile = async (data: { name: string; email: string }): Promise<void> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (user) {
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
      }
      
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
    
    setIsLoading(false)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    signOut({ callbackUrl: "/" })
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading: isLoading || status === "loading", 
      login, 
      register, 
      loginWithGoogle, 
      logout,
      updateUserProfile 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext)
}

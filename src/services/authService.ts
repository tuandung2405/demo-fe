import http from "@/utils/http";
import axios from "axios";

interface UserCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  userEntity: {
    displayName: string
  };
  // Add any other fields that your API returns
}

class AuthService {
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    try {
      const response = await http.post<AuthResponse>('/uaa/login', {
        code: credentials.email,
        password: credentials.password,
      });
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userFullname", response.data.userEntity.displayName);
        // Add token to cookie
        document.cookie = `token=${response.data.token}; path=/; secure; samesite=strict`;
      }
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async register(credentials: UserCredentials): Promise<AuthResponse> {
    try {
      const response = await http.post<AuthResponse>("/register", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  logout(): void {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Remove token from cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  }

  getCurrentUser(): string | null {
    return localStorage.getItem("token");
  }

  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      console.error("API Error:", error.response?.data);
    } else {
      // Handle other errors
      console.error("An unexpected error occurred:", error);
    }
  }
}

export const authService = new AuthService();

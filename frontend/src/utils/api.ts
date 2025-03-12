import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface WalletCredentials {
  walletAddress: string;
  signature?: string;
}

interface LoginCredentials {
  username?: string;
  password?: string;
  walletAddress?: string;
  signature?: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface User {
  username: string;
  email?: string;
  id: string;
  walletAddress?: string;
}

interface LearningTopic {
  id: number;
  title: string;
  description: string;
  progress: number;
}

interface Tool {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class ApiClient {
  private static token: string | null = null;
  private static axiosInstance: AxiosInstance;

  private static getAxiosInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Add request interceptor
      this.axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
          const token = this.getToken();
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error: AxiosError) => Promise.reject(error)
      );

      // Add response interceptor
      this.axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
          if (error.response?.status === 401) {
            this.clearToken();
            if (typeof window !== 'undefined') {
              window.location.href = '/connect2wallet';
            }
          }
          return Promise.reject(error);
        }
      );
    }
    return this.axiosInstance;
  }

  static setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  static getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  static clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  static async login(credentials: LoginCredentials): Promise<ApiResponse<{ token: string }>> {
    try {
      let response;
      
      if (credentials.walletAddress) {
        // Wallet-based authentication
        response = await this.getAxiosInstance().post<{ access_token: string }>('/api/wallet/login', {
          address: credentials.walletAddress,
          signature: credentials.signature
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Traditional username/password authentication
        const formData = new URLSearchParams();
        formData.append('username', credentials.username || '');
        formData.append('password', credentials.password || '');

        response = await this.getAxiosInstance().post<{ access_token: string }>('/api/token', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      }

      this.setToken(response.data.access_token);
      return { data: { token: response.data.access_token } };
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      let errorMessage = '登录失败';
      
      if (axiosError.response?.data?.detail) {
        errorMessage = axiosError.response.data.detail;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
      
      console.error('Login error:', errorMessage);
      return { error: errorMessage };
    }
  }

  static async register(data: RegisterData): Promise<ApiResponse<{ username: string }>> {
    try {
      const response = await this.getAxiosInstance().post<{ username: string }>('/api/register', data);
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      let errorMessage = '注册失败';
      
      if (axiosError.response?.data?.detail) {
        errorMessage = axiosError.response.data.detail;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
      
      console.error('Registration error:', errorMessage);
      return { error: errorMessage };
    }
  }

  static async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await this.getAxiosInstance().get<User>('/api/users/me');
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      let errorMessage = '获取用户信息失败';
      
      if (axiosError.response?.data?.detail) {
        errorMessage = axiosError.response.data.detail;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
      
      console.error('Get user error:', errorMessage);
      return { error: errorMessage };
    }
  }

  static async getLearningTopics(): Promise<ApiResponse<LearningTopic[]>> {
    try {
      const response = await this.getAxiosInstance().get<LearningTopic[]>('/api/learning');
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      let errorMessage = '获取学习主题失败';
      
      if (axiosError.response?.data?.detail) {
        errorMessage = axiosError.response.data.detail;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
      
      console.error('Get learning topics error:', errorMessage);
      return { error: errorMessage };
    }
  }

  static async getTools(): Promise<ApiResponse<Tool[]>> {
    try {
      const response = await this.getAxiosInstance().get<Tool[]>('/api/tools');
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      let errorMessage = '获取工具列表失败';
      
      if (axiosError.response?.data?.detail) {
        errorMessage = axiosError.response.data.detail;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
      
      console.error('Get tools error:', errorMessage);
      return { error: errorMessage };
    }
  }

  static async updateProfile(updates: { email?: string }): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await this.getAxiosInstance().put<{ message: string }>('/api/users/me', updates);
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      let errorMessage = '更新个人信息失败';
      
      if (axiosError.response?.data?.detail) {
        errorMessage = axiosError.response.data.detail;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
      
      console.error('Update profile error:', errorMessage);
      return { error: errorMessage };
    }
  }
}

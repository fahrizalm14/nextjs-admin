// lib/useFetch.ts
"use client";

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";

export interface BaseResponse<T> {
  message: string;
  data: T;
}

interface FetchState<T> {
  data: BaseResponse<T> | null;
  loading: boolean;
  error: string | null;
  errorCode: number | null;
}

/* ------------------ */
/* 1. Axios Instances */
/* ------------------ */

// Public API (tanpa auth, tanpa interceptor)
const apiPublic: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Private API (pakai auth + refresh)
const apiPrivate: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor request → inject access token
apiPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor response → auto refresh token kalau 401
apiPrivate.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Log the original request to see what failed
    console.log("Original request failed:", error.response);

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token endpoint requires the refreshToken in the body or headers
        // Assuming it's in the body based on the original code
        const res = await apiPublic.post("/api/refresh-token");

        if (res.status !== 200) {
          throw new Error("Failed to refresh token with a non-200 status.");
        }

        const newToken = res.data?.data?.accessToken;
        if (!newToken) {
          throw new Error("New access token not found in refresh response.");
        }

        localStorage.setItem("token", newToken);

        // Update the authorization header for the original request
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        return apiPrivate(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem("token");
        await apiPublic.post("/api/logout"); // opsional
        window.location.href = "/login"; // redirect user
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/* ------------------ */
/* 2. useFetch Hook   */

/* ------------------ */

export function useFetch<T = unknown>() {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
    errorCode: null,
  });

  const call = useCallback(
    async (
      config: AxiosRequestConfig,
      withAuth: boolean = false
    ): Promise<BaseResponse<T> | null> => {
      setState({ data: null, loading: true, error: null, errorCode: null });

      try {
        const client = withAuth ? apiPrivate : apiPublic;

        const res = await client<BaseResponse<T>>(config);

        setState({
          data: res.data,
          loading: false,
          error: null,
          errorCode: null,
        });

        return res.data;
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        const message =
          axiosErr.response?.data?.message ||
          axiosErr.message ||
          "Unexpected error";

        const status = axiosErr.response?.status ?? null;

        setState({
          data: null,
          loading: false,
          error: message,
          errorCode: status,
        });

        return null;
      }
    },
    []
  );

  return { ...state, call };
}

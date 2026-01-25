import { setAuthToken } from "./apiClient";

// Token storage keys
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_DATA_KEY = "userData";

/**
 * Set a cookie with the given name, value, and expiration days
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiration days (default: 7)
 */
export const setCookie = (name, value, days = 7) => {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null
 */
export const getCookie = (name) => {
    if (typeof window === "undefined") return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

/**
 * Delete a cookie by name
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
    if (typeof window === "undefined") return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const setLocalStorage = (key, value) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
          
    }
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @returns {any|null} Stored value or null
 */
export const getLocalStorage = (key) => {
    if (typeof window === "undefined") return null;
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
          
        return null;
    }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeLocalStorage = (key) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(key);
    } catch (error) {
          
    }
};

/**
 * Store authentication tokens and user data
 * @param {string} accessToken - Access token
 * @param {string} refreshToken - Refresh token
 * @param {Object} userData - User data object
 */
export const storeAuthData = (accessToken, refreshToken, userData) => {
    // Store in localStorage (primary storage)
    setLocalStorage(ACCESS_TOKEN_KEY, accessToken);
    setLocalStorage(REFRESH_TOKEN_KEY, refreshToken);
    setLocalStorage(USER_DATA_KEY, userData);

    // Also store in cookies (for SSR compatibility if needed)
    setCookie(ACCESS_TOKEN_KEY, accessToken, 7); // 7 days
    setCookie(REFRESH_TOKEN_KEY, refreshToken, 30); // 30 days for refresh token

    // Set token in axios headers
    setAuthToken(accessToken);
};

/**
 * Get access token from storage
 * @returns {string|null} Access token or null
 */
export const getAccessToken = () => {
    return getLocalStorage(ACCESS_TOKEN_KEY) || getCookie(ACCESS_TOKEN_KEY);
};

/**
 * Get refresh token from storage
 * @returns {string|null} Refresh token or null
 */
export const getRefreshToken = () => {
    return getLocalStorage(REFRESH_TOKEN_KEY) || getCookie(REFRESH_TOKEN_KEY);
};

/**
 * Get user data from storage
 * @returns {Object|null} User data or null
 */
export const getUserData = () => {
    return getLocalStorage(USER_DATA_KEY);
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
    const token = getAccessToken();
    const user = getUserData();
    return !!(token && user);
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
    // Remove from localStorage
    removeLocalStorage(ACCESS_TOKEN_KEY);
    removeLocalStorage(REFRESH_TOKEN_KEY);
    removeLocalStorage(USER_DATA_KEY);

    // Remove from cookies
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);

    // Clear axios headers
    setAuthToken(null);
};

/**
 * Initialize auth token on app load
 * This should be called when the app initializes
 */
export const initializeAuth = () => {
    const token = getAccessToken();
    if (token) {
        setAuthToken(token);
    }
};

/**
 * Get user role
 * @returns {string|null} User role (ADMIN, STUDENT, etc.) or null
 */
export const getUserRole = () => {
    const user = getUserData();
    return user?.role || null;
};

/**
 * Check if user is admin
 * @returns {boolean} True if user is admin
 */
export const isAdmin = () => {
    return getUserRole() === "ADMIN";
};

/**
 * Check if user is student
 * @returns {boolean} True if user is student
 */
export const isStudent = () => {
    return getUserRole() === "STUDENT";
};

/**
 * Get dashboard route based on user role
 * @returns {string} Dashboard route
 */
export const getDashboardRoute = () => {
    const role = getUserRole();
    if (role === "ADMIN") {
        return "/dashboard/admin";
    } else if (role === "STUDENT") {
        return "/dashboard/student";
    }
    return "/dashboard";
};

/**
 * Logout user - Clear auth data and redirect to login
 * @param {Function} router - Next.js router (optional, for programmatic navigation)
 */
export const logout = (router = null) => {
    clearAuthData();

    if (typeof window !== "undefined") {
        if (router) {
            router.push("/signin");
        } else {
            window.location.href = "/signin";
        }
    }
};

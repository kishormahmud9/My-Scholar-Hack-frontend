import { setAuthToken } from "./apiClient";
import {
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    USER_DATA_KEY,
    setCookie,
    getCookie,
    deleteCookie,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    getAccessToken,
    getRefreshToken,
    getUserData,
    clearStorage,
    USER_ROLE_KEY,
    ACTIVE_PLAN_KEY
} from "./auth-storage";

/**
 * Store authentication tokens and user data
 * @param {string} accessToken - Access token
 * @param {string} refreshToken - Refresh token
 * @param {Object} userData - User data object
 * @param {boolean} userData.isPlan - Plan status
 */
export const storeAuthData = (accessToken, refreshToken, userData) => {
    // console.log("userData", userData);
    // Store in localStorage (primary storage)
    setLocalStorage(ACCESS_TOKEN_KEY, accessToken);
    setLocalStorage(REFRESH_TOKEN_KEY, refreshToken);
    setLocalStorage(USER_DATA_KEY, userData);
    setLocalStorage(ACTIVE_PLAN_KEY, userData.isPlan);

    // Also store in cookies (for SSR compatibility if needed)
    setCookie(ACCESS_TOKEN_KEY, accessToken, 7); // 7 days
    setCookie(REFRESH_TOKEN_KEY, refreshToken, 30); // 30 days for refresh token
    setCookie(ACTIVE_PLAN_KEY, userData.isPlan, 7);
    if (userData?.role) {
        setCookie(USER_ROLE_KEY, userData.role, 7);
    }

    // Set token in axios headers
    setAuthToken(accessToken);
};

// Re-export getters for convenience
export { getAccessToken, getRefreshToken, getUserData };

/**
 * Check if user is authenticated
 * Strictly requires the presence of an access token cookie.
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;

    const token = getCookie(ACCESS_TOKEN_KEY);
    const user = getUserData();
    const role = getCookie(USER_ROLE_KEY);

    // If cookie token is missing, the session is functionally dead even if localStorage has data
    return !!(token && (user || role));
};

/**
 * Check if user has an active plan
 * @returns {boolean} True if plan is active
 */
export const hasActivePlan = () => {
    const isPlan = getLocalStorage(ACTIVE_PLAN_KEY) || getCookie(ACTIVE_PLAN_KEY);
    // Handle both boolean and string "true"/"false" from cookies
    return isPlan === true || isPlan === "true";
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
    clearStorage();
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
    if (user?.role) return user.role;

    // Fallback to cookie if userData in localStorage is missing
    return getCookie(USER_ROLE_KEY);
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

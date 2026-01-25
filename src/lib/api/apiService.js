import { apiClient } from "@/lib/apiClient";
import { clearAuthData } from "@/lib/auth";

/**
 * API Service - Centralized API calls with axios
 * This file contains all API methods with proper HTTP methods and body params
 */

// ==================== AUTH API ====================

/**
 * Register a new user
 * @param {Object} payload - User registration data
 * @param {string} payload.email - User email
 * @param {string} payload.password - User password
 * @param {string} payload.firstName - User first name
 * @param {string} payload.lastName - User last name
 * @returns {Promise} API response
 */
export const registerUser = async (payload) => {
    const response = await apiClient.post("/user/register", payload);
    return response.data;
};

/**
 * Login user
 * @param {Object} payload - Login credentials
 * @param {string} payload.email - User email
 * @param {string} payload.password - User password
 * @returns {Promise} API response with token
 */
export const loginUser = async (payload) => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
};

/**
 * Forgot password - Send reset link
 * @param {Object} payload - Email data
 * @param {string} payload.email - User email
 * @returns {Promise} API response
 */
export const forgotPassword = async (payload) => {
    const response = await apiClient.post("/auth/forgot-password", payload);
    return response.data;
};

/**
 * Reset password with token
 * @param {Object} payload - Reset password data
 * @param {string} payload.token - Reset token
 * @param {string} payload.password - New password
 * @param {string} payload.confirmPassword - Confirm new password
 * @returns {Promise} API response
 */
export const resetPassword = async (payload) => {
    const response = await apiClient.post("/auth/reset-password", payload);
    return response.data;
};

/**
 * Verify email with token
 * @param {Object} payload - Verification data
 * @param {string} payload.token - Verification token
 * @returns {Promise} API response
 */
export const verifyEmail = async (payload) => {
    const response = await apiClient.post("/auth/verify-email", payload);
    return response.data;
};

/**
 * Verify OTP
 * @param {Object} payload - OTP data
 * @param {string} payload.email - User email
 * @param {string} payload.otp - OTP code
 * @returns {Promise} API response
 */
export const verifyOTP = async (payload) => {
    const response = await apiClient.post("/auth/verify-otp", payload);
    return response.data;
};

/**
 * Resend OTP
 * @param {Object} payload - Email data
 * @param {string} payload.email - User email
 * @returns {Promise} API response
 */
export const resendOTP = async (payload) => {
    const response = await apiClient.post("/auth/resend-otp", payload);
    return response.data;
};

/**
 * Logout user - Calls API and clears local auth data
 * @param {Function} router - Next.js router (optional, for redirect)
 * @returns {Promise} API response
 */
export const logoutUser = async (router = null) => {
    try {
        // Call logout API endpoint
        const response = await apiClient.post("/auth/logout");

        // Clear local auth data regardless of API response
        clearAuthData();

        // Redirect to login if router provided or use window.location
        if (typeof window !== "undefined") {
            if (router) {
                router.push("/signin");
            } else {
                window.location.href = "/signin";
            }
        }

        return response.data;
    } catch (error) {
        // Even if API call fails, clear local auth data
        clearAuthData();

        // Redirect to login
        if (typeof window !== "undefined") {
            if (router) {
                router.push("/signin");
            } else {
                window.location.href = "/signin";
            }
        }

        throw error;
    }
};

/**
 * Refresh access token
 * @param {Object} payload - Refresh token data
 * @param {string} payload.refreshToken - Refresh token
 * @returns {Promise} API response with new tokens
 */
export const refreshToken = async (payload) => {
    const response = await apiClient.post("/auth/refresh-token", payload);
    return response.data;
};

// ==================== USER PROFILE API ====================

/**
 * Get current user profile
 * @returns {Promise} API response with user data
 */
export const getUserProfile = async () => {
    const response = await apiClient.get("/user/profile");
    return response.data;
};

/**
 * Update user profile
 * @param {Object} payload - Updated user data
 * @returns {Promise} API response
 */
export const updateUserProfile = async (payload) => {
    const response = await apiClient.put("/user/profile", payload);
    return response.data;
};

/**
 * Update user password
 * @param {Object} payload - Password data
 * @param {string} payload.currentPassword - Current password
 * @param {string} payload.newPassword - New password
 * @param {string} payload.confirmPassword - Confirm new password
 * @returns {Promise} API response
 */
export const updateUserPassword = async (payload) => {
    const response = await apiClient.put("/user/password", payload);
    return response.data;
};

/**
 * Upload profile picture
 * @param {FormData} formData - FormData with image file
 * @returns {Promise} API response
 */
export const uploadProfilePicture = async (formData) => {
    const response = await apiClient.post("/user/profile/picture", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// ==================== ESSAYS API ====================

/**
 * Get all essays for current user
 * @param {Object} params - Query parameters (optional)
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise} API response with essays list
 */
export const getEssays = async (params = {}) => {
    const response = await apiClient.get("/essays", { params });
    return response.data;
};

/**
 * Get essay by ID
 * @param {string} id - Essay ID
 * @returns {Promise} API response with essay data
 */
export const getEssayById = async (id) => {
    const response = await apiClient.get(`/essays/${id}`);
    return response.data;
};

/**
 * Create a new essay
 * @param {Object} payload - Essay data
 * @param {string} payload.title - Essay title
 * @param {string} payload.content - Essay content
 * @param {string} payload.scholarshipId - Associated scholarship ID
 * @returns {Promise} API response
 */
export const createEssay = async (payload) => {
    const response = await apiClient.post("/essays", payload);
    return response.data;
};

/**
 * Update essay
 * @param {string} id - Essay ID
 * @param {Object} payload - Updated essay data
 * @returns {Promise} API response
 */
export const updateEssay = async (id, payload) => {
    const response = await apiClient.put(`/essays/${id}`, payload);
    return response.data;
};

/**
 * Delete essay
 * @param {string} id - Essay ID
 * @returns {Promise} API response
 */
export const deleteEssay = async (id) => {
    const response = await apiClient.delete(`/essays/${id}`);
    return response.data;
};

/**
 * Generate essay using AI
 * @param {Object} payload - Essay generation data
 * @param {string} payload.prompt - Essay prompt/question
 * @param {string} payload.scholarshipId - Scholarship ID
 * @param {Object} payload.userProfile - User profile data
 * @returns {Promise} API response with generated essay
 */
export const generateEssay = async (payload) => {
    const response = await apiClient.post("/essays/generate", payload);
    return response.data;
};

/**
 * Compare essays
 * @param {Object} payload - Essay comparison data
 * @param {string[]} payload.essayIds - Array of essay IDs to compare
 * @returns {Promise} API response with comparison results
 */
export const compareEssays = async (payload) => {
    const response = await apiClient.post("/essays/compare", payload);
    return response.data;
};

// ==================== SCHOLARSHIPS API ====================

/**
 * Get all scholarships
 * @param {Object} params - Query parameters (optional)
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.search - Search query
 * @param {string} params.category - Filter by category
 * @returns {Promise} API response with scholarships list
 */
export const getScholarships = async (params = {}) => {
    const response = await apiClient.get("/scholarships", { params });
    return response.data;
};

/**
 * Get scholarship by ID
 * @param {string} id - Scholarship ID
 * @returns {Promise} API response with scholarship data
 */
export const getScholarshipById = async (id) => {
    const response = await apiClient.get(`/scholarships/${id}`);
    return response.data;
};

/**
 * Create scholarship (Admin only)
 * @param {Object} payload - Scholarship data
 * @returns {Promise} API response
 */
export const createScholarship = async (payload) => {
    const response = await apiClient.post("/scholarships", payload);
    return response.data;
};

/**
 * Update scholarship (Admin only)
 * @param {string} id - Scholarship ID
 * @param {Object} payload - Updated scholarship data
 * @returns {Promise} API response
 */
export const updateScholarship = async (id, payload) => {
    const response = await apiClient.put(`/scholarships/${id}`, payload);
    return response.data;
};

/**
 * Delete scholarship (Admin only)
 * @param {string} id - Scholarship ID
 * @returns {Promise} API response
 */
export const deleteScholarship = async (id) => {
    const response = await apiClient.delete(`/scholarships/${id}`);
    return response.data;
};

/**
 * Apply for scholarship
 * @param {Object} payload - Application data
 * @param {string} payload.scholarshipId - Scholarship ID
 * @param {string} payload.essayId - Essay ID
 * @returns {Promise} API response
 */
export const applyForScholarship = async (payload) => {
    const response = await apiClient.post("/scholarships/apply", payload);
    return response.data;
};

/**
 * Get user's scholarship applications
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise} API response with applications list
 */
export const getMyApplications = async (params = {}) => {
    const response = await apiClient.get("/scholarships/applications", { params });
    return response.data;
};

// ==================== SUBSCRIPTIONS API ====================

/**
 * Get all subscription plans
 * @returns {Promise} API response with plans list
 */
export const getSubscriptionPlans = async () => {
    const response = await apiClient.get("/subscriptions/plans");
    return response.data;
};

/**
 * Get current user's subscription
 * @returns {Promise} API response with subscription data
 */
export const getMySubscription = async () => {
    const response = await apiClient.get("/subscriptions/my-subscription");
    return response.data;
};

/**
 * Subscribe to a plan
 * @param {Object} payload - Subscription data
 * @param {string} payload.planId - Plan ID
 * @param {string} payload.paymentMethodId - Payment method ID
 * @returns {Promise} API response
 */
export const subscribeToPlan = async (payload) => {
    const response = await apiClient.post("/subscriptions/subscribe", payload);
    return response.data;
};

/**
 * Cancel subscription
 * @returns {Promise} API response
 */
export const cancelSubscription = async () => {
    const response = await apiClient.post("/subscriptions/cancel");
    return response.data;
};

/**
 * Update subscription
 * @param {Object} payload - Updated subscription data
 * @param {string} payload.planId - New plan ID
 * @returns {Promise} API response
 */
export const updateSubscription = async (payload) => {
    const response = await apiClient.put("/subscriptions/update", payload);
    return response.data;
};

// ==================== ADMIN API ====================

/**
 * Get all users (Admin only)
 * @param {Object} params - Query parameters (optional)
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.search - Search query
 * @returns {Promise} API response with users list
 */
export const getAllUsers = async (params = {}) => {
    const response = await apiClient.get("/admin/users", { params });
    return response.data;
};

/**
 * Get user by ID (Admin only)
 * @param {string} id - User ID
 * @returns {Promise} API response with user data
 */
export const getUserById = async (id) => {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
};

/**
 * Create admin user (Admin only)
 * @param {Object} payload - Admin user data
 * @returns {Promise} API response
 */
export const createAdmin = async (payload) => {
    const response = await apiClient.post("/admin/users", payload);
    return response.data;
};

/**
 * Update user (Admin only)
 * @param {string} id - User ID
 * @param {Object} payload - Updated user data
 * @returns {Promise} API response
 */
export const updateUser = async (id, payload) => {
    const response = await apiClient.put(`/admin/users/${id}`, payload);
    return response.data;
};

/**
 * Delete user (Admin only)
 * @param {string} id - User ID
 * @returns {Promise} API response
 */
export const deleteUser = async (id) => {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
};

/**
 * Get admin dashboard overview
 * @returns {Promise} API response with dashboard overview data
 */
export const getAdminDashboardOverview = async () => {
    const response = await apiClient.get("/admin/dashboard/overview");
    return response.data;
};

/**
 * Get admin dashboard sales track
 * @param {string} type - Type of sales track (day, week, month)
* @returns {Promise} API response with sales track data
*/
export const getAdminDashboardSalesTrack = async (type) => {
    const response = await apiClient.get(`/admin/dashboard/sales-track?type=${type}`);
    return response.data;
};

/**
 * Get admin analytics revenue
* @returns {Promise} API response with revenue data
*/
export const getAdminAnalyticsRevenue = async () => {
    const response = await apiClient.get(`/admin/analytics/revenue`);
    return response.data;
};
/*
 * Get admin analytics overview
* @returns {Promise} API response with overview data
*/
export const getAdminAnalyticsOverview = async () => {
    const response = await apiClient.get(`/admin/analytics/overview`);
    return response.data;
};

/**
 * Get analytics data (Admin only)
 * @param {Object} params - Query parameters (optional)
 * @param {string} params.startDate - Start date
 * @param {string} params.endDate - End date
 * @returns {Promise} API response with analytics data
 */
export const getAnalytics = async (params = {}) => {
    const response = await apiClient.get("/admin/analytics", { params });
    return response.data;
};

/**
 * Get all subscriptions (Admin only)
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise} API response with subscriptions list
 */
export const getAllSubscriptions = async (params = {}) => {
    const response = await apiClient.get("/admin/subscriptions", { params });
    return response.data;
};

/**
 * Scrape scholarship data (Admin only)
 * @param {Object} payload - Scraping configuration
 * @returns {Promise} API response
 */
export const scrapeScholarshipData = async (payload) => {
    const response = await apiClient.post("/admin/scraping-data", payload);
    return response.data;
};

// ==================== FAQ API ====================

/**
 * Get all FAQs
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise} API response with FAQs list
 */
export const getFAQs = async (params = {}) => {
    const response = await apiClient.get("/faqs", { params });
    return response.data;
};

/**
 * Get FAQ by ID
 * @param {string} id - FAQ ID
 * @returns {Promise} API response with FAQ data
 */
export const getFAQById = async (id) => {
    const response = await apiClient.get(`/faqs/${id}`);
    return response.data;
};

/**
 * Create FAQ (Admin only)
 * @param {Object} payload - FAQ data
 * @param {string} payload.question - FAQ question
 * @param {string} payload.answer - FAQ answer
 * @param {string} payload.category - FAQ category
 * @returns {Promise} API response
 */
export const createFAQ = async (payload) => {
    const response = await apiClient.post("/admin/faqs", payload);
    return response.data;
};

/**
 * Update FAQ (Admin only)
 * @param {string} id - FAQ ID
 * @param {Object} payload - Updated FAQ data
 * @returns {Promise} API response
 */
export const updateFAQ = async (id, payload) => {
    const response = await apiClient.put(`/admin/faqs/${id}`, payload);
    return response.data;
};

/**
 * Delete FAQ (Admin only)
 * @param {string} id - FAQ ID
 * @returns {Promise} API response
 */
export const deleteFAQ = async (id) => {
    const response = await apiClient.delete(`/admin/faqs/${id}`);
    return response.data;
};

// ==================== SETTINGS API ====================

/**
 * Get app settings
 * @returns {Promise} API response with settings data
 */
export const getSettings = async () => {
    const response = await apiClient.get("/settings");
    return response.data;
};

/**
 * Update app settings (Admin only)
 * @param {Object} payload - Updated settings data
 * @returns {Promise} API response
 */
export const updateSettings = async (payload) => {
    const response = await apiClient.put("/admin/settings", payload);
    return response.data;
};

// ==================== GENERIC API METHODS ====================

/**
 * Generic GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @param {Object} config - Axios config
 * @returns {Promise} API response
 */
export const apiGet = async (endpoint, params = {}, config = {}) => {
    const response = await apiClient.get(endpoint, { params, ...config });
    return response.data;
};

/**
 * Generic POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} body - Request body
 * @param {Object} config - Axios config
 * @returns {Promise} API response
 */
export const apiPost = async (endpoint, body = {}, config = {}) => {
    const response = await apiClient.post(endpoint, body, config);
    return response.data;
};

/**
 * Generic PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} body - Request body
 * @param {Object} config - Axios config
 * @returns {Promise} API response
 */
export const apiPut = async (endpoint, body = {}, config = {}) => {
    const response = await apiClient.put(endpoint, body, config);
    return response.data;
};

/**
 * Generic PATCH request
 * @param {string} endpoint - API endpoint
 * @param {Object} body - Request body
 * @param {Object} config - Axios config
 * @returns {Promise} API response
 */
export const apiPatch = async (endpoint, body = {}, config = {}) => {
    const response = await apiClient.patch(endpoint, body, config);
    return response.data;
};

/**
 * Generic DELETE request
 * @param {string} endpoint - API endpoint
 * @param {Object} config - Axios config
 * @returns {Promise} API response
 */
export const apiDelete = async (endpoint, config = {}) => {
    const response = await apiClient.delete(endpoint, config);
    return response.data;
};

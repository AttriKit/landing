/**
 * Consultation form data structure
 */
export interface ConsultationData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  message?: string;
}

/**
 * API response structure
 */
export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

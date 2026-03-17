/**
 * Authentication & Registration Service
 * Handles student registration and validation
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Local storage keys
const STORAGE_KEYS = {
  STUDENT_ID: 'campusflow_student_id',
  STUDENT_NAME: 'campusflow_student_name',
  STUDENT_EMAIL: 'campusflow_student_email',
  STUDENT_PHONE: 'campusflow_student_phone',
};

/**
 * Register a new student (one-time)
 * @param {Object} data - Registration data
 * @param {string} data.studentName - Student's full name
 * @param {string} data.phoneNumber - WhatsApp phone number
 * @param {string} data.studentEmail - Gmail address
 * @returns {Promise<Object>} Registered student data with ID
 */
export const registerStudent = async (data) => {
  try {
    // Validate input
    if (!data.studentName || !data.phoneNumber || !data.studentEmail) {
      throw new Error('All fields are required');
    }

    console.log('📝 Registering student...', data);

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentName: data.studentName,
        phoneNumber: data.phoneNumber,
        studentEmail: data.studentEmail,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Registration failed');
    }

    // Store student info in localStorage
    const { student } = result;
    saveStudentToLocalStorage(student);

    console.log('✅ Registration successful:', student);
    return result;

  } catch (error) {
    console.error('❌ Registration error:', error.message);
    throw error;
  }
};

/**
 * Check if student is already registered
 * @returns {Object|null} Student data if registered, null otherwise
 */
export const getRegisteredStudent = () => {
  const studentId = localStorage.getItem(STORAGE_KEYS.STUDENT_ID);
  
  if (!studentId) {
    return null;
  }

  return {
    id: studentId,
    name: localStorage.getItem(STORAGE_KEYS.STUDENT_NAME),
    email: localStorage.getItem(STORAGE_KEYS.STUDENT_EMAIL),
    phoneNumber: localStorage.getItem(STORAGE_KEYS.STUDENT_PHONE),
  };
};

/**
 * Save student data to localStorage
 * @param {Object} student - Student data
 */
export const saveStudentToLocalStorage = (student) => {
  localStorage.setItem(STORAGE_KEYS.STUDENT_ID, student.id);
  localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, student.name);
  localStorage.setItem(STORAGE_KEYS.STUDENT_EMAIL, student.email);
  localStorage.setItem(STORAGE_KEYS.STUDENT_PHONE, student.phoneNumber);
};

/**
 * Clear student data and logout
 */
export const logoutStudent = () => {
  localStorage.removeItem(STORAGE_KEYS.STUDENT_ID);
  localStorage.removeItem(STORAGE_KEYS.STUDENT_NAME);
  localStorage.removeItem(STORAGE_KEYS.STUDENT_EMAIL);
  localStorage.removeItem(STORAGE_KEYS.STUDENT_PHONE);
  console.log('👋 Student logged out');
};

/**
 * Get student info from backend
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} Student data
 */
export const fetchStudentInfo = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/${studentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch student info');
    }

    return result.student;

  } catch (error) {
    console.error('❌ Error fetching student info:', error.message);
    throw error;
  }
};

/**
 * Check backend connection
 * @returns {Promise<boolean>} Connection status
 */
export const checkBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return false;
  }
};

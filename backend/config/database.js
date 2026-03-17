import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
export const initSupabase = () => {
  return createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
  );
};

// Database operations
export const db = {
  // Students table operations
  students: {
    /**
     * Create a new student
     */
    async register(studentData) {
      const supabase = initSupabase();
      
      // Check if email already exists
      const { data: existing } = await supabase
        .from('students')
        .select('id')
        .eq('email', studentData.email)
        .single();

      if (existing) {
        throw new Error('Email already registered');
      }

      // Create new student
      const { data, error } = await supabase
        .from('students')
        .insert([{
          name: studentData.name,
          email: studentData.email,
          phone_number: studentData.phoneNumber,
          created_at: new Date().toISOString(),
          is_active: true,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Get student by ID
     */
    async getById(studentId) {
      const supabase = initSupabase();
      
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', studentId)
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Get student by email
     */
    async getByEmail(email) {
      const supabase = initSupabase();
      
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Check if email exists
     */
    async emailExists(email) {
      const supabase = initSupabase();
      
      const { data, error } = await supabase
        .from('students')
        .select('id')
        .eq('email', email)
        .single();

      return !!data && !error;
    },
  },

  // Events table operations
  events: {
    /**
     * Create a new event
     */
    async create(eventData) {
      const supabase = initSupabase();
      
      const eventDateTime = new Date(`${eventData.date}T${eventData.time}:00`);

      const { data, error } = await supabase
        .from('events')
        .insert([{
          student_id: eventData.studentId,
          title: eventData.title,
          date: eventData.date,
          time: eventData.time,
          description: eventData.description || null,
          event_date_time: eventDateTime.toISOString(),
          created_at: new Date().toISOString(),
          status: 'pending',
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Get all events for a student
     */
    async getByStudentId(studentId) {
      const supabase = initSupabase();
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('student_id', studentId)
        .order('event_date_time', { ascending: true });

      if (error) throw error;
      return data;
    },

    /**
     * Get event by ID
     */
    async getById(eventId) {
      const supabase = initSupabase();
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Update event status
     */
    async updateStatus(eventId, status) {
      const supabase = initSupabase();
      
      const { data, error } = await supabase
        .from('events')
        .update({ status })
        .eq('id', eventId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },
};

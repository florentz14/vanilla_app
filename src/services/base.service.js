import api from '../api';

/**
 * Base service class with common HTTP methods
 */
class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  /**
   * Get all items
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>}
   */
  async getAll(params = {}) {
    try {
      const { data } = await api.get(`/${this.endpoint}`, { params });
      return data;
    } catch (error) {
      console.error(`Error fetching ${this.endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get item by ID
   * @param {string|number} id - Item ID
   * @returns {Promise<Object>}
   */
  async getById(id) {
    try {
      const { data } = await api.get(`/${this.endpoint}/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching ${this.endpoint} ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create new item
   * @param {Object} data - Item data
   * @returns {Promise<Object>}
   */
  async create(data) {
    try {
      const response = await api.post(`/${this.endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error creating ${this.endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Update item
   * @param {string|number} id - Item ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    try {
      const response = await api.put(`/${this.endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${this.endpoint} ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete item
   * @param {string|number} id - Item ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      await api.delete(`/${this.endpoint}/${id}`);
    } catch (error) {
      console.error(`Error deleting ${this.endpoint} ${id}:`, error);
      throw error;
    }
  }
}

export default BaseService;

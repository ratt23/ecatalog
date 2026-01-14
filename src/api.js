// API helper for catalog endpoints
const API_BASE = import.meta.env.VITE_API_BASE || '/.netlify/functions';

export const catalogAPI = {
    // Get catalog archive (paginated)
    async getArchive(page = 1, limit = 20, admin = false) {
        const params = new URLSearchParams({ page, limit, admin: admin.toString() });
        const response = await fetch(`${API_BASE}/newsletter-archive?${params}`);
        if (!response.ok) throw new Error('Failed to fetch archive');
        return response.json();
    },

    // Get specific catalog by year and month
    async getByYearMonth(year, month) {
        const params = new URLSearchParams({ year, month });
        const response = await fetch(`${API_BASE}/newsletter-issue?${params}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch catalog');
        }
        return response.json();
    },

    // Get catalog by ID
    async getById(id) {
        const params = new URLSearchParams({ id });
        const response = await fetch(`${API_BASE}/newsletter-issue?${params}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch catalog');
        }
        return response.json();
    },

    // Create or update catalog
    async upsert(data) {
        const response = await fetch(`${API_BASE}/newsletter-upsert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to save catalog');
        }
        return response.json();
    },

    // Toggle publish status
    async togglePublish(id) {
        const params = new URLSearchParams({ id });
        const response = await fetch(`${API_BASE}/newsletter-issue?${params}`, {
            method: 'PUT'
        });
        if (!response.ok) throw new Error('Failed to toggle publish status');
        return response.json();
    },

    // Delete catalog
    async delete(id) {
        const params = new URLSearchParams({ id });
        const response = await fetch(`${API_BASE}/newsletter-issue?${params}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete catalog');
        return response.json();
    }
};

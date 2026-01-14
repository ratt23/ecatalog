// Custom hook to fetch white label settings from Dashboard
import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_DASHBOARD_API || 'https://dashdev2.netlify.app/.netlify/functions';

export function useWhiteLabel() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSettings() {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE}/api/settings`);

                if (!response.ok) {
                    throw new Error('Failed to fetch settings');
                }

                const data = await response.json();

                // Transform API response to usable format
                const transformed = {
                    logoUrl: data['site_logo_url']?.value || '/asset/logo/logo.png',
                    themeColor: data['site_theme_color']?.value || '#0047AB',
                    hospitalName: data['hospital_name']?.value || 'RSU Siloam Ambon',
                    hospitalShortName: data['hospital_short_name']?.value || 'Siloam Ambon',
                    hospitalTagline: data['hospital_tagline']?.value || 'Emergency & Contact Center',
                    hospitalPhone: data['hospital_phone']?.value || '1-500-911',
                    hospitalAddress: data['hospital_address']?.value || 'Jl. Sultan Hasanudin, Tantui, Ambon',
                    hospitalEmail: data['hospital_email']?.value || 'info@siloamhospitals.com',
                    categoryCovers: data['category_covers']?.value
                        ? JSON.parse(data['category_covers']?.value)
                        : {
                            'tarif-kamar': '/asset/categories/placeholder.png',
                            'fasilitas': '/asset/categories/placeholder.png',
                            'layanan-unggulan': '/asset/categories/placeholder.png',
                            'contact-person': '/asset/categories/placeholder.png'
                        },
                    contactEmergency: data['hospital_phone']?.value || '(0911) 344 8888',
                    contactCs: data['hospital_phone']?.value || '(0911) 351 000', // fallback to same number
                    ecatalogEnabled: data['ecatalog_enabled']?.value === 'true' || data['ecatalog_enabled']?.value === true || true, // default to enabled
                    categoryVisibility: data['category_visibility']?.value
                        ? (typeof data['category_visibility']?.value === 'string' ? JSON.parse(data['category_visibility']?.value) : data['category_visibility']?.value)
                        : {
                            'tarif-kamar': true,
                            'fasilitas': true,
                            'layanan-unggulan': true,
                            'contact-person': true
                        }
                };

                setSettings(transformed);
                setError(null);
            } catch (err) {
                console.error('Error fetching white label settings:', err);
                setError(err.message);
                // Set defaults on error
                setSettings({
                    hospitalName: 'RSU Siloam Ambon',
                    hospitalShortName: 'Siloam Ambon',
                    hospitalTagline: 'Emergency & Contact Center',
                    hospitalPhone: '1-500-911',
                    hospitalAddress: 'Jl. Sultan Hasanudin, Tantui, Ambon',
                    hospitalEmail: 'info@siloamhospitals.com',
                    logoUrl: '/asset/logo/logo.png',
                    themeColor: '#0047AB',
                    categoryCovers: {
                        'tarif-kamar': '/asset/categories/placeholder.png',
                        'fasilitas': '/asset/categories/placeholder.png',
                        'layanan-unggulan': '/asset/categories/placeholder.png',
                        'contact-person': '/asset/categories/placeholder.png'
                    },
                    contactEmergency: '(0911) 344 8888',
                    contactCs: '(0911) 351 000',
                    ecatalogEnabled: true, // default to enabled on error
                    categoryVisibility: {
                        'tarif-kamar': true,
                        'fasilitas': true,
                        'layanan-unggulan': true,
                        'contact-person': true
                    }
                });
            } finally {
                setLoading(false);
            }
        }

        fetchSettings();
    }, []);

    return { settings, loading, error };
}

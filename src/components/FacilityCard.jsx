// Facility Thumbnail Card Component
import React from 'react';

export default function FacilityCard({ item, onClick }) {
    return (
        <div
            className="facility-card"
            onClick={() => onClick(item)}
        >
            <div className="facility-thumbnail">
                <img
                    src={item.image_url ? (item.image_url.includes('res.cloudinary.com') ? item.image_url.replace('https://res.cloudinary.com', '/cloudinary-proxy') : item.image_url) : '/asset/categories/fasilitas.png'}
                    alt={item.title}
                    className="facility-image"
                    onError={(e) => {
                        if (e.target.src.includes('/cloudinary-proxy')) {
                            e.target.src = item.image_url;
                        } else {
                            e.target.src = '/asset/categories/fasilitas.png';
                        }
                    }}
                />
                <div className="facility-overlay">
                    <h3 className="facility-title text-white">{item.title}</h3>
                    <span className="facility-view-more">Lihat Detail</span>
                </div>
            </div>
        </div>
    );
}

// Reusable Room Card Component
import React from 'react';

export default function RoomCard({ item, onImageClick }) {
    return (
        <div className="room-class-card">
            <div
                className="room-card-image"
                onClick={() => onImageClick(item.image_url)}
            >
                <img src={item.image_url || '/asset/categories/tarif_kamar.png'} alt={item.title} />
                <div className="card-image-overlay">Lihat Foto</div>
            </div>
            <div className="room-badge">{item.title}</div>
            {item.price && <div className="room-price">{item.price}</div>}
            {item.features && item.features.length > 0 && (
                <ul className="room-features">
                    {item.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

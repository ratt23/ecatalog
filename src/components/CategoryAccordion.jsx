import React, { useState } from 'react';
import { ChevronDown, X, Construction } from 'lucide-react';

export default function CategoryAccordion({ activeCategory, setActiveCategory, categoryCovers = {}, categoryVisibility = {} }) {
    const CATEGORIES = [
        {
            id: 'tarif-kamar',
            title: 'Tarif Kamar',
            image: categoryCovers['tarif-kamar'] || '/asset/categories/placeholder.svg',
            description: 'Informasi lengkap mengenai tipe kamar, fasilitas rawat inap, dan tarif harian terbaru.'
        },
        {
            id: 'fasilitas',
            title: 'Fasilitas',
            image: categoryCovers['fasilitas'] || '/asset/categories/placeholder.svg',
            description: 'Teknologi medis terkini dan fasilitas penunjang untuk kenyamanan pasien.'
        },
        {
            id: 'layanan-unggulan',
            title: 'Layanan Unggulan',
            image: categoryCovers['layanan-unggulan'] || '/asset/categories/placeholder.svg',
            description: 'Pusat layanan kesehatan dengan tenaga medis spesialis dan peralatan modern.'
        },
        {
            id: 'contact-person',
            title: 'Contact Person',
            image: categoryCovers['contact-person'] || '/asset/categories/placeholder.svg',
            description: 'Layanan bantuan 24 jam dan informasi pendaftaran pasien.'
        }
    ];

    const handleCategoryClick = (id) => {
        // Prevent navigation to disabled categories
        if (categoryVisibility[id] === false) {
            return; // Do nothing for disabled categories
        }

        if (activeCategory === id) {
            // Close: scroll back to top
            setActiveCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Open: set active and scroll to content
            setActiveCategory(id);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const headerHeight = 180; // Fixed header height when active
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };


    const activeCat = CATEGORIES.find(cat => cat.id === activeCategory);

    return (
        <>
            {/* Fixed Header when category is active */}
            {activeCat && (
                <div className="fixed-category-header">
                    <div className="header-background" style={{ backgroundImage: `url(${activeCat.image})` }}>
                        <div className="header-overlay" />
                    </div>
                    <div className="header-content-wrapper">
                        <div className="header-info">
                            <h2 className="active-title">{activeCat.title}</h2>
                            <p className="active-description">{activeCat.description}</p>
                        </div>
                        <button
                            className="close-header-btn"
                            onClick={() => handleCategoryClick(activeCat.id)}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}

            {/* Category Menu - Only visible when no category is active */}
            {!activeCategory && (
                <div className="category-accordion-wrapper">
                    <div className="accordion-container">
                        {CATEGORIES.map((cat) => {
                            const isDisabled = categoryVisibility[cat.id] === false;
                            return (
                                <div
                                    key={cat.id}
                                    className={`accordion-item ${isDisabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                                    onClick={() => !isDisabled && handleCategoryClick(cat.id)}
                                    style={isDisabled ? { pointerEvents: 'none' } : {}}
                                >
                                    <div className="accordion-image-bg" style={{ backgroundImage: `url(${cat.image})` }}>
                                        <div className="image-overlay" />
                                        {isDisabled && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <div className="text-center">
                                                    <Construction size={32} className="mx-auto mb-2 text-orange-400" />
                                                    <span className="text-white font-semibold text-sm">Coming Soon</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="accordion-content">
                                        <div className="accordion-header">
                                            <h3 className="cat-title">{cat.title}</h3>
                                            {isDisabled ? (
                                                <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">Coming Soon</span>
                                            ) : (
                                                <ChevronDown className="chevron-icon" size={20} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

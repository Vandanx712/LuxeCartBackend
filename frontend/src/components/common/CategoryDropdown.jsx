import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { FiChevronRight, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const CategoryDropdown = ({onclose}) => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function loadCategory() {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/product/allcategoyandsubcategory`
                );
                setCategoriesData(data.categories || []);
            } catch (err) {
                console.error("Error loading categories:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const structuredData = useMemo(() => {
        const parentMap = new Map();
        const subMap = {};

        for (const cat of categoriesData) {
            const { _id: scid, name: scname, parent } = cat;
            const { _id: pcid, name: pcname } = parent;

            if (!parentMap.has(pcid)) {
                parentMap.set(pcid, pcname);
                subMap[pcid] = [];
            }

            subMap[pcid].push({ scid, scname });
        }

        return {
            categories: Array.from(parentMap.entries()).map(([pcid, pcname]) => ({ pcid, pcname })),
            subcategories: subMap,
        };
    }, [categoriesData]);

    if (loading) {
        return (
            <div className="absolute right-4 md:right-30 top-5 sm:top-23 bg-white shadow-2xl border border-warmgrey/20 rounded-lg z-50 animate-fade-in max-h-[90vh] overflow-y-auto w-[90vw] sm:w-[600px]">
                <p className="text-warmgrey font-manrope text-sm">Loading categories...</p>
            </div>
        );
    }

    return (
        <div className="fixed right-4 md:right-30 top-5 sm:top-23 bg-white shadow-2xl border border-warmgrey/20 rounded-lg z-50 animate-fade-in max-h-[90vh] overflow-y-auto w-[90vw] sm:w-[600px]">
            <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6 pb-2 sm:pb-4 border-b border-warmgrey/20">
                    <h3 className="font-Playfair text-xl text-royalpurple">
                        Our Categories
                    </h3>
                    <button className="text-xl" onClick={onclose}>
                        <FiX/>
                    </button>
                </div>

                {/* Category Grid */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {structuredData.categories.map((cat, index) => (
                        <div
                            key={cat.pcid}
                            className="space-y-2 sm:space-y-3"
                        >
                            <h4 className="font-Manrope text-DeepNavy text-lg uppercase tracking-wide border-b border-gold/30 pb-1 sm:pb-2">
                                {cat.pcname}
                            </h4>
                            <ul className="space-y-1 sm:space-y-2">
                                {(structuredData.subcategories[cat.pcid] || []).map((sub) => (
                                    <li key={sub.scid}>
                                        <Link
                                            to={`/category/${cat.pcid}/${sub.scid}`}
                                            onClick={onclose}
                                            className="font-manrope text-[16px] text-warmgrey hover:text-DeepNavy transition-colors duration-200 flex items-center gap-2 group"
                                        >
                                            <span>{sub.scname}</span>
                                            <FiChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CategoryDropdown;

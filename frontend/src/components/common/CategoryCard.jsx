import React from 'react';

const CategoryCard = ({ categoryImage, categoryName }) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <img
        src={categoryImage}
        alt={categoryName}
        className="w-52 h-52 rounded-full object-cover border border-gray-300 shadow-md"
      />
      <span className="text-sm font-medium text-gray-700">{categoryName}</span>
    </div>
  );
};

export default CategoryCard;
  
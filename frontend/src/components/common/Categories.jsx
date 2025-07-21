import React from "react";
import { CategoryImage } from "../../assets/assets";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <div className="my-16 px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {CategoryImage.map((category, index) => (
          <CategoryCard
            key={index}
            categoryImage={category.categoryImage}
            categoryName={category.categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

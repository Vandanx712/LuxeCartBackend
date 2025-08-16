import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      id: '680b61ca298fe21c4b614c2f',
      title: "Appliances",
      description: " Refrigerators, Washing Machines & More",
      image: 'https://i.pinimg.com/1200x/53/0b/73/530b73b40dbb92fb2c247b1f6c5ef76a.jpg',
      bgColor: "bg-gradient-to-br from-DeepNavy to-deep-navy-dark",
      textColor: "text-offwhite"
    },
    {
      id: '680b610c2f2db366bd9cea50',
      title: "Fashion",
      description: "Clothing, Shoes & Accessories",
      image: 'https://i.pinimg.com/736x/12/22/47/1222478a9301cbe09a3ad16aef5f5813.jpg',
      bgColor: "bg-gradient-to-br from-richbrown to-CharcoalBlack",
      textColor: "text-offwhite"
    },
    {
      id: '680b6216298fe21c4b614c38',
      title: "Home & Furniture",
      description: "Furniture, Appliances & Decor",
      image: 'https://i.pinimg.com/1200x/b9/13/49/b913490c7260c11d94cd18c143f6797a.jpg',
      bgColor: "bg-gradient-to-br from-emeraldgreen to-DeepNavy",
      textColor: "text-offwhite"
    },
    {
      id: '68160b4e09a6b13f78c431f3',
      title: "Moblies",
      description: "Smartphones, Chargers & More",
      image: 'https://i.pinimg.com/1200x/99/64/a2/9964a202c67115b1f40714082848c312.jpg',
      bgColor: "bg-gradient-to-br from-royalpurple to-deep-navy-dark",
      textColor: "text-offwhite"
    },
    {
      id: 5,
      title: "Sports & Fitness",
      description: "Equipment, Apparel & Gear",
      image: 'https://i.pinimg.com/1200x/39/4a/85/394a8514c21be4c0fc80e3d2a9879019.jpg',
      bgColor: "bg-gradient-to-br from-DeepNavy to-emeraldgreen",
      textColor: "text-offwhite"
    },
    {
      id: 6,
      title: "Beauty & Toys",
      description: "Cosmetics, Skincare & Toys",
      image: 'https://i.pinimg.com/736x/51/3d/d2/513dd29d2d5b57fb38e0e334cc7bad69.jpg',
      bgColor: "bg-gradient-to-br from-gold to-royalpurple",
      textColor: "text-offwhite"
    }
  ];
  const navigate = useNavigate()
  return (
    <>
      <section className="py-16 px-4 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-Playfair bg-gradient-to-tl from-royalpurple to-DeepNavy bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="font-Monrope text-lg text-warmgrey max-w-2xl mx-auto">
              Discover our curated collection across all categories. From electronics to fashion, find everything you need in one place.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl shadow-elegant hover:shadow-hover transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                onClick={()=>navigate(`/category/${category.id}/0`)}
              >
                {/* Background Gradient */}
                <div className={`${category.bgColor} absolute inset-0 z-10`} />

                {/* Category Image */}
                <div className="relative z-20 overflow-hidden">
                  <img
                    src={category.image}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className={`font-Playfair text-2xl ${category.textColor} mb-2`}>
                      {category.title}
                    </h3>
                    <p className={`font-Manrope text-sm ${category.textColor} opacity-90 mb-4`}>
                      {category.description}
                    </p>

                    {/* Call to Action */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="inline-flex items-center text-gold font-Manrope font-medium text-sm">
                        <span>Explore Collection</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 z-40 rounded-lg transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;

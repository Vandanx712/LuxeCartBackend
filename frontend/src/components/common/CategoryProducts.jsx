import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiCheck, FiFilter, FiX } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import ProductCard from './ProductCard'

function CategoryProducts() {
  const pcid = useParams().pcid
  const id = useParams().scid
  const [category, setCategory] = useState({})
  const [subcategories, setSubCategorys] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedSubCategory, setSelectedSubCategory] = useState(id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalproduct, setTotalProduct] = useState(0)
  const [page, setPage] = useState(1)

  const hasActiveFilters = selectedSubCategory !== 'all'


  useEffect(() => {
    window.scrollTo(0,0)
    loadcategory()
    loadsubcategory()
    loadproducts()
  }, [])

  const loadcategory = async () => {
    try {
      const catresponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/category/${pcid}`)
      setCategory(catresponse.data.category)
    } catch (error) {
      console.log(error)
    }
  }

  const loadsubcategory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/getsubcategory/${pcid}`)
      setSubCategorys(response.data.subcategory)
    } catch (error) {
      console.log(error)
    }
  }

  const loadproducts = async (ans) => {
    try {
      if(id == 0) loadcatproduct()
      const catid = ans == true ? pcid : selectedSubCategory
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/searchby/${catid}`)
      setFilteredProducts(response.data.products)
      setTotalProduct(response.data.totalproducts)
    } catch (error) {
      console.log(error)
    }
  }

  const loadcatproduct = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/searchby/${pcid}`)
      setFilteredProducts(response.data.products)
      setTotalProduct(response.data.totalproducts)
    } catch (error) {
      console.log(error)
    }
  }

  const productFilter = async (scid) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/searchby/${scid}`)
      setFilteredProducts(response.data.products)
      setTotalProduct(response.data.totalproducts)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubCategoryClick = (subcategoryId) => {
    setIsSidebarOpen(false)
    if (selectedSubCategory == subcategoryId) {
      setSelectedSubCategory('all')
      loadproducts(true)
    }
    else {
      setSelectedSubCategory(subcategoryId)
      productFilter(subcategoryId)
    }
  }

  const clearFilters = () => {
    setIsSidebarOpen(false)
    setSelectedSubCategory('all')
    loadproducts(true)
  };

  return (
    <>
      <div className=' mt-24'>
        <div className="min-h-screen bg-offwhite font-Manrope">
          {/* Main Content with Sidebar Layout */}
          <div className="flex">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <div className={`
          fixed xl:sticky top-0 left-0 h-screen xl:h-auto w-80 xl:w-72 
          bg-white shadow-md xl:shadow-none border-r border-warmgrey/20 
          transform transition-transform duration-300 z-50 xl:z-auto xl:transform-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
          overflow-y-auto
        `}>
              {/* Header */}
              <div className="p-4 border-b border-warmgrey/20 flex items-center justify-between">
                <h3 className="font-Playfair text-xl md:text-2xl font-semibold text-DeepNavy">
                  Filters
                </h3>
                <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-royalpurple text-[17px] font-Manrope hover:text-DeepNavy transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="xl:hidden p-1 hover:bg-warmgrey/10 rounded-md transition-colors"
                  >
                    <FiX className="h-5 w-5 text-warmgrey" />
                  </button>
                </div>
              </div>

              {/* Filter Sections */}
              <div className="p-4 space-y-6">
                {/* Category Filter */}
                <div className="space-y-3">
                  <h4 className="font-sans text-DeepNavy text-xl">Category</h4>
                  <span className={`text-[17px] font-Manrope text-royalpurple p-5`}>
                    {category.name}
                  </span>
                </div>
                {/* Discount Filter */}
                <div className="space-y-3">
                  <h4 className="font-sans text-xl  text-DeepNavy">Sub-Category</h4>
                  <div className="space-y-2 ">
                    {subcategories.map(subcategory => (
                      <div key={subcategory._id} className="flex items-center cursor-pointer space-x-3 group" onClick={() => handleSubCategoryClick(subcategory._id)}>
                        <div
                          className={`w-4 h-4 rounded-sm text-royalpurple border border-warmgrey focus:ring-royalpurple ${selectedSubCategory !== 'all' && selectedSubCategory == subcategory._id ? 'bg-gray-500' : ''}`}
                        >
                          <FiCheck size={15} className={`text-white ${selectedSubCategory !== 'all' && selectedSubCategory == subcategory._id ? 'block' : 'hidden'}`} />
                        </div>
                        <span className={`text-[15px] font-Manrope group-hover:text-royalpurple transition-colors ${selectedSubCategory !== 'all' && selectedSubCategory == subcategory._id ? 'text-royalpurple' : 'text-gray-500'}`}>
                          {subcategory.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Product Area */}
            <div className="flex-1 min-h-screen">
              {/* Product Header */}
              <div className="bg-white border-b border-warmgrey/20 p-4 sticky top-0 z-30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="xl:hidden flex items-center gap-2 px-3 py-2 border border-warmgrey/30 rounded-md text-DeepNavy hover:bg-warmgrey/5 transition-colors"
                    >
                      <FiFilter className="h-4 w-4" />
                      <span className="font-Manrope text-sm">Filters</span>
                    </button>

                    <div className="flex items-baseline gap-4">
                      <h2 className="font-Playfair text-xl md:text-2xl font-semibold text-DeepNavy">
                        Products
                      </h2>
                      <span className="text-warmgrey font-Manrope text-sm">
                        ({totalproduct} Products)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="p-4 xl:p-6">
                {filteredProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-7 xl:gap-10">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product._id} {...product} />
                      ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-12">
                      <button className="bg-DeepNavy text-offwhite px-12 py-4 rounded-full font-Manrope hover:bg-gold hover:text-CharcoalBlack transition-all duration-300 transform hover:scale-105">
                        Load More Products
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 mx-auto mb-6 bg-warmgrey/20 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-warmgrey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.22 0-4.239.881-5.71 2.291" />
                        </svg>
                      </div>
                      <h3 className="font-Playfair text-2xl font-semibold text-DeepNavy mb-4">
                        No products found
                      </h3>
                      <p className="text-warmgrey font-Manrope mb-6">
                        We couldn't find any products matching your current filters. Try adjusting your search criteria.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryProducts

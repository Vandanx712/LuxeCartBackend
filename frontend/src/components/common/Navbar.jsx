import { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { IoHeartOutline, IoNotificationsOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux'
import {setcartitems} from '../../redux/cartslice'
import CartModal from "../buyer/Cartmodel";
import toast from "react-hot-toast";


const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAccount, SetIsAccount] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlist,setWishlist] = useState(0)
  const [cart,setCart] = useState([])
  const [cartTotal,setCartTotal] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartRef = useRef(null);
  const accountRef = useRef(null);

  const closecart = () => {
    setIsCartOpen(false)
  };

  const toggleAccount = () => {
    setIsAccountOpen((prev) => {
      if (!prev) setIsCartOpen(false);
      return !prev;
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsCartOpen(false);
    setIsAccountOpen(false);
  };

  useEffect(() => {

    const user = localStorage.getItem('id')
    if (user) SetIsAccount(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
        setIsAccountOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  async function loadWishlist() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/buyer/listproducts`,{withCredentials:true})
      setWishlist(response.data.wishlistProducts.products.length)
    } catch (error) {
      toast.error(error.response)
      console.log(error)
    }
  }
  
  async function loadCart() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/buyer/cartproducts`,{withCredentials:true})
      setCart(response.data.cartProducts.items)
      setCartTotal(response.data.cartProducts.totalprice)
      const cartItems = cart.map((item)=>({pid:item.product,vid:item.variant,name:item.productDetails.name,qty:item.quantity,price:item.variantDetails.price,discount_price:item.variantDetails.discount_price,img:item.productDetails.images[0]}))
      dispatch(setcartitems(cartItems))
    } catch (error) {
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
  
  useEffect(()=>{
    loadCart()
    loadWishlist()
  },[])

  const accountItems = [
    "My Account",
    "Flowbite",
    "My Wallet",
    "My Orders",
    "Delivery Addresses",
    "Settings",
    "Helpdesk",
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 font-Monrope transition-all duration-300 ${isScrolled
      ? 'bg-white/9 backdrop-blur-md shadow-lg border-b-0 border-gray-300'
      : 'bg-white'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between lg:h-21 h-17 items-center">
          {/* Logo */}
          <div className="flex items-start">
            <h1 className="text-2xl lg:text-3xl font-Playfair font-bold bg-gradient-to-r from-[#1E3A5F] via-[#5E3A9A] to-[#D4AF37] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              LuxeCart
            </h1>
          </div>

          {/* Desktop Search & Menu */}
          <div className="hidden md:flex flex-1 items-center justify-center px-4 mx-5">
            <form className=" w-auto p-2">
              <div className="flex bg-white/80 border border-gray-200/50 rounded-2xl ">
                <input
                  className="flex-1 outline-none px-4 py-3 text-gray-600 placeholder-gray-400 bg-transparent"
                  type="text"
                  placeholder="Search Products and Categories"
                />
                <button className=" bg-[#5E3A9A] hover:bg-[#4a2c8a] text-white px-4 py-1 rounded-r-2xl ">
                  <FaSearch className=" text-[#D4AF37]" />
                </button>
              </div>
            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center lg:space-x-7 space-x-5">
            <div className="relative">
              <button className="flex items-center text-[#1E3A5F] hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 transform group">
                <IoHeartOutline size={25} />
                <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-[#F8F8F8]  w-4 h-4 text-xs rounded-full px-1">{wishlist}</span>
              </button>
            </div>

            {/* Cart */}
            <div className="relative" ref={cartRef}>
              <button onClick={() => setIsCartOpen(!isCartOpen)} className="flex items-center text-[#1E3A5F] hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 transform group">
                <HiOutlineShoppingCart size={25} />
                <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-[#F8F8F8]  w-4 h-4 text-xs rounded-full px-1">{cart.length}</span>
              </button>

              {isCartOpen && (
                <CartModal onClose={closecart} cartTotal={cartTotal}/>
              )}
            </div>

            {isAccount && (
              <div className="relative">
                <button className="flex items-center text-[#1E3A5F] hover:text-[#D4AF37] transition-colors duration-300 hover:scale-105 transform group">
                  <IoNotificationsOutline size={25} />
                  <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-[#F8F8F8]  w-4 h-4 text-xs rounded-full px-1">6</span>
                </button>
              </div>
            )}

            {/* Account */}
            {isAccount ? (<div className="relative" ref={accountRef}>
              <button onClick={() => setIsAccountOpen(!isAccountOpen)} className="flex items-center text-[#1E3A5F] hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 transform grou">
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="avatar"
                  className="w-9 h-9 rounded-full"
                />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-900 rounded-lg shadow-lg p-4 z-50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div>
                      <p className="font-bold">Hello, John Doe</p>
                      <p className="text-sm text-gray-500">john@example.com</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="hover:underline cursor-pointer">My Account</li>
                    <li className="hover:underline cursor-pointer">My Orders</li>
                    <li className="hover:underline cursor-pointer">Settings</li>
                    <li className="hover:underline cursor-pointer">Favourites</li>
                    <li className="hover:underline cursor-pointer">Delivery Addresses</li>
                    <li className="hover:underline cursor-pointer text-red-500">Log Out</li>
                  </ul>
                </div>
              )}
            </div>) : (
              <div className="relative">
                <button className="flex items-center text-[#1E3A5F] hover:text-[#D4AF37] transition-colors duration-300 hover:scale-105 transform group" onClick={()=>{navigate('/login')}}>
                  <FiLogIn size={25} />
                  <span className=" text-[20px]">Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-2 space-y-2 bg-[#1E3A5F]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-lg text-gray-900 focus:outline-none"
          />
          <button className="flex items-center text-white">
            <FaShoppingCart className="mr-1" />
          </button>
          <button className="flex items-center text-white">
            <FaUser className="mr-1" /> Account
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { IoHeartOutline, IoNotificationsOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch ,useSelector} from 'react-redux'
import { setcartitems } from '../../redux/cartslice'


const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAccount, SetIsAccount] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState(0)
  const [cart, setCart] = useState(cartItems.length)
  const [profilepic,setProfilepic] = useState('')
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
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/buyer/listproducts`, { withCredentials: true })
      setWishlist(response.data.wishlistProducts.products.length)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadCart() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/buyer/cartproducts`, { withCredentials: true })
      const items = response.data.cartProducts?.items;
      const total = response.data.cartProducts?.totalprice;

      setCart(items.length ?? 0);

      const cartItems = items.map((item) => {
        const pid = item.product;
        const vid = item.variant;
        const name = item.productDetails.name;
        const qty = item.quantity;
        const price = item.variantDetails.price;
        const discount_price = item.variantDetails.discount_price;
        const img = item.productDetails.images?.[0] ?? '';

        return {
          pid,
          vid,
          name,
          qty,
          price,
          discount_price,
          img,
        };
      });

      dispatch(setcartitems(cartItems));
    } catch (error) {
      console.log(error)
    }
  }

  async function getpic() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profilepic/get`,{withCredentials:true})
      setProfilepic(response.data.profilepic)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadCart()
    loadWishlist()
    getpic()
  }, [])

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
            <div className="relative sm:block hidden">
              <button className="flex items-center text-[#1E3A5F] hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 transform group">
                <IoHeartOutline size={25} />
                <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-[#F8F8F8]  w-4 h-4 text-xs rounded-full px-1">{wishlist}</span>
              </button>
            </div>

            {/* Cart */}
            <div className="relative" ref={cartRef}>
              <button onClick={() => setIsCartOpen(!isCartOpen)} className="flex items-center text-[#1E3A5F] hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 transform group">
                <HiOutlineShoppingCart size={25} />
                <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-[#F8F8F8]  w-4 h-4 text-xs rounded-full px-1">{cart}</span>
              </button>

              {isCartOpen && (
                navigate('/buyer/cart')
              )}
            </div>

            {isAccount && (
              <div className="relative sm:block hidden">
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
                  src={profilepic}
                  alt="avatar"
                  className="w-9 h-9 rounded-full"
                />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-offwhite border border-warmgrey/20 text-charcoalblack rounded-lg shadow-lg p-4 z-50">
                  <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-warmgrey/20">
                    <div className="w-10 h-10 bg-royalpurple rounded-full flex items-center justify-center">
                      {!profilepic && (<span className="text-offwhite font-Playfair font-medium text-sm">JD</span>)}
                    </div>
                    <div>
                      <p className="font-Playfair font-medium text-charcoalblack">Hello, John Doe</p>
                      <p className="text-sm text-warmgrey font-Manrope">john@example.com</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="hover:text-royalpurple hover:bg-royalpurple/5 cursor-pointer py-2 px-2 rounded-md transition-colors font-Manrope">
                      My Account
                    </li>
                    <li className="hover:text-royalpurple hover:bg-royalpurple/5 cursor-pointer py-2 px-2 rounded-md transition-colors font-Manrope">
                      My Orders
                    </li>
                    <li className=" sm:hidden hover:text-royalpurple hover:bg-royalpurple/5 cursor-pointer py-2 px-2 rounded-md transition-colors font-Manrope">
                      Notifications
                    </li>
                    <li className=" sm:hidden hover:text-royalpurple hover:bg-royalpurple/5 cursor-pointer py-2 px-2 rounded-md transition-colors font-Manrope">
                      Favourites
                    </li>
                    <li className="hover:text-royalpurple hover:bg-royalpurple/5 cursor-pointer py-2 px-2 rounded-md transition-colors font-Manrope">
                      Delivery Addresses
                    </li>
                    <li className="hover:text-red-600 hover:bg-red-100 cursor-pointer py-2 px-2 rounded-md transition-colors font-Manrope text-red-500">
                      <Link to={'/login'}>
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>) : (
              <div className="relative">
                <button className="flex items-center text-[#1E3A5F] hover:text-[#D4AF37] transition-colors duration-300 hover:scale-105 transform group" onClick={() => { navigate('/login') }}>
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

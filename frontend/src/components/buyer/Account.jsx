import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiPackage, FiBell, FiHeart, FiMapPin, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import axios from 'axios';


const AccountPage = () => {
    const [activeSection, setActiveSection] = useState('My Account');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [buyer, setBuyer] = useState({})

    const menuItems = [
        { name: 'My Account', icon: FiUser },
        { name: 'My Orders', icon: FiPackage },
        { name: 'Notifications', icon: FiBell },
        { name: 'Favourites', icon: FiHeart },
        { name: 'Delivery Addresses', icon: FiMapPin },
    ];

    useEffect(() => {
        loadBuyer()
    }, [])
    async function loadBuyer() {
        try {
            const id = localStorage.getItem('id')
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/buyer/get/${id}`, { withCredentials: true })
            setBuyer(response.data.buyer)
        } catch (error) {
            console.log(error)
        }
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'My Account':
                return (
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-Playfair font-medium text-CharcoalBlack mb-6">My Account</h2>
                        <div className="bg-warmgrey/15 rounded-lg p-6 mb-6">
                            <div className="flex items-center space-x-4 mb-6">
                                {buyer.profileImg && (
                                    <div className='w-17 h-17 rounded-full flex items-center border border-warmgrey/20'>
                                        <img
                                            src={buyer.profileImg}
                                        />
                                    </div>
                                )}
                                {!buyer.profileImg && (
                                    <div className="w-17 h-17 bg-royalpurple rounded-full flex items-center justify-center">
                                        <span className="text-offwhite font-Playfair font-medium text-xl">{buyer.name}</span>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-Playfair font-medium text-CharcoalBlack">{buyer.username}</h3>
                                    <p className="text-gray-500 font-Manrope">{buyer.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-Manrope text-CharcoalBlack mb-2">Username</label>
                                    <input
                                        type="text"
                                        defaultValue={buyer.username}
                                        className="w-full px-3 py-2 border bg-white border-warmgrey/30 rounded-md font-Manrope focus:outline-none focus:border-royalpurple"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-Manrope text-CharcoalBlack mb-2">Name</label>
                                    <input
                                        type="text"
                                        defaultValue={buyer.name}
                                        className="w-full px-3 py-2 border bg-white border-warmgrey/30 rounded-md font-Manrope focus:outline-none focus:border-royalpurple"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-Manrope text-CharcoalBlack mb-2">Email</label>
                                    <input
                                        type="email"
                                        defaultValue={buyer.email}
                                        className="w-full px-3 py-2 border bg-white border-warmgrey/30 rounded-md font-Manrope focus:outline-none focus:border-royalpurple"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-Manrope text-CharcoalBlack mb-2">Phone No</label>
                                    <input
                                        type='text'
                                        defaultValue={buyer.phone}
                                        className="w-full px-3 py-2 border bg-white border-warmgrey/30 rounded-md font-Manrope focus:outline-none focus:border-royalpurple"
                                        onChange={(e) => {
                                            const onlyDigits = e.target.value.replace(/\D/g, '');
                                            const limitedDigits = onlyDigits.slice(0, 10);
                                            // setContactNo(limitedDigits);
                                        }}
                                    />
                                </div>
                            </div>
                            <button className="mt-6 w-full bg-royalpurple hover:bg-royalpurple/90 text-white font-Manrope px-6 py-2 rounded-md transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                );

            case 'My Orders':
                return (
                    <div className="max-w-4xl">
                        <h2 className="text-2xl font-Playfair font-medium text-CharcoalBlack mb-6">My Orders</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((order) => (
                                <div key={order} className="bg-offwhite rounded-lg p-6 border border-warmgrey/20">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                        <div>
                                            <h3 className="font-Playfair font-medium text-CharcoalBlack">Order #{order}001</h3>
                                            <p className="text-sm text-warmgrey font-Manrope">Placed on March {order + 10}, 2024</p>
                                        </div>
                                        <span className="bg-royalpurple/10 text-royalpurple px-3 py-1 rounded-full text-sm font-Manrope mt-2 sm:mt-0 w-fit">
                                            Delivered
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-warmgrey/20 rounded-lg"></div>
                                        <div className="flex-1">
                                            <p className="font-Manrope text-CharcoalBlack">Sample Product {order}</p>
                                            <p className="text-sm text-warmgrey font-Manrope">Quantity: 1</p>
                                        </div>
                                        <p className="font-Playfair font-medium text-CharcoalBlack">${(order * 29.99).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'Notifications':
                return (
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-Playfair font-medium text-CharcoalBlack mb-6">Notifications</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((notification) => (
                                <div key={notification} className="bg-offwhite rounded-lg p-4 border border-warmgrey/20">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-royalpurple rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <p className="font-Manrope text-CharcoalBlack">Your order has been shipped</p>
                                            <p className="text-sm text-warmgrey font-Manrope mt-1">2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'Favourites':
                return (
                    <div className="max-w-4xl">
                        <h2 className="text-2xl font-Playfair font-medium text-CharcoalBlack mb-6">Favourites</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-offwhite rounded-lg p-4 border border-warmgrey/20">
                                    <div className="w-full h-48 bg-warmgrey/20 rounded-lg mb-4"></div>
                                    <h3 className="font-Manrope text-CharcoalBlack mb-2">Favorite Item {item}</h3>
                                    <p className="font-Playfair font-medium text-CharcoalBlack">${(item * 25.99).toFixed(2)}</p>
                                    <button className="w-full mt-3 bg-royalpurple hover:bg-royalpurple/90 text-white font-Manrope py-2 rounded-md transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'Delivery Addresses':
                return (
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-Playfair font-medium text-CharcoalBlack mb-6">Delivery Addresses</h2>
                        <div className="space-y-4 mb-6">
                            {[1, 2].map((address) => (
                                <div key={address} className="bg-offwhite rounded-lg p-4 border border-warmgrey/20">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-Playfair font-medium text-CharcoalBlack">Home Address {address}</h3>
                                            <p className="text-warmgrey font-Manrope mt-1">
                                                123 Main Street, Apt {address}<br />
                                                City, State 12345<br />
                                                United States
                                            </p>
                                        </div>
                                        <button className="text-royalpurple hover:text-royalpurple/80 font-Manrope text-sm transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="bg-royalpurple hover:bg-royalpurple/90 text-white font-Manrope px-6 py-2 rounded-md transition-colors">
                            Add New Address
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile menu button */}
            <div className="sm:hidden bg-warmgrey/15 border-b border-warmgrey/20 p-4">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center space-x-2 text-CharcoalBlack"
                >
                    <FiMenu className="w-5 h-5" />
                    <span className="font-Manrope">Menu</span>
                </button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className={`
          fixed sm:static inset-y-0 left-0 z-50 h-screen w-80 bg-offwhite/95 border-r border-warmgrey/20 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0 bg-warmgrey/15'}
        `}>
                    <div className="p-6">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="items-center text-CharcoalBlack sm:hidden block"
                        >
                            <FiX className="w-5 h-5 mb-5" />
                        </button>
                        {/* Profile section */}
                        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-warmgrey/20">
                            {buyer.profileImg && (
                                <div className='w-17 h-17 rounded-full flex items-center border border-warmgrey/20'>
                                    <img
                                        src={buyer.profileImg}
                                    />
                                </div>
                            )}
                            {!buyer.profileImg && (
                                <div className="w-17 h-17 bg-royalpurple rounded-full flex items-center justify-center">
                                    <span className="text-offwhite font-Playfair font-medium text-xl">{buyer.name}</span>
                                </div>
                            )}
                            <div>
                                <p className="font-Playfair font-medium text-CharcoalBlack">Hello, {buyer.username}</p>
                                <p className="text-sm text-gray-500 font-Manrope">{buyer.email}</p>
                            </div>
                        </div>

                        {/* Navigation menu */}
                        <nav className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            setActiveSection(item.name);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`
                      w-full flex items-center space-x-3 py-3 px-4 rounded-md transition-colors font-Manrope text-left
                      ${activeSection === item.name
                                                ? 'bg-royalpurple/10 text-royalpurple'
                                                : 'hover:text-royalpurple hover:bg-royalpurple/5 text-CharcoalBlack'
                                            }
                    `}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </button>
                                );
                            })}
                            <Link
                                to="/login"
                                className="w-full flex items-center space-x-3 py-3 px-4 rounded-md transition-colors font-Manrope text-red-500 hover:text-red-600 hover:bg-red-100"
                            >
                                <FiLogOut className="w-5 h-5" />
                                <span>Log Out</span>
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Overlay for mobile */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Main content */}
                <div className="flex-1 sm:ml-0">
                    <div className="p-6 sm:p-8">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
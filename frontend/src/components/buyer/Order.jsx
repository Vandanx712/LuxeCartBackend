import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { IoCashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Order = () => {
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);
    const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
    const [addresses, SetAddresses] = useState([])
    const [payment,setPayment] = useState('')
    const [items, SetItems] = useState([])

    const orderItems = useSelector(state => state.order.items)
    const subtotal = Math.floor(useSelector(state=>state.order.price)) 

    const paymentMethods = [
        {
            id: "card1",
            type: "Credit Card",
            icon: "💳"
        },
        {
            id: "Cod",
            type: "Cash on Delivery",
            icon: <IoCashOutline/>
        }
    ];

    const shipping = 9;
    const tax = Math.floor(subtotal * 0.03);
    const total = subtotal + shipping + tax;

    useEffect(() => {
        loadaddress()
        SetItems(orderItems)
    }, [addressDropdownOpen])

    const loadaddress = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getallAddress`, { withCredentials: true })
            const Address = response.data.addresses.map((add) => {
                const id = add._id
                const street = add.street
                const city = add.city
                const state = add.state
                const pincode = add.zip_code
                const Default = add.is_default

                return { id, street, city, state, pincode, Default }
            })
            SetAddresses(Address)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            if (!selectedAddress || !selectedPaymentMethod) {
                alert("Please select address and payment method");
                return;
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/buyer//cartorder`,{
                items,
                address:selectedAddress,
                payment_method:selectedPaymentMethod
            },{withCredentials:true})
            toast.success(response.data.message)
            navigate('/buyer')
        } catch (error) {
            console.log(error)
        }
    };

    const getSelectedAddress = () => {
        return addresses.find(addr => addr.id === selectedAddress);
    };

    const getSelectedPayment = () => {
        return paymentMethods.find(method => method.type === selectedPaymentMethod);
    };

    return (
        <div className="min-h-screen bg-offwhite">
            {/* Header */}
            <header className="bg-DeepNavy">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/")}
                                className="text-offwhite text-lg hover:text-gold transition-colors duration-200"
                            >
                                <FaChevronLeft />
                            </button>
                            <h1 className="font-Playfair text-2xl font-bold text-offwhite">Checkout</h1>
                        </div>
                        <div className="text-offwhite font-Manrope">
                            <span className="text-sm text-warmgrey">Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Select Shipping Address */}
                            <div className="bg-offwhite rounded-xl p-6  border border-warmgrey/20">
                                <h2 className="font-Playfair text-2xl font-medium text-CharcoalBlack mb-6">
                                    Shipping Address
                                </h2>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setAddressDropdownOpen(!addressDropdownOpen)}
                                        className="w-full px-4 py-3 rounded-lg border border-warmgrey/30 focus:border-DeepNavy focus:ring-2 focus:ring-DeepNavy/20 transition-all duration-200 font-Manrope text-left flex items-center justify-between bg-offwhite"
                                    >
                                        <span>
                                            {getSelectedAddress() ? (
                                                <div>
                                                    <div className="font-medium">{getSelectedAddress()?.street}</div>
                                                    <div className="text-sm text-warmgrey">{getSelectedAddress()?.address}</div>
                                                </div>
                                            ) : (
                                                "Select shipping address"
                                            )}
                                        </span>
                                        <FaChevronDown />
                                    </button>

                                    {addressDropdownOpen && (
                                        <div className="absolute top-full mt-1 w-full bg-offwhite border border-warmgrey/30 rounded-lg  z-50">
                                            {addresses.map((address, index) => (
                                                <button
                                                    key={address.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedAddress(address.id);
                                                        setAddressDropdownOpen(false);
                                                    }}
                                                    className="w-full p-4 text-left hover:bg-offwhite transition-colors duration-200 border-b border-warmgrey/10 last:border-b-0"
                                                >
                                                    <div className="font-Manrope font-medium text-CharcoalBlack mb-2">Address-{index + 1}</div>
                                                    <div className="font-Manrope text-sm text-warmgrey">{address.street}</div>
                                                    <div className="font-Manrope text-sm text-warmgrey">{address.city}, {address.state}</div>
                                                    <div className="font-Manrope text-sm text-warmgrey">{address.pincode}</div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Select Payment Method */}
                            <div className="bg-offwhite rounded-xl p-6  border border-warmgrey/20">
                                <h2 className="font-Playfair text-2xl font-medium text-CharcoalBlack mb-6">
                                    Payment Method
                                </h2>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
                                        className="w-full px-4 py-3 rounded-lg border border-warmgrey/30 focus:border-DeepNavy focus:ring-2 focus:ring-DeepNavy/20 transition-all duration-200 font-Manrope text-left flex items-center justify-between bg-offwhite"
                                    >
                                        <span>
                                            {getSelectedPayment() ? (
                                                <div className="flex items-center">
                                                    <span className="mr-2">{getSelectedPayment()?.icon}</span>
                                                    {getSelectedPayment()?.type}
                                                </div>
                                            ) : (
                                                "Select payment method"
                                            )}
                                        </span>
                                        <FaChevronDown />
                                    </button>

                                    {paymentDropdownOpen && (
                                        <div className="absolute top-full mt-1 w-full bg-offwhite border border-warmgrey/30 rounded-lg  z-50">
                                            {paymentMethods.map((method) => (
                                                <button
                                                    key={method.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedPaymentMethod(method.type);
                                                        setPaymentDropdownOpen(false);
                                                    }}
                                                    className="w-full p-4 text-left hover:bg-offwhite transition-colors duration-200 border-b border-warmgrey/10 last:border-b-0 flex items-center"
                                                >
                                                    <span className="mr-3 text-lg">{method.icon}</span>
                                                    <div>
                                                        <div className="font-Manrope font-medium text-CharcoalBlack">{method.type}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-offwhite rounded-xl p-6  border border-warmgrey/20 sticky top-8">
                            <h2 className="font-Playfair text-2xl font-medium text-CharcoalBlack mb-6">
                                Order Summary
                            </h2>

                            {/* Order Items */}
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-offwhite rounded-lg">
                                        <img
                                            src={item.image}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-Monrope font-normal text-CharcoalBlack text-sm mb-1">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <h3 className=" text-warmgrey font-sans">Quantity:</h3>
                                                    <span className="font-Manrope text-sm w-8 text-center">{item.qty}</span>
                                                </div>
                                                <span className="font-Manrope font-medium text-DeepNavy">
                                                    ₹{(item.discount_price * item.qty).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-warmgrey/20">
                                <div className="flex justify-between font-Manrope text-[16px]">
                                    <span className="text-warmgrey">Subtotal</span>
                                    <span className="text-CharcoalBlack">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between font-Manrope text-[16px]">
                                    <span className="text-warmgrey">Shipping</span>
                                    <span className="text-CharcoalBlack">₹{shipping}</span>
                                </div>
                                <div className="flex justify-between font-Manrope text-[16px]">
                                    <span className="text-warmgrey">Tax</span>
                                    <span className="text-CharcoalBlack">₹{tax}</span>
                                </div>
                            </div>

                            <div className="flex justify-between font-Playfair text-lg font-medium mb-6">
                                <span className="text-CharcoalBlack">Total</span>
                                <span className="text-DeepNavy">₹{total}</span>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-DeepNavy text-offwhite font-Manrope font-medium py-4 px-6 rounded-xl  hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Place Order
                            </button>

                            {/* Security Info */}
                            <div className="mt-4 text-center">
                                <div className="flex items-center justify-center space-x-2 text-warmgrey">
                                    <FiLock />
                                    <span className="font-Manrope text-xs">Secure SSL Encryption</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Order;
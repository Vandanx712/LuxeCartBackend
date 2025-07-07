import axios from 'axios';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux'
import { removefromcart,setcartitems } from '../../redux/cartslice'

const CartModal = ({ onClose, cartTotal }) => {
    const cartItems = useSelector(state => state.cart.items)
    const dispatch = useDispatch()

    const shippingNote = "Shipping and taxes calculated at checkout.";
    async function removeItem(pid, vid) {
        try {
            dispatch(removefromcart({pid, vid}))
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/buyer/removeoncart/${pid}/${vid}`,{},{withCredentials:true})
            const cartItems = response.data.cartProducts.items.map((item)=>({pid:item.product,vid:item.variant,name:item.productDetails.name,qty:item.quantity,price:item.variantDetails.price,discount_price:item.variantDetails.discount_price,img:item.productDetails.images[0]}))
            dispatch(setcartitems(cartItems))
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
    }

    return (
        <div className="fixed inset-0 z-50 overflow-hidden ">
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            <div className="absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-2xl transition-transform sm:max-w-lg">
                <div className="flex items-center justify-between border-b border-warmgrey/20 px-6 py-4">
                    <h2 className="text-2xl font-Playfair font-medium text-CharcoalBlack">
                        Shopping cart
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-md p-2 text-warmgrey hover:text-CharcoalBlack focus:outline-none transition-colors"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex h-full flex-col">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
                            <div className="h-16 w-16 rounded-full bg-offwhite flex items-center justify-center mb-4">
                                <div className="h-8 w-8 border-2 border-warmgrey rounded-full"></div>
                            </div>
                            <h3 className="text-lg font-Playfair font-medium text-CharcoalBlack mb-2">Your cart is empty</h3>
                            <p className="text-warmgrey text-center font-manrope">
                                Add some items to your cart to get started!
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 px-4 py-2 rounded-lg bg-royalpurple hover:bg-royalpurple/90 text-white font-Monrope"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className=" justify-evenly overflow-y-auto px-6 py-4">
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.pid}
                                            className="flex items-start space-x-4 py-4 border-b border-warmgrey/10 last:border-b-0"
                                        >
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-warmgrey/20 bg-offwhite">
                                                <img
                                                    src={item.img}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col justify-between">
                                                <div className="space-y-1">
                                                    <h3 className="text-base font-sans text-CharcoalBlack leading-tight">
                                                        {item.name}
                                                    </h3>
                                                    {(item.color || item.size) && (
                                                        <p className="text-sm text-warmgrey font-Manrope">
                                                            {item.color && item.color}
                                                            {item.size && item.color && ' • '}
                                                            {item.size && item.size}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-warmgrey font-manrope">Qty</span>
                                                        <span className="text-sm  font-medium text-CharcoalBlack">
                                                            {item.qty}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.pid, item.vid)}
                                                        className="text-sm text-royalpurple hover:text-royalpurple/80 font-sans transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-base font-mono text-CharcoalBlack">
                                                    ${(item.price * item.qty).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t rounded-b-lg border-warmgrey/20 bg-offwhite px-6 py-6 space-y-4">
                                {/* Subtotal */}
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-Playfair font-medium text-CharcoalBlack">
                                        Subtotal
                                    </span>
                                    <span className="text-lg font-mono text-CharcoalBlack">
                                        {cartTotal}
                                    </span>
                                </div>

                                <p className="text-sm text-warmgrey font-manrope">
                                    {shippingNote}
                                </p>

                                {/* Checkout Button */}
                                <button
                                    className="w-full bg-royalpurple hover:bg-royalpurple/90 text-white font-Manrope py-3 h-12 text-base rounded-lg"
                                    size="lg"
                                >
                                    Order
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartModal;
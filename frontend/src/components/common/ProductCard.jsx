import { FaHeart} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";


const ProductCard = ({
    name,
    price,
    discount_price,
    images,
    discount,
    category,
}) => {

    const replaceChar = (name) =>{
        let NAME = name.split('')
        if(name.length > 50){
            let j = name.length - 1
            for (let i = 51; i < name.length; i++) {
                NAME[j] = '.'
                j = j - 1
            }
            return NAME.join('')
        }
        return name
    }
    return (
        <div className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden animate-scale-in rounded-lg">
            <div className="relative overflow-hidden">
                <img
                    src={images[0]}
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Badges */}
                {/* <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isNew && (
                        <span className="bg-emerald-green text-white px-3 py-1 text-xs font-manrope font-semibold rounded-full">
                            NEW
                        </span>
                    )}
                    {isSale && (
                        <span className="bg-royal-purple text-white px-3 py-1 text-xs font-manrope font-semibold rounded-full">
                            SALE
                        </span>
                    )}
                </div> */}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                        <button className="inline-flex items-center justify-center w-10 h-10 bg-white hover:bg-gold hover:text-white transition-colors duration-300 rounded-md">
                            <FaHeart className="h-4 w-4" />
                        </button>
                        <button className="inline-flex items-center justify-center w-10 h-10 bg-gold hover:bg-gold/90 hover:text-white text-charcoal-black rounded-md">
                            <FiShoppingCart className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-2">
                    <span className="text-warmgrey text-sm font-Manrope uppercase tracking-wider">
                        {category.name}
                    </span>
                </div>

                <h3 className="font-Playfair h-15 text-xl text-DeepNavy mb-3 group-hover:text-gold transition-colors duration-300">
                    {replaceChar(name)}
                </h3>

                <div className="flex items-center mb-3">
                    {/* <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-gold fill-gold' : 'text-warm-grey'}`}
                            />
                        ))}
                    </div> */}
                    
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {discount>0 && (
                            <span className="font-sans text-xl font-semibold text-DeepNavy">
                                ₹{discount_price}
                            </span>
                        )}
                        <span className={`font-sans  ${discount > 0 ? ' line-through text-warmgrey' : 'text-xl text-DeepNavy font-semibold'}`}>
                            ₹{price}
                        </span>
                        {discount > 0 &&
                            <span className="text-royalpurple font-Manrope">
                                - {discount}% off
                            </span>
                        }
                    </div>

                    <button className="inline-flex items-center justify-center border border-gold text-gold hover:bg-gold hover:text-white font-Manrope px-3 py-1 rounded-md text-sm transition-all duration-300">
                        Quick View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
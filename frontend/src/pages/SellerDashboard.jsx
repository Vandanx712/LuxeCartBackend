import { useState, useEffect } from 'react'
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
  FiArrowUp,
  FiArrowDown,
  FiHome,
  FiPackage,
  FiBarChart,
  FiSettings,
  FiBell,
  FiSearch,
  FiMessageSquare,
  FiChevronDown,
  FiPlus,
  FiUpload,
  FiDownload,
  FiTag,
  FiEye,
  FiTruck,
  FiCheck, FiCalendar,
  FiX,
  FiMenu,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiMail,
  FiPhone,
  FiUser,
  FiLock,
  FiCreditCard,
  FiGlobe,
  FiLogOut
} from 'react-icons/fi'
import { Link } from 'react-router-dom';


function SellerDashboard() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuItems, setmenuitems] = useState([
    { icon: FiHome, label: 'Dashboard' },
    { icon: FiShoppingBag, label: 'Orders' },
    { icon: FiPackage, label: 'Products' },
    { icon: FiUsers, label: 'Deliveryboys' }
  ])
  const [activesection, setactivesection] = useState('Dashboard')


  const selectedoption = (label) => {
    setactivesection(label)
    setIsSidebarOpen(false)
  }

  // Metrics data
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5% from last month',
      changeType: 'positive',
      icon: <FiDollarSign className="text-xl" />,
      trend: <FiArrowUp className="text-emerald-green" />
    },
    {
      title: 'Orders',
      value: '1,247',
      change: '+8.2% from last month',
      changeType: 'positive',
      icon: <FiShoppingBag className="text-xl" />,
      trend: <FiArrowUp className="text-emerald-green" />
    },
    {
      title: 'Customers',
      value: '847',
      change: '+15.3% from last month',
      changeType: 'positive',
      icon: <FiUsers className="text-xl" />,
      trend: <FiArrowUp className="text-emerald-green" />
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1% from last month',
      changeType: 'negative',
      icon: <FiTrendingUp className="text-xl" />,
      trend: <FiArrowDown className="text-danger" />
    }
  ];

  const orders = [
    {
      id: '#ORD-2024-001',
      customer: 'Sarah Johnson',
      product: 'Premium Leather Wallet',
      amount: '$89.99',
      status: 'Processing',
      statusColor: 'bg-gold/10 text-gold',
      date: '2 hours ago'
    },
    {
      id: '#ORD-2024-002',
      customer: 'Mike Chen',
      product: 'Wireless Headphones',
      amount: '$199.99',
      status: 'Shipped',
      statusColor: 'bg-royalpurple/10 text-royalpurple',
      date: '4 hours ago'
    },
    {
      id: '#ORD-2024-003',
      customer: 'Emma Davis',
      product: 'Smart Watch Series 5',
      amount: '$299.99',
      status: 'Delivered',
      statusColor: 'bg-emeraldgreen/10 text-emeraldgreen',
      date: '1 day ago'
    },
    {
      id: '#ORD-2024-004',
      customer: 'Alex Rodriguez',
      product: 'Gaming Keyboard',
      amount: '$149.99',
      status: 'Processing',
      statusColor: 'bg-gold/10 text-gold',
      date: '1 day ago'
    },
    {
      id: '#ORD-2024-005',
      customer: 'Lisa Wang',
      product: 'Bluetooth Speaker',
      amount: '$79.99',
      status: 'Shipped',
      statusColor: 'bg-royalpurple/10 text-royalpurple',
      date: '2 days ago'
    }
  ];

  const products = [
    {
      id: 'PRD-001',
      name: 'Premium Leather Wallet',
      category: 'Accessories',
      price: '$89.99',
      stock: 45,
      status: 'In Stock',
      statusColor: 'bg-emeraldgreen/10 text-emeraldgreen'
    },
    {
      id: 'PRD-002',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: '$199.99',
      stock: 23,
      status: 'In Stock',
      statusColor: 'bg-emeraldgreen/10 text-emeraldgreen'
    },
    {
      id: 'PRD-003',
      name: 'Smart Watch Series 5',
      category: 'Electronics',
      price: '$299.99',
      stock: 8,
      status: 'Low Stock',
      statusColor: 'bg-gold/20 text-gold'
    },
    {
      id: 'PRD-004',
      name: 'Gaming Keyboard',
      category: 'Electronics',
      price: '$149.99',
      stock: 67,
      status: 'In Stock',
      statusColor: 'bg-emeraldgreen/10 text-emeraldgreen'
    },
    {
      id: 'PRD-005',
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: '$79.99',
      stock: 0,
      status: 'Out of Stock',
      statusColor: 'bg-red-200 text-red-500'
    },
    {
      id: 'PRD-006',
      name: 'Laptop Stand',
      category: 'Accessories',
      price: '$45.99',
      stock: 34,
      status: 'In Stock',
      statusColor: 'bg-emeraldgreen/10 text-emeraldgreen'
    }
  ];

  const customers = [
    {
      id: 'CUST-001',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, USA',
      orders: 12,
      spent: '$1,245.50',
      status: 'Active',
      statusColor: 'bg-emeraldgreen/10 text-emeraldgreen'
    },
    {
      id: 'CUST-002',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Los Angeles, USA',
      orders: 8,
      spent: '$890.25',
      status: 'Active',
      statusColor: 'bg-emeraldgreen/10 text-emeraldgreen'
    },
    {
      id: 'CUST-003',
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, USA',
      orders: 15,
      spent: '$2,156.75',
      status: 'VIP',
      statusColor: 'bg-gold text-CharcoalBlack'
    },
    {
      id: 'CUST-004',
      name: 'Alex Rodriguez',
      email: 'alex.r@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Miami, USA',
      orders: 5,
      spent: '$567.30',
      status: 'Active',
      statusColor: 'bg-emeraldgreen/10 text-emeraldgreen'
    },
    {
      id: 'CUST-005',
      name: 'Lisa Wang',
      email: 'lisa.w@email.com',
      phone: '+1 (555) 567-8901',
      location: 'San Francisco, USA',
      orders: 3,
      spent: '$345.00',
      status: 'Active',
      statusColor: 'bg-emeraldgreen/10 text-emeraldgreen'
    },
    {
      id: 'CUST-006',
      name: 'David Kim',
      email: 'david.k@email.com',
      phone: '+1 (555) 678-9012',
      location: 'Seattle, USA',
      orders: 20,
      spent: '$3,450.80',
      status: 'VIP',
      statusColor: 'bg-gold text-CharcoalBlack'
    }
  ];


  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-emeraldgreen';
      case 'negative':
        return 'text-red-500';
      case 'neutral':
        return 'text-warmgrey';
      default:
        return 'text-warmgrey';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FiPackage className="text-sm" />;
      case 'Shipped':
        return <FiTruck className="text-sm" />;
      case 'Delivered':
        return <FiCheck className="text-sm" />;
      default:
        return <FiPackage className="text-sm" />;
    }
  };

  const renderContent = () => {
    switch (activesection) {
      case 'Dashboard':
        return (
          <div className="flex-1 p-4 lg:p-8 space-y-6 lg:space-y-8 overflow-auto">
            {/* Welcome Section */}
            <div className="backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl bg-gradient-to-tl from-blue-600 to-blue-500 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-royalpurple/20 to-transparent"></div>
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-3">Welcome back, John! 👋</h1>
                  <p className="text-lg lg:text-xl opacity-90">Here's what's happening with your store today.</p>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-offwhite backdrop-blur-sm border border-offwhite/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden group">
                  <div className="flex items-start justify-between mb-4 lg:mb-6">
                    <div className="p-3 lg:p-4 bg-blue-600 rounded-xl lg:rounded-2xl text-white group-hover:shadow-glow transition-all duration-500 group-hover:scale-110">
                      {metric.icon}
                    </div>
                    {metric.trend && (
                      <div className="text-warmgrey group-hover:text-royalpurple transition-colors duration-300">
                        {metric.trend}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs lg:text-sm text-warmgrey font-sans font-medium uppercase tracking-wide">{metric.title}</p>
                    <p className="text-2xl lg:text-3xl font-semibold text-CharcoalBlack group-hover:text-royalpurple transition-colors duration-300">{metric.value}</p>
                    <p className={`text-xs lg:text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                      {metric.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-offwhite backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-royalpurple/30 transition-all duration-500 hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 gap-4">
                <h3 className="text-xl lg:text-2xl font-semibold font-sans text-CharcoalBlack">Recent Orders</h3>
                <button className="px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 backdrop-blur-sm border border-warmgrey/20 text-CharcoalBlack hover:border-gold/50 text-sm lg:text-base">View All Orders</button>
              </div>

              <div className="space-y-3 lg:space-y-4">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 p-4 lg:p-6 hover:bg-offwhite rounded-xl lg:rounded-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-royalpurple/20 group"
                  >
                    <div className={`p-2 lg:p-3 rounded-xl lg:rounded-2xl ${order.statusColor} flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 flex-shrink-0`}>
                      {getStatusIcon(order.status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-2">
                        <p className="font-bold text-CharcoalBlack text-base lg:text-lg">{order.id}</p>
                        <span className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs lg:text-sm font-bold ${order.statusColor} shadow-sm inline-block w-fit`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-warmgrey font-medium text-sm lg:text-base">{order.customer} • {order.product}</p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2">
                      <p className="font-bold text-CharcoalBlack text-lg lg:text-xl">{order.amount}</p>
                      <p className="text-warmgrey font-medium text-sm lg:text-base">{order.date}</p>
                    </div>

                    <button className="p-2 lg:p-3 hover:bg-gold/10 rounded-xl lg:rounded-2xl transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                      <FiEye className="text-warmgrey hover:text-gold transition-colors duration-300 text-lg lg:text-xl" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Orders':
        return (
          <div className="flex-1 p-4 lg:p-8 space-y-6 lg:space-y-8 overflow-auto">
            {/* Header */}
            <div className="backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl bg-gradient-to-tl from-blue-600 to-blue-500  text-white">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
                  <p className="text-lg opacity-90">View and manage all your orders</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-gradient-to-l from-sky-200 to-sky-200 text-CharcoalBlack hover:shadow-glow transform hover:-translate-y-1 flex items-center gap-2">
                    <FiFilter />
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gold/20 rounded-xl">
                    <FiPackage className="text-gold text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">Processing</p>
                <p className="text-3xl font-bold text-CharcoalBlack">324</p>
              </div>

              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-royalpurple/20 rounded-xl">
                    <FiTruck className="text-royalpurple text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">Shipped</p>
                <p className="text-3xl font-bold text-CharcoalBlack">156</p>
              </div>

              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-warmgrey/20 rounded-xl">
                    <FiCheck className="text-emeraldgreen text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">Delivered</p>
                <p className="text-3xl font-bold text-CharcoalBlack">767</p>
              </div>

              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-600 rounded-xl text-white">
                    <FiPackage className="text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-CharcoalBlack">1,247</p>
              </div>
            </div>

            {/* Search */}
            <div className="bg-offwhite backdrop-blur-sm border border-gray-300 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-royalpurple/30 transition-all duration-500 hover:-translate-y-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warmgrey" />
                <input
                  type="text"
                  placeholder="Search orders by ID, customer, or product..."
                  className="w-full pl-12 pr-6 py-4 bg-offwhite border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-royalpurple/50 focus:border-royalpurple/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-offwhite backdrop-blur-sm border border-gray-300 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-royalpurple/30 transition-all duration-500 hover:-translate-y-1">
              <h3 className="text-2xl font-semibold text-CharcoalBlack mb-6">All Orders</h3>
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 p-6 hover:bg-offwhite-hover rounded-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-royalpurple/20 group"
                  >
                    <div className={`p-3 rounded-xl ${order.statusColor} flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300`}>
                      {getStatusIcon(order.status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-2">
                        <p className="font-bold text-CharcoalBlack text-lg">{order.id}</p>
                        <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${order.statusColor} shadow-sm inline-block w-fit`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-warmgrey font-medium">{order.customer} • {order.product}</p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2">
                      <p className="font-semibold text-CharcoalBlack text-xl">{order.amount}</p>
                      <p className="text-warmgrey font-medium text-sm">{order.date}</p>
                    </div>

                    <button className="p-3 hover:bg-gold/10 rounded-xl transition-all duration-300 group-hover:scale-110">
                      <FiEye className="text-warmgrey hover:text-gold transition-colors duration-300 text-xl" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Products':
        return (
          <div className="flex-1 p-4 lg:p-8 space-y-6 lg:space-y-8 overflow-auto">
            {/* Header */}
            <div className="backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl bg-gradient-to-tl from-blue-600 to-blue-500  text-white">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Products Management</h1>
                  <p className="text-lg opacity-90">Manage your product inventory</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-gradient-to-l from-sky-200 to-sky-200 text-CharcoalBlack hover:shadow-glow transform hover:-translate-y-1 flex items-center gap-2">
                    <FiFilter />
                    Filter
                  </button>
                  <button className=" px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-gradient-to-l from-yellow-500 to-yellow-400 text-CharcoalBlack hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2">
                    <FiPlus />
                    Add Product
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emeraldgreen/20 rounded-xl">
                    <FiPackage className="text-emeraldgreen text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">In Stock</p>
                <p className="text-3xl font-bold text-CharcoalBlack">324</p>
              </div>

              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gold/20 rounded-xl">
                    <FiPackage className="text-gold text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">Low Stock</p>
                <p className="text-3xl font-bold text-CharcoalBlack">156</p>
              </div>

              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-200 rounded-xl">
                    <FiPackage className="text-red-500 text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">Out of Stock</p>
                <p className="text-3xl font-bold text-CharcoalBlack">767</p>
              </div>

              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-600 rounded-xl text-white">
                    <FiPackage className="text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">Total Products </p>
                <p className="text-3xl font-bold text-CharcoalBlack">1,247</p>
              </div>
            </div>

            {/* Search */}
            <div className="bg-offwhite backdrop-blur-sm border border-gray-300 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-royalpurple/30 transition-all duration-500 hover:-translate-y-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warmgrey" />
                <input
                  type="text"
                  placeholder="Search orders by name, category, or Id..."
                  className="w-full pl-12 pr-6 py-4 bg-offwhite border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-royalpurple/50 focus:border-royalpurple/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group hover:border-royalpurple/20 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-500 rounded-xl text-white group-hover:scale-110 transition-all duration-300">
                      <FiPackage className="text-xl" />
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${product.statusColor}`}>
                      {product.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-CharcoalBlack mb-2 group-hover:text-royalpurple transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-warmgrey mb-4">{product.category}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-warmgrey mb-1">Price</p>
                      <p className="text-2xl font-semibold text-CharcoalBlack">{product.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-warmgrey mb-1">Stock</p>
                      <p className="text-2xl font-bold text-CharcoalBlack">{product.stock}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-offwhite/70 backdrop-blur-sm border border-gray-200 text-CharcoalBlack hover:bg-offwhite hover:border-gold/50 flex items-center justify-center gap-2">
                      <FiEdit />
                      Edit
                    </button>
                    <button className="p-3 hover:bg-red-200 rounded-xl transition-all duration-300 text-red-500">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Deliveryboys':
        return (
          <div className="flex-1 p-4 lg:p-8 space-y-6 lg:space-y-8 overflow-auto">
            {/* Header */}
            <div className="backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl bg-gradient-to-tl from-blue-600 to-blue-500  text-white">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">DeliveryBoy Management</h1>
                  <p className="text-lg opacity-90">View and manage your deliveryboy base</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-gradient-to-l from-sky-200 to-sky-200 text-CharcoalBlack hover:shadow-glow transform hover:-translate-y-1 flex items-center gap-2">
                    <FiFilter />
                    Filter
                  </button>
                  <button className=" px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-gradient-to-l from-yellow-500 to-yellow-400 text-CharcoalBlack hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2">
                    <FiPlus />
                    Add DeliveryBoy
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emeraldgreen/20 rounded-xl">
                    <FiPackage className="text-emeraldgreen text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">Free</p>
                <p className="text-3xl font-bold text-CharcoalBlack">324</p>
              </div>

              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gold/20 rounded-xl">
                    <FiPackage className="text-gold text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">On Delivery</p>
                <p className="text-3xl font-bold text-CharcoalBlack">156</p>
              </div>

              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-royalpurple/40 cursor-pointer relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-600 rounded-xl text-white">
                    <FiPackage className="text-xl" />
                  </div>
                </div>
                <p className="text-sm text-warmgrey font-medium mb-1">Total DeliveryBoys </p>
                <p className="text-3xl font-bold text-CharcoalBlack">1,247</p>
              </div>
            </div>

            {/* Search */}
            <div className="bg-offwhite backdrop-blur-sm border border-gray-300 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-royalpurple/30 transition-all duration-500 hover:-translate-y-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warmgrey" />
                <input
                  type="text"
                  placeholder="Search deliveryboy by username, name, or phone..."
                  className="w-full pl-12 pr-6 py-4 bg-offwhite border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-royalpurple/50 focus:border-royalpurple/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* delivery boy List */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {customers.map((customer, index) => (
                <div
                  key={index}
                  className="bg-offwhite backdrop-blur-sm border border-gray-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group hover:border-royalpurple/20 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                        <span className="text-xl font-bold text-CharcoalBlack">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-CharcoalBlack group-hover:text-royalpurple transition-colors">
                          {customer.name}
                        </h3>
                        <p className="text-warmgrey text-sm">{customer.id}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${customer.statusColor}`}>
                      {customer.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-warmgrey">
                      <FiMail className="text-royalpurple" />
                      <span className="text-sm">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-warmgrey">
                      <FiPhone className="text-royalpurple" />
                      <span className="text-sm">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-warmgrey">
                      {/* <FiMapPin className="text-royalpurple" /> */}
                      <span className="text-sm">{customer.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div>
                      <p className="text-sm text-warmgrey mb-1">Orders</p>
                      <p className="text-2xl font-bold text-CharcoalBlack">{customer.orders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-warmgrey mb-1">Total Spent</p>
                      <p className="text-2xl font-bold text-CharcoalBlack">{customer.spent}</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-offwhite/80 backdrop-blur-sm border border-gray-300 text-CharcoalBlack hover:border-gold/50">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="flex-1 p-4 lg:p-8 space-y-6 lg:space-y-8 overflow-auto">
            {/* Header */}
            <div className="backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl bg-gradient-to-tl from-blue-600 to-blue-500  text-white">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Profile Managment</h1>
                  <p className="text-lg opacity-90">Manage your account and preferences</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-royalpurple/30 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-600 rounded-xl text-white">
                    <FiUser className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-CharcoalBlack">Profile Settings</h3>
                    <p className="text-warmgrey">Manage your personal information</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-CharcoalBlack mb-2">UserName</label>
                    <input
                      type="text"
                      defaultValue="John Smith"
                      className="w-full px-4 py-3 bg-offwhite border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royalpurple focus:border-royalpurple/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-CharcoalBlack mb-2">Name</label>
                    <input
                      type="text"
                      defaultValue="John Smith"
                      className="w-full px-4 py-3 bg-offwhite border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royalpurple focus:border-royalpurple/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-CharcoalBlack mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john.smith@email.com"
                      className="w-full px-4 py-3 bg-offwhite border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royalpurple focus:border-royalpurple/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-CharcoalBlack mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-offwhite border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royalpurple focus:border-royalpurple/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-CharcoalBlack mb-2">ShopName</label>
                    <input
                      type="text"
                      defaultValue="John gresory"
                      className="w-full px-4 py-3 bg-offwhite border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royalpurple focus:border-royalpurple/50 transition-all"
                    />
                  </div>
                  <button className="px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-blue-600 text-white hover:shadow-glow transform hover:-translate-y-1 w-full">Save Changes</button>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-royalpurple/30 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gold rounded-xl">
                    <FiLock className="text-CharcoalBlack text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-CharcoalBlack">Security</h3>
                    <p className="text-warmgrey">Manage password and authentication</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-CharcoalBlack mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-offwhite border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royalpurple focus:border-royalpurple/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font- medium text-CharcoalBlack mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-offwhite border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royalpurple focus:border-royalpurple/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-CharcoalBlack mb-2">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-offwhite border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-royalpurple focus:border-royalpurple/50 transition-all"
                    />
                  </div>
                  <button className="px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-blue-600 text-white hover:shadow-glow transform hover:-translate-y-1 w-full">Update Password</button>
                </div>
              </div>

              {/* Payment Settings */}
              {/* <div className="dashboard-card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-success rounded-xl text-white">
                    <FiCreditCard className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-CharcoalBlack">Payment Methods</h3>
                    <p className="text-warmgrey">Manage your payment options</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-primary rounded-xl text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm opacity-80">Primary Card</span>
                      <FiCreditCard className="text-xl" />
                    </div>
                    <p className="text-lg font-bold mb-1">•••• •••• •••• 4532</p>
                    <p className="text-sm opacity-80">Expires 12/25</p>
                  </div>

                  <button className="btn-secondary w-full">Add New Card</button>
                  <button className="btn-secondary w-full">Manage Billing</button>
                </div>
              </div> */}

              {/* Contact Settings */}
              <div className="bg-offwhite backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-royalpurple/30 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-600 rounded-xl text-white">
                    <FiMail className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-CharcoalBlack">Contact & Support</h3>
                    <p className="text-warmgrey">Get help and support</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full p-4 bg-offwhite hover:bg-warmgrey/10 rounded-xl transition-all text-left">
                    <p className="font-semibold text-CharcoalBlack">Help Center</p>
                    <p className="text-sm text-royalpurple">Browse articles and guides</p>
                  </button>
                  <button className="w-full p-4 bg-offwhite hover:bg-warmgrey/10 rounded-xl transition-all text-left">
                    <p className="font-semibold text-CharcoalBlack">Contact Support</p>
                    <p className="text-sm text-royalpurple">Get in touch with our team</p>
                  </button>
                  <button className="w-full p-4 bg-offwhite hover:bg-warmgrey/10 rounded-xl transition-all text-left">
                    <p className="font-semibold text-CharcoalBlack">Feature Requests</p>
                    <p className="text-sm text-royalpurple">Suggest new features</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null;;
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
        fixed lg:relative lg:translate-x-0 w-72 h-screen flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
          <div
            className="h-full m-4 overflow-hidden bg-CharcoalBlack rounded-2xl shadow-2xl backdrop-blur-md border border-white/20"
          >
            {/* Close Button for Mobile */}
            <div className="lg:hidden absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gold rounded-2xl flex items-center justify-center shadow-lg">
                  <FiShoppingBag className="text-CharcoalBlack text-xl lg:text-2xl" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-sans font-medium text-white">Shopname</h1>
                  <p className="text-white/70 text-xs font-sans lg:text-sm">John smith</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 lg:p-6 space-y-2 ">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-offwhite hover:bg-white/10 transition-all duration-300 cursor-pointer relative overflow-hidden ${activesection == item.label ? 'bg-gradient-to-r from-royalpurple/40 to-gold/30' : ''}`}
                  onClick={() => selectedoption(item.label)}
                >
                  <item.icon className="text-lg lg:text-xl" />
                  <span className="flex-1 font-medium text-sm lg:text-base">{item.label}</span>
                  {item.count && (
                    <span className="bg-gold text-CharcoalBlack text-xs px-2 lg:px-3 py-1 lg:py-1.5 rounded-full font-bold shadow-md">
                      {item.count}
                    </span>
                  )}
                </div>
              ))}
              <Link to='/sellerlogin' className=' flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-100/20 overflow-hidden cursor-pointer'>
                <FiLogOut className="text-lg lg:text-xl"/>
                <span className="flex-1 font-medium text-sm lg:text-base">LogOut</span>
              </Link>
            </nav>

            {/* User Profile */}
            <div className="p-4 lg:p-6 border-t border-white/10">
              <div className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer ${activesection == 'profile' ? 'bg-gradient-to-r from-royalpurple/40 to-gold/30' : 'bg-white/10'}`} onClick={() => selectedoption('profile')}>
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-CharcoalBlack font-bold text-sm lg:text-lg">JS</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm lg:text-base">John Smith</p>
                  <p className="text-white/70 text-xs lg:text-sm">Shopname</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="mx-4 mt-2 lg:hidden p-2 hover:bg-white/50 rounded-xl transition-all duration-300 backdrop-blur-sm mr-4"
          >
            <FiMenu className="text-2xl text-CharcoalBlack" />
          </button>
          {renderContent()}
        </div>
      </div>
    </>
  )
}

export default SellerDashboard

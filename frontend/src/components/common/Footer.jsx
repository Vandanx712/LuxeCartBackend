import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "/new-arrivals" },
      { name: "Best Sellers", href: "/best-sellers" },
      { name: "Gift Cards", href: "/gift-cards" },
      { name: "Exclusive Deals", href: "/deals" },
      { name: "All Products", href: "/products" },
    ],
    customerService: [
      { name: "Help Center", href: "/help" },
      { name: "Shipping & Delivery", href: "/shipping" },
      { name: "Returns & Refunds", href: "/returns" },
      { name: "Track Order", href: "/track" },
      { name: "Payment Options", href: "/payment" },
    ],
    company: [
      { name: "About LuxeCart", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press & Media", href: "/press" },
      { name: "Affiliate Program", href: "/affiliate" },
      { name: "Our Promise", href: "/promise" },
    ],
    quickAccess: [
      { name: "My Account", href: "/buyer" },
      { name: "My Orders", href: "/orders" },
      { name: "Wishlist", href: "/buyer/wishlist" },
      { name: "Returns & Cancellations", href: "/returns" },
      { name: "Help & Support", href: "/support" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297L4.771 9.5c.828-.828 1.969-1.297 3.328-1.297 1.297 0 2.448.49 3.328 1.297l.35 6.191c-.828.828-1.969 1.297-3.328 1.297zm7.718 0c-1.297 0-2.448-.49-3.328-1.297L12.489 9.5c.828-.828 1.969-1.297 3.328-1.297 1.297 0 2.448.49 3.328 1.297l.35 6.191c-.828.828-1.969 1.297-3.328 1.297z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];
  return (
    <footer className="bg-gradient-to-br from-CharcoalBlack via-deep-navy-dark to-DeepNavy text-white font-manrope">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="group">
              <h2 className="text-3xl lg:text-4xl font-Playfair font-bold bg-gradient-to-r from-gold via-offwhite to-gold bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                LuxeCart
              </h2>
            </Link>
            <p className="mt-6 text-warmgrey leading-relaxed text-sm lg:text-base">
              Your premier destination for luxury goods and exceptional shopping experiences.
              We curate the finest products from around the world to bring you unmatched quality and style.
            </p>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-gold font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="group p-3 bg-white/10 rounded-xl hover:bg-gold transition-all duration-300 hover:scale-110 transform"
                    aria-label={social.name}
                  >
                    <div className="text-white group-hover:text-deep-navy transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-Playfair font-semibold text-lg text-gold mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-warmgrey hover:text-gold transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="font-Playfair font-semibold text-lg text-gold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              {footerLinks.customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-warmgrey hover:text-gold transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-Playfair font-semibold text-lg text-gold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-warmgrey hover:text-gold transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Access Links */}
          <div>
            <h4 className="font-Playfair font-semibold text-lg text-gold mb-6">Quick Access</h4>
            <ul className="space-y-3">
              {footerLinks.quickAccess.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-warmgrey hover:text-gold transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-warmgrey/20 bg-charcoal-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6">
              <Link to="/terms" className="text-warmgrey hover:text-gold transition-colors duration-200 text-sm">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-warmgrey hover:text-gold transition-colors duration-200 text-sm">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-warmgrey hover:text-gold transition-colors duration-200 text-sm">
                Cookie Policy
              </Link>
              <Link to="/security" className="text-warmgrey hover:text-gold transition-colors duration-200 text-sm">
                Security
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-warmgrey text-sm">
              © {currentYear} LuxeCart. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

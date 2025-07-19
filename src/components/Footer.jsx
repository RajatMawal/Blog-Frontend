import { Divider, IconButton, Typography } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { FaInstagramSquare, FaTwitter, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="text-white px-6 md:px-12 py-10 bg-[#161620]">
        <Divider />

        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-8">
          {/* Logo and Contact */}
          <div>
            <div className="flex items-center mb-4">
              <IconButton>
                <NewspaperIcon sx={{ fontSize: "36px" }} />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                BlogVault
              </Typography>
            </div>
            <p className="text-sm mb-1">Gurgaon, Industrial area, India</p>
            <p className="text-sm mb-1">9667735903</p>
            <p className="text-sm">
              <a
                href="mailto:rajat333mawal@gmail.com"
                className="hover:text-yellow-400"
              >
                rajatweb22@gmail.com
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li>Home</li>
              <li>Best Seller</li>
              <li>Offers & Deals</li>
              <li>Contact Us</li>
              <li>FAQ's</li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3">Need Help?</h3>
            <ul className="space-y-1 text-sm">
              <li>Delivery Information</li>
              <li>Return & Refund Policy</li>
              <li>Payment Methods</li>
              <li>Track Your Order</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-2xl sm:text-3xl">
              <a
                href="https://www.instagram.com/web_fusion22"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagramSquare />
              </a>
              <a
                href="https://web.telegram.org/k/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                <FaTelegram />
              </a>
              <a
                href="https://x.com/RajatMawal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center mt-10 text-sm">
          &copy; 2025 - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;

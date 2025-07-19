import { Divider, IconButton, Typography } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className=" h-[125vh] md:h-full text-white px-8 py-6 bg-[#rgb(22, 22, 32)]">
        <Divider />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 pt-5">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center ml-[-10px]">
              <IconButton>
                <NewspaperIcon sx={{ fontSize: "40px" }} />
              </IconButton>

              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
                BlogVault
              </Typography>
            </div>
            <p className="mb-2">Gurgaon, Industrial area , India</p>
            <p className="mb-2">9667735903</p>
            <p>
              <a
                href="mailto:rajat333mawal@gmail.com"
                className="hover:text-yellow-400"
              >
                rajatweb22@gmail.com
              </a>
            </p>
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li>Home</li>
              <li>Best Seller</li>
              <li>Offers & Deals</li>
              <li>Contact us</li>
              <li>FAQ's</li>
            </ul>
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Need Help?</h3>
            <ul>
              <li>Delivery Infromation</li>
              <li>Return & Refund Policy</li>
              <li>Payment Methods</li>
              <li>Track Your order</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <ul className="mb-4 flex gap-4 text-3xl">
              <a
                href="https://www.instagram.com/web_fusion22"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagramSquare />
              </a>
              <a
                href="https://web.telegram.org/k/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors duration-300"
              >
                <FaTelegram />
              </a>
              <a
                href="https://x.com/RajatMawal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500 transition-colors duration-300"
              >
                <FaTwitter />
              </a>
            </ul>
          </div>
        </div>
        <p className="text-center mt-8">&copy; 2025 - All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;

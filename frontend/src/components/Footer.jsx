import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">About us</h3>
                        <p className="text-gray-400">Premium keyboard retailer providing the best mechanical keyboards for enthusiasts.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                    </ul>
                    </div>
             <div>
                <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                <div className="flex">
                    <input 
                        type="email"
                        placeholder="Enter your email"
                        className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        Subscribe
                    </button>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <FaFacebook className="h-6 w-6 cursor-pointer hover:text-blue-400" />
                  <FaTwitter className="h-6 w-6 cursor-pointer hover:text-blue-400" />
                  <FaInstagram className="h-6 w-6 cursor-pointer hover:text-blue-400" />
                  <FaLinkedin className="h-6 w-6 cursor-pointer hover:text-blue-400" />
                </div>    
            </div>
        </div>
             <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>© 2025 Phan Huynh Minh Thinh. All rights reserved.</p>
            </div>
        </div>
        </footer>
    );
}
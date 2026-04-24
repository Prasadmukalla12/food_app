

export default function FooterSection(){

    return(
       <footer className="bg-gray-900 text-white px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4 sm:grid-cols-2">

        <div>
          <h2 className="text-2xl font-bold text-orange-400">Delicious</h2>
          <p className="mt-3 text-gray-400 text-sm">
            Delivering your favorite food quickly and fresh. Order now and enjoy delicious meals at home.
          </p>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Menu</li>
            <li className="hover:text-white cursor-pointer">Restaurants</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <span className="hover:text-white cursor-pointer"><a href="https://www.facebook.com" target="blank" className="bi bi-facebook"></a></span>
            <span className="hover:text-white cursor-pointer"><a href="https://www.twitter.com" target="blank" className="bi bi-twitter"></a></span>
            <span className="hover:text-white cursor-pointer"><a href="https://www.instagram.com" target="blank" className="bi bi-instagram"></a></span>
            <span className="hover:text-white cursor-pointer"><a href="https://www.youtube.com" target="blank" className="bi bi-youtube"></a></span>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
          2026 Delicious. All rights reserved.
      </div>
    </footer>
    )
}
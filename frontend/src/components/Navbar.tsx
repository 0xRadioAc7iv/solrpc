import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full relative">
      <div className="border border-slate-900 rounded-2xl flex items-center justify-between mx-72 px-3 mt-4 bg-purple-950/10 backdrop-blur-md shadow-md">
        {/* Logo */}
        <div>
          <Image src="/icon.png" height={40} width={40} alt="Logo" className="pt-1.5"/>
        </div>

        {/* Navigation Links - with shiny border */}
        <div className="flex items-center gap-6 text-md px-8 text-slate-300 py-2 relative rounded-full">
          <span className="cursor-pointer  hover:text-white hover:text-shadow-glow transition-all duration-300">
            Product
          </span>
          <span className="cursor-pointer hover:text-white hover:text-shadow-glow transition-all duration-300">
            Features
          </span>
          <span className="cursor-pointer hover:text-white hover:text-shadow-glow transition-all duration-300">
            Docs
          </span>
          <span className="cursor-pointer hover:text-white hover:text-shadow-glow transition-all duration-300">
            Changelog
          </span>
        </div>

        {/* CTA Button */}
        <div>
          <button className="custom-get-started-button py-1.5 px-6 rounded-lg">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

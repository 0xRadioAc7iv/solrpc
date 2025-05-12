// components/SearchBar.tsx

import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-[#050816] px-64 py-3 ml-6 border-b border-gray-600/30">
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
        />
      </div>
    </div>
  );
}

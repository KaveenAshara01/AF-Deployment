// import { useState, useEffect } from 'react';
// import CountryCard from '../components/CountryCard';
// import SearchBar from '../components/SearchBar';
// import RegionFilter from '../components/RegionFilter';

// function Home() {
//   const [countries, setCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
//   const [region, setRegion] = useState(localStorage.getItem('region') || 'All');
//   const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Persist searchTerm, region, and favorites to localStorage
//   useEffect(() => {
//     localStorage.setItem('searchTerm', searchTerm);
//   }, [searchTerm]);

//   useEffect(() => {
//     localStorage.setItem('region', region);
//   }, [region]);

//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//   }, [favorites]);

//   // Fetch countries based on searchTerm and region
//   useEffect(() => {
//     const fetchCountries = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         let url;
//         let data = [];

//         // Use /name/{name} for search, optionally filter by region post-fetch
//         if (searchTerm) {
//           url = `https://restcountries.com/v3.1/name/${searchTerm}`;
//           const response = await fetch(url);
//           if (!response.ok) throw new Error('Country not found');
//           data = await response.json();
//           // Filter by region if a specific region is selected
//           if (region !== 'All') {
//             data = data.filter(country => country.region === region);
//           }
//         }
//         // Use /region/{region} when a region is selected and no search term
//         else if (region !== 'All') {
//           url = `https://restcountries.com/v3.1/region/${region}`;
//           const response = await fetch(url);
//           if (!response.ok) throw new Error(`Failed to fetch countries for region: ${region}`);
//           data = await response.json();
//         }
//         // Use /all for initial load or when no specific region or search term
//         else {
//           url = 'https://restcountries.com/v3.1/all';
//           const response = await fetch(url);
//           if (!response.ok) throw new Error('Failed to fetch all countries');
//           data = await response.json();
//         }

//         setCountries(Array.isArray(data) ? data : [data]);
//       } catch (err) {
//         setError(err.message);
//         setCountries([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCountries();
//   }, [searchTerm, region]);

//   // Fetch favorite countries
//   const favoriteCountries = countries.filter(country => favorites.includes(country.cca3));

//   const clearSession = () => {
//     localStorage.removeItem('searchTerm');
//     localStorage.removeItem('region');
//     localStorage.removeItem('favorites');
//     setSearchTerm('');
//     setRegion('All');
//     setFavorites([]);
//   };

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
//         <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
//         <RegionFilter onFilter={setRegion} region={region} />
//         <button
//           onClick={clearSession}
//           className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
//         >
//           Clear Session
//         </button>
//       </div>
//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}
//       {!loading && !error && countries.length === 0 && (
//         <p className="text-center">No countries found.</p>
//       )}
//       {favorites.length > 0 && favoriteCountries.length === 0 && (
//         <div className="mb-6">
//           <h2 className="text-xl font-bold mb-4">Favorite Countries</h2>
//           <p className="text-center text-gray-500">No matching favorite countries</p>
//         </div>
//       )}
//       {favoriteCountries.length > 0 && (
//         <div className="mb-6">
//           <h2 className="text-xl font-bold mb-4">Favorite Countries</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {favoriteCountries.map((country) => (
//               <CountryCard key={country.cca3} country={country} />
//             ))}
//           </div>
//         </div>
//       )}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {countries.map((country) => (
//           <CountryCard key={country.cca3} country={country} />
//         ))}
//       </div>
//     </div>
//   );
// }


// export default Home;
import { useState, useEffect } from 'react';
import { Search, Filter, X, MapPin, Heart, Globe, Loader2 } from 'lucide-react';
import CountryCard from '../components/CountryCard';

function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const [region, setRegion] = useState(localStorage.getItem('region') || 'All');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  // Persist values to localStorage
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('region', region);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('darkMode', isDarkMode);
  }, [searchTerm, region, favorites, isDarkMode]);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Fetch countries based on searchTerm and region
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        let url;
        let data = [];

        if (searchTerm) {
          url = `https://restcountries.com/v3.1/name/${searchTerm}`;
          const response = await fetch(url);
          if (!response.ok) throw new Error('Country not found');
          data = await response.json();
          if (region !== 'All') {
            data = data.filter(country => country.region === region);
          }
        } else if (region !== 'All') {
          url = `https://restcountries.com/v3.1/region/${region}`;
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch countries for region: ${region}`);
          data = await response.json();
        } else {
          url = 'https://restcountries.com/v3.1/all';
          const response = await fetch(url);
          if (!response.ok) throw new Error('Failed to fetch all countries');
          data = await response.json();
        }

        setCountries(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err.message);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [searchTerm, region]);

  // Fetch favorite countries
  const favoriteCountries = countries.filter(country => favorites.includes(country.cca3));

  const clearSession = () => {
    localStorage.removeItem('searchTerm');
    localStorage.removeItem('region');
    localStorage.removeItem('favorites');
    setSearchTerm('');
    setRegion('All');
    setFavorites([]);
  };

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-white text-gray-900 dark:text-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with controls */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore Our World
            </h1>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white dark:bg-gray-100 shadow-md hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Search and filter controls */}
          <div className="bg-white dark:bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for a country..."
                  className="pl-10 pr-4 py-3 w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 dark:text-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                  </button>
                )}
              </div>

              <div className="relative min-w-[200px]">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-between gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-50 rounded-xl border border-gray-200 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors w-full"
                >
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-gray-500 dark:text-gray-400" />
                    <span>{region === 'All' ? 'Filter by Region' : region}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isFilterOpen && (
                  <div className="absolute z-10 mt-2 w-full rounded-xl bg-white dark:bg-white shadow-lg py-1 overflow-hidden border border-gray-100 dark:border-gray-200">
                    {regions.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setRegion(r);
                          setIsFilterOpen(false);
                        }}
                        className={`block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors ${
                          region === r ? 'bg-blue-50 dark:bg-blue-50 text-blue-600 dark:text-blue-600' : ''
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={clearSession}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl shadow-md hover:from-red-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <X size={16} />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status messages */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-blue-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Loading countries...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-6 rounded-xl text-center my-8">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium">{error}</p>
              <p className="text-sm mt-2">Please try a different search term or region</p>
            </div>
          </div>
        )}

        {!loading && !error && countries.length === 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 p-8 rounded-xl text-center my-8">
            <div className="flex flex-col items-center">
              <Globe size={48} className="text-blue-500 mb-4 opacity-70" />
              <p className="text-xl font-medium">No countries found</p>
              <p className="text-sm mt-2">Try adjusting your search or filter</p>
            </div>
          </div>
        )}

        {/* Favorite countries section */}
        {favorites.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Heart size={24} className="text-red-500" />
              <h2 className="text-2xl font-bold">Favorite Countries</h2>
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {favoriteCountries.length}
              </span>
            </div>
            
            {favoriteCountries.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-500 p-6 bg-gray-100 dark:bg-gray-100 rounded-xl border border-gray-200 dark:border-gray-200">
                <p>No matching favorite countries</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteCountries.map((country) => (
                  <CountryCard key={country.cca3} country={country} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* All countries */}
        {countries.length > 0 && !favorites.includes(countries.length) && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Globe size={24} className="text-blue-500" />
              <h2 className="text-2xl font-bold">
                {region === 'All' ? 'All Countries' : `Countries in ${region}`}
              </h2>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {countries.filter(country => !favorites.includes(country.cca3)).length}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {countries
                .filter(country => !favorites.includes(country.cca3))
                .map((country) => (
                  <CountryCard key={country.cca3} country={country} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;





// import { useState, useEffect } from 'react';
// import CountryCard from '../components/CountryCard';

// function Home() {
//   const [countries, setCountries] = useState([]);
//   const [favorites, setFavorites] = useState(() => {
//     return JSON.parse(localStorage.getItem('favorites')) || [];
//   });
//   const [search, setSearch] = useState('');
//   const [region, setRegion] = useState('All');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Defensive check for fetch
//     if (!window.fetch) {
//       setError('Fetch API is not available');
//       return;
//     }

//     fetch('https://restcountries.com/v3.1/all')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch all countries');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setCountries(data);
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
//   }, []);




//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//   }, [favorites]);

//   const filteredFavorites = countries.filter(
//     (country) =>
//       favorites.includes(country.cca3) &&
//       (search === '' || country.name.common.toLowerCase().includes(search.toLowerCase())) &&
//       (region === 'All' || country.region === region)
//   );

//   const filteredCountries = countries.filter(
//     (country) =>
//       (search === '' || country.name.common.toLowerCase().includes(search.toLowerCase())) &&
//       (region === 'All' || country.region === region)
//   );

//   const handleClearSession = () => {
//     setFavorites([]);
//     setSearch('');
//     setRegion('All');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {error && <p className="text-center text-red-500">{error}</p>}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
//         <input
//           type="text"
//           placeholder="Search for a country..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="p-2 border rounded-md w-full sm:w-1/2"
//         />
//         <select
//           value={region}
//           onChange={(e) => setRegion(e.target.value)}
//           className="p-2 border rounded-md w-full sm:w-1/4"
//         >
//           <option value="All">All</option>
//           <option value="Africa">Africa</option>
//           <option value="Americas">Americas</option>
//           <option value="Asia">Asia</option>
//           <option value="Europe">Europe</option>
//           <option value="Oceania">Oceania</option>
//         </select>
//         <button
//           onClick={handleClearSession}
//           className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
//         >
//           Clear Session
//         </button>
//       </div>
//       <div className="mb-6">
//         <h2 className="text-xl font-bold mb-4">Favorite Countries</h2>
//         {filteredFavorites.length === 0 ? (
//           <p className="text-center text-gray-500">No matching favorite countries</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {filteredFavorites.map((country) => (
//               <CountryCard key={country.cca3} country={country} />
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {filteredCountries.map((country) => (
//           <CountryCard key={country.cca3} country={country} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;
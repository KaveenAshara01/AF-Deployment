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
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';

function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const [region, setRegion] = useState(localStorage.getItem('region') || 'All');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist searchTerm, region, and favorites to localStorage
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('region', region);
  }, [region]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch countries based on searchTerm and region
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        let url;
        let data = [];

        // Use /name/{name} for search, optionally filter by region post-fetch
        if (searchTerm) {
          url = `https://restcountries.com/v3.1/name/${searchTerm}`;
          const response = await fetch(url);
          if (!response.ok) throw new Error('Country not found');
          data = await response.json();
          // Filter by region if a specific region is selected
          if (region !== 'All') {
            data = data.filter(country => country.region === region);
          }
        }
        // Use /region/{region} when a region is selected and no search term
        else if (region !== 'All') {
          url = `https://restcountries.com/v3.1/region/${region}`;
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch countries for region: ${region}`);
          data = await response.json();
        }
        // Use /all for initial load or when no specific region or search term
        else {
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
        <RegionFilter onFilter={setRegion} region={region} />
        <button
          onClick={clearSession}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
        >
          Clear Session
        </button>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && countries.length === 0 && (
        <p className="text-center">No countries found.</p>
      )}
      {favorites.length > 0 && favoriteCountries.length === 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Favorite Countries</h2>
          <p className="text-center text-gray-500">No matching favorite countries</p>
        </div>
      )}
      {favoriteCountries.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Favorite Countries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
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
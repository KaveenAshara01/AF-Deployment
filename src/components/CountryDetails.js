import { useState, useEffect } from 'react';

function CountryDetails({ country }) {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const isFavorite = favorites.includes(country.cca3);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(code => code !== country.cca3);
    } else {
      updatedFavorites = [...favorites, country.cca3];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl mx-auto">
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="max-w-xs w-full h-auto rounded-md border border-gray-200 shadow-sm mx-auto"
      />
      <h2 className="text-3xl font-bold mt-6 text-gray-900">{country.name.common}</h2>
      <div className="mt-4 space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Official Name:</span> {country.name.official}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Languages:</span> {Object.values(country.languages || {}).join(', ')}
        </p>
      </div>
      <button
        onClick={toggleFavorite}
        className={`mt-6 px-6 py-3 rounded-md font-medium text-white ${
          isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } transition-colors duration-200`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default CountryDetails;
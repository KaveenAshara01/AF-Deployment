// import { Link } from 'react-router-dom';

// function CountryCard({ country }) {
//   return (
//     <Link to={`/country/${country.cca3}`} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
//       <img src={country.flags.png} alt={`${country.name.common} flag`} className="w-full h-40 object-cover" />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">{country.name.common}</h2>
//         <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
//         <p><strong>Region:</strong> {country.region}</p>
//         <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
//       </div>
//     </Link>
//   );
// }

// export default CountryCard;



import { Link } from 'react-router-dom';

function CountryCard({ country }) {
  // Check if country and country.flags exist before accessing flags.png
  if (!country || !country.flags || !country.flags.png) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
        <p className="text-red-500">Invalid country data</p>
      </div>
    );
  }

  return (
    <Link to={`/country/${country.cca3}`} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={country.flags.png} alt={`${country.name.common} flag`} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{country.name.common}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      </div>
    </Link>
  );
}

export default CountryCard;
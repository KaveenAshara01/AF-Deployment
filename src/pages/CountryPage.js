import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountryDetails from '../components/CountryDetails';

function CountryPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await response.json();
        setCountry(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };
    fetchCountry();
  }, [code]);

  if (!country) return <div>Loading...</div>;

  return <CountryDetails country={country} />;
}

export default CountryPage;
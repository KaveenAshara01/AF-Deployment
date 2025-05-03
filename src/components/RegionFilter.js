function RegionFilter({ onFilter, region }) {
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
    const handleFilter = (e) => {
      onFilter(e.target.value);
    };
  
    return (
      <select
        value={region}
        onChange={handleFilter}
        className="p-2 border rounded-md w-full sm:w-1/4"
      >
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    );
  }
  
  export default RegionFilter;
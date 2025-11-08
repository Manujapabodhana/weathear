export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <form className="toolbar" onSubmit={onSearch}>
      <input
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a city (e.g., Colombo)"
      />
      <button className="btn" type="submit">Search</button>
    </form>
  );
}

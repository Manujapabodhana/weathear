export default function SearchBar(){
  return (
    <div className="toolbar">
      <input className="input" placeholder="Enter a city" disabled />
      <button className="btn" disabled>Add City</button>
    </div>
  );
}

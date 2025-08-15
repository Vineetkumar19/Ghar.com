
export default function FilterBar({filters, setFilters}){
  const set = (key, value)=> setFilters(prev=>({...prev, [key]: value}))

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select value={filters.type} onChange={e=>set('type', e.target.value)} className="px-3 py-2 border rounded-lg">
        <option value="">Type</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Studio">Studio</option>
        <option value="Builder">Builder</option>
      </select>

      <select value={filters.beds} onChange={e=>set('beds', e.target.value)} className="px-3 py-2 border rounded-lg">
        <option value="">Beds</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>

      <select value={filters.sort} onChange={e=>set('sort', e.target.value)} className="px-3 py-2 border rounded-lg">
        <option value="">Sort</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating</option>
      </select>
    </div>
  )
}

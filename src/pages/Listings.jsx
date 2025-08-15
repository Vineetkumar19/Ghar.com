
import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import data from '../data/properties.json'
import PropertyCard from '../components/PropertyCard.jsx'
import FilterBar from '../components/FilterBar.jsx'

export default function Listings(){
  const [params] = useSearchParams()
  const [filters, setFilters] = useState({ type: '', beds: '', sort: '' })
  const [tick, setTick] = useState(0)
  useEffect(()=>{ const h=()=>setTick(t=>t+1); window.addEventListener('favouritesUpdated',h); return ()=>window.removeEventListener('favouritesUpdated',h) },[])

  const filtered = useMemo(()=>{
    let list = [...data]

    const city = params.get('city')?.toLowerCase() || ''
    const min = Number(params.get('min') || 0)
    const max = Number(params.get('max') || 0)

    if(city){
      list = list.filter(i => i.city.toLowerCase().includes(city))
    }
    if(min){
      list = list.filter(i => i.price >= min)
    }
    if(max){
      list = list.filter(i => i.price <= max)
    }
    if(filters.type){
      list = list.filter(i => i.type === filters.type)
    }
    if(filters.beds){
      list = list.filter(i => (filters.beds === '4') ? i.beds >= 4 : i.beds === Number(filters.beds))
    }
    if(filters.sort){
      const [key, dir] = filters.sort.split('-')
      if(key === 'price'){
        list.sort((a,b)=> dir==='asc' ? a.price-b.price : b.price-a.price)
      } else if(key === 'rating'){
        list.sort((a,b)=> b.rating-a.rating)
      }
    }
    return list
  }, [params, filters, tick])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Discover Properties</h1>
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {filtered.length === 0 ? (
        <div className="p-10 text-center bg-white rounded-xl shadow-soft">No results. Try adjusting filters or search terms.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map(h => <PropertyCard key={h.id} home={h} />)}
        </div>
      )}
    </div>
  )
}

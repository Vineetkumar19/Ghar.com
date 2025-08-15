
import data from '../data/properties.json'
import PropertyCard from '../components/PropertyCard.jsx'
import { getFavourites } from '../utils/storage'
import { useEffect, useState } from 'react'

export default function Favourites(){
  const [favIds, setFavIds] = useState(getFavourites())
  useEffect(()=>{
    const onH = ()=> setFavIds(getFavourites())
    window.addEventListener('favouritesUpdated', onH)
    return ()=> window.removeEventListener('favouritesUpdated', onH)
  },[])
  const favs = data.filter(d => favIds.includes(d.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Favourites</h1>
      {favs.length === 0 ? (
        <div className="p-10 text-center bg-white rounded-xl shadow-soft">No favourites yet. Tap the heart on a listing to save it.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {favs.map(h => <PropertyCard key={h.id} home={h} />)}
        </div>
      )}
    </div>
  )
}

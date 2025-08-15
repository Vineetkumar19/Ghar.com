
const LS_FAV = 'ghar:favourites'
const LS_PROFILE = 'ghar:profile'
const LS_BOOKINGS = 'ghar:bookings'

export function getFavourites(){
  try { return JSON.parse(localStorage.getItem(LS_FAV)) || [] }
  catch { return [] }
}
export function isFavourite(id){
  return getFavourites().includes(id)
}
export function toggleFavourite(id){
  const favs = new Set(getFavourites())
  if(favs.has(id)) favs.delete(id)
  else favs.add(id)
  localStorage.setItem(LS_FAV, JSON.stringify([...favs]))
  // custom event for same-tab updates
  window.dispatchEvent(new Event('favouritesUpdated'))
}

export function getProfile(){
  try {
    return JSON.parse(localStorage.getItem(LS_PROFILE)) || {
      name: "Vineet",
      email: "vineet@example.com",
      phone: "",
      city: "New Delhi",
      bio: "Full-stack developer exploring real estate UX."
    }
  } catch { return { name: "", email: "", phone: "", city: "", bio: "" } }
}
export function saveProfile(profile){ localStorage.setItem(LS_PROFILE, JSON.stringify(profile)) }

export function getBookings(){
  try { return JSON.parse(localStorage.getItem(LS_BOOKINGS)) || [] }
  catch { return [] }
}
export function addBooking(booking){
  const list = getBookings()
  list.push(booking)
  localStorage.setItem(LS_BOOKINGS, JSON.stringify(list))
  window.dispatchEvent(new Event('bookingsUpdated'))
}

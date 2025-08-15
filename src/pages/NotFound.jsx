
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-600 mb-6">The page you are looking for doesn’t exist.</p>
      <Link to="/" className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600">Go Home</Link>
    </div>
  )
}

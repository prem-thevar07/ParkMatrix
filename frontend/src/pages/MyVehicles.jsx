import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import API from "../api"
import { CarFront, Hash, Building, User, Search, QrCode } from "lucide-react"

function MyVehicles() {
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
      return
    }

    const fetchVehicles = async () => {
      try {
        const res = await API.get("/user-vehicals")
        setVehicles(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [navigate])

  const filteredVehicles = vehicles.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow p-4 sm:p-8 relative">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <CarFront className="text-purple-400" size={32} />
                Vehicle Directory
              </h1>
              <p className="text-slate-400 mt-2">Manage and search registered vehicles in the system</p>
            </div>

            <div className="relative max-w-md w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-slate-400" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by name, enrollment, or vehicle no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors backdrop-blur-sm"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <span className="flex h-4 w-4 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500"></span>
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.map((v) => (
                <div key={v._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col">
                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white truncate pr-2">{v.name}</h3>
                      <span className="text-xs font-mono font-medium bg-slate-800 text-slate-300 px-2 py-1 rounded border border-white/10">
                        {v.vehical_ID || "N/A"}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Hash size={16} className="text-slate-500" />
                        <span className="text-slate-400 w-20">Enrollment:</span>
                        <span className="font-medium text-slate-200">{v.enrollmentNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Building size={16} className="text-slate-500" />
                        <span className="text-slate-400 w-20">Dept:</span>
                        <span className="font-medium text-slate-200">{v.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <CarFront size={16} className="text-slate-500" />
                        <span className="text-slate-400 w-20">Vehicle:</span>
                        <span className="font-mono text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded text-xs">{v.vehicleNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-slate-800/50 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-400 capitalize">{v.vehicleType}</span>
                    <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 text-sm font-medium">
                      <QrCode size={16} /> View QR
                    </button>
                  </div>
                </div>
              ))}

              {filteredVehicles.length === 0 && (
                <div className="col-span-full py-16 text-center bg-white/5 rounded-2xl border border-white/10 border-dashed">
                  <Search size={48} className="mx-auto text-slate-600 mb-4" />
                  <h3 className="text-xl font-medium text-slate-300">No vehicles found</h3>
                  <p className="text-slate-500 mt-2">Try adjusting your search term.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyVehicles

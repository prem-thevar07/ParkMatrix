import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import API from "../api"
import { CarFront, MapPin, Hash, User, Building, LogIn, LogOut, Clock, Activity } from "lucide-react"

function ParkingDashboard() {
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  useEffect(() => {
    const normalize = (id) => id?.toString().trim().toLowerCase()

    const fetchData = async () => {
      try {
        const [parkingRes, userRes] = await Promise.all([
          API.get("/parking/parking-data"),
          API.get("/user-vehicals")
        ]);

        const parkingData = parkingRes.data;
        const users = userRes.data;

        const mergedData = (Array.isArray(parkingData) ? parkingData : []).map(p => {
          const user = (Array.isArray(users) ? users : []).find(
            u => normalize(u.rfidUUID) === normalize(p.uid)
          )
          return {
            ...p,
            userDetails: user
          }
        })

        setVehicles(mergedData)
      } catch(err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [])


  // -------- PARKING SLOT LOGIC --------
  const totalSlots = 100 // Updated to a more realistic number for UI demo
  const vehiclesInside = vehicles.filter(v => !v.exitTime).length
  const remainingSlots = totalSlots - vehiclesInside
  const occupancyRate = totalSlots > 0 ? Math.round((vehiclesInside / totalSlots) * 100) : 0
  // ------------------------------------

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow p-4 sm:p-8 relative">
        {/* Background Accents */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-900/30 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
                <Activity className="text-indigo-400" size={36} />
                Live Dashboard
              </h1>
              <p className="text-slate-400 mt-2">Real-time overview of campus parking infrastructure</p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md">
              <MapPin className="text-emerald-400" size={20} />
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current Zone</div>
                <div className="text-white font-medium">Zone A (Main Campus)</div>
              </div>
            </div>
          </div>

          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-blue-500/20 transition-colors"></div>
              <div className="text-sm font-medium text-slate-400 mb-1">Total Capacity</div>
              <div className="text-4xl font-bold text-white">{totalSlots}</div>
              <div className="mt-4 w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-1.5 rounded-full w-full"></div>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-rose-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-rose-500/20 transition-colors"></div>
              <div className="text-sm font-medium text-slate-400 mb-1">Occupied Vehicles</div>
              <div className="text-4xl font-bold text-white flex items-baseline gap-2">
                {vehiclesInside}
                <span className="text-lg text-rose-400 font-medium">({occupancyRate}%)</span>
              </div>
              <div className="mt-4 w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                <div className={`h-1.5 rounded-full ${occupancyRate > 90 ? 'bg-rose-500' : 'bg-rose-400'}`} style={{ width: `${occupancyRate}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-emerald-500/20 transition-colors"></div>
              <div className="text-sm font-medium text-slate-400 mb-1">Available Slots</div>
              <div className="text-4xl font-bold text-emerald-400">{remainingSlots}</div>
              <div className="mt-4 w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${100 - occupancyRate}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CarFront className="text-indigo-400" size={24} />
              Recent Activity
            </h2>
            {isLoading && <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>}
          </div>

          {/* Activity Logs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {vehicles.map((v, index) => {
              const user = v.userDetails
              const isInside = !v.exitTime

              return (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors">
                  
                  {/* Card Header */}
                  <div className={`px-5 py-4 border-b border-white/10 flex justify-between items-center ${isInside ? 'bg-emerald-500/10' : 'bg-slate-800/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] ${isInside ? "bg-emerald-500 shadow-emerald-500/50" : "bg-slate-500"}`}></div>
                      <span className={`text-sm font-bold uppercase tracking-wider ${isInside ? "text-emerald-400" : "text-slate-400"}`}>
                        {isInside ? "Inside" : "Departed"}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 bg-black/20 px-2 py-1 rounded">
                      {v.uid}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <User className="text-slate-400" size={20} />
                      {user?.name || "Unregistered User"}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 flex items-center gap-1.5"><Hash size={16}/> Enrollment</span>
                        <span className="text-slate-200 font-medium">{user?.enrollmentNumber || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 flex items-center gap-1.5"><Building size={16}/> Dept</span>
                        <span className="text-slate-200 font-medium">{user?.department || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 flex items-center gap-1.5"><CarFront size={16}/> Type</span>
                        <span className="text-slate-200 font-medium capitalize">{user?.vehicleType || "N/A"}</span>
                      </div>
                      
                      <div className="h-px w-full bg-white/10 my-4"></div>

                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-indigo-500/20 p-1.5 rounded-lg text-indigo-400"><LogIn size={16}/></div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase font-semibold">Entry Time</div>
                          <div className="text-sm text-slate-200 mt-0.5">
                            {v.entryTime ? new Date(v.entryTime).toLocaleString(undefined, {
                              dateStyle: 'short', timeStyle: 'short'
                            }) : "N/A"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 pt-2">
                        <div className={`mt-1 p-1.5 rounded-lg ${v.exitTime ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700/50 text-slate-500'}`}>
                          <LogOut size={16}/>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase font-semibold">Exit Time</div>
                          <div className={`text-sm mt-0.5 ${v.exitTime ? 'text-slate-200' : 'text-slate-500 italic'}`}>
                            {v.exitTime ? new Date(v.exitTime).toLocaleString(undefined, {
                              dateStyle: 'short', timeStyle: 'short'
                            }) : "Currently Parked"}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })}
            
            {vehicles.length === 0 && !isLoading && (
              <div className="col-span-full py-20 text-center">
                <Clock className="mx-auto text-slate-600 mb-4" size={48} />
                <h3 className="text-xl font-medium text-slate-300">No Activity Yet</h3>
                <p className="text-slate-500 mt-2">Waiting for vehicles to scan in...</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ParkingDashboard
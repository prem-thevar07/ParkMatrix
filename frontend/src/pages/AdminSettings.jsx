import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Settings, Shield, MapPin, Zap, Save, Trash2, Plus } from "lucide-react"

function AdminSettings() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  const [zones, setZones] = useState([
    { id: 1, name: "Zone A (Main Campus)", capacity: 100, active: true },
    { id: 2, name: "Zone B (Engineering)", capacity: 75, active: true },
    { id: 3, name: "Zone VIP (Faculty)", capacity: 20, active: false }
  ])

  const [blacklisted, setBlacklisted] = useState([
    { id: 1, vehNumber: "MH 12 AB 1234", reason: "Unpaid fines", date: "2026-05-01" },
    { id: 2, vehNumber: "DL 01 CD 5678", reason: "Reckless driving", date: "2026-04-28" }
  ])

  const toggleZone = (id) => {
    setZones(zones.map(z => z.id === id ? { ...z, active: !z.active } : z))
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow p-4 sm:p-8 relative">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-rose-900/20 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Settings className="text-rose-400" size={32} />
                Admin Configuration
              </h1>
              <p className="text-slate-400 mt-2">Manage zones, capacities, and security blacklists</p>
            </div>
            <button className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
              <Save size={18} /> Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Zone Management */}
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="text-emerald-400" size={24} />
                    Parking Zones
                  </h2>
                  <button className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 text-sm font-medium">
                    <Plus size={16} /> Add Zone
                  </button>
                </div>

                <div className="space-y-4">
                  {zones.map(zone => (
                    <div key={zone.id} className="bg-slate-800/50 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-slate-800 transition-colors">
                      <div>
                        <h3 className="text-white font-medium">{zone.name}</h3>
                        <p className="text-slate-400 text-sm mt-0.5">Capacity: {zone.capacity} slots</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => toggleZone(zone.id)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${zone.active ? 'bg-emerald-500' : 'bg-slate-600'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${zone.active ? 'left-7' : 'left-1'}`}></div>
                        </button>
                        <button className="text-slate-500 hover:text-rose-400 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Config */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Zap className="text-amber-400" size={24} />
                  Hardware Integrations
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <div>
                      <div className="text-white font-medium">Boom Barrier API Sync</div>
                      <div className="text-xs text-amber-400 mt-1">Status: Active</div>
                    </div>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                      Configure
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <div>
                      <div className="text-white font-medium">RFID Reader Network</div>
                      <div className="text-xs text-slate-500 mt-1">Status: Offline</div>
                    </div>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blacklist Management */}
            <div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Shield className="text-rose-400" size={24} />
                    Security Blacklist
                  </h2>
                  <button className="bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium">
                    <Plus size={16} /> Flag Vehicle
                  </button>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 mb-6">
                  <p className="text-rose-200 text-sm">
                    <strong>Warning:</strong> Vehicles on this list will be immediately denied access at all entry gates.
                  </p>
                </div>

                <div className="space-y-4">
                  {blacklisted.map(item => (
                    <div key={item.id} className="bg-slate-800/50 border border-rose-500/20 rounded-xl p-4 flex justify-between items-center group hover:border-rose-500/50 transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-white bg-slate-900 px-2 py-0.5 rounded text-sm">{item.vehNumber}</span>
                          <span className="text-xs text-slate-500">{item.date}</span>
                        </div>
                        <div className="text-sm text-slate-400 mt-2">{item.reason}</div>
                      </div>
                      <button className="text-slate-500 hover:text-emerald-400 transition-colors px-3 py-1 border border-transparent hover:border-emerald-500/30 rounded text-sm">
                        Unban
                      </button>
                    </div>
                  ))}
                  
                  <div className="border border-dashed border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:border-slate-500 transition-colors">
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                      <Plus size={16} /> Add new violation record
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { BarChart3, TrendingUp, Users, CarFront, AlertCircle, Clock } from "lucide-react"

function Analytics() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow p-4 sm:p-8 relative">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="text-blue-400" size={32} />
              Analytics & Reports
            </h1>
            <p className="text-slate-400 mt-2">Historical data, trends, and campus parking insights</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <TrendingUp className="text-blue-400" size={24} />
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">+12.5%</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">Total Scans (Today)</h3>
              <p className="text-3xl font-bold text-white mt-1">1,284</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Users className="text-purple-400" size={24} />
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">+3.2%</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">Active Users</h3>
              <p className="text-3xl font-bold text-white mt-1">842</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <Clock className="text-amber-400" size={24} />
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">Avg. Parking Duration</h3>
              <p className="text-3xl font-bold text-white mt-1">4h 12m</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-rose-500/20 rounded-xl">
                  <AlertCircle className="text-rose-400" size={24} />
                </div>
                <span className="text-xs font-semibold text-rose-400 bg-rose-400/10 px-2 py-1 rounded-full">+2 today</span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">Access Denied</h3>
              <p className="text-3xl font-bold text-white mt-1">14</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Main Bar Chart (Mocked) */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-6">Traffic Over Time</h3>
              <div className="h-64 flex items-end justify-between gap-2 px-2">
                {[40, 30, 60, 80, 100, 70, 50, 85, 90, 65, 45, 30].map((height, i) => (
                  <div key={i} className="w-full flex flex-col items-center gap-2 group">
                    <div 
                      className="w-full bg-blue-500/30 rounded-t-sm group-hover:bg-blue-400 transition-colors relative"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {height * 10}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{i * 2}h</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Types Breakdown (Mocked) */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
              <h3 className="text-lg font-bold text-white mb-6">Vehicle Distribution</h3>
              <div className="flex-grow flex items-center justify-center">
                <div className="relative w-48 h-48 rounded-full border-[16px] border-slate-800 flex items-center justify-center">
                  {/* CSS pie chart mock using conic-gradient */}
                  <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#60a5fa 0% 65%, #c084fc 65% 100%)', zIndex: -1 }}></div>
                  <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-white">65%</span>
                    <span className="text-xs text-slate-400">Cars</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-slate-300">Cars</span>
                  </div>
                  <span className="text-white font-medium">65%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                    <span className="text-slate-300">Bikes / Two-wheelers</span>
                  </div>
                  <span className="text-white font-medium">35%</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Analytics

import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { PlusCircle, ScanLine, CarFront, ArrowRight } from "lucide-react"

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  const actions = [
    {
      title: "Register Vehicle",
      description: "Add a new vehicle to the parking system securely.",
      icon: <PlusCircle size={32} className="text-indigo-400" />,
      path: "/form",
      color: "from-indigo-500/20 to-blue-500/20 border-indigo-500/30"
    },
    {
      title: "Scan QR",
      description: "Verify vehicle entry and exit instantly.",
      icon: <ScanLine size={32} className="text-emerald-400" />,
      path: "/scan",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
    },
    {
      title: "Parking Status",
      description: "View real-time parking activity and capacity.",
      icon: <CarFront size={32} className="text-purple-400" />,
      path: "/parking-status",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 flex-grow">
        
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-indigo-900/20 blur-[100px] mix-blend-screen"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/20 blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mt-2">
                ParkMatrix Dashboard
              </span>
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-slate-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Manage your entire parking infrastructure from one unified control center. Monitor spaces, register vehicles, and streamline access effortlessly.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="mt-20 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
            {actions.map((action, index) => (
              <div
                key={index}
                onClick={() => navigate(action.path)}
                className={`flex flex-col rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-white/5 border backdrop-blur-sm group ${action.color}`}
              >
                <div className="flex-1 p-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {action.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {action.title}
                  </h3>
                  <p className="text-slate-300 text-base">
                    {action.description}
                  </p>
                </div>
                <div className="bg-slate-800/30 px-8 py-4 border-t border-white/5 flex justify-between items-center group-hover:bg-slate-800/50 transition-colors">
                  <span className="text-sm font-medium text-white">Get Started</span>
                  <ArrowRight size={18} className="text-white transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats or Decorative Section */}
          <div className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-4 border-t border-white/10 pt-10">
             <div className="text-center">
               <div className="text-3xl font-bold text-indigo-400">99.9%</div>
               <div className="text-sm text-slate-400 mt-1">Uptime</div>
             </div>
             <div className="text-center">
               <div className="text-3xl font-bold text-emerald-400">Secure</div>
               <div className="text-sm text-slate-400 mt-1">Encrypted Data</div>
             </div>
             <div className="text-center">
               <div className="text-3xl font-bold text-purple-400">Real-time</div>
               <div className="text-sm text-slate-400 mt-1">Sync</div>
             </div>
             <div className="text-center">
               <div className="text-3xl font-bold text-pink-400">24/7</div>
               <div className="text-sm text-slate-400 mt-1">Monitoring</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
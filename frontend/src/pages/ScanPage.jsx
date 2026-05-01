import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Html5QrcodeScanner } from "html5-qrcode"
import Navbar from "../components/Navbar"
import API from "../api"
import { ScanLine, CheckCircle2, User, Hash, Building, CarFront, AlertTriangle } from "lucide-react"

function ScanPage() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
      return
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    )

    scanner.render(
      async (decodedText) => {
        try {
          const res = await API.get(`/vehicle/${decodedText}`)
          setData(res.data)
          setError(null)
        } catch (err) {
          setError(err.response?.data?.message || "Invalid QR Code or Vehicle Not Found")
          setData(null)
        }
      },
      (error) => {
        // Ignore general scan errors
      }
    )

    return () => {
      // Clean up on unmount to prevent multiple scanner instances
      scanner.clear().catch(e => console.error("Scanner cleanup failed", e))
    }
  }, [navigate])

  const resetScan = () => {
    setData(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center py-12 px-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none"></div>
        
        <div className="text-center mb-10 z-10">
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <ScanLine className="text-emerald-400" size={32} />
            Scanner Gateway
          </h2>
          <p className="mt-2 text-slate-400 max-w-md mx-auto">
            Position the vehicle's QR code within the frame to verify access and log entry/exit.
          </p>
        </div>

        <div className="w-full max-w-md z-10 space-y-6">
          
          {/* Scanner Container */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-4 bg-slate-800/80 border-b border-white/5 flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">Live Camera / File Feed</span>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            {/* The ID must match where HTML5QrcodeScanner renders */}
            <div id="reader" className="w-full bg-black/50 scanner-container"></div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 text-center animate-fade-in backdrop-blur-md">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Verification Failed</h3>
              <p className="text-red-200 mb-6">{error}</p>
              <button 
                onClick={resetScan}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors border border-white/10"
              >
                Clear Error
              </button>
            </div>
          )}

          {/* Success Result State */}
          {data && (
            <div className="bg-gradient-to-br from-emerald-900/40 to-slate-800/80 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl animate-fade-in backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CarFront size={100} />
              </div>
              
              <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4 relative z-10">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-emerald-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Access Granted</h3>
                  <p className="text-emerald-300 text-sm">Vehicle verified successfully</p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 text-slate-300">
                  <User size={18} className="text-slate-500" />
                  <span className="w-24 text-sm text-slate-500">Owner</span>
                  <span className="font-medium text-white">{data.name}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Hash size={18} className="text-slate-500" />
                  <span className="w-24 text-sm text-slate-500">Vehicle No.</span>
                  <span className="font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">{data.vehicleNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Building size={18} className="text-slate-500" />
                  <span className="w-24 text-sm text-slate-500">Dept.</span>
                  <span className="font-medium text-white">{data.department}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <CarFront size={18} className="text-slate-500" />
                  <span className="w-24 text-sm text-slate-500">Type</span>
                  <span className="font-medium text-white capitalize">{data.vehicleType}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-3 relative z-10">
                <button 
                  onClick={resetScan}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-emerald-500/20"
                >
                  Clear Results
                </button>
                <button className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-white/10" title="Report Issue">
                  <AlertTriangle size={20} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      
      {/* Global overrides to fix html5-qrcode ugly default styles */}
      <style dangerouslySetInnerHTML={{__html: `
        #reader { border: none !important; padding-bottom: 15px !important; }
        #reader a { color: #818cf8 !important; text-decoration: underline !important; font-weight: 700 !important; font-size: 16px !important; display: inline-block !important; margin: 15px 0 !important; cursor: pointer !important; }
        #reader a:hover { color: #a5b4fc !important; }
        #reader span { color: white !important; }
        #reader select { background: #1e293b !important; color: white !important; border: 1px solid #334155 !important; padding: 8px !important; border-radius: 6px !important; width: 100% !important; margin: 10px 0 !important; }
        #reader button { background: #4f46e5 !important; color: white !important; border: none !important; padding: 10px 20px !important; border-radius: 8px !important; cursor: pointer !important; font-weight: 600 !important; margin: 10px 0 !important; width: 100%; transition: background 0.2s; }
        #reader button:hover { background: #4338ca !important; }
        #reader input[type="file"] { color: white !important; padding: 15px 0; width: 100%; font-size: 15px; }
        #reader input[type="file"]::file-selector-button { background: #1e293b; color: white; border: 1px solid #334155; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-right: 15px; transition: background 0.2s; }
        #reader input[type="file"]::file-selector-button:hover { background: #334155; }
      `}} />
    </div>
  )
}

export default ScanPage
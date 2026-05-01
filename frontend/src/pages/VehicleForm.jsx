import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import API from "../api"
import { CarFront, KeySquare, Hash, User, Building, QrCode } from "lucide-react"

function VehicleForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    enrollmentNumber: "",
    department: "",
    vehicleNumber: "",
    vehicleType: "",
    rfidUUID: ""
  })
  const [qr, setQr] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await API.post("/vehicle/create", form);
      setQr(res.data.qr)
      alert("Vehicle Registered Successfully")
    } catch (err) {
      console.log(err)
      alert("Error registering vehicle")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

        <div className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 z-10">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
              Register Vehicle
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              Enter the vehicle details to generate an access QR code.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={submit}>
            <div className="space-y-4">
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400 transition-colors"
                  placeholder="Student Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Hash size={18} />
                </div>
                <input
                  name="enrollmentNumber"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400 transition-colors"
                  placeholder="Enrollment Number"
                  value={form.enrollmentNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Building size={18} />
                </div>
                <input
                  name="department"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400 transition-colors"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <CarFront size={18} />
                </div>
                <input
                  name="vehicleNumber"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400 transition-colors"
                  placeholder="Vehicle Number"
                  value={form.vehicleNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <CarFront size={18} />
                </div>
                <input
                  name="vehicleType"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400 transition-colors"
                  placeholder="Vehicle Type (Bike/Car)"
                  value={form.vehicleType}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeySquare size={18} />
                </div>
                <input
                  name="rfidUUID"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-400 transition-colors"
                  placeholder="RFID Tag ID"
                  value={form.rfidUUID}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register Vehicle"}
            </button>
          </form>

          {qr && (
            <div className="mt-8 pt-6 border-t border-white/10 text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
                <QrCode size={24} />
              </div>
              <h3 className="text-lg font-medium text-white mb-4">Registration QR Code</h3>
              <div className="bg-white p-4 rounded-xl inline-block shadow-lg">
                <img src={qr} alt="Vehicle QR" className="w-48 h-48" />
              </div>
              <p className="mt-4 text-sm text-slate-400">Save this QR code for access verification.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VehicleForm
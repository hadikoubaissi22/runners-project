import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { 
  User, Phone, MapPin, Activity, 
  Calendar, Clock, CheckCircle, 
  Loader2, Trophy, Footprints, MessageSquare 
} from 'lucide-react';
import Swal from 'sweetalert2';

const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function RunnerRegistration() {
  const { 
    register, 
    handleSubmit, 
    watch, 
    reset,
    formState: { errors } 
  } = useForm({
    mode: "onBlur" // Validate on blur for better UX
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error
  
  // Watch days to toggle styling and time inputs
  const watchedDays = watch('days') || {};

  const onSubmit = async (data) => {
    setStatus('idle');
    
    // Transform data
    const selectedDays = Object.keys(data.days || {})
      .filter(d => data.days[d]?.checked)
      .map(d => ({ day: d, time: data.days[d].time }));

    if (!selectedDays.length) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please select at least one training day.',
        confirmButtonText: 'OK'
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulation of API call for demo purposes
      // Replace with your actual axios call:
      await axios.post(import.meta.env.VITE_API_URL + '/register', {
         ...data,
         days: selectedDays
      });
      
      // Simulate delay if API is too fast
      // await new Promise(resolve => setTimeout(resolve, 1500));

      setStatus('success');
      reset(); // Clear form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Helper component for error messages
  const ErrorMsg = ({ error }) => (
    error ? <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span className="inline-block w-1 h-1 bg-red-500 rounded-full"/> {error.message}</p> : null
  );

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6 animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">You're In!</h2>
          <p className="text-slate-500">
            Thanks for joining the Runners Group. Get your running shoes ready!
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
          >
            Register Another Runner
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 lg:p-8 font-sans">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden border border-slate-100"
      >
        {/* Header Section */}
        <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-3">
              <span className="bg-indigo-500 p-2 rounded-lg">🏃</span> 
              Runners Group
            </h1>
            <p className="text-slate-400 mt-2 text-sm">Join the community. Push your limits.</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Next Season</p>
            <p className="text-lg font-medium">Spring 2026</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Left Column: Personal Info */}
          <div className="md:col-span-7 space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Personal Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input 
                    {...register('full_name', { required: "Name is required" })} 
                    placeholder="e.g. John Doe" 
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.full_name ? 'border-red-300 bg-red-50' : 'border-slate-200'}`} 
                  />
                </div>
                <ErrorMsg error={errors.full_name} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input 
                    {...register('phone', { required: "Phone is required" })} 
                    placeholder="70931620" 
                    max={8}
                    type='number'
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200'}`} 
                  />
                </div>
                <ErrorMsg error={errors.phone} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input 
                    {...register('address', { required: "Address is required" })} 
                    placeholder="City, Area" 
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.address ? 'border-red-300 bg-red-50' : 'border-slate-200'}`} 
                  />
                </div>
                <ErrorMsg error={errors.address} />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4 mt-8">Running Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pace</label>
                <div className="relative">
                  <Activity className="absolute left-3 top-3 text-slate-400" size={18} />
                  <select 
                    {...register('pace', { required: "Select a pace" })} 
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none ${errors.pace ? 'border-red-300' : 'border-slate-200'}`}
                  >
                    <option value="">Select...</option>
                    <option value="Easy">Easy (6:00+ /km)</option>
                    <option value="Moderate">Moderate (5:00 /km)</option>
                    <option value="Fast">Fast (&lt;4:30 /km)</option>
                  </select>
                </div>
                <ErrorMsg error={errors.pace} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                <div className="relative">
                  <Trophy className="absolute left-3 top-3 text-slate-400" size={18} />
                  <select 
                    {...register('experience_level', { required: "Select level" })} 
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none ${errors.experience_level ? 'border-red-300' : 'border-slate-200'}`}
                  >
                    <option value="">Select...</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <ErrorMsg error={errors.experience_level} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Distance</label>
                <div className="relative">
                  <Footprints className="absolute left-3 top-3 text-slate-400" size={18} />
                  <select 
                    {...register('preferred_distance', { required: "Select distance" })} 
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none ${errors.preferred_distance ? 'border-red-300' : 'border-slate-200'}`}
                  >
                    <option value="">Select...</option>
                    <option value="5K">5K</option>
                    <option value="7K">7K</option>
                    <option value="10K">10K</option>
                    {/* <option value="Half">Half Marathon</option> */}
                  </select>
                </div>
                <ErrorMsg error={errors.preferred_distance} />
              </div>
            </div>

             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Any preferred location to run or comments?</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-slate-400" size={18} />
                  <textarea 
                    {...register('comments')} 
                    placeholder="Optional..." 
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" 
                  />
                </div>
              </div>
          </div>

          {/* Right Column: Schedule */}
          <div className="md:col-span-5 bg-slate-50 rounded-2xl p-2 border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="text-indigo-600" size={20} />
              <h3 className="text-lg font-bold text-slate-800">Weekly Schedule</h3>
            </div>
            <p className="text-xs text-slate-500 mb-6 ml-7">Check the days you can run and set your start time.</p>
            
            <div className="space-y-3">
              {daysList.map(d => {
                const isChecked = watchedDays[d]?.checked;
                return (
                  <div 
                    key={d} 
                    className={`
                      relative flex items-center p-3 rounded-xl border transition-all duration-200
                      ${isChecked ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500' : 'bg-slate-100 border-transparent hover:bg-slate-200'}
                    `}
                  >
                    {/* Checkbox Overlay */}
                    <div className="flex items-center h-full">
                       <input 
                        type="checkbox" 
                        {...register(`days.${d}.checked`)} 
                        className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                      />
                    </div>

                    <div className="ml-3 flex-1">
                      <span className={`text-sm font-semibold ${isChecked ? 'text-indigo-900' : 'text-slate-500'}`}>{d}</span>
                    </div>

                    {/* Time Input with transition */}
                    <div className={`flex items-center gap-2 transition-all duration-300 ${isChecked ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-2 pointer-events-none'}`}>
                      {/* <Clock size={14} className="text-slate-400" /> */}
                      <input 
                        type="time" 
                        defaultValue="06:00"
                        disabled={!isChecked}
                        {...register(`days.${d}.time`)} 
                        className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none border-b border-slate-300 focus:border-indigo-500 px-1"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer / Submit */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <button 
            disabled={loading} 
            className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-slate-900 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                Confirm Registration
                {/* <span className="bg-white/20 px-2 py-0.5 rounded text-xs">FREE</span> */}
              </>
            )}
          </button>
           {status === 'error' && (
            <div className="text-red-500 text-sm font-medium flex items-center gap-2 animate-pulse">
              Something went wrong. Please try again.
            </div>
          )}
          {/* <div className="text-slate-400 text-xs text-center md:text-left">
            By joining, you agree to our <a href="#" className="underline hover:text-indigo-500">Terms of Service</a>.
          </div> */}
        </div>
      </form>
    </div>
  );
}
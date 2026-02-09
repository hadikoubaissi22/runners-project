import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';


const daysList = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];


export default function App() {
const { register, handleSubmit, watch, formState:{ errors } } = useForm();
const [loading, setLoading] = useState(false);
const days = watch('days') || {};


const onSubmit = async (data) => {
const selectedDays = Object.keys(days)
.filter(d => days[d]?.checked)
.map(d => ({ day: d, time: days[d].time }));


if (!selectedDays.length) {
alert('Choose at least one day');
return;
}


setLoading(true);
await axios.post('https://YOUR_API.vercel.app/api/register', {
...data,
days: selectedDays
});
setLoading(false);
alert('Submitted successfully');
};


return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
<form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-4">
<h1 className="text-2xl font-bold text-center">🏃 Join Runners Group</h1>


<input {...register('full_name',{required:true})} placeholder="Full Name" className="input" />
<input {...register('phone',{required:true})} placeholder="Phone" className="input" />
<input {...register('address',{required:true})} placeholder="Address" className="input" />


<select {...register('pace',{required:true})} className="input">
<option value="">Favorite Pace</option>
<option>Easy</option>
<option>Moderate</option>
<option>Fast</option>
</select>


<div>
<p className="font-semibold">Preferred Days & Time</p>
{daysList.map(d => (
<div key={d} className="flex items-center gap-2">
<input type="checkbox" {...register(`days.${d}.checked`)} />
<span>{d}</span>
<input type="time" {...register(`days.${d}.time`)} />
</div>
))}
</div>
<select
  {...register('experience_level', { required: true })}
  className="input"
>
  <option value="">Experience Level</option>
  <option value="Beginner">Beginner</option>
  <option value="Intermediate">Intermediate</option>
  <option value="Advanced">Advanced</option>
</select>
<select
  {...register('preferred_distance', { required: true })}
  className="input"
>
  <option value="">Preferred Distance</option>
  <option value="5K">5K</option>
  <option value="10K">10K</option>
  <option value="Half">Half Marathon</option>
</select>


<textarea {...register('comments')} placeholder="Comments" className="input" />


<button disabled={loading} className="w-full bg-black text-white py-3 rounded-xl">
{loading ? 'Submitting...' : 'Submit'}
</button>
</form>
</div>
);
}
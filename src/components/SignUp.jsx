import React from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function Register(){
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState()
    const [currentUserForm, setCurrentUserForm] = React.useState({email: '', password1:'', password2: ''})

    const navigate = useNavigate()
    
    const {signUp, currentUser} = useAuth()

    async function handleSubmit(event) {
        event.preventDefault()
     
        if (currentUserForm.password1 !== currentUserForm.password2)
        {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signUp(currentUserForm.email, currentUserForm.password1)
            navigate('/')
        }
        catch (error){
            setError('Failed to create an account')
        }

        setLoading(false)
        
    }

    function handleChange(event) {
        setCurrentUserForm(prevUser => {
            return {
                ...prevUser,
                [event.target.name]: event.target.value
            }
        })

    }

    return (
        <div className='container  mx-auto  w-screen py-12 flex justify-center items-center lg:py-8'>
           
           <div className='flex flex-col space-y-4 px-10 py-5 bg-white-700 bg-opacity-50 shadow-xl md:px-15 md:max-w-lg sm:max-w-md'>
                <h2 className='text-3xl font-bold mb-2 md:text-4xl'>MineScribe</h2>
                <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>Register your Account.</h2>
                {error && <p>{error}</p>}
                <form className='ml-0 flex flex-col ' onSubmit={handleSubmit} >
                    <div>
                      <label for="email" class="block mb-2 text-sm font-medium ">Your email</label>
                      <input
                        className='w-full mb-6 border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-200 border-gray-300 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500'
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="email"
                        value={currentUserForm.email}
                    />
                  </div>
                  <div>
                  <label for="password1" class="block mb-2 text-sm font-medium ">Password</label>
                  <input
                        className='w-full mb-6 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-200 border-gray-300 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500'
                        name="password1"
                        onChange={handleChange}
                        type="password"
                        placeholder="password"
                        value={currentUserForm.password1}
                    />
                  </div>
                <div>
                <label for="password2" class="block mb-2 text-sm font-medium ">Retype Password</label>
                    <input
                        className='w-full mb-6 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-200 border-gray-300 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500'
                        name="password2"
                        onChange={handleChange}
                        type="password"
                        placeholder="re-type password"
                        value={currentUserForm.password2}
                    />
                </div>
                   <button 
                    className='purple-btn mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                    disabled={loading} 
                    type='submit'>Register</button>
                </form>
               
                <div className='flex justify-between text-xs md:text-sm'>
                    <p>Already have an account?</p>
                        <Link className='text-purple-500' to='/signin'>Sign in</Link>
                </div>
            </div>
        </div>
        
    )
}
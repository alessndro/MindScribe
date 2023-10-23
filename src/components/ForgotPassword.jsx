import React from 'react'
import { Link} from 'react-router-dom'
import { useAuth } from './AuthContext'


export default function ForgotPassword(){
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState()
    const [message, setMessage] = React.useState()
    const [currentUserForm, setCurrentUserForm] = React.useState({email: ''})

    const {resetPassword} = useAuth()

    async function handleSubmit(event) {
        event.preventDefault()
     
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(currentUserForm.email)
            setMessage('Check your inbox for further instructions')
        }
        catch (error) {
            console.log(error)
            setError('Failed to reset password')
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
        <div className='flex justify-center items-center'>
            <div className='flex flex-col items-center'>
                <h2>Forgot Password</h2>
                {error && error}
                {message && message}
                <form className='flex flex-col items-center' onSubmit={handleSubmit} >
                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="email"
                        value={currentUserForm.email}
                    />

                   <button disabled={loading} type='submit'>Reset Password</button>
                </form>
                <div>
                    <Link to="/signin">Sign in</Link>
                </div>
                <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            </div>
        </div>
    )
}
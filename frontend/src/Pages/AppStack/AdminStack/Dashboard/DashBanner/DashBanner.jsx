import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../../Context/AuthContext'

export default function DashBanner() {
    const { user } = useAuth()
    const navigate = useNavigate()

    // if user is not ready yet
    if (!user) return null // or <Loader /> if you want to show a loading state

    const navToPatients = () => {
        navigate(`/app/${user.Role.toLowerCase()}/patients`)
    }

    return (
        <div className="row mb-8">
            <div className="col-md-12">
                <div
                    className="card-lg bg-light p-8 border-0 rounded-4"
                    style={{
                        backgroundImage: 'url(/assets/images/banner/mainAdminBanner.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                >
                    <div className="card-body">
                        <h1 className='text-capitalize'>Hi Doctor {user.FirstName} 👋</h1>
                        <p className='text-capitalize'>
                            Tasks are waiting , until your services to the DementiaGuard.
                        </p>
                        <button onClick={navToPatients} className="btn btn-primary">
                            See All Patients
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
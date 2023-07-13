import Image from 'next/image'
import { useContext, useState } from 'react'
import MusicPlayerContext from '../../context/MusicPlayerContext'
import LoginModal from '../login/LoginModal'
import SignupModal from '../signup/SignupModal'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../redux/userSlice'

function AccountMenu() {
    const {
        state: { openLogin, openSignup },
        dispatch,
    } = useContext(MusicPlayerContext)

    const user = useSelector((state) => state.user.info)
    const dispatchRedux = useDispatch()

    const [open, setOpen] = useState(false)

    const handleOpenLogin = () => {
        dispatch({ type: 'TOGGLE_LOGIN' })
        console.log('Open', openLogin)
        setOpen(false)
    }
    const handleOpenSignnup = () => {
        dispatch({ type: 'TOGGLE_SIGNUP' })
        console.log('Open', openLogin)
        setOpen(false)
    }
    const handleLogout = () => {
        dispatchRedux(update(null))
        setOpen(false)
    }

    return (
        <div className="relative flex items-center gap-1">
            <Image
                className="rounded-full cursor-pointer"
                src="/images/avt.webp"
                width={35}
                height={35}
                layout="fixed"
                alt="avt"
                onClick={() => setOpen(!open)}
            />
            {user&&<span className='cursor-pointer' onClick={() => setOpen(!open)}>{user.fullname}</span>}
            {open && (
                <>
                    <ul className="absolute top-full bg-white text-purple-700 right-full rounded-lg z-40 text-2xl">
                        {user ? (
                            <li
                                className="px-3 py-1  cursor-pointer hover:text-purple-500"
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                        ) : (
                            <>
                                <li
                                    className="px-3 py-1 border-b  cursor-pointer hover:text-purple-500"
                                    onClick={handleOpenLogin}
                                >
                                    Login
                                </li>
                                <li
                                    className="px-3 py-1 cursor-pointer hover:text-purple-500"
                                    onClick={handleOpenSignnup}
                                >
                                    Singnup
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="fixed inset-0" onClick={() => setOpen(!open)}>
                        {' '}
                    </div>
                </>
            )}

            {openLogin && <LoginModal />}
            {openSignup && <SignupModal />}
        </div>
    )
}

export default AccountMenu

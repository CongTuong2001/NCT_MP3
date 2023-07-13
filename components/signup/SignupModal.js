import styles from './SignupModal.module.css'
import cls from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import {
    faChevronRight,
    faLock,
    faTimes,
    faUser,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import MusicPlayerContext from '../../context/MusicPlayerContext'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { update } from '../../redux/userSlice'

function SignupModal() {
    const {
        state: { openLogin },
        dispatch,
    } = useContext(MusicPlayerContext)

    const dispatchRedux = useDispatch()

    const handleCloseSignup = () => {
        dispatch({ type: 'TOGGLE_SIGNUP' })
    }

    const [err, setErr] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            fullname: '',
            password: '',
        },
    })

    const handleSignup = async (data) => {
        console.log('Data signup:', data)
        try {
            const res = await axios.post('/api/signup', data)
            console.log('Login:', res)
            const userInfo = {
                ...data,
                favourites: []
            }
            dispatchRedux(update(userInfo))
            handleCloseSignup()
        } catch (error) {
            setErr(true)
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            <div className={styles['container']}>
                <div className={styles['screen']}>
                    <div className={styles['screen__content']}>
                        <form className={cls('text-purple-700', styles['login'])}>
                            <div className={styles['login__field']}>
                                <FontAwesomeIcon className={styles['login__icon']} icon={faUser} />
                                <input
                                    {...register('username', {
                                        required: true,
                                        pattern: /^([\w]*)$/,
                                    })}
                                    type="text"
                                    className={styles['login__input']}
                                    placeholder="User name"
                                />
                            </div>
                            {err && (
                                <div className="text-red-500 bg-purple-50 rounded-xl">
                                    Username da ton tai
                                </div>
                            )}
                            {errors.username && (
                                <div className="text-red-500 bg-purple-50 rounded-xl">
                                    {errors.username.type === 'pattern' && (
                                        <span>
                                            Username gom cac chu cai, khong co khoang trang,
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className={styles['login__field']}>
                                <FontAwesomeIcon
                                    className={styles['login__icon']}
                                    icon={faUserTie}
                                />
                                <input
                                    {...register('fullname', { required: true })}
                                    type="text"
                                    className={styles['login__input']}
                                    placeholder="Full name"
                                />
                            </div>
                            <div className={styles['login__field']}>
                                <FontAwesomeIcon className={styles['login__icon']} icon={faLock} />
                                <input
                                    {...register('password', { required: true })}
                                    type="password"
                                    className={styles['login__input']}
                                    placeholder="Password"
                                />
                            </div>
                            {(errors.username || errors.fullname || errors.password) && (
                                <div className="text-red-500 bg-purple-50 rounded-xl">
                                    Vui long dien day du thong tin
                                </div>
                            )}
                            <button
                                onClick={handleSubmit(handleSignup)}
                                className={cls(styles['button'], styles['login__submit'])}
                            >
                                <span className={styles['button__text']}>Sign Up Now</span>
                                <FontAwesomeIcon
                                    className={styles['button__icon']}
                                    icon={faChevronRight}
                                />
                            </button>
                        </form>
                    </div>
                    <div className={styles['screen__background']}>
                        <span
                            className={cls(
                                styles['screen__background__shape'],
                                styles['screen__background__shape4']
                            )}
                        ></span>
                        <span
                            className={cls(
                                styles['screen__background__shape'],
                                styles['screen__background__shape3']
                            )}
                        ></span>
                        <span
                            className={cls(
                                styles['screen__background__shape'],
                                styles['screen__background__shape2']
                            )}
                        ></span>
                        <span
                            className={cls(
                                styles['screen__background__shape'],
                                styles['screen__background__shape1']
                            )}
                        ></span>
                    </div>
                    <div className="absolute top-0 right-0 w-7 h-7 flex justify-center items-center z-50">
                        <FontAwesomeIcon
                            className="text-xl cursor-pointer"
                            icon={faTimes}
                            onClick={handleCloseSignup}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupModal

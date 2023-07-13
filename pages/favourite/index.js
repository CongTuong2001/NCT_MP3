import cls from 'classnames'
import Head from 'next/head'
import { useEffect, useReducer, useState } from 'react'
import { Header } from '../../components/common/Header'
import { PlayerCotrol, PlayList } from '../../components/player'
import NavBar from '../../components/player/NavBar'
import MusicPlayerContext from '../../context/MusicPlayerContext'
import songReducer from '../../reducers/SongReducer'
import styles from '../../scss/player/index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../../redux/userSlice'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Favourite(props) {
    // const {songs} = props
    const user = useSelector((state) => state.user.info)
    const dispatchRedux = useDispatch()
    const router = useRouter()

    const [songs, setSongs] = useState([])

    const fecthFavouriteList = async () => {
        try {
            const res = await axios.post('/api/getFavourites', { username: user.username })
            console.log('Favourite list: ', res.data)
            const songList = res.data.list
            setSongs(songList)
        } catch (error) {}
    }

    useEffect(() => {
        if (user) fecthFavouriteList()
    }, [user])

    const [state, dispatch] = useReducer(songReducer, {
        currentSong: null,
        isPlay: false,
        isLoading: true,
        volume: 0.9,
        mode: 'RA',
        random: true,
        openLogin: false,
        openSignup: false,
    })

    const addSource = (idSong, source) => {
        const newSongs = [...songs]
        const song = newSongs.find((s) => s.id === idSong)
        song.source = source
    }
    const addNewSong = (song) => {
        if (songs.find((s) => s.id === song.id)) return
        const newSongs = [song, ...songs]
        setSongs(newSongs)
    }
    const removeSong = (id) => {
        setSongs(prev => prev.filter(song=>song.id!==id))
    }

    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem('user-music'))
    //     if (userInfo) {
    //         dispatchRedux(update(userInfo))
    //     }
    // }, [])

    return (
        <>
            <Head>
                <title>NCTMp3</title>
                <link rel="icon" href="/images/icon.png" />
            </Head>
            {user && (
                <MusicPlayerContext.Provider
                    value={{ songs, state, addSource, addNewSong,removeSong, dispatch }}
                >
                    <div className={cls(styles.wrapper)}>
                        <div className={cls(styles.container)}>
                            <div className={cls(styles.navbar)}>
                                <NavBar />
                            </div>
                            <div className={cls(styles.content)}>
                                <Header />
                                <PlayList />
                            </div>
                            <PlayerCotrol />
                        </div>
                    </div>
                </MusicPlayerContext.Provider>
            )}
            {songs.length === 0 && user && (
                <div className='w-full h-[100vh] flex justify-center items-center'>
                    <div role="status">
                        <svg
                            className="inline mr-2 w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {!user && <div
                className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600/20"
                
            >
                <div className="relative w-fit px-3 py-3 bg-purple-500 text-center shadow-lg rounded-sm">
                    <h3 className="text-xl">Vui lòng đăng nhập</h3>
                    <span
                        className="px-3 py-1 bg-gray-600 rounded-lg my-2 inline-block cursor-pointer"
                        onClick={() => router.push(`/`)}
                    >
                        Ok
                    </span>
                    {/* <FontAwesomeIcon className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-purple-800 w-5 h-5 p-1 rounded-full cursor-pointer" icon={faTimes} /> */}
                </div>
            </div>}
        </>
    )
}

// This gets called on every request
// export async function getServerSideProps() {
//   console.log("ENV", process.env.HOST);
//   const res = await fetch(`${process.env.HOST}/api/getTop`);
//   const data = await res.json();
//   const songs = data.data;
//   // Pass data to the page via props
//   return { props: { songs } };
// }

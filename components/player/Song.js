import Image from 'next/dist/client/image'
import cls from 'classnames'
import styles from '../../scss/player/Song.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import MusicPlayerContext from '../../context/MusicPlayerContext'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

function Song({ song, noneHeart, handleNewSong }) {
    const songRef = useRef(null)
    const user = useSelector((state) => state.user.info)
    const router = useRouter()

    const [openNotice, setOpenNotice] = useState(false)
    const [error, setError] = useState(false)

    const { name, singer, time, imgUrl } = song
    const {
        dispatch,
        state: { currentSong, isLoading },
        removeSong
    } = useContext(MusicPlayerContext)

    const isActive = currentSong?.id === song.id

    useEffect(() => {
        if (isActive) {
            songRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }, [currentSong])

    const playSong = async (e) => {
        if (e.target.tagName == 'path') {
            return
        }

        if (song.id === currentSong?.id) return
        if (handleNewSong) {
            handleNewSong(song)
        }
        dispatch({ type: 'PAUSE' })
        dispatch({ type: 'SET_LOADING' })

        if (!song.source) {
            console.log('Not source, get Source')
            const res = await fetch('/api/song/' + song.id)
            const data = await res.json()

            song.source = data.data.data['128']
        } else {
            console.log('Alredy has the source')
        }

        dispatch({ type: 'SET_SONG', song: song })
    }

    const handleAddFavourite = async () => {
        try {
            console.log('ADD Favourite:' + song.id)
            const res = await axios.post('/api/addSongFavourite', {
                username: user.username,
                songId: song.id,
            })
            console.log('Add Res', res)
            setOpenNotice(true)
            setTimeout(() => {
                setOpenNotice(false)
            },1000)
        } catch (error) {
            console.log(error)
            setOpenNotice(true)
            setError(true)
        }
    }
    const handleRemoveFavourite = async () => {
      
        try {
            console.log('Remove Favourite:' + song.id)
            const res = await axios.post('/api/removeSongFavourite', {
                username: user.username,
                songId: song.id,
            })
            console.log('Add Res', res)
            // setOpenNotice(true)
            removeSong(song.id)
        } catch (error) {
            console.log(error)
            // setOpenNotice(true)
            // setError(true)
        }
    }

    const handleCloseNotice = () => {
        setOpenNotice(false)
        setError(false)
    }

    return (
        <div
            ref={songRef}
            className={cls([styles.song], { [styles.active]: isActive })}
            onClick={playSong}
        >
            <div className={cls(styles.name)}>
                <div className={cls(styles.avtImg)}>
                    <Image src={imgUrl} width={35} height={35}></Image>
                    {currentSong !== song ? (
                        <div>
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                    ) : (
                        <div className={cls({ [styles.playingGif]: isActive })}>
                            <Image src="/images/playing.gif" width={20} height={20} />
                        </div>
                    )}
                </div>

                <div>
                    <span>{name}</span>
                    <span className={styles.singerHidden}>{singer}</span>
                </div>
            </div>
            <div className={cls(styles.singer)}>
                <span>{singer}</span>
                {(!noneHeart&& router.pathname !=='/favourite') &&(
                    <span>
                        <FontAwesomeIcon icon={faHeart} onClick={handleAddFavourite} />
                    </span>
                )}
                {(router.pathname ==='/favourite') &&(
                    <span>
                        <FontAwesomeIcon className='text-red-700' icon={faTimes} onClick={handleRemoveFavourite} />
                    </span>
                )}
            </div>
            {!noneHeart && <div className={cls(styles.time)}>{time}</div>}

            {openNotice && (
                <div
                    className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600/20"
                    onClick={handleCloseNotice}
                >
                    <div className="relative w-fit px-3 py-3 bg-purple-500 text-center shadow-lg rounded-sm">
                        {error ? (
                            <h3 className="text-xl ">Bài hát đã có trong yêu thích!</h3>
                        ) : (
                            <h3 className="text-xl">Đã thêm vào yêu thích!</h3>
                        )}

                        {/* <span
                            className="px-3 py-1 bg-gray-600 rounded-lg my-2 inline-block cursor-pointer"
                            onClick={handleCloseNotice}
                        >
                            Ok
                        </span>
                        <FontAwesomeIcon
                            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-purple-800 w-5 h-5 p-1 rounded-full cursor-pointer"
                            icon={faTimes}
                            onClick={handleCloseNotice}
                        /> */}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Song

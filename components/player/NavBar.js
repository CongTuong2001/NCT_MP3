import {
    faCircleDot,
    faHeart,
    faMusic,
    faRankingStar,
    faShapes,
    faStar,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cls from 'classnames'
import Image from 'next/dist/client/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../scss/player/NavBar.module.scss'

function NavBar() {
    const router = useRouter()
    const user = useSelector((state) => state.user.info)

    const [openNotice, setOpenNotice] = useState(false)

    const gotoFavorite = () => {
        if (!user) return setOpenNotice(true)
        router.push(`/favourite`)
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        width={50}
                        height={50}
                        layout="responsive"
                        alt="logo"
                    />
                </Link>
            </div>
            <div className={styles.links}>
                <ul>
                    <li className={cls({ [styles.active]: router.pathname == '/player' })}>
                        <FontAwesomeIcon icon={faMusic} />
                        <Link href="/">
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li className={cls({ [styles.active]: router.pathname == '/favourite' })}
                    onClick={gotoFavorite}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                       
                            <span>Yêu thích</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faRankingStar} />
                        <span>Bảng xếp hạng</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faStar} />
                        <span>Top 100</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faShapes} />
                        <span>Danh mục</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCircleDot} />
                        <span>Khám phá</span>
                    </li>
                </ul>
            </div>

            {openNotice&&<div
                className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600/20"
                onClick={() => setOpenNotice(false)}
            >
                <div className="relative w-fit px-3 py-3 bg-purple-500 text-center shadow-lg rounded-sm">
                    <h3 className="text-xl">Vui lòng đăng nhập</h3>
                    <span
                        className="px-3 py-1 bg-gray-600 rounded-lg my-2 inline-block cursor-pointer"
                        onClick={() => setOpenNotice(false)}
                    >
                        Ok
                    </span>
                    {/* <FontAwesomeIcon className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-purple-800 w-5 h-5 p-1 rounded-full cursor-pointer" icon={faTimes} /> */}
                </div>
            </div>}
        </div>
    )
}

export default NavBar

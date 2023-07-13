import { faMoon, faSearch, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cls from "classnames";
import Image from "next/dist/client/image";
import { useContext, useEffect, useRef, useState } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import styles from "../../scss/common/Header.module.scss";
import Song from "../player/Song";
import AccountMenu from "./AccountMenu";
export function Header() {
  const { dispatch, addNewSong } = useContext(MusicPlayerContext);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([])

  const searchRef = useRef(null);

  const onChange = (e) => {
    setSearch(e.target.value);
  };


  const fetchSearch = async(name)=>{
    const res = await fetch(`/api/song/search/${name}`)
    const data = await res.json();
    console.log(data.data);
    setList(data.data)
  }

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      if (search) {
        fetchSearch(search)
      }else{
        setList([])
      }
    }, 500);
    return () => {
      if (idTimeout) clearTimeout(idTimeout);
    };
  }, [search]);

  useEffect(() => {
    window.onkeydown = (e) => {
      if (searchRef.current !== document.activeElement) {
        if (e.code === "Space") dispatch({ type: "TOGGLE" });
      }
    };
  }, []);

  const handleNewSong = (song)=>{
    // console.log("New Song", song);
    addNewSong(song)
    setSearch("")
  }

  return (
    <div className={cls(styles.wrapper)}>
      <div className={cls(styles.header)}>
        <div className={cls(styles.search)}>
          <label htmlFor="searchInput">
            <FontAwesomeIcon icon={faSearch} />
          </label>
          <input
            ref={searchRef}
            value={search}
            onChange={onChange}
            id="searchInput"
            type="text"
            placeholder="Tìm kiếm bài hát..."
          ></input>
          <div className={cls(styles.searchResult)}>
            {list.map((song => (
              <Song key={song.id} song={song} noneHeart handleNewSong={handleNewSong}/>
            )))}
          </div>
        </div>
        <div className={cls(styles.links)}>
          <FontAwesomeIcon icon={faMoon} style={{ fontSize: 30 }} />
          <FontAwesomeIcon icon={faGear} style={{ fontSize: 30 }} />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}

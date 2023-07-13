import cls from "classnames";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useSelector } from "react-redux";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import styles from "../../scss/player/PlayListContent.module.scss";
import Song from "./Song";

function PlayListContent() {
  const { songs } = useContext(MusicPlayerContext);
  

  const router = useRouter()
  // console.log("Song from context",songs)
  return (
    <div className={cls(styles.playListContent, styles.scroll)}>
      <div className={cls(styles.songsList)}>
        <div className={cls(styles.listHead)}>
          <div className={cls(styles.name)}>Bài hát</div>
          <div className={cls(styles.singer)}>Ca sĩ</div>
          <div className={cls(styles.time)}>Thời gian</div>
        </div>

        {songs.map((song, index) => (
          <Song song={song} key={index}/>
        ))}
      </div>
    </div>
  );
}

export default PlayListContent;

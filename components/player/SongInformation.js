import Image from "next/dist/client/image";
import cls from "classnames";
import styles from "../../scss/player/SongInformation.module.scss";
import { useContext } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";

export function SongInformation({ song }) {
  const { state } = useContext(MusicPlayerContext);
  return (
    <div className={cls(styles.songInformation)}>
      <div className={cls(styles.avtImg)}>
        <Image src={state.currentSong?.imgUrl} width={70} height={70} />
      </div>
      <div className={cls(styles.info)}>
        <div className={cls(styles.name)}>{state.currentSong?.name}</div>
        <div className={cls(styles.singer)}>{state.currentSong?.singer}</div>
      </div>
    </div>
  );
}

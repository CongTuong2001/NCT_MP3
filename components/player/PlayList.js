import cls from "classnames";
import styles from "../../scss/player/PlayList.module.scss";
import PlayListContent from "./PlayListContent";
import { PlayListHeader } from "./PlayListHeader";

export function PlayList() {
  return (
    <div className={cls(styles.wrapper)}>
      <div className={cls(styles.playlist)}>
        <div className={cls(styles.playlistHeader)}>
          <PlayListHeader />
        </div>
        <div className={cls(styles.playlistContent)}>
          <PlayListContent />
        </div>
      </div>
    </div>
  );
}

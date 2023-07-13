import cls from "classnames";
import styles from "../../scss/player/PlayerControl.module.scss";
import { MainControl } from "./MainControl";
import { SongInformation } from "./SongInformation";
import { UtilityControl } from "./UtilityControl";

export function PlayerCotrol() {
  return (
    <div className={cls(styles.playerControl)}>
      <SongInformation />
      <MainControl />
      <UtilityControl />
    </div>
  );
}

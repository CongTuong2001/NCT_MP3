import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cls from "classnames";
import { useContext, useRef } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import styles from "../../scss/player/UtilityControl.module.scss";

export function UtilityControl() {
  const {
    state: { volume },
    dispatch,
  } = useContext(MusicPlayerContext);

  const volumeSlider = useRef(null);
  const verticalVolumeSlider = useRef(null);

  const changeVolume = (e) => {
    const clientX = e.clientX;
    console.log(clientX);
    const volumeX = volumeSlider.current.getBoundingClientRect().x;
    const volumeWidth = volumeSlider.current.getBoundingClientRect().width;

    const percent = (clientX - volumeX) / volumeWidth;
    if (percent < 0) percent = 0;
    if (percent > 1) {
      percent = 1;
    }
    dispatch({ type: "SET_VOLUME", volume: percent.toFixed(2) });
  };

  const changeVerticalVolume = (e) => {
    let clientY;
    if (e.type === "touchstart") clientY = e.touches[0].clientY;
    else clientY = e.clientY;
    const volumeY = verticalVolumeSlider.current.getBoundingClientRect().y;
    const volumeHeight =
      verticalVolumeSlider.current.getBoundingClientRect().height;
    const percent = 1 - (clientY - volumeY) / volumeHeight;
    if (percent < 0) percent = 0;
    if (percent > 1) {
      percent = 1;
    }
    dispatch({ type: "SET_VOLUME", volume: percent.toFixed(2) });
  };

  return (
    <div className={cls(styles.utilityControl)}>
      <div className={cls(styles.volumeControl)}>
        {volume == 0.0 ? (
          <FontAwesomeIcon icon={faVolumeMute} />
        ) : (
          <FontAwesomeIcon icon={faVolumeHigh} />
        )}
        <div className={cls(styles.sliderVolume)} onMouseDown={changeVolume}>
          <div ref={volumeSlider} className={cls(styles.sliderVolumeBase)}>
            <div
              style={{ width: `${volume * 100}%` }}
              className={cls(styles.volume)}
            >
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.verticalVolumeControl}>
        {volume == 0.0 ? (
          <FontAwesomeIcon icon={faVolumeMute} />
        ) : (
          <FontAwesomeIcon icon={faVolumeHigh} />
        )}

        <div
          className={cls(styles.verticalSliderVolume)}
          onMouseDown={changeVerticalVolume}
          onTouchStart={changeVerticalVolume}
        >
          <div
            ref={verticalVolumeSlider}
            className={cls(styles.verticalSliderVolumeBase)}
          >
            <div
              style={{ height: `${volume * 100}%` }}
              className={cls(styles.volume)}
            >
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

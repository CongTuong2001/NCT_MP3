import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faRepeat,
  faShuffle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cls from "classnames";
import Image from "next/dist/client/image";
import { useContext, useEffect, useRef, useState } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import styles from "../../scss/player/MainControl.module.scss";

export function MainControl() {
  const {
    state: { currentSong, isPlay, isLoading, volume, mode, random },
    songs,
    dispatch,
    addSource,
  } = useContext(MusicPlayerContext);

  const audio = useRef(null);
  const durationBar = useRef(null);

  const [updateSilerbar, setUpdateSilerbar] = useState(null);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);

  const [playedRandomList, setPlayedRandomList] = useState([])

  //Catch play event
  useEffect(() => {
    if (isPlay) {
      console.warn("PLAY");
      audio.current.play();
      updateCurrentState();
    } else {
      console.warn("PAUSE");
      audio.current.pause();
      if (audio.current.ended) {
        handleNextSong();
      }
      clearInterval(updateSilerbar);
    }
  }, [isPlay]);

  //Update current state of the song
  const updateCurrentState = () => {
    const id = setInterval(() => {
      if(!audio.current) return
      const percent =
        (audio.current.currentTime / audio.current.duration) * 100;
      setCurrentPercent(percent);
      setCurrentTime(audio.current.currentTime);
      if (audio.current.ended) {
        dispatch({ type: "PAUSE" });
      }
    }, 1000);
    setUpdateSilerbar(id);
  };

  //handle when duration of song ended
  const handleNextSong = () => {
    audio.current.currentTime = 0;
    setCurrentPercent(0);
    setCurrentTime(0);
    console.log("MODE", mode);

    if (mode === "RO") {
      // console.log("Reapeat one");
      dispatch({ type: "PLAY" });
    } else if (mode === "RA") {
      dispatch({ type: "PAUSE" });
      changeSong(1);
    }
    clearInterval(updateSilerbar);
  };

  //handle random
  const handleRandomSong  = ()=>{
    let indexRand

    do{
      indexRand = Math.floor(Math.random() * songs.length)
    }while(playedRandomList.indexOf(indexRand)!=-1)
    console.log("Index Random", indexRand);
    setPlayedRandomList([...playedRandomList, indexRand])

    return indexRand
  }

  // Set playedRandomList empty when it's fulled
  useEffect(() => {
    if(playedRandomList.length == songs.legnth){
      setPlayedRandomList([])
    }
  },[playedRandomList])


  //  Set source of audio when currentSong is changged
  useEffect(() => {
    if (currentSong) {
      audio.current.src = currentSong ? currentSong.source : "";
      audio.current.onloadeddata = function (data) {
        dispatch({ type: "DISABLE_LOADING" });
      };
    } else {
      const song = songs[Math.floor(Math.random() * songs.length)];
      console.log("Not source, get Source");
      if(!song) return dispatch({ type: "DISABLE_LOADING" });
      fetch("/api/song/" + song.id)
        .then((res) => res.json())
        .then((data) => {
          addSource(song.id, data.data.data["128"]);
          dispatch({ type: "SET_SONG", song });
        });

      // console.log(data.data.data['128']);
    }
  }, [currentSong]);

  //Listen changing volume
  useEffect(() => {
    if (currentSong) {
      console.log(volume);
      audio.current.volume = volume;
    }
  }, [volume]);

  //Check isLoading and Play a song
  useEffect(() => {
    if (!isLoading) {
      console.log(isLoading);
      if (!firstLoad) {
        dispatch({ type: "PLAY" });
      }
      setFirstLoad(false);
    }
  }, [isLoading]);

  //Change next (or privious) song
  const changeSong = async (type) => {

    let currentIndex = songs.indexOf(currentSong);

    if (type == -1) {
      //Prev song
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = songs.length - 1;
      }
    } else if (type == 1) {
      //next song
      currentIndex++;
      if (currentIndex >= songs.length) {
        currentIndex = 0;
      }
    }

    if(random){
      currentIndex = handleRandomSong()
      // return
    }

    dispatch({ type: "PAUSE" });
    dispatch({ type: "SET_LOADING" });
    const song = songs[currentIndex];
    if (!song.source) {
      console.log("Not source, get Source");
      const res = await fetch("/api/song/" + song.id);
      const data = await res.json();
      addSource(song.id, data.data.data["128"]);
      console.log(data.data.data["128"]);
    } else {
      console.log("Alredy has the source");
    }

    
    dispatch({ type: "SET_SONG", song });
    
  };

  //handleChangeMode
  const handleChangeMode = () => {
    dispatch({ type: "SET_MODE" });
  };

  //Change current time
  const changeCurrentime = (e) => {
    let clientX = null;
    if (e.type === "touchstart") {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const durationX = durationBar.current.getBoundingClientRect().x;
    const durationWidth = durationBar.current.getBoundingClientRect().width;
    let percent = (clientX - durationX) / durationWidth;

    clearInterval(updateSilerbar);

    const handleMoving = (e) => {
      let moveClientX = null;
      if (e.type === "touchmove") moveClientX = e.touches[0].clientX;
      else moveClientX = e.clientX;

      if (moveClientX < durationX || moveClientX > durationX + durationWidth)
        return;
      const lenght = moveClientX - durationX;
      percent = lenght / durationWidth;
      setCurrentPercent(percent * 100);
      setCurrentTime(percent * audio.current.duration);
    };

    const handleStopMove = () => {
      audio.current.currentTime = percent * audio.current.duration;
      setCurrentPercent(percent * 100);
      setCurrentTime(audio.current.currentTime);

      updateCurrentState();

      window.onmousemove = null;
      window.onmouseup = null;
      window.ontouchmove = null;
      window.ontouchend = null;
    };

    window.onmousemove = handleMoving;
    window.ontouchmove = handleMoving;
    window.onmouseup = handleStopMove;
    window.ontouchend = handleStopMove;
  };

  const togglePlay = () => {
    if (isLoading) return;
    dispatch({ type: "TOGGLE" });
  };

  const toggleRandom = () => {
    dispatch({ type: "TOGGLE_RANDOM" });
  };


  return (
    <div className={cls(styles.mainControl)}>
      <div className={cls(styles.controlBtn)}>
        <div className={cls(styles.btnWrapper)} onClick={toggleRandom}>
          <FontAwesomeIcon className={cls({
              [styles.activeRandom]: random == true,
            })} icon={faShuffle} />
        </div>
        <div className={cls(styles.btnWrapper)} onClick={() => changeSong(-1)}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </div>
        {!isLoading && (
          <div
            className={cls({
              [styles.playBtn]: true,
              [styles.pauseBtn]: isPlay,
            })}
            onClick={togglePlay}
          >
            {isPlay ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon style={{ paddingLeft: "3px" }} icon={faPlay} />
            )}
          </div>
        )}
        {isLoading && (
          <div
            className={cls({
              [styles.playBtn]: true,
              [styles.pauseBtn]: isPlay,
            })}
            // onClick={togglePlay}
          >
            <Image src="/images/loading.gif" width={30} height={30} />
          </div>
        )}
        <div className={cls(styles.btnWrapper)} onClick={() => changeSong(1)}>
          <FontAwesomeIcon icon={faForwardStep} />
        </div>
        <div className={cls(styles.btnWrapper)} onClick={handleChangeMode}>
          <FontAwesomeIcon
            className={cls({
              [styles.onlyMode]: mode === "RO",
              [styles.allMode]: mode === "RA",
            })}
            icon={faRepeat}
          />
          {mode === "RO" && <span>1</span>}
        </div>
      </div>
      <div className={cls(styles.durationBar)}>
        <span>
          {String(Math.floor((currentTime + 1) / 60)).padStart(2, "0")} :{" "}
          {String(Math.floor(currentTime % 60)).padStart(2, "0")}
        </span>
        <div
          ref={durationBar}
          className={cls(styles.sliderVolumeBase)}
          onMouseDown={changeCurrentime}
          onTouchStart={changeCurrentime}
        >
          <div className={cls(styles.sliderBar)}>
            <div
              style={{ width: `${currentPercent}%` }}
              className={cls(styles.sliderVolume)}
            >
              <span></span>
            </div>
          </div>
        </div>

        <span>{currentSong ? currentSong.time : "00:00"}</span>
      </div>
      <audio ref={audio} src="/mp3"></audio>
    </div>
  );
}

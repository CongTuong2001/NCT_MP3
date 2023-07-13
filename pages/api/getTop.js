import { ZingMp3 } from "zingmp3-api-full/dist";

export default function (req, res) {
  ZingMp3.getDetailPlaylist("ZWZB969E").then((data) => {
    const songs = data.data.song.items;
    const list = [];

    for (let song of songs) {
      list.push({
        id: song.encodeId,
        name: song.title,
        singer: song.artistsNames,
        imgUrl: song.thumbnailM,
        time: `${String(Math.floor(song.duration / 60)).padStart(
          2,
          "0"
        )} : ${String(Math.floor(song.duration % 60)).padStart(2, "0")}`,
      });
    }

    res.status(200).json({ data: list });
  });
}

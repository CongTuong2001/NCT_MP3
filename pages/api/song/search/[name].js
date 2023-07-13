import { ZingMp3 } from "zingmp3-api-full";

export default function handler(req, res) {
  const { name } = req.query;

  ZingMp3.search(name).then((data) => {
    const songs = data.data.songs;
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

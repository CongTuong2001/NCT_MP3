import { ZingMp3 } from "zingmp3-api-full";

export default function handler(req, res) {
  const { id } = req.query;

  ZingMp3.getSong(id).then((data) => {
    res.status(200).json({ data: data });
  });
}

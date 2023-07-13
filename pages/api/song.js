// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {ZingMp3} from 'zingmp3-api-full'

export default function handler(req, res) {


  ZingMp3.getSong().then((data)=>{
    res.status(200).json({ data: data})
  })
}
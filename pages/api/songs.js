// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {ZingMp3} from 'zingmp3-api-full'
const fixedData = [
  {
    "id": "ZZDI7978",
    "name": "Bằng Lăng Nở Hoa",
    "singer": "Anh Rồng, G5R Squad",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/8/2/5/6825cac216a2e2c5e54c183862ba6abd.jpg",
    "time": "03 : 55",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/328a0476fd3714694d26/2157152561325447928?authen=exp=1659779891~acl=/328a0476fd3714694d26/*~hmac=fa85847ecc4281a01e9f222b74e0d38b&fs=MTY1OTYwNzA5MTI4Mnx3ZWJWNnwwfDE0LjIzMS4yMzAdUngMjQ3"
  },
  {
    "id": "ZZDW807B",
    "name": "Bố Vợ Chất Chơi (Remix)",
    "singer": "Huỳnh Văn",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/8/4/3/d843db87478bb8ea6e29c3aca3581212.jpg",
    "time": "03 : 26",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/0b829d1766568f08d647/6979560909018578482?authen=exp=1659780267~acl=/0b829d1766568f08d647/*~hmac=0b103a669106f2e774c98a9346fa81c1&fs=MTY1OTYwNzQ2NzmUsICxMXx3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZZE886WC",
    "name": "Ngôi Sao Cô Đơn",
    "singer": "Jack - J97",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/2/e/b/e2eb2e4c19e54ab61871ce9f04ac339f.jpg",
    "time": "04 : 36",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/66c408efdcae35f06cbf/2779850410373472121?authen=exp=1659780436~acl=/66c408efdcae35f06cbf/*~hmac=c586ec126489c5298fc4c7ae5ce85887&fs=MTY1OTYwNzYzNjk5N3x3ZWJWNnwwfDE3MS4yNDEdUngODMdUngMTQ0"
  },
  {
    "id": "ZWBUB79W",
    "name": "Nụ Cười 18 20 (Remix)",
    "singer": "Doãn Hiếu, BMZ",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/8/2/a/f/82afcc633cc979c20481d8ddbae41386.jpg",
    "time": "04 : 36",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/0535aaeea6a94ff716b8/8170356884360268096?authen=exp=1659780217~acl=/0535aaeea6a94ff716b8/*~hmac=c87cebc7a29ac4bf2f64173798dbc9b7&fs=MTY1OTYwNzQxNzmUsIC5NHx3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZZDI9B7U",
    "name": "Vì Mẹ Anh Bắt Chia Tay",
    "singer": "Miu Lê, Karik, Châu Đăng Khoa",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg",
    "time": "04 : 22",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/656217daee9b07c55e8a/2674514253420310719?authen=exp=1659780465~acl=/656217daee9b07c55e8a/*~hmac=37a1ca7f62a8f0eb5f9b9983a810549e&fs=MTY1OTYwNzY2NTkzNHx3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZZDBZWZI",
    "name": "Hết Sảy Miền Tây",
    "singer": "Tracy Thảo My",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/9/a/0/a/9a0af1b65bd4985149959020f0a0bb3e.jpg",
    "time": "04 : 00",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/a8c5b1bb54fabda4e4eb/943988874358131978?authen=exp=1659780466~acl=/a8c5b1bb54fabda4e4eb/*~hmac=b237168ecd06280645a6cf4f0bdd6eb6&fs=MTY1OTYwNzY2Njk4N3x3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZZD9DO7A",
    "name": "Xin Má Rước Dâu (Remix Version)",
    "singer": "Diệu Kiên",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/4/4/c/c44c3822217d8775780358df759f126d.jpg",
    "time": "03 : 37",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/f5fc7a709031796f2020/7629712808103229137?authen=exp=1659780271~acl=/f5fc7a709031796f2020/*~hmac=d5104edb09164112567e5095a006de28&fs=MTY1OTYwNzQ3MTE3Mnx3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZWZECUAO",
    "name": "Beautiful In White",
    "singer": "Hero Band",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/d/6/d6f465a5de88497aaf7efd3a70f45dcf_1341979628.jpg",
    "time": "03 : 52",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/75e905340070e92eb061/3400680322898737192?authen=exp=1659780220~acl=/75e905340070e92eb061/*~hmac=adeab559d9fee4dade3efc9c74296cc5&fs=MTY1OTYwNzQyMDM0NXx3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  }
  ,
  {
    "id": "ZWFZACOC",
    "name": "Sánh Duyên",
    "singer": "Nana Liu, Tracy Thảo My",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/1/2/d/c12df14116654ccd1965de98cef37277.jpg",
    "time": "04 : 26",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/54d3da1062578b09d246/6377637198494972984?authen=exp=1659780034~acl=/54d3da1062578b09d246/*~hmac=981bd4a63ebc1bcbdc0276c538b7d64d&fs=MTY1OTYwNzIzNDg2OXx3ZWJWNnwwfDI3LjmUsICzLjU0LjIyMg"
  }
]

export default function handler(req, res) {
    // getSongList().then(data=>{
      res.status(200).json({ data: fixedData})
    // })
    
}




async function getSongList(){
  const songList = []

    for(let song of list){
      const data = await ZingMp3.getInfoSong(song)
      const playData =  await ZingMp3.getSong(song)
      // console.log(data)
      const time = data.data.duration
      const songInfo = {}

      songInfo.id = data.data.encodeId
      songInfo.name = data.data.title
      songInfo.singer = data.data.artistsNames
      songInfo.imgUrl = data.data.thumbnailM
      
      songInfo.time = `${String(Math.floor(time/60)).padStart(2, '0')} : ${String(Math.floor(time%60)).padStart(2, '0')}`
      songInfo.source = playData.data['128']
      songList.push(songInfo)
    }

    return songList;
}


const list =[
  'ZZDI7978',
  'ZZDW807B',
  'ZZE886WC',
  'ZWBUB79W',
  'ZZDI9B7U',
  'ZZDBZWZI',
  'ZZD9DO7A',
  'ZWZECUAO',
  'ZWFZACOC',
]
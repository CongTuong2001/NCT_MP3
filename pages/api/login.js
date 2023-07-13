import excuteQuery from '../../lib/db'
export default async function handler(req, res) {
    try {
        console.log('req nom', req.body)
        const { username, password } = req.body
        const result = await excuteQuery({
            query: 'select * from users where username = ? and password = ?',
            values: [username, password],
        })
        if (result.length === 0) return res.status(500).json({ mess: 'Error' })
        res.status(200).json({ mess: 'ok', user:result[0] })
    } catch (error) {``
        console.log(error)
    }
}

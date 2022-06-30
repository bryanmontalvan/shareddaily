import {updateEntity } from '../../lib/redis';

export default async function handler(req, res) {
    const id = await updateEntity(req.body)
    res.status(200).json({ id }) 
}

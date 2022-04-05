import {searchCars} from '../../lib/redis'

export default async function handler(req, res) {
  const q = req.query.q;
  const cars = await searchCars(q);
  // Returns array of car
  res.status(200).json({ cars });
}

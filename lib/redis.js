import { Client, Entity, Schema} from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Car extends Entity {}
let carSchema = new Schema(
  Car,
  {
    user: { type: 'string' },
    make: { type: 'string' },
    model: { type: 'string' },
    year: { type: 'string' },
    image: { type: 'string' },
  },
  {
    dataStructure: 'JSON',
  }
);

export async function createCar(data) {
    // Connect to DB client 
    await connect();
  
    const repository = client.fetchRepository(carSchema);
  
    const car = repository.createEntity(data);
  
    // Commit to database
    const id = await repository.save(car);
    return id;
}

export async function createIndex() {
    await connect();

    const repository = client.fetchRepository(carSchema);
    await repository.createIndex()
}

export async function searchCars(q) {
  await connect();

  const repository = client.fetchRepository(carSchema);

  const cars = await repository.search()
      .where('user').equal(q)
      .or('make').equal(q)
      .or('model').equal(q)
      .return.all();

  return cars;
}

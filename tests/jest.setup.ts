import supertest from "supertest";
import { Knex } from "../src/server/database/knex";

import { server } from "../src/server/server";

beforeAll(async () => {
    await Knex.migrate.latest()
    await Knex.seed.run();
});

afterAll(async () => {
    await Knex.destroy()
});

afterAll(async () => {
});
export const testServer = supertest(server)
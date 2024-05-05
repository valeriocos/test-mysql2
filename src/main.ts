import { createConnection } from "mysql2/promise";

const TABLE = "Person";

function generateRandomName(): string {
  const syllables = [
    "ba",
    "de",
    "gi",
    "no",
    "pe",
    "ti",
    "za",
  ];

  const numSyllables = Math.floor(Math.random() * 3) + 2;
  let name = "";
  for (let i = 0; i < numSyllables; i++) {
    const randomIndex = Math.floor(Math.random() * syllables.length);
    name += syllables[randomIndex];
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  const connection = await createConnection({
    host: "localhost",
    user: "test",
    password: "test",
    database: "test",
    port: 3307,
    namedPlaceholders: true,
  });

  const r_select1 = await connection.execute("SELECT * FROM Person");
  console.log(r_select1);

  const insert1Values = [generateRandomName(), generateRandomNumber(18, 99)];
  const r_insert1 = await connection.execute(
    `INSERT INTO ${TABLE} (name, age) VALUES (?, ?)`,
    insert1Values
  );
  console.log(r_insert1);

  const insert2Values = [generateRandomName(), generateRandomNumber(18, 99)];
  const r_insert2 = await connection.execute(
    `INSERT INTO ${TABLE} (name, age) VALUES (?, ?)`,
    insert2Values
  );
  console.log(r_insert2);

  const r_select2 = await connection.execute("SELECT * FROM Person");
  console.log(r_select2);
}

main().catch(console.error);

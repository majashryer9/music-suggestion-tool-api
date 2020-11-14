import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.DB_USER || "http://localhost:7474",
  neo4j.auth.basic(process.env.DB_USER || "user", process.env.DB_PASS || "pass")
);

export const session = driver.session();

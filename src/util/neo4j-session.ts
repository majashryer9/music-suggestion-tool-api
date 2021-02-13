import neo4j from "neo4j-driver";

export const driver = neo4j.driver(
  process.env.DB_URI || "bolt://localhost:7687",
  neo4j.auth.basic(process.env.DB_USER || "neo4j", process.env.DB_PASS || "pass"),
);

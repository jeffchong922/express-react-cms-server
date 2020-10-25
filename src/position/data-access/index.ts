import buildMakeDb from "../../db/mongo-db";
import makePositionsDb from "./positions-db";
import { POSITIONS_DB_COL_NAME, POSITIONS_DB_NAME, POSITIONS_DB_URL } from "../../db/secrets";

const makeDb = buildMakeDb({
  dbUrl: POSITIONS_DB_URL,
  dbName: POSITIONS_DB_NAME
})

const positionsDb = makePositionsDb({ makeDb, colName: POSITIONS_DB_COL_NAME })

export type PositionsDb = typeof positionsDb

export default positionsDb
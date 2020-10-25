import { IdType } from "../helpers/id";
import { MakeBelong } from "../belong";
import { MakeBelongProps } from "../belong/types";

export interface BuildMakePositionProps {
  Id: IdType
  makeBelong: MakeBelong
}

export interface MakePositionProps {
  id?: string
  departmentId?: string
  name?: string
  status?: boolean
  introduction?: string
  belong?: MakeBelongProps
}
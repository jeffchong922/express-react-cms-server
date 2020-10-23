import { IdType } from "../helpers/id";
import { MakeBelong } from "../belong";
import { MakeBelongProps } from "../belong/types";

export interface BuildMakeDepartmentProps {
  Id: IdType
  makeBelong: MakeBelong
}

export interface MakeDepartmentProps {
  id?: string
  name?: string
  memberCount?: number
  status?: boolean
  introduction?: string
  belong?: MakeBelongProps
}
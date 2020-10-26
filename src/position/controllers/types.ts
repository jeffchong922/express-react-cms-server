import { PositionServices } from '../use-cases'

export interface MakePostPositionProps {
  addPosition: PositionServices['addPosition']
}

export interface MakeGetPositionsProps {
  fetchPositions: PositionServices['fetchPositions']
}

export interface MakePutPositionProps {
  editPosition: PositionServices['editPosition']
}

export interface MakeDeletePositionsProps {
  removePositions: PositionServices['removePositions']
}
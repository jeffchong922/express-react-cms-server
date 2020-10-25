import { PositionServices } from '../use-cases'

export interface MakePostPositionProps {
  addPosition: PositionServices['addPosition']
}

export interface MakeGetPositionsProps {
  fetchPositions: PositionServices['fetchPositions']
}
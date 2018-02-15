import { Team } from './team';
export interface Game {
  teams: Array<Team>,
  rounds: Array<Round>
}

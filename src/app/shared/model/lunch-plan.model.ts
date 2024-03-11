import { Suggestion } from './suggestion.model';
import { SuggestionWinner } from './suggestion-winner.model';

export class LunchPlan {
  constructor(
    public id: string,
    public uuid: string,
    public date: string,
    public description: string,
    public initiator: string,
    public owner: boolean,
    public winner: SuggestionWinner,

    public suggestions: Suggestion[],
  ) {}
}

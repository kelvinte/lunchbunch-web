import { Suggestion } from './suggestion.model';

export class LunchPlan {
  constructor(
    public id: string,
    public uuid: string,
    public date: string,
    public description: string,
    public initiator: string,
    public owner: boolean,

    public suggestions: Suggestion[]
  ) {}
}

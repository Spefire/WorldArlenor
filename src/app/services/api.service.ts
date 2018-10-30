import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';

import { Fact, facts } from '../models/fact.model';

@Injectable()
export class ApiService {

  constructor() {}

  public getFact(id:number): Fact {
    var theFact:Fact;
    facts.forEach(element => {
      let fact = new Fact(JSON.stringify(element));
      if (fact.id == id) theFact = fact;
    });
    return theFact;
  }

  public getFacts(zone: string): Fact[] {
    var listFacts:Fact[] = [];
    facts.forEach(element => {
      if (zone == element.zone) {
        let fact = new Fact(JSON.stringify(element));
        listFacts.push(fact);
      }
    });
    return listFacts;
  }
}

import { Connection, PublicKey } from "@solana/web3.js";
import { AccountQuery, PublicKeyCriterion } from "./queries";
import { EventGroup } from "../accounts";

export class EventGroups extends AccountQuery<EventGroup> {
  public static eventGroupQuery(connection: Connection) {
    return new EventGroups(connection);
  }

  private authority = new PublicKeyCriterion(8);
  private subcategory = new PublicKeyCriterion(8 + 32);

  constructor(connection: Connection) {
    super(connection, EventGroup);
    this.setFilters(this.authority, this.subcategory);
  }

  filterByAuthority(authority: PublicKey): EventGroups {
    this.authority.setValue(authority);
    return this;
  }

  filterBySubcategory(subcategory: PublicKey): EventGroups {
    this.subcategory.setValue(subcategory);
    return this;
  }
}

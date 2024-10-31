import { Connection, PublicKey } from "@solana/web3.js";
import { AccountQuery, BooleanCriterion, PublicKeyCriterion } from "./queries";
import { Event } from "../accounts";

export class Events extends AccountQuery<Event> {
  public static eventQuery(connection: Connection) {
    return new Events(connection);
  }

  private authority = new PublicKeyCriterion(8);
  private category = new PublicKeyCriterion(8 + 32);
  private eventGroup = new PublicKeyCriterion(8 + 32 + 32);
  private active = new BooleanCriterion(8 + 32 + 32 + 32);

  constructor(connection: Connection) {
    super(connection, Event);
    this.setFilters(this.authority, this.category, this.eventGroup, this.active);
  }

  filterByAuthority(authority: PublicKey): Events {
    this.authority.setValue(authority);
    return this;
  }

  filterByCategory(category: PublicKey): Events {
    this.category.setValue(category);
    return this;
  }

  filterByEventGroup(eventGroup: PublicKey): Events {
    this.eventGroup.setValue(eventGroup);
    return this;
  }

  filterByActive(active: boolean): Events {
    this.active.setValue(active);
    return this;
  }
}

import { Connection, PublicKey } from "@solana/web3.js";
import { AccountQuery, BooleanCriterion, ByteCriterion, PublicKeyCriterion } from "./queries";
import { Participant } from "../accounts";
import { ParticipantTypeKind } from "../types";

export class Participants extends AccountQuery<Participant> {
  public static participantQuery(connection: Connection) {
    return new Participants(connection);
  }

  private authority = new PublicKeyCriterion(8);
  private category = new PublicKeyCriterion(8 + 32);
  private participantType = new ByteCriterion(8 + 32 + 32);
  private active = new BooleanCriterion(8 + 32 + 32 + 1);

  constructor(connection: Connection) {
    super(connection, Participant);
    this.setFilters(this.authority, this.category, this.participantType, this.active);
  }

  filterByAuthority(authority: PublicKey): Participants {
    this.authority.setValue(authority);
    return this;
  }

  filterByCategory(category: PublicKey): Participants {
    this.category.setValue(category);
    return this;
  }

  filterByParticipantType(participantType: ParticipantTypeKind): Participants {
    this.participantType.setValue(participantType.discriminator);
    return this;
  }

  filterByActive(active: boolean): Participants {
    this.active.setValue(active);
    return this;
  }
}

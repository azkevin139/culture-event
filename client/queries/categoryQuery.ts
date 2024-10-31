import { Connection, PublicKey } from "@solana/web3.js";
import { AccountQuery, PublicKeyCriterion } from "./queries";
import { Category } from "../accounts";

export class Categories extends AccountQuery<Category> {
  public static categoryQuery(connection: Connection) {
    return new Categories(connection);
  }

  private authority: PublicKeyCriterion = new PublicKeyCriterion(8);

  constructor(connection: Connection) {
    super(connection, Category);
    this.setFilters(this.authority);
  }

  filterByAuthority(authority: PublicKey): Categories {
    this.authority.setValue(authority);
    return this;
  }
}

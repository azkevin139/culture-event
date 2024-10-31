import { Connection, PublicKey } from "@solana/web3.js";
import { AccountQuery, PublicKeyCriterion } from "./queries";
import { Subcategory } from "../accounts";

export class Subcategories extends AccountQuery<Subcategory> {
  public static subcategoryQuery(connection: Connection) {
    return new Subcategories(connection);
  }

  private authority = new PublicKeyCriterion(8);
  private category = new PublicKeyCriterion(8 + 32);

  constructor(connection: Connection) {
    super(connection, Subcategory);
    this.setFilters(this.authority, this.category);
  }

  filterByAuthority(authority: PublicKey): Subcategories {
    this.authority.setValue(authority);
    return this;
  }

  filterByCategory(category: PublicKey): Subcategories {
    this.category.setValue(category);
    return this;
  }
}

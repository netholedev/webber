import { aql, Database } from "arangojs";
import { DocumentCollection, EdgeCollection } from "arangojs/collection";
import { ArangoDBBaseRepository, IArangoDBBaseRepository } from "../base";
import { Property } from "../entities";

export class PropertiesRepository extends ArangoDBBaseRepository<Property> implements IArangoDBBaseRepository<Property> {
  private _collectionName: string = "properties";

  collection: DocumentCollection<Property> & EdgeCollection<Property>;

  constructor(db: Database) {
    super(db);
    this.collection = this.db.collection(this._collectionName);
  }

  async find() {
    const cursor = await this.query(aql`
      FOR p IN properties
        RETURN p
    `);

    return cursor.all();
  }
}
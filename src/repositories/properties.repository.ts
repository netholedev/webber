import { aql, Database } from "arangojs";
import { DocumentCollection, EdgeCollection } from "arangojs/collection";
import { ArangoDBBaseRepository, IArangoDBBaseRepository } from "../base";

interface IProperty { }

export class PropertiesRepository extends ArangoDBBaseRepository<IProperty> implements IArangoDBBaseRepository<IProperty> {
  private _collectionName: string = "properties";

  collection: DocumentCollection<IProperty> & EdgeCollection<IProperty>;

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
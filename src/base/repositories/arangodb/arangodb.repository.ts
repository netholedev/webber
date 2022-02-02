import { injectable } from 'inversify';

import { Database } from 'arangojs';
import { ArrayCursor } from 'arangojs/cursor';
import { QueryOptions } from 'arangojs/database';
import { GeneratedAqlQuery } from 'arangojs/aql';
import { DocumentData, DocumentMetadata, DocumentSelector, Patch, Document } from 'arangojs/documents';
import { CollectionInsertOptions, DocumentCollection, EdgeCollection } from 'arangojs/collection';

export interface IArangoDBBaseRepository<T> {
  update(selector: DocumentSelector, newData: Patch<DocumentData<T>>): Promise<DocumentMetadata & { new?: Document<T>; old?: Document<T>; }>
  insert(data: DocumentData<T>, options?: CollectionInsertOptions): Promise<DocumentMetadata & {
    new?: Document<T>;
  }>
  query<T>(query: GeneratedAqlQuery, options?: QueryOptions): Promise<ArrayCursor<T>>
}

@injectable()
export abstract class ArangoDBBaseRepository<T extends object> implements IArangoDBBaseRepository<T> {
  constructor(readonly db: Database) {
    this.createCollection();
  }

  abstract collection: DocumentCollection<T> & EdgeCollection<T>;

  private createCollection() {
    setTimeout(async () => {
      const exists = await this.collection?.exists();

      if (!exists) {
        await this.db.createCollection(this.collection.name);
      }
    }, 1000)
  }

  async update(selector: DocumentSelector, newData: Patch<DocumentData<T>>): Promise<DocumentMetadata & { new?: Document<T>; old?: Document<T>; }> {
    return await this.collection.update(selector, newData, {
      returnNew: true,
    });
  }

  async insert(data: DocumentData<T>, options?: CollectionInsertOptions): Promise<DocumentMetadata & {
    new?: Document<T>;
  }> {
    return await this.collection.save(data, Object.assign(options || {}, { returnNew: true }));
  }

  async query<T>(query: GeneratedAqlQuery, options?: QueryOptions): Promise<ArrayCursor<T>> {
    return this.db.query(query, options);
  }
}

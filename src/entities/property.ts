import { Document } from 'arangojs/documents';

interface IProperty {
  id: number;
  name: string;
}

export class Property implements IProperty {
  id!: number;
  name!: string

  fromArangodbNewResult(doc?: Document<IProperty>) {
    this.id = parseInt(doc?._key || "0");
    this.name = doc?.name || '';

    return this;
  }
}
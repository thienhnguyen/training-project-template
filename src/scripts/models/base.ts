export default class Base {
  CreatedAt: Date = new Date();

  CreatedBy: string = 'seed';

  ModifiedAt: Date = new Date();

  ModifiedBy: string = 'seed';

  constructor(
    createdAt: Date,
    createdBy: string,
    modifiedAt: Date,
    modifiedBy: string,
  ) {
    this.CreatedAt = createdAt;
    this.CreatedBy = createdBy;
    this.ModifiedAt = modifiedAt;
    this.ModifiedBy = modifiedBy;
  }
}

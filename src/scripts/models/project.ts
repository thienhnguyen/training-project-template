import IBase from './ibase';

class Project implements IBase {
  Id: string;

  Name: string;

  Type: string;

  CreatedAt: Date;

  CreatedBy: string;

  ModifiedAt: Date;

  ModifiedBy: string;

  constructor(
    id: string,
    name: string,
    type: string,
    createdAt: Date,
    createdBy: string,
    modifiedAt: Date,
    modifiedBy: string,
  ) {
    this.Id = id;
    this.Name = name;
    this.Type = type;
    this.CreatedAt = createdAt;
    this.CreatedBy = createdBy;
    this.ModifiedAt = modifiedAt;
    this.ModifiedBy = modifiedBy;
  }
}

export default Project;

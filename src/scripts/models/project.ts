import Base from './base';

class Project implements Base {
  id: string;

  fileName: string;

  fileType: string;

  createdAt: Date;

  createdBy: string;

  modifiedAt: Date;

  modifiedBy: string;

  constructor(
    id: string,
    fileName: string,
    fileType: string,
    createdAt: Date,
    createdBy: string,
    modifiedAt: Date,
    modifiedBy: string,
  ) {
    this.id = id;
    this.fileName = fileName;
    this.fileType = fileType;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
  }
}

export default Project;

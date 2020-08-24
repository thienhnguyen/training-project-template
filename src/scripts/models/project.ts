import Base from './base';

class Project implements Base {
  id: string;

  fileName: string;

  fileType: string;

  createdAt: Date;

  createdBy: string;

  modifiedAt: Date;

  modifiedBy: string;

  path: string = '/';

  constructor(
    id: string,
    fileName: string,
    fileType: string,
    path: string = '/',
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
    this.path = path;
  }
}

export default Project;

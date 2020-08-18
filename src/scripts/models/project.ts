import IBase from './ibase';

class Project implements IBase {
  Id: string;

  FileName: string;

  FileType: string;

  CreatedAt: Date;

  CreatedBy: string;

  ModifiedAt: Date;

  ModifiedBy: string;

  static count = 0;

  constructor(
    id: string,
    fileName: string,
    fileType: string,
    createdAt: Date,
    createdBy: string,
    modifiedAt: Date,
    modifiedBy: string,
  ) {
    this.Id = id;
    this.FileName = fileName;
    this.FileType = fileType;
    this.CreatedAt = createdAt;
    this.CreatedBy = createdBy;
    this.ModifiedAt = modifiedAt;
    this.ModifiedBy = modifiedBy;

    Project.count += 1;
  }
}

export default Project;

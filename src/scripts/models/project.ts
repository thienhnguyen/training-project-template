import Base from './base';

export default class Project extends Base {
  Id: string;

  Name: string;

  Type: string;

  constructor(id: string, name: string, type: string) {
    super(new Date(), 'seedData', new Date(), 'seedData');
    this.Id = id;
    this.Name = name;
    this.Type = type;
  }
}

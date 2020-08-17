import data from '../models/data';
import Project from '../models/project';

class ProjectModule {
  getData = () => {
    return new Promise<Project[]>(resolve => {
      console.log('getData');
      resolve(data);
    });
  };
}

export default ProjectModule;

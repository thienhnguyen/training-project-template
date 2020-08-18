import { v4 as uuid } from 'uuid';
import Project from '../models/project';
import LocalStorageModule from './LocalStorageService';

const ls = new LocalStorageModule();

class ProjectModule {
  getData = () => {
    return new Promise<Project[]>(resolve => {
      const projects = ls.getLocalStorage();
      resolve(projects);
    });
  };

  createData = (project: any) => {
    return new Promise((resolve, reject) => {
      project.Id = uuid();
      project.CreatedAt = new Date();
      project.CreatedBy = 'THN';
      project.ModifiedAt = new Date();
      project.ModifiedBy = 'THN';

      const projects = ls.getLocalStorage();
      projects.push(project);
      ls.saveLocalStorage(projects);

      resolve('Success');
      setTimeout(() => reject(new Error('Failed')), 1000);
    });
  };

  updateData = (project: any) => {
    return new Promise((resolve, reject) => {
      project.ModifiedAt = new Date();
      project.ModifiedBy = 'THN';

      ls.updateLocalStorage(project);

      resolve('Success');
      setTimeout(() => reject(new Error('Failed')), 1000);
    });
  };

  deleteData = (id: any) => {
    return new Promise((resolve, reject) => {
      const projects = ls.getLocalStorage();
      const filterItem = projects.filter(
        (i: Project) => i.Id !== id.toString(),
      );
      ls.saveLocalStorage(filterItem);
      resolve('Success');
      setTimeout(() => reject(new Error('Failed')), 1000);
    });
  };
}

export default ProjectModule;

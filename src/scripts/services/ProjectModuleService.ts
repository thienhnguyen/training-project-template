import { v4 as uuid } from 'uuid';
import Project from '../models/project';
import LocalStorageModule from './LocalStorageService';

const ls = new LocalStorageModule();

class ProjectModule {
  getData = () => {
    return new Promise<Project[]>((resolve, reject) => {
      try {
        const projects = ls.getLocalStorage();
        resolve(projects);
      } catch (e) {
        reject(new Error(e));
      }
    });
  };

  createData = (project: any) => {
    return new Promise((resolve, reject) => {
      project.Id = uuid();
      project.CreatedAt = new Date();
      project.CreatedBy = 'THN';
      project.ModifiedAt = new Date();
      project.ModifiedBy = 'THN';

      try {
        const projects = ls.getLocalStorage();
        projects.push(project);
        ls.saveLocalStorage(projects);
        resolve('Success');
      } catch (e) {
        reject(new Error(e));
      }
    });
  };

  updateData = (project: any) => {
    return new Promise((resolve, reject) => {
      try {
        project.ModifiedAt = new Date();
        project.ModifiedBy = 'THN';

        ls.updateLocalStorage(project);

        resolve('Success');
      } catch (e) {
        reject(new Error(e));
      }
    });
  };

  deleteData = (id: any) => {
    return new Promise((resolve, reject) => {
      try {
        const projects = ls.getLocalStorage();
        const filterItem = projects.filter(
          (i: Project) => i.Id !== id.toString(),
        );
        ls.saveLocalStorage(filterItem);
        resolve('Success');
      } catch (e) {
        reject(new Error(e));
      }
    });
  };
}

export default ProjectModule;

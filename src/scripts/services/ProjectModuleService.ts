import { v4 as uuid } from 'uuid';
import Project from '../models/project';
import LocalStorageModule from './LocalStorageService';
import WebApiServiceModule from './WebApiService'

const ls = new LocalStorageModule();
const service = new WebApiServiceModule();

class ProjectModule {
  getData = () => {
    return new Promise<Project[]>((resolve, reject) => {
      try {
        const projects = service.getData();
        resolve(projects);
      } catch (e) {
        reject(new Error(e));
      }
    });
  };

  createData = (formData: FormData) => {
    return new Promise((resolve, reject) => {

      try {
        const projects = service.Upload(formData);
        resolve('Success');
      } catch (e) {
        reject(new Error(e));
      }
    });
  };

  updateData = (project: any) => {
    return new Promise((resolve, reject) => {
      try {
        project.modifiedAt = new Date();
        project.modifiedBy = 'THN';

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
          (i: Project) => i.id !== id.toString(),
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

import Project from '../models/project';
import LocalStorageModule from './LocalStorageService';

const ls = new LocalStorageModule();
const url = 'https://localhost:44308/api/projects';

class ProjectModule {
  getData = () => {
    return new Promise<Project[]>((resolve, reject) => {
      try {
        $.ajax({
          url: url,
          type: 'GET',
          success: function(data) {
            resolve(data);
          },
        });
      } catch (e) {
        reject(new Error(e));
      }
    });
  };

  upload = (formData: FormData) => {
    return new Promise((resolve, reject) => {
      try {
        $.ajax({
          url: url,
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(result) {
            resolve('Success');
          },
        });
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

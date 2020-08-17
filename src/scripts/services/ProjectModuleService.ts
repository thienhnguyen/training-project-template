import Project from '../models/project';

class ProjectModule {
  getData = () => {
    return new Promise<Project[]>(resolve => {
      const projects = JSON.parse(
        localStorage.getItem('data') || '{}',
      );
      //   console.log('getData');
      resolve(projects);
    });
  };

  deleteData = (id: string) => {
    return new Promise((resolve, reject) => {
      const projects = JSON.parse(
        localStorage.getItem('data') || '{}',
      );
      const deleteItem = projects.filter(
        (i: Project) => i.Id !== id.toString(),
      );
      localStorage.setItem('data', JSON.stringify(deleteItem));
      resolve('OK');
      setTimeout(() => reject(new Error('Failed')), 1000);
    });
  };
}

export default ProjectModule;

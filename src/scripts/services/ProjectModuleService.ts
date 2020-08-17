import Project from '../models/project';

class ProjectModule {
  getData = () => {
    return new Promise<Project[]>(resolve => {
      const projects = JSON.parse(
        localStorage.getItem('data') || '{}',
      );
      resolve(projects);
    });
  };

  createData = (fileName: any, fileType: any) => {
    return new Promise((resolve, reject) => {
      const projects = JSON.parse(
        localStorage.getItem('data') || '{}',
      );
      const newProject = {
        Id: (projects.length + 10).toString(),
        FileName: fileName,
        FileType: fileType,
        CreatedAt: new Date(),
        CreatedBy: 'THN',
        ModifiedAt: new Date(),
        ModifiedBy: 'THN',
      };
      projects.push(newProject);
      localStorage.setItem('data', JSON.stringify(projects));
      resolve('Success');
      setTimeout(() => reject(new Error('Failed')), 1000);
    });
  };

  deleteData = (id: any) => {
    return new Promise((resolve, reject) => {
      const projects = JSON.parse(
        localStorage.getItem('data') || '{}',
      );
      const filterItem = projects.filter(
        (i: Project) => i.Id !== id.toString(),
      );
      localStorage.setItem('data', JSON.stringify(filterItem));
      resolve('Success');
      setTimeout(() => reject(new Error('Failed')), 1000);
    });
  };
}

export default ProjectModule;

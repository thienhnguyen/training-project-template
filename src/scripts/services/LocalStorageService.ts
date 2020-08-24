import Project from '../models/project';

class LocalStorageModule {
  saveLocalStorage = (projects: Project[]) => {
    localStorage.setItem('data', JSON.stringify(projects));
  };

  getLocalStorage = () => {
    const projects = JSON.parse(localStorage.getItem('data') || '{}');
    return projects;
  };

  updateLocalStorage = (project: Project) => {
    const projects = this.getLocalStorage();
    const updateProjectIndex = projects.findIndex(
      (i: Project) => i.id === project.id,
    );

    projects[updateProjectIndex].fileName = project.fileName;
    projects[updateProjectIndex].fileType = project.fileType;
    projects[updateProjectIndex].path = project.path;
    projects[updateProjectIndex].modifiedAt = project.modifiedAt;
    projects[updateProjectIndex].modifiedBy = project.modifiedBy;

    this.saveLocalStorage(projects);
  };
}

export default LocalStorageModule;

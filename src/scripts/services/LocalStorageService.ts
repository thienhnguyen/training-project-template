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

    projects[updateProjectIndex].FileName = project.fileName;
    projects[updateProjectIndex].FileType = project.fileType;
    projects[updateProjectIndex].ModifiedAt = project.modifiedAt;
    projects[updateProjectIndex].ModifiedBy = project.modifiedBy;

    this.saveLocalStorage(projects);
  };
}

export default LocalStorageModule;

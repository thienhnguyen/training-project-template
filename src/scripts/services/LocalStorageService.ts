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
      (i: Project) => i.Id === project.Id,
    );

    projects[updateProjectIndex].FileName = project.FileName;
    projects[updateProjectIndex].FileType = project.FileType;
    projects[updateProjectIndex].ModifiedAt = project.ModifiedAt;
    projects[updateProjectIndex].ModifiedBy = project.ModifiedBy;

    this.saveLocalStorage(projects);
  };
}

export default LocalStorageModule;

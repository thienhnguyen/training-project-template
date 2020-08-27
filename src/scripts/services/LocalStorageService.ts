import Project from '../models/project';

class LocalStorageModule {
  saveLocalStorage = (projects: Project[]) => {
    localStorage.setItem('data', JSON.stringify(projects));
  };

  getLocalStorage = () => {
    const url = 'https://localhost:44308/api/projects';
    fetch(url)
      .then(res => res.json())
      .then(out => {
        console.log('Checkout this JSON! ', out);
      })
      .catch(err => {
        throw err;
      });
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
    projects[updateProjectIndex].modifiedAt = project.modifiedAt;
    projects[updateProjectIndex].modifiedBy = project.modifiedBy;

    this.saveLocalStorage(projects);
  };
}

export default LocalStorageModule;

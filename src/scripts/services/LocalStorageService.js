class LocalStorageModule {
    constructor() {
        this.saveLocalStorage = (projects) => {
            localStorage.setItem('data', JSON.stringify(projects));
        };
        this.getLocalStorage = () => {
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
        this.updateLocalStorage = (project) => {
            const projects = this.getLocalStorage();
            const updateProjectIndex = projects.findIndex((i) => i.id === project.id);
            projects[updateProjectIndex].fileName = project.fileName;
            projects[updateProjectIndex].fileType = project.fileType;
            projects[updateProjectIndex].modifiedAt = project.modifiedAt;
            projects[updateProjectIndex].modifiedBy = project.modifiedBy;
            this.saveLocalStorage(projects);
        };
    }
}
export default LocalStorageModule;

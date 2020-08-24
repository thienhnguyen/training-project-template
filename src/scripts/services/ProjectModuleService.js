import { v4 as uuid } from 'uuid';
import LocalStorageModule from './LocalStorageService';
const ls = new LocalStorageModule();
class ProjectModule {
    constructor() {
        this.getData = () => {
            return new Promise((resolve, reject) => {
                try {
                    const projects = ls.getLocalStorage();
                    resolve(projects);
                }
                catch (e) {
                    reject(new Error(e));
                }
            });
        };
        this.createData = (project) => {
            return new Promise((resolve, reject) => {
                project.id = uuid();
                project.createdAt = new Date();
                project.createdBy = 'THN';
                project.modifiedAt = new Date();
                project.modifiedBy = 'THN';
                try {
                    const projects = ls.getLocalStorage();
                    projects.push(project);
                    ls.saveLocalStorage(projects);
                    resolve('Success');
                }
                catch (e) {
                    reject(new Error(e));
                }
            });
        };
        this.updateData = (project) => {
            return new Promise((resolve, reject) => {
                try {
                    project.modifiedAt = new Date();
                    project.modifiedBy = 'THN';
                    ls.updateLocalStorage(project);
                    resolve('Success');
                }
                catch (e) {
                    reject(new Error(e));
                }
            });
        };
        this.deleteData = (id) => {
            return new Promise((resolve, reject) => {
                try {
                    const projects = ls.getLocalStorage();
                    const filterItem = projects.filter((i) => i.id !== id.toString());
                    ls.saveLocalStorage(filterItem);
                    resolve('Success');
                }
                catch (e) {
                    reject(new Error(e));
                }
            });
        };
    }
}
export default ProjectModule;

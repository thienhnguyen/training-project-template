import LocalStorageModule from './LocalStorageService';
const ls = new LocalStorageModule();
const url = 'https://localhost:44308/api/projects';
class ProjectModule {
    constructor() {
        this.getData = () => {
            return new Promise((resolve, reject) => {
                try {
                    $.ajax({
                        url: url,
                        type: 'GET',
                        success: function (data) {
                            resolve(data);
                        },
                    });
                }
                catch (e) {
                    reject(new Error(e));
                }
            });
        };
        this.upload = (formData) => {
            return new Promise((resolve, reject) => {
                try {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            resolve('Success');
                        },
                    });
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

import $ from 'jquery';
import 'jquery-ui-bundle';
import { formatDate } from '../utilities/_helper';
import ProjectModule from '../services/ProjectModuleService';
const renderGrid = () => {
    const project = new ProjectModule();
    project.getData().then(data => {
        $('#projectTable').empty();
        data.forEach(val => {
            let tableRow = '';
            if (val.fileType === 'folder') {
                tableRow = `<div class="row project" data-key="${val.id}">
					  <div class="d-block d-lg-none col-10 table-mobile-header-title">
					  File Type
					  </div>
					  <div class="col-lg-1 col-2 table-mobile-header-icon">
						  <img src="/img/icons/file-directory.svg" alt="">
					  </div>
					  <div class="d-block d-lg-none col-5 table-mobile-title">
						  Name
					  </div>
            <div class="col-lg-3 col-7 table-mobile-content corner-icon">
              ${val.fileName}
					  </div>
					  <div class="d-block d-lg-none col-5 table-mobile-title">
						  Modified
					  </div>
					  <div class="col-lg-2 col-7 table-mobile-content">
						  ${formatDate(val.modifiedAt)}
					  </div>
					  <div class="d-block d-lg-none col-5 table-mobile-title">
						  Modified By
					  </div>
					  <div class="col-lg-2 col-7 table-mobile-content">
						  ${val.modifiedBy}
					  </div>
					  <div class="col-lg-2 col-12 table-modified-btn">
						  <div class="row">
							  <div class="offset-lg-1">
								  <a class="btn btn-success btn-sm" href="#" data-toggle="modal" data-target=".projectModal${val.id}">Update</a>
							  </div>
							  <div>
								  <a class="btn btn-danger btn-sm btnDelete" href="#">Delete</a>
							  </div>
						  </div>
            </div>

            <!-- Modal for Update -->
            <div class="modal fade projectModal${val.id}">
              <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <input type="text" class="form-control" data-filename="${val.fileName}" placeholder="Folder Name" value="${val.fileName}">
                      </div>
                      <div class="form-group">
                        <input type="hidden" class="form-control" data-filetype="${val.fileType}" placeholder="Folder" value="${val.fileType}">
                      </div>
                      <button type="submit" class="btn btn-info btnUpdate float-right" data-dismiss="modal" href="#">OK</button>
                      <button type="button" class="btn btn-secondary float-right"
                        data-dismiss="modal">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
				  </div>
        `;
                $('#projectTable').prepend(tableRow);
            }
            else {
                tableRow = `
				  <div class="row project" data-key="${val.id}">
					  <div class="d-block d-lg-none col-10 table-mobile-header-title">
					  File Type
					  </div>
					  <div class="col-lg-1 col-2 table-mobile-header-icon">
						  <img src="/img/icons/microsoft-excel.svg" alt="">
					  </div>
					  <div class="d-block d-lg-none col-5 table-mobile-title">
						  Name
					  </div>
            <div class="col-lg-3 col-7 table-mobile-content corner-icon">
              ${val.fileName}.${val.fileType}
					  </div>
					  <div class="d-block d-lg-none col-5 table-mobile-title">
						  Modified
					  </div>
					  <div class="col-lg-2 col-7 table-mobile-content">
						  ${formatDate(val.modifiedAt)}
					  </div>
					  <div class="d-block d-lg-none col-5 table-mobile-title">
						  Modified By
					  </div>
					  <div class="col-lg-2 col-7 table-mobile-content">
						  ${val.modifiedBy}
					  </div>
					  <div class="col-lg-2 col-12 table-modified-btn">
						  <div class="row">
							  <div class="offset-lg-1">
								  <a class="btn btn-success btn-sm" href="#" data-toggle="modal" data-target=".projectModal${val.id}">Update</a>
							  </div>
							  <div>
								  <a class="btn btn-danger btn-sm btnDelete" href="#">Delete</a>
							  </div>
						  </div>
            </div>

            <!-- Modal for Update -->
            <div class="modal fade projectModal${val.id}">
              <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <input type="text" class="form-control" data-filename="${val.fileName}" placeholder="File Name" value="${val.fileName}">
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" data-filetype="${val.fileType}" placeholder="File Type" value="${val.fileType}">
                      </div>
                      <button type="submit" class="btn btn-info btnUpdate float-right" data-dismiss="modal" href="#">OK</button>
                      <button type="button" class="btn btn-secondary float-right"
                        data-dismiss="modal">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
				  </div>
        `;
                $('#projectTable').append(tableRow);
            }
        });
        $('.btnNew').click(function () {
            $('input[name="fileNameInput"]').val('');
            $('input[name="fileTypeInput"]')
                .val('')
                .prop('disabled', false);
        });
        $('.btnNewFolder').click(function () {
            $('input[name="fileNameInput"]').val('');
            $('input[name="fileTypeInput"]')
                .val('folder')
                .prop('disabled', true);
        });
        $('.btnDelete').click(function (e) {
            e.preventDefault();
            const id = $(this)
                .closest('.project')
                .data('key');
            project.deleteData(id).then(() => {
                renderGrid();
            });
        });
        $('.btnUpdate').click(function () {
            const id = $(this)
                .closest('.project')
                .data('key');
            const fileName = $(this)
                .parent()
                .find('input[data-filename]')
                .val();
            const fileType = $(this)
                .parent()
                .find('input[data-filetype]')
                .val();
            const updateProject = {
                id,
                fileName,
                fileType,
            };
            project.updateData(updateProject).then(() => {
                renderGrid();
            });
        });
        // let dragged: any;
        // $('.project').draggable({
        //   start(e) {
        //     dragged = e.target;
        //     console.log(dragged);
        //   },
        //   drag() {
        //     console.log('drag');
        //   },
        //   stop() {
        //     console.log('stop');
        //   },
        // });
    });
};
$('.btnCreate').click(function () {
    const fileName = $('input[name="fileNameInput"]').val();
    const fileType = $('input[name="fileTypeInput"]').val();
    const newProject = {
        fileName,
        fileType,
    };
    new ProjectModule().createData(newProject).then(() => {
        renderGrid();
    });
});
export default renderGrid;

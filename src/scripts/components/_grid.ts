import $ from 'jquery';
import { formatDate } from '../utilities/_helper';
import ProjectModule from '../services/ProjectModuleService';

const renderGrid = () => {
  const project = new ProjectModule();
  project.getData().then(data => {
    $('#projectTable').empty();
    data.forEach(val => {
      const tableRow = `
				  <div class="row project" data-key="${val.Id}">
					  <div class="d-block d-lg-none col-10 table-mobile-header-title">
					  File Type
					  </div>
					  <div class="col-lg-1 col-2 table-mobile-header-icon">
						  <img src="dist/img/icons/microsoft-excel.svg" alt="">
					  </div>
					  <div class="d-block d-lg-none col-5 table-mobile-title">
						  Name
					  </div>
					  <div class="col-lg-3 col-7 table-mobile-content corner-icon">
						  ${val.FileName}.${val.FileType}
					  </div>
					  <div class="d-block d-lg-none col-5 table-mobile-title">
						  Modified
					  </div>
					  <div class="col-lg-2 col-7 table-mobile-content">
						  ${formatDate(val.ModifiedAt)}
					  </div>
					  <div class="d-block d-lg-none col-5 table-mobile-title">
						  Modified By
					  </div>
					  <div class="col-lg-2 col-7 table-mobile-content">
						  ${val.ModifiedBy}
					  </div>
					  <div class="col-lg-2 col-12 table-modified-btn">
						  <div class="row">
							  <div class="offset-lg-1">
								  <a class="btn btn-success btn-sm" href="#" data-toggle="modal" data-target=".projectModal${
                    val.Id
                  }">Update</a>
							  </div>
							  <div>
								  <a class="btn btn-danger btn-sm btnDelete" href="#">Delete</a>
							  </div>
						  </div>  
            </div>
            
            <!-- Modal for Update -->
            <div class="modal fade projectModal${val.Id}">
              <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <input type="text" class="form-control" data-filename="${
                          val.FileName
                        }" placeholder="File Name" value="${
        val.FileName
      }">
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" data-filetype="${
                          val.FileType
                        }" placeholder="File Type" value="${
        val.FileType
      }">
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
    });

    $('.btnNew').click(function() {
      $('input[name="fileNameInput"]').val('');
      $('input[name="fileTypeInput"]').val('');
    });

    $('.btnDelete').click(function(e) {
      e.preventDefault();
      const id = $(this)
        .closest('.project')
        .data('key');
      project.deleteData(id).then(() => {
        renderGrid();
      });
    });

    $('.btnUpdate').click(function() {
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
        Id: id,
        FileName: fileName,
        FileType: fileType,
      };
      project.updateData(updateProject).then(() => {
        renderGrid();
      });
    });
  });
};

$('.btnCreate').click(function() {
  const fileName = $('input[name="fileNameInput"]').val();
  const fileType = $('input[name="fileTypeInput"]').val();
  const newProject = {
    FileName: fileName,
    FileType: fileType,
  };
  new ProjectModule().createData(newProject).then(() => {
    renderGrid();
  });
});

export default renderGrid;

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
								  <a class="btn btn-success btn-sm btnUpdate" href="#" data-toggle="modal" data-target=".projectModal${
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
                        <input type="text" class="form-control" placeholder="File Name" value="${
                          val.FileName
                        }">
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="File Type" value="${
                          val.FileType
                        }">
                      </div>
                      <button type="submit" class="btn btn-info float-right btnCreate" data-dismiss="modal" href="#">OK</button>
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
      console.log(id);
    });
  });
};

$('.btnCreate').click(function() {
  const fileName = $('input[name="fileNameInput"]').val();
  const fileType = $('input[name="fileTypeInput"]').val();
  new ProjectModule().createData(fileName, fileType).then(() => {
    renderGrid();
  });
});

export default renderGrid;

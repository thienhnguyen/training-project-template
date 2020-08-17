import $ from 'jquery';
// import data from '../models/data';
import formatDate from '../utilities/format';
import ProjectModule from '../services/ProjectModuleService';

const renderGrid = () => {
  console.log('renderGrid');

  new ProjectModule().getData().then(data => {
    data.forEach(val => {
      const tableRow = `
				  <div class="row" data-key="${val.Id}">
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
						  ${val.Name}.${val.Type}
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
								  <a id="btnUpdate" class="btn btn-success btn-sm" href="#" role="button">Update</a>
							  </div>
							  <div>
								  <a id="btnDelete" class="btn btn-danger btn-sm" href="#" role="button">Delete</a>
							  </div>
						  </div>  
					  </div>
				  </div>
			  `;
      $('#projectTable').append(tableRow);
    });

    $('#btnDelete').click(function() {
      console.log('delete');
    });

    $('#btnUpdate').click(function() {
      console.log('Update');
    });
  });
};

export default renderGrid;

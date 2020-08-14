import $ from 'jquery';
import data from '../models/data';

export default class ProjectModule {
  LoadAll = () => {
    $.each(data, function(key, val) {
      const tableRow = `
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
				<div class="col-lg-3 col-7 table-mobile-content">
                    ${val.ModifiedAt}
				</div>
				<div class="d-block d-lg-none col-5 table-mobile-title">
					Modified By
				</div>
				<div class="col-lg-3 col-7 table-mobile-content">
					${val.ModifiedBy}
				</div>
				<div class="col-lg-2 col-12">
				</div>
      `;
      $('#projectTable').append(tableRow);
    });
  };
}

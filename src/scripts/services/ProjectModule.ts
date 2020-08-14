import $ from 'jquery';
import data from '../models/data';

export default class ProjectModule {
  LoadAll = () => {
    $.each(data, function(key, val) {
      const tableRow = `<div>${val.Id}</div>`;
      $('#projectTable').append(tableRow);
    });
  };
}

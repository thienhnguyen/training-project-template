import ready from '../utilities/_helper';
import renderGrid from '../components/_grid';
import data from '../models/data';
import Project from '../models/project';

ready(() => {
  localStorage.setItem('data', JSON.stringify(data));
  console.log(Project.count);

  renderGrid();
});

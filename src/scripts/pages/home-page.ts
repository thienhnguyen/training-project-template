import ready from '../utilities/_helper';
import renderGrid from '../components/_grid';
import ProjectModule from '../services/ProjectModule';

ready(() => {
  renderGrid();

  const project = new ProjectModule();
  window.onload = () => {
    console.log('page is fully loaded');
    project.LoadAll();
  };
});

import ready from '../utilities/_helper';
import renderGrid from '../components/_grid';
import data from '../models/data';

ready(() => {
  localStorage.setItem('data', JSON.stringify(data));
  renderGrid();
});

import ready from '../utilities/_helper';
// import renderGrid from '../components/_grid';

function GetAll() {
  console.log('getall');
  $.ajax({
    url: '',
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    error(code) {
      console.log(`response: ${code.status}`);
    },
  });
  return 0;
}

ready(() => {
  GetAll();
});

$('.btnDelete').click(function() {
  const id = $(this)
    .closest('.project')
    .data('key');
  $.ajax({
    url: `projects/${id}`,
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success() {
      GetAll();
    },
    error(code) {
      console.log(`response: ${code.status}`);
    },
  });
});

$('.btnUpdate').click(function() {
  const id = $(this)
    .closest('.project')
    .data('key');
  const name = $(this)
    .closest('div')
    .find("input[type='text']")
    .val();
  const obj = {
    id,
    name,
  };
  $.ajax({
    type: 'PUT',
    url: 'projects/',
    data: obj,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    error(code) {
      console.log(`response: ${code.status}`);
    },
  });
});

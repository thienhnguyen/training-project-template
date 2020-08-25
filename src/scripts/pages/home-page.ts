import ready from '../utilities/_helper';
// import renderGrid from '../components/_grid';

function GetAll() {
  console.log('getall');
  $.ajax({
    type: 'GET',
    url: '',
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
    type: 'DELETE',
    url: 'projects/' + id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(){
      alert("delete success")
    },
    error(code) {
      console.log(`response: ${code.status}`);
    },
  });
});

$('.linkDownload').click(function() {
  const id = $(this)
    .closest('.project')
    .data('key');
  $.ajax({
    type: 'GET',
    cache: false,
    url: 'projects/download/' + id,
    dataType: 'json',
    success: function (value) {
      window.location.href = '/projects/download?file=' + value;
    },
    error(code) {
      console.log(`response: ${code.status}`);
    },
  });
});

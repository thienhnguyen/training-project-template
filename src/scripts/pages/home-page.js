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
export function Delete(id) {
    console.log('delete');
    $.ajax({
        type: 'DELETE',
        url: 'projects/' + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        error(code) {
            console.log(`response: ${code.status}`);
        },
    });
    return 0;
}
ready(() => {
    GetAll();
});

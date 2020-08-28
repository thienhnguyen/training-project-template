import Project from '../models/project';

const url = 'https://localhost:44308/api/projects';

class WebApiServiceModule {

  Upload = (formData: FormData) => {
    // console.log("upload");
      
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            console.log(result);
        }
    });
  };

  getData = () => {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (result) {
            return result;
        }
    });
  }
}

export default WebApiServiceModule;

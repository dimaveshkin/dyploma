const GALLERY_SOURCE = "/images/gallery/",
      TOURS_SOURCE = "/images/tours/";

module.exports = {
  concatPath: function(obj, field)  {
    if (!field) {
      field = 'src';
    }
//   console.log(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      obj[i][field] = GALLERY_SOURCE + obj[i][field];
    }

    return obj;
  },
  JSONPath: function (obj, field) {
    for (var i = 0, length = obj.length; i < length; i++) {
      var tpm = JSON.parse(obj[i][field]);
      for(var img in tpm) {
        for(var j = 0; j < tpm[img].length; j++){
          tpm[img][j] = TOURS_SOURCE + tpm[img][j];
        }
        obj[i][field] = tpm;
      }
    }
    return obj;
  }
};
const GALLERY_SOURCE = "/images/gallery/",
      TOURS_SOURCE = "/images/tours/";

module.exports = {
  /**
   * Contact filename with path
   * @param objArray
   * @param field
   * @param src
   * @returns {*}
     */
  concatPath: function(objArray, field, src)  {
    if (!field) {
      field = 'src';
    }

    if(!src) {
      src = GALLERY_SOURCE;
    }

    for (var i = 0, length = objArray.length; i < length; i++) {
      if(field == 'cover' && objArray[i][field] === "") {
        objArray[i][field] = src + 'default.jpg';
      } else {
        objArray[i][field] = src + objArray[i][field];
      }

    }

    return objArray;
  },

  /**
   * Contact json filenames with path
   * @param obj
   * @param field
   * @returns {*}
   * @constructor
     */
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

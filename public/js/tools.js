
var decodeEntities = (function () {
  var element = document.createElement("div");
  function decodeHTMLEntities(str) {
    if (str && typeof str === "string") {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }
    return str;
  }
  return decodeHTMLEntities;
})();

var displayModal = function (message) {
  $("#infoModal")
    .find(".modal-body")
    .html(message);
  $("#infoModal").modal("show");
};

var formatSpecs = function (specs) {
  return specs.reduce(function(result, item) {
    result[item.category.replace(/\s/g, "")] = item.specs.reduce(function(result, item, index) {
      if(item.name.replace(/\s/g, "").length === 0) {
        result[""+index] = item.value;
      } else {
        result[item.name.replace(/\s/g, "")] = item.value;
      }
      return result;
    }, {});
    return result;
  }, {});
};
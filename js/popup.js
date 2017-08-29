document.addEventListener('DOMContentLoaded', function () {

  var ss = document.getElementById('sharpspring');
  var fb = document.getElementById('facebook');
  var ig = document.getElementById('instagram');
  var tw = document.getElementById('twitter');
  var pn = document.getElementById('pinterest');
  var ln = document.getElementById('linkedin');
  var results = document.querySelector('.sub-container.bottom');
  var attributes = ['data-source','data-medium'];
  var website = "https://www.simplifiedbuilding.com/";

  var generateButton = document.getElementById('generate');

  function setValues() {
    var fields = document.querySelectorAll('.field');
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
        var url = tabs[0].url;
        var campaign = document.getElementById('campaign').value;
        fields.forEach(function(element){
          var src = element.dataset.source;
          var med = element.dataset.medium;
          element.value = url + '?utm_source=' + src + '&utm_medium=' + med + '&utm_campaign=' + campaign;
        });

    });
  };

  function renderFields(json) {
    var array = json.fields;
    results.innerHTML = '';
    array.forEach(function(key){
    	var field = document.createElement('input');
      var label = document.createElement('h4');
      var labelText = document.createTextNode(key[0]);
      label.appendChild(labelText);
      field.className = "field";
    	for (var i = 0; i < key.length; i++) {
    		console.log(attributes[i],key[i]);
    		field.setAttribute(attributes[i],key[i]);
    	};
      results.appendChild(label);
    	results.appendChild(field);
    });
  };

  chrome.storage.sync.get('fields', function(result){
    renderFields(result);
  });

  generateButton.addEventListener('click', function(){
    setValues();
  });

});

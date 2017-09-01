document.addEventListener('DOMContentLoaded', function () {

  var buttonSave = document.getElementById('save');
  var buttonNew = document.getElementById('new');
  var fieldContainer = document.querySelector('.field-container');
  var fieldset = document.querySelector('.field-set');
  var attributes = ['data-source','data-medium','data-campaign'];

  function removeFieldSet() {
    this.parentNode.remove();
  };

  function renderFields(json) {
    var array = json.fields;
    array.forEach(function(key){
      var fieldsetOptions = document.createElement('span');
      fieldsetOptions.className = 'field-set__option field-set__option--remove';
      var newFieldSet = document.createElement('div');
      newFieldSet.className = 'field-set';
      for (var i = 0; i < key.length; i++) {
        var field = document.createElement('input');
        field.value = key[i];
        field.className = 'field';
        newFieldSet.appendChild(field);
      };
      newFieldSet.appendChild(fieldsetOptions);
      fieldContainer.insertBefore(newFieldSet, fieldContainer.firstChild);
    });
  };

  chrome.storage.sync.get('fields', function(result){
    renderFields(result);
    var buttonRemove = document.querySelectorAll('.field-set__option--remove');
    buttonRemove.forEach(function(element){
      element.addEventListener('click',removeFieldSet);
    });
  });

  // For Saving New Fields

  function saveFieldSets() {
    var arr = [];
  	var fieldsets = document.querySelectorAll('.field-set');
  	fieldsets.forEach(function(element){
  		var children = [];
  		var fields = element.querySelectorAll('.field');
  		fields.forEach(function(field){
  			children.push(field.value);
  		});
  		if (children[0].length) {
  			arr.push(children);
  		};
  });

    chrome.storage.sync.set({'fields':arr},function(){
      alert('Settings saved!');
    });

  };

  // For adding new set of fields

  function addFieldSet() {
  	var fieldsetNode = fieldset.cloneNode(true);
  	var fieldsetChildren = fieldsetNode.childNodes;
    fieldsetChildren.forEach(function(node){
      node.value = '';
    });
    fieldContainer.appendChild(fieldsetNode);
  };

  buttonSave.addEventListener('click',saveFieldSets);
  buttonNew.addEventListener('click',addFieldSet);

});

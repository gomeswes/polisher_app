var controller = (function(){
  var publicApi = {}
  sentence = {}
  categoryId = ''
  ids = []
  ctrlEnglish = {}
  ctrlPolish = {}
  ctrlPolishReadonly = {}
  ctrlShowPlSentence = {}
  checkButton = {}
  svcPolisher = {}
  ctrlAlertSuccess = {}
  ctrlAlertFail = {}
  ctrlIndex = {}


  publicApi.initPolisher = function(polisher){
    svcPolisher = polisher;
  }
  publicApi.initSentence = function(english, polish, id){
    sentence.english = english
    sentence.polish = polish
    sentence.id = id
    setupIds(id)
    publicApi.setEnglish(sentence.english)
    publicApi.setHiddenPolish(sentence.polish)
    clearInput()
  }

  var setupIds = function(id){
    ids.push(id)
    ctrlIndex.text(ids.length)
  }

  publicApi.initControls = function(inpEnglish, inpPolish, inpPolishReadonly, btnCheck, inpShowPlSentence, alertSuccess, alertFail, index){
    ctrlEnglish = inpEnglish
    ctrlPolish = inpPolish
    ctrlPolishReadonly = inpPolishReadonly
    checkButton = btnCheck
    ctrlShowPlSentence = inpShowPlSentence
    ctrlAlertSuccess = alertSuccess
    ctrlAlertFail = alertFail
    ctrlIndex = index

    initShowPlSentence()
    initCheckAction()
  }

  publicApi.setCategoryId = function(id){
    if (categoryId != id)
      ids = []
    categoryId = id
  }

  publicApi.setEnglish = function(value){
    ctrlEnglish.val(value)
  }
  publicApi.setHiddenPolish = function(value){
    ctrlPolishReadonly.val(value)
  }

  var initShowPlSentence = function(){
    ctrlShowPlSentence.on('click', checkIfShowPlSentence)
  }
  
  var checkIfShowPlSentence = function() {
    if (ctrlShowPlSentence.is(':checked')){
      ctrlPolishReadonly.show('fast')
    }
    else {
      ctrlPolishReadonly.hide('fast')
    } 
  }
  var checkInputValue = function(){
    var result = polisher.checkIsCorrect(ctrlPolishReadonly.val(), ctrlPolish.val())
    if (result){
      loadNewSentence()
      var cloneAlert = ctrlAlertSuccess.clone()
      cloneAlert.insertAfter(ctrlAlertSuccess)
      cloneAlert.show()
      setTimeout(function(){
        cloneAlert.hide('fast')
      },1500)
    }
    else {
      var cloneAlert = ctrlAlertFail.clone()
      cloneAlert.insertAfter(ctrlAlertFail)
      cloneAlert.show()
      setTimeout(function(){
        cloneAlert.hide('fast')
      },1500)
    }
  }

  var loadNewSentence = function(){
    $.ajax({
      url: '/sentences/get_new',
      method: 'GET',
      data: {ids_to_ignore: ids, category_id: categoryId},
      dataType: 'json'
    })
    .done(initNewSentence)
    .fail(function(data){console.log(data)})
  }

  var clearInput = function(){
    ctrlPolish.val('')
  }
  var initNewSentence=function(sentence){
    if (sentence)
      publicApi.initSentence(sentence.english, sentence.polish, sentence.id)
  }
  var initCheckAction = function(){
    checkButton.on('click', checkInputValue)
    ctrlPolish.on('keypress', function(evt) {
      if (evt.which==13)
        checkInputValue()
    });
  }

  return publicApi;
})();
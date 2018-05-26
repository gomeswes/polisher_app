var controller = (function(){
  var publicApi = {}
  sentence = {}
  categoryId = ''
  ids = []
  ctrlEnglish = {}
  ctrlPolish = {}
  ctrlPolishReadonly = {}
  checkButton = {}
  svcPolisher = {}


  publicApi.initPolisher = function(polisher){
    svcPolisher = polisher;
  }
  publicApi.initSentence = function(english, polish, id){
    sentence.english = english
    sentence.polish = polish
    sentence.id = id
    ids.push(id)
    publicApi.setEnglish(sentence.english)
    publicApi.setHiddenPolish(sentence.polish)
    clearInput()
  }

  publicApi.initControls = function(inpEnglish, inpPolish, inpPolishReadonly, btnCheck){
    ctrlEnglish = inpEnglish
    ctrlPolish = inpPolish
    ctrlPolishReadonly = inpPolishReadonly
    checkButton = btnCheck
    initCheckAction()
  }

  publicApi.setCategoryId = function(id){
    categoryId = id
  }

  publicApi.setEnglish = function(value){
    ctrlEnglish.val(value)
  }
  publicApi.setHiddenPolish = function(value){
    ctrlPolishReadonly.val(value)
  }

  var checkInputValue = function(){
    var result = polisher.checkIsCorrect(ctrlPolishReadonly.val(), ctrlPolish.val())
    if (result){
      loadNewSentence()
      console.log('ok')
    }
    else {
      console.log('Pls try again')
    }
  }

  var loadNewSentence = function(){
    console.log(ids)
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
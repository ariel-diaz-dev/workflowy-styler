var WorkflowyOptions = {

  pageColor : $("#pageColor"),
  textColor : $("#textColor"),
  pageOpacity : $("#pageOpacity"),
  pageWidth : $("#pageWidth"),
  pageBackgroundImageUrl : $("#pageBackgroundImageUrl"),

  saveConfigs : function(){

   var thisObj = this; 
   var pageColor = thisObj.pageColor.colorpicker('getValue');
   var textColor = thisObj.textColor.colorpicker('getValue');
   var pageOpacity = thisObj.pageOpacity.val();
   var pageWidth = thisObj.pageWidth.val();
   var pageBackgroundImageUrl = thisObj.pageBackgroundImageUrl.val();

   var key = "workflowyConfigs",
   configs = JSON.stringify({
        'pageColor': pageColor,
        'textColor': textColor,
        'pageOpacity': pageOpacity,
        'pageWidth': pageWidth,
        'pageBackgroundImageUrl': pageBackgroundImageUrl,
    });
    var jsonfile = {};
      jsonfile[key] = configs;
      chrome.storage.sync.set(jsonfile, function () {
        console.log('Saved', key, configs);
    }); 
  }, 

  executeScriptOnTab : function(code){
    chrome.tabs.executeScript( null, {code : code}, function(){ } );
  },

  loadConfigs : function(){
    var thisObj = this;
    var configs = chromeApiWrapper.getConfigs();
    
    setTimeout(function(){
      thisObj.pageColor.val(configs.pageColor);
      thisObj.pageColor.colorpicker();
      thisObj.textColor.val(configs.textColor);
      thisObj.textColor.colorpicker();
      thisObj.pageOpacity.val(configs.pageOpacity);
      var pageOpacitySlider = new Slider('#pageOpacity', {
        value : parseInt(configs.pageOpacity),
        min : 10,
        max : 90,
        step : 10,
        formatter: function(value) {
          return value + '%';
        }
      }).on('change', function(data){
          thisObj.pageOpacity.val(data.newValue);
          thisObj.executeScriptOnTab('$(".page").css({"opacity": 0.' + data.newValue + '});');
      }); 
      var pageWidthSlider = new Slider('#pageWidth', {
        value : parseInt(configs.pageWidth),
        min : 10,
        max : 100,
        step : 10,
        formatter: function(value) {
          return value + '%';
        }
      }).on('change', function(data){
          thisObj.pageWidth.val(data.newValue);
          thisObj.executeScriptOnTab('$(".page").css({"max-width": "' + data.newValue +'%"});');
      }); 
      thisObj.pageWidth.val(configs.pageWidth);
      thisObj.pageBackgroundImageUrl.val(configs.pageBackgroundImageUrl);  
    },200);
  },

  initListeners : function(){
    var thisObj = WorkflowyOptions;
    thisObj.pageColor.colorpicker()
      .on('changeColor.colorpicker', function(event){
          var color = event.color.toHex();
          thisObj.pageColor.val(color);
          thisObj.executeScriptOnTab('$(".page").css({"background": "' + color + '"});');
    }); 
    thisObj.textColor.colorpicker()
      .on('changeColor.colorpicker', function(event){
          var color = event.color.toHex();
          thisObj.textColor.val(color);
          thisObj.executeScriptOnTab('$(".page").css({"color": "' + color+ '"});');
    }); 
    thisObj.pageBackgroundImageUrl.on('keyup', function(){
      thisObj.executeScriptOnTab('$("#backgroundImage").css({"backgroundImage": "url(' + thisObj.pageBackgroundImageUrl.val() + ')"});');
    });

    $("#saveSettings").on('click', function(event){
      event.preventDefault();
      thisObj.saveConfigs();
      $("#saveSettings").text("Settings Saved");
      $("#saveSettings").addClass("disabled");
      setTimeout(function(){
        window.close();
      },1000);
    });
  },

  init: function(){
    var thisObj = this;
    thisObj.loadConfigs();
    thisObj.initListeners();
  }
}

$(document).ready(function(){
  WorkflowyOptions.init(); 
})

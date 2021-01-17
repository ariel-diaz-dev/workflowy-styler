var chromeApiWrapper = {

  defaultPageColor: 'black',
  defaultPageOpacity: '80',
  defaultPageWidth: '50',
  defaultBackgroundImageUrl: 'http://i.imgur.com/8D4SJSz.jpg',
  defaultTextColor: 'white',
  
    getConfigs : function(){
        var thisObj = this; 
        var configs = {};
        chrome.storage.sync.get('workflowyConfigs', function (response) {
          if(response.workflowyConfigs == null){
            configs.pageColor = thisObj.defaultPageColor;
            configs.pageOpacity = thisObj.defaultPageOpacity;
            configs.pageWidth = thisObj.defaultPageWidth;
            configs.pageBackgroundImageUrl = thisObj.defaultBackgroundImageUrl;
            configs.textColor = thisObj.defaultTextColor;
          }else{
            var parsedConfigs = JSON.parse(response.workflowyConfigs);
            if(parsedConfigs.pageWidth == null){
              configs.pageWidth = thisObj.defaultPageWidth;
            }else{
              configs.pageWidth = parsedConfigs.pageWidth;
            }
            if(parsedConfigs.pageOpacity == null){
              configs.pageOpacity = thisObj.defaultPageOpacity;
            }else{
              configs.pageOpacity = parsedConfigs.pageOpacity;
            }
            if(parsedConfigs.pageBackgroundImageUrl == null){
              configs.pageBackgroundImageUrl = thisObj.defaultBackgroundImageUrl;
            }else{
              configs.pageBackgroundImageUrl = parsedConfigs.pageBackgroundImageUrl;
            }
            if(parsedConfigs.pageColor == null){
              configs.pageColor = thisObj.defaultPageColor;
            }else{
              configs.pageColor = parsedConfigs.pageColor;
            }
            if(parsedConfigs.textColor == null){
              configs.textColor = thisObj.defaultTextColor;
            }else{
              configs.textColor = parsedConfigs.textColor;
            }
          }
        });
        return configs;
      }
  }
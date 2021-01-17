var configs = chromeApiWrapper.getConfigs();
configs.textColor = 'white';

setTimeout(function(){
    var opacity = '0.' + configs.pageOpacity;
    var width = configs.pageWidth + '%';

    $("#backgroundImage").css({'backgroundImage': 'url('+configs.pageBackgroundImageUrl+')'});
    $(".page").css({'opacity': opacity});
    $(".page").css({'width': width});
    $(".page").css({'max-width': width});
    $(".page").css({'background': configs.pageColor});
    $(".page").css({'color': configs.textColor});
    $(".page").css({'transform': "none"});
    }, 150
);

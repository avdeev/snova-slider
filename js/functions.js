var arrCarouselValues = new Array();

function changeValue(event,value) {
  //alert(event.id); 
  if ((event.id == '_speed') && ((event.value == '') || (event.value == 0)))
  {
    value = 1;
  }
  var v = '$("#' + event.id + '").siblings().'  + 'val("'+ value+'")'; // ändert alle Inputfelder des Containers, wenn "range" benutzt wird
  eval(v);
  var eventValue = value;
  //if ((event.type == 'checkbox') && (event.id != '_jsonScript'))
  if (event.type == 'checkbox') {
    eventValue = '' + $('#' + event.id).is(':checked') +'';   
    if (event.id == '_jsonScript') {
      if (eventValue == true)
        eventValue = null;
      else
        eventValue = "'json/images.json'";
    }
  }
  
  if (!value)
    eventValue = false; 
  

  $('#carousel').setValue(event.parentNode.id,eventValue);
}

function getAllValues() {
$('.cvalinput').each(function() {
  if (this.type == 'checkbox') {
    if ($('#carousel').getValue(this.parentNode.id))
      $('#'+this.id).attr('checked','checked');
  }
  else
  {
    var value = $('#carousel').getValue(this.parentNode.id);
    $('#'+this.id).siblings().andSelf().val(value); // Setzt die Werte für alle Inputfelder ("range" & "text" innerhalb des Containers)
  }
  arrCarouselValues[this.parentNode.id] = $('#carousel').getValue(this.parentNode.id);
  if ($('#carousel').getValue(this.parentNode.id) == 'json/images.json')
    arrCarouselValues[this.parentNode.id] = true;
});
}
    
      
  function initPage() {  
    
    getAllValues();
    showValues();
    
    $('#resetCarousel').bind({
      click: function(event) { 
        $('#carousel').setDefaultValues();
        var value;
        $('.cvaldiv').each(function() {
          value = $('#carousel').getValue(this.id);
          if (this.children[0].type == 'checkbox')
          {
            if (value == true) 
              $('#'+this.id).children().attr('checked','checked');
          }
          $('#'+this.id).children().val(value);
          $('#carousel').setValue(this.id,value);
        });
      showValues();
      }
    });
        
    $('.cvalinput').bind({ 
      keyup: function(event) { 
        changeValue(this,this.value);
        showValues();
      },
      change: function(event) { 
        if ($('#isRange')[0].type == 'range') {
          changeValue(this,this.value);
          showValues();
        }
        if (event.target.type == 'checkbox') {
          changeValue(this,this.checked);
          showValues();
        }
      }
      
    });
   
    
    function showValues() {

      var carouselValues;
      if ($('#_overlay').val() == '')
        $('#_overlay').val(0);
      carouselValues = "$('#yourDiv').jCarousel({ <br/>";
      if (arrCarouselValues['width'] != $('#_width').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;width           : "+$('#_width').val()+",<br/>";
      if (arrCarouselValues['height'] != $('#_height').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;height          : "+$('#_height').val()+",<br/>";
      if (arrCarouselValues['speed'] != $('#_speed').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;speed           : "+$('#_speed').val()+",<br/>";
      if (arrCarouselValues['maxSpeed'] != $('#_maxSpeed').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;maxSpeed        : "+$('#_maxSpeed').val()+",<br/>";
      if (arrCarouselValues['perspective'] != $('#_perspective').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;perspective     : "+$('#_perspective').val()+",<br/>";
      if (arrCarouselValues['dynamic'] != $('#_dynamic').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;dynamic         : "+$('#_dynamic').val()+",<br/>";
      if (arrCarouselValues['showImageTitle'] != $('#_showImageTitle').is(':checked'))
        carouselValues = carouselValues + "&nbsp;&nbsp;showImageTitle  : "+$('#_showImageTitle').is(':checked')+",<br/>";
      if (arrCarouselValues['showButtons'] != $('#_showButtons').is(':checked'))
        carouselValues = carouselValues + "&nbsp;&nbsp;showButtons : "+$('#_showButtons').is(':checked')+",<br/>";
      if (arrCarouselValues['reflection'] != $('#_reflection').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;reflection      : "+$('#_reflection').val()+",<br/>";
      if (arrCarouselValues['reflectionStart'] != $('#_reflectionStart').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;reflectionStart : "+$('#_reflectionStart').val()+",<br/>";
      if (arrCarouselValues['reflectionEnd'] != $('#_reflectionEnd').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;reflectionEnd   : "+$('#_reflectionEnd').val()+",<br/>";
      if (arrCarouselValues['overlay'] != $('#_overlay').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;overlay         : "+$('#_overlay').val()+",<br/>";
      if (arrCarouselValues['overlayGlobal'] != $('#_overlayGlobal').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;overlayGlobal   : "+$('#_overlayGlobal').val()+",<br/>";
      if (arrCarouselValues['overlayColor'] != $('#_overlayColor').val())
        carouselValues = carouselValues + "&nbsp;&nbsp;overlayColor    : "+$('#_overlayColor').val()+",<br/>";
      if (arrCarouselValues['jsonScript'] == $('#_jsonScript').is(':checked'))
        carouselValues = carouselValues + "&nbsp;&nbsp;jsonScript        : 'path/jsonFile',<br/>";
      carouselValues = carouselValues + "&nbsp;&nbsp;onPicClick : function(b,block,i)<br/>";
      carouselValues = carouselValues + "&nbsp;&nbsp;{<br/>";
      carouselValues = carouselValues + "&nbsp;&nbsp;&nbsp;&nbsp;// your code<br/>";
      carouselValues = carouselValues + "&nbsp;&nbsp;}<br/>";
      carouselValues = carouselValues + "});";
      $('#carouselValues').html(carouselValues);
    }
    
    
  
     
//      $('input').bind({ change: function(event) { 
//        if ($('#isRange')[0].type == 'range') {
//        changeValue(this);
//        }
//      }
//    });
    
    if ($('#isRange')[0].type == 'range') {
      $('.cvalrange').css('display','inline');
    }
    else
    {
      $('.cvalrange').css('display','none');
    }
        
  }      
             
function openPopUp(_url,width,height) {
  popUp = window.open(_url, "PopUp", "width="+width+",height="+height+",left=100,top=100,scrollbars=yes");
  popUp.focus();

}

function insertComment(obj,hierarchy) {
  var arrObjId = obj.split('_');
  var commentIsOpen;
  if ($('#commentReply_'+arrObjId[1]+'_'+arrObjId[2]+'_'+arrObjId[3]).length > 0)
    commentIsOpen = true;
  else
    commentIsOpen = false;  
  $('.commentReply').remove();
  if (commentIsOpen == false) {
    $('#comment').clone().attr({'id':'commentReply_'+arrObjId[1]+'_'+arrObjId[2]+'_'+arrObjId[3],'class':'commentReply'}).appendTo('#div_'+arrObjId[1]+'_'+arrObjId[2]+'_'+arrObjId[3]);
    $('#commentReply_'+arrObjId[1]+'_'+arrObjId[2]+'_'+arrObjId[3]).children('.fcomment').append('<input type="hidden" name="pid" value="'+arrObjId[1]+'">');
    $('#commentReply_'+arrObjId[1]+'_'+arrObjId[2]+'_'+arrObjId[3]).children('.fcomment').append('<input type="hidden" name="tid" value="'+arrObjId[3]+'">');
    $('#commentReply_'+arrObjId[1]+'_'+arrObjId[2]+'_'+arrObjId[3]).children('.fcomment').append('<input type="hidden" name="hierarchy" value="'+(parseInt(hierarchy) + 1)+'">');
  }
  
}
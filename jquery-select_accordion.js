/* Author: Bill Chapman
   Desc:  Turn a select box in to an accordion
   Code Standards: methods and hash keys are camelCase and variables are under_scored
   Requirements: jquery-ui for accordion and modal
   Usage: Works on a select box with options groups, converts it to an accordion
   Output: HTML for accordion format that is than converted to accordion by jquery ui
   
  <div id="accordion">
    <a href="#">First header</a>
    <div>First content</div>
    <a href="#">Second header</a>
    <div>Second content</div>
   </div>

   Usage: $('element').accordionSelect({options},callBackMethod = function(id,value) );
   The call back method will have an id and a value passed in synononmous to value and text 
   for a select box entry
*/

//Should allow noConflict compatibility
( function( $ ) { 
  
  $.fn.accordionSelect = function(options,callBack){
	 
	//all options are initialized here for reference, options provided externall will take precidence 
	 options = $.extend( {
	     containerId: "container_for_accordion",
	     linkText:    "Click here to select an item",
	     target: 'self'
	  }, options || {});
	
	  //Take the select box that this was called upon and convert it to an accordion
	  /*We create the structure required by teh jquery ui accordion and attach a callback
	    function to each link */ 
	  var accordion_container = $("<div id='" + options.containerId + "'></div>");
	
      var optgroups = $(this).children('optgroup');
      optgroups.each(function(){
        accordion_container.append($("<div><a href='#'>" + $(this).attr('label') + "</a></div>"));
        var option_container = $("<div class='option_container'/>");
	    var options = $(this).children('option');
	    options.each(function(){
		  var callback_link = $("<div></div>");
		  callback_link.bind('click',function(){callBack($(this).val(), $(this).val())});
		  callback_link.html($(this).val());
	  	  option_container.append(callback_link);
	    });  
	    accordion_container.append(option_container);  
      });
     
    // If you set modal to true it pops up the accordion in a modal window. otherwise it either
    // replaces the select box (self) or appends to the specified target element
    if(options.target == 'modal'){
     
      var replacement_link = $("<a href='#'>" + options.linkText + "</a>");  
      var replacement_storage = $("<input type='text'></input>");
           replacement_storage.attr("name",$(this).attr("name"));

      $(this).replaceWith(replacement_link);
	  //bind the modalization and accordion creation to the link that replaced the select box
	  replacement_link.bind('click',{
	  	container:accordion_container,
	  	storage:replacement_storage,
	  	modal: options.modal
	  	}, function(event){
	  	    event.data.container.appendTo('body');
	        event.data.container.accordion({
	  	      //leave defaults on accordion for  now
	          }).dialog({
	  	      modal: true
	  	    }); 
	      }
        );  

      //replace this component with the accordion
	  }else if(options.target == 'self'){
	    $(this).replaceWith(accordion_container);
	    accordion_container.accordion();
	    
	  //the accordion should be placed inside of a target element
	  }else{
	    $(options.target).append(accordion_container);	
	    accordion_container.accordion();
	  }
  }

})( jQuery );
/**
 * zepto模仿jquery.resize.js
 * @author yangjinlai 2018-08-06
 */


(function($, window, undefined){
  
  var elems = $([]),
    
    zepto_resize = $.resize = $.extend($,  $.resize, {} ),
    
    timeout_id,
    
    // Reused strings.
    str_setTimeout = 'setTimeout',
    str_resize = 'resize',
    str_data = str_resize + '-special-event',
    str_delay = 'delay',
    str_throttle = 'throttleWindow';
  
    zepto_resize[ str_delay ] = 250;
  
    zepto_resize[ str_throttle ] = true;
  
    $.fn.bodyResize = function(callback){
        $.Event( str_resize);

        $('body').bind(str_resize, function(){

          if ( !zepto_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
          
          var elem = $(this);
          
          $.data( this, str_data, { w: elem.width(), h: elem.height() } );
          
          loopy(elem);

        });

        $('body').trigger(str_resize);


        function loopy(elems) {
            
          // Start the polling loop, asynchronously.
          timeout_id = setTimeout(function(){
              elems.each(function(){
                var elem = $(this),
                  width = elem.width(),
                  height = elem.height(),
                  data = $.data( this, str_data );
                
                // If element size has changed since the last time, update the element
                // data store and trigger the 'resize' event.
                if ( width !== data.w || height !== data.h ) {
                  elem.trigger( str_resize, [ data.w = width, data.h = height ] );
                  callback();
                }
                
              });
              
              // Loop.
              loopy(elems);
          }, zepto_resize[ str_delay ] )
        }
    }
    
})(Zepto, this);
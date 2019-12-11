var compareTable = (function(){
  return {
      init : function (totalDevice) {
        $( "ul" ).on( "click", "li", function() {
          var pos = $(this).index()+2;
          $("tr").find('td:not(:eq(0))').hide();
          $('td:nth-child('+pos+')').css('display','table-cell');
          $("tr").find('th:not(:eq(0))').hide();
          $('li').removeClass('active');
          $(this).addClass('active');
        });
        var mediaQuery = window.matchMedia('(min-width: 640px)');
        var doSomething = function (mediaQuery) {
          if (mediaQuery.matches) {
            $('.sep').attr('colspan', totalDevice);
          } else {
            $('.sep').attr('colspan', totalDevice);
          }
        };
        mediaQuery.addListener(doSomething);
        doSomething(mediaQuery);
      },
  };
}());

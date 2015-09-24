/*

 Shoestring: accordian.js

*/

(function ($) {

  $('.accordion').each(function ($ti) {
    $vaccordion = $(this);

    if ($desc = $vaccordion.parent('p').next('p, div')) {
        $desc.hide();
        $desc.addClass('accordian-content');
    }

    $vaccordion.click(function (e) {
        e.preventDefault();

        $desc = $(this).parent('p').next('p, div');

        if ($desc.is(':visible')) {
            $(this).removeClass('active');
            $desc.hide();

        }
        else {
            $(this).addClass('active');
            $desc.show();
        }
    });
  });

})(jQuery);
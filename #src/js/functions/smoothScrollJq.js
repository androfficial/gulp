$(function() {
    $('.menu__link').on('click', function(e){
        e.preventDefault();
        let anchor = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top - 80
        }, 600);
    });

    $('.footer__menu-link').on('click', function(e){
        e.preventDefault();
        let anchor = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top - 80
        }, 600);
    });
})
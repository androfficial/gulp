$('.btns-form-content__global-search').click(function (e) {
   e.preventDefault();
   $('.form-content__details').slideDown(400);
   $(this).addClass('_hide'); 
   $('.btns-form-content__global-search--hide').addClass('_show');
});

$('.btns-form-content__global-search--hide').click(function (e) {
   e.preventDefault();
   $('.form-content__details').slideUp(400);
   $(this).removeClass('_show');
   $('.btns-form-content__global-search').removeClass('_hide');
});
$('.filter-item-heading').click(function (){
    $(this).parents('.filter-item-parent').find('.filter-categories').toggleClass('d-block');
    $(this).find('svg').toggleClass('rotate');
})
$('.sub-category-heading').click(function (){
    $(this).parent('.sub-category').find('.category').toggleClass('d-flex');
    $(this).parent().find('svg').toggleClass('rotate');
})

$('.cart-icon').click(function (){
    $('.mini-cart').addClass('show');
    $('body').addClass('overflow-hidden')
    setTimeout(function () {
        $('.overlay').addClass('show');
    },200)
})
$('.overlay').click(function (){
    $('.mini-cart').removeClass('show');
    $('body').removeClass('overflow-hidden')
    $('.overlay').removeClass('show')
})
$('.close-cart').click(function (){
    $('.mini-cart').removeClass('show');
    $('.overlay').removeClass('show');
    $('body').removeClass('overflow-hidden')
})
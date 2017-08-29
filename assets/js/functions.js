$(function() {
  // Parallax backgrounds
  $('#header').parallax('50%', 0.1);
  $('#hobbies').parallax('50%', 0.1);

  // Load the navbar
  updateNavbarStyle();

  // Navbar scroll event
  $(window).scroll(function (event) {
    updateNavbarStyle();
    updateArrowUp();
  });

  function updateNavbarStyle() {
    var vh = $(window).height() - $('.navbar').outerHeight();

    if ($(window).scrollTop() < vh) {
      $('body > .navbar').removeClass('navbar--white').addClass('navbar--transparent');
    } else {
      $('body > .navbar').removeClass('navbar--transparent').addClass('navbar--white');
    }
  }

  function updateArrowUp() {
    var vh = $(window).height() / 2;

    if ($(window).scrollTop() > vh) {
      $('.arrow__up').css('display', 'flex');
    } else {
      $('.arrow__up').hide();
    }
  }

  // Show experience description
  $('.expetience__show').click(function () {
    $(this).siblings('.experience__description').slideToggle();
    $(this).toggleClass('rotate-down');

    if ($(this).children('i.fa').hasClass('fa-arrow-down')) {
      $(this).children('i.fa').removeClass('fa-arrow-down');
      $(this).children('i.fa').addClass('fa-arrow-up');
    } else {
      $(this).children('i.fa').removeClass('fa-arrow-up');
      $(this).children('i.fa').addClass('fa-arrow-down');
    }
  });

  // Scroll animation
  $('.animate__scroll[href^="#"]').click(function(e) {
    var target = $(this).attr('href');
    var navbar = $('.navbar').outerHeight();

    e.preventDefault();

    if (target.length) {
      hideMobileNavigation();

      $('html,body').animate({
        scrollTop: $(target).offset().top - navbar + 1
      }, 1000);
      return false;
    }
  });

  // Load google map
  var place = $('#map').data('residence-place'),
      latlng = {
        lat: $('#map').data('residence-lat'),
        lng: $('#map').data('residence-lng')
      };

  var mapOptions = {
        center: latlng,
        zoom: 13,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      map = new google.maps.Map(document.getElementById('map'), mapOptions),
      marker = new google.maps.Marker({
        position: latlng,
        map: map
      });

  var infowindow = new google.maps.InfoWindow();

  showInfoWindow(place);

  function showInfoWindow(placeName) {
    infowindow.setContent(placeName);
    infowindow.open(map, marker);
  }

  // Filter and paginate projects
  var itemsPerPage = 6;

  if ($(window).width() < 481) {
    itemsPerPage = 3;
  }

  var mixer = mixitup('.projects__container', {
    pagination: {
      limit: itemsPerPage
    },
    templates: {
      pager: '<div class="${classNames}" data-page="${pageNumber}">${pageNumber}</div>',
      pagerPrev: '<div class="${classNames}" data-page="prev">❮</div>',
      pagerNext: '<div class="${classNames}" data-page="next">❯</div>'
    }
  });

  $('.projects__category').click(function() {
    $('.projects__category').removeClass('projects__category--active');
    $(this).addClass('projects__category--active');
  });

  // Footer icons hover
  $('.footer .social .social__icon').hover(function() {
    var border     = $(this).css('border-color'),
        color      = $(this).css('color'),
        background = $(this).data('background');

    $(this).css('border-color', background);
    $(this).css('background', background);
    $(this).css('color', 'white');

    $(this).mouseleave(function() {
      $(this).css('border-color', border);
      $(this).css('background', 'initial');
      $(this).css('color', color);
    });
  });

  // Form
  $('#contact_form').submit(function(event) {
    event.preventDefault();

    if(grecaptcha.getResponse() == "") {
      alert('Are you a robot?');
    } else {
      submitForm(this);
    }
  });

  $('#contact_form  .form__message').click(function() {
    $(this).slideUp();
  });

  function submitForm(element) {
    var sendButton = $(element).siblings('input[type=submit]');

    $.ajax({
      url: $(element).attr('action'),
      method: "POST",
      data: $(element).serializeArray(),
      dataType: "json",
      beforeSend: function() {
        sendButton.prop('disabled', true);
      },
      complete: function() {
        $('#contact_form .form__success').slideDown();
        clearForm();
        sendButton.prop('disabled', false);
      },
      error: function() {
        $('#contact_form .form__error').slideDown();
        clearForm();
        sendButton.prop('disabled', false);
      }
    });
  }

  function clearForm() {
    $('#contact_form input[type=text]').val('');
    $('#contact_form input[type=email]').val('');
    $('#contact_form textarea').val('');
    grecaptcha.reset();
    // Remove yellow color from autocompleted input fields
    if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
      $('input:-webkit-autofill').each(function() {
        var text = $(this).val();
        var name = $(this).attr('name');
        $(this).after(this.outerHTML).remove();
        $('input[name=' + name + ']').val(text);
      });
    }
  }

  // Mobile menu
  $('.navigation__button').click(function() {
    $('.navigation__background').show();
    $('.navigation').addClass('navigation--open');
    $(document.documentElement).css('overflow-y', 'hidden');

    $('.navigation__background').click(function() {
      hideMobileNavigation();
    });
  });

  function hideMobileNavigation() {
    $('.navigation__background').hide();
    $('.navigation').removeClass('navigation--open');
    $(document.documentElement).css('overflow-y', 'auto');
  }
});

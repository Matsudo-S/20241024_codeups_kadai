jQuery(function ($) {

  // hamburger menu
  $(function () {
    $(".js-hamburger,.js-drawer").on("click", function () {
      toggleDrawer();
    });

    // ページ内リンクをクリックしたら閉じる
    // ドロワーメニュー内のリンクがクリックされたときの処理
    $(".js-drawer a[href]").on("click", function(e) {
      e.preventDefault(); // デフォルトのリンク動作を防止

      const targetId = $(this).attr('href'); // クリックされたリンクのhref属性を取得
      const isInPageLink = targetId.charAt(0) === '#'; // ページ内リンクかどうかを判定
      
      if (isInPageLink) {
        // ページ内リンクの場合、スムーズスクロールを実行
        $('html, body').animate({
          scrollTop: $(targetId).offset().top
        }, 800);
      } else {
        // 外部リンクの場合、そのページに遷移
        window.location.href = targetId;
      }    
      closeDrawer(); 
    });

    // resize event
    $(window).on('resize', function() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeDrawer();
      }
    });
  });

  function toggleDrawer() {
    if ($(".js-drawer").is(":visible")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  function openDrawer() {
    $(".js-drawer").fadeIn();
    $(".js-hamburger").addClass("is-active");
  }

  function closeDrawer() {
    $(".js-drawer").fadeOut();
    $(".js-hamburger").removeClass("is-active");
  }


  // fvより下にスクロールした時に、トップへ戻るボタンを表示する
  window.addEventListener('scroll', function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var header = document.querySelector(".js-header");
    var scrollButton = document.querySelector('.scroll-to-top-btn');
    var sliderHeight = document.querySelector(".fv, .sub-page-mv")?.offsetHeight || 0;
    
    if (sliderHeight - 30 < scrollTop) {
      header.classList.add("headerScrolled");
      scrollButton.classList.add('show');
    } else {
      header.classList.remove("headerScrolled");
      scrollButton.classList.remove('show');
    }
  });
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    initHamburgerMenu();
  }
});

jQuery(function ($) {
  // color box
  // ----------------------------------------------
  function initColorBox() {
    const speed = 500;
    const $box = $(".js-colorbox");
    
    if ($box.length === 0) {
      console.warn('.js-colorbox要素が見つかりません');
      return;
    }

    $box.each(function() {
      const $currentBox = $(this);
      $currentBox.append('<div class="js-color"></div>');
      const $color = $currentBox.find(".js-color");
      const $image = $currentBox.find("img");
      let counter = 0;

      $image.css("opacity", "0");
      $color.css("width", "0%");

      // 画像がビューポート内に入ったらアニメーションを実行
      $currentBox.on("inview", function(event, isInView) {
        if (isInView && counter === 0) {
          $color.animate({ width: "100%" }, speed * 1.5, function() {
            $image.css("opacity", "1");
            $color.css({
              left: "0",
              right: "auto"
            }).animate({ width: "0%" }, speed * 0.7);
          });
          counter = 1;
        }
      });
    });
  }

  function animateColorBox(color, image, speed) {
    color.animate({ width: "100%" }, speed * 1.5, function() {
      image.css("opacity", "1");
      color.css({ left: "0", right: "auto" }).animate({ width: "0%" }, speed * 0.7);
    });
  }

  /* fv ローディングアニメーションとswiper */
  function initFvAnimation() {
    $(window).on('load', function() {
      const $title = $(".js-fv__content");
      const $animationContainer = $(".js-fv__loading-container");
      const $header = $(".js-top-header");
      const $loading = $(".fv__loading");
      hideAnimationAndStartSwiper($animationContainer, $header, $title, $loading);
    });
  }

  function hideAnimationAndStartSwiper($animationContainer, $header, $title, $loading) {
    const $slider = $('.js-fv__slider');
    $slider.css('opacity', '1');
    
    // 初期状態でfixedにしてスクロールを禁止
    $loading.addClass('is-animation');
    $('body').addClass('is-loading');
    
    // スライダーを初期化
    $slider.slick({
      arrows: false,
      autoplay: false,
      autoplaySpeed: 4000,
      speed: 3000,
      infinite: true,
      cssEase: 'ease-in-out',
      fade: true,
      initialSlide: 1
    });

    // ローディングアニメーションを実行
    $animationContainer.delay(6000).fadeOut(3000, function() {
      // アニメーション完了時にfixedを解除してスクロールを有効化
      $loading.removeClass('is-animation');
      $('body').removeClass('is-loading');
      $(this).remove();
      
      // ヘッダーとタイトルを表示（タイトルは永続化）
      $header.addClass('is-active');
      $title.css({
        opacity: 1,
        visibility: 'visible',
      });

      // スライダーをフェードインさせてから自動再生開始
      $slider.animate({
        opacity: 1
      }, 2000, function() {
        $slider.slick('slickPlay');
      });
    });
  }

  function initLoadingCompletion() {
    $(document).ready(function() {
      const header = $('.header');
      const fvLoading = $('.fv__loading');
      const fvTitle = $('.js-fv__content');

      fvLoading.on('animationend', function() {
        setTimeout(() => {
          header.add(fvTitle).css({
            transition: 'opacity 2s ease-in-out',
            opacity: '1'
          });
          header.addClass('is-active');
          initScrollToTopButton();
        });
      });

    });
  }

  function initScrollToTopButton() {
    const scrollButton = $('.scroll-to-top-btn');
    
    $(window).on('scroll', function() {
      const scrollTop = $(window).scrollTop();
      const fvHeight = $('.fv').outerHeight();

      if (scrollTop > fvHeight) {
        scrollButton.addClass('show');
      } else {
        scrollButton.removeClass('show');
      }
    });

    scrollButton.on('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  function initSlick() {
    $('.slider').slick({
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 500,
      infinite: true,
      pauseOnHover: true,
      pauseOnFocus: true,
      cssEase: 'linear',
      slidesToShow: 3,
      slidesToScroll: 1,
      variableWidth: true,
      prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"></button>',
      nextArrow: '<button class="slick-next" aria-label="Next" type="button"></button>',
      responsive: [
        {
          breakpoint: 769,
          settings: {
            arrows: false,
            slidesToShow: 1,
            variableWidth: true,
            autoplaySpeed: 4000
          }
        }
      ]
    });
  }

  // 関数の実行
  initColorBox();
  initLoadingCompletion();
  initFvAnimation();
  initSlick();
});

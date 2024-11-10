
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

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



    //ヘッダー背景色表示
  $(window).on('scroll', function() {
    let mvHeight = $('.js-mv').height();
    if ($(window).scrollTop() > mvHeight) {
      $('.header').addClass ('header-bg');
      $('.hamburger').addClass ('hamburger-bg');
    } else {
      $('.header').removeClass ('header-bg');
      $('.hamburger').removeClass ('hamburger-bg');
    }
  });

  // swiper slider
  const swiper = new Swiper(".swiper", {
    loop: true,
    effect: "fade",
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      delay: 2000,
    },
  });



  // MVより下にスクロールした時にヘッダーの背景色を変更し、トップへ戻るボタンを表示する
  window.addEventListener('scroll', function() {
    // スクロール位置を取得（クロスブラウザ対応）
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var header = document.querySelector(".js-header");
    var scrollButton = document.querySelector('.scroll-to-top-btn');
    var currentURL = window.location.href;
    var sliderHeight;

    // 現在のページに応じてスライダーの高さを設定
    if (currentURL.includes("index.html")) {
      sliderHeight = document.querySelector(".mv") ? document.querySelector(".mv").offsetHeight : 0;
    } else if (currentURL.includes("about.html") || currentURL.includes("contact.html")) {
      sliderHeight = document.querySelector(".sub-page-mv") ? document.querySelector(".sub-page-mv").offsetHeight : 0;
    } 
    
    // スクロール位置がスライダーの高さ-30pxを超えた場合
    if (sliderHeight - 30 < scrollTop) {
      // ヘッダーにスクロールクラスを追加
      header.classList.add("headerScrolled");
      // トップへ戻るボタンを表示
      scrollButton.classList.add('show');
    } else {
      // スクロールクラスを削除
      header.classList.remove("headerScrolled");
      // トップへ戻るボタンを非表示
      scrollButton.classList.remove('show');
    }
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // tab関連の処理
  // ----------------------------------------------
  // ページ立ち上げ時、最初のグループだけ表示させる
  window.onload = function() {
    $(".js-content:not(:first)").css("display", "none");
    $(".js-content:first-of-type").css("display", "block");
  }

  $(function () {
    // 最初のコンテンツは表示
    $(".js-content:first-of-type").css("display", "block");
    $(".js-tab").on("click", function () {
      
      if ($(this).hasClass("current")) {
        return;
      }else {
        $(".current").removeClass("current");
        $(this).addClass("current");
        var index = $(this).index();
        // クリックしたタブのインデックス番号と同じコンテンツを表示
        $(".js-content").hide().eq(index).fadeIn(800);
      }
    });
  });
  // ----------------------------------------------

  // モーダル
  $(function () {
    var open = $(".js-modal-open"),
      close = $(".js-modal-close"),
      modal = $(".js-modal");

    //開くボタンをクリックしたらモーダルを表示する
    open.on("click", function () {
      modal.addClass("is-open");
    });

    //閉じるボタンをクリックしたらモーダルを閉じる
    close.add(modal).on("click", function () {
      modal.removeClass("is-open");
    });
  });
});
let images = [{
  url: "https://img.favcars.com/mini/hatch/mini_hatch_2010_wallpapers_14_1280x960.jpg",
  title: "Mini Cooper черный",
}, {
  url: "https://img.favcars.com/mini/cabrio/mini_cabrio_2009_pictures_5_1280x960.jpg",
  title: "Mini Cooper красный",
}, {
  url: "https://www.t-r-n.ru/files/modification-images/cb/a8/5c/f9/40061_tmb940.jpg",
  title: "Mini Cooper синий",
}, {
  url: "https://i.pinimg.com/736x/c5/d9/14/c5d9142556fe74c49a2c1c2d4ea6d46a.jpg",
  title: "Mini Cooper бордовый",
}, {
  url: "https://img.favcars.com/mustang/mkvi/images_mustang_mkvi_2014_6_b.jpg",
  title: "Mustang GT 2014",
}];

function initSlider() {
  if (!images || !images.length) return;

  let slider = document.querySelector(".slider-container");
  let sliderArrows = slider.querySelectorAll(".slider-arrow");
  let sliderImages = slider.querySelector(".slider-images");
  let sliderDots = slider.querySelector(".slider-dots");

  // Вспомогательные функции для определения левого и правого индекса картинок
  let indexLeft = num => num === 0? images.length - 1 : num - 1;
  let indexRight = num => num === images.length - 1? 0 : num + 1;

  // Показываем картинки
  function showImages(index) {
    let sliderImage = sliderImages.querySelectorAll(".slider-image");

    sliderImage.forEach(image => {
      if (image.classList.contains("left")) {
        let indexL = indexLeft(index);
        image.style.backgroundImage = 'url("' + images[indexL].url + '")';
      } else if (image.classList.contains("right")) {
        let indexR = indexRight(index);
        image.style.backgroundImage = 'url("' + images[indexR].url + '")';
      } else if (image.classList.contains("main")) {
        image.style.backgroundImage = 'url("' + images[index].url + '")';
        image.dataset.index = index;
        showTitle(images[index].title);
      };
    });
  }

  // Показываем заголовок картинки
  function showTitle (str) {
    let title = sliderImages.querySelector(".slider-image-title");
    title.innerText = str;
  }

  // Инициализация событий стрелок слайдера
  function eventsArrows() {
    sliderArrows.forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curIndex = +sliderImages.querySelector(".slider-image.main").dataset.index;
        let nextIndex;

        if (arrow.classList.contains("left")) {
          nextIndex = indexRight(curIndex);
        } else {
          nextIndex = indexLeft(curIndex);
        }
        showSlider(curIndex, nextIndex);
      });
    });
  }

  // Инициализация событий слайдера
  function eventsSlider() {
    // Обработка нажатия клавиш
    slider.addEventListener("keydown", function(event) {
      let curIndex = +sliderImages.querySelector(".slider-image.main").dataset.index;
      let nextIndex;

      if (event.code === "ArrowLeft") {
        nextIndex = indexLeft(curIndex);
        showSlider(curIndex, nextIndex);
      } else if (event.code === "ArrowRight") {
        nextIndex = indexRight(curIndex);
        showSlider(curIndex, nextIndex);
      }
    });

    // Обработка получения фокуса
    slider.addEventListener ("focus", function() {
      let sliderHelp = slider.querySelector(".slider-help");
      sliderHelp.style.display = "";
    })

    // Обработка потери фокуса
    slider.addEventListener ("blur", function() {
      let sliderHelp = slider.querySelector(".slider-help");
      sliderHelp.style.display = "none";
    });
  }

  // Инициализация точек слайдера
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider-dots-item n${index}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });

    let dots = sliderDots.querySelectorAll(".slider-dots-item");
    dots.forEach(dot => {
      dot.addEventListener("click", function() {
        let curIndex = +sliderImages.querySelector(".slider-image.main").dataset.index;
        showSlider(curIndex, +this.dataset.index);
      });
    });
  }

  function setDots(index) {
    let dot = sliderDots.querySelector(`.slider-dots-item.n${index}`);
    dot.classList.add("main");
  }

  function unsetDots(index) {
    let dot = sliderDots.querySelector(`.slider-dots-item.n${index}`);
    if (dot.classList.contains("main")) {
      dot.classList.remove("main");
    }
  }

  function showSlider(curIndex, nextIndex) {
    showImages(nextIndex);
    unsetDots(curIndex);
    setDots(nextIndex);
  }


  eventsArrows();
  eventsSlider();
  initDots();
  showImages(0);
  setDots(0);
  slider.focus();
}

document.addEventListener("DOMContentLoaded", function() {
  initSlider();
});
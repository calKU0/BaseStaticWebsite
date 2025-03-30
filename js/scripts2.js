$(document).ready(function () {
  $(".navTrigger").click(function () {
    $(this).toggleClass("active");
    $("#mainListDiv").toggleClass("show_list").slideToggle();
  });
});

var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
if (width < 756) {
  $(".navlinks").click(function () {
    $(".navTrigger").toggleClass("active");
    $("#mainListDiv").slideToggle().toggleClass("show_list");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleContrastBtn = document.getElementById("toggle-contrast");
  const increaseFontBtn = document.getElementById("increase-font");
  const decreaseFontBtn = document.getElementById("decrease-font");
  const resetBtn = document.getElementById("reset-accessibility");

  let fontSize = 100; // Default font size percentage
  let isHighContrast = false;

  // Load preferences from localStorage
  if (localStorage.getItem("fontSize")) {
    fontSize = parseInt(localStorage.getItem("fontSize"), 10);
    document.documentElement.style.fontSize = `${fontSize}%`;
  }
  if (localStorage.getItem("isHighContrast") === "true") {
    isHighContrast = true;
    document.body.classList.add("high-contrast");
  }

  // Toggle high contrast mode
  toggleContrastBtn.addEventListener("click", () => {
    isHighContrast = !isHighContrast;
    document.body.classList.toggle("high-contrast");
    document.body.classList.remove("bright-background");
    restoreOriginalImages();
    localStorage.setItem("isHighContrast", isHighContrast);
  });

  // Increase font size
  increaseFontBtn.addEventListener("click", () => {
    if (fontSize < 150) {
      fontSize += 10;
      document.documentElement.style.fontSize = `${fontSize}%`;
      localStorage.setItem("fontSize", fontSize);
    }
  });

  // Decrease font size
  decreaseFontBtn.addEventListener("click", () => {
    if (fontSize > 90) {
      fontSize -= 10;
      document.documentElement.style.fontSize = `${fontSize}%`;
      localStorage.setItem("fontSize", fontSize);
    }
  });

  // Reset preferences
  resetBtn.addEventListener("click", () => {
    fontSize = 100;
    isHighContrast = false;
    document.documentElement.style.fontSize = "100%";
    document.body.classList.remove("high-contrast");
    document.body.classList.remove("bright-background");
    restoreOriginalImages();
    localStorage.removeItem("fontSize");
    localStorage.removeItem("isHighContrast");
    localStorage.removeItem("isBrightBackground");
  });

  const brightBackgroundBtn = document.getElementById("bright-background");
  let isBrightBackground =
    localStorage.getItem("isBrightBackground") === "true";

  // Apply saved preferences on load
  if (isBrightBackground) {
    document.body.classList.add("bright-background");
    replaceImagesWithWhiteBoxes();
  }

  brightBackgroundBtn.addEventListener("click", () => {
    isBrightBackground = !isBrightBackground;

    if (isBrightBackground) {
      document.body.classList.add("bright-background");
      document.body.classList.remove("high-contrast");
      replaceImagesWithWhiteBoxes();
    } else {
      document.body.classList.remove("bright-background");
      restoreOriginalImages();
    }

    localStorage.setItem("isBrightBackground", isBrightBackground);
  });

  function restoreOriginalImages() {
    document.querySelectorAll("img").forEach((img) => {
      const whiteBox = img.previousElementSibling;
      if (whiteBox && whiteBox.style.backgroundColor === "white") {
        whiteBox.remove();
        img.style.display = "";
      }
    });
  }

  function replaceImagesWithWhiteBoxes() {
    document.querySelectorAll("img").forEach((img) => {
      if (img.parentNode.querySelector("div.carousel-caption, h1, p")) {
        const whiteBox = document.createElement("div");
        whiteBox.style.width = `${img.offsetWidth}px`;
        whiteBox.style.height = `${img.offsetHeight}px`;
        whiteBox.style.backgroundColor = "white";
        whiteBox.style.display = "inline-block";
        img.style.display = "none";
        img.parentNode.insertBefore(whiteBox, img);
      }
    });
  }
});

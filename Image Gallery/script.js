const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const filterButtons = document.querySelectorAll(".filters button");

let currentIndex = 0;

/* OPEN LIGHTBOX */
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    lightboxImg.src = img.src;
    lightbox.classList.add("active");
;
  });
});

/* CLOSE LIGHTBOX */
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
;
});

/* NEXT IMAGE */
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

/* PREVIOUS IMAGE */
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

/* FILTER IMAGES */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    document.querySelectorAll(".gallery-item").forEach(item => {
      if (category === "all" || item.classList.contains(category)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

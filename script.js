// // Custom buttery smooth scroll
// (function () {
//   const speed = 0.08; // smaller = slower & smoother (0.05 ~ 0.1 is nice)
//   let target = window.scrollY;
//   let current = window.scrollY;

//   function smoothScroll() {
//     current += (target - current) * speed;
//     window.scrollTo(0, current);
//     requestAnimationFrame(smoothScroll);
//   }

//   window.addEventListener("wheel", (e) => {
//     target += e.deltaY;
//     target = Math.max(0, target); // prevent negative scroll
//   });

//   smoothScroll();
// })();

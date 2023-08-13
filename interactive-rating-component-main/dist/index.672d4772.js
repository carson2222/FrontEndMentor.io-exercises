const rating_btns = document.querySelector(".rating-btns-box");
const submit_btn = document.querySelector(".submit-btn");
const selected_info = document.querySelector(".selected-info");
const content_boxes = Array.from(document.querySelectorAll(".box-content-storage"));
let rating_option = 0;
// 1-5 rating buttons event listener
rating_btns.addEventListener("click", function(e) {
    e.preventDefault();
    const btn = e.target;
    if (!btn.classList.contains("rating-btn")) return;
    rating_option == +btn.dataset.id ? rating_option = 0 : rating_option = +btn.dataset.id;
    const allBtns = Array.from(this.querySelectorAll(".rating-btn"));
    updateActiveClass(allBtns, btn);
});
// Form submit event listener
submit_btn.addEventListener("click", function(e) {
    e.preventDefault();
    if (rating_option === 0) {
        console.error("Rate us first!");
        return;
    }
    selected_info.textContent = `You selected ${rating_option} out of 5`;
    updateActiveClass(content_boxes, content_boxes[0], "hidden");
});
// Give active class to the element and remove it from others
function updateActiveClass(allEl, clickedEl, className = "active") {
    // If the elemeny already have active class, toggle it's class
    if (clickedEl.classList.contains(className)) {
        clickedEl.classList.toggle(className);
        return;
    }
    // Otherwise it will clear all active classes and asign to the clicked element
    allEl.map((el)=>el.classList.remove(className));
    clickedEl.classList.add(className);
}

//# sourceMappingURL=index.672d4772.js.map

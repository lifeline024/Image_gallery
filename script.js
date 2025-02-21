document.addEventListener("DOMContentLoaded", function () {
    const imageContainers = document.querySelectorAll(".first_row, .second_row");
    
    imageContainers.forEach(container => {
        const images = container.querySelectorAll("img");
        let currentIndex = 0;

        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.style.display = "none";
        container.appendChild(popup);
        
        const popupImg = document.createElement("img");
        popupImg.classList.add("popup-img");
        popup.appendChild(popupImg);
        
        const prevIcon = document.createElement("span");
        prevIcon.innerHTML = "&#9665;"; // Left arrow
        prevIcon.classList.add("nav-icon", "prev");
        popup.appendChild(prevIcon);
        
        const nextIcon = document.createElement("span");
        nextIcon.innerHTML = "&#9655;"; // Right arrow
        nextIcon.classList.add("nav-icon", "next");
        popup.appendChild(nextIcon);
        
        const closeIcon = document.createElement("span");
        closeIcon.innerHTML = "&#10006;"; // Close icon
        closeIcon.classList.add("close-icon");
        popup.appendChild(closeIcon);
        
        function updatePopup(index) {
            popupImg.src = images[index].src;
            currentIndex = index;
            popup.style.display = "flex";
            popup.style.width = "100%";
            popup.style.height = "100%";
            popup.style.position = "fixed";
            popup.style.top = "0";
            popup.style.left = "0";
            popup.style.background = "rgba(0, 0, 0, 0.8)";
            popup.style.justifyContent = "center";
            popup.style.alignItems = "center";
            popup.style.animation = "popupAnimation 0.3s ease-out";
            
            popupImg.style.maxWidth = "90%";
            popupImg.style.maxHeight = "90%";
            popupImg.style.transition = "transform 0.3s ease-out";
            popupImg.style.transform = "scale(2.2)";
            
            prevIcon.style.display = index === 0 ? "none" : "block";
            nextIcon.style.display = index === images.length - 1 ? "none" : "block";
        }
        
        images.forEach((img, index) => {
            img.addEventListener("click", function () {
                updatePopup(index);
            });
        });
        
        prevIcon.addEventListener("click", function () {
            if (currentIndex > 0) updatePopup(currentIndex - 1);
        });
        
        nextIcon.addEventListener("click", function () {
            if (currentIndex < images.length - 1) updatePopup(currentIndex + 1);
        });
        
        closeIcon.addEventListener("click", function () {
            popup.style.display = "none";
        });
        
        document.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft" && currentIndex > 0) {
                updatePopup(currentIndex - 1);
            } else if (event.key === "ArrowRight" && currentIndex < images.length - 1) {
                updatePopup(currentIndex + 1);
            } else if (event.key === "Escape") {
                popup.style.display = "none";
            }
        });
    });
    
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes popupAnimation {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .nav-icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 2rem;
            color: white;
            cursor: pointer;
            background: rgba(0, 0, 0, 0.5);
            padding: 10px;
            border-radius: 50%;
        }
        .prev {
            left: 10px;
        }
        .next {
            right: 10px;
        }
        .close-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 2rem;
            color: white;
            cursor: pointer;
            background: rgba(0, 0, 0, 0.5);
            padding: 5px;
            border-radius: 50%;
        }
        @media (max-width: 768px) {
            .nav-icon {
                font-size: 1.5rem;
                padding: 8px;
            }
            .close-icon {
                font-size: 1.5rem;
                padding: 4px;
            }
            .popup-img {
                max-width: 95%;
                max-height: 95%;
                transform: scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
});

















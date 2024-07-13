// challenge.js

document.addEventListener("DOMContentLoaded", () => {
    let counter = 0;
    let intervalId;
    let isPaused = false;

    const counterDisplay = document.getElementById("counter");
    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");
    const likeButton = document.getElementById("heart");
    const pauseButton = document.getElementById("pause");
    const commentsList = document.getElementById("list");
    const commentInput = document.getElementById("comment-input");

    // Start the timer
    function startTimer() {
        intervalId = setInterval(() => {
            if (!isPaused) {
                counter++;
                updateCounterDisplay();
            }
        }, 1000);
    }

    // Update the counter display
    function updateCounterDisplay() {
        counterDisplay.textContent = counter;
    }

    // Increment the counter
    plusButton.addEventListener("click", () => {
        counter++;
        updateCounterDisplay();
    });

    // Decrement the counter
    minusButton.addEventListener("click", () => {
        counter--;
        updateCounterDisplay();
    });

    // Like the current counter value
    likeButton.addEventListener("click", () => {
        const likesList = document.getElementById("likes");
        let likesCount = likesList.querySelector(`li[data-number="${counter}"]`);

        if (likesCount) {
            let count = parseInt(likesCount.textContent.split(" ")[1]) + 1;
            likesCount.textContent = `Number ${counter} has been liked ${count} times`;
        } else {
            const newLike = document.createElement("li");
            newLike.dataset.number = counter;
            newLike.textContent = `Number ${counter} has been liked 1 time`;
            likesList.appendChild(newLike);
        }
    });

    // Pause/Resume the timer
    pauseButton.addEventListener("click", () => {
        isPaused = !isPaused;

        if (isPaused) {
            clearInterval(intervalId);
            plusButton.disabled = true;
            minusButton.disabled = true;
            likeButton.disabled = true;
            pauseButton.textContent = "Resume";
        } else {
            startTimer();
            plusButton.disabled = false;
            minusButton.disabled = false;
            likeButton.disabled = false;
            pauseButton.textContent = "Pause";
        }
    });

    // Add a comment
    document.getElementById("submit-comment").addEventListener("click", () => {
        const commentText = commentInput.value;
        if (commentText) {
            const commentItem = document.createElement("li");
            commentItem.textContent = commentText;
            commentsList.appendChild(commentItem);
            commentInput.value = ""; // Clear input
        }
    });

    // Start the timer on page load
    startTimer();
});

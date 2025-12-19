
    let score = parseInt(localStorage.getItem("quizScore")) || 0;

    document.getElementById("score").innerText = score;

    let message = "";
    let description = "";

    if (score == 10) {
        message = "Excellent!";
        description = "Perfect score! You are a GK master.";
    } else if (score >= 7) {
        message = "Good Job!";
        description = "You know quite a lot about the world!";
    } else if (score >= 4) {
        message = "Not Bad!";
        description = "You have some basic knowledge, keep improving!";
    } else {
        message = "Keep Learning!";
        description = "Don't worry, you can try again and improve!";
    }

    document.getElementById("result-message").innerText = message;
    document.getElementById("result-description").innerText = description;

    function clearQuiz() {
        localStorage.clear();
        window.location.href = 'quiz.html';
    }

    function saveScore() {
        let username = document.getElementById("username").value;
        let score = localStorage.getItem("quizScore");

        if (username.trim() === "") {
            alert("Please enter your name!");
            return;
        }

        let formData = new FormData();
        formData.append("username", username);
        formData.append("score", score);

        fetch("submit_score.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text().then(data => ({ ok: true, data: data }));
            } else {
                return response.text().then(data => ({ ok: false, data: data }));
            }
        })
        .then(result => {
            if (result.ok) {
                console.log("Server response:", result.data);
                alert("Score validated successfully!");
                document.getElementById("username").value = "";
            } else {
                console.error("Validation failed:", result.data);
                alert("Validation error: " + result.data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error: " + error.message);
        });
    }


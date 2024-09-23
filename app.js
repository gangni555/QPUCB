let selectedCategory = null;
let currentQuestionIndex = 0;
let totalScore = 0;
let currentScore = 0;

// Remplir les catégories dans le dropdown
window.onload = function() {
    const categoriesDropdown = document.getElementById('categoriesDropdown');
    for (let category in categories) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = "dropdown-item";
        a.href = "#";
        a.innerText = category;
        a.onclick = function() {
            selectedCategory = category;
            document.getElementById('questionTitle').innerText = `Catégorie sélectionnée: ${category}`;
        };
        li.appendChild(a);
        categoriesDropdown.appendChild(li);
    }
};

// Commencer à jouer
document.getElementById('playButton').onclick = function() {
    if (!selectedCategory) {
        alert("Veuillez sélectionner une catégorie d'abord.");
        return;
    }
    startGame();
};

function startGame() {
    currentQuestionIndex = 0;
    currentScore = 0;
    displayQuestion();
}

function displayQuestion() {
    const categoryQuestions = categories[selectedCategory];
    if (currentQuestionIndex >= categoryQuestions.length) {
        endGame();
        return;
    }
    const questionObj = categoryQuestions[currentQuestionIndex];
    const questionTitle = document.getElementById('questionTitle');
    const questionChoices = document.getElementById('questionChoices');
    questionTitle.innerText = questionObj.question;
    questionChoices.innerHTML = "";

    questionObj.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = "list-group-item list-group-item-action";
        button.innerText = choice;
        button.onclick = function() {
            if (choice === questionObj.correct) {
                currentScore++;
            }
            currentQuestionIndex++;
            displayQuestion();
        };
        questionChoices.appendChild(button);
    });
}

// Terminer la partie
function endGame() {
    // Mettre à jour le score total
    totalScore += currentScore;

    // Afficher l'alerte en fonction du score
    if (currentScore >= 10) {
        alert(`Bravo, vous avez débloqué cette catégorie ! Votre score total est : ${totalScore}.`);
    } else {
        alert(`Désolé, vous devez reprendre cette catégorie. Votre score total est : ${totalScore}.`);
    }

    // Préparer pour un nouveau jeu
    loadCategory();
}

// Charger une nouvelle catégorie
function loadCategory() {
    selectedCategory = null;
    currentScore = 0; // Réinitialiser le score actuel
    document.getElementById('totalScore').innerText = totalScore; // Mettre à jour l'affichage du score total
    document.getElementById('questionTitle').innerText = "Veuillez sélectionner une catégorie.";
    document.getElementById('questionChoices').innerHTML = "";
}

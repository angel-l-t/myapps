const originalText = document.getElementById("original-conversation");
const changeButton = document.getElementById("change-button");
const outputText = document.getElementById("simplified-conversation");

const mentorButton = document.getElementById("mentors-name");
const mentorNameInput = document.getElementById("name");

var text = null;

var mentorName = localStorage.getItem("mentor");

    if (mentorName == null) {
        mentorName = "Mentor"
    }
mentorNameInput.defaultValue = mentorName;

changeButton.addEventListener("click", () => {
    // Text in input
    text = originalText.value.trim();

    outputText.innerHTML = text.replaceAll("m.] :", `m.] ${mentorName}:`).trim();
});

mentorButton.addEventListener("click", () => {
    newName = mentorNameInput.value;

    if (newName.trim() == "") {
        newName = "Mentor"
    }

    localStorage.setItem("mentor", newName.trim());
    location.reload()
})

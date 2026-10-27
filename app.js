

class Patient {

    constructor(fullName, password, dateOfBirth, gender, chronicDiseases, phoneNumber) {
        this.fullName = fullName;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.chronicDiseases = chronicDiseases;
        this.imageUrl = gender === "male" ? "assets/male.png" : "assets/female.png";
        this.phoneNumber = phoneNumber;
    }

}


const form = document.getElementById("patient-form");
let patients = JSON.parse(localStorage.getItem("patients")) || [];

function render(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const password = document.getElementById("password").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const chronicDiseases = document.getElementById("chronicDiseases").value;

    const patient = new Patient(fullName, password, dateOfBirth, gender, chronicDiseases, phoneNumber);
    patients.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));
    // console.log(patients);
    createCards();
    form.reset();
}



const cardsContaner = document.getElementById("cards");

function addDetail(card, label, value) {
    const p = document.createElement("p");
    p.textContent = `${label}: ${value}`;
    card.append(p);


}

function createCards() {
    cardsContaner.innerHTML = "";
    if (patients.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("empty");
        empty.textContent = "No patients yet. Add your first patient using the form above.";
        cardsContaner.append(empty);
        return;
    }
    patients.forEach(patient => {
        
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = patient.imageUrl;
        img.alt = patient.fullName;
        card.append(img);

        addDetail(card, "Full name", patient.fullName);
        addDetail(card, "Password", patient.password);
        addDetail(card, "Date of birth", patient.dateOfBirth);
        addDetail(card, "Gender", patient.gender);
        addDetail(card, "Phone number", patient.phoneNumber);
        addDetail(card, "Chronic diseases", patient.chronicDiseases);

        cardsContaner.append(card);

    });




}
form.addEventListener("submit", render);
createCards();  
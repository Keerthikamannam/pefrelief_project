async function addInitialPets() {
    const snapshot = await getDocs(collection(db, "pets"));

    // prevent duplicates
    if (!snapshot.empty) {
        return;
    }

   const initialPets = [
    {name:"Buddy", breed:"Labrador", age:2, type:"Dog", img:"../images/a1.jpg"},
    {name:"Max", breed:"Beagle", age:4, type:"Dog", img:"../images/a2.jpg"},
    {name:"Rocky", breed:"German Shepherd", age:5, type:"Dog", img:"../images/a3.jpg"},
    {name:"Patty", breed:"Rabbit", age:2, type:"Small", img:"../images/a7.jpg"},
    {name:"Luna", breed:"Persian", age:1, type:"Cat", img:"../images/a4.jpg"},
    {name:"Milo", breed:"Siamese", age:2, type:"Cat", img:"../images/a5.jpg"},
    {name:"tobby", breed:"husky", age:5, type:"Dog", img:"../images/a12.jpg"},
    {name:"Bunny", breed:"Rabbit", age:1, type:"Small", img:"../images/a6.jpg"},
    {name:"Coco", breed:"Parrot", age:2, type:"Small", img:"../images/a11.jpg"},
    {name:"katty", breed:"cat", age:2, type:"Cat", img:"../images/a13.jpg"},
    {name:"Bruno", breed:"Doberman", age:6, type:"Dog", img:"../images/a9.jpg"},
    {name:"Bella", breed:"Shih Tzu", age:2, type:"Dog", img:"../images/a8.jpg"},
    {name:"Shadow", breed:"Indie", age:7, type:"Dog", img:"../images/a10.jpg"}
];

    // upload all pets
    for (let pet of initialPets) {
        await addDoc(collection(db, "pets"), pet);
    }

    console.log("Initial pets added successfully ✅");
}

function openAdminLogin() {
    document.getElementById("adminLogin").style.display = "flex";
}

function closeAdminLogin() {
    document.getElementById("adminLogin").style.display = "none";
}

function loginAdmin() {
    let input = document.getElementById("adminPassword").value;
    const btn = document.getElementById("adminBtn");
    const loginBtn = document.querySelector("#adminLogin button");
    if (loginBtn) loginBtn.innerText = "Logging in...";

    if (btn) btn.innerText = "Switch to User";

    if (input === "admin123") {
        sessionStorage.setItem("adminLogged", "true");
        setTimeout(() => {
            document.getElementById("adminPanel").classList.remove("hidden");
            closeAdminLogin();
        }, 30);

    } else {
        document.getElementById("loginError").innerText = "Wrong password!";

        if (loginBtn) loginBtn.innerText = "Login";
    }
}
async function loadPets() {
    const container = document.getElementById("petContainer");
    if (!container) return;
    const isAdminPage = sessionStorage.getItem("adminLogged") === "true";
    function render(pets) {
        if (pets.length === 0) {
            container.innerHTML = "<h2>No pets found 😢</h2>";
            return;
        }

        container.innerHTML = "";

        pets.forEach((pet) => {
            container.innerHTML += `
            <div class="card">
                <span class="fav-btn" onclick="toggleFavorite('${pet.id}', ${pet.favorite || false})">
                    ${pet.favorite ? "❤️" : "🤍"}
                </span>

                <img src="${pet.img || '../images/adoption.jpg'}">
                <h3>${pet.name}</h3>
                <p>Breed: ${pet.breed}</p>
                <p>Age: ${pet.age}</p>
                <p>Type: ${pet.type}</p>

                ${!isAdminPage ? `
                    <button onclick="openForm('${pet.name}')">Adopt</button>
                    <button onclick="goToDonation('${pet.name}')">Sponsor</button>
                ` : ""}

                ${isAdminPage ? `
                    <button onclick="removePet('${pet.id}')">❌ Remove</button>
                ` : ""}
            </div>`;
        });
    }

    // 🔹 1. Show cached pets instantly
    let cached = localStorage.getItem("cachedPets");
    if (cached) {
        render(JSON.parse(cached));
    }

    try {
        // 🔹 2. Fetch latest from Firebase
        const snapshot = await getDocs(collection(db, "pets"));

        let pets = [];
        snapshot.forEach((docSnap) => {
            pets.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        // 🔹 3. Save to cache
        localStorage.setItem("cachedPets", JSON.stringify(pets));

        // 🔹 4. Update ONLY if data changed (prevents blank/flicker)
        if (!cached || JSON.stringify(pets) !== cached) {
            render(pets);
        }

    } catch (error) {
        console.error("Error loading pets:", error);
    }
}
async function toggleFavorite(id, currentFav) {
    const newFav = !currentFav;
    const btns = document.querySelectorAll(".fav-btn");
    btns.forEach(btn => {
        if (btn.getAttribute("onclick")?.includes(id)) {
            btn.innerText = newFav ? "❤️" : "🤍";
            btn.setAttribute("onclick", `toggleFavorite('${id}', ${newFav})`);
        }
    });
    try {
        await updateDoc(doc(db, "pets", id), {
            favorite: newFav
        });
    } catch (err) {
        console.error(err);
    }
}
function goToDonation(petName) {
    sessionStorage.setItem("selectedPet", petName);
    sessionStorage.setItem("fromSponsor", "true");
    window.location.href = "donation.html";
}

// ADD PET WITH IMAGE UPLOAD
async function addPet() {
    let name = document.getElementById("petName").value;
    let breed = document.getElementById("petBreed").value;
    let age = document.getElementById("petAge").value;
    let type = document.getElementById("petType").value;
    let fileInput = document.getElementById("petImage");

    if (!name || !breed || !age || fileInput.files.length === 0) {
        alert("Fill all fields and upload image!");
        return;
    }

    let reader = new FileReader();

    reader.onload = async function(e) {
        await addDoc(collection(db, "pets"), {
            name,
            breed,
            age: Number(age),
            type,
            img: e.target.result
        });

        alert("Pet added globally ✅");
        document.getElementById("petName").value = "";
        document.getElementById("petBreed").value = "";
        document.getElementById("petAge").value = "";
        fileInput.value = "";

        loadPets();
    };
    reader.readAsDataURL(fileInput.files[0]);
}
// REMOVE PET
async function removePet(id) {
    if (confirm("Remove this pet?")) {
        await deleteDoc(doc(db, "pets", id));
        loadPets();  // refresh UI
    }
}
async function filterPets() {
    let search = document.getElementById("search").value.toLowerCase();
    let age = document.getElementById("ageFilter").value;
    let type = document.getElementById("typeFilter").value;

    const snapshot = await getDocs(collection(db, "pets"));
    const container = document.getElementById("petContainer");

    container.innerHTML = "";

    const isAdminPage = window.location.pathname.includes("admin.html");

    snapshot.forEach((docSnap) => {
        let p = docSnap.data();

        let matchBreed = p.breed.toLowerCase().includes(search);

        let matchAge =
            age === "all" ||
            (age === "young" && p.age <= 2) ||
            (age === "adult" && p.age >= 3 && p.age <= 6) ||
            (age === "senior" && p.age >= 7);

        let matchType =
            type === "all" || p.type === type;

        if (matchBreed && matchAge && matchType) {
            container.innerHTML += `
            <div class="card">
                <span class="fav-btn" onclick="toggleFavorite('${docSnap.id}', ${p.favorite || false})">
                  ${p.favorite ? "❤️" : "🤍"}
                </span>
                <img src="${p.img || '../images/adoption.jpg'}">
                <h3>${p.name}</h3>
                <p>Breed: ${p.breed}</p>
                <p>Age: ${p.age}</p>
                <p>Type: ${p.type}</p>

                ${!isAdminPage ? `
                    <button onclick="openForm('${p.name}')">Adopt</button>
                    <button onclick="goToDonation('${p.name}')">Sponsor</button>
                ` : ""}

                ${isAdminPage ? `
                    <button onclick="removePet('${docSnap.id}')">❌ Remove</button>
                ` : ""}
            </div>`;
        }
    });
}
// 🔥 LOAD DISCOVER PETS FUNCTION (FIXED)
async function loadDiscoverPets() {
    const apiContainer = document.getElementById("apiContainer");
    const title = document.getElementById("discoverTitle");

    if (!apiContainer || !title) return;

    apiContainer.style.display = "flex";
    title.style.display = "block";
    sessionStorage.setItem("discoverOpen", "true"); 
    const btn = document.getElementById("loadMoreBtn");
    if (btn) btn.style.display = "none";
    // 🔥 check cache
    const saved = sessionStorage.getItem("apiPets");

    if (saved) {
        const data = JSON.parse(saved);
        renderAPIPets(data);
        title.scrollIntoView({ behavior: "smooth" });
        return;
    }

    apiContainer.innerHTML = "<p>Loading pets...</p>";

    try {
        const res = await fetch("https://api.thedogapi.com/v1/images/search?limit=6&has_breeds=1");

        if (!res.ok) throw new Error("API failed");

        const data = await res.json();

        // save
        sessionStorage.setItem("apiPets", JSON.stringify(data));

        renderAPIPets(data);

        title.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
        console.error("API ERROR:", error);

        apiContainer.innerHTML = `
            <p style="color:red;">Failed to load pets ❌</p>
            <button onclick="loadDiscoverPets()">Retry</button>
        `;
    }
}
function renderAPIPets(data) {
    const apiContainer = document.getElementById("apiContainer");

    const names = ["Orbit", "Maddy", "Chappin", "Alex", "Leo", "Milo"];

    apiContainer.innerHTML = "";

    data.forEach((pet, index) => {
        const breed = pet.breeds?.[0]?.name || "dog";
        const name = names[index % names.length];

        apiContainer.innerHTML += `
        <div class="card api-card">
            <img src="${pet.url}">
            <h3>${name} 🐾</h3>
            <p>Breed: ${breed}</p>

            <button onclick="requestAdoption('${pet.url}')">Request Adoption</button>
            <button onclick="goToDonation('${name}')">Sponsor</button>
        </div>`;
    });
}
// 🔥 Store request (not direct adoption)
async function requestAdoption(img) {
    try {
        await addDoc(collection(db, "requests"), {
            name: "API Dog 🐾",
            breed: "Unknown",
            img: img,
            status: "pending",
            createdAt: new Date()
        });

        alert("Adoption request submitted  📨 will contact you for further details");

    } catch (error) {
        console.error(error);
        alert("Error submitting request");
    }
}
function handleAdminToggle() {
    const isAdmin = sessionStorage.getItem("adminLogged") === "true";

    if (isAdmin) {
        sessionStorage.removeItem("adminLogged");
        location.reload();
    } else {
        openAdminLogin();
    }
}
// FORM
function openForm(petName) {
    const popup = document.getElementById("formPopup");
    popup.style.display = "flex";

    window.selectedPet = petName || "selected pet";

    document.getElementById("formError").innerText = "";

    const form = document.getElementById("adoptForm");
    if (form) form.reset();
}

function closeForm() {
    const popup = document.getElementById("formPopup");
    popup.style.display = "none";

    document.getElementById("formError").innerText = "";

    const form = document.getElementById("adoptForm");
    if (form) form.reset();
}
const form = document.getElementById("adoptForm");
const errorMsg = document.getElementById("formError");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const homeType = document.getElementById("homeType").value;
    const ownership = document.getElementById("ownership").value;
    const experience = document.getElementById("experience").value;
    const petType = document.getElementById("petType").value;
    const reason = document.getElementById("reason").value.trim();
    const yard = document.querySelector('input[name="yard"]:checked');

    errorMsg.style.color = "red";

    // VALIDATION
    if (!name || !email || !phone || !address) {
        errorMsg.innerText = "Please fill all personal details!";
        return;
    }

    if (!homeType || !ownership) {
        errorMsg.innerText = "Please select living details!";
        return;
    }

    if (!yard) {
        errorMsg.innerText = "Please select yard option!";
        return;
    }

    if (!experience || !petType || !reason) {
        errorMsg.innerText = "Please complete adoption details!";
        return;
    }

    // EMAIL CHECK
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMsg.innerText = "Invalid email format!";
        return;
    }

    // PHONE CHECK
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        errorMsg.innerText = "Phone must be 10 digits!";
        return;
    }

    // SUCCESS
    errorMsg.style.color = "lightgreen";
    errorMsg.innerText = `Application submitted for ${window.selectedPet}! 🎉`;

    form.reset();

    setTimeout(() => {
        closeForm();
        errorMsg.innerText = "";
    }, 1500);
});
window.onload = () => {

    loadPets();

    // 🔥 restore discover section (MAIN FIX)
    const isOpen = sessionStorage.getItem("discoverOpen");
    const saved = sessionStorage.getItem("apiPets");

    if (isOpen === "true" && saved) {
        const apiContainer = document.getElementById("apiContainer");
        const title = document.getElementById("discoverTitle");
        const loadBtn = document.getElementById("loadMoreBtn");

        if (apiContainer && title) {
            apiContainer.style.display = "flex";
            title.style.display = "block";

            renderAPIPets(JSON.parse(saved)); // ✅ SAME PETS RESTORED
        }

        // hide load more button
        if (loadBtn) loadBtn.style.display = "none";
    }

    // existing logic (keep same)
    setTimeout(async () => {
        const snapshot = await getDocs(collection(db, "pets"));
        if (snapshot.empty) {
            await addInitialPets();
            loadPets(); 
        }
    }, 0);

    const isAdmin = sessionStorage.getItem("adminLogged") === "true";

    const adminBtn = document.getElementById("adminBtn");
    if (adminBtn) {
        adminBtn.innerText = isAdmin ? "Switch to User" : "Admin Login";
    }

    if (isAdmin) {
        const panel = document.getElementById("adminPanel");
        if (panel) panel.classList.remove("hidden");
    }

    document.getElementById("search")?.addEventListener("input", filterPets);
    document.getElementById("ageFilter")?.addEventListener("change", filterPets);
    document.getElementById("typeFilter")?.addEventListener("change", filterPets);
};

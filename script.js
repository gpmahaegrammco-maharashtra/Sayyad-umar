

let appointments = JSON.parse(localStorage.getItem("medi_final_data")) || [];
let editID = -1;

const form = document.getElementById("appointmentForm");
const container = document.getElementById("recordsContainer");
const submitBtn = document.getElementById("submitBtn");
const alertBox = document.getElementById("alertBox");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        blood: document.getElementById("bloodGroup").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        dept: document.getElementById("department").value,
        doc: document.getElementById("doctor").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        msg: document.getElementById("message").value
    };

    if (editID === -1) {
        appointments.push(data);
        showStatus("Data Submitted Successfully!"); // Naya Message Function
    } else {
        appointments[editID] = data;
        editID = -1;
        submitBtn.innerText = "Save Patient Record";
        submitBtn.style.background = "#2196F3";
        showStatus("Record Updated Successfully!");
    }

    localStorage.setItem("medi_final_data", JSON.stringify(appointments));
    form.reset();
    showRecords();
});

// Message Dikhaane Wala Function
function showStatus(message) {
    alertBox.innerHTML = `<div class="success-msg">${message}</div>`;
    
    // 3 second baad message ko gayab kar dega
    setTimeout(() => {
        alertBox.innerHTML = "";
    }, 3000);
}

function showRecords(list = appointments) {
    container.innerHTML = "";
    if(list.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#999; margin-top:10px;">No records available.</p>`;
        return;
    }

    list.slice().reverse().forEach((item) => {
        const originalIndex = appointments.indexOf(item);
        container.innerHTML += `
            <div class="record-card">
                <span class="blood-badge">${item.blood}</span>
                <h4>👤 ${item.name} (${item.age}Y | ${item.gender})</h4>
                <p><strong>📍 Address:</strong> ${item.address}</p>
                <p><strong>📞 Phone:</strong> ${item.phone}</p>
                <p><strong>🏥 Dept:</strong> ${item.dept} | 👨‍⚕️ ${item.doc}</p>
                <p><strong>📅 Date:</strong> ${item.date} | ⏰ ${item.time}</p>
                <div class="btn-group">
                    <button style="background:#ffa000" onclick="editApp(${originalIndex})">Edit</button>
                    <button style="background:#f44336" onclick="deleteApp(${originalIndex})">Delete</button>
                </div>
            </div>
        `;
    });
}

function deleteApp(index) {
    if(confirm("Are you sure?")) {
        appointments.splice(index, 1);
        localStorage.setItem("medi_final_data", JSON.stringify(appointments));
        showRecords();
    }
}

function editApp(index) {
    const item = appointments[index];
    document.getElementById("name").value = item.name;
    document.getElementById("age").value = item.age;
    document.getElementById("gender").value = item.gender;
    document.getElementById("bloodGroup").value = item.blood;
    document.getElementById("address").value = item.address;
    document.getElementById("phone").value = item.phone;
    document.getElementById("department").value = item.dept;
    document.getElementById("doctor").value = item.doc;
    document.getElementById("date").value = item.date;
    document.getElementById("time").value = item.time;
    document.getElementById("message").value = item.msg;

    editID = index;
    submitBtn.innerText = "Update Record";
    submitBtn.style.background = "#FF9800";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = appointments.filter(a => 
        a.name.toLowerCase().includes(term) || 
        a.phone.includes(term) || 
        a.blood.toLowerCase().includes(term)
    );
    showRecords(filtered);
});

showRecords();

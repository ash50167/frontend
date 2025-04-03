document.getElementById("quoteForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let ageInput = document.getElementById("age").value.trim();
    let vehicleType = document.getElementById("vehicleType").value;
    let insuranceType = document.querySelector('input[name="insuranceType"]:checked');

    let age = parseInt(ageInput, 10);
    let hasError = false;

    // Reset error messages
    document.getElementById("ageError").classList.add("hidden");
    document.getElementById("vehicleError").classList.add("hidden");
    document.getElementById("insuranceError").classList.add("hidden");

    // Frontend validation
    if (!ageInput || isNaN(age) || age <= 0) {
        document.getElementById("ageError").textContent = "Please enter a valid age.";
        document.getElementById("ageError").classList.remove("hidden");
        hasError = true;
    } else if (age < 18 || age > 100) {
        document.getElementById("ageError").textContent = "Age must be between 18 and 100.";
        document.getElementById("ageError").classList.remove("hidden");
        document.getElementById("age").classList.add("border-red-500");
        hasError = true;
    }

    if (!vehicleType) {
        document.getElementById("vehicleError").textContent = "Please select a vehicle type.";
        document.getElementById("vehicleError").classList.remove("hidden");
        hasError = true;
    }

    if (!insuranceType) {
        document.getElementById("insuranceError").textContent = "Please select an insurance type.";
        document.getElementById("insuranceError").classList.remove("hidden");
        hasError = true;
    }

    if (hasError) return;

    // Prepare data for backend request
    const data = {
        age: age,
        vehicleType: vehicleType,
        insuranceType: insuranceType.value
    };

    // Make API request to the backend
    fetch('https://backend-pi-seven-87.vercel.app/api/quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Display the calculated premium result
                document.getElementById("premiumResult").classList.remove("hidden");
                document.getElementById("premiumAmount").textContent = `₹${data.premium.toFixed(2)}`;
            } else {
                // Display error message from backend
                document.getElementById("errorMessage").classList.remove("hidden");
                document.getElementById("errorMessage").textContent = data.message;
            }
        })
        .catch(error => {
            // Handle any errors during API call
            document.getElementById("errorMessage").classList.remove("hidden");
            document.getElementById("errorMessage").textContent = "An error occurred. Please try again.";
        });
});

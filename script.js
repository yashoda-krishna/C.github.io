document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const inputs = form.querySelectorAll("input, select");
  const generatePdfButton = document.getElementById("generate-pdf");

  // Enable button when all fields are filled
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const allFilled = Array.from(inputs).every(field => field.value.trim() !== "");
      generatePdfButton.disabled = !allFilled;
      if (allFilled) {
        generatePdfButton.classList.add("active");
      } else {
        generatePdfButton.classList.remove("active");
      }
    });
  });

  generatePdfButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const doorNo = document.getElementById("door-no").value;
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const area = document.getElementById("area").value;
    const floorSize = document.getElementById("floor-size").value;
    const landSpace = document.getElementById("land-space").value;
    const budget = document.getElementById("budget").value;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Top Left: Client Details
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text("To:", 10, 10);
    doc.setFont("Helvetica", "normal");
    doc.text(`${name}`, 10, 20);
    doc.text(`Door No: ${doorNo}`, 10, 30);
    doc.text(`${street}`, 10, 40);
    doc.text(`${city}`, 10, 50);
    doc.text(`${state}`, 10, 60);

    // Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Civil Engineering Measurements", 105, 70, null, null, "center");

    // Table in the Middle
    doc.autoTable({
      startY: 80,
      head: [["Field", "Details"]],
      body: [
        ["House Area (sq. ft.)", area],
        ["Floor Size (in feet)", floorSize],
        ["Free Land Space (sq. ft.)", landSpace],
        ["Estimated Budget", `₹ ${budget}`],
      ],
    });

    // Bottom Right: Panchavarna Contact Details
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Panchavarna Infrastructure", 200, 280, null, null, "right");
    doc.setFont("Helvetica", "normal");
    doc.text("Mobile: 9490919095", 200, 290, null, null, "right");

    // Save PDF
    doc.save("Civil_Engineering_Report.pdf");
  });
});


const calculatorTabs = document.querySelectorAll(".calculator-tab");
const calculatorPanels = document.querySelectorAll(".calculator-panel");

calculatorTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        const targetPanel = tab.dataset.panel;

        calculatorTabs.forEach(function (item) {
            item.classList.remove("active");
        });

        calculatorPanels.forEach(function (panel) {
            panel.classList.remove("active");
        });

        tab.classList.add("active");
        document.getElementById(targetPanel).classList.add("active");
    });
});

//=+=======++++++++++++==========+++++++======+++++++++=======++++++========++++
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const amountResult = document.getElementById("amountResult");

// Input1: Sirf 0-9, decimal point allowed nahi
input1.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    calculateAmountDivision();
});

// Input2: Sirf 0-9 aur ek decimal point
input2.addEventListener("input", function () {
    let value = this.value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) {
        value = parts[0] + "." + parts.slice(1).join("");
    }
    this.value = value;
    calculateAmountDivision();
});

// Division + Math.ceil()
function calculateAmountDivision() {
    const amount = Number(input1.value);
    const rate = Number(input2.value);
    let result = 0;
    if (
        input1.value !== "" &&
        input2.value !== "" &&
        Number.isFinite(amount) &&
        Number.isFinite(rate) &&
        rate !== 0
    ) {
        const calculatedResult = amount / rate;
        if (Number.isFinite(calculatedResult)) {
            result = Math.ceil(calculatedResult);
        }
    }
    amountResult.textContent = result;
}
calculateAmountDivision();

//==============================================================================
const currencyInput1 = document.getElementById("currencyInput1");
const currencyInput2 = document.getElementById("currencyInput2");
const currencyResult = document.getElementById("currencyResult");

// Input 1: Sirf 0-9
currencyInput1.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    calculateCurrency();
});

// Input 2: 0-9 aur sirf ek decimal point
currencyInput2.addEventListener("input", function () {
    let value = this.value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) {
        value = parts[0] + "." + parts.slice(1).join("");
    }
    this.value = value;
    calculateCurrency();
});

// Multiplication + Math.ceil()
function calculateCurrency() {
    const input1Value = Number(currencyInput1.value);
    const input2Value = Number(currencyInput2.value);
    let result = 0;
    if (
        currencyInput1.value !== "" &&
        currencyInput2.value !== "" &&
        Number.isFinite(input1Value) &&
        Number.isFinite(input2Value)
    ) {
        const calculatedResult = input1Value * input2Value;
        if (Number.isFinite(calculatedResult)) {
            result = Math.ceil(calculatedResult);
        }
    }
    currencyResult.textContent = result;
}
calculateCurrency();

// ==============================================================================
calculatorTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        const targetPanel = tab.dataset.panel;
        // Sabhi panels ko clear karein
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
        document.getElementById("amountResult").textContent = "0";
        document.getElementById("currencyInput1").value = "";
        document.getElementById("currencyInput2").value = "";
        document.getElementById("currencyResult").textContent = "0";
        // Tab aur panel switch karein
        calculatorTabs.forEach(function (item) {
            item.classList.remove("active");
        });
        calculatorPanels.forEach(function (panel) {
            panel.classList.remove("active");
        });
        tab.classList.add("active");
        document.getElementById(targetPanel).classList.add("active");
    });
});









const currencyAddBtn = document.getElementById("currencyAddBtn");
const currencyNextBtn = document.getElementById("currencyNextBtn");

const currencyName = document.getElementById("currencyName");
const billPanel = document.getElementById("billPanel");
const billContent = document.getElementById("billContent");
const billGrandTotal = document.getElementById("billGrandTotal");
const closeBill = document.getElementById("closeBill");

let currencyEntries = [];

// Current panel ki entry validate karke collect karein
function getCurrencyEntry() {
    const name = currencyName.value.trim() || "-";
    const currency = currencyInput1.value.trim();
    const rate = currencyInput2.value.trim();
    // Sirf Currency aur Rate required hain
    if (currency === "" || rate === "") {
        alert("Please fill Currency and Rate.");
        return null;
    }
    const currencyValue = Number(currency);
    const rateValue = Number(rate);
    const amount = currencyValue * rateValue;
    if (
        !Number.isFinite(currencyValue) ||
        !Number.isFinite(rateValue) ||
        !Number.isFinite(amount)
    ) {
        alert("Please enter valid numerical values.");
        return null;
    }
    return {
        id: Date.now() + Math.random(),
        name: name,
        currency: currencyValue,
        rate: rateValue,
        amount: Math.ceil(amount)
    };
}

// Current entry ke inputs clear karein
function clearCurrencyInputs() {
    currencyName.value = "";
    currencyInput1.value = "";
    currencyInput2.value = "";

    currencyResult.textContent = "0";
}

// Bill list render karein
function renderBill() {
    billContent.innerHTML = "";
    if (currencyEntries.length === 0) {
        billContent.innerHTML =
            '<div class="bill-empty">No currencies added yet.</div>';
        billGrandTotal.textContent = "0";
        return;
    }
    let grandTotal = 0;
    currencyEntries.forEach(function (entry) {
        grandTotal += entry.amount;
        const card = document.createElement("div");
        card.className = "bill-entry";
        const header = document.createElement("div");
        header.className = "bill-entry-header";
        const title = document.createElement("h3");
        title.textContent = "Currency Details";
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "bill-delete";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            currencyEntries = currencyEntries.filter(function (item) {
                return item.id !== entry.id;
            });
            renderBill();
        });
        header.append(title, deleteButton);
        card.appendChild(header);
        function addBillRow(label, value) {
            const row = document.createElement("div");
            row.className = "bill-data-row";
            const labelElement = document.createElement("span");
            labelElement.className = "bill-data-label";
            labelElement.textContent = label;
            const valueElement = document.createElement("span");
            valueElement.className = "bill-data-value";
            valueElement.textContent = value;
            row.append(labelElement, valueElement);
            card.appendChild(row);
        }
        addBillRow("Currency Name", entry.name);
        addBillRow("Currency", entry.currency);
        addBillRow("Rate", entry.rate);
        addBillRow("Amount", entry.amount);
        billContent.appendChild(card);
    });
    billGrandTotal.textContent = String(grandTotal);
}

// Add button: Currency direct add hogi, koi message nahi
currencyAddBtn.addEventListener("click", function () {
    const entry = getCurrencyEntry();

    if (!entry) return;

    currencyEntries.push(entry);

    renderBill();
    clearCurrencyInputs();
});

// Next button: Current currency add karke direct bill panel open hoga
currencyNextBtn.addEventListener("click", function () {
    const hasAnyValue =
        currencyName.value.trim() !== "" ||
        currencyInput1.value.trim() !== "" ||
        currencyInput2.value.trim() !== "";

    // Agar current inputs mein data hai, toh pehle add karein
    if (hasAnyValue) {
        const entry = getCurrencyEntry();

        if (!entry) return;

        currencyEntries.push(entry);
        clearCurrencyInputs();
    }

    // Bill update karke panel open karein
    renderBill();
    billPanel.classList.add("show");
});

// Bill panel close
closeBill.addEventListener("click", function () {
    billPanel.classList.remove("show");
});




const gstPanel = document.getElementById("gstPanel");
const openGstPanel = document.getElementById("openGstPanel");
const closeGstPanel = document.getElementById("closeGstPanel");

// GST label par click karne se panel open hoga
openGstPanel.addEventListener("click", function () {
    gstPanel.classList.add("show");
});

// Sirf Close button se panel band hoga
closeGstPanel.addEventListener("click", function () {
    gstPanel.classList.remove("show");
});

const gstAmount1 = document.getElementById("gstamountinput1");
const gstPercentage1 = document.getElementById("gstprecentageinput1");
const gstTotal1 = document.getElementById("gsttotalinput1");

const gstAmount2 = document.getElementById("gstamountinput2");
const gstPercentage2 = document.getElementById("gstprecentageinput2");
const gstTotal2 = document.getElementById("gsttotalinput2");

const gstFixChange = document.getElementById("gstFixChange");
const gstFinalTotal = document.getElementById("gstFinalTotal");
const billGstTotal = document.getElementById("billGstTotal");

function calculateGST() {
    const grandTotal = Number(
        document.getElementById("billGrandTotal").textContent
    ) || 0;
    let amount1 = 0;
    let amount2 = 0;
    let percentage1 = 0;
    let percentage2 = 0;
    let gst1 = 0;
    let gst2 = 0;
    // GST Slabs
    if (grandTotal <= 25000) {
        amount1 = grandTotal;
        percentage1 = 0;
        // Fixed GST ₹45, no percentage
        gst1 = 45;
    } else if (grandTotal <= 100000) {
        amount1 = grandTotal;
        percentage1 = 0.18;
        gst1 = amount1 * percentage1 / 100;
    } else {
        amount1 = 100000;
        amount2 = grandTotal - 100000;
        percentage1 = 0.18;
        percentage2 = 0.09;
        gst1 = amount1 * percentage1 / 100;
        gst2 = amount2 * percentage2 / 100;
    }
    const fixChange = Number(gstFixChange.value) || 0;
    // Math.ceil results
    gst1 = Math.ceil(gst1);
    gst2 = Math.ceil(gst2);
    const finalGST = Math.ceil(gst1 + gst2 + fixChange);
    // GST 1
    gstAmount1.value = amount1;
    gstPercentage1.value = percentage1;
    gstTotal1.value = gst1;
    // GST 2
    gstAmount2.value = amount2;
    gstPercentage2.value = percentage2;
    gstTotal2.value = gst2;
    // Final GST
    gstFinalTotal.textContent = finalGST;
    // Bill Panel GST
    billGstTotal.textContent = finalGST;
    // Final Amount = Grand Total + GST Total
    const finalAmount = Math.ceil(grandTotal + finalGST);
    document.getElementById("billFinalAmount").textContent = finalAmount;
}

// Fix Change: Only digits allowed
gstFixChange.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    calculateGST();
});

// Grand Total change hone par GST update hoga
const grandTotalObserver = new MutationObserver(calculateGST);

grandTotalObserver.observe(
    document.getElementById("billGrandTotal"),
    {
        childList: true,
        characterData: true,
        subtree: true
    }
);

// Initial calculation
calculateGST();


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const screenshotBill = document.getElementById("screenshotBill");
const PDF_COUNTER_KEY = "formax_pdf_counter";
let pdfCounter = Number(localStorage.getItem(PDF_COUNTER_KEY)) || 0;

screenshotBill.addEventListener("click", async function () {
    const billContainer = document.querySelector(".bill-container");
    if (!billContainer) {
        alert("Bill panel not found!");
        return;
    }
    if (typeof html2pdf === "undefined") {
        alert("PDF library load nahi hui!");
        return;
    }
    const currencyCount = currencyEntries.length;
    if (currencyCount === 0) {
        alert("Please add currency first!");
        return;
    }
    const nextNumber = pdfCounter + 1;
    screenshotBill.disabled = true;
    screenshotBill.innerHTML = "Downloading...";
    // PDF layout class
    billContainer.classList.add("pdf-export");
    if (currencyCount === 1) {
        billContainer.classList.add("pdf-one-currency");
    } else if (currencyCount === 2) {
        billContainer.classList.add("pdf-two-currencies");
    }
    try {
        // Logo aur images load hone ka wait
        const images = billContainer.querySelectorAll("img");
        await Promise.all(
            Array.from(images).map(img => {
                if (img.complete && img.naturalWidth > 0) {
                    return Promise.resolve();
                }

                return new Promise((resolve, reject) => {

                    img.onload = resolve;

                    img.onerror = () => {
                        reject(new Error("Image load failed: " + img.src));
                    };

                });
            })
        );

        // Fonts load hone ka wait
        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        // PDF generate
        await html2pdf()
            .set({
                margin: [8,8,8,8],
                filename: `pdf${nextNumber}.pdf`,
                image: {
                    type: "jpeg",
                    quality: 0.98
                },
                html2canvas: {
                    scale: 1,
                    useCORS: true,
                    allowTaint: false,
                    backgroundColor: "#ffffff",
                    logging: true,
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: billContainer.scrollWidth
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait"
                },
                pagebreak: {
                    mode: ["css", "legacy","avoid-all"]
                }
            })
            .from(billContainer)
            .save();
        // Counter update only after successful download
        pdfCounter = nextNumber;
        localStorage.setItem(PDF_COUNTER_KEY,pdfCounter);
    } catch (error) {
        console.error("PDF Download Error:", error);
        alert("PDF generate nahi ho paya. Logo aur image ka path check karein.");
    } finally {
        billContainer.classList.remove(
            "pdf-export",
            "pdf-one-currency",
            "pdf-two-currencies"
        );
        screenshotBill.disabled = false;
        screenshotBill.innerHTML = "<i class='bx bxs-download'></i>";
    }

});



const currencyResetBtn = document.getElementById("currencyResetBtn");

currencyResetBtn.addEventListener("click", function () {
    // Saari saved currencies delete
    currencyEntries.length = 0;
    // Currency inputs clear
    clearCurrencyInputs();
    // Currency result reset
    document.getElementById("currencyResult").textContent = "0";
    // Bill content reset
    renderBill();
    // Grand Total reset
    document.getElementById("billGrandTotal").textContent = "0";
    // GST fields reset
    gstAmount1.value = "0";
    gstPercentage1.value = "0";
    gstTotal1.value = "0";

    gstAmount2.value = "0";
    gstPercentage2.value = "0";
    gstTotal2.value = "0";

    // GST and Final Amount reset
    gstFinalTotal.textContent = "0";
    billGstTotal.textContent = "0";

    document.getElementById("billFinalAmount").textContent = "0";

    // GST Fix Change default value
    gstFixChange.value = "200";

    // Bill aur GST panels close
    document.getElementById("billPanel").classList.remove("show");
    document.getElementById("gstPanel").classList.remove("show");

});









const shareBill = document.getElementById("shareBill");
shareBill.addEventListener("click", async function () {
    const billContainer = document.querySelector(".bill-container");
    if (!billContainer) {
        alert("Bill panel not found!");
        return;
    }
    if (typeof html2pdf === "undefined") {
        alert("PDF library load nahi hui!");
        return;
    }
    const currencyCount = currencyEntries.length;
    if (currencyCount === 0) {
        alert("Please add currency first!");
        return;
    }
    // Browser file sharing support check
    if (!navigator.share || !navigator.canShare) {
        alert("Aapka browser PDF sharing support nahi karta. Mobile browser mein try karein.");
        return;
    }
    const nextNumber = pdfCounter + 1;
    const fileName = `pdf${nextNumber}.pdf`;
    shareBill.disabled = true;
    shareBill.innerHTML = "Preparing...";
    billContainer.classList.add("pdf-export");
    if (currencyCount === 1) {
        billContainer.classList.add("pdf-one-currency");
    } else if (currencyCount === 2) {
        billContainer.classList.add("pdf-two-currencies");
    }
    try {
        // Images load hone ka wait
        const images = billContainer.querySelectorAll("img");
        await Promise.all(
            Array.from(images).map(img => {
                if (img.complete && img.naturalWidth > 0) {
                    return Promise.resolve();
                }
                return new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
            })
        );
        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }
        // PDF Blob generate — device par download nahi hoga
        const pdf = await html2pdf()
            .set({
                margin: 0,
                image: {type: "jpeg",quality: 0.98},
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    scrollX: 0,
                    scrollY: 0
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait"
                }
            })
            .from(billContainer)
            .toPdf()
            .get("pdf");

        const pdfBlob = pdf.output("blob");

        const pdfFile = new File(
            [pdfBlob],
            fileName,
            { type: "application/pdf" }
        );

        // File share support check
        if (!navigator.canShare({ files: [pdfFile] })) {
            alert("Is device par PDF file sharing supported nahi hai.");
            return;
        }

        // Share menu open
        await navigator.share({
            files: [pdfFile],
            title: "FORMAX FOREX Bill",
            text: "Please find your currency bill."
        });

        // Successful share ke baad counter update
        pdfCounter = nextNumber;

        localStorage.setItem(
            PDF_COUNTER_KEY,
            pdfCounter
        );

    } catch (error) {

        if (error.name !== "AbortError") {
            console.error("PDF Share Error:", error);
            alert("PDF share nahi ho paya. Dobara try karein.");
        }

    } finally {

        billContainer.classList.remove(
            "pdf-export",
            "pdf-one-currency",
            "pdf-two-currencies"
        );

        shareBill.disabled = false;

        shareBill.innerHTML =
            "<i class='bx bxs-share-alt'></i>";
    }

});
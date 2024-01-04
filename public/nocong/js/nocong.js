document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("targetMonth");
    const lapBaoCaoBtn = document.getElementById("lapBaoCaoBtn");
    const noCongList = document.getElementById("no-cong-list");
    const loadingIndicator = document.getElementById("loadingIndicator");

    // Generate options for months from 1 to 12
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option");
        option.value = `${i}/2024`;
        option.textContent = `${i}/2024`;
        select.appendChild(option);
    }

    select.addEventListener("change", function () {
        const selectedMonth = this.value;
        console.log(`Selected Month: ${selectedMonth}`);
    });

    lapBaoCaoBtn.addEventListener("click", function () {
        // Disable the button
        lapBaoCaoBtn.disabled = true;
        lapBaoCaoBtn.innerText = "Đang lấy dữ liệu.....";

        const selectedMonth = select.value;
        fetch(`/nocong`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({targetMonth: selectedMonth}),
        })
            .then((response) => response.json())
            .then((data) => {
                // Clear existing content in the tbody
                noCongList.innerHTML = "";

                // Iterate through the updated khachHangs data and append rows to the table
                data.danhSachNoCong.forEach((khachHang) => {
                    const row = document.createElement("tr");

                    // Add the relevant data to each cell in the row
                    row.innerHTML = `
           <th scope="row">${khachHang.stt}</th>
           <td>${khachHang.hoTen}</td>
           <td>${khachHang.noDau}</td>
           <td>${khachHang.phatSinh}</td>
           <td>${khachHang.noCuoi}</td>
       `;

                    // Append the row to the tbody
                    noCongList.appendChild(row);
                    // Disable the button
                    lapBaoCaoBtn.disabled = false;
                    lapBaoCaoBtn.innerText = "Lập báo cáo";
                });
            });
    });
});

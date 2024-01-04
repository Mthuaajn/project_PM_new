document.addEventListener("DOMContentLoaded", function () {
    function loadDeleteButton() {
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const phieuThuId = this.getAttribute("data-phieu-thu-id");

                // Gửi request DELETE thông qua fetch
                fetch(`/khachhangs/thutien/${phieuThuId}/delete`, {
                    method: "get",
                })
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.messages?.length > 0) {
                            while (errorMessageContainer.firstChild) {
                                errorMessageContainer.firstChild.remove();
                            }
                            json.messages.forEach((error) => {
                                const messageElement = document.createElement("div");
                                messageElement.className = "alert alert-danger";
                                messageElement.innerHTML = `<p>${error.message}</p>`;
                                errorMessageContainer.appendChild(messageElement);
                            });
                        }
                        phieuThuList.innerHTML = "";
                        // Iterate through the updated khachHangs data and append rows to the table
                        json.phieuThus.forEach((phieuThu) => {
                            const row = document.createElement("tr");

                            // Add the relevant data to each cell in the row
                            row.innerHTML = `
                            <th scope="row">${phieuThu.maPhieuThu}</th>
                            <td>${phieuThu.tenKhachHang}</td>
                            <td>${phieuThu.ngaynhap}</td>
                            <td>${phieuThu.soTienThu}</td>
           `;

                            // Append the row to the tbody
                            phieuThuList.appendChild(row);
                            loadDeleteButton();
                        });
                    });
            });
        });
    }
    var selectedOption = document.getElementById("khachHangSelect");
    var themPhieuThuBtn = document.getElementById("themPhieuThuBtn");
    var errorMessageContainer = document.getElementById("error-container");
    const phieuThuList = document.getElementById("phieu-thu-list");

    themPhieuThuBtn.addEventListener("click", () => {
        var maKhachHang = document.getElementById("khachHangSelect").value;
        var soTienThu = document.getElementById("soTienThu").value;
        var customerLoan = document.getElementById("customerLoan").value;
        var maPhieuThu = document.getElementById("maPhieuThu").value;

        var data = {
            maKhachHang: maKhachHang,
            soTienThu: soTienThu,
            customerLoan: customerLoan,
            maPhieuThu: maPhieuThu,
        };

        fetch("/khachhangs/thutien", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => data)
            .then((json) => {
                if (json.messages?.length > 0) {
                    while (errorMessageContainer.firstChild) {
                        errorMessageContainer.firstChild.remove();
                    }
                    json.messages.forEach((error) => {
                        const messageElement = document.createElement("div");
                        messageElement.className = "alert alert-danger";
                        messageElement.innerHTML = `<p>${error.message}</p>`;
                        errorMessageContainer.appendChild(messageElement);
                    });
                }
                phieuThuList.innerHTML = "";
                // Iterate through the updated khachHangs data and append rows to the table
                json.phieuThus.forEach((phieuThu) => {
                    const row = document.createElement("tr");

                    // Add the relevant data to each cell in the row
                    row.innerHTML = `
                    <th scope="row">${phieuThu.maPhieuThu}</th>
                    <td>${phieuThu.tenKhachHang}</td>
                    <td>${phieuThu.ngaynhap}</td>
                    <td>${phieuThu.soTienThu}</td>
                    <td>${phieuThu.diaChi}</td>
                    <td>${phieuThu.email}</td>
   `;

                    // Append the row to the tbody
                    phieuThuList.appendChild(row);
                    loadDeleteButton();
                });
            });
    });

    function capNhatTienNo() {
        var selectedCustomerId = selectedOption.value;
        fetch(`/khachhangs/${selectedCustomerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((data) => data.json())
            .then((json) => {
                const customerLoan = document.getElementById("customerLoan");
                customerLoan.value = json.tienNo;
            });
    }
    capNhatTienNo();

    loadDeleteButton();
    selectedOption.addEventListener("change", capNhatTienNo);
});

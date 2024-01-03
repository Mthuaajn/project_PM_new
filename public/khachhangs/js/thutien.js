document.addEventListener("DOMContentLoaded", function () {
    var selectedOption = document.getElementById("khachHangSelect");
    var themPhieuThuBtn = document.getElementById("themPhieuThuBtn");
    var errorMessageContainer = document.getElementById("error-container");

    themPhieuThuBtn.addEventListener('click', () => {
        var maKhachHang = document.getElementById("khachHangSelect").value;
        var soTienThu = document.getElementById("soTienThu").value;
        var customerLoan = document.getElementById("customerLoan").value;
        var maPhieuThu = document.getElementById("maPhieuThu").value;

        var data = {
            maKhachHang: maKhachHang,
            soTienThu: soTienThu,
            customerLoan: customerLoan,
            maPhieuThu: maPhieuThu
        };

        fetch("/khachhangs/thutien", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((data) => data).then((json) => {
                if (json.messages?.length > 0) {
                    while (errorMessageContainer.firstChild) {
                        errorMessageContainer.firstChild.remove()
                    }
                    json.messages.forEach((error) => {
                        const messageElement = document.createElement('div');
                        messageElement.className = 'alert alert-danger';
                        messageElement.innerHTML = `<p>${error.message}</p>`;
                        errorMessageContainer.appendChild(messageElement);
                    })
                }
            })
    })

    function capNhatTienNo() {
        var selectedCustomerId = selectedOption.value;

        fetch(`/khachhangs/${selectedCustomerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(data => data.json()).then(json => {
            const customerLoan = document.getElementById('customerLoan')
            customerLoan.value = json.tienNo;
        });
    }
    capNhatTienNo()
    selectedOption.addEventListener('change', capNhatTienNo)
});
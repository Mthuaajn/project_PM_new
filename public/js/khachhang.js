document.addEventListener("DOMContentLoaded", function () {
    // CAP NHAT THONG TIN KHACH HANG START
    const customerList = document.getElementById('customer-list');
    const customerIdToSend = document.getElementById('customerIdToSend');
    const customerIdInput = document.getElementById('customerId');
    const customerNameInput = document.getElementById('customerName');
    const customerAddressInput = document.getElementById('customerAddress');
    const customerPhoneInput = document.getElementById('customerPhone');
    const customerEmailInput = document.getElementById('customerEmail');
    const customerLoanInput = document.getElementById('customerLoan');
    const btnCapNhatKhachHang = document.getElementById('btnCapNhatKhachHang');

    customerList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('delete-button')) {
            // Nếu click vào nút xóa, không thực hiện việc lấy thông tin
            return;
        }

        // Lấy thông tin từ hàng trong bảng
        const row = target.closest('tr');
        if (!row) {
            return; // Không phải hàng trong bảng
        }

        const maKhachHang = row.querySelector('th').innerText;
        const tenKhachHang = row.querySelector('td:nth-child(2)').innerText;
        const diaChi = row.querySelector('td:nth-child(3)').innerText;
        const email = row.querySelector('td:nth-child(4)').innerText;
        const soDienThoai = row.querySelector('td:nth-child(5)').innerText;
        const tienNo = row.querySelector('td:nth-child(6)').innerText;
        const maKhachHangAn = row.querySelector('td:nth-child(7)').innerText;

        // Gán thông tin vào các input trong form
        customerIdToSend.value = maKhachHangAn;
        customerIdInput.value = maKhachHang;
        customerNameInput.value = tenKhachHang;
        customerAddressInput.value = diaChi;
        customerEmailInput.value = email;
        customerPhoneInput.value = soDienThoai;
        customerLoanInput.value = tienNo;

        // Hiển thị nút "Cập nhật khách hàng"
        btnCapNhatKhachHang.style.display = 'block';
    });

    // Xử lý sự kiện click nút "Cập nhật khách hàng"
    btnCapNhatKhachHang.addEventListener('click', function () {
        // Lấy giá trị từ các input
        const maKhachHangAn = customerIdToSend.value;
        const maKhachHang = customerIdInput.value;
        const hoTen = customerNameInput.value;
        const diaChi = customerAddressInput.value;
        const dienThoai = customerPhoneInput.value;
        const email = customerEmailInput.value;
        const tienNo = customerLoanInput.value;

        // Kiểm tra xem các trường nhập liệu có trống không
        if (!maKhachHang || !hoTen || !diaChi || !dienThoai || !email || !tienNo) {
            alert('Vui lòng điền đầy đủ thông tin khách hàng.');
            return;
        }

        // Tạo đối tượng chứa dữ liệu khách hàng
        const khachHang = {
            maKhachHang,
            hoTen,
            diaChi,
            dienThoai,
            email,
            tienNo,
        };

        fetch(`/khachhangs/${maKhachHangAn}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(khachHang),
        })
            .then(response => window.location.reload())

    });
    // CAP NHAT THONG TIN KHACH HANG END

    // Xử lý sự kiện xóa khách hàng
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const customerId = this.getAttribute("data-customer-id");

            // Gửi request DELETE thông qua fetch
            fetch(`/khachhangs/${customerId}/delete`, {
                method: "get",
            }).then((response) => window.location.reload());
        });
    });
    const addButton = document.getElementById("btnThemKhachHang");
    const errorMessage = document.getElementById("error-message");

    addButton.addEventListener("click", function () {
        // Lấy giá trị từ các input
        const maKhachHang = document.getElementById("customerId").value;
        const hoTen = document.getElementById("customerName").value;
        const diaChi = document.getElementById("customerAddress").value;
        const dienThoai = document.getElementById("customerPhone").value;
        const email = document.getElementById("customerEmail").value;
        const tienNo = document.getElementById("customerLoan").value;

        // Kiểm tra trường input có trống không
        if (!maKhachHang || !hoTen || !diaChi || !dienThoai || !email || !tienNo) {
            errorMessage.textContent = "Vui lòng điền đầy đủ thông tin khách hàng.";
            errorMessage.style.display = "block";
            return;
        } else {
            errorMessage.style.display = "none";
        }

        // Tạo đối tượng chứa dữ liệu khách hàng
        const khachHang = {
            maKhachHang,
            hoTen,
            diaChi,
            dienThoai,
            email,
            tienNo,
        };

        // Gửi request POST thông qua fetch
        fetch("/khachhangs/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(khachHang),
        }).then((response) => window.location.reload());
    });
});
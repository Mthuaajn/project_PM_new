document.addEventListener("DOMContentLoaded", function () {

    function loadDeleteButton() {
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const customerId = this.getAttribute("data-customer-id");

                // Gửi request DELETE thông qua fetch
                fetch(`/khachhangs/${customerId}/delete`, {
                    method: "get",
                }).then((response) => response.json()).then((json) => {
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
                    customerList.innerHTML = ''
                    // Iterate through the updated khachHangs data and append rows to the table
                    json.khachHangs.forEach(khachHang => {
                        const row = document.createElement('tr');

                        // Add the relevant data to each cell in the row
                        row.innerHTML = `
               <th scope="row">${khachHang.maKhachHang}</th>
               <td>${khachHang.hoTen}</td>
               <td>${khachHang.diaChi}</td>
               <td>${khachHang.email}</td>
               <td>${khachHang.dienThoai}</td>
               <td>${khachHang.tienNo}</td>
               <td style="display:none;">${khachHang._id}</td>
               <td>
                   <button class="delete-button" data-customer-id="${khachHang._id}">
                       <img src="/img/icon-bin.svg" alt="" />
                   </button>
               </td>
           `;

                        // Append the row to the tbody
                        customerList.appendChild(row);
                    });
                });
            });
        });

    }

    const errorMessageContainer = document.getElementById("error-container");
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
    loadDeleteButton()
    customerList.addEventListener('click', function (event) {
        const target = event.target;

        console.log('delete' === (target.id))
        if ('delete' === (target.id)) {
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
        customerIdInput.setAttribute('disabled', 'true');
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
            .then((data) => data.json()).then((json) => {
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
                // Clear existing content in the tbody
                customerList.innerHTML = '';

                // Iterate through the updated khachHangs data and append rows to the table
                json.khachHangs.forEach(khachHang => {
                    const row = document.createElement('tr');

                    // Add the relevant data to each cell in the row
                    row.innerHTML = `
           <th scope="row">${khachHang.maKhachHang}</th>
           <td>${khachHang.hoTen}</td>
           <td>${khachHang.diaChi}</td>
           <td>${khachHang.email}</td>
           <td>${khachHang.dienThoai}</td>
           <td>${khachHang.tienNo}</td>
           <td style="display:none;">${khachHang._id}</td>
           <td id="delete">
               <button id="delete" class="delete-button" data-customer-id="${khachHang._id}">
                   <img id="delete" src="/img/icon-bin.svg" alt="" />
               </button>
           </td>
       `;

                    // Append the row to the tbody
                    customerList.appendChild(row);
                });
            })
        loadDeleteButton()

    });
    // CAP NHAT THONG TIN KHACH HANG END

    // Xử lý sự kiện xóa khách hàng
    const addButton = document.getElementById("btnThemKhachHang");

    addButton.addEventListener("click", function () {
        // Lấy giá trị từ các input
        const maKhachHang = document.getElementById("customerId").value;
        const hoTen = document.getElementById("customerName").value;
        const diaChi = document.getElementById("customerAddress").value;
        const dienThoai = document.getElementById("customerPhone").value;
        const email = document.getElementById("customerEmail").value;
        const tienNo = document.getElementById("customerLoan").value;


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
        }).then((data) => data.json()).then((json) => {
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
            // Iterate through the updated khachHangs data and append rows to the table
            json.khachHangs.forEach(khachHang => {
                const row = document.createElement('tr');

                // Add the relevant data to each cell in the row
                row.innerHTML = `
       <th scope="row">${khachHang.maKhachHang}</th>
       <td>${khachHang.hoTen}</td>
       <td>${khachHang.diaChi}</td>
       <td>${khachHang.email}</td>
       <td>${khachHang.dienThoai}</td>
       <td>${khachHang.tienNo}</td>
       <td style="display:none;">${khachHang._id}</td>
       <td>
           <button class="delete-button" data-customer-id="${khachHang._id}">
               <img src="/img/icon-bin.svg" alt="" />
           </button>
       </td>
   `;

                // Append the row to the tbody
                customerList.appendChild(row);
            });
        })
        loadDeleteButton()
    });
});
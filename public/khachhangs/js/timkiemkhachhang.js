
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchId');
    const searchButton = document.querySelector('.search-bar button');
    const customerList = document.getElementById('customer-list');

    // Xử lý sự kiện khi nhấn nút tìm kiếm
    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase();

        // Lọc và hiển thị chỉ những hàng chứa thông tin tìm kiếm
        filterCustomerList(searchTerm);
    });

    // Xử lý sự kiện khi nhập vào ô tìm kiếm
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        // Lọc và hiển thị chỉ những hàng chứa thông tin tìm kiếm
        filterCustomerList(searchTerm.trim());
    });

    function filterCustomerList(searchTerm) {
        const rows = customerList.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const maKhachHang = row.querySelector('th').innerText.toLowerCase();
            const hoTen = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
            const diaChi = row.querySelector('td:nth-child(3)').innerText.toLowerCase();
            const email = row.querySelector('td:nth-child(4)').innerText.toLowerCase();
            const dienThoai = row.querySelector('td:nth-child(5)').innerText.toLowerCase();
            const tienNo = row.querySelector('td:nth-child(6)').innerText.toLowerCase();

            // Ẩn hoặc hiển thị hàng dựa trên việc có phù hợp với điều kiện tìm kiếm hay không
            if (
                maKhachHang.includes(searchTerm) ||
                hoTen.includes(searchTerm) ||
                diaChi.includes(searchTerm) ||
                email.includes(searchTerm) ||
                dienThoai.includes(searchTerm) ||
                tienNo.includes(searchTerm)
            ) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
});

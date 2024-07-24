document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('myModal');
    var closeModal = document.querySelector('.close');
    var submitButton = document.querySelector('.sm button');

    function showModal() {
        resetForm();
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    function resetForm() {
        const form = document.querySelector('form');
        form.reset();
    }

    closeModal.onclick = hideModal;

    submitButton.addEventListener('click', function() {
        const form = document.querySelector('form');
        const formData = new FormData(form);

        const data = {
            name: formData.get('name'),
            birthdate: formData.get('birthdate'),
            hometown: formData.get('hometown'),
            course: formData.get('course'),
            major: formData.get('major'),
            email: formData.get('email'),
            fbLink: formData.get('fbLink'),
            phone: formData.get('phone')
        };

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Đọc dữ liệu dưới dạng văn bản
        })
        .then(text => {
            try {
                const data = JSON.parse(text); // Phân tích văn bản thành JSON
                if (data.success) {
                    alert('Thông tin đã được gửi thành công!');
                    hideModal(); // Ẩn modal sau khi gửi thành công
                } else {
                    alert('Gửi thông tin thất bại.');
                }
            } catch (e) {
                console.error('Lỗi phân tích JSON:', e);
                alert('Có lỗi xảy ra.');
            }
        })
        .catch(error => {
            console.error('Lỗi:', error);
            alert('Có lỗi xảy ra.');
        });
    });

    const teamElements = document.querySelectorAll('.team_element');
    teamElements.forEach(teamElement => {
        teamElement.addEventListener('click', function() {
            showModal();
        });
    });

    window.showModal = showModal;
});

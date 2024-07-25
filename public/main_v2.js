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

    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của nút submit

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

        console.log('Data to be sent:', data);

        fetch('/submit', { // Đổi URL để khớp với đường dẫn trong server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Đổi để phân tích JSON
        })
        .then(responseData => {
            console.log('Response data:', responseData);
            if (responseData.success) {
                alert('Thông tin đã được gửi thành công!');
                hideModal();
            } else {
                alert('Gửi thông tin thất bại.');
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

window.onload = function() {
    fetchBookings();

    document.getElementById('bookingForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        try {
            const response = await axios.post('/bookings', {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone')
            });
            
                fetchBookings();
                this.reset();
            
            
        } catch (error) {
            console.error('Error:', error);
        }
    });
};

async function fetchBookings() {
    try {
        const response = await axios.get('/bookings');
        const bookings = response.data;
        const bookingList = document.getElementById('bookingList');
        bookingList.innerHTML = '';
        bookings.forEach(booking => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p><strong>Name:</strong> ${booking.name}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <button onclick="editBooking(${booking.id})">Edit</button>
                <button onclick="deleteBooking(${booking.id})">Delete</button>
            `;
            bookingList.appendChild(div);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editBooking(id) {
    const name = prompt('Enter new name:');
    const email = prompt('Enter new email:');
    const phone = prompt('Enter new phone:');
    try {
        const response = await axios.put(`/bookings/${id}`, { name, email, phone });
        if (response.status === 200) {
            fetchBookings();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteBooking(id) {
    if (confirm('Are you sure you want to delete this booking?')) {
        try {
            const response = await axios.delete(`/bookings/${id}`);
            if (response.status === 200) {
                fetchBookings();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

document.getElementById('noName').style.display = 'none';
// load all data
const loadPhone = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;

    // clear input field
    inputField.value = '';

    if (inputText == '') {
        // msg for empty input
        document.getElementById('noName').style.display = 'block';
        document.getElementById('notFound').style.display = 'none';

        const displayDiv = document.getElementById('search-result');
        // clear previous search result
        displayDiv.textContent = '';
    }
    else {
        document.getElementById('noName').style.display = 'none';

        // fetct data
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
            .then(res => res.json())
            .then(data => displayPhone(data))
    }
}

document.getElementById('notFound').style.display = 'none';

const displayPhone = phones => {
    // get the array of phone
    const allPhones = phones.data;

    const displayDiv = document.getElementById('search-result');
    // clear previous search result
    displayDiv.textContent = '';

    if (phones.status === false) {
        // msg for not found the phone
        document.getElementById('notFound').style.display = 'block';
        document.getElementById('noName').style.display = 'none';
    }
    else {
        document.getElementById('notFound').style.display = 'none';
        allPhones.forEach(phone => {
            const div = document.createElement('div');
            // dynamic html
            div.innerHTML = `
                            <div class="col">
                                <div class="card">
                                <img class="w-50 mx-auto mt-3" src="${phone.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Brand: ${phone.brand}</h5>
                                <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>  
                                <button onclick="loadDetails()" class="btn btn-info ">See Details</button>              
                            </div>
                            </div>
                        </div>`;
            displayDiv.appendChild(div);
        })
    }
}
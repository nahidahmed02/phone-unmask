document.getElementById('notFound').style.display = 'none';
const loadPhone = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;

    // clear input field
    inputField.value = '';
    if (inputText == '') {
        document.getElementById('notFound').style.display = 'block';

        const displayDiv = document.getElementById('search-result');
        // clear previous search result
        displayDiv.textContent = '';
    }
    else {
        document.getElementById('notFound').style.display = 'none';

        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
            .then(res => res.json())
            .then(data => displayPhone(data.data))
    }
}

const displayPhone = phones => {
    const displayDiv = document.getElementById('search-result');
    // clear previous search result
    displayDiv.textContent = '';

    phones.forEach(phone => {
        const div = document.createElement('div');
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
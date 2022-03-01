const loadPhone = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;


    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = phones => {
    // console.log(phones);
    phones.forEach(phone => {
        console.log(phone);
        const displayDiv = document.getElementById('search-result');
        const div = document.createElement('div');
        div.innerHTML = `
                            <div class="col">
                                <div class="card">
                                <img class="w-50 mx-auto mt-3" src="${phone.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Brand: ${phone.brand}</h5>
                                <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>                
                            </div>
                            </div>
                        </div>`;
        displayDiv.appendChild(div);
    })
}
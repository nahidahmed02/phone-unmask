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

        // clear previous search result
        const displayDiv = document.getElementById('search-result');
        displayDiv.textContent = '';

        // clear details div
        const detailsDiv = document.getElementById('display-details');
        detailsDiv.textContent = '';
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

// display searched phones
const displayPhone = phones => {
    // get the array of phone
    const allPhones = phones.data.slice(0, 20);

    // clear previous search result
    const displayDiv = document.getElementById('search-result');
    displayDiv.textContent = '';

    // clear details div
    const detailsDiv = document.getElementById('display-details');
    detailsDiv.textContent = '';

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
                                <button onclick="loadDetails('${phone.slug}')" class="btn btn-info ">See Details</button>              
                            </div>
                            </div>
                        </div>`;
            displayDiv.appendChild(div);
        })
    }
}

// load details of selected phone
const loadDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

// display details of specefic phone
const displayDetails = info => {

    // clear details field
    const detailsDiv = document.getElementById('display-details');
    detailsDiv.textContent = '';

    const div = document.createElement('div');
    // dynamic html
    div.innerHTML = `
                    <div class="col">
                        <div class="card">
                        <img class="w-50 mx-auto mt-3" src="${info.image}" class="card-img-top" alt="...">

                    <div class="card-body">
                        <h6 class="card-title"><span class="fw-bold">Phone Name:</span> <span class="fst-italic"> ${info.name}</span></h6>

                        <h6 class="card-title"><span class="fw-bold">Release Date:</span> <span class="fst-italic"> ${info.releaseDate ? info.releaseDate : 'Not Available'}</span></h6>
                        
                        <h6 class="card-title"><span class="fw-bold">Storage:</span> <span class="fst-italic"> ${info.mainFeatures.storage}</span></h6>  

                        <h6 class="card-title"><span class="fw-bold">Memory:</span> <span class="fst-italic"> ${info.mainFeatures.memory}</span></h6>  

                        <h6 class="card-title"><span class="fw-bold">Display Size:</span> <span class="fst-italic"> ${info.mainFeatures.displaySize}</span></h6>  

                        <h6 class="card-title"><span class="fw-bold">Chip Set :</span> <span class="fst-italic"> ${info.mainFeatures.chipSet}</span></h6>  

                        <button onclick="moreInfo()" class="btn btn-info btn-sm">More Info</button>              
                    </div>
                </div>
                </div>`;
    detailsDiv.appendChild(div);
}

const moreInfo = () => {
    const detailsDiv = document.getElementById('display-details');
    const moreInfoDiv = document.createElement('div');
    moreInfoDiv.innerHTML = `<div class="col-lg-8">
    <div id="list-example" class="list-group">
    <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
    <a class="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
  </div>
  <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" class="scrollspy-example" tabindex="0">
    <h4 id="list-item-1">Item 1</h4>
    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
    
    <h4 id="list-item-2">Item 2</h4>
    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
  </div>
    </div>`;
    detailsDiv.appendChild(moreInfoDiv);
}
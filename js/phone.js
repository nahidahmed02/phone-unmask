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
            // dynamic html for searched phones
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

            // to show the dynamic html in UI
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
    // dynamic html to show details
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

                        <button id="moreInfoBtn" class="btn btn-info btn-sm" type="button">More Info</button>              
                    </div>
                </div>
                </div>`;

    // to show dynamic html of details in UI
    detailsDiv.appendChild(div);
    // to go on the top for details
    window.scrollTo(0, 0);

    // for sensors and others info
    document.getElementById('moreInfoBtn').addEventListener('click', function () {
        const sensorDiv = document.createElement('div');

        // dynamic html for sensors
        sensorDiv.innerHTML = `   
        <div style="min-height: 120px;">
         
         <div class="card card-body moreInfo-bg" style="background-image: url(${info.image});">
             <h4 class="text-center fw-bold mb-3">Sensors</h4>
                 <h6 class="fst-italic">${info.mainFeatures.sensors[0] ? info.mainFeatures.sensors[0] : ''}</h6>

                 <h6 class="fst-italic">${info.mainFeatures.sensors[1] ? info.mainFeatures.sensors[1] : ''}</h6>

                 <h6 class="fst-italic">${info.mainFeatures.sensors[2] ? info.mainFeatures.sensors[2] : ''}</h6>

                 <h6 class="fst-italic">${info.mainFeatures.sensors[3] ? info.mainFeatures.sensors[3] : ''}</h6>

                 <h6 class="fst-italic">${info.mainFeatures.sensors[4] ? info.mainFeatures.sensors[4] : ''}</h6>

                 <h6 class="fst-italic">${info.mainFeatures.sensors[5] ? info.mainFeatures.sensors[5] : ''}</h6>

                 <h6 class="fst-italic">${info.mainFeatures.sensors[6] ? info.mainFeatures.sensors[6] : ''}</h6>

                 <h6 class="fst-italic">${info.mainFeatures.sensors[7] ? info.mainFeatures.sensors[7] : ''}</h6>

                 <h6 class="fst-italic">${info.mainFeatures.sensors[8] ? info.mainFeatures.sensors[8] : ''}</h6>

                 <h6 class="fst-italic">${info.mainFeatures.sensors[9] ? info.mainFeatures.sensors[9] : ''}</h6>
    
         </div>
         
        </div>`;
        // to show dynamic html of sensors in UI
        detailsDiv.appendChild(sensorDiv);

        // others
        const othersDiv = document.createElement('div');
        // dynamic html for others
        othersDiv.innerHTML = `   
        <div style="min-height: 120px;">
         
         <div class="card card-body moreInfo-bg">

             <h4 class="text-center fw-bold mb-3">Others</h4>
                 <h6><span class="fw-bold">Bluetooth: </span><span class="fst-italic">${info.others.Bluetooth ? info.others.Bluetooth : ''}</span></h6>

                 <h6><span class="fw-bold">GPS: </span><span class="fst-italic">${info.others.GPS ? info.others.GPS : ''}</span></h6>

                 <h6><span class="fw-bold">NFC: </span><span class="fst-italic">${info.others.NFC ? info.others.NFC : ''}</span></h6>

                 <h6><span class="fw-bold">Radio: </span><span class="fst-italic">${info.others.Radio ? info.others.Radio : ''}</span></h6>

                 <h6><span class="fw-bold">USB: </span><span class="fst-italic">${info.others.USB ? info.others.USB : ''}</span></h6>

                 <h6><span class="fw-bold">WLAN: </span><span class="fst-italic">${info.others.WLAN ? info.others.WLAN : ''}${info.others.WLAN ? info.others.WLAN : ''}</span></h6>    
         </div>
        
        </div>`;
        // to show dynamic html of sensors in UI
        detailsDiv.appendChild(othersDiv);
    })
}
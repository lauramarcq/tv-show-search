
// select the form by its id
const form = document.querySelector('#searchForm');
// select the image container by its id
const imageContainer = document.querySelector('#imageContainer');
// listen for a submit event from the form / make asyc function so you can await the api
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        // get the input value from the form / check console.dir 
        const searchTerm = form.elements.query.value;
        //TODO - Make search button disabled nutil string is provided
        // if (searchTerm === "") {
        //     // show error message
        //     console.log("empty string")
        // }

        // object from params with key value pair with query specified
        const config = { params: { q: searchTerm } }
        // api call / await / 
        const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
        // erase image container after new search
        imageContainer.innerHTML = '';
        makeImages(res.data)
        // erase input after search
        // form.elements.query.value = '';
    }
    catch (e) {
        console.log(e, "Connection error:", e);
    }
})

// looping to show each result of the search
const makeImages = (shows) => {
    for (let result of shows) {
        // if statment because not all shows have an image
        if (result.show.image) {
            // create the image element to display
            const img = document.createElement('IMG');
            // check dir to understand location of where the image is in the api dir
            img.src = result.show.image.medium;
            // append the image to the div with an id of image container
            imageContainer.append(img)
        }
    }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();
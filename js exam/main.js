let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

let mainSection = document.getElementById("data-list-wrapper");

pitchCreateBtn.addEventListener('click' ,()=>{


    let product ={

        title :pitchTitleInput.value,
       price : pitchPriceInput.value,
        founder :pitchfounderInput.value,
        category :pitchCategoryInput.value,
        image :pitchImageInput.value
    }
    
        fetch("http://localhost:3000/pitches" ,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
           body :JSON.stringify(product),
        }).then((res) => res.json())
    
        .then((data) => fetchData())
    
        .catch((err) => console.log(err))

})



function fetchData() {
    fetch("http://localhost:3000/pitches")
        .then((res) => res.json())

        .then((data) => setData(data))

        .catch((err) => console.log(err));
}
fetchData([]);

function setData(data) {
    let show = data.map((el) => 
        storeData(el.id,el.image, el.category, el.title, el.price, el.founder)
        
    )
    mainSection.innerHTML = show.join(" ");
}

function storeData(id,image, category,founder, price, title) {

    let store =
        `
    
             <div class="main" style="border:1px solid black; margin:20px auto; width:50%;">

              <div class="card data-id="${id} id="pitchid" style="padding:50px 10px;">
                <div class="card-img" style="margin:auto">
                  <img src="${image}" alt="${title}" height="400px" width="400px">
                </div>
                <div class="card-body">
                  <div class="card-title">${title}</div>
                  <div class="card-founder">${founder}</div>
                  <div class="card-category">${category}</div>
                  <div class="card-price">${price}</div>
                  <a href="#" data-id="${id}" class="card-link">EDIT</a>
                  <button data-id="${id}" class="card-button">DELETE</button>
                </div>
              </div>
             </div>
             <hr>`

    return store

}

document.addEventListener('click', (e)=>{
     
    if(e.target.classList.contains("card-button"))
    {
        deleteProduct(e.target.dataset.id);
    }
}
)

function deleteProduct(id)
{
    fetch(`http://localhost:3000/pitches/${id}`,{
        method: 'DELETE'

    })
    .then((res)=>res.json())
    .then((data)=>console.log(data),
        alert('delete succsess..'))
    
    .catch((err)=>console.log(err))
}

document.addEventListener('click', (e)=>{
     
    if(e.target.classList.contains("card-link"))
    {
        updateData(e.target.dataset.id);
    }
}
)
function updateData(id){

    
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        updatePitchIdInput.value = data.id,
        updatePitchTitleInput.value = data.title,
        updatePitchImageInput.value = data.image,
        updatePitchfounderInput.value = data.founder,
        updatePitchCategoryInput.value = data.category,
        updatePitchPriceInput.value = data.price

    })
    .catch((err)=>console.log(err))
    
}


updatePitchBtn.addEventListener('click' ,()=>{



    let upobj ={

        id :updatePitchIdInput.value,
        title : updatePitchTitleInput.value,
        price : updatePitchPriceInput.value,
        founder :updatePitchfounderInput.value,
        category : updatePitchCategoryInput.value,
        image :updatePitchImageInput.value 
    }
    
        fetch(`http://localhost:3000/pitches/${upobj.id}` ,{
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
            },
           body :JSON.stringify(upobj),
        }).then((res) => res.json())
    
        .then((data) => fetchData())
    
        .catch((err) => console.log(err))

})

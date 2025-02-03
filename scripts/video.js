//categories button
const loadData = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await response.json()
    displayData(data)
}
async function categoriesButton(id){
    // alert(id)
    const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await response.json()

    const activeBtn = document.getElementById(`btn-${id}`)
    // console.log(activeBtn)

    //remove active class from every button
    removeActiveClass();

    //add active class to specific button
    activeBtn.classList.add('active')
    displayVideos(data.category)
}

const displayData = (data) =>{
    // console.log(data.categories[0].category)

    // for(const item of data.categories){
    //     console.log(item)
    // }

    // or
    const categories = document.getElementById('categories')

    data.categories.forEach((item)=>{
        console.log(item)
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="btn-${item.category_id}" onclick="categoriesButton(${item.category_id})" class="btn p-3 btn-category">${item.category}</button>
        `
        // button.classList.add('btn','p-3') -->> how to do .classList.add('btn','p-3'). But you can do-->> .classList = "b-2 p-3 rounded"

        categories.appendChild(div)
    })
}


loadData();




function removeActiveClass(){
    const allBtnClass = document.getElementsByClassName('btn-category')

    for(const oneBtn of allBtnClass){
        oneBtn.classList.remove('active')
    }
}


//video card details 
const addVideoCardDetail = async(videoId) =>{
     const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
     const data = await response.json();
     displayVideoDetail(data.video)
}
function displayVideoDetail(data){
    
    const modContent = document.getElementById('modal_content')

    const div = document.createElement('div')
    div.innerHTML=`
    <img class="h-[300px] w-full object-cover" src="${data.thumbnail}"/>
    <p>${data.description}</p>
    `
    modContent.appendChild(div)

    // way-1
    document.getElementById('helloModal').showModal()
    // way-2
    // document.getElementById('custom-modal').click()
}

//calculate time over video card
function calculateTime(seconds){

    // const years = parseInt(seconds/31536000)
    // let remSec = seconds%31536000 

    // const days = parseInt(seconds/86400)
    // remSec = seconds%86400

    const hours = parseInt(seconds/3600)
    let remSec = seconds%3600

    const mins = parseInt(remSec/60)
    remSec = parseInt(seconds%60)

    return  `${hours}h ${mins}m ${remSec}s`
}

// {
//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//             "profile_name": "Oliver Harris",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "5.4K",
//         "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
// }




//videos card fetch
const loadVideos = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await response.json()
    displayVideos(data.videos)
}

//card making
const displayVideos = async(videos) =>{
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML= ``

    if(videos.length === 0){

        cardContainer.classList.remove('grid')
        cardContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center py-10">
           <img class="w-[200px]" src="images/icon.png"  />
           <h1 class="text-3xl block font-light text-gray-500  mx-auto text-center mt-8">
           NO Videos To Show
        </h1>
        <div>
        </div>
        `
    } 
    else{
        cardContainer.classList.add('grid')
    }

    

    //video card api-->> card array fetch 
    videos.forEach((item) =>{
        // console.log(item.thumbnail)
        // console.log(item)

        const div = document.createElement('div')
        div.innerHTML = `
       <div class="card card-compact gap-3">
       <figure class="h-[200px] relative">
       <img class="w-full h-full object-cover"
        src= ${item.thumbnail}
      alt="Shoes" />

        ${item.others.posted_date === "" ? "" : `<span class="absolute right-4 px-4 py-1 bottom-2 text-white font-thin bg-zinc-900 rounded-md">
             ${calculateTime(item.others.posted_date)}
        </span>`}    
       </figure>




       <div class="px-0 flex gap-3 items-center justify-start">
           <div class="h-[50px] w-[50px]">
             <img class="h-full w-full rounded-full object-cover" src=${item.authors[0].profile_picture} />
           </div> 

           <div>
              <h1 class="font-bold">
                 ${item.title}
              </h1>
              <div class="flex gap-2 items-center">
              <p class="text-gray-400">
                 ${item.authors[0].profile_name}
              </p>
              ${
                item.authors[0].verified === true ? `<img class="h-5 w-5" src="https://img.icons8.com/?size=48&id=p9jKUHLk5ejE&format=png" /> ` : ""
              }
              </div>
           </div>  

       </div>
       </div> 

           
           <div>
             <button class="btn btn-error btn-sm my-3" onclick="addVideoCardDetail('${item.video_id}')">
                 Details
             </button>
           </div>
        `

    cardContainer.appendChild(div)
    })
}
loadVideos()
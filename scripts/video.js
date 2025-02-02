//categories button
const loadData = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await response.json()
    displayData(data)
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
        const button = document.createElement('button')
        button.classList.add('btn','p-3')
        button.innerText = item.category

        categories.appendChild(button)
    })
}


loadData();






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




//videos card
const loadVideos = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await response.json()
    displayVideos(data.videos)
}
const displayVideos = async(videos) =>{
    const cardContainer = document.getElementById('card-container')
    videos.forEach((item) =>{
        // console.log(item.thumbnail)
        // console.log(item)

        const div = document.createElement('div')
        div.innerHTML = `
       <div class="card card-compact">
       <figure>
       <img
        src= ${item.thumbnail}
      alt="Shoes" />
       </figure>
       <div class="card-body">
       <h2 class="card-title">Shoes!</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions justify-end">
       <button class="btn btn-primary">Buy Now</button>
       </div>
       </div>
       </div> 
        `

    cardContainer.appendChild(div)
    })
}
loadVideos()
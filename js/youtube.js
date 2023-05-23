// AIzaSyCH8aar9g3uEDi6wazPhlWbgIFyBf44UH0
// PLT9LozkkUQQt5ad7iA6o_0YE8MyX9L__E


let vidList = document.querySelector(".vidList");
let key = "AIzaSyCH8aar9g3uEDi6wazPhlWbgIFyBf44UH0";
let playlistId = "PLT9LozkkUQQt5ad7iA6o_0YE8MyX9L__E";
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}`


fetch(url)
    .then((data)=>{
        console.log(data);
        return data.json();
    })
    .then((json)=>{
        // console.log(json);
        let items = json.items;
        // console.log(items);
        let result = "";

        items.map((el)=>{


            let title = el.snippet.title;
            if(title.length>20){
                title = title.substr(0, 20) + "...";
            }
            let des = el.snippet.description;
            if(des.length>100){
                des = des.substr(0, 100) + "...";
            }
            let date = el.snippet.publishedAt;
            date = date.split("T")[0];
        
            result += `
            <article>
                <a href="${el.snippet.resourceId.videoId}" class="pic">
                    <img src="${el.snippet.thumbnails.medium.url}">
                </a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${des}</p>
                    <span>${date}</span>
                 </div>
            </article>
        `
        })
        vidList.innerHTML = result;
    })

vidList.addEventListener("click", (e)=> {
    e.preventDefault();

    if(!e.target.closest("a")) return;

    const vidId = e.target.closest("article").querySelector("a").getAttribute("href");

    // console.log(vidId);

    let pop = document.createElement("figure");
    pop.classList.add("pop");

    pop.innerHTML = `
        <iframe src="http://www.youtube.com/embed/${vidId}" frameborder = "0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose">Close</span>
    `;
    vidList.append(pop);
})

vidList.addEventListener("click", (e)=>{
    e.preventDefault();

    const pop  = vidList.querySelector(".pop");

    if(pop) {
        const close = pop.querySelector("span");
        if (e.target == close) pop.remove();
    }
})

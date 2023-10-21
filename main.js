const ytsr = require('ytsr');
const fs = require('fs');

const getyoutube = async()=>{
    const filters1 = await ytsr.getFilters('shiba inu vlog');
    const filter1 = filters1.get('Type').get('Video');
    let itemarray =[];
    let items = await ytsr(filter1.url, { pages: 50000,gl:"US" });
    itemarray=items.items;

    itemarray = itemarray.filter((a)=>{
        return a.type==="video"
    })
    fs.writeFile ("output.json", JSON.stringify(itemarray), function(err) {
        if (err) throw err;
        console.log('complete');
        })
        fs.writeFile ("./datasetlabelwebsite/public/rawYoutubevideos.json", JSON.stringify(itemarray), function(err) {
            if (err) throw err;
            console.log('complete');
            })
    }

getyoutube()
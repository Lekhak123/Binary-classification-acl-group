const ytsr = require('ytsr');
const fs = require('fs');

const getyoutube = async()=>{
    //Riley and US
    const filters1 = await ytsr.getFilters('KyloTheDoge');
    const filter1 = filters1.get('Type').get('Video');
    let itemarray =[];
    let items = await ytsr(filter1.url, { pages: 500000,gl:"GB" });
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
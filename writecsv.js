const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const createGood = async() => {
    let goodata = await fs.readFileSync("./datasetlabelwebsite/public/good.json", "utf-8");
    goodata = JSON.parse(goodata);
    const csvWriter = createCsvWriter({
        path: 'goodOutput.csv',
        header: [
            {
                id: 'title',
                title: 'Title'
            }, {
                id: 'videoID',
                title: 'VideoID'
            }, {
                id: 'thumbnail',
                title: 'Thumbnail'
            }, {
                id: 'videourl',
                title: 'VideoURL'
            }, {
                id: 'bestthumbnail',
                title: 'BestThumbnail'
            }, {
                id: 'authorname',
                title: 'AuthorName'
            }, {
                id: 'authorURL',
                title: 'AuthorURL'
            }, {
                id: 'avatar',
                title: 'Avatar'
            }
        ]
    });
    csvWriter
        .writeRecords(goodata)
        .then(() => console.log('The CSV file was written successfully.'));
};

const createBad = async() => {
    let goodata = await fs.readFileSync("./datasetlabelwebsite/public/bad.json", "utf-8");
    goodata = JSON.parse(goodata);
    const csvWriter = createCsvWriter({
        path: 'badOutput.csv',
        header: [
            {
                id: 'title',
                title: 'Title'
            }, {
                id: 'videoID',
                title: 'VideoID'
            }, {
                id: 'thumbnail',
                title: 'Thumbnail'
            }, {
                id: 'videourl',
                title: 'VideoURL'
            }, {
                id: 'bestthumbnail',
                title: 'BestThumbnail'
            }, {
                id: 'authorname',
                title: 'AuthorName'
            }, {
                id: 'authorURL',
                title: 'AuthorURL'
            }, {
                id: 'avatar',
                title: 'Avatar'
            }
        ]
    });
    csvWriter
        .writeRecords(goodata)
        .then(() => console.log('The CSV file was written successfully.'));
};

createGood()
createBad()
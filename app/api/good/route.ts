import {NextResponse} from 'next/server'
import fsPromises from 'fs/promises';
import path from 'path';



export async function POST(request : Request) {
    const body = await request.json();
    const videoDetails = body.video;
    const videoID=videoDetails.id;
    let title = videoDetails.title;
    let thumbnail = videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url;
    let videourl = videoDetails.url;
    let bestthumbnail = videoDetails.bestThumbnail.url;
    let author = videoDetails.author;
    const filePath = path.join(process.cwd(), 'public/good.json');
    const jsonData = await fsPromises.readFile(filePath,"utf-8");
    let objectData = JSON.parse(jsonData);
    let newJsondata = {
        title:title,
        videoID:videoID,
        thumbnail:thumbnail,
        videourl:videourl,
        bestthumbnail:bestthumbnail,
        authorname:author.name,
        authorURL:author.url,
        avatar:author.bestAvatar.url
    };
    objectData.push(newJsondata);
    await fsPromises.writeFile(filePath,JSON.stringify(objectData),"utf-8");
    return NextResponse.json({message: "Success"});
}
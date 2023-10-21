import {NextResponse} from 'next/server'
import fsPromises from 'fs/promises';
import path from 'path';



export async function POST(request : Request) {
    const body = await request.json();
    const videoID = body.videoid;
    const filePath = path.join(process.cwd(), 'public/Completed.json');
    const jsonData = await fsPromises.readFile(filePath,"utf-8");
    let objectData = JSON.parse(jsonData);
    objectData.push(videoID)
    await fsPromises.writeFile(filePath,JSON.stringify(objectData),"utf-8");
    return NextResponse.json({message: "Success"});
}
import {NextResponse} from 'next/server'
import fsPromises from 'fs/promises';
import path from 'path';

export async function POST(request : Request) {
    const body = await request.json();
    const videoID = body.videoid;
    const filePath = path.join(process.cwd(), 'public/Completed.json');
    let jsonData:any = await fsPromises.readFile(filePath, 'utf-8');
    let completedJson  =[];
    try {
        completedJson=JSON.parse(jsonData);
    } catch (error) {
        console.log("Completed.json empty. Initializing.")
    };
    completedJson.push(videoID);
    await fsPromises.writeFile(filePath, JSON.stringify(completedJson, null, 2), "utf-8");
    return NextResponse.json({message: "Success"});
}
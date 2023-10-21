import {NextResponse} from 'next/server'
import fsPromises from 'fs/promises';
import path from 'path';



export async function POST(request : Request) {
    const body = await request.json();
    const videoID = body.videoid;
    const filePath = path.join(process.cwd(), 'public/Completed.json');
    let newJsondata = {
        videoID:videoID,
    };;
    await fsPromises.writeFile(filePath,JSON.stringify(newJsondata),"utf-8");
    return NextResponse.json({message: "Success"});
}
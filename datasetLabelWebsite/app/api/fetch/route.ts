
import { NextResponse ,NextRequest} from "next/server";
import fsPromises from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
    const filePath = path.join(process.cwd(), 'public/rawYoutubevideos.json');
    const Completed_filePath = path.join(process.cwd(), 'public/Completed.json');
    const completedJson =  await fsPromises.readFile(Completed_filePath,"utf-8");
    let CompeltedobjectData = JSON.parse(completedJson);
    // let videoID= CompeltedobjectData?.videoID;
    let jsonData:any = await fsPromises.readFile(filePath,"utf-8");
    jsonData=JSON.parse(jsonData);
    // if(!videoID||videoID===""){
    //     let newJsondata = {
    //         videoID:videoID,
    //     };;
    //     await fsPromises.writeFile(Completed_filePath,JSON.stringify(newJsondata),"utf-8");
    //     return NextResponse.json({ message: jsonData }, { status: 200 });
    // };
    const filteredVideoObjects = jsonData.filter((video:any) => !CompeltedobjectData.includes(video.id));
    return  NextResponse.json({ message: filteredVideoObjects }, { status: 200 });
}


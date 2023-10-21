"use client";
import Image from 'next/image'
import {useEffect, useState,useRef } from 'react';
export default function Home() {

    const [youtubeJsonData,
        setyoutubeJsonData] = useState < any > ([]);
    const youtubeJsonDataRef = useRef(youtubeJsonData);

    const fetchYoutubeData = async() => {
        const staticData = await(await fetch(`api/fetch`, {cache: 'no-store'})).json();
        setyoutubeJsonData(staticData
            ?.message);
        youtubeJsonDataRef.current= staticData?.message;
    }
    useEffect(() => {
        fetchYoutubeData();

    }, [])

    const handleUpdate = async(videoid : string) => {
        fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({videoid: videoid})
        }).then(async(e) => {
            await fetchYoutubeData();
            return;
        });
    };

    const handleBad = (jsondata : any) => {
        fetch('/api/bad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({video: jsondata})
        }).then(async(e) => {
            await handleUpdate(jsondata.id);
        });
    };

    const handleGood = (jsondata : any) => {
        fetch('/api/good', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({video: jsondata})
        }).then(async(e) => {
            await handleUpdate(jsondata.id);
        });
    };
    const handleSkip = (videoid : string) => {
        handleUpdate(videoid);
    };

    async function handleKeyDown(e : any) {
        if (!(youtubeJsonDataRef.current.length > 0)) {
            return;
        }
        switch (e.key) {
            case "ArrowLeft":
                handleBad(youtubeJsonDataRef.current[0]);
                break;
            case "ArrowRight":
                handleGood(youtubeJsonDataRef.current[0]);
                break;
        }
    };

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);
        function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        };

        return () => cleanup();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            1 of {youtubeJsonData.length}
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img
                    src={youtubeJsonData[0]
            ?.bestThumbnail
                ?.url}
                    alt="Shoes"/></figure>
                <div className="card-body">
                    <h2 className="card-title">{youtubeJsonData[0]
                            ?.title}</h2>
                    <div className="card-actions justify-center">
                        <button
                            onClick={(e) => handleSkip(youtubeJsonData[0]
                            ?.id)}
                            className="btn btn-primary">Skip</button>
                        <button
                            onClick={(e) => handleGood(youtubeJsonData[0])}
                            className="btn btn-secondary">Good</button>
                        <button
                            onClick={(e) => handleBad(youtubeJsonData[0])}
                            className="btn btn-accent">Bad</button>
                    </div>
                    <div className="d-flex justify-center flex-col">
                        <div className="badge badge-secondary">Left arrow (Bad)</div>
                        <div className="badge badge-primary">Right arrow (Good)</div>
                    </div>
                </div>
            </div>
        </main>
    )
}

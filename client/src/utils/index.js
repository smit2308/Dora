import React from "react";
import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt) {
    const randomPrompt =  surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)];

    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }
    return randomPrompt;
}

export async function downloadImage(_id, image) {

    if (image) {
        FileSaver.saveAs(image, `download_${_id}.jpg`);
    }
    else {
        alert("No image to download");
    }

}
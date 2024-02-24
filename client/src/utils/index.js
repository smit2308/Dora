import React from "react";
import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt) {
    const randomPrompt =  surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)];

    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }
    return randomPrompt;
}
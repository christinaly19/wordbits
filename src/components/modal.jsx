import React from 'react';
import "./modal.css";

export default function Modal({ helpOpen, onClose }) {
    return (
        <div className="flex-none modal-title text-1xl font-bold modal-background">
            <div className="justify-between flex w-full">
                <h1 className="mt-2 mx-4">How to Play</h1>
                <button onClick={onClose} className="modal-x bg-green-700 text-white px-5">x</button>
            </div>
            <li className="mt-1 mx-4 text-sm font-light">Form words from the letters</li>
            <li className="mx-4 text-sm font-light">Provide a suitable synonym</li>
            <li className="mx-4 text-sm font-light">Gain more points to win!</li>
            <h1 className="mx-4 text-sm">Example</h1>
            <div className="w-full justify-center flex">
                <div className="m-2 py-1 text-white px-2 bg-green-700"> C </div>
                <div className="m-2 py-1 px-2 text-white bg-green-700"> A</div>
                <div className="m-2 py-1 px-2 text-white bg-green-700"> T</div>
            </div>
        </div>
    );
}
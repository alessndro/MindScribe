import React from 'react'
import { logo } from '../assets'

export default function Hero() {
    return (
        <header className="w-full flex justify-center
        items-center flex-col">
            <nav className="flex justify-between items-center
            flex-row w-full mb-10 pt-3">
                <img src={logo} alt="brand logo"
                className="w-28 object-contain" />

                <button
                type="button"
                >
                    Log in
                </button>
            </nav>
            <h1 className="head_text">
                Summarize Articles with <br 
                className="max-md:hidden" />
                <span className="orange_gradient">
                    OpenAI
                </span>
            </h1>
            <h2 className="desc">
                Effortless Learning Starts Now!
                Instant Summaries from YouTube Videos. Learn, Practice, and Excel in Minutes with MindScribe
            </h2>
        </header>
    )
}

import { useEffect, useState } from "preact/hooks";

function renderTextWithLineBreaks(text) {
    return text.split("\n").flatMap((line, idx, arr) =>
        idx < arr.length - 1 ? [line, <br key={idx} />] : [line]
    );
}

export default function TypeTextAnimation({ text }) {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [cryptoText, setCryptoText] = useState("");

    useEffect(() => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij$klmnopqrstuvwxyz0%123456789";
        const interval = setInterval(() => {
            if (index < text.length) {
                setCryptoText(() => {
                    let newText = [];
                    for (let i = index; i < text.length; i++) {
                        newText.push(
                            // Maintain newline characters instead of scrambling them.
                            text[i] === "\n"
                                ? "\n"
                                : characters[Math.floor(Math.random() * characters.length)]
                        );
                    }
                    return newText.join("");
                });

                setDisplayText(prev => prev + text[index]);
                setIndex(prev => prev + 1);
            } else {
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [index, text]);

    return (
        <span>
            {renderTextWithLineBreaks(displayText)}
            <span className="crypto-text">
                {renderTextWithLineBreaks(cryptoText.slice(index - 10))}
            </span>
            <span className="animate-blink inline-block ml-1">|</span>
        </span>
    );
}

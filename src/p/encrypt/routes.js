export function routes({ get }) {

    function getOtp(length) {
        const upper = Math.pow(2, length * 4); // each hex digit is 4-bits
        const otp_integer = Math.floor(Math.random() * upper);
        return otp_integer
            .toString(16)
            .toUpperCase()
            .padStart(length, "0");
    }

    get({
            route: "/",
            query: ['word'], // 'otp' hidden param indicates request to decrypt 
            desc: "Encrypt a word.",
            rtn: "A URL containing the encrypted word; visit the URL to get the decryption.",
            callback: (req, res) => {
                const { word, otp } = req.query;
                if (otp) { // decrypt
                    const decode = [];
                    const otpv = otp.split("").map(v => parseInt(v, 16));
                    for (let i = 0; i < Math.floor(word.length / 4); i++) {
                        decode.push(
                            String.fromCharCode( // Convert to int value to char 
                                parseInt( // Extract 16-bit (4 hex char) from word
                                    word.slice(i * 4, (i * 4) + 4),
                                    16
                                ) - otpv[i % otpv.length] // Subtract otp
                            )
                        );
                    }
                    res.send({
                        decode: decode.join("")
                    });
                    
                } else { // encrypt
                    const otp_hex = getOtp(7);
                    const otpv = otp_hex.split("").map(v => parseInt(v, 16)); // values
                    const encode = word.split("").map((v, i) => {
                        return (v.charCodeAt(0) + otpv[i % otpv.length]) // shift by otp digit
                            .toString(16)
                            .padStart(4, "0");
                    }).join("");
                    const BASE = `${req.protocol}://${req.host}`;
                    res.send({
                        word: encode,
                        otp: otp_hex,
                        url: `${BASE}/p/encrypt?word=${encode}&otp=${otp_hex}`
                    });
                }
            }
        }
    );
}
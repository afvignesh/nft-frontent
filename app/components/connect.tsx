"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import nftMintAbi  from "../nftMinterAbi.json";

const mintContractAddr = "0x6AcBE73E630e58d8AF74Ca267238eedf8F4BdDff"
const NFT_API = "https://nft-backend-one.vercel.app"

// The main component which contains logic to connect to Metamask account
// And also to mint NFTs ...

export default function Connect() {
    const [accounts, setAccounts] = useState([]);

    async function connectAccount(){
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            console.log("accounts is : ", accounts)
            setAccounts(accounts)
        }
    }

    // Call our contract and mint NFT...
    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                mintContractAddr,
                nftMintAbi.abi,
                signer
            );

            try {
                const response = await contract.mint();
                console.log("response: ", response)

                // Transform the data and send it to backend to store it in DB ...
                let transactionObj = {
                    hashId: response.hash,
                    userId: accounts[0],
                    transactionDetails: response
                }

                // Send the response to backend.
                fetch(`${NFT_API}/transaction`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(transactionObj)
                })

            } catch(err) {
                console.log("error : ", err);
            }
        }
    }

    return (
        <>
            <div className="flex items-center justify-center h-[95vh] w-10/12 m-auto lg:w-11/12">
                <div className="grid items-center justify-items-center text-center max-w-3xl">
                    <h1 className="text-6xl md:text-5xl sm:text-4xl font-bold text-slate-300">Ethlas NFTs</h1>
                    <p className="text-base md:text-sm text-slate-500 my-5
                    ">Mint your NFTs from here. Just connect your MetaMask account and you are ready to go...</p>
                    
                    {accounts.length > 0 && (
                        <div>
                            <button type="button" onClick={handleMint} className="bg-purple-500 text-white px-7 py-1.5 text-lg md:text-sm rounded-md shadow-lg active:scale-90 hover:translate-y-2 transition-all">Mint NFT</button>
                        </div>
                    )}

                    {!accounts.length && (
                        <div>
                            <button type="button" onClick={connectAccount} className="bg-purple-500 text-white px-7 py-1.5 text-lg md:text-sm rounded-md shadow-lg active:scale-90 hover:translate-y-2 transition-all">Connect Account</button>
                        </div>
                    )}
                   
                </div>
            </div>
        </>
    )
}
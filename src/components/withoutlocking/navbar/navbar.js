import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress, tokenAbi, tokenAddres, abi

} from "../../../utils/constant";
import './navbar.css';
import { ToastContainer, toast } from 'react-toastify';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// import logo from "../../asset/images/logo.png";
import logo1 from "../../../asset/images/staehutt.png";

import menuIcon from "../../../asset/images/menuIcon.png";
function Navbarr() {

    let accountAd;
    const [account, setAccount] = useState("Connect");
    const [showLinks, setShowLinks] = useState(false);

    function formatThousands(num) {
        var numbr = parseFloat(parseFloat(num).toFixed(6));
        // console.log("num", parseFloat(numbr));
        var values = numbr.toString().split(".");
        return (
            values[0].replace(/.(?=(?:.{3})+$)/g, "$&,") +
            (values.length == 2 ? "." + values[1] : "")
        );
    }

    const loadWeb3 = async () => {
        let isConnected = false;
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                isConnected = true;
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else {
                isConnected = false;
                console.log("Metamask is not installed, please install it on your browser to connect.");
                // alert("Metamask is not installed, please install it on your browser to connect.");
            }
            if (isConnected === true) {
                let accounts = await getAccounts();
                // setAccount(accounts[0]);
                accountAd = accounts[0];
                setAccount(accountAd);
                let accountDetails = null;
                window.ethereum.on("accountsChanged", function (accounts) {
                    // setAccount(accounts[0]);
                    accountAd = accounts[0];
                    setAccount(accountAd);
                    // console.log(accounts);
                });
            }
        } catch (error) {
            console.log("Error while connecting metamask", error);
            // alert("Error while connecting metamask");
        }
    };

    const getAccounts = async () => {
        const web3 = window.web3;
        try {
            let accounts = await web3.eth.getAccounts();
            // console.log(accounts);
            return accounts;
        } catch (error) {
            console.log("Error while fetching acounts: ", error);
            return null;
        }
    };

    // eslint-disable-next-line
    const isLockedAccount = async () => {
        try {
            let accounts = await getAccounts();
            if (accounts.length > 0) {
                // console.log("Metamask is unlocked");
            } else {
                console.log("Metamask is locked");
            }
        } catch (error) {
            console.log("Error while checking locked account");
        }
    };

    const handleClick = async () => {
        const web3 = window.web3;
        // let value = 100;
        try {
            console.log(account)
            let contract = new web3.eth.Contract(abi, contractAddress);
            let tokenContract = new web3.eth.Contract(tokenAbi, tokenAddres);
            // if (value >= 100 && value <= 1000) {
            await tokenContract.methods.approve(contractAddress, web3.utils.toWei("" + 100)).send({ from: accountAd })
            const result = await contract.methods.Bet_Amount(web3.utils.toWei("" + 100)).send({ from: accountAd })
            console.log(result);
            // } else {
            //     alert('Minimum Bet 100 and Maximum Bet 1000')
            // }
        } catch (error) {
            console.log("Error while fetching acounts: ", error);

        }
    }
    useEffect(() => {
        setInterval(() => {
            loadWeb3();
        }, 1000);
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-2">
                    <span href="#home">
                        <img className="logo" src={logo1} alt="Logo" class={{width: "75px", height: "75px" }}/>
                    </span>
                </div>
                <div className="col-sm-3 offset-md-6 connect">
                    <a href="#"
                        className="btn btn-primary btn-sm"
                        aria-pressed="true"
                        id="connect"
                        onClick={loadWeb3}
                    >
                        {/* connect */}
                        {account}
                    </a>
                </div>
            </div>
        </div >
    );
}
export default Navbarr;
